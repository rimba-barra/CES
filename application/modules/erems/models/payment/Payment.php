<?php
/**
 * Description of Payment
 *
 * @author MIS
 */
class Erems_Models_Payment_Payment extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Kouti_Remora,Erems_Box_Delien_DelimiterCandidate,Erems_Box_Models_App_Hermes_HasDetail {
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
    private $nomorPrint;
    private $isDraft;
    private $counterkwitansi;

    //add by anas 16122020
    private $addby;
    private $addon;
    private $modiby;
    private $modion;

    // added by rico 26122022    
    private $is_blokir;

    // added by rico 16022023    
    private $is_revenuesharing;

    public function __construct() {
        parent::__construct();
        $this->embedPrefix = 'payment_';
        $this->purchaseletter = new Erems_Models_Purchaseletter_PurchaseLetter();
        $this->paymentMethod = new Erems_Models_Master_PaymentMethod();
        $this->paymentCashier = new Erems_Models_Payment_PaymentCashier();
        $this->detail = array();
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
            $this->paymentMethod = new Erems_Models_Master_PaymentMethod();
        }
        return $this->paymentMethod;
    }

    public function setPaymentMethod(Erems_Models_Master_PaymentMethod $paymentMethod) {
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

    // added by rico 26122022
    public function getIsBlokir() {
        return (int)$this->is_blokir;
    }

    // added by rico 26122022
    public function setIsBlokir($is_blokir) {
        $this->is_blokir = (int)$is_blokir;
    }

    // added by rico 26122022
    public function getIsRevenueSharing() {
        return (int)$this->is_revenuesharing;
    }

    // added by rico 26122022
    public function setIsRevenueSharing($is_revenuesharing) {
        $this->is_revenuesharing = (int)$is_revenuesharing;
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
    

    public function addDetail(Erems_Models_Payment_Detail $detail){
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

    function setPaymentCashier(Erems_Models_Payment_PaymentCashier $paymentCashier) {
        $this->paymentCashier = $paymentCashier;
    }
    
    public function getIsDraft() {
        return $this->isDraft;
    }

    public function setIsDraft($isDraft) {
        $this->isDraft = $isDraft;
    }
    
    public function getCounterkwitansi() {
        return $this->counterkwitansi;
    }

    public function setCounterkwitansi($counterkwitansi) {
        $this->counterkwitansi = $counterkwitansi;
    }


    //add by anas 16122020
    public function getAddby() {
        return $this->addby;
    }

    public function setAddby($addby) {
        $this->addby = $addby;
    }
    public function getAddon() {
        return $this->addon;
    }

    public function setAddon($addon) {
        $this->addon = $addon;
    }

    public function getModiby() {
        return $this->modiby;
    }

    public function setModiby($modiby) {
        $this->modiby = $modiby;
    }
    public function getModion() {
        return $this->modion;
    }

    public function setModion($modion) {
        $this->modion = $modion;
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
        if(isset ($x['print_no'])){
          $this->setNomorPrint($x['print_no']);
        }
        if(isset ($x['is_draft'])){
          $this->setIsDraft($x['is_draft']);
        }
        if(isset ($x['counterkwitansi'])){
          $this->setCounterkwitansi($x['counterkwitansi']);
        }

        //add by anas 16122020
        if(isset ($x['Addby'])){
          $this->setAddby($x['Addby']);
        }
        if(isset ($x['Addon'])){
          $this->setAddon($x['Addon']);
        }
        if(isset ($x['Modiby'])){
          $this->setModiby($x['Modiby']);
        }
        if(isset ($x['Modion'])){
          $this->setModion($x['Modion']);
        }

        // added by rico 29122021
        if(isset ($x['paymentmethod_paymentmethod'])){
          $this->getPaymentMethod()->setName($x['paymentmethod_paymentmethod']);
        }
        // added by rico 26122022
        if(isset ($x['is_blokir'])){
          $this->setIsBlokir($x['is_blokir']);
        }
        // added by rico 16022023
        if(isset ($x['is_revenuesharing'])){
          $this->setIsRevenueSharing($x['is_revenuesharing']);
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
            'print_no'=>$this->getNomorPrint(),
            'is_draft'=>$this->getIsDraft(),
            'counterkwitansi'=>$this->getCounterkwitansi(),
            //add by anas 16122020
            'Addby'=>$this->getAddby(),
            'Addon'=>$this->getAddon(),
            'Modiby'=>$this->getModiby(),
            'Modion'=>$this->getModion(),
            'paymentmethod_paymentmethod'=>$this->getPaymentMethod()->getName(),
            'is_blokir'=>$this->getIsBlokir(), // added by rico 26122022,
            'is_revenuesharing'=>$this->getIsRevenueSharing(), // added by rico 16022023
        
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
        return new Erems_Models_Payment_Detail();
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
    
    function getNomorPrint() {
        return $this->nomorPrint;
    }

    function setNomorPrint($nomorPrint) {
        $this->nomorPrint = $nomorPrint;
    }

    
        
    protected function getDatefields() {
        return array("cair_date","duedate","payment_date","accept_date","chequegiro_date");
    }

    
    
    
    


}

?>
