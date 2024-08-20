<?php

class Erems_Models_MasterpanduanDao extends Erems_Box_Models_App_AbDao implements Erems_Box_Models_App_BlackHole {
    public function getAll(Erems_Box_Models_App_HasilRequestRead $request,Erems_Models_Masterpanduan $masterpanduan){
        $hasil = array();
      
        $hasil = $this->dbTable->SPExecute('sp_masterpanduan_read',$masterpanduan->getMenu(),$masterpanduan->getDescription(),$request->getPage(),$request->getLimit());
        return $hasil;
    }
    
    public function getAllWOPL(Erems_Models_Masterpanduan $masterpanduan){
        $hasil = array();
      
        $hasil = $this->dbTable->SPExecute('sp_masterpanduan_read',$masterpanduan->getMenu(),$masterpanduan->getDescription(),1,99999);
        return $hasil;
    }
    
    public function save(Erems_Models_Masterpanduan $masterpanduan){
        $hasil = 0;   
        $menu = str_replace("'", "''", $masterpanduan->getMenu());
        $desc = str_replace("'", "''", $masterpanduan->getDescription());
        $file = str_replace("'", "''", $masterpanduan->getFilename()); 

        $session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
       
        $hasil = $this->dbTable->SPUpdate('sp_masterpanduan_create', $menu, $desc, $file, $session->getUserId());
        return $hasil;
    }
    
    public function codeExist(Erems_Models_Master_Mahasiswa $ft){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_mahasiswacodeexist_read',$ft->getCode());
        
        return $hasil;
    }
    
    public function update(Erems_Models_Masterpanduan $masterpanduan){
        $hasil = 0;
        
        $menu = str_replace("'", "''", $masterpanduan->getMenu());
        $desc = str_replace("'", "''", $masterpanduan->getDescription());
        $file = str_replace("'", "''", $masterpanduan->getFilename()); 
        $panduan_id = str_replace("'", "''", $masterpanduan->getId()); 
        
        $session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');

        $hasil = $this->dbTable->SPUpdate('sp_masterpanduan_update',$menu, $desc, $file, $session->getUserId(), $panduan_id);  
    
        return $hasil;
    }

    public function directDelete(\Erems_Box_Models_App_Decan $decan, \Erems_Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_masterpanduan_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }
}