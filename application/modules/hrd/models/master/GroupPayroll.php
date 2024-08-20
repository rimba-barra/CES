<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Grouppayroll
 *
 * @author MIS
 */
class Hrd_Models_Master_GroupPayroll extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora {
    
    private $name;
    private $code;
    private $description;
    
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "grouppayroll_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['grouppayroll_id'])){
           $this->setId($x['grouppayroll_id']); 
        }
        if(isset ($x['grouppayroll'])){
           $this->setName($x['grouppayroll']); 
        }
        if(isset ($x['code'])){
           $this->setCode($x['code']); 
        }
        if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
       
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'grouppayroll_id'=>$this->getId(),
            'grouppayroll'=>$this->getName(),
            'code'=>$this->getCode(),
            'description'=>$this->getDescription()
        );
      
        return $x;
    }
    
    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }
    
    public function getCode() {
        return $this->code;
    }

    public function setCode($code) {
        $this->code = $code;
    }

    public function getDescription() {
        return $this->description;
    }

    public function setDescription($description) {
        $this->description = $description;
    }

    
        
    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }    
}

?>
