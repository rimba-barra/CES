<?php

class Hrd_AccessgroupController extends Box_Models_App_Hermes_WingedController {

    protected function testingFlag() {
        return FALSE;
    }
	
    public function allRead() {
	
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'accessgroup', array(), array('details'));
		$dao = new Hrd_Models_Master_Accessgroup_AccessgroupDao();
		$obj = new Hrd_Models_Master_Accessgroup_Accessgroup();
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

    protected function getMainDao() {
        return new Hrd_Models_Master_Accessgroup_AccessgroupDao();
    }

    protected function getMainFieldID() {
        return "accessgroup_id"; //prefix id header
    }

    protected function getMainObject() {
        return new Hrd_Models_Master_Accessgroup_Accessgroup();
    }

    protected function getMainValidator() {
        return new Hrd_Models_Master_Accessgroup_AccessgroupValidator();
    }
/*
    protected function getDefaultProcessor() {
        return new Hrd_Models_App_Box_AccessgroupProcessor();
    }*/
    public function maindataRead(){
         $data = $this->getAppData();
         $dao = new Hrd_Models_Master_Accessgroup_AccessgroupDao();
         $success = $dao->getdataByid($data["accessgroup_id"]);
        return Box_Tools::instantRead(array(
                "SUCCESS" => $success
        ));
    }
     

}

?>