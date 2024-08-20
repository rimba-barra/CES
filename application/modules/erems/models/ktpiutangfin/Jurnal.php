<?php

/**
 * Description of Jurnal
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Ktpiutangfin_Jurnal extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Kouti_Remora {
    private $rowNumber;
    private $kkode_proyek;
    private $kkode_pt;
    private $kno_vch;
    private $kkode_acc;
    private $kno_urut;
    private $kno_urut_sub;
    private $ksub_kode_sub;
    private $ktgl_vch;
    private $kket;
    private $kmutasi;
    private $ksts_mutasi;

    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "gljurnal_";
    }

    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;
        if (isset($x["kode_proyek"])) {
            $this->setKkode_proyek($x["kode_proyek"]);
        }
        if (isset($x["kode_pt"])) {
            $this->setKkode_pt($x["kode_pt"]);
        }
        if (isset($x["no_vch"])) {
            $this->setKno_vch($x["no_vch"]);
        }
        if (isset($x["kode_acc"])) {
            $this->setKkode_acc($x["kode_acc"]);
        }
        if (isset($x["no_urut"])) {
            $this->setKno_urut($x["no_urut"]);
        }
        if (isset($x["no_urut_sub"])) {
            $this->setKno_urut_sub($x["no_urut_sub"]);
        }
        if (isset($x["sub_kode_sub"])) {
            $this->setKsub_kode_sub($x["sub_kode_sub"]);
        }
        if (isset($x["tgl_vch"])) {
            $this->setKtgl_vch($x["tgl_vch"]);
        }
        if (isset($x["ket"])) {
            $this->setKket($x["ket"]);
        }
        if (isset($x["mutasi"])) {
            $this->setKmutasi($x["mutasi"]);
        }
        if (isset($x["sts_mutasi"])) {
            $this->setKsts_mutasi($x["sts_mutasi"]);
        }
        if (isset($x["rowNumber"])) {
            $this->setRowNumber($x["rowNumber"]);
        }
    }

    public function getArrayTable() {
        $x = array(
            "kode_proyek" => $this->getKkode_proyek(),
            "kode_pt" => $this->getKkode_pt(),
            "no_vch" => $this->getKno_vch(),
            "kode_acc" => $this->getKkode_acc(),
            "no_urut" => $this->getKno_urut(),
            "no_urut_sub" => $this->getKno_urut_sub(),
            "tgl_vch" => $this->getKtgl_vch(),
            "ket" => $this->getKket(),
            "mutasi" => $this->getKmutasi(),
            "sts_mutasi" => $this->getKsts_mutasi(),
            "rowNumber" => $this->getRowNumber()
        );

        return $x;
    }

    function getKkode_proyek() {
        return $this->kkode_proyek;
    }

    function getKkode_pt() {
        return $this->kkode_pt;
    }

    function getKno_vch() {
        return $this->kno_vch;
    }

    function getKkode_acc() {
        return $this->kkode_acc;
    }

    function getKno_urut() {
        return $this->kno_urut;
    }

    function getKno_urut_sub() {
        return $this->kno_urut_sub;
    }

    function getKsub_kode_sub() {
        return $this->ksub_kode_sub;
    }

    function getKtgl_vch() {
        return $this->ktgl_vch;
    }

    function getKket() {
        return $this->kket;
    }

    function getKmutasi() {
        return $this->kmutasi;
    }

    function getKsts_mutasi() {
        return $this->ksts_mutasi;
    }

    function setKkode_proyek($kkode_proyek) {
        $this->kkode_proyek = $kkode_proyek;
    }

    function setKkode_pt($kkode_pt) {
        $this->kkode_pt = $kkode_pt;
    }

    function setKno_vch($kno_vch) {
        $this->kno_vch = $kno_vch;
    }

    function setKkode_acc($kkode_acc) {
        $this->kkode_acc = $kkode_acc;
    }

    function setKno_urut($kno_urut) {
        $this->kno_urut = $kno_urut;
    }

    function setKno_urut_sub($kno_urut_sub) {
        $this->kno_urut_sub = $kno_urut_sub;
    }

    function setKsub_kode_sub($ksub_kode_sub) {
        $this->ksub_kode_sub = $ksub_kode_sub;
    }

    function setKtgl_vch($ktgl_vch) {
        $this->ktgl_vch = $ktgl_vch;
    }

    function setKket($kket) {
        $this->kket = $kket;
    }

    function setKmutasi($kmutasi) {
        $this->kmutasi = $kmutasi;
    }

    function setKsts_mutasi($ksts_mutasi) {
        $this->ksts_mutasi = $ksts_mutasi;
    }
    
    function getRowNumber() {
        return $this->rowNumber;
    }

    function setRowNumber($rowNumber) {
        $this->rowNumber = $rowNumber;
    }

    
    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }
    
    protected function getDatefields() {
        return array("ktgl_vch");
    }


}
