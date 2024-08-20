<?php

/**
 * Description of ClusterTran
 *
 * @author MIS
 */
class Cashier_Models_Master_Debitsource extends Cashier_Box_Models_ObjectEmbedData {

    private $debitsource_id;
    private $project_id;
    private $pt_id;
    private $bank_id;
    private $debitsource;
    private $acc_no;


    public function __construct() {
        parent::__construct();
        $this->embedPrefix = 'debitsource_';
    }
    
    function getDebitsource_id() {
        return $this->debitsource_id;
    }

    function getProject_id() {
        return $this->project_id;
    }

    function getPt_id() {
        return $this->pt_id;
    }

    function getBank_id() {
        return $this->bank_id;
    }

    function getDebitsource() {
        return $this->debitsource;
    }

    function getAcc_no() {
        return $this->acc_no;
    }

    function setDebitsource_id($debitsource_id) {
        $this->debitsource_id = $debitsource_id;
    }

    function setProject_id($project_id) {
        $this->project_id = $project_id;
    }

    function setPt_id($pt_id) {
        $this->pt_id = $pt_id;
    }

    function setBank_id($bank_id) {
        $this->bank_id = $bank_id;
    }

    function setDebitsource($debitsource) {
        $this->debitsource = $debitsource;
    }

    function setAcc_no($acc_no) {
        $this->acc_no = $acc_no;
    }

    public function setArrayTable($dataArray = NULL) {
        parent::setArrayTable($dataArray);
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;
        if (isset($x['debitsource_id'])) { $this->setDebitsource_id($x['debitsource_id']); }
        if (isset($x['project_id'])) { $this->setProject_id($x['project_id']); }
        if (isset($x['pt_id'])) { $this->setPt_id($x['pt_id']); }
        if (isset($x['bank_id'])) { $this->setBank_id($x['bank_id']); }
        if (isset($x['debitsource'])) { $this->setDebitsource($x['debitsource']); }
        if (isset($x['acc_no'])) { $this->setAcc_no($x['acc_no']); }



        unset($x);
    }

    public function getArrayTable() {


        $x = array(
            'debitsource_id' => $this->getDebitsource_id(),
            'project_id' => $this->getProject_id(),
            'pt_id' => $this->getPt_id(),
            'bank_id' => $this->getBank_id(),
            'debitsource' => $this->getDebitsource(),
            'acc_no' => $this->getAcc_no(),

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
