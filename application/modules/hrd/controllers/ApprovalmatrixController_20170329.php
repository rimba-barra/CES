<?php

class Hrd_ApprovalmatrixController extends Box_Models_App_Hermes_WingedController {

    protected function testingFlag() {
        return FALSE;
    }

    public function allRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'approvalmatrix', array(), array());
        $dao = $this->getMainDao();
        $obj = $this->getMainObject();
        //var_dump($this->getAppSession()->getProject()->getId());

        $getReq = $this->getAppData();
        $obj->setArrayTable($getReq);

        $project_id = isset($getReq['project_id']) ? $getReq['project_id'] : $this->getAppSession()->getProject()->getId();
        $pt_id = isset($getReq['pt_id']) ? $getReq['pt_id'] : $this->getAppSession()->getProject()->getId();

        $hasil = $dao->getAll($this->getAppRequest(), $obj, $project_id, $pt_id);

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        return $dm;
    }

    public function headerdataRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'packagemanagement', array(), array());
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
        $masterdata = new Hrd_Models_App_Mastertable_Packagemanagement();
        $alldata = $masterdata->prosesDataWithSession($this->getAppSession(), TRUE);
        $dm->setDataList($dataList);
        $dm->setHasil(array($alldata));
        return $dm;
    }

    public function listdeptRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $data = $this->getAppData();

        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $masterproject = new Hrd_Models_App_Mastertable_Project();
        $masterpt = new Hrd_Models_App_Mastertable_Pt();
        $masterdept = new Hrd_Models_App_Mastertable_Department();
        $allproject = $masterproject->prosesDataWithSession($this->getAppSession(), TRUE);
        $allpt = $masterpt->prosesDataWithSession($this->getAppSession(), TRUE);
        $alldept = $masterdept->prosesDataWithSession($this->getAppSession(), TRUE);
        $dm->setHasil(array($allproject, $allpt, $alldept));

        return $dm;
    }

    public function listdetailRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'approvalmatrixdetail', array('packagemanagement'), array());
        $dao = new Hrd_Models_Performancemanagement_ApprovalmatrixDao();
        $obj = new Hrd_Models_Performancemanagement_Approvalmatrixdetail();

        $data = $this->getAppData();
        //var_dump($data);
        $obj->setArrayTable($this->getAppData());

        //var_dump($this->getAppRequest());
        $hasil = $dao->getDetailData($this->getAppRequest(), $data['employee_id']);

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        return $dm;
    }

    public function listdetailcbRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $data = $this->getAppData();

        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);


        $masterproject = new Hrd_Models_App_Mastertable_Project();
        $masterpt = new Hrd_Models_App_Mastertable_Pt();
        $masterdept = new Hrd_Models_App_Mastertable_Department();
        $masterpackagedocument = new Hrd_Models_App_Mastertable_Packagemanagement();
        //$masteremp     = new Hrd_Models_App_Mastertable_Employee();
        $masteremp = new Hrd_Models_Performancemanagement_ApprovalmatrixDao();
        $masterapprovallevel = new Hrd_Models_App_Mastertable_Approvallevel();
        $allproject = $masterproject->prosesDataWithSession($this->getAppSession(), TRUE);
        $allpt = $masterpt->prosesDataWithSession($this->getAppSession(), TRUE);
        $alldept = $masterdept->prosesDataWithSession($this->getAppSession(), TRUE);
        $allpackagedocument = $masterpackagedocument->prosesDataWithSession($this->getAppSession(), TRUE);
        //$allemp         = $masteremp->prosesDataWithSession($this->getAppSession(), TRUE);
        $allemp = $masteremp->getAllEmployee();
        $allemp = Box_Tools::toObjectResult($allemp, new Hrd_Models_Performancemanagement_Approvalmatrixemployee());
        $allapprovallevel = $masterapprovallevel->prosesDataWithSession($this->getAppSession(), TRUE);
        $dm->setHasil(array($allproject, $allpt, $alldept, $allemp, $allapprovallevel, $allpackagedocument));

        return $dm;
    }

    public function detailRead() {
        
    }

    public function savedetailRead() {
        $dm = new Box_Models_App_Hermes_DataModel();

        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $data = $this->getAppData();
        $newDetail = new Hrd_Models_Performancemanagement_Approvalmatrixdetail();
        $newDetail->setArrayTable(json_decode($data['data'], TRUE));
        $dao = new Hrd_Models_Performancemanagement_ApprovalmatrixDao();

        $result = $dao->saveDetail($newDetail, $this->getAppSession()->getUser()->getId());
        $akhir = array(array(
                "success" => true,
                "msg" => "SUCCESS"
        ));

        $dm->setHasil(array($akhir));

        return $dm;
    }

    public function editdetailRead() {
        $dm = new Box_Models_App_Hermes_DataModel();

        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $data = $this->getAppData();
        $newDetail = new Hrd_Models_Performancemanagement_Approvalmatrixdetail();
        $newDetail->setArrayTable(json_decode($data['data'], TRUE));
        $dao = new Hrd_Models_Performancemanagement_ApprovalmatrixDao();

        $result = $dao->updateDetail($newDetail, $this->getAppSession()->getUser()->getId());
        $akhir = array(array(
                "success" => true,
                "msg" => "SUCCESS"
        ));

        $dm->setHasil(array($akhir));

        return $dm;
    }

    public function deletedetailRead() {
        $dm = new Box_Models_App_Hermes_DataModel();

        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $data = $this->getAppData();
        $newDetail = new Hrd_Models_Performancemanagement_Approvalmatrixdetail();
        $newDetail->setArrayTable(json_decode($data['data'], TRUE));
        $dao = new Hrd_Models_Performancemanagement_ApprovalmatrixDao();
        $result = $dao->deleteDetail($newDetail, $this->getAppSession()->getUser()->getId());
        $akhir = array(array(
                "success" => true,
                "msg" => "SUCCESS"
        ));

        $dm->setHasil(array($akhir));
        return $dm;
    }

    protected function getMainDao() {
        return new Hrd_Models_Performancemanagement_approvalmatrixDao();
    }

    protected function getMainFieldID() {
        return "approvalmatrix_id";
    }

    protected function getMainObject() {
        return new Hrd_Models_Performancemanagement_approvalmatrix();
    }

    protected function getMainValidator() {
        return new Hrd_Models_Performancemanagement_ApprovalmatrixValidator();
    }

    public function updatepackagedocumentRead() {
        $data = $this->getAppData();
        $dao = $this->getMainDao();
        $success = $dao->updatePackagedocument($data["employee_id"], $data['pmdocument_id']);
        return Box_Tools::instantRead(array(
                    "SUCCESS" => $success
        ));
    }

}

?>