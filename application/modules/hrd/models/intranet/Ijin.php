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
class Hrd_Models_Intranet_Ijin extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora {

    public $user_id_ces;
    public $employee_id_ces;
    private $project_id_ces;
    private $pt_id_ces;
    private $izin_id;
    private $employee_id;
    private $department_id;
    private $department;
    private $nik;
    private $name;
    private $izin_date;
    private $start_time;
    private $end_time;
    private $description;
    private $approval_date;
    private $approve_by;
    private $izintype_id;
    private $izintype;
    private $hrd_comment;
    private $comment_date;
    private $hrd_check;
    private $hire_date;
    private $position_id;
    private $position;
    private $position_description;
    private $absenttype_id;
    private $absenttypegroup_id;
    private $absenttype_code;
    private $absentdetail_id;
    private $employee_employee_id;
    private $absenttype_absenttype_id;
    private $start_date;
    private $end_date;
    private $is_halfday;
    private $note;
    private $absenttypegroup_absenttypegroup_id;
    private $configintranet;
    private $_mail = null;
    private $employee_id_user_intranet;
    private $employee_id_hod_intranet;
    private $employee_id_cc_intranet;
    private $reportoinmultiposition;
    private $status;

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

    function get_mail() {
        return $this->_mail;
    }

    function getUserlogin() {
        return $this->session->getUserId();
    }

    function getUser_id_ces() {
        return $this->user_id_ces;
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

    function getIzin_id() {
        return $this->izin_id;
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

    function getIzin_date() {
        return $this->izin_date;
    }

    function getStart_time() {
        return $this->start_time;
    }

    function getEnd_time() {
        return $this->end_time;
    }

    function getDescription() {
        return $this->description;
    }

    function getApproval_date() {
        return $this->approval_date;
    }

    function getIzintype_id() {
        return $this->izintype_id;
    }

    function getIzintype() {
        return $this->izintype;
    }

    function getDepartment_id() {
        return $this->department_id;
    }

    function getDepartment() {
        return $this->department;
    }

    function getApprove_by() {
        return $this->approve_by;
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

    function getAbsenttype_id() {
        return $this->absenttype_id;
    }

    function getAbsenttypegroup_id() {
        return $this->absenttypegroup_id;
    }

    function getAbsenttype_code() {
        return $this->absenttype_code;
    }

    function getAbsentdetail_id() {
        return $this->absentdetail_id;
    }

    function getEmployee_employee_id() {
        return $this->employee_employee_id;
    }

    function getAbsenttype_absenttype_id() {
        return $this->absenttype_absenttype_id;
    }

    function getStart_date() {
        return $this->start_date;
    }

    function getEnd_date() {
        return $this->end_date;
    }

    function getIs_halfday() {
        return $this->is_halfday;
    }

    function getNote() {
        return $this->note;
    }

    function getAbsenttypegroup_absenttypegroup_id() {
        return $this->absenttypegroup_absenttypegroup_id;
    }

    function getConfigintranet() {
        return $this->configintranet;
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

    function setIzin_id($izin_id) {
        $this->izin_id = $izin_id;
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

    function setIzin_date($izin_date) {
        $this->izin_date = $izin_date;
    }

    function setStart_time($start_time) {
        $this->start_time = $start_time;
    }

    function setEnd_time($end_time) {
        $this->end_time = $end_time;
    }

    function setDescription($description) {
        $this->description = $description;
    }

    function setApproval_date($approval_date) {
        $this->approval_date = $approval_date;
    }

    function setIzintype_id($izintype) {
        $this->izintype = $izintype;
    }

    function setIzintype($izintype) {
        $this->izintype = $izintype;
    }

    function setDepartment_id($department_id) {
        $this->department_id = $department_id;
    }

    function setDepartment($department) {
        $this->department = $department;
    }

    function setApprove_by($approve_by) {
        $this->approve_by = $approve_by;
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

    function setAbsenttype_id($absenttype_id) {
        $this->absenttype_id = $absenttype_id;
    }

    function setAbsenttypegroup_id($absenttypegroup_id) {
        $this->absenttypegroup_id = $absenttypegroup_id;
    }

    function setAbsenttype_code($absenttype_code) {
        $this->absenttype_code = $absenttype_code;
    }

    function setAbsentdetail_id($absentdetail_id) {
        $this->absentdetail_id = $absentdetail_id;
    }

    function setEmployee_employee_id($employee_employee_id) {
        $this->employee_employee_id = $employee_employee_id;
    }

    function setAbsenttype_absenttype_id($absenttype_absenttype_id) {
        $this->absenttype_absenttype_id = $absenttype_absenttype_id;
    }

    function setStart_date($start_date) {
        $this->start_date = $start_date;
    }

    function setEnd_date($end_date) {
        $this->end_date = $end_date;
    }

    function setIs_halfday($is_halfday) {
        $this->is_halfday = $is_halfday;
    }

    function setNote($note) {
        $this->note = $note;
    }

    function setAbsenttypegroup_absenttypegroup_id($absenttypegroup_absenttypegroup_id) {
        $this->absenttypegroup_absenttypegroup_id = $absenttypegroup_absenttypegroup_id;
    }

    function setConfigintranet($configintranet) {
        $this->configintranet = $configintranet;
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
    
    function setStatus($status) {
        $this->status = $status;
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
        if (isset($x['izin_id'])) {
            $this->setIzin_id($x['izin_id']);
        }
        if (isset($x['izintype'])) {
            $this->setIzintype_id($x['izintype']);
        }
        if (isset($x['NIK'])) {
            $this->setNik($x['NIK']);
        }
        if (isset($x['NAME'])) {
            $this->setName($x['NAME']);
        }
        if (isset($x['izin_date'])) {
            $this->setIzin_date($x['izin_date']);
        }
        if (isset($x['start_time'])) {
            $this->setStart_time($x['start_time']);
        }
        if (isset($x['end_time'])) {
            $this->setEnd_time($x['end_time']);
        }
        if (isset($x['approval_date'])) {
            $this->setApproval_date($x['approval_date']);
        }
        if (isset($x['description'])) {
            $this->setDescription($x['description']);
        }
        if (isset($x['izintype'])) {
            $this->setIzintype($x['izintype']);
        }
        if (isset($x['approve_by'])) {
            $this->setApprove_by($x['approve_by']);
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
        if (isset($x['absenttype_id'])) {
            $this->setAbsenttype_id($x['absenttype_id']);
        }
        if (isset($x['absenttypegroup_id'])) {
            $this->setAbsenttypegroup_id($x['absenttypegroup_id']);
        }
        if (isset($x['absenttype_code'])) {
            $this->setAbsenttype_code($x['absenttype_code']);
        }
        if (isset($x['absentdetail_id'])) {
            $this->setAbsentdetail_id($x['absentdetail_id']);
        }
        if (isset($x['employee_employee_id'])) {
            $this->setEmployee_employee_id($x['employee_employee_id']);
        }
        if (isset($x['absenttype_absenttype_id'])) {
            $this->setAbsenttype_absenttype_id($x['absenttype_absenttype_id']);
        }
        if (isset($x['start_date'])) {
            $this->setStart_date($x['start_date']);
        }
        if (isset($x['end_date'])) {
            $this->setEnd_date($x['end_date']);
        }
        if (isset($x['is_halfday'])) {
            $this->setIs_halfday($x['is_halfday']);
        }
        if (isset($x['absenttypegroup_absenttypegroup_id'])) {
            $this->setAbsenttypegroup_absenttypegroup_id($x['absenttypegroup_absenttypegroup_id']);
        }
        if (isset($x['note'])) {
            $this->setNote($x['note']);
        }
        if (isset($x['configintranet'])) {
            $this->setConfigintranet($x['configintranet']);
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
            $this->setStatus($x['status']);
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
            'izin_id' => intval($this->getIzin_id()),
            'department_id' => intval($this->getDepartment_id()),
            'absenttype_id' => intval($this->getAbsenttype_id()),
            'nik' => strval($this->getNik()),
            'name' => strval($this->getName()),
            'izin_date' => date('Y-m-d', strtotime($this->getIzin_date())),
            'start_time' => strval($this->getStart_time()),
            'end_time' => strval($this->getEnd_time()),
            'approval_date' => date('Y-m-d', strtotime($this->getApproval_date())),
            'comment_date' => date('Y-m-d', strtotime($this->getComment_date())),
            'hire_date' => date('Y-m-d', strtotime($this->getHire_date())),
            'description' => strval($this->getDescription()),
            'izintype_id' => intval($this->getIzin_id()),
            'izintype' => strval($this->getIzintype()),
            'approve_by' => strval($this->getApprove_by()),
            'department' => strval($this->getDepartment()),
            'hrd_comment' => strval($this->getHrd_comment()),
            'position' => strval($this->getPosition()),
            'position_description' => strval($this->getPosition_description()),
            'hrd_check' => strval($this->getHrd_check()),
            'position_id' => intval($this->getPosition_id()),
            'absenttype_code' => strval($this->getAbsenttype_code()),
            'absenttypegroup_id' => strval($this->getAbsenttypegroup_id()),
            'absentdetail_id' => intval($this->getAbsentdetail_id()),
            'employee_employee_id' => intval($this->getEmployee_employee_id()),
            'absenttype_absenttype_id' => intval($this->getAbsenttype_absenttype_id()),
            'start_date' => date('Y-m-d', strtotime($this->getStart_date())),
            'end_date' => date('Y-m-d', strtotime($this->getEnd_date())),
            'is_halfday' => (bool) "",
            'note' => strval($this->getNote()),
            'absenttypegroup_absenttypegroup_id' => intval($this->getAbsenttypegroup_absenttypegroup_id()),
            'configintranet' => strval($this->getConfigintranet()),
            'reportoinmultiposition' => strval($this->getReportoinmultiposition()),
            'status' => strval($this->getStatus()),
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
        return array('izin_date', 'approval_date', 'comment_date', 'hire_date');
    }

}

?>
