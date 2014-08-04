<?php

/**
 * Zend Framework (http://framework.zend.com/)
 *
 * @link      http://github.com/zendframework/ZendSkeletonApplication for the canonical source repository
 * @copyright Copyright (c) 2005-2013 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */
namespace Signin\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Exception;
use Signup\Model\UsersignupModel;
use Zend\Session\Container;
use Google_Client;
use Google_Service_Plus;

use Signin\Model\UserloginModel;
use ResponseGenerator;




class SigninController extends AbstractActionController {


	protected $userloginTable;
	protected $usersignupTable;
	protected $gmailloginTable;
	protected $authkeyTable;


	public function getResponseWithHeader()
	{
		$response = $this->getResponse();
		$response->getHeaders()
		//make can accessed by *
		->addHeaderLine('Access-Control-Allow-Origin','*')
		//set allow methods
		->addHeaderLine('Access-Control-Allow-Methods','POST PUT DELETE GET');

		return $response;
	}

	protected function getAuthkeyTable()
	{
		if(!$this->authkeyTable) {
			$sm = $this->getServiceLocator();
			$this->authkeyTable = $sm->get('Signin\Model\AuthkeyTable');
		}
		return $this->authkeyTable;
	}


	protected function getUserloginTable() {
		if (! $this->userloginTable) {
			$sm = $this->getServiceLocator ();
			$this->userloginTable = $sm->get ( 'Signin\Model\UserloginTable' );
		}
		return $this->userloginTable;
	}

	protected function getUsersignupTable() {
		if (! $this->usersignupTable) {
			$sm = $this->getServiceLocator ();
			$this->usersignupTable = $sm->get ( 'Signup\Model\UsersignupTable' );
		}
		return $this->usersignupTable;
	}

	// normal user login action



	public function checkloginAction()
	{



		$details=json_decode($this->getRequest()->getContent());




		$user=$this->getUserloginTable();
		$result=$user->signinUser($details);









		if($result["status"])
		{
			//retirve the auth  key and value and return it along with it.

			$user_id   = $result['id'];



			$this->getAuthkeyTable()->InsertAuth($user_id);


			$authdata = $this->getAuthkeyTable()->getAuth($user_id);


			$authkey = $authdata->auth;
			$authvalue = $authdata->authvalue;
			$datareturn =1;
		}
		else
		{
			$datareturn =0;
			$authkey = '';
			$authvalue = '';
			$user_id="";
		}



		$this->getResponse()->getHeaders()
		//make can accessed by *
		->addHeaderLine('authkey',$authkey)
		//set allow methods
		//set allow methods
		->addHeaderLine('authvalue',$authvalue)
		->addHeaderLine('user-id',$user_id);







		print_r( json_encode( $result));

		return $this->response;


	}


	// gmail login action


	public function indexAction() {
		// TODO: Auto-generated method stub


		$client = new Google_Client ();


		$keys= \ServerapiUtil::getGoogleConfig();


		$client->setClientId ( $keys->client_id);
		$client->setClientSecret ($keys->client_secret);
		$client->setScopes ( $keys->scopes );



		$authdata_client=  $this->getRequest()->getContent();
		$client->setAccessToken ( $authdata_client);



      $result=  $this->setauthdata_to_database($client);
    /*   if($result['status']==1)
      {
      	$id=$result["id"];
      	$this->getAuthkeyTable()->InsertAuth($id);
      	$authdata = $this->getAuthkeyTable()->getAuth($id);

      	$authkey = $authdata->auth;
      	$authvalue = $authdata->authvalue;
      	$authid = $id;

      }
      else
      {
      	$authkey ="";
      	$authvalue = "";
      	$authid = "";

      }




        	$this->getResponse()->getHeaders()
		//make can accessed by *
		->addHeaderLine('authkey',$authkey)
		//set allow methods
		->addHeaderLine('authvalue',$authvalue)
		->addHeaderLine('user_id',$authid); */


		print_r($result);

     return $this->response;

	}




	// store gmail user and oauth data to database

	public function setauthdata_to_database($client)
	{


		$plus = new \Google_Service_Plus($client);

		try {
		$person = $plus->people->get('me');
		}
		catch (\Exception $e)
		{
			return array('status'=>0,'msg'=>"network issue") ;
		}



		$emaillist=$person->getEmails();
		$displayname=$person->getDisplayName();
		//$age=$person->getAgeRange();
		$gender=$person->getGender();

		$data['email']=$emaillist[0]->value;




	    $user=$this->getUserloginTable();
	    $userreg=new UserloginModel();
	    $userreg->exchangeArray($data);


	    $result_row=$user->savenewuser($userreg);




	    $id=$result_row['id'];

	    $this->getAuthkeyTable()->InsertAuth($id);


	    $authdata = $this->getAuthkeyTable()->getAuth($id);


	    $authkey = $authdata->auth;
	    $authvalue = $authdata->authvalue;


	    $this->getResponse()->getHeaders()
	    //make can accessed by *
	    ->addHeaderLine('authkey',$authkey)
	    //set allow methods
	    //set allow methods
	    ->addHeaderLine('authvalue',$authvalue)
	    ->addHeaderLine('user-id',$id);

	    if($result_row['status']==0)
	    {
	    	return array('status'=>1,'id'=>$id);
	    }

	    /*
	     * $id is unique id for signin table
	    *
	    * making this as base
	    *
	    * user details age, occupation name, gender  are saved to signup table
	    */

	    $emaillist=$person->getEmails();
	    $displayname=$person->getDisplayName();

	    $gender=$person->getGender();

	    $signup_data['user_id']=$id;
	    $signup_data['age']=null;
	    $signup_data['occupation']=null;
	    $signup_data['name']=$displayname;
	    $signup_data['gender']=$gender;


	    $user=$this->getUsersignupTable();

	    $userreg=new UsersignupModel();
	    $userreg->exchangeArray($signup_data);



	    	if($user->savenewuserdetails($userreg));




	    return array('status'=>1,'id'=>$id) ;




	}



	//  create Oauth url and return for client side login and server ouath refresh tokens

	public function createauthurlAction() {



		try{
		$client = new Google_Client ();


		$keys= \ServerapiUtil::getGoogleConfig();


		$client->setClientId ( $keys->client_id);
		$client->setClientSecret ($keys->client_secret);
		$client->setRedirectUri($keys->redirect_uri);
		$client->setScopes ( $keys->scopes );
		$client->setAccessType ( 'offline' );
		$client->setApprovalPrompt("force");
		}
		catch(\Exception $e){

			echo json_encode(\ResponseGenerator::create_response(0, "Google Exception"));
			die();
		}


		$data = array("authurl"=>$client->createAuthUrl());


		$this->getResponse()->getHeaders()
		//make can accessed by *
		->addHeaderLine('Access-Control-Allow-Origin','*')
		//set allow methods
		->addHeaderLine('Access-Control-Allow-Methods','POST PUT DELETE GET');

		echo json_encode(\ResponseGenerator::create_response(1,"success",$data));

		return $this->response;

	}

	// handle complete oauth process if authentication is on server side

	public function handleAction() {
		$user_session = new Container('user');
		$user_session->accesstoken="";



		try{
			$client = new Google_Client ();


			$keys= \ServerapiUtil::getGoogleConfig();


			$client->setClientId ( $keys->client_id);
			$client->setClientSecret ($keys->client_secret);
			$client->setRedirectUri($keys->redirect_uri);
			$client->setScopes ( $keys->scopes );
			$client->setAccessType ( 'offline' );
			$client->setApprovalPrompt("force");
		}
		catch(\Exception $e){

			echo json_encode(\ResponseGenerator::create_response(0, "Google Exception"));
			die();
		}


        if (isset ( $_GET ['error'] )) {
            $redirect = \ServerapiUtil::getClientUrl().'#';
            header ( 'Location: ' . filter_var ( $redirect, FILTER_SANITIZE_URL ) );
            exit();
        }



		if (isset ( $_GET ['code'] )) {

	            $client->authenticate ( $_GET ['code'] );


			$user_session->accesstoken = $client->getAccessToken ();




			$result=  $this->setauthdata_to_database($client);


			//$this->setauthdata_to_database($client);
			$redirect = \ServerapiUtil::getClientUrl().'#projects?'.$result['id'];




           	header ( 'Location: ' . filter_var ( $redirect, FILTER_SANITIZE_URL ) );
           	exit();
		}


	}


}
