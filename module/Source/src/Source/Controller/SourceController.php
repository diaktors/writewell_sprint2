<?php
namespace Source\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\Session\Container;
use Source\Model\SourceModel;
use Google_Client;
use Google_Service_Drive;
use Google_Service_Drive_DriveFile;
use ResponseGenerator;
use ServerapiUtil;
use Zend\View\Model\JsonModel;
use Note\Controller\AbstractRestfulJsonController;


class SourceController extends AbstractRestfulJsonController
{

    /**
     * The default action - show the home page
     */

    protected $SourceTable;
    protected $authkeyTable;

    public function init()
    {
        $bootstrap = $this->getInvokeArg('bootstrap');
        $this->_helper->layout->disableLayout();
        $this->_helper->viewRenderer->setNoRender(TRUE);
        $this->_helper->AjaxContext()
            ->addActionContext('get', 'json')
            ->addActionContext('post', 'json')
            ->addActionContext('new', 'json')
            ->addActionContext('edit', 'json')
            ->addActionContext('put', 'json')
            ->addActionContext('delete', 'json')
            ->initContext('json');
    }

    public function getResponseWithHeader()
    {
        $response = $this->getResponse();
        $response->getHeaders()
            //make can accessed by *
            ->addHeaderLine('Access-Control-Allow-Origin', '*')
            //set allow methods
            ->addHeaderLine('Access-Control-Allow-Methods', 'POST PUT DELETE GET');

        return $response;
    }


    protected function isAuthenticated()
    {

        $auth_key = $this->getRequest()->getHeader('authkey')->getFieldValue(); //
        $auth_value = $this->getRequest()->getHeader('authvalue')->getFieldValue(); //    	getRequest()->getMetadata();

        $data = $this->getAuthkeyTable()->ValidateAuth($auth_key, $auth_value);
        return 1;//$data;

    }


    protected function getAuthkeyTable()
    {
        if (!$this->authkeyTable) {
            $sm = $this->getServiceLocator();
            $this->authkeyTable = $sm->get('Signin\Model\AuthkeyTable');
        }
        return $this->authkeyTable;
    }

    public function getsourcepath($path)
    {
        $uploads_dir = \ServerapiUtil::getSourceUploadDir();
        move_uploaded_file($path['tmp_name'], $uploads_dir);

    }


    protected function getSourceTable()
    {
        if (!$this->SourceTable) {
            $sm = $this->getServiceLocator();
            $this->SourceTable = $sm->get('Source\Model\SourceTable');
        }
        return $this->SourceTable;
    }


    public function getList()
    { // Action used for GET requests without resource Id


        $project_id = $_GET['project_id'];


        if ($this->isAuthenticated()) {

            $sourcetable = $this->getSourceTable();


            try {

                $sources = $sourcetable->getProjectSourcesList($project_id);

            } catch (\Exception $e) {
                return new JsonModel(array(
                    'error' => 'no sources found'
                ));
            }

            $data = array();
            foreach ($sources as $source)
                array_push($data, get_object_vars($source));


            return new JsonModel(array(
                'data' => $data,
            ));
        } else {

            $this->response->setStatusCode(401);
            return new JsonModel(array("error" => 'NOT Authorized'));
        }

    }


    public function get($source_id)
    {

        if ($this->isAuthenticated()) {

            $sourcetable = $this->getSourceTable();
            $object = $sourcetable->getUserSource((int)$source_id);

            if (!$object) {

                $this->response->setStatusCode(400);

                return new JsonModel(array("error" => 'No Source exists with given ID'));

            }


            $result = get_object_vars($object);
            return new JsonModel(array("data" => $object));


        } else {

            $this->response->setStatusCode(401);
            return new JsonModel(array("error" => 'NOT Authorized'));
        }

    }

    public function create($attributes)
    {





        if ($this->isAuthenticated()) {


            try {

                $type = $attributes['type'];

                if ($type != 'link') {


                    $uploads_dir = \ServerapiUtil::getSourceUploadDir();

                    $path = $uploads_dir . $_FILES['filesource']['name'];


                    //moving temporary files to sources destination folder

                    move_uploaded_file($_FILES['filesource']['tmp_name'], $path);
                    $object['title'] = $_FILES['filesource']['name'];
                } else {
                    $object['title'] = null;
                    $path = $_POST['sourcepath'];
                }


                $object['type'] = $type;
                $object['project_id'] = $attributes['project_id'];


                /* if object type is link
                 * no file upload needed
                 *
                 * hence the path to source is link itself
                 *
                 * Source path = link url
                 */


                $object['sourcepath'] = $path;


                $sourcetable = $this->getSourceTable();
                $section = new SourceModel();
                $section->exchangeArray($object);

                $id = $sourcetable->createSource($section);



                $this->response->setStatusCode(201);
                return  $this->get($id);
            } catch (\Exception $e) {
                $this->response->setStatusCode(400);

                return new JsonModel(array("error" => 'source could not ne created'));
            }


        } else {

            $this->response->setStatusCode(401);
            return new JsonModel(array("error" => 'NOT Authorized'));
        }


    }

    public function update($source_id, $data)
    {


        if ($this->isAuthenticated()) {
            $attributes = $this->getRequest()->getContent();

            $object = json_decode($attributes, true);


            $source['section_id'] = $object['sectionIdAssigned'];

            $sourcetable = $this->getSourceTable();
            if ($sourcetable->updateSource($source_id, $object)) {

                $this->response->setStatusCode(204);
                return new JsonModel();
            } else {
                $this->response->setStatusCode(400);
                return new JsonModel(array('error' => 'update failed'));
            }


        } else {

            $this->response->setStatusCode(401);
            return new JsonModel(array("error" => 'NOT Authorized'));
        }


    }

    public function delete($source_id)
    {

        if ($this->isAuthenticated()) {

            $sourcetable = $this->getSourceTable();

            if ($sourcetable->updateSource($source_id, array('status' => 'N'))) {


                $this->response->setStatusCode(204);
                return new JsonModel();
            } else {
                $this->response->setStatusCode(400);
                return new JsonModel(array('error' => 'delete unsuccessful'));

            }
        } else {

            $this->response->setStatusCode(401);
            return new JsonModel(array("error" => 'NOT Authorized'));
        }


    }

   
}