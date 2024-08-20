<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Jenisdokumen
 *
 * @author MIS
 */
class Hrd_Models_Master_Mhasilkerja extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora {

    public $project_id;
    public $pt_id;
    private $index_no;
    private $hasilkerja_item;
    private $bobot;
    private $description;

    public function __construct($prefix = NULL) {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        parent::__construct();
        $this->embedPrefix = $prefix ? $prefix : "mhasilkerja_";
    }

    function setIndex_no($index_no) {
        $this->index_no = $index_no;
    }

    function setHasilkerja_item($hasilkerja_item) {
        $this->hasilkerja_item = $hasilkerja_item;
    }

    function setBobot($bobot) {
        $this->bobot = floatval($bobot);
    }

    function setDescription($description) {
        $this->description = $description;
    }

    public function getProjectId() {
        return $this->session->getCurrentProjectId();
    }

    public function getPtId() {
        return $this->session->getCurrentPtId();
    }

    function getIndex_no() {
        return $this->index_no;
    }

    function getHasilkerja_item() {
        return $this->hasilkerja_item;
    }

    function getBobot() {
        return $this->bobot;
    }

    function getDescription() {
        return $this->description;
    }

    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;
        if (isset($x['hasilkerja_item_id'])) {
            $this->setId($x['hasilkerja_item_id']);
        }
        if (isset($x['index_no'])) {
            $this->setIndex_no(intval($x['index_no']));
        }
        if (isset($x['hasilkerja_item'])) {
            $this->setHasilkerja_item($x['hasilkerja_item']);
        }
        if (isset($x['bobot'])) {
            $this->setBobot($x['bobot']);
        }
        if (isset($x['description'])) {
            $this->setDescription($x['description']);
        }
		//echo 'test'; var_dump($x); exit;
        unset($x);
    }

    public function getArrayTable() {
        $x = array(
            'hasilkerja_item_id' => $this->getId(),
            'index_no' => intval($this->getIndex_no()),
            'hasilkerja_item' =>$this->getHasilkerja_item(),
            'bobot' =>  floatval($this->getBobot()),
            'description' => $this->getDescription()
        );
        return $x;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }

}

?>
