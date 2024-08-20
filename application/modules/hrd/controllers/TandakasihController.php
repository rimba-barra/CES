<?php

/**
 * Description of AbsentrecordController
 *
 * @author MIS
 */
class Hrd_TandakasihController extends Box_Models_App_Hermes_AbstractController {

    protected function testingFlag() {
        return FALSE;
    }

    public function allRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'tandakasihtran', array('employee','group','employeestatus'));
        $dao = new Hrd_Models_Tandakasih_Dao();
        $header = new Hrd_Models_Tandakasih_TandaKasih();

        //$this->setArrayTable($leave,$this->getAppData());
        $header->setArrayTable($this->getAppData());
        $header->setProject($this->getAppSession()->getProject());
        $header->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAll($this->getAppRequest(), $header);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    
   
    
    
    

    public function employeeRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'employee', array('department','group','employeestatus'), array());
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
    
    
    public function listanggaranRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'anggarantandakasih', array('group'), array());
        $data = $this->getAppData();
      
        $dao = new Hrd_Models_Tandakasih_AnggaranDao();
        $tk = new Hrd_Models_Tandakasih_Anggaran();
        $tk->setProject($this->getAppSession()->getProject());
        $tk->setPt($this->getAppSession()->getPt());
        $tk->getGroup()->setId($data["group_id"]);
        $hasil = $dao->getAnggaran($tk);

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    
    
    public function detailRead(){
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'overtime', array(), array());
        $obj = new Hrd_Models_Overtime_Header();
        $dao = new Hrd_Models_Overtime_Dao();
        $this->setArrayTable($obj,$this->getAppData());
        $hasil = $dao->getOvertimes($this->getAppRequest(),$obj);
      
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    
    public function parameterRead(){
        
        $ma = new Hrd_Models_App_Mastertable_Group();
        $aa = $ma->prosesDataWithSession($this->getAppSession(), TRUE);
        
        $mab = new Hrd_Models_App_Mastertable_TipeTandaKasih();
        $aab = $mab->prosesDataWithSession($this->getAppSession(), TRUE);
        
        
        
        
        $hasil = TRUE;
        
        $arrayRespon = array(
            "HASIL" => $hasil);
        return Box_Tools::instantRead($arrayRespon, array($aa,$aab));
    }

    

    public function mainCreate() {
   
        $dm = new Box_Models_App_Hermes_DataModel();
        $obj = new Hrd_Models_Tandakasih_TandaKasih();
       
        $dm->setDao(new Hrd_Models_Tandakasih_Dao());
        $dm->setValidator(new Hrd_Models_Tandakasih_Validator());
        $dm->setObject($obj);

        return $dm;
    }
    
    /*

    public function mainDelete() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setObject(new Hrd_Models_Overtime_Header());
        $dm->setDao(new Hrd_Models_Overtime_Dao());
        $dm->setIdProperty("tandakasih_id");
        return $dm;
    }
    */
    
    public function deleteRead(){
         $data = $this->getAppData();
         $dao = new Hrd_Models_Tandakasih_Dao();
         $success = $dao->deleteOne($data["id"],$this->getAppSession()->getUser()->getId());
         
        return Box_Tools::instantRead(array(
                "SUCCESS" => $success
        ));
    }
  
    
   

    protected function getDefaultProcessor() {
        return new Hrd_Models_App_Box_Processor();
    }
    
    

}

?>
