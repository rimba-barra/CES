<?php

class Erems_InstallmentpaymentController extends Erems_Box_Models_App_Hermes_AbstractController {

    protected function testingFlag() {
        return FALSE;
    }

    public function allRead() {

        $ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $ses->report_path = APPLICATION_PATH . '/../public/app/erems/report/';

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'payment', array('customer', 'cluster', 'block', 'unitb', 'pt'), array('deletedRows'));
        $dao = new Erems_Models_Payment_Dao();
        $payment = new Erems_Models_Payment_Payment();
        $payment->setFlag(Erems_Box_Config::PAYMENTFLAG_SCHEDULE);

        $hasil = $dao->getAll($this->getAppRequest(), $payment, $this->getAppSession());

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


         $paramsRequestResult = Erems_Box_Tools::globalParamsExistNew($this->getAppSession(),"PAYMENT");



        $otherAT = array(array(
                "PAYMENTMETHOD_CASH" => Erems_Box_Config::PAYMENTMETHOD_CASH,
                "PAYMENTMETHOD_PENCAIRAN" => Erems_Box_Config::PAYMENTMETHOD_PENCAIRAN,
                "PT_NAME" => $pt->getName(),
               // "PAYMENT_TEKS" => Erems_Box_PaymentTeksManager::$params[$this->getAppSession()->getProject()->getId() . "_" . $this->getAppSession()->getPt()->getId()],
                "PAYMENT_TEKS"=>  Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId())->getPaymentTeksManager(),
                "GLOBALPARAMS" => $paramsRequestResult["parameters"]
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
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'payment', array('purchaselettertransaction', 'unittran', 'clusterb', 'block', 'productcategory', 'type', 'customerprofile', 'paymentmethod', 'city', 'pricetype', 'unitstatus', 'pt'), array('detail', 'deletedRows'));
        $dao = new Erems_Models_Payment_Dao();
        $payment = new Erems_Models_Payment_Payment();
        $payment->setArrayTable($this->getAppData());
        $hasil = $dao->getOne($payment);

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);


        return $dm;
    }

    public function soldunitlistRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
      //  $dataList = new Erems_Box_Models_App_DataListCreator('', 'unittran', array('unitstatus', 'purchaselettertransaction', 'customer', 'clusterb', 'blockb', 'productcategory', 'type'));
        $dataList = new Erems_Box_Models_App_DataListCreator('','purchaselettertransaction', array('unitstatus', 'unitb', 'customer', 'clusterb', 'blockb', 'productcategory', 'type'));



        $data = $this->getAppData();
        $dao = new Erems_Models_Unit_UnitDao();
        $unitTran = new Erems_Models_Unit_UnitTran();
        $unitTran->setArrayTable($data);
        $unitTran->setProject($this->getAppSession()->getProject());
        $unitTran->setPt($this->getAppSession()->getPt());
        $unitTran->getStatus()->setId(Erems_Box_Config::UNITSTATUS_SOLD);
        $unitTran->getBlock()->setId(Erems_Box_Tools::cleanComboData($data, 'block_id'));
        $hasil = $dao->getAll($this->getAppRequest(), $unitTran);

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

        $hasil = $dao->getOne($pl->getId());


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


            /*
              // in a web services component
              $webServiceNamespace = new Zend_Session_Namespace('PRINT_PAYMENT_EREMS');
              $webServiceNamespace->terbilang = Erems_Box_Library_Terbilang::terbilang($hasil["total_payment"], 3);
              $webServiceNamespace->total_payment = (string) Erems_Box_Tools::toCurrency($hasil["total_payment"]);
              $webServiceNamespace->payment_date = Erems_Box_Tools::formatDate($hasil["payment_date"]);
              $webServiceNamespace->customer = $hasil["customer_name"];

             */

            $allPayment = array();
           
            foreach ($hasils as $hasil) {
         
                $dataPayment = array(
                    'terbilang' => Erems_Box_Library_Terbilang::terbilang($hasil["total_payment"], 3),
                    'amount' => (string) Erems_Box_Tools::toCurrency($hasil["total_payment"]),
                    'date' => Erems_Box_Tools::formatDate($hasil["payment_date"]),
                    'customer' => $hasil["customer_name"],
                    'note' => $hasil["note"],
                    'id' => intval($hasil["payment_id"]),
                    'paymentmethod'=>$hasil["paymentmethod_paymentmethod"],
                    "customer_address"=>$hasil["customer_address"],
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
                    'purchaseletter_date'=>Erems_Box_Tools::formatDate($hasil["purchaseletter_purchase_date"]),
                    'pricetype'=>$hasil["pricetype_pricetype"],
                    'paymentmethod'=>$hasil["paymentmethod_paymentmethod"]
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


        $hasil = FALSE;

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
            /*
              $text = $dataPayment['note'];
              $noteAr = array();
              $terbilangAr = array();
              $maxStr = 50;
              $count = 0;
              while (strlen($text) > 0) {

              $noteAr[] = substr($text, 0, $maxStr);
              // cari spasi terakhir

              $text = str_replace($noteAr[$count], "", $text);
              $count++;
              }
              $count = 0;
              $text = $dataPayment['terbilang'];
              while (strlen($text) > 0) {

              $terbilangAr[] = substr($text, 0, $maxStr);
              $text = str_replace($terbilangAr[$count], "", $text);
              $count++;
              }

             */
            ///END POTONG KALIMAT YANG PANJANG

            $barisNote = 1;
            $barisTerbilang = 1;
            $barisMarginBotNote = 5;
            $barisMarginBotTerbilang = 4;

            $barisMarginBotNote = $barisMarginBotNote - count($noteAr) + 1;
            $barisMarginBotTerbilang = $barisMarginBotTerbilang - count($terbilangAr) + 1;

            $myfile = fopen(APPLICATION_PATH . '/../public/app/erems/uploads/pdf/kwitansipayment/' . $fileName, "w") or die("Unable to open file!");
            $txt = "echo.>testfile \n";
            $txt .= "echo.>>testfile \n";
            $txt .= "echo.>>testfile \n";
            $txt .= "echo.>>testfile \n";
            $txt .= "echo.>>testfile \n";
            $txt .= "echo.>>testfile \n";
            $txt .= "echo.>>testfile \n";
            $txt .= "echo.>>testfile \n";
            $txt .= "echo                          " . $hasil["customer_name"] . " >>testfile \n";
            $txt .= "echo.>>testfile \n";
            $txt .= "echo.>>testfile \n";
            $txt .= "echo.>>testfile \n";
            $txt .= "echo.>>testfile \n";
            foreach ($terbilangAr as $ta) {
                $txt .= "echo                          " . $ta . " >>testfile \n";
            }
            for ($i = 0; $i < $barisMarginBotTerbilang; $i++) {
                $txt .= "echo.>>testfile \n";
            }
            foreach ($noteAr as $no) {
                $txt .= "echo                          " . $no . " >>testfile \n";
            }
            for ($i = 0; $i < $barisMarginBotNote; $i++) {
                $txt .= "echo.>>testfile \n";
            }

            $txt .= "echo                                                        " . Erems_Box_Tools::formatDate($hasil["payment_date"]) . " >>testfile \n";

            $txt .= "echo                " . Erems_Box_Tools::toCurrency($hasil["total_payment"]) . " >>testfile \n";
            $txt .= "echo.>>testfile \n";
            $txt .= "echo.>>testfile \n";
            $txt .= "echo.>>testfile \n";
            $txt .= "echo.>>testfile \n";
            $txt .= "echo.>>testfile \n";
            $txt .= "echo.>>testfile \n";
            $txt .= "echo.>>testfile \n";
            $txt .= "echo.>>testfile \n";
            //$txt .= "copy testfile \"\\\\pc-snip026\EPSON LQ\" \n";
           // $txt .= "copy testfile \"\\\\::1\Epson\" \n";
           // $txt .= "copy testfile \"\\\\localhost\EPSON LX-300+ \/II (Copy 1)\" \n";
           //$txt .= "copy testfile \"\\\\::1\Epsonku\" \n";
            $txt .= "copy testfile \"\\\\::1\epsonlx-\" \n";
            //
            $txt .= "del testfile";
            fwrite($myfile, $txt);
            fclose($myfile);

            $display["name"] = $hasil["customer_name"];
            $display["terbilang"] = $terbilangAr;
            $display["note"] = $noteAr;
            $tempText = "" . Erems_Box_Tools::toCurrency($hasil["total_payment"]);
            $display["date"] = Erems_Box_Tools::formatDate($hasil["payment_date"]);
            $display["amount"] = $tempText;

            $hasil = TRUE;

            /*

              // in a web services component
              $webServiceNamespace = new Zend_Session_Namespace('PRINT_PAYMENT_EREMS');
              $webServiceNamespace->terbilang = Erems_Box_Library_Terbilang::terbilang($hasil["total_payment"], 3);
              $webServiceNamespace->total_payment = (string) Erems_Box_Tools::toCurrency($hasil["total_payment"]);
              $webServiceNamespace->payment_date = Erems_Box_Tools::formatDate($hasil["payment_date"]);
              $webServiceNamespace->customer = $hasil["customer_name"];



              $hasil = TRUE;

             */
        }






        $arrayRespon = array("HASIL" => $hasil,
            "URL" => 'app/erems/uploads/pdf/kwitansipayment/' . $fileName,
            "DISPLAY" => $display);
        return Erems_Box_Tools::instantRead($arrayRespon, array());
    }

    protected function getDefaultProcessor() {
        return new Erems_Models_App_Box_PaymentProcessor($this->testingFlag(), Erems_Box_Config::PAYMENTFLAG_SCHEDULE);
    }

}

?>
