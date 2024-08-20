<?php

class Hrd_AccessgroupdetailController extends Box_Models_App_Hermes_WingedController {

    protected function testingFlag() {
        return FALSE;
    }
	
    public function allRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'accessgroupdetail', array(), array('details'));
		$dao = new Hrd_Models_Accessgroupdetail_AccessgroupdetailDao();
		$obj = new Hrd_Models_Accessgroupdetail_Accessgroupdetail();
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
        $masterproject          = new Hrd_Models_App_Mastertable_Project();
        $masterpt               = new Hrd_Models_App_Mastertable_Pt();
	$masteremp		= new Hrd_Models_App_Mastertable_Employee();
        $masteraccessgroup 	= new Hrd_Models_App_Mastertable_Accessgroup();
        $allproject             = $masterproject->prosesDataWithSession($this->getAppSession(), TRUE);
        $allpt 			= $masterpt->prosesDataWithSession($this->getAppSession(), TRUE);
        $allemp 		= $masteremp->prosesDataWithSession($this->getAppSession(), TRUE);
        $allaccessgroup = $masteraccessgroup->prosesDataWithSession($this->getAppSession(), TRUE);
        $dm->setHasil(array($allproject, $allpt, $allemp, $allaccessgroup));
        return $dm;
    }

    public function accessgroupdetaildetaillistRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'accessgroupdetaildetail', array(), array());
        $dao = new Hrd_Models_Accessgroupdetail_AccessgroupdetailDao();
        $obj = new Hrd_Models_Accessgroupdetail_Accessgroupdetail();
        $data = $this->getAppData();
        $obj->setArrayTable($this->getAppData());
        $hasil = $dao->getDetailData($this->getAppRequest(), $obj, $this->getAppSession());
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
	
    public function listdetailRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'accessgroupdetaildetail', array(), array());
        $dao = new Hrd_Models_Accessgroupdetail_AccessgroupdetailDao();
        $obj = new Hrd_Models_Accessgroupdetail_Accessgroupdetail();

        $data = $this->getAppData();
        $obj->setArrayTable($this->getAppData());

        //var_dump($this->getAppRequest());
        $hasil = $dao->getDetailData($this->getAppRequest(), $obj, $this->getAppSession());

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        return $dm;
    }

    public function updatedetailRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'accessgroupdetaildetail', array(), array());
        $dao = new Hrd_Models_Accessgroupdetail_AccessgroupdetailDao();
        $data = $this->getAppData();
        $hasil = $dao->getDetailData($this->getAppRequest(), $data['accessgroup_id']);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function detailRead() {
        
    }
	
    protected function getMainDao() {
        return new Hrd_Models_Accessgroupdetail_AccessgroupdetailDao();
    }

    protected function getMainFieldID() {
        return "accessgroup_id"; //prefix id header
    }

    protected function getMainObject() {
        return new Hrd_Models_Accessgroupdetail_Accessgroupdetail();
    }

    protected function getMainValidator() {
        return new Hrd_Models_Accessgroupdetail_AccessgroupdetailValidator();
    }
    
    protected function getDefaultProcessor() {
        return new Hrd_Models_App_Box_AccessgroupdetailProcessor();
    }
    
    public function maindataRead(){
		$data = $this->getAppData();
		$dao = new Hrd_Models_Accessgroupdetail_AccessgroupdetailDao();
		$success = $dao->getdataByid($data["accessgroup_id"]);
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
	        
        $masteraccessgroup 	= new Hrd_Models_App_Mastertable_Accessgroup();
        $allproject 	= $masterproject->prosesDataWithSession($this->getAppSession(), TRUE);
        $allpt 			= $masterpt->prosesDataWithSession($this->getAppSession(), TRUE);
        $allemp 		= $masteremp->prosesDataWithSession($this->getAppSession(), TRUE);
        $allaccessgroup = $masteraccessgroup->prosesDataWithSession($this->getAppSession(), TRUE);
        
	$masteremp	= new Hrd_Models_App_Mastertable_Employee();
        $allemp 	= $masteremp->prosesDataWithSession($this->getAppSession(), TRUE);
		
        $masteraccessgroup 	= new Hrd_Models_App_Mastertable_Accessgroup();		
        $allaccessgroup = $masteraccessgroup->prosesDataWithSession($this->getAppSession(), TRUE);
		
        $dm->setHasil(array($allemp, $allaccessgroup));
		
        return $dm;
    }
	
    public function grouplistRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'group', array(), array());
        $dao = new Hrd_Models_Accessgroupdetail_AccessgroupdetailDao();
        $group = new Hrd_Models_Accessgroupdetail_Accessgroupdetail();
        $this->setArrayTable($group, $this->getAppData());		
		$hasil = $dao->getGrouplist($this->getAppRequest(), $this->getAppSession(), $this->getAppData());
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
	
    public function parameterRead() {
		
        $m_group 	= new Hrd_Models_App_Mastertable_Group();
        $data_group 	= $m_group->prosesDataWithSession($this->getAppSession(), TRUE);
        
        $project 	= new Hrd_Models_App_Mastertable_Projectsh();
        $allproject 	= $project->prosesDataWithSession($this->getAppSession(), TRUE);
		
        $masterpt 	= new Hrd_Models_App_Mastertable_Pt();
        $allpt 		= $masterpt->prosesDataWithSession($this->getAppSession(), TRUE);
		
        $hasil = TRUE;

        $arrayRespon = array(
            "HASIL" => $hasil);
        return Box_Tools::instantRead($arrayRespon, array($data_group, $allproject, $allpt));
    }
	
	/*
    public function listdetailcbRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $data = $this->getAppData();
		
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
		
        $masteraccessgroup = new Hrd_Models_App_Mastertable_Accesslevel();		
        $allaccessgroup = $masteraccessgroup->prosesDataWithSession($this->getAppSession(), TRUE);		
        $dm->setHasil(array($allemp));		
        return $dm;
    }*/

	
    public function selectgroupRead() {
        $data = $this->getAppData();
        $dao = $this->getMainDao();
        $success = $dao->selectgroupAccessgroupdetail($this->getAppSession(), $data);
        return Box_Tools::instantRead(array(
                    "SUCCESS" => $success
        ));
    }
	
    public function approveRead() {
        $data = $this->getAppData();
        $dao = $this->getMainDao();
        $success = $dao->approveAccessgroupdetail($this->getAppSession(), $data);
        return Box_Tools::instantRead(array(
                    "SUCCESS" => $success
        ));
    }
	
    public function rejectRead() {
        $data = $this->getAppData();
        $dao = $this->getMainDao();
        $success = $dao->rejectAccessgroupdetail($this->getAppSession(), $data);
        return Box_Tools::instantRead(array(
                    "SUCCESS" => $success
        ));
    }
	
    public function sendemailRead() {
        $data = $this->getAppData();
        $dao = $this->getMainDao();
		
        $success = $dao->sendemailAccessgroupdetail($this->getAppSession(), $data["all_id"], $data["accessgroup"]);
        return Box_Tools::instantRead(array(
        			"SUCCESS" => $success
        ));
    }
	
    public function savecopyRead() {
        $data = $this->getAppData();
        $dao = $this->getMainDao();
        $success = $dao->saveCopyLevel($this->getAppSession(), $data['accessgroup_id'], $data['accessgroup_id_copy']);
        return Box_Tools::instantRead(array(
                    "SUCCESS" => $success
        ));
    }

    public function validateapproveRead() {	
        $dao = new Hrd_Models_Accessgroupdetail_AccessgroupdetailDao();		
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
}

?>