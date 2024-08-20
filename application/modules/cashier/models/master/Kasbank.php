<?php

/**
 * Description of ClusterTran
 *
 * @author MIS
 */
class Cashier_Models_Master_Kasbank extends Cashier_Box_Models_ObjectEmbedData implements Cashier_Box_Kouti_Remora, Cashier_Box_Models_Master_InterProjectPt, Cashier_Box_Delien_DelimiterCandidate {

    private $madeby;
    private $voucherno;
    private $jurnalvoucherno;
    private $chequegirono;
    private $dataflow;
    private $kasbank;
    private $chequegirostatus;
    private $kasbankdate;
    private $postingdate;
    private $chequegirodate;
    private $acceptdate;
    private $chequegiropaymentdate;
    private $chequegiroreceivedate;
    private $amount;
    private $description;
    private $fordepartment;
    private $payment;
    private $voucherID;
    private $customername;
    private $issueddate;
    private $paymentdate;
    private $cheque;
    private $detail;
    private $subdetail;
    private $kwitansiDate;
    private $bankName;
    private $paymentflag_id;
    private $receiptno;
    private $isposting;
    private $isrealized;
    private $status;
    private $duedate;
    private $ispaid;
    private $realization_date;
    private $prefixcode;
    private $voucherint;
    private $postingby;
    private $realizationby;
    private $terbilang;
    private $total_amount_cheque;
    private $cara_bayar;
    private $description_mrt;
    private $voucherdeptid;
    private $kasbondeptid;
    private $voucherdept_no;
    private $kasbondept_no;
    private $temppayment_id;
    private $is_reimburse;
    private $is_petycashloan;
    private $reimbuse;
    private $pettycashloan_kasbon_id;
    private $flag_is_reimburse;
    private $flag_is_pettycashloan;
    private $spk;
    private $userprint;
    private $terbilangamountcheque;
    private $amountkwitansi;
    private $terbilangamountkwitansi;
    private $descriptionkwitansiar;
    private $hoverdetailvoucher;
    private $masterundanganid;
    private $referenceno;
    private $virtualaccountno;
    private $paymenttype_id;
    private $kelsub_id;
    private $subgl_id;
    private $subgl_code;
    private $kpr_parsial;
    private $namapenyetor;
    private $alamatpenyetor;
    private $telppenyetor;
    private $receipt_notes;
    private $kasbank_reff_id;
    private $kasbank_reff_voucher_id;
    private $partner_kasbank_id;
    private $vid_partner_kasbank;
    private $receipt_no_spk;
    private $duedate_kwitansidate;
    private $paymentdate_issueddate;
    private $receipt_id;
    private $receipt_id_no;
    private $is_temp_realized;
    private $is_f7_convert;
    private $project_close_date;
    private $approval_rules;
    private $uploadpim_id;
    private $bank_trans_no;
    private $fp_approver_0;
    private $fp_approver_1;
    private $fp_approver_2;
    private $fp_approver_3;
    private $fp_approver_4;
    private $fp_approver_5;
    private $fp_approver_6;
    private $fp_approver_7;
    private $fp_approver_8;
    private $fp_releaser_1;
    private $fp_releaser_2;
    private $fp_releaser_3;
    private $vendor_bankacc_id;
    private $bank_reff_no;
    private $vendor_bank_name;
    private $vendor_bank_account_no;
    private $vendor_bank_account_name;
    private $vendor_bank_currency;
    private $project_id;
    private $isva;
    private $sop;
    private $jenis_spkorsop_id;
    private $spkorsop;
    private $uploadems_id;
    private $kasbank_reff_ids;
    private $addby;
    private $kwitansi_print_count;
    private $kasbondept_made_by;
    private $currency_word;
    private $datasource;
    private $uploadApiID;
    private $is_erems;
    private $amount_payment;
    private $artype_id;
    private $artype;

    public function __construct() {
        parent::__construct();
        $this->project     = new Cashier_Box_Models_Master_Project();
        $this->pt          = new Cashier_Box_Models_Master_Pt();
        $this->payment     = new Cashier_Models_Payment_Payment();
        $this->cheque      = new Cashier_Models_Master_Cheque();
        $this->embedPrefix = 'kasbank_';
        $this->detail      = array();
        $this->subdetail   = array();
        $this->session     = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }
    function getFp_approver_0() {
        return $this->fp_approver_0;
    }

    function setFp_approver_0($fp_approver_0) {
        $this->fp_approver_0 = $fp_approver_0;
    }

        
    function getVendor_bank_name() {
        return $this->vendor_bank_name;
    }

    function getVendor_bank_account_no() {
        return $this->vendor_bank_account_no;
    }

    function getVendor_bank_account_name() {
        return $this->vendor_bank_account_name;
    }

    function getVendor_bank_currency() {
        return $this->vendor_bank_currency;
    }

    function setVendor_bank_name($vendor_bank_name) {
        $this->vendor_bank_name = $vendor_bank_name;
    }

    function setVendor_bank_account_no($vendor_bank_account_no) {
        $this->vendor_bank_account_no = $vendor_bank_account_no;
    }

    function setVendor_bank_account_name($vendor_bank_account_name) {
        $this->vendor_bank_account_name = $vendor_bank_account_name;
    }

    function setVendor_bank_currency($vendor_bank_currency) {
        $this->vendor_bank_currency = $vendor_bank_currency;
    }

        
    function getBank_reff_no() {
        return $this->bank_reff_no;
    }

    function setBank_reff_no($bank_reff_no) {
        $this->bank_reff_no = $bank_reff_no;
    }

        
    function getVendor_bankacc_id() {
        return $this->vendor_bankacc_id;
    }

    function setVendor_bankacc_id($vendor_bankacc_id) {
        $this->vendor_bankacc_id = $vendor_bankacc_id;
    }

        
    function getBank_trans_no() {
        return $this->bank_trans_no;
    }

    function getFp_approver_1() {
        return $this->fp_approver_1;
    }

    function getFp_approver_2() {
        return $this->fp_approver_2;
    }

    function getFp_approver_3() {
        return $this->fp_approver_3;
    }

    function getFp_approver_4() {
        return $this->fp_approver_4;
    }

    function getFp_approver_5() {
        return $this->fp_approver_5;
    }

    function getFp_approver_6() {
        return $this->fp_approver_6;
    }

    function getFp_approver_7() {
        return $this->fp_approver_7;
    }

    function getFp_approver_8() {
        return $this->fp_approver_8;
    }

    function getFp_releaser_1() {
        return $this->fp_releaser_1;
    }

    function getFp_releaser_2() {
        return $this->fp_releaser_2;
    }

    function getFp_releaser_3() {
        return $this->fp_releaser_3;
    }

    function setBank_trans_no($bank_trans_no) {
        $this->bank_trans_no = $bank_trans_no;
    }

    function setFp_approver_1($fp_approver_1) {
        $this->fp_approver_1 = $fp_approver_1;
    }

    function setFp_approver_2($fp_approver_2) {
        $this->fp_approver_2 = $fp_approver_2;
    }

    function setFp_approver_3($fp_approver_3) {
        $this->fp_approver_3 = $fp_approver_3;
    }

    function setFp_approver_4($fp_approver_4) {
        $this->fp_approver_4 = $fp_approver_4;
    }

    function setFp_approver_5($fp_approver_5) {
        $this->fp_approver_5 = $fp_approver_5;
    }

    function setFp_approver_6($fp_approver_6) {
        $this->fp_approver_6 = $fp_approver_6;
    }

    function setFp_approver_7($fp_approver_7) {
        $this->fp_approver_7 = $fp_approver_7;
    }

    function setFp_approver_8($fp_approver_8) {
        $this->fp_approver_8 = $fp_approver_8;
    }

    function setFp_releaser_1($fp_releaser_1) {
        $this->fp_releaser_1 = $fp_releaser_1;
    }

    function setFp_releaser_2($fp_releaser_2) {
        $this->fp_releaser_2 = $fp_releaser_2;
    }

    function setFp_releaser_3($fp_releaser_3) {
        $this->fp_releaser_3 = $fp_releaser_3;
    }

        
    function getApproval_rules() {
        return $this->approval_rules;
    }

    function setApproval_rules($approval_rules) {
        $this->approval_rules = $approval_rules;
    }

    function getUploadpim_id() {
        return $this->uploadpim_id;
    }

    function setUploadpim_id($uploadpim_id) {
        $this->uploadpim_id = $uploadpim_id;
    }

        
    function getProject_close_date() {
        return $this->project_close_date;
    }

    function setProject_close_date($project_close_date) {
        $this->project_close_date = $project_close_date;
    }

        function getIs_f7_convert() {
        return $this->is_f7_convert;
    }

    function setIs_f7_convert($is_f7_convert) {
        $this->is_f7_convert = $is_f7_convert;
    }

        
    function getIs_temp_realized() {
        return $this->is_temp_realized;
    }

    function setIs_temp_realized($is_temp_realized) {
        $this->is_temp_realized = $is_temp_realized;
    }

        
    function getReceipt_id() {
        return $this->receipt_id;
    }

    function getReceipt_id_no() {
        return $this->receipt_id_no;
    }

    function setReceipt_id($receipt_id) {
        $this->receipt_id = $receipt_id;
    }

    function setReceipt_id_no($receipt_id_no) {
        $this->receipt_id_no = $receipt_id_no;
    }

        
    function getReceipt_no_spk() {
        return $this->receipt_no_spk;
    }

    function getDuedate_kwitansidate() {
        return $this->duedate_kwitansidate;
    }

    function getPaymentdate_issueddate() {
        return $this->paymentdate_issueddate;
    }

    function setReceipt_no_spk($receipt_no_spk) {
        $this->receipt_no_spk = $receipt_no_spk;
    }

    function setDuedate_kwitansidate($duedate_kwitansidate) {
        $this->duedate_kwitansidate = $duedate_kwitansidate;
    }

    function setPaymentdate_issueddate($paymentdate_issueddate) {
        $this->paymentdate_issueddate = $paymentdate_issueddate;
    }

        
    function getPartner_kasbank_id() {
        return $this->partner_kasbank_id;
    }

    function getVid_partner_kasbank() {
        return $this->vid_partner_kasbank;
    }

    function setPartner_kasbank_id($partner_kasbank_id) {
        $this->partner_kasbank_id = $partner_kasbank_id;
    }

    function setVid_partner_kasbank($vid_partner_kasbank) {
        $this->vid_partner_kasbank = $vid_partner_kasbank;
    }

        
    function getKasbank_reff_voucher_id() {
        return $this->kasbank_reff_voucher_id;
    }

    function setKasbank_reff_voucher_id($kasbank_reff_voucher_id) {
        $this->kasbank_reff_voucher_id = $kasbank_reff_voucher_id;
    }

        function getKasbank_reff_id() {
        return $this->kasbank_reff_id;
    }

    function setKasbank_reff_id($kasbank_reff_id) {
        $this->kasbank_reff_id = $kasbank_reff_id;
    }

        function getKasbank_reff_ids() {
        return $this->kasbank_reff_ids;
    }

    function setKasbank_reff_ids($kasbank_reff_ids) {
        $this->kasbank_reff_ids = $kasbank_reff_ids;
    }

        function getReceipt_notes() {
        return $this->receipt_notes;
    }

    function setReceipt_notes($receipt_notes) {
        $this->receipt_notes = $receipt_notes;
    }

        function getNamapenyetor() {
        return $this->namapenyetor;
    }

    function getAlamatpenyetor() {
        return $this->alamatpenyetor;
    }

    function getTelppenyetor() {
        return $this->telppenyetor;
    }

    function setNamapenyetor($namapenyetor) {
        $this->namapenyetor = $namapenyetor;
    }

    function setAlamatpenyetor($alamatpenyetor) {
        $this->alamatpenyetor = $alamatpenyetor;
    }

    function setTelppenyetor($telppenyetor) {
        $this->telppenyetor = $telppenyetor;
    }

        
    function getKpr_parsial() {
        return $this->kpr_parsial;
    }

    function setKpr_parsial($kpr_parsial) {
        $this->kpr_parsial = $kpr_parsial;
    }

        
    function getSubgl_code() {
        return $this->subgl_code;
    }

    function setSubgl_code($subgl_code) {
        $this->subgl_code = $subgl_code;
    }

        
    function getKelsub_id() {
        return $this->kelsub_id;
    }

    function getSubgl_id() {
        return $this->subgl_id;
    }

    function setKelsub_id($kelsub_id) {
        $this->kelsub_id = $kelsub_id;
    }

    function setSubgl_id($subgl_id) {
        $this->subgl_id = $subgl_id;
    }

        
    function getPaymenttype_id() {
        return $this->paymenttype_id;
    }

    function setPaymenttype_id($paymenttype_id) {
        $this->paymenttype_id = $paymenttype_id;
    }

        
    function getVirtualaccountno() {
        return $this->virtualaccountno;
    }

    function setVirtualaccountno($virtualaccountno) {
        $this->virtualaccountno = $virtualaccountno;
    }

        
    function getReferenceno() {
        return $this->referenceno;
    }

    function setReferenceno($referenceno) {
        $this->referenceno = $referenceno;
    }

        function getHoverdetailvoucher() {
        return $this->hoverdetailvoucher;
    }

    function setHoverdetailvoucher($hoverdetailvoucher) {
        $this->hoverdetailvoucher = $hoverdetailvoucher;
    }
    function getMasterundanganid() {
        return $this->masterundanganid;
    }

    function setMasterundanganid($masterundanganid) {
        $this->masterundanganid = $masterundanganid;
    }

            function getDetail() {
        return $this->detail;
    }

    function getSubdetail() {
        return $this->subdetail;
    }

    function getDescriptionkwitansiar() {
        return $this->descriptionkwitansiar;
    }

    function setDetail($detail) {
        $this->detail = $detail;
    }

    function setSubdetail($subdetail) {
        $this->subdetail = $subdetail;
    }

    function setDescriptionkwitansiar($descriptionkwitansiar) {
        $this->descriptionkwitansiar = $descriptionkwitansiar;
    }

        
    function getFlag_is_reimburse() {
        return $this->flag_is_reimburse;
    }

    function getFlag_is_pettycashloan() {
        return $this->flag_is_pettycashloan;
    }

    function setFlag_is_reimburse($flag_is_reimburse) {
        $this->flag_is_reimburse = $flag_is_reimburse;
    }

    function setFlag_is_pettycashloan($flag_is_pettycashloan) {
        $this->flag_is_pettycashloan = $flag_is_pettycashloan;
    }

    function getIs_reimburse() {
        return $this->is_reimburse;
    }

    function getIs_petycashloan() {
        return $this->is_petycashloan;
    }

    function setIs_reimburse($is_reimburse) {
        $this->is_reimburse = $is_reimburse;
    }

    function setIs_petycashloan($is_petycashloan) {
        $this->is_petycashloan = $is_petycashloan;
    }

    function getTemppayment_id() {
        return $this->temppayment_id;
    }

    function setTemppayment_id($temppayment_id) {
        $this->temppayment_id = $temppayment_id;
    }

    function getVoucherdept_no() {
        return $this->voucherdept_no;
    }

    function getKasbondept_no() {
        return $this->kasbondept_no;
    }

    function setVoucherdept_no($voucherdept_no) {
        $this->voucherdept_no = $voucherdept_no;
    }

    function setKasbondept_no($kasbondept_no) {
        $this->kasbondept_no = $kasbondept_no;
    }

    function getVoucherdeptid() {
        return $this->voucherdeptid;
    }

    function setVoucherdeptid($voucherdeptid) {
        $this->voucherdeptid = $voucherdeptid;
    }

    function getPrefixcode() {
        return $this->prefixcode;
    }

    function getVoucherint() {
        return $this->voucherint;
    }

    function setPrefixcode($prefixcode) {
        $this->prefixcode = $prefixcode;
    }

    function setVoucherint($voucherint) {
        $this->voucherint = $voucherint;
    }

    function getMadeby() {
        return $this->madeby;
    }

    function getVoucherno() {
        return $this->voucherno;
    }

    function getJurnalvoucherno() {
        return $this->jurnalvoucherno;
    }

    function getChequegirono() {
        return $this->chequegirono;
    }

    function getDataflow() {
        return $this->dataflow;
    }

    function getKasbank() {
        return $this->kasbank;
    }

    function getChequegirostatus() {
        return $this->chequegirostatus;
    }

    function getKasbankdate() {
        return $this->kasbankdate;
    }

    function getPostingdate() {
        return $this->postingdate;
    }

    function getChequegirodate() {
        return $this->chequegirodate;
    }

    function getAcceptdate() {
        return $this->acceptdate;
    }

    function getChequegiropaymentdate() {
        return $this->chequegiropaymentdate;
    }

    function getChequegiroreceivedate() {
        return $this->chequegiroreceivedate;
    }

    function getAmount() {
        return $this->amount;
    }

    function getDescription() {
        return $this->description;
    }

    function setMadeby($madeby) {
        $this->madeby = $madeby;
    }

    function setVoucherno($voucherno) {
        $this->voucherno = $voucherno;
    }

    function setJurnalvoucherno($jurnalvoucherno) {
        $this->jurnalvoucherno = $jurnalvoucherno;
    }

    function setChequegirono($chequegirono) {
        $this->chequegirono = $chequegirono;
    }

    function setDataflow($dataflow) {
        $this->dataflow = $dataflow;
    }

    function setKasbank($kasbank) {
        $this->kasbank = $kasbank;
    }

    function setChequegirostatus($chequegirostatus) {
        $this->chequegirostatus = $chequegirostatus;
    }

    function setKasbankdate($kasbankdate) {
        $this->kasbankdate = $kasbankdate;
    }

    function setPostingdate($postingdate) {
        $this->postingdate = $postingdate;
    }

    function setChequegirodate($chequegirodate) {
        $this->chequegirodate = $chequegirodate;
    }

    function setAcceptdate($acceptdate) {
        $this->acceptdate = $acceptdate;
    }

    function setChequegiropaymentdate($chequegiropaymentdate) {
        $this->chequegiropaymentdate = $chequegiropaymentdate;
    }

    function setChequegiroreceivedate($chequegiroreceivedate) {
        $this->chequegiroreceivedate = $chequegiroreceivedate;
    }

    function setAmount($amount) {
        $this->amount = $amount;
    }

    function setDescription($description) {
        $this->description = $description;
    }

    function getFordepartment() {
        return $this->fordepartment;
    }

    function setFordepartment($fordepartment) {
        $this->fordepartment = $fordepartment;
    }

    function getVoucherID() {
        return $this->voucherID;
    }

    function setVoucherID($voucherID) {
        $this->voucherID = $voucherID;
    }

    function getCustomername() {
        return $this->customername;
    }

    function setCustomername($customername) {
        $this->customername = $customername;
    }

    function getIssueddate() {
        return $this->issueddate;
    }

    function setIssueddate($issueddate) {
        $this->issueddate = $issueddate;
    }

    function getPaymentdate() {
        return $this->paymentdate;
    }

    function setPaymentdate($paymentdate) {
        $this->paymentdate = $paymentdate;
    }

    function getPayment() {
        return $this->payment;
    }

    function setPayment(Cashier_Models_Payment_Payment $payment) {
        $this->payment = $payment;
    }

    function getCheque() {
        return $this->cheque;
    }

    function setCheque(Cashier_Models_Master_Cheque $cheque) {
        $this->cheque = $cheque;
    }

    function getKwitansiDate() {
        return $this->kwitansiDate;
    }

    function setKwitansiDate($kwitansiDate) {
        $this->kwitansiDate = $kwitansiDate;
    }

    function getBankName() {
        return $this->bankName;
    }

    function setBankName($bankName) {
        $this->bankName = $bankName;
    }

    function getPaymentflag_id() {
        return $this->paymentflag_id;
    }

    function setPaymentflag_id($paymentflag_id) {
        $this->paymentflag_id = $paymentflag_id;
    }

    function getReceiptno() {
        return $this->receiptno;
    }

    function setReceiptno($receiptno) {
        $this->receiptno = $receiptno;
    }

    function getIsposting() {
        return $this->isposting;
    }

    function getIsrealized() {
        return $this->isrealized;
    }

    function setIsposting($isposting) {
        $this->isposting = $isposting;
    }

    function setIsrealized($isrealized) {
        $this->isrealized = $isrealized;
    }

    function getStatus() {
        return $this->status;
    }

    function setStatus($status) {
        $this->status = $status;
    }

    function getDuedate() {
        return $this->duedate;
    }

    function setDuedate($duedate) {
        $this->duedate = $duedate;
    }

    function getIspaid() {
        return $this->ispaid;
    }

    function setIspaid($ispaid) {
        $this->ispaid = $ispaid;
    }

    function getRealization_date() {
        return $this->realization_date;
    }

    function setRealization_date($realization_date) {
        $this->realization_date = $realization_date;
    }

    function getPostingby() {
        return $this->postingby;
    }

    function getRealizationby() {
        return $this->realizationby;
    }

    function setPostingby($postingby) {
        $this->postingby = $postingby;
    }

    function setRealizationby($realizationby) {
        $this->realizationby = $realizationby;
    }

    function getTerbilang() {
        return $this->terbilang;
    }

    function setTerbilang($terbilang) {
        $this->terbilang = $terbilang;
    }

    function getTotal_amount_cheque() {
        return $this->total_amount_cheque;
    }

    function setTotal_amount_cheque($total_amount_cheque) {
        $this->total_amount_cheque = $total_amount_cheque;
    }

    function getCara_bayar() {
        return $this->cara_bayar;
    }

    function setCara_bayar($cara_bayar) {
        $this->cara_bayar = $cara_bayar;
    }

    function getDescription_mrt() {
        return $this->description_mrt;
    }

    function setDescription_mrt($description_mrt) {
        $this->description_mrt = $description_mrt;
    }

    function getKasbondeptid() {
        return $this->kasbondeptid;
    }

    function setKasbondeptid($kasbondeptid) {
        $this->kasbondeptid = $kasbondeptid;
    }

    function getReimbuse() {
        return $this->reimbuse;
    }

    function getPettycashloan_kasbon_id() {
        return $this->pettycashloan_kasbon_id;
    }

    function setReimbuse($reimbuse) {
        $this->reimbuse = $reimbuse;
    }

    function setPettycashloan_kasbon_id($pettycashloan_kasbon_id) {
        $this->pettycashloan_kasbon_id = $pettycashloan_kasbon_id;
    }
    
    function getSpk() {
        return $this->spk;
    }

    function setSpk($spk) {
        $this->spk = $spk;
    }

    function getTerbilangamountcheque() {
        return $this->terbilangamountcheque;
    }

    function setTerbilangamountcheque($terbilangamountcheque) {
        $this->terbilangamountcheque = $terbilangamountcheque;
    }
    function getAmountkwitansi() {
        return $this->amountkwitansi;
    }

    function getTerbilangamountkwitansi() {
        return $this->terbilangamountkwitansi;
    }

    function setAmountkwitansi($amountkwitansi) {
        $this->amountkwitansi = $amountkwitansi;
    }

    function getIsVA() {
        return $this->isva;
    }

    function setIsVA($isva) {
        $this->isva = $isva;
    }

    function setTerbilangamountkwitansi($terbilangamountkwitansi) {
        $this->terbilangamountkwitansi = $terbilangamountkwitansi;
    }
    
    function getSop() {
        return $this->sop;
    }

    function setSop($sop) {
        $this->sop = $sop;
    }
    
    function get_jenis_spkorsop_id() {
        return $this->jenis_spkorsop_id;
    }

    function set_jenis_spkorsop_id($jenis_spkorsop_id) {
        $this->jenis_spkorsop_id = $jenis_spkorsop_id;
    }
    
    function get_spkorsop() {
        return $this->spkorsop;
    }

    function set_spkorsop($spkorsop) {
        $this->spkorsop = $spkorsop;
    }

    function getUploadems_id() {
        return $this->uploadems_id;
    }

    function setUploadems_id($uploadems_id) {
        $this->uploadems_id = $uploadems_id;
    }

    function getAddby() {
        return $this->addby;
    }

    function setAddby($addby) {
        $this->addby = $addby;
    }

    function getKwitansi_print_count() {
        return $this->kwitansi_print_count;
    }

    function setKwitansi_print_count($kwitansi_print_count) {
        $this->kwitansi_print_count = $kwitansi_print_count;
    }

    function getKasbondept_made_by() {
        return $this->kasbondept_made_by;
    }

    function setKasbondept_made_by($kasbondept_made_by) {
        $this->kasbondept_made_by = $kasbondept_made_by;
    }

    function getCurrency_word() {
        return $this->currency_word;
    }

    function setCurrency_word($currency_word) {
        $this->currency_word = $currency_word;
    }

    function getDatasource() {
        return $this->datasource;
    }

    function setDatasource($datasource) {
        $this->datasource = $datasource;
    }

    function getUploadApiID() {
        return $this->uploadApiID;
    }

    function setUploadApiID($uploadApiID) {
        $this->uploadApiID = $uploadApiID;
    }

    function getIsErems() {
        return $this->is_erems;
    }

    function setIsErems($is_erems) {
        $this->is_erems = $is_erems;
    }

    function getAmountPayment() {
        return $this->amount_payment;
    }

    function setAmountPayment($amount_payment){
        $this->amount_payment = $amount_payment;
    }

    function getArtype_id() {
        return $this->artype_id;
    }

    function setArtype_id($artype_id){
        $this->artype_id = $artype_id;
    }

    function getArtype() {
        return $this->artype;
    }

    function setArtype($artype){
        $this->artype = $artype;
    }

    public function setArrayTable($dataArray = NULL) {
        parent::setArrayTable($dataArray);
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;
        
        if (isset($x['kasbank_id'])) {
            $this->setId($x['kasbank_id']);
        }

        if (isset($x['made_by'])) {
            $this->setMadeby($x['made_by']);
        }
        if (isset($x['voucher_no'])) {
            $this->setVoucherno($x['voucher_no']);
        }
        if (isset($x['journal_voucher_no'])) {
            $this->setJurnalvoucherno($x['journal_voucher_no']);
        }
        if (isset($x['chequegiro_no'])) {
            $this->setChequegirono($x['chequegiro_no']);
        }
        if (isset($x['dataflow'])) {
            $this->setDataflow($x['dataflow']);
        }
        if (isset($x['kasbank'])) {
            $this->setKasbank($x['kasbank']);
        }
        if (isset($x['is_temp_realized'])) {
            $this->setIs_temp_realized($x['is_temp_realized']);
        }
        if (isset($x['chequegiro_status'])) {
            $this->setChequegirostatus($x['chequegiro_status']);
        }
        if (isset($x['posting_date'])) {
            $this->setPostingdate($x['posting_date']);
        }
        if (isset($x['kasbank_date'])) {
            $this->setKasbankdate($x['kasbank_date']);
        }
        if (isset($x['chequegiro_date'])) {
            $this->setChequegirodate($x['chequegiro_date']);
        }
        if (isset($x['accept_date'])) {
            $this->setAcceptdate($x['accept_date']);
        }
        if (isset($x['chequegiro_payment_date'])) {
            $this->setChequegiropaymentdate($x['chequegiro_payment_date']);
        }
        if (isset($x['chequegiro_receive_date'])) {
            $this->setChequegiroreceivedate($x['chequegiro_receive_date']);
        }
        if (isset($x['amount'])) {
            $this->setAmount($x['amount']);
        }
        if (isset($x['description'])) {
            $this->setDescription($x['description']);
        }
        if (isset($x['for_department'])) {
            $this->setFordepartment($x['for_department']);
        }
        if (isset($x['voucherID'])) {
            $this->setVoucherID($x['voucherID']);
        }

        if (isset($x['customer_name'])) {
            $this->setCustomername($x['customer_name']);
        }
        if (isset($x['addon'])) {
            $this->setAddOn($x['addon']);
        }
        if (isset($x['receipt_no'])) {
            $this->setReceiptno($x['receipt_no']);
        }
        if (isset($x['is_posting'])) {
            $this->setIsposting($x['is_posting']);
        }
        if (isset($x['is_realized'])) {
            $this->setIsrealized($x['is_realized']);
        }
        if (isset($x['status'])) {
            $this->setStatus($x['status']);
        }
        if (isset($x['duedate'])) {
            $this->setDuedate($x['duedate']);
        }

        if (isset($x['payment_date'])) {
            $this->setPaymentdate($x['payment_date']);
        }
        if (isset($x['kwitansi_date'])) {
            $this->setKwitansiDate($x['kwitansi_date']);
        }
        if (isset($x['bank_name'])) {
            $this->setBankName($x['bank_name']);
        }
        if (isset($x['is_paid'])) {
            $this->setIspaid($x['is_paid']);
        }
        if (isset($x['realization_date'])) {
            $this->setRealization_date($x['realization_date']);
        }
        if (isset($x['issued_date'])) {
            $this->setIssueddate($x['issued_date']);
        }
        if (isset($x['prefixcode'])) {
            $this->setPrefixcode($x['prefixcode']);
        }
        if (isset($x['voucherint'])) {
            $this->setVoucherint($x['voucherint']);
        }
        if (isset($x['paymentflag_id'])) {
            $this->setPaymentflag_id($x['paymentflag_id']);
        }
        if (isset($x['realization_by'])) {
            $this->setRealizationby($x['realization_by']);
        }
        if (isset($x['posting_by'])) {
            $this->setPostingby($x['posting_by']);
        }
        if (isset($x['terbilang'])) {
            $this->setTerbilang($x['terbilang']);
        }
        if (isset($x['terbilang_amount_cheque'])) {
            $this->setTerbilangamountcheque($x['terbilang_amount_cheque']);
        }
        if (isset($x['total_amount_cheque'])) {
            $this->setTotal_amount_cheque($x['total_amount_cheque']);
        }
        if (isset($x['cara_bayar'])) {
            $this->setCara_bayar($x['cara_bayar']);
        }
        if (isset($x['description_mrt'])) {
            $this->setDescription_mrt($x['description_mrt']);
        }
        if (isset($x['kasbondept_id'])) {
            $this->setKasbondeptid($x['kasbondept_id']);
        }
        if (isset($x['voucherdept_id'])) {
            $this->setVoucherdeptid($x['voucherdept_id']);
        }
        if (isset($x['voucherdept_no'])) {
            $this->setVoucherdept_no($x['voucherdept_no']);
        }
        if (isset($x['kasbondept_no'])) {
            $this->setKasbondept_no($x['kasbondept_no']);
        }
        if (isset($x['temp_payment_id'])) {
            $this->setTemppayment_id($x['temp_payment_id']);
        }
        if (isset($x['is_reimburse'])) {
            $this->setIs_reimburse($x['is_reimburse']);
        }
        if (isset($x['is_pettycashloan'])) {
            $this->setIs_petycashloan($x['is_pettycashloan']);
        }
        if (isset($x['reimburse'])) {
            $this->setReimbuse($x['reimburse']);
        }
        if (isset($x['pettycashloan'])) {
            $this->setPettycashloan_kasbon_id($x['pettycashloan']);
        }
        if (isset($x['flag_is_pettycashloan'])) {
            $this->setFlag_is_pettycashloan($x['flag_is_pettycashloan']);
        }
        if (isset($x['flag_is_reimburse'])) {
            $this->setFlag_is_reimburse($x['flag_is_reimburse']);
        }
        if (isset($x['spk'])) {
            $this->setSpk($x['spk']);
        }
        if (isset($x['amount_kwitansi'])) {
            $this->setAmountkwitansi($x['amount_kwitansi']);
        }
        if (isset($x['terbilang_amount_kwitansi'])) {
            $this->setTerbilangamountkwitansi($x['terbilang_amount_kwitansi']);
        }
        if (isset($x['description_kwitansi_ar'])) {
            $this->setDescriptionkwitansiar($x['description_kwitansi_ar']);
        }
        if (isset($x['hover_detail_voucher'])) {
            $this->setHoverdetailvoucher($x['hover_detail_voucher']);
        }
        if (isset($x['master_undangan_id'])) {
            $this->setMasterundanganid($x['master_undangan_id']);
        }
        if (isset($x['reference_no'])) {
            $this->setReferenceno($x['reference_no']);
        }
        if (isset($x['virtualaccount_no'])) {
            $this->setVirtualaccountno($x['virtualaccount_no']);
        }
        if (isset($x['paymentflag_id'])) {
            $this->setPaymentflag_id($x['paymentflag_id']);
        }
        if (isset($x['kelsub_id'])) {
            $this->setKelsub_id($x['kelsub_id']);
        }
        if (isset($x['subgl_id'])) {
            $this->setSubgl_id($x['subgl_id']);
        }
        if (isset($x['subgl_code'])) {
            $this->setSubgl_code($x['subgl_code']);
        }
        if (isset($x['kpr_parsial'])) {
            $this->setKpr_parsial($x['kpr_parsial']);
        }
        if (isset($x['namapenyetor'])) {
            $this->setNamapenyetor($x['namapenyetor']);
        }
        if (isset($x['alamatpenyetor'])) {
            $this->setAlamatpenyetor($x['alamatpenyetor']);
        }
        if (isset($x['telppenyetor'])) {
            $this->setTelppenyetor($x['telppenyetor']);
        }
        if (isset($x['receipt_notes'])) {
            $this->setReceipt_notes($x['receipt_notes']);
        }
        if (isset($x['kasbank_reff_id'])) {
            $this->setKasbank_reff_id($x['kasbank_reff_id']);
        }
        if (isset($x['kasbank_reff_ids'])) {
            $this->setKasbank_reff_ids($x['kasbank_reff_ids']);
        }
        if (isset($x['kasbank_reff_voucher_id'])) {
            $this->setKasbank_reff_voucher_id($x['kasbank_reff_voucher_id']);
        }
        if (isset($x['partner_kasbank_id'])) {
            $this->setPartner_kasbank_id($x['partner_kasbank_id']);
        }
        if (isset($x['vid_partner_kasbank'])) {
            $this->setVid_partner_kasbank($x['vid_partner_kasbank']);
        }
        if (isset($x['receipt_no_spk'])) {
            $this->setReceipt_no_spk($x['receipt_no_spk']);
        }
        if (isset($x['duedate_kwitansidate'])) {
            $this->setDuedate_kwitansidate($x['duedate_kwitansidate']);
        }
        if (isset($x['paymentdate_issueddate'])) {
            $this->setPaymentdate_issueddate($x['paymentdate_issueddate']);
        }
        if (isset($x['receipt_id'])) {
            $this->setReceipt_id($x['receipt_id']);
        }
        if (isset($x['receipt_id_no'])) {
            $this->setReceipt_id_no($x['receipt_id_no']);
        }
        if (isset($x['is_f7_convert'])) {
            $this->setIs_f7_convert($x['is_f7_convert']);
        }
        if (isset($x['approval_rules'])) {
            $this->setApproval_rules($x['approval_rules']);
        }
        if (isset($x['uploadpim_id'])) {
            $this->setUploadpim_id($x['uploadpim_id']);
        }
        if (isset($x['bank_trans_no'])) {
            $this->setBank_trans_no($x['bank_trans_no']);
        }
        if (isset($x['fp_approver_0'])) {
            $this->setFp_approver_0($x['fp_approver_0']);
        }
        if (isset($x['fp_approver_1'])) {
            $this->setFp_approver_1($x['fp_approver_1']);
        }
        if (isset($x['fp_approver_2'])) {
            $this->setFp_approver_2($x['fp_approver_2']);
        }
        if (isset($x['fp_approver_3'])) {
            $this->setFp_approver_3($x['fp_approver_3']);
        }
        if (isset($x['fp_approver_4'])) {
            $this->setFp_approver_4($x['fp_approver_4']);
        }
        if (isset($x['fp_approver_5'])) {
            $this->setFp_approver_5($x['fp_approver_5']);
        }
        if (isset($x['fp_approver_6'])) {
            $this->setFp_approver_6($x['fp_approver_6']);
        }
        if (isset($x['fp_approver_7'])) {
            $this->setFp_approver_7($x['fp_approver_7']);
        }
        if (isset($x['fp_approver_8'])) {
            $this->setFp_approver_8($x['fp_approver_8']);
        }
        if (isset($x['fp_releaser_1'])) {
            $this->setFp_releaser_1($x['fp_releaser_1']);
        }
        if (isset($x['fp_releaser_2'])) {
            $this->setFp_releaser_2($x['fp_releaser_2']);
        }
        if (isset($x['fp_releaser_3'])) {
            $this->setFp_releaser_3($x['fp_releaser_3']);
        }
        if (isset($x['vendor_bankacc_id'])) {
            $this->setVendor_bankacc_id($x['vendor_bankacc_id']);
        }
        if (isset($x['bank_reff_no'])) {
            $this->setBank_reff_no($x['bank_reff_no']);
        }
        if (isset($x['vendor_bank_name'])) {
            $this->setVendor_bank_name($x['vendor_bank_name']);
        }
        if (isset($x['vendor_bank_account_no'])) {
            $this->setVendor_bank_account_no($x['vendor_bank_account_no']);
        }
        if (isset($x['vendor_bank_account_name'])) {
            $this->setVendor_bank_account_name($x['vendor_bank_account_name']);
        }
        if (isset($x['vendor_bank_currency'])) {
            $this->setVendor_bank_currency($x['vendor_bank_currency']);
        }
        if (isset($x['project_project_id'])) {
            $this->setProject_id($x['project_project_id']);
        }
        
        if (isset($x['is_va'])) {
            $this->setIsVA($x['is_va']);
        }
        if (isset($x['sop'])) {
            $this->setSop($x['sop']);
        }
        if (isset($x['jenis_spkorsop_id'])) {
            $this->set_jenis_spkorsop_id($x['jenis_spkorsop_id']);
        }
        if (isset($x['spkorsop'])) {
            $this->set_spkorsop($x['spkorsop']);
        }
        if (isset($x['uploadems_id'])) {
            $this->setUploadems_id($x['uploadems_id']);
        }
        if (isset($x['addby'])) {
            $this->setAddby($x['addby']);
        }
        if (isset($x['kwitansi_print_count'])) {
            $this->setKwitansi_print_count($x['kwitansi_print_count']);
        }
        if (isset($x['kasbondept_made_by'])) {
            $this->setKasbondept_made_by($x['kasbondept_made_by']);
        }
        if (isset($x['currency_word'])) {
            $this->setCurrency_word($x['currency_word']);
        }
        if (isset($x['datasource'])) {
            $this->setDatasource($x['datasource']);
        }
        if (isset($x['uploadApiID'])) {
            $this->setUploadApiID($x['uploadApiID']);
        }
        if (isset($x['is_erems'])) {
            $this->setIsErems($x['is_erems']);
        }
        if (isset($x['amount_payment'])) {
            $this->setAmountPayment($x['amount_payment']);
        }
        if (isset($x['artype_id'])) {
            $this->setArtype_id($x['artype_id']);
        }
        if (isset($x['artype'])) {
            $this->setArtype($x['artype']);
        }


        $this->setUserprint($this->session->getUserFullname());
        unset($x);
    }

    public function getArrayTable() {

        $terbilangcheque = Erems_Box_Library_Terbilang::terbilang($this->getTotal_amount_cheque(), 3);
        $pecah           = explode(" ",$terbilangcheque);
        $terbilang1      = "";
        $terbilang2      = "";

        $batas = 7;

        if ($this->getProject_id() == 6) {
            $batas = 8; 
        }

        if ($this->getProject_id() == 4046) {
            $batas = 10;
        }
        
        for ( $i = 0; $i < count( $pecah ); $i++ ) {
            if($i<=$batas){
                $terbilang1 = $terbilang1." ".$pecah[$i];
            }else{
                $terbilang2 = $terbilang2." ".$pecah[$i];
            }
        }
        $x = array(
            "kasbank_id"                => $this->getId(),
            "journal_voucher_no"        => $this->getJurnalvoucherno(),
            "accept_date"               => $this->getAcceptdate(),
            "made_by"                   => $this->getMadeby(),
            "voucher_no"                => $this->getVoucherno(),
            "chequegiro_no"             => $this->getChequegirono(),
            "dataflow"                  => $this->getDataflow(),
            "kasbank"                   => $this->getKasbank(),
            "chequegiro_status"         => $this->getChequegirostatus(),
            "posting_date"              => $this->getPostingdate(),
            "kasbank_date"              => Cashier_Box_Tools::formatDate($this->getKasbankdate(), 'Y-m-d'),
            "chequegiro_date"           => $this->getChequegirodate(),
            "chequegiro_payment_date"   => $this->getChequegiropaymentdate(),
            "chequegiro_receive_date"   => $this->getChequegiroreceivedate(),
            "amount"                    => (float) $this->getAmount(),
            "for_department"            => $this->getFordepartment(),
            "voucherID"                 => $this->getVoucherID(),
            "customer_name"             => $this->getCustomername(),
            "addon"                     => $this->getAddOn(),
            "payment_date"              => $this->getPaymentdate(),
            "kwitansi_date"             => $this->getKwitansiDate(),
            "bank_name"                 => $this->getBankName(),
            "paymentflag_id"            => $this->getPaymentflag_id(),
            "receipt_no"                => $this->getReceiptno(),
            "is_posting"                => $this->getIsposting(),
            "is_realized"               => $this->getIsrealized(),
            "status"                    => $this->getStatus(),
            "duedate"                   => $this->getDuedate(),
            "is_paid"                   => $this->getIspaid(),
            "realization_date"          => $this->getRealization_date(),
            "issued_date"               => $this->getIssueddate(),
            "prefixcode"                => $this->getPrefixcode(),
            "voucherint"                => $this->getVoucherint(),
            "description"               => mb_convert_encoding($this->getDescription(),'HTML-ENTITIES','utf-8'),
            "realization_by"            => $this->getRealizationby(),
            "posting_by"                => $this->getPostingby(),
            "CUSTOMER"                  => $this->getCustomername(),
            "is_temp_realized"          => $this->getIs_temp_realized(),
            "TYPE"                      => $this->getDataflow() === "I" ? "CASH IN" : "CASH OUT",
            "terbilang"                 => Erems_Box_Library_Terbilang::terbilang($this->getAmount(), 3),
            "cara_bayar"                => $this->getCara_bayar(),
            "total_amount_cheque"       => $this->getTotal_amount_cheque(),
            "terbilang_amount_cheque"   => Erems_Box_Library_Terbilang::terbilang($this->getTotal_amount_cheque(), 3),
            "description_mrt"           => mb_convert_encoding($this->getDescription_mrt(),'HTML-ENTITIES','utf-8'),
            "kasbondept_id"             => $this->getKasbondeptid(),
            "voucherdept_id"            => $this->getVoucherdeptid(),
            "voucherdept_no"            => $this->getVoucherdept_no(),
            "kasbondept_no"             => $this->getKasbondept_no(),
            "temp_payment_id"           => $this->getTemppayment_id(),
            "is_reimburse"              => $this->getIs_reimburse(),
            "is_pettycashloan"          => $this->getIs_petycashloan(),
            "reimbuse"                  => $this->getReimbuse(),
            "pettycashloan"             => $this->getPettycashloan_kasbon_id(),
            "flag_is_reimburse"         => $this->getFlag_is_reimburse() ? 1 : 0,
            "flag_is_pettycashloan"     => $this->getFlag_is_pettycashloan(),
            "spk"                       => $this->getSpk(),
            "userprint"                 => $this->getUserprint(),
            "amount_kwitansi"           => $this->getAmountkwitansi(),
            "terbilang_amount_kwitansi" => Erems_Box_Library_Terbilang::terbilang($this->getAmountkwitansi(), 3),
            "description_kwitansi_ar"   => mb_convert_encoding($this->getDescriptionkwitansiar(),'HTML-ENTITIES','utf-8')==""?mb_convert_encoding($this->getDescription_mrt(),'HTML-ENTITIES','utf-8'):mb_convert_encoding($this->getDescriptionkwitansiar(),'HTML-ENTITIES','utf-8'),
            "hover_detail_voucher"      => mb_convert_encoding($this->getHoverdetailvoucher(),'HTML-ENTITIES','utf-8'),
            "terbilang_amount_cheque1"  => $terbilang1,
            "terbilang_amount_cheque2"  => $terbilang2,
            "master_undangan_id"        => $this->getMasterundanganid(),
            "reference_no"              => $this->getReferenceno(),
            "virtualaccount_no"         => $this->getVirtualaccountno(),
            "paymenttype_id"            => $this->getPaymenttype_id(),
            "subgl_id"                  => $this->getSubgl_id(),
            "subgl_code"                => $this->getSubgl_code(),
            "kelsub_id"                 => $this->getKelsub_id(),
            "kpr_parsial"               => $this->getKpr_parsial(),
            "namapenyetor"              => $this->getNamapenyetor(),
            "alamatpenyetor"            => $this->getAlamatpenyetor(),
            "telppenyetor"              => $this->getTelppenyetor(),
            "receipt_notes"             => mb_convert_encoding($this->getReceipt_notes(),'HTML-ENTITIES','utf-8'),
            "kasbank_reff_id"           => $this->getKasbank_reff_id(),
            "kasbank_reff_ids"          => $this->getKasbank_reff_ids(),
            "kasbank_reff_voucher_id"   => $this->getKasbank_reff_voucher_id(),
            "partner_kasbank_id"        => $this->getPartner_kasbank_id(),
            "vid_partner_kasbank"       => $this->getVid_partner_kasbank(),
            "receipt_no_spk"            => $this->getReceipt_no_spk(),
            "duedate_kwitansidate"      => $this->getDuedate_kwitansidate(),
            "paymentdate_issueddate"    => $this->getPaymentdate_issueddate(),
            "receipt_id"                => $this->getReceipt_id(),
            "receipt_id_no"             => $this->getReceipt_id_no(),
            "is_f7_convert"             => $this->getIs_f7_convert(),
            "approval_rules"            => $this->getApproval_rules(),
            "uploadpim_id"              => $this->getUploadpim_id(),
            "bank_trans_no"             => $this->getBank_trans_no(),
            "fp_approver_0"             => $this->getFp_approver_0(),
            "fp_approver_1"             => $this->getFp_approver_1(),
            "fp_approver_2"             => $this->getFp_approver_2(),
            "fp_approver_3"             => $this->getFp_approver_3(),
            "fp_approver_4"             => $this->getFp_approver_4(),
            "fp_approver_5"             => $this->getFp_approver_5(),
            "fp_approver_6"             => $this->getFp_approver_6(),
            "fp_approver_7"             => $this->getFp_approver_7(),
            "fp_approver_8"             => $this->getFp_approver_8(),
            "fp_releaser_1"             => $this->getFp_releaser_1(),
            "fp_releaser_2"             => $this->getFp_releaser_2(),
            "fp_releaser_3"             => $this->getFp_releaser_3(),
            "vendor_bankacc_id"         => $this->getVendor_bankacc_id(),
            "bank_reff_no"              => $this->getBank_reff_no(),
            "vendor_bank_name"          => $this->getVendor_bank_name(),
            "vendor_bank_account_no"    => $this->getVendor_bank_account_no(),
            "vendor_bank_account_name"  => $this->getVendor_bank_account_name(),
            "vendor_bank_currency"      => $this->getVendor_bank_currency(),
            "is_va"                     => $this->getIsVA(),
            "sop"                       => $this->getSop(),
            "jenis_spkorsop_id"         => $this->get_jenis_spkorsop_id(),
            "spkorsop"                  => $this->get_spkorsop(),
            "uploadems_id"              => $this->getUploadems_id(),
            "addby"                     => $this->getAddby(),
            "kwitansi_print_count"      => $this->getKwitansi_print_count(),
            "kasbondept_made_by"        => $this->getKasbondept_made_by(),
            "currency_word"             => $this->getCurrency_word(),
            "datasource"                => $this->getDatasource(),
            "uploadApiID"               => $this->getUploadApiID(),
            "is_erems"                  => $this->getIsErems(),
            "amount_payment"            => $this->getAmountPayment(),
            "artype_id"                 => $this->getArtype_id(),
            "artype"                    => $this->getArtype()
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
        return array($this->getProject(), $this->getPt(), $this->getPayment(), $this->getCheque());
    }

    protected function getDatefields() {
        $x = parent::getDatefields();
        return array_merge($x, array("Modion", "Addon", 'chequegiro_date', 'accept_date', 'chequegiro_payment_date', 'chequegiro_receive_date', 'chequegiro_reject_date', 'chequegiro_release_date', 'journal_voucher_date'));
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
    function getUserprint() {
        return $this->userprint;
    }

    function setUserprint($userprint) {
        $this->userprint = $userprint;
    }



    /**
     * Get the value of project_id
     */ 
    public function getProject_id()
    {
        return $this->project_id;
    }

    /**
     * Set the value of project_id
     *
     * @return  self
     */ 
    public function setProject_id($project_id)
    {
        $this->project_id = $project_id;

        return $this;
    }
}

?>
