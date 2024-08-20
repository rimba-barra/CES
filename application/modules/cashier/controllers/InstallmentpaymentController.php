<?php
use Erems_Box_Models_App_Hermes_AbstractController as PortalController;
use Erems_Models_App_Box_PaymentProcessorCashier as CrossController;
class Cashier_InstallmentpaymentController extends PortalController {

    protected function testingFlag() {
        return FALSE;
    }

    public function allRead() {

        $ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $ses->report_path = APPLICATION_PATH . '/../public/app/erems/report/';

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'payment', array('customer', 'cluster', 'block', 'unitb', 'pt','cashiercash'), array('deletedRows'));
        $dao = new Erems_Models_Payment_Dao();
        $payment = new Erems_Models_Payment_Payment();
        $payment->setFlag(Erems_Box_Config::PAYMENTFLAG_SCHEDULE);
        
        $hasil = $dao->getAllWithCashier($this->getAppRequest(), $payment, $this->getAppSession());

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

        if(sizeof($paramsRequestIED[0])>0){
            $paramsRequestIED = $paramsRequestIED[0][0]['value'];
        }else{
            $paramsRequestIED = 0;
        }
        //end by david
        
        $otherAT = array(array(
                "PAYMENTMETHOD_CASH" => Erems_Box_Config::PAYMENTMETHOD_CASH,
                "PAYMENTMETHOD_PENCAIRAN" => Erems_Box_Config::PAYMENTMETHOD_PENCAIRAN,
                "PT_NAME" => $pt->getName(),
                // "PAYMENT_TEKS" => Erems_Box_PaymentTeksManager::$params[$this->getAppSession()->getProject()->getId() . "_" . $this->getAppSession()->getPt()->getId()],
                "PAYMENT_TEKS" => Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId())->getPaymentTeksManager(),
                "GLOBALPARAMS" => $paramsRequestResult["parameters"],
                //add by david :
                "INSTALLMENT_EDIT_DATE" => $paramsRequestIED
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

        $paramsRequestResult = Erems_Box_Tools::globalParamsExistPayment($this->getAppSession());

        $otherAT = array(array(
                "GLOBALPARAMSEXIST" => $paramsRequestResult["status"],
                "GLOBALPARAMSMSG" => $paramsRequestResult["msg"],
                "GLOBALPARAMSPARAMS" => $paramsRequestResult["parameters"]
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
        $hasil = $dao->getScheduleByIdtanpaKPR($purchaseletter);

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
        $hasil = $dao->getDetail($payment);

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
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'payment', array('purchaselettertransaction', 'unittran', 'clusterb', 'block', 'productcategory', 'type', 'customerprofile', 'paymentmethod', 'city', 'pricetype', 'unitstatus', 'pt','cashiercash'), array('detail', 'deletedRows','detailcoa','deletedCoa','is_out','prefix_voucher'));
        $dao = new Erems_Models_Payment_Dao();
        $payment = new Erems_Models_Payment_Payment();
        $payment->setArrayTable($this->getAppData());
        $hasil = $dao->getOnev2($payment);

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);


        return $dm;
    }

    public function soldunitlistRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        //  $dataList = new Erems_Box_Models_App_DataListCreator('', 'unittran', array('unitstatus', 'purchaselettertransaction', 'customer', 'clusterb', 'blockb', 'productcategory', 'type'));
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'purchaselettertransaction', array('unitstatus', 'unitb', 'customer', 'clusterb', 'blockb', 'productcategory', 'type'));



        $data = $this->getAppData();
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
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'purchaselettertransaction', array('customerprofile', 'city', 'unittran', 'unitstatus', 'clusterb', 'blockb', 'productcategory', 'type', 'salesman', 'citraclub', 'mediapromotion', 'saleslocation', 'collector', 'price', 'billingrulestran', 'bank', 'pricetype', 'pt','coaconfig'));

        $dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
        $hasil = array();


        $data = $this->getAppData();

        $pl = new Erems_Models_Purchaseletter_PurchaseLetter();
        $pl->setId(intval($data["purchaseletter_id"]));
        $pl->template_id = $data['template_id'];
        $hasil = $dao->getOne4Cashier($pl->getId());


        $dm->setDataList($dataList);
        $dm->setHasil($hasil);


        return $dm;
    }

    public function mainCreate() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $obj = new Erems_Models_Payment_Payment();
        $obj->setFlag(Erems_Box_Config::PAYMENTFLAG_SCHEDULE);
        $dm->setDao(new Erems_Models_Payment_Dao());
        $v = new Erems_Models_Payment_CashierValidator();
        $v->setSession($this->getAppSession());
        $v->dataValidator  = $this->getAppData();
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
       
        $print = Erems_Box_Tools::paymentPrintPDF($data,$this->getAppSession());

        $arrayRespon = array("HASIL" => $print["hasil"],
            "URL" => 'app/erems/uploads/pdf/kwitansipayment/' . $print["file"]
        );
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
		$tetUnitNumber = str_replace("/","_",$tetUnitNumber);
        $fileName = "PRINT_".$tetUnitNumber.".bat";



        if ($hasil) {

            $hasil["penandatangan"] = $genco->getPenandatanganKwitansi(array("user"=>$userFullName));
            $hasil["file_name"] = $fileName;
            $dosPrint =  Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId())->getDosPrintClass();
            $txt = $dosPrint->getTxt($hasil);
            

            $hasil = TRUE;
        }

        $arrayRespon = array("HASIL" => $hasil,
            "URL" => 'app/erems/uploads/pdf/kwitansipayment/' . $fileName,
            "DISPLAY" => $display,
            "PREVIEW" => $txt);
        return Erems_Box_Tools::instantRead($arrayRespon, array());
    }
    
    
    
    
    public function generatetemplatecoaRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'coaconfigdetail', array(), array());
        $dao = new Erems_Models_Master_CoaConfigDao();
        $data = $this->getAppData();
        $template = $data['template_id'];
        
        if(!empty($data['payment_id'])) {
        $paymentcashier_id = $data['payment_id'];
        $dao->paymentcashier_id = $paymentcashier_id;
        }
        if(!empty($data['amount'])) {
        $amount = $data['amount'];
        $dao->amount = $amount;
        }
        
        
        $dao->session = $this->getAppSession();
        $dao->template = $template;
        if(!empty($data['kasbank_id'])) {
        $dao->th_kasbank_id = $data['kasbank_id'];
        }
        $hasil = $dao->getDetailByTemplate($dao);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }


    
    /*
     public function initRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'coaconfigdetail', array(), array());
        $dao = new Erems_Models_Master_CoaConfigDao();
        $dao->session = $this->getAppSession();
        $dao->template = '9999999999';
        $hasil = $dao->getDetailByTemplate($dao);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
     */
    
        public function initRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
        $masterCC = new Erems_Models_App_Masterdata_GeneralLedger();
        $allSalelLoc = $masterCC->prosesDataWithSession($this->getAppSession(), TRUE);
        $otherAT = array(array(
                "goo" => '',
        ));
        $dm->setHasil(array($allSalelLoc ,$otherAT));
        return $dm;
    }



    protected function getDefaultProcessor() {
        return new CrossController($this->testingFlag(), Erems_Box_Config::PAYMENTFLAG_SCHEDULE);
    }

}

?>
