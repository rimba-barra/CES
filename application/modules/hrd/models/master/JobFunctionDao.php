<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of JobFunctionDao
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Master_JobFunctionDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole{
    public function save(Hrd_Models_Master_JobFunction $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_jobfunction_create',$d->getAddBy(),$d->getCode(),$d->getName(),
                $d->getDesc());   
      
        return $hasil;
    }
    
    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Master_JobFunction $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_jobfunction_read',$r->getPage(), $r->getLimit(),$d->getName());
        return $hasil;
    }
    
    public function getAllWOPL(Hrd_Models_Master_JobFunction $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_jobfunction_read',1,99999,$d->getName());
        return $hasil;
    }
    
   

    public function update(Hrd_Models_Master_JobFunction $d) {
        $hasil = 0;
        if ($d->getId() == 0) {
            return $hasil;
        }
        
        
       
        $hasil = $this->dbTable->SPUpdate('sp_jobfunction_update', 
                $d->getAddBy(), 
                $d->getId(),$d->getCode(),$d->getName(),
                $d->getDesc());
        return $hasil;
    }

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_jobfunction_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }
}
