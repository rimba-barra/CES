<?php
use Erems_Box_Models_App_Hermes_AbstractController as PortalController;
use Erems_Models_App_Box_PaymentProcessorCashier as CrossController;
class Cashier_NonlinkpaymentController extends PortalController {

    public $session;
    
    protected function testingFlag() {
        return FALSE;
    }

    public function allRead() {

        $ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $ses->report_path = APPLICATION_PATH . '/../public/app/erems/report/';

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'payment', array('customerprofile', 'cluster', 'block', 'unitb','cashiercash'), array("deletedRows"));

        $dao = new Erems_Models_Payment_Dao();
        $payment = new Erems_Models_Payment_Payment();
        $payment->setFlag(Erems_Box_Config::PAYMENTFLAG_NONLINK);

        $hasil = $dao->getAllWithCashier($this->getAppRequest(), $payment, $this->getAppSession());
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);


        return $dm;
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
                    'id' => intval($hasil["payment_id"])
                );
                $allPayment[] = $dataPayment;
            }


            $genco = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId());
            $pdf = $genco->getOthersPaymentTemplate();
            if(!$pdf){
               //$pdf = new Erems_Models_Library_Tcpdf();
            $pdf = Erems_Models_Payment_PrintPdfSelector::getLib($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId());
 
            }
            
            $pdf->run($this->getAppSession(), $allPayment, $paymentIds);


            $hasil = TRUE;
        }






        $arrayRespon = array("HASIL" => $hasil,
            "URL" => 'app/erems/uploads/pdf/kwitansipayment/' . $pdf->getFileName()
        );
        return Erems_Box_Tools::instantRead($arrayRespon, array());
    }

    public function detailRead() {




        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $creator = new Erems_Box_Models_App_Creator();

        //===== MASTERDATA == //


        $masterCity = new Erems_Models_App_Masterdata_City();
        $allCity = $masterCity->prosesDataWithSession($this->getAppSession(), TRUE);

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


        $dm->setHasil(array($allCity, $allPM, $allPT, $otherAT));


        return $dm;
    }

    public function searchassetsRead() {




        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $creator = new Erems_Box_Models_App_Creator();

        //===== MASTERDATA == //



        $mp = new Erems_Models_App_Masterdata_PaymentMethod();
        $ap = $mp->prosesDataWithSession($this->getAppSession(), TRUE);




        $dm->setHasil(array($ap));


        return $dm;
    }

    public function mainDelete() {

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dao = new Erems_Models_Payment_Dao();
        $dao->setTempTipePaymentDelete(Erems_Box_Config::PAYMENTFLAG_NONLINK);
        $dm->setObject(new Erems_Models_Payment_Payment());
        $dm->setDao($dao);
        $dm->setIdProperty("payment_id");
        return $dm;
    }

    public function maindetailRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'payment', array('customerprofile', 'paymentmethod', 'city', 'pt','cashiercash'), array("detail", "deletedRows","detailcoa","deletedCoa","is_out","prefix_voucher"));
        $dao = new Erems_Models_Payment_Dao();
        $payment = new Erems_Models_Payment_Payment();
        $payment->setArrayTable($this->getAppData());
        $hasil = $dao->getOnev2($payment);

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

    public function selectedunitRead() {



        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'unittran', array('unitstatus', 'clusterb', 'blockb', 'productcategory', 'type','pt'));

        $dao = new Erems_Models_Unit_UnitDao();
        $unit = new Erems_Models_Unit_Unit();
        $unit->setArrayTable($this->getAppData());
        $hasil = $dao->getOne($unit);

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);


        return $dm;
    }

    public function mainCreate() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $payment = new Erems_Models_Payment_NonlinkPayment();
        $dao = new Erems_Models_Payment_Dao();
        $dao->setSession($this->getAppSession());
        $dm->setDao($dao);
        $v = new Erems_Models_Payment_NonlinkCashierValidator();
        $v->setSession($this->getAppSession());
      
        $v->dataValidator  = $this->getAppData();
        $dm->setValidator($v);
        $dm->setObject($payment);

        return $dm;
    }
    
    public function generatetemplatecoaRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'coaconfigdetail', array(), array());
        $dao = new Erems_Models_Master_CoaConfigDao();
        $data = $this->getAppData();
        $template = $data['template_id'];
        
        if(!empty($data['amount_template'])) {
        $amount = $data['amount_template'];
        $dao->amount = $amount;
        }
        else {
        $amount = 0;
        }
        $dao->session = $this->getAppSession();
        $dao->template = $template;
        if(!empty($data['kasbank_id'])) {
        $dao->th_kasbank_id = $data['kasbank_id'];
        }
        $hasil = $dao->getDetailByTemplate($dao,explode(',',$template),explode(',',$amount));
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    
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
        
    
         public function projectptRead() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $a = $this->getAppSession();      
        return Box_Tools::instantRead(array(
            "HASIL" => 1,
            "project_id" => $a->getProject()->getId(),
            "pt_id" => $a->getPt()->getId()
            ), array());
    }


//    protected function getDefaultProcessor() {
//        return new Erems_Models_App_Box_PaymentProcessor($this->testingFlag(), Erems_Box_Config::PAYMENTFLAG_NONLINK);
//    }
//    
    protected function getDefaultProcessor() {
        //return new Erems_Models_App_Box_PaymentProcessor($this->testingFlag(),Erems_Box_Config::PAYMENTFLAG_OTHERS);
        return new CrossController($this->testingFlag(), Erems_Box_Config::PAYMENTFLAG_NONLINK);
    }


}

?>
