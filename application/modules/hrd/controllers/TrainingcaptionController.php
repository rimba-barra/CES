<?php

/**
 * Description of DepartmentController
 *
 * @author MIS
 */
class Hrd_TrainingcaptionController extends Hrd_Models_App_Template_AbstractMasterController {

    public function _getMainDataModel() {

        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Box_Models_App_DataListCreator('', 'trainingcaption', array(), array()));
        $dm->setObject(new Hrd_Models_Training_Trainingcaption_Trainingcaption());
        $dm->setDao(new Hrd_Models_Training_Trainingcaption_Dao());
        $dm->setValidator(new Hrd_Models_Training_Trainingcaption_Validator());
        $dm->setIdProperty("trainingcaption_id");
        return $dm;
    }
}

?>
