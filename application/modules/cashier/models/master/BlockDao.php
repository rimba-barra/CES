<?php

/**
 * Description of BlockDao
 *
 * @author MIS
 */
class Cashier_Models_Master_BlockDao extends Cashier_Box_Models_App_AbDaoCashier implements Cashier_Box_Models_App_BlackHole {
    
    /*@getByCPP
     * @params Cashier_Models_Master_BlockTran
     */
    public function getByCPP(Cashier_Models_Master_BlockTran $bt){
        $hasil = array();
        $project = $bt->getProject()->getId();
        $pt = $bt->getPt()->getId();
        if($project==0 || $pt==0){
            return $hasil;
        }
        $hasil = $this->dbTable->SPExecute('sp_blockb_read',$bt->getCluster()->getId(),$project,$pt);
        return $hasil;
    }
    
    
    
    
    public function getAllWithPage(Cashier_Models_Master_BlockTran $bt,  Cashier_Box_Models_App_HasilRequestRead $request){
        $hasil = array();
        $clusterId = intval($request->getOthersValue("cluster_cluster_id"));
        $clusterId = ($clusterId==999 || $clusterId==0)?0:$clusterId;
        
        $hasil = $this->dbTable->SPExecute('sp_blockc_read',$bt->getProject()->getId(),$bt->getPt()->getId(),$request->getPage(),$request->getLimit(),
                $clusterId,$request->getOthersValue("code"),$request->getOthersValue("block"),$request->getOthersValue("description"));
       
        return $hasil;
    }
    
    public function save(Cashier_Models_Master_BlockTran $pc){
        $hasil = 0;
      
       
          
       
       
        $hasil = $this->dbTable->SPUpdate('sp_blockb_create',$pc->getAddBy(),$pc->getProject()->getId(),
                $pc->getPt()->getId(),$pc->getCode(),$pc->getName(),$pc->getCluster()->getId(),$pc->getDescription());
        
     
        return $hasil;
    }
    
    public function codeExist(Cashier_Models_Master_BlockTran $ft){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_blockcodeexist_read',$ft->getCode(),$ft->getCluster()->getId());
        
        return $hasil;
    }
    
    //sp_projectfacilitiestcodeexist_read
    
    public function update(Cashier_Models_Master_BlockTran $pc){
        $hasil = 0;
      
        $hasil = $this->dbTable->SPUpdate('sp_blockb_update',$pc->getAddBy(),$pc->getId(),$pc->getCode(),
                $pc->getName(),$pc->getCluster()->getId(),$pc->getDescription());
        
              
    
        return $hasil;
    }

    public function directDelete(\Cashier_Box_Models_App_Decan $decan, \Cashier_Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_blockb_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }
}

?>
