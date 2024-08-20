<?php

/**
 * Description of ClusterTran
 *
 * @author MIS
 */
class Cashier_Models_Transaction_Vouchersubdetail extends Cashier_Box_Models_ObjectEmbedData implements Cashier_Box_Kouti_Remora,  Cashier_Box_Models_Master_InterProjectPt,Cashier_Box_Delien_DelimiterCandidate {
    
   private $indexsubdata;
   private $dataflow;
   private $remarks;
   private $amount;
   private $subgl;
   private $voucherdetail;
   private $kelsub;
   private $uniqueid;
   private $is_refund;
   private $voucherdetail_purchaseletter_id;
    
   public function __construct() {
        parent::__construct();
        $this->project = new Cashier_Box_Models_Master_Project();
        $this->pt = new Cashier_Box_Models_Master_Pt();
        $this->subgl = new Cashier_Models_Master_SubLedger();
        $this->voucherdetail = new Cashier_Models_Transaction_Voucherdetail();
        $this->kelsub = new Cashier_Models_Master_Kelsub();
        //$this->detail = array();
        $this->embedPrefix = 'vouchersubdetail_';
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

    function getIs_refund() {
        return $this->is_refund;
    }

    function getPurchaseletter_id() {
        return $this->voucherdetail_purchaseletter_id;
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

    function setIs_refund($is_refund) {
        $this->is_refund = $is_refund;
    }

    function setPurchaseletter_id($voucherdetail_purchaseletter_id) {
        $this->voucherdetail_purchaseletter_id = $voucherdetail_purchaseletter_id;
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

    function getVoucherdetail() {
        if(!$this->voucherdetail) {
            $this->voucherdetail = new Cashier_Models_Transaction_Voucherdetail();
        }
        return $this->voucherdetail;
    }

    function setVoucherdetail(Cashier_Models_Transaction_Voucherdetail $voucherdetail) {
        $this->voucherdetail = $voucherdetail;
    }

    function getKelsub() {
        if(!$this->kelsub) {
             $this->kelsub = new Cashier_Models_Master_Kelsub();
        }
         return $this->kelsub;
    }

    function setKelsub(Cashier_Models_Master_Kelsub $kelsub) {
        $this->kelsub = $kelsub;
    }

    function getUniqueid() {
        return $this->uniqueid;
    }

    function setUniqueid($uniqueid) {
        $this->uniqueid = $uniqueid;
    }

                            
    public function setArrayTable($dataArray = NULL) {
        parent::setArrayTable($dataArray);
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        if(isset ($x['vouchersubdetail_id'])){
           $this->setId($x['vouchersubdetail_id']); 
        }
        if(isset ($x['indexsubdata'])){
           $this->setIndexdata($x['indexsubdata']); 
        }
        if(isset ($x['dataflow'])){
           $this->setDataflow($x['dataflow']); 
        }
        if(isset ($x['remarks'])){
           $this->setRemarks(str_replace("'","`",$x['remarks'])); 
        }
        if(isset ($x['amount'])){
           $this->setAmount($x['amount']); 
        }
        if(isset ($x['subgl_subgl_id'])){
           $this->getSubgl()->setId($x['subgl_subgl_id']); 
        }
        if(isset ($x['voucherdetail_voucherdetail_id'])){
           $this->getVoucherdetail()->setId($x['voucherdetail_voucherdetail_id']); 
        }
        if(isset ($x['voucherdetail_indexdata'])){
           $this->getVoucherdetail()->setIndexdata($x['voucherdetail_indexdata']); 
        }
        if(isset ($x['kelsub_kelsub_id'])){
           $this->getKelsub()->setId($x['kelsub_kelsub_id']); 
        }
        if(isset ($x['vouchersubdetail_id'])){
           $this->setUniqueid($x['vouchersubdetail_id']); 
        }
        if(isset ($x['is_refund'])){
           $this->setIs_refund($x['is_refund']); 
        }
        if(isset ($x['voucherdetail_purchaseletter_id'])){
           $this->setPurchaseletter_id($x['voucherdetail_purchaseletter_id']); 
        }
       
        unset($x);
        
    }
    
    public function getArrayTable() {
       
        $x = array(
            "vouchersubdetail_id"=>$this->getId(),
            "indexsubdata"=>$this->getIndexdata(),
            "remarks"=>mb_convert_encoding($this->getRemarks(),'HTML-ENTITIES','utf-8'),
            "dataflow"=>$this->getDataflow(),
            "amount"=>$this->getAmount(),
            "subgl_subgl_id"=>$this->getSubgl()->getId(),
            "voucherdetail_voucherdetail_id"=>$this->getVoucherdetail()->getId(),
            "voucherdetail_indexdata"=>$this->getVoucherdetail()->getIndexdata(),
            "kelsub_kelsub_id"=>$this->getKelsub()->getId(),
            "uniqueid"=>$this->getId(),
            "is_refund"=>$this->getIs_refund(),
            "voucherdetail_purchaseletter_id"=>$this->getPurchaseletter_id(),
            
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
