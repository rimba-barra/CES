<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Jenisdokumen
 *
 * @author MIS
 */
class Hrd_Models_Absent_Reminderabsensi extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora {

    public $user_id;
    public $employee_id;
    private $project_id;
    private $pt_id;
    private $fingerprintprocess_id;
    private $psnno;
    private $psnname;
    private $date;
    private $time;
    private $fromdate;
    private $untildate;
    private $time_in;
    private $time_out;
    private $is_fingerprint;
    private $tipe;

    private $employee_name;
    private $employee_nik;
    private $nik_group;
    private $department_id;
    private $department;
    private $department_code;
    private $shifttype_id;
    private $shifttype_code;
    private $shifttype_timein;
    private $shifttype_timeout;
    private $reminderabsensi_id;
    private $absentdetail_id;
    private $email;
    private $email_ciputra;

    private $send_email;
    private $reminder_date;


    public function __construct($prefix = NULL) {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        //$this->_mail = Zend_Controller_Action_HelperBroker::getStaticHelper('Email');
		$this->_mail = new Hrd_Models_General_Email();
        parent::__construct();
        $this->embedPrefix = $prefix ? $prefix : "reminderabsensi_";
    }

    //=================START GETTER===========================
    function getUserlogin() {
        return $this->session->getUserId();
    }

    function getUser_id() {
        return $this->session->getUserId();
    }

    function getEmployee_id() {
        return $this->employee_id;
    }

    function getProject_id() {
        return $this->session->getCurrentProjectId();
    }

    function getPt_id() {
        return $this->session->getCurrentPtId();
    }

    function getFingerprintprocess_id() {
        return $this->fingerprintprocess_id;
    }

    function getPsnno() {
        return $this->psnno;
    }

    function getPsnname() {
        return $this->psnname;
    }

    function getDate() {
        return $this->date;
    }

    function getTime() {
        return $this->time;
    }

    function getTime_in() {
        return $this->time_in;
    }

    function getTime_out() {
        return $this->time_out;
    }
    
    function getFromdate() {
        return date('Y-m-d', strtotime($this->fromdate));
    }

    function getUntildate() {
        return date('Y-m-d', strtotime($this->untildate));
    }
    
    function getIs_fingerprint() {
        return $this->is_fingerprint;
    }

    function getTipe() {
        return $this->tipe;
    }

    function getEmployee_name() {
        return $this->employee_name;
    }

    function getEmployee_nik() {
        return $this->employee_nik;
    }

    function getNik_group() {
        return $this->nik_group;
    }

    function getDepartment_id() {
        return $this->department_id;
    }

    function getDepartment() {
        return $this->department;
    }

    function getDepartment_code() {
        return $this->department_code;
    }

    function getShifttype_id() {
        return $this->shifttype_id;
    }

    function getShifttype_code() {
        return $this->shifttype_code;
    }

    function getShifttype_timein() {
        return $this->shifttype_timein;
    }

    function getShifttype_timeout() {
        return $this->shifttype_timeout;
    }

    function getReminderabsensi_id() {
        return $this->reminderabsensi_id;
    }

    function getAbsentdetail_id() {
        return $this->absentdetail_id;
    }

    function getEmail() {
        return $this->email;
    }

    function getEmail_ciputra() {
        return $this->email_ciputra;
    }

    function getSend_email() {
        return $this->send_email;
    }

    function getReminder_date() {
        return $this->reminder_date;
    }


//=================END GETTER===========================
//=================START SETTER===========================

    function setEmployee_id($employee_id) {
        $this->employee_id = $employee_id;
    }

    function setFingerprintprocess_id($fingerprintprocess_id) {
        $this->fingerprintprocess_id = $fingerprintprocess_id;
    }

    function setPsnno($psnno) {
        $this->psnno = $psnno;
    }

    function setPsnname($psnname) {
        $this->psnname = $psnname;
    }

    function setDate($date) {
        $this->date = $date;
    }

    function setTime($time) {
        $this->time = $time;
    }

    function setTime_in($time_in) {
        $this->time_in = $time_in;
    }

    function setTime_out($time_out) {
        $this->time_out = $time_out;
    }
    function setFromdate($fromdate) {
        $this->fromdate = $fromdate;
    }

    function setUntildate($untildate) {
        $this->untildate = $untildate;
    }
    
    function setIs_fingerprint($is_fingerprint) {
        $this->is_fingerprint = $is_fingerprint;
    }

    function setTipe($tipe) {
        $this->tipe = $tipe;
    }

    function setEmployee_name($employee_name) {
        $this->employee_name = $employee_name;
    }

    function setEmployee_nik($employee_nik) {
        $this->employee_nik = $employee_nik;
    }

    function setNik_group($nik_group) {
        $this->nik_group = $nik_group;
    }

    function setDepartment_id($department_id) {
        $this->department_id = $department_id;
    }

    function setDepartment($department) {
        $this->department = $department;
    }

    function setDepartment_code($department_code) {
        $this->department_code = $department_code;
    }

    function setShifttype_id($shifttype_id) {
        $this->shifttype_id = $shifttype_id;
    }

    function setShifttype_code($shifttype_code) {
        $this->shifttype_code = $shifttype_code;
    }

    function setShifttype_timein($shifttype_timein) {
        $this->shifttype_timein = $shifttype_timein;
    }

    function setShifttype_timeout($shifttype_timeout) {
        $this->shifttype_timeout = $shifttype_timeout;
    }

    function setReminderabsensi_id($reminderabsensi_id) {
        $this->reminderabsensi_id = $reminderabsensi_id;
    }

    function setAbsentdetail_id($absentdetail_id) {
        $this->absentdetail_id = $absentdetail_id;
    }

    function setEmail($email) {
        $this->email = $email;
    }

    function setEmail_ciputra($email_ciputra) {
        $this->email_ciputra = $email_ciputra;
    }

    function setSend_email($send_email) {
        $this->send_email = $send_email;
    }

    function setReminder_date($reminder_date) {
        $this->reminder_date = $reminder_date;
    }

        //=================END SETTER===========================
    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;

        if (isset($x['fingerprintprocess_id'])) {
            $this->setFingerprintprocess_id($x['fingerprintprocess_id']);
        }      
        if (isset($x['employee_id'])) {
            $this->setEmployee_id($x['employee_id']);
        }        
        if (isset($x['date'])) {
            $this->setDate($x['date']);
        }
        if (isset($x['time'])) {
            $this->setTime($x['time']);
        }
        if (isset($x['time_in'])) {
            $this->setTime_in($x['time_in']);
        }
        if (isset($x['time_out'])) {
            $this->setTime_out($x['time_out']);
        }
        if (isset($x['psnno'])) {
            $this->setPsnno($x['psnno']);
        }
        if (isset($x['psnname'])) {
            $this->setPsnname($x['psnname']);
        }
        if (isset($x['fromdate'])) {
            $this->setFromdate($x['fromdate']);
        }
        if (isset($x['untildate'])) {
            $this->setUntildate($x['untildate']);
        }
        if (isset($x['is_fingerprint'])) {
            $this->setIs_fingerprint($x['is_fingerprint']);
        }
        if (isset($x['tipe'])) {
            $this->setTipe($x['tipe']);
        }
        if (isset($x['employee_name'])) {
            $this->setEmployee_name($x['employee_name']);
        }
        if (isset($x['employee_nik'])) {
            $this->setEmployee_nik($x['employee_nik']);
        }
        if (isset($x['nik_group'])) {
            $this->setNik_group($x['nik_group']);
        }
        if (isset($x['department_id'])) {
            $this->setDepartment_id($x['department_id']);
        }
        if (isset($x['department'])) {
            $this->setDepartment($x['department']);
        }
        if (isset($x['department_code'])) {
            $this->setDepartment_code($x['department_code']);
        }
        if (isset($x['shifttype_id'])) {
            $this->setShifttype_id($x['shifttype_id']);
        }
        if (isset($x['shifttype_code'])) {
            $this->setShifttype_code($x['shifttype_code']);
        }
        if (isset($x['shifttype_timein'])) {
            $this->setShifttype_timein($x['shifttype_timein']);
        }
        if (isset($x['shifttype_timeout'])) {
            $this->setShifttype_timeout($x['shifttype_timeout']);
        }
        if (isset($x['reminderabsensi_id'])) {
            $this->setReminderabsensi_id($x['reminderabsensi_id']);
        }
        if (isset($x['absentdetail_id'])) {
            $this->setAbsentdetail_id($x['absentdetail_id']);
        }
        if (isset($x['email'])) {
            $this->setEmail($x['email']);
        }
        if (isset($x['email_ciputra'])) {
            $this->setEmail_ciputra($x['email_ciputra']);
        }
        if (isset($x['send_email'])) {
            $this->setSend_email($x['send_email']);
        }
        if (isset($x['reminder_date'])) {
            $this->setReminder_date($x['reminder_date']);
        }


        unset($x);
    }

    public function getArrayTable() {

        if(!$this->getTime_in()){
            $getTime_in = '00:00:00';
        }else{
            $getTime_in = $this->getTime_in();
        }

        if(!$this->getTime_out()){
            $getTime_out = '00:00:00';
        }else{
            $getTime_out = $this->getTime_out();
        }

        $x = array(
            'fingerprintprocess_id' => intval($this->getFingerprintprocess_id()),
            'user_id' => intval($this->getUser_id()),
            'employee_id' => intval($this->getEmployee_id()),
            'project_id' => intval($this->getProject_id()),
            'pt_id' => intval($this->getPt_id()),
            'date' => date('Y-m-d', strtotime($this->getDate())),
            'time' => strval($this->getTime()),
            'fromdate' => date('Y-m-d', strtotime($this->getFromdate())),
            'untildate' => date('Y-m-d', strtotime($this->getUntildate())),
            'time_in' => strval($getTime_in),
            'time_out' => strval($getTime_out),
            'psnno' => strval($this->getPsnno()),
            'psnname' => strval($this->getPsnname()),
            'is_fingerprint' => strval($this->getIs_fingerprint()),
            'tipe' => strval($this->getTipe()),

            'employee_name' => strval($this->getEmployee_name()),
            'employee_nik' => strval($this->getEmployee_nik()),
            'nik_group' => strval($this->getNik_group()),
            'department_id' => intval($this->getDepartment_id()),
            'department' => strval($this->getDepartment()),
            'department_code' => strval($this->getDepartment_code()),
            'shifttype_id' => intval($this->getShifttype_id()),
            'shifttype_code' => strval($this->getShifttype_code()),
            'shifttype_timein' => strval($this->getShifttype_timein()),
            'shifttype_timeout' => strval($this->getShifttype_timeout()),
            'reminderabsensi_id' => intval($this->getReminderabsensi_id()),
            'absentdetail_id' => intval($this->getAbsentdetail_id()),
            'email_ciputra' => strval($this->getEmail_ciputra()),
            'email' => strval($this->getEmail()),
            'send_email' => intval($this->getSend_email()),
            'reminder_date' => strval($this->getReminder_date()),

        );
        return $x;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }

    public function getDatefields() {
        return array('date','fromdate','untildate');
    }

}

?>
