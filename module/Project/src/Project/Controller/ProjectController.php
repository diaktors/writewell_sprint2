<?php
namespace Project\Controller;

use Zend\Mvc\Controller\AbstractRestfulController;


use Zend\View\Model\JsonModel;

use ResponseGenerator;


use Project\Model\ProjectModel;
use Google_Client;
use Google_Service_Drive;
use Google_Service_Drive_DriveFile;

use Project\Controller\AbstractRestfulJsonController;


class ProjectController extends AbstractRestfulJsonController
{


    protected $ProjectTable;
    protected $authkeyTable;

    // initialization code  before  processing  the request .

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
        return $data;

    }


    protected function getAuthkeyTable()
    {
        if (!$this->authkeyTable) {
            $sm = $this->getServiceLocator();
            $this->authkeyTable = $sm->get('Signin\Model\AuthkeyTable');
        }
        return $this->authkeyTable;
    }


    protected function getProjectTable()
    {
        if (!$this->ProjectTable) {
            $sm = $this->getServiceLocator();
            $this->ProjectTable = $sm->get('Project\Model\ProjectTable');
        }
        return $this->ProjectTable;
    }




    public function getList()
    { // Action used for GET requests without resource Id

        if ($this->isAuthenticated()) {

            $projecttable = $this->getProjectTable();

            try {

                $projects = $projecttable->getUserProjectList("186");
            } catch (\Exception $e) {
                return new JsonModel(array(
                    'error' => 'no projects found'
                ));
            }

            $data = array();


            foreach ($projects as $project) {


                array_push($data, $project->getArrayCopy());

            }


            return new JsonModel(array(
                'data' => $data,
            ));
        } else {

            $this->response->setStatusCode(401);
            return new JsonModel(array("error" => 'NOT Authorized'));
        }

    }

    public function get($id)
    { // Action used for GET requests with resource Id
        if ($this->isAuthenticated()) {
            $projecttable = $this->getProjectTable();
            $object = $projecttable->getUserProject((int)$id);

            if (!$object) {

                $this->response->setStatusCode(400);

                return new JsonModel(array("error" => 'No project exists with given ID'));

            }


            $result = get_object_vars($object);
            return new JsonModel(array("data" => $result));


        } else {

            $this->response->setStatusCode(401);
            return new JsonModel(array("error" => 'NOT Authorized'));
        }
    }

    public function create($data)
    { // Action used for POST requests

        if ($this->isAuthenticated()) {
            $attributes = $this->getRequest()->getContent();


            $object = json_decode($attributes, true);

            $data['title'] = $object['title'];
            $data['user_id'] = (int)194;
            $data['project_templateId'] = (int)$object['project_templateId'];


            $projecttable = $this->getProjectTable();
            $project = new ProjectModel();

            $project->exchangeArray($data);
            if ($project->getInputFilter()->setData($data)->isValid())
                $id = $projecttable->createProject($project);
            else {

                $this->response->setStatusCode(400);

                return new JsonModel(array("error" => 'Project could not ne created'));
            }


            $this->response->setStatusCode(201);
            return new JsonModel(array('data' => $this->get($id)));
        } else {

            $this->response->setStatusCode(401);
            return new JsonModel(array("error" => 'NOT Authorized'));
        }
    }


    public function update($id, $data)
    { // Action used for PUT requests

        if ($this->isAuthenticated()) {
            $attributes = $this->getRequest()->getContent();

            $object = json_decode($attributes, true);
            //$object=array_slice($object, 1);

            $project['title'] = $object['title'];

            $projecttable = $this->getProjectTable();


            if ($projecttable->updateProject($id, $project)) {

                $this->response->setStatusCode(204);
                return new JsonModel();
            } else {
                $this->response->setStatusCode(400);
                return new JsonModel(array('error' => 'update failed'));
            }
        }else {

            $this->response->setStatusCode(401);
            return new JsonModel(array("error" => 'NOT Authorized'));
        }

    }

    public function delete($id)
    { // Action used for DELETE requests

        if ($this->isAuthenticated()) {
            $projecttable = $this->getProjectTable();
            if ($projecttable->updateProject($id, array('status' => 'N'))) {

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