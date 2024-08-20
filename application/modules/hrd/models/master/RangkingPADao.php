<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of RangkingPADao
 *
 * @author MIS
 */
class Hrd_Models_Master_RangkingPADao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole  {
    
    public function save(Hrd_Models_Master_RangkingPA $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_rangkingpa_create',$d->getAddBy(),$d->getName(),$d->getPoint(),$d->getPercent(),$d->getDescription());      
        return $hasil;
    }
    
    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Master_RangkingPA $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_rangkingpa_read', $r->getPage(), $r->getLimit(),$d->getName());
        return $hasil;
    }

    public function update(Hrd_Models_Master_RangkingPA $em) {
        $hasil = 0;
        if ($em->getId() == 0) {
            return $hasil;
        }
       
        $hasil = $this->dbTable->SPUpdate('sp_rangkingpa_update', $em->getAddBy(), $em->getId(), 
                $em->getName(),$em->getPoint(),$em->getPercent(),$em->getDescription());
        return $hasil;
    }
    
    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_rangkingpa_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }    //put your code here
}

?>
