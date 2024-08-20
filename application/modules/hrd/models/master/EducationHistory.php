<?php

/**
 * Description of EducationHistory
 *
 * @author MIS
 */
class Hrd_Models_Master_EducationHistory extends Box_Models_ObjectEmbedData implements Box_Arried{
    private $stage;
    private $employee;
    private $startYear;
    private $endYear;
    private $school;
    private $subject;
    private $ijasah;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "educationhistory_";
    }
    
    public function setArrayTable($dataArray=NULL) {
   
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
  
        if(isset ($x['educationhistory_id'])){
           $this->setId($x['educationhistory_id']); 
        }
        if(isset ($x['stage'])){
           $this->setStage($x['stage']); 
        }
        if(isset ($x['start_year'])){
           $this->setStartYear($x['start_year']); 
        }
        if(isset ($x['end_year'])){
           $this->setEndYear($x['end_year']); 
        }
        if(isset ($x['school'])){
           $this->setSchool($x['school']); 
        }
        if(isset ($x['subjected'])){
           $this->setSubject($x['subjected']); 
        }
        if(isset ($x['deleted'])){
           $this->setDeleted($x['deleted']); 
        }
        if(isset ($x['ijasah'])){
           $this->setIjasah($x['ijasah']); 
        }
        
       
        unset($x);

        
    }
    
    public function getArrayTable(){
        $x = array(
            "educationhistory_id"=>$this->getId(),
            "stage"=>$this->getStage(),
            "start_year"=>$this->getStartYear(),
            "end_year"=>$this->getEndYear(),
            "school"=>$this->getSchool(),
            "subjected"=>$this->getSubject(),
            "deleted"=>$this->getDeleted(),
            "ijasah"=>$this->getIjasah()
        );
      
        return $x;
    }
    
    
    
    public function getStage() {
        return $this->stage;
    }

    public function setStage($stage) {
        $this->stage = $stage;
    }

    public function getEmployee() {
        return $this->employee;
    }

    public function setEmployee($employee) {
        $this->employee = $employee;
    }

    public function getStartYear() {
        return $this->startYear;
    }

    public function setStartYear($startYear) {
        $this->startYear = $this->toDateTime($startYear);
    }

    public function getEndYear() {
        return $this->endYear;
    }

    public function setEndYear($endYear) {
        $this->endYear = $this->toDateTime($endYear);
    }

    public function getSchool() {
        return $this->school;
    }

    public function setSchool($school) {
        $this->school = $school;
    }

    public function getSubject() {
        return $this->subject;
    }

    public function setSubject($subject) {
        $this->subject = $subject;
    }
    
    public function getIjasah() {
        return $this->ijasah;
    }

    public function setIjasah($ijasah) {
        $this->ijasah = $ijasah;
    }

    
    public function getArray() {
        return $this->getArrayTable();
    }
    
    protected function getDatefields() {
        return array("start_year","end_year");
    }


}

?>
