<?php

/**
 * Description of MarketingStock
 *
 * @author MIS
 */
class Erems_Models_Marketingstock_MarketingStock extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Kouti_Remora, Erems_Box_Delien_DelimiterCandidate {

	private $unit;
	private $tunjanganUangMuka;
	private $hargaTanahNJOP;
	private $hargaJualKPR;
	private $hargaJualTunai;
	private $hargaJualInHouse;
	private $detail;
	private $DCResult;
	private $minimumTandaJadi;
	private $ptptID;
	private $typetypeID;
	private $landSize;
	private $buildingSize;
	private $floor;
	private $floorSize;
	private $bedroom;
	private $bathroom;
	private $uWidth;
	private $long;
	private $kelebihan;
	private $electricity;
	private $default_type;
	private $default_land;
	private $default_kelebihan;
	private $is_holdmanagement;
	private $notes_holdmanagement;
	private $state_admistrative;
	private $savetoAll;
	private $nama_type;

	public function __construct($embedPrefix = NULL) {
		parent::__construct();
		$this->embedPrefix = $embedPrefix == NULL ? 'marketingstock_' : $embedPrefix;
	}

	public function setArrayTable($dataArray = NULL) {

		$x = $dataArray == NULL ? $this->arrayTable : $dataArray;

		if (isset($x['marketstock_id'])) { $this->setId($x['marketstock_id']);}
		if (isset($x['tunjangan_uangmuka'])) {$this->setTunjanganUangMuka($x['tunjangan_uangmuka']);}
		if (isset($x['hargatanah_njop'])) {$this->setHargaTanahNJOP($x['hargatanah_njop']);}
		if (isset($x['hargajual_kpr'])) {$this->setHargaJualKPR($x['hargajual_kpr']);}
		if (isset($x['hargajual_tunai'])) {$this->setHargaJualTunai($x['hargajual_tunai']);}
		if (isset($x['hargajual_inhouse'])) {$this->setHargaJualInHouse($x['hargajual_inhouse']);}
		if (isset($x['minimum_tj'])) {$this->setMinimumTandaJadi($x['minimum_tj']);}
		if (isset($x['pt_pt_id'])) {$this->setPtptID($x['pt_pt_id']);}
		if (isset($x['type_type_id'])) {$this->setTypetypeID($x['type_type_id']);}
		if (isset($x['default_type'])) {$this->setDefaultType($x['default_type']);}
		if (isset($x['default_land'])) {$this->setDefaultLand($x['default_land']);}
		if (isset($x['default_kelebihan'])) {$this->setDefaultKelebihan($x['default_kelebihan']);}
		if (isset($x['land_size'])) {$this->setLandSize($x['land_size']);}
		if (isset($x['building_size'])) {$this->setBuildingSize($x['building_size']);}
		if (isset($x['floor'])) {$this->setFloor($x['floor']);}
		if (isset($x['floor_size'])) {$this->setFloorSize($x['floor_size']);}
		if (isset($x['bedroom'])) {$this->setBedroom($x['bedroom']);}
		if (isset($x['bathroom'])) {$this->setBathroom($x['bathroom']);}
		if (isset($x['width'])) {$this->setUWidth($x['width']);}
		if (isset($x['long'])) {$this->setLong($x['long']);}
		if (isset($x['kelebihan'])) {$this->setKelebihan($x['kelebihan']);}
		if (isset($x['electricity'])) {$this->setElectricity($x['electricity']);}
		if (isset($x['is_holdmanagement'])) {$this->setIsHoldManagement($x['is_holdmanagement']);}
		if (isset($x['notes_holdmanagement'])) {$this->setNotesHoldManagement($x['notes_holdmanagement']);}
		if (isset($x['state_admistrative'])) {$this->setStateAdmistrative($x['state_admistrative']);}
		if (isset($x['savetoAll'])) {$this->setSavetoAll($x['savetoAll']);}
		if (isset($x['nama_type'])) {$this->setNamaType($x['nama_type']);}
		unset($x);
	}

	public function getArrayTable() {
		$x = array(
			"marketstock_id"       => $this->getId(),
			"tunjangan_uangmuka"   => $this->getTunjanganUangMuka(),
			"hargatanah_njop"      => $this->getHargaTanahNJOP(),
			"hargajual_kpr"        => $this->getHargaJualKPR(),
			"hargajual_tunai"      => $this->getHargaJualTunai(),
			"hargajual_inhouse"    => $this->getHargaJualInHouse(),
			"minimum_tj"           => $this->getMinimumTandaJadi(),
			"pt_pt_id"             => $this->getPtptID(),
			"type_type_id"         => $this->getTypetypeID(),
			"land_size"            => $this->getLandSize(),
			"building_size"        => $this->getBuildingSize(),
			"floor"                => $this->getFloor(),
			"floor_size"           => $this->getFloorSize(),
			"bedroom"              => $this->getBedroom(),
			"bathroom"             => $this->getBathroom(),
			"width"                => $this->getUWidth(),
			"long"                 => $this->getLong(),
			"kelebihan"            => $this->getKelebihan(),
			"electricity"          => $this->getElectricity(),
			"default_type"         => $this->getDefaultType(),
			"default_land"         => $this->getDefaultLand(),
			"default_kelebihan"    => $this->getDefaultKelebihan(),
			"is_holdmanagement"    => $this->getIsHoldManagement(),
			"notes_holdmanagement" => $this->getNotesHoldManagement(),
			"state_admistrative"   => $this->getStateAdmistrative(),
			"savetoAll"            => $this->getSavetoAll(),
			"nama_type"            => $this->getNamaType(),
		);

		return $x;
	}

	public function getElectricity() {
		return $this->electricity;
	}

	public function setElectricity($electricity) {
		$this->electricity = $electricity;
	}

	public function getKelebihan() {
		return $this->kelebihan;
	}

	public function setKelebihan($kelebihan) {
		$this->kelebihan = $kelebihan;
	}

	public function getLong() {
		return $this->long;
	}

	public function setLong($long) {
		$this->long = $long;
	}

	public function getUWidth() {
		return $this->uWidth;
	}

	public function setUWidth($uWidth) {
		$this->uWidth = $uWidth;
	}

	public function getBathroom() {
		return $this->bathroom;
	}

	public function setBathroom($bathroom) {
		$this->bathroom = $bathroom;
	}

	public function getBedroom() {
		return $this->bedroom;
	}

	public function setBedroom($bedroom) {
		$this->bedroom = $bedroom;
	}

	public function getFloorSize() {
		return $this->floorSize;
	}

	public function setFloorSize($floorSize) {
		$this->floorSize = $floorSize;
	}

	public function getFloor() {
		return $this->floor;
	}

	public function setFloor($floor) {
		$this->floor = $floor;
	}

	public function getBuildingSize() {
		return $this->buildingSize;
	}

	public function setBuildingSize($buildingSize) {
		$this->buildingSize = $buildingSize;
	}

	public function getLandSize() {
		return $this->landSize;
	}

	public function setLandSize($landSize) {
		$this->landSize = $landSize;
	}

	public function getPtptID() {
		return $this->ptptID;
	}

	public function setPtptID($ptptID) {
		$this->ptptID = $ptptID;
	}

	public function getTypetypeID() {
		return $this->typetypeID;
	}

	public function setTypetypeID($typetypeID) {
		$this->typetypeID = $typetypeID;
	}

	public function getDefaultType() {
		return $this->default_type;
	}

	public function setDefaultType($default_type) {
		$this->default_type = $default_type;
	}

	public function getDefaultLand() {
		return $this->default_land;
	}

	public function setDefaultLand($default_land) {
		$this->default_land = $default_land;
	}

	public function getDefaultKelebihan() {
		return $this->default_kelebihan;
	}

	public function setDefaultKelebihan($default_kelebihan) {
		$this->default_kelebihan = $default_kelebihan;
	}

	public function getUnit() {
		if (!$this->unit) {
			$this->unit = new Erems_Models_Unit_UnitTran();
		}
		return $this->unit;
	}

	public function setUnit(Erems_Models_Unit_UnitTran $unit) {
		$this->unit = $unit;
	}

	public function getTunjanganUangMuka() {
		return $this->tunjanganUangMuka;
	}

	public function setTunjanganUangMuka($tunjanganUangMuka) {
		$this->tunjanganUangMuka = $tunjanganUangMuka;
	}

	public function getHargaTanahNJOP() {
		return $this->hargaTanahNJOP;
	}

	public function setHargaTanahNJOP($hargaTanahNJOP) {
		$this->hargaTanahNJOP = $hargaTanahNJOP;
	}

	public function getHargaJualKPR() {
		return $this->hargaJualKPR;
	}

	public function setHargaJualKPR($hargaJualKPR) {
		$this->hargaJualKPR = $hargaJualKPR;
	}

	public function getHargaJualTunai() {
		return $this->hargaJualTunai;
	}

	public function setHargaJualTunai($hargaJualTunai) {
		$this->hargaJualTunai = $hargaJualTunai;
	}

	public function getHargaJualInHouse() {
		return $this->hargaJualInHouse;
	}

	public function setHargaJualInHouse($hargaJualInHouse) {
		$this->hargaJualInHouse = $hargaJualInHouse;
	}

	public function fillData($data) {
		$this->setArrayTable($data);
	}

	public function grouped() {
		return array($this->getUnit());
	}

	public function getDCArray() {
		return $this->detail;
	}

	public function getDCResult() {
		return $this->DCResult;
	}

	public function setDCArray($delimiteredArray) {
		$this->DCResult = $delimiteredArray;
	}

	function getMinimumTandaJadi() {
		return $this->minimumTandaJadi;
	}

	function setMinimumTandaJadi($minimumTandaJadi) {
		$this->minimumTandaJadi = $minimumTandaJadi;
	}

	public function addPrice(Erems_Models_Sales_Price $price) {
		$this->detail[] = $price;
	}

	public function getDetail($pos = 0) {
		if ($pos == 0) {
			return $this->detail;
		} else {
			return $this->detail[$pos];
		}
	}

	public function getIsHoldManagement() {
		return $this->is_holdmanagement;
	}

	public function setIsHoldManagement($is_holdmanagement) {
		$this->is_holdmanagement = $is_holdmanagement;
	}

	public function getNotesHoldManagement() {
		return $this->notes_holdmanagement;
	}

	public function setNotesHoldManagement($notes_holdmanagement) {
		$this->notes_holdmanagement = $notes_holdmanagement;
	}

	public function getStateAdmistrative() {
		return $this->state_admistrative;
	}

	public function setStateAdmistrative($state_admistrative) {
		$this->state_admistrative = $state_admistrative;
	}

	public function getSavetoAll() {
		return $this->savetoAll;
	}

	public function setSavetoAll($savetoAll) {
		$this->savetoAll = $savetoAll;
	}

	public function getNamaType() {
		return $this->nama_type;
	}

	public function setNamaType($nama_type) {
		$this->nama_type = $nama_type;
	}
}
?>
