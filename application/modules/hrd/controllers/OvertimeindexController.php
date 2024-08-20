<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of OvertimeindexController
 *
 * @author MIS
 */
class Hrd_OvertimeindexController extends Box_Models_App_Hermes_WingedController {
    protected function testingFlag() {
        return FALSE;
    }
    
    public function allRead(){
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'overtimeindex', array(),array());
        $x = $this->getMainObject();
        $x->setArrayTable($this->getAppData());
        $x->setProject($this->getAppSession()->getProject());
        $x->setPt($this->getAppSession()->getPt());
        $hasil = $this->getMainDao()->getAllWOPL($x);
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
        return new Hrd_Models_Overtime_Index_Dao();
    }

    protected function getMainFieldID() {
        return "overtimeindex_id"; 
    }

    protected function getMainObject() {
        return new Hrd_Models_Overtime_Index_Index();
    }

    protected function getMainValidator() {
       return new Hrd_Models_Overtime_Index_Validator(); 
    }
}

?>
