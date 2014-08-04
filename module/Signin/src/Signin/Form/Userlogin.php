<?php
namespace Signin\Form;
use Zend\Form\Form;

class Userlogin extends Form
{
	public function __construct($name = null)
	{
		parent::__construct("Userlogin");

		$this->setAttribute('method', 'post');

		$this->add(array(
				'name' => 'user_email',
				'attributes' => array(
						'type'  => 'text',
						'placeholder' => 'Username',
					
				),
		));
		$this->add(array(
				'name' => 'password',
				'attributes' => array(
						'type'  => 'Password',
						'placeholder' => 'Password',
					
						
				),
		));
		$this->add(array(
				'name' => 'signupbutton',
				'attributes' => array(
						'type'  => 'submit',
						'value' => 'Login',
					
						'class' => 'btn btn-default button-height', 
				),
		));
		
			}
}	