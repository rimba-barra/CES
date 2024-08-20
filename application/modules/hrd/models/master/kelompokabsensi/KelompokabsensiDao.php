<?php

/**
 * Description of DepartmentDao
 *
 * @author MIS
 */
class Hrd_Models_Master_Kelompokabsensi_KelompokabsensiDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {
    /*
    public function save(Hrd_Models_Performancemanagement_Banding $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
            'sp_banding_create',
            $d->getAddBy(),
            $d->code,
            $d->banding,
            str_replace("'", '`', $d->description),
            $d->index_no
            );
        
        return $hasil;
    }
    */
    public function save(Hrd_Models_Master_Kelompokabsensi_Kelompokabsensi $d) {
        $hasil = 0;
        $datadetail = $d->getDCResult();
        $dataheader = $d->getArrayTable();
        $countheaderdata = $d->header_id;
        if ($countheaderdata) {
            return $this->update($d);
        }

        $hasil = $this->dbTable->SPUpdate(
                'sp_kelompokabsensi_create', $d->getAddBy(), $d->getProjectId(), $d->getPtId(), $d->name);
        //var_dump($this->dbTable);

        return $hasil;
    }

    public function update(Hrd_Models_Master_Kelompokabsensi_Kelompokabsensi $d) {
        $hasil = 0;
        $datadetail = $d->getDCResult();
        $dataheader = $d->getArrayTable();
		
        if (empty($datadetail)) {
            return false;
        } else {
            $hasil = $this->dbTable->SPUpdate(
                    'sp_kelompokabsensi_update', $d->getAddBy(), $d->header_id, $dataheader['project_id'], $dataheader['pt_id'], $dataheader['name']);
        }
        return $hasil;
    }

    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Master_Kelompokabsensi_Kelompokabsensi $d) {
        $hasil = 0;
		
        $hasil = $this->dbTable->SPExecute('sp_kelompokabsensi_read', $r->getPage(), $r->getLimit(), $d->getProjectId(), $d->getPtId(), $d->name);
        //var_dump($hasil);
		//die();
		return $hasil;
    }

    // public function getAllWoPL($session) {
    public function getAllWoPL($session, $data) {
        $hasil = 0;
        // $hasil = $this->dbTable->SPExecute('sp_kelompokabsensi_read', 1, 9999, $session->getProjectId(), $session->getPtId(), '');
        $hasil = $this->dbTable->SPExecute('sp_kelompokabsensi_read', 1, 9999, $data['project_id'], $data['pt_id'], '');
        return $hasil;
    }

    public function getDetailData(Box_Models_App_HasilRequestRead $r, $header_id) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute(
                'sp_kelompokabsensidetail_read', $header_id
        );
        //var_dump($this->dbTable);
        return $hasil;
    }

    public function getdataByid($id) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute(
                'sp_kelompokabsensi_getbyid', $id
        );
        return $hasil;
    }	

    public function getEmployeelist(Box_Models_App_HasilRequestRead $r, $session, $data) {
        $hasil = 0;   
	$r->setPage(1);
        $r->setLimit(99999999);	
        $hasil = $this->dbTable->SPExecute('sp_kelompokabsensiemployee_read', $r->getPage(), $r->getLimit(), 
			$session->getProjectId(), $session->getPtId(), $data['kelompokabsensi_id'], $data['employee_name'], $data['employee_nik'], $data['department_id'],1);
// var_dump($this->dbTable); // ngecek sql server error
// var_dump($hasil); // ngecek sql server error
        return $hasil;
    }
    
    public function selectemployeeKelompokabsensi($session, $datadetail) {    
        $obj = new Hrd_Models_Master_Kelompokabsensi_Kelompokabsensi();
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
            'sp_kelompokabsensi_selectemployee', 
			$session->getUser()->getId(), 
			$session->getProject()->getId(), 
			$session->getPt()->getId(), 
			$datadetail['kelompokabsensi_id'], 
			$datadetail['employee_id']
        );  
        //var_dump($this->dbTable);
        return $hasil;	
    }
	
    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_kelompokabsensi_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }

    public function dataExist($name, $kelompokabsensi_id, $session) {
        $hasil = array();
        
        if($kelompokabsensi_id == ''){
            $hasil = $this->dbTable->SPExecute(
                'sp_kelompokabsensiexist_read',
                $session->getProject()->getId(), 
                $session->getPt()->getId(), 
                $name
            );
        } else {
            $hasil = $this->dbTable->SPExecute(
                'sp_kelompokabsensiexist_update_read',
                $session->getProject()->getId(), 
                $session->getPt()->getId(), 
                $name,
                $kelompokabsensi_id
            );
            //var_dump($this->dbTable);
        
        }

        return $hasil;
    }
    
    public function deleteDetail($employee_id, $kelompokabsensi_id, $session) {
        $hasil = array();        
        $hasil = $this->dbTable->SPExecute(
            'sp_kelompokabsensi_detail_destroy',
            $kelompokabsensi_id, 
            $employee_id,
            $session->getUser()->getId()
        );
        //var_dump($this->dbTable);
        return $hasil;
    }
    
    public function saveHeader($name, $kelompokabsensi_id) {
        $obj = new Hrd_Models_Master_Kelompokabsensi_Kelompokabsensi();
        $hasil = 0;
        if($kelompokabsensi_id == ''){
            $hasil = $this->dbTable->SPUpdate(
                'sp_kelompokabsensi_create', 
                $obj->getUserlogin(),
                $obj->getProjectId(), 
                $obj->getPtId(),
                $name 
            ); 
        } else {
            $hasil = $this->dbTable->SPUpdate(
                'sp_kelompokabsensi_update', 
                $obj->getUserlogin(),
                $name,
                $kelompokabsensi_id  
            ); 
            
        }
        
        //var_dump($this->dbTable);
        return $hasil;
    }
	
}

?>
