<?php

/**
 * Description of TukeroffDao
 *
 * @author MIS - AHMAD RIADI
 */
class Hrd_Models_Master_TukeroffDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {

    public function save(Hrd_Models_Master_Tukeroff $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_tukeroff_create', 
                                            $d->getAddBy(), 
                                            $d->getAddon(), 
                                            $d->getModion(), 
                                            $d->getProject_id(), 
                                            $d->getPt_id(), 
                                            $d->getEmployee_id(),
                                            $d->getReport_hod_id(),
                                            $d->getReport_cc_id(),
                                            $d->getTransaksi_id_client(),
                                            $d->getTukeroff_date(),
                                            $d->getDari_tanggal(),
                                            $d->getKe_tanggal(),
                                            $d->getDari_shifttype_id(),
                                            $d->getKe_shifttype_id(),
                                            $d->getJam_masuk(),
                                            $d->getJam_pulang(),
                                            $d->getDari_description(),
                                            $d->getKe_description(),
                                            $d->getIs_fullday(),
                                            $d->getIs_canceled(),
                                            $d->getIs_approve(),
                                            $d->getDari_Absentdetail_id(),
                                            $d->getKe_absentdetail_id()
                                            );

	//print_r($this->dbTable);
        return $hasil;

	
    }

    public function getAll_in_Temp(Box_Models_App_HasilRequestRead $r, Hrd_Models_Master_Tukeroff $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_tukeroff_tmp_read', 
                                            $r->getPage(), 
                                            $r->getLimit(), 
                                            $d->getProject_id(),
                                            $d->getPt_id(), 
                                            $d->getTransaksi_id_client(), 
                                            $d->getEmployee_id(),
                                            $d->getDepartment_id(),
                                            $d->getDaritanggal_pengajuan(),
                                            $d->getSampaitanggal_pengajuan(),
                                            $d->getDaritanggal_perubahan(),
                                            $d->getSampaitanggal_perubahan(),
                                            $d->getIs_fullday(),
                                            $d->getIs_canceled(),
                                            $d->getIs_approve(),
                                            $d->getIs_process()
                                ); //var_dump($this->dbTable);
        return $hasil;
    }
    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Master_Tukeroff $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_tukeroff_read', 
                                            $r->getPage(), 
                                            $r->getLimit(), 
                                            $d->getProject_id(),
                                            $d->getPt_id(), 
                                            $d->getEmployee_id(),
                                            $d->getDepartment_id(),
                                            $d->getDaritanggal_pengajuan(),
                                            $d->getSampaitanggal_pengajuan(),
                                            $d->getDaritanggal_perubahan(),
                                            $d->getSampaitanggal_perubahan(),
                                            $d->getIs_fullday(),
                                            $d->getIs_canceled(),
                                            $d->getIs_approve()
                                );     
        return $hasil;
    }

    public function getAllWoPL(Hrd_Models_Master_Tukeroff $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_tukeroff_read',
                                            1,
                                            9999, 
                                            $d->getProject_id(),
                                            $d->getPt_id()
                                            );
        return $hasil;
    }
    public function DataApprove(Hrd_Models_Master_Tukeroff $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_tukeroff_approve',                                          
                                            $d->getProject_id(),
                                            $d->getPt_id()
                                            );
        return $hasil;
    }
    public function DataCancel(Hrd_Models_Master_Tukeroff $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_tukeroff_cancel',                                          
                                            $d->getProject_id(),
                                            $d->getPt_id()
                                            );
        return $hasil;
    }

    public function update(Hrd_Models_Master_Tukeroff $param) {
        $hasil = 0;
        if ($param->getTukeroff_id() == 0) {
            return $hasil;
        }

        $hasil = $this->dbTable->SPUpdate('sp_tukeroff_update', 
                                            $d->getTukeroff_id(), 
                                            $d->getAddBy(), 
                                            $d->getAddon(), 
                                            $d->getModion(), 
                                            $d->getProject_id(), 
                                            $d->getPt_id(), 
                                            $d->getEmployee_id(),
                                            $d->getReport_hod_id(),
                                            $d->getReport_cc_id(),
                                            $d->getTransaksi_id_client(),
                                            $d->getTukeroff_date(),
                                            $d->getDari_tanggal(),
                                            $d->getKe_tanggal(),
                                            $d->getDari_shifttype_id(),
                                            $d->getKe_shifttype_id(),
                                            $d->getJam_masuk(),
                                            $d->getJam_pulang(),
                                            $d->getDari_description(),
                                            $d->getKe_description(),
                                            $d->getIs_fullday(),
                                            $d->getIs_canceled(),
                                            $d->getIs_approve()
                                        );
        return $hasil;
    }
    
    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_tukeroff_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }

}

?>
