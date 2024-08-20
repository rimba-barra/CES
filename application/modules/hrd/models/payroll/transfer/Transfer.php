<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Transfer
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Payroll_Transfer_Transfer extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,Box_Models_Master_InterProjectPt,Box_Delien_DelimiterCandidate,Box_Models_App_Hermes_HasDetail  {
    private $project;
    private $pt;
    private $month;
    private $year;
    private $batch;
    private $monthYear;
    private $komponenGaji;
    private $total;
    private $totalValue;
    private $detail;
    private $DCResult;
    private $no; // field untuk matchmaking di proses import excel
    private $isRoundUp;
    
    public function __construct() {
        parent::__construct();
        $this->detail = array();
        $this->embedPrefix = "transfer_";
    }
    
    
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['transfer_id'])){
           $this->setId($x['transfer_id']); 
        }
        if(isset ($x['month'])){
           $this->setMonth($x['month']); 
        }
        if(isset ($x['year'])){
           $this->setYear($x['year']); 
        }
        if(isset ($x['batch'])){
           $this->setBatch($x['batch']); 
        }
        if(isset ($x['monthyear'])){
           $this->setMonthYear($x['monthyear']); 
        }
        if(isset ($x['komponengaji_komponengaji_id'])){
           $this->getKomponenGaji()->setId($x['komponengaji_komponengaji_id']); 
        }
        if(isset ($x['total'])){
           $this->setTotal($x['total']); 
        }
        if(isset ($x['total_value'])){
           $this->setTotalValue($x['total_value']); 
        }
        
        
       
        
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'transfer_id'=>$this->getId(),
            'month'=>$this->getMonth(),
            'year'=>$this->getYear(),
            'batch'=>$this->getBatch(),
            'monthyear'=>$this->getMonthYear(),
            'komponengaji_komponengaji_id'=>$this->getKomponenGaji()->getId(),
            'total'=>$this->getTotal(),
            'total_value'=>$this->getTotalValue()
            
            
           
        );
      
        return $x;
    }
    
    public function getMonth() {
        return (int)$this->month;
    }

    public function getYear() {
        return (int)$this->year;
    }

    public function getBatch() {
        return (int)$this->batch;
    }

    public function getMonthYear() {
        return $this->monthYear;
    }

    public function getKomponenGaji() {
        if(!$this->komponenGaji){
            $this->komponenGaji = new Hrd_Models_Payroll_Komponen_Komponen();
        }
        return $this->komponenGaji;
    }

    public function getTotal() {
        return (int)$this->total;
    }

    public function getTotalValue() {
        return (double)$this->totalValue;
    }

    public function setMonth($month) {
        $this->month = (int)$month;
    }

    public function setYear($year) {
        $this->year = (int)$year;
    }

    public function setBatch($batch) {
        $this->batch = (int)$batch;
    }

    public function setMonthYear($monthYear) {
        $this->monthYear = $monthYear;
    }

    public function setKomponenGaji(Hrd_Models_Payroll_Komponen_Komponen $komponenGaji) {
        $this->komponenGaji = $komponenGaji;
    }

    public function setTotal($total) {
        $this->total = (int)$total;
    }

    public function setTotalValue($totalValue) {
        $this->totalValue = (double)$totalValue;
    }
    
    public function getNo() {
        return $this->no;
    }

    public function setNo($no) {
        $this->no = $no;
    }
    
    
    public function getIsRoundUp() {
        return $this->isRoundUp;
    }

    public function setIsRoundUp($isRoundUp) {
       
        $this->isRoundUp = $isRoundUp;
    }

            
    public function addDetail(Hrd_Models_Payroll_Transfer_TransferDetail $detail){
        $this->detail[] = $detail;
    }

    
    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function getProject() {
        if(!$this->project){
            $this->project = new Box_Models_Master_Project();
        }
        return $this->project;
    }

    public function getPt() {
        if(!$this->pt){
            $this->pt = new Box_Models_Master_Project();
        }
        return $this->pt;
    }

    public function grouped() {
        return array($this->getKomponenGaji());
    }

    public function setProject(\Box_Models_Master_Project $project) {
        $this->project = $project;
        
    }

    public function setPt(\Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

    public function addDetailObject($detailObject) {
        $this->addDetail($detailObject);
    }

    public function getDCArray() {
        return $this->detail;
    }

    public function getDCResult() {
        return $this->DCResult;
    }

    public function setDCArray($delimiteredArray) {
        $this->DCResult = $delimiteredArray;
    }

    public function getDetailObject() {
        return new Hrd_Models_Payroll_Transfer_TransferDetail();
    }

    public function getIndexArName() {
        return "detail"; 
    }

    

}
