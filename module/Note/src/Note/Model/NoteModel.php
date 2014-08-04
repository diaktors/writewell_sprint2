<?php
namespace Note\Model;

 // Add these import statements
 use Zend\InputFilter\Factory as InputFactory;
 use Zend\InputFilter\InputFilter;
 use Zend\InputFilter\InputFilterAwareInterface;
 use Zend\InputFilter\InputFilterInterface;

 class NoteModel implements InputFilterAwareInterface
 {
 	 public $title;
 	 public $note_id;
 	 public $project_id;
 	 public $section_id;
 	 public $description;
 	 public $status;

 	 public $inputFilter;

	 public function exchangeArray($data)
	 {
	 	$this->note_id = (isset($data['note_id'])) ? $data['note_id'] : null;
	 	$this->project_id = (isset($data['project_id'])) ? $data['project_id'] : null;
		$this->title = (isset($data['title'])) ? $data['title'] : null;
		$this->description = (isset($data['description'])) ? $data['description'] : null;
		$this->section_id = (isset($data['section_id'])) ? $data['section_id'] : null;
		$this->status = (isset($data['status'])) ? $data['status'] : null;


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
			 		) );

			 		$inputFilter->add ( $factory->createInput ( array (
			 				'name' => 'description',
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
