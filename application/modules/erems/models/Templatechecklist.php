<?php

/**
 * Description of ProductCategoryDao
 *
 * @author MIS
 */
class Erems_Models_Templatechecklist extends Erems_Box_Models_App_AbDao implements Erems_Box_Models_App_BlackHole {
    private $ses;
    
    public function setSession(Erems_Box_Models_App_Session $ses=NULL){
        $this->ses = $ses;
    }
    
    public function getAll(Erems_Box_Models_App_HasilRequestRead $request, Erems_Models_TemplatechecklistModel $pc){
        $hasil = array();

        $pc->setProject($this->ses->getProject());
        $pc->setPt($this->ses->getPt());
        
        $hasil = $this->dbTable->SPExecute('sp_templatechecklist_read',
        	$pc->getProject()->getId(),
        	$pc->getPt()->getId(),
        	$pc->getTypeId(),
        	$pc->getDescription(),
        	$request->getPage(),
        	$request->getLimit()
       	);
        return $hasil; 
    }
    
    
    public function save(Erems_Models_TemplatechecklistModel $pc){
        $hasil = 0;

        $pc->setProject($this->ses->getProject());
        $pc->setPt($this->ses->getPt());

        $hasil = $this->dbTable->SPUpdate('sp_templatechecklist_create',
        	$this->ses->getUserId(),
        	$pc->getProject()->getId(),
            $pc->getPt()->getId(),
            $pc->getTypeId(),
            $pc->getFilename(),
            $pc->getDescription()
       	);
     
        return $hasil;
    }
    
    public function codeExist(Erems_Models_TemplatechecklistModel $ft){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_positioncodeexist_read',$ft->getCode(),$ft->getCluster()->getId());
        
        return $hasil;
    }
    
    public function update(Erems_Models_TemplatechecklistModel $pc, $id){
        $hasil = 0;

        $pc->setProject($this->ses->getProject());
        $pc->setPt($this->ses->getPt());
      
        $hasil = $this->dbTable->SPUpdate('sp_templatechecklist_update',
        	$this->ses->getUserId(),
        	$pc->getProject()->getId(),
            $pc->getPt()->getId(),
            $pc->getTypeId(),
            $pc->getFilename(),
            $pc->getDescription(),
            $id
        );  
    
        return $hasil;
    }

    public function directDelete(\Erems_Box_Models_App_Decan $decan, \Erems_Box_Kouti_InterSession $session) {
        $row = 0;
        
        $row = $this->dbTable->SPUpdate('sp_templatechecklist_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }
}

?>
