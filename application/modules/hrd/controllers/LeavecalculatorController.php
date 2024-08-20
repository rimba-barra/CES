<?php

/**
 * Description of LeavecalculatorController
 *
 * @author MIS
 */
class Hrd_LeavecalculatorController extends Box_Models_App_Hermes_AbstractController {

    protected function testingFlag() {
        return FALSE;
    }

    public function allRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'overtimeheader', array('employee'), array('overtimes'));
        $dao = new Hrd_Models_Overtime_Dao();
        $header = new Hrd_Models_Overtime_Header();

        //$this->setArrayTable($leave,$this->getAppData());
        $header->setArrayTable($this->getAppData());
        $header->setProject($this->getAppSession()->getProject());
        $header->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAll($this->getAppRequest(), $header);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function lookemployeeRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'employeepersonal', array('department'), array());
        $dao = new Hrd_Models_Master_EmployeeDao();
        $obj = new Hrd_Models_Master_Employee();

        //$this->setArrayTable($leave,$this->getAppData());
        $this->setArrayTable($obj, $this->getAppData());
        $obj->setProject($this->getAppSession()->getProject());
        $obj->setPt($this->getAppSession()->getPt());
        $hasil = $dao->lookupemployee($obj);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function initRead() {

        $ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');

        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
        $pt = $this->getAppSession()->getPt();
        $project = $this->getAppSession()->getProject();

        // company profile 
        $genDao = new Hrd_Models_Master_GeneralDao();
        $company = $genDao->getCompanyProfile($this->getAppSession()->getProject(), $this->getAppSession()->getPt());

        $pt = new Box_Models_Master_Pt();
        $project = new Box_Models_Master_Project();
        $pt->setArrayTable($company[1][0]);
        $project->setArrayTable($company[0][0]);

        /// employee list
        $dao = new Hrd_Models_Master_EmployeeDao();
        $employeeFilter = new Hrd_Models_Master_EmployeePersonal();
        $employeeFilter->setProject($this->getAppSession()->getProject());
        $employeeFilter->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAllEPJustActiveWOPL($employeeFilter);

        $allEmployee = array();
        foreach ($hasil[1] as $record) {
            $employee = new Hrd_Models_Employee_Employee();
            $record = preg_replace('/[^\da-z ]/i', '', $record); //edit by wulan sari 20190311, untuk remove special char yang kadang bikin error
            $employee->setArrayTable($record);
            $allEmployee[] = $employee;
        }


        /// category list
        $dao = new Hrd_Models_Master_GroupDao();
        $groupFilter = new Hrd_Models_Master_Group();
        $groupFilter->setProject($this->getAppSession()->getProject());
        $groupFilter->setPt($this->getAppSession()->getPt());

        $hasil = $dao->getAllWoF($groupFilter);

        $allCategories = array();
        foreach ($hasil[1] as $record) {

            $category = new Hrd_Models_Master_Group();
            $category->setArrayTable($record);
            $allCategories[] = $category;
        }

        $dm->setHasil(array($pt, $project, $allCategories, $allEmployee));

        return $dm;
    }

    protected function getDefaultProcessor() {
        return new Hrd_Models_App_Box_ReportProcessor();
    }
        
    public function employeedataRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
        $params = $this->getAppData();
        
        $dao = new Hrd_Models_Master_EmployeeDao();
        $hasil = $dao->getEmployeesaldocuti($params["employee_id"]);
        $dm->setHasil(array($hasil));
        
        return $dm;
    }
        
    public function hitungRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
        $params = $this->getAppData();
        
        $dao = new Hrd_Models_Master_EmployeeDao();
        
        // $hasil = $dao->getHitungcuti($params);

        //added by anas 24102023
        $data = array();
        $data["hasil"] = $dao->getHitungcuti($params);
        $data["detail"] = $dao->getHitungcuti_detail($params);
        //end added by anas

        $dm->setHasil(array($data));
        
        return $dm;
    }
    
}

?>
