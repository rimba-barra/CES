<?php

require_once dirname(__DIR__) . '../library/apli/ApliCashierController.php';

class Cashier_PemutihanController extends ApliCashierController {

    public function init() {
        $this->setDao(new Cashier_Models_Master_PemutihanDao());
        $this->setValidator(new Cashier_Models_Validator_PemutihanValidator());
        $this->setObject(new Cashier_Models_Master_Pemutihan());
        $validator = $this->getValidator();
        $validator->controller = $this;
    }

    public function allRead() {

        $params = $this->getRequest()->getPost();
        $eremsReq = Apli::getRequest($params);
        $session = Apli::getSession();
        $dm = new Cashier_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Cashier_Box_Models_App_DataListCreator('', 'pemutihan', array( 'pt', 'project'), array("deletedRows", "jumlah")));
        $budgetCoa = new Cashier_Models_Master_Pemutihan();
        $budgetCoa->setProject($session->getProject());
        $budgetCoa->setPt($session->getPt());
        $dao = new Cashier_Models_Master_PemutihanDao();
        $dm->setObject(new Cashier_Models_Master_Pemutihan());
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
        $clusterHasil = $dao->getCustomRead('cluster', $request, $session);
        $ptModel = Apli::generateExtJSModelDirectWithDetail('pt', 'project');
        $projectModel = Apli::generateExtJSModelDirectWithDetail('multiproject', array('user', 'project'));
        $clusterModel = Apli::generateExtJSModelDirect('cluster');

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
                "cluster" => array(
                    "model" => $clusterModel,
                    "data" => $clusterHasil[0]
                ),
                "ptid" => $session->getPt()->getId(),
                "FILE_REPORT" => Cashier_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($session->getProject()->getId(), $session->getPt()->getId())->getMasterChequePaymentListReport(),
            ),
        );
    }

    public function prosespemutihanRead() {
        
        $session = Apli::getSession();
        $params = $this->getRequest()->getPost();
        $params['user_id'] = $session->getUser()->getId();
        $dao = $this->getDao();
        $data = $dao->prosespemutihan($params);
        return array(
            "success" => true,
        );
    }
    public function mainDelete() {
        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $data = json_decode($params['data'], true);
        $user = $session->getUser()->getId();
        $deletedId = array();

        $primary = 'pemutihan_id';
        if (count($data) !== count($data, COUNT_RECURSIVE)) {
            foreach ($data as $row => $index) {
                $deletedId[$row] = $index[$primary];
            }
            $send = implode('~', $deletedId);
        } else {
            $send = $data[$primary];
        }

        $dao = new Cashier_Models_Master_PemutihanDao();
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
    function checkcoaconfigRead() {

        $session = Apli::getSession();
        $params = $this->getRequest()->getPost();
        $params['user_id'] = $session->getUser()->getId();
        $dao = $this->getDao();
        $data = $dao->checkcoaconfig($params);
        return array(
            "model" => null,
            "data" => $data,
            "totalRow" => 0
        );
    }

}
