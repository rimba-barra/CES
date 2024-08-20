<?php

class Erems_PopupfollowuphistoryController extends Erems_Models_App_Template_AbstractMasterController {

	public function _getMainDataModel() {
		$dao = new Erems_Models_Purchaseletter_FollowupDao();
		//  $dao->setSession($this->getAppSession());
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dm->setDataList(new Erems_Box_Models_App_DataListCreator('', 'purchaselettertransaction', array('unitb', 'customerprofile'), array()));
		$dm->setObject(new Erems_Models_Cac_Proses());
		$dm->setDao($dao);
		$dm->setValidator(NULL);
		$dm->setIdProperty("purchaseletter_id");
		return $dm;
	}

	public function printoutRead() {

		$msg = NULL;
		$params = $this->getAppData();
		/// paramter global
//
//		$globalParams = Erems_Box_Tools::getAllGlobalParams();
//		$appSessions = Erems_Box_Tools::getAppSessions();
//		$globalParams['PROJECT_NAME'] = $appSessions['project'][$this->getAppSession()->getProject()->getId()];
//		$globalParams['PT_NAME'] = $appSessions['pt'][$this->getAppSession()->getPt()->getId()];
//
//		$permil = $globalParams['DENDA_PERMIL'];
//
//		$dao = new Erems_Models_Purchaseletter_FollowupDao();
//		$dataPurchase = $dao->getPrintInfo(intval($params["purchaseletter_id"]));
//		$dataPurchase = $dataPurchase[0][0];
//		$dataFollowUp = [
//			'purchaseletter_id' => $params["purchaseletter_id"],
//			'sp_ke' => $dataPurchase['sp_surat_ke'],
//			'print_date' => $dataPurchase['print_date'],
//			'sp1_date' => $dataPurchase['sp1_date'] != "" ? date("Y-m-d", strtotime($dataPurchase['sp1_date'])) : NULL,
//			'sp1_no' => $dataPurchase['sp1'],
//			'sp2_date' => $dataPurchase['sp2_date'] != "" ? date("Y-m-d", strtotime($dataPurchase['sp2_date'])) : NULL,
//			'sp2_no' => $dataPurchase['sp2'],
//			'sp3_date' => $dataPurchase['sp3_date'] != "" ? date("Y-m-d", strtotime($dataPurchase['sp3_date'])) : NULL,
//			'sp3_no' => $dataPurchase['sp3'],
//			'sp4_date' => $dataPurchase['sp4_date'] != "" ? date("Y-m-d", strtotime($dataPurchase['sp4_date'])) : NULL,
//			'sp4_no' => $dataPurchase['sp4'],
//		];
//
//		$dataSPDb = $dao->getPrintInfoSch(intval($params["purchaseletter_id"]));
//		$dataSp = $dataSPDb[0];
//
//		$finalDataSp = array();
//		$totalTagihan = 0.0;
//
//		$maxsp = 0;
//		$maxdate = '1900-01-01 0:0:00';
//		$dx = new DateTime('1900-01-02 0:0:00');
//		$dxt = new DateTime('1900-01-01 0:0:00');
//		$maxspno = 0;
//		//find max SP
//		foreach ($dataSp as $row) {
//
//
//			if ($row["tanggal_sp"] && !Erems_Box_Tools::arrayInArrayNested($row["duedate"], "duedate", $finalDataSp)) {
//
//				for ($x = 1; $x <= 4; $x++) {
//
//					if ($row["sp" . $x . "_plandate_in"] !== null) {
//
//						if ($x > $maxsp && $dx > $dxt) {
//							if ($x == 1) {
//								$maxsp = 1;
//							} else {
//								$maxsp = $x - 1;  // sp tertinggi
//							}
//
//							$maxschid = $row["schedule_id"];
//							$dx = new DateTime($row["sp" . $x . "_plandate_in"]); //tanggal tertinggi
//							$maxdate = date('d-m-Y', strtotime($row["sp" . $x . "_plandate_in"])); //tanggal tertinggi
//						}
//					}
//				}
//			}
//		}
//
//		foreach ($dataSp as $row) {
//
//			if ($row["tanggal_sp"] && !Erems_Box_Tools::arrayInArrayNested($row["duedate"], "duedate", $finalDataSp)) {
//
//				$d2 = new DateTime($row['duedate']);
//				// $tempDate = new DateTime($data['tanggal_sp' . $count] . ' 0:0:00');
//				$d1 = new DateTime(date("Y-m-d"));
//				$d3 = new DateTime($maxdate);
//
//				$row['hari_terlambat'] = $d2->diff($d1)->format("%a");
//				$temp = intval($row['hari_terlambat']) * ($permil / 1000) * doubleval($row['remaining_balance']);
//
//				$row['denda_terlambat'] = round($temp);
//
//				//---SH 1---
//				$row['hari_terlambatb'] = $d2->diff($d3)->format("%a");
//				$tempb = intval($row['hari_terlambatb']) * ($permil / 1000) * doubleval($row['remaining_balance']);
//				$row['denda_terlambatb'] = round($tempb);
//
//				$totalTagihan += doubleval($row['remaining_balance']);
//				$finalDataSp[] = $row;
//			}
//		}
//
//
//		$dataSPDb[0] = $finalDataSp;
//		$url = NULL;
//
//		$fileHtmlTpl = "";
//
//		$data = NULL;
//
//		if (count($dataSp) > 0) {
//			$data = $dataPurchase;
//			//main data
//			//format customer address
////            $customerAddress = $data["customer_address"];
////            $cusAdLem = "RT/RW";
////            $customerAddress = explode($cusAdLem, $customerAddress);
////            if(count($customerAddress) > 1){
////                $customerAddress = $customerAddress[0]." <br/> ".$cusAdLem." ".$customerAddress[1];
////            }
////            $data["customer_address"] = $customerAddress;
//			// end format customer address
//
//
//			$data = array_merge($data, $globalParams);
//			$data["salesman_name"] = isset($data["salesman_name"]) ? $data["salesman_name"] : "";
//			$data["salesman_name"] = ucfirst(strtolower($data["salesman_name"]));
//
//			$data['tanggal_print'] = date("d-m-Y");
//
//			$data['tanggal_print_w'] = Erems_Box_Tools::indodayWords(date("Y-m-d"));
//
//			$data["total_tagihan"] = $totalTagihan;
//			$data["total_tagihan_teks"] = number_format($totalTagihan, 2, ',', '.');
//
//			// temp losari
//
//			$totalTagihan = $totalTagihan + 0.00999;
//
//			// end temp losari
//			// var_dump(Erems_Box_Tools::toCurrency($totalTagihan));
//			$data["total_tagihan_terbilang"] = Erems_Box_Library_TerbilangB::terbilang($totalTagihan, 3);
//
//			//tambahan SH1
//			$data["max_date"] = $maxdate;
//			//add by imaam on 20190919
//			$data["max_sp"] = $dataPurchase['sp_surat_ke'];
////            $data["max_sp"] = $maxsp;
//			$data["max_sp_no"] = $maxspno;
//
//			// update status print di schedule
//
//
//			$scheduleSetPrint = array();
//			$scheduleJenisSpSetPrint = array();
//			foreach ($dataSp as $row) {
//				$scheduleSetPrint[] = $row["schedule_id"];
//				$scheduleJenisSpSetPrint[] = $row["indicatorname"];
//			}
//			$scheduleSetPrint = implode("~", $scheduleSetPrint);
//			$scheduleJenisSpSetPrint = implode("~", $scheduleJenisSpSetPrint);
//			$updatePrint = $dao->updatePrint($this->getAppSession()->getUser()->getId(), $scheduleSetPrint, $scheduleJenisSpSetPrint);
//
//			//$userInfo = Erems_Box_Tools::getCurrentUserInfo();
//
//
//			$userInfo = $dao->getUserInfo($this->getAppSession()->getUser()->getId());
//			$data['user_fullname'] = $userInfo['user_fullname'];
//			$data['user_initial'] = $userInfo['description'];
//
//			/* Start: Templating */
//
//			$TplDir = $params["directory"];
//
//			/* End:Templating */
//
//
//			// $data['pt_name'] = "test";
//			$fileSrc = false;
//			$data['ada_sp4'] = isset($data['ada_sp4']) ? $data['ada_sp4'] : 0;
//			if (intval($data['ada_sp4']) > 0) {
//				$fileHtmlTpl = $TplDir . "sp4.html";
//
//				$fileSrc = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId())->getTemplateSp4Print();
//			} else {
//				$fileHtmlTpl = $TplDir . "sp1_3.html";
//
//				$fileSrc = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId())->getTemplateSp123Print();
//			}
//			$fileSrc = $fileSrc . ".docx";
//
//			$data['purchaseletter_no'] = isset($data['purchaseletter_no']) ? $data['purchaseletter_no'] : "";
//
//			if ($fileSrc) {
//				$finalFile = 'Surat_Peringatan_' . str_replace('/', '', $data['purchaseletter_no']) . '.docx';
//
//				$p = new Erems_Box_Library_MyWordParser();
//				$p->useTable = 2;
//
//				$p->addLoopingField(array('remaining_balance', 'duedate', 'sp_no', 'tanggal_sp'), count($dataSp));
//
//				$count = 1;
//				$tglPalingLambat = "INVALID_DATE";
//				$tglPalingLambatTemp = null;
//				foreach ($dataSp as $k => $dataSp) {
//					if (strlen($dataSp['tanggal_sp']) > 5) {
//
//						$data['remaining_balance' . $count] = Erems_Box_Tools::toCurrency($dataSp['remaining_balance']);
//						$data['duedate' . $count] = Erems_Box_Tools::formatDate($dataSp['duedate'], 'd-m-Y');
//						$data['sp_no' . $count] = $dataSp['sp_no'];
//						if ($maxschid == $dataSp['schedule_id']) {
//							$data['max_sp_no'] = $dataSp['sp_no'];
//						}
//						$data['tanggal_sp' . $count] = Erems_Box_Tools::formatDate($dataSp['tanggal_sp'], 'd-m-Y');
//						$data['scheduletype' . $count] = $dataSp['scheduletype'];
//
//						$date2 = new DateTime($dataSp['duedate']);
//						// $tempDate = new DateTime($data['tanggal_sp' . $count] . ' 0:0:00');
//						$tempDate = new DateTime(date("Y-m-d") . ' 0:0:00');
//						$tempDate->modify('+10 day');
//						$tglPalingLambat = $tempDate->format("d-m-Y");
//						$tglPalingLambatTemp = $tempDate;
//						$data['hari_terlambat' . $count] = $date2->diff($tempDate)->format("%a");
//
//						$count++;
//					}
//				}
//
//				$data['tgl_paling_lambat'] = $tglPalingLambat;
//				$data['max_date_w'] = Erems_Box_Tools::indodayWords($data["max_date"]);
//
//				$ok = TRUE;
//				$url = "URL";
//
//				if (!$ok) {
//					$msg = "ERR : " . $p->error;
//				}
//			} else {
//				$msg = "ERR : Tidak ada file template cetakan";
//			}
//		} else {
//			$msg = "Tidak ada tagihan yang kena SP";
//		}
//
//
//
//		/// check jika pakai html dari php
//		//  $htmlTemplate = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(),$this->getAppSession()->getPt()->getId())->getSuratPeringatanTemplate();
//
		$htmlTemplate = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId())->getSuratPeringatanTemplate();
//		//  var_dump(method_exists($genco, 'getSuratPeringatanTemplate'));
//		//  var_export(is_callable(array($genco, 'getSuratPeringatanTemplate')));

		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dm->setDirectResult(TRUE);
		$dm->setRequiredDataList(FALSE);
		$dm->setRequiredModel(FALSE);

//		$htmlTplFinal = 0;
//
//		if ($data['pt_id'] == "39") {
//			$data['nama_pt'] = "PT. MITRAKUSUMA ERASEMESTA";
//			$data['acc_no_mandiri'] = '122-0007771598';
//			$data['acc_no_bca'] = '1980300001';
//		} else {
//			$data['nama_pt'] = "PT. CIPUTRA INDAH";
//			$data['acc_no_mandiri'] = '122-0099055322';
//			$data['acc_no_bca'] = '1983030801';
//		}
//
//
//		$data['is_printpreview'] = 0;
//
//		$dataFollowUp['tpl_file'] = $fileHtmlTpl;
//		$dataFollowUp['dataHeader'] = Zend_Json::encode($data);
//		$dataFollowUp['dataSchedule'] = Zend_Json::encode($dataSPDb);
//		$dataFollowUp['dataDetail'] = $dataSPDb[0];
//
//		if ($msg == "") {
//			$model_followup = new Erems_Models_Followup();
//			$model_followup->followupHistoryCreate($dataFollowUp);
//		}

		$model_followup = new Erems_Models_Followup();
		$dataFollowup = $model_followup->followupHistoryRead($params)['data'];
		$data = Zend_Json::decode($dataFollowup['data_header']);
		$dataSPDb = Zend_Json::decode($dataFollowup['data_sch']);
//		print_r($dataSPDb);die;

		$htmlTplFinal = $htmlTemplate->getHTML($data["max_sp"], $data);
		$otherAT = array(array(
				"PRINTOUT" => TRUE,
				"MSG" => '',
				"URL" => 'URL',
				"TPLFILE" => $dataFollowup['tpl_file'],
				"HTML_TEMPLATE" => $htmlTplFinal,
				"DATA" => $data,
				"DATASCH" => $dataSPDb,
				"TAGIHAN_TABLE" => $htmlTemplate->getListTagihanHTML(array("schedule" => $dataSPDb))
		));
		$dm->setHasil(array($otherAT));
		return $dm;
	}

	public function printouttemplateRead() {

		/* Start: Templating by David - MIS */

		$TplDir = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId())->getFollowUpDirTemplate();

		return Erems_Box_Tools::instantRead($TplDir, array());

		/* End:Templating */
	}

}

?>
