<?php

/**
 * Description of DepartmentDao
 *
 * @author MIS
 */
class Hrd_Models_Master_JenisdokumenDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {

    public function save(Hrd_Models_Master_Jenisdokumen $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_jenisdocument_create', $d->getAddBy(), $d->getIndex_no(), $d->getCode(), $d->getDescription());
        return $hasil;
    }

    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Master_Jenisdokumen $d) {
        $hasil = 0;
		
        $hasil = $this->dbTable->SPExecute('sp_jenisdocument_read', $r->getPage(), $r->getLimit(), $d->getIndex_no(), $d->getCode(), $d->getDescription());
        //echo '<pre>';
		//print_r($hasil);
		return $hasil;
    }

    public function getAllWoPL(Hrd_Models_Master_Jenisdokumen $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_jenisdocument_read', 1, 9999, $d->getIndex_no(), $d->getCode(), $d->getDescription());
        return $hasil;
    }

    public function update(Hrd_Models_Master_Jenisdokumen $em) {
        $hasil = 0;
        if ($em->getId() == 0) {
            return $hasil;
        }

        $hasil = $this->dbTable->SPUpdate('sp_jenisdocument_update', $em->getAddBy(), $em->getId(), $em->getIndex_no(), $em->getCode(), $em->getDescription());
        return $hasil;
    }

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_jenisdocument_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }

}

?>
