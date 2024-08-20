<?php

/**
 * Description of DepartmentController
 *
 * @author MIS
 */
class Hrd_TipetandakasihController extends Hrd_Models_App_Template_AbstractMasterController {
    
    
    public function _getMainDataModel() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Box_Models_App_DataListCreator('', 'tipetandakasih', array(), array()));
        $dm->setObject(new Hrd_Models_Tandakasih_Tipe());
        $dm->setDao(new Hrd_Models_Tandakasih_TipeDao());
        $dm->setValidator(new Hrd_Models_Tandakasih_TipeValidator());
        $dm->setIdProperty("tipetandakasih_id");
        return $dm;
        
    } 
}

?>
