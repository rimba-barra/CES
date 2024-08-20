<?php

/**
 * Description of DepartmentController
 *
 * @author MIS
 */
class Hrd_ShifttypeController extends Hrd_Models_App_Template_AbstractMasterController {
    
    
    public function _getMainDataModel() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Box_Models_App_DataListCreator('', 'shifttype', array(), array()));
        $dm->setObject(new Hrd_Models_Master_ShiftType());
        $dm->setDao(new Hrd_Models_Master_ShiftTypeDao());
        $dm->setValidator(new Hrd_Models_Master_ShiftTypeValidator());
        $dm->setIdProperty("shifttype_id");
        return $dm;
        
    } 

    public function projectptRead() {
        
        $project_id = $this->getAppSession()->getProjectId();
        $pt_id = $this->getAppSession()->getPtId();
        return Box_Tools::instantRead(array("project_id" => $project_id,"pt_id" => $pt_id), array());

    }
}

?>
