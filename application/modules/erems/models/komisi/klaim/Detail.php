<?php

/**
 * Description of KlaimKomisiDetail
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Komisi_Klaim_Detail extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Kouti_Remora {

	private $klaimkomisi;
	private $purchaseletter;
	private $nilai_komisi;
	private $ppn;
	private $pph;
	private $pphpt;
	private $nilai_bayar;
	private $komisitran_id;

	public function __construct() {
		parent::__construct();
		$this->embedPrefix = "klaimkomisidetail_";
	}

	public function setArrayTable($dataArray = NULL) {
		$x = $dataArray == NULL ? $this->arrayTable : $dataArray;
		if (isset($x["klaimkomisidetail_id"])) {
			$this->setid($x["klaimkomisidetail_id"]);
		}
		if (isset($x["klaimkomisi_klaimkomisi_id"])) {
			$this->getKlaimkomisi()->setId($x["klaimkomisi_klaimkomisi_id"]);
		}
		if (isset($x["purchaseletter_purchaseletter_id"])) {
			$this->getPurchaseletter()->setId($x["purchaseletter_purchaseletter_id"]);
		}
		if (isset($x["nilai_komisi"])) {
			$this->setNilai_komisi($x["nilai_komisi"]);
		}
		if (isset($x["ppn"])) {
			$this->setPpn($x["ppn"]);
		}
		if (isset($x["pph"])) {
			$this->setPph($x["pph"]);
		}
		if (isset($x["pphpt"])) {
			$this->setPphPt($x["pphpt"]);
		}
		if (isset($x["nilai_bayar"])) {
			$this->setNilai_bayar($x["nilai_bayar"]);
		}
		if (isset($x["komisitran_komisitran_id"])) {
			$this->setKomisitran_id($x["komisitran_komisitran_id"]);
		}


		unset($x);
	}

	public function getArrayTable() {
		$x = array(
			"klaimkomisidetail_id" => $this->getId(),
			"klaimkomisi_klaimkomisi_id" => $this->getKlaimkomisi()->getId(),
			"purchaseletter_purchaseletter_id" => $this->getPurchaseletter()->getId(),
			"nilai_komisi" => $this->getNilai_komisi(),
			"ppn" => $this->getPpn(),
			"pph" => $this->getPph(),
			"pphpt" => $this->getPphpt(),
			"nilai_bayar" => $this->getNilai_bayar(),
			"komisitran_komisitran_id" => $this->getKomisitran_id(),
		);

		return $x;
	}

	function getKlaimkomisi() {
		if (!$this->klaimkomisi) {
			$this->klaimkomisi = new Erems_Models_Komisi_Klaim_Klaim();
		}
		return $this->klaimkomisi;
	}

	function getPurchaseletter() {
		if (!$this->purchaseletter) {
			$this->purchaseletter = new Erems_Models_Purchaseletter_PurchaseLetter();
		}
		return $this->purchaseletter;
	}

	function setKlaimkomisi(Erems_Models_Komisi_Klaim_Klaim $klaimkomisi) {
		$this->klaimkomisi = $klaimkomisi;
	}

	function setPurchaseletter(Erems_Models_Purchaseletter_PurchaseLetter $purchaseletter) {
		$this->purchaseletter = $purchaseletter;
	}

	function getNilai_komisi() {
		return $this->nilai_komisi;
	}

	function getPpn() {
		return $this->ppn;
	}

	function getPph() {
		return $this->pph;
	}

	function getPphPt() {
		return $this->pphpt;
	}

	function getKomisitran_id() {
		return $this->komisitran_id;
	}

	function setNilai_komisi($nilai_komisi) {
		$this->nilai_komisi = $nilai_komisi;
	}

	function setPpn($ppn) {
		$this->ppn = $ppn;
	}

	function setPph($pph) {
		$this->pph = $pph;
	}

	function setPphPt($pphpt) {
		$this->pphpt = $pphpt;
	}

	function getNilai_bayar() {
		return $this->nilai_bayar;
	}

	function setNilai_bayar($nilai_bayar) {
		$this->nilai_bayar = $nilai_bayar;
	}

	function setKomisitran_id($komisitran_id) {
		$this->komisitran_id = $komisitran_id;
	}

	public function fillData($data) {
		$this->setArrayTable($data);
	}

	public function grouped() {
		return array();
	}

}
