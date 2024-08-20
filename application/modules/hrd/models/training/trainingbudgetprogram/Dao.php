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
class Hrd_Models_Training_Trainingbudgetprogram_Dao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {
    public function save(Hrd_Models_Training_Trainingbudgetprogram_Trainingbudgetprogram $d) {
        $hasil = 0;
        
        $hasil = $this->dbTable->SPUpdate('sp_trainingbudgetprogram_create',
                $d->getAddBy(),
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $d->getPeriode(),
                $d->getCaptionId(),
                $d->getBudget()
                ); 
        
        return $hasil;
    }
    
    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Training_Trainingbudgetprogram_Trainingbudgetprogram $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_trainingbudgetprogram_read',
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $d->getPeriode(),
                $d->getBudget(),
                $d->getCaptionId(),
                $r->getPage(), $r->getLimit());
        return $hasil;
    }
    
    public function getAllWoPL(Hrd_Models_Training_Trainingbudgetprogram_Trainingbudgetprogram $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_trainingbudgetprogram_read',
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $d->getPeriode(),
                $d->getBudget(),
                $d->getCaptionId(),1,99999);
        return $hasil;
    }

    public function getAllPeriodeBudget(Hrd_Models_Training_Trainingbudgetprogram_Trainingbudgetprogram $d,$periode,$trainingcaption_id){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_trainingbudgetprogram_periodebudget_read',
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $trainingcaption_id,
                $periode,1,99999);
        return $hasil;
    }

    public function getAllWoPLKP(Hrd_Models_Training_Trainingbudgetprogram_Trainingbudgetprogram $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_trainingcaption_read',
                // $d->getProject(),
                // $d->getPt(),
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                '',
                '',1,99999);
        
        return $hasil;
    }

    public function update(Hrd_Models_Training_Trainingbudgetprogram_Trainingbudgetprogram $em) {
        $hasil = 0;
        if ($em->getId() == 0) {
            return $hasil;
        }
        $hasil = $this->dbTable->SPUpdate('sp_trainingbudgetprogram_update', $em->getAddBy(), $em->getId(), 
                $em->getPeriode(),
                $em->getCaptionId(),
                $em->getBudget()
                );
        return $hasil;
    }

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $temp_more = $decan->getString();
        $explode_more = explode('~', $temp_more);

        foreach($explode_more as $key => $item){
            $hasil = 0;
            $totalRow = 0;
            
            $hasil = $this->dbTable->SPExecute('sp_trainingbudget_readall ',
                                                $session->getProjectId(),
                                                $session->getPtId(),
                                                $item,1,9999);

            $totalRow = $hasil[0][0]['totalRow'];

            if($totalRow < 1){
                $row = $this->dbTable->SPUpdate('sp_trainingbudgetprogram_destroy', $item, $session->getUserId());
            }

        }

        return $row;
    }

    public function getTrainingBudgetProgramSingle(Hrd_Models_Training_Trainingbudgetprogram_Trainingbudgetprogram $d,$trainingbudgetprogram_id){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_trainingbudgetprogram_readdetail',
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $trainingbudgetprogram_id,1,25);
        return $hasil;
    }

    public function getAllTrainingBudget(Hrd_Models_Training_Trainingbudgetprogram_Trainingbudgetprogram $d,$trainingbudgetprogram_id){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_trainingbudget_readall',
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $trainingbudgetprogram_id,1,9999);
        return $hasil;
    }

    public function getAllTrainingBudgetAdj(Hrd_Models_Training_Trainingbudgetprogram_Trainingbudgetprogram $d,$trainingbudgetprogram_id){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_trainingbudget_readadj',
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $trainingbudgetprogram_id,1,9999);
        return $hasil;
    }
}
