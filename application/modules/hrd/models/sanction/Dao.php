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
class Hrd_Models_Sanction_Dao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole{
    public function save(Hrd_Models_Sanction_Sanction $d) {
        $hasil = 0;
        //$dayList = Hrd_Models_App_Tools::getDayList($d->getStartDate(),$d->getEndDate());

        $hasil = $this->dbTable->SPUpdate('sp_sanction_create',$d->getAddBy(),$d->getEmployee()->getId(),
                $d->getSanctionType()->getId(),$d->getStartDate(),$d->getEndDate(),$d->getProject()->getId(),
                $d->getPt()->getId(),$d->getNote());      
        
        return $hasil;
    }
    
    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Sanction_Sanction $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_sanction_read',$d->getProject()->getId(),$d->getPt()->getId(), $r->getPage(), $r->getLimit(),$d->getEmployee()->getName(),$d->getEmployee()->getNik());
        return $hasil;
    }
    
    public function getAllByEmployeeWOPL(Hrd_Models_Sanction_Sanction $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_sanction_read',$d->getProject()->getId(),$d->getPt()->getId(),1,99999,'','',$d->getEmployee()->getId());
        
     
        return $hasil;
    }
    
    public function update(Hrd_Models_Sanction_Sanction $em) {
        $hasil = 0;
        if ($em->getId() == 0) {
            return $hasil;
        }
        
 
        $hasil = $this->dbTable->SPUpdate('sp_sanction_update', $em->getAddBy(),$em->getId(),$em->getEmployee()->getId(),$em->getSanctionType()->getId(),$em->getStartDate(),$em->getEndDate(),$em->getNote());
        return $hasil;
    }

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_sanction_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }
    
    
    
    
}

?>
