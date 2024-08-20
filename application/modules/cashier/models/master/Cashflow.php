<?php

/**
 * Description of ClusterTran
 *
 * @author MIS
 */
class Cashier_Models_Master_Cashflow extends Cashier_Box_Models_ObjectEmbedData implements Cashier_Box_Kouti_Remora, Cashier_Box_Models_Master_InterProjectPt, Cashier_Box_Delien_DelimiterCandidate {

    private $cashflowtype;
    //private $grouptype;
    private $department;

    public function __construct() {
        parent::__construct();
        $this->project = new Cashier_Box_Models_Master_Project();
        $this->pt = new Cashier_Box_Models_Master_Pt();
        $this->cashflowtype = new Cashier_Models_Master_Cashflowtype;
        //$this->grouptype = new Cashier_Models_Master_Grouptype();
        $this->department = new Cashier_Models_Master_Department();
        $this->embedPrefix = 'cashflow_';
    }

    function getCashflowtype() {
        if (!$this->cashflowtype) {
            $this->cashflowtype = new Cashier_Models_Master_Cashflowtype();
        }
        return $this->cashflowtype;
    }

//    function getGrouptype() {
//        if (!$this->grouptype) {
//            $this->grouptype = new Cashier_Models_Master_Grouptype();
//        }
//        return $this->grouptype;
//    }

    function setCashflowtype(Cashier_Models_Master_Cashflowtype $cashflowtype) {
        $this->cashflowtype = $cashflowtype;
    }

//    function setGrouptype(Cashier_Models_Master_Grouptype $grouptype) {
//        $this->grouptype = $grouptype;
//    }
    
    function getDepartment() {
         if (!$this->department) {
            $this->department = new Cashier_Models_Master_Department();
        }
        return $this->department;
    }

    function setDepartment(Cashier_Models_Master_Department $department) {
        $this->department = $department;
    }

    
    public function setArrayTable($dataArray = NULL) {
        parent::setArrayTable($dataArray);
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;


        if (isset($x['setupcashflow_id'])) {
            $this->setId($x['setupcashflow_id']);
        }
        if (isset($x['department_id'])) {
            $this->getDepartment->setId($x['department_id']);
        }
        if (isset($x['cashflowtype_id'])) {
            $this->getCashflowtype->setId($x['cashflowtype_id']);
        }




        unset($x);
    }

    public function getArrayTable() {


        $x = array(
            "setupcashflow_id" => $this->getId(),
            "department_id" => $this->getDepartment()->getId(),
            "cashflowtype_id" => $this->getCashflowtype()->getId(),
           
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
        return array_merge($x, array("Modion", "Addon", "issued_date"));
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
