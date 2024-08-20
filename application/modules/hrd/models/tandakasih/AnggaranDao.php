<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of AnggaranDao
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Tandakasih_AnggaranDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole  {
    public function save(Hrd_Models_Tandakasih_Anggaran $d,$decan) {
        $hasil = 0;
   
      
        if($decan){
            $details = $decan->getDCResult();
        }
        
      
        
        
        $hasil = $this->dbTable->SPUpdate('sp_anggarantandakasih_create', $d->getAddBy(),
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $details["anggarantandakasih_id"],
                $details["group_group_id"],
                $details["tipetandakasih_tipetandakasih_id"],
                $details["value"],
                $details["plus"]
                );
        


        return $hasil;
    }

    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Tandakasih_Anggaran $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_anggarantandakasih_read',$d->getProject()->getId(),$d->getPt()->getId(), $r->getPage(), $r->getLimit());
        return $hasil;
    }
    
    
    

    public function update(Hrd_Models_Tandakasih_Anggaran $d) {
        $hasil = 0;
     
  
        $hasil = $this->dbTable->SPUpdate('sp_anggarantandakasih_update', $d->getAddBy(), $d->getId(),
                $d->getEmployee()->getId(),
                $d->getJenis(),
                $d->getDate(),
                $d->getJumlah(),
                $d->getPlus());
        

        return $hasil;
    }
    
    public function getAnggaran(Hrd_Models_Tandakasih_Anggaran $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_anggarantandakasihbygroup_read',$d->getProject()->getId(),$d->getPt()->getId(),$d->getGroup()->getId(),1,999);
     
        return $hasil;
    }

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_anggarantandakasih_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }
    
    public function deleteByGroup($id,$project,$pt,$userId) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_anggarantandakasih_destroy',$id,$project,$pt,$userId);
   
        return $row;
    }
}
