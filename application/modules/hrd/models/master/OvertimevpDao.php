<?php

/**
 * Description of OvertimevpDao
 *
 * @author MIS
 */
class Hrd_Models_Master_OvertimevpDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {
    
    public function save(Hrd_Models_Master_Overtimevp $d) {
        $hasil = 0;

        $hasil = $this->dbTable->SPUpdate('sp_overtimevp_create',
                $d->getAddBy(),$d->getProject()->getId(),$d->getPt()->getId(),
                $d->getStartYear(),$d->getEndYear(),$d->getValue());
        return $hasil;
    }

    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Master_Overtimevp $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_overtimevp_read', $r->getPage(), $r->getLimit(),$d->getProject()->getId(),$d->getPt()->getId());
        return $hasil;
    }

    public function update(Hrd_Models_Master_Overtimevp $em) {
        $hasil = 0;
        if ($em->getId() == 0) {
            return $hasil;
        }

        $hasil = $this->dbTable->SPUpdate('sp_overtimevp_update', $em->getAddBy(),
                $em->getId(),
                $em->getStartYear(),$em->getEndYear(),$em->getValue()
                );
        return $hasil;
    }
    
    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_overtimevp_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }    //put your code here
}

?>
