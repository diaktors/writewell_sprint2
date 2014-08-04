<?php

namespace Mailcheck\Controller;

use Zend\Mvc\Controller\AbstractActionController;

use Zend\View\Model\ViewModel;
use Forgetpassword\Form\Userlogin;
use Forgetpassword\Model\UserloginModel;
use Forgetpassword\Form\Userresetlogin;
use Forgetpassword\Form\Userreset;
use Forgetpassword\Model\UserresetModel;
use PHPMailer;
//use Zend\Session\Container;

/**
 * forgetpasswordController
 *
 * @author
 *
 * @version
 *
 */
class MailcheckController extends AbstractActionController {
	/**
	 * The  controller to send email to
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

		// send a email to user containing verification link

		$usermail  =$_POST['email'];









				$sign = $this->getUserloginTable()->forgetpassword($usermail);


                if($sign!='')
                {
                	$original_string = 'ABCDEFGHIJKLMabcdefghijklmNOPQRSTUVWXYZnopqrstuvwxyz';
                	$random_string =$this->get_random_string($original_string, 6);






                	$data= $this->getUserloginTable()->setemailkey($sign, $random_string);

                 	$email= $usermail;
                	$userid= $sign;

                	if($_SERVER ['HTTP_HOST']=="localhost")
						$url = 	 'http://' . $_SERVER ['HTTP_HOST'] .'/writewell/public/mailcheck/verify/'.$userid.'/'.$random_string;
					else
						$url = 'http://' . $_SERVER ['HTTP_HOST'] .'/mailcheck/verify/'.$userid.'/'.$random_string;




               	 //send mail
                    $to   =$email;
                    $from ="snallam@rapidbizapps.com";
			        $subject = "Password reset";
			        $body = "Hi $to <br/>Please verify your email by clicking on the following link. .<br/>
			                  ".$url."
			                  <br />


			      .<br/>Thanking you. <br/>Admin"; // HTML  tags
			      $mail = new \PHPMailer();
			      $mail->IsSMTP(true); // SMTP
			      $mail->SMTPAuth   = true;  // SMTP authentication
			      $mail->Mailer = "smtp";
			      $mail->Host= "tls://smtp.gmail.com"; // GMail SMTP
			      $mail->Port = 465;  // SMTP Port
			     /*
			      $mail->Host= "localhost"; // Amazon SES
			      $mail->Port = 25;  // SMTP Port
			      */ $mail->Username = "snallam@rapidbizapps.com";  // SMTP  Username
			      $mail->Password = "9441857479fb90";  // SMTP Password
			      $mail->SetFrom($from, 'writewell dev');
			      $mail->AddReplyTo($from,'writewell dev');
			                	      $mail->Subject = $subject;
			                	      $mail->MsgHTML($body);
			                	      $address = $to;
			                	      $mail->AddAddress($address, $to);
			                	        $mail->Send();

          print_r($mail);

			                	      //send mail ends

                	//ends

                }
                else
                	{

                		print_r("emailfailed");
                		$this->getServiceLocator()->get('Zend\Log')->info('Wrong Username.');

                	}

                	print_r($url);

                	die();

	}

	public function verifyAction() {


	    // to be implemented

        /*
         *  change the user status to Y from N  and redirect the user to writewell for login
         */


		$user_id = $this->params ()->fromRoute ( 'id', 0 );
		$key = $this->params ()->fromRoute ( 'key', 0 );


		$data= $this->getUserloginTable()->checkemailkey($user_id, $key);

		$data=1;

		if($data==1)
		{
			$this->getUserloginTable()->setemailkey($user_id, null);
			$redirect = \ServerapiUtil::getClientUrl().'#signIn';

			header ( 'Location: ' . filter_var ( $redirect, FILTER_SANITIZE_URL ) );
			exit();

		}


	}

	public function checkmailAction()
	{


		return new ViewModel(array());

	}
}