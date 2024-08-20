<?php

/**
 * Description of ClusterTran
 *
 * @author MIS
 */
class Cashier_Models_Transaction_Journalsubdetail extends Cashier_Box_Models_ObjectEmbedData implements Cashier_Box_Kouti_Remora,  Cashier_Box_Models_Master_InterProjectPt,Cashier_Box_Delien_DelimiterCandidate {
    
   private $indexsubdata;
   private $dataflow;
   private $remarks;
   private $amount;
   private $subgl;
   private $journaldetail;
   private $kelsubId;
    
   public function __construct() {
        parent::__construct();
        $this->project = new Cashier_Box_Models_Master_Project();
        $this->pt = new Cashier_Box_Models_Master_Pt();
        $this->subgl = new Cashier_Models_Master_SubLedger();
        $this->journaldetail = new Cashier_Models_Transaction_Journaldetail();
        //$this->detail = array();
        $this->embedPrefix = 'journalsubdetail_';
    }

    
    function getIndexdata() {
        return $this->indexsubdata;
    }

    function getDataflow() {
        return $this->dataflow;
    }

    function getRemarks() {
        return $this->remarks;
    }

    function getAmount() {
        return $this->amount;
    }

    function setIndexdata($indexsubdata) {
        $this->indexsubdata = $indexsubdata;
    }

    function setDataflow($dataflow) {
        $this->dataflow = $dataflow;
    }

    function setRemarks($remarks) {
        $this->remarks = $remarks;
    }

    function setAmount($amount) {
        $this->amount = $amount;
    }
    function getSubgl() {
        if(!$this->subgl) {
           $this->subgl = new Cashier_Models_Master_SubLedger();
        }
        return $this->subgl;
    }

    function setSubgl(Cashier_Models_Master_SubLedger $subgl) {
        $this->subgl = $subgl;
    }

    function getJournaldetail() {
        if(!$this->journaldetail) {
            $this->journaldetail = new Cashier_Models_Transaction_Journaldetail();
        }
        return $this->journaldetail;
    }

    function setJournaldetail(Cashier_Models_Transaction_Journaldetail $journaldetail) {
        $this->journaldetail = $journaldetail;
    }

    

                        
    public function setArrayTable($dataArray = NULL) {
        parent::setArrayTable($dataArray);
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        if(isset ($x['journalsubdetail_id'])){
           $this->setId($x['journalsubdetail_id']); 
        }
        if(isset ($x['indexsubdata'])){
           $this->setIndexdata($x['indexsubdata']); 
        }
        if(isset ($x['dataflow'])){
           $this->setDataflow($x['dataflow']); 
        }
        if(isset ($x['remarks'])){
           $this->setRemarks($x['remarks']); 
        }
        if(isset ($x['amount'])){
           $this->setAmount($x['amount']); 
        }
        if(isset ($x['subgl_subgl_id'])){
           $this->getSubgl()->setId($x['subgl_subgl_id']); 
        }
        if(isset ($x['journaldetail_journaldetail_id'])){
           $this->getJournaldetail()->setId($x['journaldetail_journaldetail_id']); 
        }
        if(isset ($x['journaldetail_indexdata'])){
           $this->getJournaldetail()->setIndexdata($x['journaldetail_indexdata']); 
        }
        if(isset ($x['kelsub_kelsub_id'])){
           $this->setKelsubId($x['kelsub_kelsub_id']); 
        }
       
        unset($x);
        
    }
    
    public function getArrayTable() {
       
        $x = array(
            "journalsubdetail_id"=>$this->getId(),
            "indexsubdata"=>$this->getIndexdata(),
            "remarks"=>$this->getRemarks(),
            "dataflow"=>$this->getDataflow(),
            "amount"=>$this->getAmount(),
            "subgl_subgl_id"=>$this->getSubgl()->getId(),
            "journaldetail_journaldetail_id"=>$this->getJournaldetail()->getId(),
            "journaldetail_indexdata"=>$this->getJournaldetail()->getIndexdata(),
            "kelsub_kelsub_id"=>$this->getKelsubId()
            
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
    public function getKelsubId()
    {
        return $this->kelsubId;
    }

    /**
     * @param mixed $kelsubId
     *
     * @return self
     */
    public function setKelsubId($kelsubId)
    {
        $this->kelsubId = $kelsubId;

        return $this;
    }
}

?>
