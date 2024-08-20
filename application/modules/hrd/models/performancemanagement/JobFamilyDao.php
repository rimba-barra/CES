<?php 

class Hrd_Models_Performancemanagement_JobFamilyDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {
    public $setup =null;
    public function __construct() {
        parent::__construct();
        $this->setup = new Hrd_Models_General_Setup();
    }

    public function save(Hrd_Models_Performancemanagement_JobFamily $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
            'sp_jobfamily_create',
            $d->getAddBy(),
            $d->code,
            $d->jobfamily,
            str_replace("'", '`', $d->description),
			$this->setup->_project_id, 
			$this->setup->_pt_id
        );
        return $hasil;
    }

    public function update(Hrd_Models_Performancemanagement_JobFamily $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
            'sp_jobfamily_update', 
            $d->getAddBy(),
            $d->getId(),
            $d->code,
            $d->jobfamily,
            str_replace("'", '`', $d->description),
			$this->setup->_project_id, 
			$this->setup->_pt_id
        );

        return $hasil;
    }

    public function getAllJob(Hrd_Models_Performancemanagement_JobFamily $d) {
        $hasil = 0;  
        $hasil = $this->dbTable->SPExecute(
            'sp_jobfamily_read', 
            1, 
            9999,
            '',
            '',
			$this->setup->_project_id, 
			$this->setup->_pt_id
        );

        //var_dump($this->dbTable);  
        return $hasil;
    }

    public function getAllJobFamily(Hrd_Models_Performancemanagement_JobFamily $d) {
        $hasil = 0;  
        $hasil = $this->dbTable->SPExecute(
            'sp_jobfamily_read', 
            1, 
            9999,
            '',
            '',
            $this->setup->_project_id, 
            $this->setup->_pt_id
        );

        $hasil_gabungan = $this->getAllJobFamily_Upload($d,$hasil);

        //return $hasil;
        return $hasil_gabungan;
    }

    public function getAllJobFamily_Upload(Hrd_Models_Performancemanagement_JobFamily $d, $hasil) {
        $hasil_upload = 0;
        $hasil_upload = $this->dbTable->SPExecute(
            'sp_upload_master_jobfamily_read',
            1,
            9999,
            '',
            ''
            );
        
        $hasil_gabungan_total = $hasil_upload[0][0]['totalRow'] + $hasil[0][0]['totalRow'];
        $hasil_gabungan_data  = array_merge($hasil[1],$hasil_upload[1]);
        $hasil_result[0][0]['totalRow'] = $hasil_gabungan_total;
        $hasil_result[1] = $hasil_gabungan_data;

        return $hasil_result;
    }

    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Performancemanagement_JobFamily $d) {
        $hasil = 0;      
        $hasil = $this->dbTable->SPExecute(
            'sp_jobfamily_read', 
            $r->getPage(), 
            $r->getLimit(),
            $d->code,
            $d->jobfamily,
			$this->setup->_project_id, 
			$this->setup->_pt_id
        );
// var_dump($this->dbTable); // ngecek sql server error
// var_dump($hasil); // ngecek sql server error
     
        return $hasil;
    }
    
    public function deleteOne($id,$userId) {
        $row = 0;
        $row = $this->dbTable->SPUpdate(
            'sp_jobfamily_destroy',
            $id,
            $userId
        );

        return $row;
    }
  
    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate(
            'sp_jobfamily_destroy', 
            $decan->getString(), 
            $session->getUserId()
        );

        return $row;
    }

    public function codeExist(Hrd_Models_Performancemanagement_JobFamily $d) {
        $hasil = array();

        $hasil = $this->dbTable->SPExecute(
            'sp_jobfamilycodeexist_read', 
            $d->code
        );

        return $hasil;
    }
}

?>