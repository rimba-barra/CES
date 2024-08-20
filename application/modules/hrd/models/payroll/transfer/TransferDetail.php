<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of TransferDetail
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Payroll_Transfer_TransferDetail extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,  Box_Arried{
    private $transfer;
    private $employee;
    private $value;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "transferdetail_";
    }
    
    
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['transferdetail_id'])){
           $this->setId($x['transferdetail_id']); 
        }
        if(isset ($x['transfer_transfer_id'])){
           $this->getTransfer()->setId($x['transfer_transfer_id']); 
        }
        if(isset ($x['transfer_komponengaji_id'])){
           $this->getTransfer()->getKomponenGaji()->setId($x['transfer_komponengaji_id']); 
        }
        if(isset ($x['transfer_month'])){
           $this->getTransfer()->setMonth($x['transfer_month']); 
        }
        if(isset ($x['transfer_year'])){
           $this->getTransfer()->setYear($x['transfer_year']); 
        }
        if(isset ($x['employee_employee_id'])){
           $this->getEmployee()->setId($x['employee_employee_id']); 
        }
        if(isset ($x['employee_employee_nik'])){
           $this->getEmployee()->setNik($x['employee_employee_nik']); 
        }
        if(isset ($x['value'])){
           $this->setValue($x['value']); 
        }
        
       
        
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'transferdetail_id'=>$this->getId(),
            'transfer_transfer_id'=>$this->getTransfer()->getId(),
            'employee_employee_id'=>$this->getEmployee()->getId(),
            'employee_employee_nik'=>$this->getEmployee()->getNik(),
            'transfer_komponengaji_id'=>$this->getTransfer()->getKomponenGaji()->getId(),
            'transfer_month'=>$this->getTransfer()->getMonth(),
            'transfer_year'=>$this->getTransfer()->getYear(),
            'value'=>$this->getValue()
            
            
           
        );
      
        return $x;
    }
    
    public function getTransfer() {
        if(!$this->transfer){
            $this->transfer = new Hrd_Models_Payroll_Transfer_Transfer();
        }
        return $this->transfer;
    }

    public function getEmployee() {
        if(!$this->employee){
            $this->employee = new Hrd_Models_Master_Employee();
        }
        return $this->employee;
    }

    public function getValue() {
        return (double)$this->value;
    }

    public function setTransfer(Hrd_Models_Payroll_Transfer_Transfer $transfer) {
        $this->transfer = $transfer;
    }

    public function setEmployee(Hrd_Models_Master_Employee $employee) {
        $this->employee = $employee;
    }

    public function setValue($value) {
        $this->value = (double)$value;
    }

        
    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getTransfer(),$this->getEmployee());
    }

    public function getArray() {
        return $this->getArrayTable();
    }

}
