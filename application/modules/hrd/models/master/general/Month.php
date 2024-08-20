<?php

/**
 * Description of Month
 *
 * @author MIS
 */
class Hrd_Models_Master_General_Month extends Box_Models_ObjectEmbedData {
    private $name;
    private $maxDay;
    private $startDay;
    
    
    
   
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "month_"; 
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['month_id'])){
           $this->setId($x['month_id']); 
        }
         if(isset ($x['name'])){
           $this->setName($x['name']); 
        }
        if(isset ($x['maxday'])){
           $this->setMaxDay($x['maxday']); 
        }
        if(isset ($x['startday'])){
           $this->setStartDay($x['startday']); 
        }
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'month_id'=>$this->getId(),
            'name'=>$this->getName(),
            'maxday'=>$this->getMaxDay(),
            'startday'=>$this->getStartDay()
        );
      
        return $x;
    }
    
    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function getMaxDay() {
        return $this->maxDay;
    }

    public function setMaxDay($maxDay) {
        $this->maxDay = $maxDay;
    }

    public function getStartDay() {
        return $this->startDay;
    }

    public function setStartDay($startDay) {
        $this->startDay = $startDay;
    }


}

?>
