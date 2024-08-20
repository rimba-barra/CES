<?php

/**
 * Description of ClusterTran
 *
 * @author MIS
 */
class Cashier_Models_Transaction_ChequeDetail extends Cashier_Box_Models_ObjectEmbedData implements Cashier_Box_Kouti_Remora, Cashier_Box_Models_Master_InterProjectPt, Cashier_Box_Delien_DelimiterCandidate {

    private $cheque;
    private $kasbank;

    public function __construct() {
        parent::__construct();
        $this->project = new Cashier_Box_Models_Master_Project();
        $this->pt = new Cashier_Box_Models_Master_Pt();
        $this->embedPrefix = 'chequedetail_';
        $this->cheque = new Cashier_Models_Master_Cheque();
        $this->kasbank = new Cashier_Models_Master_Kasbank();
    }
    
    function getCheque() {
        if(!$this->cheque) {
            $this->cheque = new Cashier_Models_Master_Cheque();
        }
        return $this->cheque;
    }

    function getKasbank() {
        if(!$this->kasbank) {
            $this->kasbank = new Cashier_Models_Master_Kasbank();
        }
        return $this->kasbank;
    }

    function setCheque(Cashier_Models_Master_Cheque $cheque) {
        $this->cheque = $cheque;
    }

    function setKasbank(Cashier_Models_Master_Kasbank $kasbank) {
        $this->kasbank = $kasbank;
    }

        
    public function setArrayTable($dataArray = NULL) {
        parent::setArrayTable($dataArray);
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;


        if (isset($x['chequedetail_id'])) {
            $this->setId($x['chequedetail_id']);
        }
        if (isset($x['kasbank_kasbank_id'])) {
            $this->getKasbank()->setId($x['kasbank_kasbank_id']);
        }
        if (isset($x['cheque_cheque_id'])) {
            $this->getCheque()->setId($x['cheque_cheque_id']);
        }


        unset($x);
    }

    public function getArrayTable() {


        $x = array(
            "chequedetail_id" => $this->getId(),
            "kasbank_kasbank_id" => $this->getKasbank()->getId(),
            "cheque_cheque_id" => $this->getCheque()->getId(),
            
        );

        return $x;
    }

    public function getProject() {
        return $this->project;
    }

    public function setProject(Cashier_Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function setProjectPt(Cashier_Box_Models_Master_Project $project, Cashier_Box_Models_Master_Pt $pt) {
        $this->project = $project;
        $this->pt = $pt;
    }

    public function getPt() {
        return $this->pt;
    }

    public function setPt(Cashier_Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getProject(), $this->getPt());
    }

    protected function getDatefields() {
        $x = parent::getDatefields();
        return array_merge($x, array("Modion", "Addon","issued_date"));
    }

    public function getDCArray() {
        return $this->detail;
    }

    public function getDCResult() {
        return $this->dcResult;
    }

    public function setDCArray($delimiteredArray) {
        $this->dcResult = $delimiteredArray;
    }

}

?>
