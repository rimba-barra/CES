<?php

/**
 * Description of FORM ORDER IJB
 *
 * @author RIZALDI-MIS
 */
class Erems_Models_Backlog extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Kouti_Remora, Erems_Box_Models_Master_InterProjectPt {
    
    private $project;
    private $pt;
    private $saldoumgl;
    private $penerimaan;
    private $proyeksi;
    private $hpptanah;
    private $hppbangunan;
    private $hpptotal;
    private $potensialar;
    private $potensialreceivable;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "backlog_";
    }

    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;
        if (isset($x['backlog_saldo_um_gl'])) {
            $this->setSaldoumgl($x['backlog_saldo_um_gl']);
        }
        if (isset($x['backlog_penerimaan'])) {
            $this->setPenerimaan($x['backlog_penerimaan']);
        }
        if (isset($x['backlog_proyeksi'])) {
            $this->setProyeksi($x['backlog_proyeksi']);
        }
        if (isset($x['backlog_hpp_tanah'])) {
            $this->setHpptanah($x['backlog_hpp_tanah']);
        }
        if (isset($x['backlog_hpp_bangunan'])) {
            $this->setHppbangunan($x['backlog_hpp_bangunan']);
        }
        if (isset($x['backlog_hpp_total'])) {
            $this->setHpptotal($x['backlog_hpp_total']);
        }
        if (isset($x['backlog_potensial_ar'])) {
            $this->setPotensial($x['backlog_potensial_ar']);
        }
        if (isset($x['backlog_potensial_receivable'])) {
            $this->setPotensial($x['backlog_potensial_receivable']);
        }
        unset($x);
    }

    public function getArrayTable() {
        $x = array(
            'backlog_saldo_um_gl' => $this->getSaldoumgl(),
            'backlog_penerimaan' => $this->getPenerimaan(),
            'backlog_proyeksi' => $this->getProyeksi(),
            'backlog_hpp_tanah' => $this->getHpptanah(),
            'backlog_hpp_bangunan' => $this->getHppbangunan(),
            'backlog_hpp_total' => $this->getHpptotal(),
            'backlog_potensial_ar' => $this->getPotensialar(),
            'backlog_potensial_receivable' => $this->getPotensialreceivable()
        );

        return $x;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }
    public function getProject() {
        if (!$this->project) {
            $this->project = new Erems_Box_Models_Master_Project();
        }
        return $this->project;
    }

    public function getPt() {
        if (!$this->pt) {
            $this->pt = new Erems_Box_Models_Master_Pt();
        }
        return $this->pt;
    }

    public function setProject(\Erems_Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function setPt(\Erems_Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }
    function getSaldoumgl() {
        return $this->saldoumgl;
    }

    function getPenerimaan() {
        return $this->penerimaan;
    }

    function getProyeksi() {
        return $this->proyeksi;
    }

    function getHpptanah() {
        return $this->hpptanah;
    }

    function getHppbangunan() {
        return $this->hppbangunan;
    }

    function getHpptotal() {
        return $this->hpptotal;
    }

    function getPotensialar() {
        return $this->potensialar;
    }

    function getPotensialreceivable() {
        return $this->potensialreceivable;
    }

    function setSaldoumgl($saldoumgl) {
        $this->saldoumgl = $saldoumgl;
    }

    function setPenerimaan($penerimaan) {
        $this->penerimaan = $penerimaan;
    }

    function setProyeksi($proyeksi) {
        $this->proyeksi = $proyeksi;
    }

    function setHpptanah($hpptanah) {
        $this->hpptanah = $hpptanah;
    }

    function setHppbangunan($hppbangunan) {
        $this->hppbangunan = $hppbangunan;
    }

    function setHpptotal($hpptotal) {
        $this->hpptotal = $hpptotal;
    }

    function setPotensialar($potensialar) {
        $this->potensialar = $potensialar;
    }

    function setPotensialreceivable($potensialreceivable) {
        $this->potensialreceivable = $potensialreceivable;
    }


}
