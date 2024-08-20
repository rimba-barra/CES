<?php

/**
 * Description of ProductCategoryDao
 *
 * @author MIS
 */
class Erems_Models_Master_PositionDao extends Erems_Box_Models_App_AbDao implements Erems_Box_Models_App_BlackHole {
    private $ses;
    
    public function setSession(Erems_Box_Models_App_Session $ses=NULL){
        $this->ses = $ses;
    }
    
    public function getAll(Erems_Box_Models_App_HasilRequestRead $request, Erems_Models_Master_Position $pc){
        $hasil = array();
        // $pc = new Erems_Models_Master_Position();
        $pc->setProject($this->ses->getProject());
        $pc->setPt($this->ses->getPt());
        // $pc->setCode($this->ses->getCode());
        // $pc->setName($this->ses->getName());
        // $pc->setDescription($this->ses->getDescription());
        
        $hasil = $this->dbTable->SPExecute('sp_positionb_read',$pc->getProject()->getId(),$pc->getPt()->getId(),$request->getPage(),$request->getLimit(),$pc->getCode(),$pc->getName(),$pc->getDescription());
        // echo 'sp_positionb_read'.'/'.$pc->getProject()->getId().'/'.$pc->getPt()->getId().'/'.$request->getPage().'/'.$request->getLimit().'/'.$pc->getCode().'/'.$pc->getName().'/'.$pc->getDescription();exit;
        return $hasil; 
    }
    
    
    public function save(Erems_Models_Master_Position $pc){
        $hasil = 0;
      
       
          
       
       
        $hasil = $this->dbTable->SPUpdate('sp_positionb_create',$pc->getAddBy(),$pc->getProject()->getId(),
                $pc->getPt()->getId(),$pc->getCode(),$pc->getName(),$pc->getCluster()->getId(),$pc->getDescription());
        
     
        return $hasil;
    }
    
    public function codeExist(Erems_Models_Master_Position $ft){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_positioncodeexist_read',$ft->getCode(),$ft->getCluster()->getId());
        
        return $hasil;
    }
    
    //sp_projectfacilitiestcodeexist_read
    
    public function update(Erems_Models_Master_Position $pc){
        $hasil = 0;
      
        $hasil = $this->dbTable->SPUpdate('sp_positionb_update',$pc->getAddBy(),$pc->getId(),
                $pc->getCode(),$pc->getName(),$pc->getCluster()->getId(),$pc->getDescription());
        
              
    
        return $hasil;
    }

    public function directDelete(\Erems_Box_Models_App_Decan $decan, \Erems_Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_positionb_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }
}

?>
