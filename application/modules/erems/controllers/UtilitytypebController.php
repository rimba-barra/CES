<?php

class Erems_UtilitytypebController extends Erems_Models_App_Template_AbstractMasterController {
 
    public function _getMainDataModel() {
        $dao = new Erems_Models_Aftersales_Utilitytype_Dao();
      //  $dao->setSession($this->getAppSession());
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Erems_Box_Models_App_DataListCreator('', 'utilitytype', array(), array()));
        $dm->setObject(new Erems_Models_Aftersales_Utilitytype_UtilityType());
        $dm->setDao($dao);
        $dm->setValidator(new Erems_Models_Aftersales_Utilitytype_Validator());
        $dm->setIdProperty("utilitytype_id");
        return $dm;
        
    } 
    
    

    
}

?>
