<?php

/**
 * Description of DepartmentController
 *
 * @author MIS
 */
class Hrd_KaryawanmodController extends Hrd_Models_App_Template_AbstractMasterController {
    
    
    public function _getMainDataModel() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Box_Models_App_DataListCreator('', 'karyawanmod', array('employee'), array()));
        $dm->setObject(new Hrd_Models_Mod_Karyawan());
        $dm->setDao(new Hrd_Models_Mod_KaryawanDao());
        $dm->setValidator(new Hrd_Models_Mod_KaryawanValidator());
        $dm->setIdProperty("karyawanmod_id");
        return $dm;
        
    }
    
    
    public function employeeRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'employee', array('department'), array());
        $dao = new Hrd_Models_Master_EmployeeDao();
        $employee = new Hrd_Models_Master_EmployeePersonal();
        //$employee->setArrayTable($this->getAppData());
        $this->setArrayTable($employee, $this->getAppData());

        $employee->setProject($this->getAppSession()->getProject());
        $employee->setPt($this->getAppSession()->getPt());
        //$hasil = $dao->getAllEP($this->getAppRequest(), $employee);
	$hasil = $dao->getAllForMultiplemodule($this->getAppRequest(), $employee);	
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
}

?>
