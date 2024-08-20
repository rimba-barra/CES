<?php

class Erems_PindahkavlingController extends Erems_Box_Models_App_Hermes_AbstractController {

	protected function testingFlag() {
		return FALSE;
	}

	public function initRead() {
		$projectId = $this->getAppSession()->getProject()->getId();
		$ptId      = $this->getAppSession()->getPt()->getId();
		$genco     = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($projectId, $ptId);

		$paramName = "MODULE_ACTIVE_CHANGEKAVLING";
		$dao       = new Erems_Models_Master_GeneralDao();
		$hasil     = $dao->getGlobalParameterSolo($projectId, $ptId, $paramName);

		$paramValue = 0;
		if (is_array($hasil) && count($hasil) > 0) {
			if (is_array($hasil[0]) && count($hasil[0]) > 0) {
				$paramValue = intval($hasil[0][0]["value"]);
			}
		}

		// cek semua fungsi yang digunakan keperluan masing Project 
		$dir               = APPLICATION_PATH . '/../public/app/erems/projectlibs/';
		$prolibsFiles      = scandir($dir);
		$prolibsFound      = NULL;
		$className         = "Prolibs_" . $projectId . "_" . $ptId;
		$prolibsFileSearch = $className . ".js";

		if (count($prolibsFiles) > 0) {
			$prolibsFiles = preg_grep("/.js$/", $prolibsFiles);
			if (in_array($prolibsFileSearch, $prolibsFiles)) {
				$prolibsFound = $className;
			}
		}

		// $prefixpjs = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($projectId, $ptId)->getPurchaseletterJs();
		$prefixpjs        = 'Purchaseletter';
		$purchaseletterJs = APPLICATION_PATH . '/../public/app/erems/library/' . $prefixpjs . ".js";
		if (!file_exists($purchaseletterJs)) {
			$purchaseletterJs = 0;
		} 
		else {
			$purchaseletterJs = $prefixpjs;
		}

		$arrayRespon = array(
			"ACTIVE"                => $paramValue > 0 ? TRUE : FALSE,
			"verification_approval" => $genco->validasish3b(),
			"PROJECT_ID"            => $projectId,
			"PT_ID"                 => $ptId,
			"PROLIBFILE"            => $prolibsFound,
			"PURCHASELETTERJS"      => $purchaseletterJs,
			"typeCalculaterounding" => $genco->typeCalculaterounding(), /// add by erwin.st 09022022
		);

		return Erems_Box_Tools::instantRead($arrayRespon, array());
	}

	public function scheduleadvanceinitRead() {
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dm->setDirectResult(TRUE);
		$dm->setRequiredDataList(FALSE);
		$dm->setRequiredModel(FALSE);

		$creator = new Erems_Box_Models_App_Creator();

		//===== MASTERDATA == //
		$mc = new Erems_Models_App_Masterdata_ScheduleType();
		$ac = $mc->prosesDataWithSession($this->getAppSession(), TRUE);

		$dm->setHasil(array($ac));

		return $dm;
	}

	public function cekapprovalverificationRead() {
		$projectId = $this->getAppSession()->getProject()->getId();
		$ptId      = $this->getAppSession()->getPt()->getId();
		$params    = $this->getAppData();

		$dao = new Erems_Models_Verification_Dao();
		$v   = new Erems_Models_Verification_Verification();
		$v->getUnit()->setId(intval($params["unit_id"]));
		$v->setProject($this->getAppSession()->getProject());
		$v->setPt($this->getAppSession()->getPt());
		$record = $dao->getByUnit($v, array('is_approve' => 1));

		$verified = FALSE;
		$data     = NULL;

		if (count($record[0]) > 0) {
			$verified = (boolean) $record[0][0]["is_approve"];
			$data     = $record[0][0];
		}

		$arrayRespon = array(
			"DISCOUNT_VERIFIED" => $verified,
			"DATA"              => $data
		);
		return Erems_Box_Tools::instantRead($arrayRespon, array());
	}

	public function allRead() {
		$dm       = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'changekavling', array('unitb', 'clusterb', 'blockb', 'customer', 'purchaselettertransaction', array('clusterb', 'cluster2_'), array('clusterb', 'cluster2_'), array('unit', 'unit2_'), array('blockb', 'block2_'), array('purchaselettertransaction', 'purchaseletter2_'), 'purchaseletterrevision'), array('deletedRows'));

		$dao = new Erems_Models_Sales_Change_Dao();
		$ck  = new Erems_Models_Sales_Change_ChangeKavling();
		$ck->setProject($this->getAppSession()->getProject());
		$ck->setPt($this->getAppSession()->getPt());

		$hasil = $dao->getAllCKFilter($this->getAppRequest(), $ck, $this->getAppSession());

		$dm->setDataList($dataList);
		$dm->setHasil($hasil);

		return $dm;
	}

	public function parametersppjbRead() {
		$dm       = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'parametersppjb', array());

		$dao   = new Erems_Models_Master_GeneralDao();
		$hasil = $dao->getParameterSPPJB($this->getAppRequest(), $this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId(), new Erems_Models_Legal_ParameterSPPJB());

		$dm->setDataList($dataList);
		$dm->setHasil($hasil);

		return $dm;
	}

	public function selectedparametersppjbRead() {
		$dm       = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'parametersppjb', array());

		$dao        = new Erems_Models_Master_GeneralDao();
		$paramSppjb = new Erems_Models_Legal_ParameterSPPJB();
		$paramSppjb->setArrayTable($this->getAppData());
		$hasil = $dao->getParameterSPPJB($this->getAppRequest(), $this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId(), $paramSppjb);

		$dm->setDataList($dataList);
		$dm->setHasil($hasil);

		return $dm;
	}

	public function printoutRead() {
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dm->setDirectResult(TRUE);
		$dm->setRequiredDataList(FALSE);
		$dm->setRequiredModel(FALSE);

		$dao = new Erems_Models_Sales_Change_Dao();
		$ck  = new Erems_Models_Sales_Change_ChangeKavling();
		$ck->setArrayTable($this->getAppData());
		$hasil = $dao->oneForPrintout($ck);
		$hasil = $hasil[1][0];

		/// terbilang
		// $data['terbilanglt'] = Erems_Box_Library_Terbilang::terbilang($hasil['unit_land_size'], 3);
		$data   = $hasil;
		$cpDate = $hasil['plnew_purchase_date'];
		$time   = strtotime($cpDate);

		$data['hari']                = Erems_Box_Tools::indoDayText(date('D', $time));
		$data['tgl']                 = Erems_Box_Library_Terbilang::terbilang(date('j', $time), 2, '');
		$data['tahun']               = Erems_Box_Library_Terbilang::terbilang(date('Y', $time), 2, '');
		$data['bln']                 = Erems_Box_Tools::indoMonthText(date('n', $time));
		$data['plnew_purchase_date'] = Erems_Box_Tools::formatDate($data['plnew_purchase_date']);
		$data['sppjb_sppjb_date']    = Erems_Box_Tools::formatDate($data['sppjb_sppjb_date']);

		//parameterSPPJB
		$daopsppjb  = new Erems_Models_Master_GeneralDao();
		$paramSppjb = new Erems_Models_Legal_ParameterSPPJB();
		$paramSppjb->setArrayTable($this->getAppData());
		$hasilpsppjb = $daopsppjb->getParameterSPPJB($this->getAppRequest(), $this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId(), $paramSppjb);
		$hasilpsppjb = Erems_Box_Tools::toObjectRow($hasilpsppjb, new Erems_Models_Legal_ParameterSPPJB());

		$data["parametersppjb_akta_no"]   = $hasilpsppjb->getAktaNo();
		$data["parametersppjb_akta_date"] = Erems_Box_Tools::formatDate($hasilpsppjb->getAktaDate());

		/*
		  $fileBangunan = 'Adendum_PindahBLok_Ban.docx';
		  $fileKavling = 'Adendum_PindahBLok_Kav.docx';
		  $fileSrc = $data['productcategory_productcategory_id']==Erems_Box_Config::PRODUCTCATEGORY_BANGUNGAN?$fileBangunan:$fileKavling;
		  $finalFile = 'CK_'.str_replace('/','', $hasil['plnew_purchaseletter_no']).'.docx';
		 */

		//get lampiran
		$plID   = $data['purchaseletter02_id'];
		$hasil2 = $dao->oneScheduleByPL($plID);
		if (is_array($hasil2['data'])) {
			if (count($hasil2['data']) > 0) {
				$hasil2 = $hasil2['data'][0];
				$data2 = $hasil2;

				//set lampiran
				$data["schedule_list"] = str_replace('\n ', '             ', $data2["schedule_list"]);
				$data["rp"] = str_replace('\n ', '          ', $data2["rp"]);
				$data["nominal"] = str_replace('\n ', '          ', $data2["nominal"]);
				$data["scheduletype"] = str_replace('\n ', '                                                                                                 ', $data2["scheduletype"]);
				$data["nomorurut"] = str_replace('\n ', '          ', $data2["nomorurut"]);
				$data["duetgl"] = str_replace('\n ', '                  ', $data2["duetgl"]);
			}
		}

		//additional
		$new_ajbbphtb = $data['pricenew_harga_bphtb'] + $data['pricenew_harga_bajb'];
		$new_disc     = $data['pricenew_harga_dischargedasar'] + $data['pricenew_harga_dischargebangunan'] + $data['pricenew_harga_dischargetanah'];
		$new_ppn      = $data['pricenew_harga_ppntanah'] + $data['pricenew_harga_ppnbangunan'];
		$genco        = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId());

		$data['unitbaru_terbilanglt']       = Erems_Box_Library_Terbilang::terbilang($data['unitbaru_land_size'], 3, '');
		$data['unitbaru_terbilanglb']       = Erems_Box_Library_Terbilang::terbilang($data['unitbaru_building_size'], 3, '');
		$data['new_pricenew_harga_neto']    = Erems_Box_Tools::toCurrency($data['pricenew_harga_neto']);
		$data['new_harga_diskon']           = Erems_Box_Tools::toCurrency($new_disc);
		$data['new_harga_ppn']              = Erems_Box_Tools::toCurrency($new_ppn);
		$data['new_harga_ajbbphtb']         = Erems_Box_Tools::toCurrency($new_ajbbphtb);
		$data['new_plnew_harga_total_jual'] = Erems_Box_Tools::toCurrency($data['plnew_harga_total_jual']);
		$data['addendum_no']                = $genco->getCKAdendumNo($hasil['plnew_purchaseletter_no']); //sementara

		//end of $data
		$fileSrc   = $genco->getCKAdendumFile(array( "data_purchaseletter" => $data ));
		$finalFile = 'CK_' . str_replace('/', '', $hasil['plnew_purchaseletter_no']) . '.docx';

		$p    = new Erems_Box_Library_MyWordParser();
		$wpdf = new Erems_Box_Library_WordToPdf();

		$ok = $p->printDoc($fileSrc, $finalFile, $data);

		if (!$ok) {
			$msg = "ERR : " . $p->error;
		}

		if ($genco->getFormatFileSPT() == "pdf") {
			$wpdf->convert($p->getUrl());
			$pathUrl = str_replace(".docx", ".pdf", $p->getUrl());
		} 
		else {
			$pathUrl = $p->getUrl();
		}

		$otherAT = array(array(
			"PRINTOUT" => TRUE,
			"MSG"      => $msg,
			"URL"      => $pathUrl
		));

		$dm->setHasil(array($otherAT));

		return $dm;
	}

	public function detailRead() {
		$ses       = $this->getAppSession();
		$projectId = $ses->getProject()->getId();
		$ptId      = $ses->getPt()->getId();
		$genco     = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($projectId, $ptId);

		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dm->setDirectResult(TRUE);
		$dm->setRequiredDataList(FALSE);
		$dm->setRequiredModel(FALSE);

		$creator = new Erems_Box_Models_App_Creator();

		//===== MASTERDATA == //
		/// collector 
		$dao      = new Erems_Models_Hrd_EmployeeDao();
		$employee = new Erems_Models_Sales_Collector();
		$employee->setProject($ses->getProject());
		$employee->setPt($ses->getPt());
		$hasil = $dao->getAll($employee);

		$allCollector = array();
		$this->fillData($hasil[1], $allCollector, $creator, 'collector');

		$masterRsChg = new Erems_Models_App_Masterdata_ReasonCK();
		$allRCK      = $masterRsChg->prosesDataWithSession($ses, TRUE);

		$masterBank = new Erems_Models_App_Masterdata_Bank();
		$allBank    = $masterBank->prosesDataWithSession($ses, TRUE);

		$masterBillR = new Erems_Models_App_Masterdata_BillingRules();
		$allBillR    = $masterBillR->prosesDataWithSession($ses, TRUE);

		/// PT NAME
		$pt      = new Erems_Box_Models_Master_Pt();
		$appDao  = new Erems_Models_Master_AppDao();
		$project = new Erems_Box_Models_Master_Project();

		if (Erems_Box_Config::IS_PROJECTPT_CONSTANT) {
			$pt->setName('CONSTANT_PT');
		} 
		else {
			$ptInfo = $appDao->getPt($this->getAppSession()->getPt()->getId());
			$pt->setArrayTable($ptInfo[0][0]);
			$projectInfo = $appDao->getProject($this->getAppSession()->getProject()->getId());
			$project->setArrayTable($projectInfo[0][0]);
		}

		//=== DETAIL INFORMATION == //
		/* schedule */
		$dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
		$pl  = new Erems_Models_Purchaseletter_PurchaseLetter();
		$pl->setArrayTable($this->getAppData());
		$hasil = $dao->getScheduleById($pl);

		$allSchedule = array();
		$this->fillData(array_key_exists(1, $hasil) ? $hasil[1] : array(), $allSchedule, $creator, 'schedule');

		$paramsRequestResult = Erems_Box_Tools::globalParamsExistNew($ses, "CHANGEKAVLING");
		$isAuthorizerUser    = FALSE;
		if ($genco->getAucoMode() == 0) {
			$isAuthorizerUser = Erems_Box_Tools::integerOrArray($ses->getUser()->getId(), Erems_Box_Projectptconfig_ProjectPtConfigSelector::getAuthorizeUser($projectId, $ptId, "CHANGEKAVLING_APPROVEUSER"));
		} 
		else {
			if(!isset($paramsRequestResult["parameters"]['CHANGEKAVLING_APPROVE_GROUPID'])){
				$paramsRequestResult["parameters"]['CHANGEKAVLING_APPROVE_GROUPID'] = 0;
			}
			else{
				$isAuthorizerUser = intval($paramsRequestResult["parameters"]['CHANGEKAVLING_APPROVE_GROUPID']) == $this->getAppSession()->getGroupId();
			}
			// set ke nol alasan sekuriti
			$paramsRequestResult["parameters"]['CHANGEKAVLING_APPROVE_GROUPID'] = 0;
		}

		$isCollectionUser = FALSE;
		$collApproveUser  = $genco->getCollectionApproveUser();
		$collApproveUser  = isset($collApproveUser["CHANGEKAVLING_APPROVEUSER"]) ? $collApproveUser["CHANGEKAVLING_APPROVEUSER"] : 0;
		$isCollectionUser = Erems_Box_Tools::integerOrArray($ses->getUser()->getId(), $collApproveUser);

		$otherAT = array(array(
			"GLOBALPARAMSEXIST"   => $paramsRequestResult["status"],
			"GLOBALPARAMSMSG"     => $paramsRequestResult["msg"],
			"GLOBALPARAMSPARAMS"  => $paramsRequestResult["parameters"],
			"PT_NAME"             => $pt->getName(),
			"APPROVALUSER"        => $isAuthorizerUser,
			"ISCOLLECTIONAPPROVE" => $genco->isCollectionApprove(),
			"ISCOLLECTIONUSER"    => $isCollectionUser,
			"SCHEDULE_PEMBULATAN" => $genco->getSchedulePembulatan(),
		));

		$dm->setHasil(array($allCollector, $allBank, $allBillR, $allSchedule, $allRCK, $otherAT));

		return $dm;
	}

	public function checkrevisiRead() {
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dm->setDirectResult(TRUE);
		$dm->setRequiredDataList(FALSE);
		$dm->setRequiredModel(FALSE);

		$creator = new Erems_Box_Models_App_Creator();

		$daoChange = new Erems_Models_Sales_Change_Dao();
		$pl = new Erems_Models_Purchaseletter_PurchaseLetter();
		$pl->setArrayTable($this->getAppData());

		/*
		  $checkRevisi = $daoChange->getRevision($pl, Erems_Box_Config::REVISIONTYPE_CHANGEKAVLING);
		  $nonApproveCount = 0;
		  if ($checkRevisi) {

		  if ($checkRevisi[0]) {

		  foreach ($checkRevisi[0] as $row) {
		  $revision = new Erems_Models_Sales_Revision();
		  $revision->setArrayTable($row);

		  if (!$revision->getApprove()->getFlag() && !$revision->getReject()->getFlag()) {
		  $nonApproveCount++;
		  }
		  }
		  }
		  }

		 */


		$revisiAndCancel = $daoChange->getRevisiAndCancelRequest($pl->getId());

		$otherAT = array(array(
			// "NONAPPROVEEXIST" => $nonApproveCount > 0 ? TRUE : FALSE,
			"TIGASEKAWANANDCANCEL" => $revisiAndCancel[1]
		));

		$dm->setHasil(array($otherAT));

		return $dm;
	}

	public function mainDelete() {
		$dao = new Erems_Models_Sales_Change_Dao();
		$dao->setType("CK");
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dm->setObject(new Erems_Models_Sales_Change_ChangeKavling());
		$dm->setDao($dao);
		$dm->setIdProperty("changekavling_id");
		return $dm;
	}

	public function maindetailRead() {
		$dm       = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'changekavling', array('pricealt', array('pricealt', 'pricenew_'), 'purchaselettertransaction', array('purchaselettertransaction', 'plnew_'), 'pricetype', 'collector', 'billingrulestran', 'bank', 'unittran', 'unitstatus', 'clusterb', 'blockb', 'productcategory', 'type', 'city', array('unittran', 'unitbaru_'), array('clusterb', 'clusterbaru_'), array('blockb', 'blockbaru_'), array('productcategory', 'productcategorybaru_'), array('type', 'typebaru_'), 'customerprofile', 'pricetype', 'changekavlingreason', 'priceadmin', 'purchaseletterrevision', array('priceadmin', 'priceadminbaru_')), array('approvemode', 'detail', 'deletedRows', 'addonparams'));

		$dao = new Erems_Models_Sales_Change_Dao();
		$ck  = new Erems_Models_Sales_Change_ChangeKavling();
		$ck->setArrayTable($this->getAppData());
		$hasil = $dao->getOneCK($ck);

		if (count($hasil[1]) > 0) {
			if (intval($hasil[1][0]["purchaseletterrevision_is_approve"]) == 0) { /// jika belum di approve, maka tampilkan estimasi nomor purchaseletter yang baru
				/// nomor purchaselettter baru
				$ng             = new Erems_Models_Purchaseletter_NomorGenerator();
				$purchaseletter = new Erems_Models_Purchaseletter_PurchaseLetterTransaction();
				$unit           = new Erems_Models_Unit_UnitTran();

				$unit->getProject()->setId($hasil[1][0]["unitbaru_project_id"]);
				$unit->getPt()->setId($hasil[1][0]["unitbaru_pt_id"]);
				$unit->getCluster()->setId($hasil[1][0]["unitbaru_cluster_id"]);
				$purchaseletter->setDate(date("Y-m-d")); // tanggal purchaseletter baru ambil dari tanggal approve hari ini
				$unit->getCluster()->setCode($hasil[1][0]["clusterbaru_code"]);
				$unit->getProductCategory()->setName($hasil[1][0]["productcategorybaru_productcategory"]);
				$unit->getBlock()->setCode($hasil[1][0]["blockbaru_code"]);

				$hasilNomor = $ng->getNomor($purchaseletter, $unit);

				if ($hasilNomor["status"]) {
					$hasil[1][0]["plnew_purchaseletter_no"] = $hasilNomor["new_nomor"];
				} 
				else {
					$hasil[1][0]["plnew_purchaseletter_no"] = $hasilNomor["msg"];
				}
			}
		}

		$dm->setDataList($dataList);
		$dm->setHasil($hasil);

		return $dm;
	}

	public function customerlistRead() {
		$dm       = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'customer', array());

		$dao = new Erems_Models_Master_CustomerDao();
		$hasil = $dao->getAll();

		$dm->setDataList($dataList);
		$dm->setHasil($hasil);

		return $dm;
	}

	public function priceRead() {
		$dm       = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'pricealt', array('unit', 'pricetype'));

		$dao  = new Erems_Models_Unit_UnitDao();
		$unit = new Erems_Models_Unit_Unit();
		$unit->setArrayTable($this->getAppData());
		$hasil = $dao->getPrice($unit->getId());

		$dm->setDataList($dataList);
		$dm->setHasil($hasil);

		return $dm;
	}

	public function soldunitlistRead() {
		$dm       = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'unitb', array('unitstatus', 'clusterb', 'blockb', 'productcategory', 'type', 'purchaselettertransaction', 'customer'));

		$dao      = new Erems_Models_Sales_Change_Dao();
		$data     = $this->getAppData();
		$unitTran = new Erems_Models_Unit_UnitTran();
		$unitTran->setArrayTable($data);
		$unitTran->setProject($this->getAppSession()->getProject());
		$unitTran->setPt($this->getAppSession()->getPt());
		$unitTran->setStatus(Erems_Box_Config::UNITSTATUS_SOLD);
		$unitTran->getBlock()->setId(Erems_Box_Tools::cleanComboData($data, 'block_id'));
		$hasil = $dao->getAllUnitCK($this->getAppRequest(), $unitTran);

		$dm->setDataList($dataList);
		$dm->setHasil($hasil);

		return $dm;
	}

	public function selectedsoldunitRead() {
		$dm       = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'purchaselettertransaction', array('pt', 'customerprofile', 'unittran', 'unitstatus', 'clusterb', 'blockb', 'productcategory', 'type', 'salesman', 'citraclub', 'mediapromotion', 'saleslocation', 'collector', 'price', 'billingrulestran', 'bank', 'pricetype', 'city'));

		$dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
		$hasil = array();
		$params = $this->getAppData();
		/// check purchaseletter by unit id
		$pl = new Erems_Models_Purchaseletter_PurchaseLetter();
		$pl->setId($params["purchaseletter_id"]);

		$hasil = $dao->getOne($pl->getId());

		$dm->setDataList($dataList);
		$dm->setHasil($hasil);

		return $dm;
	}

	public function unitlistRead() {
		$dm       = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'unitb', array('unitstatus', 'clusterb', 'blockb', 'productcategory', 'type'));

		$dao      = new Erems_Models_Unit_UnitDao();
		$data     = $this->getAppData();
		$unitTran = new Erems_Models_Unit_UnitTran();
		$unitTran->setArrayTable($data);
		$unitTran->setProject($this->getAppSession()->getProject());
		$unitTran->setPt($this->getAppSession()->getPt());
		$unitTran->getStatus()->setId(Erems_Box_Config::UNITSTATUS_STOCK);
		$unitTran->setIsReadySell(1);

		$unitTran->getBlock()->setId(Erems_Box_Tools::cleanComboData($data, 'block_id'));
		$hasil = $dao->getAllWoP2($this->getAppRequest(), $unitTran);

		$dm->setDataList($dataList);
		$dm->setHasil($hasil);

		return $dm;
	}

	public function selectedunitRead() {
		$dm       = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'unittran', array('clusterb', 'blockb', 'productcategory', 'type'));

		$dao  = new Erems_Models_Unit_UnitDao();
		$unit = new Erems_Models_Unit_Unit();
		$unit->setArrayTable($this->getAppData());
		$hasil = $dao->getOne($unit);

		$dm->setDataList($dataList);
		$dm->setHasil($hasil);

		return $dm;
	}

	public function scheduleRead() {
		$dm       = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'schedule', array('scheduletype'));
		$dao      = new Erems_Models_Purchaseletter_PurchaseLetterDao();
		$pl       = new Erems_Models_Purchaseletter_PurchaseLetter();
		$pl->setArrayTable($this->getAppData());
		$hasil = $dao->getScheduleById($pl);

		$dm->setDataList($dataList);
		$dm->setHasil($hasil);

		return $dm;
	}

	public function mainCreate() {
		$dm        = new Erems_Box_Models_App_Hermes_DataModel();
		$obj       = new Erems_Models_Sales_Change_ChangeKavling();
		$validator = new Erems_Models_Sales_Change_Validator();
		$validator->requestParam = $this->getAppData();

		$data = $this->getAppData();
		$isApproveMode = isset($data["approvemode"]) ? $data["approvemode"] : FALSE;
		$this->getProcessor()->setDocStatus($isApproveMode);
		$validator->setType($isApproveMode ? "CKAPPROVE" : "CK");
		$validator->setSession($this->getAppSession());
		$dm->setDao(new Erems_Models_Sales_Change_Dao());
		$dm->setValidator($validator);
		$dm->setObject($obj);

		return $dm;
	}

	public function browsedetailRead() {
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dm->setDirectResult(TRUE);
		$dm->setRequiredDataList(FALSE);
		$dm->setRequiredModel(FALSE);

		$creator = new Erems_Box_Models_App_Creator();

		//===== MASTERDATA == //
		$b  = new Erems_Models_App_Masterdata_Block();
		$ab = $b->prosesDataWithSession($this->getAppSession(), TRUE);

		$dm->setHasil(array($ab));

		return $dm;
	}

	protected function getDefaultProcessor() {
		return new Erems_Models_App_Box_ChangeKavlingProcessor();
	}

	public function verificationapprovalRead() {
		$dao = new Erems_Models_Approvalverification();
		$hasil = $dao->getapprovalRead($this->getAppRequest(), $this->getAppSession());
		echo Zend_Json::encode($hasil);
		die();
	}
	
	public function voucherPendingRead() {
		$data = $this->getAppData();
		$dao = new Erems_Models_Sales_Change_Dao();
		$hasil = $dao->getVoucherPending($data['purchaseletter_id']);
		// echo Zend_Json::encode($hasil['data'][0]);
		echo Zend_Json::encode($hasil[0]);
		die();
	}
}
?>