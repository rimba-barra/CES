<?php

/**
 * Description of Training
 *
 * @author MIS
 */
class Hrd_Models_Training_Training extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,  Box_Models_Master_InterProjectPt,  Box_Delien_DelimiterCandidate, Box_Models_App_Hermes_HasDetail {
    private $project;
    private $pt;
    private $schedule;
    private $registedEmployee;
    private $DCResult;
    private $effectiveDate;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "trainingtran_";
        $this->registedEmployee = array();
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['training_id'])){
           $this->setId($x['training_id']); 
        }
        if(isset ($x['scheduletraining_scheduletraining_id'])){
           $this->getSchedule()->setId($x['scheduletraining_scheduletraining_id']); 
        }
        if(isset ($x['effective_date'])){
           $this->setEffectiveDate($x['effective_date']); 
        }
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'training_id'=>$this->getId(),
            'scheduletraining_scheduletraining_id'=>$this->getSchedule()->getId(),
            'effective_date'=>$this->getEffectiveDate()
        );
      
        return $x;
    }
    
    public function addEmployee(Hrd_Models_Training_TrainingDetail $em){
        $this->registedEmployee[] = $em;
    }
    
    public function getEmployee($pos=-1){
        if($pos > -1){
            return $this->registedEmployee[$pos];
        }
        return $this->registedEmployee;
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

    public function getSchedule() {
        if(!$this->schedule){
            $this->schedule = new Hrd_Models_Training_Schedule();
        }
        return $this->schedule;
    }

    public function setSchedule(Hrd_Models_Training_Schedule $schedule) {
        $this->schedule = $schedule;
    }
    
    public function getRegistedEmployee() {
        return $this->registedEmployee;
    }

    public function setRegistedEmployee($registedEmployee) {
        $this->registedEmployee = $registedEmployee;
    }

    public function getEffectiveDate() {
        return $this->effectiveDate;
    }

    public function setEffectiveDate($effectiveDate) {
        $this->effectiveDate = $this->ignoredd($effectiveDate);
    }

    
    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }

    public function addDetailObject($detailObject) {
        $this->addEmployee($detailObject);
    }

    public function getDCArray() {
        return $this->registedEmployee;
    }

    public function getDCResult() {
        return $this->DCResult;
    }

    public function getDetailObject() {
        return new Hrd_Models_Training_TrainingDetail();
    }

    public function getIndexArName() {
        return "detail";
    }

    public function setDCArray($delimiteredArray) {
        $this->DCResult = $delimiteredArray;
    }
    
    protected function getDatefields() {
        return array("effective_date");
    }



}

?>
