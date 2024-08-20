<?php

/**
 * Description of LeaveEntitlement
 *
 * @author MIS
 */
class Hrd_Models_Leave_KompensasiExtraLeave extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,  Box_Models_Master_InterProjectPt,  Box_Arried{
    
    private $id;
    private $employee;
    private $start_date;
    private $amount;
    private $rest;
    private $expiredDate;
    private $project;
    private $pt;
    private $type;   
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "kompensasiextraleave_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['id'])){
           $this->setId($x['id']); 
        }
        if(isset ($x['rest'])){
           $this->setRest($x['rest']); 
        }
        if(isset ($x['amount'])){
           $this->setAmount($x['amount']); 
        }
        if(isset ($x['start_date'])){
           $this->setStart_date($x['start_date']); 
        }
        if(isset ($x['expired_date'])){
           $this->setExpiredDate($x['expired_date']); 
        }
        if(isset ($x['employee_employee_id'])){
           $this->getEmployee()->setId($x['employee_employee_id']); 
        }
        if(isset ($x['type'])){
           $this->setType($x['type']); 
        }
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'id'=>$this->getId(),
            'rest'=>$this->getRest(),
            'amount'=>$this->getAmount(),
            'start_date'=>$this->getStart_date(),
            'expired_date'=>$this->getExpiredDate(),
            'employee_employee_id'=>$this->getEmployee()->getId(),
            'type'=>$this->getType(),
        );
      
        return $x;
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

    public function getStart_date() {
        return $this->start_date;
    }

    public function setStart_date($start_date) {
        $this->start_date = $start_date;
    }

    public function getAmount() {
        return (double)$this->amount;
    }

    public function setAmount($amount) {
        $this->amount = (double)$amount;
    }

    
    public function getRest() {
        return $this->rest;
    }

    public function setRest($rest) {
        $this->rest = (double)$rest;
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

    public function fillData($data) {
        $this->setArrayTable($data);
    }
    
    public function getExpiredDate() {
        return $this->expiredDate;
    }

    public function setExpiredDate($expiredDate) {
        $this->expiredDate = $expiredDate;
    }

    function getType() {
        return strval($this->type);
    }

    function setType($type) {
        $this->type = $type;
    }

    
    public function grouped() {
        return array($this->getEmployee(),$this->getProject(),$this->getPt());
    }

    public function getArray() {
        return $this->getArrayTable();
    }


    
}

?>
