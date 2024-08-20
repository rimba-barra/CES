<?php

/**
 * Description of LeaveEntitlement
 *
 * @author MIS
 */
class Hrd_Models_Leave_LeaveEntitlement extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,  Box_Models_Master_InterProjectPt,  Box_Arried{
    private $leavegroup;
    private $employee;
    private $startUse;
    private $endUse;
    private $amount;
    private $isLeaveEnd;
    private $rest;
    private $extensionDate;
    private $extensionNote;
    private $expiredDate;
    private $project;
    private $pt;
    private $note;
    private $description;   
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "leaveentitlement_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['leaveentitlements_id'])){
           $this->setId($x['leaveentitlements_id']); 
        }
        if(isset ($x['rest'])){
           $this->setRest($x['rest']); 
        }
        if(isset ($x['amount'])){
           $this->setAmount($x['amount']); 
        }
        if(isset ($x['leavegroup'])){
           $this->setLeavegroup($x['leavegroup']); 
        }
        if(isset ($x['start_use'])){
           $this->setStartUse($x['start_use']); 
        }
        if(isset ($x['end_use'])){
           $this->setEndUse($x['end_use']); 
        }
        if(isset ($x['is_leave_end'])){
           $this->setIsLeaveEnd($x['is_leave_end']); 
        }
        if(isset ($x['extension_date'])){
           $this->setExtensionDate($x['extension_date']); 
        }
        if(isset ($x['extension_note'])){
           $this->setExtensionNote($x['extension_note']); 
        }
        if(isset ($x['expired_date'])){
           $this->setExpiredDate($x['expired_date']); 
        }
        if(isset ($x['employee_employee_id'])){
           $this->getEmployee()->setId($x['employee_employee_id']); 
        }
        if(isset ($x['note'])){
           $this->setNote($x['note']); 
        }
        if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'leaveentitlements_id'=>$this->getId(),
            'rest'=>$this->getRest(),
            'amount'=>$this->getAmount(),
            'leavegroup'=>$this->getLeavegroup(),
            'start_use'=>$this->getStartUse(),
            'end_use'=>$this->getEndUse(),
            'is_leave_end'=>$this->getIsLeaveEnd(),
            'extension_date'=>$this->getExtensionDate(),
            'extension_note'=>$this->getExtensionNote(),
            'expired_date'=>$this->getExpiredDate(),
            'employee_employee_id'=>$this->getEmployee()->getId(),
            'note'=>$this->getNote(),
            'description'=>$this->getDescription(),
        );
      
        return $x;
    }
    
    public function getLeavegroup() {
        
        return $this->leavegroup;
    }

    public function setLeavegroup($leavegroup) {
        $this->leavegroup = (int)$leavegroup;
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

    public function getStartUse() {
        return $this->startUse;
    }

    public function setStartUse($startUse) {
        $this->startUse = $startUse;
    }

    public function getEndUse() {
        return $this->endUse;
    }

    public function setEndUse($endUse) {
        $this->endUse = $endUse;
    }

    public function getAmount() {
        return (double)$this->amount;
    }

    public function setAmount($amount) {
        $this->amount = (double)$amount;
    }

    public function getIsLeaveEnd() {
        return $this->isLeaveEnd;
    }

    public function setIsLeaveEnd($isLeaveEnd) {
        $this->isLeaveEnd = (int)$isLeaveEnd;
    }

    public function getRest() {
        return $this->rest;
    }

    public function setRest($rest) {
        $this->rest = (double)$rest;
    }

    public function getExtensionDate() {
        return $this->extensionDate;
    }

    public function setExtensionDate($extensionDate) {
        $this->extensionDate = $extensionDate;
    }

    public function getExtensionNote() {
        return $this->extensionNote;
    }

    public function setExtensionNote($extendsionNote) {
        $this->extensionNote = $extendsionNote;
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

    public function getNote() {
        return $this->note;
    }

    public function setNote($note) {
        $this->note = $note;
    }

    function getDescription() {
        return strval($this->description);
    }

    function setDescription($description) {
        $this->description = $description;
    }

    
    public function grouped() {
        return array($this->getEmployee(),$this->getProject(),$this->getPt());
    }

    public function getArray() {
        return $this->getArrayTable();
    }


    
}

?>
