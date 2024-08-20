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
class Hrd_Models_Transferapi_TransferapitransactionlogDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {
    public function save(Hrd_Models_Training_Trainingcaption_Trainingcaption $d) {
        $hasil = 0;
        
        // $hasil = $this->dbTable->SPUpdate('sp_trainingcaption_create',
        //         $d->getAddBy(),
        //         $d->getProject()->getId(),
        //         $d->getPt()->getId(),
        //         $d->getCaption(),
        //         $d->getLockBudget()
        //         ); 
        
        return $hasil;
    }
    
    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Transferapi_Transferapitransactionlog $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_transaction_grid_read',
                $d->getPtId(),
                $d->getPPMonth(),
                $d->getPPYear(),
                $d->getData(),
                $d->getGroupid(),$r->getPage(), $r->getLimit());
        return $hasil;
    }




    public function update(Hrd_Models_Transferapi_Transferapitransactionlog $em) {
        $hasil = 0;
        // if ($em->getId() == 0) {
        //     return $hasil;
        // }
       
        // $hasil = $this->dbTable->SPUpdate('sp_trainingcaption_update', $em->getAddBy(), $em->getId(), 
        //         $em->getCaption(),
        //         $em->getLockBudget());
        return $hasil;
    }

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        // $row = $this->dbTable->SPUpdate('sp_trainingcaption_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }
}
