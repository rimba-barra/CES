<?php

/**
 * Description of DepartmentController
 *
 * @author MIS
 */
class Hrd_AbsenttypeController extends Hrd_Models_App_Template_AbstractMasterController {
    
 
    public function _getMainDataModel() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Box_Models_App_DataListCreator('', 'absenttype', array('absenttypegroup'), array()));
        $dm->setObject(new Hrd_Models_Master_AbsentType());
        $dm->setDao(new Hrd_Models_Master_AbsentTypeDao());
        $dm->setValidator(new Hrd_Models_Master_AbsentTypeValidator());
        $dm->setIdProperty("absenttype_id");
        return $dm;
        
    } 
}

?>
