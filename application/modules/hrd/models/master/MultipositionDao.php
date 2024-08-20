<?php

/**
 * Description of MultipositionDao
 *
 * @author MIS - AHMAD RIADI
 */
class Hrd_Models_Master_MultipositionDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {

    public function save(Hrd_Models_Master_Multiposition $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_multiposition_create', 
                                            $d->getAddBy(), 
                                            $d->getProject_id(), 
                                            $d->getPt_id(), 
                                            $d->getEmployee_id(),
                                            $d->getDepartment_id(),
                                            $d->getSection_id(),
                                            $d->getPosition_id(),
                                            $d->getJobfamily_id(),
                                            $d->getAlokasibiaya_id(),
                                            $d->getReportto_id(),
                                            $d->getIs_default()
                                            );
        return $hasil;
    }

    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Master_Multiposition $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_multiposition_read', 
                                            $r->getPage(), 
                                            $r->getLimit(), 
                                            $d->getProject_id(),
                                            $d->getPt_id(), 
                                            $d->getEmployee_id()
                                );     
        return $hasil;
    }

    public function getAllWoPL(Hrd_Models_Master_Multiposition $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_multiposition_read',
                                            1,
                                            9999, 
                                            $d->getProject_id(),
                                            $d->getPt_id(),
                                            $d->getEmployee_id()
                                            );
        return $hasil;
    }

    public function update(Hrd_Models_Master_Multiposition $em) {
        $hasil = 0;
        if ($em->getId() == 0) {
            return $hasil;
        }

        $hasil = $this->dbTable->SPUpdate('sp_multiposition_update', 
                                            $em->getId(),
                                            $em->getAddBy(), 
                                            $em->getProject_id(), 
                                            $em->getPt_id(), 
                                            $em->getEmployee_id(),
                                            $em->getDepartment_id(),
                                            $em->getSection_id(),
                                            $em->getPosition_id(),
                                            $em->getJobfamily_id(),
                                            $em->getAlokasibiaya_id(),
                                            $em->getReportto_id(),
                                            $em->getIs_default(), 
                                            $em->getStatedata()
                                        );
        return $hasil;
    }
    
    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_multiposition_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }

}

?>
