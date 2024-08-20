<?php

/**
 * Description of ClusterTran
 *
 * @author MIS
 */
class Cashier_Models_Master_Corporatepaydetail extends Cashier_Box_Models_ObjectEmbedData implements Cashier_Box_Kouti_Remora, Cashier_Box_Models_Master_InterProjectPt, Cashier_Box_Delien_DelimiterCandidate {
    
    private $corporatepaydetail_id;
    private $kasbank_id;
    private $vid;
    private $voucher_no;
    private $vendor_id;
    private $vendor_name;
    private $vendor_bankacc_id;
    private $vendor_bank_name;
    private $vendor_bank_account_name;
    private $vendor_bank_account_no;
    private $vendor_bank_currency;
    private $description;
    private $amount;
    private $emails;
    private $beneficiary_address;
    private $active;
    private $addon;
    private $addby;
    private $deleted;
    private $deleteby;
    private $deleteon;
    private $modion;
    private $modiby;
    private $bank_code;
    private $short_description;


    public function __construct() {
        parent::__construct();
        $this->project = new Cashier_Box_Models_Master_Project();
        $this->pt = new Cashier_Box_Models_Master_Pt();
        $this->embedPrefix = 'corporatepaydetail_';
    }
    
    function getCorporatepaydetail_id() {
        return $this->corporatepaydetail_id;
    }

    function getKasbank_id() {
        return $this->kasbank_id;
    }

    function getVid() {
        return $this->vid;
    }

    function getVoucher_no() {
        return $this->voucher_no;
    }

    function getVendor_id() {
        return $this->vendor_id;
    }

    function getVendor_name() {
        return $this->vendor_name;
    }

    function getVendor_bankacc_id() {
        return $this->vendor_bankacc_id;
    }

    function getVendor_bank_name() {
        return $this->vendor_bank_name;
    }

    function getVendor_bank_account_name() {
        return $this->vendor_bank_account_name;
    }

    function getVendor_bank_account_no() {
        return $this->vendor_bank_account_no;
    }

    function getVendor_bank_currency() {
        return $this->vendor_bank_currency;
    }

    function getDescription() {
        return $this->description;
    }

    function getAmount() {
        return $this->amount;
    }

    function getEmails() {
        return $this->emails;
    }

    function getBeneficiary_address() {
        return $this->beneficiary_address;
    }

    function getActive() {
        return $this->active;
    }

    function getAddon() {
        return $this->addon;
    }

    function getAddby() {
        return $this->addby;
    }

    function getDeleted() {
        return $this->deleted;
    }

    function getDeleteby() {
        return $this->deleteby;
    }

    function getDeleteon() {
        return $this->deleteon;
    }

    function getModion() {
        return $this->modion;
    }

    function getModiby() {
        return $this->modiby;
    }

    function getBank_code() {
        return $this->bank_code;
    }

    function getShort_description() {
        return $this->short_description;
    }

    function setCorporatepaydetail_id($corporatepaydetail_id) {
        $this->corporatepaydetail_id = $corporatepaydetail_id;
    }

    function setKasbank_id($kasbank_id) {
        $this->kasbank_id = $kasbank_id;
    }

    function setVid($vid) {
        $this->vid = $vid;
    }

    function setVoucher_no($voucher_no) {
        $this->voucher_no = $voucher_no;
    }

    function setVendor_id($vendor_id) {
        $this->vendor_id = $vendor_id;
    }

    function setVendor_name($vendor_name) {
        $this->vendor_name = $vendor_name;
    }

    function setVendor_bankacc_id($vendor_bankacc_id) {
        $this->vendor_bankacc_id = $vendor_bankacc_id;
    }

    function setVendor_bank_name($vendor_bank_name) {
        $this->vendor_bank_name = $vendor_bank_name;
    }

    function setVendor_bank_account_name($vendor_bank_account_name) {
        $this->vendor_bank_account_name = $vendor_bank_account_name;
    }

    function setVendor_bank_account_no($vendor_bank_account_no) {
        $this->vendor_bank_account_no = $vendor_bank_account_no;
    }

    function setVendor_bank_currency($vendor_bank_currency) {
        $this->vendor_bank_currency = $vendor_bank_currency;
    }

    function setDescription($description) {
        $this->description = $description;
    }

    function setAmount($amount) {
        $this->amount = $amount;
    }

    function setEmails($emails) {
        $this->emails = $emails;
    }

    function setBeneficiary_address($beneficiary_address) {
        $this->beneficiary_address = $beneficiary_address;
    }

    function setActive($active) {
        $this->active = $active;
    }

    function setAddon($addon) {
        $this->addon = $addon;
    }

    function setAddby($addby) {
        $this->addby = $addby;
    }

    function setDeleted($deleted) {
        $this->deleted = $deleted;
    }

    function setDeleteby($deleteby) {
        $this->deleteby = $deleteby;
    }

    function setDeleteon($deleteon) {
        $this->deleteon = $deleteon;
    }

    function setModion($modion) {
        $this->modion = $modion;
    }

    function setModiby($modiby) {
        $this->modiby = $modiby;
    }

    function setBank_code($bank_code) {
        $this->bank_code = $bank_code;
    }

    function setShort_description($short_description) {
        $this->short_description = $short_description;
    }

    public function setArrayTable($dataArray = NULL) {
        parent::setArrayTable($dataArray);
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;
        
        if (isset($x['corporatepaydetail_id'])) { $this->setCorporatepaydetail_id($x['corporatepaydetail_id']); }
        if (isset($x['kasbank_id'])) { $this->setKasbank_id($x['kasbank_id']); }
        if (isset($x['vid'])) { $this->setVid($x['vid']); }
        if (isset($x['voucher_no'])) { $this->setVoucher_no($x['voucher_no']); }
        if (isset($x['vendor_id'])) { $this->setVendor_id($x['vendor_id']); }
        if (isset($x['vendor_name'])) { $this->setVendor_name($x['vendor_name']); }
        if (isset($x['vendor_bankacc_id'])) { $this->setVendor_bankacc_id($x['vendor_bankacc_id']); }
        if (isset($x['vendor_bank_name'])) { $this->setVendor_bank_name($x['vendor_bank_name']); }
        if (isset($x['vendor_bank_account_name'])) { $this->setVendor_bank_account_name($x['vendor_bank_account_name']); }
        if (isset($x['vendor_bank_account_no'])) { $this->setVendor_bank_account_no($x['vendor_bank_account_no']); }
        if (isset($x['vendor_bank_currency'])) { $this->setVendor_bank_currency($x['vendor_bank_currency']); }
        if (isset($x['description'])) { $this->setDescription($x['description']); }
        if (isset($x['amount'])) { $this->setAmount($x['amount']); }
        if (isset($x['emails'])) { $this->setEmails($x['emails']); }
        if (isset($x['beneficiary_address'])) { $this->setBeneficiary_address($x['beneficiary_address']); }
        if (isset($x['active'])) { $this->setActive($x['active']); }
        if (isset($x['addon'])) { $this->setAddon($x['addon']); }
        if (isset($x['addby'])) { $this->setAddby($x['addby']); }
        if (isset($x['deleted'])) { $this->setDeleted($x['deleted']); }
        if (isset($x['deleteby'])) { $this->setDeleteby($x['deleteby']); }
        if (isset($x['deleteon'])) { $this->setDeleteon($x['deleteon']); }
        if (isset($x['modion'])) { $this->setModion($x['modion']); }
        if (isset($x['modiby'])) { $this->setModiby($x['modiby']); }
        if (isset($x['bank_code'])) { $this->setBank_code($x['bank_code']); }
        if (isset($x['short_description'])) { $this->setShort_description($x['short_description']); }


        unset($x);
    }

    public function getArrayTable() {


        $x = array(
            'corporatepaydetail_id' => $this->getCorporatepaydetail_id(),
            'kasbank_id' => $this->getKasbank_id(),
            'vid' => $this->getVid(),
            'voucher_no' => $this->getVoucher_no(),
            'vendor_id' => $this->getVendor_id(),
            'vendor_name' => $this->getVendor_name(),
            'vendor_bankacc_id' => $this->getVendor_bankacc_id(),
            'vendor_bank_name' => $this->getVendor_bank_name(),
            'vendor_bank_account_name' => $this->getVendor_bank_account_name(),
            'vendor_bank_account_no' => $this->getVendor_bank_account_no(),
            'vendor_bank_currency' => $this->getVendor_bank_currency(),
            'description' => $this->getDescription(),
            'amount' => $this->getAmount(),
            'emails' => $this->getEmails(),
            'beneficiary_address' => $this->getBeneficiary_address(),
            'active' => $this->getActive(),
            'addon' => $this->getAddon(),
            'addby' => $this->getAddby(),
            'deleted' => $this->getDeleted(),
            'deleteby' => $this->getDeleteby(),
            'deleteon' => $this->getDeleteon(),
            'modion' => $this->getModion(),
            'modiby' => $this->getModiby(),
            'bank_code' => $this->getBank_code(),
            'short_description' => $this->getShort_description(),


        );

        return $x;
    }

    public function grouped() {
        return array($this->getProject(), $this->getPt());
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
