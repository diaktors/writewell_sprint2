<?php
namespace Note\Controller;

use Zend\Mvc\Controller\AbstractActionController;

use Note\Model\NoteModel;
use ResponseGenerator;
use Zend\View\Model\JsonModel;
use Note\Controller\AbstractRestfulJsonController;


/**
 * Google api for accessing Drive features
 *
 */

use Google_Client;
use Google_Service_Drive;
use Google_Service_Drive_DriveFile;

class NoteController extends AbstractRestfulJsonController
{


    protected $NoteTable; // refernce to Note table   (insertion , deletion, )
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


    protected function getNoteTable()
    {
        if (!$this->NoteTable) {
            $sm = $this->getServiceLocator();
            $this->NoteTable = $sm->get('Note\Model\NoteTable');
        }
        return $this->NoteTable;
    }


    public function getList()
    { // Action used for GET requests without resource Id


        $project_id = 988;
        if ($this->isAuthenticated()) {


            $notetable = $this->getNoteTable();


            try {
                $notes = $notetable->getProjectNotesList($project_id);
            } catch (\Exception $e) {
                return new JsonModel(array(
                    'error' => 'no notes found'
                ));
            }

            $data = array();
            foreach ($notes as $note)
                array_push($data, get_object_vars($note));


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

            $notetable = $this->getNoteTable();
            $object = $notetable->getUserNote((int)id);


            if (!$object) {

                $this->response->setStatusCode(400);

                return new JsonModel(array("error" => 'No Note exists with given ID'));

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

        $project_id = 988; // get from request.

        if ($this->isAuthenticated()) {
            $attributes = $this->getRequest()->getContent();


            $object = json_decode($attributes, true);


            $data['title'] = $object['title'];

            $data['description'] = $object['text'];
            $data['project_id'] = (int)$project_id;


            $notetable = $this->getNoteTable();
            $note = new NoteModel();

            $note->exchangeArray($data);


            if ($note->getInputFilter()->setData($data)->isValid())
                $id = $notetable->createNote($note);

            else {
                $this->response->setStatusCode(400);

                return new JsonModel(array("error" => 'Note could not ne created'));
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


            $note['title'] = $object['title'];

            $note['description'] = $object['text'];

            $notetable = $this->getNoteTable();


            if ($notetable->updateNote($id, $note)) {
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

    public function delete($id)
    { // Action used for DELETE requests

        if ($this->isAuthenticated()) {
            $sectionTable = $this->getNoteTable();
            if ($sectionTable->updateNote($id, array('status' => 'N'))) {

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