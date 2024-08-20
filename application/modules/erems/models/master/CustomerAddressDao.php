<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of CustomerAddressDao
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Master_CustomerAddressDao extends Erems_Box_Models_App_AbDao implements Erems_Box_Models_App_BlackHole {
    
    
    public function getAllByCustomerWOPL($customerId){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_customeraddress_read',$customerId,1,9999);
      
        return $hasil; 
    }
    
    public function save(Erems_Models_Customer_CustomerAddress $cs){
        $row = 0;



        if(!$cs->getAddBy()){
            return $row;
        }
       
        $row = $this->dbTable->SPUpdate('sp_customeraddress_create',
                $cs->getAddBy(),
                $cs->getCustomer()->getId(),
                $cs->getAddress(),
                $cs->getIsDefault());
      // $this->dbTable->printDbError();
        return $row;
        
    }
    
    public function update(Erems_Models_Customer_CustomerAddress $cs){

        $row = 0;
        if($cs->getId()==0 || !$cs->getModiBy()){
            return $row;
        }
        $row = $this->dbTable->SPUpdate('sp_customeraddress_update',
                $cs->getModiBy(),
                $cs->getId(),
                $cs->getAddress(),
                $cs->getIsDefault());
         
        return $row;
        
    }
    
    public function directDelete(\Erems_Box_Models_App_Decan $decan, \Erems_Box_Kouti_InterSession $session) {
         $row = 0;
        $row = $this->dbTable->SPUpdate('sp_customeraddress_destroy', $decan->getString(), $session->getUserId());
      
        return $row;
    }
    
    public function deleteOne($userId,$id) {
         $row = 0;
        $row = $this->dbTable->SPUpdate('sp_customeraddress_destroy', $id, $userId);
      
        return $row;
    }

    public function getAllByCustomerWOPLTmp($customerId){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_customeraddress_tmp_read',$customerId,1,9999);
      
        return $hasil; 
    }

    public function saveTmp(Erems_Models_Customer_CustomerAddress $cs){
        $row = 0;

        if(!$cs->getAddBy()){
            return $row;
        }
       
        $row = $this->dbTable->SPUpdate('sp_customeraddress_tmp_create',
                $cs->getAddBy(),
                $cs->getCustomer()->getId(),
                $cs->getAddress(),
                $cs->getIsDefault());
      // $this->dbTable->printDbError();
        return $row;
        
    }
    
    public function updateTmp(Erems_Models_Customer_CustomerAddress $cs){
        $row = 0;
        if($cs->getId()==0 || !$cs->getModiBy()){
            return $row;
        }
        $row = $this->dbTable->SPUpdate('sp_customeraddress_tmp_update',
                $cs->getModiBy(),
                $cs->getId(),
                $cs->getAddress(),
                $cs->getIsDefault());
         
        return $row;
        
    }
    
    public function directDeleteTmp(\Erems_Box_Models_App_Decan $decan, \Erems_Box_Kouti_InterSession $session) {
         $row = 0;
        $row = $this->dbTable->SPUpdate('sp_customeraddress_tmp_destroy', $decan->getString(), $session->getUserId());
      
        return $row;
    }
    
    public function deleteOneTmp($userId,$id) {
         $row = 0;
        $row = $this->dbTable->SPUpdate('sp_customeraddress_tmp_destroy', $id, $userId);
      
        return $row;
    }

    public function getIsNewRevisionAddress($customer_id){
        $hasil = $this->dbTable->SPExecute('sp_customeraddress_tmp_check', $customer_id);
        if(isset($hasil[0][0])){
            $hasil = $hasil[0][0]["customeraddress_id"];
        }else{
            $hasil = 0;
        }

        return $hasil;
    }

    public function approve(Erems_Models_Customer_CustomerAddress $cs){
        $row = 0;
        if($cs->getId()==0 || !$cs->getModiBy()){
            return $row;
        }
        $row = $this->dbTable->SPUpdate('sp_customeraddress_tmp_update',
                $cs->getModiBy(),
                $cs->getId(),
                $cs->getAddress(),
                $cs->getIsDefault());
         
        return $row;
        
    }
}
