<?php

/**
 * Description of FORM ORDER IJB
 *
 * @author RIZALDI-MIS
 */
class Erems_Models_Serahterima_Serahterima extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Kouti_Remora, Erems_Box_Models_Master_InterProjectPt {

    private $project;
    private $pt;
    private $purchaseletter;
    private $serahterimaDate;
    private $rencanaSerahTerimaDate;
    private $addon;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "serahterima_";
    }

    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;
        if (isset($x['serahterima_id'])) {
            $this->setId($x['serahterima_id']);
        }
        if (isset($x['purchaseletter_purchaseletter_id'])) {
            $this->getPurchaseletter()->setId($x['purchaseletter_purchaseletter_id']);
        }
        if (isset($x['serahterima_date'])) {
            $this->setSerahterimaDate($x['serahterima_date']);
        }
        if (isset($x['rencana_serahterima_date'])) {
            $this->setRencanaSerahTerimaDate($x['rencana_serahterima_date']);
        }
        if (isset($x['addon'])) {
            $this->setAddon($x['addon']);
        }
        unset($x);
    }

    public function getArrayTable() {
        $x = array(
            'serahterima_id' => $this->getId(),
            'purchaseletter_purchaseletter_id' => $this->getPurchaseletter()->getId(),
            'serahterima_date' => $this->getSerahterimaDate(),
            'rencana_serahterima_date' => $this->getRencanaSerahTerimaDate(),
            'addon' => $this->getAddon()
        );

        return $x;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }
    function getAddon() {
        return $this->addon;
    }

    function setAddon($addon) {
        $this->addon = $addon;
    }

        function getRencanaSerahTerimaDate() {
        return $this->rencanaSerahTerimaDate;
    }

    function setRencanaSerahTerimaDate($rencanaSerahTerimaDate) {
        $this->rencanaSerahTerimaDate = $rencanaSerahTerimaDate;
    }

        function getPurchaseletter() {
        if (!$this->purchaseletter) {
            $this->purchaseletter = new Erems_Models_Purchaseletter_PurchaseLetter();
        }
        return $this->purchaseletter;
    }
    
    function setPurchaseletter(Erems_Models_Purchaseletter_PurchaseLetter $purchaseletter) {
        $this->purchaseletter = $purchaseletter;
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

    function getSerahterimaDate() {
        return $this->serahterimaDate;
    }

    function setSerahterimaDate($serahterimaDate) {
        $this->serahterimaDate = $serahterimaDate;
    }


}
