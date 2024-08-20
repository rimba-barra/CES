<?php
/**
 * Description of DepartmentDao
 *
 * @author MIS
 */
class Hrd_Models_Master_ShiftTypeDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {
    private $ses;
    public function setSession(Box_Models_App_Session $ses){
        $this->ses = $ses;
    }
    public function save(Hrd_Models_Master_ShiftType $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_shifttype_create',$d->getAddBy(),$d->getProject()->getId(),$d->getPt()->getId(),$d->getName(),$d->getCode(),
                $d->getInTime(),$d->getOutTime(),$d->getHolyday(),$d->getUnStatus(),$d->getOutAfterTime(),$d->getDifferentDay(), 
                //added by anas 18112021
                $d->getIsMod()
                //added by mike 21/04/2022
                ,$d->getIsTeams()
                ,$d->getIsEss()
                //added by mike 24/08/2022
                ,$d->getIsAuto()
            ); 
       
        return $hasil;
    }
    
    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Master_ShiftType $d){
        $hasil = 0;//$r->getPage(), $r->getLimit()
        $hasil = $this->dbTable->SPExecute('sp_shifttype_read',$d->getProject()->getId(),$d->getPt()->getId(),1, 250,$d->getName(),$d->getCode());
        return $hasil;
    }
    
    
    public function getAllWOPL(Hrd_Models_Master_ShiftType $d = NULL){
        $hasil = 0;
        if(!$d){
            $d = new Hrd_Models_Master_ShiftType();
            $d->setProject($this->ses->getProject());
            $d->setPt($this->ses->getPt());
        }
        $hasil = $this->dbTable->SPExecute('sp_shifttype_read',$d->getProject()->getId(),$d->getPt()->getId(),1,9999,'','');
        return $hasil;
    }
    
    /* added 28 Agustus 2014*/
    
    public function getOne($shiftTypeId){
        $hasil = 0;
        $shiftTypeId = (int) $shiftTypeId;
        $hasil = $this->dbTable->SPExecute('sp_shifttypedetail_read',$shiftTypeId);
        return $hasil;
    }

    public function update(Hrd_Models_Master_ShiftType $d) {
        $hasil = 0;
        if ($d->getId() == 0) {
            return $hasil;
        }
       
        $hasil = $this->dbTable->SPUpdate('sp_shifttype_update', $d->getAddBy(), $d->getId(), 
                $d->getName(),$d->getCode(),
                $d->getInTime(),$d->getOutTime(),$d->getHolyday(),$d->getUnStatus(),$d->getOutAfterTime(),$d->getDifferentDay(), 
                //added by anas 18112021
                $d->getIsMod()
                //added by mike 21/04/2022
                ,$d->getIsTeams()
                ,$d->getIsEss()
                //added by mike 24/08/2022
                ,$d->getIsAuto()
            );
        return $hasil;
    }

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_shifttype_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }

    /* start added by ahmad riadi 15-06-2017 */
    public function getshift_byid($id) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_shifttype_byid_read', $id);
        if (!empty($hasil[0])) {
            return $hasil[0][0];
        } else {
            return false;
        }
    }
    /* end added by ahmad riadi 15-06-2017 */	

    // added by wulan 22 10 2021    
    public function getAllWithEmployeeFilter($project_id, $pt_id, $absentdetail_id){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_shifttypedetail_read',$project_id, $pt_id, $absentdetail_id);
        return $hasil;
    }
}

?>
