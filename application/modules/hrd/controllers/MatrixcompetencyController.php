<?php 

class Hrd_MatrixcompetencyController extends Box_Models_App_Hermes_WingedController{
    
    protected function testingFlag() {
        return FALSE;
    }
    
    public function allRead(){
        $ses        = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $ses->report_path = APPLICATION_PATH.'/../public/app/hrd/report/';

        $dm         = new Box_Models_App_Hermes_DataModel();
        $dataList   = new Box_Models_App_DataListCreator('', 'matrixcompetency', array(),array("details"));
        $dao        = $this->getMainDao();
        $obj        = $this->getMainObject();
       
        $obj->setArrayTable($this->getAppData());
        
        $hasil      = $dao->getAll($this->getAppRequest(),$obj);
   
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        
        return $dm;
    }

    public function updatedetailRead() {
        $dm         = new Box_Models_App_Hermes_DataModel();
        $dataList   = new Box_Models_App_DataListCreator('', 'matrixcompetency', array(),array());
        $dao        = new Hrd_Models_Performancemanagement_MatrixCompetencyDao();
        $obj        = new Hrd_Models_Performancemanagement_MatrixCompetency();

        $data       = $this->getAppData();
        // var_dump($data);
        $obj->setArrayTable($this->getAppData());
       
        $hasil      = $dao->getDetailData($this->getAppRequest(), $data['competencymatrixheader_id']);
   
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        
        return $dm;
    }

    public function viewinfoRead() {
        $dm         = new Box_Models_App_Hermes_DataModel();
        $dataList   = new Box_Models_App_DataListCreator('', 'level', array(),array());
        $dao        = new Hrd_Models_Performancemanagement_LevelDao();
        $obj        = new Hrd_Models_Performancemanagement_Level();

        $data = $this->getAppData();
        // var_dump($data);
        $obj->setArrayTable($this->getAppData());
       
        $hasil      = $dao->getLeveldata($this->getAppRequest(), $data['competency_name_id']);
   
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        
        return $dm;
    }

 	public function listdetailRead(){
        $dm         = new Box_Models_App_Hermes_DataModel();
        $dataList   = new Box_Models_App_DataListCreator('', 'competency', array(),array());
        $dao        = new Hrd_Models_Performancemanagement_CompetencyDao();
        $obj        = new Hrd_Models_Performancemanagement_Competency();

        $data = $this->getAppData();
        // var_dump($data);
        $obj->setArrayTable($this->getAppData());
       
        $hasil      = $dao->getCompetency($this->getAppRequest(), $data['jobfamily_id']);
   
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        
        return $dm;
    }
 	public function listdetailupdateRead(){
        $dm         = new Box_Models_App_Hermes_DataModel();
        $dataList   = new Box_Models_App_DataListCreator('', 'matrixcompetency', array(),array());
        $dao        = new Hrd_Models_Performancemanagement_CompetencyDao();
        $obj        = new Hrd_Models_Performancemanagement_Competency();

        $data = $this->getAppData();
        // var_dump($data);
        $obj->setArrayTable($this->getAppData());
       
        $hasil      = $dao->getCompetencyUpdate($this->getAppRequest(), $data['jobfamily_id'], $data['header_id']);
   
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        
        return $dm;
    }

    public function listcatRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        
        $data = $this->getAppData();
        // var_dump($data);

        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
        
        $masterbn   = new Hrd_Models_App_Mastertable_Banding(); 
        $masterjf   = new Hrd_Models_App_Mastertable_JobFamily();
        $masterlc   = new Hrd_Models_App_Mastertable_LevelCategory();
        $masterlv   = new Hrd_Models_App_Mastertable_Level();

        $allbn      = $masterbn->prosesDataWithSession($this->getAppSession(), TRUE);
        $alljf      = $masterjf->prosesDataWithSession($this->getAppSession(), TRUE);
        $alllc      = $masterlc->prosesDataWithSession($this->getAppSession(), TRUE);
        $alllv      = '';//$masterlv->prosesDataWithSession($this->getAppSession(), TRUE);
        $dm->setHasil(array($allbn, $alljf, $alllc, $alllv));
        
        return $dm;
    }

    public function detailRead() {
        
    }
    
    protected function getMainDao() {
        return new Hrd_Models_Performancemanagement_MatrixCompetencyDao();
    }

    protected function getMainFieldID() {
        // return "matrixcompetency_id";
        return "competencymatrixheader_id";
    }

    protected function getMainObject() {
        return new Hrd_Models_Performancemanagement_MatrixCompetency();
    }

    protected function getMainValidator() {
        return new Hrd_Models_Performancemanagement_MatrixCompetencyValidator();
    }
    
    protected function getDefaultProcessor() {
        return new Hrd_Models_App_Box_MatrixCompetencyProcessor();
    }
}

?>