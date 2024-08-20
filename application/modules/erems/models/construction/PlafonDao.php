<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of PlafonDao
 *
 * @author MIS
 */
class Erems_Models_Construction_PlafonDao extends Erems_Box_Models_App_AbDao implements Erems_Box_Models_App_BlackHole {
    
    public function getAll(Erems_Box_Models_App_HasilRequestRead $r,Erems_Models_Construction_Plafon $bt){
        $hasil = array();
       
        $hasil = $this->dbTable->SPExecute('sp_plafonalter_read',$bt->getIsDefault());
        return $hasil;
    }
    
    public function getAllSimple(){
        $hasil = array();
       
        $hasil = $this->dbTable->SPExecute('sp_plafonalter_read');
        return $hasil;
    }
    
    public function generateAllDefault(Erems_Box_Models_App_Decan $dec, Erems_Box_Models_App_Session $ses){
        $hasil = 0;
      
        
          
        $data = $dec->getDCResult();
        
        if(count($data) > 0){
            $hasil = $this->dbTable->SPUpdate('sp_plafondefgenerate_create',$ses->getUser()->getId(),
                    $ses->getProject()->getId(),$ses->getPt()->getId(),
                $data["plafon_id"],$data["persen_desc"]);
        }
       

        
     
        return $hasil;
    }
    
    
    
    
    public function save(Erems_Models_Construction_Plafon $pc){
        $hasil = 0;
      
       
          
       
       
        $hasil = $this->dbTable->SPUpdate('sp_plafon_create',$pc->getAddBy(),$pc->getName(),$pc->getPercent(),
                $pc->getIsDefault());
        
     
        return $hasil;
    }
    
    public function update(Erems_Models_Construction_Plafon $pc){
        $hasil = 0;
      
        $hasil = $this->dbTable->SPUpdate('sp_plafon_update',$pc->getAddBy(),$pc->getId(),$pc->getName(),$pc->getPercent(),
                $pc->getIsDefault());
        
              
    
        return $hasil;
    }

    public function directDelete(\Erems_Box_Models_App_Decan $decan, \Erems_Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_plafon_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }   
}

?>
