<?php

/**
 * Description of Dao
 *
 * @author tommytoban
 */
class Erems_Models_Construction_Dao extends Erems_Box_Models_App_AbDao implements Erems_Box_Models_App_BlackHole {

    public function save(Erems_Models_Construction_Construction $cst) {
        $row = 0;
        $dcResult = $cst->getDCResult();
        if(count($dcResult)==0){
            $dcResult = array("constructionpicture_id"=>"","images"=>"","description"=>"");
        }
        
        $row = $this->dbTable->SPUpdate('sp_construction_create',$cst->getAddBy(),$cst->getUnit()->getId(),
                $cst->getSpk()->getId(),
                date('Y-m-d h:m:s', strtotime($cst->getProgressDate())),
                $cst->getProgressPersen(),$cst->getNotes(),
                $dcResult["constructionpicture_id"],$dcResult["images"],$dcResult["description"]);
         
        return $row;
    }
    
    public function getBySpkUnit(Erems_Box_Models_App_HasilRequestRead $requestRead){
        //sp_constructionbyunitspk_read
        $hasil = array();
       
        $hasil = $this->dbTable->SPExecute('sp_constructionbyunitspk_read',$requestRead->getPage(),$requestRead->getLimit(),
                $requestRead->getOthersValue("spk_id"),$requestRead->getOthersValue("unit_id"));
        return $hasil;
    }
    
    public function getBySpk(Erems_Box_Models_App_HasilRequestRead $requestRead){
 
        $hasil = array();
       
        $hasil = $this->dbTable->SPExecute('sp_constructionspk_read',$requestRead->getOthersValue("unit_id"),
                $requestRead->getPage(),$requestRead->getLimit()
                );
        return $hasil;
    }

    public function getByConstruction($construction_id){
 
        $hasil = array();
       
        $hasil = $this->dbTable->SPExecute('sp_spkbyconstruction_read',$construction_id);
        return $hasil;
    }

    //
    public function getBySpkNonUnit(Erems_Box_Models_App_HasilRequestRead $requestRead){
 
        $hasil = array();
       
        $hasil = $this->dbTable->SPExecute('sp_constructionspknonunit_read',$requestRead->getOthersValue("spk_id"),
                $requestRead->getPage(),$requestRead->getLimit()
                );
        return $hasil;
    }
    
    public function getPictureByConstruction(Erems_Box_Models_App_HasilRequestRead $requestRead){
       $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_constructionpicture_read',$requestRead->getOthersValue("construction_id"),$requestRead->getPage(),$requestRead->getLimit());
        return $hasil; 
    }
    
    
    
    public function getPictureBySpkUnit(Erems_Box_Models_App_HasilRequestRead $requestRead){
       $hasil = array();
       
        $hasil = $this->dbTable->SPExecute('sp_constructionpicturebyspkunit_read',$requestRead->getOthersValue("spk_id"),$requestRead->getOthersValue("unit_id"),$requestRead->getPage(),$requestRead->getLimit());
        return $hasil; 
    }
    
     public function update(Erems_Models_Construction_Construction $cst,  Erems_Box_Models_App_Decan $decan){
        $row = 0;
        if($cst->getId()==0 || (int)$cst->getAddBy()==0){
            return $row;
        }
        $dcResult = $cst->getDCResult();
        if(count($dcResult)==0){
            $dcResult = array("constructionpicture_id"=>"","images"=>"","description"=>"");
        }
       
        
        $row = $this->dbTable->SPUpdate('sp_construction_update',$cst->getAddBy(),$cst->getId(),
               date('Y-m-d h:m:s', strtotime($cst->getProgressDate())),
                $cst->getProgressPersen(),
                $cst->getNotes(),$dcResult["constructionpicture_id"],$dcResult["images"],$dcResult["description"],$decan->getString());
        if(intval($row)==1 && $cst->getSendMail()==1){
            /// send mail to customer
            
        }
        return $row;
        
    }
    
    public function getTopProgress(Erems_Models_Construction_Construction $cst){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_constructiontop_read',$cst->getSpk()->getId(),$cst->getUnit()->getId());
        return $hasil; 
    }
    
    public function getTopProgressB(Erems_Models_Construction_Construction $cst){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_constructiongetlastprogress_read',$cst->getSpk()->getId(),$cst->getUnit()->getId());
        return $hasil; 
    }

    public function getTop2ndProgress(Erems_Models_Construction_Construction $cst){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_constructionget2ndlastprogress_read',$cst->getSpk()->getId(),$cst->getUnit()->getId());
        return $hasil; 
    }

    public function directDelete(Erems_Box_Models_App_Decan $decan, Erems_Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_construction_destroy', $decan->getString(), $session->getUserId());
       
        return $row;
    }
    
    public function deleteOne(Erems_Models_Construction_Construction $c, Erems_Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_construction_destroy_b', $c->getId(), $session->getUserId());
      
        return $row;
    }

    public function deleteConstructioncair($spkdetail_pencairan_id,$session){
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_constructioncair_destroy', $spkdetail_pencairan_id, $session->getUserId());
        return $row;
    }

    
    
    public function getUnitInformation(Erems_Models_Construction_Construction $c){
        //
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_constructiongetunitinformation_read',$c->getId());
        return $hasil; 
    }
    
    public function generateTarget(Erems_Box_Models_App_Session $ses,Erems_Box_Models_App_Decan $decan){
        $hasil = array();
        $data = $decan->getDCResult();
        // print_r($data);exit;
        if(count($data) > 0){
            $hasil = $this->dbTable->SPUpdate('sp_constructiontarget_create',
                $ses->getUser()->getId(),
                $data["spkdetail_target_id"],
                $data["spkdetail_spkdetail_id"],
                $data["unit_unit_id"],
                $data["plafon_plafon_id"],
                $data["target_date"],
                $data["realisation_date"]);
            
          
        }
     
        return $hasil; 
    }
    
    public function generateCair(Erems_Box_Models_App_Session $ses,Erems_Box_Models_App_Decan $decan){
        $hasil = array();
        $data = $decan->getDCResult();
        if(count($data) > 0){
            
            
            
            $hasil = $this->dbTable->SPUpdate('sp_constructioncair_create',
                $ses->getUser()->getId(),
                $data["spkdetail_pencairan_id"],
                $data["spkdetail_spkdetail_id"],
                $data["plafon_plafon_id"],
                $data["unit_unit_id"],
                $data["status"],
                $data["realisation_date"]);
            
          
        }
     
        return $hasil; 
    }
    
    public function updateTarget(Erems_Models_Construction_Target $target) {
        $row = 0;
    
        $row = $this->dbTable->SPUpdate('sp_constructiontarget_update',
                $target->getAddBy(),$target->getId(),$target->getTargetDate());
        return $row;
    }
    
    public function updateTargetNew(Erems_Models_Construction_Target $target) {
    
        $row = 0;
    // echo $target->getTargetDate();exit;
        $row = $this->dbTable->SPUpdate('sp_constructiontargetb_update',
                $target->getAddBy(),$target->getId(),$target->getTargetDate(), NULL, $target->getUnit()->getId(), $target->getPlafon()->getId());
        return $row;
    }



    public function updateUnitprogress($unit_id, $progress, $admin) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_unitprogress_update',$unit_id, $progress, $admin);
        return $row;
    }
    
    //

    public function getOneProgressPersenVal($constId){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_constructionpercent_read',$constId);
     
        return $hasil; 
    }
    
    public function getTargets($unitId,$spkId){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_constructiontarget_read',$unitId,$spkId);
     
        return $hasil; 
    }
    
    public function getCairs($unitId,$spkId){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_constructioncair_read',$unitId,$spkId);
     
        return $hasil; 
    }
    
    public function getSkemaBank($unitId){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_bankskema_read',$unitId);
        
       
     
        return $hasil; 
    }
    
    public function getCheckUnit($unitId){
        $hasil = array();
        $unitId = str_replace("~", ",", $unitId);
        $unitId = rtrim($unitId, ", ");
        $hasil = $this->dbTable->SPExecute('sp_construction_checkspkunit_read',$unitId);
        // echo $unitId;exit;
        // print_r($hasil);exit;
        return $hasil; 
    }

    public function getCheckUnitOneCluster($unitId){
        $hasil = array();
        $unitId = str_replace("~", ",", $unitId);
        $unitId = rtrim($unitId, ", ");
        $hasil = $this->dbTable->SPExecute('sp_construction_checkspkunitonecluster_read',$unitId);
        return $hasil; 
    }
	
    public function getCheckUnitOneSpk($unitId){
        $hasil = array();
        $unitId = str_replace("~", ",", $unitId);
        $unitId = rtrim($unitId, ", ");
        $hasil = $this->dbTable->SPExecute('sp_construction_checkspkunitonespk_read',$unitId);
        return $hasil; 
    }

    public function createGenerateTarget($unitId, $userId){
        ini_set("memory_limit", "-1");
        ini_set('max_execution_time', 0);
        $hasil = array();
        $unitId = str_replace("~", ",", $unitId);
        $unitId = rtrim($unitId, ", ");
        $hasil = $this->dbTable->SPExecute('sp_constructiontarget_create_generate',$unitId,$userId);
        // print_r($hasil);exit;
        // echo $unitId.' /  '.$userId;exit;
        return $hasil; 
    }

    public function getCheckUnitProgress($unitId){
        $hasil = array();
        $unitId = str_replace("~", ",", $unitId);
        $unitId = rtrim($unitId, ", ");
        $hasil = $this->dbTable->SPExecute('sp_constructionbyunit_read',1,125,$unitId);
        // echo $unitId;exit;
        return $hasil; 
    }

    public function getCheckUnitOneClusterProgress($unitId,$progresPercent){
        $hasil  = array();
        $unitId = str_replace("~", ",", $unitId);
        $unitId = rtrim($unitId, ", ");
        // $hasil  = $this->dbTable->SPExecute('sp_constructionbycluster_read',$unitId,$progresPercent);
        $hasil  = $this->dbTable->SPExecute('sp_constructionbycluster_read',$unitId);
        return $hasil; 
    }
	
    public function getCheckUnitOneSpkProgress($unitId,$progresPercent){
        $hasil  = array();
        $unitId = str_replace("~", ",", $unitId);
        $unitId = rtrim($unitId, ", ");
        // $hasil  = $this->dbTable->SPExecute('sp_constructionbycluster_read',$unitId,$progresPercent);
        $hasil  = $this->dbTable->SPExecute('sp_constructionbyspk_read',$unitId);
        return $hasil; 
    }

    public function updateDetailProgress($unitId, $progressDate, $progresPercent, $description, $userId){
        ini_set("memory_limit", "-1");
        ini_set('max_execution_time', 0);
        $hasil = array();
        $unitId = str_replace("~", ",", $unitId);
        $unitId = rtrim($unitId, ", ");
        // $unitId = rtrim($unitId, "~ ");
        $hasil = $this->dbTable->SPExecute('sp_construction_updateprogress_generate',$unitId, date('Y-m-d h:m:s', strtotime($progressDate)), $progresPercent, $description, $userId);
        // echo $unitId.' / '.date('Y-m-d h:m:s', strtotime($progressDate)).' / '.$progresPercent.' / '.$description.' / '.$userId;exit;
        // print_r($hasil);exit;
        return $hasil; 
    }
}
?>
