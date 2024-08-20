<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of AktaPPJB
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Legal_AktaPPJB extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Kouti_Remora{
    private $unit;
    private $notarisId;
    private $purchaseletter;
    private $number;
    private $name;
    private $address;
    private $date;
    private $ktp;
    private $npwp;
    private $firstInstallmentDate;
    private $pelunasanDate;
    private $duration;
    private $signDate;
    private $handOverDate;
    private $serahTerimaPlanDate;
    private $serahTerimaPlanMonth;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "appjb_";
    }
    
    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['aktappjb_id'])){
           $this->setId($x['aktappjb_id']); 
        }
        if(isset ($x['unit_unit_id'])){
           $this->getUnit()->setId($x['unit_unit_id']); 
        }
        if(isset ($x['notaris_id'])){
           $this->setNotarisId($x['notaris_id']); 
        }
        if(isset ($x['purchaseletter_purchaseletter_id'])){
           $this->getPurchaseletter()->setId($x['purchaseletter_purchaseletter_id']); 
        }
        if(isset ($x['aktappjb_no'])){
           $this->setNumber($x['aktappjb_no']); 
        }
        if(isset ($x['aktappjb_name'])){
           $this->setName($x['aktappjb_name']); 
        }if(isset ($x['aktappjb_address'])){
           $this->setAddress($x['aktappjb_address']); 
        }
        if(isset ($x['aktappjb_date'])){
           $this->setDate($x['aktappjb_date']); 
        }if(isset ($x['aktappjb_ktp'])){
           $this->setKtp($x['aktappjb_ktp']); 
        }if(isset ($x['aktappjb_npwp'])){
           $this->setNpwp($x['aktappjb_npwp']); 
        }
        if(isset ($x['firstinstallment_date'])){
           $this->setFirstInstallmentDate($x['firstinstallment_date']); 
        }
        if(isset ($x['pelunasan_date'])){
           $this->setPelunasanDate($x['pelunasan_date']); 
        }
        if(isset ($x['duration'])){
           $this->setDuration($x['duration']); 
        }
        if(isset ($x['sign_date'])){
           $this->setSignDate($x['sign_date']); 
        }
        if(isset ($x['handover_date'])){
           $this->setHandOverDate($x['handover_date']); 
        }
        if(isset ($x['serahterimaplan_date'])){
           $this->setSerahTerimaPlanDate($x['serahterimaplan_date']); 
        }
        if(isset ($x['serahterimaplan_month'])){
           $this->setSerahTerimaPlanMonth($x['serahterimaplan_month']); 
        }
        
        unset($x);
    }
    
    public function getArrayTable() {
        $x = array(
            'aktappjb_id'=>$this->getId(),
            'unit_unit_id'=>$this->getUnit()->getId(),
            'notaris_id'=>$this->getNotarisId(),
            'purchaseletter_purchaseletter_id'=>$this->getPurchaseletter()->getId(),
            'aktappjb_no'=>$this->getNumber(),
            'aktappjb_name'=>$this->getName(),
            'aktappjb_address'=>$this->getAddress(),
            'aktappjb_date'=>$this->getDate(),
            'aktappjb_ktp'=>$this->getKtp(),
            'aktappjb_npwp'=>$this->getNpwp(),
            'firstintallment_date'=>$this->getFirstInstallmentDate(),
            'pelunasan_date'=>$this->getPelunasanDate(),
            'duration'=>$this->getDuration(),
            'sign_date'=>$this->getSignDate(),
            'handover_date'=>$this->getHandOverDate(),
            'serahterimaplan_date'=>$this->getSerahTerimaPlanDate(),
            'serahterimaplan_month'=>$this->getSerahTerimaPlanMonth()
        );
        
        return $x;
    }
    
    protected function getDatefields() {
        return array("aktappjb_date","firstintallment_date","pelunasan_date","sign_date",
                "handover_date","serahterimaplan_date");
    }
    
    
    public function getUnit() {
        if(!$this->unit){
            $this->unit = new Erems_Models_Unit_Unit();
        }
        return $this->unit;
    }

    public function getNotarisId() {
        return $this->notarisId;
    }

    public function getPurchaseletter() {
        if(!$this->purchaseletter){
            $this->purchaseletter = new Erems_Models_Purchaseletter_PurchaseLetterTransaction();
        }
        return $this->purchaseletter;
    }

    public function getNumber() {
        return $this->number;
    }

    public function getName() {
        return $this->name;
    }

    public function getAddress() {
        return $this->address;
    }

    public function getDate() {
        return $this->date;
    }

    public function getKtp() {
        return $this->ktp;
    }

    public function getNpwp() {
        return $this->npwp;
    }

    public function getFirstInstallmentDate() {
        return $this->firstInstallmentDate;
    }

    public function getPelunasanDate() {
        return $this->pelunasanDate;
    }

    public function getDuration() {
        return $this->duration;
    }

    public function getSignDate() {
        return $this->signDate;
    }

    public function getHandOverDate() {
        return $this->handOverDate;
    }

    public function getSerahTerimaPlanDate() {
        return $this->serahTerimaPlanDate;
    }

    public function getSerahTerimaPlanMonth() {
        return $this->serahTerimaPlanMonth;
    }

    public function setUnit(Erems_Models_Unit_Unit $unit) {
        $this->unit = $unit;
    }

    public function setNotarisId($notarisId) {
        $this->notarisId = $notarisId;
    }

    public function setPurchaseletter(Erems_Models_Purchaseletter_PurchaseLetterTransaction $purchaseletter) {
        $this->purchaseletter = $purchaseletter;
    }

    public function setNumber($number) {
        $this->number = $number;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function setAddress($address) {
        $this->address = $address;
    }

    public function setDate($date) {
        $this->date = $date;
    }

    public function setKtp($ktp) {
        $this->ktp = $ktp;
    }

    public function setNpwp($npwp) {
        $this->npwp = $npwp;
    }

    public function setFirstInstallmentDate($firstInstallmentDate) {
        $this->firstInstallmentDate = $firstInstallmentDate;
    }

    public function setPelunasanDate($pelunasanDate) {
        $this->pelunasanDate = $pelunasanDate;
    }

    public function setDuration($duration) {
        $this->duration = $duration;
    }

    public function setSignDate($signDate) {
        $this->signDate = $signDate;
    }

    public function setHandOverDate($handOverDate) {
        $this->handOverDate = $handOverDate;
    }

    public function setSerahTerimaPlanDate($serahTerimaPlanDate) {
        $this->serahTerimaPlanDate = $serahTerimaPlanDate;
    }

    public function setSerahTerimaPlanMonth($serahTerimaPlanMonth) {
        $this->serahTerimaPlanMonth = $serahTerimaPlanMonth;
    }

        
    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }
    
    


}
