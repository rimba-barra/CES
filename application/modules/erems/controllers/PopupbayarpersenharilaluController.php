<?php

require_once dirname(__DIR__) . '../library/apli/ApliController.php';

class Erems_PopupbayarpersenharilaluController extends ApliController {

	public function allRead() {

		$session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
		$session->report_path = APPLICATION_PATH . '/../public/app/erems/report/';

		$params = $this->getRequest()->getPost();

		$eremsReq = new Erems_Box_Models_App_HasilRequestRead(array());
		$start = $params["start"];
		$page = $start > 0 ? ($start / $params["limit"]) + 1 : 1;
		$eremsReq->setArrayForm($params);
		$eremsReq->setPage($page);
		$eremsReq->setLimit($params["limit"]);

		$sesBox = new Erems_Box_Models_App_Session();
		$sesBox->getProject()->setId($session->getCurrentProjectId());
		$sesBox->getPt()->setId($session->getCurrentPtId());

		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'purchaselettertransaction', array('unitb', 'clusterb', 'blockb', 'productcategory', 'type', 'salesman', 'collector', 'customer', 'citraclub', 'payment'), array());

		$dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();

		$pl = new Erems_Models_Purchaseletter_PurchaseLetter();
		$pl->setArrayTable($params);
		$pl->getUnit()->setNumber($params["unit_unit_number"]);
		$pl->getCustomer()->setName($params["customer_name"]);
		$hasil = $dao->getAllPersenBayarXHariKebelakang($eremsReq, $sesBox, $pl, $params);


		$dm->setDataList($dataList);
		$dm->setHasil($hasil);

		$dl = $dm->getDataList();
		$dl->setDataDao($hasil);

		$hasilData = Apli::prosesDao($dm->getDataList());

		return array(
			"model" => Apli::generateExtJSModel($dm->getDataList()),
			"data" => $hasilData["data"],
			"totalRow" => $hasilData["row"]
		);
	}

	public function initRead() {

		$session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
		$session->report_path = APPLICATION_PATH . '/../public/app/erems/report/';

		$params = $this->getRequest()->getPost();



		return array(
			"data" => array()
		);
	}

	public function exportexcelRead() {
		$session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
		$session->report_path = APPLICATION_PATH . '/../public/app/erems/report/';

		$params = $this->getRequest()->getPost();

		$eremsReq = new Erems_Box_Models_App_HasilRequestRead(array());
		$eremsReq->setArrayForm($params);
//		$eremsReq->setPage(1);
		$eremsReq->setLimit(9999999);

		$sesBox = new Erems_Box_Models_App_Session();
		$sesBox->getProject()->setId($session->getCurrentProjectId());
		$sesBox->getPt()->setId($session->getCurrentPtId());

		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dm->setDirectResult(TRUE);
		$dm->setRequiredDataList(FALSE);
		$dm->setRequiredModel(FALSE);
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'purchaselettertransaction', array('unitb', 'clusterb', 'blockb', 'productcategory', 'type', 'salesman', 'collector', 'customer', 'citraclub', 'payment'), array());

		$dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();

		$pl = new Erems_Models_Purchaseletter_PurchaseLetter();
		$pl->setArrayTable($params);
		$pl->getUnit()->setNumber($params["unit_unit_number"]);
		$pl->getCustomer()->setName($params["customer_name"]);
		$hasil = $dao->getAllPersenBayarXHariKebelakang($eremsReq, $sesBox, $pl, $params);
		$dm->setDataList($dataList);

		$ps = new Erems_Models_Purchaseletter_ExportExcelSudahBayarSekianPersenHariLalu($session->getCurrentProjectId(), $session->getCurrentPtId());
		$ps->process($hasil[1]);

		return array(
			"model" => [],
			"data" => ["URL" => $ps->getUrl()],
			"totalRow" => []
		);

	}

}
