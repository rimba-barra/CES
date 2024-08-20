<?php

/**
 * Description of DepartmentController
 *
 * @author MIS
 */
class Hrd_WorklocationprojectptController extends Hrd_Models_App_Template_AbstractMasterController {

    public function _getMainDataModel() {

        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Box_Models_App_DataListCreator('', 'worklocationprojectpt', array(), array()));
        $dm->setObject(new Hrd_Models_Worklocationprojectpt_Worklocationprojectpt());
        $dm->setDao(new Hrd_Models_Worklocationprojectpt_Dao());
        $dm->setValidator(new Hrd_Models_Worklocationprojectpt_Validator());
        $dm->setIdProperty("worklocationprojectpt_id");
        return $dm;
    }

    public function detailRead() { 

        /// projectpt list
        $dao = new Hrd_Models_Master_Projectpt_Dao();
        $projectptFilter = new Hrd_Models_Master_Projectpt_ProjectPt();
        $projectptFilter->setUserid($this->getAppSession()->getUserId());
        $projectptFilter->setGroupid($this->getAppSession()->getGroupId());
        $hasil = $dao->getAllWoPL($projectptFilter);

        $allprojectpt = array();
        foreach ($hasil[1] as $record){
    
            $projectpt = new Hrd_Models_Master_Projectpt_ProjectPt();
            $projectpt->setArrayTable($record);
            $allprojectpt[] = $projectpt;
        }

        // worklocation
        $em = new Hrd_Models_Master_Worklocation_MasterWorkLocation();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Master_Worklocation_Dao();
        
        $allmasterworklocation = $dao->getAllWoPL($em);
        if(Box_Tools::adaRecord($allmasterworklocation)){
            $allmasterworklocation = Box_Tools::toObjectsb("masterworklocation", $allmasterworklocation,FALSE);
        }

        
        return Box_Tools::instantRead(array(), array($allmasterworklocation, $allprojectpt));

    }
    
    protected function getDefaultProcessor() {
        return new Hrd_Models_App_Box_ReportProcessor();
    }
    


}

?>
