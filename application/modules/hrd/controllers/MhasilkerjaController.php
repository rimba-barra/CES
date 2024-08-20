<?php

/**
 * Description of HasilkerjaController
 *
 * @author MIS
 */
class Hrd_MhasilkerjaController extends Hrd_Models_App_Template_AbstractMasterController {

    public function _getMainDataModel() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Box_Models_App_DataListCreator('', 'mhasilkerja', array(), array()));
        $dm->setObject(new Hrd_Models_Master_Mhasilkerja());
        $dm->setDao(new Hrd_Models_Master_MhasilkerjaDao());
        $dm->setValidator(new Hrd_Models_Master_MhasilkerjaValidator());
        $dm->setIdProperty("hasilkerja_item_id");
        //$data = $this->getAppData(); 
        //PRINT_R($data);
        return $dm;
    }

    public function maindataRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Box_Models_App_DataListCreator('', 'mhasilkerja', array(), array()));
        $dm->setObject(new Hrd_Models_Master_Mhasilkerja());
        $dm->setDao(new Hrd_Models_Master_MhasilkerjaDao());
        return $dm;
    }

}

?>
