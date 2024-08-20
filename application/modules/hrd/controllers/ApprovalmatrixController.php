<?php

class Hrd_ApprovalmatrixController extends Box_Models_App_Hermes_WingedController {
    
    protected function testingFlag() {
        return FALSE;
    }
    
    public function savepackagedocumentRead() {
        $hasil = FALSE;
        $msg = "";
        
        $params 		= $this->getAppData();
        $employee_id 	= $params['employee_id'];
        $pmdocument_id 	= $params['pmdocument_id'];

        //added by anas 15012024
        $is_used_pmcontract  = $params['used_pmcontract'];
        
        $dao 	= $this->getMainDao();


        $hasil 	= $dao->savePackagedocument($employee_id, $pmdocument_id, $is_used_pmcontract);

        //added by anas 15012024
        if($is_used_pmcontract == 1)
        {
            $hasill = $dao->savePMDocContract($employee_id);
            // var_dump($hasill);
        }
        
        $arrayRespon = array("HASIL" => $hasil, "MSG" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }
    
    public function allRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'approvalmatrix', array(), array());
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
    
    public function periodedataRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'periodepm', array(), array());
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
        
        $params 		= $this->getAppData();
        $employee_id 	= $params['employee_id'];
        
        $dao = new Hrd_Models_Performancemanagement_ApprovalmatrixDao();
        $allperiodepm = $dao->getPeriodePm($employee_id);
        $allperiodepm = Box_Tools::toObjectResult($allperiodepm, new Hrd_Models_Performancemanagement_Approvalmatrixperiodepm());
        $dm->setDataList($dataList);
        $dm->setHasil(array($allperiodepm));
        return $dm;
    }
    
    public function listdeptRead() {
        
        $dm = new Box_Models_App_Hermes_DataModel();
        $data = $this->getAppData();
        
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
        
        //$masterproject = new Hrd_Models_App_Mastertable_Project();
        //$masterpt = new Hrd_Models_App_Mastertable_Pt();
        $masterdept = new Hrd_Models_App_Mastertable_Department();
        //$allproject = $masterproject->prosesDataWithSession($this->getAppSession(), TRUE);
        //$allpt = $masterpt->prosesDataWithSession($this->getAppSession(), TRUE);
        $alldept = $masterdept->prosesDataWithSession($this->getAppSession(), TRUE);
                
        $masterproject = new Hrd_Models_App_Mastertable_Projectsh();
        $allproject = $masterproject->prosesDataWithSession($this->getAppSession(), TRUE);
        $masterpt = new Hrd_Models_App_Mastertable_Ptsh();
        $allpt = $masterpt->prosesDataWithSession($this->getAppSession(), TRUE);
        
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
        
        //$masterproject = new Hrd_Models_App_Mastertable_Project();
        $masterproject = new Hrd_Models_App_Mastertable_Projectsh();
        //$masterpt = new Hrd_Models_App_Mastertable_Pt();
        $masterpt = new Hrd_Models_App_Mastertable_Ptsh();
        //$masterdept = new Hrd_Models_App_Mastertable_Department();
        $masterdept = new Hrd_Models_Performancemanagement_ApprovalmatrixDao();
        $masterpackagedocument = new Hrd_Models_App_Mastertable_Packagemanagement();
        //$masteremp     = new Hrd_Models_App_Mastertable_Employee();
        $masteremp = new Hrd_Models_Performancemanagement_ApprovalmatrixDao();
        $masterapprovallevel = new Hrd_Models_App_Mastertable_Approvallevel();
        $allproject = $masterproject->prosesDataWithSession($this->getAppSession(), TRUE);
        $allpt = $masterpt->prosesDataWithSession($this->getAppSession(), TRUE);
        //$alldept = $masterdept->prosesDataWithSession($this->getAppSession(), TRUE);
        $alldept = $masterdept->getAllDepartment();
        $alldept = Box_Tools::toObjectResult($alldept, new Hrd_Models_Performancemanagement_Approvalmatrixdepartment());
        
        $allpackagedocument = $masterpackagedocument->prosesDataWithSession($this->getAppSession(), TRUE);
        //$allemp         = $masteremp->prosesDataWithSession($this->getAppSession(), TRUE);
        $project_id = $this->getAppSession()->getProject()->getId();
        $pt_id = $this->getAppSession()->getPt()->getId();
        $allemp = $masteremp->getAllEmployee($project_id, $pt_id);
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
    
    public function applytodocRead() {
         $data 			= $this->getAppData();
         $dao 			= $this->getMainDao();
         $employee_id 	= $data['employee_id'];
         $periode       = $data['periode'];
         $success 		= $dao->applytodoc($employee_id, $periode);
         return Box_Tools::instantRead(array(
         "SUCCESS" => $success
         ));
         /*
        return Box_Tools::instantRead(array(
            "SUCCESS" => 0
        ));*/
    }
    public function reloadcompetencyRead() {
         $data 		= $this->getAppData();
         $dao 		= $this->getMainDao();
         $employee_id 	= $data['employee_id'];
         $periode       = $data['periode'];
         $success 	= $dao->reloadcompetency($employee_id, $periode);
         return Box_Tools::instantRead(array(
         "SUCCESS" => $success
         ));
         /*
        return Box_Tools::instantRead(array(
            "SUCCESS" => 0
        ));*/
    }
    
    public function penilaiexistRead() {
        $data = $this->getAppData();
        $dao = $this->getMainDao();
        $newDetail = new Hrd_Models_Performancemanagement_Approvalmatrixdetail();
        $newDetail->setArrayTable(json_decode($data['data'], TRUE));
        $hasil_check = $dao->penilaiExist($newDetail);
        return Box_Tools::instantRead(array(
            "CEKPENILAI" => $hasil_check[0][0]["result"]
        ));
    }
    /*
    public function periodedataRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'periodepm', array(), array());
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
        $masterdata = new Hrd_Models_Performancemanagement_Approvalmatrixperiodepm();
        $alldata = $masterdata->prosesDataWithSession($this->getAppSession(), TRUE);
        $dm->setDataList($dataList);
        $dm->setHasil(array($alldata));
        return $dm;
    }
    */

    //added by anas 15012024
    public function getdatadoccontractRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'documentcontract', array(), array());
        $dao = new Hrd_Models_Performancemanagement_ApprovalmatrixDao();
        $obj = new Hrd_Models_Performancemanagement_Approvalmatrixdetail();
        
        $data = $this->getAppData();
        // var_dump("asdasd");
        // var_dump($data);
        // exit();
        $obj->setArrayTable($this->getAppData());
        
        //var_dump($this->getAppRequest());
        $hasil = $dao->getDocumentContract($this->getAppRequest());
        
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        // var_dump($hasil);
        
        return $dm;
    }

    //added by anas 15012024 | get data setting approval contract
    public function getdataapprovalcontractRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'approvalcontract', array(), array());
        $dao = new Hrd_Models_Performancemanagement_ApprovalmatrixDao();
        $obj = new Hrd_Models_Performancemanagement_ApprovalContract();
        
        $data = $this->getAppData();
        // var_dump("asdasd");
        // var_dump($data);
        // exit();
        $obj->setArrayTable($this->getAppData());
        
        $hasil = $dao->getApprovalContract($data["employee_id"], $data["periode"]);
        // var_dump($hasil);
        
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        // var_dump($hasil);
        
        return $dm;
    }    
    
    //added by anas 15012024 | apply document contract
    public function applytodoccontractRead() {
        $data          = $this->getAppData();
        $dao           = $this->getMainDao();
        $employee_id   = $data['employee_id'];
        $periode       = $data['periode'];
        $result       = $dao->applytodoccontract($employee_id);

        $arrayRespon = array("HASIL" => $result[0][0]["result"], "MSG" => $result[0][0]["errmsg"]);
        return Box_Tools::instantRead($arrayRespon);
    }


    //added by anas 15012024 | get data pm contract
    public function getdatapmcontractRead() {

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'pmcontract', array(), array());
        $dao = new Hrd_Models_Performancemanagement_ApprovalmatrixDao();
        $obj = new Hrd_Models_Performancemanagement_PMContract();
        
        $data = $this->getAppData();
        // var_dump("asdasd");
        // var_dump($data);
        // exit();
        $obj->setArrayTable($this->getAppData());
        
        $hasil = $dao->getPMContract($data["employee_id"], $data["periode"]);
        // var_dump($hasil);
        
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        // var_dump($hasil);
        
        return $dm;
    }

    
}

?>