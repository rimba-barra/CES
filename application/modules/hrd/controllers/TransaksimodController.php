<?php

/**
 * Description of AbsentrecordController
 *
 * @author MIS
 */
class Hrd_TransaksimodController extends Box_Models_App_Hermes_AbstractController {

    protected function testingFlag() {
        return FALSE;
    }

    public function allRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'mod', array('employee','karyawanmod'),array());
        $dao = new Hrd_Models_Mod_ModDao();
        $header = new Hrd_Models_Mod_Mod();

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
         $dao = new Hrd_Models_Mod_ModDao();
         $success = $dao->deleteOne($data["id"],$this->getAppSession()->getUser()->getId());
         
        return Box_Tools::instantRead(array(
                "SUCCESS" => $success
        ));
    }
    
   
    
    

    public function karyawanmodRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'karyawanmod', array('employee'), array());
        $dao = new Hrd_Models_Mod_KaryawanDao();
        $employee = new Hrd_Models_Mod_Karyawan();
        //$employee->setArrayTable($this->getAppData());
        $this->setArrayTable($employee, $this->getAppData());

        $employee->setProject($this->getAppSession()->getProject());
        $employee->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAll($this->getAppRequest(), $employee);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    
    public function parameterRead(){
        
        $ma = new Hrd_Models_App_Mastertable_TipePinjaman();
        $aa = $ma->prosesDataWithSession($this->getAppSession(), TRUE);
        $hasil = TRUE;
        
        $arrayRespon = array(
            "HASIL" => $hasil);
        return Box_Tools::instantRead($arrayRespon, array($aa));
    }
    
    /*
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
     
     */

    

    public function mainCreate() {
   
        $dm = new Box_Models_App_Hermes_DataModel();
        $obj = new Hrd_Models_Mod_Mod();
       
        $dm->setDao(new Hrd_Models_Mod_ModDao());
        $dm->setValidator(new Hrd_Models_Mod_ModValidator());
        $dm->setObject($obj);

        return $dm;
    }
    
    
    /*
    public function mainDelete() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setObject(new Hrd_Models_Overtime_Header());
        $dm->setDao(new Hrd_Models_Overtime_Dao());
        $dm->setIdProperty("overtimeheader_id");
        return $dm;
    }
    */
  
    
   

    protected function getDefaultProcessor() {
        return new Hrd_Models_App_Box_Processor();
    }
    
    

}

?>
