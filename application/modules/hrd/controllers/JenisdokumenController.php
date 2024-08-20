<?php

/**
 * Description of DepartmentController
 *
 * @author MIS
 */
class Hrd_JenisdokumenController extends Hrd_Models_App_Template_AbstractMasterController {

    public function _getMainDataModel() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Box_Models_App_DataListCreator('', 'jenisdokumen', array(), array()));
        $dm->setObject(new Hrd_Models_Master_Jenisdokumen());
        $dm->setDao(new Hrd_Models_Master_JenisdokumenDao());
        $dm->setValidator(new Hrd_Models_Master_JenisdokumenValidator());
        $dm->setIdProperty("jenisdocument_id");
        //$data = $this->getAppData(); 
        //PRINT_R($data);
        return $dm;
    }

}

?>
