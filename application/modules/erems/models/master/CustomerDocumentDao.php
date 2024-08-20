<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of CustomerDocumentDao
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Master_CustomerDocumentDao extends Erems_Box_Models_App_AbDao implements Erems_Box_Models_App_BlackHole {
    public function getAll(Erems_Box_Models_App_Session $ses){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_customerdocument_read',$ses->getProject()->getId(),$ses->getPt()->getId());
      
        return $hasil; 
    }
    
    public function getAllByCustomerWOPL($params){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_customerdocument_read ',$params['customer_id'],$params['temp_id']);
      
        return $hasil; 
    }
    
    public function getAllDocumentType(){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_documenttype_read');
      
        return $hasil; 
    }

    public function save(Erems_Models_Customer_CustomerDocument $cs){
        $row = 0;
       
        if(!$cs->getAddBy()){
            return $row;
        }
       
        $row = $this->dbTable->SPUpdate('sp_customerdocument_create',
                $cs->getAddBy(),
                $cs->getCustomer()->getId(),
                $cs->getDocumentType()->getId(),
                $cs->getFileName(),
                $cs->getDescription());
      // $this->dbTable->printDbError();
        
        return $row;
        
    }
    
    public function update(Erems_Models_Customer_CustomerDocument $cs){
        $row = 0;
        if($cs->getId()==0 || !$cs->getModiBy()){
            return $row;
        }
        
        $row = $this->dbTable->SPUpdate('sp_customerdocument_update',
                $cs->getModiBy(),
                $cs->getId(),
                $cs->getDocumentType()->getId(),
                $cs->getFileName(),
                $cs->getDescription());
         
        return $row;
        
    }
    
    public function directDelete(\Erems_Box_Models_App_Decan $decan, \Erems_Box_Kouti_InterSession $session) {
         $row = 0;
        $row = $this->dbTable->SPUpdate('sp_customerdocument_destroy', $decan->getString(), $session->getUserId());
      
        return $row;
    }
    
    public function deleteOne($userId,$id) {
         $row = 0;
        $row = $this->dbTable->SPUpdate('sp_customerdocument_destroy', $id, $userId);
      
        return $row;
    }

    public function getAllByCustomerWOPLTmp($customerId){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_customerdocument_tmp_read',$customerId);
      
        return $hasil; 
    }

    public function saveTmp(Erems_Models_Customer_CustomerDocument $cs){
        $row = 0;
       
        if(!$cs->getAddBy()){
            return $row;
        }
       
        $row = $this->dbTable->SPUpdate('sp_customerdocument_tmp_create',
                $cs->getAddBy(),
                $cs->getCustomer()->getId(),
                $cs->getDocumentType()->getId(),
                $cs->getFileName(),
                $cs->getDescription());
      // $this->dbTable->printDbError();
        
        return $row;
        
    }
    
    public function updateTmp(Erems_Models_Customer_CustomerDocument $cs){
        $row = 0;
        if($cs->getId()==0 || !$cs->getModiBy()){
            return $row;
        }
        
        $row = $this->dbTable->SPUpdate('sp_customerdocument_tmp_update',
                $cs->getModiBy(),
                $cs->getId(),
                $cs->getDocumentType()->getId(),
                $cs->getFileName(),
                $cs->getDescription());
         
        return $row;
        
    }
    
    public function directDeleteTmp(\Erems_Box_Models_App_Decan $decan, \Erems_Box_Kouti_InterSession $session) {
         $row = 0;
        $row = $this->dbTable->SPUpdate('sp_customerdocument_tmp_destroy', $decan->getString(), $session->getUserId());
      
        return $row;
    }
    
    public function deleteOneTmp($userId,$id) {
         $row = 0;
        $row = $this->dbTable->SPUpdate('sp_customerdocument_tmp_destroy', $id, $userId);
      
        return $row;
    }

    public function getIsNewRevisionDocument($customer_id){
        $hasil = $this->dbTable->SPExecute('sp_customerdocument_tmp_check', $customer_id);
        if(isset($hasil[0][0])){
            $hasil = $hasil[0][0]["customerdocument_id"];
        }else{
            $hasil = 0;
        }

        return $hasil;
    }

    //added by anas 28092021
    public function getAllCDocumentCustomerByFilter(Erems_Box_Models_App_HasilRequestRead $r, Erems_Box_Models_App_Session $ses){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_documentcustomer_read',
                    $ses->getProject()->getId(),
                    $ses->getPt()->getId(),
                    $r->getOthersValue("code"),
                    $r->getOthersValue("name"),
                    $r->getOthersValue("birthdate"),
                    $r->getOthersValue("ktp_number"),
                    $r->getPage(),
                    $r->getLimit()
                );
      
        return $hasil; 
    }      

    // added by rico 26102021
    public function saveDocumentInformation($params){
        $hasil = array();

        $user = $this->dbTable->SPExecute('sp_current_user',$params['user_id']);

        $hasil = $this->dbTable->SPExecute('sp_documentcustomer_create_info',
            $params['user_id'],
            $params['document_id'],
            $params['customer_id'],
            $params['filename'],
            $params['type'],
            $params['description'],
            $user[0][0]['user_email'],
            $params['project_id'],
            $params['pt_id'],
            $params['alasan']
        );

        return $hasil;
    } 

    public function readDocumentInformation($params){
        $hasil = array();

        $hasil = $this->dbTable->SPExecute('sp_documentcustomer_read_info',
            $params['customer_id'],
            $params['project_id'],
            $params['pt_id']
        );

        return $hasil;
    }  

    // added by rico 26102021
    public function saveCustomerPhone($params){
        $hasil = array();

        $hasil = $this->dbTable->SPExecute('sp_customerphone_create',
            $params['user_id'],
            $params['customer_id'],
            $params['project_id'],
            $params['pt_id'],
            $params['department_id'],
            $params['phone'],
            $params['description']
        );

        return $hasil;
    }

    public function readCustomerPhone($params){
        $hasil = array();

        $hasil = $this->dbTable->SPExecute('sp_customerphone_read',
            $params['project_id'],
            $params['pt_id'],
            $params['customer_id']
        );

        return $hasil;
    }

    // added by rico 26102021
    public function updateCustomerPhone($params){
        $hasil = array();

        $hasil = $this->dbTable->SPExecute('sp_customerphone_update',
            $params['user_id'],
            $params['customerphone_id'],
            $params['customer_id'],
            $params['department_id'],
            $params['phone'],
            $params['description']
        );

        return $hasil;
    }
    
    public function deleteOnePhone($userId,$id) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_customerphone_destroy', $id, $userId);
      
        return $row;
    }

    // added by rico 20072022
    public function saveCustomerKomunikasi($params){
        $hasil = array();

        $hasil = $this->dbTable->SPExecute('sp_customerkomunikasi_create',
            $params['user_id'],
            $params['customer_id'],
            $params['email'],
            $params['customerphone'],
            $params['log_komunikasi']
        );

        return $hasil;
    }

    public function readCustomerKomunikasi($params){
        $hasil = array();

        $hasil = $this->dbTable->SPExecute('sp_customerkomunikasi_read',
            $params['project_id'],
            $params['pt_id'],
            $params['customer_id']
        );

        return $hasil;
    }

    public function updateCustomerKomunikasi($params){
        $hasil = array();

        $hasil = $this->dbTable->SPExecute('sp_customerkomunikasi_update',
            $params['user_id'],
            $params['customer_id'],
            $params['email'],
            $params['customerphone'],
            $params['log_komunikasi'],
            $params['customer_komunikasi_id']
        );

        return $hasil;
    }
    
    public function deleteOneKomunikasi($userId,$id) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_customerkomunikasi_destroy', $id, $userId);
      
        return $row;
    }

    public function readEmailCustomer($userId){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_current_user', $userId );
        
        return $hasil[0][0];
    }
}
