<?php
/**
 * Description of Payment
 *
 * @author MIS
 */
class Cashier_Models_Payment_Payment extends Cashier_Box_Models_ObjectEmbedData implements Cashier_Box_Kouti_Remora,Cashier_Box_Delien_DelimiterCandidate,Cashier_Box_Models_App_Hermes_HasDetail {
    private $nomor;
    private $jenis;
    private $purchaseLetterId;
    private $date;
    private $paymentMethodId;
    private $paymentMethod;
    private $amount;
    private $description;
    private $total;
    private $purchaseletter;
    private $referenceNo;
    private $cairDate;
    private $dueDate;
    private $isReferenceRejected;
    private $adminFee;
    private $denda;
    private $cdn; // credit debit note
    private $cdnValue;
    private $detail;
    private $DCResult;
    private $receiptNo;
    private $flag;
    private $voucherNo;
    private $paymentCashier;
    private $is_debitnote;
    private $debitnote;
    private $is_creditnote;
    private $creditnote;
    
    
    
    
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = 'payment_';
        $this->purchaseletter = new Cashier_Models_Purchaseletter_PurchaseLetter();
        $this->paymentMethod = new Cashier_Models_Master_PaymentMethod();
        //$this->kasbank = new Cashier_Models_Master_Kasbank();
        $this->detail = array();
    }
    
    function getIs_debitnote() {
        return $this->is_debitnote;
    }

    function getDebitnote() {
        return $this->debitnote;
    }

    function getIs_creditnote() {
        return $this->is_creditnote;
    }

    function getCreditnote() {
        return $this->creditnote;
    }

    function setIs_debitnote($is_debitnote) {
        $this->is_debitnote = $is_debitnote;
    }

    function setDebitnote($debitnote) {
        $this->debitnote = $debitnote;
    }

    function setIs_creditnote($is_creditnote) {
        $this->is_creditnote = $is_creditnote;
    }

    function setCreditnote($creditnote) {
        $this->creditnote = $creditnote;
    }

        
    public function getNomor() {
        return $this->nomor;
    }

    public function setNomor($nomor) {
        $this->nomor = $nomor;
    }

    public function getJenis() {
        return $this->jenis;
    }

    public function setJenis($jenis) {
        $this->jenis = $jenis;
    }

    public function getPurchaseLetterId() {
        return $this->purchaseLetterId;
    }

    public function setPurchaseLetterId($purchaseLetterId) {
        $this->purchaseLetterId = $purchaseLetterId;
    }

    public function getDate() {
        return $this->date;
    }

    public function setDate($date) {
        $this->date = $date;
    }

    public function getPaymentMethodId() {
        return $this->paymentMethodId;
    }

    public function setPaymentMethodId($paymentMethodId) {
        $this->paymentMethodId = $paymentMethodId;
    }
    
    public function getAmount() {
        return $this->amount;
    }

    public function setAmount($amount) {
        $this->amount = (double)$amount;
    }

    public function getDescription() {
        return $this->description;
    }

    public function setDescription($description) {
        $this->description = $description;
    }
    
    public function getTotal() {
        return $this->total;
    }

    public function setTotal($total) {
        $this->total = (double)$total;
    }
    
    public function getPurchaseletter() {
        return $this->purchaseletter;
    }

    public function setPurchaseletter($purchaseletter) {
        $this->purchaseletter = $purchaseletter;
    }
    
    public function getPaymentMethod() {
        if(!$this->paymentMethod){
            $this->paymentMethod = new Cashier_Models_Master_PaymentMethod();
        }
        return $this->paymentMethod;
    }

    public function setPaymentMethod(Cashier_Models_Master_PaymentMethod $paymentMethod) {
        $this->paymentMethod = $paymentMethod;
    }
    
    public function getReferenceNo() {
        return $this->referenceNo;
    }

    public function setReferenceNo($referenceNo) {
        $this->referenceNo = $referenceNo;
    }

    public function getCairDate() {
        return $this->cairDate;
    }

    public function setCairDate($cairDate) {
        $this->cairDate = $cairDate;
    }

    public function getDueDate() {
        return $this->dueDate;
    }

    public function setDueDate($dueDate) {
        $this->dueDate = $dueDate;
    }

    public function getIsReferenceRejected() {
        return (int)$this->isReferenceRejected;
    }

    public function setIsReferenceRejected($isReferenceRejected) {
        $this->isReferenceRejected = (int)$isReferenceRejected;
    }
    
    public function getAdminFee() {
        return $this->adminFee;
    }

    public function setAdminFee($adminFee) {
        $this->adminFee = (double)$adminFee;
    }

    public function getDenda() {
        return $this->denda;
    }

    public function setDenda($denda) {
        $this->denda = (double)$denda;
    }
    

    public function addDetail(Cashier_Models_Payment_Detail $detail){
        $this->detail[] = $detail;
    }
    
    public function getDetail($pos=-1){
        if($pos > -1){
            return $this->detail[$pos];
        }else{
            return $this->detail;
        }
        
    }
    
    public function resetDetail(){
        $this->detail = array();
    }
    
    public function getFlag() {
        return $this->flag;
    }

    public function setFlag($flag) {
        $this->flag = (int)$flag;
    }
    
    public function getCdn() {
        return (int)$this->cdn;
    }

    public function setCdn($cdn) {
        $this->cdn = (int)$cdn;
    }
    
    public function getCdnValue() {
        return (double)$this->cdnValue;
    }

    public function setCdnValue($cdnValue) {
        $this->cdnValue = $cdnValue;
    }
    
    

    public function getReceiptNo() {
        return $this->receiptNo;
    }

    public function setReceiptNo($receiptNo) {
        $this->receiptNo = $receiptNo;
    }
    
    function getPaymentCashier() {
        return $this->paymentCashier;
    }

    function setPaymentCashier(Cashier_Models_Payment_PaymentCashier $paymentCashier) {
        $this->paymentCashier = $paymentCashier;
    }

    
   


    
    
    
            
    public function setArrayTable($dataArray=NULL) {
       // $x = $dataArray;
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        if(isset ($x['payment_id'])){
          $this->setId($x['payment_id']);
        }
        if(isset ($x['payment_no'])){
          $this->setNomor($x['payment_no']);
        }
        
        if(isset ($x['paymentflag_id'])){
          $this->setJenis($x['paymentflag_id']);
        }
        if(isset ($x['purchaseletter_id'])){
          $this->setPurchaseLetterId($x['purchaseletter_id']);
        }
        if(isset ($x['payment_date'])){
          $this->setDate($x['payment_date']);
        }
        if(isset ($x['paymentmethod_id'])){
          $this->setPaymentMethodId($x['paymentmethod_id']);
        }
        if(isset ($x['paymentmethod_paymentmethod_id'])){
          $this->getPaymentMethod()->setId($x['paymentmethod_paymentmethod_id']);
        }
        if(isset ($x['payment'])){
          $this->setAmount($x['payment']);
        }
        if(isset ($x['total_payment'])){
          $this->setTotal($x['total_payment']);
        }
        if(isset ($x['note'])){
          $this->setDescription($x['note']);
        }
        if(isset ($x['duedate'])){ 
          $this->setDueDate($x['duedate']);
        }
        if(isset ($x['cair_date'])){
          $this->setCairDate($x['cair_date']);
        }
        if(isset ($x['reference_no'])){
          $this->setReferenceNo($x['reference_no']);
        }
        if(isset ($x['is_referencerejected'])){
          $this->setIsReferenceRejected($x['is_referencerejected']);
        }
        if(isset ($x['admin_fee'])){
          $this->setAdminFee($x['admin_fee']);
        }
        if(isset ($x['denda'])){
          $this->setDenda($x['denda']);
        }
        if(isset ($x['paymentflag_id'])){
          $this->setFlag($x['paymentflag_id']);
        }
        if(isset ($x['cdn'])){
          $this->setCdn($x['cdn']);
        }
        if(isset ($x['cdn_value'])){
          $this->setCdnValue($x['cdn_value']);
        }
        if(isset ($x['receipt_no'])){
          $this->setReceiptNo($x['receipt_no']);
        }
        if(isset ($x['voucher_no'])){
          $this->setVoucherNo($x['voucher_no']);
        }
        if(isset ($x['is_debitnote'])){
          $this->setIs_debitnote($x['is_debitnote']);
        }
        if(isset ($x['is_creditnote'])){
          $this->setIs_creditnote($x['is_creditnote']);
        }
        if(isset ($x['debitnote'])){
          $this->setDebitnote($x['debitnote']);
        }
        if(isset ($x['creditnote'])){
          $this->setCreditnote($x['creditnote']);
        }
        


        
        unset($x);
        
        /*end add voucher*/
        
    }
    
    public function getArrayTable(){
        $x = array(
            'payment_id'=>$this->getId(),
            'payment_no'=>$this->getNomor(),
            'paymentflag_id'=>$this->getJenis(),
            'purchaseletter_id'=>$this->getPurchaseLetterId(),
            'payment_date'=>$this->getDate(),
            'paymentmethod_id'=>$this->getPaymentMethodId(),
            'paymentmethod_paymentmethod_id'=>$this->getPaymentMethod()->getId(),
            'total_payment'=>$this->getTotal(),
            'note'=>$this->getDescription(),
            'payment'=>$this->getAmount(),
            'duedate'=>$this->getDueDate(),
            'cair_date'=>$this->getCairDate(),
            'reference_no'=>$this->getReferenceNo(),
            'is_referencerejected'=>$this->getIsReferenceRejected(),
            'admin_fee'=>$this->getAdminFee(),
            'denda'=>$this->getDenda(),
            'paymentflag_id'=>$this->getFlag(),
            'cdn'=>$this->getCdn(),
            'cdn_value'=>$this->getCdnValue(),
            'receipt_no'=>$this->getReceiptNo(),
            'voucher_no'=>$this->getVoucherNo(),
            'is_debitnote'=>$this->getIs_debitnote(),
            'is_creditnote'=>$this->getIs_creditnote(),
            'debitnote'=>$this->getDebitnote(),
            'creditnote'=>$this->getCreditnote(),
            
           
           
        );
        return $x;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getPurchaseletter(),$this->getPaymentMethod(),$this->getPaymentCashier());
    }

    public function getDCArray() {
        return $this->detail;
    }

    public function getDCResult() {
        return $this->DCResult;
    }

    public function setDCArray($delimiteredArray) {
        $this->DCResult = $delimiteredArray;
    }

    public function addDetailObject($detailObject) {
        $this->addDetail($detailObject);
    }

    public function getDetailObject() {
        return new Cashier_Models_Payment_Detail();
    }

    public function getIndexArName() {
        return "detail";
    }

    public function getPrefixNumber() {
        return "PAYMENT";
    }

    public function setDocumentNumber($nomorResult) {
        $this->setNomor($nomorResult);
    }
    
    public function getVoucherNo() {
        return $this->voucherNo;
    }

    public function setVoucherNo($voucherNo) {
        $this->voucherNo = $voucherNo;
    }

        
    protected function getDatefields() {
        return array("cair_date","duedate","accept_date","chequegiro_date");
    }

    
    
    
    


}

?>
