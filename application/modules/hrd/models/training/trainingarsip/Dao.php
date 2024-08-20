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
class Hrd_Models_Training_Trainingarsip_Dao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {
    public function save(Hrd_Models_Training_Trainingarsip_Trainingarsip $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_trainingarsip_create',
                $d->getAddBy(),
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $d->getTrainingScheduleId(),
                $d->getFileName(),
                $d->getDescription()
                ); 
        
        
        return $hasil;
    }
    
    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Training_Trainingarsip_Trainingarsip $d){
        $hasil = 0;

        $hasil = $this->dbTable->SPExecute('sp_trainingarsip_read',
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $d->getTrainingScheduleId(),
                $d->getTrainingNameId(),
                $d->getBatch(),
                $d->getPeriode(),
                $r->getPage(), $r->getLimit());
        return $hasil;
    }
    
    public function getAllWoPL(Hrd_Models_Training_Trainingarsip_Trainingarsip $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_trainingarsip_read',
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $d->getTrainingScheduleId(),
                $d->getTrainingNameId(),
                $d->getBatch(),
                $d->getPeriode(),1,99999);
        return $hasil;
    }  

    public function update(Hrd_Models_Training_Trainingarsip_Trainingarsip $em) {
        $hasil = 0;
        if ($em->getId() == 0) {
            return $hasil;
        }
       
        $hasil = $this->dbTable->SPUpdate('sp_trainingarsip_update', $em->getAddBy(), $em->getId(), 
                $em->getTrainingScheduleId(),
                $em->getFileName(),
                $em->getDescription());
        return $hasil;
    }

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_trainingarsip_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }

    public function getAllSchedule(Hrd_Models_Training_Trainingarsip_Trainingarsip $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_trainingschedule_read',
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                '',
                '',1,99999);
        return $hasil;
    }

    public function getDetailSchedule(Hrd_Models_Training_Trainingarsip_Trainingarsip $d, $data){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_trainingschedule_readdetail',
                $data['trainingschedule_id'],
                '');
        return $hasil;
    }
}
