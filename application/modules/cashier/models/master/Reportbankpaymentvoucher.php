<?php

/**
 * Description of ClusterTran
 *
 * @author MIS
 */
class Cashier_Models_Master_Reportbankpaymentvoucher extends Cashier_Box_Models_ObjectEmbedData implements Cashier_Box_Kouti_Remora,  Cashier_Box_Models_Master_InterProjectPt,Cashier_Box_Delien_DelimiterCandidate {
    
    private $ID;
    private $type;
    private $voucher_no;
    private $voucher_date;
    private $description;
    private $cheque_no;
    private $giro_date;
     private $Penerima;
      private $status;
       private $cheque_type;
        private $amount;
         private $Terima_1;
          private $Terima_2;
           private $Terima_3;
            private $Terima_4;
             private $Terima_5;
              private $Terima_6;
              private $range_id;
              private $kasbank_id;

    
   public function __construct() {
        parent::__construct();
        $this->project = new Cashier_Box_Models_Master_Project();
        $this->pt = new Cashier_Box_Models_Master_Pt();
       
        //$this->detail = array();
        $this->embedPrefix = 'reportbankpaymentvoucher_';
    }
   public function getType() {
        return $this->type;
    }

    public function setType($type) {
        $this->type = $type;
    }

    public function getVoucherno() {
        return $this->voucher_no;
    }

    public function setVoucherno($voucher_no) {
        $this->voucher_no = $voucher_no;
    }

    public function getVoucherdate() {
        return $this->voucher_date;
    }

    public function setVoucherdate($voucher_date) {
        $this->voucher_date = $voucher_date;
    }
    function getDescription() {
        return $this->description;
    }

     function setDescription($description) {
        $this->description = $description;
    }


    function getChequeno() {
        return $this->cheque_no;
    }

    function setChequeno($cheque_no) {
        $this->cheque_no = $cheque_no;
    }

    function getGirodate() {
        return $this->giro_date;
    }

     function setGirodate($giro_date) {
        $this->giro_date = $giro_date;
    }

    function getPenerima() {
        return $this->Penerima;
    }

    function setPenerima($Penerima) {
        $this->Penerima = $Penerima;
    }

     function getStatus() {
        return $this->status;
    }

    function setStatus($status) {
        $this->status = $status;
    }

     function getChequetype() {
        return $this->cheque_type;
    }

    function setChequetype($cheque_type) {
        $this->cheque_type = $cheque_type;
    }

     function getAmount() {
        return $this->amount;
    }

    function setAmount($amount) {
        $this->amount = $amount;
    }


     function getTerima_1() {
        return $this->Terima_1;
    }

    function setTerima_1($Terima_1) {
        $this->Terima_1 = $Terima_1;
    }


    function getTerima_2() {
        return $this->Terima_2;
    }

    function setTerima_2($Terima_2) {
        $this->Terima_2 = $Terima_2;
    }

    function getTerima_3() {
        return $this->Terima_3;
    }

    function setTerima_3($Terima_3) {
        $this->Terima_3 = $Terima_3;
    }

    function getTerima_4() {
        return $this->Terima_4;
    }

    function setTerima_4($Terima_4) {
        $this->Terima_4 = $Terima_4;
    }

    function getTerima_5() {
        return $this->Terima_5;
    }

    function setTerima_5($Terima_5) {
        $this->Terima_5 = $Terima_5;
    }

    function getTerima_6() {
        return $this->Terima_6;
    }

    function setTerima_6($Terima_6) {
        $this->Terima_6 = $Terima_6;
    }

    function getRangeid() {
        return $this->range_id;
    }
 
    function setRangeid($range_id) {
        $this->range_id = $range_id;
    }

    function getKasbankid() {
        return $this->kasbank_id;
    }
 
    function setKasbankid($kasbank_id) {
        $this->kasbank_id = $kasbank_id;
    }
    
                
    public function setArrayTable($dataArray = NULL) {
        parent::setArrayTable($dataArray);
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
   
         if(isset ($x['cheque_id'])){
           $this->setId($x['cheque_id']); 
        }
        if(isset ($x['type'])){
           $this->setType($x['type']); 
        }
        if(isset ($x['voucher_no'])){
           $this->setVoucherno($x['voucher_no']); 
        }
        if(isset ($x['voucher_date'])){
           $this->setVoucherdate($x['voucher_date']); 
        }
        if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
        if(isset ($x['cheque_no'])){
           $this->setChequeno($x['cheque_no']); 
        }
        if(isset ($x['giro_date'])){
           $this->setGirodate($x['giro_date']); 
        }
        if(isset ($x['Penerima'])){
           $this->setPenerima($x['Penerima']); 
        }
         if(isset ($x['status'])){
           $this->setStatus($x['status']); 
        }
         if(isset ($x['cheque_type'])){
           $this->setChequetype($x['cheque_type']); 
        }
         if(isset ($x['amount'])){
           $this->setAmount($x['amount']); 
        }
         if(isset ($x['Terima_1'])){
           $this->setTerima_1($x['Terima_1']); 
        }
         if(isset ($x['Terima_2'])){
           $this->setTerima_2($x['Terima_2']); 
        }
         if(isset ($x['Terima_3'])){
           $this->setTerima_3($x['Terima_3']); 
        }
         if(isset ($x['Terima_4'])){
           $this->setTerima_4($x['Terima_4']); 
        }
         if(isset ($x['Terima_5'])){
           $this->setTerima_5($x['Terima_5']); 
        }
         if(isset ($x['Terima_6'])){
           $this->setTerima_6($x['Terima_6']); 
        }
        if(isset ($x['range_id'])){
          $this->setRangeid($x['range_id']); 
       }
       if(isset ($x['kasbank_id'])){
         $this->setKasbankid($x['kasbank_id']); 
      }
        
       
        unset($x);
        
    }
    
    public function getArrayTable() {
       
        $x = array(
           "cheque_id"=>$this->getId(),
            "type"=>$this->getType(),
            "voucher_no"=>$this->getVoucherno(),
            "voucher_date"=>$this->getVoucherdate(),
            "description"=>$this->getDescription(),
            "cheque_no"=>$this->getChequeno(),
            "giro_date"=>$this->getGirodate(),
            "Penerima"=>$this->getPenerima(),
             "status"=>$this->getStatus(),
              "cheque_type"=>$this->getChequetype(),
               "amount"=>$this->getAmount(),
                "Terima_1"=>$this->getTerima_1(),
                 "Terima_2"=>$this->getTerima_2(),
                  "Terima_3"=>$this->getTerima_3(),
                   "Terima_4"=>$this->getTerima_4(),
                    "Terima_5"=>$this->getTerima_5(),
                     "Terima_6"=>$this->getTerima_6(),
                        "range_id"=>$this->getRangeid(),
                        "kasbank_id"=>$this->getKasbankid(),
              
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
