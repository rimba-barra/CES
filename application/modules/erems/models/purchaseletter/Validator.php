<?php

/**
 * Description of Validator
 *
 * @author MIS
 */
class Erems_Models_Purchaseletter_Validator extends Erems_Box_Models_App_Validator {

	private $session;
	public $params;

	public function getSession() {
		return $this->session;
	}

	public function setSession($session) {
		$this->session = $session;
	}

	public function run(Erems_Models_Purchaseletter_PurchaseLetterTransaction $pl) {
		$msg = "";

		$paramsRequestResult = Erems_Box_Tools::globalParamsExistPurchaseletter($this->session);

		$paramsRequestResultNew = Erems_Box_Tools::globalParamsExistNew($this->session, "GLOBAL");

		$tanggalClosing = intval($paramsRequestResultNew["parameters"]["GLOBAL_TANGGAL_CLOSING"]);

		$validasiTanggalClosing = Erems_Box_Tools::validasiTanggalPurchase($pl->getDate(), $tanggalClosing);

		/// TEMP CITRAGRANCBDCIBUBUR
		$validasiCitraGrandCBDCibubur = $this->tempValidasiKhususCitraGrandCBDCibubur($pl->getDate(), $this->session);
		if($validasiCitraGrandCBDCibubur["STATUS"]===FALSE){
			$validasiTanggalClosing["HASIL"] = TRUE;
			$pl->setDate($validasiCitraGrandCBDCibubur["TGL"]->format("Y-m-d"));
		}
		///END TEMP CITRAGRANCBDCIBUBUR
		
		//SET PURPOSE
		$daouunit = new Erems_Models_Unit_UnitDao();
		$oneUnit  = $daouunit->getOneUnit($pl->getUnit()->getId());
		$purpose  = $oneUnit[1][0]['purpose'];
		$apart    = array("apartemen", "apartment", "apartement", "apart", "office", "apartmen");
		
		// VALIDASI TANDA JADI MINIMUM DARI MARKETING STOCK
		$daoMarketingStock = new Erems_Models_Marketingstock_Dao();
		$oneMarketingStock = $daoMarketingStock->getByUnitId($this->session->getProject()->getId(),$this->session->getPt()->getId(),$pl->getUnit()->getId());
		$oneMarketingStock = Erems_Box_Tools::toObjectRow($oneMarketingStock,new Erems_Models_Marketingstock_MarketingStock());
		
		$validMinTJ = FALSE;
		$minTandaJadi = doubleval($oneMarketingStock->getMinimumTandaJadi());
		if( $minTandaJadi > 0){
			if($pl->getBilling()->getTandaJadi()->getAmount() >= $minTandaJadi){
				$validMinTJ = TRUE;
			}
		}else{
			$validMinTJ = TRUE; // kalau gak ada setingan minimum tanda jadi, maka abaikan validasi ini.
		}        
		//END VALIDASI TANDA JADI MINIMUM DARI MARKETING STOCK
		
		/// VALIDASI TOTAL JUAL = TOTAL SCHEDULE AMOUNT
		$schedules = $this->params["detail"];
		$totSchAmt = 0;
		foreach ($schedules as $schedule){
			$totSchAmt = $totSchAmt+$schedule["amount"];
		}
		
		$amountBalance = FALSE;
		if($totSchAmt == Erems_Box_Tools::unformatMoney($this->params["harga_total_jual"])){
			$amountBalance = TRUE;
		}   
		
		// khusus untuk create
		if($pl->getId() > 0){
			$amountBalance = TRUE;
		}
		// END  VALIDASI TOTAL JUAL = TOTAL SCHEDULE AMOUNT 

		$genco = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getProject()->getId(),$this->session->getPt()->getId());
		$dao   = new Erems_Models_Purchaseletter_PurchaseLetterDao();        

		//validasi is draft before
		$IsDraftBefore = $dao->checkDraftBefore($pl->getId());
		$subholding    = $genco->activateSh1Features('salesman_validasi');
		$isNova        = $genco->isNoVa();
		
		if (is_array($paramsRequestResult)) {
			$params = $paramsRequestResult["parameters"];
			$statusProject = $params[Erems_Box_GlobalParams::PURCHASELETTER_STATUS_PROJECT];

			// validasi untuk project perumahan
			if ($statusProject == Erems_Box_Config::STATUS_PROJECT_PERUMAHAN) {
				if ($pl->getCustomer()->getId() == 0) {
					$msg = "Please insert customer";
				} 
				else if (strtotime(date($pl->getDate()))-strtotime(date("Y-m-d")) > 0) {
					$msg = "Tanggal purchaseletter tidak boleh lebih dari ".date("d-m-Y");
				} 
				// else if (!$validasiTanggalClosing["HASIL"] && intval($pl->getId())==0) { // validasi closing untuk proses create saja
				//     $msg = $validasiTanggalClosing["MSG"];
				// } 
				else if (!$validasiTanggalClosing["HASIL"] && intval($pl->getId())==0) { // validasi closing untuk proses create saja
					$msg = $validasiTanggalClosing["MSG"];
				}
				else if (!$validasiTanggalClosing["HASIL"] && $IsDraftBefore[0][0]['is_draft']) { // validasi closing untuk proses draft to real saja
					$msg = $validasiTanggalClosing["MSG"];
				}
				else if ($pl->getUnit()->getId() == 0) {
					$msg = "Please insert unit";
				} 
				else if(strlen($pl->getSalesman()->getId()==0) && (strlen($pl->getMemberName())==0) && $subholding == 1){
					if(strlen($pl->getSalesman()->getId()>1)){
						$msg =  "Please Insert salesman";
					}
					else if(strlen($pl->getMemberName())>1){
						$msg =  "Please Insert member";
					}
					$msg =  "Please Insert salesman";                            
				}
				else if(strlen($pl->getSalesman()->getId()==0) && $subholding != 1){
					$msg =  "Please Insert salesman";
				} 
				else if ($pl->getPriceType()->getId() == 0) {
					$msg = "Please select Price Type first";
				} 
				else if ($pl->getPrice()->getPermeter() == 0 && (!in_array(strtolower($purpose), $apart))) {
					$msg = "Harga tanah per m2 kosong";
				} 
				else if ($this->params["productcategory_productcategory"] == "BANGUNAN" && $pl->getPrice()->getBangunan() == 0) {
					$msg = "Please insert building price";
				} 
				else if (intval($pl->getRencanaSerahTerima()) <= 0) {
					$msg = "Please insert Rencana Serah Terima";
				} 
				else if (strlen($pl->getRencanaSerahTerimaDate()) < 5) {
					$msg = "Please insert Serah Terima Planning Date";
				} 
				else if (!$amountBalance) {
					$msg = "Total harga jual tidak sama dengan total amount schedule/tagihan.";
				} 
				else if (!$validMinTJ) {
					$msg = "Minimum Tanda Jadi is Rp. ". Erems_Box_Tools::toCurrency($minTandaJadi)." .";
				} 
				else if (abs($pl->getHargaPembulatan()) > $genco->getMaxPembulatan()){
					$msg = "Harga pembulatan Maksimal Tidak boleh lebih dari +- ".$genco->getMaxPembulatan();
//                } else if($isNova){
//                    $dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();        
//                    $nomerVABCAExist = $dao->nomerVAExist($pl->getVirtualaccountBca(), $this->session->getProject()->getId(), $this->session->getPt()->getId(),'BCA',$pl->getId());
//                    $nomerVAMandiriExist = $dao->nomerVAExist($pl->getVirtualaccountMandiri(), $this->session->getProject()->getId(), $this->session->getPt()->getId(),'MANDIRI',$pl->getId());
////                    var_dump($nomerVABCAExist[0][0]['data']); die();
//                    if($nomerVABCAExist[0][0]['data'] > 0 ){
//                        $msg = "Nomer Virtual Account BCA sudah ada";
//                    } else if($nomerVAMandiriExist[0][0]['data'] > 0 ){
//                        $msg = "Nomer Virtual Account Mandiri sudah ada";
//                    } else {
//                        $this->setStatus(TRUE);
//                    }
				} 
				else {
					$this->setStatus(TRUE);
				}
			} 
			else {
				// validasi untuk projek apartment
				if ($pl->getCustomer()->getId() == 0) {
					$msg = "Please insert customer";
				} 
				else if (strtotime(date($pl->getDate()))-strtotime(date("Y-m-d")) > 0) {
					$msg = "Tanggal purchaseletter tidak boleh lebih dari ".date("d-m-Y");
				} 
				else if (!$validasiTanggalClosing["HASIL"] && intval($pl->getId())==0) { // validasi closing untuk proses create saja
					$msg = $validasiTanggalClosing["MSG"];
				} 
				else if ($pl->getUnit()->getId() == 0) {
					$msg = "Please insert unit";
				} 
				else if(strlen($pl->getSalesman()->getId()==0) && (strlen($pl->getMemberName())==0) && $subholding == 1){
					if(strlen($pl->getSalesman()->getId()>1)){
						 $msg =  "Please Insert salesman";
					}
					else if(strlen($pl->getMemberName())>1){
						$msg =  "Please Insert member";
					}
					$msg =  "Please Insert salesman";                            
				}
				else if(strlen($pl->getSalesman()->getId()==0) && $subholding != 1){
					$msg =  "Please Insert salesman";
				} 
				else if ($pl->getPriceType()->getId() == 0) {
					$msg = "Please select Price Type first";
				} 
				else if ($this->params["productcategory_productcategory"] == "BANGUNAN" && $pl->getPrice()->getBangunan() == 0) {
					$msg = "Please insert building price";
				} 
				else if (intval($pl->getRencanaSerahTerima()) <= 0) {
					$msg = "Please insert Rencana Serah Terima";
				} 
				else if (strlen($pl->getRencanaSerahTerimaDate()) < 5) {
					$msg = "Please insert Serah Terima Planning Date";
				} 
				else if (!$amountBalance) {
					$msg = "Total harga jual tidak sama dengan total amount schedule/tagihan.";
				} 
				else if (!$validMinTJ) {
					$msg = "Minimum Tanda Jadi is Rp. ". Erems_Box_Tools::toCurrency($minTandaJadi)." .";
				} 
				else if (abs($pl->getHargaPembulatan()) > $genco->getMaxPembulatan()){
					$msg = "Harga pembulatan Maksimal Tidak boleh lebih dari +- ".$genco->getMaxPembulatan();
				} 
				else {
					$this->setStatus(TRUE);
				}
			}
			$this->setMsg($msg);
		}
	}

	public function tempValidasiKhususCitraGrandCBDCibubur($tglPurchase, $session) {
		$hasil = array("STATUS" => FALSE, "MSG" => "Validasi run...","TGL"=>NULL);

		if ($session->getProject()->getId() === 2075 && $session->getPt()->getId() === 2097) {
			$tanggalSekarang = new DateTime("1900-01-01 00:00:00.000000");
			$tanggalSekarang->setDate(date("Y"), date("m"), date("d"));
			$tglPurchase = new DateTime($tglPurchase);
			$tglSakral   = new DateTime("1900-01-01 00:00:00.000000");
			$tglSakral->setDate(2017,10,28);
			
			if($tglPurchase <= $tglSakral){
				$tglPurchase->setDate(2017,10,28);
				$hasil["STATUS"] = FALSE;
				$hasil["MSG"]    = "Tanggal purchase di bawah tanggal sakral.";
				$hasil["TGL"]    = $tglPurchase;
			}else{
				$hasil["STATUS"] = TRUE;
				$hasil["MSG"]    = "Tanggal purchase di atas tgl sakral.";
			}
		} else {
			$hasil["STATUS"] = TRUE;
			$hasil["MSG"]    = "Validasi bukan untuk proyek ini.";
		}
		return $hasil;
	}

}

?>
