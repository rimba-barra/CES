<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Groupposition
 *
 * @author MIS
 */
class Hrd_Models_Master_GroupPosition extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora {
    
    private $name;
    private $code;
    private $description;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "groupposition_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['groupposition_id'])){
           $this->setId($x['groupposition_id']); 
        }
        if(isset ($x['groupposition'])){
           $this->setName($x['groupposition']); 
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
            'groupposition_id'=>$this->getId(),
            'groupposition'=>$this->getName(),
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
