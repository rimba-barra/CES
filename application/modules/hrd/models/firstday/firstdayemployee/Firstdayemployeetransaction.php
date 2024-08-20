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
class Hrd_Models_Firstday_Firstdayemployee_Firstdayemployeetransaction extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,Box_Models_Master_InterProjectPt  {
    private $project;
    private $projectid;
    private $pt;
    private $ptid;
    private $firstdayform_id;
    private $question;
    private $answer;
    
    public function __construct() {
        $this->_mail = new Hrd_Models_General_Email();
        parent::__construct();
        $this->embedPrefix = "firstdayemployeetransaction_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        if(isset ($x['project_id'])){
           $this->setProjectid($x['project_id']); 
        }
        if(isset ($x['pt_id'])){
           $this->setPtid($x['pt_id']); 
        }
        if(isset ($x['firstdayform_id'])){
           $this->setId($x['firstdayform_id']); 
        }
        
        
        if(isset ($x['firstdayform_id'])){
           $this->setFirstdayformId($x['firstdayform_id']); 
        }
        if(isset ($x['question'])){
           $this->setQuestion($x['question']); 
        }
        if(isset ($x['answer'])){
           $this->setAnswer($x['answer']); 
        }
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'firstdayform_id'=>$this->getId(),
            'firstdayform_id'=>$this->getFirstdayformId(),
            'question'=>$this->getQuestion(),
            'answer'=>$this->getAnswer()
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

    public function setProject(Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function setPt(Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }
    public function getFirstdayformId() {
        return $this->firstdayform_id;
    }
    
    public function setFirstdayformId($firstdayform_id) {
        $this->firstdayform_id = $firstdayform_id;
    }

    public function getQuestion() {
        return $this->question;
    }
    
    public function setQuestion($question) {
        $this->question = $question;
    }

    public function getAnswer() {
        return $this->answer;
    }
    
    public function setAnswer($answer) {
        $this->answer = $answer;
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
