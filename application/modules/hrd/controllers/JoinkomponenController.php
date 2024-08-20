<?php

/**
 * Description of AbsentrecordController
 *
 * @author MIS
 */
class Hrd_JoinkomponenController extends Box_Models_App_Hermes_AbstractController {

    protected function testingFlag() {
        return FALSE;
    }

    public function allRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'joinkomponen', array(array('komponengaji','master_'),array('komponengaji','ka_'),
            array('komponengaji','kb_'),array('komponengaji','kc_'),array('komponengaji','kd_'),array('komponengaji','ke_')));
        $dao = new Hrd_Models_Payroll_Join_Dao();
        $header = new Hrd_Models_Payroll_Join_Join();

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
         $dao = new Hrd_Models_Payroll_Join_Dao();
         $success = $dao->deleteOne($data["id"],$this->getAppSession()->getUser()->getId());
         
        return Box_Tools::instantRead(array(
                "SUCCESS" => $success
        ));
    }
    
    public function parameterRead(){
        
        /// get paramater
        $ma = new Hrd_Models_App_Mastertable_KomponenGaji();
        $aa = $ma->prosesDataWithSession($this->getAppSession(), TRUE);
        
        
        
        return Box_Tools::instantRead(array(
            "HASIL"=>1
        ),array(
            $aa
            
        ));
    }
    
    


    

    public function mainCreate() {
   
        $dm = new Box_Models_App_Hermes_DataModel();
        $obj = new Hrd_Models_Payroll_Join_Join();
       
        $dm->setDao(new Hrd_Models_Payroll_Join_Dao());
        $dm->setValidator(new Hrd_Models_Payroll_Join_Validator());
        $dm->setObject($obj);

        return $dm;
    }
    
    

    
  
    
   

    protected function getDefaultProcessor() {
        return new Hrd_Models_App_Box_Processor();
    }
    
    

}

?>
