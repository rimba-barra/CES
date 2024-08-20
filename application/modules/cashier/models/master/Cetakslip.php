<?php

/**
 * Description of ClusterTran
 *
 * @author MIS
 */
class Cashier_Models_Master_Cetakslip extends Cashier_Box_Models_ObjectEmbedData {

    private $slip_id;
    private $kasbank_id;
    private $norek_customer;
    private $nama_customer;
    private $alamat_customer;
    private $nama_penyetor;
    private $norek_penyetor;
    private $alamat_penyetor;
    private $telp_penyetor;
    private $amount;
    private $terbilang;
    private $mata_uang;
    private $nama_bank;
    private $nama_yang_dapat_dihubungi;

    public function __construct() {
        parent::__construct();
        $this->embedPrefix = 'slipsetoran_';
    }
    function getSlip_id() {
        return $this->slip_id;
    }

    function setSlip_id($slip_id) {
        $this->slip_id = $slip_id;
    }

        
    function getKasbank_id() {
        return $this->kasbank_id;
    }

    function getNorek_customer() {
        return $this->norek_customer;
    }

    function getNama_customer() {
        return $this->nama_customer;
    }

    function getAlamat_customer() {
        return $this->alamat_customer;
    }

    function getNama_penyetor() {
        return $this->nama_penyetor;
    }

    function getNorek_penyetor() {
        return $this->norek_penyetor;
    }

    function getAlamat_penyetor() {
        return $this->alamat_penyetor;
    }

    function getTelp_penyetor() {
        return $this->telp_penyetor;
    }

    function getAmount() {
        return $this->amount;
    }

    function getTerbilang() {
        return $this->terbilang;
    }

    function getMata_uang() {
        return $this->mata_uang;
    }

    function getNama_bank() {
        return $this->nama_bank;
    }

    function getNama_yang_dapat_dihubungi() {
        return $this->nama_yang_dapat_dihubungi;
    }

    function setKasbank_id($kasbank_id) {
        $this->kasbank_id = $kasbank_id;
    }

    function setNorek_customer($norek_customer) {
        $this->norek_customer = $norek_customer;
    }

    function setNama_customer($nama_customer) {
        $this->nama_customer = $nama_customer;
    }

    function setAlamat_customer($alamat_customer) {
        $this->alamat_customer = $alamat_customer;
    }

    function setNama_penyetor($nama_penyetor) {
        $this->nama_penyetor = $nama_penyetor;
    }

    function setNorek_penyetor($norek_penyetor) {
        $this->norek_penyetor = $norek_penyetor;
    }

    function setAlamat_penyetor($alamat_penyetor) {
        $this->alamat_penyetor = $alamat_penyetor;
    }

    function setTelp_penyetor($telp_penyetor) {
        $this->telp_penyetor = $telp_penyetor;
    }

    function setAmount($amount) {
        $this->amount = $amount;
    }

    function setTerbilang($terbilang) {
        $this->terbilang = $terbilang;
    }

    function setMata_uang($mata_uang) {
        $this->mata_uang = $mata_uang;
    }

    function setNama_bank($nama_bank) {
        $this->nama_bank = $nama_bank;
    }

    function setNama_yang_dapat_dihubungi($nama_yang_dapat_dihubungi) {
        $this->nama_yang_dapat_dihubungi = $nama_yang_dapat_dihubungi;
    }

        
        public function setArrayTable($dataArray = NULL) {
        parent::setArrayTable($dataArray);
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;


        if (isset($x['slip_id'])) {
            $this->setSlip_id($x['slip_id']);
        }
        if (isset($x['kasbank_id'])) {
            $this->setKasbank_id($x['kasbank_id']);
        }
        if (isset($x['norek_customer'])) { $this->setNorek_customer($x['norek_customer']); }
        if (isset($x['nama_customer'])) { $this->setNama_customer($x['nama_customer']); }
        if (isset($x['alamat_customer'])) { $this->setAlamat_customer($x['alamat_customer']); }
        if (isset($x['nama_penyetor'])) { $this->setNama_penyetor($x['nama_penyetor']); }
        if (isset($x['norek_penyetor'])) { $this->setNorek_penyetor($x['norek_penyetor']); }
        if (isset($x['alamat_penyetor'])) { $this->setAlamat_penyetor($x['alamat_penyetor']); }
        if (isset($x['telp_penyetor'])) { $this->setTelp_penyetor($x['telp_penyetor']); }
        if (isset($x['amount'])) { $this->setAmount($x['amount']); }
        if (isset($x['terbilang'])) { $this->setTerbilang($x['terbilang']); }
        if (isset($x['mata_uang'])) { $this->setMata_uang($x['mata_uang']); }
        if (isset($x['nama_bank'])) { $this->setNama_bank($x['nama_bank']); }
        if (isset($x['nama_yang_dapat_dihubungi'])) { $this->setNama_yang_dapat_dihubungi($x['nama_yang_dapat_dihubungi']); }

        unset($x);
    }

    public function getArrayTable() {


        $x = array(
            "slip_id" => $this->getSlip_id(),
            'kasbank_id' => $this->getKasbank_id(),
            'norek_customer' => $this->getNorek_customer(),
            'nama_customer' => $this->getNama_customer(),
            'alamat_customer' => $this->getAlamat_customer(),
            'nama_penyetor' => $this->getNama_penyetor(),
            'norek_penyetor' => $this->getNorek_penyetor(),
            'alamat_penyetor' => $this->getAlamat_penyetor(),
            'telp_penyetor' => $this->getTelp_penyetor(),
            'amount' => $this->getAmount(),
            'terbilang' => $this->getTerbilang(),
            'mata_uang' => $this->getMata_uang(),
            'nama_bank' => $this->getNama_bank(),
            'nama_yang_dapat_dihubungi' => $this->getNama_yang_dapat_dihubungi(),
        );

        return $x;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }


    public function getDCArray() {
        return $this->detail;
    }

    public function getDCResult() {
        return $this->dcResult;
    }

    public function setDCArray($delimiteredArray) {
        $this->dcResult = $delimiteredArray;
    }

}

?>
