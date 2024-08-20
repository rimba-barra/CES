<?php

class Hrd_MonitoringmatrixController extends Box_Models_App_Hermes_WingedController {

    protected function testingFlag() {
        return FALSE;
    }
	
    public function allRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'monitoringmatrix', array(), array('details'));
		$dao = new Hrd_Models_Performancemanagement_MonitoringmatrixDao();
		$obj = new Hrd_Models_Performancemanagement_Monitoringmatrix();
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
        $masterproject 	= new Hrd_Models_App_Mastertable_Project();
        $masterpt 	= new Hrd_Models_App_Mastertable_Pt();
		$masteremp		= new Hrd_Models_App_Mastertable_Employee();
        $masteraccesslevel 	= new Hrd_Models_App_Mastertable_Accesslevel();
        $allproject 	= $masterproject->prosesDataWithSession($this->getAppSession(), TRUE);
        $allpt 			= $masterpt->prosesDataWithSession($this->getAppSession(), TRUE);
        $allemp 		= $masteremp->prosesDataWithSession($this->getAppSession(), TRUE);
        $allaccesslevel = $masteraccesslevel->prosesDataWithSession($this->getAppSession(), TRUE);
        $dm->setHasil(array($allproject, $allpt, $allemp, $allaccesslevel));
        return $dm;
    }

    public function monitoringmatrixdetaillistRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'monitoringmatrixdetail', array(), array());
        $dao = new Hrd_Models_Performancemanagement_MonitoringmatrixDao();
        $obj = new Hrd_Models_Performancemanagement_Monitoringmatrix();
        $data = $this->getAppData();
        $obj->setArrayTable($this->getAppData());
        $hasil = $dao->getDetailData($this->getAppRequest(), $obj, $this->getAppSession());
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
	
    public function listdetailRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'monitoringmatrixdetail', array(), array());
        $dao = new Hrd_Models_Performancemanagement_MonitoringmatrixDao();
        $obj = new Hrd_Models_Performancemanagement_Monitoringmatrix();

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
        $dataList = new Box_Models_App_DataListCreator('', 'monitoringmatrixdetail', array(), array());
        $dao = new Hrd_Models_Performancemanagement_MonitoringmatrixDao();
        $data = $this->getAppData();
        $hasil = $dao->getDetailData($this->getAppRequest(), $data['accesslevel_id']);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function detailRead() {
        
    }
	
    protected function getMainDao() {
        return new Hrd_Models_Performancemanagement_MonitoringmatrixDao();
    }

    protected function getMainFieldID() {
        return "accesslevel_id"; //prefix id header
    }

    protected function getMainObject() {
        return new Hrd_Models_Performancemanagement_Monitoringmatrix();
    }

    protected function getMainValidator() {
        return new Hrd_Models_Performancemanagement_MonitoringmatrixValidator();
    }
	
    protected function getDefaultProcessor() {
        return new Hrd_Models_App_Box_MonitoringmatrixProcessor();
    }
    public function maindataRead(){
		$data = $this->getAppData();
		$dao = new Hrd_Models_Performancemanagement_MonitoringmatrixDao();
		$success = $dao->getdataByid($data["accesslevel_id"]);
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
		
		$masteremp	= new Hrd_Models_App_Mastertable_Employee();
        $allemp 	= $masteremp->prosesDataWithSession($this->getAppSession(), TRUE);
		
        $masteraccesslevel = new Hrd_Models_App_Mastertable_Accesslevel();		
        $allaccesslevel = $masteraccesslevel->prosesDataWithSession($this->getAppSession(), TRUE);
		
        $dm->setHasil(array($allemp, $allaccesslevel));
		
        return $dm;
    }
	
    public function employeelistRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'monitoringmatrixemployee', array(), array());
        $dao = new Hrd_Models_Performancemanagement_MonitoringmatrixDao();
        $employee = new Hrd_Models_Performancemanagement_Monitoringmatrix();
        $this->setArrayTable($employee, $this->getAppData());		
		$hasil = $dao->getEmployeelist($this->getAppRequest(), $this->getAppSession(), $this->getAppData());
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
	
    public function parameterRead() {
		
        $m_banding 		= new Hrd_Models_App_Mastertable_Banding();
        $data_banding 	= $m_banding->prosesDataWithSession($this->getAppSession(), TRUE);
		
        $project 		= new Hrd_Models_App_Mastertable_Projectsh();
        $allproject 	= $project->prosesDataWithSession($this->getAppSession(), TRUE);
		
        $masterpt 		= new Hrd_Models_App_Mastertable_Pt();
        $allpt 			= $masterpt->prosesDataWithSession($this->getAppSession(), TRUE);
		
        $hasil = TRUE;

        $arrayRespon = array(
            "HASIL" => $hasil);
        return Box_Tools::instantRead($arrayRespon, array($data_banding, $allproject, $allpt));
    }
	
	/*
    public function listdetailcbRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $data = $this->getAppData();
		
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
		
        $masteraccesslevel = new Hrd_Models_App_Mastertable_Accesslevel();		
        $allaccesslevel = $masteraccesslevel->prosesDataWithSession($this->getAppSession(), TRUE);		
        $dm->setHasil(array($allemp));		
        return $dm;
    }*/

	
    public function selectemployeeRead() {
        $data = $this->getAppData();
        $dao = $this->getMainDao();
        $success = $dao->selectemployeeMonitoringmatrix($this->getAppSession(), $data);
        return Box_Tools::instantRead(array(
                    "SUCCESS" => $success
        ));
    }
	
    public function approveRead() {
        $data = $this->getAppData();
        $dao = $this->getMainDao();
        $success = $dao->approveMonitoringmatrix($this->getAppSession(), $data);
        return Box_Tools::instantRead(array(
                    "SUCCESS" => $success
        ));
    }
	
    public function rejectRead() {
        $data = $this->getAppData();
        $dao = $this->getMainDao();
        $success = $dao->rejectMonitoringmatrix($this->getAppSession(), $data);
        return Box_Tools::instantRead(array(
                    "SUCCESS" => $success
        ));
    }
	
    public function sendemailRead() {
        $data = $this->getAppData();
        $dao = $this->getMainDao();
		
        $success = $dao->sendemailMonitoringmatrix($this->getAppSession(), $data["all_id"], $data["accesslevel"]);
        return Box_Tools::instantRead(array(
        			"SUCCESS" => $success
        ));
    }
	
    public function savecopyRead() {
        $data = $this->getAppData();
        $dao = $this->getMainDao();
        $success = $dao->saveCopyLevel($this->getAppSession(), $data['accesslevel_id'], $data['accesslevel_id_copy']);
        return Box_Tools::instantRead(array(
                    "SUCCESS" => $success
        ));
    }

 	public function validateapproveRead() {	
        $dao = new Hrd_Models_Performancemanagement_UsermonitoringlevelDao();		
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