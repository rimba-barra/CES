<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of EmergencyContact
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Master_EmergencyContact extends Hrd_Models_Master_Relation{
    private $phoneNumber;
    
    
    public function __construct($embedPrefix = NULL) {
        parent::__construct($embedPrefix);
        $this->embedPrefix = "emgcontact_";
        $type = new Hrd_Models_Master_RelationType();
        $type->setId(Box_Config::getv("RT_EMGCONTACT"));
        $this->setRelationType($type);
        
    }
    
    public function setArrayTable($dataArray=NULL) {
   
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        parent::setArrayTable($x);
        
       
        
        $this->getPhoneNumber()->setArrayTable($x);
        
       
        unset($x);

        
    }
    
  
    
    public function getArrayTable() {
        $x = parent::getArrayTable();
        $y = $this->getPhoneNumber()->getArrayTable();
        $x = array_merge($x,$y);
        $x["relationtype_id"] = Box_Config::getv("RT_EMGCONTACT");
        return $x;
    }
    
    public function getPhoneNumber() {
        if(!$this->phoneNumber){
            $this->phoneNumber = new Hrd_Models_Master_General_PhoneNumber();
        }
        return $this->phoneNumber;
    }

    public function setPhoneNumber($phoneNumber) {
        $this->phoneNumber = $phoneNumber;
    }
    
   

    
}
