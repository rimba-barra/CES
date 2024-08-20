<?php

/**
 * Description of DepartmentController
 *
 * @author MIS
 */
class Hrd_RangkingpaController extends Hrd_Models_App_Template_AbstractMasterController {
    
    
    public function _getMainDataModel() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Box_Models_App_DataListCreator('', 'rangkingpa', array(), array()));
        $dm->setObject(new Hrd_Models_Master_RangkingPA());
        $dm->setDao(new Hrd_Models_Master_RangkingPADao());
        $dm->setValidator(new Hrd_Models_Master_RangkingPAValidator());
        $dm->setIdProperty("rangkingpa_id");
        return $dm;
        
    } 
}

?>
