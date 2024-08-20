<?php

/**
 * Description of DepartmentController
 *
 * @author MIS
 */
class Hrd_ParameteruangsakuController extends Hrd_Models_App_Template_AbstractMasterController {
    
    
    public function _getMainDataModel() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Box_Models_App_DataListCreator('', 'parameteruang', array('group'), array()));
        $dm->setObject(new Hrd_Models_Dinas_ParameterUang());
        $dm->setDao(new Hrd_Models_Dinas_Dao());
        $dm->setValidator(new Hrd_Models_Dinas_Validator());
        $dm->setIdProperty("parameteruangsaku_id");
        return $dm;
        
    } 
    
    public function detailRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
        
      

        
        $masterG = new Hrd_Models_App_Mastertable_Group();
        $allG = $masterG->prosesDataWithSession($this->getAppSession(), TRUE);
        
       

        $dm->setHasil(array($allG));
        
        
        return $dm;
    }
}

?>
