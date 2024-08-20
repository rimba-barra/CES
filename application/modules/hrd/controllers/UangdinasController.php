<?php

/**
 * Description of AbsentrecordController
 *
 * @author MIS
 */
class Hrd_UangdinasController extends Box_Models_App_Hermes_AbstractController {

    protected function testingFlag() {
        return FALSE;
    }

    public function allRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'uangdinas', array('mastersk'),array("details","deletedRows"));
        $dao = new Hrd_Models_Dinas_UangDinasDao();
        $header = new Hrd_Models_Dinas_UangDinas();

        //$this->setArrayTable($leave,$this->getAppData());
        $header->setArrayTable($this->getAppData());
        $header->setProject($this->getAppSession()->getProject());
        $header->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAll($this->getAppRequest(), $header);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    
   
    
    
    

    
    
    
    public function detailRead(){
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'uangdinasdetail', array('group','negaratujuan','currency'), array());
        $data = $this->getAppData();
        $dao = new Hrd_Models_Dinas_UangDinasDao();

        $hasil = $dao->getDetailsWOPL(intval($data["uangdinas_id"]));
      
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    
    public function parameterRead(){
        
        $ma = new Hrd_Models_App_Mastertable_Group();
        $aa = $ma->prosesDataWithSession($this->getAppSession(), TRUE);
        
        ///// negara tujuan
        $dnt = new Hrd_Models_Dinas_NegaraTujuanDao();
        $nt = new Hrd_Models_Dinas_NegaraTujuan();
        $nt->setProject($this->getAppSession()->getProject());
        $nt->setPt($this->getAppSession()->getPt());
        $hnt = $dnt->getAllWOPL($nt);
        $hnt = Box_Tools::toObjectResult($hnt,new Hrd_Models_Dinas_NegaraTujuan());
     
   
        // mastersk 
        $dms = new Hrd_Models_Master_Sk_Dao();
        $ms = new Hrd_Models_Master_Sk_MasterSK();
        $ms->setProject($this->getAppSession()->getProject());
        $ms->setPt($this->getAppSession()->getPt());
        $hms = $dms->getAllWoPL($ms);
        $hms = Box_Tools::toObjectResult($hms,new Hrd_Models_Master_Sk_MasterSK());
        
        //currency 
        $dcr = new Hrd_Models_General_Dao();
        $cr = $dcr->getAllCurrency();
        $cr = Box_Tools::toObjectResult($cr, new Hrd_Models_Master_General_Currency());
     
        
        $hasil = TRUE;
        
        $arrayRespon = array(
            "HASIL" => $hasil);
        return Box_Tools::instantRead($arrayRespon, array($aa,$hnt,$hms,$cr));
    }

    

    public function mainCreate() {
   
        $dm = new Box_Models_App_Hermes_DataModel();
        $obj = new Hrd_Models_Dinas_UangDinas();
       
        $dm->setDao(new Hrd_Models_Dinas_UangDinasDao());
        $dm->setValidator(new Hrd_Models_Dinas_UangDinasValidator());
        $dm->setObject($obj);

        return $dm;
    }
    
    
    public function deleteRead(){
         $data = $this->getAppData();
         $dao = new Hrd_Models_Dinas_UangDinasDao();
         
         
         $success = $dao->deleteOne($data["id"],$this->getAppSession()->getUser()->getId());
         
        return Box_Tools::instantRead(array(
                "SUCCESS" => $success
        ));
    }
  
    
   

    protected function getDefaultProcessor() {
        return new Hrd_Models_App_Box_UangDinas();
    }
    
    

}

?>
