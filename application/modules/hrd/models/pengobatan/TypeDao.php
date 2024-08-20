<?php

/**
 * Description of TypeDao
 *
 * @author MIS
 */
class Hrd_Models_Pengobatan_TypeDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {

    public function save(Hrd_Models_Pengobatan_Type $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_jenispengobatan_create', $d->getAddBy(), $d->getCode(),$d->getName(),$d->getPercentValue());
        return $hasil;
    }
    
    public function codeExist(Hrd_Models_Pengobatan_Type $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_jenispengobatanexist_read',$d->getCode());
        return $hasil;
    }

    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Pengobatan_Type $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_jenispengobatan_read', $r->getPage(), $r->getLimit(), $d->getName());
        return $hasil;
    }
        
    public function getAllWOPL(Hrd_Models_Pengobatan_Type $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_jenispengobatan_read',1,99999, $d->getName());
        return $hasil;
    }
    
    
    public function getAllWoFilter(Hrd_Models_Pengobatan_Type $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_jenispengobatan_read',1,500,$d->getName());
        return $hasil;
    }
    
    public function getAllWOPL_exclude_kacamata(Hrd_Models_Pengobatan_Type $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_jenispengobatan_read2',1,500,'');
        return $hasil;
    }

    public function update(Hrd_Models_Pengobatan_Type $em) {
        $hasil = 0;
        if ($em->getId() == 0) {
            return $hasil;
        }

        $hasil = $this->dbTable->SPUpdate('sp_jenispengobatan_update', $em->getAddBy(), $em->getId(), $em->getName(), $em->getCode(),$em->getPercentValue());
        return $hasil;
    }

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_jenispengobatan_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }

}

?>
