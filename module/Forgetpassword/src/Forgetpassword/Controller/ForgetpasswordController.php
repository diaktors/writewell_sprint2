<?php

namespace Forgetpassword\Controller;

use Zend\Mvc\Controller\AbstractActionController;

use Zend\View\Model\ViewModel;
use Forgetpassword\Form\Userlogin;
use Forgetpassword\Model\UserloginModel;
use Forgetpassword\Form\Userresetlogin;
use Forgetpassword\Form\Userreset;
use Forgetpassword\Model\UserresetModel;
use Talent\Lib\PHPMailer;
//use Zend\Session\Container;

/**
 * forgetpasswordController
 *
 * @author
 *
 * @version
 *
 */
class ForgetpasswordController extends AbstractActionController {
	/**
	 * The default action - show the home page
	 */

	protected $userloginTable;

	protected function getUserloginTable()
	{
		if(!$this->userloginTable) {
			$sm = $this->getServiceLocator();
			$this->userloginTable = $sm->get('Signin\Model\UserloginTable');
		}
		return $this->userloginTable;
	}

	protected function get_random_string($valid_chars, $length)
	{
		// start with an empty random string
		$random_string = "";

		// count the number of chars in the valid chars string so we know how many choices we have
		$num_valid_chars = strlen($valid_chars);

		// repeat the steps until we've created a string of the right length
		for ($i = 0; $i < $length; $i++)
		{
		// pick a random number from 1 up to the number of valid chars
			$random_pick = mt_rand(1, $num_valid_chars);

			// take the random character out of the string of valid chars
			// subtract 1 from $random_pick because strings are indexed starting at 0, and we started picking at 1
			$random_char = $valid_chars[$random_pick-1];

			// add the randomly-chosen char onto the end of our string so far
			$random_string .= $random_char;
		}

		// return our finished random string
		return $random_string;
	}

	public function indexAction() {
		// TODO Auto-generated SignoutController::indexAction() default action

	  // Return to index page.
		//$this->redirect()->toRoute('application',array('action'=>'index'));
		$form = new Userlogin();

		$request = $this->getRequest();

		if ($request->isPost()) {
			$signin = new UserloginModel();
			$form->setInputFilter($signin->getInputFilter());
			$form->setData($request->getPost());
			if ($form->isValid()) {
				$signin->exchangeArray($form->getData());

				$sign = $this->getUserloginTable()->forgetpassword($signin->user_email);
                if($sign!='')
                {
                	$original_string = 'ABCDEFGHIJKLMabcdefghijklmNOPQRSTUVWXYZnopqrstuvwxyz';
                	$random_string =$this->get_random_string($original_string, 6);

                	$data= $this->getUserloginTable()->resetpassword($sign, $random_string);

               	$email= $signin->user_email;
                	$userid= $sign;

                	//mail
                	$url ="draken-dev.rapidbizapps.com/forgetpassword/resetpassword/$userid/$random_string";
               	 //send mail
                    $to   =$email;
                    $from ="missionrnd@rapidbizapps.com";
			        $subject = "Password reset";
			      $body = "Hi $to <br/>Please change the password by clicking on the following link. .<br/>
			                  ".$url."
			                  <br />
			                 Your password is :  ".$random_string." <br />
			                 Please change it.

			      .<br/>Thanking you. <br/>Admin"; // HTML  tags
			      $mail = new \PHPMailer();
			      $mail->IsSMTP(true); // SMTP
			      $mail->SMTPAuth   = true;  // SMTP authentication
			      $mail->Mailer = "smtp";
			      $mail->Host= "localhost"; // Amazon SES
			      $mail->Port = 25;  // SMTP Port
			      $mail->Username = "";  // SMTP  Username
			      $mail->Password = "";  // SMTP Password
			      $mail->SetFrom($from, 'draken-dev');
			      $mail->AddReplyTo($from,'draken-dev');
			                	      $mail->Subject = $subject;
			                	      $mail->MsgHTML($body);
			                	      $address = $to;
			                	      $mail->AddAddress($address, $to);
			                	      $mail->Send();
			                	      //send mail ends

                	//ends
        	                	      $this->redirect()->toRoute('forgetpassword',array('action'=>'checkmail'));
                }
                else
                	{
                		$this->getServiceLocator()->get('Zend\Log')->info('Wrong Username.');
                		$this->flashMessenger()->addMessage('Wrong Username.');
                		$this->redirect()->toRoute('forgetpassword',array('action'=>'index'));
                	}
			}
		}
		 return new ViewModel(array('form1'=>$form,  'flashMessages' => $this->flashMessenger()->getMessages()));
	}

	public function resetpasswordAction() {


	    $id =  $this->params ()->fromRoute ( 'id', 0 );
	    $password =  $this->params ()->fromRoute ( 'password', 0 );


		$request = $this->getRequest();

		if ($request->isPost()) {
			$signin = new UserresetModel();
			$form->setInputFilter($signin->getInputFilter());
			$form->setData($request->getPost());
			if ($form->isValid()) {
				$signin->exchangeArray($form->getData());
				$userid= $request->getPost('user_id');

				if ($userid!='')
				{
		    	$userdeatils= 	$this->getUserloginTable()->getUser($userid);
		    	$password   = 	$request->getPost('old_email');
		    	$newpassword = $request->getPost('new_email');
		    	$confirmpassword = $request->getPost('confirm_email');
		    	//check for the password entered matched or not
		    	if($userdeatils!='')
		    	{

		    	 	$email = $userdeatils->user_email;
              	$oldpassword=  $this->getUserloginTable()->userverify($email, $password);

                    //  if ($oldpassword->user_id != 0)
                   // {


                    	if($newpassword==$confirmpassword)
                    	{
                          $newdata= $this->getUserloginTable()->resetpassword($userid, $newpassword);

                    	  $this->redirect()->toRoute('application',array('action'=>'index'));

                    	 }

                  //    }
		    	// else
                //	{
                //		$this->getServiceLocator()->get('Zend\Log')->info('Wrong password enter.');
                //		$this->flashMessenger()->addMessage('Wrong password.');
                //		$this->redirect()->toRoute('forgetpassword',array('action'=>'resetpassword'));
                //	}

		    	}
				else
                	{
                		$this->getServiceLocator()->get('Zend\Log')->info('Wrong user enter.');
                		$this->flashMessenger()->addMessage('Wrong user try.');
                		$this->redirect()->toRoute('forgetpassword',array('action'=>'resetpassword'));
                	}
		    //	print_r ($userdeatils);
				}
				}
		}
		return new ViewModel(array('form1'=>$form,'id'=>$id,'password' =>$password,  'flashMessages' => $this->flashMessenger()->getMessages()));

	}

	public function checkmailAction()
	{


		return new ViewModel(array());

	}
}