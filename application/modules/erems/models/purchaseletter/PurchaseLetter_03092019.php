<?php

/**
 * Description of PurchaseLetter
 *
 * @author MIS
 */
class Erems_Models_Purchaseletter_PurchaseLetter extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Kouti_Remora{
    
    private $nomor;
    private $date;
    private $customerId;
    private $unitId;
    private $salesmanId;
    private $schedule;
    private $unit;
    private $customer;
    private $remainingBalance;
    private $totalPayment;
    private $apiAci;
    private $downlineId;
    private $keteranganBayar;
    private $keterangan1;
    private $keterangan2;
    private $keterangan3;
    private $houseAdvisor;
    private $manager;
    private $hsKeuangan;
    private $promo;
    public $persenBayar;
    public $totalBayar;
    public $unitProgress;
    public $lastProgressDate;
    public $rencanaBAST;
    
    
    public function __construct($embedPrefix=NULL) {
        parent::__construct();
     //   $this->embedPrefix = 'purchaseletter_';
         $this->embedPrefix = $embedPrefix==NULL?'purchaseletter_':$embedPrefix;
        $this->unit = new Erems_Models_Unit_UnitTran();
        $this->customer = new Erems_Models_Master_CustomerProfile();
    }
    
    public function getNomor() {
        return $this->nomor;
    }
    
    public function getAci() {
        return $this->apiAci;
    }

    public function setNomor($nomor) {
        $this->nomor = $nomor;
    }

    public function getDate() {
        return $this->date;
    }

    public function setDate($date) {
        $this->date = $date;
    }

    public function getCustomerId() {
        return $this->customerId;
    }

    public function setCustomerId($customerId) {
        $this->customerId = $customerId;
    }

    public function getUnitId() {
        return $this->unitId;
    }

    public function setUnitId($unitId) {
        $this->unitId = $unitId;
    }
    
    public function getSalesmanId() {
        return $this->salesmanId;
    }

    public function setSalesmanId($salesmanId) {
        $this->salesmanId = $salesmanId;
    }
    
    

    
    
    public function getSchedule() {
        return $this->schedule;
    }

    public function setSchedule($schedule) {
        $this->schedule = $schedule;
    }
    
    public function getUnit() {
        return $this->unit;
    }

    public function setUnit(Erems_Models_Unit_UnitTran $unit) {
        $this->unit = $unit;
    }

    public function getCustomer() {
        if(!$this->customer){
            $this->customer = new Erems_Models_Master_CustomerProfile();
        }
        return $this->customer;
    }

    public function setCustomer(Erems_Models_Master_CustomerProfile $customer) {
        $this->customer = $customer;
    }
    
    public function getRemainingBalance() {
        return $this->remainingBalance;
    }

    public function setRemainingBalance($remainingBalance) {
        $this->remainingBalance = $remainingBalance;
    }

    public function getTotalPayment() {
        return (double)$this->totalPayment;
    }

    public function setTotalPayment($totalPayment) {
        $this->totalPayment = (double)$totalPayment;
    }
    
    function getDownlineId() {
        return $this->downlineId;
    }

    function getKeteranganBayar() {
        return $this->keteranganBayar;
    }

    function getKeterangan1() {
        return $this->keterangan1;
    }

    function getKeterangan2() {
        return $this->keterangan2;
    }

    function getKeterangan3() {
        return $this->keterangan3;
    }

    function getHouseAdvisor() {
        return $this->houseAdvisor;
    }

    function getManager() {
        return $this->manager;
    }

    function getHsKeuangan() {
        return $this->hsKeuangan;
    }

    function setDownlineId($downlineId) {
        $this->downlineId = $downlineId;
    }

    function setKeteranganBayar($keteranganBayar) {
        $this->keteranganBayar = $keteranganBayar;
    }

    function setKeterangan1($keterangan1) {
        $this->keterangan1 = $keterangan1;
    }

    function setKeterangan2($keterangan2) {
        $this->keterangan2 = $keterangan2;
    }

    function setKeterangan3($keterangan3) {
        $this->keterangan3 = $keterangan3;
    }

    function setHouseAdvisor($houseAdvisor) {
        $this->houseAdvisor = $houseAdvisor;
    }

    function setManager($manager) {
        $this->manager = $manager;
    }

    function setHsKeuangan($hsKeuangan) {
        $this->hsKeuangan = $hsKeuangan;
    }

    function getPromo() {
        return $this->promo;
    }

    function setPromo($promo) {
        $this->promo = $promo;
    }
    
    

        
        
     public function setArrayTable($dataArray=NULL) {
       // $x = $dataArray;
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        if(isset ($x['purchaseletter_id'])){
          $this->setId($x['purchaseletter_id']);
        }
        if(isset ($x['purchaseletter_no'])){
          $this->setNomor($x['purchaseletter_no']);
        }
        if(isset ($x['purchase_date'])){
          $this->setDate($x['purchase_date']);
        }
        if(isset ($x['unit_id'])){
          $this->setUnitId($x['unit_id']);
        }
        if(isset ($x['customer_id'])){
          $this->setCustomerId($x['customer_id']);
        }
        if(isset ($x['salesman_id'])){
          $this->setSalesmanId($x['salesman_id']);
        }
        if(isset ($x['total_payment'])){
          $this->setTotalPayment($x['total_payment']);
        }
        if(isset ($x['remaining_balance'])){
          $this->setRemainingBalance($x['remaining_balance']);
        }
        if(isset ($x['downline_id'])){
          $this->setDownlineId($x['downline_id']);
        }
        if(isset ($x['keterangan_bayar'])){
          $this->setKeteranganBayar($x['keterangan_bayar']);
        }
        if(isset ($x['keterangan_1'])){
          $this->setKeterangan1($x['keterangan_1']);
        }
        if(isset ($x['keterangan_2'])){
          $this->setKeterangan2($x['keterangan_2']);
        }
        if(isset ($x['keterangan_3'])){
          $this->setKeterangan3($x['keterangan_3']);
        }
        if(isset ($x['house_advisor'])){
          $this->setHouseAdvisor($x['house_advisor']);
        }
        if(isset ($x['manager'])){
          $this->setManager($x['manager']);
        }
        if(isset ($x['hs_keuangan'])){
          $this->setHsKeuangan($x['hs_keuangan']);
        }
        if(isset ($x['Addon'])){
          $this->setAddOn($x['Addon']);
        }
        
        if(isset ($x['promo'])){
          $this->setPromo($x['promo']);
        }
        if(isset ($x['persen_bayar'])){
          $this->persenBayar = $x['persen_bayar'];
        }
         if(isset ($x['total_bayar'])){
          $this->totalBayar = $x['total_bayar'];
        }
        if(isset ($x['unit_progress'])){
          $this->unitProgress = $x['unit_progress'];
        }
        if(isset ($x['last_progress_date'])){
          $this->lastProgressDate = $x['last_progress_date'];
        }
        if(isset ($x['realisation_serahterima_date'])){
          $this->rencanaBAST = $x['realisation_serahterima_date'];
        }
        unset($x);
        
   
        
    }
    
    public function getArrayTable(){
        $x = array(
            "purchaseletter_id"=>$this->getId(),
            "purchaseletter_no"=>$this->getNomor(),
            "purchase_date"=>$this->getDate(),
            "unit_id"=>$this->getUnitId(),
            "customer_id"=>$this->getCustomerId(),
            "salesman_id"=>$this->getSalesmanId(),
            "total_payment"=>$this->getTotalPayment(),
            "remaining_balance"=>$this->getRemainingBalance(),
            "api_aci"=>$this->getAci(),
            "downline_id"=>$this->getDownlineId(),
            "keterangan_bayar"=>$this->getKeteranganBayar(),
            "keterangan_1"=>$this->getKeterangan1(),
            "keterangan_2"=>$this->getKeterangan2(),
            "keterangan_3"=>$this->getKeterangan3(),
            "house_advisor"=>$this->getHouseAdvisor(),
            "manager"=>$this->getManager(),
            "hs_keuangan"=>$this->getHsKeuangan(),
            "Addon"=>$this->getAddOn(),
            "promo"=>$this->getPromo(),
            "persen_bayar"=>$this->persenBayar,
            "total_bayar"=>$this->totalBayar,
            "unit_progress"=>$this->unitProgress,
            "last_progress_date"=>$this->lastProgressDate,
            "realisation_serahterima_date"=>$this->rencanaBAST
        );
      
        
        return $x;
    }
    
    
    protected function getDatefields() {
        return array("purchase_date","Addon","realisation_serahterima_date","last_progress_date");
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getUnit(),$this->getCustomer());
    }
    
    


    


}

?>
