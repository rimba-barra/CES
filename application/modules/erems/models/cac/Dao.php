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
class Erems_Models_Cac_Dao extends Erems_Box_Models_App_AbDao implements Erems_Box_Models_App_BlackHole{
    public function getAllSMSCategory(Erems_Models_SMS_SMSCategory $sc){
        $hasil = array();
      
        $hasil = $this->dbTable->SPExecute('sp_smscategory_read',1,9999,$sc->getProject()->getId(),$sc->getPt()->getId(),$sc->getId(),$sc->getCode());
      
        return $hasil;
    }
    
    public function getSMSCategory(Erems_Models_SMS_SMSCategory $sc){
        $hasil = array();
      
        $hasil = $this->dbTable->SPExecute('sp_smscategory_read',1,1,$sc->getProject()->getId(),$sc->getPt()->getId(),$sc->getId(),"");
       
        return $hasil;
    }
    
    public function getAllTagihan($projectId,$ptId,$startDate,$endDate){
        $hasil = array();
      
        $hasil = $this->dbTable->SPExecute('sp_smstagihan_read',$projectId,$ptId,$startDate,$endDate);
       
        return $hasil;
    }
    
    public function getAllBerkas($projectId,$ptId){
        $hasil = array();
      
        $hasil = $this->dbTable->SPExecute('sp_smsberkas_read',$projectId,$ptId);
       
        return $hasil;
    }
    
    public function getAllSerahTerima($projectId,$ptId,$startDate,$endDate){
        $hasil = array();
      
        $hasil = $this->dbTable->SPExecute('sp_smsserahterima_read',$projectId,$ptId,$startDate,$endDate);
       
        return $hasil;
    }
    
    public function getAllHariRaya($projectId,$ptId,$tipeHariRaya){
        $hasil = array();
      
        $hasil = $this->dbTable->SPExecute('sp_smshariraya_read',$projectId,$ptId,$tipeHariRaya);
       
        return $hasil;
    }
    
    
    
    public function getAllAkad($projectId,$ptId,$startDate,$endDate){
        $hasil = array();
      
        $hasil = $this->dbTable->SPExecute('sp_smsakad_read',$projectId,$ptId,$startDate,$endDate);
       
        return $hasil;
    }
    
    public function getAllAjb($projectId,$ptId,$startDate,$endDate){
        $hasil = array();
      
        $hasil = $this->dbTable->SPExecute('sp_smsajb_read',$projectId,$ptId,$startDate,$endDate);
      
        return $hasil;
    }
    
    public function getAllProspek($projectId,$ptId){
        $hasil = array();
      
        $hasil = $this->dbTable->SPExecute('sp_smsprospek_read',$projectId,$ptId);
       
     
        return $hasil;
    }
    
    public function getAllKprAcc($projectId,$ptId,$startDate,$endDate){
        $hasil = array();
      
        $hasil = $this->dbTable->SPExecute('sp_smskpracc_read',$projectId,$ptId,$startDate,$endDate);
       
        return $hasil;
    }
    
    public function getAllWawancara($projectId,$ptId,$startDate,$endDate){
        $hasil = array();
      
        $hasil = $this->dbTable->SPExecute('sp_smswawancara_read',$projectId,$ptId,$startDate,$endDate);
       
        return $hasil;
    }
    
    public function getAll(Erems_Box_Models_App_HasilRequestRead $r,Erems_Models_SMS_SMS $sms,$unitNumber,$customerName,$processDate,$smsCategoryId){
        $hasil = array();

        
        $hasil = $this->dbTable->SPExecute('sp_sms_read',
                $sms->getProject()->getId(),$sms->getPt()->getId(),$r->getPage(),$r->getLimit(),
                $unitNumber,$customerName,
                $processDate,$smsCategoryId
                );
        
              
       
        return $hasil;
    }
    
    
    
   
    
    public function save(Erems_Models_Sms_SMS $sms){
        $hasil = 0;
      
        
       
       
        $hasil = $this->dbTable->SPUpdate('sp_sms_create',$sms->getAddBy(),
                $sms->getProject()->getId(),$sms->getPt()->getId(),
                $sms->getPurchaseletter()->getId(),
                $sms->getCustomer()->getId(),
                $sms->getPhoneNumber(),
                $sms->getSMSCategory()->getId(),
                $sms->getFlagType(),
                $sms->getProcessDate(),
                $sms->getCollectorId(),
                $sms->getNotes()
                );
          
       
        /*
       
        $hasil = $this->dbTable->SPUpdate('sp_blockb_create',$pc->getAddBy(),$pc->getProject()->getId(),
                $pc->getPt()->getId(),$pc->getCode(),$pc->getName(),$pc->getCluster()->getId(),$pc->getDescription());
        */
     
        return $hasil;
    }
    
    public function saveMultiSMS($userId,$projectId,$ptId,$decan){
        $hasil = 0;
        
        $dcResult = $decan->getDCResult();
        

       
       
        $hasil = $this->dbTable->SPUpdate('sp_sms_create',$userId,$projectId,$ptId,
                $dcResult["purchaseletter_id"],
                $dcResult["customer_customer_id"],
                $dcResult["sms_phonenumber"],
                $dcResult["smscategory_smscategory_id"],
                $dcResult["flag_type"],
                $dcResult["process_date"],
                $dcResult["collector_id"],
                $dcResult["notes"]
                );
        
     
        return $hasil;
    }
    
    public function codeExist(Erems_Models_Master_BlockTran $ft){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_blockcodeexist_read',$ft->getCode(),$ft->getCluster()->getId());
        
        return $hasil;
    }
    
    //sp_projectfacilitiestcodeexist_read
    
    public function update(Erems_Models_Sms_SMS $sms){
        $hasil = 0;
      
        $hasil = $this->dbTable->SPUpdate('sp_sms_update',$sms->getAddBy(),
                $sms->getId(),
                $sms->getCustomer()->getId(),
                $sms->getPhoneNumber(),
                $sms->getSMSCategory()->getId(),
                $sms->getProcessDate(),
                $sms->getNotes()
                );
        
              
              //  var_dump($this->dbTable);
        return $hasil;
    }

    public function directDelete(\Erems_Box_Models_App_Decan $decan, \Erems_Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_sms_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }
}
