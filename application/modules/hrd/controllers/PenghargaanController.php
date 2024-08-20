<?php

/**
 * Description of AbsentrecordController
 *
 * @author MIS
 */
class Hrd_PenghargaanController extends Box_Models_App_Hermes_AbstractController {

    protected function testingFlag() {
        return FALSE;
    }

    public function allRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'penghargaan', array('employee','jenispenghargaan'),array());
        $dao = new Hrd_Models_Penghargaan_TransaksiDao();
        $header = new Hrd_Models_Penghargaan_Transaksi();
        $header->setArrayTable($this->getAppData());
        $header->setProject($this->getAppSession()->getProject());
        $header->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAll($this->getAppRequest(), $header);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    
   
    
    
    
    
    public function parameterRead(){
        
    
     
   
        /// employee
        $ed = new Hrd_Models_Master_EmployeeDao();
        $em = new Hrd_Models_Master_EmployeePersonal();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $eh = $ed->getAllEPJustActiveWOPL($em);
        $eh = Box_Tools::toObjectResult($eh,new Hrd_Models_Master_EmployeePersonal());
        
        
        // jenis penghargaan
        $jd = new Hrd_Models_General_Dao();
        $hh = $jd->getAllJenisPenghargaan();
        $hh = Box_Tools::toObjectResult($hh,new Hrd_Models_Penghargaan_Jenis());
      
     
        
        $hasil = TRUE;
        
        $arrayRespon = array(
            "HASIL" => $hasil);
        return Box_Tools::instantRead($arrayRespon, array($eh,$hh));
    }

    

    public function mainCreate() {
   
        $dm = new Box_Models_App_Hermes_DataModel();
        $obj = new Hrd_Models_Penghargaan_Transaksi();
       
        $dm->setDao(new Hrd_Models_Penghargaan_TransaksiDao());
        $dm->setValidator(new Hrd_Models_Penghargaan_TransaksiValidator());
        $dm->setObject($obj);

        return $dm;
    }
    
    
    public function deleteRead(){
         $data = $this->getAppData();
         $dao = new Hrd_Models_Penghargaan_TransaksiDao();
         
         
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
