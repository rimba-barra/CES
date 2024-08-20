<?php
/**
 * Description of DepartmentDao
 *
 * @author MIS
 */
class Hrd_Models_Parameters_Tlk_Dao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {
    public function save(Hrd_Models_Parameters_Tlk_Tlk $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_parametertlk_create',
                $d->getAddBy(),$d->getPt()->getId(),$d->getProject()->getId(),$d->getCode(),
                $d->getName(),$d->getUangTransport(),$d->getUangSaku());      
        return $hasil;
    }
    
    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Parameters_Tlk_Tlk $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_parametertlk_read', $r->getPage(), $r->getLimit(),$d->getProject()->getId(),$d->getPt()->getId(),$d->getName(),$d->getCode());
        return $hasil;
    }
    
     public function getAllWOPL(Hrd_Models_Parameters_Tlk_Tlk $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_parametertlk_read',1,9999,$d->getProject()->getId(),$d->getPt()->getId(),$d->getName(),$d->getCode());
        return $hasil;
    }

    public function update(Hrd_Models_Parameters_Tlk_Tlk $em) {
        $hasil = 0;
        if ($em->getId() == 0) {
            return $hasil;
        }
       
        $hasil = $this->dbTable->SPUpdate('sp_parametertlk_update', $em->getAddBy(), $em->getId(), 
                $em->getCode(),$em->getName(),$em->getUangTransport(),$em->getUangSaku());
        return $hasil;
    }

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_parametertlk_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }
}

?>
