<?php
/**
 * Description of Payment
 *
 * @author MIS
    */
class Erems_Models_Payment_PaymentCashier extends Erems_Box_Models_ObjectEmbedData {

    private $acceptDate;
    private $prefix;
    private $groupTrans;
    private $chequegiro_date;
    private $chequegiro_no;
    private $prefix_id_bank;
    private $department_id;
    private $transno;
    private $thcoa_id;
    private $voucherprefix_id;
    private $kasbank;
    private $sum_amount;
    
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = 'paymentcashier_';
       // $this->detail = array();
    }
    
    public function getAcceptDate() {
        return $this->acceptDate;
    }
    
    public function setAcceptDate($acceptDate) {
        $this->acceptDate = $acceptDate;
    }
    
    function getPrefix() {
        return $this->prefix;
    }

    function getGroupTrans() {
        return $this->groupTrans;
    }

    function setPrefix($prefix) {
        $this->prefix = $prefix;
    }

    function setGroupTrans($groupTrans) {
        $this->groupTrans = $groupTrans;
    }

    function getChequegiro_date() {
        return $this->chequegiro_date;
    }

    function getChequegiro_no() {
        return $this->chequegiro_no;
    }

    function getPrefix_id_bank() {
        return $this->prefix_id_bank;
    }

    function getDepartment_id() {
        return $this->department_id;
    }

    function getTransno() {
        return $this->transno;
    }

    function getThcoa_id() {
        return $this->thcoa_id;
    }

    function getVoucherprefix_id() {
        return $this->voucherprefix_id;
    }

    function setChequegiro_date($chequegiro_date) {
        $this->chequegiro_date = $chequegiro_date;
    }

    function setChequegiro_no($chequegiro_no) {
        $this->chequegiro_no = $chequegiro_no;
    }

    function setPrefix_id_bank($prefix_id_bank) {
        $this->prefix_id_bank = $prefix_id_bank;
    }

    function setDepartment_id($department_id) {
        $this->department_id = $department_id;
    }

    function setTransno($transno) {
        $this->transno = $transno;
    }

    function setThcoa_id($thcoa_id) {
        $this->thcoa_id = $thcoa_id;
    }

    function setVoucherprefix_id($voucherprefix_id) {
        $this->voucherprefix_id = $voucherprefix_id;
    }
    
    function getKasbank() {
        return $this->kasbank;
    }

    function setKasbank($kasbank) {
        $this->kasbank = $kasbank;
    }

    function getSum_amount() {
        return $this->sum_amount;
    }

    function setSum_amount($sum_amount) {
        $this->sum_amount = $sum_amount;
    }

    
                
   
    public function setArrayTable($dataArray=NULL) {
       // $x = $dataArray;
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        if(isset ($x['th_kasbank_id'])){
          $this->setId($x['th_kasbank_id']);
        }
         if(isset ($x['accept_date'])){
          $this->setAcceptDate($x['accept_date']);
        }
        if(isset ($x['prefix_id'])){
          $this->setPrefix($x['prefix_id']);
        }
        if(isset ($x['grouptrans_id'])){
          $this->setGroupTrans($x['grouptrans_id']);
        }
        if(isset ($x['chequegiro_date'])){
          $this->setChequegiro_date($x['chequegiro_date']);
        }
        if(isset ($x['chequegiro_no'])){
          $this->setChequegiro_no($x['chequegiro_no']);
        }
        if(isset ($x['prefix_id_bank'])){
          $this->setPrefix_id_bank($x['prefix_id_bank']);
        }
        if(isset ($x['department_id'])){
          $this->setDepartment_id($x['department_id']);
        }
        if(isset ($x['transno'])){
          $this->setTransno($x['transno']);
        }
        if(isset ($x['thcoa_id'])){
          $this->setThcoa_id($x['thcoa_id']);
        }
        if(isset ($x['voucherprefix_id'])){
          $this->setVoucherprefix_id($x['voucherprefix_id']);
        }
         if(isset ($x['kasbank'])){
          $this->setKasbank($x['kasbank']);
        }
         if(isset ($x['sum_amount'])){
          $this->setSum_amount($x['sum_amount']);
        }
     
      
        
       
      
        unset($x);
        
        /*end add voucher*/
        
    }
    
    public function getArrayTable(){
        $x = array(
            'th_kasbank_id'=>$this->getId(),
            'accept_date'=>$this->getAcceptDate(),
            'prefix_id'=>$this->getPrefix(),
            'grouptrans_id'=>$this->getGroupTrans(),
            'chequegiro_date'=>$this->getChequegiro_date(),
            'chequegiro_no'=>$this->getChequegiro_no(),
            'prefix_id_bank'=>$this->getPrefix_id_bank(),
            'department_id'=>$this->getDepartment_id(),
            'transno'=>$this->getTransno(),
            'thcoa_id'=>$this->getThcoa_id(),
            'voucherprefix_id'=>$this->getVoucherprefix_id(),
            'kasbank'=>$this->getKasbank(),
            'sum_amount'=>$this->getSum_amount(),
          
        );
        
        return $x;
    }

    
        
    protected function getDatefields() {
      return array("accept_date","chequegiro_date");
    }

    
    
    
    


}

?>
