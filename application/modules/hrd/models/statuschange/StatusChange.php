<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of StatusChange
 *
 * @author MIS
 */
class Hrd_Models_Statuschange_StatusChange extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora {
    private $employee;
    private $newStatus;
    private $oldStatus;
    private $newEmployeeStatus;
    private $oldEmplyoeeStatus;
    private $approved;
    private $skNumber;
    private $effectiveDate;
    private $is_applied; // add by wulan sari 03122020
    private $notes; // add by wulan sari 03122020

    private $usiaKerjaStartDate;
    private $masaKerjaStartDate;
    private $isKompensasi;

    private $isPensiun;
    
    
    public function __construct() {
        $this->embedPrefix = "statuschange_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['statuschange_id'])){
           $this->setId($x['statuschange_id']); 
        }
        if(isset ($x['employee_employee_id'])){
           $this->getEmployee()->setId($x['employee_employee_id']); 
        }
        if(isset ($x['newstatusinformation_statusinformation_id'])){
           $this->getNewStatus()->setId($x['newstatusinformation_statusinformation_id']); 
        }
        if(isset ($x['oldstatusinformation_statusinformation_id'])){
           $this->getOldStatus()->setId($x['oldstatusinformation_statusinformation_id']); 
        }
        if(isset ($x['newemployeestatus_employeestatus_id'])){
           $this->getNewEmployeeStatus()->setId($x['newemployeestatus_employeestatus_id']); 
        }
        if(isset ($x['oldemployeestatus_employeestatus_id'])){
           $this->getOldEmplyoeeStatus()->setId($x['oldemployeestatus_employeestatus_id']); 
        }
        
        
        if(isset ($x['approved'])){
           $this->setApproved($x['approved']); 
        }
        if(isset ($x['effective_date'])){
           $this->setEffectiveDate($x['effective_date']); 
        }
        if(isset ($x['sk_number'])){
           $this->setSkNumber($x['sk_number']); 
        }
        
        // add by wulan sari 03122020
        if(isset ($x['is_applied'])){
           $this->setIs_applied($x['is_applied']); 
        }
        if(isset ($x['notes'])){
           $this->setNotes($x['notes']); 
        }

        if(isset ($x['masa_kerja_start_date'])){
           $this->setMasaKerjaStartDate($x['masa_kerja_start_date']); 
        }
        if(isset ($x['usia_kerja_start_date'])){
           $this->setUsiaKerjaStartDate($x['usia_kerja_start_date']); 
        }
        if(isset ($x['is_kompensasi'])){
           $this->setIsKompensasi($x['is_kompensasi']); 
        }

        if(isset ($x['is_pensiun'])){
           $this->setIsPensiun($x['is_pensiun']); 
        }
       
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'statuschange_id'=>$this->getId(),
            'employee_employee_id'=>$this->getEmployee()->getId(),
            'newstatusinformation_statusinformation_id'=>$this->getNewStatus()->getId(),
            'oldstatusinformation_statusinformation_id'=>$this->getOldStatus()->getId(),
            'approved'=>$this->getApproved(),
            'effective_date'=>$this->getEffectiveDate(),
            'sk_number'=>$this->getSkNumber(),
            'newemployeestatus_employeestatus_id'=>$this->getNewEmployeeStatus()->getId(),
            'oldemployeestatus_employeestatus_id'=>$this->getOldEmplyoeeStatus()->getId(),
            'is_applied'=>$this->getIs_applied(), // add by wulan sari 03122020
            'notes'=>$this->getNotes(), // add by wulan sari 03122020
            

            "masa_kerja_start_date"=>$this->getMasaKerjaStartDate(),
            "usia_kerja_start_date"=>$this->getUsiaKerjaStartDate(),
            "is_kompensasi"=>$this->getIsKompensasi(),

            "is_pensiun"=>$this->getIsPensiun()
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

    public function getNewStatus() {
        if(!$this->newStatus){
            $this->newStatus = new Hrd_Models_Master_StatusInformation();
        }
        return $this->newStatus;
    }

    public function setNewStatus(Hrd_Models_Master_StatusInformation $newStatus) {
        $this->newStatus = $newStatus;
    }

    public function getOldStatus() {
        if(!$this->oldStatus){
            $this->oldStatus = new Hrd_Models_Master_StatusInformation();
        }
        return $this->oldStatus;
    }

    public function setOldStatus(Hrd_Models_Master_StatusInformation $oldStatus) {
        $this->oldStatus = $oldStatus;
    }

    public function getApproved() {
        return $this->approved;
    }

    public function setApproved($approved) {
        $this->approved = $approved;
    }

    public function getSkNumber() {
        return $this->skNumber;
    }

    public function setSkNumber($skNumber) {
        $this->skNumber = $skNumber;
    }

    public function getEffectiveDate() {
        return $this->effectiveDate;
    }

    public function setEffectiveDate($effectiveDate) {
        $this->effectiveDate = $this->ignoredd($effectiveDate);
    }
    
    public function getNewEmployeeStatus() {
        if(!$this->newEmployeeStatus){
            $this->newEmployeeStatus = new Hrd_Models_Master_Status();
        }
        return $this->newEmployeeStatus;
    }

    public function setNewEmployeeStatus(Hrd_Models_Master_Status $newEmployeeStatus) {
        $this->newEmployeeStatus = $newEmployeeStatus;
    }

    public function getOldEmplyoeeStatus() {
        if(!$this->oldEmplyoeeStatus){
            $this->oldEmplyoeeStatus = new Hrd_Models_Master_Status();
        }
        return $this->oldEmplyoeeStatus;
    }

    public function setOldEmplyoeeStatus(Hrd_Models_Master_Status $oldEmplyoeeStatus) {
        $this->oldEmplyoeeStatus = $oldEmplyoeeStatus;
    }

    // add by wulan sari 03122020
    public function getIs_applied() {
        return $this->is_applied;
    }

    public function setIs_applied($is_applied) {
        $this->is_applied = $is_applied;
    }
    public function getNotes() {
        return $this->notes;
    }

    public function setNotes($notes) {
        $this->notes = $notes;
    }
    // end add by wulan sari 03122020

    public function getMasaKerjaStartDate() {
        return $this->masaKerjaStartDate;
    }

    public function setMasaKerjaStartDate($masaKerjaStartDate) {
        $this->masaKerjaStartDate = $masaKerjaStartDate;
    }

    public function getUsiaKerjaStartDate() {
        return $this->usiaKerjaStartDate;
    }

    public function setUsiaKerjaStartDate($usiaKerjaStartDate) {
        $this->usiaKerjaStartDate = $usiaKerjaStartDate;
    }

    public function getIsKompensasi() {
        return $this->isKompensasi;
    }

    public function setIsKompensasi($isKompensasi) {
        $this->isKompensasi = $isKompensasi;
    }
    
    public function getIsPensiun() {
        return $this->isPensiun;
    }

    public function setIsPensiun($isPensiun) {
        $this->isPensiun = $isPensiun;
    }
    
    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getEmployee(),$this->getNewStatus(),$this->getOldStatus(),$this->getNewEmployeeStatus(),$this->getOldEmplyoeeStatus());
    }
    
    protected function getDatefields() {
        return array("effective_date");
    }



}

?>
