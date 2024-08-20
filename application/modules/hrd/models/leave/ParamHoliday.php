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
class Hrd_Models_Leave_ParamHoliday extends Box_Models_ObjectEmbedData implements  Box_Kouti_Remora, Box_Models_Master_InterProjectPt  {
    private $project;
    private $projectid;
    private $pt;
    private $ptid;
    private $holiday_name_id;
    private $holiday_name;
    private $is_cuti_ph;
    
    public function __construct() {
        $this->_mail = new Hrd_Models_General_Email();
        parent::__construct();
        $this->embedPrefix = "holidayname_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        if(isset ($x['project_id'])){
           $this->setProjectid($x['project_id']); 
        }
        if(isset ($x['pt_id'])){
           $this->setPtid($x['pt_id']); 
        }
        
        if(isset ($x['holiday_name_id'])){
           $this->setId($x['holiday_name_id']); 
        }
        if(isset ($x['holiday_name_id'])){
           $this->setHolidayNameId($x['holiday_name_id']); 
        }
        if(isset ($x['holiday_name'])){
           $this->setHolidayName($x['holiday_name']); 
        }
        if(isset ($x['is_cuti_ph'])){
           $this->setIsCutiPh($x['is_cuti_ph']); 
        }
       
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'holiday_name_id'=>$this->getId(),
            'holiday_name_id'=>$this->getHolidayNameId(),
            'holiday_name'=>$this->getHolidayName(),
            'is_cuti_ph'=>$this->getIsCutiPh(),
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

    public function getHolidayNameId() {
        return $this->holiday_name_id;
    }

    public function getHolidayName() {
        return $this->holiday_name;
    }

    public function getIsCutiPh() {
        return $this->is_cuti_ph;
    }

    

    public function setProject(Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function setPt(Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

    public function setHolidayNameId($holiday_name_id) {
        $this->holiday_name_id = $holiday_name_id;
    }

    public function setHolidayName($holiday_name) {
        $this->holiday_name = $holiday_name;
    }

    public function setIsCutiPh($is_cuti_ph) {
        $this->is_cuti_ph = $is_cuti_ph;
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
