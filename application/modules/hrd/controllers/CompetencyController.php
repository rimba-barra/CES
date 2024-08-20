<?php 

class Hrd_CompetencyController extends Box_Models_App_Hermes_WingedController {
    
    protected function testingFlag() {
        return FALSE;
    }
    
    public function allRead(){
        $ses        = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $ses->report_path = APPLICATION_PATH.'/../public/app/hrd/report/';
        
        $dm         = new Box_Models_App_Hermes_DataModel();
        $dataList   = new Box_Models_App_DataListCreator('', 'competency', array(),array());
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
        
        $mastercc   = new Hrd_Models_App_Mastertable_CompetencyCategory(); /* buat object Competency Category*/
        $mastercn   = new Hrd_Models_App_Mastertable_CompetencyNames(); /* buat object Competency Names*/
        $masterjf   = new Hrd_Models_App_Mastertable_JobFamily(); /* buat object Job Family*/
        $allcc      = $mastercc->prosesDataWithSession($this->getAppSession(), TRUE);
        $allcn      = $mastercn->prosesDataWithSession($this->getAppSession(), TRUE);
        $alljf      = $masterjf->prosesDataWithSession($this->getAppSession(), TRUE);
        
        $dm->setHasil(array($allcc, $allcn, $alljf)); 
        
        return $dm;
    }

    public function detailRead() {
        
    }
    
    protected function getMainDao() {
        return new Hrd_Models_Performancemanagement_CompetencyDao();
    }

    protected function getMainFieldID() {
        return "competency_id";
    }

    protected function getMainObject() {
        return new Hrd_Models_Performancemanagement_Competency();
    }

    protected function getMainValidator() {
        return new Hrd_Models_Performancemanagement_CompetencyValidator();
    }
    
    
}

?>