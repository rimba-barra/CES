<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of StatusInformation
 *
 * @author MIS
 */
class Hrd_Models_Master_StatusInformation extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora {
    private $hireDate;
    private $assignationDate;
    private $contractStart;
    private $contractEnd;
    private $consultantStart;
    private $consultantEnd;
    private $temporaryStart;
    private $temporaryEnd;
    private $contractKe;
    private $consultantKe;
    private $temporaryKe;

    private $usiaKerjaStartDate;
    private $masaKerjaStartDate;
    private $isKompensasi;

    private $isPensiun;
    
    public function __construct($prefix=NULL) {
        parent::__construct();
        $this->embedPrefix = $prefix?$prefix:"statusinformation_";
    }
    
    public function setArrayTable($dataArray=NULL) {
   
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
  
        if(isset ($x['statusinformation_id'])){
           $this->setId($x['statusinformation_id']); 
        }
        if(isset ($x['hire_date'])){
           $this->setHireDate($x['hire_date']); 
        }
        if(isset ($x['assignation_date'])){
           $this->setAssignationDate($x['assignation_date']); 
        }
        if(isset ($x['contract_start'])){
           $this->setContractStart($x['contract_start']); 
        }
        if(isset ($x['contract_end'])){
           $this->setContractEnd($x['contract_end']); 
        }
        if(isset ($x['consultant_start'])){
           $this->setConsultantStart($x['consultant_start']); 
        }
        if(isset ($x['consultant_end'])){
           $this->setConsultantEnd($x['consultant_end']); 
        }
        if(isset ($x['temporary_start'])){
           $this->setTemporaryStart($x['temporary_start']); 
        }
        if(isset ($x['temporary_end'])){
           $this->setTemporaryEnd($x['temporary_end']); 
        }
        if(isset ($x['contract_ke'])){
           $this->setContractKe($x['contract_ke']); 
        }
        if(isset ($x['consultant_ke'])){
           $this->setConsultantKe($x['consultant_ke']); 
        }
        if(isset ($x['temporary_ke'])){
           $this->setTemporaryKe($x['temporary_ke']); 
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
    
    public function getArrayTable(){
      
        $x = array(
            "statusinformation_id"=>$this->getId(),
            "hire_date"=>$this->getHireDate(),
            "assignation_date"=>$this->getAssignationDate(),
            "contract_start"=>$this->getContractStart(),
            "contract_end"=>$this->getContractEnd(),
            "consultant_start"=>$this->getConsultantStart(),
            "consultant_end"=>$this->getConsultantEnd(),
            "temporary_start"=>$this->getTemporaryStart(),
            "temporary_end"=>$this->getTemporaryEnd(),
            "contract_ke"=>$this->getContractKe(),
            "consultant_ke"=>$this->getConsultantKe(),
            "temporary_ke"=>$this->getTemporaryKe(),

            "masa_kerja_start_date"=>$this->getMasaKerjaStartDate(),
            "usia_kerja_start_date"=>$this->getUsiaKerjaStartDate(),
            "is_kompensasi"=>$this->getIsKompensasi(),

            "is_pensiun"=>$this->getIsPensiun()
        );
      
        return $x;
    }
    
    public function getHireDate() {
        return $this->hireDate;
    }

    public function setHireDate($hireDate) {
        $this->hireDate = $this->ignoredd($hireDate);
    }

    public function getAssignationDate() {
        return $this->assignationDate;
    }

    public function setAssignationDate($assignationDate) {
        
        $this->assignationDate = $this->ignoredd($assignationDate);
    }

    public function getContractStart() {
        return $this->contractStart;
    }

    public function setContractStart($contractStart) {
        $this->contractStart = $this->ignoredd($contractStart);
     
    }

    public function getContractEnd() {
        return $this->contractEnd;
    }

    public function setContractEnd($contractEnd) {
        $this->contractEnd = $this->ignoredd($contractEnd);
    }

    public function getConsultantStart() {
        return $this->consultantStart;
    }

    public function setConsultantStart($consultantStart) {
        $this->consultantStart = $this->ignoredd($consultantStart);
     
    }

    public function getConsultantEnd() {
        return $this->consultantEnd;
    }

    public function setConsultantEnd($consultantEnd) {
        $this->consultantEnd = $this->ignoredd($consultantEnd);
    }

    public function getTemporaryStart() {
        return $this->temporaryStart;
    }

    public function setTemporaryStart($temporaryStart) {
        $this->temporaryStart = $this->ignoredd($temporaryStart);
        
    }

    public function getTemporaryEnd() {
        return $this->temporaryEnd;
    }

    public function setTemporaryEnd($temporaryEnd) {
        $this->temporaryEnd = $this->ignoredd($temporaryEnd);
    }
    
    public function getContractKe() {
        return $this->contractKe;
    }

    public function setContractKe($contractKe) {
        $this->contractKe = (int)$contractKe;
    }

    public function getConsultantKe() {
        return $this->consultantKe;
    }

    public function setConsultantKe($consultantKe) {
        $this->consultantKe = (int)$consultantKe;
    }
    
    public function getTemporaryKe() {
        return $this->temporaryKe;
    }

    public function setTemporaryKe($temporaryKe) {
        $this->temporaryKe = $temporaryKe;
    }

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
        return array();
    }


}

?>
