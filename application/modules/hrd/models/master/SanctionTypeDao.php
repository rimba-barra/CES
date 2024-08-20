<?php
/**
 * Description of DepartmentDao
 *
 * @author MIS
 */
class Hrd_Models_Master_SanctionTypeDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {
    public function save(Hrd_Models_Master_SanctionType $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_sanctiontype_create',$d->getAddBy(),$d->getName(),$d->getDescription());      
        return $hasil;
    }
    
    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Master_SanctionType $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_sanctiontype_read', $r->getPage(), $r->getLimit(),$d->getName(),$d->getDescription());
        return $hasil;
    }

    public function update(Hrd_Models_Master_SanctionType $em) {
        $hasil = 0;
        if ($em->getId() == 0) {
            return $hasil;
        }
       
        $hasil = $this->dbTable->SPUpdate('sp_sanctiontype_update', $em->getAddBy(), $em->getId(), 
                $em->getName(),$em->getDescription());
        return $hasil;
    }

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_sanctiontype_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }
}

?>
