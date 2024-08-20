<?php

/**
 * Description of GroupDao
 *
 * @author MIS
 */
class Hrd_Models_Training_GroupDao  extends Box_Models_App_AbDao implements Box_Models_App_BlackHole,  Hrd_Models_App_CodeChecked {
    
     public function save(Hrd_Models_Training_Group $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_grouptraining_create',$d->getAddBy(),$d->getProject()->getId(),$d->getPt()->getId(),$d->getCode(),$d->getDescription());      
        return $hasil;
    }
    
    public function getAll(Box_Models_App_HasilRequestRead $r,  Hrd_Models_Training_Group $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_grouptraining_read', $r->getPage(), $r->getLimit(),$d->getProject()->getId(),$d->getPt()->getId(),$d->getCode());
        return $hasil;
    }
    
    // get all without page limit *special for combobox
    public function getAllWoP(Hrd_Models_Training_Group $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_grouptraining_read', 1,500,$d->getProject()->getId(),$d->getPt()->getId(),$d->getCode());
        return $hasil;
    }

    public function update(Hrd_Models_Training_Group $em) {
        $hasil = 0;
        if ($em->getId() == 0) {
            return $hasil;
        }
       
        $hasil = $this->dbTable->SPUpdate('sp_grouptraining_update', $em->getAddBy(), $em->getId(), 
                $em->getCode(),$em->getDescription());
        return $hasil;
    }
    
    
    
    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_grouptraining_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }

    public function codeExist($object) {
        $hasil = 0;
       
        $hasil = $this->dbTable->SPExecute('sp_grouptrainingcodeexist_read', $object->getCode(),$object->getProject()->getId(),$object->getPt()->getId());

        return $hasil;
    }    
}

?>
