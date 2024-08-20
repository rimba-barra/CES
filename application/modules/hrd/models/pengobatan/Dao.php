<?php
/**
 * Description of Dao
 *
 * @author MIS
 */
class Hrd_Models_Pengobatan_Dao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole,Hrd_Models_App_CodeChecked {
    public function save(Hrd_Models_Pengobatan_Plafon $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_plafonpengobatan_create', $d->getAddBy(),
                $d->getProject()->getId(),$d->getPt()->getId(),$d->getYear(),
                $d->getStartDate(),$d->getEndDate(),$d->getEmployeeGroup()->getId(),$d->getType()->getId(),
                $d->getValue(),
                $d->getMasterSk()->getId()

                ,$d->getEmployeePtkp()->getId());
       
        
        return $hasil;
    }
    
    public function saveGenerateByGroup(Hrd_Models_Pengobatan_Plafon $d,$groups) {
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_plafonpengobatan_allgroup_create', $d->getAddBy(),
                $d->getProject()->getId(),$d->getPt()->getId(),
                $groups,$d->getYear(),
                $d->getStartDate(),$d->getEndDate(),$d->getType()->getId(),
                $d->getValue(),
                $d->getMasterSk()->getId()

                ,$d->getEmployeePtkp()->getId());
       

        return $hasil;
    }

    public function saveGenerateByGroupPtkp(Hrd_Models_Pengobatan_Plafon $d,$groups,$ptkp) {
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_plafonpengobatan_allgroupptkp_create', $d->getAddBy(),
                $d->getProject()->getId(),$d->getPt()->getId(),
                $ptkp,
                $d->getYear(),
                $d->getStartDate(),$d->getEndDate(),$d->getType()->getId(),
                $d->getValue(),
                $d->getMasterSk()->getId()

                ,$groups);
       

        return $hasil;
    }

    public function saveGenerateByPtkp(Hrd_Models_Pengobatan_Plafon $d,$ptkp) {
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_plafonpengobatan_allptkp_create', $d->getAddBy(),
                $d->getProject()->getId(),$d->getPt()->getId(),
                $ptkp,$d->getYear(),
                $d->getStartDate(),$d->getEndDate(),$d->getType()->getId(),
                $d->getValue(),
                $d->getMasterSk()->getId(),
                $d->getEmployeeGroup()->getId());
       

        return $hasil;
    }
    
    public function saveGenerated(Box_Models_App_Decan $decan,Box_Models_App_Session $ses) {
        $hasil = 0;
        $ar = $decan->getDCResult();
        $hasil = $this->dbTable->SPUpdate('sp_plafonpengobatangenerate_create', $ses->getUser()->getId(),
                $ses->getProject()->getId(),$ses->getPt()->getId(),
                $ar["plafonpengobatan_id"],
                $ar["year"],
                $ar["start_date"],
                $ar["end_date"],
                $ar["group_group_id"],
                $ar["jenispengobatan_jenispengobatan_id"],
                $ar["value"]);
       
        
        return $hasil;
    }

    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Pengobatan_Plafon $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_plafonpengobatan_read', $r->getPage(), $r->getLimit(),$d->getProject()->getId(),$d->getPt()->getId(), $d->getYear(),$d->getEmployeeGroup()->getId(),$d->getType()->getId()

            ,$d->getEmployeePtkp()->getId());

        return $hasil;
    }
    
    public function getAllWOPL(Hrd_Models_Pengobatan_Plafon $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_plafonpengobatan_read',1,99999,$d->getProject()->getId(),$d->getPt()->getId(),0);
        return $hasil;
    }
    
   /* public function codeExist(Hrd_Models_Pengobatan_Plafon $d){
        //
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_plafonpengobatanexist_read',$d->getYear(),$d->getEmployeeGroup()->getId(),$d->getType()->getId());
       
        var_dump($hasil);
        return $hasil;
    }
   
    */
    
    
    public function getYears(Box_Models_App_Session $ses){
        //
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_plafonpengobatanallyear_read',1,100,$ses->getProject()->getId(),$ses->getPt()->getId());
        return $hasil;
    }
    
    
    public function copyfromold(Box_Models_App_Session $ses) {
        $hasil = 0;
       

        $hasil = $this->dbTable->SPUpdate('sp_plafonpengobatancopy_create',$ses->getUser()->getId(),$ses->getProject()->getId(),$ses->getPt()->getId());
        return $hasil;
    }
   

    public function update(Hrd_Models_Pengobatan_Plafon $d) {
        $hasil = 0;
        if ($d->getId() == 0) {
            return $hasil;
        }

        $hasil = $this->dbTable->SPUpdate('sp_plafonpengobatan_update', $d->getAddBy(), $d->getId(),$d->getYear(),$d->getStartDate(),$d->getEndDate(),$d->getEmployeeGroup()->getId(),$d->getType()->getId(),$d->getValue(),
                $d->getMasterSk()->getId()

                ,$d->getEmployeePtkp()->getId());
        return $hasil;
    }
    
    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_plafonpengobatan_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }

    public function codeExist($d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_plafonpengobatanexist_read',$d->getYear(),$d->getEmployeeGroup()->getId(),$d->getType()->getId());
       
        return $hasil;
    }

//put your code here
}

?>
