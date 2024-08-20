<?php

/**
 * Description of GrouptrainingController
 *
 * @author MIS
 */
class Hrd_GrouptrainingController extends Box_Models_App_Hermes_WingedController {
    
    protected function testingFlag() {
        return FALSE;
    }
    
    public function allRead(){
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'grouptraining', array(),array());
        $x = $this->getMainObject();
        $x->setArrayTable($this->getAppData());
        $x->setProject($this->getAppSession()->getProject());
        $x->setPt($this->getAppSession()->getPt());
        $hasil = $this->getMainDao()->getAll($this->getAppRequest(),$x);
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
        
        $masterD = new Hrd_Models_App_Mastertable_Department();
        $masterD->setRequest($this->getAppRequest());
        $allD = $masterD->prosesDataWithSession($this->getAppSession(), TRUE);

        
        
        
        
        
        $otherAT = array(array(
                "LISTYEARS"=>''
        ));

        $dm->setHasil(array($allD,$otherAT));
        
        
        return $dm;
    }
    
    
    
    
    protected function getMainDao() {
        return new Hrd_Models_Training_GroupDao();
    }

    protected function getMainFieldID() {
        return "grouptraining_id"; 
    }

    protected function getMainObject() {
        return new Hrd_Models_Training_Group();
    }

    protected function getMainValidator() {
       return new Hrd_Models_Training_GroupValidator(); 
    }

   
}

?>
