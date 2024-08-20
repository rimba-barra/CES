<?php

/**
 * Description of DepartmentController
 *
 * @author MIS
 */
class Hrd_PolashiftController extends Hrd_Models_App_Template_AbstractMasterController {
    
    
    public function _getMainDataModel() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Box_Models_App_DataListCreator('', 'polashift', array(), array()));
        $dm->setObject(new Hrd_Models_Shift_Pola());
        $dm->setDao(new Hrd_Models_Shift_PolaDao());
        $dm->setValidator(new Hrd_Models_Shift_PolaValidator());
        $dm->setIdProperty("polashift_id");
        return $dm;
        
    } 
}

?>
