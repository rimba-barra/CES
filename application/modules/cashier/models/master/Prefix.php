<?php

/**
 * Description of ClusterTran
 *
 * @author MIS
 */
class Cashier_Models_Master_Prefix extends Cashier_Box_Models_ObjectEmbedData implements Cashier_Box_Kouti_Remora,  Cashier_Box_Models_Master_InterProjectPt,Cashier_Box_Delien_DelimiterCandidate {
    
    private $prefix;
    private $description;
    private $cashflow;
    private $openmonth;
    private $cashier;
    private $printjournal;
    private $minority;
    
    
   public function __construct() {
        parent::__construct();
        $this->project = new Cashier_Box_Models_Master_Project();
        $this->pt = new Cashier_Box_Models_Master_Pt();
       
        //$this->detail = array();
        $this->embedPrefix = 'prefix_';
    }

    function getPrefix() {
        return $this->prefix;
    }

    function getDescription() {
        return $this->description;
    }

    function setPrefix($prefix) {
        $this->prefix = $prefix;
    }

    function setDescription($description) {
        $this->description = $description;
    }

    function getCashflow() {
        return $this->cashflow;
    }

    function getOpenmonth() {
        return $this->openmonth;
    }

    function getCashier() {
        return $this->cashier;
    }

    function setCashflow($cashflow) {
        $this->cashflow = $cashflow;
    }

    function setOpenmonth($openmonth) {
        $this->openmonth = $openmonth;
    }

    function setCashier($cashier) {
        $this->cashier = $cashier;
    }

    function setPrintjournal($printjournal){
        $this->printjournal = $printjournal;
    }

    function getPrintjournal(){
        return $this->printjournal;
    }

    
                
    public function setArrayTable($dataArray = NULL) {
        parent::setArrayTable($dataArray);
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        if(isset ($x['prefix_id'])){
           $this->setId($x['prefix_id']); 
        }
        if(isset ($x['prefix'])){
           $this->setPrefix($x['prefix']); 
        }
        if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
        if(isset ($x['is_cashier'])){
           $this->setCashier($x['is_cashier']); 
        }
        if(isset ($x['is_cashflow'])){
           $this->setCashflow($x['is_cashflow']); 
        }
        if(isset ($x['openmonth'])){
           $this->setOpenmonth($x['openmonth']); 
        }
        if(isset ($x['is_printjournal'])){
            $this->setPrintjournal($x['is_printjournal']);
        }
        if(isset ($x['is_minority'])){
            $this->setMinority($x['is_minority']);
        }
        unset($x);
        
    }
    
    public function getArrayTable() {
           

        $x = array(
            "prefix_id"=>$this->getId(),     
            "prefix"=>$this->getPrefix(),     
            "description"=>$this->getDescription(),     
            "is_cashier"=>$this->getCashier(),     
            "is_cashflow"=>$this->getCashflow(),     
            "openmonth"=>$this->getOpenmonth(), 
            "is_printjournal"=>$this->getPrintjournal(),    
            "is_minority"=>$this->getMinority(),    
            
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




    /**
     * @return mixed
     */
    public function getMinority()
    {
        return $this->minority;
    }

    /**
     * @param mixed $minority
     *
     * @return self
     */
    public function setMinority($minority)
    {
        $this->minority = $minority;

        return $this;
    }
}

?>
