<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of MasterSK
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Training_Trainingattendance_Trainingattendanceemployee extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,  Box_Arried  {
    private $trainingregister_id;
    private $employee_id;
    private $employee_name;
    private $email_ciputra;
    private $invited;
    private $hc_checked;
    private $hc_checked_att;

    
    public function __construct() {
        $this->_mail = new Hrd_Models_General_Email();
        parent::__construct();
        $this->embedPrefix = "trainingattendanceemployee_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;

        if(isset ($x['trainingattendance_id'])){
           $this->setId($x['trainingattendance_id']); 
        }
        if(isset ($x['trainingregister_id'])){
           $this->setTrainingRegisterId($x['trainingregister_id']); 
        }
        if(isset ($x['employee_id'])){
           $this->setEmployeeId($x['employee_id']); 
        }
        if(isset ($x['employee_name'])){
           $this->setEmployeeName($x['employee_name']); 
        }
        if(isset ($x['email_ciputra'])){
           $this->setEmailCiputra($x['email_ciputra']); 
        }
        if(isset ($x['invited'])){
           $this->setInvited($x['invited']); 
        }
        if(isset ($x['hc_checked'])){
           $this->setHcChecked($x['hc_checked']); 
        }
        if(isset ($x['hc_checked_att'])){
           $this->setHcCheckedAtt($x['hc_checked_att']); 
        }
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'trainingattendance_id'=>$this->getId(),
            'trainingregister_id'=>$this->getTrainingRegisterId(),
            'employee_id'=>$this->getEmployeeId(),
            'employee_name'=>$this->getEmployeeName(),
            'email_ciputra'=>$this->getEmailCiputra(),
            'invited'=>$this->getInvited(),
            'hc_checked'=>$this->getHcChecked(),
            'hc_checked_att'=>$this->getHcCheckedAtt()
        );
      
        return $x;
    }

    public function getTrainingRegisterId() {
        return $this->trainingregister_id;
    }

    public function getEmployeeId() {
        return $this->employee_id;
    }

    public function getEmployeeName() {
        return $this->employee_name;
    }

    public function getEmailCiputra() {
        return $this->email_ciputra;
    }

    public function getInvited() {
        return $this->invited;
    }

    public function getHcChecked() {
        return $this->hc_checked;
    }

    public function getHcCheckedAtt() {
        return $this->hc_checked_att;
    }

    public function setTrainingRegisterId($trainingregister_id) {
        $this->trainingregister_id = $trainingregister_id;
    }

    public function setEmployeeId($employee_id) {
        $this->employee_id = $employee_id;
    }

    public function setEmployeeName($employee_name) {
        $this->employee_name = $employee_name;
    }

    public function setEmailCiputra($email_ciputra) {
        $this->email_ciputra = $email_ciputra;
    }

    public function setInvited($invited) {
        $this->invited = $invited;
    }

    public function setHcChecked($hc_checked) {
        $this->hc_checked = $hc_checked;
    }

    public function setHcCheckedAtt($hc_checked_att) {
        $this->hc_checked_att = $hc_checked_att;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }

    public function getArray() {
        return $this->getArrayTable();
    }
    
    protected function getDatefields() {
        return array("tanggal");
    }

    function get_mail() {
        return $this->_mail;
    }
    

}
