<?php

/**
 * Description of DepartmentController
 *
 * @author MIS
 */
class Hrd_SanctiontypeController extends Hrd_Models_App_Template_AbstractMasterController {
    
    
    public function _getMainDataModel() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Box_Models_App_DataListCreator('', 'sanctiontype', array(), array()));
        $dm->setObject(new Hrd_Models_Master_SanctionType());
        $dm->setDao(new Hrd_Models_Master_SanctionTypeDao());
        $dm->setValidator(new Hrd_Models_Master_SanctionTypeValidator());
        $dm->setIdProperty("sanctiontype_id");
        return $dm;
        
    } 
}

?>
