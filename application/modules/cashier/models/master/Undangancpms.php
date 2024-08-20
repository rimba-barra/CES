<?php

/**
 * Description of Unit
 *
 * @author MIS
 */
class Cashier_Models_Master_Undangancpms extends Cashier_Box_Models_ObjectEmbedData {

    private $projectId;
    private $ptId;
    private $idundangan;
    private $noundangan;
    private $amount;
    private $namarekanan;
    private $masterundanganid;

    public function __construct($embedPrefix = NULL) {
        parent::__construct();
        //$this->embedPrefix = 'unit_';
        $this->embedPrefix = $embedPrefix == NULL ? 'undangancpms_' : $embedPrefix;
    }

    public function getProjectId() {
        return $this->projectId;
    }

    public function setProjectId($projectId) {
        $this->projectId = $projectId;
    }

    public function getPtId() {
        return $this->ptId;
    }

    public function setPtId($ptId) {
        $this->ptId = $ptId;
    }

    function getMasterundanganid() {
        return $this->masterundanganid;
    }

    function setMasterundanganid($masterundanganid) {
        $this->masterundanganid = $masterundanganid;
    }

        function getIdundangan() {
        return $this->idundangan;
    }

    function getNoundangan() {
        return $this->noundangan;
    }

    function getAmount() {
        return $this->amount;
    }

    function getNamarekanan() {
        return $this->namarekanan;
    }

    function setIdundangan($idundangan) {
        $this->idundangan = $idundangan;
    }

    function setNoundangan($noundangan) {
        $this->noundangan = $noundangan;
    }

    function setAmount($amount) {
        $this->amount = $amount;
    }

    function setNamarekanan($namarekanan) {
        $this->namarekanan = $namarekanan;
    }

        public function setArrayTable($dataArray = NULL) {
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;
        if (isset($x['master_undangan_id'])) {
            $this->setMasterundanganid($x['master_undangan_id']);
        }
        if (isset($x['idsuratundangan'])) {
            $this->setIdundangan($x['idsuratundangan']);
        }
        if (isset($x['project_id'])) {
            $this->setProjectId($x['project_id']);
        }
        if (isset($x['pt_id'])) {
            $this->setPtId($x['pt_id']);
        }
        if (isset($x['no_surat_undangan'])) {
            $this->setNoundangan($x['no_surat_undangan']);
        }
        if (isset($x['nama_rekanan'])) {
            $this->setNamarekanan($x['nama_rekanan']);
        }
        if (isset($x['amount'])) {
            $this->setAmount($x['amount']);
        }
        unset($x);
    }

    public function getArrayTable() {
        $x = array();
        $x['master_undangan_id'] = $this->getMasterundanganid();
        $x['idsuratundangan'] = $this->getIdundangan();
        $x['project_id'] = $this->getProjectId();
        $x['pt_id'] = $this->getPtId();
        $x['no_surat_undangan'] = $this->getNoundangan();
        $x['nama_rekanan'] = $this->getNamarekanan();
        $x['amount'] = $this->getAmount();
        return $x;
    }

}

?>
