<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of MasterSK
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Personalischild_Personalischild extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,Box_Models_Master_InterProjectPt  {
    private $project;
    private $projectid;
    private $pt;
    private $ptid;
    private $project_name;
    private $pt_name;
    private $employee_id;
    private $employee_name;
    private $employee_nik;
    private $nik_group;
    private $ktp_number;
    private $employeestatus;
    private $employeestatus_id;
    private $is_child;
    private $banding;
    private $indicator_ktp;
    private $user_id;
    
    public function __construct() {
        $this->_mail = new Hrd_Models_General_Email();
        parent::__construct();
        $this->embedPrefix = "personalischild_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        if(isset ($x['project_id'])){
           $this->setProjectid($x['project_id']); 
        }
        if(isset ($x['pt_id'])){
           $this->setPtid($x['pt_id']); 
        }
        
        if(isset ($x['employee_id'])){
           $this->setId($x['employee_id']); 
        }
        if(isset ($x['employee_id'])){
           $this->setEmployeeId($x['employee_id']); 
        }
        if(isset ($x['employee_name'])){
           $this->setEmployeeName($x['employee_name']); 
        }
        if(isset ($x['employee_nik'])){
           $this->setEmployeeNik($x['employee_nik']); 
        }
        if(isset ($x['nik_group'])){
           $this->setNikGroup($x['nik_group']); 
        }
        if(isset ($x['ktp_number'])){
           $this->setKtpNumber($x['ktp_number']); 
        }
        if(isset ($x['employeestatus'])){
           $this->setEmployeeStatus($x['employeestatus']); 
        }
        if(isset ($x['employeestatus_id'])){
           $this->setEmployeeStatusId($x['employeestatus_id']); 
        }
        if(isset ($x['project_name'])){
           $this->setProjectName($x['project_name']); 
        }
        if(isset ($x['pt_name'])){
           $this->setPtName($x['pt_name']); 
        }
        if(isset ($x['is_child'])){
           $this->setIsChild($x['is_child']); 
        }
        if(isset ($x['banding'])){
           $this->setBanding($x['banding']); 
        }
        if(isset ($x['indicator_ktp'])){
           $this->setIndicatorKtp($x['indicator_ktp']); 
        }
        if(isset ($x['user_id'])){
           $this->setUserId($x['user_id']); 
        }

       
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'employee_id'=>$this->getId(),
            'employee_id'=>$this->getEmployeeId(),
            'employee_name'=>$this->getEmployeeName(),
            'employee_nik'=>$this->getEmployeeNik(),
            'nik_group'=>$this->getNikGroup(),
            'ktp_number'=>$this->getKtpNumber(),
            'employeestatus'=>$this->getEmployeeStatus(),
            'employeestatus_id'=>$this->getEmployeeStatusId(),
            'project_name'=>$this->getProjectName(),
            'pt_name'=>$this->getPtName(),
            'is_child'=>$this->getIsChild(),
            'banding'=>$this->getBanding(),
            'indicator_ktp'=>$this->getIndicatorKtp(),
            'user_id'=>$this->getUserId(),
        );
      
        return $x;
    }

    function getProjectid() {
        return $this->projectid;
    }

    function getPtid() {
        return $this->ptid;
    }

    function setProjectid($projectid) {
        $this->projectid = $projectid;
    }

    function setPtid($ptid) {
        $this->ptid = $ptid;
    }
    
    public function getProject() {
        if(!$this->project){
            $this->project = new Box_Models_Master_Project();
        }
        return $this->project;
    }

    public function getPt() {
        if(!$this->pt){
            $this->pt = new Box_Models_Master_Pt();
        }
        return $this->pt;
    }

    public function getEmployeeName() {
        return $this->employee_name;
    }

    public function getEmployeeNik() {
        return $this->employee_nik;
    }

    public function getNikGroup() {
        return $this->nik_group;
    }

    public function getKtpNumber() {
        return $this->ktp_number;
    }

    public function getEmployeeStatus() {
        return $this->employeestatus;
    }

    public function getEmployeeStatusId() {
        return $this->employeestatus_id;
    }

    public function getProjectName() {
        return $this->project_name;
    }

    public function getPtName() {
        return $this->pt_name;
    }

    public function getEmployeeId() {
        return $this->employee_id;
    }

    public function getIsChild() {
        return $this->is_child;
    }

    public function getBanding() {
        return $this->banding;
    }

    public function getIndicatorKtp() {
        return $this->indicator_ktp;
    }

    public function getUserId() {
        return $this->user_id;
    }

    public function setProject(Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function setPt(Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

    public function setEmployeeName($employee_name) {
        $this->employee_name = $employee_name;
    }

    public function setEmployeeNik($employee_nik) {
        $this->employee_nik = $employee_nik;
    }

    public function setNikGroup($nik_group) {
        $this->nik_group = $nik_group;
    }

    public function setKtpNumber($ktp_number) {
        $this->ktp_number = $ktp_number;
    }

    public function setEmployeeStatus($employeestatus) {
        $this->employeestatus = $employeestatus;
    }

    public function setEmployeeStatusId($employeestatus_id) {
        $this->employeestatus_id = $employeestatus_id;
    }

    public function setProjectName($project_name) {
        $this->project_name = $project_name;
    }

    public function setPtName($pt_name) {
        $this->pt_name = $pt_name;
    }

    public function setEmployeeId($employee_id) {
        $this->employee_id = $employee_id;
    }

    public function setIsChild($is_child) {
        $this->is_child = $is_child;
    }

    public function setBanding($banding) {
        $this->banding = $banding;
    }

    public function setIndicatorKtp($indicator_ktp) {
        $this->indicator_ktp = $indicator_ktp;
    }

    public function setUserId($user_id) {
        $this->user_id = $user_id;
    }
        
    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }
    
    protected function getDatefields() {
        return array("tanggal");
    }

    function get_mail() {
        return $this->_mail;
    }
    

}
