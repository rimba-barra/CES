<?php

class Hrd_Models_Master_Packagemanagement_Packagemanagementdetail extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora, Box_Delien_DelimiterCandidate, Box_Arried {

    public $pmdocument_id;
    public $jenisdocument_id;
    public $bobot;
    public $deleted;

    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "packagedocument_";
        $this->detail = array();
    }

    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;
        $this->setId(isset($x['pmdocument_detail_id']) ? $x['pmdocument_detail_id'] : 0);
        $this->pmdocument_id = isset($x['pmdocument_id']) ? $x['pmdocument_id'] : 0;
        $this->jenisdocument_id = isset($x['jenisdocument_id']) ? $x['jenisdocument_id'] : 0;
        $this->bobot = isset($x['bobot']) ? $x['bobot'] : 0;
        $this->deleted = isset($x['deleted']) ? $x['deleted'] : 0;
        unset($x);
    }

    public function getArrayTable() {
        $x = array(
            'pmdocument_detail_id' => $this->getId(),
            'jenisdocument_id' => $this->jenisdocument_id,
            'bobot' => floatval($this->bobot),
            'deleted' => $this->deleted
        );

        return $x;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }

    public function addDetail($param) {
        $this->detail[] = $param;
    }

    public function getDCArray() {
        return $this->detail;
    }

    public function getDCResult() {
        return $this->DCResult;
    }

    public function setDCArray($delimiteredArray) {
        $this->DCResult = $delimiteredArray;
    }

    public function getDetail($index = -1) {
        if ($index >= 0) {
            return $this->detail[$index];
        } else {
            return $this->detail;
        }
    }

    public function getArray() {
        return $this->getArrayTable();
    }

    public function getDatefields() {
        return array();
    }

}

?>