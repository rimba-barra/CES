<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of AfterSales
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Aftersales_AfterSales extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Kouti_Remora{
    private $unit;
    private $serahTerimaDate;
    private $phoneNo;
    private $receiveStatus;
    private $hunianStatus;
    private $datangDate;
    private $pinjamPakaiDate;
    private $pinjamPakaiStatus;
    private $guaranteeTypeSipilId;
    private $guaranteeTypeBocorId;
    private $garansiBocorDate;
    private $garansiSipilDate;
    private $note;
    private $serahTerima1Date;
    private $serahTerima2Date;
    private $checkList1Date;
    private $checkList2Date;
    private $recheck1Date;
    private $recheck2Date;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "aftersales_";
    }
    
    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['aftersales_id'])){
           $this->setId($x['aftersales_id']); 
        }
        if(isset ($x['unit_unit_id'])){
           $this->getUnit()->setId($x['unit_unit_id']); 
        }
        if(isset ($x['serahterima_date'])){
           $this->setSerahTerimaDate($x['serahterima_date']); 
        }
        if(isset ($x['phone_no'])){
           $this->setPhoneNo($x['phone_no']); 
        }
        if(isset ($x['receive_status'])){
           $this->setReceiveStatus($x['receive_status']); 
        }
        if(isset ($x['hunian_status'])){
           $this->setHunianStatus($x['hunian_status']); 
        }
        if(isset ($x['datang_date'])){
           $this->setDatangDate($x['datang_date']); 
        }
        if(isset ($x['pinjampakai_date'])){
           $this->setPinjamPakaiDate($x['pinjampakai_date']); 
        }
        if(isset ($x['pinjampakai_status'])){
           $this->setPinjamPakaiStatus($x['pinjampakai_status']); 
        }
        if(isset ($x['guaranteetype_sipil_id'])){
           $this->setGuaranteeTypeSipilId($x['guaranteetype_sipil_id']); 
        }
        if(isset ($x['guaranteetype_bocor_id'])){
           $this->setGuaranteeTypeBocorId($x['guaranteetype_bocor_id']); 
        }
        if(isset ($x['garansi_sipil_date'])){
           $this->setGaransiSipilDate($x['garansi_sipil_date']); 
        }
        if(isset ($x['garansi_bocor_date'])){
           $this->setGaransiBocorDate($x['garansi_bocor_date']); 
        }
        if(isset ($x['note'])){
           $this->setNote($x['note']); 
        }
        if(isset ($x['serahterima1_date'])){
           $this->setSerahTerima1Date($x['serahterima1_date']); 
        }
        if(isset ($x['serahterima2_date'])){
           $this->setSerahTerima2Date($x['serahterima2_date']); 
        }
        if(isset ($x['checklist1_date'])){
           $this->setCheckList1Date($x['checklist1_date']); 
        }
        if(isset ($x['checklist2_date'])){
           $this->setCheckList2Date($x['checklist2_date']); 
        }
        if(isset ($x['recheck1_date'])){
           $this->setRecheck1Date($x['recheck1_date']); 
        }
        if(isset ($x['recheck2_date'])){
           $this->setRecheck2Date($x['recheck2_date']); 
        }
        
        
        
       
        
        unset($x);
    }
    
    public function getArrayTable() {
        $x = array(
            'aftersales_id'=>$this->getId(),
            'unit_unit_id'=>$this->getUnit()->getId(),
            'serahterima_date'=>$this->getSerahTerimaDate(),
            'phone_no'=>$this->getPhoneNo(),
            'receive_status'=>$this->getReceiveStatus(),
            'hunian_status'=>$this->getHunianStatus(),
            'datang_date'=>$this->getDatangDate(),
            'pinjampakai_date'=>$this->getPinjamPakaiDate(),
            'pinjampakai_status'=>$this->getPinjamPakaiStatus(),
            'guaranteetype_sipil_id'=>$this->getGuaranteeTypeSipilId(),
            'guaranteetype_bocor_id'=>$this->getGuaranteeTypeBocorId(),
            'garansi_sipil_date'=>$this->getGaransiSipilDate(),
            'garansi_bocor_date'=>$this->getGaransiBocorDate(),
            'note'=>$this->getNote(),
            'serahterima1_date'=>$this->getSerahTerima1Date(),
            'serahterima2_date'=>$this->getSerahTerima2Date(),
            'checklist1_date'=>$this->getCheckList1Date(),
            'checklist2_date'=>$this->getCheckList2Date(),
            'recheck1_date'=>$this->getRecheck1Date(),
            'recheck2_date'=>$this->getRecheck2Date()
            
        );
        
        return $x;
    }
    
    
    public function getUnit() {
        if(!$this->unit){
            $this->unit = new Erems_Models_Unit_Unit();
        }
        return $this->unit;
    }

    public function getSerahTerimaDate() {
        return $this->serahTerimaDate;
    }

    public function getPhoneNo() {
        return $this->phoneNo;
    }

    public function getReceiveStatus() {
        return $this->receiveStatus;
    }

    public function getHunianStatus() {
        return $this->hunianStatus;
    }

    public function getDatangDate() {
        return $this->datangDate;
    }

    public function getPinjamPakaiDate() {
        return $this->pinjamPakaiDate;
    }

    public function getPinjamPakaiStatus() {
        return $this->pinjamPakaiStatus;
    }

    public function getGuaranteeTypeSipilId() {
        return $this->guaranteeTypeSipilId;
    }

    public function getGuaranteeTypeBocorId() {
        return $this->guaranteeTypeBocorId;
    }

    public function getGaransiBocorDate() {
        return $this->garansiBocorDate;
    }

    public function getNote() {
        return $this->note;
    }

    public function getSerahTerima1Date() {
        return $this->serahTerima1Date;
    }

    public function getSerahTerima2Date() {
        return $this->serahTerima2Date;
    }

    public function getCheckList1Date() {
        return $this->checkList1Date;
    }

    public function getCheckList2Date() {
        return $this->checkList2Date;
    }

    public function getRecheck1Date() {
        return $this->recheck1Date;
    }

    public function getRecheck2Date() {
        return $this->recheck2Date;
    }

    public function setUnit(Erems_Models_Unit_Unit $unit) {
        $this->unit = $unit;
    }

    public function setSerahTerimaDate($serahTerimaDate) {
        $this->serahTerimaDate = $serahTerimaDate;
    }

    public function setPhoneNo($phoneNo) {
        $this->phoneNo = $phoneNo;
    }

    public function setReceiveStatus($receiveStatus) {
        $this->receiveStatus = $receiveStatus;
    }

    public function setHunianStatus($hunianStatus) {
        $this->hunianStatus = $hunianStatus;
    }

    public function setDatangDate($datangDate) {
        $this->datangDate = $datangDate;
    }

    public function setPinjamPakaiDate($pinjamPakaiDate) {
        $this->pinjamPakaiDate = $pinjamPakaiDate;
    }

    public function setPinjamPakaiStatus($pinjamPakaiStatus) {
        $this->pinjamPakaiStatus = $pinjamPakaiStatus;
    }

    public function setGuaranteeTypeSipilId($guaranteeTypeSipilId) {
        $this->guaranteeTypeSipilId = $guaranteeTypeSipilId;
    }

    public function setGuaranteeTypeBocorId($guaranteeTypeBocorId) {
        $this->guaranteeTypeBocorId = $guaranteeTypeBocorId;
    }

    public function setGaransiBocorDate($garansiBocorDate) {
        $this->garansiBocorDate = $garansiBocorDate;
    }

    public function setNote($note) {
        $this->note = $note;
    }

    public function setSerahTerima1Date($serahTerima1Date) {
        $this->serahTerima1Date = $serahTerima1Date;
    }

    public function setSerahTerima2Date($serahTerima2Date) {
        $this->serahTerima2Date = $serahTerima2Date;
    }

    public function setCheckList1Date($checkList1Date) {
        $this->checkList1Date = $checkList1Date;
    }

    public function setCheckList2Date($checkList2Date) {
        $this->checkList2Date = $checkList2Date;
    }

    public function setRecheck1Date($recheck1Date) {
        $this->recheck1Date = $recheck1Date;
    }

    public function setRecheck2Date($recheck2Date) {
        $this->recheck2Date = $recheck2Date;
    }
    
    public function getGaransiSipilDate() {
        return $this->garansiSipilDate;
    }

    public function setGaransiSipilDate($garansiSipilDate) {
        $this->garansiSipilDate = $garansiSipilDate;
    }

    
        
    
    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }
    
    protected function getDatefields() {
        return array("serahterima_date","datang_date","garansi_sipil_date",
            "garansi_bocor_date","serahterima1_date",
            "serahterima2_date","checklist1_date",
            "pinjampakai_date",
            "checklist2_date","recheck1_date","recheck2_date");
    }


}
