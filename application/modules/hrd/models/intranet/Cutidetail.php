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
class Hrd_Models_Intranet_Cutidetail extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora {

    private $start_date;
    private $end_date;
    private $total_hari;
    private $cutidetail_id;
    private $cuti_id;

    public function __construct($prefix = NULL) {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        parent::__construct();
        $this->embedPrefix = $prefix ? $prefix : "intranetdetail_";
    }

//=================START GETTER===========================
    function getStart_date() {
        return $this->start_date;
    }

    function getEnd_date() {
        return $this->end_date;
    }

    function getTotal_hari() {
        return $this->total_hari;
    }

    function getCutidetail_id() {
        return $this->cutidetail_id;
    }

    function getCuti_id() {
        return $this->cuti_id;
    }

//=================END GETTER===========================
//=================START SETTER===========================

    function setStart_date($start_date) {
        $this->start_date = $start_date;
    }

    function setEnd_date($end_date) {
        $this->end_date = $end_date;
    }

    function setTotal_hari($total) {
        $this->total_hari = $total;
    }

    function setCutidetail_id($cutidetail_id) {
        $this->cutidetail_id = $cutidetail_id;
    }

    function setCuti_id($cuti_id) {
        $this->cuti_id = $cuti_id;
    }

//=================END SETTER===========================
    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;
        if (isset($x['cutidetail_id'])) {
            $this->setCutidetail_id($x['cutidetail_id']);
        }
        if (isset($x['cuti_id'])) {
            $this->setCuti_id($x['cuti_id']);
        }
        if (isset($x['start_date'])) {
            $this->setStart_date($x['start_date']);
        }
        if (isset($x['end_date'])) {
            $this->setEnd_date($x['end_date']);
        }
        if (isset($x['total'])) {
            $this->setTotal_hari($x['total']);
        }
        unset($x);
    }

    public function getArrayTable() {
        $x = array(
            'cutidetail_id' => intval($this->getCutidetail_id()),
            'cuti_id' => intval($this->getCuti_id()),
            'start_date' => date('Y-m-d', strtotime($this->getStart_date())),
            'end_date' => date('Y-m-d', strtotime($this->getEnd_date())),
            'total_hari' => floatval($this->getTotal_hari()),
        );
        return $x;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }

    public function getDatefields() {
        return array('start_date', 'end_date');
    }

}

?>
