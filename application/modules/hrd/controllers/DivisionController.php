<?php

/**
 * Description of DepartmentController
 *
 * @author MIS
 */
class Hrd_DivisionController extends Hrd_Models_App_Template_AbstractMasterController {
    
    
    public function _getMainDataModel() {
       
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Box_Models_App_DataListCreator('', 'division', array(), array()));
        $dm->setObject(new Hrd_Models_Master_Division());
        $dm->setDao(new Hrd_Models_Master_DivisionDao());
        $dm->setValidator(new Hrd_Models_Master_DivisionValidator());
        $dm->setIdProperty("division_id");
        return $dm;
        
    }
    
     
    
    
}

?>
