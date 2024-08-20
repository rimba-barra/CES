<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of SourceMoneyDao
 *
 * @author MIS
 */
class Erems_Models_Master_SourceMoneyDao extends Erems_Box_Models_App_AbDao implements Erems_Box_Models_App_BlackHole {
    private $request;
    
    public function setRequest($r){
        $this->request = $r;
    }
    
    
    public function getAll(Erems_Box_Models_App_HasilRequestRead $request){
        $hasil = array();
      
        $name = array_key_exists("sourcemoney", $this->request)?$this->request["sourcemoney"]:"";
     
        $hasil = $this->dbTable->SPExecute('sp_sourcemoneyb_read',$request->getPage(),$request->getLimit(),$name);
        return $hasil; 
    }
    
    
    public function save(Erems_Models_Master_SourceMoney $pc){
        $hasil = 0;
      
       
          
       
       
        $hasil = $this->dbTable->SPUpdate('sp_sourcemoney_create',$pc->getAddBy(),$pc->getName(),$pc->getDescription());
        
     
        return $hasil;
    }
    
    public function codeExist(Erems_Models_Master_SourceMoney $ft){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_sourcemoneycodeexist_read',$ft->getName());
        
        return $hasil;
    }
    
    //sp_projectfacilitiestcodeexist_read
    
    public function update(Erems_Models_Master_SourceMoney $pc){
        $hasil = 0;
      
        $hasil = $this->dbTable->SPUpdate('sp_sourcemoney_update',$pc->getAddBy(),$pc->getId(),$pc->getName(),$pc->getDescription());
        
              
    
        return $hasil;
    }
    
    public function directDelete(\Erems_Box_Models_App_Decan $decan, \Erems_Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_sourcemoney_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }    //put your code here
}

?>
