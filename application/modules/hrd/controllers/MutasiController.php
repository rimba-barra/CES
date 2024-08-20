<?php

/**
 * Description of AbsentrecordController
 *
 * @author MIS
 */
class Hrd_MutasiController extends Box_Models_App_Hermes_AbstractController {

    protected function testingFlag() {
        return FALSE;
    }

    public function allRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'mutasi', array('employee','position','department','group'));
        $dao = new Hrd_Models_Changestatus_Dao();
        $header = new Hrd_Models_Changestatus_Mutasi();

        //$this->setArrayTable($leave,$this->getAppData());
        $header->setArrayTable($this->getAppData());
        $header->setProject($this->getAppSession()->getProject());
        $header->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAll($this->getAppRequest(), $header);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    
    
    
     public function deleteRead(){
         $data = $this->getAppData();
         $dao = new Hrd_Models_Changestatus_Dao();
         $success = $dao->deleteOne($data["id"],$this->getAppSession()->getUser()->getId());
         
        return Box_Tools::instantRead(array(
                "SUCCESS" => $success
        ));
    }
    
    public function parameterRead(){
        
        $md = new Hrd_Models_App_Mastertable_Project();
        $dd = $md->prosesDataWithSession($this->getAppSession(), TRUE);
 
        $ma = new Hrd_Models_App_Mastertable_Group();
        $aa = $ma->prosesDataWithSession($this->getAppSession(), TRUE);
        
        $mb = new Hrd_Models_App_Mastertable_Position();
        $bb = $mb->prosesDataWithSession($this->getAppSession(), TRUE);
        
        $mc = new Hrd_Models_App_Mastertable_Department();
        $mc->setRequest($this->getAppRequest());
        $cc = $mc->prosesDataWithSession($this->getAppSession(), TRUE);
        
        $mab = new Hrd_Models_App_Mastertable_AlokasiBiaya();
        $maba = $mab->prosesDataWithSession($this->getAppSession(), TRUE);
        
        return Box_Tools::instantRead(array(
            "HASIL"=>1
        ),array($aa,$bb,$cc,$dd,$maba));
    }
    
   

    public function employeeRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'employee', array('department','group','position'), array());
        $dao = new Hrd_Models_Master_EmployeeDao();
        $employee = new Hrd_Models_Master_EmployeePersonal();
        //$employee->setArrayTable($this->getAppData());
        $this->setArrayTable($employee, $this->getAppData());

        $employee->setProject($this->getAppSession()->getProject());
        $employee->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAllEPJustActive($this->getAppRequest(), $employee);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    

    public function mainCreate() {
   
        $dm = new Box_Models_App_Hermes_DataModel();
        $obj = new Hrd_Models_Changestatus_Mutasi();
       
        $dm->setDao(new Hrd_Models_Changestatus_Dao());
        $dm->setValidator(new Hrd_Models_Changestatus_Validator());
        $dm->setObject($obj);

        return $dm;
    }
    
    
    
  
    
   

    protected function getDefaultProcessor() {
        return new Hrd_Models_App_Box_ChangeStatusProcessor();
    }
    
    

}

?>
