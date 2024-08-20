<?php

/**
 * Description of CodeofconductDao
 *
 * @author MIS
 */
class Hrd_Models_Master_Codeofconduct_CodeofconductDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {

    public function save(Hrd_Models_Master_Codeofconduct_Codeofconduct $d) {
        $hasil = 0;
        $dataheader = $d->getArrayTable();
        $countheaderdata = $d->getCodeofconduct_id();
		if ($countheaderdata) {
			return $this->update($d);
		}

		$hasil = $this->dbTable->SPUpdate(
				'sp_codeofconduct_create', $d->getAddBy(), $dataheader['file_name'], $dataheader['description'], $d->getProjectId());
        return $hasil;
    }

    public function update(Hrd_Models_Master_Codeofconduct_Codeofconduct $d) {
        $hasil = 0;
        $dataheader = $d->getArrayTable();
		$hasil = $this->dbTable->SPUpdate(
				'sp_codeofconduct_update', $d->getAddBy(), $d->getCodeofconduct_id(), $dataheader['file_name'], $dataheader['description'], $dataheader['active']);
        return $hasil;
    }

    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Master_Codeofconduct_Codeofconduct $d) {
        $hasil = 0;
		
        $hasil = $this->dbTable->SPExecute('sp_codeofconduct_read', $r->getPage(), $r->getLimit(), $d->getDescription(), $d->getProjectId());
        //var_dump($hasil);
		//die();
		return $hasil;
    }

    public function getAllWoPL(Hrd_Models_Master_Codeofconduct_Codeofconduct $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_codeofconduct_read', 1, 9999, $d->getDescription(), $d->getProjectId());
        return $hasil;
    }

//    public function getdataByid($id) {
//        $hasil = 0;
//        $hasil = $this->dbTable->SPExecute(
//                'sp_codeofconduct_getbyid', $id
//        );
//        return $hasil;
//    }	

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_codeofconduct_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }
    
    public function getEmployee(Box_Models_App_HasilRequestRead $r, Hrd_Models_Master_Codeofconduct_Employee $d) {
        $hasil = 0;		
        $hasil = $this->dbTable->SPExecute('sp_codeofconduct_employee', $r->getPage(), $r->getLimit(), $d->getCodeofconduct_id());
        //var_dump($hasil);
        //die();
        return $hasil;
    }
    
    public function getProject(Box_Models_App_HasilRequestRead $r, Hrd_Models_Master_Codeofconduct_Project $d) {
        $hasil = 0;		
        $hasil = $this->dbTable->SPExecute('sp_codeofconduct_project', $r->getPage(), $r->getLimit(), $d->getCodeofconduct_id());
        //var_dump($this->dbTable);
        //var_dump($hasil);
        //die();
        return $hasil;
    }
    
    function getEmail($all_id) {       	
	$all_id_sp 	= str_replace(',','~',$all_id);		
        $hasil_selected	= $this->dbTable->SPExecute('sp_codeofconduct_employeeselect', $all_id);        
        return $hasil_selected;
    }
    
    function copy($id, $id_project, Hrd_Models_Master_Codeofconduct_Codeofconduct $d) {	
        $hasil_selected	= $this->dbTable->SPExecute('sp_codeofconduct_copy', $d->getAddBy(), $id, $id_project);        
        return $hasil_selected;
    }
}

?>
