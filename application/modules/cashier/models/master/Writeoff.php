<?php

/**
 * Description of ClusterTran
 *
 * @author MIS
 */
class Cashier_Models_Master_Writeoff extends Cashier_Box_Models_ObjectEmbedData implements Cashier_Box_Kouti_Remora, Cashier_Box_Models_Master_InterProjectPt, Cashier_Box_Delien_DelimiterCandidate {

    private $project_id;
    private $pt_id;
    private $addon;
    private $addby;
    private $addbyname;
    private $modion;
    private $modiby;
    private $modibyname;
    private $writeoff_id;
    private $writeoff_no;
    private $project_name;
    private $pt_name;
    private $note;
    private $customer_name;
    private $status;
    private $purchaseletter_no;
    private $cluster_cluster;
    private $cluster_code;
    private $block_block;
    private $unit_number;
    private $purchaseletter_id;
    private $schedule_id;
    private $writeoff;
    private $approval_note;
    private $is_approve;
    private $is_reject;
    private $approve_reject_date;
    private $approval_by;
    private $is_special_wo;
    private $apvbyname;
    

    public function __construct() {
        parent::__construct();
        $this->project = new Cashier_Box_Models_Master_Project();
        $this->pt = new Cashier_Box_Models_Master_Pt();
        $this->embedPrefix = 'writeoff_';
    }
    
    function getApvbyname() {
        return $this->apvbyname;
    }

    function setApvbyname($apvbyname) {
        $this->apvbyname = $apvbyname;
    }

        
    function getIs_approve() {
        return $this->is_approve;
    }

    function getIs_reject() {
        return $this->is_reject;
    }

    function getApprove_reject_date() {
        return $this->approve_reject_date;
    }

    function getApproval_by() {
        return $this->approval_by;
    }

    function getIs_special_wo() {
        return $this->is_special_wo;
    }

    function setIs_approve($is_approve) {
        $this->is_approve = $is_approve;
    }

    function setIs_reject($is_reject) {
        $this->is_reject = $is_reject;
    }

    function setApprove_reject_date($approve_reject_date) {
        $this->approve_reject_date = $approve_reject_date;
    }

    function setApproval_by($approval_by) {
        $this->approval_by = $approval_by;
    }

    function setIs_special_wo($is_special_wo) {
        $this->is_special_wo = $is_special_wo;
    }

        
    function getApproval_note() {
        return $this->approval_note;
    }

    function setApproval_note($approval_note) {
        $this->approval_note = $approval_note;
    }

        
    function getWriteoff() {
        return $this->writeoff;
    }

    function setWriteoff($writeoff) {
        $this->writeoff = $writeoff;
    }

        
    function getPurchaseletter_no() {
        return $this->purchaseletter_no;
    }

    function getCluster_cluster() {
        return $this->cluster_cluster;
    }

    function getCluster_code() {
        return $this->cluster_code;
    }

    function getBlock_block() {
        return $this->block_block;
    }

    function getUnit_number() {
        return $this->unit_number;
    }

    function getPurchaseletter_id() {
        return $this->purchaseletter_id;
    }

    function getSchedule_id() {
        return $this->schedule_id;
    }

    function setPurchaseletter_no($purchaseletter_no) {
        $this->purchaseletter_no = $purchaseletter_no;
    }

    function setCluster_cluster($cluster_cluster) {
        $this->cluster_cluster = $cluster_cluster;
    }

    function setCluster_code($cluster_code) {
        $this->cluster_code = $cluster_code;
    }

    function setBlock_block($block_block) {
        $this->block_block = $block_block;
    }

    function setUnit_number($unit_number) {
        $this->unit_number = $unit_number;
    }

    function setPurchaseletter_id($purchaseletter_id) {
        $this->purchaseletter_id = $purchaseletter_id;
    }

    function setSchedule_id($schedule_id) {
        $this->schedule_id = $schedule_id;
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

    function getWriteoff_id() {
        return $this->writeoff_id;
    }

    function getWriteoff_no() {
        return $this->writeoff_no;
    }

    function getProject_name() {
        return $this->project_name;
    }

    function getPt_name() {
        return $this->pt_name;
    }

    function getNote() {
        return $this->note;
    }

    function getCustomer_name() {
        return $this->customer_name;
    }

    function getStatus() {
        return $this->status;
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

    function setWriteoff_id($writeoff_id) {
        $this->writeoff_id = $writeoff_id;
    }

    function setWriteoff_no($writeoff_no) {
        $this->writeoff_no = $writeoff_no;
    }

    function setProject_name($project_name) {
        $this->project_name = $project_name;
    }

    function setPt_name($pt_name) {
        $this->pt_name = $pt_name;
    }

    function setNote($note) {
        $this->note = $note;
    }

    function setCustomer_name($customer_name) {
        $this->customer_name = $customer_name;
    }

    function setStatus($status) {
        $this->status = $status;
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
        if (isset($x['writeoff_id'])) {
            $this->setWriteoff_id($x['writeoff_id']);
        }
        if (isset($x['writeoff_no'])) {
            $this->setWriteoff_no($x['writeoff_no']);
        }
        if (isset($x['project_name'])) {
            $this->setProject_name($x['project_name']);
        }
        if (isset($x['pt_name'])) {
            $this->setPt_name($x['pt_name']);
        }
        if (isset($x['note'])) {
            $this->setNote($x['note']);
        }
        if (isset($x['customer_name'])) {
            $this->setCustomer_name($x['customer_name']);
        }
        if (isset($x['status'])) {
            $this->setStatus($x['status']);
        }
        if (isset($x['purchaseletter_no'])) {
            $this->setPurchaseletter_no($x['purchaseletter_no']);
        }
        if (isset($x['cluster_cluster'])) {
            $this->setCluster_cluster($x['cluster_cluster']);
        }
        if (isset($x['cluster_code'])) {
            $this->setCluster_code($x['cluster_code']);
        }
        if (isset($x['block_block'])) {
            $this->setBlock_block($x['block_block']);
        }
        if (isset($x['unit_number'])) {
            $this->setUnit_number($x['unit_number']);
        }
        if (isset($x['purchaseletter_id'])) {
            $this->setPurchaseletter_id($x['purchaseletter_id']);
        }
        if (isset($x['schedule_id'])) {
            $this->setSchedule_id($x['schedule_id']);
        }
        if (isset($x['writeoff'])) {
            $this->setWriteoff($x['writeoff']);
        }
        if (isset($x['approval_note'])) {
            $this->setApproval_note($x['approval_note']);
        }
        if (isset($x['approval_by'])) {
            $this->setApproval_by($x['approval_by']);
        }
        if (isset($x['is_special_wo'])) {
            $this->setIs_special_wo($x['is_special_wo']);
        }
        if (isset($x['is_approve'])) {
            $this->setIs_approve($x['is_approve']);
        }
        if (isset($x['is_reject'])) {
            $this->setIs_reject($x['is_reject']);
        }
        if (isset($x['approve_reject_date'])) {
            $this->setApprove_reject_date($x['approve_reject_date']);
        }
        if (isset($x['apvbyname'])) {
            $this->setApvbyname($x['apvbyname']);
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
            "writeoff_id" => $this->getWriteoff_id(),
            "writeoff_no" => $this->getWriteoff_no(),
            "project_name" => $this->getProject_name(),
            "pt_name" => $this->getPt_name(),
            "note" => $this->getNote(),
            "customer_name" => $this->getCustomer_name(),
            "status" => $this->getStatus(),
            "purchaseletter_no" => $this->getPurchaseletter_no(),
            "cluster_cluster" => $this->getCluster_cluster(),
            "cluster_code" => $this->getCluster_code(),
            "block_block" => $this->getBlock_block(),
            "unit_number" => $this->getUnit_number(),
            "purchaseletter_id" => $this->getPurchaseletter_id(),
            "schedule_id" => $this->getSchedule_id(),
            "writeoff" => $this->getWriteoff(),
            "approval_note" => $this->getApproval_note(),
            "is_approve" => $this->getIs_approve(),
            "is_reject" => $this->getIs_reject(),
            "approve_reject_date" => $this->getApprove_reject_date(),
            "approval_by" => $this->getApproval_by(),
            "is_special_wo" => $this->getIs_special_wo(),
            "apvbyname" => $this->getApvbyname(),
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
