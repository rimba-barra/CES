<?php

/**
 * Description of DepartmentController
 *
 * @author MIS
 */
class Hrd_SetnomorsuratdinasController extends Hrd_Models_App_Template_AbstractMasterController {
    
    
    public function _getMainDataModel() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Box_Models_App_DataListCreator('', 'nomorsuratdinas', array(), array()));
        $dm->setObject(new Hrd_Models_Dinas_NomorSurat());
        $dm->setDao(new Hrd_Models_Dinas_NomorSuratDao());
        $dm->setValidator(new Hrd_Models_Dinas_NomorSuratValidator());
        $dm->setIdProperty("nomorsuratdinas_id");
        return $dm;
        
    } 
}

?>
