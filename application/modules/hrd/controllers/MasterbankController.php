<?php

/**
 * Description of DepartmentController
 *
 * @author MIS
 */
class Hrd_MasterbankController extends Hrd_Models_App_Template_AbstractMasterController {
    
    
    public function _getMainDataModel() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Box_Models_App_DataListCreator('', 'bank', array(), array()));
        $dm->setObject(new Hrd_Models_Payroll_Bank_Bank());
        $dm->setDao(new Hrd_Models_Payroll_Bank_Dao());
        $dm->setValidator(new Hrd_Models_Payroll_Bank_Validator());
        $dm->setIdProperty("bank_id");
        return $dm;
        
    } 
}

?>
