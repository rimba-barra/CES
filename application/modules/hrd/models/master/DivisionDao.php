<?php
/**
 * Description of DepartmentDao
 *
 * @author MIS
 */
class Hrd_Models_Master_DivisionDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {
    public function save(Hrd_Models_Master_Division $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_division_create',$d->getAddBy(),$d->getName(),$d->getCode());      
        return $hasil;
    }
    
    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Master_Division $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_division_read', $r->getPage(), $r->getLimit(),$d->getName(),$d->getCode());
        return $hasil;
    }
    
    public function getAllWoPL(Hrd_Models_Master_Division $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_division_read',1,9999,$d->getName(),$d->getCode());
        return $hasil;
    }

    public function update(Hrd_Models_Master_Division $em) {
        $hasil = 0;
        if ($em->getId() == 0) {
            return $hasil;
        }
       
        $hasil = $this->dbTable->SPUpdate('sp_division_update', $em->getAddBy(), $em->getId(), 
                $em->getName(),$em->getCode());
        return $hasil;
    }

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_division_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }
}

?>
