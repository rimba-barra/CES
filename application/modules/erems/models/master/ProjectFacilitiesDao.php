<?php

/**
 * Description of ClusterDao
 *
 * @author MIS
 */
class Erems_Models_Master_ProjectFacilitiesDao extends Erems_Box_Models_App_AbDao implements Erems_Box_Models_App_BlackHole{
    public function getAll(Erems_Box_Models_App_HasilRequestRead $r, Erems_Models_Master_ProjectFacilities $pf){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_projectfacilities_read',$pf->getProject()->getId(),$pf->getPt()->getId(),$r->getPage(),$r->getLimit(),$pf->getCode(),$pf->getName(),$pf->getDescription());
        return $hasil; 
    }
    public function getByProjectPt(Erems_Models_Master_ClusterTran $ct){
        $hasil = array();
        $project = $ct->getProject()->getId();
        $pt = $ct->getPt()->getId();
        if($project==0 || $pt==0){
            return $hasil;
        }
        $hasil = $this->dbTable->SPExecute('sp_clusterb_read',$ct->getProject()->getId(),$ct->getPt()->getId());

        return $hasil; 
    }
    
    public function save(Erems_Models_Master_ProjectFacilities $pf,Erems_Box_Models_App_Session $ses){
        $hasil = 0;
      
          $dcResult = $pf->getDCResult();
          
          if(!key_exists("projectfacilities_images_id", $dcResult)){
              $o = new Erems_Models_Master_ProjectFacilitiesImage();
              $dcResult = $o->getArrayTable();
          }
          
       
       
        $hasil = $this->dbTable->SPUpdate('sp_projectfacilities_create',$pf->getCode(),$pf->getName(),
                $pf->getFacilitiesType()->getId(),$pf->getLayerImg(),$pf->getDescription(),$pf->getAddBy(),
                $ses->getProject()->getId(),$ses->getPt()->getId(),
                $dcResult["projectfacilities_images_id"],
                $dcResult["title"],
                $dcResult["image"],
                $dcResult["is_default"],
                $dcResult["description"]
                );
              
     
        return $hasil;
    }
    
    public function codeExist(Erems_Models_Master_ProjectFacilities $ft){
        $resultCode = false;
        $hasil = $this->dbTable->SPExecute('sp_projectfacilitiestcodeexist_read',$ft->getCode());
        if(is_array($hasil[0])){
            if(count($hasil[0]) > 0){
               $oldItem = new Erems_Models_Master_ProjectFacilities();
               $oldItem->setArrayTable($hasil[0][0]);
               
               if(intval($ft->getId()) > 0){
                   if($oldItem->getId() != $ft->getId()){
                       $resultCode = TRUE;
                   }
               }else{
                   $resultCode = TRUE;
               }
              
            }
        }
      
        
        
        return $resultCode;
    }
    
    //sp_projectfacilitiestcodeexist_read
    
    public function update(Erems_Models_Master_ProjectFacilities $pf,Erems_Box_Models_App_Decan $decan, Erems_Box_Models_App_Session $ses){
        $hasil = 0;
      
        $dcResult = $pf->getDCResult();
        
        if(!key_exists("projectfacilities_images_id", $dcResult)){
              $o = new Erems_Models_Master_ProjectFacilitiesImage();
              $dcResult = $o->getArrayTable();
          }
        
     
       
        $hasil = $this->dbTable->SPUpdate('sp_projectfacilities_update',$pf->getId(),$pf->getCode(),$pf->getName(),
                $pf->getFacilitiesType()->getId(),$pf->getLayerImg(),$pf->getDescription(),$pf->getAddBy(),
                $ses->getProject()->getId(),$ses->getPt()->getId(),
                $dcResult["projectfacilities_images_id"],
                $dcResult["title"],
                $dcResult["image"],
                $dcResult["is_default"],
                $dcResult["description"],
                $decan->getString()
                );
        
              
    
        return $hasil;
    }
    
    public function getImages(Erems_Models_Master_ProjectFacilities $pf){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_projectfacilities_images_read',$pf->getId());
        return $hasil; 
    }

    public function directDelete(\Erems_Box_Models_App_Decan $decan, \Erems_Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_projectfacilities_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }
}

?>
