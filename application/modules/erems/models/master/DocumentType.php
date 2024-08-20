<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of DocumentType
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Master_DocumentType extends Erems_Box_Models_ObjectEmbedData {
    private $name;
    private $documentcategory_id;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = 'documenttype_';
    }
    
    public function setArrayTable($dataArray=NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['documenttype_id'])){
           $this->setId($x['documenttype_id']); 
        }
        if(isset ($x['documenttype'])){
           $this->setName($x['documenttype']); 
        }
        if(isset ($x['documentcategory_id'])){
           $this->setDocumentcategory_id($x['documentcategory_id']); 
        }
      
    }
    
    public function getArrayTable(){
        $x = array();
        $x['documenttype_id'] = $this->getId();
        $x['documenttype']  = $this->getName();
        $x['documentcategory_id']  = $this->getDocumentcategory_id();
        
        return $x;
    }
    
    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }
    
    public function getDocumentcategory_id() {
        return $this->documentcategory_id;
    }

    public function setDocumentcategory_id($documentcategory_id) {
        $this->documentcategory_id = $documentcategory_id;
    }


}
