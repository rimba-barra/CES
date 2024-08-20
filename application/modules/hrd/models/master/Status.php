<?php

/**
 * Description of Status
 *
 * @author MIS
 */
class Hrd_Models_Master_Status extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora {
    private $name;
    private $description;
    private $startDate;
    private $endDate;
    
    
    
    public function __construct($prefix=NULL) {
        parent::__construct();
        $this->embedPrefix = $prefix?$prefix:"employeestatus_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['employeestatus_id'])){
           $this->setId($x['employeestatus_id']); 
        }
        if(isset ($x['employeestatus'])){
           $this->setName($x['employeestatus']); 
        }
        if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
       
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'employeestatus_id'=>$this->getId(),
            'employeestatus'=>$this->getName(),
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
    
    public function getStartDate() {
        return $this->startDate;
    }

    public function setStartDate($startDate) {
        $this->startDate = $startDate;
    }

    public function getEndDate() {
        return $this->endDate;
    }

    public function setEndDate($endDate) {
        $this->endDate = $endDate;
    }




}

?>
