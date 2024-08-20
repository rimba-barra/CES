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
class Hrd_Models_Jobdesc_Dao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole  {
    public function save(Hrd_Models_Jobdesc_Jobdesc $d) {
        $hasil = 0;
       
        $hasil = $this->dbTable->SPUpdate('sp_jobdesc_create', $d->getAddBy(), $d->getProject()->getId(),
                $d->getPt()->getId(),$d->getPosition()->getId(),$d->getDescription());
        
        return $hasil;
    }

    public function update(Hrd_Models_Jobdesc_Jobdesc $d) {
        $hasil = 0;

        //   $d->setSelectedRelation("overtimes");

        $hasil = $this->dbTable->SPUpdate('sp_jobdesc_update', $d->getAddBy(),
                $d->getId(),$d->getPosition()->getId(),$d->getDescription());

        return $hasil;
    }

    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Jobdesc_Jobdesc $d) {
        $hasil = 0;
        
        $hasil = $this->dbTable->SPExecute('sp_jobdesc_read', $r->getPage(), $r->getLimit(),$d->getProject()->getId(),$d->getPt()->getId());
     
        return $hasil;
    }

    
    public function deleteOne($id,$userId) {
        $row = 0;

        $row = $this->dbTable->SPUpdate('sp_jobdesc_destroy',$id,$userId);

        return $row;
    }
  

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;

        $row = $this->dbTable->SPUpdate('sp_jobdesc_destroy', $decan->getString(), $session->getUserId());

        return $row;
    }
}
