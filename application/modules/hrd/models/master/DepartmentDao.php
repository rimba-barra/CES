<?php
/**
 * Description of DepartmentDao
 *
 * @author MIS
 */
class Hrd_Models_Master_DepartmentDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {
    /* start added by ahmad riadi 30-05-2017 */
    public $setup =null;
    public function __construct() {
        parent::__construct();
        $this->setup = new Hrd_Models_General_Setup();
    }
    /* end added by ahmad riadi 30-05-2017 */
	
    /*
    public function save(Hrd_Models_Master_Department $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_department_create',$d->getAddBy(),$d->getName(),$d->getCode(),$d->getDescription());  
       
        return $hasil;
    }
    */
    
    public function save(Hrd_Models_Master_Department $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_department_create',
		$this->setup->_project_id,
		$this->setup->_pt_id,
		$d->getAddBy(),
		$d->getName(),
		$d->getCode(),
		$d->getDescription()
		);  
        //$hasil = $this->dbTable->SPUpdate('sp_department_create',$d->getAddBy(),$d->getName(),$d->getCode(),$d->getDescription());  
        return $hasil;
    }
    
    public function getAll(Box_Models_App_HasilRequestRead $r,  Hrd_Models_Master_Department $d){
       $hasil = 0;      
        /* start edited by ahmad riadi 09-06-2017 */
        if (!empty($r->getModeRead())) {
            if ($r->getModeRead() == 'master_department') {
                $r->setPage(1);
                $r->setLimit(99999999);
            }
        }
         /* end edited by ahmad riadi 09-06-2017 */
        
        //$hasil = $this->dbTable->SPExecute('sp_department_read', $r->getPage(), $r->getLimit(),$d->getName());
        //$data = $this->dbTable->SPExecute('sp_department_read', $r->getPage(), $r->getLimit(),$d->getName());
	
        $data = $this->dbTable->SPExecute('sp_department_read', $this->setup->_project_id,$this->setup->_pt_id,$r->getPage(), $r->getLimit(),$d->getCode(),$d->getName());
        
        /* start edited by ahmad riadi 09-06-2017 */
        $totalrow = $data[0][0]['totalRow'];
        $result = $data[1];
        $name = array();
        foreach ($result as $key => $row) {
            $name[$key] = $row['department'];
        }
        array_multisort($name, SORT_ASC, $result);
        $hasil = array(array(array("totalRow" => $totalrow)), $result);
        /* end edited by ahmad riadi 09-06-2017 */
        
        return $hasil;
    }
    
    /*
    public function getAllWOPL(Hrd_Models_Master_Department $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_department_read',1,9999,$d->getName());
        return $hasil;
    }

    public function update(Hrd_Models_Master_Department $em) {
        $hasil = 0;
        if ($em->getId() == 0) {
            return $hasil;
        }
       
        $hasil = $this->dbTable->SPUpdate('sp_department_update', $em->getAddBy(), $em->getId(), 
                $em->getName(),$em->getCode(),$em->getDescription(),$em->getManager());
        return $hasil;
    }
    */
    
    public function getAllWOPL(Hrd_Models_Master_Department $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_department_read',$this->setup->_project_id,$this->setup->_pt_id,1,9999,$d->getCode(),$d->getName());
        //$hasil = $this->dbTable->SPExecute('sp_department_read',1,9999,$d->getName());
        return $hasil;
    }

    // added by Michael 2021.05.19
    public function getAllWOPL_CustomProjectPt(Hrd_Models_Master_Department $d, $data){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_department_read',$data['project_id'],$data['pt_id'],1,9999,$d->getCode(),$d->getName());
        //$hasil = $this->dbTable->SPExecute('sp_department_read',1,9999,$d->getName());
        return $hasil;
    }
    // end added by Michael 2021.05.19

    // added by Michael 2022-12-27 | ambil dari FAMS
    public function getAllWOPL_Fams(Hrd_Models_Master_Department $d, $data){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_klaim_pfams_deptaccess_read',1,9999,$data['project_id'],$data['pt_id'],$data['user_id']);
        //$hasil = $this->dbTable->SPExecute('sp_department_read',1,9999,$d->getName());
        return $hasil;
    }
    // end added by Michael 2022-12-27 | ambil dari FAMS

    public function update(Hrd_Models_Master_Department $em) {
        $hasil = 0;
        if ($em->getId() == 0) {
            return $hasil;
        }
               
        //$hasil = $this->dbTable->SPUpdate('sp_department_update',$em->getAddBy(), $em->getId(), 
        //$em->getName(),$em->getCode(),$em->getDescription(),$em->getManager());
        $hasil = $this->dbTable->SPUpdate('sp_department_update',$this->setup->_project_id,$this->setup->_pt_id, $em->getAddBy(), $em->getId(),$em->getName(),$em->getCode(),$em->getDescription(),$em->getManager());
        return $hasil;
    }

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        
        // wulan edit 2020 08 05
        $cek = $this->cek_transaksi($decan->getString());
        if ($cek > 0) {
            return false;
        }
        
        
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_department_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }

    public function getAllbyparam(Hrd_Models_Master_Department $param){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_department_read',$param->getProject()->getId(),$param->getPt()->getId(),1,9999,'');
        return $hasil;
    }

    public function getAllProjectPt(Box_Models_App_HasilRequestRead $r, Hrd_Models_Master_Department $em,$session,$projectpt_id) {
        $get_id = 0;
        $get_id = $this->dbTable->SPExecute('sp_projectpt_getid_read',
                $session->getUserid(),
                $session->getGroupid(),
                $projectpt_id,1,99999);

        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_department_projectpt_read', $get_id[1][0]['project_id'], $get_id[1][0]['pt_id'],1,9999,'');

        $hasil_gabungan = $this->getAllProjectPt_Upload($r, $em,$session,$projectpt_id,$hasil);

        //return $hasil;
        return $hasil_gabungan;
    }

    public function getAllProjectPt_Upload(Box_Models_App_HasilRequestRead $r, Hrd_Models_Master_Department $em,$session,$projectpt_id,$hasil) {
        $get_id = 0;
        $get_id = $this->dbTable->SPExecute('sp_projectpt_getid_read',
                $session->getUserid(),
                $session->getGroupid(),
                $projectpt_id,1,99999);

        $hasil_upload = 0;

        $hasil_upload = $this->dbTable->SPExecute('sp_upload_master_dept_read', $get_id[1][0]['project_id'], $get_id[1][0]['pt_id'],1,9999,'','');
        
        $hasil_gabungan_total = $hasil_upload[0][0]['totalRow'] + $hasil[0][0]['totalRow'];
        $hasil_gabungan_data  = array_merge($hasil[1],$hasil_upload[1]);
        $hasil_result[0][0]['totalRow'] = $hasil_gabungan_total;
        $hasil_result[1] = $hasil_gabungan_data;

        return $hasil_result;
    }

    public function getAllPt(Box_Models_App_HasilRequestRead $r, Hrd_Models_Master_Department $em,$session,$ptpt_id) {
        
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_department_pt_read', $ptpt_id,1,9999,'');

        //$hasil_gabungan = $this->getAllProjectPt_Upload($r, $em,$session,$projectpt_id,$hasil);

        return $hasil;
        // return $hasil_gabungan;
    }

    // wulan edit 2020 08 05
    public function cek_transaksi($id){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_department_cektransaksi_read',$id);
        return $hasil[1][0]['count'];
    }
    
    // wulan edit 2020 11 05
    public function cek_name_code($id=0, $type, $val, $project, $pt){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_department_ceknamecode_read', $id, $type, $val, $project, $pt);        
        //var_dump($this->dbTable); exit;
        return $hasil[1][0]['count'];
    }


}

?>
