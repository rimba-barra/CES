<?php

class Erems_ChangepriceController extends Erems_Box_Models_App_Hermes_AbstractController {

	private $folderDocument = 'app/erems/uploads/changeprice/';

	protected function testingFlag() {
		return FALSE;
	}

	public function cekapprovalverificationRead() {

		$projectId = $this->getAppSession()->getProject()->getId();
		$ptId = $this->getAppSession()->getPt()->getId();

		$params = $this->getAppData();

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

	public function initRead() {
		$projectId = $this->getAppSession()->getProject()->getId();
		$ptId      = $this->getAppSession()->getPt()->getId();

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

		// $prefixpjs = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId())->getPurchaseletterJs();
		$prefixpjs        = 'Purchaseletter';
		$purchaseletterJs = APPLICATION_PATH . '/../public/app/erems/library/' . $prefixpjs . ".js";
		if (!file_exists($purchaseletterJs)) {
			$purchaseletterJs = 0;
		}
		else {
			$purchaseletterJs = $prefixpjs;
		}

		$genco = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($projectId, $ptId);

		$adendum = $genco->getCPAdendumFileB(array());
		$adendumOpsi = array();
		if (is_array($adendum)) {
			$adendumOpsi = $adendum;
		}

		$arrayRespon = array(
			"PROJECT_ID"                => $projectId,
			"PT_ID"                     => $ptId,
			"PROLIBFILE"                => $prolibsFound,
			"PURCHASELETTERJS"          => $purchaseletterJs,
			"ADDENDUM_OPSI"             => $adendumOpsi,
			"verification_approval"     => $genco->validasish3b(),
			"getPurcheletterSendWa"     => $genco->getPurcheletterSendWa(), //added by anas 08092021
			"getPurcheletterSendWaText" => $genco->getPurcheletterSendWaText(), //added by anas 08092021
			"typeCalculaterounding"     => $genco->typeCalculaterounding(), /// add by erwin.st 25012022
			"roundSchedule"             => $genco->getSchedulePembulatan(), /// add by erwin.st 25012022
			"ppnValueadditional"        => $genco->ppnValueadditional(), /// add by erwin.st 14032022
			"folderDocument"            => $this->folderDocument,
			"isSH2"                     => $genco->isSH2()
		);
		return Erems_Box_Tools::instantRead($arrayRespon, array());
	}

	public function allRead() {
		$dm       = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'changeprice', array('clusterb', 'blockb', 'unittran', 'purchaseletter', 'type', array('purchaseletter', 'plnew_'), array('type', 'typenew_'), array('unittran', 'unitnew_'), 'purchaseletterrevision', 'pricetype', array('pricetype', 'pricetypenew_')), array('deletedRows'));

		$dao = new Erems_Models_Sales_Change_Dao();
		$cp  = new Erems_Models_Sales_Change_ChangePrice();

		$this->setArrayTable($cp, $this->getAppData());
		$hasil = $dao->getAllCPFilter($this->getAppRequest(), $cp, $this->getAppSession());

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
		$params = $this->getAppData();

		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dm->setDirectResult(TRUE);
		$dm->setRequiredDataList(FALSE);
		$dm->setRequiredModel(FALSE);

		$dao = new Erems_Models_Sales_Change_Dao();
		$prv = new Erems_Models_Sales_Revision();

		$prv->setArrayTable($this->getAppData());
		$hasil  = $dao->getOnePrintout($prv);
		$hasil  = $hasil[1][0];
		$data   = $hasil;
		$cpDate = $hasil['changeprice_date'];
		$time   = strtotime($cpDate);

		$data['hari'] = Erems_Box_Tools::indoDayText(date('D', $time));
		$data['tgl'] = ucwords(Erems_Box_Library_Terbilang::terbilang(date('j', $time), 2, ''));
		$data['tahun'] = ucwords(Erems_Box_Library_Terbilang::terbilang(date('Y', $time), 2, ''));
		$data['bln'] = ucwords(Erems_Box_Tools::indoMonthText(date('n', $time)));
		$data['datedmy'] = date("d-m-Y", $time);
		$data['changeprice_date'] = Erems_Box_Tools::formatDate($data['changeprice_date']);
		$data['sppjb_sppjb_date'] = Erems_Box_Tools::formatDate($data['sppjb_sppjb_date']);
		$data['purchaseletter_purchase_date'] = Erems_Box_Tools::formatDate($data['purchaseletter_purchase_date']);

		//parameterSPPJB
		$daopsppjb  = new Erems_Models_Master_GeneralDao();
		$paramSppjb = new Erems_Models_Legal_ParameterSPPJB();
		$paramSppjb->setArrayTable($this->getAppData());
		$hasilpsppjb = $daopsppjb->getParameterSPPJB($this->getAppRequest(), $this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId(), $paramSppjb);
		$hasilpsppjb = Erems_Box_Tools::toObjectRow($hasilpsppjb, new Erems_Models_Legal_ParameterSPPJB());

		$data["parametersppjb_akta_no"]    = $hasilpsppjb->getAktaNo();
		$data["parametersppjb_akta_date"]  = Erems_Box_Tools::formatDate($hasilpsppjb->getAktaDate());
		$data["parametersppjb_name01"]     = strtoupper($hasilpsppjb->getName01());
		$data["parametersppjb_name02"]     = strtoupper($hasilpsppjb->getName02());
		$data["parametersppjb_position01"] = $hasilpsppjb->getPosition01();
		$data["parametersppjb_position02"] = $hasilpsppjb->getPosition02();
		$data["parametersppjb_address_01"] = $hasilpsppjb->getAddress01();
		$data["parametersppjb_address_02"] = $hasilpsppjb->getAddress02();
		$data["parametersppjb_notaris"]    = $hasilpsppjb->getNotaris();

		/*
		  $fileBangunan = 'Adendum_GantiHarga_Ban.docx';
		  $fileKavling = 'Adendum_GantiHarga_Kav.docx';
		  $fileSrc = $data['productcategory_productcategory_id']==Erems_Box_Config::PRODUCTCATEGORY_BANGUNGAN?$fileBangunan:$fileKavling;


		  $finalFile = 'CP_'.str_replace('/','', $hasil['purchaseletter_purchaseletter_no']).'.docx';

		 */

		//get lampiran
		$plID   = $data['purchaseletter_id'];
		$hasil2 = $dao->oneScheduleByPL($plID);
		$hasil2 = $hasil2['data'][0];
		$data2  = $hasil2;

		//set lampiran
		$data["schedule_list"] = str_replace('\n ', '             ', $data2["schedule_list"]);
		$data["rp"]            = str_replace('\n ', '          ', $data2["rp"]);
		$data["nominal"]       = str_replace('\n ', '          ', $data2["nominal"]);
		$data["scheduletype"]  = str_replace('\n ', '                                                                                                 ', $data2["scheduletype"]);
		$data["nomorurut"]     = str_replace('\n ', '          ', $data2["nomorurut"]);
		$data["duetgl"]        = str_replace('\n ', '                  ', $data2["duetgl"]);

		//additional
		$data['unit_terbilanglt']           = Erems_Box_Library_Terbilang::terbilang($data['landsize'], 3, '');
		$data['unit_terbilanglb']           = Erems_Box_Library_Terbilang::terbilang($data['buildingsize'], 3, '');
		$data['new_pricenew_harga_neto']    = Erems_Box_Tools::toCurrency($data['harga_neto_new']);
		$new_ajbbphtb                       = $data['harga_bphtb_new'] + $data['harga_bajb_new'];
		$new_disc                           = $data['pricenew_harga_dischargedasar'] + $data['pricenew_harga_dischargebangunan'] + $data['pricenew_harga_dischargetanah'];
		$new_ppn                            = $data['pricenew_harga_ppntanah'] + $data['pricenew_harga_ppnbangunan'];
		$data['new_harga_diskon']           = Erems_Box_Tools::toCurrency($new_disc);
		$data['new_harga_ppn']              = Erems_Box_Tools::toCurrency($new_ppn);
		$data['new_harga_ajbbphtb']         = Erems_Box_Tools::toCurrency($new_ajbbphtb);
		$data['new_plnew_harga_total_jual'] = Erems_Box_Tools::toCurrency($data['plnew_harga_total_jual']);

		//$tempNomorUnit = $data["unit_unit_number"]; //== mark by Tirtha
		//$tempNomorUnit = explode("/",$tempNomorUnit);
		$fixNomorUnit = $data["unit_unit_number"];
		// if(is_array($tempNomorUnit)){
		// if(count($tempNomorUnit)==2){
		// $fixNomorUnit = $tempNomorUnit[1];
		// }
		// }
		$data["unit_unit_number"] = $fixNomorUnit;

		//end of $data

		$genco = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId());

		/////// TAGIHAN
		$daoPL   = new Erems_Models_Purchaseletter_PurchaseLetterDao();
		$hasilPL = $daoPL->getOneForPrintout($hasil["purchaseletter_id"]);
		$hasilPL = $hasilPL[1][0];

		$data["total_ppn"]             = doubleval($hasilPL["price_harga_ppntanah"]) + doubleval($hasilPL["price_harga_ppnbangunan"]);
		$data["pricetype_pricetype"]   = $hasilPL["pricetype_pricetype"];
		$data["customer_KTP_address"]  = $hasilPL["customer_KTP_address"];
		$data["price_harga_netto"]     = Erems_Box_Tools::toCurrency($hasilPL["price_harga_netto"]);
		$data["total_ppn"]             = Erems_Box_Tools::toCurrency($data["total_ppn"]);
		$data["harga_total_jual"]      = Erems_Box_Tools::toCurrency($hasilPL["harga_total_jual"]);
		$data["total"]                 = Erems_Box_Tools::toCurrency($hasilPL["harga_total_jual"]);
		$data['terbilangluastanah']    = Erems_Box_Library_Terbilang::terbilang($hasilPL["unit_land_size"], 3, "");
		$data['terbilangluasbangunan'] = Erems_Box_Library_Terbilang::terbilang($hasilPL["unit_building_size"], 3, "");

		$pl = new Erems_Models_Purchaseletter_PurchaseLetter();
		$pl->setId($hasil["purchaseletter_id"]);

		$hasilPLSch = $daoPL->getScheduleById($pl);
		$hasilPLSch = $hasilPLSch[1];

		$umSch  = array();
		$fixSch = array();

		$tempSisaAngsuranCode = "";

		foreach ($hasilPLSch as $k => $sch) {
			if ($sch['scheduletype_scheduletype_id'] == Erems_Box_Config::SCHTYPE_TANDAJADI) {
				if (key_exists(Erems_Box_Config::SCHTYPE_TANDAJADI, $fixSch)) {
					$fixSch[Erems_Box_Config::SCHTYPE_TANDAJADI][] = $sch;
				} else {
					$fixSch[Erems_Box_Config::SCHTYPE_TANDAJADI] = array();
					$fixSch[Erems_Box_Config::SCHTYPE_TANDAJADI][] = $sch;
				}
			} else if ($sch['scheduletype_scheduletype_id'] == Erems_Box_Config::SCHTYPE_UANGMUKA) {
				if (key_exists(Erems_Box_Config::SCHTYPE_UANGMUKA, $fixSch)) {
					$fixSch[Erems_Box_Config::SCHTYPE_UANGMUKA][] = $sch;
				} else {
					$fixSch[Erems_Box_Config::SCHTYPE_UANGMUKA] = array();
					$fixSch[Erems_Box_Config::SCHTYPE_UANGMUKA][] = $sch;
				}
			} else {
				if (key_exists(1987, $fixSch)) {
					$fixSch[1987][] = $sch;
				} else {
					$fixSch[1987] = array();
					$fixSch[1987][] = $sch;
				}
			}
		}

		$count = array(1, 1, 1);

		$totalAngsuran  = 0.0;
		$totalUangMuka  = 0.0;
		$totalTandaJadi = 0.0;
		$totalAngsuran2 = 0.0;

		foreach ($fixSch as $k => $schGroup) {
			foreach ($schGroup as $sch) {
				if ($k == Erems_Box_Config::SCHTYPE_TANDAJADI) {
					$data['tjdate' . $count[0]]   = Erems_Box_Tools::formatDate($sch['duedate'], 'd M Y');
					$data['tjamount' . $count[0]] = Erems_Box_Tools::toCurrency($sch['amount']);

					$totalTandaJadi += $sch['amount'];
					$count[0]++;
				} else if ($k == Erems_Box_Config::SCHTYPE_UANGMUKA) {
					$data['umcount' . $count[1]]  = $count[1];
					$data['umdate' . $count[1]]   = Erems_Box_Tools::formatDate($sch['duedate'], 'd M Y');
					$data['umamount' . $count[1]] = Erems_Box_Tools::toCurrency($sch['amount']);
					$makstglUM                    = Erems_Box_Tools::formatDate($sch['duedate'], 'd M Y');

					$totalUangMuka += $sch['amount'];
					$count[1]++;
				} else {
					$data['count' . $count[2]]      = $count[2];
					// $data['duedate' . $count[2]] = Erems_Box_Tools::formatDate($sch['duedate'], 'd M Y');
					$data['duedate' . $count[2]]    = $genco->getDueDateSchedulePrintout(Erems_Box_Tools::formatDate($sch['duedate'], 'd M Y'), $sch);
					$data['amount' . $count[2]]     = Erems_Box_Tools::toCurrency($sch['amount']);
					$data['code' . $count[2]]       = $sch['scheduletype_scheduletype'];
					$tempSisaAngsuranCode           = $sch['scheduletype_scheduletype'];

					$totalAngsuran += $sch['amount'];
					$totalAngsuran2 += $sch['amount'];
					$count[2]++;
				}
			}
		}

		$data["kodeangsuran"] = $tempSisaAngsuranCode;
		////// END TAGIHAN

		$data['addendum_no'] = $genco->getCKAdendumNo($hasil['purchaseletter_purchaseletter_no']); //sementara

		$tpl = isset($params["tpl"]) ? intval($params["tpl"]) : 0;

		if ($tpl > 0) {
			$fileSrc = $genco->getCPAdendumFileB(array(
				"data_purchaseletter" => $data
			));
			foreach ($fileSrc as $row) {
				if (intval($row["value"]) == $tpl) {
					$fileSrc = $row["file"];
				}
			}
		} else {
			$fileSrc = $genco->getCPAdendumFile(array(
				"data_purchaseletter" => $data
			));
		}

		$finalFile = 'CP_' . str_replace('/', '', $hasil['purchaseletter_purchaseletter_no']) . '.docx';

		$p    = new Erems_Box_Library_MyWordParser();
		$wpdf = new Erems_Box_Library_WordToPdf();

		$p->useTable = 2;

		$p->addLoopingField(array('duedate', 'amount', 'count', 'code'), count($fixSch[1987]));
		$p->addLoopingField(array('tjdate', 'tjamount'), count($fixSch[Erems_Box_Config::SCHTYPE_TANDAJADI]));
		$p->addLoopingField(array('umdate', 'umamount', 'umcount'), count($fixSch[Erems_Box_Config::SCHTYPE_UANGMUKA]));

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
				"MSG" => $msg,
				"URL" => $pathUrl
		));

		$dm->setHasil(array($otherAT));

		return $dm;
	}

	public function scheduleadvanceRead() {
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

	public function searchassetsRead() {
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dm->setDirectResult(TRUE);
		$dm->setRequiredDataList(FALSE);
		$dm->setRequiredModel(FALSE);

		$creator = new Erems_Box_Models_App_Creator();

		//===== MASTERDATA == //
		$mc = new Erems_Models_App_Masterdata_Cluster();
		$ac = $mc->prosesDataWithSession($this->getAppSession(), TRUE);

		$mb = new Erems_Models_App_Masterdata_Block();
		$ab = $mb->prosesDataWithSession($this->getAppSession(), TRUE);

		$dm->setHasil(array($ac, $ab));

		return $dm;
	}

	public function detailRead() {
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dm->setDirectResult(TRUE);
		$dm->setRequiredDataList(FALSE);
		$dm->setRequiredModel(FALSE);

		$creator = new Erems_Box_Models_App_Creator();

		$ses = $this->getAppSession();

		$projectId = $ses->getProject()->getId();
		$ptId      = $ses->getPt()->getId();
		$userId    = $ses->getUser()->getId();

		$genco = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($projectId, $ptId);

		// $masterTy = new Erems_Models_App_Masterdata_Type();
		// $masterTy->setSes($ses);
		// $masterTy->setIsdropdown(1);
		// $allTy = $masterTy->prosesDataWithSession($ses, TRUE);

		$typeDao = new Erems_Models_Master_TypeDao();
		$type = $typeDao->getAllDropdown();

		$masterBank = new Erems_Models_App_Masterdata_Bank();
		$allBank    = $masterBank->prosesDataWithSession($ses, TRUE);

		$masterBillR = new Erems_Models_App_Masterdata_BillingRules();
		$allBillR    = $masterBillR->prosesDataWithSession($ses, TRUE);

		/// collector
		$dao      = new Erems_Models_Hrd_EmployeeDao();
		$employee = new Erems_Models_Sales_Collector();

		$employee->setProject($ses->getProject());
		$employee->setPt($ses->getPt());

		$hasil = $dao->getAll($employee);

		$allCollector = array();
		$this->fillData($hasil[1], $allCollector, $creator, 'collector');

		$paramsRequestResult = Erems_Box_Tools::globalParamsExist($ses);

		/// PT NAME
		$pt      = new Erems_Box_Models_Master_Pt();
		$appDao  = new Erems_Models_Master_AppDao();
		$project = new Erems_Box_Models_Master_Project();

		if (Erems_Box_Config::IS_PROJECTPT_CONSTANT) {
			$pt->setName('CONSTANT_PT');
		} else {
			$ptInfo = $appDao->getPt($ptId);
			$pt->setArrayTable($ptInfo[0][0]);
			$projectInfo = $appDao->getProject($projectId);
			$project->setArrayTable($projectInfo[0][0]);
		}

		$isAuthorizerUser = FALSE;
		if ($genco->getAucoMode() == 0) {
			$isAuthorizerUser = $userId == Erems_Box_Projectptconfig_ProjectPtConfigSelector::getAuthorizeUser($projectId, $ptId, "CHANGEPRICE_APPROVEUSER") ? TRUE : FALSE;
		}
		else {
			$isAuthorizerUser = intval($paramsRequestResult["parameters"]['CHANGEPRICE_APPROVE_GROUPID']) == $ses->getGroupId();
			// set ke nol alasan sekuriti
			$paramsRequestResult["parameters"]['CHANGEPRICE_APPROVE_GROUPID'] = 0;
		}

		//addby imaam on 20200915
		$paramsCP = $this->getAppData();
		if (array_key_exists("changeprice_id", $paramsCP)) {
			$gDao        = new Erems_Models_Master_GeneralDao();
			$dataProject = $gDao->getProjectDetail($projectId);
			if ($dataProject['is_cpms'] == 1) {
				$daoCP  = new Erems_Models_Sales_Change_Dao();
				$dataCP = $daoCP->getOneCPbyId(intval($paramsCP["changeprice_id"]));
				if (
					($dataCP[1][0]['landsize'] != $dataCP[1][0]['landsize_new']) ||
					($dataCP[1][0]['buildingsize'] != $dataCP[1][0]['buildingsize_new']) ||
					($dataCP[1][0]['kelebihan'] != $dataCP[1][0]['kelebihan_new'])
				) {
					$isAuthorizerUser = $genco->UserGMProject();
					$isAuthorizerUser = is_array($isAuthorizerUser) ? intval($isAuthorizerUser[0]) : $isAuthorizerUser;
					$isAuthorizerUser = $userId == $isAuthorizerUser ? TRUE : FALSE;
				}
			}
		}

		$isCollectionUser = FALSE;
		$collApproveUser  = $genco->getCollectionApproveUser();
		$collApproveUser  = isset($collApproveUser["CHANGEPRICE_APPROVEUSER"]) ? $collApproveUser["CHANGEPRICE_APPROVEUSER"] : 0;
		$isCollectionUser = Erems_Box_Tools::integerOrArray($userId, $collApproveUser);

		$otherAT = array(array(
			"GLOBALPARAMSEXIST"   => $paramsRequestResult["status"],
			"GLOBALPARAMSMSG"     => $paramsRequestResult["msg"],
			"GLOBALPARAMSPARAMS"  => $paramsRequestResult["parameters"],
			"PT_NAME"             => $pt->getName(),
			"PRICETYPE_KPR"       => Erems_Box_Config::PRICETYPE_KPR,
			"APPROVALUSER"        => $isAuthorizerUser,
			"ISCOLLECTIONAPPROVE" => $genco->isCollectionApprove(),
			"NPVDOC"              => $genco->ChangepricewithNPVdoc(),
			"ISCOLLECTIONUSER"    => $isCollectionUser,
			'type'                => $type
		));

		// $dm->setHasil(array($allTy, $allBank, $allBillR, $allCollector, $otherAT));
		$dm->setHasil(array($allBank, $allBillR, $allCollector, $otherAT));

		return $dm;
	}

	public function maindetailRead() {
		$dm       = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'changeprice', array('unitstatus', 'clusterb', 'blockb', 'productcategory',
			'unittran', 'purchaselettertransaction', 'customerprofile',
			'pricetype', array('pricetype', 'pricetypenew_'), 'type',
			'billingrulestran', 'pricealt', array('pricealt', 'pricenew_'), 'priceadmin',
			array('priceadmin', 'new_'), 'billingrulestran', 'collector', 'purchaseletterrevision'), array('approvemode', 'detail', 'deletedRows', 'addonparams'));

		$dao = new Erems_Models_Sales_Change_Dao();
		$prv = new Erems_Models_Sales_Revision();

		$prv->setArrayTable($this->getAppData());
		$hasil = $dao->getOneCP($prv);

		$dm->setDataList($dataList);
		$dm->setHasil($hasil);

		return $dm;
	}

	public function scheduleRead() {
		$dm       = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'schedule', array('scheduletype', 'sourcemoney'));
		$dao      = new Erems_Models_Purchaseletter_PurchaseLetterDao();
		$pl       = new Erems_Models_Purchaseletter_PurchaseLetter();

		$pl->setArrayTable($this->getAppData());
		$hasil = $dao->getScheduleById($pl);

		$dm->setDataList($dataList);
		$dm->setHasil($hasil);

		return $dm;
	}

	public function schedulerevisiRead() {
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'schedule', array('scheduletype', 'sourcemoney'));
		$dao = new Erems_Models_Sales_Change_Dao();
		// $pl = new Erems_Models_Purchaseletter_PurchaseLetter();
		// $pl->setArrayTable($this->getAppData());
		$data = $this->getAppData();
		$hasil = $dao->getScheduleChangePrice(intval($data["revisi_id"]));

		$dm->setDataList($dataList);
		$dm->setHasil($hasil);

		return $dm;
	}

	public function soldunitlistRead() {
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'unitb', array('unitstatus', 'clusterb', 'blockb', 'productcategory', 'type', 'purchaselettertransaction', 'customer'));

		$data = $this->getAppData();
		$dao = new Erems_Models_Sales_Change_Dao();
		$unitTran = new Erems_Models_Unit_UnitTran();
		$unitTran->setArrayTable($data);

		$unitTran->setProject($this->getAppSession()->getProject());
		$unitTran->setPt($this->getAppSession()->getPt());
		$unitTran->setStatus(Erems_Box_Config::UNITSTATUS_SOLD);
		$unitTran->getBlock()->setId(Erems_Box_Tools::cleanComboData($data, 'block_id'));

		$hasil = $dao->getAllSoldUnitCP($this->getAppRequest(), $unitTran);

		$dm->setDataList($dataList);
		$dm->setHasil($hasil);

		return $dm;
	}

	public function checkrevisiRead() {
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dm->setDirectResult(TRUE);
		$dm->setRequiredDataList(FALSE);
		$dm->setRequiredModel(FALSE);

		// $creator = new Erems_Box_Models_App_Creator();


		$daoChange = new Erems_Models_Sales_Change_Dao();
		$pl = new Erems_Models_Purchaseletter_PurchaseLetter();
		$pl->setArrayTable($this->getAppData());

		/*
		  $checkRevisi = $daoChange->getRevision($pl, Erems_Box_Config::REVISIONTYPE_CHANGEPRICE);
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
				//  "NONAPPROVEEXIST" => $nonApproveCount >0?TRUE:FALSE,
				"TIGASEKAWANANDCANCEL" => $revisiAndCancel[1],
		));

		$dm->setHasil(array($otherAT));

		return $dm;
	}

	public function selectedsoldunitRead() {
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'purchaselettertransaction', array('customerprofile', 'unittran', 'unitstatus', 'clusterb', 'blockb', 'productcategory', 'type', 'salesman', 'citraclub', 'mediapromotion', 'saleslocation', 'collector', 'price', 'billingrulestran', 'bank', 'pricetype', 'city'));

		$dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
		$hasil = array();
		/// check purchaseletter by unit id

		$unit = new Erems_Models_Unit_Unit();
		$unit->setArrayTable($this->getAppData());

		$pHasil = $dao->getOneByUnit($unit);
		$pl = new Erems_Models_Purchaseletter_PurchaseLetter();
		if (count($pHasil[1]) > 0) {

			$pl->setArrayTable($pHasil[1][0]);
		}

		$hasil = $dao->getOne($pl->getId());
		// die(print_r($hasil));

		$dm->setDataList($dataList);
		$dm->setHasil($hasil);

		return $dm;
	}

	/*
	  public function priceRead() {

	  $dm = new Erems_Box_Models_App_Hermes_DataModel();
	  $dataList = new Erems_Box_Models_App_DataListCreator('', 'price', array('unit', 'pricetype'));

	  $dao = new Erems_Models_Unit_UnitDao();
	  $unit = new Erems_Models_Unit_Unit();
	  $unit->setArrayTable($this->getAppData());
	  $hasil = $dao->getPrice($unit->getId());

	  $dm->setDataList($dataList);
	  $dm->setHasil($hasil);


	  return $dm;
	  }

	 */

	public function priceRead() {
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'pricealt', array('unit', 'pricetype'));

		$dao = new Erems_Models_Unit_UnitDao();
		$unit = new Erems_Models_Unit_Unit();
		$unit->setArrayTable($this->getAppData());
		$hasil = $dao->getPrice($unit->getId());

		$dm->setDataList($dataList);
		$dm->setHasil($hasil);

		return $dm;
	}

	public function mainDelete() {
		$dao = new Erems_Models_Sales_Change_Dao();
		$dao->setType("CP");
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dm->setObject(new Erems_Models_Sales_Change_ChangePrice());
		$dm->setDao($dao);
		$dm->setIdProperty("changeprice_id");
		return $dm;
	}

	public function mainCreate() {
		$dm   = new Erems_Box_Models_App_Hermes_DataModel();
		$obj  = new Erems_Models_Sales_Change_ChangePrice();
		$v    = new Erems_Models_Sales_Change_Validator();
		$dao  = new Erems_Models_Sales_Change_Dao();
		$data = $this->getAppData();

		$isApproveMode = isset($data["approvemode"]) ? $data["approvemode"] : FALSE;
		$this->getProcessor()->setDocStatus($isApproveMode);

		$v->setType($isApproveMode ? "CPAPPROVE" : "CP");
		$v->setSession($this->getAppSession());
		$dao->setType("CP");
		$dm->setDao($dao);
		$dm->setValidator($v);
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
		$b = new Erems_Models_App_Masterdata_Block();
		$ab = $b->prosesDataWithSession($this->getAppSession(), TRUE);

		$dm->setHasil(array($ab));

		return $dm;
	}

	protected function getDefaultProcessor() {
		return new Erems_Models_App_Box_ChangePriceProcessor();
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
		//echo Zend_Json::encode($hasil['data'][0]);
		echo Zend_Json::encode($hasil[0]);
		die();
	}

	public function uploadRead() {
		$app         = new Erems_Box_Models_App_Models_Create($this);
		$msg         = '???';
		$success     = FALSE;
		$imageUpload = NULL;

        $tipe = $this->getRequest()->getPost('tipe');
        $flag = $this->getRequest()->getPost('flag');

        if($tipe == "document"){
            $file = $_FILES['file_npv_doc_approved'];
            $ext = pathinfo($file['name'], PATHINFO_EXTENSION);

            $imageUpload = new Erems_Box_Models_App_ImageUpload('/public/' . $this->folderDocument, rand(), $ext);
            $imageUpload->runDocument('', false);
        }

        if(!$imageUpload->isSuccess()){
            $msg = $imageUpload->getErrorMsg();
        }else{
			$success = TRUE;
			$msg     = $imageUpload->getImageName();

			$filedoc = $this->getRequest()->getPost('filedoc');
            if($filedoc){
            	$path = APPLICATION_PATH . '/../public/' . $this->folderDocument . $filedoc;
		    	if(file_exists($path)){
				    unlink($path);
				}
            }

            $changeprice_id = $this->getRequest()->getPost('changeprice_id');
            if($changeprice_id){
            	$daoChange = new Erems_Models_Sales_Change_Dao();
				$daoChange->updateDocnpv($changeprice_id, $msg);
            }
        }

        echo Zend_Json::encode(array('success' => $success, 'msg' => $msg));
		die();
    }

    public function deletedocRead(){
		$changeprice_id = $this->getRequest()->getPost('changeprice_id');
		$filedoc        = $this->getRequest()->getPost('filedoc');

		$path = APPLICATION_PATH . '/../public/' . $this->folderDocument . $filedoc;

		$msg = '';
    	if(file_exists($path)){
		    unlink($path);
		    $msg = $filedoc;
		}

		if($changeprice_id){ /// update db delete doc
			$daoChange = new Erems_Models_Sales_Change_Dao();
			$daoChange->deleteDocnpv($changeprice_id);
		}

		echo Zend_Json::encode(array('success' => true, 'msg' => $msg));
		die();
    }
}

?>
