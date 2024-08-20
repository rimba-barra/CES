<?php

class Erems_VerificationController extends Erems_Models_App_Template_AbstractMasterController {

    public function _getMainDataModel() {
        $dao = new Erems_Models_Verification_Dao();
        //  $dao->setSession($this->getAppSession());
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Erems_Box_Models_App_DataListCreator('', 'verification', array('unittran', 'unitstatus', 'clusterb', 'blockb', 'productcategory', 'type', 'purchaselettertransaction', 'customerprofile'), array()));
        $dm->setObject(new Erems_Models_Verification_Verification());
        $dm->setDao($dao);
        $dm->setValidator(new Erems_Models_Verification_Validator());
        $dm->setIdProperty("verification_id");
        return $dm;
    }

    public function approveRead() {




        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $status = FALSE;
        $params = $this->getAppData();

        $dao = new Erems_Models_Verification_Dao();
        $status = $dao->approve($params["verification_id"], $this->getAppSession()->getUser()->getId());


        $otherAT = array(array(
                "STATUS" => $status
        ));
        $dm->setHasil(array($otherAT));
        return $dm;
    }

    public function processinitRead() {




        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);


        //$paramsRequestResult = Erems_Box_Tools::globalParamsExistPurchaseletter($this->getAppSession());
        $paramsRequestResult = Erems_Box_Tools::globalParamsExistNew($this->getAppSession(), "PURCHASELETTER");

        $otherAT = array(array(
                "GLOBALPARAMSEXIST" => $paramsRequestResult["status"],
                "GLOBALPARAMSMSG" => $paramsRequestResult["msg"],
                "GLOBALPARAMSPARAMS" => $paramsRequestResult["parameters"]
        ));



        $dm->setHasil(array($otherAT));


        return $dm;
    }

    public function allRead() {
        $data = $this->getAppData();
        $dm = $this->_getMainDataModel();
        if ($dm instanceof Erems_Box_Models_App_Hermes_DataModel) {
            $dataList = $dm->getDataList();
            $dao = $dm->getDao();
            $obj = $dm->getObject();
            $obj->setArrayTable($this->getAppData());

            if ($obj instanceof Erems_Box_Models_Master_InterProjectPt) {
                $ses = $this->getAppSession();
                $obj->setProject($ses->getProject());
                $obj->setPt($ses->getPt());
            }

            $hasil = $dao->getAll($this->getAppRequest(), $obj);

            $dm->setDataList($dataList);
            $dm->setHasil($hasil);
        }

        return $dm;
    }

    public function mainCreate() {
        $dao = new Erems_Models_Verification_Dao();

        $va = new Erems_Models_Verification_Verification();
        $va->getAddBy($this->getAppSession()->getUser()->getId());
        $va->setProject($this->getAppSession()->getProject());
        $va->setPt($this->getAppSession()->getPt());

        $hasil = $dao->getProjectName($this->getAppSession()->getProject()->getId());

        $va->getProject()->setName($hasil[0][0]['name']);

        //  $dao->setSession($this->getAppSession());
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setObject($va);
        $dm->setDao($dao);
        $dm->setValidator(new Erems_Models_Verification_Validator());

        return $dm;
    }

    public function detailRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $paramsRequestResult = Erems_Box_Tools::globalParamsExistNew($this->getAppSession(), "PURCHASELETTER");

        $isAuthorizerUser = FALSE;

        $userApprovalId = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getAuthorizeUser($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId(), "PURCHASELETTER_SUPERUSER");

        if (Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId())->getAucoMode() == 0) {
            if(is_array($userApprovalId)){
                 $isAuthorizerUser = in_array($this->getAppSession()->getUser()->getId(), $userApprovalId) == $userApprovalId ? TRUE : FALSE;
            }else{
                 $isAuthorizerUser = $this->getAppSession()->getUser()->getId() == $userApprovalId ? TRUE : FALSE;
            }
            
           
        } else {
            $ses = $this->getAppSession();

            $isAuthorizerUser = intval($paramsRequestResult["parameters"]['PURCHASELETTER_SUPERUSER_GROUPID']) == $ses->getGroupId();
            // set ke nol alasan sekuriti
            $paramsRequestResult["parameters"]['PURCHASELETTER_SUPERUSER_GROUPID'] = 0;
        }

        // $userApprovalId = is_array($userApprovalId) ? implode("~", $userApprovalId) : $userApprovalId;
        $userApprovalId = is_array($userApprovalId) ? current($userApprovalId) : $userApprovalId;

        $gDao = new Erems_Models_Master_GeneralDao();
        $userInfo = $gDao->getUsersInfo($this->getAppSession()->getUser()->getId());
        $userInfoApprove = $gDao->getUsersInfo($userApprovalId);

        $otherAT = array(array(
            "APPROVALUSER"      => $isAuthorizerUser,
            "USER_EMAIL"        => $userInfo[0][0]["user_email"],
            "USERAPPROVE_EMAIL" => $userInfoApprove[0][0]["user_email"]
        ));

        $dm->setHasil(array($otherAT));

        return $dm;
    }

    public function unitlistRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'unitb', array('unitstatus','clusterb', 'blockb', 'productcategory', 'type','purchaselettertransaction'));
        $data = $this->getAppData();
        $dao = new Erems_Models_Unit_UnitDao();
        $unitTran = new Erems_Models_Unit_UnitTran();
        $unitTran->setArrayTable($data);
        $unitTran->setProject($this->getAppSession()->getProject());
        $unitTran->setPt($this->getAppSession()->getPt());
        $unitTran->getStatus()->setId(0); // semua unit status

        $unitTran->getBlock()->setId(Erems_Box_Tools::cleanComboData($data, 'block_id'));
        $hasil = $dao->getAllWoP($this->getAppRequest(), $unitTran);

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);


        return $dm;
    }

    public function selectedunitRead() {



        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'unittran', array('unitstatus', 'clusterb', 'blockb', 'productcategory', 'type', 'purchaselettertransaction', 'customerprofile'));

        $dao = new Erems_Models_Verification_Dao();
        $params = $this->getAppData();
        $hasil = $dao->getUnitDetail($params["unit_id"]);

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);


        return $dm;
    }

    protected function getDefaultProcessor() {
        return new Erems_Models_App_Box_VerificationProcessor();
    }

}

?>
