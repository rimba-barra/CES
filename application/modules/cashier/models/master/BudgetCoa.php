<?php

/**
 * Description of ClusterTran
 *
 * @author MIS
 */
class Cashier_Models_Master_BudgetCoa extends Cashier_Box_Models_ObjectEmbedData implements Cashier_Box_Kouti_Remora,  Cashier_Box_Models_Master_InterProjectPt,Cashier_Box_Delien_DelimiterCandidate {
    

    private $coaId;
    private $total;
    private $year;
    private $jan;
    private $feb;
    private $mar;
    private $apr;
    private $may;
    private $jun;
    private $jul;
    private $aug;
    private $sep;
    private $oct;
    private $nov;
    private $dec;
    private $description;
    private $coa;
    private $department_id;
    private $budget_type;
    private $user;
    
   public function __construct() {
        parent::__construct();
        $this->project = new Cashier_Box_Models_Master_Project();
        $this->pt = new Cashier_Box_Models_Master_Pt();
        //$this->detail = array();
        $this->embedPrefix = 'budget_';
    }
//    function getCoaconfigId() {
//        return $this->coaconfigId;
//    }
//
//    function getCoadetailId() {
//        return $this->coadetailId;
//    }



    function getCoaId() {
        return $this->coaId;
    }

    function getTotal() {
        return $this->total;
    }

    function getYear() {
        return $this->year;
    }

    function getJan() {
        return $this->jan;
    }

    function getFeb() {
        return $this->feb;
    }

    function getMar() {
        return $this->mar;
    }

    function getApr() {
        return $this->apr;
    }

    function getMay() {
        return $this->may;
    }

    function getJun() {
        return $this->jun;
    }

    function getJul() {
        return $this->jul;
    }

    function getAug() {
        return $this->aug;
    }

    function getSep() {
        return $this->sep;
    }

    function getOct() {
        return $this->oct;
    }

    function getNov() {
        return $this->nov;
    }

    function getDec() {
        return $this->dec;
    }

    function getbudget_type() {
        return $this->budget_type;
    }
    



    function setCoaId($coaId) {
        $this->coaId = $coaId;
    }

    function setTotal($total) {
        $this->total = $total;
    }

    function setYear($year) {
        $this->year = $year;
    }

    function setJan($jan) {
        $this->jan = $jan;
    }

    function setFeb($feb) {
        $this->feb = $feb;
    }

    function setMar($mar) {
        $this->mar = $mar;
    }

    function setApr($apr) {
        $this->apr = $apr;
    }

    function setMay($may) {
        $this->may = $may;
    }

    function setJun($jun) {
        $this->jun = $jun;
    }

    function setJul($jul) {
        $this->jul = $jul;
    }

    function setAug($aug) {
        $this->aug = $aug;
    }

    function setSep($sep) {
        $this->sep = $sep;
    }

    function setOct($oct) {
        $this->oct = $oct;
    }

    function setNov($nov) {
        $this->nov = $nov;
    }

    function setDec($dec) {
        $this->dec = $dec;
    }

    public function setuser($ao){
        $this->user = $ao;
    }
    
    public function getuser(){
        return $this->user;
    }

    function getDescription() {
        return $this->description;
    }

    function setDescription($description) {
        $this->description = $description;
    }
    
    function getCoa() {
        return $this->coa;
    }

    function setCoa($coa) {
        $this->coa = $coa;
    }

    function setbudget_type($budget_type) {
        $this->budget_type = $budget_type;
    }

    function getDepartmentId() {
        return $this->department_id;
    }

    function setDepartmentId($department_id) {
        $this->department_id = $department_id;
    }
            
    public function setArrayTable($dataArray = NULL) {
        parent::setArrayTable($dataArray);
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
        if(isset ($x['budget_id'])){
           $this->setId($x['budget_id']); 
        }
        if(isset ($x['coa_id'])){
           $this->setCoaId($x['coa_id']); 
        }
        if(isset ($x['year'])){
           $this->setYear($x['year']); 
        }
        if(isset ($x['total'])){
           $this->setTotal($x['total']); 
        }
        if(isset ($x['jan'])){
           $this->setJan($x['jan']); 
        }
        if(isset ($x['feb'])){
           $this->setFeb($x['feb']); 
        }
        if(isset ($x['mar'])){
           $this->setMar($x['mar']); 
        }
        if(isset ($x['apr'])){
           $this->setApr($x['apr']); 
        }
        if(isset ($x['may'])){
           $this->setMay($x['may']); 
        }
        if(isset ($x['jun'])){
           $this->setJun($x['jun']); 
        }
        if(isset ($x['jul'])){
           $this->setJul($x['jul']); 
        }
        if(isset ($x['aug'])){
           $this->setAug($x['aug']); 
        }
        if(isset ($x['sep'])){
           $this->setSep($x['sep']); 
        }
        if(isset ($x['oct'])){
           $this->setOct($x['oct']); 
        }
        if(isset ($x['nov'])){
           $this->setNov($x['nov']); 
        }
        if(isset ($x['dec'])){
           $this->setDec($x['dec']); 
        }
        if(isset ($x['coa'])){
           $this->setCoa($x['coa']); 
        }
        if(isset ($x['budget_type'])){
           $this->setbudget_type($x['budget_type']); 
        }
        if (isset ($x['department_id'])){
            $this->setDepartmentId($x['department_id']);
        }
        
        unset($x);
        
    }
    
    public function getArrayTable() {
       
        $x = array(
            "description"=>$this->getDescription(),
            "budget_id"=>$this->getId(),
            "coa_id"=>$this->getCoaId(),
            "year"=>$this->getYear(),
            "jan"=>$this->getJan(),
            "feb"=>$this->getFeb(),
            "mar"=>$this->getMar(),
            "apr"=>$this->getApr(),
            "may"=>$this->getMay(),
            "jun"=>$this->getJun(),
            "jul"=>$this->getJul(),
            "aug"=>$this->getAug(),
            "sep"=>$this->getSep(),
            "oct"=>$this->getOct(),
            "nov"=>$this->getNov(),
            "dec"=>$this->getDec(),
            "coa"=>$this->getCoa(),
            "total"=>$this->getTotal(),
            "department_id"=>$this->getDepartmentId(),
            "budget_type"=>$this->getbudget_type()
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
        return array($this->getProject(),$this->getPt());
    }
    
    protected function getDatefields() {
        $x = parent::getDatefields();
        return array_merge($x,array("Modion","Addon"));
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
