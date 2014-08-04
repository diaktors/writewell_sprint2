<?php

namespace Section\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\Session\Container;
use Section\Model\SectionModel;
use Google_Client;
use Google_Service_Drive;
use Google_Service_Drive_DriveFile;
use ResponseGenerator;
use Section\Controller\AbstractRestfulJsonController;
use Zend\View\Model\JsonModel;

class SectionController extends AbstractRestfulJsonController
{

    /**
     * The default action - show the home page
     */
    protected $SectionTable;
    protected $NoteTable;
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

    protected function getSectionTable()
    {
        if (!$this->SectionTable) {
            $sm = $this->getServiceLocator();
            $this->SectionTable = $sm->get('Section\Model\SectionTable');
        }
        return $this->SectionTable;
    }

    protected function getNoteTable()
    {
        if (!$this->NoteTable) {
            $sm = $this->getServiceLocator();
            $this->NoteTable = $sm->get('Note\Model\NoteTable');
        }
        return $this->NoteTable;
    }

    protected function getSourceTable()
    {
        if (!$this->SourceTable) {
            $sm = $this->getServiceLocator();
            $this->SourceTable = $sm->get('Source\Model\SourceTable');
        }
        return $this->SourceTable;
    }

    public function makeMetadataUnassigned($section_id)
    {
        $this->getSourceTable()->updateSource($section_id, 0);
        $this->getNoteTable()->updateNote($section_id, 0);
    }

    public function getList()
    { // Action used for GET requests without resource Id

        $project_id = 988;  // get from request


        if ($this->isAuthenticated()) {

            $sectiontable = $this->getsectiontable();

            try {

                $sections = $sectiontable->getProjectSectionsList($project_id);
            } catch (\Exception $e) {
                $this->response->setStatusCode(400);
                return new JsonModel(array(
                    'error' => 'no sections found'
                ));
            }

            $data = array();


            foreach ($sections as $section) {


                array_push($data, $section->getArrayCopy());

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
            $sectiontable = $this->getsectiontable();
            $object = $sectiontable->getUserSection(( int )$id);

            if (!$object) {

                $this->response->setStatusCode(400);

                return new JsonModel(array("error" => 'No section exists with given ID'));

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

        $attributes = $this->getRequest()->getContent();
        $project_id = 194; // neeed to get from  request

        if ($this->isAuthenticated()) {
            $result = array();

            $object = json_decode($attributes, true);

            foreach ($object as $sectionobject) {

                $data ['title'] = $sectionobject ['title'];
                $data ['order_id'] = $sectionobject ['orderId'];
                $data ['description'] = $sectionobject ['text'];
                $data ['project_id'] = $project_id;


                if ((!isset($sectionobject['id']) || $sectionobject['id'] == 0)) {


                    $sectiontable = $this->getSectionTable();
                    $section = new SectionModel ();

                    $section->exchangeArray($data);

                    if ($section->getInputFilter()->setData($data)->isValid())

                        $id = $sectiontable->createSection($section);
                    else {
                        //return \ResponseGenerator::create_response(0, "fill required fields ");
                    }

                    $sectionobject ["id"] = ( int )$id;
                } else {


                    $this->update($sectionobject['id'], $sectionobject);


                }


                array_push($result, $sectionobject);
            }

            $this->response->setStatusCode(201);
            return new JsonModel(array('data' => $result));
        } else {

            $this->response->setStatusCode(401);
            return new JsonModel(array("error" => 'NOT Authorized'));
        }
    }


    public function update($id, $data)
    { // Action used for PUT requests


        if ($this->isAuthenticated()) {
            $attributes = $this->getRequest()->getContent();


            if (is_string($attributes)) {
                $object = json_decode($attributes, true);
            } else
                $object = $data;

            $section ['title'] = $object ['title'];
            $section ['order_id'] = $object ['orderId'];
            $section ['description'] = $object ['text'];

            $sectiontable = $this->getSectionTable();


            if ($sectiontable->updateSection($id, $section)) {

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


        $sectiontable = $this->getSectionTable();

        $this->makeMetadataUnassigned($id);


        if ($this->isAuthenticated()) {
            $sectiontable = $this->getsectiontable();
            if ($sectiontable->updateSection($id, array('status' => 'N'))) {

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