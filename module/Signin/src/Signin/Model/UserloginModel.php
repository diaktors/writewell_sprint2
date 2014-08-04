<?php
namespace Signin\Model;

 // Add these import statements
 use Zend\InputFilter\Factory as InputFactory;
 use Zend\InputFilter\InputFilter;
 use Zend\InputFilter\InputFilterAwareInterface;
 use Zend\InputFilter\InputFilterInterface;

 class UserloginModel implements InputFilterAwareInterface
 {

	 public $email;
	 public $password;
	 public $user_id;
	 public $status;
	 public $created_date;
	 public $emailkey;

	 protected $inputFilter; // <-- Add this variable

	 public function exchangeArray($data)
	 {

		 $this->email = (isset($data['email'])) ? $data['email'] : null;
		 $this->password = (isset($data['password'])) ? $data['password'] : null;
		 $this->user_id = (isset($data['user_id'])) ? $data['user_id'] : null;
		 $this->status = (isset($data['status'])) ? $data['status'] : null;
		 $this->created_date = (isset($data['created_date'])) ? $data['created_date'] : null;
		 $this->emailkey = (isset($data['emailkey'])) ? $data['emailkey'] : null;



	 }

	 public function getArrayCopy()
	 {
	 	return get_object_vars($this);
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
			 				'name' => 'email',
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
			 				'name' => 'password',
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
