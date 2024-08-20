<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Dao
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Companycherry_Dao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {
    public function save(Hrd_Models_Companycherry_Companycherry $d) {
        $hasil = 0;
        // $hasil = $this->dbTable->SPUpdate('sp_companycherry_create',
        //         $d->getAddBy(),
        //         //$d->getProject()->getId(),
        //        //$d->getPt()->getId(),
        //         $d->getPtptId());

        $hasil = 1;
        return $hasil;
    }
    
    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Companycherry_Companycherry $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_companycherry_read',
                //$d->getProject()->getId(),
                //$d->getPt()->getId(),
                $d->getPtptId(),$r->getPage(), $r->getLimit());

        return $hasil;
    }
    
    public function getAllWoPL(Hrd_Models_Companycherry_Companycherry $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_companycherry_read',
               //$d->getProject()->getId(),
                //$d->getPt()->getId(),
                $d->getPtptId(),1,99999);
        return $hasil;
    }

    public function getAllCreate(Hrd_Models_Companycherry_Companycherry $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_companycherry_union_read',
               //$d->getProject()->getId(),
                //$d->getPt()->getId(),
                $d->getPtptId(),1,99999);
        return $hasil;
    }

    public function update(Hrd_Models_Companycherry_Companycherry $em) {
        $hasil = 0;
        if ($em->getId() == 0) {
            return $hasil;
        }
       
        $hasil = $this->dbTable->SPUpdate('sp_companycherry_update', $em->getAddBy(), $em->getId(), 
                $em->getPtptId(),
                $em->getCompanyCode()
                );
        return $hasil;
    }

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_companycherry_destroy', $decan->getString(), $session->getUserId());
        // print_r($row);die();
        return $row;
    }

    public function getCheckCompany(Box_Models_App_HasilRequestRead $r, Hrd_Models_Companycherry_Companycherry $em,$session,$data){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_companycherry_readcheck',
               $data['ptpt_id']);

        return $hasil;
    }

    public function getPtName(Box_Models_App_HasilRequestRead $r, Hrd_Models_Companycherry_Companycherry $em,$session,$data){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_ptaccess_readname',
               $data['ptpt_id']);
               
        return $hasil;
    }

    //URL USERNAME CHERRY
    public function getUrlUsername(Box_Models_App_HasilRequestRead $r, Hrd_Models_Companycherry_Companycherry $em,$session){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_urlusername_read',
                'development',
                1,
                9999);
               
        return $hasil;
    }

    //saveMaster

    public function saveMaster(Box_Models_App_HasilRequestRead $r, Hrd_Models_Companycherry_Companycherry $em,$session,$data) {
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_companycherry_create',
                $session->getUserId(),
                //$d->getProject()->getId(),
               //$d->getPt()->getId(),
                $data['ptpt_id'],
                $data['result_data_code']
            );

        return $hasil;
    }

    public function saveLog(Box_Models_App_HasilRequestRead $r, Hrd_Models_Companycherry_Companycherry $em,$session,$data,$jsonStringResult) {

        $hasil = 0;
        $insertstamp            = $jsonStringResult['InsertStamp'];
        $updatestamp            = $jsonStringResult['UpdateStamp'];

        $last_logprocessid      = $this->dbTable->SPExecute('sp_companycherry_readlast');
        if(empty($last_logprocessid[0])){
            $logprocessid       = 0;
        }else{
            $logprocessid       = $last_logprocessid[0][0]['log_process_id'];
        }

        $last_log = $logprocessid + 1;

        $hasil = $this->dbTable->SPUpdate('sp_companycherry_createlog',
                $last_log,

                $data['action'],
                $data['result_status'],
                $data['result_status_message'],
                $insertstamp,
                $updatestamp,

                $data['ptpt_id'],
                $data['ptname'],
                $data['company_id'],
                $data['result_data_code'],


                $session->getUserId(),
                1,
                0
            );

        return $hasil;
    }

    //REMOVE
    public function checkbefore(Box_Models_App_HasilRequestRead $r, Hrd_Models_Companycherry_Companycherry $em,$session,$data,$company_id){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_companycherry_readbeforedelete',
               $company_id );

        return $hasil;
    }

    public function getDataCompany(Box_Models_App_HasilRequestRead $r, Hrd_Models_Companycherry_Companycherry $em,$session,$data,$company_id){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_companycherry_readdata',
               $company_id );

        return $hasil;
    }

    public function saveLogDelete(Box_Models_App_HasilRequestRead $r, Hrd_Models_Companycherry_Companycherry $em,$session,$data,$jsonStringResult,$jsonStringHasil) {

        $hasil = 0;
        $insertstamp            = $jsonStringResult['InsertStamp'];
        $updatestamp            = $jsonStringResult['UpdateStamp'];


        $last_logprocessid      = $this->dbTable->SPExecute('sp_companycherry_readlast');
        if(empty($last_logprocessid[0])){
            $logprocessid       = 0;
        }else{
            $logprocessid       = $last_logprocessid[0][0]['log_process_id'];
        }

        $last_log = $logprocessid + 1;

        $hasil = $this->dbTable->SPUpdate('sp_companycherry_createlog',
                $last_log,

                $data['action'],
                $data['result_status'],
                $data['result_status_message'],
                $insertstamp,
                $updatestamp,

                $jsonStringHasil['pt_id'],
                $jsonStringHasil['pt_name'],
                $jsonStringHasil['company_id'],
                $jsonStringHasil['company_code'],


                $session->getUserId(),
                1,
                0
            );

        return $hasil;
    }

    public function deleteMaster(Box_Models_App_HasilRequestRead $r, Hrd_Models_Companycherry_Companycherry $em,$session,$data,$jsonStringHasil) {
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_companycherry_destroy',
                    $jsonStringHasil['company_id'],
                    $session->getUserId()
            );

        return $hasil;
    }
    
    public function saveTaxStatus(Box_Models_App_HasilRequestRead $r, Hrd_Models_Companycherry_Companycherry $em,$session,$data,$jsonStringResult) {

        $hasil = 0;

        foreach($jsonStringResult as $key => $item){
            $hasil = $this->dbTable->SPUpdate('sp_taxstatus_cherrycode_create',
                    $item['CompanyCode'],
                    $item['Code'],
                    $item['Name'],
                    $item['InsertStamp'],
                    $item['UpdateStamp'],
                    $session->getUserId()
                );
        }

        return $hasil;
    }

    public function saveEmpStatus(Box_Models_App_HasilRequestRead $r, Hrd_Models_Companycherry_Companycherry $em,$session,$data,$jsonStringResult) {

        $hasil = 0;

        $hasil = $this->dbTable->SPUpdate('sp_empstatus_cherrycode_create',
                $jsonStringResult['CompanyCode'],
                $jsonStringResult['Code'],
                $jsonStringResult['Name'],
                $session->getUserId()
            );

        return $hasil;
    }

}
