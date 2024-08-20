<?php

class Erems_ProgressunitController extends Erems_Box_Models_App_Hermes_AbstractController {

	protected function testingFlag() {
		return FALSE;
	}

	public function allRead() {
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'unitb', array('clusterb', 'blockb', 'customerprofile', 'purchaseletter', 'pricetype', 'constructionb', 'spk'), array());
		$dao = new Erems_Models_Unit_UnitDao();
		$hasil = $dao->getUnitConstructionList($this->getAppRequest(),
				$this->getAppSession()->getProject()->getId(),
				$this->getAppSession()->getPt()->getId());
		$dm->setDataList($dataList);
		$dm->setHasil($hasil);


		return $dm;
	}

	public function listspkRead() {

		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'spktransaction', array('contractorprofile', 'user', 'spkdetail'), array());
		$dao = new Erems_Models_Spk_SpkDao();
		$u = new Erems_Models_Unit_Unit();
		$u->setArrayTable($this->getAppData());
		$hasil = $dao->getAllByUnitForProgressunit($u);
		$dm->setDataList($dataList);
		$dm->setHasil($hasil);


		return $dm;
	}

	public function unitinfoRead() {
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'unittran', array('unitstatus', 'productcategory', 'typetran', 'customerprofile', 'purchaselettertransaction', 'pricetype', 'cluster', 'block', 'city'), array());

		$dao = new Erems_Models_Unit_UnitDao();
		$unit = new Erems_Models_Unit_Unit();
		$unit->setArrayTable($this->getAppData());
		//  $unit->setId(5);

		$stt = $dao->getOne($unit);
		if (sizeof($stt) > 0) {
			$unitstatus = $stt[1][0]['unitstatus_status'];
		} else {
			$unitstatus = "SOLD";
		}
		if ($unitstatus == "SOLD" || $unitstatus == "LEGAL") {
			$hasil = $dao->getPurchaseLetterInfo($unit);
		} else {
			$hasil = $dao->getNonPurchaseLetterInfo($unit);
		}

		$dm->setDataList($dataList);
		$dm->setHasil($hasil);


		return $dm;
	}

	public function constructionspkRead() {
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'construction', array('spk', 'user'), array());
		$dao = new Erems_Models_Construction_Dao();

		$hasil = $dao->getBySpk($this->getAppRequest());
		$dm->setDataList($dataList);
		$dm->setHasil($hasil);


		return $dm;
	}

	public function constructionspkunitRead() {
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		if ($this->getRequest()->getPost('page') == 'mainDetail') {
			$dataList = new Erems_Box_Models_App_DataListCreator('', 'spktransaction', array('contractorprofile', 'user', 'spkdetail'), array());
		} else {
			$dataList = new Erems_Box_Models_App_DataListCreator('', 'construction', array('user'), array('deletedRows', 'send_mail'));
		}
		$dao = new Erems_Models_Construction_Dao();

		$hasil = $dao->getBySpkUnit($this->getAppRequest());
		$dm->setDataList($dataList);
		$dm->setHasil($hasil);


		return $dm;
	}

	//


	public function pictureRead() {
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'constructionpicture', array(), array());
		$dao = new Erems_Models_Construction_Dao();
		$r = $this->getAppRequest();
		$m = $r->getOthers();
		$mode = NULL;
		if (array_key_exists("mode", $m)) {
			$mode = $m["mode"];
		}

		//$m = $r->getOthers();
		if ($mode == "spkunit") {
			$hasil = $dao->getPictureBySpkUnit($r);
		} else {
			$hasil = $dao->getPictureByConstruction($this->getAppRequest());
		}

		$dm->setDataList($dataList);
		$dm->setHasil($hasil);

		return $dm;
	}

	//// Added by erwin.st 28052021
	public function pictureapiRead() {

		$post = $this->getAppRequest()->getOthers();

		$curl = curl_init();

        curl_setopt_array($curl, array(
			CURLOPT_URL            => 'https://cpms.ciputragroup.com:81/api/progressfoto?token=028a2c6311c526f52763da1f4e15af96&unit_id=' . $post['unit_id'],
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_ENCODING       => '',
			CURLOPT_MAXREDIRS      => 10,
			CURLOPT_TIMEOUT        => 0,
			CURLOPT_FOLLOWLOCATION => true,
			CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_1_1,
			CURLOPT_CUSTOMREQUEST  => 'POST',
			CURLOPT_SSL_VERIFYPEER => false,  
			CURLOPT_HTTPHEADER     => array('Content-Type: application/x-www-form-urlencoded'),
        ));

        $result = curl_exec($curl);

        curl_close($curl);

        echo $result;

		exit;
	}

	public function maindetailRead() {
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'construction', array('unitb', 'spk', 'purchaseletter'), array('progressdetail', 'send_mail', 'deletedRows'));

		$hasil = array();
		$dm->setDataList($dataList);
		$dm->setHasil($hasil);

		return $dm;
	}

	public function targetRead() {
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'constarget', array('plafon', 'batasplafon'), array());
		$data = $this->getAppData();
		$dao = new Erems_Models_Construction_Dao();
		$hasil = $dao->getTargets($data["unit_id"], $data["spk_id"]);

		$dm->setDataList($dataList);
		$dm->setHasil($hasil);


		return $dm;
	}

	public function cairRead() {
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'conscair', array('plafon'), array());
		$dao = new Erems_Models_Construction_Dao();
		$data = $this->getAppData();
		$unitId = $data["unit_id"];
		$spkId = $data["spk_id"];
		$hasil = $dao->getCairs($unitId, $spkId);
		$dm->setDataList($dataList);
		$dm->setHasil($hasil);


		return $dm;
	}

	public function deleteprogressRead() {

		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dm->setDirectResult(TRUE);
		$dm->setRequiredDataList(FALSE);
		$dm->setRequiredModel(FALSE);

		$c = new Erems_Models_Construction_Construction();
		$c->setArrayTable($this->getAppData());


		//start logic hapus juga pencairan.
		$dao = new Erems_Models_Construction_Dao();
		$process = new Erems_Models_App_Box_ProgressUnitProcessor();
		$cons = $dao->getByConstruction($c->getId());

		if (isset($cons[0][0])) {
			$co = new Erems_Models_Construction_Construction;
			$co->getSpk()->setId($cons[0][0]['spk_id']);
			$co->getUnit()->setId($cons[0][0]['unit_id']);
			$pencairanDelete = $process->updatePencairanOnProgressDelete($co, $this->getAppSession(), $c->getId());
		}

		$msg = "";
		if ($pencairanDelete) {
			$hasilDelete = $dao->deleteOne($c, $this->getAppSession());
			if ($hasilDelete) {
				$msg = "Progress telah dihapus.";
			} else {
				$msg = "Terjadi kesalahan ketika memproses permintaan Anda.";
			}
		} else {
			$hasilDelete = $pencairanDelete;
			$msg = "Harap hapus dari nilai progress terbesar.";
		}

		$otherAT = array(array(
				"STATUS" => $hasilDelete,
				"MSG" => $msg
		));
		$dm->setHasil(array($otherAT));


		return $dm;
	}

	public function updatetargetRead() {






		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dm->setDirectResult(TRUE);
		$dm->setRequiredDataList(FALSE);
		$dm->setRequiredModel(FALSE);

		$data = $this->getAppData();



		$target = new Erems_Models_Construction_Target();
		$target->setArrayTable($data);
		$target->setAddBy($this->getAppSession()->getUser()->getId());
		$dao = new Erems_Models_Construction_Dao();
		$hasilUpdate = $dao->updateTargetNew($target);



		$otherAT = array(array(
				"STATUS" => $hasilUpdate
		));




		$dm->setHasil(array($otherAT));


		return $dm;
	}

	public function generatetargetRead() {





		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dm->setDirectResult(TRUE);
		$dm->setRequiredDataList(FALSE);
		$dm->setRequiredModel(FALSE);

		$data = $this->getAppData();

		/// get all data from batas plafon
		$bpDao = new Erems_Models_Construction_BatasPlafonDao();
		$bp = new Erems_Models_Construction_BatasPlafon();
		$bp->setProject($this->getAppSession()->getProject());
		$bp->setPt($this->getAppSession()->getPt());
		$bpData = $bpDao->getAll($this->getAppRequest(), $bp);

		$hasilOb = Erems_Box_Tools::dbResultToObjects($bpData, 'batasplafon');

		// get spkdetail
		$sDao = new Erems_Models_Spk_SpkDao();
		$sData = $sDao->getOneDetail($data["spk_id"], $data["unit_id"]);

		$hasilObs = Erems_Box_Tools::dbResultToObjects($sData, "spkdetail");


		$allTarget = array();
		if ($hasilOb && $hasilObs) {
			foreach ($hasilOb as $row) {
				if ($row instanceof Erems_Models_Construction_BatasPlafon) {

					/// create new target
					$newTarget = new Erems_Models_Construction_Target();

					$newTarget->getSpkDetail()->setId($hasilObs[0]->getId());

					$newTarget->setPlafon($row->getPlafon());
					$newTarget->getUnit()->setId($data["unit_id"]);
					$allTarget[] = $newTarget;
				}
			}
		}

		$de = new Erems_Box_Delien_DelimiterEnhancer();
		$decan = new Erems_Box_Models_App_DecanForObject($allTarget);
		// die(print_r($decan));
		$de->setDelimiterCandidate($decan);
		$de->generate();



		/// save all target
		$dao = new Erems_Models_Construction_Dao();
		$hasilSave = $dao->generateTarget($this->getAppSession(), $decan);





		$otherAT = array(array(
				"STATUS" => $hasilSave,
		));




		$dm->setHasil(array($otherAT));


		return $dm;
	}

	public function detailRead() {
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dm->setDirectResult(TRUE);
		$dm->setRequiredDataList(FALSE);
		$dm->setRequiredModel(FALSE);

		$creator = new Erems_Box_Models_App_Creator();

		//===== MASTERDATA == //
		$masterSpkTy = new Erems_Models_App_Masterdata_SpkType();
		$allSpkTy = $masterSpkTy->prosesDataWithSession($this->getAppSession(), TRUE);

		$masterCtr = new Erems_Models_App_Masterdata_Contractor();
		$allCtr = $masterCtr->prosesDataWithSession($this->getAppSession(), TRUE);

		$mc = new Erems_Models_App_Masterdata_Cluster();
		$ac = $mc->prosesDataWithSession($this->getAppSession(), TRUE);

		$mb = new Erems_Models_App_Masterdata_Block();
		$ab = $mb->prosesDataWithSession($this->getAppSession(), TRUE);

		$ts = new Erems_Models_App_Masterdata_Spk();
		$ats = $ts->prosesDataWithSession($this->getAppSession(), TRUE);

		$paramsRequestResult = Erems_Box_Tools::globalParamsExistConstruction($this->getAppSession());
		$genco = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId());

		$otherAT = array(array(
				"GLOBALPARAMSEXIST"  => $paramsRequestResult["status"],
				"GLOBALPARAMSMSG"    => $paramsRequestResult["msg"],
				"GLOBALPARAMSPARAMS" => $paramsRequestResult["parameters"],
				"GENERATE_TARGET"    => $genco->showGenerateTarget(),
				"UPDATE_PROGRESS"    => $genco->showUpdateProgress(),
				"ISUSEPICCPMS"       => $genco->usePicProgressCPMS(),
				//added by anas 09072021
				"surveyConfig"       => $genco->activateSurveyFeatures(),
				// added by rico 27092022
				"editConfig"         => $genco->showProgressunitEdit(),
				"VisibleOrderBangun" => $genco->VisibleOrderBangun(),
		));

		$dm->setHasil(array($allSpkTy, $allCtr, $ac, $ab, $ats, $otherAT));


		return $dm;
	}

	public function contractordetailRead() {

		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'contractorprofile', array());
		$dao = new Erems_Models_Master_ContractorDao();
		$ct = new Erems_Models_Master_Contractor();
		$ct->setArrayTable($this->getAppData());
		$hasil = $dao->getById($ct);

		$dm->setDataList($dataList);
		$dm->setHasil($hasil);


		return $dm;
	}

	public function mainDelete() {

		$dm = new Erems_Box_Models_App_Hermes_DataModel();

		return $dm;
	}

	public function mainCreate() {
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$obj = new Erems_Models_Construction_Construction();
		$v = new Erems_Models_Construction_Validator();
		$v->setParams($this->getAppData());

		$dm->setDao(new Erems_Models_Construction_Dao());
		$dm->setValidator($v);
		$dm->setObject($obj);
//        $object = "a";
//        
//        $this->sendEmail($object);

		return $dm;
	}

	function uploadAction() {
		$app = new Erems_Box_Models_App_Models_Create($this);
		$msg = '???';
		$success = FALSE;
		$imageUpload = new Erems_Box_Models_App_ImageUpload("/public/app/erems/uploads/progress_unit/", "progress_unit_", "jpg,bmp");
		$imageUpload->run();
		if (!$imageUpload->isSuccess()) {
			$msg = $imageUpload->getErrorMsg();
		} else {
			$success = TRUE;
			$msg = $imageUpload->getImageName();
		}
		$app->setMsg($msg);
		$app->setSuccess($success);
		$app->run();
	}

	public function processinitRead() {

		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dm->setDirectResult(TRUE);
		$dm->setRequiredDataList(FALSE);
		$dm->setRequiredModel(FALSE);
		$kDao = new Erems_Models_Hrd_EmployeeDao();
		$filterEmployee = new Erems_Models_Hrd_Employee();
		$filterEmployee->setJabatanId(26); //pengawas
		$filterEmployee->setProject($this->getAppSession()->getProject());
		$filterEmployee->setPt($this->getAppSession()->getPt());


		$upline = $kDao->getAllWOPL($filterEmployee);
		$upline = Erems_Box_Tools::toObjectResult($upline, new Erems_Models_Hrd_Employee());

		$dm->setHasil(array($upline));
		return $dm;
	}

	public function savepengawasRead() {
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dm->setDirectResult(TRUE);
		$dm->setRequiredDataList(FALSE);
		$dm->setRequiredModel(FALSE);
		$data = $this->getAppRequest();
		$kdao = new Erems_Models_Spk_SpkDao();
		$hasil = $kdao->directUpdate($data);

		$otherAT = array(array(
				"STATUS" => "true",
				"MSG" => "Berhasil update status!"
		));

		$dm->setHasil(array($hasil, $otherAT));


		return $dm;
	}

//    public function sendemailschema() {
////        $dm = new Erems_Box_Models_App_Hermes_DataModel();
////        $obj = new Erems_Models_Construction_Construction();
////        $v = new Erems_Models_Construction_Validator();
////        $v->setParams($this->getAppData());
////
////        $dm->setDao(new Erems_Models_Construction_Dao());
//          $object = "a";
//          $dm = $this->sendEmail($object);
//    }
//    
//    private function sendEmail($object) {
//
//        $hasil = false;
//        $msg = NULL;
//        $cs = $object;
//
//        $statusSentMail = FALSE;
//
//        /// email ke yang approve
//        try {
//
//            $kontenHTML = "<html><body>";
//            
//            $kontenHTML = "test";
//            
//            $kontenHTML .= "</body></html>";
//            
//            
//         
//            
//            $mail = new Erems_Box_Library_Email();
//            $mail->getMail()->setFrom('mis.kpjkt@ciputra.co.id');
//            $mail->getMail()->setBodyHtml($kontenHTML);
//            $mail->getMail()->addTo("ignatius.samuel@ciputra.co.id");
//            $mail->getMail()->setSubject('[CES EREMS] Schema Progress Update '.$cs);
//            $mail->getMail()->send();
//
//            $statusSentMail = TRUE;
//            $msg = "SUCCESS";
//            $hasil = true;
//        } catch (Zend_Mail_Exception $e) {
//            $statusSentMail = FALSE;
//            $msg = "FAILED.";
//        }
//
//        $arrayRespon = array("hasil" => $hasil, "msg" => $msg, "status_sendmail" => $statusSentMail);
//        var_dump($arrayRespon);
//        die();
//        return $arrayRespon;
//    }

	protected function getDefaultProcessor() {
		return new Erems_Models_App_Box_ProgressUnitProcessor();
	}

	public function checkUnitRead() {
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'construction', array('unitb', 'spk', 'cluster', 'block'), array());
		$dao = new Erems_Models_Construction_Dao();
		$data = $this->getAppData();
		$hasil = $dao->getCheckUnit($data['unitCheck']);
		$dm->setDataList($dataList);
		$dm->setHasil($hasil);
		return $dm;
	}

	public function checkUnitOneClusterRead() {
		$dao = new Erems_Models_Construction_Dao();
		$data = $this->getAppData();
		$hasil = $dao->getCheckUnitOneCluster($data['unitCheck']);
		echo json_encode($hasil);
		exit;
	}
	
	public function checkUnitOneSpkRead() {
		$dao = new Erems_Models_Construction_Dao();
		$data = $this->getAppData();
		$hasil = $dao->getCheckUnitOneSpk($data['unitCheck']);
		echo json_encode($hasil);
		exit;
	}

	public function generateTargetUnitRead() {
		ini_set("memory_limit", "-1");
		ini_set('max_execution_time', 0);
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'construction', array('unitb', 'spk', 'cluster', 'block'), array());
		$dao = new Erems_Models_Construction_Dao();
		$data = $this->getAppData();
		$hasil = $dao->createGenerateTarget($data['unitCheck'], $this->getAppSession()->getUser()->getId());
		$dm->setDataList($dataList);
		$dm->setHasil($hasil);
		return $dm;
	}

	public function checkUnitprogressRead() {
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'construction', array('user', 'unitb', 'cluster', 'block'), array());
		// $dataList = new Erems_Box_Models_App_DataListCreator('', 'construction', array('unitb', 'spk', 'cluster', 'block'), array());
		$dao = new Erems_Models_Construction_Dao();
		$data = $this->getAppData();
		$hasil = $dao->getCheckUnitProgress($data['unitCheck']);
		// $dm->setDataList($dataList);
		// $dm->setHasil($hasil);
		// return $dm;
		echo json_encode($hasil);
		exit;
	}

	public function checkUnitOneClusterProgressRead() {
		$dao = new Erems_Models_Construction_Dao();
		$data = $this->getAppData();
		$hasil = $dao->getCheckUnitOneClusterProgress($data['unitCheck'], $data['progresPercent']);
		echo json_encode($hasil);
		exit;
	}
	
	public function checkUnitOneSpkProgressRead() {
		$dao = new Erems_Models_Construction_Dao();
		$data = $this->getAppData();
		$hasil = $dao->getCheckUnitOneSpkProgress($data['unitCheck'], $data['progresPercent']);
		echo json_encode($hasil);
		exit;
	}

	public function updateDetailProgressRead() {
		ini_set("memory_limit", "-1");
		ini_set('max_execution_time', 0);
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'construction', array('unitb', 'spk', 'cluster', 'block'), array());
		$dao = new Erems_Models_Construction_Dao();
		$data = $this->getAppData();
		// print_r($data);exit;
		$hasil = $dao->updateDetailProgress($data['unitCheck'], $data['progressDate'], $data['progresPercent'], $data['description'], $this->getAppSession()->getUser()->getId());
		$dm->setDataList($dataList);
		$dm->setHasil($hasil);
		return $dm;
	}

	//added by anas 09072021
    public function surveyRead() {
        $dao = new Erems_Models_Unit_UnitDao();
        $hasil = $dao->updateSurvey($this->getAppRequest(), $this->getAppSession());
        echo Zend_Json::encode($hasil);
        die();
	}

	public function orderBangunRead() {
        $dao = new Erems_Models_Unit_UnitDao();
        $hasil = $dao->updateOrderBangun($this->getAppRequest(), $this->getAppSession());
        echo Zend_Json::encode($hasil);
        die();
	}
}
?>