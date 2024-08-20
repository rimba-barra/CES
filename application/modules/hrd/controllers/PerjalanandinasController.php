<?php

/**
 * Description of AbsentrecordController
 *
 * @author MIS
 */
class Hrd_PerjalanandinasController extends Box_Models_App_Hermes_AbstractController {

    protected function testingFlag() {
        return FALSE;
    }

    public function allRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'perjalanandinas', array('employee','department','position','group'),array());
        $dao = new Hrd_Models_Dinas_PerjalananDinasDao();
        $header = new Hrd_Models_Dinas_PerjalananDinas();

        //$this->setArrayTable($leave,$this->getAppData());
        $header->setArrayTable($this->getAppData());
        $header->setProject($this->getAppSession()->getProject());
        $header->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAll($this->getAppRequest(), $header);
        //$hasil = $dao->getAll($this->getAppRequest(), $header);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    
    public function employeeRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'employee', array('department','group','marriagestatus','position'), array());
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
    
    
    public function detailRead(){
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'uangdinasdetail', array('group','negaratujuan'), array());
        $data = $this->getAppData();
        $dao = new Hrd_Models_Dinas_UangDinasDao();

        $hasil = $dao->getDetailsWOPL(intval($data["uangdinas_id"]));
      
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    
    public function uangdinasRead(){
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'uangdinasdetail', array('currency'), array());
        $data = $this->getAppData();
         $dud = new Hrd_Models_Dinas_UangDinasDao();
        $hud = $dud->getDetailsWOPLProjectPtDefault($this->getAppSession()->getProject()->getId(),$this->getAppSession()->getPt()->getId());
     
      
        $dm->setDataList($dataList);
        $dm->setHasil($hud);
        return $dm;
    }
    
    public function jumlahtransaksipertahunRead(){
        
        $dao = new Hrd_Models_Dinas_PerjalananDinasDao();
        $year = 2016;
        $data = $this->getAppData();
        $tgl = $data["date"];
        $tgl = explode(" ",$tgl);
        $tgl = $tgl[0];
      
 
        $date = DateTime::createFromFormat("Y-m-d",$tgl);
        $tahun =  $date->format("Y");
        
        $hasil = $dao->getJumlah($tahun,$this->getAppSession()->getProject()->getId(),$this->getAppSession()->getPt()->getId());
        
        $hasil = Box_Tools::toObjectRow($hasil,new Hrd_Models_Dinas_PerjalananDinas());
        $jumlah = intval($hasil->getNomor()); /// jumlah transaksi selama setahun.
      
        
       
        $arrayRespon = array(
            "JUMLAH" => $jumlah);
        return Box_Tools::instantRead($arrayRespon);
    }
    
    public function parameterRead(){
        
      //  $ma = new Hrd_Models_App_Mastertable_Group();
      //  $aa = $ma->prosesDataWithSession($this->getAppSession(), TRUE);
        
        ///// negara tujuan
        $dnt = new Hrd_Models_Dinas_NegaraTujuanDao();
        $nt = new Hrd_Models_Dinas_NegaraTujuan();
        $nt->setProject($this->getAppSession()->getProject());
        $nt->setPt($this->getAppSession()->getPt());
        $hnt = $dnt->getAllWOPL($nt);
        $hnt = Box_Tools::toObjectResult($hnt,new Hrd_Models_Dinas_NegaraTujuan());
     
   
        /// employee
        $ed = new Hrd_Models_Master_EmployeeDao();
        $em = new Hrd_Models_Master_EmployeePersonal();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $eh = $ed->getAllEPJustActiveWOPL($em);
        $eh = Box_Tools::toObjectResult($eh,new Hrd_Models_Master_EmployeePersonal());
        
        
        $md = new Hrd_Models_App_Mastertable_Project();
        $dd = $md->prosesDataWithSession($this->getAppSession(), TRUE);
        
        
        /// uang dinas
       // $dud = new Hrd_Models_Dinas_UangDinasDao();
       // $hud = $dud->getDetailsWOPLProjectPt($this->getAppSession()->getProject()->getId(),$this->getAppSession()->getPt()->getId());
     
       
       // $hud = Box_Tools::toObjectResult($hud, new Hrd_Models_Dinas_UangDinasDetail(),array(new Hrd_Models_Master_General_Currency()));
        
        
        
        //currency 
        $dcr = new Hrd_Models_General_Dao();
        $cr = $dcr->getAllCurrency();
        $cr = Box_Tools::toObjectResult($cr, new Hrd_Models_Master_General_Currency());
      
     
        
        $hasil = TRUE;
        
        $arrayRespon = array(
            "HASIL" => $hasil);
        return Box_Tools::instantRead($arrayRespon, array($hnt,$eh,$dd,$cr));
    }

    

    public function mainCreate() {
   
        $dm = new Box_Models_App_Hermes_DataModel();
        $obj = new Hrd_Models_Dinas_PerjalananDinas();
       
        $dm->setDao(new Hrd_Models_Dinas_PerjalananDinasDao());
        $dm->setValidator(new Hrd_Models_Dinas_PerjalananDinasValidator());
        $dm->setObject($obj);

        return $dm;
    }
    
    
    public function deleteRead(){
         $data = $this->getAppData();
         $dao = new Hrd_Models_Dinas_PerjalananDinasDao();
         
         
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
