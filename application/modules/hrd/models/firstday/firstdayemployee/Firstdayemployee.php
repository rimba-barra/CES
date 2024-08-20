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
class Hrd_Models_Firstday_Firstdayemployee_Firstdayemployee extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,Box_Models_Master_InterProjectPt  {
    private $project;
    private $projectid;
    private $pt;
    private $ptid;
    private $employee_id;
    private $employee_name;
    private $total_answer;
    private $total_question;
    private $DCResult;
    
    public function __construct() {
        $this->_mail = new Hrd_Models_General_Email();
        parent::__construct();
        $this->embedPrefix = "firstdayemployee_";
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
        if(isset ($x['total_answer'])){
           $this->setTotalAnswer($x['total_answer']); 
        }
        if(isset ($x['total_question'])){
           $this->setTotalQuestion($x['total_question']); 
        }
        
        unset($x);
    }
    
    public function getArrayTable() {

        if(empty($this->getTotalAnswer())){
            $getTotalAnswer = '0';
        }else{
            $getTotalAnswer = $this->getTotalAnswer();
        }

        if(empty($this->getTotalQuestion())){
            $getTotalQuestion = '0';
        }else{
            $getTotalQuestion = $this->getTotalQuestion();
        }
     
        $x = array(
            'employee_id'=>$this->getId(),
            'employee_id'=>$this->getEmployeeId(),
            'employee_name'=>$this->getEmployeeName(),
            'total_answer'=>$getTotalAnswer,
            'total_question'=>$getTotalQuestion
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

    public function getEmployeeId() {
        return $this->employee_id;
    }

    public function getEmployeeName() {
        return $this->employee_name;
    }

    public function getTotalAnswer() {
        return $this->total_answer;
    }

    public function getTotalQuestion() {
        return $this->total_question;
    }

    public function setProject(Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function setPt(Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

    public function setEmployeeId($employee_id) {
        $this->employee_id = $employee_id;
    }

    public function setEmployeeName($employee_name) {
        $this->employee_name = $employee_name;
    }

    public function setTotalAnswer($total_answer) {
        $this->total_answer = $total_answer;
    }

    public function setTotalQuestion($total_question) {
        $this->total_question = $total_question;
    }

    public function getDCResult() {
        return $this->DCResult;
    }

    public function setDCArray($delimiteredArray) {
        $this->DCResult = $delimiteredArray;
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
