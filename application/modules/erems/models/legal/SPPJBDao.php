<?php

/**
 * Description of SPPJBDao
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Legal_SPPJBDao extends Erems_Box_Models_App_AbDao{
   
    
    
    
    public function getAll(Erems_Box_Models_App_HasilRequestRead $r, Erems_Models_Legal_SPPJBSby $sp){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_sppjbsby_read',
                $sp->getProject()->getId(),$sp->getPt()->getId(),$r->getPage(),$r->getLimit(),
                $sp->getNumber()
                );
        return $hasil;
    }
    
    public function getOne($id){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_sppjbsbydetail_read',
                intval($id)
                );
        return $hasil;
    }
    
   
    
    public function save(Erems_Models_Legal_SPPJBSby $sb){
        $hasil = 0;
       
        $hasil = $this->dbTable->SPUpdate('sp_sppjbsby_create',$sb->getAddBy(),$sb->getProject()->getId(),
                $sb->getPt()->getId(),
                $sb->getNumber(),$sb->getDate(),
$sb->getCompany_sertifikat_induk(),
$sb->getCetak(),
$sb->getRangkap(),
$sb->getCompany_kecamatan(),
$sb->getKembalicustomer_tanggal(),
$sb->getKembalicustomer_keterangan(),
$sb->getDatasppjb_warna(),
$sb->getDatasppjb_palinglambat(),
$sb->getDatasppjb_biayalambat(),
$sb->getDatasppjb_alasanbatal(),
$sb->getDatasppjb_biayabatal(),
$sb->getDatasppjb_st_setelah(),
$sb->getDatasppjb_serahfisik(),
$sb->getDatasppjb_dendalambatkosong(),
$sb->getDatasppjb_deadlinebangunan(),
$sb->getDatasppjb_bayarbank(),
$sb->getDatasppjb_bayarbank_cabang(),
$sb->getDatasppjb_nomor_rekening(),
$sb->getDatasppjb_atas_nama(),
$sb->getPihak2_customer(),
$sb->getPihak2_alamat(),
$sb->getPihak2_jabatan(),
$sb->getPihak2_namapt(),
$sb->getPihak2_telp(),
$sb->getPihak2_fax(),
$sb->getPihak2_ktp_no(),
$sb->getPihak2_npwp(),
$sb->getPihak2_suratkuasano(),
$sb->getPihak2_suratkuasatgl(),
$sb->getPihak2_suratkuasanama(),
$sb->getPihak2_suratkuasaalamat(),
$sb->getPihak2_suratkuasanik(),
$sb->getHargatermasuk_is_imb(),
$sb->getHargatermasuk_is_air(),
$sb->getHargatermasuk_listrik(),
$sb->getHargatermasuk_listrik_nilai(),
$sb->getHargatermasuk_is_telpon(),
$sb->getHargatdktermasuk_isppn(),
$sb->getHargatdktermasuk_ppnbm(),
$sb->getHargatdktermasuk_bphtb(),
$sb->getHargatdktermasuk_ppat(),
$sb->getHargatdktermasuk_bbn(),
$sb->getHargatdktermasuk_biayaadmin(),
$sb->getHargatdktermasuk_ipl(),
$sb->getHargatdktermasuk_lainnya(),
$sb->getPihak1_parametersppjb_id(),
$sb->getKet_carabayar(),
                $sb->getKirimcustomer_tanggal(),
$sb->getKirimcustomer_keterangan(),
$sb->getTerimacustomer_tanggal(),
$sb->getTerimacustomer_keterangan(),
$sb->getDes1_ak_pihak1(),
$sb->getDes2_ak_pihak1(),
$sb->getSum_ak_pihak1(),
$sb->getDes1_ak_pihak2(),
$sb->getDes2_ak_pihak2(),
                $sb->getSum_ak_pihak2()
                );
      
     
        return $hasil;
    }
    
    
    
    public function dataExist(Erems_Models_Formorderajb_FormOrderAJB $ft){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_formorderajbexist_read',$ft->getProject()->getId(),$ft->getPt()->getId(),$ft->getNomor());
        
        return $hasil;
    }
    
    //sp_projectfacilitiestcodeexist_read
    
    public function update(Erems_Models_Legal_SPPJBSby $sb){
        $hasil = 0;
        
        if($sb->getId()==0){
            return 0;
        }
      
        $hasil = $this->dbTable->SPUpdate('sp_sppjbsby_update',
                $sb->getAddBy(),
                $sb->getId(),
                $sb->getNumber(),
                $sb->getDate(),
$sb->getCompany_sertifikat_induk(),
$sb->getCetak(),
$sb->getRangkap(),
$sb->getCompany_kecamatan(),
$sb->getKembalicustomer_tanggal(),
$sb->getKembalicustomer_keterangan(),
$sb->getDatasppjb_warna(),
$sb->getDatasppjb_palinglambat(),
$sb->getDatasppjb_biayalambat(),
$sb->getDatasppjb_alasanbatal(),
$sb->getDatasppjb_biayabatal(),
$sb->getDatasppjb_st_setelah(),
$sb->getDatasppjb_serahfisik(),
$sb->getDatasppjb_dendalambatkosong(),
$sb->getDatasppjb_deadlinebangunan(),
$sb->getDatasppjb_bayarbank(),
$sb->getDatasppjb_bayarbank_cabang(),
$sb->getDatasppjb_nomor_rekening(),
$sb->getDatasppjb_atas_nama(),
$sb->getPihak2_customer(),
$sb->getPihak2_alamat(),
$sb->getPihak2_jabatan(),
$sb->getPihak2_namapt(),
$sb->getPihak2_telp(),
$sb->getPihak2_fax(),
$sb->getPihak2_ktp_no(),
$sb->getPihak2_npwp(),
$sb->getPihak2_suratkuasano(),
$sb->getPihak2_suratkuasatgl(),
$sb->getPihak2_suratkuasanama(),
$sb->getPihak2_suratkuasaalamat(),
$sb->getPihak2_suratkuasanik(),
$sb->getHargatermasuk_is_imb(),
$sb->getHargatermasuk_is_air(),
$sb->getHargatermasuk_listrik(),
$sb->getHargatermasuk_listrik_nilai(),
$sb->getHargatermasuk_is_telpon(),
$sb->getHargatdktermasuk_isppn(),
$sb->getHargatdktermasuk_ppnbm(),
$sb->getHargatdktermasuk_bphtb(),
$sb->getHargatdktermasuk_ppat(),
$sb->getHargatdktermasuk_bbn(),
$sb->getHargatdktermasuk_biayaadmin(),
$sb->getHargatdktermasuk_ipl(),
$sb->getHargatdktermasuk_lainnya(),
$sb->getPihak1_parametersppjb_id(),
$sb->getKet_carabayar(),
                $sb->getKirimcustomer_tanggal(),
$sb->getKirimcustomer_keterangan(),
$sb->getTerimacustomer_tanggal(),
$sb->getTerimacustomer_keterangan(),
$sb->getDes1_ak_pihak1(),
$sb->getDes2_ak_pihak1(),
$sb->getSum_ak_pihak1(),
$sb->getDes1_ak_pihak2(),
$sb->getDes2_ak_pihak2(),
                $sb->getSum_ak_pihak2()
                );
     
              
              //  var_dump($this->dbTable);
        return $hasil;
    }

    

    public function delete($ids, \Erems_Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_sppjbsby_destroy',$ids, $session->getUserId());
        return $row;
    }
}
