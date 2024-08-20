<?php

/**
 * Description of Dao
 *
 * @author tommytoban
 */
class Erems_Models_Sales_Change_Dao extends Erems_Box_Models_App_AbDao implements Erems_Box_Models_App_BlackHole {

	private $changeType;

	public function setType($t) {
		$this->changeType = $t;
	}

	public function save(Erems_Models_Sales_Change $c) {
		$hasil = 0;
		if ($this->changeType == "CP") {
			if ($c instanceof Erems_Models_Sales_Change_ChangePrice) {

				$hasil = $this->saveCP($c, $c->getPrice(), $c->getPriceAdmin(), $c->getPurchaseletter());
			}
		}
		return $hasil;
	}

	public function saveCN(Erems_Models_Sales_Change_ChangeName $cn) {

		$hasil = 0;

		$hasil = $this->dbTable->SPUpdate('sp_changename_create', $cn->getAddBy(), $cn->getPurchaseletter()->getId(), $cn->getCustomerNew()->getId(), $cn->getDate(), $cn->getReason()->getId(), $cn->getNote(), $cn->getAdminFee(), Erems_Box_Config::REVISIONTYPE_CHANGENAME
				//rizal 2 April 2019
				, $cn->getIsSatuKK(), $cn->getNomorSetorPajak(), $cn->getNoDocPengalihanHak(), $cn->getCaraPembayaranPPH(), $cn->getNominalPembayaranPPH()
				, $cn->getIsUsedVerification()
				//
		);

		return $hasil;
	}

	public function updateInfoPrintCN(Erems_Models_Sales_Change_ChangeName $cn) {
		$hasil = 0;

		$hasil = $this->dbTable->SPUpdate('sp_changenameinfoprint_update', $cn->getModiBy(), $cn->getId(), $cn->getAdendumNomor(), $cn->getPersetujuanNama(), $cn->getPersetujuanRelasi());

		return $hasil;
	}

	public function checkNomorAdendumCN($nomorAdendum, $projectId, $ptId) {
		$hasil = 0;

		$hasil = $this->dbTable->SPExecute('sp_changenamechecknoadendum_read', $nomorAdendum, $projectId, $ptId);

		return $hasil;
	}

	public function getNomorAkhirAdendumCN($projectId, $ptId, $counterStart, $counterLen) {
		$hasil = 0;

		$hasil = $this->dbTable->SPExecute('sp_changenamelastadendumno_read', $projectId, $ptId, $counterStart, $counterLen);

		return $hasil;
	}

	public function getRevision(Erems_Models_Purchaseletter_PurchaseLetter $p, $revisionTypeId) {
		$hasil = 0;

		$hasil = $this->dbTable->SPExecute('sp_checkrevisi_read', $p->getId(), intval($revisionTypeId));

		return $hasil;
	}

	///

	public function directDelete(\Erems_Box_Models_App_Decan $decan, \Erems_Box_Kouti_InterSession $session) {
		$row = 0;

		if ($this->changeType == "CP") {
			$row = $this->dbTable->SPUpdate('sp_changeprice_destroy', $decan->getString(), $session->getUserId());
		} else if ($this->changeType == "CN") {
			$row = $this->dbTable->SPUpdate('sp_changename_destroy', $decan->getString(), $session->getUserId());
		} else if ($this->changeType == "CK") {
			$row = $this->dbTable->SPUpdate('sp_changekavling_destroy', $decan->getString(), $session->getUserId());
		}

		return $row;
	}

	public function saveCP(Erems_Models_Sales_Change_ChangePrice $cp, Erems_Models_Sales_Price $price, Erems_Models_Sales_PriceAdmin $pAdmin, Erems_Models_Purchaseletter_PurchaseLetterTransaction $pl) {
		$hasil = 0;
		$dcResult = $pl->getDCResult();

		// echo $price->getSubsidiDp() . ' ### ' .
		// 	$price->getHargaInterior() . ' ### ' .
		// 	$price->getPpnSubsididp() . ' ### ' .
		// 	$price->getAfterPpnSubsididp() . ' ### ' .
		// 	$price->getPpnInterior() . ' ### ' .
		// 	$price->getAfterPpnInterior();
		// die();

		//edit by imaam on 2019-11-18
		$total_harga_jual = $pl->getTotal() + $cp->getHargaPembulatanNew();

		$hasil = $this->dbTable->SPUpdate("sp_changeprice_create",
			$cp->getAddBy(),
			$cp->getPurchaseletter()->getId(),
			$cp->getUnitType()->getId(),
			$cp->getPropertyInfo()->getLandSize(),
			$cp->getPropertyInfo()->getBuildingSize(),
			$cp->getPropertyInfo()->getKelebihanTanah(),
			$cp->getDate(),
			$cp->getPriceType()->getId(),
			$price->getPermeter(),
			$price->getKelebihan(),
			$price->getTanah(),
			$price->getTotalKelebihan(),
			$price->getBangunan(),
			$price->getJualDasar(),
			$price->getDiscountDasar(),
			$price->getAfterDiscountDasar(),
			$price->getDiscountTanah(),
			$price->getAfterDiscountTanah(),
			$price->getDiscountBangunan(),
			$price->getAfterDiscountBangunan(),
			$price->getNetto(),
			$price->getPpnTanah(),
			$price->getAfterPpnTanah(),
			$price->getPpnBangunan(),
			$price->getAfterPpnBangunan(),
			$price->getPpnbm(),
			$price->getAfterPpnbm(),
			$price->getPph22(),
			$price->getAfterPph22(),
			$price->getBbnSertifikat(),
			$price->getBphtb(),
			$price->getBajb(),
			$price->getJual(),
			$pAdmin->getDiskon(),
			$pAdmin->getPriceDiskon(),
			$pAdmin->getPrice(),
			$pAdmin->getSubsidi(),
			$pAdmin->getPMutu(),
			$pAdmin->getPaketTambahan(),
			//edit by imaam on 2019-11-18
			$total_harga_jual, //$pl->getTotal(),
			Erems_Box_Config::REVISIONTYPE_CHANGEPRICE,
			$cp->getBankKPR()->getId(),
			$dcResult["schedule_id"],
			$dcResult["scheduletype_id"],
			$dcResult["duedate"],
			$dcResult["amount"],
			$dcResult["sourcemoney_sourcemoney_id"],
			$dcResult["remaining_balance"],
			'',
			'',
			'',
			'',
			$dcResult["termin"],
			'',
			'',
			'0',
			'',
			$pAdmin->getAsuransi(),
			$cp->getNote(),
			$cp->getNotesNew(),
			$cp->getBillingRules()->getId(),
			$pl->getRencanaSerahTerima(),
			$pl->getRencanaSerahTerimaDate(),
			$cp->getHargaPembulatanNew(),
			## Add by RH 22/10/2019 ##
			$cp->getBillingRulesTermTandaJadi(),
			$cp->getBillingRulesTandaJadi(),
			$cp->getBillingRulesTermUangMuka(),
			$cp->getBillingRulesUangMuka(),
			$cp->getBillingRulesTermAngsuran(),
			$cp->getBillingRulesAngsuran(),
			$cp->getIsUsedVerification(),
			$price->getIsPPN(),
			$price->getIsNonPPN(),
			$cp->getNPVDocapproved(),

			$price->getSubsidiDp(),
			$price->getHargaInterior(),
			$price->getPpnSubsididp(),
			$price->getAfterPpnSubsididp(),
			$price->getPpnInterior(),
			$price->getAfterPpnInterior()
		);
		## END Add by RH 22/10/2019 ##

		return $hasil;
	}

	public function approveCP(Erems_Models_Sales_Change_ChangePrice $cp, $docStatus, $newNomorPl) {
		$hasil = 0;
		$hasil = $this->dbTable->SPUpdate("sp_changeprice_approve", $cp->getAddBy(), $cp->getId(), Erems_Box_Config::REVISIONTYPE_CHANGEPRICE, $docStatus, $cp->getDate(), $newNomorPl);
		return $hasil;
	}

	public function approveCPColl(Erems_Models_Sales_Change_ChangePrice $cp, $docStatus, $newNomorPl) {
		$hasil = 0;
		$hasil = $this->dbTable->SPUpdate("sp_changepricewithcoll_approve", $cp->getAddBy(), $cp->getId(), Erems_Box_Config::REVISIONTYPE_CHANGEPRICE, $docStatus, $cp->getDate(), $newNomorPl);
		return $hasil;
	}

	public function saveCK(Erems_Models_Sales_Change_ChangeKavling $ck) {
		$hasil = 0;
		$hasil = $this->saveinternCK($ck, $ck->getNewPurchaseLetter(), $ck->getNewPurchaseLetter()->getPrice(), $ck->getNewPurchaseLetter()->getPriceAdmin());
		return $hasil;
	}

	public function approveCN(Erems_Models_Sales_Change_ChangeName $cp, $docStatus, $newNomorPl) {
		$hasil = 0;

		$hasil = $this->dbTable->SPUpdate("sp_changename_approve", $cp->getAddBy(), $cp->getId(), Erems_Box_Config::REVISIONTYPE_CHANGENAME, $docStatus, $cp->getDate(), $newNomorPl);

		return $hasil;
	}

	public function approveCNColl(Erems_Models_Sales_Change_ChangeName $cp, $docStatus, $newNomorPl) {
		$hasil = 0;

		$hasil = $this->dbTable->SPUpdate("sp_changenamewithcoll_approve", $cp->getAddBy(), $cp->getId(), Erems_Box_Config::REVISIONTYPE_CHANGENAME, $docStatus, $cp->getDate(), $newNomorPl);

		return $hasil;
	}

	public function approveCK(Erems_Models_Sales_Change_ChangeKavling $cp, $docStatus, $newNumber) {
		$hasil = 0;

		$hasil = $this->dbTable->SPUpdate("sp_pindahkavling_approve", $cp->getAddBy(), $cp->getId(), Erems_Box_Config::REVISIONTYPE_CHANGEKAVLING, $docStatus, Erems_Box_Config::UNITSTATUS_SOLD, Erems_Box_Config::UNITSTATUS_STOCK, $newNumber, $cp->getDate());
		// var_dump($this->dbTable);
		// var_dump($this->dbTable);
		return $hasil;
	}

	public function approveCKColl(Erems_Models_Sales_Change_ChangeKavling $cp, $docStatus, $newNumber) {
		$hasil = 0;

		$hasil = $this->dbTable->SPUpdate("sp_pindahkavlingwithcoll_approve", $cp->getAddBy(), $cp->getId(), Erems_Box_Config::REVISIONTYPE_CHANGEKAVLING, $docStatus, Erems_Box_Config::UNITSTATUS_SOLD, Erems_Box_Config::UNITSTATUS_STOCK, $newNumber, $cp->getDate());
//		 var_dump($this->dbTable);
//                 die;
		return $hasil;
	}

	private function saveinternCK(Erems_Models_Sales_Change_ChangeKavling $ck, Erems_Models_Purchaseletter_PurchaseLetterTransaction $pl, Erems_Models_Sales_Price $price, Erems_Models_Sales_PriceAdmin $pa) {
		$hasil = 0;

		$dcResult = $pl->getDCResult();

		if (doubleval($pl->getTotal()) == 0) {
			return $hasil;
		}

		$total_harga_jual = doubleval($pl->getTotal()) + doubleval($ck->getHargaPembulatanNew());

		$hasil = $this->dbTable->SPUpdate('sp_pindahkavlingb_create',
			$ck->getAddBy(),
			$ck->getProject()->getId(),
			$ck->getPt()->getId(),
			$ck->getPurchaseletter()->getId(),
			$pl->getUnit()->getId(),
			$pl->getPriceType()->getId(),
			$pl->getNomor(),
			$pl->getDate(),
			Erems_Box_Config::REVISIONTYPE_CHANGEKAVLING,
			doubleval($pl->getRemainingBalance()),
			doubleval($price->getPermeter()),
			doubleval($price->getTanah()),
			doubleval($price->getKelebihan()),
			doubleval($price->getTotalKelebihan()),
			doubleval($price->getBangunan()),
			doubleval($price->getDiscountBangunan()),
			doubleval($price->getAfterDiscountBangunan()),
			doubleval($price->getPpnTanah()),
			doubleval($price->getAfterPpnTanah()),
			doubleval($price->getPpnBangunan()),
			doubleval($price->getAfterPpnBangunan()),
			doubleval($pa->getPrice()),
			doubleval($pa->getPaketTambahan()),
			doubleval($pa->getDiskon()),
			doubleval($pa->getPriceDiskon()),
			doubleval($price->getJualDasar()),
			doubleval($price->getDiscountDasar()),
			doubleval($price->getAfterDiscountDasar()),
			doubleval($price->getNetto()),
			doubleval($price->getBphtb()),
			doubleval($price->getBbnSertifikat()),
			doubleval($price->getBajb()),
			doubleval($price->getJual()),
			doubleval($pa->getSubsidi()),
			doubleval($pa->getPMutu()),
			$total_harga_jual, // doubleval($pl->getTotal()),
			intval($ck->getReason()->getId()),
			$ck->getNote(),
			Erems_Box_Config::UNITSTATUS_SOLD,
			Erems_Box_Config::UNITSTATUS_STOCK,
			intval($pl->getBilling()->getId()),
			doubleval($pl->getBilling()->getTandaJadi()->getQuantity()),
			doubleval($pl->getBilling()->getTandaJadi()->getAmount()),
			doubleval($pl->getBilling()->getUangMuka()->getQuantity()),
			doubleval($pl->getBilling()->getUangMuka()->getAmount()),
			doubleval($pl->getBilling()->getAngsuran()->getQuantity()),
			doubleval($pl->getBilling()->getAngsuran()->getAmount()),
			intval($pl->getBankKPR()->getId()),
			intval($pl->getCollector()->getId()),
			intval($pl->getRencanaSerahTerima()),
			$pl->getRencanaSerahTerimaDate(),
			$dcResult["schedule_id"],
			$dcResult["scheduletype_id"],
			$dcResult["duedate"],
			$dcResult["amount"],
			$dcResult["termin"],
			$dcResult["remaining_balance"],
			$dcResult["sourcemoney_sourcemoney_id"],
			doubleval($price->getDiscountTanah()),
			doubleval($price->getAfterDiscountTanah()),
			Erems_Box_Config::UNITSTATUS_HOLD,
			//semy 31/07/1993
			doubleval($price->getPpnbm()), //persen
			doubleval($price->getPph22()), //persen
			doubleval($price->getAfterPph22()), //harga
			doubleval($price->getAfterPpnbm()), //harga
			$pl->getNotes(),
			//semy
			$pa->getAsuransi(),
			$ck->getIsUsedVerification(),
			doubleval($ck->getHargaPembulatanNew())
		);

		$autoapprove = $this->dbTable->SPExecute('sp_changekavling_autoapprove', $hasil);

		if ($autoapprove[0][0]["value"] == 0) {
			$changeKavlingInfo = $this->dbTable->SPExecute('sp_pindahkavlingdetail_read', $hasil);
			$ng = new Erems_Models_Purchaseletter_NomorGenerator();
			$purchaseletter = new Erems_Models_Purchaseletter_PurchaseLetterTransaction();
			$unit = new Erems_Models_Unit_UnitTran();
			$unit->getProject()->setId($changeKavlingInfo[1][0]["unitbaru_project_id"]);
			$unit->getPt()->setId($changeKavlingInfo[1][0]["unitbaru_pt_id"]);
			$unit->getCluster()->setId($changeKavlingInfo[1][0]["unitbaru_cluster_id"]);
			$purchaseletter->setDate(date("Y-m-d")); // tanggal purchaseletter baru ambil dari tanggal approve hari ini
			$unit->getCluster()->setCode($changeKavlingInfo[1][0]["clusterbaru_code"]);
			$unit->getProductCategory()->setName($changeKavlingInfo[1][0]["productcategorybaru_productcategory"]);
			$unit->getBlock()->setCode($changeKavlingInfo[1][0]["blockbaru_code"]);

			$hasilNg = $ng->getNomor($purchaseletter, $unit);
			$this->dbTable->SPUpdate("sp_pindahkavling_approve", $ck->getAddBy(), $hasil, Erems_Box_Config::REVISIONTYPE_CHANGEKAVLING, 1, Erems_Box_Config::UNITSTATUS_SOLD, Erems_Box_Config::UNITSTATUS_STOCK, $hasilNg["new_nomor"], date("Y-m-d"));
			$this->dbTable->SPUpdate("sp_pindahkavlingwithcoll_approve", $ck->getAddBy(), $hasil, Erems_Box_Config::REVISIONTYPE_CHANGEKAVLING, 3, Erems_Box_Config::UNITSTATUS_SOLD, Erems_Box_Config::UNITSTATUS_STOCK, $hasilNg["new_nomor"], date("Y-m-d"));
			$ng->updateNomor($hasilNg["counter_obj"], $hasilNg["new_nomor"]);
		}

		return $hasil;
	}

	/*
	  private function saveinternCK(Erems_Models_Sales_Change_ChangeKavling $ck,Erems_Models_Purchaseletter_PurchaseLetterTransaction $pl,  Erems_Models_Sales_Price $price,  Erems_Models_Sales_PriceAdmin $pa){
	  $hasil = 0;

	  $dcResult = $pl->getDCResult();



	  if(doubleval($pl->getTotal())==0){
	  return $hasil;
	  }







	  $hasil = $this->dbTable->SPUpdate('sp_pindahkavlingb_create',
	  $ck->getAddBy(),
	  $ck->getProject()->getId(),
	  $ck->getPt()->getId(),
	  $ck->getPurchaseletter()->getId(),
	  $pl->getUnit()->getId(),
	  $pl->getPriceType()->getId(),
	  $pl->getNomor(),
	  $pl->getDate(),
	  Erems_Box_Config::REVISIONTYPE_CHANGEKAVLING,
	  doubleval($pl->getRemainingBalance()),
	  doubleval($price->getPermeter()),
	  doubleval($price->getTanah()),
	  doubleval($price->getKelebihan()),
	  doubleval($price->getTotalKelebihan()),
	  doubleval($price->getBangunan()),
	  doubleval($price->getDiscountBangunan()),
	  doubleval($price->getAfterDiscountBangunan()),
	  doubleval($price->getPpnTanah()),
	  doubleval($price->getAfterPpnTanah()),
	  doubleval($price->getPpnBangunan()),
	  doubleval($price->getAfterPpnBangunan()),
	  doubleval($pa->getPrice()),
	  doubleval($pa->getPaketTambahan()),
	  doubleval($pa->getDiskon()),
	  doubleval($pa->getPriceDiskon()),
	  doubleval($price->getJualDasar()),
	  doubleval($price->getDiscountDasar()),
	  doubleval($price->getAfterDiscountDasar()),
	  doubleval($price->getNetto()),
	  doubleval($price->getBphtb()),
	  doubleval($price->getBbnSertifikat()),
	  doubleval($price->getBajb()),
	  doubleval($price->getJual()),
	  doubleval($pa->getSubsidi()),
	  doubleval($pa->getPMutu()),
	  doubleval($pl->getTotal()),
	  intval($ck->getReason()->getId()),
	  $ck->getNote(),
	  Erems_Box_Config::UNITSTATUS_SOLD,
	  Erems_Box_Config::UNITSTATUS_STOCK,
	  intval($pl->getBilling()->getId()),
	  doubleval($pl->getBilling()->getTandaJadi()->getQuantity()),
	  doubleval($pl->getBilling()->getTandaJadi()->getAmount()),
	  doubleval($pl->getBilling()->getUangMuka()->getQuantity()),
	  doubleval($pl->getBilling()->getUangMuka()->getAmount()),
	  doubleval($pl->getBilling()->getAngsuran()->getQuantity()),
	  doubleval($pl->getBilling()->getAngsuran()->getAmount()),
	  intval($pl->getBankKPR()->getId()),
	  intval($pl->getCollector()->getId()),
	  intval($pl->getRencanaSerahTerima()),
	  $pl->getRencanaSerahTerimaDate(),
	  $dcResult["schedule_id"],
	  $dcResult["scheduletype_id"],
	  $dcResult["duedate"],
	  $dcResult["amount"],
	  $dcResult["termin"]);

	  //$dcResult["schedule_id"], $dcResult["scheduletype_id"], $dcResult["termin"], $dcResult["duedate"], $dcResult["amount"],$dcResult["sourcemoney_sourcemoney_id"]






	  return $hasil;
	  }

	 */

	public function getEmailCN(Erems_Models_Sales_Change_ChangeName $cn, $approveUserId) {
		$hasil = array();
		$hasil = $this->dbTable->SPExecute('sp_changenameemail_read', $cn->getId(), $approveUserId);

		return $hasil;
	}

	public function getEmailCK(Erems_Models_Sales_Change_ChangeKavling $ck, $approveUserId) {
		$hasil = array();
		$hasil = $this->dbTable->SPExecute('sp_changekavlingemail_read', $ck->getId(), $approveUserId);

		return $hasil;
	}

	public function getEmailCP(Erems_Models_Sales_Change_ChangePrice $cp, $approveUserId) {
		$hasil = array();
		$hasil = $this->dbTable->SPExecute('sp_changepriceemail_read', $cp->getId(), $approveUserId);

		return $hasil;
	}

	public function getOneCN(Erems_Models_Sales_Change_ChangeName $cn) {
		$hasil = array();
		$hasil = $this->dbTable->SPExecute('sp_changenamedetail_read', $cn->getId());

		return $hasil;
	}

	public function getOneForPrintout(Erems_Models_Sales_Change_ChangeName $cn) {
		$hasil = array();
		$hasil = $this->dbTable->SPExecute('sp_changenameprintout_read', $cn->getId());

		return $hasil;
	}

	public function getOneCK(Erems_Models_Sales_Change_ChangeKavling $ck) {
		$hasil = array();
		$hasil = $this->dbTable->SPExecute('sp_pindahkavlingdetail_read', $ck->getId());

		return $hasil;
	}

	public function oneForPrintout(Erems_Models_Sales_Change_ChangeKavling $ck) {
		$hasil = array();
		$hasil = $this->dbTable->SPExecute('sp_pindahkavlingprintout_read', $ck->getId());

		return $hasil;
	}

	public function getOneCP(Erems_Models_Sales_Revision $prv) {
		$hasil = array();
		$id    = (int) $prv->getId();
		if($id > 0){
			$hasil = $this->dbTable->SPExecute('sp_changepricedetail_read', $id);
		}
		return $hasil;
	}

	public function getOneCPByCP(Erems_Models_Sales_Change_ChangePrice $cp) {
		$hasil = array();
		$id    = (int) $cp->getId();
		if($id > 0){
			$hasil = $this->dbTable->SPExecute('sp_changepricedetailbycp_read', $id);
		}
		return $hasil;
	}

	public function getScheduleChangePrice($revisiId) {
		$hasil = array();
		$hasil = $this->dbTable->SPExecute('sp_changepriceschedule_read', $revisiId);
		return $hasil;
	}

	public function getOnePrintout(Erems_Models_Sales_Revision $prv) {
		$hasil = array();
		$hasil = $this->dbTable->SPExecute('sp_changepriceprintout_read', $prv->getId());

		return $hasil;
	}

	//sp_changepriceprintout_read



	public function getAll(Erems_Models_Unit_UnitTran $unit, Erems_Box_Models_App_HasilRequestRead $r, Erems_Models_Sales_Change_ChangeName $cn) {
		$hasil = array();
		$hasil = $this->dbTable->SPExecute('sp_changename_read', $unit->getPt()->getId(), $unit->getProject()->getId(), $r->getPage(), $r->getLimit(), $cn->getPurchaseletter()->getNomor());

		return $hasil;
	}

	public function getAllFillter(Erems_Models_Unit_UnitTran $unit, Erems_Box_Models_App_HasilRequestRead $r, Erems_Models_Sales_Change_ChangeName $cn, Erems_Box_Kouti_Session $ses, $unitNumber, $customerName) {

		$hasil = array();
		$hasil = $this->dbTable->SPExecute('sp_changename_read', $unit->getPt()->getId(), $unit->getProject()->getId(), $r->getPage(), $r->getLimit(), $cn->getPurchaseletter()->getNomor(), $unitNumber, $customerName, 0, 999999999999);

		return $hasil;
	}

	public function getAllFillterHariKebelakang(Erems_Models_Unit_UnitTran $unit, Erems_Box_Models_App_HasilRequestRead $r, Erems_Models_Sales_Change_ChangeName $cn, Erems_Box_Kouti_Session $ses, $unitNumber, $customerName, $xhari) {

		$hasil = array();
		$hasil = $this->dbTable->SPExecute('sp_changenameharikebelakang_read', $unit->getPt()->getId(), $unit->getProject()->getId(), $r->getPage(), $r->getLimit(), $cn->getPurchaseletter()->getNomor(), $unitNumber, $customerName, 0, 999999999999, intval($xhari));

		return $hasil;
	}

	//remarked

	public function getAllFillterOld(Erems_Models_Unit_UnitTran $unit, Erems_Box_Models_App_HasilRequestRead $r, Erems_Models_Sales_Change_ChangeName $cn, $unitNumber, $customerName) {
		$hasil = array();
		$hasil = $this->dbTable->SPExecute('sp_changename_read', $unit->getPt()->getId(), $unit->getProject()->getId(), $r->getPage(), $r->getLimit(), $cn->getPurchaseletter()->getNomor(), $unitNumber, $customerName);

		return $hasil;
	}

	public function getAllFilterB($projectId, $ptId, $purchaseNomor, $unitNumber, $customerName, $feeBot = 0, $feeTop = 99999999) {
		$hasil = array();
		$hasil = $this->dbTable->SPExecute('sp_changename_read', $ptId, $projectId, 1, 25, $purchaseNomor, $unitNumber, $customerName, $feeBot, $feeTop);

		return $hasil;
	}

	public function getAllFilterC($projectId, $ptId, $purchaseletterId, $unitNumber, $customerName, $feeBot = 0, $feeTop = 99999999) {
		$hasil = array();
		$hasil = $this->dbTable->SPExecute('sp_changename_read', $ptId, $projectId, 1, 25, '', $unitNumber, $customerName, $feeBot, $feeTop, $purchaseletterId);

		return $hasil;
	}

	public function getAllFilterD($projectId, $ptId, $purchaseletterId, $unitNumber, $customerName, $feeBot = 0, $feeTop = 99999999) {
		$hasil = array();
		$hasil = $this->dbTable->SPExecute('sp_changenameb_read', $ptId, $projectId, 1, 25, '', $unitNumber, $customerName, $feeBot, $feeTop, $purchaseletterId);

		return $hasil;
	}

	public function getAllCK(Erems_Box_Models_App_HasilRequestRead $r, Erems_Models_Sales_Change_ChangeKavling $ck) {
		$hasil = array();
		$hasil = $this->dbTable->SPExecute('sp_changekavling_read', $ck->getProject()->getId(), $ck->getPt()->getId(), $r->getPage(), $r->getLimit());

		return $hasil;
	}

	public function getAllCKFilter(Erems_Box_Models_App_HasilRequestRead $r, Erems_Models_Sales_Change_ChangeKavling $ck, Erems_Box_Kouti_Session $ses) {
//        $hasil = array();
		$hasil = $this->dbTable->spToQuery('sp_changekavling_read', $ck->getProject()->getId(), $ck->getPt()->getId(), $r->getPage(), $r->getLimit(), $r->getOthersValue("purchaseletter_no"), $r->getOthersValue("unit_number"), $r->getOthersValue("customer_name"));

		return $hasil;
	}

	public function getAllCKFilterXhariBelakang(Erems_Box_Models_App_HasilRequestRead $r, Erems_Models_Sales_Change_ChangeKavling $ck, Erems_Box_Kouti_Session $ses, $xhari) {
		$hasil = $this->dbTable->spToQuery('sp_changekavlingxharibelakang_read', $ck->getProject()->getId(), $ck->getPt()->getId(), $r->getPage(), $r->getLimit(), $r->getOthersValue("purchaseletter_no"), $r->getOthersValue("unit_number"), substr($r->getOthersValue("customer_name"), 0, 100), intval($xhari));

		return $hasil;
	}

	public function getAllCP(Erems_Box_Models_App_HasilRequestRead $r, Erems_Models_Sales_Change_ChangePrice $cp, Erems_Box_Kouti_Session $ses) {
		$hasil = array();
		$hasil = $this->dbTable->SPExecute('sp_changeprice_read', $r->getPage(), $r->getLimit(), $ses->getProject()->getId(), $ses->getPt()->getId(), $r->getOthersValue("cluster_id"), $r->getOthersValue("block_id"), $r->getOthersValue("unit_number"), $r->getOthersValue("customer_name"));

		return $hasil;
	}

	public function getAllCPFilter(Erems_Box_Models_App_HasilRequestRead $r, Erems_Models_Sales_Change_ChangePrice $cp, Erems_Box_Kouti_Session $ses) {
		$hasil = array();

		if ($r->getOthersValue("block_id") == "") {
			$block_id = 0;
		} else {
			$block_id = $r->getOthersValue("block_id");
		}
		if ($r->getOthersValue("cluster_id") == "") {
			$cluster_id = 0;
		} else {
			$cluster_id = $r->getOthersValue("cluster_id");
		};

		$hasil = $this->dbTable->spToQuery('sp_changeprice_read', $r->getPage(), $r->getLimit(), $ses->getProject()->getId(), $ses->getPt()->getId(),
				$cluster_id, $block_id, $r->getOthersValue("unit_number"), $r->getOthersValue("customer_name"), $r->getOthersValue("purchaseletter_no"));

		return $hasil;
	}

	public function getAllCPFilterxHariBelakang(Erems_Box_Models_App_HasilRequestRead $r, Erems_Box_Kouti_Session $ses, $xhari) {
		$hasil = array();

		if ($r->getOthersValue("block_id") == "") {
			$block_id = 0;
		} else {
			$block_id = $r->getOthersValue("block_id");
		}
		if ($r->getOthersValue("cluster_id") == "") {
			$cluster_id = 0;
		} else {
			$cluster_id = $r->getOthersValue("cluster_id");
		};

		$hasil = $this->dbTable->spToQuery('sp_changepricexharibelakang_read', $r->getPage(), $r->getLimit(), $ses->getProject()->getId(), $ses->getPt()->getId(),
				$cluster_id, $block_id, $r->getOthersValue("unit_number"), $r->getOthersValue("customer_name"), $r->getOthersValue("purchaseletter_no"), $xhari);

		return $hasil;
	}

	// mark on 2017 09 14
	public function getAllCPFilterOld(Erems_Box_Models_App_HasilRequestRead $r, Erems_Models_Sales_Change_ChangePrice $cp, Erems_Box_Kouti_Session $ses) {
		$hasil = array();

		$hasil = $this->dbTable->SPExecute('sp_changeprice_read', $r->getPage(), $r->getLimit(), $ses->getProject()->getId(), $ses->getPt()->getId(),
				$r->getOthersValue("cluster_id"), $r->getOthersValue("block_id"), $r->getOthersValue("unit_number"), $r->getOthersValue("customer_name"), $r->getOthersValue("purchaseletter_no"));

		return $hasil;
	}

	public function getAllSoldUnitCP(Erems_Box_Models_App_HasilRequestRead $r, Erems_Models_Unit_UnitTran $ut) {
		$hasil = array();
		$project = $ut->getProject()->getId();
		$pt = $ut->getPt()->getId();
		if ($project == 0 || $pt == 0) {
			return $hasil;
		}

		$hasil = $this->dbTable->SPExecute('sp_unitb_forchangeprice_read', $project, $pt, $r->getPage(), $r->getLimit(), $ut->getStatus()->getId(), $ut->getNumber(), $ut->getBlock()->getId(), $r->getOthersValue('purchaseletter_no'), $r->getOthersValue('customer_name'));

		return $hasil;
	}

	public function getAllUnitCN(Erems_Box_Models_App_HasilRequestRead $r, Erems_Models_Unit_UnitTran $ut) {
		$hasil = array();
		$project = $ut->getProject()->getId();
		$pt = $ut->getPt()->getId();
		if ($project == 0 || $pt == 0) {
			return $hasil;
		}

		$hasil = $this->dbTable->SPExecute('sp_unitb_forchangename_read', $project, $pt, $r->getPage(), $r->getLimit(), $ut->getStatus()->getId(), $ut->getNumber(), $ut->getBlock()->getId(), $r->getOthersValue('purchaseletter_no'), $r->getOthersValue('customer_name'));

		return $hasil;
	}

	public function getAllUnitCK(Erems_Box_Models_App_HasilRequestRead $r, Erems_Models_Unit_UnitTran $ut) {
		$hasil = array();
		$project = $ut->getProject()->getId();
		$pt = $ut->getPt()->getId();
		if ($project == 0 || $pt == 0) {
			return $hasil;
		}

		$hasil = $this->dbTable->SPExecute('sp_unitb_forchangekavling_read', $project, $pt, $r->getPage(), $r->getLimit(), $ut->getStatus()->getId(), $ut->getNumber(), $ut->getBlock()->getId(), $r->getOthersValue('purchaseletter_no'), $r->getOthersValue('customer_name'));

		return $hasil;
	}

	public function oneScheduleByPL($plID) {
		$hasil = array();
		$hasil = $this->dbTable->execSP2('sp_purchasegetschedule_read', $plID);

		return $hasil;
	}

	public function getTotalRevisi($plID) {
		$hasil = array();

		$hasil = $this->dbTable->SPExecute('sp_totalrevisi_read', $plID);

		return $hasil;
	}

	public function getRevisiAndCancelRequest($purchaseId) {
		$hasil = array();

		$hasil = $this->dbTable->SPExecute('sp_revisiandcancelcheck_read', $purchaseId);

		return $hasil;
	}

	//rizal 4 April 2019
	public function getProjectDetail($project_id) {
		$hasil = $this->dbTable->SPExecute('sp_projectdetail_read', $project_id);
		//var_dump($pl);
		$result = $hasil[0][0];
		return $result;
	}

	//addby imaam on 20200915
	public function getOneCPbyId($cpId) {
		$hasil = array();
		$hasil = $this->dbTable->SPExecute('sp_changepricedetailbycp_read', $cpId);
		return $hasil;
	}

	public function getVoucherPending($purchaseId) {
		$hasil = array();
		// $dbCashier = new Erems_Box_Models_Dbtable_DbCashier();
		// $hasil = $dbCashier->execSP2('sp_check_voucher_gantung_bypl', $purchaseId);
		$hasil = $this->dbTable->execSP2('sp_check_voucher_gantung_bypl', $purchaseId);
		return $hasil;
	}

	// added by rico 07032023
	public function checkSppjb(Erems_Box_Models_App_HasilRequestRead $r, Erems_Box_Models_App_Session $ses){
        $hasil = array();
        // $hasil = $this->dbTable->SPExecute('sp_one_sppjb_read',194437,$ses->getProject()->getId(),$ses->getPt()->getId());
        $hasil = $this->dbTable->SPExecute('sp_one_sppjb_read',$r->getOthersValue('purchaseletter_id'),$ses->getProject()->getId(),$ses->getPt()->getId());

        $return['totalRow'] = count($hasil[0]);
        $return['data'] = $hasil[0];

        return $return;
	}

	public function deleteDocnpv($cpid) {
		$hasil = array();

		$hasil = $this->dbTable->SPExecute('sp_changepricedocnpv_update', $cpid);

		return $hasil;
	}

	public function updateDocnpv($cpid, $filedoc) {
		$hasil = array();

		$hasil = $this->dbTable->SPExecute('sp_changepricedocnpv_update', $cpid, $filedoc);

		return $hasil;
	}
}

?>
