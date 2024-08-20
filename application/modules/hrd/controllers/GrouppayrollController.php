<?php

/**
 * Description of DepartmentController
 *
 * @author MIS
 */
class Hrd_GrouppayrollController extends Hrd_Models_App_Template_AbstractMasterController {
    
    
    public function _getMainDataModel() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Box_Models_App_DataListCreator('', 'grouppayroll', array(), array()));
        $dm->setObject(new Hrd_Models_Master_GroupPayroll());
        $dm->setDao(new Hrd_Models_Master_GroupPayrollDao());
        $dm->setValidator(new Hrd_Models_Master_GroupPayrollValidator());
        $dm->setIdProperty("grouppayroll_id");
        return $dm;
        
    } 
}

?>
