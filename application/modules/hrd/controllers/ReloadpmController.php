<?php

class Hrd_ReloadpmController extends Box_Models_App_Hermes_WingedController {
    
    protected function testingFlag() {
        return FALSE;
    }
    
    public function savepackagedocumentRead() {
        $hasil = FALSE;
        $msg = "";
        
        $params 	= $this->getAppData();
        $employee_id 	= $params['employee_id'];
        $pmdocument_id 	= $params['pmdocument_id'];
        
        $dao 	= $this->getMainDao();
        $hasil 	= $dao->savePackagedocument($employee_id, $pmdocument_id);
        
        $arrayRespon = array("HASIL" => $hasil, "MSG" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }
    
    public function allRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'reloadpm', array(), array());
        $dao = $this->getMainDao();
        $obj = $this->getMainObject();
        //var_dump($this->getAppSession()->getProject()->getId());
        
        $getReq = $this->getAppData();
        $obj->setArrayTable($getReq);
        
        if(!isset($getReq['project_id'])){
            $getReq['project_id'] = $this->getAppSession()->getProject()->getId();
        }
        
        if(!isset($getReq['pt_id'])){
            $getReq['pt_id'] = $this->getAppSession()->getPt()->getId();
        }
        
        $project_id = intval($getReq['project_id']) > 0 ? $getReq['project_id'] : $this->getAppSession()->getProject()->getId();
        $pt_id = intval($getReq['pt_id']) > 0 ? $getReq['pt_id'] : $this->getAppSession()->getPt()->getId();
        
        
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
        
    public function listdetailRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'reloadpmdetail', array(), array());
        $dao = new Hrd_Models_Performancemanagement_ReloadpmDao();
        $obj = new Hrd_Models_Performancemanagement_Reloadpmdetail();
        
        $data = $this->getAppData();
        //var_dump($data);
        $obj->setArrayTable($this->getAppData());
        
        //var_dump($this->getAppRequest());
        $hasil = $dao->getDetailData($this->getAppRequest(), $data['employee_id']);
        
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        
        return $dm;
    }
    
    /*
    public function periodedataRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'periodepm', array(), array());
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
        
        $params 		= $this->getAppData();
        $employee_id 	= $params['employee_id'];
        
        $dao = new Hrd_Models_Performancemanagement_ReloadpmDao();
        $allperiodepm = $dao->getPeriodePm($employee_id);
        $allperiodepm = Box_Tools::toObjectResult($allperiodepm, new Hrd_Models_Performancemanagement_Reloadpmperiodepm());
        $dm->setDataList($dataList);
        $dm->setHasil(array($allperiodepm));
        return
    
    public function periodedataRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'periodepm', array(), array());
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
        
        $params 		= $this->getAppData();
        $employee_id 	= $params['employee_id'];
        
        $dao = new Hrd_Models_Performancemanagement_ReloadpmDao();
        $allperiodepm = $dao->getPeriodePm($employee_id);
        $allperiodepm = Box_Tools::toObjectResult($allperiodepm, new Hrd_Models_Performancemanagement_Reloadpmperiodepm());
        $dm->setDataList($dataList);
        $dm->setHasil(array($allperiodepm));
        re $dm;
    }
    /*
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
    
    public function listdetailcbRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $data = $this->getAppData();
        
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
        
        $masterproject = new Hrd_Models_App_Mastertable_Project();
        $masterpt = new Hrd_Models_App_Mastertable_Pt();
        //$masterdept = new Hrd_Models_App_Mastertable_Department();
        $masterdept = new Hrd_Models_Performancemanagement_ReloadpmDao();
        $masterpackagedocument = new Hrd_Models_App_Mastertable_Packagemanagement();
        //$masteremp     = new Hrd_Models_App_Mastertable_Employee();
        $masteremp = new Hrd_Models_Performancemanagement_ReloadpmDao();
        $masterapprovallevel = new Hrd_Models_App_Mastertable_Approvallevel();
        $allproject = $masterproject->prosesDataWithSession($this->getAppSession(), TRUE);
        $allpt = $masterpt->prosesDataWithSession($this->getAppSession(), TRUE);
        //$alldept = $masterdept->prosesDataWithSession($this->getAppSession(), TRUE);
        $alldept = $masterdept->getAllDepartment();
        $alldept = Box_Tools::toObjectResult($alldept, new Hrd_Models_Performancemanagement_Reloadpmdepartment());
        
        $allpackagedocument = $masterpackagedocument->prosesDataWithSession($this->getAppSession(), TRUE);
        //$allemp         = $masteremp->prosesDataWithSession($this->getAppSession(), TRUE);
        $project_id = $this->getAppSession()->getProject()->getId();
        $pt_id = $this->getAppSession()->getPt()->getId();
        $allemp = $masteremp->getAllEmployee($project_id, $pt_id);
        $allemp = Box_Tools::toObjectResult($allemp, new Hrd_Models_Performancemanagement_Reloadpmemployee());
        $allapprovallevel = $masterapprovallevel->prosesDataWithSession($this->getAppSession(), TRUE);
        
        $dm->setHasil(array($allproject, $allpt, $alldept, $allemp, $allapprovallevel, $allpackagedocument));
        
        return $dm;
    }*/
    
    public function detailRead() {
        
    }
    
    public function savedetailRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
        
        $data = $this->getAppData();
        $newDetail = new Hrd_Models_Performancemanagement_Reloadpmdetail();
        $newDetail->setArrayTable(json_decode($data['data'], TRUE));
        $dao = new Hrd_Models_Performancemanagement_ReloadpmDao();
        
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
        $newDetail = new Hrd_Models_Performancemanagement_Reloadpmdetail();
        $newDetail->setArrayTable(json_decode($data['data'], TRUE));
        $dao = new Hrd_Models_Performancemanagement_ReloadpmDao();
        
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
        $newDetail = new Hrd_Models_Performancemanagement_Reloadpmdetail();
        $newDetail->setArrayTable(json_decode($data['data'], TRUE));
        $dao = new Hrd_Models_Performancemanagement_ReloadpmDao();
        $result = $dao->deleteDetail($newDetail, $this->getAppSession()->getUser()->getId());
        $akhir = array(array(
            "success" => true,
            "msg" => "SUCCESS"
        ));
        
        $dm->setHasil(array($akhir));
        return $dm;
    }
    
    protected function getMainDao() {
        return new Hrd_Models_Performancemanagement_reloadpmDao();
    }
    
    protected function getMainFieldID() {
        return "reloadpm_id";
    }
    
    protected function getMainObject() {
        return new Hrd_Models_Performancemanagement_reloadpm();
    }
    
    protected function getMainValidator() {
        return new Hrd_Models_Performancemanagement_ReloadpmValidator();
    }
        
    public function reload_competencyRead() {
        $data = $this->getAppData();
        $dao = $this->getMainDao();
        $success = $dao->reloadCompetency($data["employee_id"], $data['periode']);
        return Box_Tools::instantRead(array(
            "SUCCESS" => $success
        ));
    }
        
    public function reload_packagedocumentRead() {
        $data = $this->getAppData();
        $dao = $this->getMainDao();
        $success = $dao->reloadPackagedocument($data["employee_id"], $data['periode']);
        return Box_Tools::instantRead(array(
            "SUCCESS" => $success
        ));
    }
}

?>