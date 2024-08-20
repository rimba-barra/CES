<?php

/**
 * Description of GrouptrainingController
 *
 * @author MIS
 */
class Hrd_ParameterlosttimeController extends Box_Models_App_Hermes_WingedController {
    
    protected function testingFlag() {
        return FALSE;
    }
    
    public function allRead(){
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'parameterlosttime', array('absenttype'),array());
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
        
        $ma = new Hrd_Models_App_Mastertable_AbsentType();
        $aa = $ma->prosesDataWithSession($this->getAppSession(), TRUE);
        
        
        
        
        $otherAT = array(array(
                "LISTYEARS"=>''
        ));

        $dm->setHasil(array($aa,$otherAT));
        
        
        return $dm;
    }
    
    
    
    
    protected function getMainDao() {
        return new Hrd_Models_Parameters_Losttime_Dao();
    }

    protected function getMainFieldID() {
        return "losttime_param_id"; 
    }

    protected function getMainObject() {
        return new Hrd_Models_Parameters_Losttime_LostTime();
    }

    protected function getMainValidator() {
       return new Hrd_Models_Parameters_Losttime_Validator(); 
    }

   
}

?>
