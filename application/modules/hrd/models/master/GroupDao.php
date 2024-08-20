<?php
/**
 * Description of DepartmentDao
 *
 * @author MIS
 */
class Hrd_Models_Master_GroupDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {
    public function save(Hrd_Models_Master_Group $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_group_create',$d->getAddBy(),$d->getProject()->getId(),$d->getPt()->getId(),$d->getName(),
            $d->getCode(),$d->getUangMakan(),$d->getUangMakanExtra(),$d->getUangTransport(),
            $d->getUangHadir(),$d->getLembur(),$d->getLambat(),$d->getDendaTerlambat(),
            $d->getUangTransportMod(),$d->getUangMakanMod(),$d->getPoint(),$d->getSplitShift(),$d->getIndexNo());
        //var_dump($this->dbTable);
        return $hasil;
    }

    public function savefromimport($data) {
        $hasil = 0;        
        $hasil = $this->dbTable->SPUpdate(
                'sp_group_create_from_import',
                $data['project_id'],
                $data['pt_id'],
                $data['user_id'],
                $data['code'],
                $data['group'],
                $data['index_no']
                );   
      
        return $hasil;
    }
    
    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Master_Group $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_group_read', $d->getProject()->getId(),$d->getPt()->getId(),$r->getPage(), $r->getLimit(),$d->getName(),$d->getCode());
        return $hasil;
    }

    public function getAllProjectPt(Box_Models_App_HasilRequestRead $r, Hrd_Models_Master_Group $em,$session,$projectpt_id) {
        $get_id = 0;
        $get_id = $this->dbTable->SPExecute('sp_projectpt_getid_read',
                $session->getUserid(),
                $session->getGroupid(),
                $projectpt_id,1,99999);

        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_group_projectpt_read', $get_id[1][0]['project_id'], $get_id[1][0]['pt_id'],1,9999,'','');

        $hasil_gabungan = $this->getAllProjectPt_Upload($r, $em,$session,$projectpt_id,$hasil);

        //return $hasil;
        return $hasil_gabungan;
    }

    public function getAllProjectPt_Upload(Box_Models_App_HasilRequestRead $r, Hrd_Models_Master_Group $em,$session,$projectpt_id,$hasil) {
        $get_id = 0;
        $get_id = $this->dbTable->SPExecute('sp_projectpt_getid_read',
                $session->getUserid(),
                $session->getGroupid(),
                $projectpt_id,1,99999);

        $hasil_upload = 0;

        $hasil_upload = $this->dbTable->SPExecute('sp_upload_master_group_read', $get_id[1][0]['project_id'], $get_id[1][0]['pt_id'],1,9999,'','');
        
        $hasil_gabungan_total = $hasil_upload[0][0]['totalRow'] + $hasil[0][0]['totalRow'];
        $hasil_gabungan_data  = array_merge($hasil[1],$hasil_upload[1]);
        $hasil_result[0][0]['totalRow'] = $hasil_gabungan_total;
        $hasil_result[1] = $hasil_gabungan_data;

        return $hasil_result;
    }

    public function getAllPt(Box_Models_App_HasilRequestRead $r, Hrd_Models_Master_Group $em,$session,$ptpt_id) {
        
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_group_pt_read', $ptpt_id,1,9999,'','');

        //$hasil_gabungan = $this->getAllProjectPt_Upload($r, $em,$session,$projectpt_id,$hasil);

        return $hasil;
        // return $hasil_gabungan;
    }
    
    public function getAllWoF(Hrd_Models_Master_Group $d){
    	$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $user_id = $this->session->getUserId();
        
        $hasil = 0;
        //$hasil = $this->dbTable->SPExecute('sp_group_read',$d->getProject()->getId(),$d->getPt()->getId(),1,99999,$d->getName(),$d->getCode());
        /* edit by wulan sari 20190618
         * group yang ditampilkan dibatasi sesuai hak akses user
         */
        $hasil = $this->dbTable->SPExecute('sp_group_read_byaccess',$d->getProject()->getId(),$d->getPt()->getId(),1,99999,$d->getName(),$d->getCode(),$user_id);
        return $hasil;
    }

     /* added by ahmad riadi 26-07-2017 */	
     public function getAllDefaultBrowse(Hrd_Models_Master_Group $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_group_read',$d->getProjectid(),$d->getPtid(),1,99999,$d->getName(),$d->getCode());
        return $hasil;
    }	

    public function update(Hrd_Models_Master_Group $d) {
        $hasil = 0;
        if ($d->getId() == 0) {
            return $hasil;
        }
        
        
       
        $hasil = $this->dbTable->SPUpdate('sp_group_update', 
                $d->getAddBy(), 
                $d->getId(), 
                $d->getName(),
                $d->getCode(),
                $d->getUangMakan(),
                $d->getUangMakanExtra(),
                $d->getUangTransport(),
                $d->getUangHadir(),
                $d->getLembur(),
                $d->getLambat(),
                $d->getDendaTerlambat(),
                $d->getUangTransportMod(),
                $d->getUangMakanMod(),
                $d->getPoint(),
                $d->getSplitShift(),
                $d->getIndexNo());
        return $hasil;
    }

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        // wulan edit 2020 11 05
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_group_cektransaksi_read', $decan->getString());
        if($hasil[1][0]['count'] > 0){
            echo 'in used';
            exit;
        }
        
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_group_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }
    
    // wulan edit 2020 11 05    
    public function codeExist(Hrd_Models_Master_Group $d) {
        $hasil = array();
        
        $hasil = $this->dbTable->SPExecute(
            'sp_groupcodeexist_read',
            $d->getCode(),
            $d->getProject()->getId(),$d->getPt()->getId()
            );
        
        return $hasil;
    }
    
    public function nameExist(Hrd_Models_Master_Group $d) {
        $hasil = array();
        
        $hasil = $this->dbTable->SPExecute(
            'sp_groupnameexist_read',
            $d->getName(),
            $d->getId(),
            $d->getProject()->getId(),$d->getPt()->getId()
            );
        //var_dump($this->dbTable);
        return $hasil;
    }

    public function getAllWOPL(Box_Models_App_HasilRequestRead $r, Hrd_Models_Master_Group $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_group_read', $d->getProject()->getId(),$d->getPt()->getId(), 1, 9999,$d->getName(),$d->getCode());
        return $hasil;
    }
}

?>
