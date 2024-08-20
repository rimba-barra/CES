<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of StatusChange
 *
 * @author MIS
 */
class Hrd_Models_Statuschange_StatusChangelog extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora {
    
    // private $employee;
    // private $newStatus;
    // private $oldStatus;
    // private $newEmployeeStatus;
    // private $oldEmplyoeeStatus;
    // private $approved;
    // private $skNumber;
    // private $effectiveDate;
    // private $is_applied; // add by wulan sari 03122020
    // private $notes; // add by wulan sari 03122020

    // private $usiaKerjaStartDate;
    // private $masaKerjaStartDate;
    // private $isKompensasi;

    // private $isPensiun;


    private $log_statuschange_id;
    private $action;
    private $statuschange_id;
    private $employee_id;
    private $statusinformation_new;
    private $statusinformation_old;
    private $approved;
    private $sk_number;
    private $effective_date;
    private $notes;
    private $is_applied;
    private $is_revised;
    private $employeestatus_id;
    private $project_id;
    private $pt_id;
    private $employee_nik;
    private $hire_date;
    private $assignation_date;
    private $contract_ke;
    private $contract_start;
    private $contract_end;
    private $is_pensiun;
    private $temporary_ke;
    private $temporary_start;
    private $temporary_end;
    private $consultant_ke;
    private $consultant_start;
    private $consultant_end;
    private $masa_kerja_start_date;
    private $usia_kerja_start_date;
    private $is_kompensasi;
    private $addon;
    private $addby;

    private $employeestatus;
    private $employeestatus_detail;

    
    
    public function __construct() {
        $this->embedPrefix = "logstatuschange_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['log_statuschange_id'])){
           $this->setId($x['log_statuschange_id']); 
        }
        if(isset ($x['action'])){
           $this->setAction($x['action']); 
        }
        if(isset ($x['statuschange_id'])){
           $this->setStatuschange_id($x['statuschange_id']); 
        }
        if(isset ($x['employee_id'])){
           $this->setEmployee_id($x['employee_id']); 
        }
        if(isset ($x['statusinformation_new'])){
           $this->setStatusinformation_new($x['statusinformation_new']); 
        }
        if(isset ($x['statusinformation_old'])){
           $this->setStatusinformation_old($x['statusinformation_old']); 
        }
        if(isset ($x['approved'])){
           $this->setApproved($x['approved']); 
        }
        if(isset ($x['sk_number'])){
           $this->setSkNumber($x['sk_number']); 
        }
        if(isset ($x['effective_date'])){
           $this->setEffectiveDate($x['effective_date']); 
        }
        if(isset ($x['notes'])){
           $this->setNotes($x['notes']); 
        }
        if(isset ($x['is_applied'])){
           $this->setIs_applied($x['is_applied']); 
        }
        if(isset ($x['is_revised'])){
           $this->setIs_revised($x['is_revised']); 
        }
        if(isset ($x['employeestatus_id'])){
           $this->setEmployeestatus_id($x['employeestatus_id']); 
        }
        if(isset ($x['project_id'])){
           $this->setProject_id($x['project_id']); 
        }
        if(isset ($x['pt_id'])){
           $this->setPt_id($x['pt_id']); 
        }
        if(isset ($x['employee_nik'])){
           $this->setEmployee_nik($x['employee_nik']); 
        }
        if(isset ($x['hire_date'])){
           $this->setHire_date($x['hire_date']); 
        }
        if(isset ($x['assignation_date'])){
           $this->setAssignation_date($x['assignation_date']); 
        }
        if(isset ($x['contract_ke'])){
           $this->setContract_ke($x['contract_ke']); 
        }
        if(isset ($x['contract_start'])){
           $this->setContract_start($x['contract_start']); 
        }
        if(isset ($x['contract_end'])){
           $this->setContract_end($x['contract_end']); 
        }
        if(isset ($x['is_pensiun'])){
           $this->setIs_pensiun($x['is_pensiun']); 
        }
        if(isset ($x['temporary_ke'])){
           $this->setTemporary_ke($x['temporary_ke']); 
        }
        if(isset ($x['temporary_start'])){
           $this->setTemporary_start($x['temporary_start']); 
        }
        if(isset ($x['temporary_end'])){
           $this->setTemporary_end($x['temporary_end']); 
        }
        if(isset ($x['consultant_ke'])){
           $this->setConsultant_ke($x['consultant_ke']); 
        }
        if(isset ($x['consultant_start'])){
           $this->setConsultant_start($x['consultant_start']); 
        }
        if(isset ($x['consultant_end'])){
           $this->setConsultant_end($x['consultant_end']); 
        }
        if(isset ($x['masa_kerja_start_date'])){
           $this->setMasaKerjaStartDate($x['masa_kerja_start_date']); 
        }
        if(isset ($x['usia_kerja_start_date'])){
           $this->setUsiaKerjaStartDate($x['usia_kerja_start_date']); 
        }
        if(isset ($x['is_kompensasi'])){
           $this->setIsKompensasi($x['is_kompensasi']); 
        }
        if(isset ($x['employeestatus'])){
           $this->setEmployeestatus($x['employeestatus']); 
        }
        if(isset ($x['employeestatus_detail'])){
           $this->setEmployeestatus_detail($x['employeestatus_detail']); 
        }
        if(isset ($x['addon'])){
           $this->setAddon($x['addon']); 
        }
        if(isset ($x['addby'])){
           $this->setAddby($x['addby']); 
        }            
       
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'log_statuschange_id'=>$this->getId(),
            'action'=>$this->getAction(),
            'statuschange_id'=>$this->getStatuschange_id(),
            'employee_id'=>$this->getEmployee_id(),
            'statusinformation_new'=>$this->getStatusinformation_new(),
            'statusinformation_old'=>$this->getStatusinformation_old(),
            'approved'=>$this->getApproved(),
            'sk_number'=>$this->getSkNumber(),
            'effective_date'=>$this->getEffectiveDate(),
            'notes'=>$this->getNotes(), 
            'is_applied'=>$this->getIs_applied(),
            'is_revised'=>$this->getIs_revised(),
            'employeestatus_id'=>$this->getEmployeestatus_id(),
            'project_id'=>$this->getProject_id(),
            'pt_id'=>$this->getPt_id(),
            'employee_nik'=>$this->getEmployee_nik(),
            'hire_date'=>$this->getHire_date(),
            'assignation_date'=>$this->getAssignation_date(),
            'contract_ke'=>$this->getContract_ke(),
            'contract_start'=>$this->getContract_start(),
            'contract_end'=>$this->getContract_end(),
            "is_pensiun"=>$this->getIs_pensiun(),
            'temporary_ke'=>$this->getTemporary_ke(),
            'temporary_start'=>$this->getTemporary_start(),
            'temporary_end'=>$this->getTemporary_end(),
            'consultant_ke'=>$this->getConsultant_ke(),
            'consultant_start'=>$this->getConsultant_start(),
            'consultant_end'=>$this->getConsultant_end(),
            "masa_kerja_start_date"=>$this->getMasaKerjaStartDate(),
            "usia_kerja_start_date"=>$this->getUsiaKerjaStartDate(),
            "is_kompensasi"=>$this->getIsKompensasi(),
            'employeestatus'=>$this->getEmployeestatus(),
            'employeestatus_detail'=>$this->getEmployeestatus_detail(),
            'addon'=>$this->getAddon(),
            'addby'=>$this->getAddby(),
        );
      
        return $x;
    }
    
    public function getId() {
        return $this->log_statuschange_id;
    }

    public function setId($log_statuschange_id) {
        $this->log_statuschange_id = $log_statuschange_id;
    }

    public function getAction() {
        return $this->action;
    }

    public function setAction($action) {
        $this->action = $action;
    }

    public function getStatuschange_id() {
        return $this->statuschange_id;
    }

    public function setStatuschange_id($statuschange_id) {
        $this->statuschange_id = $statuschange_id;
    }

    public function getEmployee_id() {        
        return $this->employee_id;
    }

    public function setEmployee_id($employee_id) {
        $this->employee_id = $employee_id;
    }

    public function getStatusinformation_new() {
        return $this->statusinformation_new;
    }

    public function setStatusinformation_new($statusinformation_new) {
        $this->statusinformation_new = $statusinformation_new;
    }

    public function getStatusinformation_old() {        
        return $this->statusinformation_old;
    }

    public function setStatusinformation_old($statusinformation_old) {
        $this->statusinformation_old = $statusinformation_old;
    }

    public function getApproved() {
        return $this->approved;
    }

    public function setApproved($approved) {
        $this->approved = $approved;
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
        $this->effective_date = $this->ignoredd($effective_date);
    }

    public function getNotes() {
        return $this->notes;
    }

    public function setNotes($notes) {
        $this->notes = $notes;
    }
    
    public function getIs_applied() {
        return $this->is_applied;
    }

    public function setIs_applied($is_applied) {
        $this->is_applied = $is_applied;
    }

    public function getIs_revised() {
        return $this->is_revised;
    }

    public function setIs_revised($is_revised) {
        $this->is_revised = $is_revised;
    }

    public function getEmployeestatus_id() {
        return $this->employeestatus_id;
    }

    public function setEmployeestatus_id($employeestatus_id) {
        $this->employeestatus_id = $employeestatus_id;
    }

    public function getProject_id() {
        return $this->project_id;
    }

    public function setProject_id($project_id) {
        $this->project_id = $project_id;
    }

    public function getPt_id() {
        return $this->pt_id;
    }

    public function setPt_id($pt_id) {
        $this->pt_id = $pt_id;
    }

    public function getEmployee_nik() {
        return $this->employee_nik;
    }

    public function setEmployee_nik($employee_nik) {
        $this->employee_nik = $employee_nik;
    }

    public function getHire_date() {
        return $this->hire_date;
    }

    public function setHire_date($hire_date) {
        $this->hire_date = $this->ignoredd($hire_date);
    }

    public function getAssignation_date() {
        return $this->assignation_date;
    }

    public function setAssignation_date($assignation_date) {
        $this->assignation_date = $this->ignoredd($assignation_date);
    }

    public function getContract_ke() {
        return $this->contract_ke;
    }

    public function setContract_ke($contract_ke) {
        $this->contract_ke = $contract_ke;
    }

    public function getContract_start() {
        return $this->contract_start;
    }

    public function setContract_start($contract_start) {
        $this->contract_start = $this->ignoredd($contract_start);
    }

    public function getContract_end() {
        return $this->contract_end;
    }

    public function setContract_end($contract_end) {
        $this->contract_end = $this->ignoredd($contract_end);
    }

    public function getIs_pensiun() {
        return $this->is_pensiun;
    }

    public function setIs_pensiun($is_pensiun) {
        $this->is_pensiun = $is_pensiun;
    }

    public function getTemporary_ke() {
        return $this->temporary_ke;
    }

    public function setTemporary_ke($temporary_ke) {
        $this->temporary_ke = $temporary_ke;
    }

    public function getTemporary_start() {
        return $this->temporary_start;
    }

    public function setTemporary_start($temporary_start) {
        $this->temporary_start = $this->ignoredd($temporary_start);
    }

    public function getTemporary_end() {
        return $this->temporary_end;
    }

    public function setTemporary_end($temporary_end) {
        $this->temporary_end = $this->ignoredd($temporary_end);
    }

    public function getConsultant_ke() {
        return $this->consultant_ke;
    }

    public function setConsultant_ke($consultant_ke) {
        $this->consultant_ke = $consultant_ke;
    }

    public function getConsultant_start() {
        return $this->consultant_start;
    }

    public function setConsultant_start($consultant_start) {
        $this->consultant_start = $this->ignoredd($consultant_start);
    }

    public function getConsultant_end() {
        return $this->consultant_end;
    }

    public function setConsultant_end($consultant_end) {
        $this->consultant_end = $this->ignoredd($consultant_end);
    }


    public function getMasaKerjaStartDate() {
        return $this->masa_kerja_start_date;
    }

    public function setMasaKerjaStartDate($masa_kerja_start_date) {
        $this->masa_kerja_start_date = $masa_kerja_start_date;
    }

    public function getUsiaKerjaStartDate() {
        return $this->usia_kerja_start_date;
    }

    public function setUsiaKerjaStartDate($usia_kerja_start_date) {
        $this->usia_kerja_start_date = $usia_kerja_start_date;
    }

    public function getIsKompensasi() {
        return $this->is_kompensasi;
    }

    public function setIsKompensasi($is_kompensasi) {
        $this->is_kompensasi = $is_kompensasi;
    }

    public function getEmployeestatus_detail() {
        return $this->employeestatus_detail;
    }

    public function setEmployeestatus_detail($employeestatus_detail) {
        $this->employeestatus_detail = $employeestatus_detail;
    }

    public function getEmployeestatus() {
        return $this->employeestatus;
    }

    public function setEmployeestatus($employeestatus) {
        $this->employeestatus = $employeestatus;
    }

    public function getAddon() {
        return $this->addon;
    }

    public function setAddon($addon) {
        $this->addon = $addon;
    }

    public function getAddby() {
        return $this->addby;
    }

    public function setAddby($addby) {
        $this->addby = $addby;
    }
    
    public function fillData($data) {
        $this->setArrayTable($data);
    }

    // public function grouped() {
    //     return array($this->getEmployee(),$this->getNewStatus(),$this->getOldStatus(),$this->getNewEmployeeStatus(),$this->getOldEmplyoeeStatus());
    // }

    public function grouped() {
        return array();
    }
    
    // protected function getDatefields() {
    //     return array("effective_date");
    // }



}

?>
