<?php

/**
 * Description of ClusterTran
 *
 * @author MIS
 */
class Cashier_Models_Master_Cheque extends Cashier_Box_Models_ObjectEmbedData implements Cashier_Box_Kouti_Remora, Cashier_Box_Models_Master_InterProjectPt, Cashier_Box_Delien_DelimiterCandidate {

    private $cheque_no;
    private $amount;
    private $issued_date;
    private $status;
    private $series;
    private $chequeType;
    private $sumvoucher;
    private $sumcashbon;
    private $description;
    private $recipient;
    private $is_paid;
    private $status_voucher;
    private $is_realized;
    private $is_posting;
    private $type;

    public function __construct() {
        parent::__construct();
        $this->project = new Cashier_Box_Models_Master_Project();
        $this->pt = new Cashier_Box_Models_Master_Pt();
        $this->embedPrefix = 'cheque_';
    }

    function getCheque_no() {
        return $this->cheque_no;
    }

    function getAmount() {
        return $this->amount;
    }

    function getIssued_date() {
        return $this->issued_date;
    }

    function getStatus() {
        return $this->status;
    }

    function setCheque_no($cheque_no) {
        $this->cheque_no = $cheque_no;
    }

    function setAmount($amount) {
        $this->amount = $amount;
    }

    function setIssued_date($issued_date) {
        $this->issued_date = $issued_date;
    }

    function setStatus($status) {
        $this->status = $status;
    }

    function getSeries() {
        return $this->series;
    }

    function setSeries($series) {
        $this->series = $series;
    }

    function getChequeType() {
        return $this->chequeType;
    }

    function setChequeType($chequeType) {
        $this->chequeType = $chequeType;
    }

    function getSumvoucher() {
        return $this->sumvoucher;
    }

    function setSumvoucher($sumvoucher) {
        $this->sumvoucher = $sumvoucher;
    }
    function getSumcashbon() {
        return $this->sumcashbon;
    }

    function setSumcashbon($sumcashbon) {
        $this->sumcashbon = $sumcashbon;
    }
    ///// iqbal 15 okt 2019
    function getDescription(){
        return $this->description;
    }

    function setDescription($description){
        $this->description = $description;
    }

    function getRecipient(){
        return $this->recipient;
    }

    function setRecipient($recipient){
        $this->recipient = $recipient;
    }

      function getIs_paid(){
        return $this->is_paid;
    }

    function setIs_paid($is_paid){
        $this->is_paid = $is_paid;
    }

     function getStatus_voucher(){
        return $this->status_voucher;
    }

    function setStatus_voucher($status_voucher){
        $this->status_voucher = $status_voucher;
    }

     function getIs_realized(){
        return $this->is_realized;
    }

    function setIs_realized($is_realized){
        $this->is_realized = $is_realized;
    }

    function getIs_posting(){
        return $this->is_posting;
    }

    function setIs_posting($is_posting){
        $this->is_posting = $is_posting;
    }

    function setType($type){
        $this->type = $type;
    }

    function getType(){
        return $this->type;
    }
    /// end iqbal

        public function setArrayTable($dataArray = NULL) {
        parent::setArrayTable($dataArray);
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;


        if (isset($x['cheque_id'])) {
            $this->setId($x['cheque_id']);
        }
        if (isset($x['cheque_no'])) {
            $this->setCheque_no($x['cheque_no']);
        }

        if (isset($x['amount'])) {
            $this->setAmount($x['amount']);
        }
        if (isset($x['issued_date'])) {
            $this->setIssued_date($x['issued_date']);
        }
        if (isset($x['status'])) {
            $this->setStatus($x['status']);
        }
        if (isset($x['series'])) {
            $this->setSeries($x['series']);
        }
        if (isset($x['cheque_type'])) {
            $this->setChequeType($x['cheque_type']);
        }
        if (isset($x['sumvoucher'])) {
            $this->setSumvoucher($x['sumvoucher']);
        }
        if (isset($x['sumcashbon'])) {
            $this->setSumcashbon($x['sumcashbon']);
        }

        if (isset($x['description'])) {
            $this->setDescription($x['description']);
        }

        if (isset($x['recipient'])) {
            $this->setRecipient($x['recipient']);
        }

         if (isset($x['is_paid'])) {
            $this->setIs_paid($x['is_paid']);
        }

         if (isset($x['status_voucher'])) {
            $this->setStatus_voucher($x['status_voucher']);
        }

         if (isset($x['is_realized'])) {
            $this->setIs_realized($x['is_realized']);
        }

        if (isset($x['is_posting'])) {
            $this->setIs_posting($x['is_posting']);
        }

        if (isset($x['type'])) {
            $this->setType($x['type']);
        }

        unset($x);
    }

    public function getArrayTable() {


        $x = array(
            "cheque_id" => $this->getId(),
            "cheque_no" => $this->getCheque_no(),
            "amount" => $this->getAmount() + $this->getSumcashbon(),
            "issued_date" => $this->getIssued_date(),
            "status" => $this->getStatus(),
            "series" => $this->getSeries(),
            "cheque_type" => $this->getChequeType(),
            "sumvoucher" => $this->getSumvoucher(),
            "sumcashbon" => $this->getSumcashbon(),
              "description" => $this->getDescription(),
            "recipient" => $this->getRecipient(),
            "is_paid" => $this->getIs_paid(),
            "status_voucher" => $this->getStatus_voucher(),
            "is_realized" => $this->getIs_realized(),
            "is_posting" => $this->getIs_posting(),
            "type" => $this->getType(),
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
