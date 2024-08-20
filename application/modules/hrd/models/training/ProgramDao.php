<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ProgramDao
 *
 * @author MIS
 */
class Hrd_Models_Training_ProgramDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole,  Hrd_Models_App_CodeChecked {
    
    public function save(Hrd_Models_Training_Program $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_programtraining_create',$d->getAddBy(),$d->getProject()->getId(),$d->getPt()->getId(),
                $d->getGroupTraining()->getId(),$d->getCode(),$d->getType(),
                $d->getDays(),$d->getDuration(),$d->getInHouse(),$d->getOrganizer(),
                $d->getCost(),$d->getTheme(),$d->getIsActive());     
        
       
        return $hasil;
    }
    
    public function getAll(Box_Models_App_HasilRequestRead $r,  Hrd_Models_Training_Program $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_programtraining_read', $r->getPage(), $r->getLimit(),$d->getProject()->getId(),$d->getPt()->getId());
        return $hasil;
    }
    
    // get all without page limit *special for combobox
    public function getAllWoP(Hrd_Models_Training_Program $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_programtraining_read', 1,500,$d->getProject()->getId(),$d->getPt()->getId(),$d->getCode());
        return $hasil;
    }

    public function update(Hrd_Models_Training_Program $em) {
        $hasil = 0;
        if ($em->getId() == 0) {
            return $hasil;
        }
       
        $hasil = $this->dbTable->SPUpdate('sp_programtraining_update', $em->getAddBy(), $em->getId(), 
                $em->getGroupTraining()->getId(),$em->getCode(),$em->getType(),
                $em->getDays(),$em->getDuration(),$em->getInHouse(),$em->getOrganizer(),
                $em->getCost(),$em->getTheme(),$em->getIsActive());
        return $hasil;
    }
    
    public function codeExist($object) {
        $hasil = 0;
       
        $hasil = $this->dbTable->SPExecute('sp_programtrainingcodeexist_read', $object->getCode(),$object->getProject()->getId(),$object->getPt()->getId());

        return $hasil;
    }

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_programtraining_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }    //put your code here
}

?>
