<?php
/**
 * Description of TrainingDetail
 *
 * @author MIS
 */
class Hrd_Models_Training_TrainingDetail extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,  Box_Arried {
    private $training;
    private $employee;
    private $certificate;
    private $status;
    private $point;
    private $duration;
    private $grade;
    private $isUpdateAttendance;
    private $dates;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "trainingdetail_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['trainingdetail_id'])){
           $this->setId($x['trainingdetail_id']); 
        }
        if(isset ($x['trainingtran_training_id'])){
           $this->getTraining()->setId($x['trainingtran_training_id']); 
        }
        if(isset ($x['employee_employee_id'])){
           $this->getEmployee()->setId($x['employee_employee_id']); 
        }
        if(isset ($x['certificate'])){
           $this->setCertificate($x['certificate']); 
        }
        if(isset ($x['training_status'])){
           $this->setStatus($x['training_status']); 
        }
        if(isset ($x['point'])){
           $this->setPoint($x['point']); 
        }
        if(isset ($x['duration'])){
           $this->setDuration($x['duration']); 
        }
        if(isset ($x['grade'])){
           $this->setGrade($x['grade']); 
        }
        if(isset ($x['is_upgradeattendance'])){
           $this->setIsUpdateAttendance($x['is_upgradeattendance']); 
        }
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'trainingdetail_id'=>$this->getId(),
            'trainingtran_training_id'=>$this->getTraining()->getId(),
            'employee_employee_id'=>$this->getEmployee()->getId(),
            'certificate'=>$this->getCertificate(),
            'training_status'=>$this->getStatus(),
            'point'=>$this->getPoint(),
            'duration'=>$this->getDuration(),
            'grade'=>$this->getGrade(),
            'is_upgradeattendance'=>$this->getIsUpdateAttendance()
        );
      
        return $x;
    }
    
    public function getTraining() {
        if(!$this->training){
            $this->training = new Hrd_Models_Training_Training();
        }
        return $this->training;
    }

    public function setTraining(Hrd_Models_Training_Training $training) {
        $this->training = $training;
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

    public function getCertificate() {
        return $this->certificate;
    }

    public function setCertificate($certificate) {
        $this->certificate = (int)$certificate;
    }

    public function getStatus() {
        return $this->status;
    }

    public function setStatus($status) {
        $this->status = (int)$status;
    }

    public function getPoint() {
        return $this->point;
    }

    public function setPoint($point) {
        $this->point = (float)$point;
    }

    public function getDuration() {
        return $this->duration;
    }

    public function setDuration($duration) {
        $this->duration = $duration;
    }

    public function getGrade() {
        return $this->grade;
    }

    public function setGrade($grade) {
        $this->grade = (int)$grade;
    }

    public function getIsUpdateAttendance() {
        return $this->isUpdateAttendance;
    }

    public function setIsUpdateAttendance($isUpdateAttendance) {
        $this->isUpdateAttendance = (int)$isUpdateAttendance;
    }
    
    public function addDate(Hrd_Models_Training_DetailDate $d){
        $this->dates[] = $d;
    }
    
    public function getDate($index = -1){
        if($index >= 0){
            return $this->dates[$index];
        }else{
            return $this->dates;
        }
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getEmployee(),$this->getTraining());
    }

    public function getArray() {
        return $this->getArrayTable();
    }


    
}

?>
