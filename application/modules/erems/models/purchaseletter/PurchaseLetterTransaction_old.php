<?php
/**
 * Description of PurchaseLetterTransaction
 *
 * @author MIS
 */
class Erems_Models_Purchaseletter_PurchaseLetterTransaction extends Erems_Models_Purchaseletter_PurchaseLetter implements Erems_Box_Delien_DelimiterCandidate {
    /*instanceof Erems_Models_Sales_PriceAdmin*/
    private $priceAdmin;
    private $total;
    private $remainingBalance;
    private $salesman;
    private $priceType;
    private $price;
    private $billing;
    private $DCResult;
    private $scheduleList;
    private $clubCitra;
    private $memberName;
    private $salesLocation;
    private $mediaPromotion;
    private $bankKPR;
    private $rencanaSerahTerima;
    private $rencanaSerahTerimaDate;
    private $collector;
    private $notes;
    private $kpp;
    private $akadRealisationDate;
    private $upline;
    private $isUplineReferall;
    private $cac;
    private $isCacReferall;
    public $tempNomor; /// untuk menyimpan nomor inputan dari user
    private $totalPayment;
    private $persenPayment;
    private $totalAjb;
    private $totalHgb;
    private $isCancel;
    
    

    
    public function __construct($params=NULL) {
        parent::__construct($params);
        $this->priceAdmin = new Erems_Models_Sales_PriceAdmin();
        $this->salesman = new Erems_Models_Sales_Salesman();
        $this->priceType = new Erems_Models_Sales_PriceType();
        $this->price = new Erems_Models_Sales_Price();
        $this->billing = new Erems_Models_Sales_BillingRulesTran();
        $this->scheduleList = array();
    }
    
    public function getTotal() {
        return doubleval($this->total);
    }

    public function setTotal($total) {
        $this->total = (double)$total;
    }
    
    public function getRemainingBalance() {
        return $this->remainingBalance;
    }

    public function setRemainingBalance($remainingBalance) {
        $this->remainingBalance = (double)$remainingBalance;
    }

        
    public function getPriceAdmin() {
        return $this->priceAdmin;
    }

    public function setPriceAdmin(Erems_Models_Sales_PriceAdmin $priceAdmin) {
        $this->priceAdmin = $priceAdmin;
    }
    
    public function getSalesman() {
        return $this->salesman;
    }

    public function setSalesman(Erems_Models_Sales_Salesman $salesman) {
        $this->salesman = $salesman;
    }

    public function getPriceType() {
        if(!$this->priceType){
            $this->priceType = new Erems_Models_Sales_PriceType();
        }
        return $this->priceType;
    }

    public function setPriceType(Erems_Models_Sales_PriceType $priceType) {
        $this->priceType = $priceType;
    }
    
    public function getPrice() {
        return $this->price;
    }

    public function setPrice(Erems_Models_Sales_Price $price) {
        $this->price = $price;
    }

    public function getBilling() {
        return $this->billing;
    }

    public function setBilling(Erems_Models_Sales_BillingRulesTran $billing) {
        $this->billing = $billing;
    }
    
    public function addSchedule(Erems_Models_Purchaseletter_Schedule $schedule){
        $this->scheduleList[] = $schedule;
    }
    
    public function getClubCitra() {
        if(!$this->clubCitra){
            $this->clubCitra = new Erems_Models_Master_CitraClub();
        }
        return $this->clubCitra;
    }

    public function setClubCitra(Erems_Models_Master_CitraClub $clubCitra) {
        $this->clubCitra = $clubCitra;
    }

    public function getMemberName() {
        return $this->memberName;
    }

    public function setMemberName($memberName) {
        $this->memberName = $memberName;
    }

    public function getSalesLocation() {
         if(!$this->salesLocation){
            $this->salesLocation = new Erems_Models_Master_SalesLocation();
        }
        return $this->salesLocation;
    }

    public function setSalesLocation(Erems_Models_Master_SalesLocation $salesLocation) {
        $this->salesLocation = $salesLocation;
    }

    public function getMediaPromotion() {
        if(!$this->mediaPromotion){
            $this->mediaPromotion = new Erems_Models_Master_MediaPromotion();
        }
        return $this->mediaPromotion;
    }

    public function setMediaPromotion(Erems_Models_Master_MediaPromotion $mediaPromotion) {
        $this->mediaPromotion = $mediaPromotion;
    }

    public function getBankKPR() {
         if(!$this->bankKPR){
            $this->bankKPR = new Erems_Models_Master_Bank();
        }
        return $this->bankKPR;
    }

    public function setBankKPR(Erems_Models_Master_Bank $bankKPR) {
        $this->bankKPR = $bankKPR;
    }

    public function getRencanaSerahTerima() {
        return $this->rencanaSerahTerima;
    }

    public function setRencanaSerahTerima($rencanaSerahTerima) {
        $this->rencanaSerahTerima = $rencanaSerahTerima;
    }

    public function getRencanaSerahTerimaDate() {
        return $this->rencanaSerahTerimaDate;
    }

    public function setRencanaSerahTerimaDate($rencanaSerahTerimaDate) {
        $this->rencanaSerahTerimaDate = $rencanaSerahTerimaDate;
    }

    public function getCollector() {
          if(!$this->collector){
            $this->collector = new Erems_Models_Sales_Collector();
        }
        return $this->collector;
    }

    public function setCollector(Erems_Models_Sales_Collector $collector) {
        $this->collector = $collector;
    }

    public function getNotes() {
        return $this->notes;
    }

    public function setNotes($notes) {
        $this->notes = $notes;
    }
    
    
    public function getKpp() {
        return $this->kpp;
    }

    public function setKpp($kpp) {
        $this->kpp = $kpp;
    }

      
    public function getAkadRealisationDate() {
        return $this->akadRealisationDate;
    }

    public function setAkadRealisationDate($akadRealisationDate) {
        $this->akadRealisationDate = $akadRealisationDate;
    }
    
    public function getUpline() {
        if(!$this->upline){
            $upline = new Erems_Models_Hrd_Employee();
            $upline->setJabatanCode(Erems_Box_Config::POSITION_CODE_UPLINE);
            $this->upline = $upline;
        }
        return $this->upline;
    }

    public function getIsUplineReferall() {
        return $this->isUplineReferall;
    }

    public function getCac() {
        if(!$this->cac){
            $this->cac = new Erems_Models_Master_CAC();
        }
        return $this->cac;
    }

    public function getIsCacReferall() {
        return $this->isCacReferall;
    }

    public function setUpline(Erems_Models_Hrd_Employee $upline) {
        $this->upline = $upline;
    }

    public function setIsUplineReferall($isUplineReferall) {
        $this->isUplineReferall = $isUplineReferall;
    }

    public function setCac(Erems_Models_Master_CAC $cac) {
        $this->cac = $cac;
    }

    public function setIsCacReferall($isCacReferall) {
        $this->isCacReferall = $isCacReferall;
    }
    
    public function getTotalPayment() {
        return $this->totalPayment;
    }

    public function getPersenPayment() {
        return $this->persenPayment;
    }

    public function setTotalPayment($totalPayment) {
        $this->totalPayment = $totalPayment;
    }

    public function setPersenPayment($persenPayment) {
        $this->persenPayment = $persenPayment;
    }
    
    public function getTotalAjb() {
        return $this->totalAjb;
    }

    public function getTotalHgb() {
        return $this->totalHgb;
    }

    public function setTotalAjb($totalAjb) {
        $this->totalAjb = $totalAjb;
    }

    public function setTotalHgb($totalHgb) {
        $this->totalHgb = $totalHgb;
    }
    
    public function getIsCancel() {
        return $this->isCancel;
    }

    public function setIsCancel($isCancel) {
        $this->isCancel = $isCancel;
    }

    
    
    
    
        
    
                
    

    public function setArrayTable($dataArray = NULL) {
        parent::setArrayTable($dataArray);
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if($this->priceAdmin instanceof Erems_Models_Sales_PriceAdmin){
            $this->priceAdmin->setArrayTable($x);
        }
        if(isset ($x['harga_total_jual'])){
          $this->setTotal($x['harga_total_jual']);
        }
        if(isset ($x['remaining_balance'])){
          $this->setRemainingBalance($x['remaining_balance']);
        }
        if(isset ($x['pricetype_id'])){
          $this->getPriceType()->setId($x['pricetype_id']);
        }
        if(isset ($x['clubcitra_member'])){
          $this->setMemberName($x['clubcitra_member']);
        }
        if(isset ($x['rencana_serahterima'])){
          $this->setRencanaSerahTerima($x['rencana_serahterima']);
        }
        if(isset ($x['rencana_serahterima_date'])){
          $this->setRencanaSerahTerimaDate($x['rencana_serahterima_date']);
        }
        if(isset ($x['notes'])){
          $this->setNotes($x['notes']);
        }
        if(isset ($x['kpp'])){
          $this->setKpp($x['kpp']);
        }
        if(isset ($x['akad_realisasiondate'])){
          $this->setAkadRealisationDate($x['akad_realisasiondate']);
        }
        if(isset ($x['upline_upline_id'])){
          $this->getUpline()->setId($x['upline_upline_id']);
        }
        if(isset ($x['is_upline_referall'])){
          $this->setIsUplineReferall($x['is_upline_referall']);
        }
        if(isset ($x['cac_cac_id'])){
          $this->getCac()->setId($x['cac_cac_id']);
        }
        if(isset ($x['is_cac_referall'])){
          $this->setIsCacReferall($x['is_cac_referall']);
        }
        if(isset ($x['total_payment'])){
          $this->setTotalPayment($x['total_payment']);
        }
        if(isset ($x['persen_payment'])){
          $this->setPersenPayment($x['persen_payment']);
        }
        
        if(isset ($x['total_ajb'])){
          $this->setTotalAjb($x['total_ajb']);
        }
        
        if(isset ($x['total_hgb'])){
          $this->setTotalHgb($x['total_hgb']);
        }
        
        if(isset ($x['is_cancel'])){
          $this->setIsCancel($x['is_cancel']);
        }
        
        unset($x);
    }
    
    public function getArrayTable() {
        $x = parent::getArrayTable();
        
        if($this->priceAdmin instanceof Erems_Models_Sales_PriceAdmin){
            $y = $this->priceAdmin->getArrayTable();
            $x = array_merge($x,$y);
        }
        $z = array(
            "harga_total_jual"=>$this->getTotal(),
            "remaining_balance"=>$this->getRemainingBalance(),
            "pricetype_id"=>$this->getPriceType()->getId(),
            "clubcitra_member"=>$this->getMemberName(),
            "rencana_serahterima"=>$this->getRencanaSerahTerima(),
            "rencana_serahterima_date"=>$this->getRencanaSerahTerimaDate(),
            "notes"=>$this->getNotes(),
            "kpp"=>$this->getKpp(),
            "akad_realisasiondate"=>$this->getAkadRealisationDate(),
            "upline_upline_id"=>$this->getUpline()->getId(),
            "is_upline_referall"=>$this->getIsUplineReferall(),
            "cac_cac_id"=>$this->getCac()->getId(),
            "is_cac_referall"=>$this->getIsCacReferall(),
            "total_payment"=>$this->getTotalPayment(),
            "persen_payment"=>$this->getPersenPayment(),
            "total_ajb"=>$this->getTotalAjb(),
            "total_hgb"=>$this->getTotalHgb(),
            "is_cancel"=>$this->getIsCancel()
        );
        $x = array_merge($x,$z);
        return $x;
    }
    
    public function grouped() {
        $x = parent::grouped();
        return array_merge($x,array($this->getSalesman(),$this->getPrice(),$this->getBilling(),$this->getClubCitra(),
            $this->getSalesLocation(),$this->getMediaPromotion(),$this->getCollector(),
            $this->getBankKPR()));
    }

    public function getDCArray() {
        return $this->scheduleList;
    }

    public function getDCResult() {
         return $this->DCResult;
    }

    public function setDCArray($delimiteredArray) {
        $this->DCResult = $delimiteredArray;
    }
    
    protected function getDatefields() {
        
        return array("rencana_serahterima_date","purchase_date","akad_realisasiondate");
    }


}

?>
