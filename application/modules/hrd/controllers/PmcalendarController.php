<?php

/**
 * Description of DepartmentController
 *
 * @author MIS
 */
class Hrd_PmcalendarController extends Hrd_Models_App_Template_AbstractMasterController {
    
    
    public function _getMainDataModel() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Box_Models_App_DataListCreator('', 'pmcalendar', array(), array()));
        $dm->setObject(new Hrd_Models_Performancemanagement_Pmcalendar());
        $dm->setDao(new Hrd_Models_Performancemanagement_PmcalendarDao());
        $dm->setValidator(new Hrd_Models_Performancemanagement_PmcalendarValidator());
        $dm->setIdProperty("pm_calendar_id");
        return $dm;
        
    }
    
    public function detailRead() {
        
        $em = new Hrd_Models_Performancemanagement_Pmcalendar();
        $dao = new Hrd_Models_Performancemanagement_PmcalendarDao();
        $allStatus = $dao->getAllType($em);
        if(Box_Tools::adaRecord($allStatus)){
            $allStatus = Box_Tools::toObjectsb("type", $allStatus,FALSE);
        }
        return Box_Tools::instantRead(array(), array($allStatus));

    }
}

?>
