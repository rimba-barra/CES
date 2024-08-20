<?php

require_once dirname(__DIR__) . '../library/apli/ApliController.php';

class Cashier_AccountreceivableController extends ApliController{
    
    
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
        $ptHasil = $dao->getCustomRead('detailpt',$request,$session);
        $yearHasil = $dao->getCustomRead('detailyear',$request,$session);
        $ptModel = Apli::generateExtJSModelDirect('pt');
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
    
    public function mainUpdate(){

        $params = $this->getRequest()->getPost();
        $request = Apli::getRequest($params);
        $data = Apli::getAppdata($params);
        $session = Apli::getSession();
        $budgeetCoa = new Cashier_Models_Master_BudgetCoa();
        $budgeetCoa->setArrayTable($data);
        $budgeetCoa->setAddBy($session->getUser()->getId());
        $budgeetCoa->setProjectPt($session->getProject(),$session->getPt());
        $validator = new Cashier_Models_Validator_BudgetValidator();
        $validator->appRequest = $request;
        $validator->run($budgeetCoa);
      
        
        return array(
            "success"=>$validator->getStatus(),
            "msg"=>$validator->getMsg()
        ); 
    }
    
    public function mainDelete(){
        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $data = json_decode($params['data'],true);
        $user = $session->getUser()->getId();
        $deletedId = array();
        if (count($data) !== count($data, COUNT_RECURSIVE)) {
            foreach($data as $row=> $index) {
                $deletedId[$row] = $index['budget_id'];
            } 
            $send = implode('~',$deletedId);
        } else {
            $send = $data['budget_id'];
        }
        $dao = new Cashier_Models_Master_BudgetCoaDao();
        $hasil = $dao->deleteData($user,$send, $request);
        if($hasil) {
            $status=TRUE;
        }
        else {
            $status=FALSE;
        }
        return array(
            "success"=>$status,
            "total"=>$hasil  
        );
    }
    
    public function generatecoaRead() {
        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $dao = new Cashier_Models_Master_BudgetCoaDao();
        $budgeetCoa = new Cashier_Models_Master_BudgetCoa();
        $budgeetCoa->setProjectPt($session->getProject(),$session->getPt());
        $hasil = $dao->getHasilGenerateCoa($budgeetCoa,$request);
        
        return array(
        "data"=>array(
            "HASIL"=>$hasil,
            "MSG"=>""
        )    
        );
    }
    

}

