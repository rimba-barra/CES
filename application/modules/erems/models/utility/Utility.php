<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Utility
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Utility_Utility extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Kouti_Remora{
    private $unit;
    private $type;
    private $status;
    private $purchaseletter;
    private $power;
    private $requestDate;
    private $installmentDate;
    private $followupDate;
    private $installmentNo;
    private $meterNo;
    private $note;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "utility_";
    }
    
    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['utility_id'])){
           $this->setId($x['utility_id']); 
        }
        
        if(isset ($x['unit_unit_id'])){
           $this->getUnit()->setId($x['unit_unit_id']); 
        }
        
        if(isset ($x['utilitytype_utilitytype_id'])){
           $this->getType()->setId($x['utilitytype_utilitytype_id']); 
        }
        if(isset ($x['utilitystatus_utilitystatus_id'])){
           $this->getStatus()->setId($x['utilitystatus_utilitystatus_id']); 
        }
        if(isset ($x['purchaseletter_purchaseletter_id'])){
           $this->getPurchaseletter()->setId($x['purchaseletter_purchaseletter_id']); 
        }
        if(isset ($x['power'])){
           $this->setPower($x['power']); 
        }
     
        if(isset ($x['request_date'])){
           $this->setRequestDate($x['request_date']); 
        }
        if(isset ($x['installment_date'])){
           $this->setInstallmentDate($x['installment_date']); 
        }
        if(isset ($x['followup_date'])){
           $this->setFollowupDate($x['followup_date']); 
        }
        if(isset ($x['installment_no'])){
           $this->setInstallmentNo($x['installment_no']); 
        }
        if(isset ($x['meter_no'])){
           $this->setMeterNo($x['meter_no']); 
        }
        if(isset ($x['note'])){
           $this->setNote($x['note']); 
        }
        
        
        unset($x);
    }
    
    public function getArrayTable() {
        $x = array(
            'utility_id'=>$this->getId(),
            'unit_unit_id'=>$this->getUnit()->getId(),
            'utilitytype_utilitytype_id'=>$this->getType()->getId(),
            'utilitystatus_utilitystatus_id'=>$this->getStatus()->getId(),
            'purchaseletter_purchaseletter_id'=>$this->getPurchaseletter()->getId(),
            'power'=>$this->getPower(),
            'request_date'=>$this->getRequestDate(),
            'installment_date'=>$this->getInstallmentDate(),
            'followup_date'=>$this->getFollowupDate(),
            'installment_no'=>$this->getInstallmentNo(),
            'meter_no'=>$this->getMeterNo(),
            'note'=>$this->getNote(),
        );
        
        return $x;
    }
    
    public function getInstallmentNo() {
        return $this->installmentNo;
    }

    public function setInstallmentNo($installmentNo) {
        $this->installmentNo = $installmentNo;
    }

        
    public function getUnit() {
        if(!$this->unit){
            $this->unit = new Erems_Models_Unit_Unit();
        }
        return $this->unit;
    }

    public function getType() {
        if(!$this->type){
            $this->type = new Erems_Models_Utility_Type();
        }
        return $this->type;
    }

    public function getStatus() {
        if(!$this->status){
            $this->status = new Erems_Models_Utility_Status();
        }
        return $this->status;
    }

    public function getPurchaseletter() {
        if(!$this->purchaseletter){
            $this->purchaseletter = new Erems_Models_Purchaseletter_PurchaseLetterTransaction();
        }
        return $this->purchaseletter;
    }

    public function getPower() {
        return $this->power;
    }

    public function getRequestDate() {
        return $this->requestDate;
    }

    public function getInstallmentDate() {
        return $this->installmentDate;
    }

    public function getFollowupDate() {
        return $this->followupDate;
    }

    public function getMeterNo() {
        return $this->meterNo;
    }

    public function getNote() {
        return $this->note;
    }

    public function setUnit(Erems_Models_Unit_Unit $unit) {
        $this->unit = $unit;
    }

    public function setType(Erems_Models_Utility_Type $type) {
        $this->type = $type;
    }

    public function setStatus(Erems_Models_Utility_Status $status) {
        $this->status = $status;
    }

    public function setPurchaseletter(Erems_Models_Purchaseletter_PurchaseLetterTransaction $purchaseletter) {
        $this->purchaseletter = $purchaseletter;
    }

    public function setPower($power) {
        $this->power = $power;
    }

    public function setRequestDate($requestDate) {
        $this->requestDate = $requestDate;
    }

    public function setInstallmentDate($installmentDate) {
        $this->installmentDate = $installmentDate;
    }

    public function setFollowupDate($followupDate) {
        $this->followupDate = $followupDate;
    }

    public function setMeterNo($meterNo) {
        $this->meterNo = $meterNo;
    }

    public function setNote($note) {
        $this->note = $note;
    }

        
    
    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }
    
    protected function getDatefields() {
        return array("request_date","installment_date","followup_date");
    }


//put your code here
}
