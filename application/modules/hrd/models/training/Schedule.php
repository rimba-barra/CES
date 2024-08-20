<?php

/**
 * Description of Schedule
 *
 * @author MIS
 */
class Hrd_Models_Training_Schedule extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,  Box_Models_Master_InterProjectPt {
    private $program;
    private $project;
    private $pt;
    private $startDate;
    private $endDate;
    private $location;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "scheduletraining_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['scheduletraining_id'])){
           $this->setId($x['scheduletraining_id']); 
        }
        if(isset ($x['programtraining_programtraining_id'])){
           $this->getProgram()->setId($x['programtraining_programtraining_id']); 
        }
        if(isset ($x['location'])){
           $this->setLocation($x['location']); 
        }
        if(isset ($x['start_date'])){
           $this->setStartDate($x['start_date']); 
        }
        if(isset ($x['end_date'])){
           $this->setEndDate($x['end_date']); 
        }
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'scheduletraining_id'=>$this->getId(),
            'programtraining_programtraining_id'=>$this->getProgram()->getId(),
            'location'=>$this->getLocation(),
            'start_date'=>$this->getStartDate(),
            'end_date'=>$this->getEndDate()
        );
      
        return $x;
    }
    
    public function getProgram() {
        if(!$this->program){
           $this->program = new Hrd_Models_Training_Program(); 
        }
        return $this->program;
    }

    public function setProgram(Hrd_Models_Training_Program $program) {
        $this->program = $program;
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

    public function getStartDate() {
        return $this->startDate;
    }

    public function setStartDate($startDate) {
        $this->startDate = $startDate;
    }

    public function getEndDate() {
        return $this->endDate;
    }

    public function setEndDate($endDate) {
        $this->endDate = $endDate;
    }

    public function getLocation() {
        return $this->location;
    }

    public function setLocation($location) {
        $this->location = $location;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }
    
    protected function getDatefields() {
        return array("start_date","end_date");
    }

    
    


}

?>
