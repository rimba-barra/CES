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
class Hrd_Models_General_Dao extends Box_Models_App_AbDao{
    public function getAllProject(Box_Models_App_HasilRequestRead $r) {
        $hasil = 0;
        
     //   var_dump($d->getProject()->getId(),$d->getPt()->getId());
        
        $hasil = $this->dbTable->SPExecute('sp_project_read',$r->getPage(), $r->getLimit());
        
        
       // var_dump($this->dbTable);
        return $hasil;
    }
    
    public function getAllProjectWOPL() {
        $hasil = 0;
        
     //   var_dump($d->getProject()->getId(),$d->getPt()->getId());
        
        $hasil = $this->dbTable->SPExecute('sp_project_read',1, 9999);
        
        
       // var_dump($this->dbTable);
        return $hasil;
    }
        
    public function getAllProjectsh($projectId,$ptId) {
        $hasil = 0;
        
     //   var_dump($d->getProject()->getId(),$d->getPt()->getId());
        
        $hasil = $this->dbTable->SPExecute('sp_projectsh_read', 1, 9999, $projectId, $ptId);
        
        
       // var_dump($this->dbTable);
        return $hasil;
    }
	
    public function getAbsentCuti($employeeId,$year,$projectId,$ptId) {
        $hasil = 0;
        

        
        $hasil = $this->dbTable->SPExecute('sp_personalhistory_absentcuti_read',
                $projectId,$ptId,$employeeId,$year,5);
     
        return $hasil;
    }
    
    public function getRekapJatahCutiPerKaryawan($employeeId) {
        $hasil = 0;
        

        
        $hasil = $this->dbTable->SPExecute('sp_personalhistory_absentcuti_jatah_read',
                $employeeId);
     
        return $hasil;
    }
    
    public function getAllJenjangPendidikan($projectId,$ptId){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_jenjangpendidikan_read',1,99999,$projectId,$ptId);
        return $hasil;
    }
    
    public function getAllCurrency(){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_currency_read',1,99999);
        return $hasil;
    }
    
    public function getAllJenisPenghargaan(){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_jenispenghargaan_read',1,99999);
        return $hasil;
    }
    
    public function getMasterDataId($tableName,$code,$projectId,$ptId){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_masterdatacode_read',$tableName,$projectId,$ptId,$code);
        return $hasil;
    }
	
	public function getAllPt(Box_Models_App_HasilRequestRead $r) {
        $hasil  = 0;
        $hasil  = $this->dbTable->SPExecute('sp_pt_read', $r->getPage(), $r->getLimit());

        return $hasil;
    }

    public function getAllPtWOPL() {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_pt_read', 1, 9999);

        return $hasil;
    }
    
    public function getAbsentSheetByListKaryawan($ids,$project,$pt,$startDate,$endDate){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_absentsheetrangedate_read',$ids,$project,$pt,$startDate,$endDate);
        
     
        
        return $hasil;
    }
    
    public function getHakCutiByListKaryawan($ids,$project,$pt,$leaveGroup){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_hakcutirangedate_read',$ids,$project,$pt,$leaveGroup);
        return $hasil;
    }
        
    public function getAllPtsh($projectId,$ptId) {
        $hasil = 0;
        
     //   var_dump($d->getProject()->getId(),$d->getPt()->getId());
        
        $hasil = $this->dbTable->SPExecute('sp_ptsh_read', 1, 9999, $projectId, $ptId);
        
        
       // var_dump($this->dbTable);
        return $hasil;
    }

    //added by anas 02022022
    public function getAllProjectbySH($subholding_id, $session) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_allprojectbysh_read', $subholding_id, $session->getUserId(), $session->getGroupId());
        return $hasil;
    }

    //added by anas 02022022
    public function getAllPTbyProject($subholding_id, $pt_id, $session) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_allptbyshproject_read', $subholding_id, $pt_id, $session->getUserId(), $session->getGroupId());
        return $hasil;
    }

    //added by anas 17022022
    public function getAllSubholding($session) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_allsubholding_read', 1, 999, $session->getUserId(), $session->getGroupId());
        return $hasil;
    }

    //added by michael 20221004
    public function getAllSubholdingClaim($session) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_allsubholding_claim_read', 1, 999, $session->getUserId(), $session->getGroupId());
        return $hasil;
    }

    public function getAllProjectbySHClaim($subholding_id, $session) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_allprojectbysh_claim_read', $subholding_id, $session->getUserId(), $session->getGroupId());
        return $hasil;
    }

    public function getAllPTbyProjectClaim($subholding_id, $pt_id, $session) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_allptbyshproject_claim_read', $subholding_id, $pt_id, $session->getUserId(), $session->getGroupId());
        return $hasil;
    }
}
