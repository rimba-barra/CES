<?php

/**
 * Description of ClusterTran
 *
 * @author MIS
 */
class Cashier_Models_Master_Cashflowtype extends Cashier_Box_Models_ObjectEmbedData implements Cashier_Box_Kouti_Remora, Cashier_Box_Models_Master_InterProjectPt, Cashier_Box_Delien_DelimiterCandidate {

    private $cashflowtype;
    private $description;
    private $grouptype;
    private $dataflow;

    public function __construct() {
        parent::__construct();
        $this->project = new Cashier_Box_Models_Master_Project();
        $this->pt = new Cashier_Box_Models_Master_Pt();
        $this->grouptype = new Cashier_Models_Master_Grouptype();
        $this->embedPrefix = 'cashflowtype_';
    }

    function getCashflowtype() {
        return $this->cashflowtype;
    }

    function getDescription() {
        return $this->description;
    }

    function getGrouptype() {
        if (!$this->grouptype) {
            $this->grouptype = new Cashier_Models_Master_Grouptype();
        }
        return $this->grouptype;
    }

    function setCashflowtype($cashflowtype) {
        $this->cashflowtype = $cashflowtype;
    }

    function setDescription($description) {
        $this->description = $description;
    }

    function setGrouptype(Cashier_Models_Master_Grouptype $grouptype) {
        $this->grouptype = $grouptype;
    }



    public function setArrayTable($dataArray = NULL) {
        parent::setArrayTable($dataArray);
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;


        if (isset($x['cashflowtype_id'])) {
            $this->setId($x['cashflowtype_id']);
        }
        if (isset($x['cashflowtype'])) {
            $this->setCashflowtype($x['cashflowtype']);
        }

        if (isset($x['description'])) {
            $this->setDescription($x['description']);
        }
      
        if (isset($x['grouptype_id'])) {
            $this->getGrouptype->setId($x['grouptype_id']);
        }
      
        if (isset($x['dataflow'])) {
            $this->setDataflow($x['dataflow']);
        }

        unset($x);
    }

    public function getArrayTable() {


        $x = array(
            "cashflowtype_id" => $this->getId(),
            "cashflowtype" => $this->getCashflowtype(),
            "description" => $this->getDescription(),
            "grouptype_id" => $this->getGrouptype()->getId(),
            "dataflow" => $this->getDataflow()
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
        return array_merge($x, array("Modion", "Addon"));
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


    /**
     * Get the value of dataflow
     */ 
    public function getDataflow()
    {
        return $this->dataflow;
    }

    /**
     * Set the value of dataflow
     *
     * @return  self
     */ 
    public function setDataflow($dataflow)
    {
        $this->dataflow = $dataflow;

        return $this;
    }
}

?>
