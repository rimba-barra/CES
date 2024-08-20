<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Dao
 *
 * @author MIS
 */
class Hrd_Models_Overtime_Index_Dao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole  {
    public function save(Hrd_Models_Overtime_Index_Index $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_overtimeindex_create',$d->getAddBy(),$d->getPt()->getId(),$d->getProject()->getId(),
                $d->getOvertimeType(),$d->getHour(),$d->getCutBreak(),$d->getMeal(),$d->getBreakLimit());      
        return $hasil;
    }
    
    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Overtime_Index_Index $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_overtimeindex_read', $r->getPage(), $r->getLimit(),$d->getProject()->getId(),$d->getPt()->getId());
        return $hasil;
    }
    
    public function getAllWOPL( Hrd_Models_Overtime_Index_Index $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_overtimeindex_read',1,9999,$d->getProject()->getId(),$d->getPt()->getId());
        return $hasil;
    }

    public function update(Hrd_Models_Overtime_Index_Index $em) {
        $hasil = 0;
        if ($em->getId() == 0) {
            return $hasil;
        }
       
        $hasil = $this->dbTable->SPUpdate('sp_overtimeindex_update', $em->getAddBy(), $em->getId(), 
                $em->getHour(),$em->getCutBreak(),$em->getMeal(),$em->getBreakLimit());
        return $hasil;
    }

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_overtimeindex_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }
}

?>
