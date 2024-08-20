<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ProsesDao
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Cac_ProsesDao extends Erems_Box_Models_App_AbDao implements Erems_Box_Models_App_BlackHole{
   
    public function getAll(Erems_Box_Models_App_HasilRequestRead $r,Erems_Models_Cac_Proses $proses,$data){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_prosescac_read',
                $proses->getProject()->getId(),$proses->getPt()->getId(),$r->getPage(),$r->getLimit(),
                $data["cac_name"]
                );   
       
        return $hasil;
    }
    
    
    public function getTransaksi(Erems_Models_Cac_Proses $proses){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_prosescac_transaksi_read',
                $proses->getProject()->getId(),$proses->getPt()->getId(),$proses->getPeriodeStart(),
                $proses->getPeriodeEnd()
                );   
       
        return $hasil;
    }
    
    
    
   
    
    public function save($project,$pt,$user,$tglProses,$periodeStart,$periodeEnd,$decanHeader,$decanDetail,$decanNomor){
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_prosescac_create',
                $user,$project,$pt,
                $tglProses,
                $periodeStart,
                $periodeEnd,
                $decanHeader["cac_cac_id"],
                $decanHeader["point"],
                $decanHeader["harga_netto"],
                $decanHeader["harga_jual_total"],
                $decanHeader["sales_price"],
                $decanDetail["purchaseletter_purchaseletter_id"],
                 $decanDetail["cac_cac_id"],
                  $decanDetail["point"],
                $decanDetail["proses_date"],
                $decanNomor["purchaseletter_purchaseletter_id"],
                $decanNomor["cac_cac_id"],
                $decanNomor["nomor"]
                );
         
            
               // var_dump($decanNomor["cac_cac_id"]);
        return $hasil;
    }
    
    public function saveSumHeader($project,$pt,$user,$decanHeader){
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_prosescacsumheader_create',
                $user,
                $project,$pt,
                
                $decanHeader["cac_cac_id"],
                $decanHeader["point"],
                $decanHeader["harga_netto"],
                $decanHeader["harga_jual_total"],
                $decanHeader["sales_price"]
                
                );
         
            
               // var_dump($decanNomor["cac_cac_id"]);
        return $hasil;
    }
    
    
    
   
    
    
    
    public function update(Erems_Models_Sms_SMS $sms){
        $hasil = 0;
      
      
        
              
              //  var_dump($this->dbTable);
        return $hasil;
    }
    
    public function getDetail(Erems_Box_Models_App_HasilRequestRead $r,$id){
        $hasil = array();

 
        
        $hasil = $this->dbTable->SPExecute('sp_prosescacdetail_read',$id,1,9999);     
       
        return $hasil;
    }
    
    
    /*
    public function getDaftarPurchaseByCac($daftarCac){
        $hasil = array();
        
        $hasil = $this->dbTable->SPExecute('sp_prosescacpurchasebycac_read',$daftarCac);     
       
        return $hasil;
    }
    
     */
    
    public function getNomor(Erems_Box_Models_App_HasilRequestRead $r,$detailId){
        $hasil = array();

        
        $hasil = $this->dbTable->SPExecute('sp_prosescacnomor_read',$detailId,1,9999);     
       
        return $hasil;
    }
    
    public function getSumHeader($project,$pt){
        $hasil = array();

        
        $hasil = $this->dbTable->SPExecute('sp_prosescacsumheader_read',$project,$pt);     
       
        return $hasil;
    }
    
    public function getJumlahByTglProses($project,$pt,$tglProses){
        $hasil = array();

        
        $hasil = $this->dbTable->SPExecute('sp_prosescactglprosesexist_read',$project,$pt,$tglProses);     
       
        return $hasil;
    }

    public function directDelete(\Erems_Box_Models_App_Decan $decan, \Erems_Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_prosescac_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }
}
