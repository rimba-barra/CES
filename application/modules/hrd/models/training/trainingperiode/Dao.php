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
class Hrd_Models_Training_Trainingperiode_Dao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {
    public function save(Hrd_Models_Training_Trainingbudget_Trainingbudget $d) {
        $hasil = 0;
        
        $hasil = $this->dbTable->SPUpdate('sp_trainingbudget_create',
                $d->getAddBy(),
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $d->getPeriode(),
                $d->getApplyBudget(),
                $d->getBandingId(),
                $d->getDepartmentId(),
                $d->getBudget()
                ); 
        
        return $hasil;
    }
    
    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Training_Trainingbudget_Trainingbudget $d){
        $hasil = 0;
        
        $hasil = $this->dbTable->SPExecute('sp_trainingbudget_read',
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $d->getPeriode(),
                $d->getApplyBudget(),
                $d->getBandingId(),
                $d->getDepartmentId(),
                $d->getBudget(),
                $r->getPage(), $r->getLimit());
        return $hasil;
    }
    
    public function getAllWoPL(Hrd_Models_Training_Trainingbudget_Trainingbudget $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_trainingbudget_read',
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $d->getPeriode(),
                $d->getApplyBudget(),
                $d->getBandingId(),
                $d->getDepartmentId(),
                $d->getBudget(),
                $d->getBandingId(),1,99999);
        return $hasil;
    }

    public function getAllcompetency(Hrd_Models_Training_Trainingbudget_Trainingbudget $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_trainingbudget_read',
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $d->getPeriode(),
                $d->getApplyBudget(),
                $d->getBandingId(),
                $d->getDepartmentId(),
                $d->getBudget(),
                1,99999);
        return $hasil;
    }

    public function update(Hrd_Models_Training_Trainingbudget_Trainingbudget $em) {
        $hasil = 0;
        if ($em->getId() == 0) {
            return $hasil;
        }
       
        $hasil = $this->dbTable->SPUpdate('sp_trainingbudget_update', $em->getAddBy(), $em->getId(), 
                $em->getPeriode(),
                $em->getApplyBudget(),
                $em->getBandingId(),
                $em->getDepartmentId(),
                $em->getBudget()
            );
        return $hasil;
    }

    // public function getAllWoPL(Hrd_Models_Training_Trainingbudget_Trainingbudget $d){
    //     $hasil = 0;
    //     $hasil = $this->dbTable->SPExecute('sp_trainingbudget_read',
    //             $d->getProject()->getId(),
    //             $d->getPt()->getId(),
    //             $d->getPeriode(),
    //             $d->getBudget(),
    //             $d->getBandingId(),1,99999);
    //     return $hasil;
    // }

    // public function getAllPeriode(Hrd_Models_Training_Trainingperiode_Trainingperiode $d){
    //     $hasil = 0;
    //     $hasil = $this->dbTable->SPExecute('sp_trainingperiode_read',
    //             $d->getProject(),
    //             $d->getPt(),1,9999);
    //     return $hasil;
    // }

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_trainingbudget_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }
}
