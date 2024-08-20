<?php 

class Hrd_LevelController extends Box_Models_App_Hermes_WingedController{
    
    protected function testingFlag() {
        return FALSE;
    }
    
    public function allRead(){
        $dm         = new Box_Models_App_Hermes_DataModel();
        $dataList   = new Box_Models_App_DataListCreator('', 'level', array(),array());
        $dao        = $this->getMainDao();
        $obj        = $this->getMainObject();
       
        $obj->setArrayTable($this->getAppData());
       
        $hasil      = $dao->getAll($this->getAppRequest(),$obj);
   
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        
        return $dm;
    }
    
    public function listcatRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
        
        $masterlc   = new Hrd_Models_App_Mastertable_LevelCategory(); /* buat object Level Category*/
        $mastercn   = new Hrd_Models_App_Mastertable_CompetencyNames(); /* buat object Competency Names*/
        $alllc      = $masterlc->prosesDataWithSession($this->getAppSession(), TRUE);
        $allcn      = $mastercn->prosesDataWithSession($this->getAppSession(), TRUE);
        
        $dm->setHasil(array($alllc, $allcn)); /* tambah hasil dari Level Category & Competency Names ke DataModel */
        
        return $dm;
    }

    public function detailRead() {
        
    }
    
    protected function getMainDao() {
        return new Hrd_Models_Performancemanagement_levelDao();
    }

    protected function getMainFieldID() {
        return "level_id";
    }

    protected function getMainObject() {
        return new Hrd_Models_Performancemanagement_level();
    }

    protected function getMainValidator() {
        return new Hrd_Models_Performancemanagement_levelValidator();
    }
    
    
}

?>