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
class Hrd_Models_Intranet_Cuti extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora {

    public $user_id_ces;
    public $employee_id_ces;
    private $project_id_ces;
    private $pt_id_ces;
    private $cuti_id;
    private $employee_id;
    private $nik;
    private $name;
    private $start_date;
    private $end_date;
    private $total;
    private $description;
    private $approval_date;
    private $cutitype_id;
    private $cutitype;
    private $cutitype_description;
    private $is_potongcuti;
    private $approve_id;
    private $department_id;
    private $approve_by;
    private $department;
    private $hrd_comment;
    private $comment_date;
    private $hrd_check;
    private $levelapprove;
    private $absenttype_id;
    private $absenttype_id_default;
    private $hire_date;
    private $position_id;
    private $position;
    private $position_description;
    private $leave_quota;
    private $absenttypegroup_id;
    private $absenttype_code;
    private $hrd_comment_default;
    private $_mail = null;
    private $_templatemail = null;
    private $employee_id_user_intranet;
    private $employee_id_hod_intranet;
    private $employee_id_cc_intranet;
    private $reportoinmultiposition;
    private $status;

    private $attachment;

    public function __construct($prefix = NULL) {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        //$this->_mail = Zend_Controller_Action_HelperBroker::getStaticHelper('Email');        
		$this->_mail = new Hrd_Models_General_Email();  
        parent::__construct();
        $this->embedPrefix = $prefix ? $prefix : "intranet_";
    }

    //=================START GETTER===========================
    function getReportoinmultiposition() {
        return strval($this->reportoinmultiposition);
    }

    function setReportoinmultiposition($reportoinmultiposition) {
        $this->reportoinmultiposition = $reportoinmultiposition;
    }

    function getUser_id_ces() {
        return $this->user_id_ces;
    }
    function getUserlogin() {
        return $this->session->getUserId();
    }

    function getEmployee_id_ces() {
        return $this->employee_id_ces;
    }

    function getProject_id_ces() {
        return $this->project_id_ces;
    }

    function getPt_id_ces() {
        return $this->pt_id_ces;
    }

    function getCuti_id() {
        return $this->cuti_id;
    }

    function getEmployee_id() {
        return $this->employee_id;
    }

    function getNik() {
        return $this->nik;
    }

    function getName() {
        return $this->name;
    }

    function getStart_date() {
        return $this->start_date;
    }

    function getEnd_date() {
        return $this->end_date;
    }

    function getTotal() {
        return $this->total;
    }

    function getDescription() {
        return $this->description;
    }

    function getApproval_date() {
        return $this->approval_date;
    }

    function getCutitype_id() {
        return $this->cutitype_id;
    }

    function getCutitype() {
        return $this->cutitype;
    }

    function getCutitype_description() {
        return $this->cutitype_description;
    }

    function getIs_potongcuti() {
        return $this->is_potongcuti;
    }

    function getApprove_id() {
        return $this->approve_id;
    }

    function getDepartment_id() {
        return $this->department_id;
    }

    function getApprove_by() {
        return $this->approve_by;
    }

    function getDepartment() {
        return $this->department;
    }

    function getHrd_comment() {
        return $this->hrd_comment;
    }

    function getComment_date() {
        return $this->comment_date;
    }

    function getHrd_check() {
        return $this->hrd_check;
    }

    function getLevelapprove() {
        return $this->levelapprove;
    }

    function getAbsenttype_id() {
        return $this->absenttype_id;
    }

    function getHire_date() {
        return $this->hire_date;
    }

    function getPosition_id() {
        return $this->position_id;
    }

    function getPosition() {
        return $this->position;
    }

    function getPosition_description() {
        return $this->position_description;
    }

    function getLeave_quota() {
        return $this->leave_quota;
    }

    function getAbsenttypegroup_id() {
        return $this->absenttypegroup_id;
    }

    function getAbsenttype_code() {
        return $this->absenttype_code;
    }

    function getAbsenttype_id_default() {
        return $this->absenttype_id_default;
    }

    function getHrd_comment_default() {
        return $this->hrd_comment_default;
    }
    function get_mail() {
        return $this->_mail;
    }
   
    function getEmployee_id_user_intranet() {
        return $this->employee_id_user_intranet;
    }

    function getEmployee_id_hod_intranet() {
        return $this->employee_id_hod_intranet;
    }

    function getEmployee_id_cc_intranet() {
        return $this->employee_id_cc_intranet;
    }
    
    function getStatus() {
        return $this->status;
    }

    function getAttachment() {
        return $this->attachment;
    }
    

//=================END GETTER===========================
//=================START SETTER===========================


    function setUser_id_ces($user_id_ces) {
        $this->user_id_ces = $user_id_ces;
    }

    function setEmployee_id_ces($employee_id_ces) {
        $this->employee_id_ces = $employee_id_ces;
    }

    function setProject_id_ces($project_id_ces) {
        $this->project_id_ces = $project_id_ces;
    }

    function setPt_id_ces($pt_id_ces) {
        $this->pt_id_ces = $pt_id_ces;
    }

    function setCuti_id($cuti_id) {
        $this->cuti_id = $cuti_id;
    }

    function setEmployee_id($employee_id) {
        $this->employee_id = $employee_id;
    }

    function setNik($nik) {
        $this->nik = $nik;
    }

    function setName($name) {
        $this->name = $name;
    }

    function setStart_date($start_date) {
        $this->start_date = $start_date;
    }

    function setEnd_date($end_date) {
        $this->end_date = $end_date;
    }

    function setTotal($total) {
        $this->total = $total;
    }

    function setDescription($description) {
        $this->description = $description;
    }

    function setApproval_date($approval_date) {
        $this->approval_date = $approval_date;
    }

    function setCutitype_id($cutitype_id) {
        $this->cutitype_id = $cutitype_id;
    }

    function setCutitype($cutitype) {
        $this->cutitype = $cutitype;
    }

    function setCutitype_description($cutitype_description) {
        $this->cutitype_description = $cutitype_description;
    }

    function setIs_potongcuti($is_potongcuti) {
        $this->is_potongcuti = $is_potongcuti;
    }

    function setApprove_id($approve_id) {
        $this->approve_id = $approve_id;
    }

    function setDepartment_id($department_id) {
        $this->department_id = $department_id;
    }

    function setApprove_by($approve_by) {
        $this->approve_by = $approve_by;
    }

    function setDepartment($department) {
        $this->department = $department;
    }

    function setHrd_comment($hrd_comment) {
        $this->hrd_comment = $hrd_comment;
    }

    function setComment_date($comment_date) {
        $this->comment_date = $comment_date;
    }

    function setHrd_check($hrd_check) {
        $this->hrd_check = $hrd_check;
    }

    function setLevelapprove($levelapprove) {
        $this->levelapprove = $levelapprove;
    }

    function setAbsenttype_id($absenttype_id) {
        $this->absenttype_id = $absenttype_id;
    }

    function setHire_date($hire_date) {
        $this->hire_date = $hire_date;
    }

    function setPosition_id($position_id) {
        $this->position_id = $position_id;
    }

    function setPosition($position) {
        $this->position = $position;
    }

    function setPosition_description($position_description) {
        $this->position_description = $position_description;
    }

    function setLeave_quota($leave_quota) {
        $this->leave_quota = $leave_quota;
    }

    function setStatus($status) {
        $this->status = $status;
    }

    function rangeDate($startdate, $enddate) {
        $dates = array();
        $proceeddate = $startdate;
        while ($proceeddate <= $enddate) {
            $date = $proceeddate;
            $dates[] = $date;
            $proceeddate = date('Y-m-d', strtotime("+1 day", strtotime($date)));
        }
        return implode("~", $dates);
    }

    function setAbsenttypegroup_id($absenttypegroup_id) {
        $this->absenttypegroup_id = $absenttypegroup_id;
    }

    function setAbsenttype_code($absenttype_code) {
        $this->absenttype_code = $absenttype_code;
    }

    function setAbsenttype_id_default($absenttype_id_default) {
        $this->absenttype_id_default = $absenttype_id_default;
    }

    function setHrd_comment_default($hrd_comment_default) {
        $this->hrd_comment_default = $hrd_comment_default;
    }
    function setEmployee_id_user_intranet($employee_id_user_intranet) {
        $this->employee_id_user_intranet = $employee_id_user_intranet;
    }

    function setEmployee_id_hod_intranet($employee_id_hod_intranet) {
        $this->employee_id_hod_intranet = $employee_id_hod_intranet;
    }

    function setEmployee_id_cc_intranet($employee_id_cc_intranet) {
        $this->employee_id_cc_intranet = $employee_id_cc_intranet;
    }

    function setAttachment($attachment) {
        $this->attachment = $attachment;
    }
        

    //=================END SETTER===========================
    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;
        if (isset($x['user_id_ces'])) {
            $this->setUser_id_ces($x['user_id_ces']);
        }
        if (isset($x['project_id_ces'])) {
            $this->setProject_id_ces(intval($x['project_id_ces']));
        }
        if (isset($x['pt_id_ces'])) {
            $this->setPt_id_ces($x['pt_id_ces']);
        }
        if (isset($x['employee_id_ces'])) {
            $this->setEmployee_id_ces($x['employee_id_ces']);
        }
        if (isset($x['employee_id'])) {
            $this->setEmployee_id($x['employee_id']);
        }
        if (isset($x['cuti_id'])) {
            $this->setCuti_id($x['cuti_id']);
        }
        if (isset($x['cutitype_id'])) {
            $this->setCutitype_id($x['cutitype_id']);
        }
        if (isset($x['total'])) {
            $this->setTotal($x['total']);
        }
        if (isset($x['NIK'])) {
            $this->setNik($x['NIK']);
        }
        if (isset($x['NAME'])) {
            $this->setName($x['NAME']);
        }
        if (isset($x['start_date'])) {
            $this->setStart_date($x['start_date']);
        }
        if (isset($x['end_date'])) {
            $this->setEnd_date($x['end_date']);
        }
        if (isset($x['approval_date'])) {
            $this->setApproval_date($x['approval_date']);
        }
        if (isset($x['description'])) {
            $this->setDescription($x['description']);
        }
        if (isset($x['cutitype'])) {
            $this->setCutitype($x['cutitype']);
        }
        if (isset($x['cutitype_description'])) {
            $this->setCutitype_description($x['cutitype_description']);
        }
        if (isset($x['is_potongcuti'])) {
            $this->setIs_potongcuti($x['is_potongcuti']);
        }
        if (isset($x['approve_by'])) {
            $this->setApprove_by($x['approve_by']);
        }
        if (isset($x['approve_id'])) {
            $this->setApprove_id($x['approve_id']);
        }
        if (isset($x['department_id'])) {
            $this->setDepartment_id($x['department_id']);
        }
        if (isset($x['department'])) {
            $this->setDepartment($x['department']);
        }
        if (isset($x['hrd_comment'])) {
            $this->setHrd_comment($x['hrd_comment']);
        }

        if (isset($x['comment_date'])) {
            $this->setComment_date($x['comment_date']);
        }
        if (isset($x['hrd_check'])) {
            $this->setHrd_check($x['hrd_check']);
        }
        if (isset($x['levelapprove'])) {
            $this->setLevelapprove($x['levelapprove']);
        }
        if (isset($x['absenttype_id'])) {
            $this->setAbsenttype_id($x['absenttype_id']);
        }
        if (isset($x['absenttype_id_default'])) {
            $this->setAbsenttype_id_default($x['absenttype_id_default']);
        }
        if (isset($x['hire_date'])) {
            $this->setHire_date($x['hire_date']);
        }
        if (isset($x['position_id'])) {
            $this->setPosition_id($x['position_id']);
        }
        if (isset($x['position'])) {
            $this->setPosition($x['position']);
        }
        if (isset($x['position_description'])) {
            $this->setPosition_description($x['position_description']);
        }
        if (isset($x['leave_quota'])) {
            $this->setLeave_quota($x['leave_quota']);
        }
        if (isset($x['absenttypegroup_id'])) {
            $this->setAbsenttypegroup_id($x['absenttypegroup_id']);
        }
        if (isset($x['absenttype_code'])) {
            $this->setAbsenttype_code($x['absenttype_code']);
        }
        if (isset($x['hrd_comment_default'])) {
            $this->setHrd_comment_default($x['hrd_comment_default']);
        }
        if (isset($x['employee_id_user_intranet'])) {
            $this->setEmployee_id_user_intranet($x['employee_id_user_intranet']);
        }
        if (isset($x['employee_id_cc_intranet'])) {
            $this->setEmployee_id_cc_intranet($x['employee_id_cc_intranet']);
        }
        if (isset($x['employee_id_hod_intranet'])) {
            $this->setEmployee_id_hod_intranet($x['employee_id_hod_intranet']);
        }
        if (isset($x['reportoinmultiposition'])) {
            $this->setreportoinmultiposition($x['reportoinmultiposition']);
        }
        if (isset($x['status'])) {
            $this->setstatus($x['status']);
        }
        if (isset($x['attachment'])) {
            $this->setAttachment($x['attachment']);
        }

        unset($x);
    }

    public function getArrayTable() {
        $x = array(
            'user_id_ces' => intval($this->getUser_id_ces()),
            'employee_id_ces' => intval($this->getEmployee_id_ces()),
            'project_id_ces' => intval($this->getProject_id_ces()),
            'pt_id_ces' => intval($this->getPt_id_ces()),
            'employee_id' => intval($this->getEmployee_id()),
            'employee_id_user_intranet' => intval($this->getEmployee_id_user_intranet()),
            'employee_id_cc_intranet' => intval($this->getEmployee_id_cc_intranet()),
            'employee_id_hod_intranet' => intval($this->getEmployee_id_hod_intranet()),
            'cuti_id' => intval($this->getCuti_id()),
            'approve_id' => intval($this->getApprove_id()),
            'department_id' => intval($this->getDepartment_id()),
            'absenttype_id' => intval($this->getAbsenttype_id()),
            'absenttype_id_default' => intval($this->getAbsenttype_id_default()),
            'position_id' => intval($this->getPosition_id()),
            'nik' => strval($this->getNik()),
            'name' => strval($this->getName()),
            'approve_by' => strval($this->getApprove_by()),
            'department' => strval($this->getDepartment()),
            'hrd_comment' => strval($this->getHrd_comment()),
            'levelapprove' => strval($this->getLevelapprove()),
            'position' => strval($this->getPosition()),
            'position_description' => strval($this->getPosition_description()),
            'hrd_check' => strval($this->getHrd_check()),
            'start_date' => date('Y-m-d', strtotime($this->getStart_date())),
            'end_date' => date('Y-m-d', strtotime($this->getEnd_date())),
            'comment_date' => date('Y-m-d', strtotime($this->getComment_date())),
            'hire_date' => date('Y-m-d', strtotime($this->getHire_date())),
            'total' => floatval($this->getTotal()),
            'leave_quota' => floatval($this->getLeave_quota()),
            'description' => strval($this->getDescription()),
            'approval_date' => date('Y-m-d', strtotime($this->getApproval_date())),
            'cutitype_id' => intval($this->getCutitype_id()),
            'cutitype' => strval($this->getCutitype()),
            'cutitype_description' => strval($this->getCutitype_description()),
            'is_potongcuti' => strval($this->getIs_potongcuti()),
            'absenttype_code' => strval($this->getAbsenttype_code()),
            'absenttypegroup_id' => strval($this->getAbsenttypegroup_id()),
            'hrd_comment_default' => strval($this->getHrd_comment_default()),
            'reportoinmultiposition' => strval($this->getReportoinmultiposition()),
            'status' => strval($this->getStatus()),
            'attachment' => strval($this->getAttachment()),
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
        return array('start_date', 'comment_date', 'end_date', 'approval_date', 'hire_date');
    }

}

?>
