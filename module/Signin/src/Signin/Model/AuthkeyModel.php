<?php
namespace Signin\Model;

 // Add these import statements
 use Zend\InputFilter\Factory as InputFactory;
 use Zend\InputFilter\InputFilter;
 use Zend\InputFilter\InputFilterAwareInterface;
 use Zend\InputFilter\InputFilterInterface;

 class AuthkeyModel implements InputFilterAwareInterface
 {
 	 public $au_id;
	 public $user_id;
	 public $auth;
	 public $authvalue;
	 public $status;
     public $inserted;
	 protected $inputFilter; // <-- Add this variable

	 public function exchangeArray($data)
	 {
		 $this->au_id = (isset($data['au_id'])) ? $data['au_id'] : null;
		 $this->user_id = (isset($data['user_id'])) ? $data['user_id'] : null;
		 $this->auth = (isset($data['auth'])) ? $data['auth'] : null;
		 $this->authvalue = (isset($data['authvalue'])) ? $data['authvalue'] : null;
		$this->status = (isset($data['status'])) ? $data['status'] : null;
		$this->inserted = (isset($data['inserted'])) ? $data['inserted'] : null;
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
			 	 		$this->inputFilter = $inputFilter;
			 	}
			 	return $this->inputFilter;
			 }
			 }
