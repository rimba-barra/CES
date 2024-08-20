<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of RangkingPA
 *
 * @author MIS
 */
class Hrd_Models_Master_RangkingPA extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora  {
    private $name;
    private $point;
    private $percent;
    private $description;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "rangkingpa_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['rangkingpa_id'])){
           $this->setId($x['rangkingpa_id']); 
        }
        if(isset ($x['name'])){
           $this->setName($x['name']); 
        }
        if(isset ($x['point'])){
           $this->setPoint($x['point']); 
        }
        if(isset ($x['percent'])){
           $this->setPercent($x['percent']); 
        }
        if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
       
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'rangkingpa_id'=>$this->getId(),
            'name'=>$this->getName(),
            'point'=>$this->getPoint(),
            'percent'=>$this->getPercent(),
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

    public function getPoint() {
        return $this->point;
    }

    public function setPoint($point) {
        $this->point = (double)$point;
    }

    public function getPercent() {
        return $this->percent;
    }

    public function setPercent($percent) {
        $this->percent = (double)$percent;
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
        
    }    //put your code here
}

?>
