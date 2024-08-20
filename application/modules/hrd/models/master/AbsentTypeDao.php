<?php
/**
 * Description of DepartmentDao
 *
 * @author MIS
 */
class Hrd_Models_Master_AbsentTypeDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {
    public function save(Hrd_Models_Master_AbsentType $d) {
        $hasil = 0;
        
        $hasil = $this->dbTable->SPUpdate('sp_absenttype_create',$d->getAddBy(),$d->getName(),$d->getCode(),$d->getGroup()->getId(),$d->getIsCutLeave());      
        return $hasil;
    }
    
    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Master_AbsentType $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_absenttype_read', $r->getPage(), $r->getLimit(),$d->getName(),$d->getCode());
        return $hasil;
    }
    
    public function getAllWOPL(Hrd_Models_Master_AbsentType $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_absenttype_read',1,9999,$d->getName(),$d->getCode());
        return $hasil;
    }
    
    public function getAllLostTime(Box_Models_App_HasilRequestRead $r,$isLostTime = 0,Hrd_Models_Master_AbsentType $d = NULL){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_absenttypelosttime_read', $r->getPage(), $r->getLimit(),$isLostTime);
        return $hasil;
    }
    
    
    public function getAllSimple(){
    	$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $project_id = $this->session->getCurrentProjectId();
        $pt_id = $this->session->getCurrentPtId();
        
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_absenttype_read',1,999,'','',$project_id, $pt_id);
        return $hasil;
    }

    // added by Michael 2021.05.19
    public function getAllSimple_CustomProjectPt($data){
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $project_id = $data['project_id'];
        $pt_id = $data['pt_id'];
        
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_absenttype_read',1,999,'','',$project_id, $pt_id);
        return $hasil;
    }
    // end added by Michael 2021.05.19

    public function update(Hrd_Models_Master_AbsentType $em) {
        $hasil = 0;
        if ($em->getId() == 0) {
            return $hasil;
        }
       
        $hasil = $this->dbTable->SPUpdate('sp_absenttype_update', $em->getAddBy(), $em->getId(), 
                $em->getName(),$em->getCode(),$em->getGroup()->getId(),$em->getIsCutLeave());
        return $hasil;
    }

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_absenttype_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }
}

?>
