<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of BobotNilaiDao
 *
 * @author MIS
 */
class Hrd_Models_Master_BobotNilaiDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole{
    
    public function save(Hrd_Models_Master_BobotNilai $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_bobotnilai_create',$d->getAddBy(),$d->getProject()->getId(),$d->getPt()->getId(),$d->getCode(),$d->getItemNumber(),$d->getValue());      
        return $hasil;
    }
    
    public function getAll(Box_Models_App_HasilRequestRead $r,  Hrd_Models_Master_BobotNilai $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_bobotnilai_read', $d->getProject()->getId(),$d->getPt()->getId(),$r->getPage(), $r->getLimit(),$d->getCode());
        return $hasil;
    }

    public function update(Hrd_Models_Master_BobotNilai $em) {
        $hasil = 0;
        if ($em->getId() == 0) {
            return $hasil;
        }
       
        $hasil = $this->dbTable->SPUpdate('sp_bobotnilai_update', $em->getAddBy(), $em->getId(), 
                $em->getCode(),$em->getItemNumber(),$em->getValue());
        return $hasil;
    }
    
    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_bobotnilai_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }    
}

?>
