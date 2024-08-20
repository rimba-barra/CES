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
class Hrd_Models_Transferapi_Transferapitransactionlog extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,Box_Models_Master_InterProjectPt {

    private $project_id;
    private $pt_id;    
    private $project_name;
    private $pt_name;    
    private $employee_id;
    private $employee_name;
    private $status_transfer;
    private $data;
    private $user_id;
    private $group_id;

    private $processpayroll_month;
    private $processpayroll_year;
    private $processdata_from;
    private $processdata_end;
    private $user_name;
    private $addon;
    private $log_process_id;

    private $process_log_process_id;
    private $process_api;
    private $process_api_model;

    /*
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "department_";
    }*/
    
    public function __construct($prefix=NULL) {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        parent::__construct();
        $this->embedPrefix = $prefix?$prefix:"transferapitransactionlog_";
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
        if(isset ($x['status_transfer'])){
           $this->setStatusTransfer($x['status_transfer']); 
        }
        
        if(isset ($x['data'])){
           $this->setData($x['data']); 
        }
        if(isset ($x['processpayroll_month'])){
           $this->setPPMonth($x['processpayroll_month']); 
        }
        if(isset ($x['processpayroll_year'])){
           $this->setPPYear($x['processpayroll_year']); 
        }
        if(isset ($x['processdata_from'])){
           $this->setPDFrom($x['processdata_from']); 
        }
        if(isset ($x['processdata_end'])){
           $this->setPDEnd($x['processdata_end']); 
        }
        if(isset ($x['user_name'])){
           $this->setUsername($x['user_name']); 
        }
        if(isset ($x['addon'])){
           $this->setAddon($x['addon']); 
        }
        if(isset ($x['log_process_id'])){
           $this->setLogProcessId($x['log_process_id']); 
        }
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            // 'project_id'=>$this->getId(),
            'project_id'=>$this->getProjectId(),
            'project_name'=>$this->getProjectName(),
            'pt_id'=>$this->getPtId(),
            'pt_name'=>$this->getPtName(),
            'employee_id'=>$this->getEmployeeId(),
            'employee_name'=>$this->getEmployeeName(),
            'status_transfer'=>$this->getStatusTransfer(),
            'data'=>$this->getData(),
            'processpayroll_month'=>$this->getPPMonth(),
            'processpayroll_year'=>$this->getPPYear(),
            'processdata_from'=>$this->getPDFrom(),
            'processdata_end'=>$this->getPDEnd(),
            'user_name'=>$this->getUsername(),
            'addon'=>$this->getAddon(),
            'log_process_id'=>$this->getLogProcessId(),
            'process_log_process_id'=>$this->getLogProcessId(),
            'process_api'=>$this->getData(),
            'process_api_model'=>$this->getData()

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

    public function getStatusTransfer() {
        return $this->status_transfer;
    }

    public function setStatusTransfer($status_transfer) {
        $this->status_transfer = $status_transfer;
    }

    public function getData() {
        return $this->data;
    }

    public function setData($data) {
        $this->data = $data;
    }

    public function getPPMonth() {
        return $this->processpayroll_month;
    }

    public function setPPMonth($processpayroll_month) {
        $this->processpayroll_month = $processpayroll_month;
    }

    public function getPPYear() {
        return $this->processpayroll_year;
    }

    public function setPPYear($processpayroll_year) {
        $this->processpayroll_year = $processpayroll_year;
    }

    public function getPDFrom() {
        return $this->processdata_from;
    }

    public function setPDFrom($processdata_from) {
        $this->processdata_from = $processdata_from;
    }

    public function getPDEnd() {
        return $this->processdata_end;
    }

    public function setPDEnd($processdata_end) {
        $this->processdata_end = $processdata_end;
    }

    public function getUsername() {
        return $this->user_name;
    }

    public function setUsername($user_name) {
        $this->user_name = $user_name;
    }

    public function getAddon() {
        return $this->addon;
    }

    public function setAddon($addon) {
        $this->addon = $addon;
    }

    public function getLogProcessId() {
        return $this->log_process_id;
    }

    public function setLogProcessId($log_process_id) {
        $this->log_process_id = $log_process_id;
    }

    public function getUserid() {
        return $this->session->getUserId();
    }

    public function getGroupid() {
        return $this->session->getCurrentGroupId();
    }

    // public function setUserid($user_id) {
    //     $this->user_id = $user_id;
    // }

    // public function setGroupid($group_id) {
    //     $this->group_id = $group_id;
    // }

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
