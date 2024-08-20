<?php

/**
 * Description of ClusterTran
 *
 * @author MIS
 */
class Cashier_Models_Master_Voucherprefix extends Cashier_Box_Models_ObjectEmbedData implements Cashier_Box_Kouti_Remora,  Cashier_Box_Models_Master_InterProjectPt,Cashier_Box_Delien_DelimiterCandidate {
    
    private $coaId;
    private $prefixId;
    private $tempPrefix;
    private $noAcc;
    private $kasbank;
    private $inOut;
    private $description;
    private $kelsub_id;
    private $bank_id;
    private $bank_name;
    private $istempprefix;
    
    function getIstempprefix() {
        return $this->istempprefix;
    }

    function setIstempprefix($istempprefix) {
        $this->istempprefix = $istempprefix;
    }

        
    function getBank_id() {
        return $this->bank_id;
    }

    function getBank_name() {
        return $this->bank_name;
    }

    function setBank_id($bank_id) {
        $this->bank_id = $bank_id;
    }

    function setBank_name($bank_name) {
        $this->bank_name = $bank_name;
    }

        
    function getKelsub_id() {
        return $this->kelsub_id;
    }

    function setKelsub_id($kelsub_id) {
        $this->kelsub_id = $kelsub_id;
    }

        
    function getCoaId() {
        return $this->coaId;
    }

    function getPrefixId() {
        return $this->prefixId;
    }

    function getTempPrefix() {
        return $this->tempPrefix;
    }

    function getNoAcc() {
        return $this->noAcc;
    }

    function getKasbank() {
        return $this->kasbank;
    }

    function getInOut() {
        return $this->inOut;
    }

    function getDescription() {
        return $this->description;
    }

    function setCoaId($coaId) {
        $this->coaId = $coaId;
    }

    function setPrefixId($prefixId) {
        $this->prefixId = $prefixId;
    }

    function setTempPrefix($tempPrefix) {
        $this->tempPrefix = $tempPrefix;
    }

    function setNoAcc($noAcc) {
        $this->noAcc = $noAcc;
    }

    function setKasbank($kasbank) {
        $this->kasbank = $kasbank;
    }

    function setInOut($inOut) {
        $this->inOut = $inOut;
    }

    function setDescription($description) {
        $this->description = $description;
    }

        
   public function __construct() {
        parent::__construct();
        $this->project = new Cashier_Box_Models_Master_Project();
        $this->pt = new Cashier_Box_Models_Master_Pt();
       
        //$this->detail = array();
        $this->embedPrefix = 'voucherprefix_';
    }


            
                
    public function setArrayTable($dataArray = NULL) {
        parent::setArrayTable($dataArray);
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        if(isset ($x['voucherprefix_id'])){
           $this->setId($x['voucherprefix_id']); 
        }
        if(isset ($x['prefix_id'])){
           $this->setPrefixId($x['prefix_id']); 
        }
        if(isset ($x['coa_id'])){
           $this->setCoaId($x['coa_id']); 
        }
        if(isset ($x['temp_prefix'])){
           $this->setTempPrefix($x['temp_prefix']); 
        }
        if(isset ($x['no_acc'])){
           $this->setNoAcc($x['no_acc']); 
        }
        if(isset ($x['cash_bank'])){
           $this->setKasbank($x['cash_bank']); 
        }
        if(isset ($x['in_out'])){
           $this->setInOut($x['in_out']); 
        }
        if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
        if(isset ($x['kelsub_id'])){
           $this->setKelsub_id($x['kelsub_id']); 
        }
        if(isset ($x['bank_id'])){
           $this->setBank_id($x['bank_id']); 
        }
        
        if(isset ($x['bank_name'])){
           $this->setBank_name($x['bank_name']); 
        }
        if(isset ($x['istempprefix'])){
           $this->setIstempprefix($x['istempprefix']); 
        }
        unset($x);
        
    }
    
    public function getArrayTable() {
           
//        private $tempPrefix;
//    private $noAcc;
//    private $kasbank;
//    private $inOut;
//    private $description;
        $x = array(
            "voucherprefix_id"=>$this->getId(),     
            "temp_prefix"=>$this->getTempPrefix(),     
            "no_acc"=>$this->getNoAcc(),     
            "cash_bank"=>$this->getKasbank(),     
            "in_out"=>$this->getInOut(),     
            "description"=>$this->getDescription(),  
            "kelsub_id"=>$this->getKelsub_id(),   
            "bank_id"=>$this->getBank_id(),    
            "bank_name"=>$this->getBank_name(),   
            "istempprefix"=>$this->getIstempprefix(),  
            
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
