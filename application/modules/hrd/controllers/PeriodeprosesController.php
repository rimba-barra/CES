<?php

/**
 * Description of DepartmentController
 *
 * @author MIS
 */
class Hrd_PeriodeprosesController extends Hrd_Models_App_Template_AbstractMasterController {
    
    
    public function _getMainDataModel() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Box_Models_App_DataListCreator('', 'periodeproses', array(), array()));
        $dm->setObject(new Hrd_Models_Performancemanagement_Periodeproses());
        $dm->setDao(new Hrd_Models_Performancemanagement_PeriodeprosesDao());
        $dm->setValidator(new Hrd_Models_Performancemanagement_PeriodeprosesValidator());
        $dm->setIdProperty("periodeproses_id");
        return $dm;
        
    }
    
    public function detailRead() {
        
        $em = new Hrd_Models_Performancemanagement_Statusperiode();
        $dao = new Hrd_Models_Performancemanagement_PeriodeprosesDao();
        $allStatus = $dao->getAllStatusPeriode($em);
        if(Box_Tools::adaRecord($allStatus)){
            $allStatus = Box_Tools::toObjectsb("statusperiode", $allStatus,FALSE);
        }
        return Box_Tools::instantRead(array(), array($allStatus));

    }
}

?>
