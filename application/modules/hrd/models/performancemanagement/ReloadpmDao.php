<?php

class Hrd_Models_Performancemanagement_ReloadpmDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole  {
    
    public function save(Hrd_Models_Performancemanagement_Reloadpm $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
            'sp_reloadpm_create',
            $d->getAddBy(),
            $d->project_id,
            $d->pt_id,
            $d->employee_id,
            $d->department_id,
            $d->penilai_id,
            $d->approval_id,
            $d->docdept_id
        );        
        return $hasil;
    }
	
	public function saveDetail($d, $addBy) {
		$d = $d->getArrayTable();
		/*if($d['reloadpm_id']){
			$this->updateDetail($dw, $addBy);
		}*/
		
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
            'sp_reloadpm_create',
            $addBy,
            $d['project_id'],
            $d['pt_id'],
            $d['employee_id'],
            $d['department_id'],
            $d['penilai_id'],
            $d['approvallevel_id'],
            $d['docdept_id'],
            $d['is_plan_approval'],
            $d['is_midyear_evaluation'],
            $d['is_endyear_evaluation']
        );
        //var_dump($this->dbTable);
        return $hasil;
    }
	
	public function updateDetail($d, $addBy){
		$d = $d->getArrayTable();
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
            'sp_reloadpm_update',
           	$d['reloadpm_id'],
		    $addBy,
            $d['project_id'],
            $d['pt_id'],
            $d['employee_id'],
            $d['department_id'],
            $d['penilai_id'],
            $d['approvallevel_id'],
            $d['docdept_id'],
            $d['is_plan_approval'],
            $d['is_midyear_evaluation'],
            $d['is_endyear_evaluation']
        );
        //var_dump($this->dbTable);
        return $hasil;
	}
	
	public function deleteDetail($d, $addBy){
		$d = $d->getArrayTable();
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
            'sp_reloadpm_destroy',
            $d['reloadpm_id'],
            $addBy
        );
        //var_dump($this->dbTable);
        return $hasil;
	}

    public function update(Hrd_Models_Performancemanagement_Reloadpm $d) {
        $hasil = 0;
        // echo $d->catid; exit;
        $hasil = $this->dbTable->SPUpdate(
            'sp_reloadpm_update', 
            $d->getAddBy(),
            $d->getId(),
            $d->code,
            str_replace("'", '`', $d->desc),
            str_replace("'", '`', $d->sample),
            $d->nameid,
            $d->catid
        );
        // var_dump($this->dbTable);
        // var_dump($hasil);
        return $hasil;
    }

    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Performancemanagement_Reloadpm $d, $project, $pt) {
		$hasil = 0;        
        $hasil = $this->dbTable->SPExecute(
            'sp_reloadpm_read', 
            $r->getPage(), 
            $r->getLimit(),
            $project,
            $pt,
            $d->employee_nik,
            $d->employee_name,
            $d->department_id,
            $d->is_dinilai
        );
// var_dump($this->dbTable); // ngecek sql server error
// var_dump($hasil); // ngecek sql server error
        //print_r($hasil);
        return $hasil;
    }
	
	public function getDetailData(Box_Models_App_HasilRequestRead $r, $employee_id) {
		$hasil = 0;        
        $hasil = $this->dbTable->SPExecute(
            'sp_reloadpmdetail_read', 
            $employee_id
        );
// var_dump($this->dbTable); // ngecek sql server error
// var_dump($hasil); // ngecek sql server error

        return $hasil;
    }

    public function getReloadpmdata(Box_Models_App_HasilRequestRead $r, $compId) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute(
            'sp_reloadpmformatrix_read',
            $compId
        );

        return $hasil;
    }
    
    public function getReloadpm(Hrd_Models_Performancemanagement_Reloadpm $d) {
        $hasil = 0;        
        $hasil = $this->dbTable->SPExecute(
            'sp_reloadpm_read', 
            1, 
            9999,
            '',
            '',
            '',
            '',
            ''
        );

        return $hasil;
    }

    public function deleteOne($id,$userId) {
        $row = 0;
        $row = $this->dbTable->SPUpdate(
            'sp_reloadpm_destroy',
            $id,
            $userId
        );

        return $row;
    }
  
    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate(
            'sp_reloadpm_destroy', 
            $decan->getString(), 
            $session->getUserId()
        );

        return $row;
    }
    
    public function codeExist(Hrd_Models_Performancemanagement_Reloadpm $d) {
        $hasil = array();
        
        $hasil = $this->dbTable->SPExecute(
            'sp_reloadpmcodeexist_read',
            $d->code
            );
        
        return $hasil;
    }
    
	/*
	public function getAllEmployee() {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_employeeall_read', 1, 9999);
        return $hasil;
    }*/
	
	public function getAllEmployee($project_id, $pt_id) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_employeeallsh_read', 1, 9999, $project_id);
        return $hasil;
    }
	
	public function getAllDepartment() {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_departmentall_read', 1, 9999);
        return $hasil;
    }
    
    public function savePackagedocument($employee_id,$pmdocument_id) {
        $obj = new Hrd_Models_Performancemanagement_Reloadpm();
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
            'sp_reloadpm_pmdocument_update', 
            $obj->getUserlogin(),
            $employee_id,
            $pmdocument_id  
        ); 
        
        return $hasil;
    }
	
    public function applytodoc($employee_id, $periode) {
        $obj = new Hrd_Models_Performancemanagement_Reloadpm();
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute(
            'sp_reloadpm_applytodoc', 
            $obj->getUserlogin(),
            $employee_id,
            $periode
        ); 
		
 //var_dump($this->dbTable); // ngecek sql server error
// var_dump($hasil); // ngecek sql server error

        return $hasil;
    }
    
    public function penilaiExist($d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_reloadpmpenilaiexist_read', $d->reloadpm_id, $d->project_id, $d->pt_id, $d->docdept_id, $d->employee_id, $d->penilai_id);
        return $hasil;
    }
    
    
    public function getPeriodePm($employee_id) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_reloadpm_periodepm_read', $employee_id, 1, 9999);
        //var_dump($this->dbTable); // ngecek sql server error
        //var_dump($hasil);
        return $hasil;
    }
            
    public function reloadCompetency($employee_id, $periode) {
        $obj = new Hrd_Models_Performancemanagement_Reloadpm();
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
            'sp_reloadpm_competency', 
            $obj->getUserlogin(),
            $employee_id,
            $periode
        );
        
        return $hasil;
    }
            
    public function reloadPackagedocument($employee_id, $periode) {
        $obj = new Hrd_Models_Performancemanagement_Reloadpm();
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
            'sp_reloadpm_package', 
            $obj->getUserlogin(),
            $employee_id,
            $periode
        );
        
        return $hasil;
    }
    
}
