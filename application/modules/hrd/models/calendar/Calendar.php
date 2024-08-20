<?php

/**
 * Description of Calendar
 *
 * @author MIS
 */
class Hrd_Models_Calendar_Calendar extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,Box_Models_App_Hermes_HasDetail,Box_Delien_DelimiterCandidate,  Box_Models_Master_InterProjectPt  {
    private $department;
    private $year;
    private $project;
    private $pt;
    private $isDefault;
    private $detail;
    private $DCResult;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "calendar_";
        $this->detail = array();
    }
    
    
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['calendar_id'])){
           $this->setId($x['calendar_id']); 
        }
        if(isset ($x['year'])){
           $this->setYear($x['year']); 
        }
        if(isset ($x['is_default'])){
           $this->setIsDefault($x['is_default']); 
        }
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'calendar_id'=>$this->getId(),
            'year'=>$this->getYear(),
            'is_default'=>$this->getIsDefault()
        );
      
        return $x;
    }
    
    public function addDetail(Hrd_Models_Calendar_CalendarDetail $detail){
        $this->detail[] = $detail;
    }
    
    public function getDepartment() {
        if(!$this->department){
            $this->department = new Hrd_Models_Master_Department();
        }
        return $this->department;
    }

    public function setDepartment(Hrd_Models_Master_Department $department) {
        $this->department = $department;
    }

    public function getYear() {
        return $this->year;
    }

    public function setYear($year) {
        $this->year = $year;
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
    
    
    public function getIsDefault() {
        return (int)$this->isDefault;
    }

    public function setIsDefault($isDefault) {
        $this->isDefault = $isDefault;
    }

        public function addDetailObject($detailObject) {
        $this->addDetail($detailObject);
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function getDCArray() {
        return $this->detail;
    }

    public function getDCResult() {
        return $this->DCResult;
    }

    public function getDetailObject() {
        return new Hrd_Models_Calendar_CalendarDetail();
    }

    public function getIndexArName() {
        return "detail";
    }

    public function grouped() {
        return array($this->getProject(),$this->getPt(),$this->getDepartment());
    }

    public function setDCArray($delimiteredArray) {
        $this->DCResult = $delimiteredArray;
    }
    
    public function getDetail($pos=-1){
        if($pos > -1){
            return $this->detail[$pos];
        }else{
            return $this->detail;
        }
    }


}

?>
