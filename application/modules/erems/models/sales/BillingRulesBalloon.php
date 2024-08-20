<?php

/**
 * Description of BillingRulesTran
 *
 * @author MIS
 */
class Erems_Models_Sales_BillingRulesBalloon extends  Erems_Box_Models_ObjectEmbedData{
    
    private $term_angsuran;
    private $persen;
    private $schedule_type_balloon;
    private $periode_angsuran;
    private $type_periode_angsuran;
    private $billingrules_id;

    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "billingrulesballoon_";
    }
   

    function getTerm_angsuran() {
        return $this->term_angsuran;
    }

    function getPersen() {
        return $this->persen;
    }

    function getSchedule_type_balloon() {
        return $this->schedule_type_balloon;
    }

    function getPeriode_angsuran() {
        return $this->periode_angsuran;
    }

    function getType_periode_angsuran() {
        return $this->type_periode_angsuran;
    }

    function getBillingrules_id() {
        return $this->billingrules_id;
    }

    function setTerm_angsuran($term_angsuran) {
        $this->term_angsuran = $term_angsuran;
    }

    function setPersen($persen) {
        $this->persen = $persen;
    }

    function setSchedule_type_balloon($schedule_type_balloon) {
        $this->schedule_type_balloon = $schedule_type_balloon;
    }

    function setPeriode_angsuran($periode_angsuran) {
        $this->periode_angsuran = $periode_angsuran;
    }

    function setType_periode_angsuran($type_periode_angsuran) {
        $this->type_periode_angsuran = $type_periode_angsuran;
    }

    function setBillingrules_id($billingrules_id) {
        $this->billingrules_id = $billingrules_id;
    }
   
    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;

        if (isset($x['term_angsuran'])) {
            $this->setTerm_angsuran($x['term_angsuran']);
        }
        if (isset($x['persen'])) {
            $this->setPersen($x['persen']);
        }
        if (isset($x['schedule_type_balloon'])) {
            $this->setSchedule_type_balloon($x['schedule_type_balloon']);
        }
        if (isset($x['periode_angsuran'])) {
            $this->setPeriode_angsuran($x['periode_angsuran']);
        }

        if (isset($x['type_periode_angsuran'])) {
            $this->setType_periode_angsuran($x['type_periode_angsuran']);
        }
        if (isset($x['billingrules_id'])) {
            $this->setBillingrules_id($x['billingrules_id']);
        }

        unset($x);
    }

    public function getArrayTable() {
        $x = array(
            'term_angsuran'=>$this->getTerm_angsuran(),
            'persen'=>$this->getPersen(),
            'schedule_type_balloon'=>$this->getSchedule_type_balloon(),
            'periode_angsuran'=>$this->getPeriode_angsuran(),
            'type_periode_angsuran'=>$this->getType_periode_angsuran(),
            'periode_uangmuka'=>$this->getPeriode_angsuran(),
            'billingrules_id'=>$this->getBillingrules_id()
        );

        return $x;
    }
    
    public function grouped() {
         return array();
    }
    
}

?>
