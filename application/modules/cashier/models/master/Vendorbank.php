<?php

/**
 * Description of ClusterTran
 *
 * @author MIS
 */
class Cashier_Models_Master_Vendorbank extends Cashier_Box_Models_ObjectEmbedData {

    private $vendor_bankacc_id;
    private $vendor_id;
    private $seq_no;
    private $bank_id;
    private $currency;
    private $bank_account_name;
    private $bank_account_no;
    private $remarks;
    private $addby;
    private $addon;
    private $modiby;
    private $modion;
    private $deleted;
    private $deleteby;
    private $deleteon;
    private $active;
    private $inactiveby;
    private $inactiveon;
    private $bank_name;
    private $currency_name;


    public function __construct() {
        parent::__construct();
        $this->embedPrefix = 'vendorbank_';
    }
    
    function getCurrency_name() {
        return $this->currency_name;
    }

    function setCurrency_name($currency_name) {
        $this->currency_name = $currency_name;
    }

        
    function getBank_name() {
        return $this->bank_name;
    }

    function setBank_name($bank_name) {
        $this->bank_name = $bank_name;
    }

        function getVendor_bankacc_id() {
        return $this->vendor_bankacc_id;
    }

    function getVendor_id() {
        return $this->vendor_id;
    }

    function getSeq_no() {
        return $this->seq_no;
    }

    function getBank_id() {
        return $this->bank_id;
    }

    function getCurrency() {
        return $this->currency;
    }

    function getBank_account_name() {
        return $this->bank_account_name;
    }

    function getBank_account_no() {
        return $this->bank_account_no;
    }

    function getRemarks() {
        return $this->remarks;
    }

    function getAddby() {
        return $this->addby;
    }

    function getAddon() {
        return $this->addon;
    }

    function getModiby() {
        return $this->modiby;
    }

    function getModion() {
        return $this->modion;
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

    function getActive() {
        return $this->active;
    }

    function getInactiveby() {
        return $this->inactiveby;
    }

    function getInactiveon() {
        return $this->inactiveon;
    }

    function setVendor_bankacc_id($vendor_bankacc_id) {
        $this->vendor_bankacc_id = $vendor_bankacc_id;
    }

    function setVendor_id($vendor_id) {
        $this->vendor_id = $vendor_id;
    }

    function setSeq_no($seq_no) {
        $this->seq_no = $seq_no;
    }

    function setBank_id($bank_id) {
        $this->bank_id = $bank_id;
    }

    function setCurrency($currency) {
        $this->currency = $currency;
    }

    function setBank_account_name($bank_account_name) {
        $this->bank_account_name = $bank_account_name;
    }

    function setBank_account_no($bank_account_no) {
        $this->bank_account_no = $bank_account_no;
    }

    function setRemarks($remarks) {
        $this->remarks = $remarks;
    }

    function setAddby($addby) {
        $this->addby = $addby;
    }

    function setAddon($addon) {
        $this->addon = $addon;
    }

    function setModiby($modiby) {
        $this->modiby = $modiby;
    }

    function setModion($modion) {
        $this->modion = $modion;
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

    function setActive($active) {
        $this->active = $active;
    }

    function setInactiveby($inactiveby) {
        $this->inactiveby = $inactiveby;
    }

    function setInactiveon($inactiveon) {
        $this->inactiveon = $inactiveon;
    }

            
        public function setArrayTable($dataArray = NULL) {
        parent::setArrayTable($dataArray);
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;
        if (isset($x['vendor_bankacc_id'])) { $this->setVendor_bankacc_id($x['vendor_bankacc_id']); }
        if (isset($x['vendor_id'])) { $this->setVendor_id($x['vendor_id']); }
        if (isset($x['seq_no'])) { $this->setSeq_no($x['seq_no']); }
        if (isset($x['bank_id'])) { $this->setBank_id($x['bank_id']); }
        if (isset($x['currency'])) { $this->setCurrency($x['currency']); }
        if (isset($x['bank_account_name'])) { $this->setBank_account_name($x['bank_account_name']); }
        if (isset($x['bank_account_no'])) { $this->setBank_account_no($x['bank_account_no']); }
        if (isset($x['remarks'])) { $this->setRemarks($x['remarks']); }
        if (isset($x['addby'])) { $this->setAddby($x['addby']); }
        if (isset($x['addon'])) { $this->setAddon($x['addon']); }
        if (isset($x['modiby'])) { $this->setModiby($x['modiby']); }
        if (isset($x['modion'])) { $this->setModion($x['modion']); }
        if (isset($x['deleted'])) { $this->setDeleted($x['deleted']); }
        if (isset($x['deleteby'])) { $this->setDeleteby($x['deleteby']); }
        if (isset($x['deleteon'])) { $this->setDeleteon($x['deleteon']); }
        if (isset($x['active'])) { $this->setActive($x['active']); }
        if (isset($x['inactiveby'])) { $this->setInactiveby($x['inactiveby']); }
        if (isset($x['inactiveon'])) { $this->setInactiveon($x['inactiveon']); }
        if (isset($x['bank_name'])) { $this->setBank_name($x['bank_name']); }
        if (isset($x['currency_name'])) { $this->setCurrency_name($x['currency_name']); }

        unset($x);
    }

    public function getArrayTable() {


        $x = array(
            'vendor_bankacc_id' => $this->getVendor_bankacc_id(),
            'vendor_id' => $this->getVendor_id(),
            'seq_no' => $this->getSeq_no(),
            'bank_id' => $this->getBank_id(),
            'currency' => $this->getCurrency(),
            'bank_account_name' => $this->getBank_account_name(),
            'bank_account_no' => $this->getBank_account_no(),
            'remarks' => $this->getRemarks(),
            'addby' => $this->getAddby(),
            'addon' => $this->getAddon(),
            'modiby' => $this->getModiby(),
            'modion' => $this->getModion(),
            'deleted' => $this->getDeleted(),
            'deleteby' => $this->getDeleteby(),
            'deleteon' => $this->getDeleteon(),
            'active' => $this->getActive(),
            'inactiveby' => $this->getInactiveby(),
            'inactiveon' => $this->getInactiveon(),
            'bank_name' => $this->getBank_name(),
            'currency_name' => $this->getCurrency_name(),

        );

        return $x;
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
