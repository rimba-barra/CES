<?php

/**
 * Description of MasterKomisi
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Komisi_Master_MasterKomisi extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Kouti_Remora, Erems_Box_Models_Master_InterProjectPt {

	private $project;
	private $pt;
	private $code;
	private $nama;
	private $ybs;
	private $sales_co;
	private $head_sales;
	private $head_adm;
	private $team;
	private $kas;
	private $manager_marketing;
	private $pph;
	private $definisi_kc;
	private $ppn;
	## Add by RH 18/11/2019 ##
	private $manager_marketing2;
	private $gm_sales_marketing;
	private $assdir_sales_marketing;
	private $support_proyek;
	private $support1;
	private $gm_sales_marketing1;
	private $pph_pt;

	## END Add by RH 18/11/2019 ##

	public function __construct() {
		parent::__construct();
		$this->embedPrefix = "komisi_";
	}

	public function setArrayTable($dataArray = NULL) {
		$x = $dataArray == NULL ? $this->arrayTable : $dataArray;
		if (isset($x["komisi_id"])) {
			$this->setid($x["komisi_id"]);
		}
		if (isset($x["code"])) {
			$this->setCode($x["code"]);
		}
		if (isset($x["nama"])) {
			$this->setNama($x["nama"]);
		}
		if (isset($x["ybs"])) {
			$this->setYbs($x["ybs"]);
		}
		if (isset($x["sales_co"])) {
			$this->setSales_co($x["sales_co"]);
		}
		if (isset($x["head_sales"])) {
			$this->setHead_sales($x["head_sales"]);
		}
		if (isset($x["head_adm"])) {
			$this->setHead_adm($x["head_adm"]);
		}
		if (isset($x["team"])) {
			$this->setTeam($x["team"]);
		}
		if (isset($x["kas"])) {
			$this->setKas($x["kas"]);
		}
		if (isset($x["manager_marketing"])) {
			$this->setManager_marketing($x["manager_marketing"]);
		}
		if (isset($x["pph"])) {
			$this->setPph($x["pph"]);
		}
		if (isset($x["definisi_kc"])) {
			$this->setDefinisi_kc($x["definisi_kc"]);
		}
		if (isset($x["ppn"])) {
			$this->setPpn($x["ppn"]);
		}
		## Add by RH 18/11/2019 ##
		if (isset($x["manager_marketing2"])) {
			$this->setManager_marketing2($x["manager_marketing2"]);
		}
		if (isset($x["gm_sales_marketing"])) {
			$this->setGm_sales_marketing($x["gm_sales_marketing"]);
		}
		if (isset($x["assdir_sales_marketing"])) {
			$this->setAssdir_sales_marketing($x["assdir_sales_marketing"]);
		}
		if (isset($x["support_proyek"])) {
			$this->setSupport_proyek($x["support_proyek"]);
		}
		if (isset($x["support1"])) {
			$this->setSupport1($x["support1"]);
		}
		if (isset($x["gm_sales_marketing1"])) {
			$this->setGm_sales_marketing1($x["gm_sales_marketing1"]);
		}
		if (isset($x["pph_pt"])) {
			$this->setPph_pt($x["pph_pt"]);
		}
		## END Add by RH 18/11/2019 ##
		unset($x);
	}

	public function getArrayTable() {
		$x = array(
			"komisi_id" => $this->getId(),
			"code" => $this->getCode(),
			"nama" => $this->getNama(),
			"ybs" => $this->getYbs(),
			"sales_co" => $this->getSales_co(),
			"head_sales" => $this->getHead_sales(),
			"head_adm" => $this->getHead_adm(),
			"team" => $this->getTeam(),
			"kas" => $this->getKas(),
			"manager_marketing" => $this->getManager_marketing(),
			"pph" => $this->getPph(),
			"definisi_kc" => $this->getDefinisi_kc(),
			"ppn" => $this->getPpn(),
			## Add by RH 18/11/2019 ##
			"manager_marketing2" => $this->getManager_marketing2(),
			"gm_sales_marketing" => $this->getGm_sales_marketing(),
			"assdir_sales_marketing" => $this->getAssdir_sales_marketing(),
			"support_proyek" => $this->getSupport_proyek(),
			"support1" => $this->getSupport1(),
			"gm_sales_marketing1" => $this->getGm_sales_marketing1(),
			"pph_pt" => $this->getPph_pt(),
			## END Add by RH 18/11/2019 ##
		);

		return $x;
	}

	function getCode() {
		return $this->code;
	}

	function getNama() {
		return $this->nama;
	}

	function getYbs() {
		return doubleval($this->ybs);
	}

	function getSales_co() {
		return doubleval($this->sales_co);
	}

	function getHead_sales() {
		return doubleval($this->head_sales);
	}

	function getHead_adm() {
		return doubleval($this->head_adm);
	}

	function getTeam() {
		return doubleval($this->team);
	}

	function getKas() {
		return doubleval($this->kas);
	}

	function getManager_marketing() {
		return doubleval($this->manager_marketing);
	}

	function getPph() {
		return doubleval($this->pph);
	}

	function getDefinisi_kc() {
		return intval($this->definisi_kc);
	}

	function setCode($code) {
		$this->code = $code;
	}

	function setNama($nama) {
		$this->nama = $nama;
	}

	function setYbs($ybs) {
		$this->ybs = $ybs;
	}

	function setSales_co($sales_co) {
		$this->sales_co = $sales_co;
	}

	function setHead_sales($head_sales) {
		$this->head_sales = $head_sales;
	}

	function setHead_adm($head_adm) {
		$this->head_adm = $head_adm;
	}

	function setTeam($team) {
		$this->team = $team;
	}

	function setKas($kas) {
		$this->kas = $kas;
	}

	function setManager_marketing($manager_marketing) {
		$this->manager_marketing = $manager_marketing;
	}

	function setPph($pph) {
		$this->pph = $pph;
	}

	function setDefinisi_kc($definisi_kc) {
		$this->definisi_kc = $definisi_kc;
	}

	## Add by RH 18/11/2019 ##

	function getManager_marketing2() {
		return doubleval($this->manager_marketing2);
	}

	function getGm_sales_marketing() {
		return doubleval($this->gm_sales_marketing);
	}

	function getAssdir_sales_marketing() {
		return doubleval($this->assdir_sales_marketing);
	}

	function getSupport_proyek() {
		return doubleval($this->support_proyek);
	}

	function getSupport1() {
		return doubleval($this->support1);
	}

	function getGm_sales_marketing1() {
		return doubleval($this->gm_sales_marketing1);
	}

	function getPph_pt() {
		return doubleval($this->pph_pt);
	}

	function setManager_marketing2($manager_marketing2) {
		$this->manager_marketing2 = $manager_marketing2;
	}

	function setGm_sales_marketing($gm_sales_marketing) {
		$this->gm_sales_marketing = $gm_sales_marketing;
	}

	function setAssdir_sales_marketing($assdir_sales_marketing) {
		$this->assdir_sales_marketing = $assdir_sales_marketing;
	}

	function setSupport_proyek($support_proyek) {
		$this->support_proyek = $support_proyek;
	}

	function setSupport1($support1) {
		$this->support1 = $support1;
	}

	function setGm_sales_marketing1($gm_sales_marketing1) {
		$this->gm_sales_marketing1 = $gm_sales_marketing1;
	}

	function setPph_pt($pph_pt) {
		$this->pph_pt = $pph_pt;
	}

	## END Add by RH 18/11/2019 ##

	public function fillData($data) {
		$this->setArrayTable($data);
	}

	public function grouped() {
		return array();
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

	function getPpn() {
		return doubleval($this->ppn);
	}

	function setPpn($ppn) {
		$this->ppn = $ppn;
	}

}
