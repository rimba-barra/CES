<?php

class Hrd_Models_Performancemanagement_BandingDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {
    
    public function save(Hrd_Models_Performancemanagement_Banding $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
            'sp_banding_create',
            $d->getAddBy(),
            $d->code,
            $d->banding,
            str_replace("'", '`', $d->description),
            $d->index_no
            );
        
        return $hasil;
    }
    
    public function update(Hrd_Models_Performancemanagement_Banding $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
            'sp_banding_update',
            $d->getAddBy(),
            $d->getId(),
            $d->code,
            $d->banding,
            str_replace("'", '`', $d->description),
            $d->index_no
            );
        
        return $hasil;
    }
    
    public function getAllCat(Hrd_Models_Performancemanagement_Banding $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute(
            'sp_banding_read',
            1,
            9999,
            '',
            ''
            );
        
        return $hasil;
    }

    public function getAllBanding(Hrd_Models_Performancemanagement_Banding $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute(
            'sp_banding_read',
            1,
            9999,
            '',
            ''
            );
        
        $hasil_gabungan = $this->getAllBanding_Upload($d,$hasil);

        //return $hasil;
        return $hasil_gabungan;
    }

    public function getAllBanding_Upload(Hrd_Models_Performancemanagement_Banding $d, $hasil) {
        $hasil_upload = 0;
        $hasil_upload = $this->dbTable->SPExecute(
            'sp_upload_master_banding_read',
            1,
            9999,
            '',
            ''
            );
        
        $hasil_gabungan_total = $hasil_upload[0][0]['totalRow'] + $hasil[0][0]['totalRow'];
        $hasil_gabungan_data  = array_merge($hasil[1],$hasil_upload[1]);
        $hasil_result[0][0]['totalRow'] = $hasil_gabungan_total;
        $hasil_result[1] = $hasil_gabungan_data;

        return $hasil_result;
    }
    
    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Performancemanagement_Banding $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute(
            'sp_banding_read',
            $r->getPage(),
            $r->getLimit(),
            $d->code,
            $d->banding
            );
        // var_dump($this->dbTable); // ngecek sql server error
        // var_dump($hasil); // ngecek sql server error
        
        return $hasil;
    }
    
    public function deleteOne($id,$userId) {
        $row = 0;
        $row = $this->dbTable->SPUpdate(
            'sp_banding_destroy',
            $id,
            $userId
            );
        
        return $row;
    }
    
    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        
        // wulan edit 2020 11 05
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_banding_cektransaksi_read', $decan->getString());
        if($hasil[1][0]['count'] > 0){
            echo 'in used';
            exit;
        }
        
        $row = 0;
        $row = $this->dbTable->SPUpdate(
            'sp_banding_destroy',
            $decan->getString(),
            $session->getUserId()
            );
        
        return $row;
    }
    
    public function codeExist(Hrd_Models_Performancemanagement_Banding $d) {
        $hasil = array();
        
        $hasil = $this->dbTable->SPExecute(
            'sp_bandingcodeexist_read',
            $d->code
            );
        
        return $hasil;
    }
    
    // wulan edit 2020 11 05    
    public function nameExist(Hrd_Models_Performancemanagement_Banding $d) {
        $hasil = array();
        
        $hasil = $this->dbTable->SPExecute(
            'sp_bandingnameexist_read',
            $d->banding,
            $d->getId()
            );
        //var_dump($this->dbTable);
        return $hasil;
    }

    // added by Michael 2021.05.19
    public function getAllWOPL_CustomProjectPt(Hrd_Models_Performancemanagement_Banding $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute(
            'sp_banding_read',
            1,
            9999,
            '',
            ''
            );
        
        $hasil_gabungan = $this->getAllBanding_Upload($d,$hasil);

        //return $hasil;
        return $hasil_gabungan;
    }
    // end added by Michael 2021.05.19

    //added by michael 20220614 | untuk keperluan Cuti Hotel
    public function getAllBandingParamCuti(Hrd_Models_Performancemanagement_Banding $d, $data) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute(
            'sp_parametercuti_permanent_banding_read',
            $data['parametercuti_id'],
            1,
            9999
            );
        
        return $hasil;
    }

    public function getAllBandingParamCutiContract(Hrd_Models_Performancemanagement_Banding $d, $data) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute(
            'sp_parametercuti_contract_banding_read',
            $data['parametercuti_id'],
            1,
            9999
            );
        
        return $hasil;
    }
    //---
    public function getAllBandingParamCutiPh(Hrd_Models_Performancemanagement_Banding $d, $data) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute(
            'sp_parametercutiph_permanent_banding_read',
            $data['parametercutiph_id'],
            1,
            9999
            );
        
        return $hasil;
    }

    public function getAllBandingParamCutiPhContract(Hrd_Models_Performancemanagement_Banding $d, $data) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute(
            'sp_parametercutiph_contract_banding_read',
            $data['parametercutiph_id'],
            1,
            9999
            );
        
        return $hasil;
    }

    public function getAllBandingHolidayname(Hrd_Models_Performancemanagement_Banding $d, $data) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute(
            'sp_holidayname_banding_read',
            1,
            9999
            );
        
        return $hasil;
    }

    public function getAllBandingParamCutiPhSpecial(Hrd_Models_Performancemanagement_Banding $d, $data) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute(
            'sp_parametercutiph_permanent_banding_holidayname_read',
            $data['parametercutiph_id'],
            1,
            9999
            );
        
        return $hasil;
    }

    public function getAllBandingParamCutiPhContractSpecial(Hrd_Models_Performancemanagement_Banding $d, $data) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute(
            'sp_parametercutiph_contract_banding_holidayname_read',
            $data['parametercutiph_id'],
            1,
            9999
            );
        
        return $hasil;
    }
}

?>