<?php

/**
 * Description of TandaKasihDao
 *
 * @author MIS
 */
class Hrd_Models_Master_TandaKasihDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole,Hrd_Models_App_CodeChecked {
    public function save(Hrd_Models_Master_TandaKasih $d) {
        $hasil = 0;

        $hasil = $this->dbTable->SPUpdate('sp_tandakasih_create',
                $d->getAddBy(),
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $d->getGroup()->getId(),
                $d->getFirstMarriage(),
                $d->getFirstMarriagePlus(),
                $d->getBirthOfChild(),
                $d->getBirthOfChildPlus(),
                $d->getSickInHospital(),
                $d->getSickInHospitalPlus(),
                $d->getParentPassAway(),
                $d->getParentPassAwayPlus());
        return $hasil;
    }

    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Master_TandaKasih $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_tandakasih_read', $r->getPage(), $r->getLimit(),$d->getProject()->getId(),$d->getPt()->getId());
        return $hasil;
    }

    public function update(Hrd_Models_Master_TandaKasih $em) {
        $hasil = 0;
        if ($em->getId() == 0) {
            return $hasil;
        }

        $hasil = $this->dbTable->SPUpdate('sp_tandakasih_update', $em->getAddBy(),
                $em->getId(),
                $em->getGroup()->getId(),
                $em->getFirstMarriage(),
                $em->getFirstMarriagePlus(),
                $em->getBirthOfChild(),
                $em->getBirthOfChildPlus(),
                $em->getSickInHospital(),
                $em->getSickInHospitalPlus(),
                $em->getParentPassAway(),
                $em->getParentPassAwayPlus()
                );
        return $hasil;
    }

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_tandakasih_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }

  

    public function codeExist($object) {
        $hasil = 0;
       
        $hasil = $this->dbTable->SPExecute('sp_grouptrainingcodeexist_read',$object->getProject()->getId(),$object->getPt()->getId(),
                $object->getGroup()->getId());

        return $hasil;
    }

   
}

?>
