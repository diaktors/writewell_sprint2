<?php

namespace Createdoc\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Zend\Session\Container;
use Google_Client;
use Google_Service_Drive;
use ResponseGenerator;

use Google_Service_Drive_DriveFile;
use ServerapiUtil;



class CreatedocController extends AbstractActionController {

	// This controller handles Creation of doc from individual sections and uploading that to Drive


	protected $sectionTable;
	protected $projectTable;
	protected $authkeyTable;




	protected function getAuthkeyTable()
	{
		if(!$this->authkeyTable) {
			$sm = $this->getServiceLocator();
			$this->authkeyTable = $sm->get('Signin\Model\AuthkeyTable');
		}
		return $this->authkeyTable;
	}

	public function checkRequestHeaders(){
		$auth_key =$this->getRequest()->getHeader('authkey')->getFieldValue();
		$auth_value =$this->getRequest()->getHeader('authvalue')->getFieldValue();



		$data =$this->getAuthkeyTable()->ValidateAuth($auth_key, $auth_value);

       print_r($data);

		if(is_int($data) && $data==0){

           return 1;

		}
		return 0;

	}





	protected function getSectionTable() {
		if (! $this->sectionTable) {
			$sm = $this->getServiceLocator ();
			$this->sectionTable = $sm->get ( 'Section\Model\SectionTable' );
		}
		return $this->sectionTable;
	}
	protected function getProjectTable() {
		if (! $this->projectTable) {
			$sm = $this->getServiceLocator ();
			$this->projectTable = $sm->get ( 'Project\Model\ProjectTable' );
		}
		return $this->projectTable;
	}



	private function get_export_type($type) {


		/*  $type may be one of these -- >
		 *
		*  HTML	         text/html
		*	Plain text	     text/plain
		*	Rich text	     application/rtf
		*	Open Office doc	 application/vnd.oasis.opendocument.text
		*  PDF	             application/pdf
		*/

        switch ($type) {

            case 'DOC':

            	return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";



            case 'PDF':

            	return "application/pdf";

            case 'RTF':

                return "application/rtf";

            case 'TXT':

                return "text/plain";


        }
	}



	/**
	 * create Doc from contents
	 */
	private function write_file($file, $content) {
		$f_conn = @fopen ( $file, 'w+' );
		@fputs ( $f_conn, $content, strlen ( $content ) );
		@fclose ( $f_conn );
		return;
	}

	/**
	 * prompt the user to download the $file
	 */
	private function download_file($file, $type) {
		print_r ( $file . "     " . $type );
		header ( "Content-type: " . $type );
		header ( "Content-Disposition: attachment; filename=" . $file );
		header ( "Content-Length: " . filesize ( $file ) );
		@readfile ( $file );
	}


	/* Gets the content from all sections and aggregates */


	public function getContentFromDB($project_id){

         $sectiontable= $this->getSectionTable();
         $result      = $sectiontable->getProjectSectionsListByOrderId($project_id);


         $data="";
         foreach ($result as $row)
         {


         	$data=$data."<br><br>".$row->description;
         }

         return $data;
	}







	/**
	 * collects the data from all sections and stores the content to a intermediate Doc.
	 */



	public function createDocFromSections($project_id) {

		/* @ $file['content'] -- > contains aggregated data from all sections */
		$file ['content'] = $this->getContentFromDB($project_id);

		$docname = $project_id.".docx";

		$docpath = \ServerapiUtil::getProjDir() . $docname;



		$this->write_file ( $docpath, $file ['content'] );


		return $docpath;
	}


	/*
	 * configures Google client with required params @param $authdata_client is auth token for gmail user
	 */

	public function configure_client($authdata_client=null) {


		$keys=\ServerapiUtil::getGoogleConfig();



		$client = new Google_Client ();

		$client->setClientId ( $keys->client_id);
		$client->setClientSecret ($keys->client_secret);
		$client->setScopes ( $keys->scopes );

		if (! $authdata_client) {


			$writewellcredentials = \ServerapiUtil::getWritewellCredentials();

			$client->setAccessToken ( $writewellcredentials );

			if ($client->isAccessTokenExpired ()) {
				$temp = json_decode ( $writewellcredentials );
				$client->refreshToken ( $temp->refresh_token );
			}
		} else
			$client->setAccessToken ( $authdata_client );

		return $client;
	}

	/*
	 * returns the Drive file url of required format
	 */
	public function exportAction() {

		/* if($this->checkRequestHeaders()) {

		print_r(json_encode(ResponseGenerator::create_response(0, "authentication failed")));
		return $this->response;
		}
 */

		$project_id = (int)$_GET['project_id'];
		$type = $_GET['type'];


		$client = $this->configure_client ();

		$project_table=$this->getProjectTable();
		$projectrow=$project_table->getUserProject($project_id);

		$result = $this->putContentToDrive ( $client, $this->createDocFromSections ($project_id),$projectrow->title );


 	$type = $this->get_export_type($type);



		$file = $result ["exportLinks"] [$type];


		print_r(json_encode( \ResponseGenerator::create_response(1, "success",$file)));
		return $this->response;
	}


	public function saveAction(){


		/* if($this->checkRequestHeaders()) {

			print_r(json_encode(ResponseGenerator::create_response(0, "authentication failed")));
			return $this->response;
		}
 */
		$project_id=(int)$_GET['project_id'];

		$docpath= $this->createDocFromSections ($project_id);



		print_r(json_encode( \ResponseGenerator::create_response(1, "success")));
		return $this->response;
	}


	/*
	 * Method to Put File $file to Drive and returns ID of that Drice File @param 		$service --> Google Drive service object @param 	$file --> Name of the file to be uploaded
	 */
	public function putContentToDrive($client, $path, $title) {


		$service = new \Google_Service_Drive ( $client );

		$file = new \Google_Service_Drive_DriveFile ();

		$file->setTitle($title);



		$result = $service->files->insert ( $file, array (
				'data' => file_get_contents ( $path ),
				'mimeType' => 'text/html',
				'uploadType' => 'media',
				'convert' => 'true'
		) );


		// permissions to be added still working ..

		$newPermission = new \Google_Service_Drive_Permission();


	   /*
	    *       in case of allowing single gmail user
	    *
	    *       $newPermission->setValue('sairam.murari08@gmail.com');
       */

		$newPermission->setType('anyone');
		$newPermission->setRole('reader');
		try {
		        $service->permissions->insert($result['id'], $newPermission);
		} catch (\Exception $e) {
			print "An error occurred: " . $e->getMessage();
		}

		/* $permission=new \Google_Service_Drive_Permission();
		$permission->setRole( 'writer' );
		$permission->setType( 'anyone' );
		$permission->setValue( 'me' );

		$file->setPermissions($permission);
		$file->setShared(true); */





		return $result;
	}
}