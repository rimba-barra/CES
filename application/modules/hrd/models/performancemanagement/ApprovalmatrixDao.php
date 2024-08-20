<?php

class Hrd_Models_Performancemanagement_ApprovalmatrixDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole  {
    
    public function save(Hrd_Models_Performancemanagement_Approvalmatrix $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
            'sp_approvalmatrix_create',
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
		/*if($d['approvalmatrix_id']){
			$this->updateDetail($dw, $addBy);
		}*/
		
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
            'sp_approvalmatrix_create',
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

            //added by anas 15012024 | untuk contract
            , $d['is_pmcontract'],
            $d['from_quarterly']
        );
        //var_dump($this->dbTable);
        return $hasil;
    }
	
	public function updateDetail($d, $addBy){
		$d = $d->getArrayTable();
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
            'sp_approvalmatrix_update',
           	$d['approvalmatrix_id'],
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

            //added by anas 15012024 | untuk contract
            , $d['is_pmcontract'],
            $d['from_quarterly']
        );
        //var_dump($this->dbTable);
        return $hasil;
	}
	
	public function deleteDetail($d, $addBy){
		$d = $d->getArrayTable();
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
            'sp_approvalmatrix_destroy',
            $d['approvalmatrix_id'],
            $addBy
        );
        //var_dump($this->dbTable);
        return $hasil;
	}

    public function update(Hrd_Models_Performancemanagement_Approvalmatrix $d) {
        $hasil = 0;
        // echo $d->catid; exit;
        $hasil = $this->dbTable->SPUpdate(
            'sp_approvalmatrix_update', 
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

    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Performancemanagement_Approvalmatrix $d, $project, $pt) {
		$hasil = 0;        
        $hasil = $this->dbTable->SPExecute(
            'sp_approvalmatrix_read', 
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
            'sp_approvalmatrixdetail_read', 
            $employee_id
        );
// var_dump($this->dbTable); // ngecek sql server error
// var_dump($hasil); // ngecek sql server error

        return $hasil;
    }

    public function getApprovalmatrixdata(Box_Models_App_HasilRequestRead $r, $compId) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute(
            'sp_approvalmatrixformatrix_read',
            $compId
        );

        return $hasil;
    }
    
    public function getApprovalmatrix(Hrd_Models_Performancemanagement_Approvalmatrix $d) {
        $hasil = 0;        
        $hasil = $this->dbTable->SPExecute(
            'sp_approvalmatrix_read', 
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
            'sp_approvalmatrix_destroy',
            $id,
            $userId
        );

        return $row;
    }
  
    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate(
            'sp_approvalmatrix_destroy', 
            $decan->getString(), 
            $session->getUserId()
        );

        return $row;
    }
    
    public function codeExist(Hrd_Models_Performancemanagement_Approvalmatrix $d) {
        $hasil = array();
        
        $hasil = $this->dbTable->SPExecute(
            'sp_approvalmatrixcodeexist_read',
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
        
    public function updatePackagedocument($employee_id,$pmdocument_id) {
        $obj = new Hrd_Models_Performancemanagement_Approvalmatrix();
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
            'sp_approvalmatrix_pmdocument', 
            $obj->getUserlogin(),
            $employee_id,
            $pmdocument_id           
        );  
// var_dump($this->dbTable); // ngecek sql server error
// var_dump($hasil); // ngecek sql server error
        
        return $hasil;
    }
    
    public function savePackagedocument($employee_id,$pmdocument_id, $used_doccontract) {
        $obj = new Hrd_Models_Performancemanagement_Approvalmatrix();
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
            'sp_approvalmatrix_pmdocument_update', 
            $obj->getUserlogin(),
            $employee_id,
            $pmdocument_id  
            //added by anas 15012024
            , $used_doccontract
        ); 
        
        return $hasil;
    }
	
    public function applytodoc($employee_id, $periode) {
        $obj = new Hrd_Models_Performancemanagement_Approvalmatrix();
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute(
            'sp_approvalmatrix_applytodoc', 
            $obj->getUserlogin(),
            $employee_id,
            $periode
        ); 
		
 //var_dump($this->dbTable); // ngecek sql server error
// var_dump($hasil); // ngecek sql server error

        return $hasil;
    }
    
    public function reloadcompetency($employee_id, $periode) {
        $obj = new Hrd_Models_Performancemanagement_Approvalmatrix();
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute(
            'sp_approvalmatrix_reloadcompetency', 
            $obj->getUserlogin(),
            $employee_id,
            $periode
        ); 
		
//        var_dump($this->dbTable); exit; // ngecek sql server error
// var_dump($hasil); // ngecek sql server error

        return $hasil;
    }
    
    public function penilaiExist($d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_approvalmatrixpenilaiexist_read', $d->approvalmatrix_id, $d->project_id, $d->pt_id, $d->docdept_id, $d->employee_id, $d->penilai_id);
        return $hasil;
    }
    
    
    public function getPeriodePm($employee_id) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_approvalmatrix_periodepm_read', $employee_id, 1, 9999);
        //var_dump($this->dbTable); // ngecek sql server error
        //var_dump($hasil);
        return $hasil;
    }


    //added by anas 15012024
    public function getDocumentContract(Box_Models_App_HasilRequestRead $r) {
        $hasil = 0;        
        $hasil = $this->dbTable->SPExecute(
            'sp_approvalmatrix_doccontract_read'
        );
        return $hasil;
    }

    //added by anas 15012024
    public function savePMDocContract($employee_id) {
        $obj = new Hrd_Models_Performancemanagement_Approvalmatrix();
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
            'sp_approvalmatrix_pmdoccontract_update', 
            $obj->getUserlogin(),
            $employee_id
        ); 
        
        return $hasil;
    }

    //added by anas 15012024
    public function getApprovalContract($employee_id, $periode) {
        $hasil = 0;

        $hasil = $this->dbTable->SPExecute(
            'sp_approvalmatrix_approvalcontract_read',
            $employee_id, 
            $periode
        );
        return $hasil;
    }

    //added by anas 15012024
    public function applytodoccontract($employee_id) {
        $obj = new Hrd_Models_Performancemanagement_Approvalmatrix();
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute(
            'sp_approvalmatrix_applytodoc_contract', 
            $obj->getUserlogin(),
            $employee_id
        ); 

        return $hasil;
    }

    //added by anas 15012024
    public function getPMContract($employee_id, $periode) {
        $hasil = 0;

        $hasil = $this->dbTable->SPExecute(
            'sp_approvalmatrix_pmcontract_read',
            $employee_id, 
            $periode
        );
        return $hasil;
    }

    
    
}
