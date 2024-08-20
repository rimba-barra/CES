<?php

/**
 * Description of Dao
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Ktpiutangfin_Dao extends Erems_Box_Models_App_AbDao {
   
    public function save($user,$project,$pt,$records) {
        $hasil = array();

        $hasil = $this->dbTable->SPUpdate('sp_ktpiutangfin_create',$user,$project,$pt,
                $records["unit_unit_id"],
                "", /// tahun vocer
                $records["no_vch"],
                $records["kode_acc"],
                "", // nomor urut
                "", // nomor urut sub
                $records["sub_kode_sub"],
                $records["tgl_vch"],
                $records["ket"],
                $records["mutasi"],
                $records["sts_mutasi"],
                $records["flag_sub"],
                "", // flag posting
                "", // flag sj
                "", // flag pj
                "", // flag pph partner
                "" // flag pph owner
                );
        
      //  var_dump($this->dbTable);

        return $hasil;
    }
    
    public function update($user,$project,$pt, Erems_Models_Ktpiutangfin_Ktpiutangfin $k) {
        $hasil = array();

        $hasil = $this->dbTable->SPUpdate('sp_ktpiutangfin_update',$user,$project,$pt,
                $k->getUnit()->getId(),
                $k->getNo_vch(),
                $k->getKode_acc(),
                $k->getFlag_sj(),
                $k->getFlag_pj(),
                $k->getFlag_pph_partner(),
                $k->getFlag_pph_owner()
                );
 

        return $hasil;
    }
   
    
    public function all($unitId,$page,$limit) {
        $hasil = array();

        $hasil = $this->dbTable->SPExecute('sp_ktpiutangfin_read',$unitId,$page,$limit);
        
        

        return $hasil;
    }
    
    public function delete($user, Erems_Models_Ktpiutangfin_Ktpiutangfin $kpf) {
        $hasil = array();

        $hasil = $this->dbTable->SPUpdate('sp_ktpiutangfin_destroy',$kpf->getUnit()->getId(),$kpf->getNo_vch(),$kpf->getKode_acc(),$user);
        
        //var_dump($this->dbTable);

        return $hasil;
    }
    
    
 

    

}
