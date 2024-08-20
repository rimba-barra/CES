<?php

class Hrd_AccessgroupuserController extends Box_Models_App_Hermes_WingedController {

    protected function testingFlag() {
        return FALSE;
    }
	
    public function allRead() {	
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'accessgroupuser', array(), array());
		$dao = new Hrd_Models_Accessgroupuser_AccessgroupuserDao();
		$obj = new Hrd_Models_Accessgroupuser_Accessgroupuser();
        $obj->setArrayTable($this->getAppData());
        $hasil = $dao->getAll($this->getAppRequest(), $obj);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function headerdataRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
        $masterproject = new Hrd_Models_App_Mastertable_Project();
        $masteremployee = new Hrd_Models_App_Mastertable_Project();
	$masteremp	= new Hrd_Models_App_Mastertable_Employee();
        $allemp 	= $masteremp->prosesDataWithSession($this->getAppSession(), TRUE);
        $allproject = $masterproject->prosesDataWithSession($this->getAppSession(), TRUE);
        $allemployee = $masterproject->prosesDataWithSession($this->getAppSession(), TRUE);
        $dm->setHasil(array($allproject, $allpt, $allemployee));
        return $dm;
    }

    protected function getMainDao() {
        return new Hrd_Models_Accessgroupuser_AccessgroupuserDao();
    }

    protected function getMainFieldID() {
        return "accessgroup_user_id"; //prefix id header
    }

    protected function getMainObject() {
        return new Hrd_Models_Accessgroupuser_Accessgroupuser();
    }

    protected function getMainValidator() {
        return new Hrd_Models_Accessgroupuser_AccessgroupuserValidator();
    }
	
    public function maindataRead(){
         $data = $this->getAppData();
         $dao = new Hrd_Models_Accessgroupuser_AccessgroupuserDao();
         $success = $dao->getdataByid($data["accessgroup_detail_id"]);
        return Box_Tools::instantRead(array(
                "SUCCESS" => $success
        ));
    }
    
    public function listcbRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $data = $this->getAppData();

        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
        
        $project_id = $this->getAppSession()->getProject()->getId();
        $pt_id = $this->getAppSession()->getPt()->getId();
        $masteremp = new Hrd_Models_Performancemanagement_ApprovalmatrixDao();
        $allemp = $masteremp->getAllEmployee($project_id, $pt_id);
        $allemp = Box_Tools::toObjectResult($allemp, new Hrd_Models_Performancemanagement_Approvalmatrixemployee());
		
        $masteraccess = new Hrd_Models_App_Mastertable_Accessgroup();		
        $allaccess = $masteraccess->prosesDataWithSession($this->getAppSession(), TRUE);
		
        $dm->setHasil(array($allemp, $allaccess));
		
        return $dm;
    }
	
    public function validateapproveRead() {	
        $dao = new Hrd_Models_Accessgroupuser_AccessgroupuserDao();		
        $empLevel = $dao->checkLevel($this->getAppSession());
		$index_no = 0;
        if ($empLevel) {
            if ($empLevel[0]) {
                $index_no = intval($empLevel[0][0]['index_no']);
            }
        }
        return Box_Tools::instantRead(array(
                    "index_no" => $index_no
        ));
    }
	
    public function approveRead() {
        $data = $this->getAppData();
        $dao = $this->getMainDao();
        $success = $dao->approveAccessgroupuser($this->getAppSession(), $data["accessgroup_user_id"]);
        return Box_Tools::instantRead(array(
                    "SUCCESS" => $success
                
        ));
    }
	
    public function rejectRead() {
        $data = $this->getAppData();
        $dao = $this->getMainDao();
        $success = $dao->rejectAccessgroupuser($this->getAppSession(), $data["accessgroup_user_id"]);
        return Box_Tools::instantRead(array(
                    "SUCCESS" => $success
        ));
    }
	
    public function sendemailRead() {
        $data = $this->getAppData();
        $dao = $this->getMainDao();
		
        $success = $dao->sendemailAccessgroupuser($this->getAppSession(), $data["all_id"]);
        return Box_Tools::instantRead(array(
        	"SUCCESS" => $success
        ));
    }

}

?>