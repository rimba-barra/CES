<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of CustomerDocument
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Customer_CustomerDocumentKomunikasi extends Erems_Box_Models_ObjectEmbedData{
    private $email;
    private $Addon;
    private $Addby;
    private $log_komunikasi;
    private $phone;
    private $dept_phone;
    private $description;
    private $department;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = 'customerdocument_';
    }
    
    public function setArrayTable($dataArray=NULL) {
    
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
  
        if(isset ($x['customer_komunikasi_id'])){
           $this->setId($x['customer_komunikasi_id']); 
        }
        if(isset ($x['log_komunikasi'])){
           $this->setLog($x['log_komunikasi']); 
        }
        if(isset ($x['phone'])){
           $this->setPhone($x['phone']); 
        }
        if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
        if(isset ($x['Addby'])){
           $this->setAddby($x['Addby']); 
        }
        if(isset ($x['Addon'])){
           $this->setAddon(date("d-m-Y H:i:s", strtotime($x['Addon']))); 
        }
        if(isset ($x['dept_phone'])){
           $this->setDeptPhone($x['dept_phone']); 
        }
        if(isset ($x['email'])){
           $this->setEmail($x['email']); 
        }
        if(isset ($x['department'])){
           $this->setDepartment($x['department']); 
        }
                
        unset($x);
        
    }
    
    public function getArrayTable(){
        $x = array(
            "customer_komunikasi_id"=>$this->getId(),
            "log_komunikasi"=>$this->getLog(),
            "dept_phone"=>$this->getDeptPhone(),
            "email"=>$this->getEmail(),
            "phone"=>$this->getPhone(),
            "description"=>$this->getDescription(),
            "Addby"=>$this->getAddby(),
            "Addon"=>$this->getAddon(),
            "department"=>$this->getDepartment()
        );
      
        return $x;
    }

    public function getDeptPhone() {
        return $this->dept_phone;
    }

    public function getLog() {
        return $this->log_komunikasi;
    }

    public function getEmail() {
        return $this->email;
    }

    public function getDescription() {
        return $this->description;
    }

    public function getPhone() {
        return $this->phone;
    }

    public function getAddby() {
        return $this->Addby;
    }

    public function getAddon() {
        return date("d-m-Y H:i:s", strtotime($this->Addon));
    }

    public function getDepartment() {
        return $this->department;
    }

    public function setDeptPhone($dept_phone) {
        $this->dept_phone = $dept_phone;
    }

    public function setLog($log_komunikasi) {
        $this->log_komunikasi = $log_komunikasi;
    }

    public function setEmail($email) {
        $this->email = $email;
    }

    public function setDescription($description) {
        $this->description = $description;
    }

    public function setPhone($phone) {
        $this->phone = $phone;
    }

    public function setAddby($Addby) {
        $this->Addby = $Addby;
    }

    public function setAddon($Addon) {
        $this->Addon = $Addon;
    }

    public function setDepartment($department) {
        $this->department = $department;
    }
}
