<?php 

class Hrd_CompetencynamesController extends Box_Models_App_Hermes_WingedController{
    
    protected function testingFlag() {
        return FALSE;
    }
    
    public function allRead(){
        $dm         = new Box_Models_App_Hermes_DataModel();
        $dataList   = new Box_Models_App_DataListCreator('', 'competencynames', array(),array());
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
        
        $mastergp   = new Hrd_Models_App_Mastertable_CompetencyCategory();
        $allgp      = $mastergp->prosesDataWithSession($this->getAppSession(), TRUE);
        
        $dm->setHasil(array($allgp));
        
        return $dm;
    }

    public function detailRead() {
        
    }

    public function uploadRead() {
        $session    = $this->getAppSession();
        $data       = $this->getAppData();
        $msg        = '???';
        $success    = FALSE;
        $modeUpload = $data['type'];
        $fileName   = '';
        $fileUpload = NULL;

        // var_dump($data); exit();

        if ($modeUpload == 'image') {
            $fileUpload = new Box_Models_App_FileUpload('/public/app/hrd/uploads/performance_management/image/', 'img_'.$data['competency_name_id'].'_'.$data['code'].'', 'jpg, jpeg, png, JPG');
            
            $fileUpload->run();
            if (!$fileUpload->isSuccess()) {
                $msg = $fileUpload->getErrorMsg();
            } else {
                $success    = TRUE;
                $fileName   = $fileUpload->getFileName();
                $msg        = $fileName;
            }
        }

        $arrayRespon = array("HASIL" => $success, "MSG" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }
    
    protected function getMainDao() {
        return new Hrd_Models_Performancemanagement_CompetencyNamesDao();
    }

    protected function getMainFieldID() {
        return "competency_name_id";
    }

    protected function getMainObject() {
        return new Hrd_Models_Performancemanagement_CompetencyNames();
    }

    protected function getMainValidator() {
        return new Hrd_Models_Performancemanagement_CompetencyNamesValidator();
    }
    
    
}

?>