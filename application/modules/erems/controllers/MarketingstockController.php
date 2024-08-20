<?php

class Erems_MarketingstockController extends Erems_Box_Models_App_Hermes_AbstractController {

	protected function testingFlag() {
		return FALSE;
	}

	public function allRead() {
		$app_session = $this->getAppSession();
		$project     = $app_session->getProject();
		$pt          = $app_session->getPt();

		$dm       = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'marketingstock', array('unittran','unitstatus','clusterb','blocktran'), array('detail','list_unit_id','serahterima_plan'));
		$dao      = new Erems_Models_Marketingstock_Dao();
		$ms       = new Erems_Models_Marketingstock_MarketingStock();

		$ms->getUnit()->setProject($project);
		$ms->getUnit()->setPt($pt);

		$hasil = $dao->getAll($this->getAppRequest(),$ms);

		$dm->setDataList($dataList);
		$dm->setHasil($hasil);

	   return $dm;
	}

	public function deletereasonRead(){
		$read_type_mode = ($this->getRequest()->getPost('mode_read') ? $this->getRequest()->getPost('mode_read') : '');

		if($read_type_mode == 'deletereason') {
			$model_masterdeletereason = new Erems_Models_Masterdeletereason();
			$result = $model_masterdeletereason->masterdeletereasonRead($param = array());

			echo Zend_Json::encode($result);
			$this->_helper->viewRenderer->setNoRender(true);
			die();
		}
	}

	public function unitlistRead() {
		$app_session = $this->getAppSession();
		$project     = $app_session->getProject();
		$pt          = $app_session->getPt();

		$dm       = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'unittran', array('blockb', 'pt', 'clusterb', 'type', 'productcategory','position','side','purpose','unitstatus'), array());
		$dao      = new Erems_Models_Unit_UnitDao();
		$unitTran = new Erems_Models_Unit_UnitTran();

		$unitTran->setProject($project);
		$unitTran->setPt($pt);
		$unitTran->setIsReadyStock(1);

		$this->getAppRequest()->setOthersValue("unitstatus_unitstatus_id",  Erems_Box_Config::UNITSTATUS_AVAILABLE);

		$hasil = $dao->getByProjectPtWitPage2($unitTran,$this->getAppRequest());

		$dm->setDataList($dataList);
		$dm->setHasil($hasil);

		return $dm;
	}

	public function selectedunitRead() {
		$app_session = $this->getAppSession();
		$project     = $app_session->getProject();
		$pt          = $app_session->getPt();

		$dm       = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'unittran', array('blockb', 'pt', 'clusterb', 'type', 'productcategory','position','side','purpose','unitstatus'), array());
		$dao      = new Erems_Models_Unit_UnitDao();
		$unitTran = new Erems_Models_Unit_UnitTran();

		$unitTran->setArrayTable($this->getAppData());
		$unitTran->setProject($project);
		$unitTran->setPt($pt);

		$hasil    = $dao->getByProjectPtWitPage($unitTran, $this->getAppRequest());

		$dm->setDataList($dataList);
		$dm->setHasil($hasil);

		return $dm;
	}

	public function priceRead() {
		$dm       = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'pricealt', array('unit', 'pricetype'));
		$dao      = new Erems_Models_Unit_UnitDao();
		$unit     = new Erems_Models_Unit_Unit();

		$unit->setArrayTable($this->getAppData());

		$hasil = $dao->getPrice($unit->getId());

		$dm->setDataList($dataList);
		$dm->setHasil($hasil);

		return $dm;
	}

	public function unitdetailRead() {
		$app_session = $this->getAppSession();
		$project     = $app_session->getProject();
		$pt          = $app_session->getPt();

		$dm       = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'projectfacilities', array('facilitiestype'), array('deletedRows','detail'));
		$dao      = new Erems_Models_Master_ProjectFacilitiesDao();
		$pf       = new Erems_Models_Master_ProjectFacilities();

		$pf->setArrayTable($this->getAppData());
		$pf->setProject($project);
		$pf->setPt($pt);

		$hasil = $dao->getAll($this->getAppRequest(),$pf);

		$dm->setDataList($dataList);
		$dm->setHasil($hasil);

		return $dm;
	}

	public function detailRead() {
		$app_session = $this->getAppSession();
		$project     = $app_session->getProject();
		$pt          = $app_session->getPt();
		$projectid   = $project->getId();
		$ptid        = $pt->getId();

		$genco = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($projectid, $ptid);

		$dm = new Erems_Box_Models_App_Hermes_DataModel();

		$dm->setDirectResult(TRUE);
		$dm->setRequiredDataList(FALSE);
		$dm->setRequiredModel(FALSE);

		$masterPL = new Erems_Models_App_Masterdata_FacilitiesType();
		$allPL = $masterPL->prosesDataWithSession($app_session, TRUE);

		$masterT = new Erems_Models_App_Masterdata_Type();
		$masterT->setSes($app_session);
		$allT = $masterT->prosesDataWithSession($app_session, TRUE);

		$mc = new Erems_Models_App_Masterdata_Cluster();
		$ac = $mc->prosesDataWithSession($app_session, TRUE);

		$mb = new Erems_Models_App_Masterdata_Block();
		$ab = $mb->prosesDataWithSession($app_session, TRUE);

		$mp = new Erems_Models_App_Masterdata_Position();
		$ap = $mp->prosesDataWithSession($app_session, TRUE);

		$mpc = new Erems_Models_App_Masterdata_ProductCategory();
		$apc = $mpc->prosesDataWithSession($app_session, TRUE);

		$ms = new Erems_Models_App_Masterdata_Side();
		$as = $ms->prosesDataWithSession($app_session, TRUE);

		$mus = new Erems_Models_App_Masterdata_UnitStatus();
		$aus = $mus->prosesDataWithSession($app_session, TRUE);

		$mpt = new Erems_Models_App_Masterdata_Pt();
		$apt = $mpt->prosesDataWithSession($app_session, TRUE);

		$paramsRequestResult = Erems_Box_Tools::globalParamsExistMarketingStock($app_session);

		// cek semua fungsi yang digunakan keperluan masing Project
		$dir               = APPLICATION_PATH . '/../public/app/erems/projectlibs/';
		$prolibsFiles      = scandir($dir);
		$prolibsFound      = NULL;
		$className         = "Prolibs_" . $projectid . "_" . $ptid;
		$prolibsFileSearch = $className . ".js";

		if (count($prolibsFiles) > 0) {
			$prolibsFiles = preg_grep("/.js$/", $prolibsFiles);

			if (in_array($prolibsFileSearch, $prolibsFiles)) {
				$prolibsFound = $className;
			}
		}

		$post_data['start']       = $this->getRequest()->getPost('start');
		$post_data['limit']       = $this->getRequest()->getPost('limit');
		$post_data['code']        = $this->getRequest()->getPost('code');
		$post_data['purpose']     = $this->getRequest()->getPost('purpose');
		$post_data['description'] = $this->getRequest()->getPost('description');
		$mp  = new Erems_Models_Masterpurpose();
		$rmp = $mp->masterpurposeRead($post_data);

		$otherAT = array(array(
			"PT_KPR"                => Erems_Box_Config::PRICETYPE_KPR,
			"PT_INH"                => Erems_Box_Config::PRICETYPE_INHOUSE,
			"PT_TUNAI"              => Erems_Box_Config::PRICETYPE_TUNAI,
			"GLOBALPARAMSEXIST"     => $paramsRequestResult["status"],
			"GLOBALPARAMSMSG"       => $paramsRequestResult["msg"],
			"GLOBALPARAMSPARAMS"    => $paramsRequestResult["parameters"],
			"PROLIBFILE"            => $prolibsFound,
			"USE_RUMUSBIAYA"        => $genco->useRumusBiayaProlibs(),
			"CHANGE_TYPE"           => $genco->MktStockChgType(),
			"typeCalculaterounding" => $genco->typeCalculaterounding(),
			"syncSalesForce"        => $genco->syncSalesForceOpportunityCustomer(),
			"purpose"               => $rmp['success'] ? $rmp['data'] : array(),
			"isSH2"                 => $genco->isSH2()
		));

		$dm->setHasil(array($allPL,$allT,$otherAT,$ac,$ab,$ap,$apc,$as,$aus,$apt));

		return $dm;
	}

	public function maindetailRead() {
		$dm       = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'projectfacilities', array('facilitiestype'));
		$pl       = new Erems_Models_Master_ProjectFacilities();

		$pl->setArrayTable($this->getAppData());

		$hasil = array();

		$dm->setDataList($dataList);
		$dm->setHasil($hasil);

		return $dm;
	}

	public function mainCreate() {
		$dm  = new Erems_Box_Models_App_Hermes_DataModel();
		$obj = new Erems_Models_Marketingstock_MarketingStock();
		$v   = new Erems_Models_Marketingstock_Validator();

		$v->setDataRequest($this->getAppData());
		$dm->setDao(new Erems_Models_Marketingstock_Dao());
		$dm->setValidator($v);
		$dm->setObject($obj);

		return $dm;
	}

	public function syncRead() {
		$app_session = $this->getAppSession();
		$projectId = $app_session->getProject()->getId();
		$ptId = $app_session->getPt()->getId();
		$userId = $app_session->getUser()->getId();


		$postData = Zend_Json::decode($this->getRequest()->getPost('data'));

		$configSF = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($projectId, $ptId)->configSalesForceOpportunityCustomer();
		$curl = curl_init();
		curl_setopt_array($curl, array(
			CURLOPT_URL => $configSF['URL_SFDC'] . '/services/oauth2/token?grant_type=' . $configSF['GRAND_TYPE'] . '&client_id=' . $configSF['CLIENT_ID'] . '&client_secret=' . $configSF['CLIENT_SECRET'] . '&username=' . $configSF['username'] . '&password=' . $configSF['password'],
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_ENCODING => '',
			CURLOPT_MAXREDIRS => 10,
			CURLOPT_TIMEOUT => 0,
			CURLOPT_FOLLOWLOCATION => true,
			CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			CURLOPT_CUSTOMREQUEST => 'POST',
			CURLOPT_SSL_VERIFYPEER => false,
		));

		$error_msg = "";
		$exec = curl_exec($curl);
		if (curl_errno($curl)) {
			$error_msg = curl_error($curl);
		}

		curl_close($curl);
		$response = json_decode($exec);

		if (isset($response->error)) {
			$result['success'] = FALSE;
			$result['message'] = $response->error_description;
		} else {
			$arrToJson = [
				'allOrNone' => false,
				'records' => []
			];
			$records = [];
			foreach ($postData['dataUnit'] as $key => $valData) {
				$records[] = [
					'attributes' => ['type' => 'Unit_EREMS__c', 'referenceId' => 'ref1'],
					'name' => $projectId . trim($valData['cluster_code']) . trim($valData['unit_unit_number']),
					"Cluster_Area_Name__c" => trim($valData['cluster_cluster']),
					"Block__c" => trim($valData['unit_unit_number']),
					"Cluster_Code_Area__c" => trim($valData['cluster_code']),
					"erems_cluster_id__c" => $valData['cluster_cluster_id'],
					"erems_blok_id__c" => $valData['block_block_id'],
					"erems_unit_id__c" => $valData['unit_unit_id'],
					"Status_Unit__c" => $valData['unitstatus_status'],
					"Project__r" => ["Project_Code__c" => $projectId]
				];
			}
			$arrToJson['records'] = $records;

			$curl = curl_init();
			$urlPatch = $response->instance_url . '/services/data/v57.0/composite/sobjects/Unit_EREMS__c/erems_unit_id__c';
			curl_setopt_array($curl, array(
				CURLOPT_URL => $urlPatch,
				CURLOPT_RETURNTRANSFER => true,
				CURLOPT_ENCODING => '',
				CURLOPT_MAXREDIRS => 10,
				CURLOPT_TIMEOUT => 0,
				CURLOPT_FOLLOWLOCATION => true,
				CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
				CURLOPT_CUSTOMREQUEST => 'PATCH',
				CURLOPT_SSL_VERIFYPEER => false,
				CURLOPT_POSTFIELDS => json_encode($arrToJson),
				CURLOPT_HTTPHEADER => [
					'Authorization: Bearer ' . $response->access_token,
					'Content-Type: application/json'
				]
			));

			$error_msg = "";
			$exec = curl_exec($curl);
			if (curl_errno($curl)) {
				$error_msg = curl_error($curl);
			}

			curl_close($curl);
			$response = json_decode($exec);
			$model_marketingstock = new Erems_Models_Marketingstock();
			$inserLog = $model_marketingstock->marketingstockInsertLogSF(['Marketing Stock', $userId, 0, $_SERVER['REMOTE_ADDR'], $urlPatch, 'PATCH', json_encode($arrToJson), base64_encode($exec), 1]);

			$result['success'] = TRUE;
			$result['message'] = @$response->error_description;
		}
		echo Zend_Json::encode($result);
		$this->_helper->viewRenderer->setNoRender(true);
		die();
	}

	public function mainDelete(){
		$read_type_mode = ($this->getRequest()->getPost('read_type_mode') ? $this->getRequest()->getPost('read_type_mode') : '');

		if($read_type_mode == 'update_delete_reason'){
			$post_data['marketstock_id']    = $this->getRequest()->getPost('marketstock_id');
			$post_data['Deletereason_id']   = $this->getRequest()->getPost('Deletereason_id');
			$post_data['Deletereason_desc'] = $this->getRequest()->getPost('Deletereason_desc');

			$model_marketingstock = new Erems_Models_Marketingstock();
			$result = $model_marketingstock->marketingstockUpdateDeleteReason($post_data);
		}

		echo Zend_Json::encode($result);
		$this->_helper->viewRenderer->setNoRender(true);
		die();
	}

	protected function getDefaultProcessor() {
		return new Erems_Models_App_Box_MarketingStockProcessor();
	}
}
?>
