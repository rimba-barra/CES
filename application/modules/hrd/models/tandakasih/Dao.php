<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Dao
 *
 * @author MIS
 */
class Hrd_Models_Tandakasih_Dao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {

    public function save(Hrd_Models_Tandakasih_TandaKasih $d) {
        $hasil = 0;
   
        
        $hasil = $this->dbTable->SPUpdate('sp_tandakasihtran_create', $d->getAddBy(),
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $d->getEmployee()->getId(),
                $d->getGroup()->getId(),
                $d->getJenis(),
                $d->getDate(),
                $d->getJumlah(),
                $d->getPlus(),
                $d->getNote()
                );
        
        

        return $hasil;
    }

    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Tandakasih_TandaKasih $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_tandakasihtran_read',$d->getProject()->getId(),$d->getPt()->getId(), $r->getPage(), $r->getLimit());
        return $hasil;
    }
    
    public function getAllByEmployeeWOPL($employeeId,$projectId,$ptId) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_tandakasihtranbyemployee_read',$employeeId,$projectId,$ptId,1,99999);
        
     
        return $hasil;
    }

    public function update(Hrd_Models_Tandakasih_TandaKasih $d) {
        $hasil = 0;
     
  
        $hasil = $this->dbTable->SPUpdate('sp_tandakasihtran_update', $d->getAddBy(), $d->getId(),
                $d->getEmployee()->getId(),
                $d->getGroup()->getId(),
                $d->getJenis(),
                $d->getDate(),
                $d->getJumlah(),
                $d->getPlus(),
                $d->getNote());
        

        return $hasil;
    }

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_tandakasihtran_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }
    
    public function deleteOne($id,$userId) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_tandakasihtran_destroy',$id,$userId);
   
        return $row;
    }

}

?>
