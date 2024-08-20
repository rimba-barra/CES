<?php

require_once dirname(__DIR__) . '../library/apli/ApliCashierController.php';

class Cashier_MasterdocumentnumberController extends ApliCashierController {

    public function init() {
        $this->setDao(new Cashier_Models_Master_DocumentnumberDao());
        $this->setValidator(new Cashier_Models_Validator_MasterdocumentnumberValidator());
        $this->setObject(new Cashier_Models_Master_Documentnumber());
        $validator = $this->getValidator();
        $validator->controller = $this;
    }

    public function allRead() {

        $params = $this->getRequest()->getPost();
        $eremsReq = Apli::getRequest($params);
        $session = Apli::getSession();
        $dm = new Cashier_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Cashier_Box_Models_App_DataListCreator('', 'documentnumber', array('project', 'pt'), array("deletedRows")));
        $budgetCoa = new Cashier_Models_Master_Cheque();
        $budgetCoa->setProject($session->getProject());
        $budgetCoa->setPt($session->getPt());
        $dao = new Cashier_Models_Master_ChequeDao();
        $dm->setObject(new Cashier_Models_Master_Cheque());
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
        $ptModel = Apli::generateExtJSModelDirect('pt');
        $yearHasil = $dao->getCustomRead('detailyear', $request, $session);
       $yearModel =Apli::generateExtJSModelDirect('budgetcoa');
        return array(
            "data" => array(
                "pt" => array(
                    "model" => $ptModel,
                    "data" => $ptHasil[0]
                ),
                "year" => array(
                    "model" => $yearModel,
                    "data" => $yearHasil[0]
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
        $cheque = $this->getObject();
        $cheque->setAddBy($session->getUser()->getId());
        $cheque->setProjectPt($session->getProject(), $session->getPt());
        $cheque->setArrayTable($data);
        $validator = new Cashier_Models_Validator_MasterdocumentnumberValidator();
        $validator->appRequest = $request;
        $validator->session = $session;
        $validator->action = $this->getRequest()->getActionName();
        $validator->run($cheque);
        return array(
            "success" => $validator->getStatus(),
            "msg" => $validator->getMsg(),
            "id" => $validator->getReturnId()
        );
    }

    public function mainUpdate() {
        $params = $this->getRequest()->getPost();
        $request = Apli::getRequest($params);
        $data = Apli::getAppdata($params);
        $session = Apli::getSession();
        $cheque = $this->getObject();
        $cheque->setArrayTable($data);
        $cheque->setProjectPt($session->getProject(), $session->getPt());
        $validator = $this->getValidator();
        $validator->appRequest = $request;
        $validator->session = $session;
        $validator->action = $this->getRequest()->getActionName();
        $validator->run($cheque);
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
        $primary = '';
        if ($request->getModeRead() == "detailcheque") {
            $primary = 'chequedetail_id';
        } else {
            $primary = 'cheque_id';
        }
        if (count($data) !== count($data, COUNT_RECURSIVE)) {
            foreach ($data as $row => $index) {
                $deletedId[$row] = $index[$primary];
            }
            $send = implode('~', $deletedId);
        } else {
            $send = $data[$primary];
        }
        $dao = new Cashier_Models_Master_ChequeDao();
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

}
