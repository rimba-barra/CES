<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Dao
 *
 * @author MIS
 */
class Hrd_Models_Statuschange_Dao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {

    public function save(Hrd_Models_Statuschange_StatusChange $d) {
        $hasil = 0;
        $status = $d->getNewStatus();
        if ($status instanceof Hrd_Models_Master_StatusInformation) {

            //update by mike 14/04/2023 | penambahan masa kerja & usia kerja

            // $hasil = $this->dbTable->SPUpdate('sp_statuschange_create', $d->getAddBy(), $d->getEmployee()->getId(), $d->getNewEmployeeStatus()->getId(), $status->getHireDate(), $status->getAssignationDate(), $status->getContractStart(), $status->getContractEnd(),
            //     $status->getConsultantStart(), $status->getConsultantEnd(),
            //     $status->getTemporaryStart(), $status->getTemporaryEnd(), $status->getContractKe(), 
            //     $status->getConsultantKe(), 
            //     $d->getApproved(), $d->getSkNumber(), $d->getEffectiveDate(), $d->getNotes());

            $hasil = $this->dbTable->SPUpdate('sp_statuschange_create', $d->getAddBy(), $d->getEmployee()->getId(), $d->getNewEmployeeStatus()->getId(), $status->getHireDate(), $status->getAssignationDate(), $status->getContractStart(), $status->getContractEnd(),
                $status->getConsultantStart(), $status->getConsultantEnd(),
                $status->getTemporaryStart(), $status->getTemporaryEnd(), $status->getContractKe(), 
                $status->getConsultantKe(), 
                $d->getIsPensiun(),
                $d->getIsKompensasi(), $d->getMasaKerjaStartDate(), $d->getUsiaKerjaStartDate(),
                $d->getApproved(), $d->getSkNumber(), $d->getEffectiveDate(), $d->getNotes());
        }


        return $hasil;
    }

    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Statuschange_StatusChange $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_statuschange_read', $d->getEmployee()->getId(), $r->getPage(), $r->getLimit());

        return $hasil;
    }
    
    public function getAllWOPL(Hrd_Models_Statuschange_StatusChange $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_statuschange_read', $d->getEmployee()->getId(), 1, 99999);
        return $hasil;
    }

    public function update(Hrd_Models_Statuschange_StatusChange $em) {
        $hasil = 0;
        if ($em->getId() == 0) {
            return $hasil;
        }
        $status = $em->getNewStatus();
        if ($status instanceof Hrd_Models_Master_StatusInformation) {

            //update by mike 14/04/2023 | penambahan masa kerja & usia kerja

            // $hasil = $this->dbTable->SPUpdate('sp_statuschange_update', $em->getAddBy(), $em->getId(), $em->getNewEmployeeStatus()->getId(), $status->getHireDate(), $status->getAssignationDate(), $status->getContractStart(), $status->getContractEnd(), 
            //     $status->getConsultantStart(), $status->getConsultantEnd(),
            //     $status->getTemporaryStart(), $status->getTemporaryEnd(), $status->getContractKe(), 
            //     $status->getConsultantKe(),
            //     $em->getApproved(), $em->getSkNumber(), $em->getEffectiveDate(), $em->getNotes());

            $hasil = $this->dbTable->SPUpdate('sp_statuschange_update', $em->getAddBy(), $em->getId(), $em->getNewEmployeeStatus()->getId(), $status->getHireDate(), $status->getAssignationDate(), $status->getContractStart(), $status->getContractEnd(), 
                $status->getConsultantStart(), $status->getConsultantEnd(),
                $status->getTemporaryStart(), $status->getTemporaryEnd(), $status->getContractKe(), 
                $status->getConsultantKe(),
                $em->getIsPensiun(),
                $em->getIsKompensasi(), $em->getMasaKerjaStartDate(), $em->getUsiaKerjaStartDate(),
                $em->getApproved(), $em->getSkNumber(), $em->getEffectiveDate(), $em->getNotes());

        }

        return $hasil;
    }

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_statuschange_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }

    //added by anas 22012024
    public function getAllHistory($statuschange_id, $employee_id) {
        $hasil = 0;

        // var_dump($d->getEmployee()->getId());
        $hasil = $this->dbTable->SPExecute('sp_statuschange_history_read', $statuschange_id, $employee_id);

        return $hasil;
    }

    //added by anas 30012024
    public function checkpmcontract($statuschange_id, $employee_id) {
        $hasil = 0;

        // var_dump($d->getEmployee()->getId());
        $hasil = $this->dbTable->SPExecute('sp_statuschange_checkcontract_read', $statuschange_id, $employee_id);

        return $hasil;
    }

}

?>
