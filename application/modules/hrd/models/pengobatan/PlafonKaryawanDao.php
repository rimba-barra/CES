<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of PlafonKaryawanDao
 *
 * @author MIS
 */
class Hrd_Models_Pengobatan_PlafonKaryawanDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {
    public function save(Hrd_Models_Pengobatan_PlafonKaryawan $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_plafonkaryawan_create', $d->getAddBy(),
                $d->getProject()->getId(),$d->getPt()->getId(),
                $d->getEmployee()->getId(),
                $d->getYearly(),$d->getGlobal(),$d->getObat(),
                $d->getDokter(),$d->getGigi(),$d->getLab(),
                $d->getRawatInap(),$d->getSalinNormal(),$d->getSalinAbNormal(),
                $d->getKehamilan(),$d->getKeluargaBerencana(),$d->getCekup(),
                $d->getLensa(),$d->getFrame(),$d->getLainlain());
       
        
        return $hasil;
    }
    
    public function saveGen(Box_Models_App_Session $ses,Box_Models_App_DecanForObject $decan,$arData) {
        $hasil = 0;
        $data = $decan->getDCResult();
        $hasil = $this->dbTable->SPUpdate('sp_plafonkaryawangenerate_create',
                $ses->getUser()->getId(),
                $ses->getProject()->getId(),
                $ses->getPt()->getId(),
                $data["plafonkaryawan_id"],
                $data["employee_employee_id"],
                $data["year"],
                $data["is_global"],
                $arData["plafonkaryawanvalue_id"],
                $arData["jenispengobatan_jenispengobatan_id"],
                $arData["value"],
                $arData["plafonkaryawan_plafonkaryawan_id"]
                );
       
                var_dump($this->dbTable);
        
        return $hasil;
    }
    
    public function getByEmployee(Hrd_Models_Pengobatan_PlafonKaryawan $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_plafonkaryawanone_read',$d->getEmployee()->getId(),$d->getProject()->getId(),$d->getPt()->getId(),$d->getYear());
        return $hasil;
    }

    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Pengobatan_PlafonKaryawan $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_plafonkaryawan_read', $r->getPage(), $r->getLimit(),$d->getProject()->getId(),$d->getPt()->getId(), $d->getYear());
        return $hasil;
    }
    
    
    
    public function getAllByYear(Box_Models_App_HasilRequestRead $r, Hrd_Models_Pengobatan_PlafonKaryawan $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_plafonkaryawanbyyear_read',$d->getProject()->getId(),$d->getPt()->getId(), $d->getYear());
        return $hasil;
    }
    
    //sp_plafonkaryawanbyyear_read
    
    public function checkExist(Hrd_Models_Pengobatan_PlafonKaryawan $d){
        //
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_plafonpengobatanexist_read',$d->getYear(),$d->getEmployeeGroup()->getId(),$d->getType()->getId());
        return $hasil;
    }
    
    public function getYears(Box_Models_App_Session $ses){
        //
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_plafonpengobatanallyear_read',1,100,$ses->getProject()->getId(),$ses->getPt()->getId());
        return $hasil;
    }
    
    
    public function copyfromold(Box_Models_App_Session $ses) {
        $hasil = 0;
       

        $hasil = $this->dbTable->SPUpdate('sp_plafonpengobatancopy_create',$ses->getUser()->getId(),$ses->getProject()->getId(),$ses->getPt()->getId());
        return $hasil;
    }
   

    public function update(Hrd_Models_Pengobatan_PlafonKaryawan $d) {
        $hasil = 0;
        if ($d->getId() == 0) {
            return $hasil;
        }

        $hasil = $this->dbTable->SPUpdate('sp_plafonkaryawan_update', $d->getAddBy(), $d->getId(),$d->getYear(),$d->getStartDate(),$d->getEndDate(),$d->getEmployeeGroup()->getId(),$d->getType()->getId(),$d->getValue());
        return $hasil;
    }
    
    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_plafonkaryawan_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }    
}

?>
