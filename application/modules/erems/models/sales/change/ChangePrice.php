<?php

/**
 * Description of ChangePrice
 *
 * @author MIS
 */
class Erems_Models_Sales_Change_ChangePrice extends Erems_Models_Sales_Change implements Erems_Box_Kouti_Remora {

	private $newPrice;
	private $price;
	private $priceAdmin;
	private $unitType;
	private $propertyInfo;
	private $priceType;
	private $totalJual;
	private $totalJualNew;
	private $bankKPR;
	private $notesNew;
	private $billingRulesIdOld;
	private $billingRulesIdNew;
	private $rencanaSerahTerima;
	private $rencanaSerahTerimaDate;
	private $HargaPembulatanNew;
	private $billingRules;
	private $billingRulesTermTandaJadi;
	private $billingRulesTandaJadi;
	private $billingRulesTermUangMuka;
	private $billingRulesUangMuka;
	private $billingRulesTermAngsuran;
	private $billingRulesAngsuran;
    private $isUsedVerification;
    private $npv_doc_approved;

	public function __construct() {
		parent::__construct();
		$this->embedPrefix = "changeprice_";
		$this->newPrice    = new Erems_Models_Sales_Price("pricenew_");
		$this->price       = new Erems_Models_Sales_Price();
	}

	public function getNewPrice() {
		if (!$this->newPrice) {
			$this->newPrice = new Erems_Models_Sales_Price("pricenew_");
		}
		return $this->newPrice;
	}

	public function setNewPrice(Erems_Models_Sales_Price $newPrice) {
		$this->newPrice = $newPrice;
	}

	public function getPrice() {
		if (!$this->price) {
			$this->price = new Erems_Models_Sales_Price();
		}
		return $this->price;
	}

	public function setPrice(Erems_Models_Sales_Price $price) {
		$this->price = $price;
	}

	public function getUnitType() {
		if (!$this->unitType) {
			$this->unitType = new Erems_Models_Master_Type();
		}
		return $this->unitType;
	}

	public function setUnitType(Erems_Models_Master_Type $unitType) {
		$this->unitType = $unitType;
	}

	public function getPropertyInfo() {
		if (!$this->propertyInfo) {
			$this->propertyInfo = new Erems_Models_Unit_PropertyInfo();
		}
		return $this->propertyInfo;
	}

	public function setPropertyInfo(Erems_Models_Unit_PropertyInfo $propertyInfo) {
		$this->propertyInfo = $propertyInfo;
	}

	public function getPriceAdmin() {
		if (!$this->priceAdmin) {
			$this->priceAdmin = new Erems_Models_Sales_PriceAdmin();
		}
		return $this->priceAdmin;
	}

	public function setPriceAdmin(Erems_Models_Sales_PriceAdmin $priceAdmin) {
		$this->priceAdmin = $priceAdmin;
	}

	public function getPriceType() {
		if (!$this->priceType) {
			$this->priceType = new Erems_Models_Sales_PriceType();
		}
		return $this->priceType;
	}

	public function setPriceType(Erems_Models_Sales_PriceType $priceType) {
		$this->priceType = $priceType;
	}

	public function getTotalJual() {
		return $this->totalJual;
	}

	public function setTotalJual($totalJual) {
		$this->totalJual = $totalJual;
	}

	public function getTotalJualNew() {
		return $this->totalJualNew;
	}

	public function setTotalJualNew($totalJualNew) {
		$this->totalJualNew = $totalJualNew;
	}


	public function getBankKPR() {
		if (!$this->bankKPR) {
			$this->bankKPR = new Erems_Models_Master_Bank();
		}
		return $this->bankKPR;
	}

	public function setBankKPR(Erems_Models_Master_Bank $bankKPR) {
		$this->bankKPR = $bankKPR;
	}
	
	public function getBillingRules() {
		if (!$this->billingRules) {
			$this->billingRules = new Erems_Models_Sales_BillingRules();
		}
		return $this->billingRules;
	}

	public function setBillingRules(Erems_Models_Sales_BillingRules $billingRules) {
		$this->billingRules = $billingRules;
	}

	function getNotesNew() {
		return $this->notesNew;
	}

	function setNotesNew($notesNew) {
		$this->notesNew = $notesNew;
	}

	function getBillingRulesIdOld() {
		return $this->billingRulesIdOld;
	}

	function getBillingRulesIdNew() {
		return $this->billingRulesIdNew;
	}

	function setBillingRulesIdOld($billingRulesIdOld) {
		$this->billingRulesIdOld = $billingRulesIdOld;
	}

	function setBillingRulesIdNew($billingRulesIdNew) {
		$this->billingRulesIdNew = $billingRulesIdNew;
	}

	function getRencanaSerahTerima() {
		return $this->rencanaSerahTerima;
	}

	function getRencanaSerahTerimaDate() {
		return $this->rencanaSerahTerimaDate;
	}

	function setRencanaSerahTerima($rencanaSerahTerima) {
		$this->rencanaSerahTerima = $rencanaSerahTerima;
	}

	function setRencanaSerahTerimaDate($rencanaSerahTerimaDate) {
		$this->rencanaSerahTerimaDate = $rencanaSerahTerimaDate;
	}

	function getHargaPembulatanNew() {
		return $this->HargaPembulatanNew;
	}

	function setHargaPembulatanNew($HargaPembulatanNew) {
		$this->HargaPembulatanNew = $HargaPembulatanNew;
	}

	function getBillingRulesTermTandaJadi() {
		return $this->billingRulesTermTandaJadi;
	}

	function getBillingRulesTandaJadi() {
		return $this->billingRulesTandaJadi;
	}

	function getBillingRulesTermUangMuka() {
		return $this->billingRulesTermUangMuka;
	}

	function getBillingRulesUangMuka() {
		return $this->billingRulesUangMuka;
	}

	function getBillingRulesTermAngsuran() {
		return $this->billingRulesTermAngsuran;
	}

	function getBillingRulesAngsuran() {
		return $this->billingRulesAngsuran;
	}

	function setBillingRulesTermTandaJadi($billingRulesTermTandaJadi) {
		$this->billingRulesTermTandaJadi = $billingRulesTermTandaJadi;
	}

	function setBillingRulesTandaJadi($billingRulesTandaJadi) {
		$this->billingRulesTandaJadi = $billingRulesTandaJadi;
	}

	function setBillingRulesTermUangMuka($billingRulesTermUangMuka) {
		$this->billingRulesTermUangMuka = $billingRulesTermUangMuka;
	}

	function setBillingRulesUangMuka($billingRulesUangMuka) {
		$this->billingRulesUangMuka = $billingRulesUangMuka;
	}

	function setBillingRulesTermAngsuran($billingRulesTermAngsuran) {
		$this->billingRulesTermAngsuran = $billingRulesTermAngsuran;
	}

	function setBillingRulesAngsuran($billingRulesAngsuran) {
		$this->billingRulesAngsuran = $billingRulesAngsuran;
	}

	public function setArrayTable($dataArray = NULL) {
		parent::setArrayTable($dataArray);
		$x = $dataArray == NULL ? $this->arrayTable : $dataArray;
		if (isset($x['changeprice_id'])) {
			$this->setId($x['changeprice_id']);
		}
		if (isset($x['type_id_new'])) {
			$this->getUnitType()->setId($x['type_id_new']);
		}
		if (isset($x['landsize_new'])) {
			$this->getPropertyInfo()->setLandSize($x['landsize_new']);
		}
		if (isset($x['kelebihan_new'])) {
			$this->getPropertyInfo()->setKelebihanTanah($x['kelebihan_new']);
		}
		if (isset($x['buildingsize_new'])) {
			$this->getPropertyInfo()->setBuildingSize($x['buildingsize_new']);
		}
		if (isset($x['pricetype_id_new'])) {
			$this->getPriceType()->setId($x['pricetype_id_new']);
		}
		if (isset($x['purchaseletter_id'])) {
			$this->getPurchaseletter()->setId($x['purchaseletter_id']);
		}
		if (isset($x['changeprice_date'])) {
			$this->setDate($x['changeprice_date']);
		}
		if (isset($x['harga_total_jual'])) {
			$this->setTotalJual($x['harga_total_jual']);
		}
		if (isset($x['harga_total_jual_new'])) {
			$this->setTotalJualNew($x['harga_total_jual_new']);
		}
		if (isset($x['change_note'])) {
			$this->setNote($x['change_note']);
		}

		if (isset($x['notes_new'])) {
			$this->setNotesNew($x['notes_new']);
		}

		if (isset($x['purchaseletterrevision_purchaseletterrevision_id'])) {
			$this->getRevision()->setId($x['purchaseletterrevision_purchaseletterrevision_id']);
		}
		
		if (isset($x['billingrules_billingrules_id'])) {
			$this->getBillingRules()->setId($x['billingrules_billingrules_id']);
		}

		if (isset($x['billingrules_id_new'])) {
			$this->setBillingRulesIdNew($x['billingrules_id_new']);
		}

		if (isset($x['billingrules_id_old'])) {
			$this->setBillingRulesIdOld($x['billingrules_id_old']);
		}

		if (isset($x['rencana_serahterima'])) {
			$this->setRencanaSerahTerima($x['rencana_serahterima']);
		}

		if (isset($x['rencana_serahterima_date'])) {
			$this->setRencanaSerahTerimaDate($x['rencana_serahterima_date']);
		}

		if (isset($x['harga_pembulatan_new'])) {
			$this->setHargaPembulatanNew($x['harga_pembulatan_new']);
		}

		if (isset($x['billingrules_term_tandajadi'])) {
			$this->setBillingRulesTermTandaJadi($x['billingrules_term_tandajadi']);
		}
		
		if (isset($x['billingrules_tandajadi'])) {
			$this->setBillingRulesTandaJadi($x['billingrules_tandajadi']);
		}

		if (isset($x['billingrules_term_uangmuka'])) {
			$this->setBillingRulesTermUangMuka($x['billingrules_term_uangmuka']);
		}

		if (isset($x['billingrules_uangmuka'])) {
			$this->setBillingRulesUangMuka($x['billingrules_uangmuka']);
		}

		if (isset($x['billingrules_term_angsuran'])) {
			$this->setBillingRulesTermAngsuran($x['billingrules_term_angsuran']);
		}

		if (isset($x['billingrules_angsuran'])) {
			$this->setBillingRulesAngsuran($x['billingrules_angsuran']);
		}
                
        if(isset ($x['is_used_verification'])){
          $this->setIsUsedVerification($x['is_used_verification']);
        }
                
        if(isset ($x['npv_doc_approved'])){
          $this->setNPVDocapproved($x['npv_doc_approved']);
        }
	}

	public function getArrayTable() {
		//$x = parent::getArrayTable();
		$x = array(
			"changeprice_id"                                   => $this->getId(),
			"type_id_new"                                      => $this->getUnitType()->getId(),
			"landsize_new"                                     => $this->getPropertyInfo()->getLandSize(),
			"kelebihan_new"                                    => $this->getPropertyInfo()->getKelebihanTanah(),
			"buildingsize_new"                                 => $this->getPropertyInfo()->getBuildingSize(),
			"pricetype_id_new"                                 => $this->getPriceType()->getId(),
			"purchaseletter_id"                                => $this->getPurchaseletter()->getId(),
			"changeprice_date"                                 => $this->getDate(),
			"harga_total_jual"                                 => $this->getTotalJual(),
			"harga_total_jual_new"                             => $this->getTotalJualNew(),
			"change_note"                                      => $this->getNote(),
			"notes_new"                                        => $this->getNotesNew(),
			"purchaseletterrevision_purchaseletterrevision_id" => $this->getRevision()->getId(),
			"billingrules_id_new"                              => $this->getBillingRulesIdNew(),
			"billingrules_billingrules_id"                     => $this->getBillingRules()->getId(),
			"billingrules_id_old"                              => $this->getBillingRulesIdOld(),
			"rencana_serahterima"                              => $this->getRencanaSerahTerima(),
			"rencana_serahterima_date"                         => $this->getRencanaSerahTerimaDate(),
			"harga_pembulatan_new"                             => $this->getHargaPembulatanNew(),
			"billingrules_term_tandajadi"                      => $this->getBillingRulesTermTandaJadi(),
			"billingrules_tandajadi"                           => $this->getBillingRulesTandaJadi(),
			"billingrules_term_uangmuka"                       => $this->getBillingRulesTermUangMuka(),
			"billingrules_uangmuka"                            => $this->getBillingRulesUangMuka(),
			"billingrules_term_angsuran"                       => $this->getBillingRulesTermAngsuran(),
			"billingrules_angsuran"                            => $this->getBillingRulesAngsuran(),
			'is_used_verification'                             => $this->getIsUsedVerification(),
			'npv_doc_approved'                                 => $this->getNPVDocapproved(),
		);
		return $x;
	}

	public function fillData($data) {
		$this->setArrayTable($data);
	}

	public function grouped() {
		return array($this->getNewPrice(), $this->getPrice(), $this->getBankKPR(), $this->getPurchaseletter());
	}

	protected function getDatefields() {
		return array("changeprice_date");
	}
        
    public function getIsUsedVerification() {
        return $this->isUsedVerification;
    }

    public function setIsUsedVerification($isUsedVerification) {
        $this->isUsedVerification = $isUsedVerification;
    }

	public function getNPVDocapproved() {
		return $this->npv_doc_approved;
	}

	public function setNPVDocapproved($npv_doc_approved) {
		$this->npv_doc_approved = $npv_doc_approved;
	}
}

?>
