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
class Cashier_Models_Master_DocumentType extends Cashier_Box_Models_ObjectEmbedData {
    private $name;
    
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
      
    }
    
    public function getArrayTable(){
        $x = array();
        $x['documenttype_id'] = $this->getId();
        $x['documenttype']  = $this->getName();
        
        return $x;
    }
    
    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }


}
