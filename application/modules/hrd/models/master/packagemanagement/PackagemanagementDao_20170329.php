<?php

/**
 * Description of DepartmentDao
 *
 * @author MIS
 */
class Hrd_Models_Master_Packagemanagement_PackagemanagementDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {

    public function save(Hrd_Models_Master_Packagemanagement_Packagemanagement $d) {
        $hasil = 0;
        $datadetail = $d->getDCResult();
        $dataheader = $d->getArrayTable();
        $countheaderdata = $d->header_id;
        if (empty($datadetail)) {
            return false;
        } else {
            if ($countheaderdata) {
                return $this->update($d);
            }

            $hasil = $this->dbTable->SPUpdate(
                    'sp_packagemanagement_create', $d->getAddBy(), $dataheader['project_id'], $dataheader['pt_id'], $dataheader['code'], $dataheader['package_name'], $datadetail['pmdocument_detail_id'], $datadetail['jenisdocument_id'], $datadetail['bobot']
            );
        }
        return $hasil;
    }

    public function update(Hrd_Models_Master_Packagemanagement_Packagemanagement $d) {
        $hasil = 0;
        $datadetail = $d->getDCResult();
        $dataheader = $d->getArrayTable();
        if (empty($datadetail)) {
            return false;
        } else {
            $hasil = $this->dbTable->SPUpdate(
                    'sp_packagemanagement_update', $d->getAddBy(), $d->header_id, $dataheader['project_id'], $dataheader['pt_id'], $dataheader['code'], $dataheader['package_name'], $datadetail['pmdocument_detail_id'], $datadetail['jenisdocument_id'], $datadetail['bobot']
            );
        }
        return $hasil;
    }

    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Master_Packagemanagement_Packagemanagement $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_packagemanagement_read', $r->getPage(), $r->getLimit(), $d->getProjectId(), $d->getPtId(), $d->code, $d->package_name);
        return $hasil;
    }

    public function getAllWoPL(Hrd_Models_Master_Packagemanagement_Packagemanagement $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_packagemanagement_read', 1, 9999, $d->getProjectId(), $d->getPtId(), $d->code, $d->package_name);
        return $hasil;
    }

    public function getDetailData(Box_Models_App_HasilRequestRead $r, $header_id) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute(
                'sp_packagemanagementdetail_read', $header_id
        );
        return $hasil;
    }

    public function getdataByid($id) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute(
                'sp_packagemanagement_getbyid', $id
        );
        return $hasil;
    }

    public function Approvedata($header_id) {
        $obj = new Hrd_Models_Master_Packagemanagement_Packagemanagement();
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
                'sp_packagemanagement_approve', $obj->getUserlogin(), $header_id
        );
        return $hasil;
    }

    public function Rejectdata($header_id) {
        $obj = new Hrd_Models_Master_Packagemanagement_Packagemanagement();
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
                'sp_packagemanagement_reject', $obj->getUserlogin(), $header_id
        );
        return $hasil;
    }

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_packagemanagement_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }

}

?>
