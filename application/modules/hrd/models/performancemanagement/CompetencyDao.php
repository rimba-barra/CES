<?php

class Hrd_Models_Performancemanagement_CompetencyDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole  {
    
    public function save(Hrd_Models_Performancemanagement_Competency $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
            'sp_competency_create',
            $d->getAddBy(),
            $d->code,
            str_replace("'", '`', $d->desc),
            $d->catid,
            $d->nameid,
            $d->jobid
        );
        
        return $hasil;
    }

    public function update(Hrd_Models_Performancemanagement_Competency $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
            'sp_competency_update', 
            $d->getAddBy(),
            $d->getId(),
            $d->catid,
            $d->nameid,
            $d->jobid,
            $d->code,
            str_replace("'", '`', $d->desc)
        );

        return $hasil;
    }

    public function getCompetency(Box_Models_App_HasilRequestRead $r, $jobfamilyId) {
        $hasil = 0;        
        $hasil = $this->dbTable->SPExecute(
            'sp_competencyformatrix_read',
            $jobfamilyId
        );

        return $hasil;
    }
    
    // added by Wulan Sari 25.04.2018
    public function getCompetencyUpdate(Box_Models_App_HasilRequestRead $r, $jobfamilyId, $id) {
        $hasil = 0;        
        $hasil = $this->dbTable->SPExecute(
            'sp_competencyformatrix_update_read',
            $jobfamilyId,
            $id
        );

        return $hasil;
    }

    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Performancemanagement_Competency $d) {
        $hasil = 0;        
        $hasil = $this->dbTable->SPExecute(
            'sp_competency_read', 
            $r->getPage(), 
            $r->getLimit(),
            $d->category,
            $d->competencyname,
            $d->jobfamily,
            $d->code,
            $d->desc,
            0
        );
// var_dump($this->dbTable); // ngecek sql server error
// var_dump($hasil); // ngecek sql server error

        return $hasil;
    }
    
    public function deleteOne($id,$userId) {
        $row = 0;
        $row = $this->dbTable->SPUpdate(
            'sp_competency_destroy',
            $id,
            $userId
        );

        return $row;
    }
  
    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate(
            'sp_competency_destroy', 
            $decan->getString(), 
            $session->getUserId()
        );

        return $row;
    }

    public function codeExist(Hrd_Models_Performancemanagement_Competency $d) {
        $hasil = array();

        $hasil = $this->dbTable->SPExecute(
            'sp_competencycodeexist_read', 
            $d->code
        );

        return $hasil;
    }
}
