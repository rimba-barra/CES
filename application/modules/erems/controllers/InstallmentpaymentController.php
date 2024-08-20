<?php
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);
class Erems_InstallmentpaymentController extends Erems_Box_Models_App_Hermes_AbstractController {

    protected function testingFlag() {
        return FALSE;
    }

    public function allRead() {

            // echo 'masuk';
            // echo ini_get('max_execution_time'); exit; 
        $ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $ses->report_path = APPLICATION_PATH . '/../public/app/erems/report/';

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'payment', array('customer', 'cluster', 'block', 'unitb', 'pt','purchaseletter'), array('deletedRows'));
        $dao = new Erems_Models_Payment_Dao();
        $payment = new Erems_Models_Payment_Payment();
        $payment->setFlag(Erems_Box_Config::PAYMENTFLAG_SCHEDULE);
//        var_dump($this->getAppSession()->getGrouplist()[$this->getAppSession()->getGroupId()]); die();
        if($this->getAppSession()->getGrouplist()[$this->getAppSession()->getGroupId()] == 'NUP GROUP'){
            $hasil = $dao->getAllNUP($this->getAppRequest(), $payment, $this->getAppSession());
        } else {
            $hasil = $dao->getAll($this->getAppRequest(), $payment, $this->getAppSession());
        }
        
        //die(print_r($hasil));

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



        $masterT = new Erems_Models_App_Masterdata_Type();
        $allT = $masterT->prosesDataWithSession($this->getAppSession(), TRUE);


        $masterPM = new Erems_Models_App_Masterdata_PaymentMethod();
        $allPM = $masterPM->prosesDataWithSession($this->getAppSession(), TRUE);

        $masterST = new Erems_Models_App_Masterdata_ScheduleType();
        $allST = $masterST->prosesDataWithSession($this->getAppSession(), TRUE);



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


        $paramsRequestResult = Erems_Box_Tools::globalParamsExistNew($this->getAppSession(), "PAYMENT");

        //add by david
        $paramsRequestIED = $appDao->getGlobalParam($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId(), 'INSTALLMENT_EDIT_DATE');

        if (sizeof($paramsRequestIED[0]) > 0) {
            $paramsRequestIED = $paramsRequestIED[0][0]['value'];
        } else {
            $paramsRequestIED = 0;
        }
        //end by david

        $otherAT = array(array(
                "PAYMENTMETHOD_CASH" => Erems_Box_Config::PAYMENTMETHOD_CASH,
                "PAYMENTMETHOD_PENCAIRAN" => Erems_Box_Config::PAYMENTMETHOD_PENCAIRAN,
                "PT_NAME" => $pt->getName(),
                "PROJECT_ID"=>$this->getAppSession()->getProject()->getId(),
                // "PAYMENT_TEKS" => Erems_Box_PaymentTeksManager::$params[$this->getAppSession()->getProject()->getId() . "_" . $this->getAppSession()->getPt()->getId()],
                "PAYMENT_TEKS" => Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId())->getPaymentTeksManager(),
                "SEBAGIAN_PAYMENT_TEKS" => Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId())->getSebagianPaymentTeksManager(),
                "GLOBALPARAMS" => $paramsRequestResult["parameters"],
                //add by david :
                "INSTALLMENT_EDIT_DATE" => $paramsRequestIED,
                "HITUNGDENDAMODEL" => Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId())->hitungDendaModel(),
                //add by fatkur 22092020
                "checkCanSPTDraft" => Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId())->checkCanSPTDraft(),
                "counterkwitansi" => Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId())->counterkwitansi(),
                "GROUPUSER" => $this->getAppSession()->getGrouplist()[$this->getAppSession()->getGroupId()]
                //end add
        ));







        $dm->setHasil(array($allT, $allPM, $allST, $otherAT));


        return $dm;
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

    public function searchassetsRead() {
        $ses       = $this->getAppSession();
        $projectid = $ses->getProject()->getId();
        $ptid      = $ses->getPt()->getId();
        $genco     = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($projectid, $ptid);

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        // $creator = new Erems_Box_Models_App_Creator();

        //===== MASTERDATA == //
        $mc = new Erems_Models_App_Masterdata_Cluster();
        $ac = $mc->prosesDataWithSession($ses, TRUE);

        $mb = new Erems_Models_App_Masterdata_Block();
        $ab = $mb->prosesDataWithSession($ses, TRUE);

        $mp = new Erems_Models_App_Masterdata_PaymentMethod();
        $ap = $mp->prosesDataWithSession($ses, TRUE);

        $paramsRequestResult = Erems_Box_Tools::globalParamsExistPayment($ses);


        /// cek print pdf bisa multi print atau tidak
      //  $pdfLibrary = Erems_Models_Payment_PrintPdfSelector::getLib($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId());
        $pdfLibrary = $genco->getPdfTemplatePrintoutKwitansi(array());
       
        
        $printPdfOption = array();
        if ($pdfLibrary instanceof Erems_Models_Payment_PrintBisaMulti) {
            $printPdfOption = $pdfLibrary->getOptions();
        }

        // cek print dos bisa multi print atau tidak
        $dosLibrary = $genco->getDosPrintClass();
        $printDosOption = array();
        if ($dosLibrary instanceof Erems_Models_Payment_PrintBisaMulti) {
            $printDosOption = $dosLibrary->getOptions();
            $foundSelc = FALSE;
            /// set default cetakan by user id
            foreach ($printDosOption as $k => $v) {
                if ($v["user_id"] == $ses->getUser()->getId()) {
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
        
        $ttdKwitansi = $genco->getOpsiTTDKwitansi(array());
        
        //Rizal 22 April 2019
        $buktiPenerimaanFilename = $genco->getBuktiPenerimaan();
        //
        
        $otherAT = array(array(
            "GLOBALPARAMSEXIST"         => $paramsRequestResult["status"],
            "GLOBALPARAMSMSG"           => $paramsRequestResult["msg"],
            "GLOBALPARAMSPARAMS"        => $paramsRequestResult["parameters"],
            "IS_VACUSNO_SEARCH"         => $genco->isVABCACusNoFilterSearch(),
            "KWITANSITPLEDITOR"         => $genco->useKwitansiTemplateEditor(),
            "PRINTFDF_OPTIONS"          => $printPdfOption,
            "PRINTDOS_OPTIONS"          => $printDosOption,
            "TTD_KWITANSI"              => $ttdKwitansi,
            //Rizal 22 April 2019
            "BUKTI_PENERIMAAN_FILENAME" => $buktiPenerimaanFilename,
            ## Add by RH 30/10/2019
            "TEMPLATE_STIMULSOFT"       => $genco->getTemplateInstallmentPayment(),
            //add by fatkur 22092020
            "checkCanSPTDraft"          => $genco->checkCanSPTDraft(),
            "counterkwitansi"           => $genco->counterkwitansi(),
            "GROUPUSER"                 => $ses->getGrouplist()[$ses->getGroupId()],
            //end add
            ## add by RH 20211123
            "paymentDendaFrom"          => $genco->getPaymentDendaFrom(),
            "fileprintmrt"              => $genco->getfileprintmrt(),
            "show_revenuesharing"       => in_array($ses->getUser()->getId(), $genco->showRevenueSharingPayment()) ? 1 : 0, //added by rico 16022023
        ));

        $dm->setHasil(array($ac, $ab, $ap, $otherAT));

        return $dm;
    }

    public function tagihantagihanRead() {



        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'schedule', array('scheduletype', 'payment'));
        $dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
        $purchaseletter = new Erems_Models_Purchaseletter_PurchaseLetter();
        $purchaseletter->setArrayTable($this->getAppData());
        if($purchaseletter->getIsDraft() == 1) {
            $hasil = $dao->getScheduleDraftById($purchaseletter);
        } else {
            $hasil = $dao->getScheduleByIdtanpaKPR($purchaseletter);
        }

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);


        return $dm;
    }

    public function tagihanpaymentRead() {

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'schedule', array('scheduletype', 'payment'));
        $dao = new Erems_Models_Payment_Dao();
        $payment = new Erems_Models_Payment_Payment();
        $payment->setArrayTable($this->getAppData());
        if($payment->getIsDraft() == 1) {
            $hasil = $dao->getDetailDraft($payment);
        } else {
            $hasil = $dao->getDetail($payment);
        }

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);


        return $dm;
    }

    public function mainDelete() {

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setObject(new Erems_Models_Payment_Payment());
        $dm->setDao(new Erems_Models_Payment_Dao());
        $dm->setIdProperty("payment_id");
        return $dm;
    }

    public function maindetailRead() {




        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'payment', array('purchaselettertransaction', 'unittran', 'clusterb', 'block', 'productcategory', 'type', 'customerprofile', 'paymentmethod', 'city', 'pricetype', 'unitstatus', 'pt'), array('detail', 'deletedRows'));
        $dao = new Erems_Models_Payment_Dao();
        $payment = new Erems_Models_Payment_Payment();
        $payment->setArrayTable($this->getAppData());
        if($payment->getIsDraft() == 1) {
            $hasil = $dao->getOneDraft($payment);
        } else {
            $hasil = $dao->getOne($payment);
        }
        
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);


        return $dm;
    }

    public function soldunitlistRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        //  $dataList = new Erems_Box_Models_App_DataListCreator('', 'unittran', array('unitstatus', 'purchaselettertransaction', 'customer', 'clusterb', 'blockb', 'productcategory', 'type'));
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'purchaselettertransaction', array('unitstatus', 'unitb', 'customer', 'clusterb', 'blockb', 'productcategory', 'type'));



        $data = $this->getAppData();
//        var_dump($data);        die();
        $dao = new Erems_Models_Unit_UnitDao();
        $unitTran = new Erems_Models_Unit_UnitTran();
        $unitTran->setArrayTable($data);
        $unitTran->setProject($this->getAppSession()->getProject());
        $unitTran->setPt($this->getAppSession()->getPt());
        $unitTran->getStatus()->setId(Erems_Box_Config::UNITSTATUS_SOLD);
        $unitTran->getBlock()->setId(Erems_Box_Tools::cleanComboData($data, 'block_id'));
        $hasil = $dao->getAllNonLunas($this->getAppRequest(), $unitTran);

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);


        return $dm;
    }

    public function selectedsoldunitRead() {



        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'purchaselettertransaction', array('customerprofile', 'city', 'unittran', 'unitstatus', 'clusterb', 'blockb', 'productcategory', 'type', 'salesman', 'citraclub', 'mediapromotion', 'saleslocation', 'collector', 'price', 'billingrulestran', 'bank', 'pricetype', 'pt'));

        $dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
        $hasil = array();


        $data = $this->getAppData();

        $pl = new Erems_Models_Purchaseletter_PurchaseLetter();
        $pl->setId(intval($data["purchaseletter_id"]));
        $pl->setIsDraft($data['is_draft']);;
        if ($data['is_draft'] == 1) {
                $hasil = $dao->getOneDraft($pl->getId());
        } else {
                $hasil = $dao->getOne($pl->getId());
        }
        
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);


        return $dm;
    }

    public function mainCreate() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $obj = new Erems_Models_Payment_Payment();
        $obj->setFlag(Erems_Box_Config::PAYMENTFLAG_SCHEDULE);
        $dm->setDao(new Erems_Models_Payment_Dao());
        $v = new Erems_Models_Payment_Validator();
        $v->setSession($this->getAppSession());
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

    public function directprintRead() {




        $hasil = FALSE;
        $msg = "Proses...";

        $dao = new Erems_Models_Payment_Dao();
        $payment = new Erems_Models_Payment_Payment();
        $payment->setArrayTable($this->getAppData());
        $hasil = $dao->getOne($payment);
        $hasil = $hasil[1][0];


        if ($hasil) {




            $textPrint = array();
            $textPrint["terbilang"] = Erems_Box_Library_Terbilang::terbilang($hasil["total_payment"], 3);
            $textPrint["total_payment"] = (string) Erems_Box_Tools::toCurrency($hasil["total_payment"]);
            $textPrint["payment_date"] = Erems_Box_Tools::formatDate($hasil["payment_date"]);
            $textPrint["customer"] = $hasil["customer_name"];
            $textPrint["note"] = $hasil["note"];


            $escpos = new Erems_Models_Library_Escpos();
            $escpos->run($textPrint);

            $msg = $escpos->getMsg();

            $hasil = TRUE;
        }



        $arrayRespon = array("HASIL" => $hasil,
            "MSG" => $msg);
        return Erems_Box_Tools::instantRead($arrayRespon, array());
    }

    public function printpdfRead() {

        $data = $this->getAppData();

        $option = isset($data["option"]) ? intval($data["option"]) : 0;
        $ttd = isset($data["ttd"]) ? intval($data["ttd"]) : 0;
        
        $is_cashier =  isset($data["is_cashier"]) ? intval($data["is_cashier"]) : 0;
        
        $installmentflag = 1;
        
        $print = Erems_Box_Tools::paymentPrintPDF($data, $this->getAppSession(), $installmentflag, $option,$ttd,$is_cashier);

        $arrayRespon = array("HASIL" => $print["hasil"],
            "URL" => 'app/erems/uploads/pdf/kwitansipayment/' . $print["file"]
        );
        return Erems_Box_Tools::instantRead($arrayRespon, array());
    }

    /*
      public function printpdfRead() {


      $hasil = FALSE;

      $dao = new Erems_Models_Payment_Dao();
      $projectId = $this->getAppSession()->getProject()->getId();
      $ptId = $this->getAppSession()->getPt()->getId();

      $data = $this->getAppData();
      $paymentIds = $data["payment_id"];
      $hasils = $dao->getByGroup($paymentIds);

      $hasils = $hasils[1];

      $userFullName = $_SESSION["Ciputra"]["common"]["user"]["user_fullname"];

      $genco = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId());




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
      'id' => intval($hasil["payment_id"]),
      'paymentmethod' => $hasil["paymentmethod_paymentmethod"],
      "customer_address" => $hasil["customer_address"],
      // "user" => $userFullName
      "user"=>$genco->getPenandatanganKwitansi(array("user"=>$userFullName))
      );
      $allPayment[] = $dataPayment;
      }

      /// delete old pdf file
      Erems_Models_Payment_FileDeleter::run($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId());


      $pdf = Erems_Models_Payment_PrintPdfSelector::getLib($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId());
      $pdf->run($this->getAppSession(), $allPayment, $paymentIds);

      $hasil = TRUE;
      }






      $arrayRespon = array("HASIL" => $hasil,
      "URL" => 'app/erems/uploads/pdf/kwitansipayment/' . $pdf->getFileName()
      );
      return Erems_Box_Tools::instantRead($arrayRespon, array());
      }

     */

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
                    // 'terbilang' => Erems_Box_Library_Terbilang::terbilang($hasil["total_payment"], 3),
                    'terbilang' => Erems_Box_Library_Terbilang::terbilang($hasil["payment"], 3),
                    //'amount' => (string) Erems_Box_Tools::toCurrency($hasil["total_payment"]),
                    'amount' => (string) Erems_Box_Tools::toCurrency($hasil["payment"]),
                    'payment' => (string) Erems_Box_Tools::toCurrency($hasil["payment"]),
                    'date' => Erems_Box_Tools::formatDate($hasil["payment_date"]),
                    'cair_date' => Erems_Box_Tools::formatDate($hasil["cair_date"]),
                    'customer' => $hasil["customer_name"],
                    'note' => $hasil["note"],
                    'id' => intval($hasil["payment_id"]),
                    'pt_name' => $hasil["pt_name"],
                    'purchaseletter_date' => Erems_Box_Tools::formatDate($hasil["purchaseletter_purchase_date"]),
                    'pricetype' => $hasil["pricetype_pricetype"],
                    'paymentmethod' => $hasil["paymentmethod_paymentmethod"]
                );
                $allPayment[] = $dataPayment;
            }



            /// delete old pdf file 
            Erems_Models_Payment_FileDeleter::run($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId(), "/pdf/voucherpayment/");


            //  $pdf = Erems_Models_Payment_PrintPdfSelector::getLib($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId());
            $pdf = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId())->getVoucherPdfLibrary();
            $pdf->run($this->getAppSession(), $allPayment, $paymentIds);

            $hasil = TRUE;
        }

        $arrayRespon = array("HASIL" => $hasil,
            "URL" => 'app/erems/uploads/pdf/voucherpayment/' . $pdf->getFileName(),
                //  "URL" => 'app/erems/uploads/pdf/kwitansipayment/' . $pdf->getFileName()
        );
        return Erems_Box_Tools::instantRead($arrayRespon, array());
    }

    public function fontpdfRead() {


        $hasil = FALSE;

        $dao = new Erems_Models_Payment_Dao();

        $data = $this->getAppData();


        $pdf = NULL;

        $pdf = new Erems_Models_Library_TcpdfFonts();
        $pdf->run($this->getAppSession());

        $hasil = TRUE;

        $arrayRespon = array("HASIL" => $hasil,
            "URL" => 'app/erems/uploads/pdf/font/' . $pdf->getFileName(),
        );
        return Erems_Box_Tools::instantRead($arrayRespon, array());
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


        $hasil["note"] = str_replace("&", "^&", $hasil["note"]);
        $hasil["customer_name"] = str_replace("&", "^&", $hasil["customer_name"]);

        $txt = NULL;

        if ($hasil) {

            $hasil["penandatangan"] = $genco->getPenandatanganKwitansi(array("user" => $userFullName));
            $hasil["file_name"] = $fileName;
            $dosPrint = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId())->getDosPrintClass();

            $option = isset($params["option"]) ? $params["option"] : 0;


            

            if ($dosPrint instanceof Erems_Models_Payment_PrintBisaMulti) {
                $txt = $dosPrint->runMulti($this->getAppSession(), $hasil, NULL, $option);
            } else {
                $txt = $dosPrint->getTxt($hasil);
            }



           // $txt = $dosPrint->getTxt($hasil);
            $txt = str_replace("^&", "&", $txt);

            $hasil = TRUE;
        }



        $arrayRespon = array("HASIL" => $hasil,
            "URL" => 'app/erems/uploads/pdf/kwitansipayment/' . $fileName,
            "DISPLAY" => $display,
            "PREVIEW" => $txt,
            "MODELPRINT" => Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId())->getDosModelSelector()
        );
        return Erems_Box_Tools::instantRead($arrayRespon, array());
    }

    protected function getDefaultProcessor() {
        return new Erems_Models_App_Box_PaymentProcessor($this->testingFlag(), Erems_Box_Config::PAYMENTFLAG_SCHEDULE);
    }

    // added by rico 16022023
    public function inlineEditRead() {
        $params = $this->getAppData();
        $dao = new Erems_Models_Payment_Dao();
        $result = $dao->InlineUpdate($params, $this->getAppSession()->getUser()->getId());
        echo Zend_Json::encode($result);
        die();
    }

}

?>
