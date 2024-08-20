<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of TransaksiDao
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Pinjaman_TransaksiDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {
    public function save(Hrd_Models_Pinjaman_Transaksi $d) {
        $hasil = 0;
        
       
        $dc = $d->getDCResult();
   
       
        $hasil = $this->dbTable->SPUpdate('sp_pinjaman_create', $d->getAddBy(),$d->getModule(),
                $d->getProject()->getId(),$d->getPt()->getId(),
                $d->getEmployee()->getId(),$d->getTipe()->getId(),$d->getNilai(),
                $d->getBunga(),$d->getLamaAngsuran(),$d->getInterval(),
                $d->getNilaiAngsuran(),$d->getKeterangan(),$d->getDate(),
                $d->getStartDate(),$dc["angsuran_id"],$dc["date"],$dc["ke"],$dc["nilai"],$dc["lunas"]);
       
        return $hasil;
    }

    public function update(Hrd_Models_Pinjaman_Transaksi $d) {
        $hasil = 0;
        
        $dc = $d->getDCResult();

    

        $hasil = $this->dbTable->SPUpdate('sp_pinjaman_update', $d->getAddBy(),
                $d->getId(),
                $d->getEmployee()->getId(),$d->getTipe()->getId(),$d->getNilai(),
                $d->getBunga(),$d->getLamaAngsuran(),$d->getInterval(),
                $d->getNilaiAngsuran(),$d->getKeterangan(),$d->getDate(),
                $d->getStartDate(),$dc["angsuran_id"],$dc["date"],$dc["ke"],$dc["nilai"],$dc["lunas"]);

        return $hasil;
    }

    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Pinjaman_Transaksi $d) {
        $hasil = 0;
        
     //   var_dump($d->getProject()->getId(),$d->getPt()->getId());
        
        $hasil = $this->dbTable->SPExecute('sp_pinjaman_read',$d->getModule(),$d->getProject()->getId(),$d->getPt()->getId(),$r->getPage(), $r->getLimit(),
                $d->getEmployee()->getId());
     
       // var_dump($this->dbTable);
        return $hasil;
    }
    public function getAngsuran(Hrd_Models_Pinjaman_Angsuran $d) {
        $hasil = 0;
        
     //   var_dump($d->getProject()->getId(),$d->getPt()->getId());
        
        $hasil = $this->dbTable->SPExecute('sp_pinjamanangsuran_read',$d->getPinjaman()->getId(),1,9999);
     
      //  var_dump($this->dbTable);
        return $hasil;
    }
    
    //
    public function updateLunas(Box_Models_App_Session $ses,$month = 0,$year = 0,$employeeId = 0) {
        $hasil = 0;
        
   

        $hasil = $this->dbTable->SPUpdate('sp_pinjamanlunas_update',$ses->getUser()->getId(),$ses->getProject()->getId(),$ses->getPt()->getId(),
                $month,$year,1,$employeeId);

        return $hasil;
    }
    
    public function batalLunas(Box_Models_App_Session $ses,$month = 0,$year = 0,$employeeId = 0) {
        $hasil = 0;
        
   

        $hasil = $this->dbTable->SPUpdate('sp_pinjamanlunas_update',$ses->getUser()->getId(),$ses->getProject()->getId(),$ses->getPt()->getId(),
                $month,$year,0,$employeeId);

        return $hasil;
    }
    
    
    public function deleteOne($id,$userId) {
        $row = 0;

        $row = $this->dbTable->SPUpdate('sp_pinjaman_destroy',$id, $userId);

        return $row;
    }

  

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;

        $row = $this->dbTable->SPUpdate('sp_pinjaman_destroy', $decan->getString(), $session->getUserId());

        return $row;
    }
}
