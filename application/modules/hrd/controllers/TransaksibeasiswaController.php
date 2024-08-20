<?php

/**
 * Description of AbsentrecordController
 *
 * @author MIS
 */
class Hrd_TransaksibeasiswaController extends Box_Models_App_Hermes_AbstractController {

    protected function testingFlag() {
        return FALSE;
    }

    public function allRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'beasiswatran', array('employee'));
        $dao = new Hrd_Models_Beasiswa_TransaksiDao();
        $header = new Hrd_Models_Beasiswa_Transaksi();

        //$this->setArrayTable($leave,$this->getAppData());
        $header->setArrayTable($this->getAppData());
        $header->setProject($this->getAppSession()->getProject());
        $header->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAll($this->getAppRequest(), $header);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    
   
    
    public function childRead(){
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'child', array('education'),array());
        $dao = new Hrd_Models_Master_RelationDao();
        $child = new Hrd_Models_Master_Child();
        $data = $this->getAppData();
        $employee = new Hrd_Models_Master_Employee();
        $employee->setArrayTable($this->getAppData());
     //   $payment->setArrayTable($this->getAppData());
        $hasil = $dao->getAll($this->getAppRequest(),$employee->getId(), $child);
      
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
      
        return $dm;
    }
    
    
    public function moduleRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'beasiswatran', array('employee','child'));
        $dao = new Hrd_Models_Beasiswa_TransaksiDao();
        $header = new Hrd_Models_Beasiswa_Transaksi();

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
        $dataList = new Box_Models_App_DataListCreator('', 'employee', array('department'), array());
        $dao = new Hrd_Models_Master_EmployeeDao();
        $employee = new Hrd_Models_Master_EmployeePersonal();
        //$employee->setArrayTable($this->getAppData());
        $this->setArrayTable($employee, $this->getAppData());

        $employee->setProject($this->getAppSession()->getProject());
        $employee->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAllEPJustActiveWOPL($employee);
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

    

    public function mainCreate() {
   
        $dm = new Box_Models_App_Hermes_DataModel();
        $obj = new Hrd_Models_Beasiswa_Transaksi();
       
        $dm->setDao(new Hrd_Models_Beasiswa_TransaksiDao());
        $dm->setValidator(new Hrd_Models_Beasiswa_TransaksiValidator());
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
         $dao = new Hrd_Models_Beasiswa_TransaksiDao();
         $success = $dao->deleteOne($data["id"],$this->getAppSession()->getUser()->getId());
         
        return Box_Tools::instantRead(array(
                "SUCCESS" => $success
        ));
    }
    
    public function parameterRead(){
         $data = $this->getAppData();
        
         $ma = new Hrd_Models_App_Mastertable_JenjangPendidikan();
        $aa = $ma->prosesDataWithSession($this->getAppSession(), TRUE);
         
        return Box_Tools::instantRead(array(
            
        ),array($aa));
    }
    
    
  
    
   

    protected function getDefaultProcessor() {
        return new Hrd_Models_App_Box_Processor();
    }
    
    

}

?>
