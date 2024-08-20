<?php

/**
 * Description of DepartmentController
 *
 * @author MIS
 */
class Hrd_NegaratujuanController extends Hrd_Models_App_Template_AbstractMasterController {

    public function _getMainDataModel() {

        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Box_Models_App_DataListCreator('', 'negaratujuan', array(), array()));
        $dm->setObject(new Hrd_Models_Dinas_NegaraTujuan());
        $dm->setDao(new Hrd_Models_Dinas_NegaraTujuanDao());
        $dm->setValidator(new Hrd_Models_Dinas_NegaraTujuanValidator());
        $dm->setIdProperty("negaratujuan_id");
        return $dm;
    }

   

}

?>
