<?php

/**
 * Description of BlockDao
 *
 * @author MIS
 */
class Erems_Models_Master_SideDao extends Erems_Box_Models_App_AbDao implements Erems_Box_Models_App_BlackHole {
    
    private $ses;
    
    public function setSession(Erems_Box_Models_App_Session $ses=NULL){
        $this->ses = $ses;
    }
   
    
    public function getAll(Erems_Box_Models_App_HasilRequestRead $request,Erems_Models_Master_Side $pc){
        $hasil = array();        
        $hasil = $this->dbTable->SPExecute('sp_sideb_read',$this->ses->getProject()->getId(),
                $this->ses->getPt()->getId(),$request->getPage(),$request->getLimit(),$pc->getCode(),$pc->getName(),$pc->getDescription());
        return $hasil;
    }
    
    public function save(Erems_Models_Master_Side $pc){
        $hasil = 0;
       
        $hasil = $this->dbTable->SPUpdate('sp_sideb_create',$pc->getAddBy(),$pc->getProject()->getId(),
                $pc->getPt()->getId(),$pc->getCode(),$pc->getName(),$pc->getDescription());
     
        return $hasil;
    }
    
    public function codeExist(Erems_Models_Master_Side $ft, $state){
        $hasil = 0;
        $session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $hasil = $this->dbTable->SPExecute('sp_sidecodeexist_read',$ft->getCode(),$session->getCurrentProjectId(),$ft->getId(),$state);

        return $hasil;
    }

    public function idExist(Erems_Models_Master_Side $ft){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_sideidexist_read',$ft->getId());
        
        return $hasil;
    }
    
    //sp_projectfacilitiestcodeexist_read
    
    public function update(Erems_Models_Master_Side $pc){
        $hasil = 0;
      
        $hasil = $this->dbTable->SPUpdate('sp_sideb_update',$pc->getAddBy(),$pc->getId(),$pc->getCode(),
                $pc->getName(),$pc->getDescription());
        
              
    
        return $hasil;
    }

    public function directDelete(\Erems_Box_Models_App_Decan $decan, \Erems_Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_sideb_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }
}

?>
