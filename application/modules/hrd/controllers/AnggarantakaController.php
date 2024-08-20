<?php

/**
 * 
 *
 * @author MIS
 */
class Hrd_AnggarantakaController extends Box_Models_App_Hermes_AbstractController {

    

    protected function testingFlag() {
        return FALSE;
    }

    public function allRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'anggarantandakasih', array('group'), array());
        $dao = new Hrd_Models_Tandakasih_AnggaranDao();
        $tk = new Hrd_Models_Tandakasih_Anggaran();
        $tk->setProject($this->getAppSession()->getProject());
        $tk->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAll($this->getAppRequest(),$tk);

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
    
    public function detailRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
        
        

        
        $masterG = new Hrd_Models_App_Mastertable_Group();
        $allG = $masterG->prosesDataWithSession($this->getAppSession(), TRUE);
        
        $masterT = new Hrd_Models_App_Mastertable_TipeTandaKasih();
        $allT = $masterT->prosesDataWithSession($this->getAppSession(), TRUE);
       

        $dm->setHasil(array($allG,$allT));
        
        
        return $dm;
    }

    public function mainCreate() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $c = new Hrd_Models_Tandakasih_Anggaran();
        
        $dm->setDao(new Hrd_Models_Tandakasih_AnggaranDao());
        $dm->setValidator(new Hrd_Models_Tandakasih_AnggaranValidator());
        $dm->setObject($c);
       
        return $dm;
    }
    
    
    public function deleteRead(){
         $data = $this->getAppData();
         $dao = new Hrd_Models_Tandakasih_AnggaranDao();
         $groupId = intval($data["group_id"]);
         if($groupId > 0){
             $success = $dao->deleteByGroup($groupId,$this->getAppSession()->getProject()->getId(),$this->getAppSession()->getPt()->getId(),$this->getAppSession()->getUser()->getId());
         }else{
             $success = false;
         }
         
         
        return Box_Tools::instantRead(array(
                "SUCCESS" => $success
        ));
    }

    public function mainDelete() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setObject(new Hrd_Models_Master_TandaKasih());
        $dm->setDao(new Hrd_Models_Master_TandaKasihDao());
        $dm->setIdProperty("tandakasih_id");
        return $dm;
    }

    protected function getDefaultProcessor() {
        return new Hrd_Models_App_Box_AnggaranTakaProcessor();
    }

}

?>
