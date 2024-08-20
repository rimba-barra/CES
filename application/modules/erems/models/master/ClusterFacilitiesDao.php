<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ClusterFacilitiesDao
 *
 * @author MIS
 */
class Erems_Models_Master_ClusterFacilitiesDao extends Erems_Box_Models_App_AbDao implements Erems_Box_Models_App_BlackHole {
    /*@getByCPP
     * @params Erems_Models_Master_ClusterFacilities
     */
    public function getAll(Erems_Box_Models_App_HasilRequestRead $request,Erems_Models_Master_ClusterFacilities $bt){
        $hasil = array();
        $c = $bt->getCluster()->getId();$c = $c==999?0:$c;
        $f = $bt->getFacilitiesType()->getId();$f = $f==999?0:$f;
        
        $hasil = $this->dbTable->SPExecute('sp_clusterfacilitiesb_read',$bt->getProject()->getId(),$bt->getPt()->getId(),$request->getPage(),$request->getLimit(),
                $c,$f,$bt->getCode(),$bt->getName(),$bt->getDescription());
        return $hasil;
    }
    
    public function getImages(Erems_Models_Master_ClusterFacilitiesImage $cf){
        $hasil = array();
        
        $hasil = $this->dbTable->SPExecute('sp_clusterfacilitiesimage_read',$cf->getClusterFacilities()->getId());
        return $hasil;
    }
    
    
   
    
    public function save(Erems_Models_Master_ClusterFacilities $pc){
        $hasil = 0;
      
       
          
       $detail = $pc->getDCResult();
       
        $hasil = $this->dbTable->SPCreate('sp_clusterfacilitiesb_create',
                $pc->getProject()->getId(),
                $pc->getPt()->getId(),
                $pc->getCluster()->getId(),
                $pc->getFacilitiesType()->getId(),
                $pc->getCode(),
                $pc->getName(),
                $pc->getImage(),
                $pc->getDescription(),
                $pc->getAddBy(),
                $detail['clusterfacilities_images_id'],
                $detail['title'],
                $detail['image'],
                $detail['is_default'],
                $detail['description']);
        
     
        return $hasil;
    }
    
    public function codeExist(Erems_Models_Master_ClusterFacilities $ft){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_clusterfacilitiescodeexistb_read',$ft->getCode(),$ft->getProject()->getId(),$ft->getPt()->getId());
        
        return $hasil;
    }
    
    //sp_projectfacilitiestcodeexist_read
    
    public function update(Erems_Models_Master_ClusterFacilities $pc){
        $hasil = 0;
        
       
        
        $detail = $pc->getDCResult();
       
       
        
        
        if(count($detail)){
            
        }
        
        $hasil = $this->dbTable->SPUpdate('sp_clusterfacilitiesb_update',
                $pc->getId(),
                $pc->getCluster()->getId(),
                $pc->getFacilitiesType()->getId(),
                $pc->getCode(),
                $pc->getName(),
                $pc->getImage(),
                $pc->getDescription(),
                $pc->getAddBy(),
                $detail['clusterfacilities_images_id'],
                $detail['title'],
                $detail['image'],
                $detail['is_default'],
                $detail['description'],
                $pc->getDeletedDecanString()
                );
        
       
    
        return $hasil;
    }

    public function directDelete(\Erems_Box_Models_App_Decan $decan, \Erems_Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_clusterfacilitiesb_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }
}

?>
