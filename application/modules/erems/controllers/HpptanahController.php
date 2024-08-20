<?php

require_once dirname(__DIR__) . '../library/apli/ApliController.php';

class Erems_HpptanahController extends ApliController {
    
 
    
    
    

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
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'purchaselettertransaction', array('unittran', 'clusterb', 'blockb', 'productcategory', 'type', 'pricetype','price'), array());

        $dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();

        $pl = new Erems_Models_Purchaseletter_PurchaseLetter();
        $pl->setArrayTable($params);
        $pl->getUnit()->setNumber($params["unit_unit_number"]);
        $hasil = $dao->getAllHPPTanah($eremsReq,$sesBox, $pl,$params);
        
        
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
    
    public function updatedataRead() {


        $params = $this->getRequest()->getPost();

        $session = Apli::getSession();
        
        $purchaseletter = new Erems_Models_Purchaseletter_PurchaseLetterTransaction();
        $purchaseletter->setModiBy($session->getUser()->getId());
        $purchaseletter->setArrayTable($params);
        
        $dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
        $hasil = $dao->updateHppTanah($purchaseletter);
        

        return array(
            "data"=>$hasil
        );
    }


}
