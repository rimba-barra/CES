<?php

/**
 * Description of DepartmentController
 *
 * @author MIS
 */
class Hrd_JenispengobatanController extends Hrd_Models_App_Template_AbstractMasterController {
    
    
    public function _getMainDataModel() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Box_Models_App_DataListCreator('', 'jenispengobatan', array(), array()));
        $dm->setObject(new Hrd_Models_Pengobatan_Type());
        $dm->setDao(new Hrd_Models_Pengobatan_TypeDao());
        $dm->setValidator(new Hrd_Models_Pengobatan_TypeValidator());
        $dm->setIdProperty("jenispengobatan_id");
        return $dm;
        
    } 
}

?>
