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
class Hrd_Models_Firstday_Firstdayform_Firstdayform extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,Box_Models_Master_InterProjectPt  {
    private $project;
    private $pt;
    private $question;
    private $question_active;
    private $sort;

    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "firstdayform_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['firstdayform_id'])){
           $this->setId($x['firstdayform_id']); 
        }
        if(isset ($x['question'])){
           $this->setQuestion($x['question']); 
        }
        if(isset ($x['question_active'])){
           $this->setQuestionActive($x['question_active']); 
        }
        if(isset ($x['sort'])){
           $this->setSort($x['sort']); 
        }
        
        unset($x);
    }
    
    public function getArrayTable() {
        
        if(empty($this->getSort())){
            $getSort = '0';
        }else{
            $getSort = $this->getSort();
        }

        $x = array(
            'firstdayform_id'=>$this->getId(),
            'question'=>$this->getQuestion(),
            'question_active'=>$this->getQuestionActive(),
            'sort'=>$getSort
        );
      
        return $x;
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

    public function setProjectKP(Box_Models_Master_Project $project) {
        $this->project = '1';
    }

    public function setPt(Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

    public function setPtKP(Box_Models_Master_Pt $pt) {
        $this->pt = '1';
    }

    public function setQuestion($question) {
        $this->question = $question;
    }
        
    public function getQuestion() {
        return $this->question;
    }

    public function setQuestionActive($question_active) {
        $this->question_active = $question_active;
    }
        
    public function getQuestionActive() {
        return $this->question_active;
    }

    public function setSort($sort) {
        $this->sort = $sort;
    }
        
    public function getSort() {
        return $this->sort;
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

    
    

}
