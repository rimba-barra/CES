<?php

/**
 * Description of DepartmentController
 *
 * @author MIS
 */
class Hrd_PositionController extends Hrd_Models_App_Template_AbstractMasterController {
    
    
    public function _getMainDataModel() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Box_Models_App_DataListCreator('', 'position', array(), array()));
        $dm->setObject(new Hrd_Models_Master_Position());
        $dm->setDao(new Hrd_Models_Master_PositionDao());
        $dm->setValidator(new Hrd_Models_Master_PositionValidator());
        $dm->setIdProperty("position_id");
        return $dm;
        
    } 
}

?>
