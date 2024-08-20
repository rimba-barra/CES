<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Changestatus
 *
 * @author TOMMY-MIS
 */
abstract class Hrd_Models_Changestatus_Changestatus extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,Box_Models_Master_InterProjectPt  {
    private $project;
    private $pt;
    private $type;
    private $employee;
    private $isApprove;
    private $skNumber;
    private $effectiveDate;
    private $newGroup;
    private $oldGroup;
    private $newPosition;
    private $oldPosition;
    private $newProject;
    private $oldProject;
    private $newDepartment;
    private $oldDepartment;
    private $newCostCenter1;
    private $oldCostCenter1;
    private $newCostCenter2;
    private $oldCostCenter2;
    private $newCostCenter3;
    private $oldCostCenter3;
    private $newDivision;
    private $oldDivision;
    private $changeMode;
    private $newAtasanId;
    private $newAtasanName;
    private $isAtasanKaryawan;
    private $employee_name;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "changestatus_";
        //$this->_mail = Zend_Controller_Action_HelperBroker::getStaticHelper('Email');    
		$this->_mail = new Hrd_Models_General_Email();
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }
    
    
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['changestatus_id'])){
           $this->setId($x['changestatus_id']); 
        }
        if(isset ($x['employee_employee_id'])){
           $this->getEmployee()->setId($x['employee_employee_id']); 
        }
        if(isset ($x['is_approve'])){
           $this->setIsApprove($x['is_approve']); 
        }
        if(isset ($x['sk_number'])){
           $this->setSkNumber($x['sk_number']); 
        }
        if(isset ($x['effective_date'])){
           $this->setEffectiveDate($x['effective_date']); 
        }
        if(isset ($x['new_group_id'])){
           $this->getNewGroup()->setId($x['new_group_id']); 
        }
        if(isset ($x['old_group_id'])){
           $this->getOldGroup()->setId($x['old_group_id']); 
        }
        if(isset ($x['new_position_id'])){
           $this->getNewPosition()->setId($x['new_position_id']); 
        }
        if(isset ($x['old_position_id'])){
           $this->getOldPosition()->setId($x['old_position_id']); 
        }
        if(isset ($x['new_project_id'])){
           $this->getNewProject()->setId($x['new_project_id']); 
        }
        if(isset ($x['old_project_id'])){
           $this->getOldProject()->setId($x['old_project_id']); 
        }
        if(isset ($x['new_department_id'])){
           $this->getNewDepartment()->setId($x['new_department_id']); 
        }
        if(isset ($x['old_department_id'])){
           $this->getOldDepartment()->setId($x['old_department_id']); 
        }
        if(isset ($x['new_costcenter1'])){
           $this->setNewCostCenter1($x['new_costcenter1']); 
        }
        if(isset ($x['new_costcenter2'])){
           $this->setNewCostCenter2($x['new_costcenter2']); 
        }
        if(isset ($x['new_costcenter3'])){
           $this->setNewCostCenter3($x['new_costcenter3']); 
        }
        if(isset ($x['old_costcenter1'])){
           $this->setOldCostCenter1($x['old_costcenter1']); 
        }
        if(isset ($x['old_costcenter2'])){
           $this->setOldCostCenter2($x['old_costcenter2']); 
        }
        if(isset ($x['old_costcenter3'])){
           $this->setOldCostCenter3($x['old_costcenter3']); 
        }
        if(isset ($x['new_division_id'])){
           $this->getNewDivision()->setId($x['new_division_id']); 
        }
        if(isset ($x['old_division_id'])){
           $this->getOldDivision()->setId($x['old_division_id']); 
        }
        if(isset ($x['change_mode'])){
           $this->setChangeMode($x['change_mode']); 
        }
        if(isset ($x['change_mode'])){
           $this->setChangeMode($x['change_mode']); 
        }
        if(isset ($x['new_atasan_id'])){
           $this->setNewAtasanId($x['new_atasan_id']); 
        }
        if(isset ($x['new_atasan_nama'])){
           $this->setNewAtasanName($x['new_atasan_nama']); 
        }
        if(isset ($x['is_atasan_karyawan'])){
           $this->setIsAtasanKaryawan($x['is_atasan_karyawan']); 
        }
        if(isset ($x['employee_employee_name'])){
           $this->setEmployeeName($x['employee_employee_name']); 
        }
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'changestatus_id'=>$this->getId(),
            'employee_employee_id'=>$this->getEmployee()->getId(),
            'is_approve'=>$this->getIsApprove(),
            'sk_number'=>$this->getSkNumber(),
            'effective_date'=>$this->getEffectiveDate(),
            'new_group_id'=>$this->getNewGroup()->getId(),
            'old_group_id'=>$this->getOldGroup()->getId(),
            'new_position_id'=>$this->getNewPosition()->getId(),
            'old_position_id'=>$this->getOldPosition()->getId(),
            'new_project_id'=>$this->getNewProject()->getId(),
            'old_project_id'=>$this->getOldProject()->getId(),
            'new_department_id'=>$this->getNewDepartment()->getId(),
            'old_department_id'=>$this->getOldDepartment()->getId(),
            'new_costcenter1'=>$this->getNewCostCenter1(),
            'new_costcenter2'=>$this->getNewCostCenter2(),
            'new_costcenter3'=>$this->getNewCostCenter3(),
            'old_costcenter1'=>$this->getOldCostCenter1(),
            'old_costcenter2'=>$this->getOldCostCenter2(),
            'old_costcenter3'=>$this->getOldCostCenter3(),
            'new_division_id'=>$this->getNewDivision()->getId(),
            'old_division_id'=>$this->getOldDivision()->getId(),
            'change_mode'=>$this->getChangeMode(),
            'new_atasan_id'=>$this->getNewAtasanId(),
            'new_atasan_nama'=>$this->getNewAtasanName(),
            'is_atasan_karyawan'=>$this->getIsAtasanKaryawan()
        );
      
        return $x;
    }
    
    public function getType() {
        return $this->type;
    }

    public function getEmployee() {
        if(!$this->employee){
            $this->employee = new Hrd_Models_Master_Employee();
        }
        return $this->employee;
    }

    public function getIsApprove() {
        return $this->isApprove;
    }

    public function getSkNumber() {
        return $this->skNumber;
    }

    public function getEffectiveDate() {
        return $this->effectiveDate;
    }

    public function getNewGroup() {
        if(!$this->newGroup){
            $this->newGroup = new Hrd_Models_Master_Group();
        }
        return $this->newGroup;
    }

    public function getOldGroup() {
        if(!$this->oldGroup){
            $this->oldGroup = new Hrd_Models_Master_Group();
        }
        return $this->oldGroup;
    }

    public function getNewPosition() {
        if(!$this->newPosition){
            $this->newPosition = new Hrd_Models_Master_Position();
        }
        return $this->newPosition;
    }

    public function getOldPosition() {
        if(!$this->oldPosition){
            $this->oldPosition = new Hrd_Models_Master_Position();
        }
        return $this->oldPosition;
    }

    public function getNewProject() {
        if(!$this->newProject){
            $this->newProject = new Box_Models_Master_Project();
        }
        return $this->newProject;
    }

    public function getOldProject() {
        if(!$this->oldProject){
            $this->oldProject = new Box_Models_Master_Project();
        }
        return $this->oldProject;
    }

    public function getNewDepartment() {
        if(!$this->newDepartment){
            $this->newDepartment = new Hrd_Models_Master_Department();
        }
        return $this->newDepartment;
    }

    public function getOldDepartment() {
        if(!$this->oldDepartment){
            $this->oldDepartment = new Hrd_Models_Master_Department();
        }
        return $this->oldDepartment;
    }

    public function getNewCostCenter1() {
      
        return $this->newCostCenter1;
    }

    public function getOldCostCenter1() {
        return $this->oldCostCenter1;
    }

    public function getNewCostCenter2() {
        return $this->newCostCenter2;
    }

    public function getOldCostCenter2() {
        return $this->oldCostCenter2;
    }

    public function getNewCostCenter3() {
        return $this->newCostCenter3;
    }

    public function getOldCostCenter3() {
        return $this->oldCostCenter3;
    }

    public function getNewDivision() {
        if(!$this->newDivision){
            $this->newDivision = new Hrd_Models_Master_Division();
        }
        return $this->newDivision;
    }

    public function getOldDivision() {
        if(!$this->oldDivision){
            $this->oldDivision = new Hrd_Models_Master_Division();
        }
        return $this->oldDivision;
    }

    public function setType($type) {
        $this->type = $type;
    }

    public function setEmployee(Hrd_Models_Master_Employee $employee) {
        $this->employee = $employee;
    }

    public function setIsApprove($isApprove) {
        $this->isApprove = $isApprove;
    }

    public function setSkNumber($skNumber) {
        $this->skNumber = $skNumber;
    }

    public function setEffectiveDate($effectiveDate) {
        $this->effectiveDate = $effectiveDate;
    }

    public function setNewGroup(Hrd_Models_Master_Group $newGroup) {
        $this->newGroup = $newGroup;
    }

    public function setOldGroup(Hrd_Models_Master_Group $oldGroup) {
        $this->oldGroup = $oldGroup;
    }

    public function setNewPosition(Hrd_Models_Master_Position $newPosition) {
        $this->newPosition = $newPosition;
    }

    public function setOldPosition(Hrd_Models_Master_Position $oldPosition) {
        $this->oldPosition = $oldPosition;
    }

    public function setNewProject(Box_Models_Master_Project $newProject) {
        $this->newProject = $newProject;
    }

    public function setOldProject(Box_Models_Master_Project $oldProject) {
        $this->oldProject = $oldProject;
    }

    public function setNewDepartment(Hrd_Models_Master_Department $newDepartment) {
        $this->newDepartment = $newDepartment;
    }

    public function setOldDepartment(Hrd_Models_Master_Department $oldDepartment) {
        $this->oldDepartment = $oldDepartment;
    }

    public function setNewCostCenter1($newCostCenter1) {
        $this->newCostCenter1 = $newCostCenter1;
    }

    public function setOldCostCenter1($oldCostCenter1) {
        $this->oldCostCenter1 = $oldCostCenter1;
    }

    public function setNewCostCenter2($newCostCenter2) {
        $this->newCostCenter2 = $newCostCenter2;
    }

    public function setOldCostCenter2($oldCostCenter2) {
        $this->oldCostCenter2 = $oldCostCenter2;
    }

    public function setNewCostCenter3($newCostCenter3) {
        $this->newCostCenter3 = $newCostCenter3;
    }

    public function setOldCostCenter3($oldCostCenter3) {
        $this->oldCostCenter3 = $oldCostCenter3;
    }

    public function setNewDivision(Hrd_Models_Master_Division $newDivision) {
        $this->newDivision = $newDivision;
    }

    public function setOldDivision(Hrd_Models_Master_Division $oldDivision) {
        $this->oldDivision = $oldDivision;
    }
    
    public function getChangeMode() {
        return $this->changeMode;
    }

    public function setChangeMode($changeMode) {
        $this->changeMode = $changeMode;
    }

    public function getEmployeeName() {
        return $this->employee_name;
    }

    public function setEmployeeName($employee_name) {
        $this->employee_name = $employee_name;
    }
        
    
        
    public function fillData($data) {
        $this->setArrayTable($data);
    }

    

    public function grouped() {
        return array($this->getEmployee());
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
    
    public function getNewAtasanId() {
        return $this->newAtasanId;
    }

    public function getNewAtasanName() {
        return $this->newAtasanName;
    }

    public function getIsAtasanKaryawan() {
        return $this->isAtasanKaryawan;
    }

    public function setNewAtasanId($newAtasanId) {
        $this->newAtasanId = $newAtasanId;
    }

    public function setNewAtasanName($newAtasanName) {
        $this->newAtasanName = $newAtasanName;
    }

    public function setIsAtasanKaryawan($isAtasanKaryawan) {
        $this->isAtasanKaryawan = $isAtasanKaryawan;
    }

    public function getProjectId() {
        return $this->session->getCurrentProjectId();
    }

    public function setProjectId($project_id) {
        $this->project_id = $project_id;
    }
	
    public function getPtId() {
        return $this->session->getCurrentPtId();
    }
    
    public function setPtId($pt_id) {
        $this->pt_id = $pt_id;
    }


    public function getDatefields() {
        return array("effective_date");
    }

    function get_mail() {
        return $this->_mail;
    }
}
