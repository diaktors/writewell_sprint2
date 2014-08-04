<?php
namespace Signup\Model;
use Zend\Db\TableGateway\TableGateway;
use Signup\Model\UsersignupModel;
use Zend\Db\Sql\Select;

class UsersignupTable {

	protected $tableGateway;

    public function __construct(TableGateway $tableGateway)
	 {
		 $this->tableGateway = $tableGateway;
		 }

		 public function fetchAll()
		 {
			 $resultSet = $this->tableGateway->select();
			 return $resultSet;
			 }


			 public function savenewuserdetails(UsersignupModel $userreg)
			 {


			 	$data = array (
			 		'user_id' =>$userreg->user_id,
			 		'name' =>$userreg->name,
			 		'age'=>$userreg->age,
			 		'occupation'   =>$userreg->occupation,
			 		'gender'   =>$userreg->gender,

			 	);

			 	$this->tableGateway->insert($data);
			 	$id = $this->tableGateway->lastInsertValue;

			 	return $id;
			 }



}