<?php

/**
 * Description of SPPJBSby
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Legal_SPPJBSby extends Erems_Models_Legal_SPPJB {

    private $project;
    private $pt;
    private $company_sertifikat_induk;
    private $cetak;
    private $rangkap;
    private $company_kecamatan;
    private $kembalicustomer_tanggal;
    private $kembalicustomer_keterangan;
    private $datasppjb_warna;
    private $datasppjb_palinglambat;
    private $datasppjb_biayalambat;
    private $datasppjb_alasanbatal;
    private $datasppjb_biayabatal;
    private $datasppjb_st_setelah;
    private $datasppjb_serahfisik;
    private $datasppjb_dendalambatkosong;
    private $datasppjb_deadlinebangunan;
    private $datasppjb_bayarbank;
    private $datasppjb_bayarbank_cabang;
    private $datasppjb_nomor_rekening;
    private $datasppjb_atas_nama;
    private $pihak2_customer;
    private $pihak2_alamat;
    private $pihak2_jabatan;
    private $pihak2_namapt;
    private $pihak2_telp;
    private $pihak2_fax;
    private $pihak2_ktp_no;
    private $pihak2_npwp;
    private $pihak2_suratkuasano;
    private $pihak2_suratkuasatgl;
    private $pihak2_suratkuasanama;
    private $pihak2_suratkuasaalamat;
    private $pihak2_suratkuasanik;
    private $hargatermasuk_is_imb;
    private $hargatermasuk_is_air;
    private $hargatermasuk_listrik;
    private $hargatermasuk_listrik_nilai;
    private $hargatermasuk_is_telpon;
    private $hargatdktermasuk_isppn;
    private $hargatdktermasuk_ppnbm;
    private $hargatdktermasuk_bphtb;
    private $hargatdktermasuk_ppat;
    private $hargatdktermasuk_bbn;
    private $hargatdktermasuk_biayaadmin;
    private $hargatdktermasuk_ipl;
    private $hargatdktermasuk_lainnya;
    private $pihak1_parametersppjb_id;
    private $ket_carabayar;
    private $kirimcustomer_tanggal;
    private $kirimcustomer_keterangan;
    private $terimacustomer_tanggal;
    private $terimacustomer_keterangan;
    private $des1_ak_pihak1;
    private $des2_ak_pihak1;
    private $sum_ak_pihak1;
    private $des1_ak_pihak2;
    private $des2_ak_pihak2;
    private $sum_ak_pihak2;

    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "sppjbsby_";
    }

    public function setArrayTable($dataArray = NULL) {
        parent::setArrayTable($dataArray);
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;


        if (isset($x["company_sertifikat_induk"])) {
            $this->setCompany_sertifikat_induk($x["company_sertifikat_induk"]);
        }
        if (isset($x["cetak"])) {
            $this->setCetak($x["cetak"]);
        }
        if (isset($x["rangkap"])) {
            $this->setRangkap($x["rangkap"]);
        }
        if (isset($x["company_kecamatan"])) {
            $this->setCompany_kecamatan($x["company_kecamatan"]);
        }
        if (isset($x["kembalicustomer_tanggal"])) {
            $this->setKembalicustomer_tanggal($x["kembalicustomer_tanggal"]);
        }
        if (isset($x["kembalicustomer_keterangan"])) {
            $this->setKembalicustomer_keterangan($x["kembalicustomer_keterangan"]);
        }
        if (isset($x["datasppjb_warna"])) {
            $this->setDatasppjb_warna($x["datasppjb_warna"]);
        }
        if (isset($x["datasppjb_palinglambat"])) {
            $this->setDatasppjb_palinglambat($x["datasppjb_palinglambat"]);
        }
        if (isset($x["datasppjb_biayalambat"])) {
            $this->setDatasppjb_biayalambat($x["datasppjb_biayalambat"]);
        }
        if (isset($x["datasppjb_alasanbatal"])) {
            $this->setDatasppjb_alasanbatal($x["datasppjb_alasanbatal"]);
        }
        if (isset($x["datasppjb_biayabatal"])) {
            $this->setDatasppjb_biayabatal($x["datasppjb_biayabatal"]);
        }
        if (isset($x["datasppjb_st_setelah"])) {
            $this->setDatasppjb_st_setelah($x["datasppjb_st_setelah"]);
        }
        if (isset($x["datasppjb_serahfisik"])) {
            $this->setDatasppjb_serahfisik($x["datasppjb_serahfisik"]);
        }
        if (isset($x["datasppjb_dendalambatkosong"])) {
            $this->setDatasppjb_dendalambatkosong($x["datasppjb_dendalambatkosong"]);
        }
        if (isset($x["datasppjb_deadlinebangunan"])) {
            $this->setDatasppjb_deadlinebangunan($x["datasppjb_deadlinebangunan"]);
        }
        if (isset($x["datasppjb_bayarbank"])) {
            $this->setDatasppjb_bayarbank($x["datasppjb_bayarbank"]);
        }
        if (isset($x["datasppjb_bayarbank_cabang"])) {
            $this->setDatasppjb_bayarbank_cabang($x["datasppjb_bayarbank_cabang"]);
        }
        if (isset($x["datasppjb_nomor_rekening"])) {
            $this->setDatasppjb_nomor_rekening($x["datasppjb_nomor_rekening"]);
        }
        if (isset($x["datasppjb_atas_nama"])) {
            $this->setDatasppjb_atas_nama($x["datasppjb_atas_nama"]);
        }
        if (isset($x["pihak2_customer"])) {
            $this->setPihak2_customer($x["pihak2_customer"]);
        }
        if (isset($x["pihak2_alamat"])) {
            $this->setPihak2_alamat($x["pihak2_alamat"]);
        }
        if (isset($x["pihak2_jabatan"])) {
            $this->setPihak2_jabatan($x["pihak2_jabatan"]);
        }
        if (isset($x["pihak2_namapt"])) {
            $this->setPihak2_namapt($x["pihak2_namapt"]);
        }
        if (isset($x["pihak2_telp"])) {
            $this->setPihak2_telp($x["pihak2_telp"]);
        }
        if (isset($x["pihak2_fax"])) {
            $this->setPihak2_fax($x["pihak2_fax"]);
        }
        if (isset($x["pihak2_ktp_no"])) {
            $this->setPihak2_ktp_no($x["pihak2_ktp_no"]);
        }
        if (isset($x["pihak2_npwp"])) {
            $this->setPihak2_npwp($x["pihak2_npwp"]);
        }
        if (isset($x["pihak2_suratkuasano"])) {
            $this->setPihak2_suratkuasano($x["pihak2_suratkuasano"]);
        }
        if (isset($x["pihak2_suratkuasatgl"])) {
            $this->setPihak2_suratkuasatgl($x["pihak2_suratkuasatgl"]);
        }
        if (isset($x["pihak2_suratkuasanama"])) {
            $this->setPihak2_suratkuasanama($x["pihak2_suratkuasanama"]);
        }
        if (isset($x["pihak2_suratkuasaalamat"])) {
            $this->setPihak2_suratkuasaalamat($x["pihak2_suratkuasaalamat"]);
        }
        if (isset($x["pihak2_suratkuasanik"])) {
            $this->setPihak2_suratkuasanik($x["pihak2_suratkuasanik"]);
        }
        if (isset($x["hargatermasuk_is_imb"])) {
            $this->setHargatermasuk_is_imb($x["hargatermasuk_is_imb"]);
        }
        if (isset($x["hargatermasuk_is_air"])) {
            $this->setHargatermasuk_is_air($x["hargatermasuk_is_air"]);
        }
        if (isset($x["hargatermasuk_listrik"])) {
            $this->setHargatermasuk_listrik($x["hargatermasuk_listrik"]);
        }
        if (isset($x["hargatermasuk_listrik_nilai"])) {
            $this->setHargatermasuk_listrik_nilai($x["hargatermasuk_listrik_nilai"]);
        }
        if (isset($x["hargatermasuk_is_telpon"])) {
            $this->setHargatermasuk_is_telpon($x["hargatermasuk_is_telpon"]);
        }
        if (isset($x["hargatdktermasuk_isppn"])) {
            $this->setHargatdktermasuk_isppn($x["hargatdktermasuk_isppn"]);
        }
        if (isset($x["hargatdktermasuk_ppnbm"])) {
            $this->setHargatdktermasuk_ppnbm($x["hargatdktermasuk_ppnbm"]);
        }
        if (isset($x["hargatdktermasuk_bphtb"])) {
            $this->setHargatdktermasuk_bphtb($x["hargatdktermasuk_bphtb"]);
        }
        if (isset($x["hargatdktermasuk_ppat"])) {
            $this->setHargatdktermasuk_ppat($x["hargatdktermasuk_ppat"]);
        }
        if (isset($x["hargatdktermasuk_bbn"])) {
            $this->setHargatdktermasuk_bbn($x["hargatdktermasuk_bbn"]);
        }
        if (isset($x["hargatdktermasuk_biayaadmin"])) {
            $this->setHargatdktermasuk_biayaadmin($x["hargatdktermasuk_biayaadmin"]);
        }
        if (isset($x["hargatdktermasuk_ipl"])) {
            $this->setHargatdktermasuk_ipl($x["hargatdktermasuk_ipl"]);
        }
        if (isset($x["hargatdktermasuk_lainnya"])) {
            $this->setHargatdktermasuk_lainnya($x["hargatdktermasuk_lainnya"]);
        }
        if (isset($x["pihak1_parametersppjb_id"])) {
            $this->setPihak1_parametersppjb_id($x["pihak1_parametersppjb_id"]);
        }
        if (isset($x["ket_carabayar"])) {
            $this->setKet_carabayar($x["ket_carabayar"]);
        }
        if (isset($x["kirimcustomer_tanggal"])) {
            $this->setKirimcustomer_tanggal($x["kirimcustomer_tanggal"]);
        }
        if (isset($x["kirimcustomer_keterangan"])) {
            $this->setKirimcustomer_keterangan($x["kirimcustomer_keterangan"]);
        }
        if (isset($x["terimacustomer_tanggal"])) {
            $this->setTerimacustomer_tanggal($x["terimacustomer_tanggal"]);
        }
        if (isset($x["terimacustomer_keterangan"])) {
            $this->setTerimacustomer_keterangan($x["terimacustomer_keterangan"]);
        }
        if (isset($x["des1_ak_pihak1"])) {
            $this->setDes1_ak_pihak1($x["des1_ak_pihak1"]);
        }
        if (isset($x["des2_ak_pihak1"])) {
            $this->setDes2_ak_pihak1($x["des2_ak_pihak1"]);
        }
        if (isset($x["sum_ak_pihak1"])) {
            $this->setSum_ak_pihak1($x["sum_ak_pihak1"]);
        }
        if (isset($x["des1_ak_pihak2"])) {
            $this->setDes1_ak_pihak2($x["des1_ak_pihak2"]);
        }
        if (isset($x["des2_ak_pihak2"])) {
            $this->setDes2_ak_pihak2($x["des2_ak_pihak2"]);
        }
         if (isset($x["sum_ak_pihak2"])) {
            $this->setSum_ak_pihak2($x["sum_ak_pihak2"]);
        }


        unset($x);
    }

    public function getArrayTable() {
        $y = parent::getArrayTable();
        $x = array(
            "company_sertifikat_induk" => $this->getCompany_sertifikat_induk(),
            "cetak" => $this->getCetak(),
            "rangkap" => $this->getRangkap(),
            "company_kecamatan" => $this->getCompany_kecamatan(),
            "kembalicustomer_tanggal" => $this->getKembalicustomer_tanggal(),
            "kembalicustomer_keterangan" => $this->getKembalicustomer_keterangan(),
            "datasppjb_warna" => $this->getDatasppjb_warna(),
            "datasppjb_palinglambat" => $this->getDatasppjb_palinglambat(),
            "datasppjb_biayalambat" => $this->getDatasppjb_biayalambat(),
            "datasppjb_alasanbatal" => $this->getDatasppjb_alasanbatal(),
            "datasppjb_biayabatal" => $this->getDatasppjb_biayabatal(),
            "datasppjb_st_setelah" => $this->getDatasppjb_st_setelah(),
            "datasppjb_serahfisik" => $this->getDatasppjb_serahfisik(),
            "datasppjb_dendalambatkosong" => $this->getDatasppjb_dendalambatkosong(),
            "datasppjb_deadlinebangunan" => $this->getDatasppjb_deadlinebangunan(),
            "datasppjb_bayarbank" => $this->getDatasppjb_bayarbank(),
            "datasppjb_bayarbank_cabang" => $this->getDatasppjb_bayarbank_cabang(),
            "datasppjb_nomor_rekening" => $this->getDatasppjb_nomor_rekening(),
            "datasppjb_atas_nama" => $this->getDatasppjb_atas_nama(),
            "pihak2_customer" => $this->getPihak2_customer(),
            "pihak2_alamat" => $this->getPihak2_alamat(),
            "pihak2_jabatan" => $this->getPihak2_jabatan(),
            "pihak2_namapt" => $this->getPihak2_namapt(),
            "pihak2_telp" => $this->getPihak2_telp(),
            "pihak2_fax" => $this->getPihak2_fax(),
            "pihak2_ktp_no" => $this->getPihak2_ktp_no(),
            "pihak2_npwp" => $this->getPihak2_npwp(),
            "pihak2_suratkuasano" => $this->getPihak2_suratkuasano(),
            "pihak2_suratkuasatgl" => $this->getPihak2_suratkuasatgl(),
            "pihak2_suratkuasanama" => $this->getPihak2_suratkuasanama(),
            "pihak2_suratkuasaalamat" => $this->getPihak2_suratkuasaalamat(),
            "pihak2_suratkuasanik" => $this->getPihak2_suratkuasanik(),
            "hargatermasuk_is_imb" => $this->getHargatermasuk_is_imb(),
            "hargatermasuk_is_air" => $this->getHargatermasuk_is_air(),
            "hargatermasuk_listrik" => $this->getHargatermasuk_listrik(),
            "hargatermasuk_listrik_nilai" => $this->getHargatermasuk_listrik_nilai(),
            "hargatermasuk_is_telpon" => $this->getHargatermasuk_is_telpon(),
            "hargatdktermasuk_isppn" => $this->getHargatdktermasuk_isppn(),
            "hargatdktermasuk_ppnbm" => $this->getHargatdktermasuk_ppnbm(),
            "hargatdktermasuk_bphtb" => $this->getHargatdktermasuk_bphtb(),
            "hargatdktermasuk_ppat" => $this->getHargatdktermasuk_ppat(),
            "hargatdktermasuk_bbn" => $this->getHargatdktermasuk_bbn(),
            "hargatdktermasuk_biayaadmin" => $this->getHargatdktermasuk_biayaadmin(),
            "hargatdktermasuk_ipl" => $this->getHargatdktermasuk_ipl(),
            "hargatdktermasuk_lainnya" => $this->getHargatdktermasuk_lainnya(),
            "pihak1_parametersppjb_id" => $this->getPihak1_parametersppjb_id(),
            "ket_carabayar" => $this->getKet_carabayar(),
            "kirimcustomer_tanggal" => $this->getKirimcustomer_tanggal(),
            "kirimcustomer_keterangan" => $this->getKirimcustomer_keterangan(),
            "terimacustomer_tanggal" => $this->getTerimacustomer_tanggal(),
            "terimacustomer_keterangan" => $this->getTerimacustomer_keterangan(),
            "des1_ak_pihak1" => $this->getDes1_ak_pihak1(),
            "des2_ak_pihak1" => $this->getDes2_ak_pihak1(),
            "sum_ak_pihak1" => $this->getSum_ak_pihak1(),
            "des1_ak_pihak2" => $this->getDes1_ak_pihak2(),
            "des2_ak_pihak2" => $this->getDes2_ak_pihak2(),
            "sum_ak_pihak2" => $this->getSum_ak_pihak2(),
        );

        $x = array_merge($x, $y);

        return $x;
    }

    function getCompany_sertifikat_induk() {
        return $this->company_sertifikat_induk;
    }

    function getCetak() {
        return $this->cetak;
    }

    function getRangkap() {
        return $this->rangkap;
    }

    function getCompany_kecamatan() {
        return $this->company_kecamatan;
    }

    function getKembalicustomer_tanggal() {
        return $this->kembalicustomer_tanggal;
    }

    function getKembalicustomer_keterangan() {
        return $this->kembalicustomer_keterangan;
    }

    function getDatasppjb_warna() {
        return $this->datasppjb_warna;
    }

    function getDatasppjb_palinglambat() {
        return $this->datasppjb_palinglambat;
    }

    function getDatasppjb_biayalambat() {
        return $this->datasppjb_biayalambat;
    }

    function getDatasppjb_alasanbatal() {
        return $this->datasppjb_alasanbatal;
    }

    function getDatasppjb_biayabatal() {
        return $this->datasppjb_biayabatal;
    }

    function getDatasppjb_st_setelah() {
        return $this->datasppjb_st_setelah;
    }

    function getDatasppjb_serahfisik() {
        return $this->datasppjb_serahfisik;
    }

    function getDatasppjb_dendalambatkosong() {
        return $this->datasppjb_dendalambatkosong;
    }

    function getDatasppjb_deadlinebangunan() {
        return $this->datasppjb_deadlinebangunan;
    }

    function getDatasppjb_bayarbank() {
        return $this->datasppjb_bayarbank;
    }

    function getDatasppjb_bayarbank_cabang() {
        return $this->datasppjb_bayarbank_cabang;
    }

    function getDatasppjb_nomor_rekening() {
        return $this->datasppjb_nomor_rekening;
    }

    function getDatasppjb_atas_nama() {
        return $this->datasppjb_atas_nama;
    }

    function getPihak2_customer() {
        return $this->pihak2_customer;
    }

    function getPihak2_alamat() {
        return $this->pihak2_alamat;
    }

    function getPihak2_jabatan() {
        return $this->pihak2_jabatan;
    }

    function getPihak2_namapt() {
        return $this->pihak2_namapt;
    }

    function getPihak2_telp() {
        return $this->pihak2_telp;
    }

    function getPihak2_fax() {
        return $this->pihak2_fax;
    }

    function getPihak2_ktp_no() {
        return $this->pihak2_ktp_no;
    }

    function getPihak2_npwp() {
        return $this->pihak2_npwp;
    }

    function getPihak2_suratkuasano() {
        return $this->pihak2_suratkuasano;
    }

    function getPihak2_suratkuasatgl() {
        return $this->pihak2_suratkuasatgl;
    }

    function getPihak2_suratkuasanama() {
        return $this->pihak2_suratkuasanama;
    }

    function getPihak2_suratkuasaalamat() {
        return $this->pihak2_suratkuasaalamat;
    }

    function getPihak2_suratkuasanik() {
        return $this->pihak2_suratkuasanik;
    }

    function getHargatermasuk_is_imb() {
        return $this->hargatermasuk_is_imb;
    }

    function getHargatermasuk_is_air() {
        return $this->hargatermasuk_is_air;
    }

    function getHargatermasuk_listrik() {
        return $this->hargatermasuk_listrik;
    }

    function getHargatermasuk_listrik_nilai() {
        return $this->hargatermasuk_listrik_nilai;
    }

    function getHargatermasuk_is_telpon() {
        return $this->hargatermasuk_is_telpon;
    }

    function getHargatdktermasuk_isppn() {
        return $this->hargatdktermasuk_isppn;
    }

    function getHargatdktermasuk_ppnbm() {
        return $this->hargatdktermasuk_ppnbm;
    }

    function getHargatdktermasuk_bphtb() {
        return $this->hargatdktermasuk_bphtb;
    }

    function getHargatdktermasuk_ppat() {
        return $this->hargatdktermasuk_ppat;
    }

    function getHargatdktermasuk_bbn() {
        return $this->hargatdktermasuk_bbn;
    }

    function getHargatdktermasuk_biayaadmin() {
        return $this->hargatdktermasuk_biayaadmin;
    }

    function getHargatdktermasuk_ipl() {
        return $this->hargatdktermasuk_ipl;
    }

    function getHargatdktermasuk_lainnya() {
        return $this->hargatdktermasuk_lainnya;
    }

    function getPihak1_parametersppjb_id() {
        return $this->pihak1_parametersppjb_id;
    }

    function getKet_carabayar() {
        return $this->ket_carabayar;
    }

    function setCompany_sertifikat_induk($company_sertifikat_induk) {
        $this->company_sertifikat_induk = $company_sertifikat_induk;
    }

    function setCetak($cetak) {
        $this->cetak = $cetak;
    }

    function setRangkap($rangkap) {
        $this->rangkap = $rangkap;
    }

    function setCompany_kecamatan($company_kecamatan) {
        $this->company_kecamatan = $company_kecamatan;
    }

    function setKembalicustomer_tanggal($kembalicustomer_tanggal) {
        $this->kembalicustomer_tanggal = $kembalicustomer_tanggal;
    }

    function setKembalicustomer_keterangan($kembalicustomer_keterangan) {
        $this->kembalicustomer_keterangan = $kembalicustomer_keterangan;
    }

    function setDatasppjb_warna($datasppjb_warna) {
        $this->datasppjb_warna = $datasppjb_warna;
    }

    function setDatasppjb_palinglambat($datasppjb_palinglambat) {
        $this->datasppjb_palinglambat = $datasppjb_palinglambat;
    }

    function setDatasppjb_biayalambat($datasppjb_biayalambat) {
        $this->datasppjb_biayalambat = $datasppjb_biayalambat;
    }

    function setDatasppjb_alasanbatal($datasppjb_alasanbatal) {
        $this->datasppjb_alasanbatal = $datasppjb_alasanbatal;
    }

    function setDatasppjb_biayabatal($datasppjb_biayabatal) {
        $this->datasppjb_biayabatal = $datasppjb_biayabatal;
    }

    function setDatasppjb_st_setelah($datasppjb_st_setelah) {
        $this->datasppjb_st_setelah = $datasppjb_st_setelah;
    }

    function setDatasppjb_serahfisik($datasppjb_serahfisik) {
        $this->datasppjb_serahfisik = $datasppjb_serahfisik;
    }

    function setDatasppjb_dendalambatkosong($datasppjb_dendalambatkosong) {
        $this->datasppjb_dendalambatkosong = $datasppjb_dendalambatkosong;
    }

    function setDatasppjb_deadlinebangunan($datasppjb_deadlinebangunan) {
        $this->datasppjb_deadlinebangunan = $datasppjb_deadlinebangunan;
    }

    function setDatasppjb_bayarbank($datasppjb_bayarbank) {
        $this->datasppjb_bayarbank = $datasppjb_bayarbank;
    }

    function setDatasppjb_bayarbank_cabang($datasppjb_bayarbank_cabang) {
        $this->datasppjb_bayarbank_cabang = $datasppjb_bayarbank_cabang;
    }

    function setDatasppjb_nomor_rekening($datasppjb_nomor_rekening) {
        $this->datasppjb_nomor_rekening = $datasppjb_nomor_rekening;
    }

    function setDatasppjb_atas_nama($datasppjb_atas_nama) {
        $this->datasppjb_atas_nama = $datasppjb_atas_nama;
    }

    function setPihak2_customer($pihak2_customer) {
        $this->pihak2_customer = $pihak2_customer;
    }

    function setPihak2_alamat($pihak2_alamat) {
        $this->pihak2_alamat = $pihak2_alamat;
    }

    function setPihak2_jabatan($pihak2_jabatan) {
        $this->pihak2_jabatan = $pihak2_jabatan;
    }

    function setPihak2_namapt($pihak2_namapt) {
        $this->pihak2_namapt = $pihak2_namapt;
    }

    function setPihak2_telp($pihak2_telp) {
        $this->pihak2_telp = $pihak2_telp;
    }

    function setPihak2_fax($pihak2_fax) {
        $this->pihak2_fax = $pihak2_fax;
    }

    function setPihak2_ktp_no($pihak2_ktp_no) {
        $this->pihak2_ktp_no = $pihak2_ktp_no;
    }

    function setPihak2_npwp($pihak2_npwp) {
        $this->pihak2_npwp = $pihak2_npwp;
    }

    function setPihak2_suratkuasano($pihak2_suratkuasano) {
        $this->pihak2_suratkuasano = $pihak2_suratkuasano;
    }

    function setPihak2_suratkuasatgl($pihak2_suratkuasatgl) {
        $this->pihak2_suratkuasatgl = $pihak2_suratkuasatgl;
    }

    function setPihak2_suratkuasanama($pihak2_suratkuasanama) {
        $this->pihak2_suratkuasanama = $pihak2_suratkuasanama;
    }

    function setPihak2_suratkuasaalamat($pihak2_suratkuasaalamat) {
        $this->pihak2_suratkuasaalamat = $pihak2_suratkuasaalamat;
    }

    function setPihak2_suratkuasanik($pihak2_suratkuasanik) {
        $this->pihak2_suratkuasanik = $pihak2_suratkuasanik;
    }

    function setHargatermasuk_is_imb($hargatermasuk_is_imb) {
        $this->hargatermasuk_is_imb = $hargatermasuk_is_imb;
    }

    function setHargatermasuk_is_air($hargatermasuk_is_air) {
        $this->hargatermasuk_is_air = $hargatermasuk_is_air;
    }

    function setHargatermasuk_listrik($hargatermasuk_listrik) {
        $this->hargatermasuk_listrik = $hargatermasuk_listrik;
    }

    function setHargatermasuk_listrik_nilai($hargatermasuk_listrik_nilai) {
        $this->hargatermasuk_listrik_nilai = $hargatermasuk_listrik_nilai;
    }

    function setHargatermasuk_is_telpon($hargatermasuk_is_telpon) {
        $this->hargatermasuk_is_telpon = $hargatermasuk_is_telpon;
    }

    function setHargatdktermasuk_isppn($hargatdktermasuk_isppn) {
        $this->hargatdktermasuk_isppn = $hargatdktermasuk_isppn;
    }

    function setHargatdktermasuk_ppnbm($hargatdktermasuk_ppnbm) {
        $this->hargatdktermasuk_ppnbm = $hargatdktermasuk_ppnbm;
    }

    function setHargatdktermasuk_bphtb($hargatdktermasuk_bphtb) {
        $this->hargatdktermasuk_bphtb = $hargatdktermasuk_bphtb;
    }

    function setHargatdktermasuk_ppat($hargatdktermasuk_ppat) {
        $this->hargatdktermasuk_ppat = $hargatdktermasuk_ppat;
    }

    function setHargatdktermasuk_bbn($hargatdktermasuk_bbn) {
        $this->hargatdktermasuk_bbn = $hargatdktermasuk_bbn;
    }

    function setHargatdktermasuk_biayaadmin($hargatdktermasuk_biayaadmin) {
        $this->hargatdktermasuk_biayaadmin = $hargatdktermasuk_biayaadmin;
    }

    function setHargatdktermasuk_ipl($hargatdktermasuk_ipl) {
        $this->hargatdktermasuk_ipl = $hargatdktermasuk_ipl;
    }

    function setHargatdktermasuk_lainnya($hargatdktermasuk_lainnya) {
        $this->hargatdktermasuk_lainnya = $hargatdktermasuk_lainnya;
    }

    function setPihak1_parametersppjb_id($pihak1_parametersppjb_id) {
        $this->pihak1_parametersppjb_id = $pihak1_parametersppjb_id;
    }

    function setKet_carabayar($ket_carabayar) {
        $this->ket_carabayar = $ket_carabayar;
    }

    function getKirimcustomer_tanggal() {
        return $this->kirimcustomer_tanggal;
    }

    function getKirimcustomer_keterangan() {
        return $this->kirimcustomer_keterangan;
    }

    function getTerimacustomer_tanggal() {
        return $this->terimacustomer_tanggal;
    }

    function getTerimacustomer_keterangan() {
        return $this->terimacustomer_keterangan;
    }

    function getDes1_ak_pihak1() {
        return $this->des1_ak_pihak1;
    }

    function getDes2_ak_pihak1() {
        return $this->des2_ak_pihak1;
    }

    function getSum_ak_pihak1() {
        return $this->sum_ak_pihak1;
    }

    function getDes1_ak_pihak2() {
        return $this->des1_ak_pihak2;
    }

    function getDes2_ak_pihak2() {
        return $this->des2_ak_pihak2;
    }

    function setKirimcustomer_tanggal($kirimcustomer_tanggal) {
        $this->kirimcustomer_tanggal = $kirimcustomer_tanggal;
    }

    function setKirimcustomer_keterangan($kirimcustomer_keterangan) {
        $this->kirimcustomer_keterangan = $kirimcustomer_keterangan;
    }

    function setTerimacustomer_tanggal($terimacustomer_tanggal) {
        $this->terimacustomer_tanggal = $terimacustomer_tanggal;
    }

    function setTerimacustomer_keterangan($terimacustomer_keterangan) {
        $this->terimacustomer_keterangan = $terimacustomer_keterangan;
    }

    function setDes1_ak_pihak1($des1_ak_pihak1) {
        $this->des1_ak_pihak1 = $des1_ak_pihak1;
    }

    function setDes2_ak_pihak1($des2_ak_pihak1) {
        $this->des2_ak_pihak1 = $des2_ak_pihak1;
    }

    function setSum_ak_pihak1($sum_ak_pihak1) {
        $this->sum_ak_pihak1 = $sum_ak_pihak1;
    }

    function setDes1_ak_pihak2($des1_ak_pihak2) {
        $this->des1_ak_pihak2 = $des1_ak_pihak2;
    }

    function setDes2_ak_pihak2($des2_ak_pihak2) {
        $this->des2_ak_pihak2 = $des2_ak_pihak2;
    }
    
    function getSum_ak_pihak2() {
        return $this->sum_ak_pihak2;
    }

    function setSum_ak_pihak2($sum_ak_pihak2) {
        $this->sum_ak_pihak2 = $sum_ak_pihak2;
    }

    
    function getProject() {
        return $this->project;
    }

    function getPt() {
        return $this->pt;
    }

    function setProject($project) {
        $this->project = $project;
    }

    function setPt($pt) {
        $this->pt = $pt;
    }

}
