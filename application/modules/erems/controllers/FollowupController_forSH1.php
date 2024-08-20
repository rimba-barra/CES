<?php

// BACKUP Untuk fix conflict

class Erems_FollowupController extends Erems_Models_App_Template_AbstractMasterController {

    public function _getMainDataModel() {
        $dao = new Erems_Models_Purchaseletter_FollowupDao();
        //  $dao->setSession($this->getAppSession());
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Erems_Box_Models_App_DataListCreator('', 'purchaselettertransaction', array('unitb', 'customerprofile'), array()));
        $dm->setObject(new Erems_Models_Cac_Proses());
        $dm->setDao($dao);
        $dm->setValidator(NULL);
        $dm->setIdProperty("purchaseletter_id");
        return $dm;
    }

    public function mainCreate() {


        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setObject(NULL);
        $dm->setDao(NULL);
        $dm->setValidator(NULL);

        return $dm;
    }

    public function allRead() {
        $data = $this->getAppData();
        $dm = $this->_getMainDataModel();
        if ($dm instanceof Erems_Box_Models_App_Hermes_DataModel) {
            $dataList = $dm->getDataList();
            $dao = $dm->getDao();
            $obj = $dm->getObject();
            $obj->setArrayTable($data);


            if ($obj instanceof Erems_Box_Models_Master_InterProjectPt) {
                $ses = $this->getAppSession();
                $obj->setProject($ses->getProject());
                $obj->setPt($ses->getPt());
            }

            //   $prosesFilter = new Erems_Models_Cac_Proses();
            // $prosesFilter->setProject($this->getAppSession()->getProject());
            // $prosesFilter->setPt($this->getAppSession()->getPt());
            $hasil = $dao->getAll($this->getAppRequest(), $this->getAppSession(), $data["unit_number"], $data["purchaseletter_no"]);

            $dm->setDataList($dataList);
            $dm->setHasil($hasil);
        }

        return $dm;
    }

    public function spRead() {
        $dao = new Erems_Models_Purchaseletter_FollowupDao();


        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'schedule', array(), array());

        $data = $this->getAppData();
        $plId = (int) $data["purchaseletter_id"];
        $hasil = $dao->getSp($plId, $this->getAppRequest());

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);


        return $dm;
    }

    public function smsRead() {


        $dao = new Erems_Models_Purchaseletter_FollowupDao();
        $data = $this->getAppData();

        $hasil = FALSE;
        $msg = "Proses";

        $dao = new Erems_Models_Purchaseletter_FollowupDao();

        $detail = $dao->getDetailView(intval($data["purchaseletter_id"]));
        $detail = $detail[1][0];





        $dao = new Erems_Models_Sms_Dao();
        $sc = new Erems_Models_Sms_SMSCategory();
        $sc->setProject($this->getAppSession()->getProject());
        $sc->setPt($this->getAppSession()->getPt());
        $sc->setCode("SMSLSNG");
        $smsCategory = $dao->getAllSMSCategory($sc);
        $smsCategory = Erems_Box_Tools::toObjectRow($smsCategory, new Erems_Models_Sms_SMSCategory());


        $sms = new Erems_Models_Sms_SMS();
        $sms->setAddBy($this->getAppSession()->getUser()->getId());

        $sms->setProject($this->getAppSession()->getProject());
        $sms->setPt($this->getAppSession()->getPt());
        $sms->getPurchaseletter()->setId($detail["purchaseletter_id"]);
        $sms->getCustomer()->setId($detail["customer_id"]);
        $sms->setPhoneNumber($detail["customer_mobilephone"]);
        // $sms->getSMSCategory()->setCode("SMSLSNG");
        $sms->getSMSCategory()->setId($smsCategory->getId());
        $sms->setNotes("SMS Peringatan Tagihan Telat Bayar");
        $sms->setProcessDate(date("Y-m-d"));

        $hasil = $dao->save($sms);

        if (!$hasil) {
            $msg = "Terjadi kesalahan ketika menyimpan data.";
        }






        $arrayRespon = array("data" => $hasil, "hasil" => $hasil, "msg" => $msg);
        return Erems_Box_Tools::instantRead($arrayRespon, array());
    }

    public function viewdetailRead() {


        $dao = new Erems_Models_Purchaseletter_FollowupDao();
        $data = $this->getAppData();
        $hasil = $dao->getDetailView(intval($data["purchaseletter_id"]));

        if (Erems_Box_Tools::adaRecord($hasil)) {
            $hasil = $hasil[1][0];
            $hasil["tgl_surat"] = date("d-m-Y", strtotime($hasil["tgl_surat"]));
            $hasil["purchase_date"] = date("d-m-Y", strtotime($hasil["purchase_date"]));
        } else {
            $hasil = null;
        }
        $arrayRespon = array("data" => $hasil);
        return Erems_Box_Tools::instantRead($arrayRespon, array());
    }

    public function emailRead() {

        $hasil = false;
        $msg = NULL;
        $params = $this->getAppData();
        $statusSentMail = FALSE;

        $email = filter_var($params["email"], FILTER_SANITIZE_EMAIL);

        // Validate e-mail
        if (!filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
            $genco = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId());

            //  $receiver = array("tommy.toban@ciputra.co.id", "Tommy Toban");
            //  $receiverNotifikasi = $genco->getSPEmailNotifikasiReceiver();
            // $receiver = array("yuniar.isma@ciputra.co.id", "Yuniar Isma");
            $receiver = array($params["email"], $params["nama"]);
            $receiverNotifikasi = $genco->getSPEmailNotifikasiReceiver();
            try {

                //  $tempContent = str_replace("</br>","</br></br>", $params["content"]);
                $kontenHTML = "<html><body>";
                $kontenHTML .= $params["content"];
                $kontenHTML .= "</body></html>";








                $mail = new Erems_Box_Library_Email();
                $mail->getMail()->setFrom('mis.kpjkt@ciputra.co.id');
                $mail->getMail()->setBodyHtml($kontenHTML);
                $mail->getMail()->addTo($receiver[0], $receiver[1]);
                //  $mail->getMail()->addBcc("tommy.toban@ciputra.co.id", "Tommy Toban");
                //$mail->getMail()->addTo($players["approve"]["email"], $players["approve"]["name"]);
                $mail->getMail()->setSubject('Surat Peringatan');
                $mail->getMail()->send();

                $statusSentMail = TRUE;
                $msg = "Sukses kirim email";
                $hasil = true;
            } catch (Zend_Mail_Exception $e) {
                $statusSentMail = FALSE;
                $msg = "Email gagal terkirim.";
            }


            /// email ke IBu Putri Citra Indah
            try {

                //  $tempContent = str_replace("</br>","</br></br>", $params["content"]);
                $kontenHTML = "<html><body>";
                $kontenHTML .= "<p>NOTIFIKASI EMAIL SP</p>";
                $kontenHTML .= "<p>NAMA CUSTOMER : " . $receiver[1] . "</p>";
                $kontenHTML .= "<p>EMAIL CUSTOMER : " . $receiver[0] . "</p>";
                $kontenHTML .= "<p>STATUS : " . $msg . "</p>";
                $kontenHTML .= "</body></html>";








                $mail = new Erems_Box_Library_Email();
                $mail->getMail()->setFrom('mis.kpjkt@ciputra.co.id');
                $mail->getMail()->setBodyHtml($kontenHTML);
                $mail->getMail()->addTo($receiverNotifikasi[0], $receiverNotifikasi[1]);
                //   $mail->getMail()->addBcc("tommy.toban@ciputra.co.id", "Tommy Toban");
                //$mail->getMail()->addTo($players["approve"]["email"], $players["approve"]["name"]);
                $mail->getMail()->setSubject('[CES EREMS] Notifikasi email Surat Peringatan');
                $mail->getMail()->send();

                $statusSentMail = TRUE;
                $msg = "Sukses kirim email";
                $hasil = true;
            } catch (Zend_Mail_Exception $e) {
                $statusSentMail = FALSE;
                $msg = "Email gagal terkirim.";
            }
        } else {
            $msg = "Email customer tidak valid ";
        }

        $arrayRespon = array("hasil" => $hasil, "msg" => $msg, "status_sendmail" => $statusSentMail);
        return Erems_Box_Tools::instantRead($arrayRespon, array());
    }

    public function printoutRead() {

        $msg = NULL;
        $params = $this->getAppData();
        
            

        /// paramter global

        $permil = 1;


        $dao = new Erems_Models_Purchaseletter_FollowupDao();
        $dataPurchase = $dao->getPrintInfo(intval($params["purchaseletter_id"]));
        $dataPurchase = $dataPurchase[0][0];

        $dataSPDb = $dao->getPrintInfoSch(intval($params["purchaseletter_id"]));
        $dataSp = $dataSPDb[0];
        $finalDataSp = array();
        $totalTagihan = 0.0;
        
        $maxsp = 0;
        $maxdate = 0;
        $dx = new DateTime('1900-01-02 0:0:00');
        $dxt = new DateTime('1900-01-01 0:0:00');
        $maxspno = 0;
        //find max SP
        foreach ($dataSp as $row) {
            if ($row["tanggal_sp"] && !Erems_Box_Tools::arrayInArrayNested($row["duedate"], "duedate", $finalDataSp)) {
                 for($x=1; $x<=4; $x++){
                    if($row["sp".$x."_plandate_in"]!==null){
                        if($x>$maxsp  && $dx>$dxt){
                            $maxsp = $x-1;  // sp tertinggi
                            $maxschid = $row["schedule_id"];
                            $dx = new DateTime($row["sp".$x."_plandate_in"]); //tanggal tertinggi
                            $maxdate = date('d-m-Y',strtotime($row["sp".$x."_plandate_in"])); //tanggal tertinggi
                        }
                    }
                 }
            }
        }


        foreach ($dataSp as $row) {
          
            if ($row["tanggal_sp"] && !Erems_Box_Tools::arrayInArrayNested($row["duedate"], "duedate", $finalDataSp)) {
                $d2 = new DateTime($row['duedate']);
                // $tempDate = new DateTime($data['tanggal_sp' . $count] . ' 0:0:00');
                $d1 = new DateTime(date("Y-m-d") . ' 0:0:00');
                $d3 = new DateTime($maxdate);

                $row['hari_terlambat'] = $d2->diff($d1)->format("%a");
                $temp = intval($row['hari_terlambat']) * ($permil / 1000) * doubleval($row['remaining_balance']);

                $row['denda_terlambat'] = $temp;

                //---SH 1---
                $row['hari_terlambatb'] = $d2->diff($d3)->format("%a");
                $tempb = intval($row['hari_terlambatb']) * ($permil / 1000) * doubleval($row['remaining_balance']);
                $row['denda_terlambatb'] = $tempb;

                $totalTagihan += doubleval($row['remaining_balance']);
                $finalDataSp[] = $row;
            }
        }
        
      
        
        $dataSPDb[0] = $finalDataSp;
        $url = NULL;

        $fileHtmlTpl = "";

        $data = NULL;
        
        $globalParams = Erems_Box_Tools::getAllGlobalParams();
        $appSessions = Erems_Box_Tools::getAppSessions();
        $globalParams['PROJECT_NAME'] = $appSessions['project'][$this->getAppSession()->getProject()->getId()];
        $globalParams['PT_NAME'] = $appSessions['pt'][$this->getAppSession()->getPt()->getId()];

        if (count($dataSp) > 0) {
            $data = $dataPurchase;
            //main data
            
            //format customer address
            $customerAddress = $data["customer_address"];
            $cusAdLem = "RT/RW";
            $customerAddress = explode($cusAdLem, $customerAddress);
            if(count($customerAddress) > 1){
                $customerAddress = $customerAddress[0]." <br/> ".$cusAdLem." ".$customerAddress[1];
            }
            $data["customer_address"] = $customerAddress;
         
           
            // end format customer address
            

            $data = array_merge($data,$globalParams); 
            
            $data["salesman_name"] = ucfirst(strtolower($data["salesman_name"]));

            $data['tanggal_print'] = date("d-m-Y");
            
            $data['tanggal_print_w'] = Erems_Box_Tools::indodayWords(date("Y-m-d"));

            $data["total_tagihan"] = $totalTagihan;
            $data["total_tagihan_teks"] = number_format($totalTagihan, 2, ',', '.');
           // var_dump(Erems_Box_Tools::toCurrency($totalTagihan));
            $data["total_tagihan_terbilang"] = Erems_Box_Library_Terbilang::terbilang($totalTagihan, 3);



            //tambahan SH1
            $data["max_date"] = $maxdate;
            $data["max_sp"] = $maxsp;
            $data["max_sp_no"] = $maxspno;

            // update status print di schedule


            $scheduleSetPrint = array();
            $scheduleJenisSpSetPrint = array();
            foreach ($dataSp as $row) {
                $scheduleSetPrint[] = $row["schedule_id"];
                $scheduleJenisSpSetPrint[] = $row["indicatorname"];
            }
            $scheduleSetPrint = implode("~", $scheduleSetPrint);
            $scheduleJenisSpSetPrint = implode("~", $scheduleJenisSpSetPrint);
            $updatePrint = $dao->updatePrint($this->getAppSession()->getUser()->getId(), $scheduleSetPrint, $scheduleJenisSpSetPrint);


            /* Start: Templating */

            $TplDir = $params["directory"];

            /* End:Templating */


            // $data['pt_name'] = "test";
            $fileSrc = false;
            if (intval($data['ada_sp4']) > 0) {
                $fileHtmlTpl = $TplDir . "sp4.html";

                $fileSrc = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId())->getTemplateSp4Print();
            } else {
                $fileHtmlTpl = $TplDir . "sp1_3.html";

                $fileSrc = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId())->getTemplateSp123Print();
            }
            $fileSrc = $fileSrc . ".docx";

            if ($fileSrc) {
                $finalFile = 'Surat_Peringatan_' . str_replace('/', '', $data['purchaseletter_no']) . '.docx';


                $p = new Erems_Box_Library_MyWordParser();
                $p->useTable = 2;


                $p->addLoopingField(array('remaining_balance', 'duedate', 'sp_no', 'tanggal_sp'), count($dataSp));

                $count = 1;
                $tglPalingLambat = "INVALID_DATE";
                $tglPalingLambatTemp = null;
                foreach ($dataSp as $k => $dataSp) {
                    if (strlen($dataSp['tanggal_sp']) > 5) {

                        $data['remaining_balance' . $count] = Erems_Box_Tools::toCurrency($dataSp['remaining_balance']);
                        $data['duedate' . $count] = Erems_Box_Tools::formatDate($dataSp['duedate'], 'd-m-Y');
                        $data['sp_no' . $count] = $dataSp['sp_no'];
                        if($maxschid == $dataSp['schedule_id']){
                            $data['max_sp_no'] = $dataSp['sp_no'];
                        }
                        $data['tanggal_sp' . $count] = Erems_Box_Tools::formatDate($dataSp['tanggal_sp'], 'd-m-Y');
                        $data['scheduletype' . $count] = $dataSp['scheduletype'];

                        $date2 = new DateTime($dataSp['duedate']);
                        // $tempDate = new DateTime($data['tanggal_sp' . $count] . ' 0:0:00');
                        $tempDate = new DateTime(date("Y-m-d") . ' 0:0:00');
                        $tempDate->modify('+10 day');
                        $tglPalingLambat = $tempDate->format("d-m-Y");
                        $tglPalingLambatTemp = $tempDate;
                        $data['hari_terlambat' . $count] = $date2->diff($tempDate)->format("%a");

                        $count++;
                    }
                }

                $data['tgl_paling_lambat'] = $tglPalingLambat;
                $data['max_date_w'] = Erems_Box_Tools::indodayWords($data["max_date"]);

                $ok = TRUE;
                $url = "URL";

                if (!$ok) {
                    $msg = "ERR : " . $p->error;
                }
            } else {
                $msg = "ERR : Tidak ada file template cetakan";
            }
            
            
            
        } else {
            $msg = "Tidak ada tagihan yang kena SP";
        }
        
        

        /// check jika pakai html dari php

           //  $htmlTemplate = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(),$this->getAppSession()->getPt()->getId())->getSuratPeringatanTemplate();

       $htmlTemplate  = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(),$this->getAppSession()->getPt()->getId())->getSuratPeringatanTemplate();
     //  var_dump(method_exists($genco, 'getSuratPeringatanTemplate'));
     //  var_export(is_callable(array($genco, 'getSuratPeringatanTemplate')));
     

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        if($data["max_sp"]==4 || $data["sp_surat_ke"]==4 ){
            $data["max_sp"] = 4;
            $data["sp_ke_before"] =  $data["max_sp"]-1;
            $data["sp_no_before"] = $data['sp_no'.$data["sp_ke_before"]];
            $htmlTplFinal = $htmlTemplate->getHTML($data["max_sp"]);
        }else if($data["max_sp"] > 0 || $data["sp_surat_ke"] > 0 ){
            $data["sp_ke_before"] =  $data["max_sp"]-1;
            $data["sp_no_before"] = $data['sp_no'.$data["sp_ke_before"]];
            $htmlTplFinal = $htmlTemplate->getHTML($data["max_sp"]);
        }

        $otherAT = array(array(
                "PRINTOUT" => TRUE,
                "MSG" => $msg,
                "URL" => $url,
                "TPLFILE" => $fileHtmlTpl,
                "HTML_TEMPLATE"=>$htmlTplFinal,
                "DATA" => $data,
                "DATASCH" => $dataSPDb,
                "TAGIHAN_TABLE"=>$htmlTemplate->getListTagihanHTML(array("schedule"=>$dataSPDb))
        ));
        
   

        $dm->setHasil(array($otherAT));
        return $dm;
    }

    public function printoutpreviewRead() {

        //Sama dengan printoutpreview , namun tanpa trigger sp

        $msg = NULL;
        $params = $this->getAppData();
        
        /// paramter global

        $permil = 1;

        $dao = new Erems_Models_Purchaseletter_FollowupDao();
        $dataPurchase = $dao->getPrintInfo(intval($params["purchaseletter_id"]));
        $dataPurchase = $dataPurchase[0][0];

        $dataSPDb = $dao->getPrintInfoSch(intval($params["purchaseletter_id"]));
        $dataSp = $dataSPDb[0];
        $finalDataSp = array();
        $totalTagihan = 0.0;
        
        $maxsp = 0;
        $maxdate = 0;
        $dx = new DateTime('1900-01-02 0:0:00');
        $dxt = new DateTime('1900-01-01 0:0:00');
        $maxspno = 0;
        //find max SP
        foreach ($dataSp as $row) {
            if ($row["tanggal_sp"] && !Erems_Box_Tools::arrayInArrayNested($row["duedate"], "duedate", $finalDataSp)) {
                 for($x=1; $x<=4; $x++){
                    if($row["sp".$x."_plandate_in"]!==null){
                        if($x>$maxsp  && $dx>$dxt){
                            $maxsp = $x-1;  // sp tertinggi
                            $maxschid = $row["schedule_id"];
                            $dx = new DateTime($row["sp".$x."_plandate_in"]); //tanggal tertinggi
                            $maxdate = date('d-m-Y',strtotime($row["sp".$x."_plandate_in"])); //tanggal tertinggi
                        }
                    }
                 }
            }
        }

        foreach ($dataSp as $row) {
          
            if ($row["tanggal_sp"] && !Erems_Box_Tools::arrayInArrayNested($row["duedate"], "duedate", $finalDataSp)) {
                $d2 = new DateTime($row['duedate']);
                // $tempDate = new DateTime($data['tanggal_sp' . $count] . ' 0:0:00');
                $d1 = new DateTime(date("Y-m-d") . ' 0:0:00');
                $d3 = new DateTime($maxdate);

                $row['hari_terlambat'] = $d2->diff($d1)->format("%a");
                $temp = intval($row['hari_terlambat']) * ($permil / 1000) * doubleval($row['remaining_balance']);
                $row['denda_terlambat'] = $temp;

                //---SH 1---
                $row['hari_terlambatb'] = $d2->diff($d3)->format("%a");
                $tempb = intval($row['hari_terlambatb']) * ($permil / 1000) * doubleval($row['remaining_balance']);
                $row['denda_terlambatb'] = $tempb;

                $totalTagihan += doubleval($row['remaining_balance']);
                $finalDataSp[] = $row;
            }
        }
      
        
        $dataSPDb[0] = $finalDataSp;
        $url = NULL;

        $fileHtmlTpl = "";

        $data = NULL;
        
        $globalParams = Erems_Box_Tools::getAllGlobalParams();
        $appSessions = Erems_Box_Tools::getAppSessions();
        $globalParams['PROJECT_NAME'] = $appSessions['project'][$this->getAppSession()->getProject()->getId()];
        $globalParams['PT_NAME'] = $appSessions['pt'][$this->getAppSession()->getPt()->getId()];

        if (count($dataSp) > 0) {
            $data = $dataPurchase;
            //main data
            $data = array_merge($data,$globalParams);    
            $data['tanggal_print'] = date("d-m-Y");
            
            $data["total_tagihan"] = $totalTagihan;
            $data["total_tagihan_teks"] = number_format($totalTagihan, 2, ',', '.');
           // var_dump(Erems_Box_Tools::toCurrency($totalTagihan));
            $data["total_tagihan_terbilang"] = Erems_Box_Library_Terbilang::terbilang($totalTagihan, 3);
            
            $data["max_date"] = $maxdate;
            $data["max_sp"] = $maxsp;
            $data["max_sp_no"] = $maxspno;
            /* Start: Templating */

            $TplDir = $params["directory"];

            /* End:Templating */


            // $data['pt_name'] = "test";
            $fileSrc = false;
            if (intval($data['ada_sp4']) > 0) {
                $fileHtmlTpl = $TplDir . "sp4.html";

                $fileSrc = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId())->getTemplateSp4Print();
            } else {
                $fileHtmlTpl = $TplDir . "sp1_3.html";

                $fileSrc = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId())->getTemplateSp123Print();
            }
            $fileSrc = $fileSrc . ".docx";

            if ($fileSrc) {
                $finalFile = 'Surat_Peringatan_' . str_replace('/', '', $data['purchaseletter_no']) . '.docx';


                $p = new Erems_Box_Library_MyWordParser();
                $p->useTable = 2;

                $p->addLoopingField(array('remaining_balance', 'duedate', 'sp_no', 'tanggal_sp'), count($dataSp));

                $count = 1;
                $tglPalingLambat = "INVALID_DATE";
                $tglPalingLambatTemp = null;
                foreach ($dataSp as $k => $dataSp) {
                    if (strlen($dataSp['tanggal_sp']) > 5) {

                        $data['remaining_balance' . $count] = Erems_Box_Tools::toCurrency($dataSp['remaining_balance']);
                        $data['duedate' . $count] = Erems_Box_Tools::formatDate($dataSp['duedate'], 'd-m-Y');
                        $data['sp_no' . $count] = $dataSp['sp_no'];
                        if($maxschid == $dataSp['schedule_id']){
                            $data['max_sp_no'] = $dataSp['sp_no'];
                        }
                        $data['tanggal_sp' . $count] = Erems_Box_Tools::formatDate($dataSp['tanggal_sp'], 'd-m-Y');
                        $data['scheduletype' . $count] = $dataSp['scheduletype'];

                        $date2 = new DateTime($dataSp['duedate']);
                        // $tempDate = new DateTime($data['tanggal_sp' . $count] . ' 0:0:00');
                        $tempDate = new DateTime(date("Y-m-d") . ' 0:0:00');
                        $tempDate->modify('+10 day');
                        $tglPalingLambat = $tempDate->format("d-m-Y");
                        $tglPalingLambatTemp = $tempDate;
                        $data['hari_terlambat' . $count] = $date2->diff($tempDate)->format("%a");

                        $count++;
                    }
                }

                $data['tgl_paling_lambat'] = $tglPalingLambat;

                $ok = TRUE;
                $url = "URL";

                if (!$ok) {
                    $msg = "ERR : " . $p->error;
                }
            } else {
                $msg = "ERR : Tidak ada file template cetakan";
            }
            
            
            
        } else {
            $msg = "Tidak ada tagihan yang kena SP";
        }


       $htmlTemplate  = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(),$this->getAppSession()->getPt()->getId())->getSuratPeringatanTemplate();


        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $fileHtmlTplNew = "<div style='padding: 10px'><b>PRINT/EMAIL PREVIEW</b><hr>".preg_replace("/<style\\b[^>]*>(.*?)<\\/style>/s", "", $fileHtmlTpl)."</div>";
        $htmlTemplateNew = "<div style='padding: 10px'><b>PRINT/EMAIL PREVIEW</b><hr>".preg_replace("/<style\\b[^>]*>(.*?)<\\/style>/s", "", $htmlTemplate->getHTMLdefault())."</div>";

        $otherAT = array(array(
                "PRINTOUT" => TRUE,
                "MSG" => $msg,
                "URL" => $url,
                "TPLFILE" => $fileHtmlTplNew,
                "HTML_TEMPLATE"=>$htmlTemplateNew,
                "DATA" => $data,
                "DATASCH" => $dataSPDb,
                "TAGIHAN_TABLE"=>$htmlTemplate->getListTagihanHTML(array("schedule"=>$dataSPDb))
        ));
        
        $dm->setHasil(array($otherAT));
        return $dm;
    }

    public function printouttemplateRead() {

        /* Start: Templating by David - MIS */

        $TplDir = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId())->getFollowUpDirTemplate();

        return Erems_Box_Tools::instantRead($TplDir, array());

        /* End:Templating */
    }

    public function inlineEditRead() {
        $params = $this->getAppData();
        $model_followup = new Erems_Models_Followup();
        $result = $model_followup->followupInlineUpdate($params);
        echo Zend_Json::encode($result);
        die();
    }

    public function isSh1FeaturesRead() {
        $genco = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId());
        $arrayRespon = array(
            "STATUS" => $genco->activateSh1Features("followup_user_date"),
        );
        return Erems_Box_Tools::instantRead($arrayRespon, array());
    }

    /*
      public function printoutRead() {

      $msg = NULL;
      $params = $this->getAppData();

      $dao = new Erems_Models_Purchaseletter_FollowupDao();
      $dataPurchase = $dao->getPrintInfo(intval($params["purchaseletter_id"]));
      $dataPurchase = $dataPurchase[0][0];

      $dataSp = $dao->getPrintInfoSch(intval($params["purchaseletter_id"]));
      $dataSp = $dataSp[0];
      $url = NULL;

      if (count($dataSp) > 0) {
      $data = $dataPurchase;
      $data['tanggal_print'] = date("d-m-Y");

      // $data['pt_name'] = "test";
      $fileSrc = false;
      if (intval($data['ada_sp4']) > 0) {
      $fileSrc = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId())->getTemplateSp4Print();
      } else {
      $fileSrc = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId())->getTemplateSp123Print();
      }
      $fileSrc = $fileSrc . ".docx";

      if ($fileSrc) {
      $finalFile = 'Surat_Peringatan_' . str_replace('/', '', $data['purchaseletter_no']) . '.docx';


      $p = new Erems_Box_Library_MyWordParser();
      $p->useTable = 2;


      $p->addLoopingField(array('remaining_balance', 'duedate', 'sp_no', 'tanggal_sp'), count($dataSp));

      $count = 1;
      foreach ($dataSp as $k => $dataSp) {

      $data['remaining_balance' . $count] = Erems_Box_Tools::toCurrency($dataSp['remaining_balance']);
      $data['duedate' . $count] = Erems_Box_Tools::formatDate($dataSp['duedate'], 'd-m-Y');
      $data['sp_no' . $count] = $dataSp['sp_no'];
      $data['tanggal_sp' . $count] = Erems_Box_Tools::formatDate($dataSp['tanggal_sp'], 'd-m-Y');

      $count++;
      }



      $ok = $p->printDoc($fileSrc, $finalFile, $data);

      $url = $p->getUrl();

      if (!$ok) {
      $msg = "ERR : " . $p->error;
      }
      } else {
      $msg = "ERR : Tidak ada file template cetakan";
      }
      } else {
      $msg = "Tidak ada tagihan yang kena SP";
      }



      $dm = new Erems_Box_Models_App_Hermes_DataModel();
      $dm->setDirectResult(TRUE);
      $dm->setRequiredDataList(FALSE);
      $dm->setRequiredModel(FALSE);

      $otherAT = array(array(
      "PRINTOUT" => TRUE,
      "MSG" => $msg,
      "URL" => $url
      ));

      $dm->setHasil(array($otherAT));
      return $dm;
      }
     */
}

?>
