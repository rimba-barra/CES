<?php

/**
 * Description of DepartmentController
 *
 * @author MIS
 */
class Hrd_DepartmentController extends Hrd_Models_App_Template_AbstractMasterController {
    
    
    public function _getMainDataModel() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Box_Models_App_DataListCreator('', 'department', array(), array()));
        $dm->setObject(new Hrd_Models_Master_Department());
        $dm->setDao(new Hrd_Models_Master_DepartmentDao());
        $dm->setValidator(new Hrd_Models_Master_DepartmentValidator());
        $dm->setIdProperty("department_id");
        return $dm;
        
    }
    
    public function detailRead() {
        
        $em = new Hrd_Models_Employee_Employee();
        $em->setProject($this->getAppSession()->getProject());
        $em->SetPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Master_EmployeeDao();
        $allEmplyoee = $dao->getAllEPJustActiveWOPL($em);
        if(Box_Tools::adaRecord($allEmplyoee)){
            $allEmplyoee = Box_Tools::toObjectsb("employeeb", $allEmplyoee,FALSE);
        }
        return Box_Tools::instantRead(array(), array($allEmplyoee));

    }
}

?>
