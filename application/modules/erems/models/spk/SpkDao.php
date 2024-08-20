<?php

/**
 * Description of SpkDao
 *
 * @author MIS
 */
class Erems_Models_Spk_SpkDao extends Erems_Box_Kouti_AbDao implements Erems_Box_Models_App_BlackHole {

	protected $dbTable;

	/* start added by ahmad riadi 29-12-2016 */
	protected $session;
	protected $project_id;
	protected $pt_id;

	/* end added by ahmad riadi 29-12-2016 */

	public function __construct() {
		$this->dbTable = new Erems_Models_Dbtable_Db();
		/* start added by ahmad riadi 29-12-2016 */
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
		$this->project_id = $this->session->getCurrentProjectId();
		$this->pt_id = $this->session->getCurrentPtId();
		/* end added by ahmad riadi 29-12-2016 */
	}

	public function getType() {
		$hasil = array();
		$hasil = $this->dbTable->SPExecute('sp_spktype_read');
		return $hasil;
	}

	public function getAll(Erems_Box_Models_App_HasilRequestRead $requestRead, $project, $pt) {
		$hasil = array();
		$others = $requestRead->getOthers();


		$hasil = $this->dbTable->SPExecute('sp_spk_read',
				$project, $pt,
				$requestRead->getPage(), $requestRead->getLimit(),
				intval($requestRead->getOthersValue("spktype_id")) == 999 ? 0 : $requestRead->getOthersValue("spktype_id"),
				$requestRead->getOthersValue("status"),
				intval($requestRead->getOthersValue("contractor_id")) == 999 ? 0 : $requestRead->getOthersValue("contractor_id"),
				$requestRead->getOthersValue("code"),
				$requestRead->getOthersValue("spk_no"),
				$requestRead->getOthersValue("bot_spk_date"),
				$requestRead->getOthersValue("top_spk_date"),
				$requestRead->getOthersValue("bot_time_frame"),
				$requestRead->getOthersValue("top_time_frame"),
				$requestRead->getOthersValue("bot_implement_time"),
				$requestRead->getOthersValue("top_implement_time"),
				(double) $requestRead->getOthersValue("bot_fee"),
				(double) $requestRead->getOthersValue("top_fee")
		);

		//  var_dump($this->dbTable);

		return $hasil;
	}

	public function getAllForCombo() {
		$hasil = array();


		$hasil = $this->dbTable->SPExecute('sp_spk_read', $this->project_id, $this->pt_id, 1, 1000000);

		//  var_dump($this->dbTable);

		return $hasil;
	}

	public function getAllByUnit(Erems_Models_Unit_Unit $unit) {
		$hasil = array();
		$id = $unit->getId();
		if ($id == 0) {
			return $hasil;
		}
		$hasil = $this->dbTable->SPExecute('sp_spk_byunit_read', $id);

		return $hasil;
	}

	public function getAllByUnitForProgressunit(Erems_Models_Unit_Unit $unit) {
		$hasil = array();
		$id = $unit->getId();
		if ($id == 0) {
			return $hasil;
		}
		$hasil = $this->dbTable->spToQuery('sp_spk_byunitprogress_read', $id);

		return $hasil;
	}

	public function getContractor() {
		$hasil = array();
		$hasil = $this->dbTable->SPExecute('sp_contractorsimple_read');
		return $hasil;
	}

	public function getContractorProjectPt(Erems_Models_Master_Contractor $c) {
		$hasil = array();
		$hasil = $this->dbTable->SPExecute('sp_contractorsimple_read', 1, 9999, 0, 0, '', '', '', '', $c->getProject()->getId(), $c->getPt()->getId());
		return $hasil;
	}

	public function getDetailBySpk(Erems_Models_Spk_Spk $spk, Erems_Box_Models_App_HasilRequestRead $requestRead) {
		$hasil = array();
		if ($spk->getId() == 0) {
			return $hasil;
		}
		$hasil = $this->dbTable->SPExecute('sp_spkdetailbyspk_read', $spk->getId(), $requestRead->getPage(), $requestRead->getLimit());

		return $hasil;
	}

	public function getOneDetail($spkId, $unitId) {
		$hasil = array();

		$hasil = $this->dbTable->SPExecute('sp_spkonedetail_read', $spkId, $unitId);

		return $hasil;
	}

	public function insertNonUnit(Erems_Models_Spk_SpkTransaction $spkTrn, $autoGenerateNumber) {
		$row = 0;


		$row = $this->dbTable->SPUpdate('sp_spknonunit_create', $this->project_id, $this->pt_id, $spkTrn->getAddBy(), $spkTrn->getContractor()->getId(), $spkTrn->getCode(), $spkTrn->getNomor(),
				date('Y-m-d h:m:s', strtotime($spkTrn->getDate())), $spkTrn->getDurasi(),
				date('Y-m-d h:m:s', strtotime($spkTrn->getTimeStart())),
				date('Y-m-d h:m:s', strtotime($spkTrn->getTimeEnd())),
				$spkTrn->getJobFee(), $spkTrn->getJobTitle(), $spkTrn->getDescription(), $spkTrn->getSpkType()->getId(), $autoGenerateNumber);

		return $row;
	}

	public function insertWithUnit(Erems_Models_Spk_SpkTransaction $spkTrn, $autoGenerateNumber) {
		$row = 0;
		$dcResult = $spkTrn->getDCResult();



		if ($spkTrn->getDCResult()) {
			$row = $this->dbTable->SPUpdate('sp_spkunit_create', $this->project_id, $this->pt_id, $spkTrn->getAddBy(), $spkTrn->getContractor()->getId(), $spkTrn->getCode(), $spkTrn->getNomor(),
					date('Y-m-d h:m:s', strtotime($spkTrn->getDate())), $spkTrn->getDurasi(),
					date('Y-m-d h:m:s', strtotime($spkTrn->getTimeStart())),
					date('Y-m-d h:m:s', strtotime($spkTrn->getTimeEnd())),
					$spkTrn->getJobFee(), $spkTrn->getJobTitle(), $spkTrn->getDescription(), $spkTrn->getSpkType()->getId(),
					$dcResult["unit_id"], $autoGenerateNumber);
		} else {
			$row = $this->dbTable->SPUpdate('sp_spkunit_create', $this->project_id, $this->pt_id, $spkTrn->getAddBy(), $spkTrn->getContractor()->getId(), $spkTrn->getCode(), $spkTrn->getNomor(),
					date('Y-m-d h:m:s', strtotime($spkTrn->getDate())), $spkTrn->getDurasi(),
					date('Y-m-d h:m:s', strtotime($spkTrn->getTimeStart())),
					date('Y-m-d h:m:s', strtotime($spkTrn->getTimeEnd())),
					$spkTrn->getJobFee(), $spkTrn->getJobTitle(), $spkTrn->getDescription(), $spkTrn->getSpkType()->getId(), "", $autoGenerateNumber);
		}
		return $row;
	}

	public function updateNonUnit(Erems_Models_Spk_SpkTransaction $spkTrn) {
		$row = 0;
		$row = $this->dbTable->SPUpdate('sp_spknonunit_update', $spkTrn->getId(), $spkTrn->getModiBy(), $spkTrn->getContractor()->getId(), $spkTrn->getCode(), $this->toDateTime($spkTrn->getDate()), $spkTrn->getDurasi(), $this->toDateTime($spkTrn->getTimeStart()), $this->toDateTime($spkTrn->getTimeEnd()), $spkTrn->getJobFee(), $spkTrn->getJobTitle(), $spkTrn->getDescription(), $spkTrn->getSpkType()->getId(), $spkTrn->getNomor());

		return $row;
	}

	public function updateCancel(Erems_Models_Spk_SpkTransaction $spkTrn) {
		$row = 0;

		$row = $this->dbTable->SPUpdate('sp_spk_updatecancel', $spkTrn->getId(),
				$spkTrn->getStatus()->getName(),
				date('Y-m-d h:m:s', strtotime($spkTrn->getStatus()->getDate())),
				$spkTrn->getStatus()->getNote());

		return $row;
	}

	public function updateSpkClose(Erems_Models_Spk_SpkTransaction $spkTrn) {
		$row = 0;

		$row = $this->dbTable->SPUpdate('sp_spk_updateinfoclose', $spkTrn->getId(),
				$spkTrn->getSerahTerimaDate1(),
				$spkTrn->getSerahTerimaNote1(),
				$spkTrn->getSerahTerimaDate2(),
				$spkTrn->getSerahTerimaNote2(),
				$spkTrn->getSerahTerimaDate3(),
				$spkTrn->getSerahTerimaNote3());

		return $row;
	}

	public function updateWithUnit(Erems_Models_Spk_SpkTransaction $spkTrn, Erems_Box_Models_App_Decan $decan) {
		$row = 0;
		if ($spkTrn->getId() == 0) {
			return $row;
		}

		$dcResult = $spkTrn->getDCResult();

		$row = $this->dbTable->SPUpdate('sp_spkunit_update', $spkTrn->getId(), $spkTrn->getModiBy(),
				$spkTrn->getContractor()->getId(), $spkTrn->getCode(), $this->toDateTime($spkTrn->getDate()),
				$spkTrn->getDurasi(), $this->toDateTime($spkTrn->getTimeStart()), $this->toDateTime($spkTrn->getTimeEnd()),
				$spkTrn->getJobFee(), $spkTrn->getJobTitle(), $spkTrn->getDescription(), $spkTrn->getSpkType()->getId(),
				$decan->getString(), $dcResult["spkdetail_id"], $dcResult["unit_id"],
				//$spkTrn->getCountunit(),
				$spkTrn->getNomor()
		);

		return $row;
	}

	public function delete() {
		
	}

	/* @check Contractor and Code SPK */

	public function checkCC(Erems_Models_Spk_SpkTransaction $spkTrn, $projectId) {
		$hasil = array(//'con'=>1, // contractor
			'cod' => 0 // code
		);
		$hasilDao = $this->dbTable->SPExecute('sp_spkvalidation_read', $spkTrn->getCode(), $projectId);

		if (is_array($hasilDao[0])) {
			//  $hasil['con'] = $hasil[0][0]['contractor_exist'];
			$hasil['cod'] = $hasilDao[0][0]['code_exist'];
		}

		return $hasil['cod'];
	}

	public function directDelete(Erems_Box_Models_App_Decan $decan, Erems_Box_Kouti_InterSession $session) {
		$row = 0;
		$row = $this->dbTable->SPUpdate('sp_spk_destroy', $decan->getString(), $session->getUserId());
		return $row;
	}

	public function getByProjectPtNotinSPK(Erems_Box_Models_App_HasilRequestRead $request, $project, $pt, $params) {
		$hasil = array();



		if ($project == 0 || $pt == 0) {
			return $hasil;
		}




		$hasil = $this->dbTable->SPExecute('sp_unitnotinspkb_read', $project, $pt, $request->getPage(),
				$request->getLimit(), isset($params["unit_number"]) ? $params["unit_number"] : "");



		/*
		  $hasil = $this->dbTable->SPExecute('sp_unitc_notin_spk_read',$project,$pt,$request->getPage(),
		  $request->getLimit()
		  );
		 */




		//  var_dump($this->dbTable);

		return $hasil;
	}

	public function directUpdate(Erems_Box_Models_App_HasilRequestRead $requestRead) {
		$hasil = 0;
		//var_dump($this->project_id);
//        var_dump($this->project_id,
//                $requestRead->getOthersValue("unitid"),
//                $requestRead->getOthersValue("spkid"),
//                $requestRead->getOthersValue("rb1"),
//                $requestRead->getOthersValue("rb2"),
//                $requestRead->getOthersValue("rb3"),
//                $requestRead->getOthersValue("rb4"),
//                $requestRead->getOthersValue("rb5"),
//                $requestRead->getOthersValue("note"),
//                $requestRead->getOthersValue("pengawas_id"));
		$hasil = $this->dbTable->SPUpdate('sp_construction_readv2',
				$this->project_id,
				$requestRead->getOthersValue("unitid"),
				$requestRead->getOthersValue("spkid"),
				$requestRead->getOthersValue("rb1"),
				$requestRead->getOthersValue("rb2"),
				$requestRead->getOthersValue("rb3"),
				$requestRead->getOthersValue("rb4"),
				$requestRead->getOthersValue("rb5"),
				$requestRead->getOthersValue("serahterima1"),
				$requestRead->getOthersValue("serahterima2"),
				$requestRead->getOthersValue("note"),
				$requestRead->getOthersValue("pengawas_id"),
				$requestRead->getOthersValue("is_holdteknik"),
				$requestRead->getOthersValue("notes_holdteknik")
		);



		return $hasil;
	}

}

?>
