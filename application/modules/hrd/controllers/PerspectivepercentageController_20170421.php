<?php 

class Hrd_PerspectivepercentageController extends Box_Models_App_Hermes_WingedController{
    
    protected function testingFlag() {
        return FALSE;
    }
    
    public function allRead(){
        $dm         = new Box_Models_App_Hermes_DataModel();
        $dataList   = new Box_Models_App_DataListCreator('', 'perspectivepercentage', array(),array('details'));
        $dao        = $this->getMainDao();
        $obj        = $this->getMainObject();        
        $obj->setArrayTable($this->getAppData());        
        $hasil      = $dao->getAll($this->getAppRequest(),$obj);   
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    
    public function headerdataRead() {
        $dm     = new Box_Models_App_Hermes_DataModel();
        $data   = $this->getAppData();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);        
        $masterproject  = new Hrd_Models_App_Mastertable_Project();
        $masterpt       = new Hrd_Models_App_Mastertable_Pt();
        $masterdept     = new Hrd_Models_App_Mastertable_Department();
        $allproject     = $masterproject->prosesDataWithSession($this->getAppSession(), TRUE);
        $allpt          = $masterpt->prosesDataWithSession($this->getAppSession(), TRUE);
        $alldept        = $masterdept->prosesDataWithSession($this->getAppSession(), TRUE);
        $dm->setHasil(array($allproject, $allpt, $alldept));        
        return $dm;
    }

    public function perspectivelistRead() {
        $dm         = new Box_Models_App_Hermes_DataModel();
        $dataList   = new Box_Models_App_DataListCreator('', 'perspectivepercentagedetail', array('perspective'),array());
        $dao        = new Hrd_Models_Bsc_PerspectivePercentageDao();
        $obj        = new Hrd_Models_Bsc_Perspective();

        $data = $this->getAppData();
        $obj->setArrayTable($this->getAppData());       
        //$hasil      = $dao->getPerspective($this->getAppRequest(), $data['perspective_percentage_id']);
		$hasil      = $dao->getNewDetail();
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        
        return $dm;
    }

   /* public function updatedetailRead() {
        $dm         = new Box_Models_App_Hermes_DataModel();
        $dataList   = new Box_Models_App_DataListCreator('', 'perspectivepercentage', array(),array());
        $dao        = new Hrd_Models_Bsc_PerspectivePercentageDao();
        $obj        = new Hrd_Models_Bsc_PerspectivePercentage();

        $data       = $this->getAppData();
        // var_dump($data); die();
        $obj->setArrayTable($this->getAppData());
       
        $hasil      = $dao->getDetailData($this->getAppRequest(), $data['perspective_percentage_id']);
   
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        
        return $dm;
    }*/
	
	
	 public function updatedetailRead() {
        $dm         = new Box_Models_App_Hermes_DataModel();
        $dataList   = new Box_Models_App_DataListCreator('', 'perspectivepercentagedetail', array('perspective'),array());
        $dao        = new Hrd_Models_Bsc_PerspectivePercentageDao();
        $obj        = new Hrd_Models_Bsc_PerspectivePercentage();

        $data       = $this->getAppData();
        // var_dump($data); die();
        $obj->setArrayTable($this->getAppData());
       
       // $hasil      = $dao->getPerspective($this->getAppRequest(), $data['perspective_percentage_id']);
	   $hasil      = $dao->getDetailData($this->getAppRequest(), $data['perspective_percentage_id']);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        
        return $dm;
    }
	
	

    public function detailRead() {
    
    }
    
    protected function getMainDao() {
        return new Hrd_Models_Bsc_PerspectivePercentageDao();
    }

    protected function getMainFieldID() {
        return "perspective_percentage_id";
    }

    protected function getMainObject() {
        return new Hrd_Models_Bsc_PerspectivePercentage();
    }

    protected function getMainValidator() {
        return new Hrd_Models_Bsc_PerspectivePercentageValidator();
    }

    protected function getDefaultProcessor() {
        return new Hrd_Models_App_Box_PerspectivePercentageProcessor();
        // return new Hrd_Models_App_Box_Processor();
    }
}

?>