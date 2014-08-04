<?php
namespace Source\Model;

 // Add these import statements
 use Zend\InputFilter\Factory as InputFactory;
 use Zend\InputFilter\InputFilter;
 use Zend\InputFilter\InputFilterAwareInterface;
 use Zend\InputFilter\InputFilterInterface;

 class SourceModel implements InputFilterAwareInterface
 {
 	 public $title;
 	 public $source_id;
 	 public $project_id;
 	 public $section_id;

 	 public $status;
 	 public $type;
 	 public $sourcepath;

 	 public $inputFilter;

	 public function exchangeArray($data)
	 {
	 	$this->source_id = (isset($data['source_id'])) ? $data['source_id'] : null;
	 	$this->project_id = (isset($data['project_id'])) ? $data['project_id'] : null;
		$this->title = (isset($data['title'])) ? $data['title'] : null;

		$this->section_id = (isset($data['section_id'])) ? $data['section_id'] : null;
		$this->status = (isset($data['status'])) ? $data['status'] : null;
		$this->type = (isset($data['type'])) ? $data['type'] : null;
		$this->sourcepath = (isset($data['sourcepath'])) ? $data['sourcepath'] : null;
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

			 }
	}
