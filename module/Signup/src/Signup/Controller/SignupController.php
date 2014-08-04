<?php

/**
 * Zend Framework (http://framework.zend.com/)
 *
 * @link      http://github.com/zendframework/ZendSkeletonApplication for the canonical source repository
 * @copyright Copyright (c) 2005-2013 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */
namespace Signup\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Signin\Model\UserloginModel;
use Signup\Model\UsersignupModel;


use Google_Client;
use Google_Service_Plus;





class SignupController extends AbstractActionController {


	protected $userloginTable;
	protected $usersignupTable;

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



	public function indexAction() {


		$this->getResponse()->getHeaders()
		//make can accessed by *
		->addHeaderLine('Access-Control-Allow-Origin','*')
		//set allow methods
		->addHeaderLine('Access-Control-Allow-Methods','POST PUT DELETE GET');


		$user_signup_details=json_decode($this->getRequest()->getContent());


		/* user details split into two
		 * in signup personal details
		 *
		 * in signin username(email) & password and status (active or inactive user)
		 *
		 * */

		$data['email']=$user_signup_details->email;
		$data['password']=$user_signup_details->password;

		$user=$this->getUserloginTable();
		$userreg=new UserloginModel();
		$userreg->exchangeArray($data);

		if($userreg->getInputFilter()->setData($data)->isValid())
			$result_row=$user->savenewuser($userreg);
		else
		{
			print_r( json_encode(array('status'=>0,'message'=>'Please  fill required fields')) );
			return $this->response;
		}



        $id=$result_row['id'];

		if($result_row['status']==0)
		{
			print_r( json_encode(array('status'=>0,'message'=>'This email is already in use')) );
			return $this->response;
		}

		/*
		 * $id is unique id for signin table
		*
		* making this as base
		*
		* user details age, occupation name, gender  are saved to signup table
		*/


		$signup_data['user_id']=(int)$id;
		$signup_data['name']=$user_signup_details->name;

		$signup_data['age']=isset($user_signup_details->age)?(int)$user_signup_details->age:null;

		$signup_data['occupation']=isset($user_signup_details->occupation)?(int)$user_signup_details->occupation:null;
		$signup_data['gender']=isset($user_signup_details->gender)?$user_signup_details->gender:null;


		$user=$this->getUsersignupTable();

		$userreg=new UsersignupModel();
		$userreg->exchangeArray($signup_data);


		if($userreg->getInputFilter()->setData($signup_data)->isValid())
		 		$user->savenewuserdetails($userreg);
		else
		{
			print_r( json_encode(array('status'=>0,'msg'=>'Please  fill required fields')) );
			return $this->response;
		}

		$signup_data['email']=$user_signup_details->email;
		print_r( json_encode(array('status'=>1,'result'=>$signup_data)) );


		return $this->response;


	}

}
