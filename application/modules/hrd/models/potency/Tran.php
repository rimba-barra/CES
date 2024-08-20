<?php

/**
 * Description of Tran
 *
 * @author MIS
 */
class Hrd_Models_Potency_Tran extends Box_Models_ObjectEmbedData implements Box_Arried{
     private $potency;
     private $employee;
     private $value;
     private $list;
     private $isActive;
     
     public function __construct() {
         parent::__construct();
         $this->embedPrefix = "potencytran_";
     }
     
     public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['employeepotency_id'])){
           $this->setId($x['employeepotency_id']); 
        }
        if(isset ($x['potency_id'])){
           $this->getPotency()->setId($x['potency_id']); 
        }
        if(isset ($x['employee_id'])){
           $this->getEmployee()->setId($x['employee_id']); 
        }
        if(isset ($x['value'])){
           $this->setValue($x['value']); 
        }
        if(isset ($x['is_active'])){
           $this->setIsActive($x['is_active']); 
        }
        if(isset ($x['list'])){
           $this->setList($x['list']); 
        }
       
       
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'employeepotency_id'=>$this->getId(),
            'potency_id'=>$this->getPotency()->getId(),
            'employee_id'=>$this->getEmployee()->getId(),
            'value'=>$this->getValue(),
            'is_active'=>$this->getIsActive(),
            'list'=>$this->getList()
        );
      
        return $x;
    }
     
     public function getPotency() {
         if(!$this->potency){
             $this->potency = new Hrd_Models_Potency_Potency();
         }
         return $this->potency;
     }

     public function setPotency(Hrd_Models_Potency_Potency $potency) {
         $this->potency = $potency;
     }

     public function getEmployee() {
         if(!$this->employee){
             $this->employee = new Hrd_Models_Master_Employee();
         }
         return $this->employee;
     }

     public function setEmployee(Hrd_Models_Master_Employee $employee) {
         $this->employee = $employee;
     }

     public function getValue() {
        
         return $this->value;
     }

     public function setValue($value) {
         $this->value = $value;
     }

     public function getList() {
         return $this->list;
     }

     public function setList($list) {
         $this->list = $list;
     }

     public function getIsActive() {
         return $this->isActive;
     }

     public function setIsActive($isActive) {
         $this->isActive = $isActive;
     }

     
    public function getArray() {
        return $this->getArrayTable();
    }


}

?>
