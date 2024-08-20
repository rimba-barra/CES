<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ProsesSpDao
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Purchaseletter_ProsesSpDao  extends Erems_Box_Models_App_AbDao implements Erems_Box_Models_App_BlackHole{
    public function getAll(Erems_Box_Models_App_HasilRequestRead $r, Erems_Box_Models_App_Session $ses,$unitNumber=NULL,$jenis) {
        $hasil = array();
        $jenis==intval($jenis);
        $jenis=$jenis==9999?0:$jenis;
        $hasil = $this->dbTable->SPExecute('sp_prosessp_read', $r->getPage(), $r->getLimit(),$ses->getProject()->getId(), $ses->getPt()->getId(),$unitNumber,$jenis);
     
        return $hasil;
    }
    
    
    public function getCandidate($project,$pt,$jumlahHari,$jumlahHari2,$jumlahHari3,$jumlahHari4,$tglProses,$plDateStart,$plDateEnd) {
        $hasil = array();
        
        $hasil = $this->dbTable->SPExecute('sp_prosesspcandidate_read',$project,$pt,$jumlahHari,$jumlahHari2,$jumlahHari3,$jumlahHari4,$tglProses,$plDateStart,$plDateEnd);
      
        return $hasil;
    }
    
    public function getCandidateSp2($project,$pt,$jumlahHari,$tglProses) {
        $hasil = array();
        
        $hasil = $this->dbTable->SPExecute('sp_prosesspcandidatesp2_read',$project,$pt,$jumlahHari,$tglProses);
     
        return $hasil;
    }
    
    
    public function getNomorTerakhir($project,$pt,$tahun) {
        $hasil = array();
        
        $hasil = $this->dbTable->SPExecute('sp_prosesspnomorakhir_read',$project,$pt,$tahun);
     
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
