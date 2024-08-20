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
class Hrd_Models_Absent_Logabsentdetail extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora {

    public $user_id;
    public $employee_id;
    private $project_id;
    private $pt_id;
    private $log_id;
    private $log_user_id_approve;
    private $log_date;
    private $log_basedata;
    private $absentdetail_id;
    private $in_7_14;
    private $out_7_14;
    private $in_15_21;
    private $out_15_21;
    private $in_22_6;
    private $out_22_6;
    private $time_in;
    private $time_out;
    private $time_in_after;
    private $time_out_after;
    private $reason;
    private $date;

    public function __construct($prefix = NULL) {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        //$this->_mail = Zend_Controller_Action_HelperBroker::getStaticHelper('Email');
		$this->_mail = new Hrd_Models_General_Email();
        parent::__construct();
        $this->embedPrefix = $prefix ? $prefix : "logabsentdetaill_";
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

    function getLog_id() {
        return $this->log_id;
    }

    function getLoguserid_approve() {
        return $this->log_user_id_approve;
    }

    function getLogdate() {
        return date('Y-m-d', strtotime($this->log_date));
    }

    function getLogbasedata() {
        return $this->log_basedata;
    }

    function getAbsentdetail_id() {
        return $this->absentdetail_id;
    }

    function getIn_7_14() {
        return $this->in_7_14;
    }

    function getOut_7_14() {
        return $this->out_7_14;
    }

    function getIn_15_21() {
        return $this->in_15_21;
    }

    function getOut_15_21() {
        return $this->out_15_21;
    }

    function getIn_22_6() {
        return $this->in_22_6;
    }

    function getOut_22_6() {
        return $this->out_22_6;
    }

    function getTime_in() {
        return $this->time_in;
    }

    function getTime_out() {
        return $this->time_out;
    }

    function getTime_in_after() {
        return $this->time_in_after;
    }

    function getTime_out_after() {
        return $this->time_out_after;
    }

    function getReason() {
        return $this->reason;
    }

    function getDate() {
        return date('Y-m-d', strtotime($this->date));
    }
//=================END GETTER===========================
//=================START SETTER===========================

    function setEmployee_id($employee_id) {
        $this->employee_id = $employee_id;
    }

    function setLog_id($log_id) {
        $this->log_id = $log_id;
    }

    function setLoguserid_approve($log_user_id_approve) {
        $this->log_user_id_approve = $log_user_id_approve;
    }

    function setLogdate($log_date) {
        $this->log_date = $log_date;
    }

    function setLogbasedata($log_basedata) {
        $this->log_basedata = $log_basedata;
    }

    function setAbsentdetail_id($absentdetail_id) {
        $this->absentdetail_id = $absentdetail_id;
    }

    function setIn_7_14($in_7_14) {
        $this->in_7_14 = $in_7_14;
    }

    function setOut_7_14($out_7_14) {
        $this->out_7_14 = $out_7_14;
    }

    function setIn_15_21($in_15_21) {
        $this->in_15_21 = $in_15_21;
    }

    function setOut_15_21($out_15_21) {
        $this->out_15_21 = $out_15_21;
    }

    function setIn_22_6($in_22_6) {
        $this->in_22_6 = $in_22_6;
    }

    function setOut_22_6($out_22_6) {
        $this->out_22_6 = $out_22_6;
    }

    function setTime_in($time_in) {
        $this->time_in = $time_in;
    }

    function setTime_out($time_out) {
        $this->time_out = $time_out;
    }

    function setTime_in_after($time_in_after) {
        $this->time_in_after = $time_in_after;
    }

    function setTime_out_after($time_out_after) {
        $this->time_out_after = $time_out_after;
    }

    function setReason($reason) {
        $this->reason = $reason;
    }

    function setDate($date) {
        $this->date = $date;
    }

        //=================END SETTER===========================
    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;

        if (isset($x['log_id'])) {
            $this->setLog_id($x['log_id']);
        }

        if (isset($x['log_user_id_approve'])) {
            $this->setLoguserid_approve($x['log_user_id_approve']);
        }

        if (isset($x['log_date'])) {
            $this->setLogdate($x['log_date']);
        }

        if (isset($x['log_basedata'])) {
            $this->setLogbasedata($x['log_basedata']);
        }

        if (isset($x['absentdetail_id'])) {
            $this->setAbsentdetail_id($x['absentdetail_id']);
        }

        if (isset($x['in_7_14'])) {
            $this->setIn_7_14($x['in_7_14']);
        }

        if (isset($x['out_7_14'])) {
            $this->setOut_7_14($x['out_7_14']);
        }

        if (isset($x['in_15_21'])) {
            $this->setIn_15_21($x['in_15_21']);
        }

        if (isset($x['out_15_21'])) {
            $this->setOut_15_21($x['out_15_21']);
        }

        if (isset($x['in_22_6'])) {
            $this->setIn_22_6($x['in_22_6']);
        }

        if (isset($x['out_22_6'])) {
            $this->setOut_22_6($x['out_22_6']);
        }

        if (isset($x['time_in'])) {
            $this->setTime_in($x['time_in']);
        }

        if (isset($x['time_out'])) {
            $this->setTime_out($x['time_out']);
        }

        if (isset($x['time_in_after'])) {
            $this->setTime_in_after($x['time_in_after']);
        }

        if (isset($x['time_out_after'])) {
            $this->setTime_out_after($x['time_out_after']);
        }

        if (isset($x['reason'])) {
            $this->setReason($x['reason']);
        }

        if (isset($x['date'])) {
            $this->setDate($x['date']);
        }

        unset($x);
    }

    public function getArrayTable() {
        $x = array(
            'log_id' => intval($this->getLog_id()),
            'log_user_id_approve' => intval($this->getLoguserid_approve()),
            'log_date' => date('Y-m-d', strtotime($this->getLogdate())),
            'log_basedata' => strval($this->getLogbasedata()),
            'absentdetail_id' => intval($this->getAbsentdetail_id()),
            'in_7_14' => strval($this->getIn_7_14()),
            'out_7_14' => strval($this->getOut_7_14()),
            'in_15_21' => strval($this->getIn_15_21()),
            'out_15_21' => strval($this->getOut_15_21()),
            'in_22_6' => strval($this->getIn_22_6()),
            'out_22_6' => strval($this->getOut_22_6()),
            'time_in' => strval($this->getTime_in()),
            'time_out' => strval($this->getTime_out()),
            'time_in_after' => strval($this->getTime_in_after()),
            'time_out_after' => strval($this->getTime_out_after()),
            'reason' => strval($this->getReason()),
            'date' => date('Y-m-d', strtotime($this->getDate())),
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
        return array('log_date', 'date');
    }

}

?>
