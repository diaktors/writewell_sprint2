<?php

namespace Project\Model;

use Zend\Db\TableGateway\TableGateway;
use Project\Model\ProjectModel;


class ProjectTable {

	protected $tableGateway;

	public function __construct(TableGateway $tableGateway) {
		$this->tableGateway = $tableGateway;
	}

	public function fetchAll() {
		$resultSet = $this->tableGateway->select ();
		return $resultSet;
	}

	public function getUserProjectList($id) {
		$user_id = ( int ) $id;
		$resultSet = $this->tableGateway->select ( array (
				'user_id' => $id,'status'=>'Y'
		) );

		return $resultSet;
	}

	public function getUserProject($project_id) {

		$project_id=(int)$project_id;

		$rowSet = $this->tableGateway->select ( array (
				 'project_id'=>$project_id,'status'=>'Y'
		) );

		return $rowSet->current();
	}

	public function createProject(ProjectModel $proj) {
		$data = array (
				'title' => $proj->title,
				'created' =>date("Y-m-d h:i:s"),
				'user_id' => $proj->user_id,
				'project_templateId' => $proj->project_templateId
		);
		$this->tableGateway->insert ( $data );
		$id = $this->tableGateway->lastInsertValue;
			 	return $id;
	}

	public function updateProject($id,$data)
	{
		try{

            return  ($this->tableGateway->update($data,array('project_id'=>(int)$id)));


		}
		catch (\Exception $e){
			return 0;
		}
	}

	public function deleteProject($id)
	{
		$this->tableGateway->delete(array('project_id' => (int)$id));
	}


}