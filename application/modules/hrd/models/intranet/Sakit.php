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
class Hrd_Models_Intranet_Sakit extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora {

    public $user_id_ces;
    public $employee_id_ces;
    private $project_id_ces;
    private $pt_id_ces;
    private $sakit_id;
    private $employee_id;
    private $nik;
    private $name;
    private $tgl_berangkat;
    private $tgl_kembali;
    private $sakittype_id;
    private $sakittype;
    private $attachment;
    private $approval_date;
    private $department;
    private $code;
    private $location;
    private $department_id;
    private $approve_by;
    private $hrd_comment;
    private $comment_date;
    private $hrd_check;
    private $hire_date;
    private $position_id;
    private $position;
    private $position_description;
    private $description;
    private $employee_employee_id;
    private $tlk_project_type;
    private $parametertlk_id;
    private $tlk_other;
    private $start_date;
    private $end_date;
    private $configintranet;
    private $employee_id_user_intranet;
    private $employee_id_hod_intranet;
    private $employee_id_cc_intranet;
    private $status;
    private $absenttype_id;
    private $absenttypegroup_id;
    private $absenttype_code;

    public function __construct($prefix = NULL) {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        //$this->_mail = Zend_Controller_Action_HelperBroker::getStaticHelper('Email');
		$this->_mail = new Hrd_Models_General_Email();
        parent::__construct();
        $this->embedPrefix = $prefix ? $prefix : "intranet_";
    }

    //=================START GETTER===========================    
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
    function getUserlogin() {
        return $this->session->getUserId();
    }
    function get_mail() {
        return $this->_mail;
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

    function getSakit_id() {
        return $this->sakit_id;
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

    function getTanggal_berangkat() {
        return $this->tgl_berangkat;
    }

    function getTanggal_kembali() {
        return $this->tgl_kembali;
    }

    function getSakittype_id() {
        return $this->sakittype_id;
    }

    function getSakittype() {
        return $this->sakittype;
    }

    function getAttachment() {
        return $this->attachment;
    }

    function getApproval_date() {
        return $this->approval_date;
    }

    function getDepartment() {
        return $this->department;
    }

    function getCode() {
        return $this->code;
    }

    function getLocation() {
        return $this->location;
    }
    function getTgl_berangkat() {
        return $this->tgl_berangkat;
    }

    function getTgl_kembali() {
        return $this->tgl_kembali;
    }

    function getDepartment_id() {
        return $this->department_id;
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
    function getDescription() {
        return $this->description;
    }

    function getEmployee_employee_id() {
        return $this->employee_employee_id;
    }

    function getTlk_project_type() {
        return $this->tlk_project_type;
    }

    function getParametertlk_id() {
        return $this->parametertlk_id;
    }

    function getTlk_other() {
        return $this->tlk_other;
    }

    function getStart_date() {
        return $this->start_date;
    }

    function getEnd_date() {
        return $this->end_date;
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

    function getAbsenttype_id() {
        return $this->absenttype_id;
    }

    function getAbsenttypegroup_id() {
        return $this->absenttypegroup_id;
    }

    function getAbsenttype_code() {
        return $this->absenttype_code;
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

    function setSakit_id($sakit_id) {
        $this->sakit_id = $sakit_id;
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

    function setTanggal_berangkat($tgl_berangkat) {
        $this->tgl_berangkat = $tgl_berangkat;
    }

    function setTanggal_kembali($tgl_kembali) {
        $this->tgl_kembali = $tgl_kembali;
    }

    function setSakittype_id($sakittype_id) {
        $this->sakittype_id = $sakittype_id;
    }

    function setSakittype($sakittype) {
        $this->sakittype = $sakittype;
    }

    function setAttachment($attachment) {
        $this->attachment = $attachment;
    }

    function setApproval_date($approval_date) {
        $this->approval_date = $approval_date;
    }

    function setDepartment($department) {
        $this->department = $department;
    }

    function setCode($code) {
        $this->code = $code;
    }

    function setLocation($location) {
        $this->location = $location;
    }
    function setTgl_berangkat($tgl_berangkat) {
        $this->tgl_berangkat = $tgl_berangkat;
    }

    function setTgl_kembali($tgl_kembali) {
        $this->tgl_kembali = $tgl_kembali;
    }

    function setDepartment_id($department_id) {
        $this->department_id = $department_id;
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
    function setDescription($description) {
        $this->description = $description;
    }
    function setEmployee_employee_id($employee_employee_id) {
        $this->employee_employee_id = $employee_employee_id;
    }

    function setTlk_project_type($tlk_project_type) {
        $this->tlk_project_type = $tlk_project_type;
    }

    function setParametertlk_id($parametertlk_id) {
        $this->parametertlk_id = $parametertlk_id;
    }

    function setTlk_other($tlk_other) {
        $this->tlk_other = $tlk_other;
    }

    function setStart_date($start_date) {
        $this->start_date = $start_date;
    }

    function setEnd_date($end_date) {
        $this->end_date = $end_date;
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

    function setAbsenttype_id($absenttype_id) {
        $this->absenttype_id = $absenttype_id;
    }

    function setAbsenttypegroup_id($absenttypegroup_id) {
        $this->absenttypegroup_id = $absenttypegroup_id;
    }

    function setAbsenttype_code($absenttype_code) {
        $this->absenttype_code = $absenttype_code;
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
        if (isset($x['department_id'])) {
            $this->setDepartment_id($x['department_id']);
        }
        if (isset($x['department'])) {
            $this->setDepartment($x['department']);
        }
        if (isset($x['sakit_id'])) {
            $this->setSakit_id($x['sakit_id']);
        }
        if (isset($x['NIK'])) {
            $this->setNik($x['NIK']);
        }
        if (isset($x['NAME'])) {
            $this->setName($x['NAME']);
        }
        if (isset($x['start_date'])) {
            $this->setTanggal_berangkat($x['start_date']);
        }
        if (isset($x['end_date'])) {
            $this->setTanggal_kembali($x['end_date']);
        }
        if (isset($x['approval_date'])) {
            $this->setApproval_date($x['approval_date']);
        }
        if (isset($x['hire_date'])) {
            $this->setHire_date($x['hire_date']);
        }
        if (isset($x['sakittype_id'])) {
            $this->setSakittype_id($x['sakittype_id']);
        }
        if (isset($x['sakittype'])) {
            $this->setSakittype($x['sakittype']);
        }
        if (isset($x['attachment'])) {
            $this->setAttachment($x['attachment']);
        }
        if (isset($x['code'])) {
            $this->setCode($x['code']);
        }
        if (isset($x['location'])) {
            $this->setLocation($x['location']);
        }
        if (isset($x['approve_by'])) {
            $this->setApprove_by($x['approve_by']);
        }
        if (isset($x['hrd_check'])) {
            $this->setHrd_check($x['hrd_check']);
        }
        if (isset($x['hrd_comment'])) {
            $this->setHrd_comment($x['hrd_comment']);
        }
        if (isset($x['comment_date'])) {
            $this->setComment_date($x['comment_date']);
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
        if (isset($x['description'])) {
            $this->setDescription($x['description']);
        }
        if (isset($x['employee_employee_id'])) {
            $this->setEmployee_employee_id($x['employee_employee_id']);
        }
        if (isset($x['tlk_project_type'])) {
            $this->setTlk_project_type($x['tlk_project_type']);
        }
        if (isset($x['parametertlk_id'])) {
            $this->setParametertlk_id($x['parametertlk_id']);
        }
        if (isset($x['tlk_other'])) {
            $this->setTlk_other($x['tlk_other']);
        }
        if (isset($x['start_date'])) {
            $this->setStart_date($x['start_date']);
        }
        if (isset($x['end_date'])) {
            $this->setEnd_date($x['end_date']);
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
        
        // edit by wulan sari 20181224
        if (isset($x['start_date_time'])) {
            $this->setStart_date_time($x['start_date_time']);
        }
        if (isset($x['end_date_time'])) {
            $this->setEnd_date_time($x['end_date_time']);
        }
        // end edit by wulan sari 20181224
        if (isset($x['status'])) {
            $this->setStatus($x['status']);
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
            'deptcode' => strval($this->getDepartment()),
            'sakit_id' => intval($this->getSakit_id()),
            'nik' => strval($this->getNik()),
            'name' => strval($this->getName()),
            'start_date' => strval($this->getTanggal_berangkat()),
            'end_date' => strval($this->getTanggal_kembali()),
            'approval_date' => date('Y-m-d', strtotime($this->getApproval_date())),
            'comment_date' => date('Y-m-d', strtotime($this->getComment_date())),
            'hire_date' => date('Y-m-d', strtotime($this->getHire_date())),
            'sakittype_id' => intval($this->getSakittype_id()),
            'sakittype' => strval($this->getSakittype()),
            'attachment' => strval($this->getAttachment()),
            'code' => strval($this->getCode()),
            'location' => strval($this->getLocation()),
            'department_id' => intval($this->getDepartment_id()),
            'approve_by' => strval($this->getApprove_by()),
            'department' => strval($this->getDepartment()),
            'hrd_comment' => strval($this->getHrd_comment()),
            'position' => strval($this->getPosition()),
            'position_description' => strval($this->getPosition_description()),
            'hrd_check' => strval($this->getHrd_check()),
            'position_id' => intval($this->getPosition_id()),
            'description' => strval($this->getDescription()),
            'employee_employee_id' => intval($this->getEmployee_employee_id()),
            'tlk_project_type' => strval($this->getTlk_project_type()),
            'parametertlk_id' => intval($this->getParametertlk_id()),
            'tlk_other' => strval($this->getTlk_other()),
            'start_date' => date('Y-m-d', strtotime($this->getStart_date())),
            'end_date' => date('Y-m-d', strtotime($this->getEnd_date())),
            'configintranet' => strval($this->getConfigintranet()),
            'start_date_time' => date('Y-m-d H:i:s', strtotime($this->getStart_date())),
            'end_date_time' => date('Y-m-d H:i:s', strtotime($this->getEnd_date())),
            'status' => strval($this->getStatus()),
            'absenttype_id' => intval($this->getAbsenttype_id()),
            'absenttypegroup_id' => strval($this->getAbsenttypegroup_id()),
            'absenttype_code' => strval($this->getAbsenttype_code()),
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
        return array('start_date', 'end_date', 'approval_date','comment_date','hire_date');
    }

}

?>
