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
class Erems_Models_Aftersales_Utilitytype_Dao extends Erems_Box_Models_App_AbDao implements Erems_Box_Models_App_BlackHole{
    
    
    public function getAll(Erems_Box_Models_App_HasilRequestRead $r,Erems_Models_Aftersales_Utilitytype_UtilityType $ut){
        $hasil = array();

        
        $hasil = $this->dbTable->SPExecute('sp_utilitytypeb_read',
                $r->getPage(),
                $r->getLimit(),
                $ut->getName(),
                $ut->getDescription()
                );
        
              
       
        return $hasil;
    }
   
    
    public function save(Erems_Models_Aftersales_Utilitytype_UtilityType $ut){
        $hasil = 0;
      
        
       
       
        $hasil = $this->dbTable->SPUpdate('sp_utilitytypeb_create',$ut->getAddBy(),
                $ut->getName(),
                $ut->getDescription()
                );
       
     
        return $hasil;
    }
    
    //sp_projectfacilitiestcodeexist_read
    
    public function update(Erems_Models_Aftersales_Utilitytype_UtilityType $ut){
        $hasil = 0;
      
        $hasil = $this->dbTable->SPUpdate('sp_utilitytypeb_update',$ut->getAddBy(),
                $ut->getId(),
                $ut->getName(),
                $ut->getDescription()
                );
        
              
              //  var_dump($this->dbTable);
        return $hasil;
    }

    public function directDelete(\Erems_Box_Models_App_Decan $decan, \Erems_Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_utilitytypeb_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }
}
