<?php

require_once dirname(__DIR__) . '../library/apli/ApliController.php';

class Erems_KlaimkomisiController extends ApliController {

	function init() {
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}

	public function forminitRead() {
		return array(
			"data" => "foo"
		);
	}

	public function loadforminitRead() {


		$params = $this->getRequest()->getPost();

		$session = Apli::getSession();

		$ccFilter = new Erems_Models_Master_CitraClub();
		$ccFilter->setProject($session->getProject());
		$ccFilter->setPt($session->getPt());
		$ccDao = new Erems_Models_Master_CitraClubDao();
		$allCC = $ccDao->getAll($ccFilter);


		// salesman
		/// salesman 
		$eDao = new Erems_Models_Hrd_EmployeeDao();
		$employee = new Erems_Models_Sales_Salesman();
		$employee->setProject($session->getProject());
		$employee->setPt($session->getPt());
		$hasilSalesman = $eDao->getAll($employee);


		// proses nomor baru
		$tahun = date(date("Y", strtotime($params["tanggal"])));

		$dao = new Erems_Models_Komisi_Dao();
		$lastNomor = $dao->getNomorAkhirKlaim($session->getProject()->getId(), $session->getPt()->getId(), $tahun);

		if (count($lastNomor[0]) > 0) {
			$lastNomor = $lastNomor[0][0]["nomor_akhir"];
		} else {
			$lastNomor = 0;
		}


		$pNomor = array(
			"tahun" => $tahun,
			"bulan" => date(date("n", strtotime($params["tanggal"]))),
			"nomor_baru" => $lastNomor + 1
		);
		$nomor = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($session->getProject()->getId(), $session->getPt()->getId())->formatNomorKomisiKlaim($pNomor);

		// end proses nomor baru
		return array(
			"clubcitras" => $allCC,
			"salesmans" => $hasilSalesman,
			"nomor" => $nomor,
			'project_name' => $this->session->getCurrentProjectName(),
			'pt_name' => $this->session->getCurrentPtName()
		);
	}

	public function purchaseletteroneRead() {


		$params = $this->getRequest()->getPost();

		$pl = new Erems_Models_Purchaseletter_PurchaseLetter();
		$pl->setId(intval($params["purchaseletter_id"]));
		$dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
		$hasil = $dao->getOne($pl->getId());

		return array(
			"DATA" => $hasil
		);
	}

	public function komisitranlistRead() {


		$params = $this->getRequest()->getPost();



		$sesBox = Apli::getSession();

		$dao = new Erems_Models_Komisi_Dao();

		$kt = new Erems_Models_Komisi_KomisiTran();
		$kt->setArrayTable($params);
		$kt->setProject($sesBox->getProject());
		$kt->setPt($sesBox->getPt());
		// $pl->getUnit()->setNumber($params["unit_number"]);

		$hasil = $dao->getAllKlaimNotExist(Apli::getRequest($params), $kt);




		return array(
			"DATA" => $hasil
		);
	}

	public function selectedkomisitranRead() {


		$params = $this->getRequest()->getPost();
		$dao = new Erems_Models_Komisi_Dao();
		$hasil = $dao->getKlaimSelectedKomisiTran($params["ids"]);
		return array(
			"DATA" => $hasil
		);
	}

	public function oneklaimkomisiRead() {
		$params = $this->getRequest()->getPost();

		$dao = new Erems_Models_Komisi_Dao();


		return array(
			"klaimkomisi" => $dao->getOneKlaimKomisi(intval($params["klaimkomisi_id"]))
		);
	}

	public function detailRead() {

		$session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');

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
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'klaimkomisidetail', array('unitb', 'purchaseletter', 'klaimkomisi', 'komisitran', 'customer', 'price', 'cluster'), array());
		$dao = new Erems_Models_Komisi_Dao();
		$klaimKomisiDetail = new Erems_Models_Komisi_Klaim_Detail();
		$klaimKomisiDetail->getKlaimkomisi()->setId(intval($params["klaimkomisi_id"]));


		$hasil = $dao->getKlaimDetail($klaimKomisiDetail);
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

	public function mainDelete() {
		$session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
		$params = $this->getRequest()->getPost();

		$dao = new Erems_Models_Komisi_Dao();

		$sesBox = Apli::getSession();

		$ids = array(intval($params["klaimkomisi_id"]));
		$ids = implode("~", $ids);

		//  $decan->set
		$hapus = $dao->deleteKlaimKomisi($ids, $sesBox);

		return array(
			"status" => $hapus
		);
	}

	public function printpdfRead() {

		$params = $this->getRequest()->getPost();



		$sesBox = Apli::getSession();

		// informasi komisi
		$dao = new Erems_Models_Komisi_Dao();
		$klaim = $dao->getOneKlaimKomisi(intval($params["klaimkomisi_id"]));
		$klaim = $klaim[0][0];

		// var_dump($klaim);
		// informasi purchaseletter klaim

		$klaimKomisiDetail = new Erems_Models_Komisi_Klaim_Detail();
		$klaimKomisiDetail->getKlaimkomisi()->setId(intval($klaim["klaimkomisi_id"]));


		$details = $dao->getKlaimDetail($klaimKomisiDetail);
		$details = $details[1];
		$blokList = array();
		$typeList = array();
		$totalNetto = 0;

		//  var_dump($details);
		// die();

		foreach ($details as $row) {
			$blokList[] = $row["unit_unit_number"];
			$typeList[] = $row["type_name"];
			$totalNetto += $row["price_harga_neto"];
		}
		$details = array(
			"unit_unit_number" => implode(",", $blokList),
			"type_name" => implode(",", $typeList),
			"price_harga_neto" => $totalNetto
		);

		//   $details = $details[0];
		//  var_dump($details);
		// var_dump($klaim);


		$genco = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($sesBox->getProject()->getId(), $sesBox->getPt()->getId());
		$pdf = $genco->getKlaimPrintPdfClass();
		$pdf->run($sesBox, $klaim, $details);
		$url = $pdf->getUrl();

		return array(
			"HASIL" => $pdf->getHasil(),
			"URL" => $url
		);
	}

	public function allRead() {

		$session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');


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
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'klaimkomisi', array('citraclub'), array());
		$dao = new Erems_Models_Komisi_Dao();
		$klaim = new Erems_Models_Komisi_Klaim_Klaim();
		$klaim->setArrayTable($params);
		$klaim->setProject($sesBox->getProject());
		$klaim->setPt($sesBox->getPt());



		$hasil = $dao->getAllKlaimKomisi($eremsReq, $klaim);
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



		$sesBox = new Erems_Box_Models_App_Session();
		$sesBox->getProject()->setId($session->getCurrentProjectId());
		$sesBox->getPt()->setId($session->getCurrentPtId());




		$mc = new Erems_Models_App_Masterdata_Cluster();
		$ac = $mc->prosesDataWithSession($sesBox, TRUE);



		$pmDao = new Erems_Models_Master_AppDao();
		$pmdl = new Erems_Box_Models_App_DataListCreator('', 'paymentmethod', array(), array());
		$pmDlData = $pmDao->getAllPaymentMethod();

		$blDao = new Erems_Models_Master_BlockDao();
		$bldl = new Erems_Box_Models_App_DataListCreator('', 'blockb', array(), array());
		$bl = new Erems_Models_Master_BlockTran();
		$bl->getProject()->setId($session->getCurrentProjectId());
		$bl->getPt()->setId($session->getCurrentPtId());

		$blData = $blDao->getByCPP($bl);

		$clDao = new Erems_Models_Master_ClusterDao();
		$cl = new Erems_Models_Master_ClusterTran();
		$cl->getProject()->setId($session->getCurrentProjectId());
		$cl->getPt()->setId($session->getCurrentPtId());
		$cldl = new Erems_Box_Models_App_DataListCreator('', 'clusterb', array(), array());
		$clData = $clDao->getByProjectPt($cl);
		// var_dump($clDao->getByProjectPt($cl));


		return array(
			"data" => array(
				"paymentmethods" => array(
					"model" => Apli::generateExtJSModel($pmdl),
					"data" => $pmDlData[1],
				),
				"blocks" => array(
					"model" => Apli::generateExtJSModel($bldl),
					"data" => $blData[1],
				),
				"clusters" => array(
					"model" => Apli::generateExtJSModel($cldl),
					"data" => $clData[1],
				)
			)
		);
	}

	public function mainCreate() {

		$params = $this->getRequest()->getPost();
		$data = json_decode($params["data"], TRUE);


		$sesBox = Apli::getSession();

		$klaim = new Erems_Models_Komisi_Klaim_Klaim();
		$klaim->setArrayTable($data);
		$klaim->setProject($sesBox->getProject());
		$klaim->setPt($sesBox->getPt());
		$klaim->setAddBy($sesBox->getUser()->getId());
		$klaim->setId(0);


		// add detail
		$details = json_decode($params["detail"], TRUE);
		foreach ($details as $dt) {
			$klaimDetail = new Erems_Models_Komisi_Klaim_Detail();
			$klaimDetail->setArrayTable($dt);
			$klaim->addDetail($klaimDetail);
		}



		$validator = new Erems_Models_Komisi_Klaim_Validator();
		$validator->run($klaim);

		$msg = $validator->getMsg();
		$status = $validator->getStatus();

		if ($validator->getStatus()) {

			$decan = Erems_Box_Tools::toDecan($klaim->getDetails());

			$dao = new Erems_Models_Komisi_Dao();
			$hasilSave = 0;

			$hasilSave = $dao->saveKlaimKomisi($klaim, $decan->getDCResult());


			if ($hasilSave <= 0) {
				$status = FALSE;
				$msg = "Terjadi kesalahan pada saat menyimpan klaim komisi.";
			} else {
				$status = TRUE;
			}
		}

		return array(
			"STATUS" => $status,
			"MSG" => $msg
		);
	}

	public function mainUpdate() {
		$params = $this->getRequest()->getPost();
		$data = json_decode($params["data"], TRUE);


		$sesBox = Apli::getSession();

		$klaim = new Erems_Models_Komisi_Klaim_Klaim();
		$klaim->setArrayTable($data);
		$klaim->setProject($sesBox->getProject());
		$klaim->setPt($sesBox->getPt());
		$klaim->setAddBy($sesBox->getUser()->getId());

		// add detail
		$details = json_decode($params["detail"], TRUE);
		$newDetails = array();
		foreach ($details as $dt) {
			$klaimDetail = new Erems_Models_Komisi_Klaim_Detail();
			$klaimDetail->setArrayTable($dt);
			if (intval($klaimDetail->getId()) == 0) {
				$newDetails[] = $klaimDetail;
			}
			$klaim->addDetail($klaimDetail);
		}

		$deletedRows = $data["deleted_rows"];


		$validator = new Erems_Models_Komisi_Klaim_Validator();
		$validator->run($klaim);

		$msg = $validator->getMsg();
		$status = $validator->getStatus();

		if ($validator->getStatus()) {
			$dao = new Erems_Models_Komisi_Dao();

			$decan = Erems_Box_Tools::toDecan($newDetails);



			$hasilSave = 0;

			$hasilSave = $dao->updateKlaimKomisi($klaim, $deletedRows, $decan->getDCResult());


			if ($hasilSave <= 0) {
				$status = FALSE;
				$msg = "Terjadi kesalahan pada saat menyimpan klaim komisi.";
			} else {
				$status = TRUE;
			}
		}

		return array(
			"STATUS" => $status,
			"MSG" => $msg
		);
	}

}
