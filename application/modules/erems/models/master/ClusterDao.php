<?php

/**
 * Description of ClusterDao
 *
 * @author MIS
 */
class Erems_Models_Master_ClusterDao extends Erems_Box_Models_App_AbDao implements Erems_Box_Models_App_BlackHoleWM{
    
    public function save(Erems_Models_Master_ClusterTran $cs){
        $row = 0;
       
        if(!$cs->getAddBy()){
            return $row;
        }
        
        $dcResult = $cs->getDCResult();
        if($dcResult){
            
              $row = $this->dbTable->SPUpdate('sp_clusterb_create',$cs->getAddBy(),$cs->getProject()->getId(),$cs->getPt()->getId(),
                $cs->getCode(),$cs->getName(),
                      $cs->getKode_rekening_va(),
                      $cs->getKode_cluster_va(),
                      $cs->getDecription(),$cs->getImgLegend(),$cs->getImgSite(),
                      $cs->getSectorCode(),$cs->getSubSectorCode(),$cs->getHargaTaman(),
                      $cs->getHargaHook(),$dcResult["clusterimages_id"],$dcResult["title"],
                      $dcResult["image"],$dcResult["is_default"],
                      $dcResult["description"], 
                      $cs->getLuasan_efektif_lahan(),
                      $cs->getTotal_unit(),

                      //added by anas 22062021
                      $cs->getIs_locktype(),
                      $cs->getSiteplan_svg(),
                      $cs->getClusterAlias() // added by rico 26062023
                );
     
        }else{
              $row = $this->dbTable->SPUpdate('sp_clusterb_create',$cs->getAddBy(),$cs->getProject()->getId(),$cs->getPt()->getId(),
                $cs->getCode(),$cs->getName(),
                      $cs->getKode_rekening_va(),
                      $cs->getKode_cluster_va(),
                      $cs->getDecription(),$cs->getImgLegend(),$cs->getImgSite(),$cs->getSectorCode(),$cs->getSubSectorCode(),$cs->getHargaTaman(),
                      $cs->getHargaHook(),
                      NULL, NULL, NULL, NULL, NULL, 
                      $cs->getLuasan_efektif_lahan(),
                      $cs->getTotal_unit(),

                      //added by anas 22062021
                      $cs->getIs_locktype(),
					            $cs->getSiteplan_svg(),
                      $cs->getClusterAlias() // added by rico 26062023
                );
        }
        
        
      // $this->dbTable->printDbError();
     
        return $row;
        
    }
    
    public function update(Erems_Models_Master_ClusterTran $cs,Erems_Box_Models_App_Decan $deletedDecan = NULL){
        $row = 0;
       
        if(!$cs->getAddBy()){
            return $row;
        }
        $ds = '';

        if ($deletedDecan) {
            $ds = $deletedDecan->getString();
        }
        
        $dcResult = $cs->getDCResult();
        
        if($dcResult){
              $row = $this->dbTable->SPUpdate('sp_clusterb_update',$cs->getAddBy(),$cs->getId(),
                $cs->getCode(),$cs->getName(),
                      $cs->getKode_rekening_va(),
                      $cs->getKode_cluster_va(),
                      $cs->getDecription(),$cs->getImgLegend(),$cs->getImgSite(),
                      $cs->getSectorCode(),$cs->getSubSectorCode(),$cs->getHargaTaman(),
                      $cs->getHargaHook(),
                      $ds,
                      $dcResult["clusterimages_id"],$dcResult["title"],
                      $dcResult["image"],$dcResult["is_default"],
                      $dcResult["description"],
                      $cs->getLuasan_efektif_lahan(),
                      $cs->getTotal_unit(),

                      //added by anas 22062021
                      $cs->getIs_locktype(),
					            $cs->getSiteplan_svg(),
                      $cs->getClusterAlias() // added by rico 26062023
                  );
     
        }else{
              $row = $this->dbTable->SPUpdate('sp_clusterb_update',$cs->getAddBy(),$cs->getId(),
                $cs->getCode(),$cs->getName(),
                      $cs->getKode_rekening_va(),
                      $cs->getKode_cluster_va(),
                      $cs->getDecription(),$cs->getImgLegend(),$cs->getImgSite(),$cs->getSectorCode(),$cs->getSubSectorCode(),$cs->getHargaTaman(),
                      $cs->getHargaHook(),$ds, 
                      NULL, NULL, NULL, NULL, NULL, 
                      $cs->getLuasan_efektif_lahan(),
                      $cs->getTotal_unit(),

                      //added by anas 22062021
                      $cs->getIs_locktype(),
					            $cs->getSiteplan_svg(),
                      $cs->getClusterAlias() // added by rico 26062023
                  );
     
        }
        
       // $this->dbTable->printDbError();
     
        return $row;        
    }
    
    public function getAll(){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_cluster_read');
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
    
    public function getByProjectPtWithPageSearch(Erems_Models_Master_ClusterTran $ct,  Erems_Box_Models_App_HasilRequestRead $request){
        $hasil = array();
        $project = $ct->getProject()->getId();
        $pt = $ct->getPt()->getId();
        if($project==0 || $pt==0){
            return $hasil;
        }
        $hasil = $this->dbTable->SPExecute('sp_clusterc_read',$ct->getProject()->getId(),$ct->getPt()->getId(),
                $request->getPage(),$request->getLimit(),
                $request->getOthersValue("code"),$request->getOthersValue("cluster"),
                $request->getOthersValue("description"));
       
        return $hasil; 
    }
    
    public function getByProjectPtWOPL(Erems_Models_Master_ClusterTran $ct){
        $hasil = array();
        $project = $ct->getProject()->getId();
        $pt = $ct->getPt()->getId();
        if($project==0 || $pt==0){
            return $hasil;
        }
        $hasil = $this->dbTable->SPExecute('sp_clusterc_read',$ct->getProject()->getId(),$ct->getPt()->getId(),
                1,999999,'','','');
       
        return $hasil; 
    }
    
    public function getImageList(Erems_Models_Master_ClusterB $c,  Erems_Box_Models_App_HasilRequestRead $req){
        $hasil = array();
     
        $hasil = $this->dbTable->SPExecute('sp_clusterimages_read',$c->getId(),$req->getPage(),$req->getLimit());

        return $hasil; 
        //
    }
    
    public function codeExist(Erems_Models_Master_ClusterTran $c){
        $hasil = array();
     
        $hasil = $this->dbTable->SPExecute('sp_clustercodeexist_read',$c->getProject()->getId(),$c->getPt()->getId(),$c->getCode());

        return $hasil; 
        //
    }

    public function directDeleteWM(\Erems_Box_Models_App_Decan $decan, \Erems_Box_Kouti_InterSession $session) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_cluster_destroy', $decan->getString(), $session->getUserId());
        
     
        return $hasil;
    }

  

}

?>
