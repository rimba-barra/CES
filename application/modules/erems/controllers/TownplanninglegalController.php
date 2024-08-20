<?php

class Erems_TownplanninglegalController extends Erems_Box_Models_App_Hermes_AbstractController {

    protected function testingFlag() {
        return FALSE;
    }

    public function historyRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'unithistory', array('unittran'), array());
        $dao = new Erems_Models_Unit_UnitDao();
        $params = $this->getAppData();
        $hasil = $dao->getHistory(intval($params["unit_id"]), $this->getAppRequest());
        // $hasil = array();
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        return $dm;
    }

    public function allRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'unittran', array('blockb', 'pt', 'clusterb', 'type', 'productcategory', 'position', 'side', 'purpose', 'unitstatus', 'unithistory', 'tanahcode', 'tanahcode2'), array("detail", "number_end", "mode_number_generator", "number_check", "deletedRows"));
        $dao = new Erems_Models_Unit_UnitDao();
        $unitTran = new Erems_Models_Unit_UnitTran();
        $unitTran->setProject($this->getAppSession()->getProject());
        $unitTran->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getByProjectPtWitPage($unitTran, $this->getAppRequest());
        // $hasil = array();
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        return $dm;
    }

    public function uploadgambarrumahRead() {
        $data = $this->getAppData();
        $msg = "";
        $success = FALSE;
        $imageUpload = new Erems_Box_Models_App_ImageUpload("/public/app/erems/uploads/townplanning/", "townplanning_");
        $imageUpload->run();
        if (!$imageUpload->isSuccess()) {
            $msg = $imageUpload->getErrorMsg();
        } else {
            $success = TRUE;
            $msg = $imageUpload->getImageName();
        }

        $arrayRespon = array(
            "STATUS" => $success,
            "MSG"=>$msg
        );
        return Erems_Box_Tools::instantRead($arrayRespon, array());
    }

    public function requestfrommkRead() {
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');
        $post_data['cluster_id'] = $this->getRequest()->getPost('cluster_id');
        $post_data['unit_number'] = $this->getRequest()->getPost('unit_number');
        $post_data['productcategory_id'] = $this->getRequest()->getPost('productcategory_id');
        $post_data['type_id'] = $this->getRequest()->getPost('type_id');
        $post_data['block_id'] = $this->getRequest()->getPost('block_id');
        $post_data['position_id'] = $this->getRequest()->getPost('position_id');
        $post_data['side_id'] = $this->getRequest()->getPost('side_id');
        $post_data['purpose_id'] = $this->getRequest()->getPost('purpose_id');
        $post_data['state_admistrative'] = $this->getRequest()->getPost('state_admistrative');
        $post_data['progress_min'] = $this->getRequest()->getPost('bot_progress');
        $post_data['progress_max'] = $this->getRequest()->getPost('top_progress');
        $post_data['unit_id'] = !$this->getRequest()->getPost('unit_id') ? NULL : $this->getRequest()->getPost('unit_id');

        $model_townplanning = new Erems_Models_Townplanning();
        $result = $model_townplanning->townplanningRead($post_data);
        echo Zend_Json::encode($result);
        die();
    }

    public function detailRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $creator = new Erems_Box_Models_App_Creator();

        $masterPC = new Erems_Models_App_Masterdata_ProductCategory();
        $allPC = $masterPC->prosesDataWithSession($this->getAppSession(), TRUE);

        $mt = new Erems_Models_App_Masterdata_Type();
        $mt->setSes($this->getAppSession());
        $at = $mt->prosesDataWithSession($this->getAppSession(), TRUE);

        $mc = new Erems_Models_App_Masterdata_Cluster();
        $ac = $mc->prosesDataWithSession($this->getAppSession(), TRUE);

        $mb = new Erems_Models_App_Masterdata_Block();
        $ab = $mb->prosesDataWithSession($this->getAppSession(), TRUE);

        $mp = new Erems_Models_App_Masterdata_Position();
        $ap = $mp->prosesDataWithSession($this->getAppSession(), TRUE);

        $ms = new Erems_Models_App_Masterdata_Side();
        $as = $ms->prosesDataWithSession($this->getAppSession(), TRUE);

        $mp = new Erems_Models_App_Masterdata_Position();
        $ap = $mp->prosesDataWithSession($this->getAppSession(), TRUE);

        $mpu = new Erems_Models_App_Masterdata_Purpose();
        $apu = $mpu->prosesDataWithSession($this->getAppSession(), TRUE);

        $mpt = new Erems_Models_App_Masterdata_Pt();
        $apt = $mpt->prosesDataWithSession($this->getAppSession(), TRUE);

        $mus = new Erems_Models_App_Masterdata_UnitStatus();
        $aus = $mus->prosesDataWithSession($this->getAppSession(), TRUE);

        // added by rico 08032023
        $muc = new Erems_Models_App_Masterdata_Tanahcode(); 
        $auc = $muc->prosesDataWithSession($this->getAppSession(), TRUE);

        $muc2 = new Erems_Models_App_Masterdata_Tanahcode2(); 
        $auc2 = $muc2->prosesDataWithSession($this->getAppSession(), TRUE);

        $paramsRequestResult = Erems_Box_Tools::globalParamsExistSpk($this->getAppSession());

        $otherAT = array(array(
            "CURRENTPTID" => $this->getAppSession()->getPt()->getId(),
            "USER_FULLNAME" => $_SESSION["Ciputra"]["common"]["user"]["user_fullname"],
            "TownPlanningWithoutPT" => Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(),$this->getAppSession()->getPt()->getId())->TownPlanningWithoutPT() // added by rico 08032023
        ));

        $dm->setHasil(array($ac, $allPC, $at, $ab, $ap, $as, $apu, $apt, $aus, $auc, $auc2, $otherAT));

        return $dm;
    }

    public function maindetailRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $creator = new Erems_Box_Models_App_Creator();

        //===== MASTERDATA == //
        $masterSpkTy = new Erems_Models_App_Masterdata_SpkType();
        $allSpkTy = $masterSpkTy->prosesDataWithSession($this->getAppSession(), TRUE);

        $masterCtr = new Erems_Models_App_Masterdata_Contractor();
        $allCtr = $masterCtr->prosesDataWithSession($this->getAppSession(), TRUE);

        $dm->setHasil(array($allSpkTy, $allCtr));

        return $dm;
    }

    public function mainDelete() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setObject(new Erems_Models_Master_UnitB());
        $dm->setDao(new Erems_Models_Unit_UnitDao());
        $dm->setIdProperty("unit_id");
        return $dm;
    }

    public function mainCreate() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $obj = new Erems_Models_Unit_UnitTran();
        $v = new Erems_Models_Unit_Validator();
        $v->session = $this->getAppSession();
        $dm->setDao(new Erems_Models_Unit_UnitDao());
        $dm->setValidator($v);
        $dm->setObject($obj);

        return $dm;
    }

    public function inlineEditRead() {
        $params = $this->getAppData();
        $model_townplanning = new Erems_Models_Townplanning();
        $result = $model_townplanning->townplanningInlineUpdate($params);
        echo Zend_Json::encode($result);
        die();
    }

    public function isSh1FeaturesRead() {
        $genco = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId());
        $arrayRespon = array(
            "STATUS" => $genco->activateSh1Features("townplanning_is_legal"),
        );
        return Erems_Box_Tools::instantRead($arrayRespon, array());
    }

    // added by rico 08032023
    public function updatePtRead() {
        $params = $this->getAppData();

        $model_townplanning = new Erems_Models_Townplanning();
        $result = $model_townplanning->updatePTdanTanah($params);
        echo Zend_Json::encode($result);
        die();
    }

    // added by rico 04042023
    public function getPTRead() {
        $params = $this->getAppData();

        $model_townplanning = new Erems_Models_Townplanning();
        $result = $model_townplanning->getPT($params);
        echo Zend_Json::encode($result);
        die();
    }

    protected function getDefaultProcessor() {
        return new Erems_Models_App_Box_UnitProcessor();
    }

}

?>
