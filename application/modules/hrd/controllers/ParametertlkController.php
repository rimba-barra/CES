<?php

/**
 * Description of DepartmentController
 *
 * @author MIS
 */
class Hrd_ParametertlkController extends Hrd_Models_App_Template_AbstractMasterController {
    
    
    public function _getMainDataModel() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Box_Models_App_DataListCreator('', 'parametertlk', array(), array()));
        $dm->setObject(new Hrd_Models_Parameters_Tlk_Tlk());
        $dm->setDao(new Hrd_Models_Parameters_Tlk_Dao());
        $dm->setValidator(new Hrd_Models_Parameters_Tlk_Validator());
        $dm->setIdProperty("parametertlk_id");
        return $dm;
        
    } 
}

?>
