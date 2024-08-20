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
    private $apiAci;
    private $last_duedate;
    private $biayaAsuransi;
    private $lastDueDateAge;
    private $lastDueDateAgeWeek;
    private $firstPurchaseDate;
    private $rewardSales;
    private $rewardCustomer;
    private $rewardTambahan;
    private $hppTanahTanahMentah;
    private $hppTanahDevCost;
    private $hppTanahSkalaKota;
    private $hppTanahBunga;
    private $hppTanahBangunanaPermeter;
    private $hppTanahSkalaEco;
    private $rescheduleIdAktif; // reschedule id yang belum di approve
    private $changePriceAktif; // change price id yang belum di approve
    private $realRemainingBalance;
    private $totalTagihan;
    private $purposeBuy;
    private $hargaPembulatan;
    //edited by Rizal 28 Feb 2019
    private $isAutoSms;
    private $isNotAllowedSendSP;
    //end
    
    public function __construct($params=NULL) {
        parent::__construct($params);
        $this->priceAdmin = new Erems_Models_Sales_PriceAdmin();
        $this->salesman = new Erems_Models_Sales_Salesman();
        $this->priceType = new Erems_Models_Sales_PriceType();
        $this->price = new Erems_Models_Sales_Price();
        $this->billing = new Erems_Models_Sales_BillingRulesTran();
        $this->purposeBuy = new Erems_Models_Master_PurposeBuy();
        $this->scheduleList = array();
    }
    
    public function getTotal() {
        return doubleval($this->total);
    }
    
    public function getApi() {
        return $this->apiAci;
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

    function getLast_duedate() {
        return $this->last_duedate;
    }

    function setLast_duedate($last_duedate) {
        $this->last_duedate = $last_duedate;
    }

        
    function getBiayaAsuransi() {
        return $this->biayaAsuransi;
    }

    function setBiayaAsuransi($biayaAsuransi) {
        $this->biayaAsuransi = $biayaAsuransi;
    }

        
    function getFirstPurchaseDate() {
        return $this->firstPurchaseDate;
    }

    function setFirstPurchaseDate($firstPurchaseDate) {
        $this->firstPurchaseDate = $firstPurchaseDate;
    }
    
    function getRewardSales() {
        if(!$this->rewardSales){
            $this->rewardSales = new Erems_Models_Reward_Reward("rewardsales_");
        } 
        return $this->rewardSales;
    }

    function getRewardCustomer() {
        if(!$this->rewardCustomer){
            $this->rewardCustomer = new Erems_Models_Reward_Reward("rewardcustomer_");
        } 
        return $this->rewardCustomer;
    }

    function getRewardTambahan() {
        if(!$this->rewardTambahan){
            $this->rewardTambahan = new Erems_Models_Reward_Reward("rewardtambahan_");
        } 
        return $this->rewardTambahan;
    }

    function setRewardSales($rewardSales) {
        $this->rewardSales = $rewardSales;
    }

    function setRewardCustomer($rewardCustomer) {
        $this->rewardCustomer = $rewardCustomer;
    }

    function setRewardTambahan($rewardTambahan) {
        $this->rewardTambahan = $rewardTambahan;
    }

    function getHppTanahTanahMentah() {
        return $this->hppTanahTanahMentah;
    }

    function getHppTanahDevCost() {
        return $this->hppTanahDevCost;
    }

    function getHppTanahSkalaKota() {
        return $this->hppTanahSkalaKota;
    }

    function getHppTanahBunga() {
        return $this->hppTanahBunga;
    }

    function getHppTanahBangunanaPermeter() {
        return $this->hppTanahBangunanaPermeter;
    }

    function setHppTanahTanahMentah($hppTanahTanahMentah) {
        $this->hppTanahTanahMentah = $hppTanahTanahMentah;
    }

    function setHppTanahDevCost($hppTanahDevCost) {
        $this->hppTanahDevCost = $hppTanahDevCost;
    }

    function setHppTanahSkalaKota($hppTanahSkalaKota) {
        $this->hppTanahSkalaKota = $hppTanahSkalaKota;
    }

    function setHppTanahBunga($hppTanahBunga) {
        $this->hppTanahBunga = $hppTanahBunga;
    }

    function setHppTanahBangunanaPermeter($hppTanahBangunanaPermeter) {
        $this->hppTanahBangunanaPermeter = $hppTanahBangunanaPermeter;
    }
    
    function getHppTanahSkalaEco() {
        return $this->hppTanahSkalaEco;
    }

    function setHppTanahSkalaEco($hppTanahSkalaEco) {
        $this->hppTanahSkalaEco = $hppTanahSkalaEco;
    }
    
    function getRescheduleIdAktif() {
        return $this->rescheduleIdAktif;
    }

    function setRescheduleIdAktif($rescheduleIdAktif) {
        $this->rescheduleIdAktif = $rescheduleIdAktif;
    }
    
    function getChangePriceAktif() {
        return $this->changePriceAktif;
    }

    function setChangePriceAktif($changePriceAktif) {
        $this->changePriceAktif = $changePriceAktif;
    }

    
    function getRealRemainingBalance() {
        return $this->realRemainingBalance;
    }

    function setRealRemainingBalance($realRemainingBalance) {
        $this->realRemainingBalance = $realRemainingBalance;
    }
    
    function getTotalTagihan() {
        return $this->totalTagihan;
    }

    function setTotalTagihan($totalTagihan) {
        $this->totalTagihan = $totalTagihan;
    }
    
    function getPurposeBuy() {
        if(!$this->purposeBuy){
            $this->purposeBuy = new Erems_Models_Master_PurposeBuy();
        }
        return $this->purposeBuy;
    }

    function setPurposeBuy(Erems_Models_Master_PurposeBuy $purposeBuy) {
        $this->purposeBuy = $purposeBuy;
    }

    function getHargaPembulatan() {
        return $this->hargaPembulatan;
    }

    function setHargaPembulatan($hargaPembulatan) {
        $this->hargaPembulatan = $hargaPembulatan;
    }

    
    
        
        
    //edited by Rizal 28 Feb 2019
    function getIsAutoSms() {
        return $this->isAutoSms;
    }

    function getIsNotAllowedSendSP() {
        return $this->isNotAllowedSendSP;
    }

    function setIsAutoSms($isAutoSms) {
        $this->isAutoSms = $isAutoSms;
    }

    function setIsNotAllowedSendSP($isNotAllowedSendSP) {
        $this->isNotAllowedSendSP = $isNotAllowedSendSP;
    }

    //endedited
    
                
    

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
        
        if(isset ($x['api_aci'])){
          $this->apiAci = $x['api_aci'];
        }
        
        if(isset ($x['last_duedate'])){
          $this->setLast_duedate($x['last_duedate']);
        }
        if(isset ($x['biaya_asuransi'])){
          $this->setBiayaAsuransi($x['biaya_asuransi']);
        }

        //for popupakadkredit
        if(isset ($x['last_duedate_age'])){
          $this->setLastDueDateAge($x['last_duedate_age']);
        }
        if(isset ($x['last_duedate_age_week'])){
          $this->setLastDueDateAgeWeek($x['last_duedate_age_week']);
        }
        if(isset ($x['firstpurchase_date'])){
          $this->setFirstPurchaseDate($x['firstpurchase_date']);
        }
        if(isset ($x['rewardsales_reward_id'])){
          $this->getRewardSales()->setId($x['rewardsales_reward_id']);
        }
        if(isset ($x['rewardcustomer_reward_id'])){
          $this->getRewardCustomer()->setId($x['rewardcustomer_reward_id']);
        }
        if(isset ($x['rewardtambahan_reward_id'])){
          $this->getRewardTambahan()->setId($x['rewardtambahan_reward_id']);
        }
         if(isset ($x['hpptanahtanah_mentah'])){
          $this->setHppTanahTanahMentah($x['hpptanahtanah_mentah']);
        }
         if(isset ($x['hpptanah_devcost'])){
          $this->setHppTanahDevCost($x['hpptanah_devcost']);
        }
         if(isset ($x['hpptanah_skalakota'])){
          $this->setHppTanahSkalaKota($x['hpptanah_skalakota']);
        }
         if(isset ($x['hpptanah_bunga'])){
          $this->setHppTanahBunga($x['hpptanah_bunga']);
        }
          if(isset ($x['hpptanah_bangunanpermeter'])){
          $this->setHppTanahBangunanaPermeter($x['hpptanah_bangunanpermeter']);
        }
        if(isset ($x['hpptanah_skalaeco'])){
          $this->setHppTanahSkalaEco($x['hpptanah_skalaeco']);
        }
        if(isset ($x['rescheduleid_aktif'])){
          $this->setRescheduleIdAktif($x['rescheduleid_aktif']);
        }
        if(isset ($x['changeprice_aktif'])){
          $this->setChangePriceAktif($x['changeprice_aktif']);
        }
        if(isset ($x['real_remaining_balance'])){
          $this->setRealRemainingBalance($x['real_remaining_balance']);
        }
        if(isset ($x['total_tagihan'])){
          $this->setTotalTagihan($x['total_tagihan']);
        }
        if(isset ($x['Addon'])){
          $this->setAddOn($x['Addon']);
        }
        if(isset ($x['purposebuy_purposebuy_id'])){
          $this->getPurposeBuy()->setId($x['purposebuy_purposebuy_id']);
        }
        
        if(isset ($x['harga_pembulatan'])){
          $this->setHargaPembulatan($x['harga_pembulatan']);
        }
        
        //edited by Rizal 28 Feb 2019
        if(isset ($x['is_auto_sms'])){
          $this->setIsAutoSms($x['is_auto_sms']);
        }
        if(isset ($x['is_not_allowed_sp'])){
          $this->setIsNotAllowedSendSP($x['is_not_allowed_sp']);
        }
        //endedited
        
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
            "is_cancel"=>$this->getIsCancel(),
            "api_aci"=> $this->getApi(),
            "last_duedate"=> $this->getLast_duedate(),
            "biaya_asuransi"=>$this->getBiayaAsuransi(),
            'last_duedate_age' => $this->getLastDueDateAge(),
            'last_duedate_age_week' => $this->getLastDueDateAgeWeek(),
            'firstpurchase_date'=>$this->getFirstPurchaseDate(),
            'rewardsales_reward_id'=>$this->getRewardSales()->getId(),
            'rewardcustomer_reward_id'=>$this->getRewardCustomer()->getId(),
            'rewardtambahan_reward_id'=>$this->getRewardTambahan()->getId(),
            'hpptanahtanah_mentah'=>$this->getHppTanahTanahMentah(),
            'hpptanah_devcost'=>$this->getHppTanahDevCost(),
            'hpptanah_skalakota'=>$this->getHppTanahSkalaKota(),
            'hpptanah_bunga'=>$this->getHppTanahBunga(),
            'hpptanah_bangunanpermeter'=>$this->getHppTanahBangunanaPermeter(),
            'hpptanah_skalaeco'=>$this->getHppTanahSkalaEco(),
            'rescheduleid_aktif'=>$this->getRescheduleIdAktif(),
            'changeprice_aktif'=>$this->getChangePriceAktif(),
            'real_remaining_balance'=>$this->getRealRemainingBalance(),
            'total_tagihan'=>$this->getTotalTagihan(),
            'Addon'=>$this->getAddOn(),
            'purposebuy_purposebuy_id'=>$this->getPurposeBuy()->getId(),
            "harga_pembulatan"=>$this->getHargaPembulatan(),
            //edited by Rizal 28 Feb 2019
            "is_auto_sms"=>$this->getIsAutoSms(),
            "is_not_allowed_sp"=>$this->getIsNotAllowedSendSP()
             //endedited
        );
        $x = array_merge($x,$z);
        return $x;
    }
    
    public function grouped() {
        $x = parent::grouped();
        return array_merge($x,array($this->getSalesman(),$this->getPrice(),$this->getBilling(),$this->getClubCitra(),
            $this->getSalesLocation(),$this->getMediaPromotion(),$this->getCollector(),
            $this->getBankKPR(),$this->getRewardSales(),$this->getRewardCustomer(),$this->getRewardTambahan()));
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
        
        return array("rencana_serahterima_date","purchase_date","akad_realisasiondate","last_duedate");
    }


    /**
     * @return mixed
     */
    public function getLastDueDate()
    {
        return $this->lastDueDate;
    }

    /**
     * @param mixed $lastDueDate
     *
     * @return self
     */
    public function setLastDueDate($lastDueDate)
    {
        $this->lastDueDate = $lastDueDate;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getLastDueDateAge()
    {
        return $this->lastDueDateAge;
    }

    /**
     * @param mixed $lastDueDateAge
     *
     * @return self
     */
    public function setLastDueDateAge($lastDueDateAge)
    {
        $this->lastDueDateAge = $lastDueDateAge;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getLastDueDateAgeWeek()
    {
        return $this->lastDueDateAgeWeek;
    }

    /**
     * @param mixed $lastDueDateAgeWeek
     *
     * @return self
     */
    public function setLastDueDateAgeWeek($lastDueDateAgeWeek)
    {
        $this->lastDueDateAgeWeek = $lastDueDateAgeWeek;

        return $this;
    }
    

}

?>
