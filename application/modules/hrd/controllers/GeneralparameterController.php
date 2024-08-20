<?php

/**
 * Description of DepartmentController
 *
 * @author MIS
 */
class Hrd_GeneralparameterController extends Hrd_Models_App_Template_AbstractMasterController {
   
    protected function testingFlag() {
        return FALSE;
    }
    
    public function _getMainDataModel() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Box_Models_App_DataListCreator('', 'generalparameter', array(), array()));
        $dm->setObject(new Hrd_Models_Master_GeneralParameter());
        $dm->setDao(new Hrd_Models_Master_GeneralParameterDao());
        $dm->setValidator(new Hrd_Models_Master_GeneralParameterValidator());
        $dm->setIdProperty("generalparameter_id");
        return $dm;
        
    } 
    
    
    public function modulelistRead() {
  
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'generalparameter', array(), array());
        $dao = new Hrd_Models_Master_GeneralParameterDao();
       
    
        $dm->setDataList($dataList);
        $dm->setHasil($dao->getModuleList());
        return $dm;
    }
}

?>
