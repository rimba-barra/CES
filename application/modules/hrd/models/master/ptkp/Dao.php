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
class Hrd_Models_Master_Ptkp_Dao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {
    public function save(Hrd_Models_Master_Ptkp_Ptkp $d) {
        $hasil = 0;
        return $hasil;
    }


    
    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Master_Ptkp_Ptkp $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_ptkp_read',
                $r->getPage(),
                $r->getLimit(),
                $d->getCode(),
                $d->getDescription());
        return $hasil;
    }
    
    public function getAllWoPL(Hrd_Models_Master_Ptkp_Ptkp $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_ptkp_read',
                1,
                99999,
                $d->getCode(),
                $d->getDescription());
        return $hasil;
    }


    public function update(Hrd_Models_Master_Ptkp_Ptkp $em) {
        $hasil = 0;
        if ($em->getId() == 0) {
            return $hasil;
        }

        return $hasil;
    }

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        
        return $row;
    }
}
