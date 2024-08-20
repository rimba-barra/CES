<?php

/**
 * 
 *
 * @author MIS
 */
class Hrd_OvertimevpController extends Box_Models_App_Hermes_AbstractController {

    

    protected function testingFlag() {
        return FALSE;
    }

    public function allRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'overtimevp', array(), array());
        $dao = new Hrd_Models_Master_OvertimevpDao();
        $tk = new Hrd_Models_Master_Overtimevp();
        $tk->setProject($this->getAppSession()->getProject());
        $tk->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAll($this->getAppRequest(),$tk);
     
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    
    public function detailRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
        
      

        
        $masterG = new Hrd_Models_App_Mastertable_Group();
        $allG = $masterG->prosesDataWithSession($this->getAppSession(), TRUE);
        
       

        $dm->setHasil(array($allG));
        
        
        return $dm;
    }

    public function mainCreate() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $c = new Hrd_Models_Master_Overtimevp();
        
        $dm->setDao(new Hrd_Models_Master_OvertimevpDao());
        $dm->setValidator(new Hrd_Models_Master_OvertimevpValidator());
        $dm->setObject($c);
       
        return $dm;
    }

    public function mainDelete() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setObject(new Hrd_Models_Master_Overtimevp());
        $dm->setDao(new Hrd_Models_Master_OvertimevpDao());
        $dm->setIdProperty("overtimevp_id");
        return $dm;
    }

    protected function getDefaultProcessor() {
        return new Hrd_Models_App_Box_Processor();
    }

}

?>
