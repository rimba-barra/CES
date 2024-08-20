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
	private $salesgroup;
	private $bankKPR;
	private $rencanaSerahTerima;
	private $rencanaSerahTerimaDate;
	private $realisationSerahTerimaDate;
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
	private $isAutoSms;
	private $isNotAllowedSendSP;
	private $isRepeatOrder;
	private $customerName;
	private $is_draft;
	private $spProcessDate;
	private $spKe;
	private $moreCustomer;
	private $isNonppn;
	private $nomor_im;
	private $cluster;
	private $price_source;
	private $price_source_name;
	private $pricelist_id;
	private $pricelist_keterangan;
	private $pricelistdetail_id;
	private $pricelistdetail_koefisien_id;
	private $pricelist_name;
	private $isVida;
	private $isCiputraFest40;
	private $is_extend_schedule;
	private $detailreward;
	private $internalmemo_id;
	private $is_ppn;
	private $pengakuan_penjualan_date;
	private $more_customers;
	private $is_holdteknik;
	private $notes_holdteknik;
	private $isBlokir;
	private $alasan_blokir;
	private $isDiscKaryawan;
	private $jenisBiaya;
	private $porsiKepemilikancustomer;
	private $tanggalSuratkepemilikanbersama;
	private $kuasaName;
	private $kuasaNpwp;
	private $kuasaNik;
	private $kuasaAlamat;

	public function __construct($params=NULL) {
		parent::__construct($params);
		$this->priceAdmin   = new Erems_Models_Sales_PriceAdmin();
		$this->salesman     = new Erems_Models_Sales_Salesman();
		$this->priceType    = new Erems_Models_Sales_PriceType();
		$this->price        = new Erems_Models_Sales_Price();
		$this->billing      = new Erems_Models_Sales_BillingRulesTran();
		$this->purposeBuy   = new Erems_Models_Master_PurposeBuy();
		$this->salesgroup   = new Erems_Models_Master_Salesgroup();
		$this->scheduleList = array();
	}
	
	public function getApi() { return $this->apiAci; }
	public function addSchedule(Erems_Models_Purchaseletter_Schedule $schedule){ $this->scheduleList[] = $schedule; }

	function getSpProcessDate() { return $this->spProcessDate; }
	function setSpProcessDate($spProcessDate) { $this->spProcessDate = $spProcessDate; }
	function getSpKe() { return $this->spKe; }
	function setSpKe($spKe) { $this->spKe = $spKe; }
	public function getTotal() { return doubleval($this->total); }
	public function setTotal($total) { $this->total = (double)$total; }
	public function getRemainingBalance() { return $this->remainingBalance; }
	public function setRemainingBalance($remainingBalance) { $this->remainingBalance = (double)$remainingBalance; }
	public function getPriceAdmin() { return $this->priceAdmin; }
	public function setPriceAdmin(Erems_Models_Sales_PriceAdmin $priceAdmin) { $this->priceAdmin = $priceAdmin; }
	public function getSalesman() { return $this->salesman; }
	public function setSalesman(Erems_Models_Sales_Salesman $salesman) { $this->salesman = $salesman; }
	public function getPriceType() {
		if(!$this->priceType){
			$this->priceType = new Erems_Models_Sales_PriceType();
		}
		return $this->priceType;
	}
	public function setPriceType(Erems_Models_Sales_PriceType $priceType) { $this->priceType = $priceType; }
	public function getPrice() { return $this->price; }
	public function setPrice(Erems_Models_Sales_Price $price) { $this->price = $price; }
	public function getBilling() { return $this->billing; }
	public function setBilling(Erems_Models_Sales_BillingRulesTran $billing) { $this->billing = $billing; }
	public function getClubCitra() {
		if(!$this->clubCitra){
			$this->clubCitra = new Erems_Models_Master_CitraClub();
		}
		return $this->clubCitra;
	}
	public function setClubCitra(Erems_Models_Master_CitraClub $clubCitra) { $this->clubCitra = $clubCitra; }
	public function getMemberName() { return $this->memberName; }
	public function setMemberName($memberName) { $this->memberName = $memberName; }
	public function getSalesLocation() {
		 if(!$this->salesLocation){
			$this->salesLocation = new Erems_Models_Master_SalesLocation();
		}
		return $this->salesLocation;
	}
	public function setSalesLocation(Erems_Models_Master_SalesLocation $salesLocation) { $this->salesLocation = $salesLocation; }
	public function getMediaPromotion() {
		if(!$this->mediaPromotion){
			$this->mediaPromotion = new Erems_Models_Master_MediaPromotion();
		}
		return $this->mediaPromotion;
	}
	public function setMediaPromotion(Erems_Models_Master_MediaPromotion $mediaPromotion) { $this->mediaPromotion = $mediaPromotion; }
	public function getSalesgroup() {
		if(!$this->salesgroup){
			$this->salesgroup = new Erems_Models_Master_Salesgroup();
		}
		return $this->salesgroup;
	}
	public function setSalesgroup(Erems_Models_Master_Salesgroup $salesgroup) { $this->salesgroup = $salesgroup; }
	public function getBankKPR() {
		 if(!$this->bankKPR){
			$this->bankKPR = new Erems_Models_Master_Bank();
		}
		return $this->bankKPR;
	}
	public function setBankKPR(Erems_Models_Master_Bank $bankKPR) { $this->bankKPR = $bankKPR; }
	public function getRencanaSerahTerima() { return $this->rencanaSerahTerima; }
	public function setRencanaSerahTerima($rencanaSerahTerima) { $this->rencanaSerahTerima = $rencanaSerahTerima; }
	public function getRencanaSerahTerimaDate() { return $this->rencanaSerahTerimaDate; }
	public function setRencanaSerahTerimaDate($rencanaSerahTerimaDate) { $this->rencanaSerahTerimaDate = $rencanaSerahTerimaDate; }
	public function getRealisationSerahTerimaDate() { return $this->realisationSerahTerimaDate; }
	public function setRealisationSerahTerimaDate($realisationSerahTerimaDate) { $this->realisationSerahTerimaDate = $realisationSerahTerimaDate; }
	public function getCollector() {
		  if(!$this->collector){
			$this->collector = new Erems_Models_Sales_Collector();
		}
		return $this->collector;
	}
	public function setCollector(Erems_Models_Sales_Collector $collector) { $this->collector = $collector; }
	public function getNotes() { return $this->notes; }
	public function setNotes($notes) { $this->notes = $notes; }
	public function getKpp() { return $this->kpp; }
	public function setKpp($kpp) { $this->kpp = $kpp; }
	public function getAkadRealisationDate() { return $this->akadRealisationDate; }
	public function setAkadRealisationDate($akadRealisationDate) { $this->akadRealisationDate = $akadRealisationDate; }
	public function setUpline(Erems_Models_Hrd_Employee $upline) { $this->upline = $upline; }
	public function getUpline() {
		if(!$this->upline){
			$upline = new Erems_Models_Hrd_Employee();
			$upline->setJabatanCode(Erems_Box_Config::POSITION_CODE_UPLINE);
			$this->upline = $upline;
		}
		return $this->upline;
	}
	public function getIsUplineReferall() { return $this->isUplineReferall; }
	public function setIsUplineReferall($isUplineReferall) { $this->isUplineReferall = $isUplineReferall; }
	public function setCac(Erems_Models_Master_CAC $cac) { $this->cac = $cac; }
	public function getCac() {
		if(!$this->cac){
			$this->cac = new Erems_Models_Master_CAC();
		}
		return $this->cac;
	}
	public function getIsCacReferall() { return $this->isCacReferall; }
	public function setIsCacReferall($isCacReferall) { $this->isCacReferall = $isCacReferall; }
	public function getTotalPayment() { return $this->totalPayment; }
	public function setTotalPayment($totalPayment) { $this->totalPayment = $totalPayment; }
	public function getPersenPayment() { return $this->persenPayment; }
	public function setPersenPayment($persenPayment) { $this->persenPayment = $persenPayment; }
	public function getTotalAjb() { return $this->totalAjb; }
	public function setTotalHgb($totalHgb) { $this->totalHgb = $totalHgb; }
	public function getTotalHgb() { return $this->totalHgb; }
	public function setTotalAjb($totalAjb) { $this->totalAjb = $totalAjb; }
	public function getIsCancel() { return $this->isCancel; }
	public function setIsCancel($isCancel) { $this->isCancel = $isCancel; }
	function getLast_duedate() { return $this->last_duedate; }
	function setLast_duedate($last_duedate) { $this->last_duedate = $last_duedate; }
	function getBiayaAsuransi() { return $this->biayaAsuransi; }
	function setBiayaAsuransi($biayaAsuransi) { $this->biayaAsuransi = $biayaAsuransi; }
	function getFirstPurchaseDate() { return $this->firstPurchaseDate; }
	function setFirstPurchaseDate($firstPurchaseDate) { $this->firstPurchaseDate = $firstPurchaseDate; }
	function setRewardSales($rewardSales) { $this->rewardSales = $rewardSales; }
	function getRewardSales() {
		if(!$this->rewardSales){
			$this->rewardSales = new Erems_Models_Reward_Reward("rewardsales_");
		} 
		return $this->rewardSales;
	}
	function setRewardCustomer($rewardCustomer) { $this->rewardCustomer = $rewardCustomer; }
	function getRewardCustomer() {
		if(!$this->rewardCustomer){
			$this->rewardCustomer = new Erems_Models_Reward_Reward("rewardcustomer_");
		} 
		return $this->rewardCustomer;
	}
	function setRewardTambahan($rewardTambahan) { $this->rewardTambahan = $rewardTambahan; }
	function getRewardTambahan() {
		if(!$this->rewardTambahan){
			$this->rewardTambahan = new Erems_Models_Reward_Reward("rewardtambahan_");
		} 
		return $this->rewardTambahan;
	}
	function getHppTanahTanahMentah() { return $this->hppTanahTanahMentah; }
	function setHppTanahTanahMentah($hppTanahTanahMentah) { $this->hppTanahTanahMentah = $hppTanahTanahMentah; }
	function getHppTanahDevCost() { return $this->hppTanahDevCost; }
	function setHppTanahDevCost($hppTanahDevCost) { $this->hppTanahDevCost = $hppTanahDevCost; }
	function getHppTanahSkalaKota() { return $this->hppTanahSkalaKota; }
	function setHppTanahSkalaKota($hppTanahSkalaKota) { $this->hppTanahSkalaKota = $hppTanahSkalaKota; }
	function getHppTanahBunga() { return $this->hppTanahBunga; }
	function setHppTanahBunga($hppTanahBunga) { $this->hppTanahBunga = $hppTanahBunga; }
	function getHppTanahBangunanaPermeter() { return $this->hppTanahBangunanaPermeter; }
	function setHppTanahBangunanaPermeter($hppTanahBangunanaPermeter) { $this->hppTanahBangunanaPermeter = $hppTanahBangunanaPermeter; }
	function getHppTanahSkalaEco() { return $this->hppTanahSkalaEco; }
	function setHppTanahSkalaEco($hppTanahSkalaEco) { $this->hppTanahSkalaEco = $hppTanahSkalaEco; }
	function getRescheduleIdAktif() { return $this->rescheduleIdAktif; }
	function setRescheduleIdAktif($rescheduleIdAktif) { $this->rescheduleIdAktif = $rescheduleIdAktif; }
	function getChangePriceAktif() { return $this->changePriceAktif; }
	function setChangePriceAktif($changePriceAktif) { $this->changePriceAktif = $changePriceAktif; }
	function getRealRemainingBalance() { return $this->realRemainingBalance; }
	function setRealRemainingBalance($realRemainingBalance) { $this->realRemainingBalance = $realRemainingBalance; }
	function getTotalTagihan() { return $this->totalTagihan; }
	function setTotalTagihan($totalTagihan) { $this->totalTagihan = $totalTagihan; }
	function getPurposeBuy() {
		if(!$this->purposeBuy){
			$this->purposeBuy = new Erems_Models_Master_PurposeBuy();
		}
		return $this->purposeBuy;
	}
	function setPurposeBuy(Erems_Models_Master_PurposeBuy $purposeBuy) { $this->purposeBuy = $purposeBuy; }
	function getHargaPembulatan() { return $this->hargaPembulatan;}
	function setHargaPembulatan($hargaPembulatan) { $this->hargaPembulatan = $hargaPembulatan; }
	function getIsAutoSms() { return $this->isAutoSms; }
	function setIsAutoSms($isAutoSms) { $this->isAutoSms = $isAutoSms; }
	function getIsNotAllowedSendSP() { return $this->isNotAllowedSendSP; }
	function setIsNotAllowedSendSP($isNotAllowedSendSP) { $this->isNotAllowedSendSP = $isNotAllowedSendSP; }
	public function getIsRepeatOrder() { return $this->isRepeatOrder; }
	public function setIsRepeatOrder($isRepeatOrder) { $this->isRepeatOrder = $isRepeatOrder; }
	public function getCustomerName() { return $this->customerName; }
	public function setCustomerName($customerName) { $this->customerName = $customerName; }
	public function getIsDraft() { return $this->is_draft; }
	public function setIsDraft($is_draft) { $this->is_draft = $is_draft; }
	public function getIsNonppn() { return $this->isNonppn; }
	public function setIsNonppn($isNonppn) { $this->isNonppn = $isNonppn; }
	public function getNomorIm() { return $this->nomor_im; }
	public function setNomorIm($nomor_im) { $this->nomor_im = $nomor_im; }
	public function getIsVida() { return $this->isVida; }
	public function setIsVida($isVida) { $this->isVida = $isVida; }
	public function getIsBlokir() { return $this->isBlokir; }
	public function setIsBlokir($isBlokir) { $this->isBlokir = $isBlokir; }
	public function getIsDiscKaryawan() { return $this->isDiscKaryawan; }
	public function setIsDiscKaryawan($isDiscKaryawan) { $this->isDiscKaryawan = $isDiscKaryawan; }
	public function getIsCiputraFest40() { return $this->isCiputraFest40; }
	public function setIsCiputraFest40($isCiputraFest40) { $this->isCiputraFest40 = $isCiputraFest40; }
	public function getIsHoldTeknik() { return $this->is_holdteknik; }
	public function setIsHoldTeknik($is_holdteknik) { $this->is_holdteknik = $is_holdteknik; }
	public function getNotesHoldTeknik() { return $this->notes_holdteknik; }
	public function setNotesHoldTeknik($notes_holdteknik) { $this->notes_holdteknik = $notes_holdteknik; }
	public function getAlasanBlokir() { return $this->alasan_blokir; }
	public function setAlasanBlokir($alasan_blokir) { $this->alasan_blokir = $alasan_blokir; }
	public function getPricesource() { return $this->price_source; }
	public function setPricesource($price_source) { $this->price_source = (int)$price_source; }
	public function getPricesource_name() { return $this->price_source_name; }
	public function setPricesource_name($price_source) { $this->price_source_name = (int)$price_source == 2 ? 'Pricelist' : 'Marketing Stock'; }
	public function getPricelistid() { return $this->pricelist_id; }
	public function setPricelistid($pricelist_id) { $this->pricelist_id = (int)$pricelist_id; }
	public function getPricelistketerangan() { return $this->pricelist_keterangan; }
	public function setPricelistketerangan($pricelist_keterangan) { $this->pricelist_keterangan = $pricelist_keterangan; }
	public function getPricelistdetailid() { return $this->pricelistdetail_id; }
	public function setPricelistdetailid($pricelistdetail_id) { $this->pricelistdetail_id = (int)$pricelistdetail_id; }
	public function getPricelistdetailkoefisienid() { return $this->pricelistdetail_koefisien_id; }
	public function setPricelistdetailkoefisienid($pricelistdetail_koefisien_id) { $this->pricelistdetail_koefisien_id = (int)$pricelistdetail_koefisien_id; }
	public function getPricelistname() { return $this->pricelist_name; }
	public function setPricelistname($pricelist_name) { $this->pricelist_name = $pricelist_name; }
	public function getIs_ppn() { return $this->is_ppn; }
	public function setIs_ppn($is_ppn) { $this->is_ppn = $is_ppn; }
	public function getPengakuan_penjualan_date() { return $this->pengakuan_penjualan_date; }
	public function setPengakuan_penjualan_date($pengakuan_penjualan_date) { $this->pengakuan_penjualan_date = $pengakuan_penjualan_date; }
	public function getMoreCustomers() { return $this->more_customers; }
	public function setMoreCustomers($more_customers) { $this->more_customers = $more_customers; }
	public function getInternalMemoid() { return $this->internalmemo_id; }
	public function setInternalMemoid($internalmemo_id) { $this->internalmemo_id = $internalmemo_id; }
	
	public function setArrayTable($dataArray = NULL) {
		parent::setArrayTable($dataArray);
		$x = $dataArray == NULL ? $this->arrayTable : $dataArray;

		if($this->priceAdmin instanceof Erems_Models_Sales_PriceAdmin){ $this->priceAdmin->setArrayTable($x); }
		if(isset ($x['harga_total_jual'])){ $this->setTotal($x['harga_total_jual']); }
		if(isset ($x['remaining_balance'])){ $this->setRemainingBalance($x['remaining_balance']); }
		if(isset ($x['pricetype_id'])){ $this->getPriceType()->setId($x['pricetype_id']); }
		if(isset ($x['clubcitra_member'])){ $this->setMemberName($x['clubcitra_member']); }
		if(isset ($x['rencana_serahterima'])){ $this->setRencanaSerahTerima($x['rencana_serahterima']); }
		if(isset ($x['rencana_serahterima_date'])){ $this->setRencanaSerahTerimaDate($x['rencana_serahterima_date']); }
		if(isset ($x['realisation_serahterima_date'])){ $this->setRealisationSerahTerimaDate($x['realisation_serahterima_date']); }
		if(isset ($x['notes'])){ $this->setNotes($x['notes']); }
		if(isset ($x['kpp'])){ $this->setKpp($x['kpp']); }
		if(isset ($x['akad_realisasiondate'])){ $this->setAkadRealisationDate($x['akad_realisasiondate']); }
		if(isset ($x['upline_upline_id'])){ $this->getUpline()->setId($x['upline_upline_id']); }
		if(isset ($x['is_upline_referall'])){ $this->setIsUplineReferall($x['is_upline_referall']); }
		if(isset ($x['cac_cac_id'])){ $this->getCac()->setId($x['cac_cac_id']); }
		if(isset ($x['is_cac_referall'])){ $this->setIsCacReferall($x['is_cac_referall']); }
		if(isset ($x['total_payment'])){ $this->setTotalPayment($x['total_payment']); }
		if(isset ($x['persen_payment'])){ $this->setPersenPayment($x['persen_payment']); }
		if(isset ($x['total_ajb'])){ $this->setTotalAjb($x['total_ajb']); }
		if(isset ($x['total_hgb'])){ $this->setTotalHgb($x['total_hgb']); }
		if(isset ($x['is_cancel'])){ $this->setIsCancel($x['is_cancel']); }
		if(isset ($x['api_aci'])){ $this->apiAci = $x['api_aci']; }
		if(isset ($x['last_duedate'])){ $this->setLast_duedate($x['last_duedate']); }
		if(isset ($x['biaya_asuransi'])){ $this->setBiayaAsuransi($x['biaya_asuransi']); }
		if(isset ($x['last_duedate_age'])){ $this->setLastDueDateAge($x['last_duedate_age']); }
		if(isset ($x['last_duedate_age_week'])){ $this->setLastDueDateAgeWeek($x['last_duedate_age_week']); }
		if(isset ($x['firstpurchase_date'])){ $this->setFirstPurchaseDate($x['firstpurchase_date']); }
		if(isset ($x['rewardsales_reward_id'])){ $this->getRewardSales()->setId($x['rewardsales_reward_id']); }
		if(isset ($x['rewardcustomer_reward_id'])){ $this->getRewardCustomer()->setId($x['rewardcustomer_reward_id']); }
		if(isset ($x['rewardtambahan_reward_id'])){ $this->getRewardTambahan()->setId($x['rewardtambahan_reward_id']); }
		if(isset ($x['hpptanahtanah_mentah'])){ $this->setHppTanahTanahMentah($x['hpptanahtanah_mentah']); }
		if(isset ($x['hpptanah_devcost'])){ $this->setHppTanahDevCost($x['hpptanah_devcost']); }
		if(isset ($x['hpptanah_skalakota'])){ $this->setHppTanahSkalaKota($x['hpptanah_skalakota']); }
		if(isset ($x['hpptanah_bunga'])){ $this->setHppTanahBunga($x['hpptanah_bunga']); }
		if(isset ($x['hpptanah_bangunanpermeter'])){ $this->setHppTanahBangunanaPermeter($x['hpptanah_bangunanpermeter']); }
		if(isset ($x['hpptanah_skalaeco'])){ $this->setHppTanahSkalaEco($x['hpptanah_skalaeco']); }
		if(isset ($x['rescheduleid_aktif'])){ $this->setRescheduleIdAktif($x['rescheduleid_aktif']); }
		if(isset ($x['changeprice_aktif'])){ $this->setChangePriceAktif($x['changeprice_aktif']); }
		if(isset ($x['real_remaining_balance'])){ $this->setRealRemainingBalance($x['real_remaining_balance']); }
		if(isset ($x['total_tagihan'])){ $this->setTotalTagihan($x['total_tagihan']); }
		if(isset ($x['Addon'])){ $this->setAddOn($x['Addon']); }
		if(isset ($x['purposebuy_purposebuy_id'])){ $this->getPurposeBuy()->setId($x['purposebuy_purposebuy_id']); }
		if(isset ($x['harga_pembulatan'])){ $this->setHargaPembulatan($x['harga_pembulatan']); }
		if(isset ($x['is_auto_sms'])){ $this->setIsAutoSms($x['is_auto_sms']); }
		if(isset ($x['is_not_allowed_sp'])){ $this->setIsNotAllowedSendSP($x['is_not_allowed_sp']); }
		if(isset ($x['is_repeat_order'])){ $this->setIsRepeatOrder($x['is_repeat_order']); }
		if(isset ($x['customer_name'])){ $this->setCustomerName($x['customer_name']); }
		if(isset ($x['is_draft'])){ $this->setIsDraft($x['is_draft']); }
		if(isset ($x['sp_processdate'])){ $this->setSpProcessDate($x['sp_processdate']); }
		if(isset ($x['sp_ke'])){ $this->setSpKe($x['sp_ke']); }
		if(isset ($x['morecustomer'])){ $this->setMoreCustomer($x['morecustomer']); }
		if(isset ($x['is_nonppn'])){ $this->setIsNonppn($x['is_nonppn']); }
		if(isset ($x['nomor_im'])){ $this->setNomorIm($x['nomor_im']); }
		if(isset ($x['is_holdteknik'])){ $this->setIsHoldTeknik($x['is_holdteknik']); }
		if(isset ($x['notes_holdteknik'])){ $this->setNotesHoldTeknik($x['notes_holdteknik']); }
		if(isset ($x['alasan_blokir'])){ $this->setAlasanBlokir($x['alasan_blokir']); }
		if(isset ($x['price_source'])){ $this->setPricesource($x['price_source']); }
		if(isset ($x['price_source'])){ $this->setPricesource_name($x['price_source']); }
		if(isset ($x['pricelist_id'])){ $this->setPricelistid($x['pricelist_id']); }
		if(isset ($x['pricelist_keterangan'])){ $this->setPricelistketerangan($x['pricelist_keterangan']); }
		if(isset ($x['pricelistdetail_id'])){ $this->setPricelistdetailid($x['pricelistdetail_id']); }
		if(isset ($x['pricelistdetail_koefisien_id'])){ $this->setPricelistdetailkoefisienid($x['pricelistdetail_koefisien_id']); }
		if(isset ($x['pricelist_name'])){ $this->setPricelistname($x['pricelist_name']); }
		if(isset ($x['cluster'])){ $this->setCluster($x['cluster']); }
		if(isset ($x['is_vida'])){ $this->setIsVida($x['is_vida']); }
		if(isset ($x['is_ciputrafest40'])){ $this->setIsCiputraFest40($x['is_ciputrafest40']); }
		if(isset ($x['detailreward'])){ $this->setDetailReward($x['detailreward']); } ///// add by erwin.st 180122
		if(isset ($x['is_extend_schedule'])){ $this->setIsExtendSchedule($x['is_extend_schedule']); } // added by rico 07122021
		if(isset ($x['is_ppn'])){ $this->setIs_ppn($x['is_ppn']); } // added by erwin.st 14032021
		if(isset ($x['pengakuan_penjualan_date'])){ $this->setPengakuan_penjualan_date($x['pengakuan_penjualan_date']); } // added by erwin.st 14032021
		if(isset ($x['more_customers'])){ $this->setMoreCustomers($x['more_customers']); } // added by erwin.st 27072022
		if(isset ($x['salesgroup_salesgroup_id'])){ $this->getSalesgroup()->setId($x['salesgroup_salesgroup_id']); }
		if(isset ($x['internalmemo_id'])){ $this->setInternalMemoid($x['internalmemo_id']); }
		if(isset ($x['is_blokir'])){ $this->setIsBlokir($x['is_blokir']); } // added by rico 28112022
		if(isset ($x['is_disc_karyawan'])){ $this->setIsDiscKaryawan($x['is_disc_karyawan']); } // added by rico 19012023
		if(isset ($x['jenisbiaya'])){ $this->setJenisBiaya($x['jenisbiaya']); }
		if(isset ($x['porsi_kepemilikan_customer'])){ $this->setPorsikepemilikancustomer($x['porsi_kepemilikan_customer']); }
		if(isset ($x['tanggal_surat_kepemilikan_bersama'])){ $this->setTanggalsuratkepemilikanbersama($x['tanggal_surat_kepemilikan_bersama']); }
		if(isset ($x['kuasa_name'])){ $this->setKuasaname($x['kuasa_name']); }
		if(isset ($x['kuasa_npwp'])){ $this->setKuasanpwp($x['kuasa_npwp']); }
		if(isset ($x['kuasa_nik'])){ $this->setKuasanik($x['kuasa_nik']); }
		if(isset ($x['kuasa_alamat'])){ $this->setKuasaalamat($x['kuasa_alamat']); }

		unset($x);
	}
	
	public function getArrayTable() {
		$x = parent::getArrayTable();
		
		if($this->priceAdmin instanceof Erems_Models_Sales_PriceAdmin){
			$y = $this->priceAdmin->getArrayTable();
			$x = array_merge($x,$y);
		}

		$z = array(
			"harga_total_jual"                  => $this->getTotal(),
			"remaining_balance"                 => $this->getRemainingBalance(),
			"pricetype_id"                      => $this->getPriceType()->getId(),
			"clubcitra_member"                  => $this->getMemberName(),
			"rencana_serahterima"               => $this->getRencanaSerahTerima(),
			"rencana_serahterima_date"          => $this->getRencanaSerahTerimaDate(),
			"realisation_serahterima_date"      => $this->getRealisationSerahTerimaDate(),
			"notes"                             => $this->getNotes(),
			"kpp"                               => $this->getKpp(),
			"akad_realisasiondate"              => $this->getAkadRealisationDate(),
			"upline_upline_id"                  => $this->getUpline()->getId(),
			"is_upline_referall"                => $this->getIsUplineReferall(),
			"cac_cac_id"                        => $this->getCac()->getId(),
			"is_cac_referall"                   => $this->getIsCacReferall(),
			"total_payment"                     => $this->getTotalPayment(),
			"persen_payment"                    => $this->getPersenPayment(),
			"total_ajb"                         => $this->getTotalAjb(),
			"total_hgb"                         => $this->getTotalHgb(),
			"is_cancel"                         => $this->getIsCancel(),
			"api_aci"                           => $this->getApi(),
			"last_duedate"                      => $this->getLast_duedate(),
			"biaya_asuransi"                    => $this->getBiayaAsuransi(),
			'last_duedate_age'                  => $this->getLastDueDateAge(),
			'last_duedate_age_week'             => $this->getLastDueDateAgeWeek(),
			'firstpurchase_date'                => $this->getFirstPurchaseDate(),
			'rewardsales_reward_id'             => $this->getRewardSales()->getId(),
			'rewardcustomer_reward_id'          => $this->getRewardCustomer()->getId(),
			'rewardtambahan_reward_id'          => $this->getRewardTambahan()->getId(),
			'hpptanahtanah_mentah'              => $this->getHppTanahTanahMentah(),
			'hpptanah_devcost'                  => $this->getHppTanahDevCost(),
			'hpptanah_skalakota'                => $this->getHppTanahSkalaKota(),
			'hpptanah_bunga'                    => $this->getHppTanahBunga(),
			'hpptanah_bangunanpermeter'         => $this->getHppTanahBangunanaPermeter(),
			'hpptanah_skalaeco'                 => $this->getHppTanahSkalaEco(),
			'rescheduleid_aktif'                => $this->getRescheduleIdAktif(),
			'changeprice_aktif'                 => $this->getChangePriceAktif(),
			'real_remaining_balance'            => $this->getRealRemainingBalance(),
			'total_tagihan'                     => $this->getTotalTagihan(),
			'Addon'                             => $this->getAddOn(),
			'purposebuy_purposebuy_id'          => $this->getPurposeBuy()->getId(),
			"harga_pembulatan"                  => $this->getHargaPembulatan(),
			"is_auto_sms"                       => $this->getIsAutoSms(),
			"is_not_allowed_sp"                 => $this->getIsNotAllowedSendSP(),
			"is_repeat_order"                   => $this->getIsRepeatOrder(),
			"customer_name"                     => $this->getCustomerName(),
			"is_draft"                          => $this->getIsDraft(),
			"sp_processdate"                    => $this->getSpProcessDate(),
			"sp_ke"                             => $this->getSpKe(),
			"morecustomer"                      => $this->getMoreCustomer(),
			"is_nonppn"                         => $this->getIsNonppn(),
			"nomor_im"                          => $this->getNomorIm(),
			"price_source"                      => $this->getPricesource(),
			"price_source_name"                 => $this->getPricesource_name(),
			"pricelist_id"                      => $this->getPricelistid(),
			"pricelist_keterangan"              => $this->getPricelistketerangan(),
			"pricelistdetail_id"                => $this->getPricelistdetailid(),
			"pricelistdetail_koefisien_id"      => $this->getPricelistdetailkoefisienid(),
			"pricelist_name"                    => $this->getPricelistname(),            
			"cluster"                           => $this->getCluster(),
			"is_vida"                           => $this->getIsVida(),
			"is_ciputrafest40"                  => $this->getIsCiputraFest40(),
			"is_extend_schedule"                => $this->getIsExtendSchedule(), // added by rico 07122021
			"detailreward"                      => $this->getDetailReward(),///// add by erwin.st 180122
			"is_ppn"                            => $this->getIs_ppn(),///// add by erwin.st 140322
			"pengakuan_penjualan_date"          => $this->getPengakuan_penjualan_date(),///// add by erwin.st 140322
			"more_customers"                    => $this->getMoreCustomers(),///// add by erwin.st 270722
			"is_holdteknik"                     => $this->getIsHoldTeknik(), // added by rico 14092022
			"notes_holdteknik"                  => $this->getNotesHoldTeknik(),
			'salesgroup_salesgroup_id'          => $this->getSalesgroup()->getId(),
			'internalmemo_id'                   => $this->getInternalMemoid(),
			"is_blokir"                         => $this->getIsBlokir(), // added by rico 28112022
			"alasan_blokir"                     => $this->getAlasanBlokir(), // added by rico 02012023
			"is_disc_karyawan"                  => $this->getIsDiscKaryawan(), // added by rico 19012023
			"jenisbiaya"                        => $this->getJenisBiaya(),
			"porsi_kepemilikan_customer"        => $this->getPorsikepemilikancustomer(),
			"tanggal_surat_kepemilikan_bersama" => $this->getTanggalsuratkepemilikanbersama(),
			"kuasa_name"                        => $this->getKuasaname(),
			"kuasa_npwp"                        => $this->getKuasanpwp(),
			"kuasa_nik"                         => $this->getKuasanik(),
			"kuasa_alamat"                      => $this->getKuasaalamat()
		);
		$x = array_merge($x,$z);
		return $x;
	}
	
	public function grouped() {
		$x = parent::grouped();
		return array_merge($x,array($this->getSalesman(), $this->getPrice(), $this->getBilling(), $this->getClubCitra(), $this->getSalesLocation(), $this->getMediaPromotion(), $this->getCollector(), $this->getBankKPR(), $this->getRewardSales(), $this->getRewardCustomer(), $this->getRewardTambahan()));
	}

	public function getDCArray() { return $this->scheduleList; }
	public function getDCResult() { return $this->DCResult; }

	public function setDCArray($delimiteredArray) {
		$this->DCResult = $delimiteredArray;
	}
	
	protected function getDatefields() {
		return array("rencana_serahterima_date","realisation_serahterima_date","purchase_date","akad_realisasiondate","last_duedate", "tanggal_surat_kepemilikan_bersama");
	}

	public function getLastDueDate(){ return $this->lastDueDate; }
	public function setLastDueDate($lastDueDate){
		$this->lastDueDate = $lastDueDate;
		return $this;
	}

	public function getLastDueDateAge(){ return $this->lastDueDateAge; }
	public function setLastDueDateAge($lastDueDateAge){
		$this->lastDueDateAge = $lastDueDateAge;
		return $this;
	}

	public function getLastDueDateAgeWeek(){ return $this->lastDueDateAgeWeek; }
	public function setLastDueDateAgeWeek($lastDueDateAgeWeek){
		$this->lastDueDateAgeWeek = $lastDueDateAgeWeek;
		return $this;
	}
	public function getDetailReward() { return $this->detailreward; } ///// add by erwin.st 180122
	public function setDetailReward($detailreward) { $this->detailreward = $detailreward; } ///// add by erwin.st 180122
	public function getIsExtendSchedule() { return $this->is_extend_schedule; }
	public function setIsExtendSchedule($is_extend_schedule) { $this->is_extend_schedule = $is_extend_schedule; }
	function getMoreCustomer() { return $this->moreCustomer; }
	function setMoreCustomer($moreCustomer) { $this->moreCustomer = $moreCustomer; }
	function getCluster() { return $this->cluster; }
	function setCluster($cluster) { $this->cluster = $cluster; }
	function getJenisBiaya() { return $this->jenisBiaya; }
	function setJenisBiaya($jenisBiaya) { $this->jenisBiaya = $jenisBiaya; }
	function getPorsikepemilikancustomer() { return $this->porsiKepemilikancustomer; }
	function setPorsikepemilikancustomer($porsiKepemilikancustomer) { $this->porsiKepemilikancustomer = $porsiKepemilikancustomer; }
	function getTanggalsuratkepemilikanbersama() { return $this->tanggalSuratkepemilikanbersama; }
	function setTanggalsuratkepemilikanbersama($tanggalSuratkepemilikanbersama) { $this->tanggalSuratkepemilikanbersama = $tanggalSuratkepemilikanbersama; }
	function getKuasaname() { return $this->kuasaName; }
	function setKuasaname($kuasaName) { $this->kuasaName = $kuasaName; }
	function getKuasanpwp() { return $this->kuasaNpwp; }
	function setKuasanpwp($kuasaNpwp) { $this->kuasaNpwp = $kuasaNpwp; }
	function getKuasanik() { return $this->kuasaNik; }
	function setKuasanik($kuasaNik) { $this->kuasaNik = $kuasaNik; }
	function getKuasaalamat() { return $this->kuasaAlamat; }
	function setKuasaalamat($kuasaAlamat) { $this->kuasaAlamat = $kuasaAlamat; }
}

?>