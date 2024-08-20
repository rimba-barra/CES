<?php

/**
 * Description of Change
 *
 * @author tommytoban
 */
abstract class Erems_Models_Sales_Change extends Erems_Box_Models_ObjectEmbedData{
    protected $note;
    protected $date;
    protected $purchaseletter;
    protected $reason;
    protected $revision;
    protected $adendumNomor;
    protected $persetujuanNama;
    protected $persetujuanRelasi;


    public function __construct() {
        parent::__construct();
        $this->purchaseletter = new Erems_Models_Purchaseletter_PurchaseLetter();
        $this->revision = new Erems_Models_Sales_Revision();
    }
    
    
    public function getNote() {
        return $this->note;
    }

    public function getDate() {
        return $this->date;
    }

    public function getPurchaseletter() {
        if(!$this->purchaseletter){
            $this->purchaseletter = new Erems_Models_Purchaseletter_PurchaseLetter();
        }
        return $this->purchaseletter;
    }

    public function getReason() {
        return $this->reason;
    }

    public function setNote($note) {
        $this->note = $note;
    }

    public function setDate($date) {
        $this->date = $date;
    }

    public function setPurchaseletter(Erems_Models_Purchaseletter_PurchaseLetter $purchaseletter) {
        $this->purchaseletter = $purchaseletter;
    }

    public function setReason(Erems_Models_Sales_Reason $reason) {
        $this->reason = $reason;
    }
    
    public function getRevision() {
        if(!$this->revision){
            $this->revision = new Erems_Models_Sales_Revision();
        }
        return $this->revision;
    }

    public function setRevision(Erems_Models_Sales_Revision $revision) {
        $this->revision = $revision;
    }
    
    function getAdendumNomor() {
        return $this->adendumNomor;
    }

    function getPersetujuanNama() {
        return $this->persetujuanNama;
    }

    function getPersetujuanRelasi() {
        return $this->persetujuanRelasi;
    }

    function setAdendumNomor($adendumNomor) {
        $this->adendumNomor = $adendumNomor;
    }

    function setPersetujuanNama($persetujuanNama) {
        $this->persetujuanNama = $persetujuanNama;
    }

    function setPersetujuanRelasi($persetujuanRelasi) {
        $this->persetujuanRelasi = $persetujuanRelasi;
    }
    
}
