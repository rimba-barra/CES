<?php

/**
 * Description of AccessgroupDao
 *
 * @author MIS
 */
class Hrd_Models_Master_Accessgroup_AccessgroupDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {

    public function save(Hrd_Models_Master_Accessgroup_Accessgroup $d) {
        $hasil = 0;
        $dataheader = $d->getArrayTable();
        $countheaderdata = $d->accessgroup_id;
		if ($countheaderdata) {
			return $this->update($d);
		}

		$hasil = $this->dbTable->SPUpdate(
				'sp_accessgroup_create', $d->getAddBy(), $dataheader['index_no'], $dataheader['accessgroup'], $dataheader['description']);
        return $hasil;
    }

    public function update(Hrd_Models_Master_Accessgroup_Accessgroup $d) {
        $hasil = 0;
        $dataheader = $d->getArrayTable();
		$hasil = $this->dbTable->SPUpdate(
				'sp_accessgroup_update', $d->getAddBy(), $d->accessgroup_id, $dataheader['index_no'], $dataheader['accessgroup'], $dataheader['description']);
        return $hasil;
    }

    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Master_Accessgroup_Accessgroup $d) {
        $hasil = 0;
		
        $hasil = $this->dbTable->SPExecute('sp_accessgroup_read', $r->getPage(), $r->getLimit(), $d->getAccessgroup());
        //var_dump($hasil);
		//die();
		return $hasil;
    }

    public function getAllWoPL(Hrd_Models_Master_Accessgroup_Accessgroup $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_accessgroup_read', 1, 9999, $d->getAccessgroup());
        return $hasil;
    }

    public function getdataByid($id) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute(
                'sp_accessgroup_getbyid', $id
        );
        return $hasil;
    }	

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_accessgroup_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }
}

?>
