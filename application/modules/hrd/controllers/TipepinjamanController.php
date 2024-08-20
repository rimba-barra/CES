<?php

/**
 * Description of DepartmentController
 *
 * @author MIS
 */
class Hrd_TipepinjamanController extends Hrd_Models_App_Template_AbstractMasterController {
    
    
    public function _getMainDataModel() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Box_Models_App_DataListCreator('', 'tipepinjaman', array(), array()));
        $dm->setObject(new Hrd_Models_Pinjaman_Tipe());
        $dm->setDao(new Hrd_Models_Pinjaman_TipeDao());
        $dm->setValidator(new Hrd_Models_Pinjaman_TipeValidator());
        $dm->setIdProperty("tipepinjaman_id");
        return $dm;
        
    } 
}

?>
