<?php
use Erems_Box_Models_App_Hermes_AbstractController as PortalController;
use Erems_Models_App_Box_PaymentProcessorCashier as CrossController;
class Cashier_OtherspaymentController extends PortalController {

    protected function testingFlag() {
        return FALSE;
    }
    
   

    public function allRead() {
        
        $ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $ses->report_path = APPLICATION_PATH.'/../public/app/erems/report/';

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'payment', array('customer', 'cluster', 'block', 'unitb','paymentmethod','cashiercash'),array('deletedRows'));

        $dao = new Erems_Models_Payment_Dao();
        $payment = new Erems_Models_Payment_Payment();
        $payment->setFlag(Erems_Box_Config::PAYMENTFLAG_OTHERS);
        $hasil = $dao->getAllWithCashier($this->getAppRequest(), $payment, $this->getAppSession());
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);


        return $dm;
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




        if ($hasil) {


            $fileName = "test_local.bat";

            $dataPayment = array(
                "note" => $hasil["note"],
                "terbilang" => Erems_Box_Library_Terbilang::terbilang($hasil["total_payment"], 3)
            );

            $alamatPrint = '\\pc-snip026\EPSON LQ\/';
            $alamatPrintLocal = "";
            $maxStr = 50;
            /// POTONG KALIMAT YANG PANJANG
            $noteAr = Erems_Box_Tools::potongKalimat($maxStr, $dataPayment['note']);
            $terbilangAr = Erems_Box_Tools::potongKalimat($maxStr, $dataPayment['terbilang']);

            ///END POTONG KALIMAT YANG PANJANG

            $barisNote = 1;
            $barisTerbilang = 1;
            $barisMarginBotNote = 5;
            $barisMarginBotTerbilang = 4;

            $barisMarginBotNote = $barisMarginBotNote - count($noteAr) + 1;
            $barisMarginBotTerbilang = $barisMarginBotTerbilang - count($terbilangAr) + 1;
            
            $previewRemoveTxt1= "";$previewRemoveTxt2= "";$previewRemoveTxt3= "";
            
           
            


            $txt = "echo.>testfile \n";
            $txt .= "echo.>>testfile \n";
            $txt .= "echo.>>testfile \n";
            $txt .= "echo.>>testfile \n";
            $txt .= "echo.>>testfile \n";
            $txt .= "echo.>>testfile \n";
            $txt .= "echo.>>testfile \n";
            $txt .= "echo.>>testfile \n";
            $txt .= "echo                      " . $hasil["customer_name"] . " >>testfile \n";
            $txt .= "echo.>>testfile \n";
            $txt .= "echo.>>testfile \n";
            $txt .= "echo.>>testfile \n";
            $txt .= "echo.>>testfile \n";
            foreach ($terbilangAr as $ta) {
                $txt .= "echo                      " . $ta . " >>testfile \n";
            }
            for ($i = 0; $i < $barisMarginBotTerbilang; $i++) {
                $txt .= "echo.>>testfile \n";
            }
            foreach ($noteAr as $no) {
                $txt .= "echo                      " . $no . " >>testfile \n";
            }
            for ($i = 0; $i < $barisMarginBotNote; $i++) {
                $txt .= "echo.>>testfile \n";
            }
            $txt .= "echo.>>testfile \n";
            $txt .= "echo                                                           " . Erems_Box_Tools::formatDate($hasil["payment_date"]) . " >>testfile \n";

            $txt .= "echo                " . Erems_Box_Tools::toCurrency($hasil["total_payment"]) . " >>testfile \n";
            $txt .= "echo.>>testfile \n";
            $txt .= "echo.>>testfile \n";
            $txt .= "echo.>>testfile \n";
            $txt .= "echo                                                           " . $genco->getPenandatanganKwitansi(array("user"=>$userFullName)) . " >>testfile \n";
            $txt .= "echo.>>testfile \n";
            $txt .= "echo.>>testfile \n";
            $txt .= "echo.>>testfile \n";
            //$txt .= "copy testfile \"\\\\pc-snip026\EPSON LQ\" \n";
            // $txt .= "copy testfile \"\\\\::1\Epson\" \n";
            // $txt .= "copy testfile \"\\\\localhost\EPSON LX-300+ \/II (Copy 1)\" \n";
            //$txt .= "copy testfile \"\\\\::1\Epsonku\" \n"; $previewRemoveTxt1 = "copy testfile \"\\\\::1\Epsonku\" \n"; 
            
            // FORMAT XP 
            /*
            $txt .= "net use lpt1 \\\\mkt02\EPSONLX- /Persistent:Yes \n"; $previewRemoveTxt1 = "net use lpt1 \\\\mkt02\EPSONLX- /Persistent:Yes \n";
            $txt .= "print testfile \n"; $previewRemoveTxt2 = "print testfile \n";
             
             */
            
            // FORMAT XP
           // $txt .= "copy testfile \"\\\\::1\EPSON LX-310 KASIR\" \n"; $previewRemoveTxt1 = "copy testfile \"\\\\::1\EPSON LX-310 KASIR\" \n";
            $txt .= "copy testfile \"\\\\::1\MY EPSON LX-310\" \n"; $previewRemoveTxt1 = "copy testfile \"\\\\::1\MY EPSON LX-310\" \n";
			
            $txt .= "del testfile"; $previewRemoveTxt3 = "del testfile";


            $myfile = fopen(APPLICATION_PATH . '/../public/app/erems/uploads/pdf/kwitansipayment/' . $fileName, "w") or die("Unable to open file!");
            fwrite($myfile, $txt);
            fclose($myfile);



            $display["name"] = $hasil["customer_name"];
            $display["terbilang"] = $terbilangAr;
            $display["note"] = $noteAr;
            $tempText = "" . Erems_Box_Tools::toCurrency($hasil["total_payment"]);
            $display["date"] = Erems_Box_Tools::formatDate($hasil["payment_date"]);
            $display["amount"] = $tempText;
            
         
            //// membenarkan format text ke preview
            //$txt = str_replace(,"", $txt);
            $txt = str_replace($previewRemoveTxt3,"", $txt);
            $txt = str_replace($previewRemoveTxt2,"", $txt);
            $txt = str_replace($previewRemoveTxt1,"", $txt);
            $txt = str_replace("\n","<br/>", $txt);
            $txt = str_replace("echo.>>","", $txt);
            $txt = str_replace("echo.>","", $txt);
            $txt = str_replace("echo","", $txt);
            $txt = str_replace(">>","", $txt);
            $txt = str_replace("testfile","", $txt);
            $txt = str_replace(" ","&nbsp;", $txt);
            

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
                    'purchaseletter_date'=>Erems_Box_Tools::formatDate($hasil["purchaseletter_purchase_date"]),
                    'pricetype'=>$hasil["pricetype_pricetype"],
                    'paymentmethod'=>$hasil["paymentmethod_paymentmethod"],
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
                "DATA" =>$hasil,
                "MSG" => $msg
        ));




        $dm->setHasil(array($otherAT));


        return $dm;
    }
    
    
    public function printpdfRead() {
        
        $data = $this->getAppData();
        $genco = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId());
        $pdf = $genco->getOthersPaymentTemplate();
        if(!$pdf){
           $pdf = Erems_Models_Payment_PrintPdfSelector::getLib($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId()); 
           $pdf->tipe = 2; // otherspayment
           
        }

         $print = Erems_Box_Tools::paymentPrintPDF($data,$this->getAppSession(),$pdf);

        $arrayRespon = array("HASIL" => $print["hasil"],
            "URL" => 'app/erems/uploads/pdf/kwitansipayment/' . $print["file"]
        );
        return Erems_Box_Tools::instantRead($arrayRespon, array());
    }
    
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



        $dm->setHasil(array($allPM,$allPT,$otherAT));


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




        $dm->setHasil(array($ac,$ab,$ap));


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
         $dataList = new Erems_Box_Models_App_DataListCreator('', 'payment', array('purchaselettertransaction', 'unittran', 'clusterb', 'block', 'productcategory', 'type', 'customerprofile', 'paymentmethod','city','pricetype','unitstatus','pt','cashiercash'), array("detail","deletedRows","detailcoa","deletedCoa","is_out","prefix_voucher"));
        
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
    
    public function soldunitlistRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'unitb', array('unitstatus', 'clusterb', 'blockb', 'productcategory', 'type','purchaselettertransaction'));


        $data = $this->getAppData();

        $dao = new Erems_Models_Unit_UnitDao();
        $unitTran = new Erems_Models_Unit_UnitTran();
        $unitTran->setArrayTable($data);
        $unitTran->setProject($this->getAppSession()->getProject());
        $unitTran->setPt($this->getAppSession()->getPt());
        $unitTran->setStatus(Erems_Box_Config::UNITSTATUS_SOLD);
        $unitTran->getBlock()->setId(Erems_Box_Tools::cleanComboData($data,'block_id'));
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
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'purchaselettertransaction', array('customerprofile', 'unittran', 'unitstatus', 'clusterb', 'blockb', 'productcategory', 'type', 'salesman', 'citraclub', 'mediapromotion', 'saleslocation', 'collector', 'price', 'billingrulestran', 'bank', 'pricetype','city','pt'));

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
        $v = new Erems_Models_Payment_CashierValidator();
        $v->setSession($this->getAppSession());
        $v->setPaymentModule("otherspayment");
        $v->dataValidator  = $this->getAppData();
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

    protected function getDefaultProcessor() {
        //return new Erems_Models_App_Box_PaymentProcessor($this->testingFlag(),Erems_Box_Config::PAYMENTFLAG_OTHERS);
        return new CrossController($this->testingFlag(), Erems_Box_Config::PAYMENTFLAG_OTHERS);
    }

}

?>
