<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of unitDocument
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Unit_UnitDocument extends Erems_Box_Models_ObjectEmbedData{
	private $documentType;
	private $unit;
	private $fileName;
	private $description;
	private $Addon;
	private $Addby;
	private $purchaseletter_id;
	private $purchaseletter_no;
	private $customer_name;

	private $folder; // added by rico 20032023
	
	public function __construct() {
		parent::__construct();
		$this->embedPrefix = 'unitdocument_';
	}
	
	public function setArrayTable($dataArray=NULL) {
	
		$x = $dataArray==NULL?$this->arrayTable:$dataArray;
  
		if(isset ($x['unitdocument_id'])){
		   $this->setId($x['unitdocument_id']); 
		}
		if(isset ($x['documenttype_documenttype_id'])){
		   $this->getDocumentType()->setId($x['documenttype_documenttype_id']); 
		}
		if(isset ($x['unit_unit_id'])){
		   $this->getUnit()->setId($x['unit_unit_id']); 
		}
		if(isset ($x['filename'])){
		   $this->setFileName($x['filename']); 
		}
		if(isset ($x['description'])){
		   $this->setDescription($x['description']); 
		}
		if(isset ($x['folder'])){
		   $this->setFolder($x['folder']); 
		}
		if(isset ($x['Addby'])){
		   $this->setAddby($x['Addby']); 
		}
		if(isset ($x['Addon'])){
		   $this->setAddon(date("d-m-Y H:i:s", strtotime($x['Addon']))); 
		}
		if(isset ($x['purchaseletter_id'])){
		   $this->setPurchaseletter_id($x['purchaseletter_id']); 
		}
		if(isset ($x['purchaseletter_no'])){
		   $this->setPurchaseletter_no($x['purchaseletter_no']); 
		}
		if(isset ($x['customer_name'])){
		   $this->setCustomer_name($x['customer_name']); 
		}
				
		unset($x);
	}
	
	public function getArrayTable(){
		$x = array(
			"unitdocument_id"              => $this->getId(),
			"documenttype_documenttype_id" => $this->getDocumentType()->getId(),
			"unit_unit_id"                 => $this->getunit()->getId(),
			"filename"                     => $this->getFileName(),
			"description"                  => $this->getDescription(),
			"folder"                       => $this->getFolder(),
			"Addby"                        => $this->getAddby(),
			"Addon"                        => $this->getAddon(),
			"purchaseletter_id"            => $this->getPurchaseletter_id(),
			"purchaseletter_no"            => $this->getPurchaseletter_no(),
			"customer_name"                => $this->getCustomer_name(),
		);
	  
		return $x;
	}
	
	public function getDocumentType() {
		if(!$this->documentType){
			$this->documentType = new Erems_Models_Master_DocumentType();
		}
		return $this->documentType;
	}

	public function getunit() {
		if(!$this->unit){
			$this->unit = new Erems_Models_Master_Unit();
		}
		return $this->unit;
	}

	public function getFileName() {
		return $this->fileName;
	}

	public function getDescription() {
		return $this->description;
	}

	// added by rico 20032023
	public function getFolder() {
		return $this->folder;
	}

	public function setDocumentType(Erems_Models_Master_DocumentType $documentType) {
		$this->documentType = $documentType;
	}

	public function setunit(Erems_Models_Master_Unit $unit) {
		$this->unit = $unit;
	}

	public function setFileName($fileName) {
		$this->fileName = $fileName;
	}

	public function setDescription($description) {
		$this->description = $description;
	}

	// added by rico 20032023
	public function setFolder($folder) {
		$this->folder = $folder;
	}

	public function setAddby($Addby) {
		$this->Addby = $Addby;
	}

	public function getAddby() {
		return $this->Addby;
	}

	public function setAddon($Addon) {
		$this->Addon = $Addon;
	}

	public function getAddon() {
		return date("d-m-Y H:i:s", strtotime($this->Addon));
	}

	public function setPurchaseletter_id($purchaseletter_id) {
		$this->purchaseletter_id = $purchaseletter_id;
	}

	public function getPurchaseletter_id() {
		return $this->purchaseletter_id;
	}

	public function setPurchaseletter_no($purchaseletter_no) {
		$this->purchaseletter_no = $purchaseletter_no;
	}

	public function getPurchaseletter_no() {
		return $this->purchaseletter_no;
	}

	public function setCustomer_name($customer_name) {
		$this->customer_name = $customer_name;
	}

	public function getCustomer_name() {
		return $this->customer_name;
	}
}