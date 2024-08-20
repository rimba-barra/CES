<?php

/**
 * Description of DepartmentDao
 *
 * @author MIS
 */
class Hrd_Models_Master_Scoringbsc_ScoringbscDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {

    public function save(Hrd_Models_Master_Scoringbsc_Scoringbsc $d) {
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
                    'sp_scoringbsc_create', $d->getAddBy(), $dataheader['project_id'], $dataheader['year'], $datadetail['scoringbsc_detail_id'], $datadetail['rating'], $datadetail['batas_bawah'], $datadetail['batas_atas'], $datadetail['interval'], $datadetail['rating_range']);
						
        }
        return $hasil;
    }

    public function update(Hrd_Models_Master_Scoringbsc_Scoringbsc $d) {
        $hasil = 0;
        $datadetail = $d->getDCResult();
        $dataheader = $d->getArrayTable();
		
        if (empty($datadetail)) {
            return false;
        } else {
            $hasil = $this->dbTable->SPUpdate(
                    'sp_scoringbsc_update', $d->getAddBy(), $d->header_id, $dataheader['project_id'], $dataheader['year'], $datadetail['scoringbsc_detail_id'], $datadetail['rating'], $datadetail['batas_bawah'], $datadetail['batas_atas'], $datadetail['interval'], $datadetail['rating_range']);
        }
        return $hasil;
    }

    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Master_Scoringbsc_Scoringbsc $d) {
        $hasil = 0;
		
        $hasil = $this->dbTable->SPExecute('sp_scoringbsc_read', $r->getPage(), $r->getLimit(), $d->getProjectId(), $d->year);
        //var_dump($hasil);
		//die();
		return $hasil;
    }

    public function getAllWoPL(Hrd_Models_Master_Scoringbsc_Scoringbsc $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_scoringbsc_read', 1, 9999, $d->getProjectId(), $d->year);
        return $hasil;
    }

    public function getDetailData(Box_Models_App_HasilRequestRead $r, $header_id) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute(
                'sp_scoringbscdetail_read', $header_id
        );
        return $hasil;
    }

    public function getdataByid($id) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute(
                'sp_scoringbsc_getbyid', $id
        );
        return $hasil;
    }	

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_scoringbsc_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }

    public function periodExist(Hrd_Models_Master_Scoringbsc_Scoringbsc $d) {
        $hasil = array();

        $hasil = $this->dbTable->SPExecute(
            'sp_scoringbscperiodexist_raad', 
            $d->getProjectId(),
            $d->year
        );

        return $hasil;
    }
}

?>
