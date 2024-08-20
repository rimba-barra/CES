<?php

/**
 * Description of AccesslevelDao
 *
 * @author MIS
 */
class Hrd_Models_Master_Accesslevel_AccesslevelDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {

    public function save(Hrd_Models_Master_Accesslevel_Accesslevel $d) {
        $hasil = 0;
        $dataheader = $d->getArrayTable();
        $countheaderdata = $d->accesslevel_id;
		if ($countheaderdata) {
			return $this->update($d);
		}

		$hasil = $this->dbTable->SPUpdate(
				'sp_accesslevel_create', $d->getAddBy(), $dataheader['index_no'], $dataheader['accesslevel'], $dataheader['description']);
        return $hasil;
    }

    public function update(Hrd_Models_Master_Accesslevel_Accesslevel $d) {
        $hasil = 0;
        $dataheader = $d->getArrayTable();
		$hasil = $this->dbTable->SPUpdate(
				'sp_accesslevel_update', $d->getAddBy(), $d->accesslevel_id, $dataheader['index_no'], $dataheader['accesslevel'], $dataheader['description']);
        return $hasil;
    }

    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Master_Accesslevel_Accesslevel $d) {
        $hasil = 0;
		
        $hasil = $this->dbTable->SPExecute('sp_accesslevel_read', $r->getPage(), $r->getLimit(), $d->getAccesslevel());
        //var_dump($hasil);
		//die();
		return $hasil;
    }

    public function getAllWoPL(Hrd_Models_Master_Accesslevel_Accesslevel $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_accesslevel_read', 1, 9999, $d->getAccesslevel());
        return $hasil;
    }

    public function getdataByid($id) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute(
                'sp_accesslevel_getbyid', $id
        );
        return $hasil;
    }	

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_accesslevel_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }
}

?>
