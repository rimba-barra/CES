<?php

/**
 * Description of DepartmentController
 *
 * @author MIS
 */
class Hrd_MasterkategoriskController extends Hrd_Models_App_Template_AbstractMasterController {

    public function _getMainDataModel() {

        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Box_Models_App_DataListCreator('', 'masterkategorisk', array(), array()));
        $dm->setObject(new Hrd_Models_Master_Kategorisk_MasterKategoriSK());
        $dm->setDao(new Hrd_Models_Master_Kategorisk_Dao());
        $dm->setValidator(new Hrd_Models_Master_Kategorisk_Validator());
        $dm->setIdProperty("masterkategorisk_id");
        return $dm;
    }
}

?>
