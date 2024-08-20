<?php

/**
 * Description of SPPJB
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Legal_SPPJB extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Kouti_Remora{
    private $unit;
    private $parameterSPPJBId;
    private $purchaseletter;
    private $number;
    private $ktp;
    private $npwp;
    private $name;
    private $address;
    private $date;
    private $atasnama;
    private $suratKuasaDate;
    private $serahTerimaDate;
    private $tandaTanganDate;
    private $serahTerimaPlanDate;
    private $serahTerimaPlanMonth;
    private $electricity;
    
     public function __construct() {
        parent::__construct();
        $this->embedPrefix = "sppjb_";
    }
    
    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['sppjb_id'])){
           $this->setId($x['sppjb_id']); 
        }
        if(isset ($x['unit_unit_id'])){
           $this->getUnit()->setId($x['unit_unit_id']); 
        }
        if(isset ($x['parametersppjb_id'])){
           $this->setParameterSPPJBId($x['parametersppjb_id']); 
        }
        if(isset ($x['purchaseletter_purchaseletter_id'])){
           $this->getPurchaseletter()->setId($x['purchaseletter_purchaseletter_id']); 
        }
        if(isset ($x['sppjb_no'])){
           $this->setNumber($x['sppjb_no']); 
        }
        if(isset ($x['sppjb_ktp'])){
           $this->setKtp($x['sppjb_ktp']); 
        }
        if(isset ($x['sppjb_npwp'])){
           $this->setNpwp($x['sppjb_npwp']); 
        }
        if(isset ($x['sppjb_name'])){
           $this->setName($x['sppjb_name']); 
        }
        if(isset ($x['sppjb_address'])){
           $this->setAddress($x['sppjb_address']); 
        }
        if(isset ($x['sppjb_date'])){
           $this->setDate($x['sppjb_date']); 
        }
        if(isset ($x['atasnama'])){
           $this->setAtasnama($x['atasnama']); 
        }
        if(isset ($x['suratkuasa_date'])){
           $this->setSuratKuasaDate($x['suratkuasa_date']); 
        }
        if(isset ($x['serahterima_date'])){
           $this->setSerahTerimaDate($x['serahterima_date']); 
        }
        if(isset ($x['tandatangan_date'])){
           $this->setTandaTanganDate($x['tandatangan_date']); 
        }
        if(isset ($x['serahterimaplan_date'])){
           $this->setSerahTerimaPlanDate($x['serahterimaplan_date']); 
        }
        if(isset ($x['serahterimaplan_month'])){
           $this->setSerahTerimaPlanMonth($x['serahterimaplan_month']); 
        }
        if(isset ($x['electricity'])){
           $this->setElectricity($x['electricity']); 
        }
        
        
       
        
        unset($x);
    }
    
    public function getArrayTable() {
        $x = array(
            'sppjb_id'=>$this->getId(),
            'unit_unit_id'=>$this->getUnit()->getId(),
            'parametersppjb_id'=>$this->getParameterSPPJBId(),
            'purchaseletter_purchaseletter_id'=>$this->getPurchaseletter()->getId(),
            'sppjb_no'=>$this->getNumber(),
            'sppjb_ktp'=>$this->getKtp(),
            'sppjb_npwp'=>$this->getNpwp(),
            'sppjb_name'=>$this->getName(),
            'sppjb_address'=>$this->getAddress(),
            'sppjb_date'=>$this->getDate(),
            'atasnama'=>$this->getAtasnama(),
            'suratkuasa_date'=>$this->getSuratKuasaDate(),
            'serahterima_date'=>$this->getSerahTerimaDate(),
            'tandatangan_date'=>$this->getTandaTanganDate(),
            'serahterimaplan_date'=>$this->getSerahTerimaPlanDate(),
            'serahterimaplan_month'=>$this->getSerahTerimaPlanMonth(),
            'electricity'=>$this->getElectricity()
            
            
            
            
        );
        
        return $x;
    }
    
    protected function getDatefields() {
        return array("sppjb_date","serahterima_date","tandatangan_date","serahterimaplan_date");
    }

    
    public function getUnit() {
        if(!$this->unit){
            $this->unit = new Erems_Models_Unit_Unit();
        }
        return $this->unit;
    }

    public function getParameterSPPJBId() {
        return $this->parameterSPPJBId;
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

    public function getKtp() {
        return $this->ktp;
    }

    public function getNpwp() {
        return $this->npwp;
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

    public function getAtasnama() {
        return $this->atasnama;
    }

    public function getSuratKuasaDate() {
        return $this->suratKuasaDate;
    }

    public function getSerahTerimaDate() {
        return $this->serahTerimaDate;
    }

    public function getTandaTanganDate() {
        return $this->tandaTanganDate;
    }

    public function getSerahTerimaPlanDate() {
        return $this->serahTerimaPlanDate;
    }

    public function getSerahTerimaPlanMonth() {
        return $this->serahTerimaPlanMonth;
    }

    public function getElectricity() {
        return $this->electricity;
    }

    public function setUnit(Erems_Models_Unit_Unit $unit) {
        $this->unit = $unit;
    }

    public function setParameterSPPJBId($parameterSPPJBId) {
        $this->parameterSPPJBId = $parameterSPPJBId;
    }

    public function setPurchaseletter(Erems_Models_Purchaseletter_PurchaseLetterTransaction $purchaseletter) {
        $this->purchaseletter = $purchaseletter;
    }

    public function setNumber($number) {
        $this->number = $number;
    }

    public function setKtp($ktp) {
        $this->ktp = $ktp;
    }

    public function setNpwp($npwp) {
        $this->npwp = $npwp;
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

    public function setAtasnama($atasnama) {
        $this->atasnama = $atasnama;
    }

    public function setSuratKuasaDate($suratKuasaDate) {
        $this->suratKuasaDate = $suratKuasaDate;
    }

    public function setSerahTerimaDate($serahTerimaDate) {
        $this->serahTerimaDate = $serahTerimaDate;
    }

    public function setTandaTanganDate($tandaTanganDate) {
        $this->tandaTanganDate = $tandaTanganDate;
    }

    public function setSerahTerimaPlanDate($serahTerimaPlanDate) {
        $this->serahTerimaPlanDate = $serahTerimaPlanDate;
    }

    public function setSerahTerimaPlanMonth($serahTerimaPlanMonth) {
        $this->serahTerimaPlanMonth = $serahTerimaPlanMonth;
    }

    public function setElectricity($electricity) {
        $this->electricity = $electricity;
    }

        
    
    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }

}
