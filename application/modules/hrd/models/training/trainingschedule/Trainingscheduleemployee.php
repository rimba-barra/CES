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
class Hrd_Models_Training_Trainingschedule_Trainingscheduleemployee extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,  Box_Arried  {
    private $trainingschedule_id;
    private $employee_id;
    private $employee_name;
    private $email_ciputra;
    private $invited;
    private $confirmed;
    private $ess;
    private $hc_checked;
    private $ess_att;
    private $hc_checked_att;
    private $trainingattendance_id;
    private $trainingregister_id;
    
    public function __construct() {
        $this->_mail = new Hrd_Models_General_Email();
        parent::__construct();
        $this->embedPrefix = "trainingscheduleemployee_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;

        if(isset ($x['trainingscheduleemployee_id'])){
           $this->setId($x['trainingscheduleemployee_id']); 
        }
        if(isset ($x['trainingschedule_id'])){
           $this->setTrainingScheduleId($x['trainingschedule_id']); 
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
        if(isset ($x['confirmed'])){
           $this->setConfirmed($x['confirmed']); 
        }
        if(isset ($x['ess'])){
           $this->setEss($x['ess']); 
        }
        if(isset ($x['hc_checked'])){
           $this->setHcChecked($x['hc_checked']); 
        }
        if(isset ($x['ess_att'])){
           $this->setEssAtt($x['ess_att']); 
        }
        if(isset ($x['hc_checked_att'])){
           $this->setHcCheckedAtt($x['hc_checked_att']); 
        }
        if(isset ($x['trainingattendance_id'])){
           $this->setTrainingAttendanceId($x['trainingattendance_id']); 
        }
        if(isset ($x['trainingregister_id'])){
           $this->setTrainingRegisterId($x['trainingregister_id']); 
        }
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'trainingscheduleemployee_id'=>$this->getId(),
            'trainingschedule_id'=>$this->getTrainingScheduleId(),
            'employee_id'=>$this->getEmployeeId(),
            'employee_name'=>$this->getEmployeeName(),
            'email_ciputra'=>$this->getEmailCiputra(),
            'invited'=>$this->getInvited(),
            'confirmed'=>$this->getConfirmed(),
            'ess'=>$this->getEss(),
            'hc_checked'=>$this->getHcChecked(),
            'ess_att'=>$this->getEssAtt(),
            'hc_checked_att'=>$this->getHcCheckedAtt(),
            'trainingattendance_id'=>$this->getTrainingAttendanceId(),
            'trainingregister_id'=>$this->getTrainingRegisterId()
        );
      
        return $x;
    }

    public function getTrainingScheduleId() {
        return $this->trainingschedule_id;
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

    public function getConfirmed() {
        return $this->confirmed;
    }

    public function getEss() {
        return $this->ess;
    }

    public function getHcChecked() {
        return $this->hc_checked;
    }

    public function getEssAtt() {
        return $this->ess_att;
    }

    public function getHcCheckedAtt() {
        return $this->hc_checked_att;
    }

    public function getTrainingAttendanceId() {
        return $this->trainingattendance_id;
    }

    public function getTrainingRegisterId() {
        return $this->trainingregister_id;
    }

    public function setTrainingScheduleId($trainingschedule_id) {
        $this->trainingschedule_id = $trainingschedule_id;
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

    public function setConfirmed($confirmed) {
        $this->confirmed = $confirmed;
    }

    public function setEss($ess) {
        $this->ess = $ess;
    }

    public function setHcChecked($hc_checked) {
        $this->hc_checked = $hc_checked;
    }

    public function setEssAtt($ess_att) {
        $this->ess_att = $ess_att;
    }

    public function setHcCheckedAtt($hc_checked_att) {
        $this->hc_checked_att = $hc_checked_att;
    }

    public function setTrainingAttendanceId($trainingattendance_id) {
        $this->trainingattendance_id = $trainingattendance_id;
    }

    public function setTrainingRegisterId($trainingregister_id) {
        $this->trainingregister_id = $trainingregister_id;
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
