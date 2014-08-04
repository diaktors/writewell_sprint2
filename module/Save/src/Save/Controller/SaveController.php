<?php
namespace Save\Controller;

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

class SaveController extends AbstractRestfulJsonController
{


    protected $NoteTable; // refernce to Note table   (insertion , deletion, )
    protected $SectionTable;
    protected $ProjectTable;
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


    protected function getNoteTable()
    {
        if (!$this->NoteTable) {
            $sm = $this->getServiceLocator();
            $this->NoteTable = $sm->get('Save\Model\NoteTable');
        }
        return $this->NoteTable;
    }

    protected function getProjectTable()
    {
        if (!$this->ProjectTable) {
            $sm = $this->getServiceLocator();
            $this->ProjectTable = $sm->get('Project\Model\ProjectTable');
        }
        return $this->NoteTable;
    }
    protected function getSectionTable()
    {
        if (!$this->SectionTable) {
            $sm = $this->getServiceLocator();
            $this->SectionTable = $sm->get('Section\Model\SectionTable');
        }
        return $this->SectionTable;
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
    {

    }

    public function get($id)
    {

    }

    public function create($data)
    { // Action used for POST requests

        $project_id = 988; // get from request.

        if ($this->isAuthenticated()) {
            $attributes = $this->getRequest()->getContent();

            $object = json_decode($attributes);
            foreach ($object->sections as $sectionObject) {

                $data ['title'] = $sectionObject ['title'];
                $data ['order_id'] = $sectionObject ['orderId'];
                $data ['description'] = $sectionObject ['text'];
                $data ['project_id'] = $project_id;


                if ((!isset($sectionObject['id']) || $sectionObject['id'] == 0)) {


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
            

            /*foreach ($object->notes as $noteObject) {

                $data ['title'] = $noteObject ['title'];
                $data ['order_id'] = $noteObject ['orderId'];
                $data ['description'] = $noteObject ['text'];
                $data ['section_id'] = $project_id;


                if ((!isset($sectionObject['id']) || $sectionObject['id'] == 0)) {


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
             */



        } else {

            $this->response->setStatusCode(401);
            return new JsonModel(array("error" => 'NOT Authorized'));
        }
    }


    public function update($id, $data)
    { // Action used for PUT requests




    }

    public function delete($id)
    { // Action used for DELETE requests



    }





}