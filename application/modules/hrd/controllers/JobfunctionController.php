<?php

/**
 * Description of DepartmentController
 *
 * @author MIS
 */
class Hrd_JobfunctionController extends Hrd_Models_App_Template_AbstractMasterController {
    
    
    public function _getMainDataModel() {
       
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Box_Models_App_DataListCreator('', 'jobfunction', array(), array()));
        $dm->setObject(new Hrd_Models_Master_JobFunction());
        $dm->setDao(new Hrd_Models_Master_JobFunctionDao());
        $dm->setValidator(new Hrd_Models_Master_JobFunctionValidator());
        $dm->setIdProperty("jobfunction_id");
        return $dm;
        
    }
    
     
    
    
}

?>
