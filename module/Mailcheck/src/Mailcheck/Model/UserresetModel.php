<?php
namespace Forgetpassword\Model;

 // Add these import statements
 use Zend\InputFilter\Factory as InputFactory;
 use Zend\InputFilter\InputFilter;
 use Zend\InputFilter\InputFilterAwareInterface;
 use Zend\InputFilter\InputFilterInterface;
 
 class UserresetModel implements InputFilterAwareInterface
 {
 	 public $user_id;
	 public $old_email;
	 public $confirm_email;
	 public $new_email;
	 protected $inputFilter; // <-- Add this variable
	
	 public function exchangeArray($data)
	 {
		 $this->user_id = (isset($data['user_id'])) ? $data['user_id'] : null;
		 $this->old_email = (isset($data['old_email'])) ? $data['old_email'] : null;
		 $this->new_email = (isset($data['new_email'])) ? $data['new_email'] : null;
		 $this->confirm_email = (isset($data['confirm_email'])) ? $data['confirm_email'] : null;
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
			 				'name' => 'old_email',
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
			 		
			 		$inputFilter->add ( $factory->createInput ( array (
			 				'name' => 'new_email',
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
			 		$inputFilter->add ( $factory->createInput ( array (
			 				'name' => 'confirm_email',
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
			 		
			 		$inputFilter->add ( $factory->createInput ( array (
			 				'name' => 'user_id',
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
			  