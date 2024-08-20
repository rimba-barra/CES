<?php

class Erems_Models_Jatuhtempo_Dao extends Erems_Box_Models_App_AbDao implements Erems_Box_Models_App_BlackHole{
   
    
 
    public function getAllByPageLimit($page,$limit,$project,$pt,$unitNumber,$customerName,$processDate,$jatuhtempotypeId){
        $hasil = array();

        
        $hasil = $this->dbTable->SPExecute('sp_popup_jatuhtempo_page_read',
                $project,$pt,$page,$limit,
                $unitNumber,$customerName,
                $processDate,$jatuhtempotypeId
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
