<?php

/**
 * Description of ProgramtrainingController
 *
 * @author MIS
 */
class Hrd_ProgramtrainingController extends Box_Models_App_Hermes_WingedController{
    
    protected function testingFlag() {
        return FALSE;
    }
    
    public function allRead(){
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'programtraining', array(),array());
        $dao = $this->getMainDao();
        $obj = $this->getMainObject();
        $obj->setArrayTable($this->getAppData());
        $obj->setProject($this->getAppSession()->getProject());
        $obj->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAll($this->getAppRequest(),$obj);
   
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    
    public function detailRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
        
        $creator = new Box_Models_App_Creator();
        
        $mastergp = new Hrd_Models_App_Mastertable_GroupTraining();
        $allgp = $mastergp->prosesDataWithSession($this->getAppSession(), TRUE);

        
        
        
        
        
        $otherAT = array(array(
                "LISTYEARS"=>''
        ));

        $dm->setHasil(array($allgp,$otherAT));
        
        
        return $dm;
    }
    
    
    protected function getMainDao() {
        return new Hrd_Models_Training_ProgramDao();
    }

    protected function getMainFieldID() {
        return "programtraining_id";
    }

    protected function getMainObject() {
        return new Hrd_Models_Training_Program();
    }

    protected function getMainValidator() {
        return new Hrd_Models_Training_ProgramValidator();
    }
 //put your code here
}

?>
