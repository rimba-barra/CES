<?php

/**
 * Description of ClusterTran
 *
 * @author MIS
 */
class Cashier_Models_Transaction_Journaldetail extends Cashier_Box_Models_ObjectEmbedData implements Cashier_Box_Kouti_Remora, Cashier_Box_Models_Master_InterProjectPt, Cashier_Box_Delien_DelimiterCandidate {

    private $indexdata;
    private $dataflow;
    private $remarks;
    private $amount;
    private $amountc;
    private $coa;
    private $kelsub;
    private $receiptno;
    private $cashflowtype;
    private $cashflowtypeId;
    private $subglId;
    private $datafrom;


    public function __construct() {
        parent::__construct();
        $this->project = new Cashier_Box_Models_Master_Project();
        $this->pt = new Cashier_Box_Models_Master_Pt();
        $this->coa = new Cashier_Models_Master_Coa();
        $this->kelsub = new Cashier_Models_Master_Kelsub();
        $this->embedPrefix = 'journaldetail_';
    }

    function getIndexdata() {
        return $this->indexdata;
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

    function setIndexdata($indexdata) {
        $this->indexdata = $indexdata;
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

    function getCoa() {
        if(!$this->coa){
            $this->coa = new Cashier_Models_Master_Coa();
        }
        return $this->coa;
    }

    function getKelsub() {
        if(!$this->kelsub){
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

    function getDatafrom() {
        return $this->datafrom;
    }

    function setDatafrom($datafrom) {
        $this->datafrom = $datafrom;
    }

    
    public function setArrayTable($dataArray = NULL) {
        parent::setArrayTable($dataArray);
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;

        if (isset($x['journaldetail_id'])) {
            $this->setId($x['journaldetail_id']);
        }
        if (isset($x['indexdata'])) {
            $this->setIndexdata($x['indexdata']);
        }
        if (isset($x['dataflow'])) {
            $this->setDataflow($x['dataflow']);
        }
        if (isset($x['remarks'])) {
            $this->setRemarks($x['remarks']);
        }
        if (isset($x['amount'])) {
            $this->setAmount($x['amount']);
        }
        if (isset($x['amountc'])) {
            $this->setAmountc($x['amountc']);
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
        if (isset($x['cashflowtype'])) {
            $this->setCashflowtype($x['cashflowtype']);
        }
        if (isset($x['cashflowtype_id'])) {
            $this->setCashflowtypeId($x['cashflowtype_id']);
        }
        if (isset($x['cashflowtype_cashflowtype_id'])) {
            $this->setCashflowtypeId($x['cashflowtype_cashflowtype_id']);
        }
        if (isset($x['subgl_subgl_id'])) {
            $this->setSubglId($x['subgl_subgl_id']);
        }

         if (isset($x['datafrom'])) {
            $this->setDatafrom($x['datafrom']);
        }


        unset($x);
    }

    public function getArrayTable() {

        $x = array(
            "journaldetail_id" => $this->getId(),
            "indexdata" => $this->getIndexdata(),
            "remarks" => $this->getRemarks(),
            "dataflow" => $this->getDataflow(),
            "amount" =>  $this->getAmount(),
            "amountc" =>  $this->getAmountc(),
            "receipt_no" => $this->getReceiptno(),
            "coa_coa_id"=>$this->getCoa()->getId(),
            "kelsub_kelsub_id"=>$this->getKelsub()->getId(),
            "cashflowtype" =>  $this->getCashflowtype(),
            "cashflowtype_id" =>  $this->getCashflowtypeId(),
            "cashflowtype_cashflowtype_id" =>  $this->getCashflowtypeId(),
            "subgl_subgl_id" =>  $this->getSubglId(),
            "datafrom" => $this->getDatafrom()
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


    /**
     * @return mixed
     */
    public function getAmountc()
    {
        return $this->amountc;
    }

    /**
     * @param mixed $amountc
     *
     * @return self
     */
    public function setAmountc($amountc)
    {
        $this->amountc = $amountc;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getCashflowtype()
    {
        return $this->cashflowtype;
    }

    /**
     * @param mixed $cashflowtype
     *
     * @return self
     */
    public function setCashflowtype($cashflowtype)
    {
        $this->cashflowtype = $cashflowtype;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getCashflowtypeId()
    {
        return $this->cashflowtypeId;
    }

    /**
     * @param mixed $cashflowtypeId
     *
     * @return self
     */
    public function setCashflowtypeId($cashflowtypeId)
    {
        $this->cashflowtypeId = $cashflowtypeId;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getSubglId()
    {
        return $this->subglId;
    }

    /**
     * @param mixed $subglId
     *
     * @return self
     */
    public function setSubglId($subglId)
    {
        $this->subglId = $subglId;

        return $this;
    }
}

?>
