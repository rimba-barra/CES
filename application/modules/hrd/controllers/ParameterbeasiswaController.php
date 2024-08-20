<?php

/**
 * Description of DepartmentController
 *
 * @author MIS
 */
class Hrd_ParameterbeasiswaController extends Hrd_Models_App_Template_AbstractMasterController {
    
    
    public function _getMainDataModel() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Box_Models_App_DataListCreator('', 'parameterbeasiswa', array(), array()));
        $dm->setObject(new Hrd_Models_Beasiswa_Parameter());
        $dm->setDao(new Hrd_Models_Beasiswa_Dao());
        $dm->setValidator(new Hrd_Models_Beasiswa_Validator());
        $dm->setIdProperty("parameterbeasiswa_id");
        return $dm;
        
    } 
}

?>
