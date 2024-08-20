<?php

require_once dirname(__DIR__) . '../library/apli/ApliCashierController.php';

class Cashier_MasterChequeController extends ApliCashierController {

    public function init() {
        $this->setDao(new Cashier_Models_Master_ChequeDao());
        $this->setValidator(new Cashier_Models_Validator_MasterChequeValidator());
        $this->setObject(new Cashier_Models_Master_Cheque());
        $validator = $this->getValidator();
        $validator->controller = $this;
    }

    public function allRead() {

        $params = $this->getRequest()->getPost();
        $eremsReq = Apli::getRequest($params);
        $session = Apli::getSession();
        $dm = new Cashier_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Cashier_Box_Models_App_DataListCreator('', 'cheque', array('voucherprefix', 'coa', 'bank', 'pt', 'project'), array("deletedRows", "jumlah")));
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
        $projectHasil = $dao->getCustomRead('detailproject', $request, $session);
        $bankHasil = $dao->getCustomRead('detailbank', $request, $session);
        $ptModel = Apli::generateExtJSModelDirectWithDetail('pt', 'project');
        $projectModel = Apli::generateExtJSModelDirectWithDetail('multiproject', array('user', 'project'));
        $bankModel = Apli::generateExtJSModelDirect('bank');

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
                "bank" => array(
                    "model" => $bankModel,
                    "data" => $bankHasil[0]
                ),
                "ptid" => $session->getPt()->getId(),
                "FILE_REPORT" => Cashier_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($session->getProject()->getId(), $session->getPt()->getId())->getMasterChequePaymentListReport(),
            ),
        );
    }

    public function mainCreate() {
        $this->allRead();
        $params = $this->getRequest()->getPost();
        $request = Apli::getRequest($params);
        $data = Apli::getAppdata($params);

        $session = Apli::getSession();
        $cheque = new Cashier_Models_Master_Cheque();
        $cheque->setAddBy($session->getUser()->getId());
        $cheque->setProjectPt($session->getProject(), $session->getPt());
        $cheque->setArrayTable($data);
        $validator = new Cashier_Models_Validator_MasterChequeValidator();
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
        $cheque = new Cashier_Models_Master_Cheque();
        $cheque->setArrayTable($data);
        $cheque->setProjectPt($session->getProject(), $session->getPt());
        $validator = new Cashier_Models_Validator_MasterChequeValidator();
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
            $primary = 'kasbank_kasbank_id';
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

      /*  if (!empty($hasil)) {
            if (!empty($hasil[0])) {

                if (array_key_exists('result', $hasil[0][0])) {
                    if ($hasil[0][0]['result']) {
                        $status = TRUE;
                        $total = $hasil[0][0]['result'];
                    } else {
                        $status = FALSE;
                        $total = 0;
                        $msg = $hasil[2][0]['msg'];
                    }
                } else if (array_key_exists('ErrorMessage', $hasil[0][0])) {
                    $status = FALSE;
                    $total = 0;
                    $msg = $hasil[2][0]['msg'];
                }
            } else {
                $status = FALSE;
                $total = 0;
                $msg = 'Failed to delete data';
            }
        }*/


        return array(
            "success" => $status,
            "total" => $total,
            "msg" => $msg
        );
    }

    public function detailchequeRead() {
        $params = $this->getRequest()->getPost();
        $eremsReq = Apli::getRequest($params);
        $session = Apli::getSession();
        $dm = new Cashier_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Cashier_Box_Models_App_DataListCreator('', 'chequedetail', array('cheque', 'kasbank'), array("")));
        $objectCreator = $this->getObject();
        $objectCreator->setProject($session->getProject());
        $objectCreator->setPt($session->getPt());
        $dao = $this->getDao();
        $dm->setObject(new $objectCreator());
        $dm->setDao($dao);
        $hasil = $dao->getByProjectPtWithPageSearch($objectCreator, $eremsReq, $session);
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

    public function chequehistoryRead() {
        $params = $this->getRequest()->getPost();
        $eremsReq = Apli::getRequest($params);
        $session = Apli::getSession();
        $dm = new Cashier_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Cashier_Box_Models_App_DataListCreator('', 'chequehistory', array(), array()));
        $objectCreator = $this->getObject();
        $objectCreator->setProject($session->getProject());
        $objectCreator->setPt($session->getPt());
        $dao = $this->getDao();
        $dm->setObject(new $objectCreator);
        $dm->setDao($dao);
        $hasil = $dao->getByProjectPtWithPageSearch($objectCreator, $eremsReq, $session);
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

    public function checkvoucherRead() {
        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $dao = $this->getDao();
        $vidHasil = $dao->getCustomRead('', $request, $session);

        return array(
            "data" => array(
                "hasil" => $vidHasil
            ),
        );
    }

    public function detailchequeCreate() {
        $this->allRead();
        $params = $this->getRequest()->getPost();
        $request = Apli::getRequest($params);
        $data = Apli::getAppdata($params);
        $session = Apli::getSession();
        $cheque = new Cashier_Models_Transaction_ChequeDetail();
        $cheque->setAddBy($session->getUser()->getId());
        $cheque->setProjectPt($session->getProject(), $session->getPt());
        Cashier_Box_Tools::setArrayTable($cheque, $data);
        //$cheque->setArrayTable($data);
        $validator = new Cashier_Models_Validator_MasterChequeDetailValidator();
        $validator->appRequest = $request;
        $validator->session = $session;
        $validator->action = $this->getRequest()->getActionName();
        $validator->run($cheque);
        return array(
            "success" => $validator->getStatus(),
            "msg" => $validator->getMsg()
        );
    }

    public function detailchequedirectCreate() {
        $this->allRead();
        $params = $this->getRequest()->getPost();
        $request = Apli::getRequest($params);
        $data = Apli::getAppdata($params);
        $session = Apli::getSession();
        $cheque = new Cashier_Models_Transaction_ChequeDetail();
        $cheque->setAddBy($session->getUser()->getId());
        $cheque->setProjectPt($session->getProject(), $session->getPt());
        Cashier_Box_Tools::setArrayTable($cheque, $data);
        //$cheque->setArrayTable($data);
        $validator = new Cashier_Models_Validator_MasterChequeDetailValidator();
        $validator->appRequest = $request;
        $validator->session = $session;
        $validator->action = $this->getRequest()->getActionName();
        $validator->run($cheque);
        return array(
            "success" => $validator->getStatus(),
            "msg" => $validator->getMsg()
        );
    }

    public function getissueddateRead() {

        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $dao = new Cashier_Models_Master_BudgetCoaDao();
        $ptHasil = $dao->getCustomRead('', $request, $session);

        return array(
            "data" => array(
                "issued_date" => $ptHasil[0][0]['issued_date']
            ),
        );
    }

    public function changeissueddateUpdate() {
        $params = $this->getRequest()->getPost();
        $request = Apli::getRequest($params);
        $data = Apli::getAppdata($params);
        $session = Apli::getSession();
        $cheque = $this->getObject();
        $cheque->setAddBy($session->getUser()->getId());
        $cheque->setArrayTable($data);
        $cheque->setProjectPt($session->getProject(), $session->getPt());
        $dao = $this->getDao();
        $hasil = $dao->updateIssuedDate($cheque, $request, $session);
        return array(
            "success" => $hasil,
            "msg" => $hasil ? "SUCCESS" : FALSE,
        );
    }

    public function voidchequeUpdate() {
        $params = $this->getRequest()->getPost();
        $request = Apli::getRequest($params);
        $data = Apli::getAppdata($params);
        $session = Apli::getSession();
        $cheque = $this->getObject();
        $cheque->setAddBy($session->getUser()->getId());
        $cheque->setArrayTable($data);
        $cheque->setProjectPt($session->getProject(), $session->getPt());
        $dao = $this->getDao();
        $hasil = $dao->voidcheque($cheque, $request, $session);
        return array(
            "success" => $hasil,
            "msg" => $hasil ? "SUCCESS" : FALSE,
        );
    }

    public function deletevouchervalidationRead()
    {
        $params = $this->getRequest()->getPost();
        $cheque = $this->getObject();
        $dao = $this->getDao();
        $hasil = $dao->deletevouchervalidation($params['hideparam'], $params['kasbank_kasbank_id'], $cheque);
        return array(
            "data" => array(
                "success" => $hasil[0][0]['result'],
                "msg" => $hasil[0][0]['msg']
            )
        );
    }

    public function deletevouchervalidationbychequestatusRead()
    {
        $params = $this->getRequest()->getPost();
        $cheque = $this->getObject();
        $dao = $this->getDao();
        $hasil = $dao->deletevouchervalidation($params['hideparam'], $params['cheque_id'], $cheque);
        return array(
            "data" => array(
                "success" => $hasil[0][0]['result'],
                "msg" => $hasil[0][0]['msg']
            )
        );
    }

    public function canceledchequeUpdate() {
        $params = $this->getRequest()->getPost();
        $request = Apli::getRequest($params);
        $data = Apli::getAppdata($params);
        $session = Apli::getSession();
        $cheque = $this->getObject();
        $cheque->setAddBy($session->getUser()->getId());
        $cheque->setArrayTable($data);
        $cheque->setProjectPt($session->getProject(), $session->getPt());
        $dao = $this->getDao();
        $hasil = $dao->canceledcheque($cheque, $request, $session);
        return array(
            "success" => $hasil,
            "msg" => $hasil ? "SUCCESS" : FALSE,
        );
    }

}
