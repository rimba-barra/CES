<?php

/**
 * Description of KlaimKomisi
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Komisi_Klaim_Klaim extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Kouti_Remora, Erems_Box_Models_Master_InterProjectPt {

	private $project;
	private $pt;
	private $nomor_invoice_agent;
	private $tipe_agent;
	private $agent_id;
	private $npwp;
	private $tgl_pengajuan;
	private $nomor_pengajuan;
	private $note;
	private $nilai_komisi;
	private $pph;
	private $pphpt;
	private $ppn;
	private $total_bayar;
	private $details;

	public function __construct() {
		parent::__construct();
		$this->embedPrefix = "klaimkomisi_";
		$this->details = array();
	}

	public function setArrayTable($dataArray = NULL) {
		$x = $dataArray == NULL ? $this->arrayTable : $dataArray;
		if (isset($x["klaimkomisi_id"])) {
			$this->setId($x["klaimkomisi_id"]);
		}

		if (isset($x["nomor_invoice_agent"])) {
			$this->setNomor_invoice_agent($x["nomor_invoice_agent"]);
		}
		if (isset($x["tipe_agent"])) {
			$this->setTipe_agent($x["tipe_agent"]);
		}
		if (isset($x["agent_id"])) {
			$this->setAgent_id($x["agent_id"]);
		}
		if (isset($x["npwp"])) {
			$this->setNpwp($x["npwp"]);
		}
		if (isset($x["tgl_pengajuan"])) {
			$this->setTgl_pengajuan($x["tgl_pengajuan"]);
		}
		if (isset($x["nomor_pengajuan"])) {
			$this->setNomor_pengajuan($x["nomor_pengajuan"]);
		}
		if (isset($x["note"])) {
			$this->setNote($x["note"]);
		}
		if (isset($x["nilai_komisi"])) {
			$this->setNilai_komisi($x["nilai_komisi"]);
		}
		if (isset($x["pph"])) {
			$this->setPph($x["pph"]);
		}
		if (isset($x["pphpt"])) {
			$this->setPphpt($x["pphpt"]);
		}
		if (isset($x["ppn"])) {
			$this->setPpn($x["ppn"]);
		}
		if (isset($x["total_bayar"])) {
			$this->setTotal_bayar($x["total_bayar"]);
		}



		unset($x);
	}

	public function getArrayTable() {
		$x = array(
			"klaimkomisi_id" => $this->getId(),
			"nomor_invoice_agent" => $this->getNomor_invoice_agent(),
			"tipe_agent" => $this->getTipe_agent(),
			"agent_id" => $this->getAgent_id(),
			"npwp" => $this->getNpwp(),
			"tgl_pengajuan" => $this->getTgl_pengajuan(),
			"nomor_pengajuan" => $this->getNomor_pengajuan(),
			"note" => $this->getNote(),
			"nilai_komisi" => $this->getNilai_komisi(),
			"pph" => $this->getPph(),
			"pphpt" => $this->getPphpt(),
			"ppn" => $this->getPpn(),
			"total_bayar" => $this->getTotal_bayar()
		);

		return $x;
	}

	function getDetails() {
		return $this->details;
	}

	function addDetail(Erems_Models_Komisi_Klaim_Detail $detail) {
		$this->details[] = $detail;
	}

	function getNomor_invoice_agent() {
		return $this->nomor_invoice_agent;
	}

	function getAgent_id() {
		return $this->agent_id;
	}

	function getNpwp() {
		return $this->npwp;
	}

	function getTgl_pengajuan() {
		return $this->tgl_pengajuan;
	}

	function getNomor_pengajuan() {
		return $this->nomor_pengajuan;
	}

	function getNote() {
		return $this->note;
	}

	function getNilai_komisi() {
		return $this->nilai_komisi;
	}

	function getPph() {
		return $this->pph;
	}

	function getPphpt() {
		return $this->pphpt;
	}

	function getPpn() {
		return $this->ppn;
	}

	function getTotal_bayar() {
		return $this->total_bayar;
	}

	function setNomor_invoice_agent($nomor_invoice_agent) {
		$this->nomor_invoice_agent = $nomor_invoice_agent;
	}

	function setAgent_id($agent_id) {
		$this->agent_id = $agent_id;
	}

	function setNpwp($npwp) {
		$this->npwp = $npwp;
	}

	function setTgl_pengajuan($tgl_pengajuan) {
		$this->tgl_pengajuan = $tgl_pengajuan;
	}

	function setNomor_pengajuan($nomor_pengajuan) {
		$this->nomor_pengajuan = $nomor_pengajuan;
	}

	function setNote($note) {
		$this->note = $note;
	}

	function setNilai_komisi($nilai_komisi) {
		$this->nilai_komisi = $nilai_komisi;
	}

	function setPph($pph) {
		$this->pph = $pph;
	}

	function setPphpt($pphpt) {
		$this->pphpt = $pphpt;
	}

	function setPpn($ppn) {
		$this->ppn = $ppn;
	}

	function setTotal_bayar($total_bayar) {
		$this->total_bayar = $total_bayar;
	}

	function getTipe_agent() {
		return $this->tipe_agent;
	}

	function setTipe_agent($tipe_agent) {
		$this->tipe_agent = $tipe_agent;
	}

	public function fillData($data) {
		$this->setArrayTable($data);
	}

	public function getProject() {
		if (!$this->project) {
			$this->project = new Erems_Box_Models_Master_Project();
		}
		return $this->project;
	}

	public function getPt() {
		if (!$this->pt) {
			$this->pt = new Erems_Box_Models_Master_Pt();
		}
		return $this->pt;
	}

	public function setProject(\Erems_Box_Models_Master_Project $project) {
		$this->project = $project;
	}

	public function setPt(\Erems_Box_Models_Master_Pt $pt) {
		$this->pt = $pt;
	}

	public function grouped() {
		return array();
	}

}
