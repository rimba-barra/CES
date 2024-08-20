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
class Erems_Models_Utility_Dao extends Erems_Box_Models_App_AbDao implements Erems_Box_Models_App_BlackHole{
    
    
    public function getAllByPurchaseletter(Erems_Box_Models_App_HasilRequestRead $r,$purchaseletterId){
        $hasil = array();
       
        
        $hasil = $this->dbTable->SPExecute('sp_utilitybypurchaseletter_read',$purchaseletterId,
                $r->getPage(),$r->getLimit());
       
        return $hasil; 
    }
    
    public function getAllByPurchaseletterWOPL($purchaseletterId){
        $hasil = array();
       
        
        $hasil = $this->dbTable->SPExecute('sp_utilitybypurchaseletter_read',$purchaseletterId,
                1,99999);
       
        return $hasil; 
    }
    
    
    
    public function save() {
        $hasil = 0;
        
        /*
        
        $dcResult = $header->getDCResult();

   

        $hasil = $this->dbTable->SPUpdate('sp_unitb_create',$unit->getAddBy(),$unit->getProject()->getId(),
                $unit->getPt()->getId(),$unit->getStatus()->getId(),$unit->getCluster()->getId(),
                $unit->getProductCategory()->getId(),$unit->getType()->getId(),
                $unit->getBlock()->getId(),$unit->getPosition()->getId(),
                $unit->getSide()->getId(),$unit->getPurpose()->getId(),
                $dcResult["unit_id"],
                $dcResult["unit_number"],$dcResult["land_size"],
                $dcResult["building_size"],$dcResult["floor_size"],
                $dcResult["floor"],
                $dcResult["bedroom"],$dcResult["bathroom"],
                $dcResult["electricity"],
                $dcResult["width"],$dcResult["long"],
                $dcResult["kelebihan"],
                $dcResult["depan"],$dcResult["belakang"],
                $dcResult["samping"],$dcResult["konsepdasar"],
                $dcResult["is_hookcalculated"],$dcResult["is_tamancalculated"]
                
        );
         
         */
        
   
     

        return $hasil;
    }
    
    
    
    public function directDelete(\Erems_Box_Models_App_Decan $decan, \Erems_Box_Kouti_InterSession $session) {
        $row = 0;

      //  $row = $this->dbTable->SPUpdate('sp_unitb_destroy', $decan->getString(), $session->getUser()->getId());
        return $row;
    }
}
