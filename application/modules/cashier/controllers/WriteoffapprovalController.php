<?php

require_once dirname(__DIR__) . '../library/apli/ApliCashierController.php';

class Cashier_WriteoffapprovalController extends ApliCashierController {

    public function init() {
        $this->setDao(new Cashier_Models_Master_WriteoffDao());
        $this->setValidator(new Cashier_Models_Validator_WriteoffValidator());
        $this->setObject(new Cashier_Models_Master_Writeoff());
        $validator = $this->getValidator();
        $validator->controller = $this;
    }

    public function allRead() {

        $params = $this->getRequest()->getPost();
        $eremsReq = Apli::getRequest($params);
        $session = Apli::getSession();
        $dm = new Cashier_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Cashier_Box_Models_App_DataListCreator('', 'writeoff', array( 'pt', 'project'), array("deletedRows", "jumlah","writeoffdetail")));
        $budgetCoa = new Cashier_Models_Master_Writeoff();
        $budgetCoa->setProject($session->getProject());
        $budgetCoa->setPt($session->getPt());
        $dao = new Cashier_Models_Master_WriteoffDao();
        $dm->setObject(new Cashier_Models_Master_Writeoff());
        $dm->setDao($dao);
        $hasil = $dao->getByProjectPtWithPageSearchApproval($budgetCoa, $eremsReq, $session);
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

        $primary = 'writeoff_id';
        if (count($data) !== count($data, COUNT_RECURSIVE)) {
            foreach ($data as $row => $index) {
                $deletedId[$row] = $index[$primary];
            }
            $send = implode('~', $deletedId);
        } else {
            $send = $data[$primary];
        }

        $dao = new Cashier_Models_Master_WriteoffDao();
        $hasil = $dao->deleteData($user, $send, $request);
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
        $request->setModule("writeoff");
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
    public function writeoffdendaRead() {
        $params = $this->getRequest()->getPost();
        $req = Apli::getRequest($params);
        $session = Apli::getSession();
        $dm = new Cashier_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Cashier_Box_Models_App_DataListCreator('', 'writeoffdetail', array(), array("")));
        $objectCreator = new Cashier_Models_Master_Writeoffdetail();
        $objectCreator->setProject($session->getProject());
        $objectCreator->setPt($session->getPt());
        $dao = new Cashier_Models_Master_WriteoffDao();
        $dm->setObject($objectCreator);
        $dm->setDao($dao);
        $hasil = $dao->getDetailwriteoff($objectCreator, $req);
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
            "writeoff_id" => $validator->writeoff_id,
        );
    }
    
    public function checklimitRead() {
        $params = $this->getRequest()->getPost();
        $dao = $this->getDao();
        $data = $dao->validationlimit($params['project_id'],$params['pt_id']);
        if(!isset($data[0][0])){
            $data[0][0]['msg'] = '';
        }
        return array(
            "data" => array(
                "msg" => ($data[0][0]['msg']==''?'':$data[0][0]['msg']),
            ),
        );
    }
    public function prosesapvrjctRead() {
        
        $session = Apli::getSession();
        $params = $this->getRequest()->getPost();
        $params['execuser'] = $session->getUser()->getId();
        $dao = $this->getDao();
        $data = $dao->prosesapvrjct($params);
        return array(
            "success" => true,
        );
    }
}
