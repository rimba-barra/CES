<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Header
 *
 * @author MIS
 */
class Hrd_Models_Overtime_Header extends Box_Models_ObjectEmbedData implements Box_Models_Master_InterProjectPt,  Box_Kouti_Remora, Box_Models_App_Hermes_HasRelation,Box_Delien_DelimiterCandidate {
    private $employee;
    private $date;
    private $status;
    private $reason;
    private $planBeforeStart;
    private $planBeforeEnd;
    private $planAfterStart;
    private $planAfterEnd;
    private $basicValue;
    private $workHour;
    private $value;
    private $extraMeal;
    private $overtimes;
    private $pt;
    private $project;
    private $selectedRelation;
    private $DCResult;


    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "overtimeheader_";
        $this->overtimes = array();
    }
    
    public function setArrayTable($dataArray = NULL) {

        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;

        if (isset($x['overtimeheader_id'])) {
            $this->setId($x['overtimeheader_id']);
        }
        if (isset($x['date'])) {
            $this->setDate($x['date']);
        }
        if (isset($x['status'])) {
            $this->setStatus($x['status']);
        }
        if (isset($x['reason'])) {
            $this->setReason($x['reason']);
        }
        if (isset($x['plan_before_start'])) {
            $this->setPlanBeforeStart($x['plan_before_start']);
        }
        if (isset($x['plan_before_end'])) {
            $this->setPlanBeforeEnd($x['plan_before_end']);
        }
        if (isset($x['plan_after_start'])) {
            $this->setPlanAfterStart($x['plan_after_start']);
        }
        if (isset($x['plan_after_end'])) {
            $this->setPlanAfterEnd($x['plan_after_end']);
        }
        if (isset($x['basic_value'])) {
            $this->setBasicValue($x['basic_value']);
        }
        if (isset($x['work_hour'])) {
            $this->setWorkHour($x['work_hour']);
        }
        if (isset($x['value'])) {
            $this->setValue($x['value']);
        }
        if (isset($x['extra_meal'])) {
            $this->setExtraMeal($x['extra_meal']);
        }
        if (isset($x['employee_employee_id'])) {
            $this->getEmployee()->setId($x['employee_employee_id']);
        }
        

        unset($x);
    }

    public function getArrayTable() {

        $x = array(
            'overtimeheader_id' => $this->getId(),
            'date'=>$this->getDate(),
            'status'=>$this->getStatus(),
            'reason'=>$this->getReason(),
            'plan_before_start'=>$this->getPlanBeforeStart(),
            'plan_before_end'=>$this->getPlanBeforeEnd(),
            'plan_after_start'=>$this->getPlanAfterStart(),
            'plan_after_end'=>$this->getPlanAfterEnd(),
            'basic_value'=>$this->getBasicValue(),
            'work_hour'=>$this->getWorkHour(),
            'value'=>$this->getValue(),
            'extra_meal'=>$this->getExtraMeal(),
            'employee_employee_id'=>$this->getEmployee()->getId()
        );
       

        return $x;
    }
    
    public function addOvertime(Hrd_Models_Overtime_Overtime $overtime){
        $this->overtimes[] = $overtime;
    }
    
    public function setOvertime($pos,Hrd_Models_Overtime_Overtime $overtime){
        $this->overtimes[$pos] = $overtime;
    }
    
    public function getOvertime($pos){
        return $this->overtimes[$pos];
    }
    
    public function getEmployee() {
        if(!$this->employee){
            $this->employee= new Hrd_Models_Master_Employee();
        }
        return $this->employee;
    }

    public function setEmployee(Hrd_Models_Master_Employee $employee) {
        $this->employee = $employee;
    }
    
    public function getDate() {
        return $this->date;
    }

    public function setDate($date) {
        $this->date = $date;
    }

    
    public function getStatus() {
        return $this->status;
    }

    public function setStatus($status) {
        $this->status = $status;
    }

    public function getReason() {
        return $this->reason;
    }

    public function setReason($reason) {
        $this->reason = $reason;
    }

    public function getPlanBeforeStart() {
        return $this->planBeforeStart;
    }

    public function setPlanBeforeStart($planBeforeStart) {
       // $this->planBeforeStart = $planBeforeStart;
        $this->planBeforeStart = date('Y-m-d H:i:s', strtotime($planBeforeStart));
        
    }

    public function getPlanBeforeEnd() {
        return $this->planBeforeEnd;
    }

    public function setPlanBeforeEnd($planBeforeEnd) {
        $this->planBeforeEnd = date('Y-m-d H:i:s', strtotime($planBeforeEnd));
    }

    public function getPlanAfterStart() {
        return $this->planAfterStart;
    }

    public function setPlanAfterStart($planAfterStart) {
        $this->planAfterStart = date('Y-m-d H:i:s', strtotime($planAfterStart));
    }

    public function getPlanAfterEnd() {
        return $this->planAfterEnd;
    }

    public function setPlanAfterEnd($planAfterEnd) {
        $this->planAfterEnd = date('Y-m-d H:i:s', strtotime($planAfterEnd));
    }

    public function getBasicValue() {
        return $this->basicValue;
    }

    public function setBasicValue($basicValue) {
        $this->basicValue = (double)$basicValue;
    }

    public function getWorkHour() {
        return $this->workHour;
    }

    public function setWorkHour($workHour) {
        $this->workHour = $workHour;
    }

    public function getValue() {
        return $this->value;
    }

    public function setValue($value) {
        $this->value = (double)$value;
    }

    public function getExtraMeal() {
        return $this->extraMeal;
    }

    public function setExtraMeal($extraMeal) {
        $this->extraMeal = (int)$extraMeal;
    }

    public function getOvertimes() {
        return $this->overtimes;
    }

    public function setOvertimes($overtimes) {
        $this->overtimes = $overtimes;
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

    public function setProject(\Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function setPt(\Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getEmployee());
    }
    
    public function getDatefields() {
        return array("date");
    }

    public function addRelationObject($object, $indexName) {
        switch ($indexName){
            case "overtimes":
                $this->addOvertime($object);
                break;
            
            
        }
    }

    public function getIndexNames() {
        return array("overtimes");
    }

    public function getRelationObject($indexName) {
       switch ($indexName){
            case "overtimes":
                return new Hrd_Models_Overtime_Overtime();
                break;
           
        } 
    }

    public function setSelectedRelation($indexName) {
        $this->selectedRelation = $indexName;
    }

    public function getDCArray() {
        $n = $this->selectedRelation;
        if($n){
            switch($n){
                case "overtimes":
                    return $this->overtimes;
                    break;
            }
        }
        return NULL;
    }

    public function getDCResult() {
        if(array_key_exists($this->selectedRelation, $this->DCResult)){
            return $this->DCResult[$this->selectedRelation];
        }
        return false;
    }

    public function setDCArray($delimiteredArray) {
         $this->DCResult[$this->selectedRelation] = $delimiteredArray;
    }


}

?>
