<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of BatasPlafonDao
 *
 * @author MIS
 */
class Erems_Models_Construction_BatasPlafonDao extends Erems_Box_Models_App_AbDao implements Erems_Box_Models_App_BlackHole {
    
    public function getAll(Erems_Box_Models_App_HasilRequestRead $r,Erems_Models_Construction_BatasPlafon $bt){
        $hasil = array();

        $hasil = $this->dbTable->SPExecute('sp_batasplafon_read',$bt->getProject()->getId(),$bt->getPt()->getId(),$r->getPage(),$r->getLimit(), $bt->getPlafon()->getId(), $bt->getPercent());
       
        return $hasil;
    }
    
    
    public function save(Erems_Models_Construction_BatasPlafon $pc){
        $hasil = 0;
      
        if($pc->getPercent() >= 0 && $pc->getPercent() <= 100){
            $hasil = $this->dbTable->SPUpdate('sp_batasplafon_create',$pc->getAddBy(),$pc->getProject()->getId(),$pc->getPt()->getId(),$pc->getPlafon()->getId(),$pc->getPercent(),$pc->getTargetRS(),$pc->getTargetRE());  
        }
        return $hasil;
    }
    
    public function update(Erems_Models_Construction_BatasPlafon $pc){
        $hasil = 0;
        


        if($pc->getPercent() >= 0 && $pc->getPercent() <= 100){
            $hasil = $this->dbTable->SPUpdate('sp_batasplafon_update',$pc->getAddBy(),$pc->getId(),$pc->getPlafon()->getId(),$pc->getPercent(),$pc->getTargetRS(),$pc->getTargetRE());
        }
        
        return $hasil;
    }

    public function directDelete(\Erems_Box_Models_App_Decan $decan, \Erems_Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_batasplafon_destroy', $decan->getString(), $session->getUserId());
        return $row;
    } 
    
    public function codeExist(Erems_Models_Construction_BatasPlafon $bp){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_batasplafoncodeexist_read',$bp->getPlafon()->getId(),$bp->getProject()->getId(),$bp->getPt()->getId());
        
        return $hasil;
    }
    
    public function percentExist(Erems_Models_Construction_BatasPlafon $bp){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_batasplafonpercentexist_read',$bp->getPercent(),$bp->getProject()->getId(),$bp->getPt()->getId());
        
        return $hasil;
    }
}

?>
