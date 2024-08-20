<?php

/**
 * Description of DepartmentDao
 *
 * @author MIS
 */
class Hrd_Models_Master_MhasilkerjaDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {

    public function save(Hrd_Models_Master_Mhasilkerja $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
                    'sp_hasilkerja_create', 
                    $d->getAddBy(), 
                    $d->getProjectId(), 
                    $d->getPtId(), 
                    $d->getIndex_no(), 
                    $d->getHasilkerja_item(), 
                    $d->getBobot(), 
                    $d->getDescription()          
                );
        return $hasil;
    }

    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Master_Mhasilkerja $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute(
                                    'sp_hasilkerja_read',
                                   $r->getPage(),
                                   $r->getLimit(), 
                                   $d->getProjectId(),
                                   $d->getPtId(),
                                   $d->getHasilkerja_item()
                            );
        return $hasil;
    }

    public function getAllWoPL(Hrd_Models_Master_Mhasilkerja $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute(
                                        'sp_hasilkerja_read',
                                        1, 
                                        9999, 
                                        $r->getPage(),
                                        $r->getLimit(), 
                                        $d->getProjectId(),
                                        $d->getPtId(),
                                        $d->getHasilkerja_item()
                            );
        return $hasil;
    }

    public function update(Hrd_Models_Master_Mhasilkerja $em) {
        $hasil = 0;
        if ($em->getId() == 0) {
            return $hasil;
        }
        $hasil = $this->dbTable->SPUpdate(
                                            'sp_hasilkerja_update', 
                                            $em->getAddBy(),
                                            $em->getId(),
                                            $em->getIndex_no(), 
                                            $em->getHasilkerja_item(), 
                                            $em->getBobot(), 
                                            $em->getDescription()
                                    );
        return $hasil;
    }

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_hasilkerja_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }

}

?>
