<?php

/**
 * Description of ClusterTran
 *
 * @author MIS
 */
class Cashier_Models_Master_ChequeHistory extends Cashier_Box_Models_ObjectEmbedData implements Cashier_Box_Kouti_Remora, Cashier_Box_Models_Master_InterProjectPt, Cashier_Box_Delien_DelimiterCandidate {

    private $issued_date;
    private $status;


    public function __construct() {
        parent::__construct();
        $this->project = new Cashier_Box_Models_Master_Project();
        $this->pt = new Cashier_Box_Models_Master_Pt();
        $this->embedPrefix = 'chequehistory_';
    }
    function getIssued_date() {
        return $this->issued_date;
    }

    function getStatus() {
        return $this->status;
    }

    function setIssued_date($issued_date) {
        $this->issued_date = $issued_date;
    }

    function setStatus($status) {
        $this->status = $status;
    }

      
    public function setArrayTable($dataArray = NULL) {
        parent::setArrayTable($dataArray);
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;


        if (isset($x['chequehistory_id'])) {
            $this->setId($x['chequehistory_id']);
        }
    
        if (isset($x['date'])) {
            $this->setIssued_date($x['date']);
        }
        if (isset($x['status'])) {
            $this->setStatus($x['status']);
        }
      


        unset($x);
    }

    public function getArrayTable() {


        $x = array(
            "chequehistory_id" => $this->getId(),
            "date" => $this->getIssued_date(),
            "status" => $this->getStatus()
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
