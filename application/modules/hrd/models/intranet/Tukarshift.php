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
class Hrd_Models_Intranet_Tukarshift extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora {

    public $user_id_ces;
    public $employee_id_ces;
    
    private $project_id_ces;
    private $pt_id_ces;
    private $tukarshift_id;
    private $employee_id;
    private $employee_id2;
    private $department_id;
    private $department;
    private $shifttype_cur;
    private $shifttype_cur2;
    private $shifttype_req;
    private $shifttype_req2;
    private $description;
    private $date;
    private $status_name;
    private $status;
    private $status_hrd_check;    
    private $approval_date_byreportto;
    private $approval_date_byemp2;
    private $hrd_comment;
    private $comment_date;
    private $hrd_check;
    private $hire_date;
    private $nik;
    private $name;
    private $name2;
    private $reportoinmultiposition;
    private $approve_byreportto;
    
    //update by michael 2022-06-27 utk switch
    private $option_shift_change;
    private $option_shift_change_name;
    /*
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
    private $employee_id_user_intranet;
    private $employee_id_hod_intranet;
    private $employee_id_cc_intranet;
    private $status;
    */
    private $_mail = null;
    
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

    function getTukarshift_id() {
        return $this->tukarshift_id;
    }

    function getEmployee_id() {
        return $this->employee_id;
    }

    function getEmployee_id2() {
        return $this->employee_id2;
    }

    function getDepartment_id() {
        return $this->department_id;
    }

    function getDepartment() {
        return $this->department;
    }

    function getShifttype_cur() {
        return $this->shifttype_cur;
    }

    function getShifttype_cur2() {
        return $this->shifttype_cur2;
    }

    function getShifttype_req() {
        return $this->shifttype_req;
    }

    function getShifttype_req2() {
        return $this->shifttype_req2;
    }

    function getDescription() {
        return $this->description;
    }
    
    function getDate() {
        return $this->date;
    }
    
    function getStatus_name() {
        return $this->status_name;
    }
    
    function getStatus() {
        return $this->status;
    }
    
    function getStatus_hrd_check() {
        return $this->status_hrd_check;
    }

    function getApproval_date_byreportto() {
        return $this->approval_date_byreportto;
    }

    function getApproval_date_byemp2() {
        return $this->approval_date_byemp2;
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
    
    function getNik() {
        return $this->nik;
    }

    function getName() {
        return $this->name;
    }
    
    function getName2() {
        return $this->name2;
    }

    function getApprove_byreportto() {
        return $this->approve_byreportto;
    }

    //update by michael 2022-06-27 utk switch
    function getOptionShiftChange() {
        return $this->option_shift_change;
    }

    function getOptionShiftChangeName() {
        return $this->option_shift_change_name;
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
    
    function setTukarshift_id($tukarshift_id) {
        $this->tukarshift_id = $tukarshift_id;
    }

    function setEmployee_id($employee_id) {
        $this->employee_id = $employee_id;
    }

    function setEmployee_id2($employee_id2) {
        $this->employee_id2 = $employee_id2;
    }

    function setDepartment_id($department_id) {
        $this->department_id = $department_id;
    }

    function setDepartment($department) {
        $this->department = $department;
    }
    
    function setShifttype_cur($shifttype_cur) {
        $this->shifttype_cur = $shifttype_cur;
    }
    
    function setShifttype_cur2($shifttype_cur2) {
        $this->shifttype_cur2 = $shifttype_cur2;
    }
    
    function setShifttype_req($shifttype_req) {
        $this->shifttype_req = $shifttype_req;
    }

    function setShifttype_req2($shifttype_req2) {
        $this->shifttype_req2 = $shifttype_req2;
    }

    function setDescription($description) {
        $this->description = $description;
    }
    
    function setDate($date) {
        $this->date = $date;
    }
    
    function setStatus_name($status_name) {
        $this->status_name = $status_name;
    }
    
    function setStatus($status) {
        $this->status = $status;
    }
    
    function setStatus_hrd_check($status_hrd_check) {
        $this->status_hrd_check = $status_hrd_check;
    }
    
    function setApproval_date_byreportto($approval_date_byreportto) {
        $this->approval_date_byreportto = $approval_date_byreportto;
    }
        
    function setApproval_date_byemp2($approval_date_byemp2) {
        $this->approval_date_byemp2 = $approval_date_byemp2;
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
    
    function setNik($nik) {
        $this->nik = $nik;
    }

    function setName($name) {
        $this->name = $name;
    }

    function setName2($name2) {
        $this->name2 = $name2;
    }

    function setApprove_byreportto($approve_byreportto) {
        $this->approve_byreportto = $approve_byreportto;
    }

    //update by michael 2022-06-27 utk switch
    function setOptionShiftChange($option_shift_change) {
        $this->option_shift_change = $option_shift_change;
    }

    function setOptionShiftChangeName($option_shift_change_name) {
        $this->option_shift_change_name = $option_shift_change_name;
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
        if (isset($x['tukarshift_id'])) {
            $this->setTukarshift_id($x['tukarshift_id']);
        }
        if (isset($x['employee_id_ces'])) {
            $this->setEmployee_id_ces($x['employee_id_ces']);
        }
        if (isset($x['employee_id'])) {
            $this->setEmployee_id($x['employee_id']);
        }
        if (isset($x['employee_id2'])) {
            $this->setEmployee_id($x['employee_id2']);
        }
        if (isset($x['department_id'])) {
            $this->setDepartment_id($x['department_id']);
        }
        if (isset($x['department'])) {
            $this->setDepartment($x['department']);
        }
        if (isset($x['shifttype_cur'])) {
            $this->setShifttype_cur($x['shifttype_cur']);
        }
        if (isset($x['shifttype_cur2'])) {
            $this->setShifttype_cur2($x['shifttype_cur2']);
        }
        if (isset($x['shifttype_req'])) {
            $this->setShifttype_req($x['shifttype_req']);
        }
        if (isset($x['shifttype_req2'])) {
            $this->setShifttype_req2($x['shifttype_req2']);
        }
        if (isset($x['description'])) {
            $this->setDescription($x['description']);
        }
        if (isset($x['date'])) {
            $this->setDate($x['date']);
        }
        if (isset($x['status_name'])) {
            $this->setStatus_name($x['status_name']);
        }
        if (isset($x['date'])) {
            $this->setDate($x['date']);
        }
        if (isset($x['status'])) {
            $this->setStatus($x['status']);
        }
        if (isset($x['status_hrd_check'])) {
            $this->setStatus_hrd_check($x['status_hrd_check']);
        }        
        if (isset($x['approval_date_byreportto'])) {
            $this->setApproval_date_byreportto($x['approval_date_byreportto']);
        }        
        if (isset($x['approval_date_byemp2'])) {
            $this->setApproval_date_byemp2($x['approval_date_byemp2']);
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
        if (isset($x['nik'])) {
            $this->setNik($x['nik']);
        }
        if (isset($x['name'])) {
            $this->setName($x['name']);
        }
        if (isset($x['name2'])) {
            $this->setName2($x['name2']);
        }
        if (isset($x['reportoinmultiposition'])) {
            $this->setreportoinmultiposition($x['reportoinmultiposition']);
        }
        if (isset($x['approve_byreportto'])) {
            $this->setApprove_byreportto($x['approve_byreportto']);
        }

        //update by michael 2022-06-27 utk switch
        if (isset($x['option_shift_change'])) {
            $this->setOptionShiftChange($x['option_shift_change']);
        }
        if (isset($x['option_shift_change_name'])) {
            $this->setOptionShiftChangeName($x['option_shift_change_name']);
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
            'employee_id2' => intval($this->getEmployee_id2()),
            'tukarshift_id' => intval($this->getTukarshift_id()),
            'department_id' => intval($this->getDepartment_id()),
            'department' => $this->getDepartment(),
            'shifttype_cur' => $this->getShifttype_cur(),
            'shifttype_cur2' => $this->getShifttype_cur2(),
            'shifttype_req' => $this->getShifttype_req(),
            'shifttype_req2' => $this->getShifttype_req2(),
            'description' => strval($this->getDescription()),
            'date' => date('Y-m-d', strtotime($this->getDate())),
            'status_name' => strval($this->getStatus_name()),
            'status' => strval($this->getStatus()),
            'status_hrd_check' => strval($this->getStatus_hrd_check()),
            'approval_date_byreportto' => date('Y-m-d', strtotime($this->getApproval_date_byreportto())),
            'approval_date_byemp2' => date('Y-m-d', strtotime($this->getApproval_date_byemp2())),
            'hrd_comment' => strval($this->getHrd_comment()),
            'comment_date' => date('Y-m-d', strtotime($this->getComment_date())),
            'hrd_check' => strval($this->getHrd_check()),
            'hire_date' => date('Y-m-d', strtotime($this->getHire_date())),
            'nik' => strval($this->getNik()),
            'name' => strval($this->getName()),
            'name2' => strval($this->getName2()),
            'reportoinmultiposition' => strval($this->getReportoinmultiposition()),
            'approve_byreportto' => strval($this->getApprove_byreportto()),

            //update by michael 2022-06-27 utk switch
            'option_shift_change' => strval($this->getOptionShiftChange()),
            'option_shift_change_name' => strval($this->getOptionShiftChangeName())
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
        return array('date', 'approval_date_byreportto', 'approval_date_byemp2', 'comment_date', 'hire_date');
    }

}

?>
