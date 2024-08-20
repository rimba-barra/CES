<?php

/**
 * Description of DepartmentController
 *
 * @author MIS
 */
class Hrd_MtatatertibController extends Hrd_Models_App_Template_AbstractMasterController {

    public function _getMainDataModel() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Box_Models_App_DataListCreator('', 'mtatatertib', array(), array()));
        $dm->setObject(new Hrd_Models_Master_Mtatatertib());
        $dm->setDao(new Hrd_Models_Master_MtatatertibDao());
        $dm->setValidator(new Hrd_Models_Master_MtatatertibValidator());
        $dm->setIdProperty("tatatertib_id");
        //$data = $this->getAppData(); 
        //PRINT_R($data);
        return $dm;
    }

    public function maindataRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Box_Models_App_DataListCreator('', 'mtatatertib', array(), array()));
        $dm->setObject(new Hrd_Models_Master_Mtatatertib());
        $dm->setDao(new Hrd_Models_Master_MtatatertibDao());
        return $dm;
    }

}

?>
