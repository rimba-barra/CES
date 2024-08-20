<?php

/**
 * Description of ClusterTran
 *
 * @author MIS
 */
class Cashier_Models_Master_Writeoffdetail extends Cashier_Box_Models_ObjectEmbedData implements Cashier_Box_Kouti_Remora, Cashier_Box_Models_Master_InterProjectPt, Cashier_Box_Delien_DelimiterCandidate {

    private $writeoff_id;
    private $schedule_id;
    private $writeoff;
    private $after_writeoff;
    private $amount;
    private $remaining_balance;
    private $description;
    private $writeoffdetail_id;
    private $persentase_writeoff;
    

    public function __construct() {
        parent::__construct();
        $this->project = new Cashier_Box_Models_Master_Project();
        $this->pt = new Cashier_Box_Models_Master_Pt();
        $this->embedPrefix = 'writeoffdetail_';
    }
    
    function getPersentase_writeoff() {
        return $this->persentase_writeoff;
    }

    function setPersentase_writeoff($persentase_writeoff) {
        $this->persentase_writeoff = $persentase_writeoff;
    }

        
    function getAfter_writeoff() {
        return $this->after_writeoff;
    }

    function getAmount() {
        return $this->amount;
    }

    function getRemaining_balance() {
        return $this->remaining_balance;
    }

    function getDescription() {
        return $this->description;
    }

    function getWriteoffdetail_id() {
        return $this->writeoffdetail_id;
    }

    function setAfter_writeoff($after_writeoff) {
        $this->after_writeoff = $after_writeoff;
    }

    function setAmount($amount) {
        $this->amount = $amount;
    }

    function setRemaining_balance($remaining_balance) {
        $this->remaining_balance = $remaining_balance;
    }

    function setDescription($description) {
        $this->description = $description;
    }

    function setWriteoffdetail_id($writeoffdetail_id) {
        $this->writeoffdetail_id = $writeoffdetail_id;
    }

        
    function getWriteoff() {
        return $this->writeoff;
    }

    function setWriteoff($writeoff) {
        $this->writeoff = $writeoff;
    }

    function getSchedule_id() {
        return $this->schedule_id;
    }

    function setSchedule_id($schedule_id) {
        $this->schedule_id = $schedule_id;
    }

    function getWriteoff_id() {
        return $this->writeoff_id;
    }


    function setWriteoff_id($writeoff_id) {
        $this->writeoff_id = $writeoff_id;
    }


        
        
        public function setArrayTable($dataArray = NULL) {
        parent::setArrayTable($dataArray);
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;


        if (isset($x['writeoff_id'])) {
            $this->setWriteoff_id($x['writeoff_id']);
        }
        if (isset($x['schedule_id'])) {
            $this->setSchedule_id($x['schedule_id']);
        }
        if (isset($x['writeoff'])) {
            $this->setWriteoff($x['writeoff']);
        }
        if (isset($x['after_writeoff'])) {
            $this->setAfter_writeoff($x['after_writeoff']);
        }
        if (isset($x['amount'])) {
            $this->setAmount($x['amount']);
        }
        if (isset($x['remaining_balance'])) {
            $this->setRemaining_balance($x['remaining_balance']);
        }
        if (isset($x['description'])) {
            $this->setDescription($x['description']);
        }
        if (isset($x['writeoffdetail_id'])) {
            $this->setWriteoffdetail_id($x['writeoffdetail_id']);
        }
        if (isset($x['persentase_writeoff'])) {
            $this->setPersentase_writeoff($x['persentase_writeoff']);
        }

        unset($x);
    }

    public function getArrayTable() {


        $x = array(
            "writeoff_id" => $this->getWriteoff_id(),
            "schedule_id" => $this->getSchedule_id(),
            "writeoff" => $this->getWriteoff(),
            "after_writeoff" => $this->getAfter_writeoff(),
            "amount" => $this->getAmount(),
            "remaining_balance" => $this->getRemaining_balance(),
            "writeoffdetail_id" => $this->getWriteoffdetail_id(),
            "description" => $this->getDescription(),
            "persentase_writeoff" => $this->getPersentase_writeoff(),
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
