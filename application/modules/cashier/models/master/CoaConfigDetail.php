<?php

/**
 * Description of ClusterImage
 *
 * @author MIS
 */
class Cashier_Models_Master_CoaConfigDetail extends Cashier_Box_Models_ObjectEmbedData implements Cashier_Box_Kouti_Remora, Cashier_Box_Models_Master_InterProjectPt, Cashier_Box_Arried {

    private $coaconfigId;
    private $decription;
    private $Code;
    private $persen;
    private $coaId;
    private $coaName;
    private $type;
    private $amount;
    private $kasbankdetailId;
    private $sub;
    private $subDesc;
    private $cashflowtype;
    private $kelsub;
    private $cashflow;
    private $status;
    private $cluster;
    private $subgl_id;
    private $subgl_code;
    private $subgl_code1;
    private $subgl_code2;
    private $subgl_code3;
    private $subgl_description;

    public function __construct($embedPrefix = NULL) {
        parent::__construct();
        $this->project = new Cashier_Box_Models_Master_Project();
        $this->pt = new Cashier_Box_Models_Master_Pt();
        $this->embedPrefix = $embedPrefix == NULL ? 'coaconfigdetail_' : $embedPrefix;
        $this->cashflowtype = new Cashier_Models_Master_Cashflowtype();
        $this->kelsub = new Cashier_Models_Master_Kelsub();
        $this->cluster = new Cashier_Models_Master_Cluster();
        $this->cashflow = new Cashier_Models_Master_Cashflow();
    }
    
    function getSubgl_id() {
        return $this->subgl_id;
    }

    function getSubgl_code() {
        return $this->subgl_code;
    }

    function getSubgl_code1() {
        return $this->subgl_code1;
    }

    function getSubgl_code2() {
        return $this->subgl_code2;
    }

    function getSubgl_code3() {
        return $this->subgl_code3;
    }

    function getSubgl_description() {
        return $this->subgl_description;
    }

    function setSubgl_id($subgl_id) {
        $this->subgl_id = $subgl_id;
    }

    function setSubgl_code($subgl_code) {
        $this->subgl_code = $subgl_code;
    }

    function setSubgl_code1($subgl_code1) {
        $this->subgl_code1 = $subgl_code1;
    }

    function setSubgl_code2($subgl_code2) {
        $this->subgl_code2 = $subgl_code2;
    }

    function setSubgl_code3($subgl_code3) {
        $this->subgl_code3 = $subgl_code3;
    }

    function setSubgl_description($subgl_description) {
        $this->subgl_description = $subgl_description;
    }

    
    public function setArrayTable($dataArray = NULL) {
        parent::setArrayTable($dataArray);
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;
        if (isset($x['description'])) {
            $this->setDecription($x['description']);
        }
        if (isset($x['code'])) {
            $this->setCode($x['code']);
        }
        if (isset($x['coa_config_id'])) {
            $this->setCoaconfigId($x['coa_config_id']);
        }
        if (isset($x['coa_config_detail_id'])) {
            $this->setId($x['coa_config_detail_id']);
        }
        if (isset($x['persen'])) {
            $this->setPersen($x['persen']);
        }
        if (isset($x['coa_id'])) {
            $this->setCoaId($x['coa_id']);
        }
        if (isset($x['coa_name'])) {
            $this->setCoaName($x['coa_name']);
        }
        if (isset($x['type'])) {
            $this->setType($x['type']);
        }
        if (isset($x['amount'])) {
            $this->setAmount($x['amount']);
        }
        if (isset($x['kasbankdetail_id'])) {
            $this->setKasbankdetailId($x['kasbankdetail_id']);
        }
        if (isset($x['sub'])) {
            $this->setSub($x['sub']);
        }
        if (isset($x['subdesc'])) {
            $this->setSubDesc($x['subdesc']);
        }
         if (isset($x['status'])) {
            $this->setStatus($x['status']);
        }
        if (isset($x['cashflowtype_cashflowtype_id'])) {
            $this->getCashflowtype()->setId($x['cashflowtype_cashflowtype_id']);
        }
        if (isset($x['kelsub_kelsub_id'])) {
            $this->getKelsub()->setId($x['kelsub_kelsub_id']);
        }
        if (isset($x['cluster_id'])) {
            $this->getCluster()->setId($x['cluster_id']);
        }
        if (isset($x['cluster_cluster'])) {
            $this->getCluster()->setName($x['cluster_cluster']);
        }
        if (isset($x['cashflow_setupcashflow_id'])) {
            $this->getCashflow()->setId($x['cashflow_setupcashflow_id']);
        }
         if (isset($x['subgl_id'])) {
            $this->setSubgl_id($x['subgl_id']);
        }
         if (isset($x['subgl_code'])) {
            $this->setSubgl_code($x['subgl_code']);
        }
         if (isset($x['subgl_code1'])) {
            $this->setSubgl_code1($x['subgl_code1']);
        }
         if (isset($x['subgl_code2'])) {
            $this->setSubgl_code2($x['subgl_code2']);
        }
         if (isset($x['subgl_code3'])) {
            $this->setSubgl_code3($x['subgl_code3']);
        }
         if (isset($x['subgl_description'])) {
            $this->setSubgl_description($x['subgl_description']);
        }
        unset($x);
    }

    public function getArrayTable() {

        $x = array(
            "description" => $this->getDecription(),
            "code" => $this->getCode(),
            "coa_config_id" => $this->getCoaconfigId(),
            "coa_config_detail_id" => $this->getId(),
            "persen" => $this->getPersen(),
            "coa_id" => $this->getCoaId(),
            "coa_name" => $this->getCoaName(),
            "type" => $this->getType(),
            "amount" => $this->getAmount(),
            "kasbankdetail_id" => $this->getKasbankdetailId(),
            "sub" => $this->getSub(),
            "subdesc" => $this->getSubDesc(),
            "cashflowtype_cashflowtype_id" => $this->getCashflowtype()->getId(),
            "kelsub_kelsub_id" => $this->getKelsub()->getId(),
            "cluster_id" => $this->getCluster()->getId(),
            "cluster_cluster" => $this->getCluster()->getName(),
             "cashflow_setupcashflow_id" => $this->getCashflow()->getId(),
             "status" => $this->getStatus(),
             "subgl_id" => $this->getSubgl_id(),
             "subgl_code" => $this->getSubgl_code(),
             "subgl_code1" => $this->getSubgl_code1(),
             "subgl_code2" => $this->getSubgl_code2(),
             "subgl_code3" => $this->getSubgl_code3(),
             "subgl_description" => $this->getSubgl_description(),
        );

        return $x;
    }

    function getStatus() {
        return $this->status;
    }

    function setStatus($status) {
        $this->status = $status;
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

    function getKelsub() {
        if (!$this->kelsub) {
            $this->kelsub = new Cashier_Models_Master_Kelsub();
        }
        return $this->kelsub;
    }

    function setKelsub(Cashier_Models_Master_Kelsub $kelsub) {
        $this->kelsub = $kelsub;
    }

    function getCashflowtype() {
        if (!$this->cashflowtype) {
            $this->cashflowtype = new Cashier_Models_Master_Cashflowtype();
        }
        return $this->cashflowtype;
    }

    function setCashflowtype(Cashier_Models_Master_Cashflowtype $cashflowtype) {
        $this->cashflowtype = cashflowtype;
    }

    function getSubDesc() {
        return $this->subDesc;
    }

    function setSubDesc($subDesc) {
        $this->subDesc = $subDesc;
    }

    function getSub() {
        return $this->sub;
    }

    function setSub($sub) {
        $this->sub = $sub;
    }

    function getKasbankdetailId() {
        return $this->kasbankdetailId;
    }

    function setKasbankdetailId($kasbankdetailId) {
        $this->kasbankdetailId = $kasbankdetailId;
    }

    function getAmount() {
        return floatval($this->amount);
    }

    function setAmount($amount) {
        $this->amount = $amount;
    }

    function getCoaName() {
        return $this->coaName;
    }

    function setCoaName($coaName) {
        $this->coaName = $coaName;
    }

    function getCoaId() {
        return $this->coaId;
    }

    function setCoaId($coaId) {
        $this->coaId = $coaId;
    }

    function getCoaconfigId() {
        return $this->coaconfigId;
    }

    function getDecription() {
        return $this->decription;
    }

    function getCode() {
        return $this->Code;
    }

    function setCoaconfigId($coaconfigId) {
        $this->coaconfigId = $coaconfigId;
    }

    function setDecription($decription) {
        $this->decription = $decription;
    }

    function setCode($Code) {
        $this->Code = $Code;
    }

    function getType() {
        return $this->type;
    }

    function setType($type) {
        $this->type = $type;
    }

    public function getProject() {
        if (!$this->project) {
            $this->project = new Cashier_Box_Models_Master_Project();
        }
        return $this->project;
    }

    public function setProject(Cashier_Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function getPt() {
        if (!$this->pt) {
            $this->pt = new Cashier_Box_Models_Master_Pt();
        }
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

    public function getArray() {
        return $this->getArrayTable();
    }

    function getPersen() {
        // return floatval($this->persen);
        return $this->persen;
    }

    function setPersen($persen) {
        $this->persen = $persen;
    }

    public function setProjectPt(Cashier_Box_Models_Master_Project $project, Cashier_Box_Models_Master_Pt $pt) {
        $this->project = $project;
        $this->pt = $pt;
    }

    function getCluster() {
        if (!$this->cluster) {
            $this->cluster = new Cashier_Models_Master_Cluster();
        }
        return $this->cluster;
    }

    function setCluster(Cashier_Models_Master_Cluster $cluster) {
        $this->cluster = $cluster;
    }
}

?>
