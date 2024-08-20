<?php

class Erems_ProsesspController extends Erems_Box_Models_App_Hermes_AbstractController {

    protected function testingFlag() {
        return FALSE;
    }

    public function allRead() {

        $ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $ses->report_path = APPLICATION_PATH . '/../public/app/erems/report/';

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'schedule', array('unitb'), array());
        $dao = new Erems_Models_Purchaseletter_ProsesSpDao();

        $data = $this->getAppData();

        $jenis = (int) $data["jenis_sp"];

        $hasil = $dao->getAll($this->getAppRequest(), $this->getAppSession(), $data["unit_number"], $jenis);

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);


        return $dm;
    }

    public function prosesRead() {

        $hasil = FALSE;
        $msg = "Prosesing...";
        $data = $this->getAppData();
        //  $jmlHari = 15;
        $tglProses = $data["proses_date"];
        $plDateStart = $data["pldate_start"];
        $plDateEnd = $data["pldate_end"];
        
        



        $datediff = strtotime($plDateStart) - strtotime($plDateEnd);
        $datediff = abs(floor($datediff / (60 * 60 * 24)));
        $maxHari = 366;

        $kandidat = array();
        $kandidat2 = array();
        $kandidat3 = array();
        $kandidat4 = array();

        if ($datediff > $maxHari) {
            $msg = "Proses sp maksimal " . $maxHari . " hari.";
        } else {
            

            $tahunProses = date("Y", strtotime($tglProses));
            //  $tglProses = "2018-01-01";
            /// GENERAL PARAMETER
            $paramsRequestResult = Erems_Box_Tools::globalParamsExistGeneral($this->getAppSession());

            $jmlHariSp1 = (int) $paramsRequestResult["parameters"]["PROSESSP_SP1_HARI"];
            $jmlHariSp2 = (int) $paramsRequestResult["parameters"]["PROSESSP_SP2_HARI"];
            $jmlHariSp3 = (int) $paramsRequestResult["parameters"]["PROSESSP_SP3_HARI"];
            $jmlHariSp4 = (int) $paramsRequestResult["parameters"]["PROSESSP_SP4_HARI"];




            // NOMOR AKHIR
            $dao = new Erems_Models_Purchaseletter_ProsesSpDao();
            $nomorAkhir = $dao->getNomorTerakhir($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId(), $tahunProses);
            if (count($nomorAkhir[0]) == 0) {
                $nomorAkhir = 0;
            } else {
                $nomorAkhir = intval($nomorAkhir[0][0]['nomor_akhir']);
            }



            $kandidatDb = $dao->getCandidate($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId(), $jmlHariSp1, $jmlHariSp2, $jmlHariSp3, $jmlHariSp4, $tglProses,$plDateStart,$plDateEnd);

            $kandidat = $kandidatDb[0];
            $kandidat2 = $kandidatDb[1];
            $kandidat3 = $kandidatDb[2];
            $kandidat4 = $kandidatDb[3];


            //  var_dump($kandidat);
            //  die();


            $semuaTagihan = array();
            $semuaTagihan2 = array();
            $semuaTagihan3 = array();
            $semuaTagihan4 = array();

            // sp 1
            foreach ($kandidat as $row) {
                $nomorAkhir +=1;
                $sch = new Erems_Models_Purchaseletter_Schedule();
                $sch->setId($row["schedule_id"]);
                $sch->setSp1Date($tglProses);
                $sch->setSp1No($nomorAkhir . "/CI/Col/SE/" . $tahunProses);
                $semuaTagihan[] = $sch;
            }

            // sp 2
            foreach ($kandidat2 as $row) {
                $nomorAkhir +=1;
                $sch = new Erems_Models_Purchaseletter_Schedule();
                $sch->setId($row["schedule_id"]);
                $sch->setSp2Date($tglProses);
                $sch->setSp2No($nomorAkhir . "/CI/Col/SE/" . $tahunProses);
                $semuaTagihan2[] = $sch;
            }

            // sp 3
            foreach ($kandidat3 as $row) {
                $nomorAkhir +=1;
                $sch = new Erems_Models_Purchaseletter_Schedule();
                $sch->setId($row["schedule_id"]);
                $sch->setSp3Date($tglProses);
                $sch->setSp3No($nomorAkhir . "/CI/Col/SE/" . $tahunProses);
                $semuaTagihan3[] = $sch;
            }

            // sp 4
            foreach ($kandidat4 as $row) {
                $nomorAkhir +=1;
                $sch = new Erems_Models_Purchaseletter_Schedule();
                $sch->setId($row["schedule_id"]);
                $sch->setSp4Date($tglProses);
                $sch->setSp4No($nomorAkhir . "/CI/Col/SE/" . $tahunProses);
                $semuaTagihan4[] = $sch;
            }

            $decan = Erems_Box_Tools::toDecan($semuaTagihan);
            $decan2 = Erems_Box_Tools::toDecan($semuaTagihan2);
            $decan3 = Erems_Box_Tools::toDecan($semuaTagihan3);
            $decan4 = Erems_Box_Tools::toDecan($semuaTagihan4);
            
           //var_dump($decan3->getDCResult());
           // die();


            $hasil = $dao->saveProses($this->getAppSession()->getUser()->getId(), $tglProses, $decan->getDCResult(), $decan2->getDCResult(), $decan3->getDCResult(), $decan4->getDCResult());
        }



        // var_dump($decan->getDCResult());

        $arrayRespon = array("HASIL" => $hasil,
            "MSG" => $msg,
            "LOG" => array(
                "SP1_COUNT" => count($kandidat),
                "SP2_COUNT" => count($kandidat2),
                "SP3_COUNT" => count($kandidat3),
                "SP4_COUNT" => count($kandidat4)
        ));
        return Erems_Box_Tools::instantRead($arrayRespon, array());
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





        $otherAT = array(array(
                "PAYMENTMETHOD_CASH" => Erems_Box_Config::PAYMENTMETHOD_CASH,
                "PT_NAME" => $pt->getName(),
                "PAYMENT_TEKS" => Erems_Box_PaymentTeksManager::$params[$this->getAppSession()->getProject()->getId() . "_" . $this->getAppSession()->getPt()->getId()]
        ));







        $dm->setHasil(array($allT, $allPM, $allST, $otherAT));


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

    protected function getDefaultProcessor() {
        return new Erems_Models_App_Box_Processor();
    }

}

?>
