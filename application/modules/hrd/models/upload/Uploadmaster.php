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
class Hrd_Models_Upload_Uploadmaster extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,Box_Models_Master_InterProjectPt {

    private $project_id;
    private $pt_id;    
    private $project_name;
    private $pt_name;    
    private $employee_name;
    private $nik_group;

    private $changetype_id;
    private $changetype;
    private $alasanresign_id;
    private $alasanresign;
    private $perubahanstatus_id;
    private $perubahanstatus;

    private $reason;
    private $note;
    private $sk_number;
    private $effective_date;
    
    private $old_project_id;
    private $old_project;
    private $new_project_id;
    private $new_project;

    private $old_pt_id;
    private $old_pt;
    private $new_pt_id;
    private $new_pt;

    private $old_department_id;
    private $old_department;
    private $new_department_id;
    private $new_department;

    private $old_banding_id;
    private $old_banding;
    private $new_banding_id;
    private $new_banding;

    private $old_group_id;
    private $old_group;
    private $new_group_id;
    private $new_group;

    private $old_position_id;
    private $old_position;
    private $new_position_id;
    private $new_position;

    private $employeestatus_id;
    private $employeestatus;

    private $employee_code;
    private $upload_employee_id;

    private $empstatus_code;

    private $upload_check;
    private $status_transfer;
    private $action_process;

    private $expired_date;
    private $need_transfer;

    /*
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "department_";
    }*/
    
    public function __construct($prefix=NULL) {
        parent::__construct();
        $this->embedPrefix = $prefix?$prefix:"uploadmaster_";
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
        if(isset ($x['employee_name'])){
           $this->setEmployeeName($x['employee_name']); 
        }
        if(isset ($x['nik_group'])){
           $this->setNikGroup($x['nik_group']); 
        }

        if(isset ($x['changetype_id'])){
           $this->setChangetypeId($x['changetype_id']); 
        }
        if(isset ($x['changetype'])){
           $this->setChangetype($x['changetype']); 
        }
        if(isset ($x['alasanresign_id'])){
           $this->setAlasanresignId($x['alasanresign_id']); 
        }
        if(isset ($x['alasanresign'])){
           $this->setAlasanresign($x['alasanresign']); 
        }
        if(isset ($x['perubahanstatus_id'])){
           $this->setPerubahanstatusId($x['perubahanstatus_id']); 
        }
        if(isset ($x['perubahanstatus'])){
           $this->setPerubahanstatus($x['perubahanstatus']); 
        }

        if(isset ($x['reason'])){
           $this->setReason($x['reason']); 
        }
        if(isset ($x['note'])){
           $this->setNote($x['note']); 
        }
        if(isset ($x['sk_number'])){
           $this->setSkNumber($x['sk_number']); 
        }
        if(isset ($x['effective_date'])){
           $this->setEffectiveDate($x['effective_date']); 
        }

        if(isset ($x['old_project_id'])){
           $this->setOldProjectId($x['old_project_id']); 
        }
        if(isset ($x['old_project'])){
           $this->setOldProject($x['old_project']); 
        }
        if(isset ($x['new_project_id'])){
           $this->setNewProjectId($x['new_project_id']); 
        }
        if(isset ($x['new_project'])){
           $this->setNewProject($x['new_project']); 
        }

        if(isset ($x['old_pt_id'])){
           $this->setOldPtId($x['old_pt_id']); 
        }
        if(isset ($x['old_pt'])){
           $this->setOldPt($x['old_pt']); 
        }
        if(isset ($x['new_pt_id'])){
           $this->setNewPtId($x['new_pt_id']); 
        }
        if(isset ($x['new_pt'])){
           $this->setNewPt($x['new_pt']); 
        }

        if(isset ($x['old_department_id'])){
           $this->setOldDepartmentId($x['old_department_id']); 
        }
        if(isset ($x['old_department'])){
           $this->setOldDepartment($x['old_department']); 
        }
        if(isset ($x['new_department_id'])){
           $this->setNewDepartmentId($x['new_department_id']); 
        }
        if(isset ($x['new_department'])){
           $this->setNewDepartment($x['new_department']); 
        }

        if(isset ($x['old_banding_id'])){
           $this->setOldBandingId($x['old_banding_id']); 
        }
        if(isset ($x['old_banding'])){
           $this->setOldBanding($x['old_banding']); 
        }
        if(isset ($x['new_banding_id'])){
           $this->setNewBandingId($x['new_banding_id']); 
        }
        if(isset ($x['new_banding'])){
           $this->setNewBanding($x['new_banding']); 
        }

        if(isset ($x['old_group_id'])){
           $this->setOldGroupId($x['old_group_id']); 
        }
        if(isset ($x['old_group'])){
           $this->setOldGroup($x['old_group']); 
        }
        if(isset ($x['new_group_id'])){
           $this->setNewGroupId($x['new_group_id']); 
        }
        if(isset ($x['new_group'])){
           $this->setNewGroup($x['new_group']); 
        }

        if(isset ($x['old_position_id'])){
           $this->setOldPositionId($x['old_position_id']); 
        }
        if(isset ($x['old_position'])){
           $this->setOldPosition($x['old_position']); 
        }
        if(isset ($x['new_position_id'])){
           $this->setNewPositionId($x['new_position_id']); 
        }
        if(isset ($x['new_position'])){
           $this->setNewPosition($x['new_position']); 
        }

        if(isset ($x['employeestatus_id'])){
           $this->setEmployeestatusId($x['employeestatus_id']); 
        }
        if(isset ($x['employeestatus'])){
           $this->setEmployeestatus($x['employeestatus']); 
        }

        if(isset ($x['employee_code'])){
           $this->setEmployeeCode($x['employee_code']); 
        }
        if(isset ($x['upload_employee_id'])){
           $this->setUploadEmployeeId($x['upload_employee_id']); 
        }
        if(isset ($x['empstatus_code'])){
           $this->setEmployeestatusCode($x['empstatus_code']); 
        }
        if(isset ($x['status_transfer'])){
           $this->setStatusTransfer($x['status_transfer']); 
        }
        if(isset ($x['action_process'])){
           $this->setActionProcess($x['action_process']); 
        }
        if(isset ($x['upload_check'])){
           $this->setUploadCheck($x['upload_check']); 
        }
        if(isset ($x['expired_date'])){
           $this->setExpiredDate($x['expired_date']); 
        }
        if(isset ($x['need_transfer'])){
           $this->setNeedTransfer($x['need_transfer']); 
        }
        

        unset($x);
    }
    
    public function getArrayTable() {

        if(empty($this->getChangetypeId())){
            $getChangetypeId = '0';
        }else{
            $getChangetypeId = $this->getChangetypeId();
        }

        if(empty($this->getAlasanresignId())){
            $getAlasanresignId = '0';
        }else{
            $getAlasanresignId = $this->getAlasanresignId();
        }
        
        if(empty($this->getPerubahanstatusId())){
            $getPerubahanstatusId = '0';
        }else{
            $getPerubahanstatusId = $this->getPerubahanstatusId();
        }

        $x = array(
            // 'project_id'=>$this->getId(),
            'project_id'=>$this->getProjectId(),
            'project_name'=>$this->getProjectName(),
            'pt_id'=>$this->getPtId(),
            'pt_name'=>$this->getPtName(),
            'employee_name'=>$this->getEmployeeName(),
            'nik_group'=>$this->getNikGroup(),

            'changetype_id'=>$getChangetypeId,
            'changetype'=>$this->getChangetype(),
            'alasanresign_id'=>$getAlasanresignId,
            'alasanresign'=>$this->getAlasanresign(),
            'perubahanstatus_id'=>$this->getPerubahanstatusId(),
            'perubahanstatus'=>$getPerubahanstatusId,

            'reason'=>$this->getReason(),
            'note'=>$this->getNote(),
            'sk_number'=>$this->getSkNumber(),
            'effective_date'=>$this->getEffectiveDate(),

            'old_project_id'=>$this->getOldProjectId(),
            'old_project'=>$this->getOldProject(),
            'new_project_id'=>$this->getNewProjectId(),
            'new_project'=>$this->getNewProject(),

            'old_pt_id'=>$this->getOldPtId(),
            'old_pt'=>$this->getOldPt(),
            'new_pt_id'=>$this->getNewPtId(),
            'new_pt'=>$this->getNewPt(),

            'old_department_id'=>$this->getOldDepartmentId(),
            'old_department'=>$this->getOldDepartment(),
            'new_department_id'=>$this->getNewDepartmentId(),
            'new_department'=>$this->getNewDepartment(),

            'old_banding_id'=>$this->getOldBandingId(),
            'old_banding'=>$this->getOldBanding(),
            'new_banding_id'=>$this->getNewBandingId(),
            'new_banding'=>$this->getNewBanding(),

            'old_group_id'=>$this->getOldGroupId(),
            'old_group'=>$this->getOldGroup(),
            'new_group_id'=>$this->getNewGroupId(),
            'new_group'=>$this->getNewGroup(),

            'old_position_id'=>$this->getOldPositionId(),
            'old_position'=>$this->getOldPosition(),
            'new_position_id'=>$this->getNewPositionId(),
            'new_position'=>$this->getNewPosition(),

            'employeestatus_id'=>$this->getEmployeestatusId(),
            'employeestatus'=>$this->getEmployeestatus(),

            'employee_code'=>$this->getEmployeeCode(),
            'upload_employee_id'=>$this->getUploadEmployeeId(),
            'empstatus_code'=>$this->getEmployeestatusCode(),
            'status_transfer'=>$this->getStatusTransfer(),
            'action_process'=>$this->getActionProcess(),
            'upload_check'=>$this->getUploadCheck(),

            'expired_date'=>$this->getExpiredDate(),

            'need_transfer'=>$this->getNeedTransfer()


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

    public function getEmployeeName() {
        return $this->employee_name;
    }

    public function setEmployeeName($employee_name) {
        $this->employee_name = $employee_name;
    }

    public function getNikGroup() {
        return $this->nik_group;
    }

    public function setNikGroup($nik_group) {
        $this->nik_group = $nik_group;
    }

    public function getChangetypeId() {
        return $this->changetype_id;
    }

    public function setChangetypeId($changetype_id) {
        $this->changetype_id = $changetype_id;
    }

    public function getChangetype() {
        return $this->changetype;
    }

    public function setChangetype($changetype) {
        $this->changetype = $changetype;
    }

    public function getAlasanresignId() {
        return $this->alasanresign_id;
    }

    public function setAlasanresignId($alasanresign_id) {
        $this->alasanresign_id = $alasanresign_id;
    }

    public function getAlasanresign() {
        return $this->alasanresign;
    }

    public function setAlasanresign($alasanresign) {
        $this->alasanresign = $alasanresign;
    }

    public function getPerubahanstatusId() {
        return $this->perubahanstatus_id;
    }

    public function setPerubahanstatusId($perubahanstatus_id) {
        $this->perubahanstatus_id = $perubahanstatus_id;
    }

    public function getPerubahanstatus() {
        return $this->perubahanstatus;
    }

    public function setPerubahanstatus($perubahanstatus) {
        $this->perubahanstatus = $perubahanstatus;
    }

    public function getReason() {
        return $this->reason;
    }

    public function setReason($reason) {
        $this->reason = $reason;
    }

    public function getNote() {
        return $this->note;
    }

    public function setNote($note) {
        $this->note = $note;
    }

    public function getSkNumber() {
        return $this->sk_number;
    }

    public function setSkNumber($sk_number) {
        $this->sk_number = $sk_number;
    }

    public function getEffectiveDate() {
        return $this->effective_date;
    }

    public function setEffectiveDate($effective_date) {
        $this->effective_date = $effective_date;
    }

    public function getOldProjectId() {
        return $this->old_project_id;
    }

    public function setOldProjectId($old_project_id) {
        $this->old_project_id = $old_project_id;
    }

    public function getOldProject() {
        return $this->old_project;
    }

    public function setOldProject($old_project) {
        $this->old_project = $old_project;
    }

    public function getNewProjectId() {
        return $this->new_project_id;
    }

    public function setNewProjectId($new_project_id) {
        $this->new_project_id = $new_project_id;
    }

    public function getNewProject() {
        return $this->new_project;
    }

    public function setNewProject($new_project) {
        $this->new_project = $new_project;
    }

    public function getOldPtId() {
        return $this->old_pt_id;
    }

    public function setOldPtId($old_pt_id) {
        $this->old_pt_id = $old_pt_id;
    }

    public function getOldPt() {
        return $this->old_pt;
    }

    public function setOldPt($old_pt) {
        $this->old_pt = $old_pt;
    }

    public function getNewPtId() {
        return $this->new_pt_id;
    }

    public function setNewPtId($new_pt_id) {
        $this->new_pt_id = $new_pt_id;
    }

    public function getNewPt() {
        return $this->new_pt;
    }

    public function setNewPt($new_pt) {
        $this->new_pt = $new_pt;
    }

    public function getOldDepartmentId() {
        return $this->old_department_id;
    }

    public function setOldDepartmentId($old_department_id) {
        $this->old_department_id = $old_department_id;
    }

    public function getOldDepartment() {
        return $this->old_department;
    }

    public function setOldDepartment($old_department) {
        $this->old_department = $old_department;
    }

    public function getNewDepartmentId() {
        return $this->new_department_id;
    }

    public function setNewDepartmentId($new_department_id) {
        $this->new_department_id = $new_department_id;
    }

    public function getNewDepartment() {
        return $this->new_department;
    }

    public function setNewDepartment($new_department) {
        $this->new_department = $new_department;
    }

    public function getOldBandingId() {
        return $this->old_banding_id;
    }

    public function setOldBandingId($old_banding_id) {
        $this->old_banding_id = $old_banding_id;
    }

    public function getOldBanding() {
        return $this->old_banding;
    }

    public function setOldBanding($old_banding) {
        $this->old_banding = $old_banding;
    }

    public function getNewBandingId() {
        return $this->new_banding_id;
    }

    public function setNewBandingId($new_banding_id) {
        $this->new_banding_id = $new_banding_id;
    }

    public function getNewBanding() {
        return $this->new_banding;
    }

    public function setNewBanding($new_banding) {
        $this->new_banding = $new_banding;
    }

    public function getOldGroupId() {
        return $this->old_group_id;
    }

    public function setOldGroupId($old_group_id) {
        $this->old_group_id = $old_group_id;
    }

    public function getOldGroup() {
        return $this->old_group;
    }

    public function setOldGroup($old_group) {
        $this->old_group = $old_group;
    }

    public function getNewGroupId() {
        return $this->new_group_id;
    }

    public function setNewGroupId($new_group_id) {
        $this->new_group_id = $new_group_id;
    }

    public function getNewGroup() {
        return $this->new_group;
    }

    public function setNewGroup($new_group) {
        $this->new_group = $new_group;
    }

    public function getOldPositionId() {
        return $this->old_position_id;
    }

    public function setOldPositionId($old_position_id) {
        $this->old_position_id = $old_position_id;
    }

    public function getOldPosition() {
        return $this->old_position;
    }

    public function setOldPosition($old_position) {
        $this->old_position = $old_position;
    }

    public function getNewPositionId() {
        return $this->new_position_id;
    }

    public function setNewPositionId($new_position_id) {
        $this->new_position_id = $new_position_id;
    }

    public function getNewPosition() {
        return $this->new_position;
    }

    public function setNewPosition($new_position) {
        $this->new_position = $new_position;
    }

    public function getEmployeestatusId() {
        return $this->employeestatus_id;
    }

    public function setEmployeestatusId($employeestatus_id) {
        $this->employeestatus_id = $employeestatus_id;
    }

    public function getEmployeestatus() {
        return $this->employeestatus;
    }

    public function setEmployeestatus($employeestatus) {
        $this->employeestatus = $employeestatus;
    }

    public function getEmployeeCode() {
        return $this->employee_code;
    }

    public function setEmployeeCode($employee_code) {
        $this->employee_code = $employee_code;
    }

    public function getUploadEmployeeId() {
        return $this->upload_employee_id;
    }

    public function setUploadEmployeeId($upload_employee_id) {
        $this->upload_employee_id = $upload_employee_id;
    }

    public function getEmployeestatusCode() {
        return $this->empstatus_code;
    }

    public function setEmployeestatusCode($empstatus_code) {
        $this->empstatus_code = $empstatus_code;
    }

    public function getUploadCheck() {
        return $this->upload_check;
    }

    public function setUploadCheck($upload_check) {
        $this->upload_check = $upload_check;
    }

    public function getStatusTransfer() {
        return $this->status_transfer;
    }

    public function setStatusTransfer($status_transfer) {
        $this->status_transfer = $status_transfer;
    }

    public function getActionProcess() {
        return $this->action_process;
    }

    public function setActionProcess($action_process) {
        $this->action_process = $action_process;
    }

    public function getExpiredDate() {
        return $this->expired_date;
    }

    public function setExpiredDate($expired_date) {
        $this->expired_date = $expired_date;
    }

    public function getNeedTransfer() {
        return $this->need_transfer;
    }

    public function setNeedTransfer($need_transfer) {
        $this->need_transfer = $need_transfer;
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
