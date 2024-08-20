<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of OpportunityCustomer
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Master_OpportunityCustomer extends Erems_Models_Master_CustomerProfile {
    public function __construct($params=NULL) {
        parent::__construct($params);
        $this->embedPrefix = "opportunitycustomer_";
    }
    
    public function setArrayTable($dataArray = NULL) {
        parent::setArrayTable($dataArray);
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['opportunitycustomer_id'])){
           $this->setId($x['opportunitycustomer_id']); 
        }
        
        
        unset($x);
    }
    
    public function getArrayTable() {
        $x = parent::getArrayTable();
        $y = array(
            'opportunitycustomer_id'=>$this->getId() 
        );
        $x = array_merge($x,$y);
        if($this->getKtp()){
            $y = $this->getKtp()->getArrayTable();
            $x = array_merge($x,$y);
        }
        
        if($this->getCompany()){
            $y = $this->getCompany()->getArrayTable();
            $x = array_merge($x,$y);
        }
        $y = $this->getEmergency()->getArrayTable();
            $x = array_merge($x,$y);
        $y = $this->getUser()->getArrayTable();
            $x = array_merge($x,$y);
        return $x;
    }
}
