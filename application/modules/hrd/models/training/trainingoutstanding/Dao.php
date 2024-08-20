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
class Hrd_Models_Training_Trainingoutstanding_Dao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {
    public function save(Hrd_Models_Training_Trainingcaption_Trainingcaption $d) {
        $hasil = 0;
        
        $hasil = $this->dbTable->SPUpdate('sp_trainingcaption_create',
                $d->getAddBy(),
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $d->getCaption(),
                $d->getLockBudget()
                ); 
        
        return $hasil;
    }
    
    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Training_Trainingoutstanding_Trainingoutstanding $d){
        $hasil = 0;
        // print_r($d->getEmployeeName());die();
        $hasil = $this->dbTable->SPExecute('sp_trainingoutstanding_read',
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $d->getEmployeeName(),
                // $d->getLockBudget(),
                $r->getPage(), $r->getLimit());
        return $hasil;
    }

    public function getalltrans(Hrd_Models_Training_Trainingoutstanding_Trainingoutstanding $d, $session, $data){

        $hasil = 0;
        
        $hasil = $this->dbTable->SPExecute('sp_trainingoutstanding_readdetail', 
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $data['employee_id'],
                '',
                1,25
            );
        
        return $hasil;
    }

    public function getalltrans_filterperiode(Hrd_Models_Training_Trainingoutstanding_Trainingoutstanding $d, $session, $data){

        $hasil = 0;
        
        $hasil = $this->dbTable->SPExecute('sp_trainingoutstanding_readdetail', 
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $data['employee_id'],
                $data['periode'],
                1,25
            );
        
        return $hasil;
    }

    public function getalltrans_filterperiode_total(Hrd_Models_Training_Trainingoutstanding_Trainingoutstanding $d, $session, $data){

        $hasil = 0;
        
        $hasil = $this->dbTable->SPExecute('sp_trainingoutstandingtotal_readdetail', 
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $data['employee_id'],
                $data['periode']
            );
        
        return $hasil;
    }

    
    
    public function getAllWoPL(Hrd_Models_Training_Trainingcaption_Trainingcaption $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_trainingcaption_read',
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $d->getCaption(),
                $d->getLockBudget(),1,99999);
        return $hasil;
    }

    public function update(Hrd_Models_Training_Trainingcaption_Trainingcaption $em) {
        $hasil = 0;
        if ($em->getId() == 0) {
            return $hasil;
        }
       
        $hasil = $this->dbTable->SPUpdate('sp_trainingcaption_update', $em->getAddBy(), $em->getId(), 
                $em->getCaption(),
                $em->getLockBudget());
        return $hasil;
    }

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_trainingcaption_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }
}
