<?php

/**
 * Description of DepartmentController
 *
 * @author MIS
 */
class Hrd_HcreportlogController extends Hrd_Models_App_Template_AbstractMasterController {
    
    
    public function _getMainDataModel() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Box_Models_App_DataListCreator('', 'hcreportlog', array(), array()));
        $dm->setObject(new Hrd_Models_Master_Hcreportlog());
        $dm->setDao(new Hrd_Models_Master_HcreportlogDao());
        $dm->setValidator(new Hrd_Models_Master_HcreportlogValidator());
        $dm->setIdProperty("log_hcreport_id");
        return $dm;
        
    }
}

?>
