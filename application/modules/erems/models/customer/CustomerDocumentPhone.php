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
class Erems_Models_Customer_CustomerDocumentPhone extends Erems_Box_Models_ObjectEmbedData{
    private $phone;
    private $Addon;
    private $Addby;
    private $department_id;
    private $department_code;
    private $department_name;
    private $phone_description;
    private $dept_phone;
    // added by rico 04082022
    private $user_email;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = 'customerdocument_';
    }
    
    public function setArrayTable($dataArray=NULL) {
    
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
  
        if(isset ($x['customerphone_id'])){
           $this->setId($x['customerphone_id']); 
        }
        if(isset ($x['department_id'])){
           $this->setDepartment($x['department_id']); 
        }
        if(isset ($x['phone'])){
           $this->setPhone($x['phone']); 
        }
        if(isset ($x['phone_description'])){
           $this->setDescription($x['phone_description']); 
        }
        if(isset ($x['Addby'])){
           $this->setAddby($x['Addby']); 
        }
        if(isset ($x['Addon'])){
           $this->setAddon(date("d-m-Y H:i:s", strtotime($x['Addon']))); 
        }
        if(isset ($x['department_code'])){
           $this->setDepartmentCode($x['department_code']); 
        }
        if(isset ($x['department_name'])){
           $this->setDepartmentName($x['department_name']); 
        }
        if(isset ($x['dept_phone'])){
           $this->setDeptPhone($x['dept_phone']); 
        }
        if(isset ($x['user_email'])){
           $this->setUserEmail($x['user_email']); 
        }
                
        unset($x);
        
    }
    
    public function getArrayTable(){
        $x = array(
            "customerphone_id"=>$this->getId(),
            "department_id"=>$this->getDepartment(),
            "department_code"=>$this->getDepartmentCode(),
            "department_name"=>$this->getDepartmentName(),
            "phone"=>$this->getPhone(),
            "phone_description"=>$this->getDescription(),
            "Addby"=>$this->getAddby(),
            "Addon"=>$this->getAddon(),
            "dept_phone"=>$this->getDeptPhone(),
            "user_email"=>$this->getUserEmail(),
        );
      
        return $x;
    }

    public function getDepartment() {
        return $this->department_id;
    }

    public function getDepartmentCode() {
        return $this->department_code;
    }

    public function getDepartmentName() {
        return $this->department_name;
    }

    public function getDescription() {
        return $this->phone_description;
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
    
    public function getDeptPhone() {
        return $this->dept_phone;
    }
    
    public function getUserEmail() {
        return $this->user_email;
    }

    public function setDepartment($department_id) {
        $this->department_id = $department_id;
    }

    public function setDepartmentCode($department_code) {
        $this->department_code = $department_code;
    }

    public function setDepartmentName($department_name) {
        $this->department_name = $department_name;
    }

    public function setDescription($phone_description) {
        $this->phone_description = $phone_description;
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

    public function setDeptPhone($dept_phone) {
        $this->dept_phone = $dept_phone;
    }

    // added by rico 04082022
    public function setUserEmail($user_email) {
        $this->user_email = $user_email;
    }
}
