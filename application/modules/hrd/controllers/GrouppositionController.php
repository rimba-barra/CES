<?php

/**
 * Description of DepartmentController
 *
 * @author MIS
 */
class Hrd_GrouppositionController extends Hrd_Models_App_Template_AbstractMasterController {
    
    
    public function _getMainDataModel() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Box_Models_App_DataListCreator('', 'groupposition', array(), array()));
        $dm->setObject(new Hrd_Models_Master_GroupPosition());
        $dm->setDao(new Hrd_Models_Master_GroupPositionDao());
        $dm->setValidator(new Hrd_Models_Master_GroupPositionValidator());
        $dm->setIdProperty("groupposition_id");
        return $dm;
        
    } 
}

?>
