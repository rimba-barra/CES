<?php

/**
 * Description of Absent
 *
 * @author MIS
 */
class Hrd_Models_Fingerprint_FingerPrint extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,  Box_Arried{
    
    private $number;
    private $name;
    private $timeIn;
    private $timeOut;
    private $date;
    private $project;
    private $pt;
    private $tempId; // format : date+number
    
    
    public function __construct() {
        $this->embedPrefix = "fingerprint_";
    }
    
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['fingerprintprocess_id'])){
           $this->setId($x['fingerprintprocess_id']); 
        }
        if(isset ($x['psnno'])){
           $this->setNumber($x['psnno']); 
        }
        if(isset ($x['psnname'])){
           $this->setName($x['psnname']); 
        }
        if(isset ($x['time_in'])){
           $this->setTimeIn($x['time_in']); 
        }
        if(isset ($x['time_out'])){
           $this->setTimeOut($x['time_out']); 
        }
        if(isset ($x['date'])){
           $this->setDate($x['date']); 
        }
        if(isset ($x['temp_id'])){
           $this->setTempId($x['temp_id']); 
        }
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'fingerprintprocess_id'=>$this->getId(),
            'psnno'=>$this->getNumber(),
            'psnname'=>$this->getName(),
            'time_in'=>$this->getTimeIn(),
            'time_out'=>$this->getTimeOut(),
            'date'=>$this->getDate(),
            'temp_id'=>$this->getTempId()
        );
      
        return $x;
    }
    
    public function getNumber() {
        return $this->number;
    }

    public function setNumber($number) {
        $this->number = $number;
    }

    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function getTimeIn() {
        return $this->timeIn;
    }

    public function setTimeIn($timeIn) {
        $this->timeIn = $timeIn;
    }

    public function getTimeOut() {
        return $this->timeOut;
    }

    public function setTimeOut($timeOut) {
        $this->timeOut = $timeOut;
    }

    public function getDate() {
        return $this->date;
    }

    public function setDate($date) {
        $this->date = $date;
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
    
    public function getTempId() {
        return $this->tempId;
    }

    public function setTempId($tempId) {
        $this->tempId = $tempId;
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

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getProject(),$this->getPt());
    }

    public function getArray() {
        return $this->getArrayTable();
    }




    


}

?>
