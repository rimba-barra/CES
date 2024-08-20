<?php 

class Hrd_Models_Bsc_UomDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {

    public function save(Hrd_Models_Bsc_Uom $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
            'bsc_sp_uom_create',
            $d->getAddBy(),
            $d->uomname,
            str_replace("'", '`', $d->uomdesc)
        );
        
        return $hasil;
    }

    public function update(Hrd_Models_Bsc_Uom $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
            'bsc_sp_uom_update', 
            $d->getAddBy(),
            $d->getId(),
            $d->uomname,
            str_replace("'", '`', $d->uomdesc)
        );

        return $hasil;
    }

    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Bsc_Uom $d) {
        $hasil = 0;        
        $hasil = $this->dbTable->SPExecute(
            'bsc_sp_uom_read', 
            $r->getPage(), 
            $r->getLimit(),
            $d->uomname
        );
     
        return $hasil;
    }
    
    public function deleteOne($id,$userId) {
        $row = 0;
        $row = $this->dbTable->SPUpdate(
            'bsc_sp_uom_destroy',
            $id,
            $userId
        );

        return $row;
    }
  
    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate(
            'bsc_sp_uom_destroy', 
            $decan->getString(), 
            $session->getUserId()
        );

        return $row;
    }

    public function codeExist(Hrd_Models_Bsc_Uom $d) {
        $hasil = array();

        $hasil = $this->dbTable->SPExecute(
            'bsc_sp_uomnameexist_read', 
            $d->uomname
        );

        return $hasil;
    }
}

?>