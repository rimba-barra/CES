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
class Hrd_Models_Training_Trainingattendance_Trainingattendancebrowse extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,  Box_Arried  {
    private $trainingattendance_id;
    private $trainingregister_id;
    private $trainingschedule_id;
    private $employee_id;
    private $employee_name;
    private $email_ciputra;
    private $trainingname;
    private $periode;
    private $startdate;
    private $enddate;
    private $is_ess_approve_reject;
    private $is_ess_approve_reject_date;
    private $hc_approve_reject;
    private $hc_approve_reject_date;
    
    public function __construct() {
        $this->_mail = new Hrd_Models_General_Email();
        parent::__construct();
        $this->embedPrefix = "trainingattendancebrowse_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;

        if(isset ($x['trainingscheduleemployee_id'])){
           $this->setId($x['trainingscheduleemployee_id']); 
        }
        if(isset ($x['trainingattendance_id'])){
           $this->setTrainingAttendanceId($x['trainingattendance_id']); 
        }
        if(isset ($x['trainingregister_id'])){
           $this->setTrainingRegisterId($x['trainingregister_id']); 
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
        if(isset ($x['trainingname'])){
           $this->setTrainingName($x['trainingname']); 
        }
        if(isset ($x['periode'])){
           $this->setPeriode($x['periode']); 
        }
        if(isset ($x['startdate'])){
           $this->setStartdate($x['startdate']); 
        }
        if(isset ($x['enddate'])){
           $this->setEnddate($x['enddate']); 
        }
        if(isset ($x['is_ess_approve_reject'])){
           $this->setIsAppRej($x['is_ess_approve_reject']); 
        }
        if(isset ($x['is_ess_approve_reject_date'])){
           $this->setIsAppRejDate($x['is_ess_approve_reject_date']); 
        }
        if(isset ($x['hc_approve_reject'])){
           $this->setHcAppRej($x['hc_approve_reject']); 
        }
        if(isset ($x['hc_approve_reject_date'])){
           $this->setHcAppRejDate($x['hc_approve_reject_date']); 
        }
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'trainingscheduleemployee_id'=>$this->getId(),
            'trainingattendance_id'=>$this->getTrainingAttendanceId(),
            'trainingregister_id'=>$this->getTrainingRegisterId(),
            'trainingschedule_id'=>$this->getTrainingScheduleId(),
            'employee_id'=>$this->getEmployeeId(),
            'employee_name'=>$this->getEmployeeName(),
            'email_ciputra'=>$this->getEmailCiputra(),
            'trainingname'=>$this->getTrainingName(),
            'periode'=>$this->getPeriode(),
            'startdate'=>$this->getStartdate(),
            'enddate'=>$this->getEnddate(),
            'is_ess_approve_reject'=>$this->getIsAppRej(),
            'is_ess_approve_reject_date'=>$this->getIsAppRejDate(),
            'hc_approve_reject'=>$this->getHcAppRej(),
            'hc_approve_reject_date'=>$this->getHcAppRejDate()
        );
      
        return $x;
    }

    public function getTrainingScheduleId() {
        return $this->trainingschedule_id;
    }

    public function getTrainingAttendanceId() {
        return $this->trainingattendance_id;
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

    public function getTrainingName() {
        return $this->trainingname;
    }

    public function getPeriode() {
        return $this->periode;
    }

    public function getStartdate() {
        return $this->startdate;
    }

    public function getEnddate() {
        return $this->enddate;
    }

    public function getIsAppRej() {
        return $this->is_ess_approve_reject;
    }

    public function getIsAppRejDate() {
        return $this->is_ess_approve_reject_date;
    }

    public function getHcAppRej() {
        return $this->hc_approve_reject;
    }

    public function getHcAppRejDate() {
        return $this->hc_approve_reject_date;
    }

    public function setTrainingScheduleId($trainingschedule_id) {
        $this->trainingschedule_id = $trainingschedule_id;
    }

    public function setTrainingAttendanceId($trainingattendance_id) {
        $this->trainingattendance_id = $trainingattendance_id;
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

    public function setTrainingName($trainingname) {
        $this->trainingname = $trainingname;
    }

    public function setPeriode($periode) {
        $this->periode = $periode;
    }

    public function setStartdate($startdate) {
        $this->startdate = $startdate;
    }

    public function setEnddate($enddate) {
        $this->enddate = $enddate;
    }

    public function setIsAppRej($is_ess_approve_reject) {
        $this->is_ess_approve_reject = $is_ess_approve_reject;
    }

    public function setIsAppRejDate($is_ess_approve_reject_date) {
        $this->is_ess_approve_reject_date = $is_ess_approve_reject_date;
    }

    public function setHcAppRej($hc_approve_reject) {
        $this->hc_approve_reject = $hc_approve_reject;
    }

    public function setHcAppRejDate($hc_approve_reject_date) {
        $this->hc_approve_reject_date = $hc_approve_reject_date;
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
