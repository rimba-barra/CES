<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Type
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Utility_Type extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Kouti_Remora{
    private $name;
    private $description;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "utilitytype_";
    }
    
    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['utilitytype_id'])){
           $this->setId($x['utilitytype_id']); 
        }
        
        if(isset ($x['utilitytype'])){
           $this->setName($x['utilitytype']); 
        }
        
        if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
        
        
        
        unset($x);
    }
    
    public function getArrayTable() {
        $x = array(
            'utilitytype_id'=>$this->getId(),
            'utilitytype'=>$this->getName(),
            'description'=>$this->getDescription()
            
        );
        
        return $x;
    }
    
    public function getName() {
        return $this->name;
    }

    public function getDescription() {
        return $this->description;
    }

    public function setName($name) {
        $this->name = $name;
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

//put your code here
}
