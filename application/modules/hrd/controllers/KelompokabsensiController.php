<?php

class Hrd_KelompokabsensiController extends Box_Models_App_Hermes_WingedController {

    protected function testingFlag() {
        return FALSE;
    }
	
    public function saveheaderRead() {
        $hasil = FALSE;
        $msg = "";
        
        $params = $this->getAppData();
        $name 	= $params['name'];
        $kelompokabsensi_id 	= $params['kelompokabsensi_id'];
        
        $dao 	= $this->getMainDao();
        $hasil 	= $dao->saveHeader($name, $kelompokabsensi_id);
        
        $arrayRespon = array("HASIL" => $hasil, "MSG" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }
    
    public function allRead() {
	
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'kelompokabsensi', array(), array('details'));
		$dao = new Hrd_Models_Master_Kelompokabsensi_KelompokabsensiDao();
		$obj = new Hrd_Models_Master_Kelompokabsensi_Kelompokabsensi();
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
        $allproject = $masterproject->prosesDataWithSession($this->getAppSession(), TRUE);
        $dm->setHasil(array($allproject, $allpt));
        return $dm;
    }

    public function formdetailRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'kelompokabsensidetail', array(), array());
        $dm->setDirectResult(FALSE); // kayanya kalau perlu master lain baru di set TRUE
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
        $dm->setDataList($dataList);
        return $dm;
    }


    public function kelompokabsensidetaillistRead() {
	
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'kelompokabsensidetail', array(), array());
		$dao = new Hrd_Models_Master_Kelompokabsensi_KelompokabsensiDao();
        $data = $this->getAppData();
        $hasil = $dao->getDetailData($this->getAppRequest(), $data['kelompokabsensi_id']);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    /*
    public function kelompokabsensidetaillistRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'kelompokabsensidetail', array(), array());
        $dao = new Hrd_Models_Master_Kelompokabsensi_KelompokabsensiDao();
        $obj = new Hrd_Models_Master_Kelompokabsensi_Kelompokabsensi();
        $data = $this->getAppData();
        $obj->setArrayTable($this->getAppData());
        $hasil = $dao->getDetailData($this->getAppRequest(), $obj, $this->getAppSession());
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }*/
    
    public function updatedetailRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'kelompokabsensidetail', array(), array());
        $dao = new Hrd_Models_Master_Kelompokabsensi_KelompokabsensiDao();
        $data = $this->getAppData();
        $hasil = $dao->getDetailData($this->getAppRequest(), $data['kelompokabsensi_id']);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
		
    }

    public function employeelistRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'kelompokabsensiemployee', array(), array());
        $dao = new Hrd_Models_Master_Kelompokabsensi_KelompokabsensiDao();
        $employee = new Hrd_Models_Master_Kelompokabsensi_Kelompokabsensi();
        $this->setArrayTable($employee, $this->getAppData());	
        $hasil = $dao->getEmployeelist($this->getAppRequest(), $this->getAppSession(), $this->getAppData());
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    
    public function selectemployeeRead() {
        $data = $this->getAppData();
        $dao = $this->getMainDao();
        $success = $dao->selectemployeeKelompokabsensi($this->getAppSession(), $data);
        return Box_Tools::instantRead(array(
                    "SUCCESS" => $success
        ));
    }
    
    public function detailRead() {
        
    }

    protected function getMainDao() {
        return new Hrd_Models_Master_Kelompokabsensi_KelompokabsensiDao();
    }

    protected function getMainFieldID() {
        return "kelompokabsensi_id"; //prefix id header
    }

    protected function getMainObject() {
        return new Hrd_Models_Master_Kelompokabsensi_Kelompokabsensi();
    }

    protected function getMainValidator() {
        return new Hrd_Models_Master_Kelompokabsensi_KelompokabsensiValidator();
    }

    protected function getDefaultProcessor() {
        return new Hrd_Models_App_Box_KelompokabsensiProcessor();
    }
    public function maindataRead(){
         $data = $this->getAppData();
         $dao = new Hrd_Models_Master_Kelompokabsensi_KelompokabsensiDao();
         $success = $dao->getdataByid($data["kelompokabsensi_id"]);
        return Box_Tools::instantRead(array(
                "SUCCESS" => $success
        ));
    }
    
    public function dataexistRead(){
        $data = $this->getAppData();
        $dao = new Hrd_Models_Master_Kelompokabsensi_KelompokabsensiDao();
        $hasil = $dao->dataExist($data["name"], $data["kelompokabsensi_id"], $this->getAppSession());
        return Box_Tools::instantRead(array(
                "HASIL" => $hasil
        ));
    }
    
    public function deletedetailRead(){
        $data = $this->getAppData();
        $dao = new Hrd_Models_Master_Kelompokabsensi_KelompokabsensiDao();
        $hasil = $dao->deleteDetail($data["employee_id"], $data["kelompokabsensi_id"], $this->getAppSession());
        return Box_Tools::instantRead(array(
                "HASIL" => $hasil
        ));
    }

    public function parameterRead() {
		
        $department     = new Hrd_Models_App_Mastertable_Department();
        $alldepartment 	= $department->prosesDataWithSession($this->getAppSession(), TRUE);
		
        $hasil = TRUE;

        $arrayRespon = array(
            "HASIL" => $hasil);
        return Box_Tools::instantRead($arrayRespon, array($alldepartment));
    }
}

?>