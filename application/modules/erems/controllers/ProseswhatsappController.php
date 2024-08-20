<?php

class Erems_ProseswhatsappController extends Erems_Models_App_Template_AbstractMasterController {

	public function _getMainDataModel() {
		$dao = new Erems_Models_Whatsapp_Dao();
		//  $dao->setSession($this->getAppSession());
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dm->setDataList(new Erems_Box_Models_App_DataListCreator('', 'proseswhatsapp', array('whatsappcategory', 'clusterb', 'unitb', 'customer', 'employee', 'purchaseletter'), array()));
		$dm->setObject(new Erems_Models_Whatsapp_Proseswhatsapp());
		$dm->setDao($dao);
		$dm->setValidator(new Erems_Models_Whatsapp_Validator());
		$dm->setIdProperty("whatsapp_id");
		return $dm;
	}

	public function mainCreate() {
		$dao = new Erems_Models_Whatsapp_Dao();

		$pw = new Erems_Models_Whatsapp_Proseswhatsapp();
		$pw->getAddBy($this->getAppSession()->getUser()->getId());
		$pw->setProject($this->getAppSession()->getProject());
		$pw->setPt($this->getAppSession()->getPt());

		//  $dao->setSession($this->getAppSession());
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dm->setObject($pw);
		$dm->setDao($dao);
		$dm->setValidator(new Erems_Models_Master_ProseswhatsappValidator());

		return $dm;
	}

	public function allRead() {
		$data = $this->getAppData();

		$dm = $this->_getMainDataModel();
		if ($dm instanceof Erems_Box_Models_App_Hermes_DataModel) {
			$dataList = $dm->getDataList();
			$dao = $dm->getDao();
			$obj = $dm->getObject();
			$obj->setArrayTable($this->getAppData());

			if ($obj instanceof Erems_Box_Models_Master_InterProjectPt) {
				$ses = $this->getAppSession();
				$obj->setProject($ses->getProject());
				$obj->setPt($ses->getPt());
			}

			if (array_key_exists("wastatus", $data)) {
				$status = $data["wastatus"];
			} else {
				$status = NULL;
			}

			$hasil = $dao->getAll($this->getAppRequest(), $obj, $data["unit_number"], $data["customer_name"], $data["process_date"], $data["whatsappcategory_whatsappcategory_id"], $status
					// , $data["bot_purchaseletter_date"], $data["top_purchaseletter_date"]);
					, '', '');

			$dm->setDataList($dataList);
			$dm->setHasil($hasil);
		}

		return $dm;
	}

	public function proseswhatsappRead() {
		$hasil = FALSE;
		$msg = "Proses...";

		$data = $this->getAppData();

		$dao = new Erems_Models_Whatsapp_Dao();

		/// get detail proseswhatsapp kategori;
		$scFilter = new Erems_Models_Whatsapp_WhatsappCategory();
		$scFilter->setId($data["proseswhatsappcategory_id"]);
		$scFilter->setProject($this->getAppSession()->getProject());
		$scFilter->setPt($this->getAppSession()->getPt());
		$sc = $dao->getWhatsappCategory($scFilter);
		$sc = Erems_Box_Tools::toObjectRow($sc, new Erems_Models_Whatsapp_WhatsappCategory());

		$proseswhatsappCategoryCode = $sc->getCode();
		// $proseswhatsappCategoryCode = Erems_Box_Config::WhatsappCAT_WAWANCARA;
		$startDate = isset($data["start_date"]) ? $data["start_date"] : NULL;
		$endDate = isset($data["end_date"]) ? $data["end_date"] : NULL;

		$datediff = strtotime($startDate) - strtotime($endDate);
		$datediff = abs(floor($datediff / (60 * 60 * 24)));

		// 31 hari untuk 24 bulan.
		if ($datediff > (31 * 24)) {
			$msg = "Proses proseswhatsapp maksimal " . (31 * 24) . " hari.";
		} else {
			$params = array(
				"proseswhatsappcategory_id" => $sc->getId(),
				"proseswhatsappcategory_code" => $proseswhatsappCategoryCode,
				"process_date" => $data["process_date"],
				"project_id" => $this->getAppSession()->getProject()->getId(),
				"pt_id" => $this->getAppSession()->getPt()->getId(),
				"start_date" => $startDate,
				"end_date" => $endDate,
				"template" => $sc->getTemplate()
			);

			$builder = new Erems_Models_Proseswhatsapp_Builder();
			$allProseswhatsapp = $builder->proses($params);

			if (count($allProseswhatsapp) > 0) {
				$decan = Erems_Box_Tools::toDecan($allProseswhatsapp);
				$hasil = $dao->saveMultiWhatsapp($this->getAppSession()->getUser()->getId(), $this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId(), $decan);
				if ($hasil) {
					$msg = "Sukses";
				}
			} else {
				$msg = "No record.";
			}
		}

		$arrayRespon = array("HASIL" => $hasil,
			"MSG" => $msg);
		return Erems_Box_Tools::instantRead($arrayRespon, array());
	}

	public function detailRead() {
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dm->setDirectResult(TRUE);
		$dm->setRequiredDataList(FALSE);
		$dm->setRequiredModel(FALSE);

		//===== MASTERDATA == //
		$dao = new Erems_Models_Whatsapp_Dao();
		$scFilter = new Erems_Models_Whatsapp_WhatsappCategory();
		$scFilter->setProject($this->getAppSession()->getProject());
		$scFilter->setPt($this->getAppSession()->getPt());
		$allCategory = $dao->getAllWhatsappCategory($scFilter);
		$allCategory = Box_Tools::toObjectResult($allCategory, new Erems_Models_Whatsapp_WhatsappCategory());

		$dm->setHasil(array($allCategory));

		return $dm;
	}

	public function processinitRead() {
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dm->setDirectResult(TRUE);
		$dm->setRequiredDataList(FALSE);
		$dm->setRequiredModel(FALSE);

		//===== MASTERDATA == //
		$dao = new Erems_Models_Whatsapp_Dao();
		$scFilter = new Erems_Models_Whatsapp_WhatsappCategory();
		$scFilter->setProject($this->getAppSession()->getProject());
		$scFilter->setPt($this->getAppSession()->getPt());
		$allCategory = $dao->getAllWhatsappCategory($scFilter);

		$allCategory = Erems_Box_Tools::toObjectResult($allCategory, new Erems_Models_Whatsapp_WhatsappCategory());

		/// collector 
		// $edao = new Erems_Models_Hrd_EmployeeDao();
		// $employee = new Erems_Models_Sales_Collector();
		// $employee->setProject($this->getAppSession()->getProject());
		// $employee->setPt($this->getAppSession()->getPt());
		// $allCollector = $edao->getAll($employee);
		// $allCollector = Erems_Box_Tools::toObjectResult($allCollector, new Erems_Models_Sales_Collector());
		// $proseswhatsappLangsungId = 0;
		// // foreach ($allCategory as $cat) {
		// // 	if ($cat->getCode() == Erems_Box_Config::WhatsappCAT_WhatsappLSNG) {
		// // 		$proseswhatsappLangsungId = $cat->getId();
		// // 	}
		// // }
		// //// Add by Erwin 06102020
		// $setup_email = $this->setupSendEmail();
		// $otherParam = array(
		// 	array(
		// 		// "WhatsappLANGSUNGID" => $proseswhatsappLangsungId,
		// 		'is_send_email' => isset($setup_email['is_send']) ? $setup_email['is_send'] : 0
		// 	)
		// );

		$dm->setHasil(array($allCategory));
		// $dm->setHasil(array($otherParam, $allCategory, $allCollector));


		return $dm;
	}

	public function checksaldoRead() {
		//SEND Whatsapp
		$dao = new Erems_Models_Whatsapp_Dao();
		$wpFilter = new Erems_Models_Whatsapp_Proseswhatsapp();
		$wpFilter->setProject($this->getAppSession()->getProject());
		$wpFilter->setPt($this->getAppSession()->getPt());
		$hasil = $dao->getSaldo($wpFilter);

		$arrayRespon = array(
			"HASIL" => $hasil[0][0],
		);
		return Erems_Box_Tools::instantRead($arrayRespon, array());
	}

	public function sendproseswhatsappRead() {
		$saldo = $this->checksaldoRead()->getHasil()[0][0]['HASIL']['saldo'];
//		$saldo = 0;
		/*   Demo Multi sender 
		  sleep(1);
		  $hasil = 1;
		  $arrayRespon = array($hasil);
		  return Erems_Box_Tools::instantRead($arrayRespon, array());
		  die();
		 */

		$params = $this->getAppData();
		$data = $params['data'];
		$data = json_decode($data);
		$data = $data[0];

		if ($saldo > 0) {

			//messages
			$number = ltrim($data->whatsapp_phonenumber, '0');
//			$number = "6281584762527777777777";
//			$number = "081295249325";
			$number = ltrim($number, '0');
			$number = ltrim($number, '62');
			//test

			$message = $data->notes;
			//SEND Whatsapp
			$proseswhatsappApi = new Erems_Models_Whatsapp_WhatsappApi();
			$proseswhatsappApi->setPrjID($this->getAppSession()->getProject()->getId());
			$proseswhatsappApi->setPtID($this->getAppSession()->getPt()->getId());

			$sendWhatsapp = $proseswhatsappApi->sendWhatsapp($number, $message);
//		print_r($sendWhatsapp);
//		die;

			if ($sendWhatsapp['status'] === FALSE) {
				$arrayRespon = array(0);
				return Erems_Box_Tools::instantRead($arrayRespon, array());
				die();
			}
		} else {
			$sendWhatsapp = [
				'status' => 2,
				'code' => 999,
				'response' => json_encode(['error' => ['message' => 'Out of Balance']])
			];
		}

		//save to db
		$dao = new Erems_Models_Whatsapp_Dao();
		$params = array('whatsapp_id' => $data->whatsapp_id, 'status' => $sendWhatsapp['status'], 'sent_by' => $this->getAppSession()->getUser()->getId(), 'returncode' => $sendWhatsapp['code'], 'response' => $sendWhatsapp['response'], 'project_id' => $this->getAppSession()->getProject()->getId(), 'pt_id' => $this->getAppSession()->getPt()->getId());
		$hasil = $dao->saveProseswhatsappCode($params);

		$arrayRespon = array($hasil);
		return Erems_Box_Tools::instantRead($arrayRespon, array());
	}

}

?>