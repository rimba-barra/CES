<?php

/**
 * Description of ClusterTran
 *
 * @author MIS
 */
class Cashier_Models_Master_Pemutihan extends Cashier_Box_Models_ObjectEmbedData implements Cashier_Box_Kouti_Remora, Cashier_Box_Models_Master_InterProjectPt, Cashier_Box_Delien_DelimiterCandidate {

    private $project_id;
    private $pt_id;
    private $fp_no;
    private $subgl_id;
    private $code;
    private $schedule_id;
    private $addon;
    private $addby;
    private $amount;
    private $journal_id;
    private $cluster;
    private $customer_name;
    private $schedule_amount;
    private $pemutihan_id;
    private $addbyname;
    private $schedule;
    private $remaining;
    private $journalno;
    private $note;
    

    public function __construct() {
        parent::__construct();
        $this->project = new Cashier_Box_Models_Master_Project();
        $this->pt = new Cashier_Box_Models_Master_Pt();
        $this->embedPrefix = 'cheque_';
    }
    function getProject_id() {
        return $this->project_id;
    }
    
    function getPt_id() {
        return $this->pt_id;
    }
    function getSchedule() {
        return $this->schedule;
    }
    function getJournalno() {
        return $this->journalno;
    }

    function setJournalno($journalno) {
        $this->journalno = $journalno;
    }

        function getRemaining() {
        return $this->remaining;
    }

    function setSchedule($schedule) {
        $this->schedule = $schedule;
    }

    function setRemaining($remaining) {
        $this->remaining = $remaining;
    }

        function getAddbyname() {
        return $this->addbyname;
    }

    function setAddbyname($addbyname) {
        $this->addbyname = $addbyname;
    }

        function getPemutihan_id() {
        return $this->pemutihan_id;
    }

    function setPemutihan_id($pemutihan_id) {
        $this->pemutihan_id = $pemutihan_id;
    }

        function getFp_no() {
        return $this->fp_no;
    }

    function getSubgl_id() {
        return $this->subgl_id;
    }

    function getCode() {
        return $this->code;
    }

    function getSchedule_id() {
        return $this->schedule_id;
    }

    function getAddon() {
        return $this->addon;
    }

    function getAddby() {
        return $this->addby;
    }

    function getAmount() {
        return $this->amount;
    }

    function getJournal_id() {
        return $this->journal_id;
    }

    function getCluster() {
        return $this->cluster;
    }

    function getCustomer_name() {
        return $this->customer_name;
    }

    function getSchedule_amount() {
        return $this->schedule_amount;
    }

    function getNote() {
        return $this->note;
    }

    function setProject_id($project_id) {
        $this->project_id = $project_id;
    }

    function setPt_id($pt_id) {
        $this->pt_id = $pt_id;
    }

    function setFp_no($fp_no) {
        $this->fp_no = $fp_no;
    }

    function setSubgl_id($subgl_id) {
        $this->subgl_id = $subgl_id;
    }

    function setCode($code) {
        $this->code = $code;
    }

    function setSchedule_id($schedule_id) {
        $this->schedule_id = $schedule_id;
    }

    function setAddon($addon) {
        $this->addon = $addon;
    }

    function setAddby($addby) {
        $this->addby = $addby;
    }

    function setAmount($amount) {
        $this->amount = number_format($amount, 2);
    }

    function setJournal_id($journal_id) {
        $this->journal_id = $journal_id;
    }

    function setCluster($cluster) {
        $this->cluster = $cluster;
    }

    function setCustomer_name($customer_name) {
        $this->customer_name = $customer_name;
    }

    function setSchedule_amount($schedule_amount) {
        $this->schedule_amount = $schedule_amount;
    }

    function setNote($note) {
        $this->note = $note;
    }

    
        public function setArrayTable($dataArray = NULL) {
        parent::setArrayTable($dataArray);
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;


        if (isset($x['fp_no'])) {
            $this->setFp_no($x['fp_no']);
        }
        if (isset($x['subgl_id'])) {
            $this->setSubgl_id($x['subgl_id']);
        }

        if (isset($x['code'])) {
            $this->setCode($x['code']);
        }
        if (isset($x['schedule_id'])) {
            $this->setSchedule_id($x['schedule_id']);
        }
        if (isset($x['addby'])) {
            $this->setAddby($x['addby']);
        }
        if (isset($x['amount'])) {
            $this->setAmount($x['amount']);
        }
        if (isset($x['journal_id'])) {
            $this->setJournal_id($x['journal_id']);
        }
        if (isset($x['cluster'])) {
            $this->setCluster($x['cluster']);
        }
        if (isset($x['customer_name'])) {
            $this->setCustomer_name($x['customer_name']);
        }

        if (isset($x['schedule_amount'])) {
            $this->setSchedule_amount($x['schedule_amount']);
        }
        if (isset($x['addon'])) {
            $this->setAddon($x['addon']);
        }
        if (isset($x['pemutihan_id'])) {
            $this->setPemutihan_id($x['pemutihan_id']);
        }
        if (isset($x['addbyname'])) {
            $this->setAddbyname($x['addbyname']);
        }
        if (isset($x['schedule'])) {
            $this->setSchedule($x['schedule']);
        }
        if (isset($x['remaining_balance'])) {
            $this->setRemaining($x['remaining_balance']);
        }
        if (isset($x['voucher_no'])) {
            $this->setJournalno($x['voucher_no']);
        }
        if (isset($x['note'])) {
            $this->setNote($x['note']);
        }
        if (isset($x['project_id'])) {
            $this->setProject_id($x['project_id']);
        }
        if (isset($x['pt_id'])) {
            $this->setPt_id($x['pt_id']);
        }

        unset($x);
    }

    public function getArrayTable() {


        $x = array(
            "fp_no" => $this->getFp_no(),
            "subgl_id" => $this->getSubgl_id(),
            "code" => $this->getCode(),
            "schedule_id" => $this->getSchedule_id(),
            "addby" => $this->getAddby(),
            "amount" => $this->getAmount(),
            "journal_id" => $this->getJournal_id(),
            "cluster" => $this->getCluster(),
            "customer_name" => $this->getCustomer_name(),
            "schedule_amount" => $this->getSchedule_amount(),
            "addon" => $this->getAddon(),
            "pemutihan_id" => $this->getPemutihan_id(),
            "addbyname" => $this->getAddbyname(),
            "schedule" => $this->getSchedule(),
            "remaining_balance" => $this->getRemaining(),
            "voucher_no" => $this->getJournalno(),
            "note" => $this->getNote(),
            "project_id" => $this->getProject_id(),
            "pt_id" => $this->getPt_id(),
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
        return array_merge($x, array("Modion", "Addon", "issued_date"));
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
