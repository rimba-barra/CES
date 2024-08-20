<?php

require_once dirname(__DIR__) . '../library/apli/ApliController.php';

class Erems_PopupchgnamesatubulanController extends ApliController {
    
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
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'changename', array('purchaseletter', 'unitb','clusterb','blockb',
            'changenamereason','purchaseletterrevision', array('customer', 'customernew_'), array('customer', 'customerold_')),array());
        $dao = new Erems_Models_Sales_Change_Dao();
        $unit = new Erems_Models_Unit_UnitTran();
        $unit->setProject($sesBox->getProject());
        $unit->setPt($sesBox->getPt());
      
        $cn = new Erems_Models_Sales_Change_ChangeName();
        $cn->getPurchaseletter()->setNomor($params["purchaseletter_purchaseletter_no"]);
       
        $hasil = $dao->getAllFillterHariKebelakang($unit,$eremsReq,$cn,$sesBox,$params["unit_number"],$params["customer_name"],$params["x_hari"]);
        
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
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'changename', array('purchaseletter', 'unitb','clusterb','blockb',
            'changenamereason','purchaseletterrevision', array('customer', 'customernew_'), array('customer', 'customerold_')),array());
        $dao = new Erems_Models_Sales_Change_Dao();
        $unit = new Erems_Models_Unit_UnitTran();
        $unit->setProject($sesBox->getProject());
        $unit->setPt($sesBox->getPt());
      
        $cn = new Erems_Models_Sales_Change_ChangeName();
        $cn->getPurchaseletter()->setNomor($params["purchaseletter_purchaseletter_no"]);
       
        $hasil = $dao->getAllFillterHariKebelakang($unit,$eremsReq,$cn,$sesBox,$params["unit_number"],$params["customer_name"],$params["x_hari"]);
        
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        $dl = $dm->getDataList();
        $dl->setDataDao($hasil);

        $hasilData = Apli::prosesDao($dm->getDataList());
        $ps = new Erems_Models_Purchaseletter_ExportExcelChangeNameSatuBulan($session->getCurrentProjectId(), $session->getCurrentPtId());
        $ps->process($hasil[1]);

        return array(
            "model" => [],
            "data" => ["URL" => $ps->getUrl()],
            "totalRow" => []
        );
    }
}
