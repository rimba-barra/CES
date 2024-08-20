<?php

class Hrd_ParameterclaimController extends Box_Models_App_Hermes_WingedController {
    
    protected function testingFlag() {
        return FALSE;
    }
    
    public function saveParamRead() {
        $hasil = FALSE;
        $ses = $this->getAppSession();
        $msg = "...";
        $jenisError = 0;
        $confirmed = FALSE; 
        $proses = 0;
        $empproses = 0;

        $data = $this->getAppData();

        $em = new Hrd_Models_Parameterclaim_Parameterclaim();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());

        $confirmed = array_key_exists("confirmed", $data);

        $isValid = false;


        if (!array_key_exists("sex",$data) && !$data['sex']) {
            $msg = "Gender masih kosong";
        } else if (!array_key_exists("employeestatus_id",$data) && !$data['employeestatus_id']) {
            $msg = "Min Status Karyawan masih kosong";
        } else if (!array_key_exists("claimbasedon_id",$data) && !$data['claimbasedon_id']) {
            $msg = "Klaim berdasarkan tanggal masih kosong";
        } else if (!array_key_exists("claimupdate_id",$data) && !$data['claimupdate_id']) {
            $msg = "Update jika ada perubahan masih kosong";
        } else {
            $isValid = true;
        }
        
        if ($isValid) {

            $dao = new Hrd_Models_Parameterclaim_ParameterclaimDao();
            $proses = $dao->proses_saveParam($this->getAppSession(), $em, $data);

            $msg = "Success..";
        }
        

        $arrayRespon = array("HASIL" => $proses,"MSG" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }
    
    public function allRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'parameterclaim', array(), array());
        $dao = $this->getMainDao();
        $obj = $this->getMainObject();
        //var_dump($this->getAppSession()->getProject()->getId());
        

        $em = new Hrd_Models_Parameterclaim_Parameterclaim();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        
        
        $hasil = $dao->getAll($this->getAppRequest(), $em);
        
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        
        return $dm;
    }
    
    // public function headerdataRead() {
    //     $dm = new Box_Models_App_Hermes_DataModel();
    //     $dataList = new Box_Models_App_DataListCreator('', 'parameterclaim', array(), array());
    //     $dm->setDirectResult(TRUE);
    //     $dm->setRequiredDataList(FALSE);
    //     $dm->setRequiredModel(FALSE);
    //     $dao = new Hrd_Models_Performancemanagement_ApprovalmatrixDao();
    //     $allperiodepm = $dao->getPeriodePm($employee_id);
    //     $dm->setDataList($dataList);
    //     $dm->setHasil(array($alldata));
    //     return $dm;
    // }

    public function detailClaimRead() {
        
        $em = new Hrd_Models_Parameterclaim_Claimbasedon();
        $dao = new Hrd_Models_Parameterclaim_ParameterclaimDao();
        
        $hasil = $dao->getAllClaimBasedOn($this->getAppData());
        if(Box_Tools::adaRecord($hasil)){
            $hasil = Box_Tools::toObjectsb("claimbasedon", $hasil,FALSE);
        }

        $em_update = new Hrd_Models_Parameterclaim_Claimbasedon();
        $dao = new Hrd_Models_Parameterclaim_ParameterclaimDao();
        
        $hasil_update = $dao->getAllClaimUpdate($this->getAppData());
        if(Box_Tools::adaRecord($hasil_update)){
            $hasil_update = Box_Tools::toObjectsb("claimupdate", $hasil_update,FALSE);
        }
       // print_r($hasil);die();
        return Box_Tools::instantRead(array(), array($hasil,$hasil_update));

    }

    public function detailGroupRead() {

        $data = $this->getAppData();
        $dm = new Box_Models_App_Hermes_DataModel();
        
        if($data['parameterjenispengobatan_id']){
            $dataList = new Box_Models_App_DataListCreator('', 'parameterclaim', array(), array());
            $dao = new Hrd_Models_Parameterclaim_ParameterclaimDao();
            $obj = new Hrd_Models_Parameterclaim_Parameterclaim();
            $obj->setArrayTable($this->getAppData());
            $obj->setProject($this->getAppSession()->getProject());
            $obj->setPt($this->getAppSession()->getPt());

            $dm->setDataList($dataList);
            // print_r('a');die();
            $dm->setHasil($dao->getAllJenisPengobatan($obj, $data));
        }else{
            $dataList = new Box_Models_App_DataListCreator('', 'group', array(), array());
            $dao = new Hrd_Models_Master_GroupDao();
            $obj = new Hrd_Models_Master_Group();
            $obj->setArrayTable($this->getAppData());
            $obj->setProject($this->getAppSession()->getProject());
            $obj->setPt($this->getAppSession()->getPt());

            $dm->setDataList($dataList);

            $dm->setHasil($dao->getAllWOPL($this->getAppRequest(),$obj));
        }

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
        return new Hrd_Models_Parameterclaim_ParameterclaimDao();
    }
    
    protected function getMainFieldID() {
        return "jenispengobatan_id";
    }
    
    protected function getMainObject() {
        return new Hrd_Models_Parameterclaim_Parameterclaim();
    }
    
    protected function getMainValidator() {
        return new Hrd_Models_Parameterclaim_Validator();
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
}

?>