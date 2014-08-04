<?php
namespace Project\Model;

 // Add these import statements
 use Zend\InputFilter\Factory as InputFactory;
 use Zend\InputFilter\InputFilter;
 use Zend\InputFilter\InputFilterAwareInterface;
 use Zend\InputFilter\InputFilterInterface;

 class ProjectModel implements InputFilterAwareInterface
 {
 	 public $title;
 	 public $created;
 	 public $project_id;
 	 public $user_id;
 	 public $status;
 	 public $inputFilter;
 	 public $project_templateId;




	 public function exchangeArray($data)
	 {
	 	$this->user_id = (isset($data['user_id'])) ? $data['user_id'] : null;
	 	$this->project_id = (isset($data['project_id'])) ? $data['project_id'] : null;
		$this->title = (isset($data['title'])) ? $data['title'] : null;
		$this->created = (isset($data['created'])) ? $data['created'] : null;
		$this->status = (isset($data['status'])) ? $data['status'] : null;
		$this->project_templateId = (isset($data['project_templateId'])) ? $data['project_templateId'] : null;


	 }

	 public function getArrayCopy()
	 {
	   $project= get_object_vars($this);
	   return   array('id'=>$project['project_id'],'title'=>$project['title'],'project_templateId'=>$project['project_templateId'],'created'=>$project['created']);
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

			 		/* $inputFilter->add ( $factory->createInput ( array (
			 				'name' => 'title',
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
			 		) ); */




			 		$this->inputFilter = $inputFilter;
			 	}
			 	return $this->inputFilter;

			 }

	}
