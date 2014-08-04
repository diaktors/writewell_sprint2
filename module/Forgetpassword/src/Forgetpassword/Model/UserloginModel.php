<?php
namespace Forgetpassword\Model;

 // Add these import statements
 use Zend\InputFilter\Factory as InputFactory;
 use Zend\InputFilter\InputFilter;
 use Zend\InputFilter\InputFilterAwareInterface;
 use Zend\InputFilter\InputFilterInterface;
 
 class UserloginModel implements InputFilterAwareInterface
 {
 	 public $user_id;
	 public $user_email;
	 public $status;
	 public $inserted;
	 protected $inputFilter; // <-- Add this variable
	
	 public function exchangeArray($data)
	 {
		 $this->user_id = (isset($data['user_id'])) ? $data['user_id'] : null;
		 $this->user_email = (isset($data['user_email'])) ? $data['user_email'] : null;
		 $this->status = (isset($data['status'])) ? $data['status'] : null;
		 $this->inserted = (isset($data['inserted'])) ? $data['inserted'] : null;
		 }
		
		 // Add content to these methods:
		 public function setInputFilter(InputFilterInterface $inputFilter)
		 {
			 throw new \Exception("Not used");
			 }
 		
			 public function getInputFilter() {
			 	if (! $this->inputFilter) {
			 		$inputFilter = new InputFilter ();
			 		$factory = new InputFactory ();
			 		
			 		$inputFilter->add ( $factory->createInput ( array (
			 				'name' => 'user_email',
			 				'required' => true,
			 				'filters' => array (
			 						array (
			 								'name' => 'StripTags'
			 						),
			 						array (
			 								'name' => 'StringTrim'
			 						)
			 				)
			 		)
			 		) );
			 		$this->inputFilter = $inputFilter;
			 	}
			 	return $this->inputFilter;
			 }
			 }
			  