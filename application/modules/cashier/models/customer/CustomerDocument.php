<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of CustomerDocument
 *
 * @author TOMMY-MIS
 */
class Cashier_Models_Customer_CustomerDocument extends Cashier_Box_Models_ObjectEmbedData{
    private $documentType;
    private $customer;
    private $fileName;
    private $description;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = 'customerdocument_';
    }
    
    
    public function setArrayTable($dataArray=NULL) {
    
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
  
        if(isset ($x['customerdocument_id'])){
           $this->setId($x['customerdocument_id']); 
        }
        if(isset ($x['documenttype_documenttype_id'])){
           $this->getDocumentType()->setId($x['documenttype_documenttype_id']); 
        }
        if(isset ($x['customer_customer_id'])){
           $this->getCustomer()->setId($x['customer_customer_id']); 
        }
        if(isset ($x['filename'])){
           $this->setFileName($x['filename']); 
        }
        if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
        
        unset($x);
        
    }
    
    public function getArrayTable(){
        $x = array(
            "customerdocument_id"=>$this->getId(),
            "documenttype_documenttype_id"=>$this->getDocumentType()->getId(),
            "customer_customer_id"=>$this->getCustomer()->getId(),
            "filename"=>$this->getFileName(),
            "description"=>$this->getDescription(),
        );
      
        return $x;
    }
    
    
    
    public function getDocumentType() {
        if(!$this->documentType){
            $this->documentType = new Cashier_Models_Master_DocumentType();
        }
        return $this->documentType;
    }

    public function getCustomer() {
        if(!$this->customer){
            $this->customer = new Cashier_Models_Master_Customer();
        }
        return $this->customer;
    }

    public function getFileName() {
        return $this->fileName;
    }

    public function getDescription() {
        return $this->description;
    }

    public function setDocumentType(Cashier_Models_Master_DocumentType $documentType) {
        $this->documentType = $documentType;
    }

    public function setCustomer(Cashier_Models_Master_Customer $customer) {
        $this->customer = $customer;
    }

    public function setFileName($fileName) {
        $this->fileName = $fileName;
    }

    public function setDescription($description) {
        $this->description = $description;
    }


}
