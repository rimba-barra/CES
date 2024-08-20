<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * 
 *
 * @author Ahmad Riadi
 */
class Hrd_Models_Transferapi_Transferapitransaction extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,Box_Models_Master_InterProjectPt {

    private $project_id;
    private $pt_id;    
    private $project_name;
    private $pt_name;    
    private $employee_id;
    private $employee_name;
    private $nik_group;
    private $department_id;
    private $department;
    
    private $total_attendance;
    private $total_overtime;
    private $total_uang_makan;
    private $total_medical_claim;
    private $total_unpaid_leave;
    private $hire_date;
    private $total_saldocuti_bayar;
    private $total_potongan_transport;
    private $sisa_cuti;
    private $total_saldocuti_minus;

    private $status_transfer;
    private $update_hcms;

    private $company_code;
    private $code;
    private $productivity_form_code;
    private $productivitydetail_form_code;
    private $employee_code;

    private $start_date;
    private $end_date;

    private $upload_check;
    private $action_process;
    /*
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "department_";
    }*/
    
    public function __construct($prefix=NULL) {
        parent::__construct();
        $this->embedPrefix = $prefix?$prefix:"transferapitransaction_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        if(isset ($x['project_id'])){
           $this->setProjectId($x['project_id']); 
        }
        if(isset ($x['project_name'])){
           $this->setProjectName($x['project_name']); 
        }
        if(isset ($x['pt_id'])){
           $this->setPtId($x['pt_id']); 
        }
        if(isset ($x['pt_name'])){
           $this->setPtName($x['pt_name']); 
        }
        if(isset ($x['employee_id'])){
           $this->setEmployeeId($x['employee_id']); 
        }
        if(isset ($x['employee_name'])){
           $this->setEmployeeName($x['employee_name']); 
        }
        if(isset ($x['department_id'])){
           $this->setDepartmentId($x['department_id']); 
        }
        if(isset ($x['department'])){
           $this->setDepartmentName($x['department']); 
        }
        if(isset ($x['nik_group'])){
           $this->setNikGroup($x['nik_group']); 
        }

        if(isset ($x['total_attendance'])){
           $this->setTotalAttendance($x['total_attendance']); 
        }
        if(isset ($x['total_overtime'])){
           $this->setTotalOvertime($x['total_overtime']); 
        }
        if(isset ($x['total_uang_makan'])){
           $this->setTotalUangMakan($x['total_uang_makan']); 
        }
        if(isset ($x['total_medical_claim'])){
           $this->setTotalMedicalClaim($x['total_medical_claim']); 
        }
        if(isset ($x['total_unpaid_leave'])){
           $this->setTotalUnpaidLeave($x['total_unpaid_leave']); 
        }
        if(isset ($x['hire_date'])){
           $this->setHireDate($x['hire_date']); 
        }
        if(isset ($x['total_saldocuti_bayar'])){
           $this->setTotalSaldoCutiBayar($x['total_saldocuti_bayar']); 
        }
        if(isset ($x['total_potongan_transport'])){
           $this->setTotalPotonganTransport($x['total_potongan_transport']); 
        }
        if(isset ($x['sisa_cuti'])){
           $this->setSisaCuti($x['sisa_cuti']); 
        }
        if(isset ($x['total_saldocuti_minus'])){
           $this->setTotalSaldoCutiMinus($x['total_saldocuti_minus']); 
        }
        if(isset ($x['status_transfer'])){
           $this->setStatusTransfer($x['status_transfer']); 
        }
        if(isset ($x['update_hcms'])){
           $this->setUpdateHcms($x['update_hcms']); 
        }
        if(isset ($x['company_code'])){
           $this->setCompanyCode($x['company_code']); 
        }
        if(isset ($x['code'])){
           $this->setCode($x['code']); 
        }
        if(isset ($x['productivity_form_code'])){
           $this->setPFCode($x['productivity_form_code']); 
        }
        if(isset ($x['productivitydetail_form_code'])){
           $this->setPDFCode($x['productivitydetail_form_code']); 
        }
        if(isset ($x['employee_code'])){
           $this->setEmployeeCode($x['employee_code']); 
        }

        if(isset ($x['start_date'])){
           $this->setStartDate($x['start_date']); 
        }
        if(isset ($x['end_date'])){
           $this->setEndDate($x['end_date']); 
        }

        if(isset ($x['action_process'])){
           $this->setActionProcess($x['action_process']); 
        }
        if(isset ($x['upload_check'])){
           $this->setUploadCheck($x['upload_check']); 
        }
        
        unset($x);
    }
    
    public function getArrayTable() {

        if(empty($this->getTotalSaldoCutiMinus())){
            $getTotalSaldoCutiMinus = '0';
        }else{
            $getTotalSaldoCutiMinus = $this->getTotalSaldoCutiMinus();
        }
     
        $x = array(
            // 'project_id'=>$this->getId(),
            'project_id'=>$this->getProjectId(),
            'project_name'=>$this->getProjectName(),
            'pt_id'=>$this->getPtId(),
            'pt_name'=>$this->getPtName(),
            'department_id'=>$this->getDepartmentId(),
            'department'=>$this->getDepartmentName(),
            'employee_id'=>$this->getEmployeeId(),
            'employee_name'=>$this->getEmployeeName(),
            'nik_group'=>$this->getNikGroup(),
            'total_attendance'=>$this->getTotalAttendance(),
            'total_overtime'=>$this->getTotalOvertime(),
            'total_uang_makan'=>$this->getTotalUangMakan(),
            'total_medical_claim'=>$this->getTotalMedicalClaim(),
            'total_unpaid_leave'=>$this->getTotalUnpaidLeave(),
            'hire_date'=>$this->getHireDate(),
            'total_saldocuti_bayar'=>$this->getTotalSaldoCutiBayar(),
            'total_potongan_transport'=>$this->getTotalPotonganTransport(),
            'sisa_cuti'=>$this->getSisaCuti(),
            'total_saldocuti_minus'=>$getTotalSaldoCutiMinus,
            'status_transfer'=>$this->getStatusTransfer(),
            'update_hcms'=>$this->getUpdateHcms(),
            'company_code'=>$this->getCompanyCode(),
            'code'=>$this->getCode(),
            'productivity_form_code'=>$this->getPFCode(),
            'productivitydetail_form_code'=>$this->getPDFCode(),
            'employee_code'=>$this->getEmployeeCode(),
            'start_date'=>$this->getStartDate(),
            'end_date'=>$this->getEndDate(),
            'action_process'=>$this->getActionProcess(),
            'upload_check'=>$this->getUploadCheck()

        );
      
        return $x;
    }
    
    

    public function getProjectId() {
        return $this->project_id;
    }

    public function setProjectId($project_id) {
        $this->project_id = $project_id;
    }

    public function getProjectName() {
        return $this->project_name;
    }

    public function setProjectName($project_name) {
        $this->project_name = $project_name;
    }

    public function getPtId() {
        return $this->pt_id;
    }

    public function setPtId($pt_id) {
        $this->pt_id = $pt_id;
    }

    public function getPtName() {
        return $this->pt_name;
    }

    public function setPtName($pt_name) {
        $this->pt_name = $pt_name;
    }

    public function getEmployeeId() {
        return $this->employee_id;
    }

    public function setEmployeeId($employee_id) {
        $this->employee_id = $employee_id;
    }

    public function getEmployeeName() {
        return $this->employee_name;
    }

    public function setEmployeeName($employee_name) {
        $this->employee_name = $employee_name;
    }

    public function getDepartmentId() {
        return $this->department_id;
    }

    public function setDepartmentId($department_id) {
        $this->department_id = $department_id;
    }

    public function getDepartmentName() {
        return $this->department;
    }

    public function setDepartmentName($department) {
        $this->department = $department;
    }

    public function getNikGroup() {
        return $this->nik_group;
    }

    public function setNikGroup($nik_group) {
        $this->nik_group = $nik_group;
    }

    public function getTotalAttendance() {
        return $this->total_attendance;
    }

    public function setTotalAttendance($total_attendance) {
        $this->total_attendance = $total_attendance;
    }

    public function getTotalOvertime() {
        return $this->total_overtime;
    }

    public function setTotalOvertime($total_overtime) {
        $this->total_overtime = $total_overtime;
    }

    public function getTotalUangMakan() {
        return $this->total_uang_makan;
    }

    public function setTotalUangMakan($total_uang_makan) {
        $this->total_uang_makan = $total_uang_makan;
    }

    public function getTotalMedicalClaim() {
        return $this->total_medical_claim;
    }

    public function setTotalMedicalClaim($total_medical_claim) {
        $this->total_medical_claim = $total_medical_claim;
    }

    public function getTotalUnpaidLeave() {
        return $this->total_unpaid_leave;
    }

    public function setTotalUnpaidLeave($total_unpaid_leave) {
        $this->total_unpaid_leave = $total_unpaid_leave;
    }

    public function getHireDate() {
        return $this->hire_date;
    }

    public function setHireDate($hire_date) {
        $this->hire_date = $hire_date;
    }

    public function getTotalSaldoCutiBayar() {
        return $this->total_saldocuti_bayar;
    }

    public function setTotalSaldoCutiBayar($total_saldocuti_bayar) {
        $this->total_saldocuti_bayar = $total_saldocuti_bayar;
    }

    public function getTotalPotonganTransport() {
        return $this->total_potongan_transport;
    }

    public function setTotalPotonganTransport($total_potongan_transport) {
        $this->total_potongan_transport = $total_potongan_transport;
    }

    public function getSisaCuti() {
        return $this->sisa_cuti;
    }

    public function setSisaCuti($sisa_cuti) {
        $this->sisa_cuti = $sisa_cuti;
    }

    public function getTotalSaldoCutiMinus() {
        return $this->total_saldocuti_minus;
    }

    public function setTotalSaldoCutiMinus($total_saldocuti_minus) {
        $this->total_saldocuti_minus = $total_saldocuti_minus;
    }

    public function getStatusTransfer() {
        return $this->status_transfer;
    }

    public function setStatusTransfer($status_transfer) {
        $this->status_transfer = $status_transfer;
    }

    public function getUpdateHcms() {
        return $this->update_hcms;
    }

    public function setUpdateHcms($update_hcms) {
        $this->update_hcms = $update_hcms;
    }

    public function getCompanyCode() {
        return $this->company_code;
    }

    public function setCompanyCode($company_code) {
        $this->company_code = $company_code;
    }

    public function getCode() {
        return $this->code;
    }

    public function setCode($code) {
        $this->code = $code;
    }

    public function getPFCode() {
        return $this->productivity_form_code;
    }

    public function setPFCode($productivity_form_code) {
        $this->productivity_form_code = $productivity_form_code;
    }

    public function getPDFCode() {
        return $this->productivitydetail_form_code;
    }

    public function setPDFCode($productivitydetail_form_code) {
        $this->productivitydetail_form_code = $productivitydetail_form_code;
    }

    public function getEmployeeCode() {
        return $this->employee_code;
    }

    public function setEmployeeCode($employee_code) {
        $this->employee_code = $employee_code;
    }

    public function getStartDate() {
        return $this->start_date;
    }

    public function setStartDate($start_date) {
        $this->start_date = $start_date;
    }

    public function getEndDate() {
        return $this->end_date;
    }

    public function setEndDate($end_date) {
        $this->end_date = $end_date;
    }

    public function getUploadCheck() {
        return $this->upload_check;
    }

    public function setUploadCheck($upload_check) {
        $this->upload_check = $upload_check;
    }

    public function getActionProcess() {
        return $this->action_process;
    }

    public function setActionProcess($action_process) {
        $this->action_process = $action_process;
    }

    public function getProject() {
        if(!$this->project){
            $this->project = new Box_Models_Master_Project();
        }
        return $this->project;
    }

    public function setProject(Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function getPt() {
        if(!$this->pt){
            $this->pt = new Box_Models_Master_Pt();
        }
        return $this->pt;
    }

    public function setPt(Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }



    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }

}
