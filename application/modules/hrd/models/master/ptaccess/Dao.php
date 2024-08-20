<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Dao
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Master_Ptaccess_Dao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {

    public function getAllWoPL(Hrd_Models_Master_Ptaccess_PtAccess $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_ptaccess_read',
                $d->getUserid(),
                $d->getGroupid(),1,99999);
        return $hasil;
    }

    public function getAllCreate(Hrd_Models_Master_Ptaccess_PtAccess $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_ptaccess_union_read',
                $d->getUserid(),
                $d->getGroupid(),1,99999);
        return $hasil;
    }

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_ptaccess_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }
}
