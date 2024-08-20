<?php

/**
 * Description of FollowupDao
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Purchaseletter_FollowupDao extends Erems_Box_Models_App_AbDao implements Erems_Box_Models_App_BlackHole{
     public function getAll(Erems_Box_Models_App_HasilRequestRead $r, Erems_Box_Models_App_Session $ses,$unitNumber,$purchaseletterNumber,$customerName, $cluster_id) {
        $hasil = array();
        
        $hasil = $this->dbTable->SPExecute('sp_followup_read', $ses->getProject()->getId(), $ses->getPt()->getId(),$r->getPage(), $r->getLimit(),$unitNumber,$purchaseletterNumber,$customerName, $cluster_id);
        
        return $hasil;
    }

     public function getAllwithDate(Erems_Box_Models_App_HasilRequestRead $r, Erems_Box_Models_App_Session $ses,$unitNumber,$purchaseletterNumber) {
        $hasil = array();
        
        $hasil = $this->dbTable->SPExecute('sp_popupfollowup_read', $ses->getProject()->getId(), $ses->getPt()->getId(),$r->getPage(), $r->getLimit(),$unitNumber,$purchaseletterNumber);
        
        return $hasil;
    }
    
     public function getAllNoPaging(Erems_Box_Models_App_HasilRequestRead $r, Erems_Box_Models_App_Session $ses,$unitNumber,$purchaseletterNumber) {
        $hasil = array();
        
        $hasil = $this->dbTable->SPExecute('sp_popupfollowup_read', $ses->getProject()->getId(), $ses->getPt()->getId(),$r->getPage(), 999999,$unitNumber,$purchaseletterNumber);
        
        return $hasil;
    }    
    
    public function getDetailView($purchaseId) {
        $hasil = array();
        
        $hasil = $this->dbTable->SPExecute('sp_followupview_read',$purchaseId);
 
        return $hasil;
    }
    
    public function getSp($purchaseletterId,Erems_Box_Models_App_HasilRequestRead $r) {
        $hasil = array();
        
        $hasil = $this->dbTable->SPExecute('sp_followupsp_read',$purchaseletterId,$r->getPage(), $r->getLimit()); //sp updated
     
        return $hasil;
    }
    
    public function getPrintInfo($purchaseletterId) {
        $hasil = array();
        
        $hasil = $this->dbTable->SPExecute('sp_followupprint_read',$purchaseletterId);
     
        return $hasil;
    }
    
    public function getPrintInfoSch($purchaseletterId) {
        $hasil = array();
        
        $hasil = $this->dbTable->SPExecute('sp_followupprintsch_read',$purchaseletterId);
     
        return $hasil;
    }

    public function getPrintInfoSchB($purchaseletterId) {
        $hasil = array();
        
        $hasil = $this->dbTable->SPExecute('sp_followupprintschb_read',$purchaseletterId);
     
        return $hasil;
    }
    

    public function saveProses($admin,$tglProses,$dcResult,$dcResult2,$dcResult3,$dcResult4) {
        $hasil = 0;
        
      
        
        $hasil = $this->dbTable->SPUpdate('sp_prosessp_create',
                $admin,$tglProses,
                isset($dcResult["schedule_id"])?$dcResult["schedule_id"]:"",isset($dcResult["sp1_no"])?$dcResult["sp1_no"]:"",
                isset($dcResult2["schedule_id"])?$dcResult2["schedule_id"]:"",isset($dcResult2["sp2_no"])?$dcResult2["sp2_no"]:"",
                isset($dcResult3["schedule_id"])?$dcResult3["schedule_id"]:"",isset($dcResult3["sp3_no"])?$dcResult3["sp3_no"]:"",
                isset($dcResult4["schedule_id"])?$dcResult4["schedule_id"]:"",isset($dcResult4["sp4_no"])?$dcResult4["sp4_no"]:""
        );
     

        return $hasil;
    }
    
    public function rollbackSp($unitId,$rollbackSPke) {
        $hasil = 0;
        
        $hasil = $this->dbTable->SPUpdate('sp_prosessprollback_update',$unitId,$rollbackSPke
        );
       
        
        return $hasil;
    }
    
    public function getUserInfo($userId) {
        $hasil = array();
        
        $hasil = $this->dbTable->SPExecute('sp_current_user',$userId);
        
        $hasil = $hasil[0][0];
        return $hasil;
    }

    public function updatePrint($admin,$ids,$jenises) {
        $hasil = 0;
        
        $hasil = $this->dbTable->SPUpdate('sp_followupsetprint_update',$admin,$ids,$jenises);
    

        return $hasil;
    }
    
    
    public function directDelete(\Erems_Box_Models_App_Decan $decan, \Erems_Box_Kouti_InterSession $session) {
        $row = 0;


        $ds = $decan->getString();
        $ids = explode("~", $ds);

        foreach ($ids as $id) {
            $pl = new Erems_Models_Purchaseletter_PurchaseLetter();
            $pl->setId($id);
            $payment = doubleval($this->getTotalPayment($pl));
            if ($payment > 0) {
                $ds = str_replace($id, "", $ds);
            }
        }

        $row = $this->dbTable->SPUpdate('sp_purchaseletter_destroy', $ds, $session->getUserId(), Erems_Box_Config::UNITSTATUS_STOCK);
        return $row;
    }
}
