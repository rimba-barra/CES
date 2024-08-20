<?php

/**
 * Description of DepartmentDao
 *
 * @author MIS
 */
class Hrd_Models_Master_MtatatertibDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {

    public function save(Hrd_Models_Master_Mtatatertib $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
                    'sp_bsc_tatatertib_create', 
                    $d->getAddBy(), 
                    $d->getProjectId(), 
                    $d->getPtId(), 
                    $d->getIndex_no(), 
                    $d->getDisiplin_item(), 
                    $d->getBobot(), 
                    $d->getRate1(), 
                    $d->getRate2(), 
                    $d->getRate3(), 
                    $d->getRate4(), 
                    $d->getRate5()                   
                );
        return $hasil;
    }

    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Master_Mtatatertib $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute(
                                    'sp_bsc_tatatertib_read',
                                   $r->getPage(),
                                   $r->getLimit(), 
                                   $d->getProjectId(),
                                   $d->getPtId(),
                                   $d->getDisiplin_item()
                            );
        return $hasil;
    }

    public function getAllWoPL(Hrd_Models_Master_Mtatatertib $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute(
                                        'sp_bsc_tatatertib_read',
                                        1, 
                                        9999, 
                                        $r->getPage(),
                                        $r->getLimit(), 
                                        $d->getProjectId(),
                                        $d->getPtId(),
                                        $d->getDisiplin_item()
                            );
        return $hasil;
    }

    public function update(Hrd_Models_Master_Mtatatertib $em) {
        $hasil = 0;
        if ($em->getId() == 0) {
            return $hasil;
        }

        $hasil = $this->dbTable->SPUpdate(
                                            'sp_bsc_tatatertib_update', 
                                            $em->getAddBy(),
                                            $em->getId(),
                                            $em->getIndex_no(), 
                                            $em->getDisiplin_item(), 
                                            $em->getBobot(), 
                                            $em->getRate1(), 
                                            $em->getRate2(), 
                                            $em->getRate3(), 
                                            $em->getRate4(), 
                                            $em->getRate5()   
                                    );
        return $hasil;
    }

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_bsc_tatatertib_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }

}

?>
