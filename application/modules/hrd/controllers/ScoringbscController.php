<?php

class Hrd_ScoringbscController extends Box_Models_App_Hermes_WingedController {

    protected function testingFlag() {
        return FALSE;
    }
	
    public function allRead() {
	
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'scoringbsc', array(), array('details'));
		$dao = new Hrd_Models_Master_Scoringbsc_ScoringbscDao();
		$obj = new Hrd_Models_Master_Scoringbsc_Scoringbsc();
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
        $dataList = new Box_Models_App_DataListCreator('', 'scoringbscdetail', array(), array());
        $dm->setDirectResult(FALSE); // kayanya kalau perlu master lain baru di set TRUE
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
        $dm->setDataList($dataList);
        return $dm;
    }

    public function scoringbscdetaillistRead() {		
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'scoringbscdetail', array(), array());
        $dao = new Hrd_Models_Master_Scoringbsc_ScoringbscDao();
        //$obj_jenisdokumen = new Hrd_Models_Master_Jenisdokumen();
        //$obj_jenisdokumen->setArrayTable($this->getAppData());
        $dm->setDataList($dataList);
        $dm->setHasil(array());
        return $dm;
    }

    public function updatedetailRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'scoringbscdetail', array(), array());
        $dao = new Hrd_Models_Master_Scoringbsc_ScoringbscDao();
        $data = $this->getAppData();
        $hasil = $dao->getDetailData($this->getAppRequest(), $data['scoringbsc_id']);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
		
    }

    public function detailRead() {
        
    }

    protected function getMainDao() {
        return new Hrd_Models_Master_Scoringbsc_ScoringbscDao();
    }

    protected function getMainFieldID() {
        return "scoringbsc_id"; //prefix id header
    }

    protected function getMainObject() {
        return new Hrd_Models_Master_Scoringbsc_Scoringbsc();
    }

    protected function getMainValidator() {
        return new Hrd_Models_Master_Scoringbsc_ScoringbscValidator();
    }

    protected function getDefaultProcessor() {
        return new Hrd_Models_App_Box_ScoringbscProcessor();
    }
    public function maindataRead(){
         $data = $this->getAppData();
         $dao = new Hrd_Models_Master_Scoringbsc_ScoringbscDao();
         $success = $dao->getdataByid($data["scoringbsc_id"]);
        return Box_Tools::instantRead(array(
                "SUCCESS" => $success
        ));
    }
     

}

?>