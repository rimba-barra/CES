<?php

require_once dirname(__DIR__) . '../library/apli/ApliCashierController.php';

class Cashier_MastercoaconfigController extends ApliCashierController {

    public function init() {

        //DECLARE CLASS MODEL AND OBJECT & VALIDATOR, COMMENT VALIDATOR IF DONT WANT USE VALIDATOR FILE
        $dao = new Cashier_Models_Master_CoaConfigDao();
        $object = new Cashier_Models_Master_CoaConfig();
        $primary_key = "coa_config_id";

        //VALIDATOR, IF DONT USE VALIDATOR COMMENT THIS
        $validator = new Cashier_Models_Master_CoaconfigValidator();
        $this->setValidator($validator);
        $unique_column_table = "coa";
        $validator->setObject($object);
        $validator->controller = $this;
        $validator->setUnique($unique_column_table);
        $validator->setPrimarykey($primary_key);

        //FILL
        $this->setDao(new $dao); //SET MODEL CRUD
        $this->setObject($object); //SET OBJECT CLASS di creator utk model EXTJS
        $this->setModel("coaconfig"); //hanya 1 main model utama
        $this->setSubmodel(array('pt','project')); //harus array
        $this->setSubarray(array("detail", "deletedRows")); //harus array
        $this->setPropertyId($primary_key); //property id, primary key table
        $this->setInitProject(FALSE); //INIT LOAD PROJECT HAK AKSES DI M_MULTIPROJECTDETAIL
    }

    public function detailRead() {

        $params = $this->getRequest()->getPost();
        $eremsReq = Apli::getRequest($params);
        $session = Apli::getSession();
        $dm = new Cashier_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Cashier_Box_Models_App_DataListCreator('', 'coaconfigdetail', array('cashflow', 'cashflowtype', 'kelsub'), array()));
        $objectCreator = $this->getObject();
        $objectCreator->setProject($session->getProject());
        $objectCreator->setPt($session->getPt());
        $dao = $this->getDao();
        $dm->setObject($this->getObject());
        $dm->setDao($dao);
        $hasil = $dao->getAllDetail(intval($params['coa_config_id']));
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



    public function initsRead() {

        $params = $this->getRequest()->getPost();
        $params['mode_read'] = 'customrequest';
        $params['paramname'] = 'allcoa';
        $params['module'] = 'voucher';

        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $dao = $this->getDao();
        $ptHasil = $dao->getCustomRead('customrequest', $request, $session);
        $ptModel = Apli::generateExtJSModelDirectWithDetail('coa', 'kelsub');
        
        
        $params['paramname'] = 'allcluster';
        $request = Apli::getRequest($params);
        $clusterHasil = $dao->getCustomRead('customrequest', $request, $session);
        $clusterModel = Apli::generateExtJSModelDirect('cluster');

        return array(
            "data" => array(
                "glcoa" => array(
                    "model" => $ptModel,
                    "data" => $ptHasil[0]
                ),
                "cluster" => array(
                    "model" => $clusterModel,
                    "data" => $clusterHasil[0]
                ),
            ),
        );
    }

    public function mainUpdate() {

        $params = $this->getRequest()->getPost();
        $request = Apli::getRequest($params);
        $data = Apli::getAppdata($params);
        $session = Apli::getSession();
        $objectCreator = $this->getObject();
        Cashier_Box_Tools::setArrayTable($objectCreator, $data);
        $objectCreator->setAddBy($session->getUser()->getId());
        $objectCreator->setProjectPt($session->getProject(), $session->getPt());
        $validator = $this->getValidator();
        $validator->appRequest = $request;
        $validator->session = $session;
        $validator->action = $this->getRequest()->getActionName();
        $validator->paramdata = $data;
        $validator->run($objectCreator);
        return array(
            "success" => $validator->getStatus(),
            "msg" => $validator->getMsg()
        );
    }
    
    public function subcodelistRead() {
        $params = $this->getRequest()->getPost();
        $req = Apli::getRequest($params);
        $session = Apli::getSession();
        $dm = new Cashier_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Cashier_Box_Models_App_DataListCreator('', 'subgl', array('coa', 'pt', 'project'), array()));
        $objectCreator = new Cashier_Models_Master_SubLedger();
        $objectCreator->setProject($session->getProject());
        $objectCreator->setPt($session->getPt());
        $dao = $this->getDao();
        $dm->setObject($objectCreator);
        $dm->setDao($dao);
        $hasil = $dao->getSubgl($req, $objectCreator, $session);
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
    
    public function browsedetailRead() {
        $params = $this->getRequest()->getPost();
        $params['mode_read'] = 'all';
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $request->setModule("mastercoaconfig");
        $dao = new Cashier_Models_Master_BlockDao();
        $block = new Cashier_Models_Master_BlockTran();
        $block->setProjectPt($session->getProject(), $session->getPt());
        $blockData = $dao->getByCPP($block);
        $blockModel = Apli::generateExtJSModelDirect('blocktran');
        $ptHasil = $dao->getCustomRead('detailpt', $request, $session);
        $ptModel = Apli::generateExtJSModelDirectWithDetail('pt', 'project');

        $projectHasil = $dao->getCustomRead('detailproject', $request, $session);
        $projectModel = Apli::generateExtJSModelDirectWithDetail('multiproject', array('user', 'project'));

        return array(
            "data" => array(
                "pt" => array(
                    "model" => $ptModel,
                    "data" => $ptHasil[0]
                ),
                "project" => array(
                    "model" => $projectModel,
                    "data" => $projectHasil[0]
                ),
            ),
        );
    }
}

?>
