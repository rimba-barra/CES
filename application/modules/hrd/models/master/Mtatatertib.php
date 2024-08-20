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
class Hrd_Models_Master_Mtatatertib extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora {

    public $project_id;
    public $pt_id;
    private $index_no;
    private $disiplin_item;
    private $bobot;
    private $rate1;
    private $rate2;
    private $rate3;
    private $rate4;
    private $rate5;

    public function __construct($prefix = NULL) {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        parent::__construct();
        $this->embedPrefix = $prefix ? $prefix : "mtatatertib_";
    }

    function setIndex_no($index_no) {
        $this->index_no = $index_no;
    }

    function setDisiplin_item($disiplin_item) {
        $this->disiplin_item = $disiplin_item;
    }

    function setBobot($bobot) {
        $this->bobot = floatval($bobot);
    }

    function setRate1($rate1) {
        $this->rate1 = $rate1;
    }

    function setRate2($rate2) {
        $this->rate2 = $rate2;
    }

    function setRate3($rate3) {
        $this->rate3 = $rate3;
    }

    function setRate4($rate4) {
        $this->rate4 = $rate4;
    }

    function setRate5($rate5) {
        $this->rate5 = $rate5;
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

    function getDisiplin_item() {
        return $this->disiplin_item;
    }

    function getBobot() {
        return $this->bobot;
    }

    function getRate1() {
        return $this->rate1;
    }

    function getRate2() {
        return $this->rate2;
    }

    function getRate3() {
        return $this->rate3;
    }

    function getRate4() {
        return $this->rate4;
    }

    function getRate5() {
        return $this->rate5;
    }

    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;
        if (isset($x['tatatertib_id'])) {
            $this->setId($x['tatatertib_id']);
        }
        if (isset($x['index_no'])) {
            $this->setIndex_no(intval($x['index_no']));
        }
        if (isset($x['disiplin_item'])) {
            $this->setDisiplin_item($x['disiplin_item']);
        }
        if (isset($x['bobot'])) {
            $this->setBobot($x['bobot']);
        }
        if (isset($x['rate_1'])) {
            $this->setRate1($x['rate_1']);
        }
        if (isset($x['rate_2'])) {
            $this->setRate2($x['rate_2']);
        }
        if (isset($x['rate_3'])) {
            $this->setRate3($x['rate_3']);
        }
        if (isset($x['rate_4'])) {
            $this->setRate4($x['rate_4']);
        }
        if (isset($x['rate_5'])) {
            $this->setRate5($x['rate_5']);
        }
        unset($x);
    }

    public function getArrayTable() {
        $x = array(
            'tatatertib_id' => $this->getId(),
            'index_no' => intval($this->getIndex_no()),
            'disiplin_item' =>$this->getDisiplin_item(),
            'bobot' =>  floatval($this->getBobot()),
            'rate_1' => $this->getRate1(),
            'rate_2' => $this->getRate2(),
            'rate_3' => $this->getRate3(),
            'rate_4' => $this->getRate4(),
            'rate_5' => $this->getRate5(),
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
