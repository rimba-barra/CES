<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of UnitHistory
 *
 * @author TOMMY-MIS
 */
class Cashier_Models_Unit_UnitHistory extends Cashier_Box_Models_ObjectEmbedData implements Cashier_Box_Kouti_Remora,  Cashier_Box_Models_Master_InterProjectPt{
    private $project;
    private $pt;
    private $changeDate;
    private $instruksiOrder;
    private $personInCharge;
    private $description;
    private $unit;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "unithistory_";
    }
    
    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['unithistory_id'])){
           $this->setId($x['unithistory_id']); 
        }
        if(isset ($x['change_date'])){
           $this->setChangeDate($x['change_date']); 
        }
        if(isset ($x['instruksi_order'])){
           $this->setInstruksiOrder($x['instruksi_order']); 
        }
        if(isset ($x['person_in_charge'])){
           $this->setPersonInCharge($x['person_in_charge']); 
        }
        if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
        if(isset ($x['unit_unit_id'])){
           $this->getUnit()->setId($x['unit_unit_id']); 
        }
        
        unset($x);
    }
    
    public function getArrayTable() {
        $x = array(
            'unithistory_id'=>$this->getId(),
            'change_date'=>$this->getChangeDate(),
            'instruksi_order'=>$this->getInstruksiOrder(),
            'person_in_charge'=>$this->getPersonInCharge(),
            'description'=>$this->getDescription(),
            'unit_unit_id'=>$this->getUnit()->getId()
            
        );
        
        return $x;
    }
    
    public function getChangeDate() {
        return $this->changeDate;
    }

    public function getInstruksiOrder() {
        return $this->instruksiOrder;
    }

    public function getPersonInCharge() {
        return $this->personInCharge;
    }

    public function getDescription() {
        return $this->description;
    }

    public function setChangeDate($changeDate) {
        $this->changeDate = $changeDate;
    }

    public function setInstruksiOrder($instruksiOrder) {
        $this->instruksiOrder = $instruksiOrder;
    }

    public function setPersonInCharge($personInCharge) {
        $this->personInCharge = $personInCharge;
    }

    public function setDescription($description) {
        $this->description = $description;
    }
    
    public function getUnit() {
        if(!$this->unit){
            $this->unit = new Cashier_Models_Unit_Unit();
        }
        return $this->unit;
    }

    public function setUnit(Cashier_Models_Unit_Unit $unit) {
        $this->unit = $unit;
    }

    
        
    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function getProject() {
        if(!$this->project){
            $this->project = new Cashier_Box_Models_Master_Project();
        }
    }

    public function getPt() {
        if(!$this->pt){
            $this->pt = new Cashier_Box_Models_Master_Pt();
        }
    }

    public function grouped() {
        return array();
    }

    public function setProject(\Cashier_Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function setPt(\Cashier_Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }
    
    

//put your code here
}
