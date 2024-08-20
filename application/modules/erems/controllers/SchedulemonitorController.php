<?php

require_once dirname(__DIR__) . '../library/apli/ApliController.php';

class Erems_SchedulemonitorController extends ApliController {
    
    public function excelRead() {

        $session = Apli::getSession();
        $params = $this->getRequest()->getPost();
        $req = Apli::getRequest($params);
        
        
        $dao = new Erems_Models_Master_GeneralDao();
        
        $page = 1;
        $limit = 25;
        
        if(intval($params["tipe"]) > 1){
            $limit = 99999;
            $page = 1;
        }else{
            $page = intval($params["page"]);
        }
        
        $selisiFilter = isset($params["selisih_dibawah"])? $params["selisih_dibawah"] : 0;
        $selisiFilter = intval($selisiFilter);
        $selisiFilter = $selisiFilter <= 0 ? 10000000000:$selisiFilter;
        
        $pricetype = isset($params["pricetype"])? $params["pricetype"]:0;
        $pricetype = intval($pricetype);
        $pricetype = $pricetype==99?0:$pricetype;


        $all = $dao->getScheduleMonitor($session->getProject()->getId(), $session->getPt()->getId(),$page,$limit,$params["purchaseletter_no"],$params["customer_name"],$params["unit_unit_number"],$selisiFilter,$pricetype);
     
        
        $ps = new Erems_Models_Schmonitor_ExportExcel($session->getProject()->getId(), $session->getPt()->getId());
        $ps->process($all[1]);



        $msg = 'Export Excel';
       
        return array(
            "data" => array(
                "PRINTOUT" => TRUE,
                "MSG" => $msg,
                "URL" => $ps->getUrl()
            )
        );
    }
    

    public function hapuspaymentRead() {



        $params = $this->getRequest()->getPost();
        $session  = Apli::getSession();
        
        $paymentId = intval($params["payment_id"]);
        $hasil = FALSE;
        
        $dao = new Erems_Models_Master_GeneralDao();
        $hasil = $dao->deletePaymentScheduleMonitor($paymentId,$session->getUser()->getId());

        return array(
            "data" => array(
                "hasil"=>$hasil
            )
        );
    }
    
    public function allRead() {

        $params = $this->getRequest()->getPost();

        $eremsReq = Apli::getRequest($params);

        $sesBox = Apli::getSession();

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'purchaselettertransaction', array('unitb', 'clusterb', 'productcategory', 'type', 'salesman', 'customer','pricetype'), array());

        $dao = new Erems_Models_Master_GeneralDao();
        
        
        $selisiFilter = intval($params["selisih_dibawah"]);
        $selisiFilter = $selisiFilter <= 0 ? 10000000000:$selisiFilter;
        
        $pricetype = isset($params["pricetype"])? $params["pricetype"]:0;
        $pricetype = intval($pricetype);
        $pricetype = $pricetype==99?0:$pricetype;
        
        $hasil = $dao->getScheduleMonitor($sesBox->getProject()->getId(), $sesBox->getPt()->getId(),$eremsReq->getPage(),$eremsReq->getLimit(),$params["purchaseletter_no"],$params["customer_name"],$params["unit_unit_number"],$selisiFilter,$pricetype);


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

    public function scheduleRead() {


        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'aplimodel_schedule', array('scheduletype', 'sourcemoney'));
        $dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
        $pl = new Erems_Models_Purchaseletter_PurchaseLetter();
        $pl->setArrayTable($this->getRequest()->getPost());
        $hasil = $dao->getScheduleById($pl);


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

    public function paymentRead() {

        $params = $this->getRequest()->getPost();
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'payment', array('paymentmethod'));
        $dao = new Erems_Models_Master_GeneralDao();
        $hasil = $dao->getScheduleMonitorPayment($params["purchaseletter_id"]);


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



        $params = $this->getRequest()->getPost();
        
        $dao = new Erems_Models_Master_GeneralDao();
        $ses = Apli::getSession();
        
        
     
        $hasil = $dao->secGetAction($ses->getGroupId(),$ses->appsId,$ses->controllerName);
        
        $isEnableDeletePayment = FALSE;
        $isUpdateSchedule = FALSE;
        foreach ($hasil[0] as $row){
            if(strpos(strtolower($row["action_url"]) ,strtolower("deletepayment")) !== false){
                $isEnableDeletePayment = TRUE;
            }
            if(strpos(strtolower($row["action_url"]) ,strtolower("editschedule")) !== false){
                $isUpdateSchedule = TRUE;
            }
        }
        
      //  $nil = 1495884770.58;
        //$nil = 57;
     

        return array(
            "data" => array(
                "DELETEPAYMENT"=>$isEnableDeletePayment,
                "UPDATESCHEDULE"=>$isUpdateSchedule
            )
        );
    }
    
    public function updatescheduleRead() {
        $params = $this->getRequest()->getPost();
        
        $dao = new Erems_Models_Master_GeneralDao();
        $ses = Apli::getSession();
     
        $hasil = $dao->updatescheduleScheduleMonitor($ses->getUser()->getId(), $params["ids"], $params["rbs"], $params["rmd"], $params["ddt"]);

        return array(
            "data" => array(
                "HASIL"=>$hasil
            )
        );
    }

    public function purchaseletterRead() {



        $params = $this->getRequest()->getPost();

        $dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
        $hasil = $dao->getOne(intval($params["purchaseletter_id"]));



        return array(
            "data" => array(
                "purchaseletter"=>$hasil
            )
        );
    }

}
