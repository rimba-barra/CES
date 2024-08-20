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
class Hrd_Models_Training_Trainingallsubholding_Dao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {

    public function getAllWoPL(){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_trainingallsubholding_read');
        return $hasil;
    }

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        // $row = $this->dbTable->SPUpdate('sp_masterkategorisk_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }
}
