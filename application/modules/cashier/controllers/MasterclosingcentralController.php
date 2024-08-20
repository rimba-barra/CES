<?php

require_once dirname(__DIR__) . '../library/apli/ApliController.php';

class Cashier_MasterclosingcentralController extends ApliController{
    
    
    public function allRead() {

        $params = $this->getRequest()->getPost();
        $eremsReq = Apli::getRequest($params);
        $session = Apli::getSession();
        $dm = new Cashier_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Cashier_Box_Models_App_DataListCreator('', 'budgetcoa', array('pt'), array("deletedRows")));
        $budgetCoa = new Cashier_Models_Master_BudgetCoa();
        $budgetCoa->setProject($session->getProject());
        $budgetCoa->setPt($session->getPt());
        $dao = new Cashier_Models_Master_BudgetCoaDao();
        $dm->setObject(new Cashier_Models_Master_BudgetCoa());
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
        $dao = new Cashier_Models_Master_BudgetCoaDao();
        $ptHasil = $dao->getCustomReadDirectModule('global','detailpt',$request,$session);
        $yearHasil = $dao->getCustomRead('detailyearclosingcentral',$request,$session);
        $ptModel = Apli::generateExtJSModelDirectWithDetail('pt','project');
        $yearModel =Apli::generateExtJSModelDirect('budgetcoa');

        return array(
            "data"=> array(
                "pt"=>array(
                    "model" => $ptModel,
                    "data" => $ptHasil[0]
                ),
                "year"=>array(
                    "model" => $yearModel,
                    "data" => $yearHasil[0]
                ),
                "ptid"=>$session->getPt()->getId()
            ),
            
         );
    }
    
    public function getclosingcentralRead() {
        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $dao = new Cashier_Models_Master_BudgetCoaDao();
        $req = $dao->getCustomRead('',$request,$session);
        $model =Apli::generateExtJSModelDirect('closing');

        return array(
            "data"=> array(    
                "hasil"=>$req[0],
                "model"=>$model
            ),
        );
    }
    
    public function closemonthRead() {
        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $dao = new Cashier_Models_Master_BudgetCoaDao();
        $req = $dao->getCustomUpdate('sp_closingcentral_validate','',$request,$session);

        return array(
            "data"=> array(    
                "hasil"=>$req,
            ),
        );
    }
    

}

