<?php

/**
 * Description of ClusterTran
 *
 * @author MIS
 */
class Cashier_Models_Transaction_Voucherdetail extends Cashier_Box_Models_ObjectEmbedData implements Cashier_Box_Kouti_Remora, Cashier_Box_Models_Master_InterProjectPt, Cashier_Box_Delien_DelimiterCandidate {

    private $indexdata;
    private $cashflowtype;
    private $subgl;
    private $remarks;
    private $amount;
    private $coa;
    private $kelsub;
    private $receiptno;
    private $cashflow;
    private $descriptionSub;
    private $excludekwitansi;
    private $isppn;
    private $ispph;
    private $ppnpercentage;
    private $pphpercentage;
    private $ppntipepajakdetailid;
    private $pphtipepajakdetailid;
    private $isems;
    private $iscpms;
    private $penggabungancoa;
    private $persentase;
    private $status;
    private $kasbondeptid;
    private $kasbondeptno;
    private $ordercopy;
    private $is_upload;
    private $is_pim;
    private $coa_coa_id_cf;
    
    
    public function __construct() {
        parent::__construct();
        $this->project = new Cashier_Box_Models_Master_Project();
        $this->pt = new Cashier_Box_Models_Master_Pt();
        $this->coa = new Cashier_Models_Master_Coa();
        $this->kelsub = new Cashier_Models_Master_Kelsub();
        $this->cashflow = new Cashier_Models_Master_Cashflow();
        $this->cashflowtype = new Cashier_Models_Master_Cashflowtype();
        $this->subgl = new Cashier_Models_Master_SubLedger();
        $this->embedPrefix = 'voucherdetail_';
    }
    
    function getIs_pim() {
        return $this->is_pim;
    }

    function setIs_pim($is_pim) {
        $this->is_pim = $is_pim;
    }

        function getIs_upload() {
        return $this->is_upload;
    }

    function setIs_upload($is_upload) {
        $this->is_upload = $is_upload;
    }

        function getOrdercopy() {
        return $this->ordercopy;
    }

    function setOrdercopy($ordercopy) {
        $this->ordercopy = $ordercopy;
    }

        
    function getKasbondeptno() {
        return $this->kasbondeptno;
    }

    function setKasbondeptno($kasbondeptno) {
        $this->kasbondeptno = $kasbondeptno;
    }

        
    function getKasbondeptid() {
        return $this->kasbondeptid;
    }

    function setKasbondeptid($kasbondeptid) {
        $this->kasbondeptid = $kasbondeptid;
    }

        
    function getStatus() {
        return $this->status;
    }

    function setStatus($status) {
        $this->status = $status;
    }

        
    function getPersentase() {
        return $this->persentase;
    }

    function setPersentase($persentase) {
        $this->persentase = $persentase;
    }

        
    function getPenggabungancoa() {
        return $this->penggabungancoa;
    }

    function setPenggabungancoa($penggabungancoa) {
        $this->penggabungancoa = $penggabungancoa;
    }

        
    function getIscpms() {
        return $this->iscpms;
    }

    function setIscpms($iscpms) {
        $this->iscpms = $iscpms;
    }

        function getIsems() {
        return $this->isems;
    }

    function setIsems($isems) {
        $this->isems = $isems;
    }

        function getPpnpercentage() {
        return $this->ppnpercentage;
    }

    function getPphpercentage() {
        return $this->pphpercentage;
    }

    function getPpntipepajakdetailid() {
        return $this->ppntipepajakdetailid;
    }

    function getPphtipepajakdetailid() {
        return $this->pphtipepajakdetailid;
    }

    function setPpnpercentage($ppnpercentage) {
        $this->ppnpercentage = $ppnpercentage;
    }

    function setPphpercentage($pphpercentage) {
        $this->pphpercentage = $pphpercentage;
    }

    function setPpntipepajakdetailid($ppntipepajakdetailid) {
        $this->ppntipepajakdetailid = $ppntipepajakdetailid;
    }

    function setPphtipepajakdetailid($pphtipepajakdetailid) {
        $this->pphtipepajakdetailid = $pphtipepajakdetailid;
    }

        function getIndexdata() {
        return $this->indexdata;
    }

    function getRemarks() {
        return $this->remarks;
    }

    function getAmount() {
        return $this->amount;
    }

    function setIndexdata($indexdata) {
        $this->indexdata = $indexdata;
    }

    function setRemarks($remarks) {
        $this->remarks = $remarks;
    }

    function setAmount($amount) {
        $this->amount = $amount;
    }
    function getExcludekwitansi() {
        return $this->excludekwitansi;
    }

    function setExcludekwitansi($excludekwitansi) {
        $this->excludekwitansi = $excludekwitansi;
    }

        function getCoa() {
        if (!$this->coa) {
            $this->coa = new Cashier_Models_Master_Coa();
        }
        return $this->coa;
    }

    function getKelsub() {
        if (!$this->kelsub) {
            $this->kelsub = new Cashier_Models_Master_Kelsub();
        }
        return $this->kelsub;
    }

    function setCoa(Cashier_Models_Master_Coa $coa) {
        $this->coa = $coa;
    }

    function setKelsub(Cashier_Models_Master_Kelsub $kelsub) {
        $this->kelsub = $kelsub;
    }

    function getReceiptno() {
        return $this->receiptno;
    }

    function setReceiptno($receiptno) {
        $this->receiptno = $receiptno;
    }

    function getCashflowtype() {
        if (!$this->cashflowtype) {
            $this->cashflowtype = new Cashier_Models_Master_Cashflowtype();
        }
        return $this->cashflowtype;
    }

    function getSubgl() {
         if (!$this->subgl) {
            $this->subgl = new Cashier_Models_Master_SubLedger();
        }
        return $this->subgl;
    }

    function setCashflowtype(Cashier_Models_Master_Cashflowtype $cashflowtype) {
        $this->cashflowtype = cashflowtype;
    }

    function setSubgl(Cashier_Models_Master_SubLedger $subgl) {
        $this->subgl = $subgl;
    }
    function getCashflow() {
        if (!$this->cashflow) {
            $this->cashflow = new Cashier_Models_Master_Cashflow();
        }
        return $this->cashflow;
    }

    function setCashflow(Cashier_Models_Master_Cashflow $cashflow) {
        $this->cashflow = $cashflow;
    }
    function getDescriptionSub() {
        return $this->descriptionSub;
    }

    function setDescriptionSub($descriptionSub) {
        $this->descriptionSub = $descriptionSub;
    }
    function getIsppn() {
        return $this->isppn;
    }

    function getIspph() {
        return $this->ispph;
    }

    function getCoaIdCf() {
        return $this->coa_coa_id_cf;
    }

    function setIsppn($isppn) {
        $this->isppn = $isppn;
    }

    function setIspph($ispph) {
        $this->ispph = $ispph;
    }

    function setCoaIdCf($coa_coa_id_cf) {
        $this->coa_coa_id_cf = $coa_coa_id_cf;
    }

            public function setArrayTable($dataArray = NULL) {
        parent::setArrayTable($dataArray);
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;

        if (isset($x['voucherdetail_id'])) {
            $this->setId($x['voucherdetail_id']);
        }
        if (isset($x['indexdata'])) {
            $this->setIndexdata($x['indexdata']);
        }

        if (isset($x['remarks'])) {
            $this->setRemarks(str_replace("'","`",$x['remarks']));
        }
        if (isset($x['amount'])) {
            $this->setAmount($x['amount']);
        }
        if (isset($x['coa_coa_id'])) {
            $this->getCoa()->setId($x['coa_coa_id']);
        }
        if (isset($x['kelsub_kelsub_id'])) {
            $this->getKelsub()->setId($x['kelsub_kelsub_id']);
        }
        if (isset($x['receipt_no'])) {
            $this->setReceiptno($x['receipt_no']);
        }
        if (isset($x['subgl_subgl_id'])) {
            $this->getSubgl()->setId($x['subgl_subgl_id']);
        }
        if (isset($x['cashflow_setupcashflow_id'])) {
            $this->getCashflow()->setId($x['cashflow_setupcashflow_id']);
        }
        if (isset($x['cashflowtype_cashflowtype_id'])) {
            $this->getCashflowtype()->setId($x['cashflowtype_cashflowtype_id']);
        }
        if (isset($x['description_sub'])) {
            $this->setDescriptionSub($x['description_sub']);
        }

        if (isset($x['exclude_kwitansi'])) {
            $this->setExcludekwitansi($x['exclude_kwitansi']);
        }

        if (isset($x['is_ppn'])) {
            $this->setIsppn($x['is_ppn']);
        }
        if (isset($x['is_pph'])) {
            $this->setIspph($x['is_pph']);
        }
        if (isset($x['ppn_tipepajakdetail_id'])) {
            $this->setPpntipepajakdetailid($x['ppn_tipepajakdetail_id']);
        }
        if (isset($x['pph_tipepajakdetail_id'])) {
            $this->setPphtipepajakdetailid($x['pph_tipepajakdetail_id']);
        }
        if (isset($x['ppn_percentage'])) {
            $this->setPpnpercentage($x['ppn_percentage']);
        }
        if (isset($x['pph_percentage'])) {
            $this->setPphpercentage($x['pph_percentage']);
        }
        if (isset($x['is_ems'])) {
            $this->setIsems($x['is_ems']);
        }
        if (isset($x['is_upload'])) {
            $this->setIs_upload($x['is_upload']);
        }
        if (isset($x['is_cpms'])) {
            $this->setIscpms($x['is_cpms']);
        }
        if (isset($x['penggabungancoa'])) {
            $this->setPenggabungancoa($x['penggabungancoa']);
        }
        if (isset($x['persentase'])) {
            $this->setPersentase($x['persentase']);
        }
        if (isset($x['status'])) {
            $this->setStatus($x['status']);
        }
        if (isset($x['kasbondept_id'])) {
            $this->setKasbondeptid($x['kasbondept_id']);
        }
        if (isset($x['kasbondept_no'])) {
            $this->setKasbondeptno($x['kasbondept_no']);
        }
        if (isset($x['ordercopy'])) {
            $this->setOrdercopy($x['ordercopy']);
        }
        if (isset($x['is_pim'])) {
            $this->setIs_pim($x['is_pim']);
        }
        if (isset($x['coa_coa_id_cf'])) {
            $this->setCoaIdCf($x['coa_coa_id_cf']);
        }

        unset($x);
    }

    public function getArrayTable() {

        $x = array(
            "voucherdetail_id" => $this->getId(),
            "indexdata" => $this->getIndexdata(),
            "remarks" => mb_convert_encoding($this->getRemarks(),'HTML-ENTITIES','utf-8'),
            "amount" => $this->getAmount(),
            "receipt_no" => $this->getReceiptno(),
            "is_upload" => $this->getIs_upload(),
            "coa_coa_id" => $this->getCoa()->getId(),
            "kelsub_kelsub_id" => $this->getKelsub()->getId(),
            "subgl_subgl_id" => $this->getSubgl()->getId(),
            "cashflow_setupcashflow_id" => $this->getCashflow()->getId(),
            "cashflowtype_cashflowtype_id" => $this->getCashflowtype()->getId(),
            "description_sub" => mb_convert_encoding($this->getDescriptionSub(),'HTML-ENTITIES','utf-8'),
            "exclude_kwitansi" => $this->getExcludekwitansi(),
            "is_ppn" => $this->getIsppn(),
            "is_pph" => $this->getIspph(),
            "ppn_tipepajakdetail_id" => $this->getPpntipepajakdetailid(),
            "pph_tipepajakdetail_id" => $this->getPphtipepajakdetailid(),
            "ppn_percentage" => $this->getPpnpercentage(),
            "pph_percentage" => $this->getPphpercentage(),
            "is_ems" => $this->getIsems(),
            "is_cpms" => $this->getIscpms(),
            "penggabungancoa" => $this->getPenggabungancoa(),
            "persentase" => $this->getPersentase(),
            "status" => $this->getStatus(),
            "kasbondept_id" => $this->getKasbondeptid(),
            "kasbondept_no" => $this->getKasbondeptno(),
            "ordercopy" => $this->getOrdercopy(),
            "is_pim" => $this->getIs_pim(),
            "coa_coa_id_cf" => $this->getCoaIdCf(),
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
        return array($this->getProject(), $this->getPt());
    }

    protected function getDatefields() {
        $x = parent::getDatefields();
        return array_merge($x, array("Modion", "Addon"));
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
