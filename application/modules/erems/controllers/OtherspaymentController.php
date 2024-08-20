<?php

class Erems_OtherspaymentController extends Erems_Box_Models_App_Hermes_AbstractController {

	protected function testingFlag() {
		return FALSE;
	}

	public function allRead() {

		ini_set("memory_limit", "-1");
		ini_set('max_execution_time', 0);

		$ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
		$ses->report_path = APPLICATION_PATH . '/../public/app/erems/report/';

		
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'payment', array('customer', 'cluster', 'block', 'unitb', 'paymentmethod', 'purchaseletter'), array('deletedRows'));

		$dao = new Erems_Models_Payment_Dao();
		$payment = new Erems_Models_Payment_Payment();
		$payment->setFlag(Erems_Box_Config::PAYMENTFLAG_OTHERS);
		$hasil = $dao->getAll($this->getAppRequest(), $payment, $this->getAppSession());
		
		$dm->setDataList($dataList);
		$dm->setHasil($hasil);
		return $dm;
		
		/*
		$dao = new Erems_Models_Payment_Dao();
		$payment = new Erems_Models_Payment_Payment();
		$payment->setFlag(Erems_Box_Config::PAYMENTFLAG_OTHERS);
		$hasil = $dao->getAll($this->getAppRequest(), $payment, $this->getAppSession());
		$modelReschedule = array(
			array('name' => "payment_id", 'mapping' =>  "payment.payment_id"),
			array('name' => "payment_no", 'mapping' =>  "payment.payment_no"),
			array('name' => "paymentflag_id", 'mapping' =>  "payment.paymentflag_id"),
			array('name' => "purchaseletter_id", 'mapping' =>  "payment.purchaseletter_id"),
			array('name' => "payment_date", 'mapping' =>  "payment.payment_date", 'type' => "date", 'dateFormat' => "Y-m-d H:i:s.u"),
			array('name' => "paymentmethod_id", 'mapping' =>  "payment.paymentmethod_id"),
			array('name' => "paymentmethod_paymentmethod_id", 'mapping' =>  "payment.paymentmethod_paymentmethod_id"),
			array('name' => "total_payment", 'mapping' =>  "payment.total_payment"),
			array('name' => "note", 'mapping' =>  "payment.note"),
			array('name' => "payment", 'mapping' =>  "payment.payment"),
			array('name' => "duedate", 'mapping' =>  "payment.duedate", 'type' => "date", 'dateFormat' => "Y-m-d H:i:s.u"),
			array('name' => "cair_date", 'mapping' =>  "payment.cair_date", 'type' => "date", 'dateFormat' => "Y-m-d H:i:s.u"),
			array('name' => "reference_no", 'mapping' =>  "payment.reference_no"),
			array('name' => "is_referencerejected", 'mapping' =>  "payment.is_referencerejected"),
			array('name' => "admin_fee", 'mapping' =>  "payment.admin_fee"),
			array('name' => "denda", 'mapping' =>  "payment.denda"),
			array('name' => "cdn", 'mapping' =>  "payment.cdn"),
			array('name' => "cdn_value", 'mapping' =>  "payment.cdn_value"),
			array('name' => "receipt_no", 'mapping' =>  "payment.receipt_no"),
			array('name' => "voucher_no", 'mapping' =>  "payment.voucher_no"),
			array('name' => "print_no", 'mapping' =>  "payment.print_no"),
			array('name' => "customer_customer_id", 'mapping' =>  "customer.customer_id"),
			array('name' => "customer_code", 'mapping' =>  "customer.code"),
			array('name' => "customer_name", 'mapping' =>  "customer.name"),
			array('name' => "customer_address", 'mapping' =>  "customer.address"),
			array('name' => "cluster_cluster_id", 'mapping' =>  "cluster.cluster_id"),
			array('name' => "cluster_project_id", 'mapping' =>  "cluster.project_id"),
			array('name' => "cluster_pt_id", 'mapping' =>  "cluster.pt_id"),
			array('name' => "cluster_code", 'mapping' =>  "cluster.code"),
			array('name' => "cluster_cluster", 'mapping' =>  "cluster.cluster"),
			array('name' => "cluster_description", 'mapping' =>  "cluster.description"),
			array('name' => "cluster_img_legendlayer", 'mapping' =>  "cluster.img_legendlayer"),
			array('name' => "cluster_img_siteplant", 'mapping' =>  "cluster.img_siteplant"),
			array('name' => "block_block_id", 'mapping' =>  "block.block_id"),
			array('name' => "block_project_id", 'mapping' =>  "block.project_id"),
			array('name' => "block_pt_id", 'mapping' =>  "block.pt_id"),
			array('name' => "block_cluster_id", 'mapping' =>  "block.cluster_id"),
			array('name' => "block_code", 'mapping' =>  "block.code"),
			array('name' => "block_block", 'mapping' =>  "block.block"),
			array('name' => "block_description", 'mapping' =>  "block.description"),
			array('name' => "block_icon", 'mapping' =>  "block.icon"),
			array('name' => "unit_unit_id", 'mapping' =>  "unit.unit_id"),
			array('name' => "unit_unit_number", 'mapping' =>  "unit.unit_number"),
			array('name' => "unit_progress", 'mapping' =>  "unit.progress"),
			array('name' => "unit_serahterima_plan", 'mapping' =>  "unit.serahterima_plan"),
			array('name' => "unit_lebar_jalan", 'mapping' =>  "unit.lebar_jalan"),
			array('name' => "unit_gambar_rumah", 'mapping' =>  "unit.gambar_rumah"),
			array('name' => "unit_is_readystock", 'mapping' =>  "unit.is_readystock"),
			array('name' => "unit_is_readysell", 'mapping' =>  "unit.is_readysell"),
			array('name' => "unit_is_readylegal", 'mapping' =>  "unit.is_readylegal"),
			array('name' => "unit_koordinat", 'mapping' =>  "unit.koordinat"),
			array('name' => "unit_customer_no", 'mapping' =>  "unit.customer_no"),
			array('name' => "unit_customer_int", 'mapping' =>  "unit.customer_int"),
			array('name' => "unit_virtualaccount_bca", 'mapping' =>  "unit.virtualaccount_bca"),
			array('name' => "unit_virtualaccount_mandiri", 'mapping' =>  "unit.virtualaccount_mandiri"),
			array('name' => "unit_list_nomor_spk", 'mapping' =>  "unit.list_nomor_spk"),
			array('name' => "unit_land_size", 'mapping' =>  "unit.land_size"),
			array('name' => "unit_building_size", 'mapping' =>  "unit.building_size"),
			array('name' => "unit_is_fasum", 'mapping' =>  "unit.is_fasum"),
			array('name' => "unit_gambar", 'mapping' =>  "unit.gambar"),
			array('name' => "paymentmethod_paymentmethod_id", 'mapping' =>  "paymentmethod.paymentmethod_id"),
			array('name' => "paymentmethod_code", 'mapping' =>  "paymentmethod.code"),
			array('name' => "paymentmethod_paymentmethod", 'mapping' =>  "paymentmethod.paymentmethod"),
			array('name' => "paymentmethod_description", 'mapping' =>  "paymentmethod.description"),
			array('name' => "deletedRows")
		);
		$return['totalRow'] = 0;
		$return['data'] = '';
        $return['model'] = null;

        if(is_array($hasil[1])){
        	$return['totalRow'] = $hasil[0][0]['totalRow'];
	        $return['model'] = $modelReschedule;
	        foreach ($hasil[1] as $value) {
	        	$return['data'][] = array(
					"payment" => array(
						"payment_id" => $value['payment_id'],
						"receipt_no" => $value['receipt_no'],
						"reference_no" => $value['reference_no'],
						"payment_no" => $value['payment_no'],
						"payment_date" => $value['payment_date'],
						"duedate" => $value['duedate'],
						"note" => $value['note'],
						"payment" => $value['payment'],
						"denda" => $value['denda'],
						"voucher_no" => $value['voucher_no']
					),
					"customer" => array(
						"name" => $value['customer_name']
					),
					"unit" => array(
						"unit_number" => $value['unit_unit_number'],
						"unit_id" => $value['unit_unit_id'],
						"virtualaccount_bca" => $value['unit_virtualaccount_bca'],
						"virtualaccount_mandiri" => $value['unit_virtualaccount_mandiri']
					),
					"cluster" => array(
						"cluster" => $value['cluster_cluster'],
						"code" => $value['cluster_code']
					),
					"block" => array(
						"block" => $value['block_block']
					),
					"paymentmethod" => array(
						"paymentmethod_id" => $value['paymentmethod_paymentmethod_id'],
						"paymentmethod" => $value['paymentmethod_paymentmethod']
					)
				);
	        }
	    }
	    for($i=0;$i<697500000;$i++){
	    	$j = $i+1;
	    }
        echo Zend_Json::encode($return);
        $this->_helper->viewRenderer->setNoRender(true);
        exit;
        */
	}

	public function printdosRead() {
		$userFullName = $_SESSION["Ciputra"]["common"]["user"]["user_fullname"];
		$genco = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId());

		$hasil = FALSE;
		$params = $this->getAppData();
		$dao = new Erems_Models_Payment_Dao();
		$payment = new Erems_Models_Payment_Payment();
		$payment->setArrayTable($this->getAppData());
		$hasil = $dao->getOne($payment);
		$hasil = $hasil[1][0];

		$pdf = NULL;
		$display = array();

		$display["name"] = "";
		$display["terbilang"] = "";
		$display["note"] = "";
		$display["date"] = "";
		$display["amount"] = "";
		$tetUnitNumber = rtrim(ltrim($hasil["unit_unit_number"]));
		$tetUnitNumber = str_replace("/", "_", $tetUnitNumber);
		$fileName = "PRINT_" . $tetUnitNumber . ".bat";



		if ($hasil) {

			$hasil["penandatangan"] = $genco->getPenandatanganKwitansi(array("user" => $userFullName));
			$hasil["file_name"] = $fileName;
			$dosPrint = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId())->getDosPrintClass();
			// $txt = $dosPrint->getTxt($hasil);

			$option = isset($params["option"]) ? $params["option"] : 0;




			if ($dosPrint instanceof Erems_Models_Payment_PrintBisaMulti) {
				$txt = $dosPrint->runMulti($this->getAppSession(), $hasil, NULL, $option);
			} else {
				$txt = $dosPrint->getTxt($hasil);
			}


			$hasil = TRUE;
		}

		$arrayRespon = array("HASIL" => $hasil,
			"URL" => 'app/erems/uploads/pdf/kwitansipayment/' . $fileName,
			"DISPLAY" => $display,
			"PREVIEW" => $txt);
		return Erems_Box_Tools::instantRead($arrayRespon, array());
	}

	public function printvoucherpdfRead() {


		$hasil = FALSE;

		$dao = new Erems_Models_Payment_Dao();
		$projectId = $this->getAppSession()->getProject()->getId();
		$ptId = $this->getAppSession()->getPt()->getId();

		$data = $this->getAppData();
		$paymentIds = $data["payment_id"];
		$hasils = $dao->getByGroup($paymentIds);

		$hasils = $hasils[1];


		$pdf = NULL;

		//var_dump($hasils);


		if (count($hasils) > 0) {

			$allPayment = array();

			foreach ($hasils as $hasil) {
				$dataPayment = array(
					'terbilang' => Erems_Box_Library_Terbilang::terbilang($hasil["total_payment"], 3),
					'amount' => (string) Erems_Box_Tools::toCurrency($hasil["total_payment"]),
					'payment' => (string) Erems_Box_Tools::toCurrency($hasil["payment"]),
					'date' => Erems_Box_Tools::formatDate($hasil["payment_date"]),
					'customer' => $hasil["customer_name"],
					'note' => $hasil["note"],
					'id' => intval($hasil["payment_id"]),
					'pt_name' => $hasil["pt_name"],
					'purchaseletter_date' => Erems_Box_Tools::formatDate($hasil["purchaseletter_purchase_date"]),
					'pricetype' => $hasil["pricetype_pricetype"],
					'paymentmethod' => $hasil["paymentmethod_paymentmethod"],
					'cair_date' => Erems_Box_Tools::formatDate($hasil["cair_date"])
				);
				$allPayment[] = $dataPayment;
			}

			/// delete old pdf file 
			Erems_Models_Payment_FileDeleter::run($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId(), "/pdf/voucherpayment/");

			$pdf = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId())->getVoucherPdfLibrary();
			$pdf->run($this->getAppSession(), $allPayment, $paymentIds);

			$hasil = TRUE;
		}

		$arrayRespon = array("HASIL" => $hasil,
			"URL" => 'app/erems/uploads/pdf/voucherpayment/' . $pdf->getFileName()
		);
		return Erems_Box_Tools::instantRead($arrayRespon, array());
	}

	public function printoutRead() {




		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dm->setDirectResult(TRUE);
		$dm->setRequiredDataList(FALSE);
		$dm->setRequiredModel(FALSE);

		$msg = '';


		$dao = new Erems_Models_Payment_Dao();
		$payment = new Erems_Models_Payment_Payment();
		$payment->setArrayTable($this->getAppData());
		$hasil = $dao->getOne($payment);
		$hasil = $hasil[1][0];





		$hasil["terbilang"] = Erems_Box_Library_Terbilang::terbilang($hasil["total_payment"], 3);
		$hasil["total_payment"] = (string) Erems_Box_Tools::toCurrency($hasil["total_payment"]);

		$hasil["payment_date"] = Erems_Box_Tools::formatDate($hasil["payment_date"]);
		$otherAT = array(array(
				"PRINTOUT" => TRUE,
				"DATA" => $hasil,
				"MSG" => $msg
		));




		$dm->setHasil(array($otherAT));


		return $dm;
	}

	public function printpdfRead() {

		$data = $this->getAppData();

		$option = isset($data["option"]) ? intval($data["option"]) : 0;
		$ttd = isset($data["ttd"]) ? intval($data["ttd"]) : 0;
		$genco = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId());

		$print = Erems_Box_Tools::paymentPrintPDF($data, $this->getAppSession(), $genco->getOthersPaymentSameInstallmentTemplate(), $option, $ttd);

		// $print = Erems_Box_Tools::otherspaymentPrintPDF($data, $this->getAppSession(), $genco->getOthersPaymentSameInstallmentTemplate(), $option,$ttd);

		$arrayRespon = array("HASIL" => $print["hasil"],
			"URL" => 'app/erems/uploads/pdf/kwitansipayment/' . $print["file"]
		);
		return Erems_Box_Tools::instantRead($arrayRespon, array());
	}

	// public function printpdfRead() {
	// $data = $this->getAppData();
	// $genco = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId());
	// $pdf = $genco->getOthersPaymentTemplate();
	// if(!$pdf){
	// $pdf = Erems_Models_Payment_PrintPdfSelector::getLib($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId()); 
	// $pdf->tipe = 2; // otherspayment
	// }
	// $option = isset($data["option"])?intval($data["option"]):0;
	// $print = Erems_Box_Tools::paymentPrintPDF($data,$this->getAppSession(),$pdf,$option);
	// $arrayRespon = array("HASIL" => $print["hasil"],
	// "URL" => 'app/erems/uploads/pdf/kwitansipayment/' . $print["file"]
	// );
	// return Erems_Box_Tools::instantRead($arrayRespon, array());
	// }

	/*
	  public function printpdfRead() {


	  $hasil = FALSE;

	  $dao = new Erems_Models_Payment_Dao();

	  $data = $this->getAppData();
	  $paymentIds = $data["payment_id"];
	  $hasils = $dao->getByGroup($paymentIds);

	  $hasils = $hasils[1];


	  $pdf = NULL;



	  if (count($hasils) > 0) {



	  $allPayment = array();

	  foreach ($hasils as $hasil) {
	  $dataPayment = array(
	  'terbilang' => Erems_Box_Library_Terbilang::terbilang($hasil["total_payment"], 3),
	  'amount' => (string) Erems_Box_Tools::toCurrency($hasil["total_payment"]),
	  'date' => Erems_Box_Tools::formatDate($hasil["payment_date"]),
	  'customer' => $hasil["customer_name"],
	  'note' => $hasil["note"],
	  'id'=>intval($hasil["payment_id"])
	  );
	  $allPayment[] = $dataPayment;
	  }



	  //$pdf = new Erems_Models_Library_Tcpdf();
	  $pdf = Erems_Models_Payment_PrintPdfSelector::getLib($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId());

	  $pdf->run($this->getAppSession(), $allPayment,$paymentIds);


	  $hasil = TRUE;
	  }






	  $arrayRespon = array("HASIL" => $hasil,
	  "URL" => 'app/erems/uploads/pdf/kwitansipayment/' . $pdf->getFileName()
	  );
	  return Erems_Box_Tools::instantRead($arrayRespon, array());
	  }

	 */

	public function detailRead() {




		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dm->setDirectResult(TRUE);
		$dm->setRequiredDataList(FALSE);
		$dm->setRequiredModel(FALSE);

		$creator = new Erems_Box_Models_App_Creator();

		//===== MASTERDATA == //

		$masterPM = new Erems_Models_App_Masterdata_PaymentMethod();
		$allPM = $masterPM->prosesDataWithSession($this->getAppSession(), TRUE);

		$masterPT = new Erems_Models_App_Masterdata_PaymentType();
		$allPT = $masterPT->prosesDataWithSession($this->getAppSession(), TRUE);

		$paramsRequestResult = Erems_Box_Tools::globalParamsExistPayment($this->getAppSession());

		$pt = new Erems_Box_Models_Master_Pt();
		$appDao = new Erems_Models_Master_AppDao();
		$project = new Erems_Box_Models_Master_Project();

		if (Erems_Box_Config::IS_PROJECTPT_CONSTANT) {
			$pt->setName('CONSTANT_PT');
		} else {
			$ptInfo = $appDao->getPt($this->getAppSession()->getPt()->getId());
			$pt->setArrayTable($ptInfo[0][0]);
			$projectInfo = $appDao->getProject($this->getAppSession()->getProject()->getId());
			$project->setArrayTable($projectInfo[0][0]);
		}

		$otherAT = array(array(
				"GLOBALPARAMSEXIST" => $paramsRequestResult["status"],
				"GLOBALPARAMSMSG" => $paramsRequestResult["msg"],
				"GLOBALPARAMSPARAMS" => $paramsRequestResult["parameters"],
				"PT_NAME" => $pt->getName()
		));



		$dm->setHasil(array($allPM, $allPT, $otherAT));


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

		$mp = new Erems_Models_App_Masterdata_PaymentMethod();
		$ap = $mp->prosesDataWithSession($this->getAppSession(), TRUE);

		/// cek print pdf bisa multi print atau tidak
		//$pdfLibrary = Erems_Models_Payment_PrintPdfSelector::getLib($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId());
		$pdfLibrary = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId())->getPdfTemplatePrintoutKwitansi(array());
		$printPdfOption = array();
		if ($pdfLibrary instanceof Erems_Models_Payment_PrintBisaMulti) {
			$printPdfOption = $pdfLibrary->getOptions();
		}

		/// dos print
		// cek print dos bisa multi print atau tidak
		$dosLibrary = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId())->getDosPrintClass();
		$printDosOption = array();
		if ($dosLibrary instanceof Erems_Models_Payment_PrintBisaMulti) {
			$printDosOption = $dosLibrary->getOptions();
			$foundSelc = FALSE;
			/// set default cetakan by user id
			foreach ($printDosOption as $k => $v) {
				if ($v["user_id"] == $this->getAppSession()->getUser()->getId()) {
					$printDosOption[$k]["selected"] = TRUE;
					$foundSelc = true;
				} else {
					$printDosOption[$k]["selected"] = FALSE;
				}
			}
			if (!$foundSelc) {
				$printDosOption[0]["selected"] = TRUE;
			}
		}

		// end dos print

		$otherAT = array(array(
				"PRINTFDF_OPTIONS" => $printPdfOption,
				"PRINTDOS_OPTIONS" => $printDosOption,
				## Add by RH 30/10/2019
				"TEMPLATE_STIMULSOFT" => Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId())->getTemplateOthersPayment()
		));




		$dm->setHasil(array($ac, $ab, $ap, $otherAT));


		return $dm;
	}

	public function mainDelete() {

		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dao = new Erems_Models_Payment_Dao();
		$dao->setTempTipePaymentDelete(Erems_Box_Config::PAYMENTFLAG_OTHERS);
		$dm->setObject(new Erems_Models_Payment_Payment());
		$dm->setDao($dao);
		$dm->setIdProperty("payment_id");
		return $dm;
	}

	public function maindetailRead() {
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		//
		//  $dataList = new Erems_Box_Models_App_DataListCreator('', 'payment', array('customerprofile', 'unittran', 'purchaselettertransaction', 'paymentmethod'), array("detail","deletedRows"));
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'payment', array('purchaselettertransaction', 'unittran', 'clusterb', 'block', 'productcategory', 'type', 'customerprofile', 'paymentmethod', 'city', 'pricetype', 'unitstatus', 'pt'), array("detail", "deletedRows"));

		$dao = new Erems_Models_Payment_Dao();
		$payment = new Erems_Models_Payment_Payment();
		$payment->setArrayTable($this->getAppData());
		$hasil = $dao->getOne($payment);
		$dm->setDataList($dataList);
		$dm->setHasil($hasil);


		return $dm;
	}

	public function paymentdetailRead() {
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'paymentdetail', array('paymenttype'));
		$dao = new Erems_Models_Payment_Dao();
		$payment = new Erems_Models_Payment_Payment();
		$payment->setArrayTable($this->getAppData());
		$hasil = $dao->getOthersPayDetail($payment);
		$dm->setDataList($dataList);
		$dm->setHasil($hasil);


		return $dm;
	}

	public function soldunitlistRead() {
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'unitb', array('unitstatus', 'clusterb', 'blockb', 'productcategory', 'type', 'purchaselettertransaction'));


		$data = $this->getAppData();

		$dao = new Erems_Models_Unit_UnitDao();
		$unitTran = new Erems_Models_Unit_UnitTran();
		$unitTran->setArrayTable($data);
		$unitTran->setProject($this->getAppSession()->getProject());
		$unitTran->setPt($this->getAppSession()->getPt());
		$unitTran->setStatus(Erems_Box_Config::UNITSTATUS_SOLD);
		$unitTran->getBlock()->setId(Erems_Box_Tools::cleanComboData($data, 'block_id'));
		$hasil = $dao->getAllNonLunasV2($this->getAppRequest(), $unitTran);

		$dm->setDataList($dataList);
		$dm->setHasil($hasil);


		return $dm;
	}

	public function scheduledendalistRead() {
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'schedule', array('scheduletype'));


		$data = $this->getAppData();

		$dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
		$pl = new Erems_Models_Purchaseletter_PurchaseLetter();
		$pl->setId(intval($data["purchaseletter_id"]));
		$hasil = $dao->getScheduleDenda($pl);



		$dm->setDataList($dataList);
		$dm->setHasil($hasil);


		return $dm;
	}

	public function selectedsoldunitRead() {



		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'purchaselettertransaction', array('customerprofile', 'unittran', 'unitstatus', 'clusterb', 'blockb', 'productcategory', 'type', 'salesman', 'citraclub', 'mediapromotion', 'saleslocation', 'collector', 'price', 'billingrulestran', 'bank', 'pricetype', 'city', 'pt'));

		$dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
		$hasil = array();
		/// check purchaseletter by unit id

		$unit = new Erems_Models_Unit_Unit();
		$unit->setArrayTable($this->getAppData());
		$pHasil = $dao->getOneByUnit($unit);

		if (count($pHasil[1]) > 0) {
			$pl = new Erems_Models_Purchaseletter_PurchaseLetter();
			$pl->setArrayTable($pHasil[1][0]);

			$hasil = $dao->getOne($pl->getId());
		}



		$dm->setDataList($dataList);
		$dm->setHasil($hasil);


		return $dm;
	}

	public function mainCreate() {
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$payment = new Erems_Models_Payment_Payment();
		$dm->setDao(new Erems_Models_Payment_Dao());
		$v = new Erems_Models_Payment_Validator();
		$v->setSession($this->getAppSession());
		$v->setPaymentModule("otherspayment");
		$dm->setValidator($v);
		$dm->setObject($payment);

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
		return new Erems_Models_App_Box_PaymentProcessor($this->testingFlag(), Erems_Box_Config::PAYMENTFLAG_OTHERS);
	}

	public function schedulelegalitaslistRead() {
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'schedule', array('scheduletype'));
		$data = $this->getAppData();
		$dao = new Erems_Models_Payment_Dao();
		$payment = new Erems_Models_Payment_Payment();
		// $pl = new Erems_Models_Purchaseletter_PurchaseLetter();
		// $pl->setId(intval($data["purchaseletter_id"]));
		// $hasil = $dao->getScheduleLegalitas($pl);
		$payment->setPurchaseLetterId(intval($data["purchaseletter_id"]));
		$hasil = $dao->getScheduleLegalitas($payment);
		$dm->setDataList($dataList);
		$dm->setHasil($hasil);


		return $dm;
	}

}

?>
