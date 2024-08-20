<?php

require_once dirname(__DIR__) . '../library/apli/ApliCashierController.php';

class Cashier_MasterReportMrtController extends ApliCashierController {

    public function init() {
        $this->setDao(new Cashier_Models_Dao_MastercoaDao());
        $this->setValidator(new Cashier_Models_Validator_MastercoaValidator());
        $this->setObject(new Cashier_Models_Master_Coa());
        $this->setModel("coa"); //hanya 1 main model utama
        $this->setSubmodel(array("kelsub")); //harus array
        $this->setSubarray(array("deletedRows", "detailpt", "deletedDetailRows")); //harus array
        $this->setPropertyId("coa_id"); //property id, primary key table
        $validator = $this->getValidator();
        $validator->controller = $this;
    }

    public function allRead() {

        $params = $this->getRequest()->getPost();
        $cashierReq = Apli::getRequest($params);
        $session = Apli::getSession();
        $dm = new Cashier_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Cashier_Box_Models_App_DataListCreator('', $this->getModel(), $this->getSubmodel(), $this->getSubarray()
        ));
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
        $userModel = Apli::generateExtJSModelDirect('user');
        $projectModel = Apli::generateExtJSModelDirect('project');

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
                $deletedId[$row] = $index['coa_id'];
            }
            $send = implode('~', $deletedId);
        } else {
            $send = $data['coa_id'];
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
        $dm->setDataList(new Cashier_Box_Models_App_DataListCreator('', 'multiprojectdetail', array(), array("")));
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

    public function initRead() {

        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $dao = $this->getDao();
        $ptHasil = $dao->getCustomRead('detailpt', $request, $session);
        $ptModel = Apli::generateExtJSModelDirect('pt');

        return array(
            "data" => array(
                "pt" => array(
                    "model" => $ptModel,
                    "data" => $ptHasil[0]
                ),
            ),
        );
    }

}
