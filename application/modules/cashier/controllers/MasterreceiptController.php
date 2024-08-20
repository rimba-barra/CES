<?php

require_once dirname(__DIR__) . '../library/apli/ApliCashierController.php';

class Cashier_MasterreceiptController extends ApliCashierController {

    public function init() {
        $this->setDao(new Cashier_Models_Master_ReceiptDao());
        $this->setValidator(new Cashier_Models_Validator_MasterreceiptValidator());
        $this->setObject(new Cashier_Models_Master_Receipt());
        $validator = $this->getValidator();
        $validator->controller = $this;
    }

    public function allRead() {

        $params = $this->getRequest()->getPost();
        $eremsReq = Apli::getRequest($params);
        $session = Apli::getSession();
        $dm = new Cashier_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Cashier_Box_Models_App_DataListCreator('', 'masterreceipt', array( 'pt', 'project'), array("deletedRows")));
        $budgetCoa = new Cashier_Models_Master_Receipt();
        $budgetCoa->setProject($session->getProject());
        $budgetCoa->setPt($session->getPt());
        $dao = new Cashier_Models_Master_ReceiptDao();
        $dm->setObject(new Cashier_Models_Master_Receipt());
        $dm->setDao($dao);
        $hasil = $dao->getByProjectPtWithPageSearch($budgetCoa, $eremsReq, $session);
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
        $ptHasil = $dao->getCustomRead('detailpt', $request, $session);
        $projectHasil = $dao->getCustomRead('detailproject', $request, $session);
        $ptModel = Apli::generateExtJSModelDirectWithDetail('pt', 'project');
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
                "ptid" => $session->getPt()->getId(),
            ),
        );
    }

    public function mainDelete() {
        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $data = json_decode($params['data'], true);
        $user = $session->getUser()->getId();
        $deletedId = array();

        $primary = 'receipt_id';
        $reasondelete = '';
        if (count($data) !== count($data, COUNT_RECURSIVE)) {
            foreach ($data as $row => $index) {
                $deletedId[$row] = $index[$primary];
                $reasondelete = $index['reason_delete'];
            }
            $send = implode('~', $deletedId);
        } else {
            $send = $data[$primary];
        }

        $dao = new Cashier_Models_Master_ReceiptDao();
        $hasil = $dao->deleteData($user, $send, $reasondelete);
        //die(print_r($hasil));
 
        $status = '';
        $msg = '';
        $total = '';

        if($hasil != 0){
            $status = TRUE;
            $msg = 'Successfully Deleted!';
            $total = $hasil;
        }else{
             $status = FALSE;
                $total = 0;
                $msg = 'Failed to delete data';
        }

        return array(
            "success" => $status,
            "total" => $total,
            "msg" => $msg
        );
    }

    public function browsedetailRead() {
        $params = $this->getRequest()->getPost();
        $params['mode_read'] = 'all';
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $request->setModule("masterreceipt");
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
    public function mainCreate() {

        $this->allRead();
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
            "msg" => $validator->getMsg(),
            "receipt_id" => $validator->receipt_id,
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

    
    
    public function voidRead() {
        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $data = json_decode($params['data'], true);
        $user = $session->getUser()->getId();
        $deletedId = array();

        $primary = 'receipt_id';
        $reasondelete = '';
        if (count($data) !== count($data, COUNT_RECURSIVE)) {
            foreach ($data as $row => $index) {
                $deletedId[$row] = $index[$primary];
                $reasondelete = $index['reason_delete'];
                $project_id      = $index['project_id'];
                $pt_id           = $index['pt_id'];
            }
            $send = implode('~', $deletedId);
        } else {
            $send = $data[$primary];
        }

        $dao = new Cashier_Models_Master_ReceiptDao();
        $hasil = $dao->void($user, $send, $reasondelete,$project_id,$pt_id);
        //die(print_r($hasil));
 
        $status = '';
        $msg = '';
        $total = '';

        if($hasil != 0){
            $status = TRUE;
            $msg = 'Successfully void!';
            $total = $hasil;
        }else{
             $status = FALSE;
                $total = 0;
                $msg = 'Failed to void data';
        }

        return array(
            "success" => $status,
            "total" => $total,
            "msg" => $msg
        );
    }

    public function usereceiptRead() {
        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $data = json_decode($params['data'], true);
        $user = $session->getUser()->getId();
        $deletedId = array();

        $primary = 'receipt_id';
        $reasondelete = '';
        if (count($data) !== count($data, COUNT_RECURSIVE)) {
            foreach ($data as $row => $index) {
                $deletedId[$row] = $index[$primary];
                $reasondelete    = $index['reason_delete'];
                $project_id      = $index['project_id'];
                $pt_id           = $index['pt_id'];
            }
            $send = implode('~', $deletedId);
        } else {
            $send = $data[$primary];
        }

        $dao = new Cashier_Models_Master_ReceiptDao();
        $hasil = $dao->usereceipt($user, $send, $reasondelete,$project_id,$pt_id);
        //die(print_r($hasil));
 
        $status = '';
        $msg = '';
        $total = '';

        if($hasil != 0){
            $status = TRUE;
            $msg = 'Successfully Use Receipt!';
            $total = $hasil;
        }else{
             $status = FALSE;
                $total = 0;
                $msg = 'Failed to Use Receipt data';
        }

        return array(
            "success" => $status,
            "total" => $total,
            "msg" => $msg
        );
    }

}
