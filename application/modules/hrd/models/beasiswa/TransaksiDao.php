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
class Hrd_Models_Beasiswa_TransaksiDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {
    public function save(Hrd_Models_Beasiswa_Transaksi $d) {
        $hasil = 0;
       
        $hasil = $this->dbTable->SPUpdate('sp_beasiswatran_create', $d->getAddBy(),
                $d->getProject()->getId(),$d->getPt()->getId(),$d->getModule(),
                $d->getEmployee()->getId(),$d->getChild()->getId(),$d->getJenjang(),$d->getKelas(),
                $d->getSemester(),$d->getRangking(),$d->getNamaSekolah(),$d->getDate(),
                $d->getSyaratSurat(),$d->getSyaratRaport(),$d->getSyaratKartuKeluarga(),$d->getIsKaryawan(),$d->getNamaOrangTua(),$d->getKtpOrangTua(),$d->getNamaAnak());
       
        return $hasil;
    }

    public function update(Hrd_Models_Beasiswa_Transaksi $d) {
        $hasil = 0;

        //   $d->setSelectedRelation("overtimes");
        
        $hasil = $this->dbTable->SPUpdate('sp_beasiswatran_update', $d->getAddBy(),
                $d->getId(),$d->getChild()->getId(),
                $d->getJenjang(),$d->getKelas(),
                $d->getSemester(),$d->getRangking(),$d->getNamaSekolah(),$d->getDate(),
                $d->getSyaratSurat(),$d->getSyaratRaport(),$d->getSyaratKartuKeluarga(),
                $d->getIsKaryawan(),$d->getNamaOrangTua(),$d->getKtpOrangTua(),
                $d->getNamaAnak()
                );
        
        

        return $hasil;
    }

    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Beasiswa_Transaksi $d) {
        $hasil = 0;
        
     //   var_dump($d->getProject()->getId(),$d->getPt()->getId());
        
        $hasil = $this->dbTable->SPExecute('sp_beasiswatran_read',$d->getProject()->getId(),$d->getPt()->getId(),$d->getModule(),$d->getEmployee()->getId(),$r->getPage(), $r->getLimit());
     
 
        
        return $hasil;
    }
    
    
  
    public function deleteOne($id,$userId) {
        $row = 0;

        $row = $this->dbTable->SPUpdate('sp_beasiswatran_destroy',$id,$userId);

        return $row;
    }
  

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;

        $row = $this->dbTable->SPUpdate('sp_beasiswatran_destroy', $decan->getString(), $session->getUserId());

        return $row;
    }
}
