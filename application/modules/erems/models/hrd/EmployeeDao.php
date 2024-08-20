<?php

/**
 * Description of EmployeeDao
 *
 * @author MIS
 */
class Erems_Models_Hrd_EmployeeDao extends Erems_Box_Models_App_AbDao implements Erems_Box_Models_App_BlackHole{
    public function getAll(Erems_Models_Hrd_Employee $e){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_employee_read',$e->getProject()->getId(),$e->getPt()->getId(),$e->getJabatan()->getId());
        return $hasil; 
    }
    
    public function getAllByPage(Erems_Box_Models_App_HasilRequestRead $r,Erems_Models_Hrd_Employee $e){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_employee_read',$e->getProject()->getId(),$e->getPt()->getId(),$e->getJabatanId(),$r->getPage(),$r->getLimit(),$e->getName());
        return $hasil; 
    }
    
    public function getAllWOPL(Erems_Models_Hrd_Employee $e){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_employee_read',$e->getProject()->getId(),$e->getPt()->getId(),$e->getJabatanId(),1,9999,$e->getName());
        return $hasil; 
    }
    
    public function getAllWOPLUpline($projectId,$ptId){
        $hasil = array();
     
      
        $hasil = $this->dbTable->SPExecute('sp_employee_read',$projectId,$ptId,0,1,9999,'',  Erems_Box_Config::POSITION_CODE_UPLINE);
     
        return $hasil; 
    }

    public function getAllDropdown($projectId,$ptId,$jabatan=0,$position_code=''){
        $res = $this->dbTable->SPExecute('sp_employee_read_dropdown', $projectId, $ptId, $jabatan, $position_code);
        $hasil = array();
        if(isset($res[0]) && count($res[0])){
            $hasil = $res[0];
        }
        return $hasil; 
    }
    
    public function save(Erems_Models_Hrd_Employee $pc){
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_employee_create',
                $pc->getAddBy(),$pc->getProject()->getId(),
                $pc->getPt()->getId(),$pc->getName(),$pc->getJabatanId(),$pc->getPhoneNumber(),$pc->getNomorRekening(),$pc->getAlamat());
        return $hasil;
    }

    public function update(Erems_Models_Hrd_Employee $pc){
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_employee_update',$pc->getAddBy(),
                $pc->getId(),$pc->getName(),$pc->getJabatanId(),$pc->getPhoneNumber(),$pc->getNomorRekening(),$pc->getAlamat());
        return $hasil;
    }
    
    public function directDelete(\Erems_Box_Models_App_Decan $decan, \Erems_Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_employee_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }
}

?>
