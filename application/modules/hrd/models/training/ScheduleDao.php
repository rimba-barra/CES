<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ScheduleDao
 *
 * @author MIS
 */
class Hrd_Models_Training_ScheduleDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole , Hrd_Models_App_CodeChecked{
    public function save(Hrd_Models_Training_Schedule $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_scheduletraining_create',$d->getAddBy(),$d->getProject()->getId(),$d->getPt()->getId(),$d->getProgram()->getId(),$d->getStartDate(),$d->getEndDate(),$d->getLocation());      
        return $hasil;
    }
    
    public function getAll(Box_Models_App_HasilRequestRead $r,  Hrd_Models_Training_Schedule $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_scheduletraining_read', $r->getPage(), $r->getLimit(),$d->getProject()->getId(),$d->getPt()->getId(),$r->getOthersValue("start_date"),$r->getOthersValue("end_date"));
        return $hasil;
    }
    
    //

    public function update(Hrd_Models_Training_Schedule $em) {
        $hasil = 0;
        if ($em->getId() == 0) {
            return $hasil;
        }
       
        $hasil = $this->dbTable->SPUpdate('sp_scheduletraining_update', $em->getAddBy(), $em->getId(), 
                $em->getLocation(),$em->getStartDate(),$em->getEndDate());
        return $hasil;
    }
    
    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
         $row = 0;
        $row = $this->dbTable->SPUpdate('sp_scheduletraining_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }

    public function codeExist($d) {
        $hasil = 0;
       
        $hasil = $this->dbTable->SPExecute('sp_scheduletrainingexist_read',$d->getProject()->getId(),$d->getPt()->getId(),$d->getProgram()->getId(),$d->getStartDate(),$d->getEndDate());

        return $hasil;
    }    
}

?>
