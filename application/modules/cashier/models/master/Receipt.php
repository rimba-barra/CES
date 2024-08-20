<?php

/**
 * Description of ClusterTran
 *
 * @author MIS
 */
class Cashier_Models_Master_Receipt extends Cashier_Box_Models_ObjectEmbedData implements Cashier_Box_Kouti_Remora, Cashier_Box_Models_Master_InterProjectPt, Cashier_Box_Delien_DelimiterCandidate {

    private $project_id;
    private $pt_id;
    private $addon;
    private $addby;
    private $addbyname;
    private $modion;
    private $modiby;
    private $modibyname;
    private $receipt_id;
    private $receipt_no;
    private $prefix_no;
    private $status;
    private $description;
    private $receipt_type;
    private $counter_no;
    private $voucherid;
    private $receipt_no_bfr;
    private $prefix_no_bfr;
    private $receipt_type_bfr;
    private $delete_reason;
    

    public function __construct() {
        parent::__construct();
        $this->project = new Cashier_Box_Models_Master_Project();
        $this->pt = new Cashier_Box_Models_Master_Pt();
        $this->embedPrefix = 'masterreceipt_';
    }
    function getReceipt_type_bfr() {
        return $this->receipt_type_bfr;
    }

    function setReceipt_type_bfr($receipt_type_bfr) {
        $this->receipt_type_bfr = $receipt_type_bfr;
    }

        
    function getReceipt_no_bfr() {
        return $this->receipt_no_bfr;
    }

    function getPrefix_no_bfr() {
        return $this->prefix_no_bfr;
    }

    function setReceipt_no_bfr($receipt_no_bfr) {
        $this->receipt_no_bfr = $receipt_no_bfr;
    }

    function setPrefix_no_bfr($prefix_no_bfr) {
        $this->prefix_no_bfr = $prefix_no_bfr;
    }

        
    function getVoucherid() {
        return $this->voucherid;
    }

    function setVoucherid($voucherid) {
        $this->voucherid = $voucherid;
    }

        
    function getCounter_no() {
        return $this->counter_no;
    }

    function setCounter_no($counter_no) {
        $this->counter_no = $counter_no;
    }

        
    function getProject_id() {
        return $this->project_id;
    }

    function getPt_id() {
        return $this->pt_id;
    }

    function getAddon() {
        return $this->addon;
    }

    function getAddby() {
        return $this->addby;
    }

    function getAddbyname() {
        return $this->addbyname;
    }

    function getModion() {
        return $this->modion;
    }

    function getModiby() {
        return $this->modiby;
    }

    function getModibyname() {
        return $this->modibyname;
    }

    function getReceipt_id() {
        return $this->receipt_id;
    }

    function getReceipt_no() {
        return $this->receipt_no;
    }

    function getPrefix_no() {
        return $this->prefix_no;
    }

    function getStatus() {
        return $this->status;
    }

    function getDescription() {
        return $this->description;
    }

    function setProject_id($project_id) {
        $this->project_id = $project_id;
    }

    function setPt_id($pt_id) {
        $this->pt_id = $pt_id;
    }

    function setAddon($addon) {
        $this->addon = $addon;
    }

    function setAddby($addby) {
        $this->addby = $addby;
    }

    function setAddbyname($addbyname) {
        $this->addbyname = $addbyname;
    }

    function setModion($modion) {
        $this->modion = $modion;
    }

    function setModiby($modiby) {
        $this->modiby = $modiby;
    }

    function setModibyname($modibyname) {
        $this->modibyname = $modibyname;
    }

    function setReceipt_id($receipt_id) {
        $this->receipt_id = $receipt_id;
    }

    function setReceipt_no($receipt_no) {
        $this->receipt_no = $receipt_no;
    }

    function setPrefix_no($prefix_no) {
        $this->prefix_no = $prefix_no;
    }

    function setStatus($status) {
        $this->status = $status;
    }

    function setDescription($description) {
        $this->description = $description;
    }
    
    function getReceipt_type() {
        return $this->receipt_type;
    }

    function setReceipt_type($receipt_type) {
        $this->receipt_type = $receipt_type;
    }

    function getDeleteReason() {
        return $this->delete_reason;
    }

    function setDeleteReason($delete_reason) {
        $this->delete_reason = $delete_reason;
    }

            
        public function setArrayTable($dataArray = NULL) {
        parent::setArrayTable($dataArray);
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;


        if (isset($x['project_id'])) {
            $this->setProject_id($x['project_id']);
        }
        if (isset($x['pt_id'])) {
            $this->setPt_id($x['pt_id']);
        }

        if (isset($x['addby'])) {
            $this->setAddby($x['addby']);
        }
        if (isset($x['addon'])) {
            $this->setAddon($x['addon']);
        }
        if (isset($x['addbyname'])) {
            $this->setAddbyname($x['addbyname']);
        }
        if (isset($x['modiby'])) {
            $this->setModiby($x['modiby']);
        }
        if (isset($x['modion'])) {
            $this->setModion($x['modion']);
        }
        if (isset($x['modibyname'])) {
            $this->setModibyname($x['modibyname']);
        }
        if (isset($x['receipt_id'])) {
            $this->setReceipt_id($x['receipt_id']);
        }
        if (isset($x['receipt_no'])) {
            $this->setReceipt_no($x['receipt_no']);
        }
        if (isset($x['status'])) {
            $this->setStatus($x['status']);
        }
        if (isset($x['description'])) {
            $this->setDescription($x['description']);
        }
        if (isset($x['receipt_type'])) {
            $this->setReceipt_type($x['receipt_type']);
        }
        if (isset($x['prefix_no'])) {
            $this->setPrefix_no($x['prefix_no']);
        }
        if (isset($x['counter_no'])) {
            $this->setCounter_no($x['counter_no']);
        }
        if (isset($x['voucherid'])) {
            $this->setVoucherid($x['voucherid']);
        }
        if (isset($x['receipt_no_bfr'])) {
            $this->setReceipt_no_bfr($x['receipt_no_bfr']);
        }
        if (isset($x['prefix_no_bfr'])) {
            $this->setPrefix_no_bfr($x['prefix_no_bfr']);
        }
        if (isset($x['receipt_type_bfr'])) {
            $this->setReceipt_type_bfr($x['receipt_type_bfr']);
        }
        if (isset($x['delete_reason'])) {
            $this->setDeleteReason($x['delete_reason']);
        }
        unset($x);
    }

    public function getArrayTable() {


        $x = array(
            "addby" => $this->getAddby(),
            "addon" => $this->getAddon(),
            "addbyname" => $this->getAddbyname(),
            "modion" => $this->getModion(),
            "modiby" => $this->getModiby(),
            "modibyname" => $this->getModibyname(),
            "project_id" => $this->getProject_id(),
            "pt_id" => $this->getPt_id(),
            "receipt_id" => $this->getReceipt_id(),
            "receipt_type" => $this->getReceipt_type(),
            "prefix_no" => $this->getPrefix_no(),
            "receipt_no" => $this->getReceipt_no(),
            "status" => strtoupper($this->getStatus()),
            "description" => $this->getDescription(),
            "counter_no" => $this->getCounter_no(),
            "voucherid" => $this->getVoucherid(),
            "receipt_no_bfr" => $this->getReceipt_no_bfr(),
            "prefix_no_bfr" => $this->getPrefix_no_bfr(),
            "receipt_type_bfr" => $this->getReceipt_type_bfr(),
            "delete_reason" => $this->getDeleteReason(),
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
