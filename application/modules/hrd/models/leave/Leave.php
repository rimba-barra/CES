<?php


/**
 * Description of Leave
 *
 * @author MIS
 */
class Hrd_Models_Leave_Leave extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,  Box_Models_Master_InterProjectPt {
    private $startDate;
    private $endDate;
    private $employee;
    private $project;
    private $pt;
    private $note;
    private $absentType;
    private $duration;
    private $isHalfDay;
    private $leaveBind;
    private $isKadaluarsa;
    //added by ahmad riadi 15-11-2017
    private $description;	

    //added by michael 2022-06-08 karena cuti bersama dari Bu Shirley mau supaya bisa dipotong cuti tahunan/cuti besar, soalnya dulu cuma cuti tahunan aja
    private $dari;

    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "leave_";
        
    }


    //start added by ahmad riadi 15-11-2017
    function getDescription() {
        return strval($this->description);
    }

    function setDescription($description) {
        $this->description = $description;
    }
    //end added by ahmad riadi 15-11-2017


    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;

	  //start added by ahmad riadi 15-11-2017
        if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
         //end added by ahmad riadi 15-11-2017


        if(isset ($x['leave_id'])){
           $this->setId($x['leave_id']); 
        }
        if(isset ($x['start_date'])){
           $this->setStartDate($x['start_date']); 
        }
        if(isset ($x['end_date'])){
           $this->setEndDate($x['end_date']); 
        }
        if(isset ($x['note'])){
           $this->setNote($x['note']); 
        }
        if(isset ($x['duration'])){
           $this->setDuration($x['duration']); 
        }
        if(isset ($x['is_halfday'])){
           $this->setIsHalfDay($x['is_halfday']); 
        }
        if(isset ($x['leave_bind'])){
           $this->setLeaveBind($x['leave_bind']); 
        }
        if(isset ($x['absenttype_absenttype_id'])){
           $this->getAbsentType()->setId($x['absenttype_absenttype_id']); 
        }
        if(isset ($x['employee_employee_id'])){
           $this->getEmployee()->setId($x['employee_employee_id']); 
        }
        if(isset ($x['is_kadaluarsa'])){
           $this->setIsKadaluarsa($x['is_kadaluarsa']); 
        }

        //added by michael 2022-06-08 karena cuti bersama dari Bu Shirley mau supaya bisa dipotong cuti tahunan/cuti besar, soalnya dulu cuma cuti tahunan aja
        if(isset ($x['dari'])){
           $this->setDari($x['dari']); 
        }
       
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'leave_id'=>$this->getId(),
            'start_date'=>$this->getStartDate(),
            'end_date'=>$this->getEndDate(),
            'note'=>$this->getNote(),
            'duration'=>$this->getDuration(),
            'is_halfday'=>$this->getIsHalfDay(),
            'leave_bind'=>$this->getLeaveBind(),
            'absenttype_absenttype_id'=>$this->getAbsentType()->getId(),
            'employee_employee_id'=>$this->getEmployee()->getId(),
            'is_kadaluarsa'=>$this->getIsKadaluarsa(),
	    'description'=>$this->getDescription(),//added by ahmad riadi	

            //added by michael 2022-06-08 karena cuti bersama dari Bu Shirley mau supaya bisa dipotong cuti tahunan/cuti besar, soalnya dulu cuma cuti tahunan aja
            'dari'=>$this->getDari(),

        );
      
        return $x;
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

    public function getEmployee() {
        if(!$this->employee){
            $this->employee = new Hrd_Models_Master_Employee();
        }
        return $this->employee;
    }

    public function setEmployee(Hrd_Models_Master_Employee $employee) {
        $this->employee = $employee;
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
    
    public function getNote() {
        return $this->note;
    }

    public function setNote($note) {
        $this->note = $note;
    }

    public function getAbsentType() {
        if(!$this->absentType){
            $this->absentType = new Hrd_Models_Master_AbsentType();
        }
        return $this->absentType;
    }

    public function setAbsentType(Hrd_Models_Master_AbsentType $absentType) {
        $this->absentType = $absentType;
    }

    
    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getEmployee(),$this->getProject(),$this->getPt(),$this->getAbsentType());
    }
    
    
    public function getDuration() {
        return $this->duration;
    }

    public function setDuration($duration) {
        $this->duration = (float)$duration;
    }
    
    public function getIsHalfDay() {
        return $this->isHalfDay;
    }

    public function setIsHalfDay($isHalfDay) {
        $this->isHalfDay = $isHalfDay;
    }

    

    public function getLeaveBind() {
        return $this->leaveBind;
    }

    public function setLeaveBind($leaveBind) {
        $this->leaveBind = $leaveBind;
    }
    
    public function getIsKadaluarsa() {
        return $this->isKadaluarsa;
    }

    public function setIsKadaluarsa($isKadaluarsa) {
        $this->isKadaluarsa = $isKadaluarsa;
    }

    //added by michael 2022-06-08 karena cuti bersama dari Bu Shirley mau supaya bisa dipotong cuti tahunan/cuti besar, soalnya dulu cuma cuti tahunan aja
    public function getDari() {
        return $this->dari;
    }

    public function setDari($dari) {
        $this->dari = $dari;
    }





}

?>
