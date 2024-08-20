<?php

class Erems_KartupiutangController extends Erems_Box_Models_App_Hermes_AbstractController {

	protected function testingFlag() {
		return FALSE;
	}

	function init() {
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}

	public function allRead() {

		$ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
		$ses->report_path = APPLICATION_PATH . '/../public/app/erems/report/';

		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'purchaseletter', array('cluster', 'block', 'unit', 'type', 'productcategory', 'customer', 'pricetype', 'payment', 'salesman', 'schedule', 'purpose', 'side'), array());

		$dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();

		$hasil = $dao->getListKartuPiutang($this->getAppRequest(), $this->getAppSession());
		// $hasil = array();
		$dm->setDataList($dataList);
		$dm->setHasil($hasil);

		return $dm;
	}

	public function excelRead() {
		$projectId = $this->getAppSession()->getProject()->getId();
		$ptId = $this->getAppSession()->getPt()->getId();
		$params = $this->getAppData();
		//  $salesmanId = intval($params["salesman_id"]) == 999 ? 0 : intval($params["salesman_id"]);
		$hasil = FALSE;
		$msg = "";

		$url = FALSE;

		$appData = $this->getAppData();

		$dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
		$headerData = $dao->getKartuPiutang2($appData['plid']);
		$variables = $headerData[0][0];

		/// header info
		$appDao = new Erems_Models_Master_AppDao();
		$pt = new Erems_Box_Models_Master_Pt();
		$project = new Erems_Box_Models_Master_Project();
		$ptInfo = $appDao->getPt($this->getAppSession()->getPt()->getId());
		$pt->setArrayTable($ptInfo[0][0]);
		$projectInfo = $appDao->getProject($this->getAppSession()->getProject()->getId());
		$project->setArrayTable($projectInfo[0][0]);

		$variables["project"] = $project->getName();
		$variables["pt"] = $pt->getName();
		$variables["print_date"] = date("d-m-Y H:i:s");
		$dataSchedule = $dao->getKartuPiutangSchedule($appData['plid']);

		$fileName = $projectId . "_" . $ptId . "_" . $this->getAppSession()->getUser()->getId() . "" . time();
		$jsonFile = APPLICATION_PATH . '/../public/app/erems/json/' . $fileName . '.json';
		$excelFile = APPLICATION_PATH . '/../public/app/erems/uploads/msexceljson/' . $fileName . '.xlsx';
		$fp = fopen($jsonFile, 'w');

		fwrite($fp, json_encode($dataSchedule[0]));
		fclose($fp);

		$templateExcel = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId())->getTemplateKartuPiutangExcel();
		$jsonExcel = new Erems_Models_Library_JSON2Excel();
		$jsonExcel->fileTemplate = APPLICATION_PATH . '/../public/app/erems/uploads/exceltemplate/' . $templateExcel;
		$jsonExcel->fieldAwal = "RowNum";
		$hasil = $jsonExcel->process($variables, $jsonFile, $excelFile, 0, 'allBorder');
		if ($hasil) {
			$url = "app/erems/uploads/msexceljson/" . $fileName . ".xlsx";
			$fileName2 = $fileName . ".xlsx";
		} else {
			$msg = $jsonExcel->msg;
		}

		#### DATA BAWAH ##
		$dataOthersPayment = $dao->getKartuPiutangOthersPayment($appData['plid']);

		$objReader = PHPExcel_IOFactory::createReader('Excel2007');
		$objPHPExcel = $objReader->load(APPLICATION_PATH . '/../public/app/erems/uploads/msexceljson/' . $fileName2);
		$rowBawah = count($dataSchedule[0]) + 20;
		$rowAwal = $rowBawah;

		$header = [
			['Other Payments'],
			[
				'No', 'Receipt No', 'Paid Date', 'Cair Date', 'Payment', 'Description'
			]
		];
		$objPHPExcel->getActiveSheet()->fromArray($header, '', 'B' . $rowBawah);
		$objPHPExcel->getActiveSheet()->mergeCells('B' . $rowBawah . ':M' . $rowBawah);
		$objPHPExcel->getActiveSheet()->mergeCells('G' . ($rowBawah + 1) . ':M' . ($rowBawah + 1));
		$objPHPExcel->setActiveSheetIndex(0)->getStyle('B' . $rowBawah . ':M' . ($rowBawah + 1))->applyFromArray(
				array(
					'fill' => array(
						'type' => PHPExcel_Style_Fill::FILL_SOLID,
						'color' => array('rgb' => '808080')
					),
					'font' => array(
						'bold' => true,
						'color' => array('rgb' => 'FFFFFF'),
					)
				)
		);
		$rowBawah += 2;

		if (count($dataOthersPayment[0]) > 0) {
			$i = 1;
			$objPHPExcel->getActiveSheet()->getStyle('H' . $rowBawah . ':H' . ($rowBawah + count($dataOthersPayment[0])))->getNumberFormat()->setFormatCode('#,##0');
			foreach ($dataOthersPayment[0] as $key => $value) {
				$dataa = [
					$i,
					$value['payment_no'],
					$value['payment_date_report'],
					$value['cair_date_report'],
					$value['payment'],
					$value['note'],
				];
				$objPHPExcel->getActiveSheet()->fromArray($dataa, null, 'B' . $rowBawah);
				$objPHPExcel->getActiveSheet()->mergeCells('G' . $rowBawah . ':M' . $rowBawah);
				$rowBawah++;
				$i++;
			}
		}

		$objPHPExcel->setActiveSheetIndex(0)->getStyle('B' . $rowAwal . ':B' . $rowBawah)->applyFromArray(
				[
					'alignment' => [
						'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
						'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER,
					]
				]
		);

		$objPHPExcel->getActiveSheet()->getStyle('B' . $rowAwal . ':M' . ($rowBawah - 1))
				->applyFromArray([
					'borders' => [
						'allborders' => [
							'style' => PHPExcel_Style_Border::BORDER_THIN
						]
					]
		]);

		$objPHPExcel->getActiveSheet()->removeColumn('A');
		$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
		$objWriter->save(APPLICATION_PATH . '/../public/app/erems/uploads/msexceljson/' . $fileName2);

		unset($dataSchedule);
		unset($dataOthersPayment);
		unset($dao);

		if ($hasil) {
			$url = "app/erems/uploads/msexceljson/" . $fileName . ".xlsx";
		} else {
			$msg = $jsonExcel->msg;
		}

		$arrayRespon = array(
			"HASIL" => $hasil,
			"MSG" => $msg,
			"URL" => $url
		);
		return Erems_Box_Tools::instantRead($arrayRespon, array());
	}

	public function kartupiutangdetailRead() {

		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'purchaselettertransaction', array('cluster', 'block', 'unitsize', 'type', 'customerprofile', 'price', 'pricetype', 'foo', 'city'), array('total_payment'));
		$dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
		$pl = new Erems_Models_Purchaseletter_PurchaseLetter();
		$pl->setArrayTable($this->getAppRequest()->getOthers());
		$hasil = $dao->getKartuPiutang($pl);
		$dm->setDataList($dataList);
		$dm->setHasil($hasil);

		return $dm;
	}

	public function totalPaymentRead() {

		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'purchaseletter', array('cluster', 'block', 'unit', 'type', 'productcategory', 'customer', 'payment'), array('readONlysss', 'hello', 'hssss'));

		$dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();

		$hasil = $dao->getListKartuPiutang($this->getAppRequest());
		// $hasil = array();
		$dm->setDataList($dataList);
		$dm->setHasil($hasil);

		return $dm;
	}

	public function scheduleRead() {

		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'schedule', array('scheduletype', 'sourcemoney', 'payment', 'paymentdetail')
		);

		$dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
		$pl = new Erems_Models_Purchaseletter_PurchaseLetter();
		$pl->setArrayTable($this->getAppRequest()->getOthers());
		$hasil = $dao->getScheduleById($pl);
		$dm->setDataList($dataList);
		$dm->setHasil($hasil);

		return $dm;
	}

	public function paymentlistRead() {

		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'payment', array('paymentmethod'));
		$dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
		$pl = new Erems_Models_Purchaseletter_PurchaseLetter();
		$pl->setArrayTable($this->getAppRequest()->getOthers());
		$hasil = $dao->getPaymentsById($pl);
		// $hasil = array();
		$dm->setDataList($dataList);
		$dm->setHasil($hasil);

		return $dm;
	}

	public function detailRead() {




		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dm->setDirectResult(TRUE);
		$dm->setRequiredDataList(FALSE);
		$dm->setRequiredModel(FALSE);

		$creator = new Erems_Box_Models_App_Creator();

		//===== MASTERDATA == //
		/// salesman 
		$dao = new Erems_Models_Hrd_EmployeeDao();
		$employee = new Erems_Models_Sales_Salesman();
		$employee->setProject($this->getAppSession()->getProject());
		$employee->setPt($this->getAppSession()->getPt());
		$hasil = $dao->getAll($employee);

		$allSalesman = array();
		$this->fillData($hasil[1], $allSalesman, $creator, 'salesman');

		/// collector 
		$dao = new Erems_Models_Hrd_EmployeeDao();
		$employee = new Erems_Models_Sales_Collector();
		$employee->setProject($this->getAppSession()->getProject());
		$employee->setPt($this->getAppSession()->getPt());
		$hasil = $dao->getAll($employee);

		$allCollector = array();
		$this->fillData($hasil[1], $allCollector, $creator, 'collector');

		$masterCC = new Erems_Models_App_Masterdata_SalesLocation();
		$allSalelLoc = $masterCC->prosesDataWithSession($this->getAppSession(), TRUE);

		$masterMP = new Erems_Models_App_Masterdata_MediaPromotion();
		$allMediaPro = $masterMP->prosesDataWithSession($this->getAppSession(), TRUE);

		$masterBank = new Erems_Models_App_Masterdata_Bank();
		$allBank = $masterBank->prosesDataWithSession($this->getAppSession(), TRUE);

		$masterBillR = new Erems_Models_App_Masterdata_BillingRules();
		$allBillR = $masterBillR->prosesDataWithSession($this->getAppSession(), TRUE);

		$masterClub = new Erems_Models_App_Masterdata_CitraClub();
		$allClubs = $masterClub->prosesDataWithSession($this->getAppSession(), TRUE);

		$otherAT = array(array(
				//"ISAUTHORIZEDUSER" => $this->getAppSession()->getUser()->getId() == Erems_Box_AuthorizeConfig::PURCHASELETTER_SUPERUSER ? TRUE : FALSE,
				"ISAUTHORIZEDUSER" => $this->getAppSession()->getUser()->getId() == Erems_Box_Projectptconfig_ProjectPtConfigSelector::getAuthorizeUser($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId(), "PURCHASELETTER_SUPERUSER") ? TRUE : FALSE
		));

		$dm->setHasil(array($allSalesman, $allCollector, $allSalelLoc, $allMediaPro, $allBank, $allBillR, $allClubs, $otherAT));

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

		$mp = new Erems_Models_App_Masterdata_Position();
		$ap = $mp->prosesDataWithSession($this->getAppSession(), TRUE);

		$mpc = new Erems_Models_App_Masterdata_ProductCategory();
		$apc = $mpc->prosesDataWithSession($this->getAppSession(), TRUE);

		$mt = new Erems_Models_App_Masterdata_Type();
		$at = $mt->prosesDataWithSession($this->getAppSession(), TRUE);

		$mpp = new Erems_Models_App_Masterdata_Purpose();
		$app = $mpp->prosesDataWithSession($this->getAppSession(), TRUE);

		$ms = new Erems_Models_App_Masterdata_Side();
		$as = $ms->prosesDataWithSession($this->getAppSession(), TRUE);

		$mus = new Erems_Models_App_Masterdata_UnitStatus();
		$aus = $mus->prosesDataWithSession($this->getAppSession(), TRUE);

		$otherAT = array(array(
				"FILE_REPORT" => Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId())->getKartuPiutangReportFileName(),
				//edited by Rizal 13-02-2019 //
				"FILE_REPORT_CUSTOMER" => Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId())->getKartuPiutangReportFileNameCustomer(),
				//added by Rico 19072022 //
				"FILE_REPORT_V2" => Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId())->getKartuPiutangReportFileNameV2(),
				"DENDAALERT" => Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId())->isDendaAlertKartuPiutang()
		));

		$dm->setHasil(array($ac, $ab, $ap, $apc, $at, $app, $as, $aus, $otherAT));

		return $dm;
	}

	public function maindetailRead() {
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'purchaselettertransaction',
				array('cluster', 'block', 'unitsize', 'type', 'customerprofile', 'price', 'pricetype', 'foo', 'city', 'cac', 'citraclub'),
				array('total_payment'));
		$dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
		$pl = new Erems_Models_Purchaseletter_PurchaseLetter();
		$pl->setArrayTable($this->getAppRequest()->getOthers());
		$hasil = $dao->getKartuPiutang($pl);
		$dm->setDataList($dataList);
		$dm->setHasil($hasil);

		return $dm;
	}

	protected function getDefaultProcessor() {
		return new Erems_Models_App_Box_Processor();
	}

}

?>
