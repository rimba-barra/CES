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
class Hrd_Models_Training_Trainingattendance_Trainingattendancesurvey extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,  Box_Arried  {
    private $trainingattendancesurvey_id;
    private $trainingattendance_id;
    private $trainingsurvey_id;
    private $trainingsurvey_value;


    // private $menu_parent_id;
    private $survey_parent_name;
    // private $menu_id;
    private $survey_name;
    
    public function __construct() {
        $this->_mail = new Hrd_Models_General_Email();
        parent::__construct();
        $this->embedPrefix = "trainingattendancesurvey_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;

        if(isset ($x['trainingattendancesurvey_id'])){
           $this->setId($x['trainingattendancesurvey_id']); 
        }
        if(isset ($x['trainingattendance_id'])){
           $this->setTrainingAttendanceId($x['trainingattendance_id']); 
        }
        if(isset ($x['trainingsurvey_id'])){
           $this->setTrainingsurveyId($x['trainingsurvey_id']); 
        }
        if(isset ($x['trainingsurvey_value'])){
           $this->setTrainingsurveyValue($x['trainingsurvey_value']); 
        }

        // if(isset ($x['survey_parent_id'])){
        //    $this->setMenuParentId($x['survey_parent_id']); 
        // }

        if(isset ($x['survey_parent_name'])){
           $this->setSurveyParentName($x['survey_parent_name']); 
        }

        // if(isset ($x['survey_id'])){
        //    $this->setSurveyId($x['survey_id']); 
        // }

        if(isset ($x['survey_name'])){
           $this->setSurveyName($x['survey_name']); 
        }
        
        unset($x);
    }
    
    public function getArrayTable() {
        

        $x = array(
            'trainingattendancesurvey_id'=>$this->getId(),
            'trainingattendance_id'=>$this->getTrainingAttendanceId(),
            'trainingsurvey_id'=>$this->getTrainingsurveyId(),
            'trainingsurvey_value'=>$this->getTrainingsurveyValue(),
            // 'survey_parent_id'=>$this->getSurveyParentId(),
            'survey_parent_name'=>$this->getSurveyParentName(),
            // 'survey_id'=>$this->getSurveyId(),
            'survey_name'=>$this->getSurveyName(),
        );
      
        return $x;
    }

    public function getTrainingAttendanceId() {
        return $this->trainingattendance_id;
    }
    public function setTrainingAttendanceId($trainingattendance_id) {
        $this->trainingattendance_id = $trainingattendance_id;
    }

    public function getTrainingsurveyId() {
        return $this->trainingsurvey_id;
    }
    public function setTrainingsurveyId($trainingsurvey_id) {
        $this->trainingsurvey_id = $trainingsurvey_id;
    }


    public function getTrainingsurveyValue() {
        return $this->trainingsurvey_value;
    }
    public function setTrainingsurveyValue($trainingsurvey_value) {
        $this->trainingsurvey_value = $trainingsurvey_value;
    }

    // public function getSurveyParentId() {
    //     return $this->survey_parent_id;
    // }
    // public function setSurveyParentId($survey_parent_id) {
    //     $this->survey_parent_id = $survey_parent_id;
    // }

    public function getSurveyParentName() {
        return $this->survey_parent_name;
    }
    public function setSurveyParentName($survey_parent_name) {
        $this->survey_parent_name = $survey_parent_name;
    }

    // public function getSurveyId() {
    //     return $this->survey_id;
    // }
    // public function setSurveyId($survey_id) {
    //     $this->survey_id = $survey_id;
    // }

    public function getSurveyName() {
        return $this->survey_name;
    }
    public function setSurveyName($survey_name) {
        $this->survey_name = $survey_name;
    }


    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }

    public function getArray() {
        return $this->getArrayTable();
    }
    
    // protected function getDatefields() {
    //     return array("tanggal");
    // }

    // function get_mail() {
    //     return $this->_mail;
    // }
    

}
