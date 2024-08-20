<?php

require_once dirname(__DIR__) . '../library/apli/ApliController.php';

class Erems_PopupchgkavlingsatubulanController extends ApliController {
    
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
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'changekavling', array('unitb',
            'clusterb', 'blockb', 'customer', 'purchaselettertransaction',
            array('clusterb', 'cluster2_'), array('clusterb', 'cluster2_'),
            array('unit', 'unit2_'), array('blockb', 'block2_'),
            array('purchaselettertransaction', 'purchaseletter2_'),'purchaseletterrevision'), array());
        $dao = new Erems_Models_Sales_Change_Dao();
        $ck = new Erems_Models_Sales_Change_ChangeKavling();
        $ck->setProject($sesBox->getProject());
        $ck->setPt($sesBox->getPt());

        $hasil = $dao->getAllCKFilterXhariBelakang($eremsReq, $ck,$sesBox,$params["x_hari"]);
        
        
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

        return array(
            "data"=> array()
        );
    }
    
    //add by rico 12-08-2021
    public function exportRead() {
        $session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $session->report_path = APPLICATION_PATH . '/../public/app/erems/report/';

        $params = $this->getRequest()->getPost();

        $eremsReq = new Erems_Box_Models_App_HasilRequestRead(array());
        $start = 0;
        $page = $start > 0 ? ($start/$params["limit"])+1:1;
        $eremsReq->setArrayForm($params);
        $eremsReq->setPage($page);
        $eremsReq->setLimit(9999);

        $sesBox = new Erems_Box_Models_App_Session();
        $sesBox->getProject()->setId($session->getCurrentProjectId());
        $sesBox->getPt()->setId($session->getCurrentPtId());

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'changekavling', array('unitb','clusterb', 'blockb', 'customer', 'purchaselettertransaction',array('clusterb', 'cluster2_'), array('clusterb', 'cluster2_'),array('unit', 'unit2_'), array('blockb', 'block2_'),array('purchaselettertransaction', 'purchaseletter2_'),'purchaseletterrevision'), array());
        $dao = new Erems_Models_Sales_Change_Dao();
        $ck = new Erems_Models_Sales_Change_ChangeKavling();
        $ck->setProject($sesBox->getProject());
        $ck->setPt($sesBox->getPt());

        $hasil = $dao->getAllCKFilterXhariBelakang($eremsReq, $ck,$sesBox,$params["x_hari"]);
        
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        $dl = $dm->getDataList();
        $dl->setDataDao($hasil);

        $hasilData = Apli::prosesDao($dm->getDataList());
        $ps = new Erems_Models_Purchaseletter_ExportExcelChangeKavlingSatuBulan($session->getCurrentProjectId(), $session->getCurrentPtId());
        $ps->process($hasil[1]);

        return array(
            "model" => [],
            "data" => ["URL" => $ps->getUrl()],
            "totalRow" => []
        );
    }
}
