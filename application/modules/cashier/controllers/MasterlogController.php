<?php

require_once dirname(__DIR__) . '../library/apli/ApliController.php';

class Cashier_MasterlogController extends ApliController{
    
    
    public function allRead() {
        $params = $this->getRequest()->getPost();
        $eremsReq = Apli::getRequest($params);
        $session = Apli::getSession();
        $dm = new Cashier_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Cashier_Box_Models_App_DataListCreator('', 'log', array('pt','project'), array()));
        $budgetCoa = new Cashier_Models_Master_Log();
        $budgetCoa->setProject($session->getProject());
        $budgetCoa->setPt($session->getPt());
        $budgetCoa->setUser($session->getUser()->getId());
        $dao = new Cashier_Models_Master_LogDao();
        $dm->setObject($budgetCoa);
        $dm->setDao($dao);
        $hasil = $dao->getByProjectPtWithPageSearch($budgetCoa,$eremsReq);

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
    
    public function detailRead() {
        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $dao = new Cashier_Models_Master_LogDao();
        $projectHasil = $dao->getCustomRead('detailproject', $request, $session);
        $ptHasil = $dao->getCustomRead('detailpt',$request,$session);
        $userHasil = $dao->getCustomRead('detailuser',$request,$session);
        $yearHasil = $dao->getCustomRead('detailyear',$request,$session);
        $ptModel = Apli::generateExtJSModelDirect('pt');
        $userModel = Apli::generateExtJSModelDirect('user');
        $projectModel = Apli::generateExtJSModelDirectWithDetail('multiproject', array('user', 'project'));
        $yearModel =Apli::generateExtJSModelDirect('budgetcoa');
        

        return array(
            "data"=> array(
                "project" => array(
                    "model" => $projectModel,
                    "data" => $projectHasil[0]
                ),
                "pt"=>array(
                    "model" => $ptModel,
                    "data" => $ptHasil[0]
                ),
                "year"=>array(
                    "model" => $yearModel,
                    "data" => $yearHasil[0]
                ),
                 "user"=>array(
                    "model" => $userModel,
                    "data" => $userHasil[0]
                ),
                "ptid"=>$session->getPt()->getId()
            ),
            
         );
    }
    
   

}

