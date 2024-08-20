<?php

require_once dirname(__DIR__) . '../library/apli/ApliController.php';

class Erems_MasterrewardController extends ApliController {

    public function detailRead() {
        $params = $this->getRequest()->getPost();
        $sesBox = Apli::getSession();

        $dao = new Erems_Models_Reward_RewardDao();
        $reward = new Erems_Models_Reward_Reward();

        $reward->setId($params["reward_id"]);
        $reward->setProject($sesBox->getProject());
        $reward->setPt($sesBox->getPt());
        return array(
            "reward" => $dao->getOne($reward),
        );
    }

    public function hapusRead() {
        $session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $params = $this->getRequest()->getPost();

        $dao = new Erems_Models_Reward_RewardDao();

        $sesBox = Apli::getSession();

        $ids = array(intval($params["reward_id"]));
        $ids = implode("~", $ids);

        $hapus = $dao->delete($ids, $sesBox);

        return array(
            "status" => $hapus
        );
    }

    public function allRead() {

        $session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $session->report_path = APPLICATION_PATH . '/../public/app/erems/report/';

        $params = $this->getRequest()->getPost();

        $eremsReq = Apli::getRequest($params);

        $sesBox = Apli::getSession();

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'reward', array(), array());
        $dao = new Erems_Models_Reward_RewardDao();
        $reward = new Erems_Models_Reward_Reward();
        $reward->setArrayTable($params);
        $reward->setProject($sesBox->getProject());
        $reward->setPt($sesBox->getPt());


        $hasil = $dao->getAll($eremsReq, $reward);
        $dm->setDataList($dataList);
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

        $session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $session->report_path = APPLICATION_PATH . '/../public/app/erems/report/';

        $params = $this->getRequest()->getPost();

        $sesBox = Apli::getSession();

        return array(
            "data" => "KOSONG"
        );
    }

    public function forminitRead() {

        $session = Apli::getSession();

        $eremsReq = Apli::getRequest($this->getRequest()->getPost());

        return array(
            "data" => "KOSONG"
        );
    }

    public function saveRead() {
        $session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $params = $this->getRequest()->getPost();
        $data = json_decode($params["data"], TRUE);


        $sesBox = Apli::getSession();

        $reward = new Erems_Models_Reward_Reward();
        $reward->setArrayTable($data);
        $reward->setProject($sesBox->getProject());
        $reward->setPt($sesBox->getPt());
        $reward->setAddBy($session->getUserId());


        $validator = new Erems_Models_Reward_RewardValidator();
        $validator->run($reward);

        $msg = $validator->getMsg();
        $status = $validator->getStatus();

        if ($validator->getStatus()) {
            $dao = new Erems_Models_Reward_RewardDao();
            $hasilSave = 0;

            $hasilSave = $dao->save($reward);


            if ($hasilSave <= 0) {
                $status = FALSE;
                $msg = "Terjadi kesalahan pada saat menyimpan reward.";
            } else {
                $status = TRUE;
            }
        }

        return array(
            "STATUS" => $status,
            "MSG" => $msg
        );
    }

    public function updateRead() {
        $session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $params = $this->getRequest()->getPost();
        $data = json_decode($params["data"], TRUE);


        $sesBox = Apli::getSession();

        $reward = new Erems_Models_Reward_Reward();
        $reward->setArrayTable($data);
        $reward->setProject($sesBox->getProject());
        $reward->setPt($sesBox->getPt());
        $reward->setModiBy($session->getUserId());


        $validator = new Erems_Models_Reward_RewardValidator();
        $validator->run($reward);

        $msg = $validator->getMsg();
        $status = $validator->getStatus();

        if ($validator->getStatus()) {
            $dao = new Erems_Models_Reward_RewardDao();
            $hasilSave = 0;

            $hasilSave = $dao->update($reward);


            if ($hasilSave <= 0) {
                $status = FALSE;
                $msg = "Terjadi kesalahan pada saat menyimpan reward.";
            } else {
                $status = TRUE;
            }
        }

        return array(
            "STATUS" => $status,
            "MSG" => $msg
        );
    }

}
