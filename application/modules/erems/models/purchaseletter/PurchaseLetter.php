<?php

/**
 * Description of PurchaseLetter
 *
 * @author MIS
 */
class Erems_Models_Purchaseletter_PurchaseLetter extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Kouti_Remora {

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
	private $rencanaSerahterimaDate;
	private $promo;
	public $persenBayar;
	public $totalBayar;
	public $unitProgress;
	public $lastProgressDate;
	public $rencanaBAST;
	private $isLunas;
	private $city_city_name;
	private $firstPurchaseDate;
	//private $pengalihanhakName;
	//add by hadi 21082019
	private $is_draft;
        //add by fatkur 121119
	private $virtualaccountBca;
	private $virtualaccountMandiri;
    //add by dika 31012020
	private $total;
	private $hargaNetto;  
	private $npwpNo;
	private $plafonKpr;
	private $customerName; 
	private $cluster;
    //end
	private $lunas_date;
	## Add by RH 30/06/2020 ##
	private $pt_name;	
	## END Add by RH 30/06/2020 ##
	
	private $notes_batal;


	//addby anas 05012021
	private $nilai_survey;
	private $nilai_survey_nps;

	// addby rico 09/03/2021
	private $purpose;
	private $side;
	private $unit_status;
	private $is_cancel;

	// added by  rico 26092022
	private $sp_ke;
	private $sp_date;

	// // addby rico 26/08/2021
	// private $pricetype;

	// addby erwin.st 29/10/2021
	private $akad_realisasiondate;

	// added by rico 10112021
	private $tgl_cair_pertama;

    // add by rico 07122021
    private $is_extend_schedule;

    // add by rico 281122021
    private $is_blokir;

	public function __construct($embedPrefix = NULL) {
		parent::__construct();
		//   $this->embedPrefix = 'purchaseletter_';
		$this->embedPrefix = $embedPrefix == NULL ? 'purchaseletter_' : $embedPrefix;
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

	public function getCityCityName() {
		return $this->city_city_name;
	}

	public function setCityCityName($city_city_name) {
		$this->city_city_name = $city_city_name;
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
		if (!$this->customer) {
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
		return (double) $this->totalPayment;
	}

	public function setTotalPayment($totalPayment) {
		$this->totalPayment = (double) $totalPayment;
	}

    // added by rico 07122021
    public function getIsExtendSchedule() {
        return $this->is_extend_schedule;
    }

    // added by rico 07122021
    public function setIsExtendSchedule($is_extend_schedule) {
        $this->is_extend_schedule = $is_extend_schedule;
    }

	// added by rico 28112022
    public function getIsBlokir() {
        return $this->is_blokir;
    }

    public function setIsBlokir($is_blokir) {
        $this->is_blokir = $is_blokir;
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

	function getRencanaSerahTerimaDate() {
		return $this->rencanaSerahterimaDate;
	}

	public function getTotal() {
		return doubleval($this->total);
	}
	
	function getLunas_date() {
		return $this->lunas_date;
	}

	
	public function setTotal($total) {
		$this->total = (double)$total;
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

	function setRencanaSerahTerimaDate($rencanaSerahTerimaDate) {
		$this->rencanaSerahterimaDate = $rencanaSerahTerimaDate;
	}

	function getPromo() {
		return $this->promo;
	}

	function setPromo($promo) {
		$this->promo = $promo;
	}
	function setLunas_date($lunas_date) {
		$this->lunas_date = $lunas_date;
	}

	public function getIsLunas() {
		return $this->isLunas;
	}

	public function setIsLunas($isLunas) {
		$this->isLunas = $isLunas;
	}

	function getFirstPurchaseDate() {
		return $this->firstPurchaseDate;
	}

	function setFirstPurchaseDate($firstPurchaseDate) {
		$this->firstPurchaseDate = $firstPurchaseDate;
	}

	// public function getPengalihanhakName() {
	// return $this->pengalihanhakName;
	// }
	// public function setPengalihanhakName($pengalihanhakName) {
	// $this->pengalihanhakName = $pengalihanhakName;
	// }
	
	function getVirtualaccountMandiri() {
		return $this->virtualaccountMandiri;
	}

	function setVirtualaccountMandiri($virtualaccountMandiri) {
		$this->virtualaccountMandiri = $virtualaccountMandiri;
	}
	
	public function getVirtualaccountBca(){
		return $this->virtualaccountBca;
	}

	public function setVirtualaccountBca($virtualaccountBca){
		$this->virtualaccountBca = $virtualaccountBca;
	}

	public function getHargaNetto() {
		return doubleval($this->hargaNetto);
	}

	public function setHargaNetto($hargaNetto) {
		$this->hargaNetto = (double)$hargaNetto;
	}

	public function getNpwp() {
		return $this->npwpNo;
	}

	public function setNpwp($npwpNo) {
		$this->npwpNo = $npwpNo;
	}

	public function getPlafonKpr() {
		return doubleval($this->plafonKpr);
	}

	public function setPlafonKpr($plafonKpr) {
		$this->plafonKpr = (double)$plafonKpr;
	}

	public function getCustomerName() {
		return $this->customerName;
	}

	public function setCustomerName($customerName) {
		$this->customerName = $customerName;
	}

	public function getCluster() {
		return $this->cluster;
	}

	public function setCluster($cluster) {
		$this->cluster = $cluster;
	}
	## Add by RH 30/06/2020 ##
	function getPtName() {
		return $this->pt_name;
	}

	function setPtName($pt_name) {
		$this->pt_name = $pt_name;
	}
	## END Add by RH 30/06/2020 ##

	public function getNotesBatal() {
		return $this->notes_batal;
	}

	public function setNotesBatal($notes_batal) {
		$this->notes_batal = $notes_batal;
	}

	
	//addby anas 05012021
	public function getNilaisurvey() {
		return $this->nilai_survey;
	}

	public function setNilaisurvey($nilai_survey) {
		$this->nilai_survey = $nilai_survey;
	}

	public function getNilaisurveyNPS() {
		return $this->nilai_survey_nps;
	}

	public function setNilaisurveyNPS($nilai_survey_nps) {
		$this->nilai_survey_nps = $nilai_survey_nps;
	}

	public function getAkadrealisasiondate() {
		return $this->akad_realisasiondate;
	}

	public function setAkadrealisasiondate($akad_realisasiondate) {
		$this->akad_realisasiondate = $akad_realisasiondate;
	}

	// added by rico 26092022
	public function getSpke() {
		return $this->sp_ke;
	}

	public function setSpke($sp_ke) {
		$this->sp_ke = $sp_ke;
	}

	public function getSpdate() {
		return $this->sp_date;
	}

	public function setSpdate($sp_date) {
		$this->sp_date = $sp_date;
	}



	public function setArrayTable($dataArray = NULL) {
		// $x = $dataArray;
		$x = $dataArray == NULL ? $this->arrayTable : $dataArray;

		if (isset($x['purchaseletter_id'])) {
			$this->setId($x['purchaseletter_id']);
		}
		if (isset($x['purchaseletter_no'])) {
			$this->setNomor($x['purchaseletter_no']);
		}
		if (isset($x['purchase_date'])) {
			$this->setDate($x['purchase_date']);
		}
		if (isset($x['unit_id'])) {
			$this->setUnitId($x['unit_id']);
		}
		if (isset($x['customer_id'])) {
			$this->setCustomerId($x['customer_id']);
		}
		if (isset($x['city_city_name'])) {
			$this->setCityCityName($x['city_city_name']);
		}
		if (isset($x['salesman_id'])) {
			$this->setSalesmanId($x['salesman_id']);
		}
		if (isset($x['total_payment'])) {
			$this->setTotalPayment($x['total_payment']);
		}
		if (isset($x['remaining_balance'])) {
			$this->setRemainingBalance($x['remaining_balance']);
		}
		if (isset($x['downline_id'])) {
			$this->setDownlineId($x['downline_id']);
		}
		if (isset($x['keterangan_bayar'])) {
			$this->setKeteranganBayar($x['keterangan_bayar']);
		}
		if (isset($x['keterangan_1'])) {
			$this->setKeterangan1($x['keterangan_1']);
		}
		if (isset($x['keterangan_2'])) {
			$this->setKeterangan2($x['keterangan_2']);
		}
		if (isset($x['keterangan_3'])) {
			$this->setKeterangan3($x['keterangan_3']);
		}
		if (isset($x['house_advisor'])) {
			$this->setHouseAdvisor($x['house_advisor']);
		}
		if (isset($x['manager'])) {
			$this->setManager($x['manager']);
		}
		if (isset($x['hs_keuangan'])) {
			$this->setHsKeuangan($x['hs_keuangan']);
		}
		if (isset($x['rencanaserahterima_date'])) {
			$this->setRencanaSerahTerimaDate($x['rencanaserahterima_date']);
		}
		if (isset($x['Addon'])) {
			$this->setAddOn($x['Addon']);
		}

		if (isset($x['promo'])) {
			$this->setPromo($x['promo']);
		}
		if (isset($x['persen_bayar'])) {
			$this->persenBayar = $x['persen_bayar'];
		}
		if (isset($x['total_bayar'])) {
			$this->totalBayar = $x['total_bayar'];
		}
		if (isset($x['unit_progress'])) {
			$this->unitProgress = $x['unit_progress'];
		}
		if (isset($x['last_progress_date'])) {
			$this->lastProgressDate = $x['last_progress_date'];
		}
		if (isset($x['realisation_serahterima_date'])) {
			$this->rencanaBAST = $x['realisation_serahterima_date'];
		}
		if (isset($x['is_lunas'])) {
			$this->setIsLunas($x['is_lunas']);
		}
		if (isset($x['lunas_date'])) {
			$this->setLunas_date($x['lunas_date']);
		}
		if (isset($x['firstpurchase_date'])) {
			$this->setFirstPurchaseDate($x['firstpurchase_date']);
		}

		// if(isset ($x['pengalihanhak_name'])){
		// $this->setPengalihanhakName($x['pengalihanhak_name']);
		// }

		if (isset($x['is_draft'])) {
			$this->setIsDraft($x['is_draft']);
		}
		if(isset ($x['unit_virtualaccount_bca'])){
			$this->setVirtualaccountBca($x['unit_virtualaccount_bca']);
		}
		if(isset ($x['unit_virtualaccount_mandiri'])){
			$this->setVirtualaccountMandiri($x['unit_virtualaccount_mandiri']);
		}
		if(isset ($x['harga_total_jual'])){
			$this->setTotal($x['harga_total_jual']);
		}

		if(isset ($x['harga_netto'])){
			$this->setHargaNetto($x['harga_netto']);
		}

		if(isset ($x['customer_npwp'])){
			$this->setNpwp($x['customer_npwp']);
		}

		if(isset ($x['plafon_kpr'])){
			$this->setPlafonKpr($x['plafon_kpr']);
		}

		if(isset ($x['purchaseletter_customer_name'])){
			$this->setCustomerName($x['purchaseletter_customer_name']);
		}

		if(isset ($x['cluster_id'])){
			$this->setCluster($x['cluster_id']);
		}
		## Add by RH 30/06/2020 ##
		if(isset ($x['pt_name'])){
			$this->setPtName($x['pt_name']);
		}
		## END Add by RH 30/06/2020 ##

		if(isset ($x['notes_batal'])){
			$this->setNotesBatal($x['notes_batal']);
		}

		
		//addby anas 05012021
		if(isset ($x['nilai_survey'])){
			$this->setNilaisurvey($x['nilai_survey']);
		}
		if(isset ($x['nilai_survey_nps'])){
			$this->setNilaisurveyNPS($x['nilai_survey_nps']);
		}
		if(isset ($x['purpose'])){
			$this->setPurpose($x['purpose']);
		}
		if(isset ($x['side'])){
			$this->setSide($x['side']);
		}
		if(isset ($x['unit_status'])){
			$this->setUnitStatus($x['unit_status']);
		}
		if(isset ($x['is_cancel'])){
			$this->setIsCancel($x['is_cancel']);
		}
		// if(isset ($x['pricetype'])){
		// 	$this->setPricetype($x['pricetype']);
		// }
		if(isset ($x['akad_realisasiondate'])){
			$this->setAkadrealisasiondate($x['akad_realisasiondate']);
		}
		if(isset ($x['tgl_cair_pertama'])){
			$this->setTglCairPertama($x['tgl_cair_pertama']);
		}
        // added by rico 07122021
        if(isset ($x['is_extend_schedule'])){
          $this->setIsExtendSchedule($x['is_extend_schedule']);
        }
        // added by rico 26092022
        if(isset ($x['sp_ke'])){
          $this->setSpke($x['sp_ke']);
        }
        if(isset ($x['sp_date'])){
          $this->setSpdate($x['sp_date']);
        }
        // added by rico 28112022
        if(isset ($x['is_blokir'])){
          $this->setIsBlokir($x['is_blokir']);
        }

		unset($x);
	}

	public function getArrayTable() {
		$x = array(
			"purchaseletter_id" => $this->getId(),
			"purchaseletter_no" => $this->getNomor(),
			"purchase_date" => $this->getDate(),
			"unit_id" => $this->getUnitId(),
			"customer_id" => $this->getCustomerId(),
			"city_city_name" => $this->getCityCityName(),
			"salesman_id" => $this->getSalesmanId(),
			"total_payment" => $this->getTotalPayment(),
			"remaining_balance" => $this->getRemainingBalance(),
			"api_aci" => $this->getAci(),
			"downline_id" => $this->getDownlineId(),
			"keterangan_bayar" => $this->getKeteranganBayar(),
			"keterangan_1" => $this->getKeterangan1(),
			"keterangan_2" => $this->getKeterangan2(),
			"keterangan_3" => $this->getKeterangan3(),
			"house_advisor" => $this->getHouseAdvisor(),
			"manager" => $this->getManager(),
			"hs_keuangan" => $this->getHsKeuangan(),
			"rencanaserahterima_date" => $this->getRencanaSerahTerimaDate(),
			"Addon" => $this->getAddOn(),
			"promo" => $this->getPromo(),
			"persen_bayar" => $this->persenBayar,
			"total_bayar" => $this->totalBayar,
			"unit_progress" => $this->unitProgress,
			"last_progress_date" => $this->lastProgressDate,
			"realisation_serahterima_date" => $this->rencanaBAST,
			"is_lunas" => $this->getIsLunas(),
			"lunas_date" => $this->getLunas_date(),
			"firstpurchase_date" => $this->getFirstPurchaseDate(),
			//"pengalihanhak_name"=>$this->getPengalihanhakName()
			"is_draft" => $this->getIsDraft(),
			'unit_virtualaccount_bca'=>$this->getVirtualaccountBca(),
			'unit_virtualaccount_mandiri'=>$this->getVirtualaccountMandiri(),
			"harga_total_jual"=>$this->getTotal(),
			"harga_netto"=>$this->getHargaNetto(),
			"customer_npwp"=>$this->getNpwp(),
			"plafon_kpr"=>$this->getPlafonKpr(),
			"purchaseletter_customer_name" => $this->getCustomerName(),
			"pt_name" => $this->getPtName(),
			"cluster_id"=>$this->getCluster(),
			"notes_batal"=>$this->getNotesBatal(),
			
			
			//addby anas 05012021
			"nilai_survey"=>$this->getNilaisurvey(),			
			"nilai_survey_nps"=>$this->getNilaisurveyNPS(),

			"purpose"=>$this->getPurpose(),
			"side"=>$this->getSide(),
			"unit_status"=>$this->getUnitStatus(),
			"is_cancel"=>$this->getIsCancel(),

			// "pricetype"=>$this->getPricetype(),

			// add Erwin.st 29102021
			"akad_realisasiondate"=>$this->getAkadrealisasiondate(),
			"tgl_cair_pertama"=>$this->getTglCairPertama(),

			// added by rico 07122021
            "is_extend_schedule"=>$this->getIsExtendSchedule(),

			// added by rico 26092022
            "sp_ke"=>$this->getSpke(),
            "sp_date"=>$this->getSpdate(),
            
            // added by rico 28112022
            "is_blokir"=>$this->getIsBlokir(),
		);

		return $x;
	}

	protected function getDatefields() {
		return array("purchase_date", "Addon", "realisation_serahterima_date", "last_progress_date");
	}

	public function fillData($data) {
		$this->setArrayTable($data);
	}

	public function grouped() {
		return array($this->getUnit(), $this->getCustomer());
	}

	//add by hadi 22082019
	public function getIsDraft() {
		return $this->is_draft;
	}

	public function setIsDraft($is_draft) {
		$this->is_draft = $is_draft;
	}

	//add by rico 09/03/2021
	public function getPurpose() {
		return $this->purpose;
	}

	public function setPurpose($purpose) {
		$this->purpose = $purpose;
	}
	
	public function getSide() {
		return $this->side;
	}

	public function setSide($side) {
		$this->side = $side;
	}
	
	public function getUnitStatus() {
		return $this->unit_status;
	}

	public function setUnitStatus($unit_status) {
		$this->unit_status = $unit_status;
	}
	
	public function getIsCancel() {
		return $this->is_cancel;
	}

	public function setIsCancel($is_cancel) {
		$this->is_cancel = $is_cancel;
	}

	public function getTglCairPertama() {
		return $this->tgl_cair_pertama;
	}

	public function setTglCairPertama($tgl_cair_pertama) {
		$this->tgl_cair_pertama = $tgl_cair_pertama;
	}
	
	// public function getPricetype() {
	// 	return $this->pricetype;
	// }

	// public function setPricetype($pricetype) {
	// 	$this->pricetype = $pricetype;
	// }

}

?>
