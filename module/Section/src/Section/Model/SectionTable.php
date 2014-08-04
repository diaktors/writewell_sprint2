<?php

namespace Section\Model;

use Zend\Db\TableGateway\TableGateway;
use Section\Model\SectionModel;
use Zend\Db\Sql\Select;

class SectionTable {
	protected $tableGateway;

	public function __construct(TableGateway $tableGateway) {
		$this->tableGateway = $tableGateway;
	}

	public function fetchAll() {
		$resultSet = $this->tableGateway->select ();
		return $resultSet;
	}

	public function getProjectSectionsList($id) {
		$project_id = ( int ) $id;
		$resultSet = $this->tableGateway->select ( array (
				'project_id' => $project_id,'status'=>'Y'
		) );

		return $resultSet;
	}


	public function getProjectSectionsListByOrderId($id) {
		$project_id = ( int ) $id;

		$select= new Select();
		$select->from('section_table');
		$select->where(array('status'=>'y','project_id'=>$project_id));
		$select->order('order_id');

		$resultSet = $this->tableGateway->selectwith($select);

		return $resultSet;
	}

	public function getUserSection($section_id) {

		$section_id=(int)$section_id;

		$rowSet = $this->tableGateway->select ( array (
				 'section_id'=>$section_id,'status'=>'Y'
		) );

		return $rowSet->current();
	}

	public function createSection(SectionModel $sec) {


		$data = array (
				'title' => $sec->title,
				'order_id' => $sec->order_id,
				'description' => $sec->description,
				'project_id' => (int)$sec->project_id

		);
		$this->tableGateway->insert ( $data );
		$id = $this->tableGateway->lastInsertValue;
			 	return $id;
	}

	public function updateSection($section_id,$data)
	{


		$this->tableGateway->update($data,array('section_id'=>(int)$section_id));

	}
	public function deleteSection($id)
	{
		$this->tableGateway->delete(array('section_id' => (int)$id));
	}


}