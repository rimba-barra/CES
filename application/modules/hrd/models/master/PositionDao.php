<?php
/**
 * Description of DepartmentDao
 *
 * @author MIS
 */
class Hrd_Models_Master_PositionDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {
    
    // added by wulan sari 20200810
    public $setup =null;
    public function __construct() {
        parent::__construct();
        $this->setup = new Hrd_Models_General_Setup();
    }
    // end added by wulan sari 20200810
    
    public function save(Hrd_Models_Master_Position $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_position_create',$d->getAddBy(),$d->getName(),$d->getDescription(),$this->setup->_project_id);  
        return $hasil;
    }
    
    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Master_Position $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_position_read', $r->getPage(), $r->getLimit(),$d->getName(),$d->getDescription(), $this->setup->_project_id);
        return $hasil;
    }
    
    public function getAllWoPL(Hrd_Models_Master_Position $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_position_read',1,99999,$d->getName(),$d->getDescription(),$this->setup->_project_id);
	
        return $hasil;
    }

    // added by Michael 2021.05.19
    public function getAllWoPL_CustomProjectPt(Hrd_Models_Master_Position $d,$data){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_position_read',1,99999,$d->getName(),$d->getDescription(),$data['project_id']);
    
        return $hasil;
    }
    // end added by Michael 2021.05.19

    public function getAllPosition(Hrd_Models_Master_Position $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_position_read',1,99999,$d->getName(),$d->getDescription());
    
        $hasil_gabungan = $this->getAllPosition_Upload($d,$hasil);

        //return $hasil;
        return $hasil_gabungan;
    }

    public function getAllPosition_Upload(Hrd_Models_Master_Position $d, $hasil,$session,$projectpt_id) {
        $get_id = 0;
        $get_id = $this->dbTable->SPExecute('sp_projectpt_getid_read',
                $session->getUserid(),
                $session->getGroupid(),
                $projectpt_id,1,99999);

        $hasil_upload = 0;
        $hasil_upload = $this->dbTable->SPExecute(
            'sp_upload_master_position_read',
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

    public function getAllSubholdingSubname(Hrd_Models_Master_Position $d, $subholding_subname,$session,$projectpt_id){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_position_subholdingsubname_read',1,99999,$d->getName(),$d->getDescription(),$subholding_subname);
    
        // $hasil_gabungan = $this->getAllPosition_Upload($d,$hasil,$session,$projectpt_id);

        return $hasil;
        // return $hasil_gabungan;
    }

    public function update(Hrd_Models_Master_Position $em) {
        $hasil = 0;
        if ($em->getId() == 0) {
            return $hasil;
        }
       
        $hasil = $this->dbTable->SPUpdate('sp_position_update', $em->getAddBy(), $em->getId(), 
                $em->getName(),$em->getDescription());
        return $hasil;
    }

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        
        // wulan edit 2020 08 05
        $cek = $this->cek_transaksi($decan->getString());
        if ($cek > 0) {
            return false;
        }
                
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_position_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }    
    
    // wulan edit 2020 08 05
    public function cek_transaksi($id){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_position_cektransaksi_read',$id);
        return $hasil[1][0]['count'];
    }
    
    // wulan edit 2020 11 05
    public function cek_name_code($id=0, $type, $val, $project){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_position_ceknamecode_read', $id, $type, $val, $project);        
        //var_dump($this->dbTable); exit;
        return $hasil[1][0]['count'];
    }
}

?>
