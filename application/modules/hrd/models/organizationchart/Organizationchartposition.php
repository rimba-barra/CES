<?php

class Hrd_Models_Organizationchart_Organizationchartposition extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,  Box_Arried{
    private $position;
    private $position_id; 
    private $description; 

    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "position_";       
    }
    
    public function setArrayTable($dataArray=NULL) {
   
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
  
        if(isset ($x['position_id'])){
           $this->setId($x['position_id']); 
        }
        if(isset ($x['position'])){
           $this->setPosition($x['position']); 
        }
        if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
        unset($x);        
    }
    
    public function getArrayTable(){
        $x = array(
            "position_id"=>$this->getId(),
            "position"=>$this->getPosition() ,
            "description"=>$this->getDescription()    
        );      
        return $x;
    }
    
    function getPosition() {
        return $this->position;
    }

    function getPosition_id() {
        return $this->position_id;
    }

    function getDescription() {
        return $this->description;
    }
    
    function setPosition($position) {
        $this->position = $position;
    }

    function setPosition_id($position_id) {
        $this->position_id = $position_id;
    }
    
    function setDescription($description) {
        $this->description = $description;
    }
    
    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getReligion(),$this->getBloodGroup(),$this->getMarriage(),$this->getLastEducation(),$this->getStatus(),$this->getStatusInformation());
    }

    public function getArray() {
        return $this->getArrayTable();
    }


}

?>