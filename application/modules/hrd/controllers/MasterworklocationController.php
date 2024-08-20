<?php

/**
 * Description of DepartmentController
 *
 * @author MIS
 */
class Hrd_MasterworklocationController extends Hrd_Models_App_Template_AbstractMasterController {

    public function _getMainDataModel() {

        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Box_Models_App_DataListCreator('', 'masterworklocation', array(), array()));
        $dm->setObject(new Hrd_Models_Master_Worklocation_MasterWorkLocation());
        $dm->setDao(new Hrd_Models_Master_Worklocation_Dao());
        $dm->setValidator(new Hrd_Models_Master_Worklocation_Validator());
        $dm->setIdProperty("worklocation_id");
        return $dm;
    }
}

?>
