<?php

require_once dirname(__DIR__) . '../library/apli/ApliController.php';

class Cashier_InstallmentpaymentsbyController extends ApliController {
    
    public function printpdfRead() {
        $session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $params = $this->getRequest()->getPost();

       
        
        $sesBox = new Erems_Box_Models_App_Session();
        $sesBox->getProject()->setId($session->getCurrentProjectId());
        $sesBox->getPt()->setId($session->getCurrentPtId());
        $sesBox->getUser()->setId($session->getUserId());
       
        $print = Erems_Box_Tools::paymentPrintPDF($params,$sesBox);
        
        return array(
            "HASIL" => $print["hasil"],
            "URL" => 'app/erems/uploads/pdf/kwitansipayment/' . $print["file"]
        );
    }
    
    
    public function detailRead(){
        $session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $params = $this->getRequest()->getPost();

        $sesBox = new Erems_Box_Models_App_Session();
        $sesBox->getProject()->setId($session->getCurrentProjectId());
        $sesBox->getPt()->setId($session->getCurrentPtId());
        $sesBox->getUser()->setId($session->getUserId());
        
        $dao = new Erems_Models_Payment_Dao();
        $payment = new Erems_Models_Payment_Payment();
        //$payment->setArrayTable($params);
        $payment->setId($params["payment_id"]);
        //$hasil = $dao->getOne($payment);
        
       // $hasil = $dao->getDetail($payment);
        
        $daoPM = new Erems_Models_Master_AppDao();
        $daoCoa = new Erems_Models_Master_CoaConfigDao();
        
        if($params['kasbank_id']) {
        $daoCoa->th_kasbank_id = $params['kasbank_id'];
        }
        
       
     
        
        if(!empty($params['payment_id'])) {
        $paymentcashier_id = $params['payment_id'];
        $daoCoa->paymentcashier_id = $paymentcashier_id;
        }
        if(!empty($data['amount'])) {
        $amount = $data['amount'];
        $daoCoa->amount = $amount;
        }
        $daoCoa->session = $sesBox;
        //$dao->template = $template;
        
        return array(
            "schedule"=>$dao->getDetail($payment),
            "payment"=>$dao->getOnev2($payment),
            "paymentmethod" => $daoPM->getAllPaymentMethod(),
            "detailcoa" => $daoCoa->getDetailByTemplate($daoCoa)
        );
    }
    
    public function hapusRead(){
        $session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $params = $this->getRequest()->getPost();

        $dao = new Erems_Models_Payment_Dao();
        
        $sesBox = new Erems_Box_Models_App_Session();
        $sesBox->getProject()->setId($session->getCurrentProjectId());
        $sesBox->getPt()->setId($session->getCurrentPtId());
        $sesBox->getUser()->setId($session->getUserId());
        
        $ids = array(intval($params["payment_id"]));
      
      //  $decan->set
        $hapus = $dao->deleteFromCashier($ids,$sesBox);
        
        return array(
            "status"=>$hapus
        );
    }

    public function allRead() {

        $session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $session->report_path = APPLICATION_PATH . '/../public/app/erems/report/';

        $params = $this->getRequest()->getPost();

        $eremsReq = new Erems_Box_Models_App_HasilRequestRead(array());
        $start = $params["start"];
        $page = $start > 0 ? ($start/$params["limit"])+1:1;
        $eremsReq->setArrayForm($params);
        $eremsReq->setPage($page);
        $eremsReq->setLimit($params["limit"]);

        $sesBox = new Erems_Box_Models_App_Session();
        $sesBox->getProject()->setId($session->getCurrentProjectId());
        $sesBox->getPt()->setId($session->getCurrentPtId());

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'payment', array('customer', 'cluster', 'block', 'unitb', 'pt','cashiercash'), array('deletedRows'));
        $dao = new Erems_Models_Payment_Dao();
        $payment = new Erems_Models_Payment_Payment();
        $payment->setArrayTable($params);
        $payment->setFlag(Erems_Box_Config::PAYMENTFLAG_SCHEDULE);


        $hasil = $dao->getAllWithCashier($eremsReq, $payment, $sesBox);
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
        $clData  = $clDao->getByProjectPt($cl);
       // var_dump($clDao->getByProjectPt($cl));


        return array(
            "data"=> array(
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


    
    public function saveRead() {
        $session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $params = $this->getRequest()->getPost();
        $data = array();
        parse_str($params["data"], $data);
        
        
    
        
        $data["payment"] =  preg_replace('/[,]+/', '', $data["payment"]);
        $data["total_payment"] = preg_replace('/[,]+/', '', $data["total_payment"]);
        $data["admin_fee"] = preg_replace('/[,]+/', '', $data["admin_fee"]);
        $data["cdn_value"] = preg_replace('/[,]+/', '', $data["cdn_value"]);
        

        $sesBox = new Erems_Box_Models_App_Session();
        $sesBox->getProject()->setId($session->getCurrentProjectId());
        $sesBox->getPt()->setId($session->getCurrentPtId());

        $payment = new Erems_Models_Payment_Payment();
        $cash = $payment->getPaymentCashier();
        $payment->setArrayTable($data);
        $payment->setAddBy($session->getUserId());
        $payment->setFlag(Erems_Box_Config::PAYMENTFLAG_SCHEDULE);
        $payment->getPurchaseletter()->setId($payment->getPurchaseLetterId());
        $cash->setAcceptDate(Erems_Box_Tools::formatDate($data['paymentcashier_accept_date'], "Y-m-d"));
        $payment->setDate(Erems_Box_Tools::formatDate($payment->getDate(), "Y-m-d"));
        $payment->setDueDate(Erems_Box_Tools::formatDate($payment->getDueDate(), "Y-m-d"));
        $payment->setCairDate(Erems_Box_Tools::formatDate($payment->getCairDate(), "Y-m-d"));
        
       
        $departement_id = isset($data['paymentcashier_department_id']) ? $data['paymentcashier_department_id'] : '0';
        $transno = isset($data['paymentcashier_transno']) ? $data['paymentcashier_transno'] : '0';
        $coa_id = isset($data['coa_id']) ? $data['coa_id'] : '0';
        $voucherprefix_id = isset($data['voucherprefix_id']) ? $data['voucherprefix_id'] : '0';
        $prefix_id = isset($data['paymentcashier_prefix_id']) ? $data['paymentcashier_prefix_id'] : '0';
        $kasbank = isset($data['paymentcashier_kasbank']) ? $data['paymentcashier_kasbank'] : '';
        
        
        $cash->setDepartment_id($departement_id);
        $cash->setTransno($transno);
        $cash->setThcoa_id($coa_id);
        $cash->setVoucherprefix_id($voucherprefix_id);
        
        
        if($kasbank=="B") {
            $cash->setKasbank("BANK");
             $cash->setPrefix_id_bank($prefix_id);
        }
        else {
            $cash->setKasbank("KAS");
             $cash->setPrefix($prefix_id);
        }
        
        
        
        

        //  var_dump($payment->getPurchaseLetterId());


        $validator = new Erems_Models_Payment_Validator();
        $validator->setSession($sesBox);
        $validator->run($payment);

        $msg = $validator->getMsg();

        if ($validator->getStatus()) {
            $details = json_decode($params["details"], TRUE);
            foreach ($details as $key => $value) {
                $details[$key] = implode("~", $details[$key]);
            }
            
            $detail_coa = json_decode($params["detail_coa"], TRUE);
            foreach ($detail_coa as $key => $value) {
                $detail_coa[$key] = implode("~", $detail_coa[$key]);
            }
            
            
          
            $dao = new Erems_Models_Payment_Dao();
            $hasilSave = $dao->saveFromCashier($payment, $details, $detail_coa,$sesBox, $data);

            if ($hasilSave <= 0) {
                $msg = "Terjadi kesalahan pada saat menyimpan pembayaran.";
            }

            // var_dump($hasilSave);
        }



        return array(
            "STATUS" => $validator->getStatus(),
            "MSG" => $msg
        );
    }

    public function selectedsoldunitRead() {
        $session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $params = $this->getRequest()->getPost();

        $dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();

        $pl = new Erems_Models_Purchaseletter_PurchaseLetter();
        $pl->setId(intval($params["purchaseletter_id"]));

        $sesBox = new Erems_Box_Models_App_Session();
        $sesBox->getProject()->setId($session->getCurrentProjectId());
        $sesBox->getPt()->setId($session->getCurrentPtId());


        $paramsRequestResult = Erems_Box_Tools::globalParamsExistNew($sesBox, "PAYMENT");

        $daoPM = new Erems_Models_Master_AppDao();


        return array(
            "DATA" => $dao->getOne($pl->getId()),
            "PAYMENT_TEKS" => Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($session->getCurrentProjectId(), $session->getCurrentPtId())->getPaymentTeksManager(),
            "GLOBALPARAMS" => $paramsRequestResult["parameters"],
            "PAYMENTMETHOD" => $daoPM->getAllPaymentMethod()
        );
    }

    public function soldunitlistRead() {

        $session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $params = $this->getRequest()->getPost();


        $eremsReq = new Erems_Box_Models_App_HasilRequestRead(array());
        $eremsReq->setPage($params["page"]);
        $eremsReq->setLimit($params["limit"]);

        $dao = new Erems_Models_Unit_UnitDao();
        $unitTran = new Erems_Models_Unit_UnitTran();
        //   $unitTran->setArrayTable($data);
        $unitTran->getProject()->setId($session->getCurrentProjectId());
        $unitTran->getPt()->setId($session->getCurrentPtId());
        $unitTran->getStatus()->setId(Erems_Box_Config::UNITSTATUS_SOLD);
        $unitTran->setNumber($params["unit_number"]);
        $unitTran->getBlock()->setId(0);
        $hasil = $dao->getAllNonLunas($eremsReq, $unitTran);

        return array(
            "DATA" => $hasil
        );
    }

    public function schedulelistRead() {

        $params = $this->getRequest()->getPost();

        $dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
        $purchaseletter = new Erems_Models_Purchaseletter_PurchaseLetter();
        $purchaseletter->setId($params["purchaseletter_id"]);
        $hasil = $dao->getScheduleByIdtanpaKPR($purchaseletter);


        return array(
            "DATA" => $hasil
        );
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

}
