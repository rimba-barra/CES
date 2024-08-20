<?php

require_once dirname(__DIR__) . '../library/apli/ApliCashierController.php';

class Cashier_MasterConsolidationController extends ApliCashierController {

    public function init() {
        $this->setDao(new Cashier_Models_Dao_ConsolidationDao());
        $this->setValidator(new Cashier_Models_Validator_MultiProjectValidator());
        $this->setObject(new Cashier_Models_Master_Consolidation());
        $validator = $this->getValidator();
        $validator->controller = $this;
    }

    public function allRead() {

        $params = $this->getRequest()->getPost();
        $cashierReq = Apli::getRequest($params);
        $session = Apli::getSession();
        $dm = new Cashier_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Cashier_Box_Models_App_DataListCreator('', 'consolidation', array('user', 'project', 'consolidation'), array("deletedRows","detailproject","detailpt","type","percentage","deletedDetailRows")));
        $objectCreator = $this->getObject();
        $objectCreator->setProjectPt($session->getProject(), $session->getPt());
        $dao = $this->getDao();
        $dm->setObject($objectCreator);
        $dm->setDao($dao);
        $hasil = $dao->getByProjectPtWithPageSearch($objectCreator, $cashierReq, $session);
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
        $dao = $this->getDao();
        $userHasil = $dao->getCustomRead('user', $request, $session);
        $projectHasil = $dao->getCustomRead('project', $request, $session);
        $ptHasil = $dao->getCustomRead('pt', $request, $session);
        $userModel = Apli::generateExtJSModelDirect('user');
        $projectModel = Apli::generateExtJSModelDirect('project');
        $ptModel = Apli::generateExtJSModelDirect('pt');

        return array(
            "data" => array(
                "user" => array(
                    "model" => $userModel,
                    "data" => $userHasil[0]
                ),
                "project" => array(
                    "model" => $projectModel,
                    "data" => $projectHasil[0]
                ),
                "pt" => array(
                    "model" => $ptModel,
                    "data" => $ptHasil[0]
                ),
                "ptid" => $session->getPt()->getId()
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
        $validator->controller = $this;
        $validator->run($objectCreator);
        return array(
            "success" => $validator->getStatus(),
            "msg" => $validator->getMsg()
        );
    }

    public function mainUpdate() {
        $params = $this->getRequest()->getPost();
        $request = Apli::getRequest($params);
        $session = Apli::getSession();
        $data = Apli::getAppdata($params);  
        $objectCreator = $this->getObject();
        Cashier_Box_Tools::setArrayTable($objectCreator, $data);
        $objectCreator->setProjectPt($session->getProject(), $session->getPt());
        $validator = $this->getValidator();
        $validator->appRequest = $request;
        $validator->session = $session;
        $validator->action = $this->getRequest()->getActionName();
        $validator->run($objectCreator);
        return array(
            "success" => $validator->getStatus(),
            "msg" => $validator->getMsg()
        );
    }

    public function mainDelete() {
        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $data = json_decode($params['data'], true);
        $user = $session->getUser()->getId();
        $deletedId = array();
        if (count($data) !== count($data, COUNT_RECURSIVE)) {
            foreach ($data as $row => $index) {
                $deletedId[$row] = $index['consolidation_id'];
            }
            $send = implode('~', $deletedId);
        } else {
            $send = $data['consolidation_id'];
        }
        $dao = $this->getDao();
        $hasil = $dao->deleteData($user, $send, $request);
        if ($hasil) {
            $status = TRUE;
        } else {
            $status = FALSE;
        }
        return array(
            "success" => $status,
            "total" => $hasil
        );
    }

    public function detailptRead() {

        $params = $this->getRequest()->getPost();
        $cashierReq = Apli::getRequest($params);
        $session = Apli::getSession();
        $dm = new Cashier_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Cashier_Box_Models_App_DataListCreator('', 'consolidationdetail', array(), array("")));
        $objectCreator = $this->getObject();
        $objectCreator->setProjectPt($session->getProject(), $session->getPt());
        $dao = $this->getDao();
        $dm->setObject($objectCreator);
        $dm->setDao($dao);
        $hasil = $dao->getdetailpt($objectCreator, $cashierReq, $session);
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

    public function detailptconsolidationRead() {

        $params = $this->getRequest()->getPost();
        $cashierReq = Apli::getRequest($params);
        $session = Apli::getSession();
        $dm = new Cashier_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Cashier_Box_Models_App_DataListCreator('', 'consolidationdetail', array(), array("")));
        $objectCreator = $this->getObject();
        $objectCreator->setProjectPt($session->getProject(), $session->getPt());
        $dao = $this->getDao();
        $dm->setObject($objectCreator);
        $dm->setDao($dao);
        $hasil = $dao->getdetailpt($objectCreator, $cashierReq, $session);
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

}
