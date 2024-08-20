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
class Hrd_Models_Absent_Alllogfingerprint extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora {

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

    public function __construct($prefix = NULL) {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        //$this->_mail = Zend_Controller_Action_HelperBroker::getStaticHelper('Email');
		$this->_mail = new Hrd_Models_General_Email();
        parent::__construct();
        $this->embedPrefix = $prefix ? $prefix : "alllogfingerprint_";
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


        unset($x);
    }

    public function getArrayTable() {
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
            'time_in' => strval($this->getTime_in()),
            'time_out' => strval($this->getTime_out()),
            'psnno' => strval($this->getPsnno()),
            'psnname' => strval($this->getPsnname()),
            'is_fingerprint' => strval($this->getIs_fingerprint()),
            'tipe' => strval($this->getTipe()),
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
