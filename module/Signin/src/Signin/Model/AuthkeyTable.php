<?php
namespace Signin\Model;
use Zend\Db\TableGateway\TableGateway;
use Signin\Model\UserloginModel;
use Zend\Db\Sql\Select;

class AuthkeyTable {

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

			 public function getAuth($id)
			 {
				 $user_id = (int) $id;
				 $rowset = $this->tableGateway->select(array('user_id' => $id));
				 $row = $rowset->current();

				 if(!$row)
				 	return 0;
				 else
				 return $row;
			 }

			 //verify the auth key and vale to return the valid user.
			 public function ValidateAuth($authkey,$authvalue)
			 {
			 	$rowset = $this->tableGateway->select(array('auth' => $authkey,'authvalue'=>$authvalue));
			 	$row = $rowset->current();
			 	if(!$row)
			 		return 0;
			 	else
			 		return $row;
			 }

			 //ends


			//generate and store the new authkey and parameter.
			public function  InsertAuth($user_id)
			{

				$year = (int) date("Y");
				$month = (int) date("m");
				$day = (int) date("d");
				$now = time(); // or your date as well

				$your_date = strtotime("$year-01-01");
				$datediff = $now - $your_date;
				$jd = floor($datediff / (60 * 60 * 24)) + 1; // add one so that it satisfy the condition.
				if (strlen($jd) == 1)
					$jdd = '00' . $jd;
				else if (strlen($jd) == 2)
					$jdd = '0' . $jd;
				else
					$jdd = $jd;

				$date =date("Y-m-d H:i:s");
				$today = $year . $jdd . $user_id.$date;
				$authvalue = md5($today).''.sha1($date) ;
				$authname =$today;



				$idd= $this->getAuth($user_id);

				if(is_int($idd) && $idd==0 )
				{
					$data = array (
							'user_id'         =>$user_id,
							'auth'            =>$today,
							'authvalue'       =>$authvalue,
							'status'          =>'Y',
							'inserted'        =>$date,
					);


				$this->tableGateway->insert($data);
			 	}
				else
				{
					$data = array (
							'auth'            =>$today,
							'authvalue'       =>$authvalue,
							'status'          =>'Y',
							'inserted'        =>$date,
					);

					$this->tableGateway->update($data,array('au_id'=>$idd->au_id));

				}
				}
			//ends

}