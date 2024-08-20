<?php

/**
 * Description of PaymentDetail
 *
 * @author MIS
 */
class Cashier_Models_Transaction_Voucherapprovaldetail extends Cashier_Box_Models_ObjectEmbedData implements Cashier_Box_Kouti_Remora, Cashier_Box_Models_Master_InterProjectPt, Cashier_Box_Delien_DelimiterCandidate {

    private $voucher_approval_id;
    private $project_id;
    private $pt_id;
    private $approval_type;
    private $voucher_id;
    private $voucher_groupapprover_id;
    private $approval_status;
    private $approval_date;
    private $approval_by;
    private $approve_by;
    private $approval_notes;
    private $sequence;
    private $addon;
    private $addby;
    private $modion;
    private $modiby;
    private $inactiveon;
    private $inactiveby;
    private $deleteon;
    private $deleteby;
    private $active;
    private $deleted;
    private $in_approval;
    private $approval_by_email;
    private $kasbank_id;


    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "voucherapprovaldetail_";
        $this->project = new Cashier_Box_Models_Master_Project();
        $this->pt = new Cashier_Box_Models_Master_Pt();
    }
    function getProject_id() {
        return $this->project_id;
    }

    function getPt_id() {
        return $this->pt_id;
    }

    function setProject_id($project_id) {
        $this->project_id = $project_id;
    }

    function setPt_id($pt_id) {
        $this->pt_id = $pt_id;
    }
    function getKasbank_id() {
        return $this->kasbank_id;
    }

    function setKasbank_id($kasbank_id) {
        $this->kasbank_id = $kasbank_id;
    }

        function getApproval_by_email() {
        return $this->approval_by_email;
    }

    function setApproval_by_email($approval_by_email) {
        $this->approval_by_email = $approval_by_email;
    }

        function getVoucher_approval_id() {
        return $this->voucher_approval_id;
    }

    function getApproval_type() {
        return $this->approval_type;
    }

    function getVoucher_id() {
        return $this->voucher_id;
    }

    function getVoucher_groupapprover_id() {
        return $this->voucher_groupapprover_id;
    }

    function getApproval_status() {
        return $this->approval_status;
    }

    function getApproval_date() {
        return $this->approval_date;
    }

    function getApproval_by() {
        return $this->approval_by;
    }

    function getApprove_by() {
        return $this->approve_by;
    }

    function getApproval_notes() {
        return $this->approval_notes;
    }

    function getSequence() {
        return $this->sequence;
    }

    function getAddon() {
        return $this->addon;
    }

    function getAddby() {
        return $this->addby;
    }

    function getModion() {
        return $this->modion;
    }

    function getModiby() {
        return $this->modiby;
    }

    function getInactiveon() {
        return $this->inactiveon;
    }

    function getInactiveby() {
        return $this->inactiveby;
    }

    function getDeleteon() {
        return $this->deleteon;
    }

    function getDeleteby() {
        return $this->deleteby;
    }

    function getActive() {
        return $this->active;
    }

    function getDeleted() {
        return $this->deleted;
    }

    function getIn_approval() {
        return $this->in_approval;
    }

    function setVoucher_approval_id($voucher_approval_id) {
        $this->voucher_approval_id = $voucher_approval_id;
    }

    function setApproval_type($approval_type) {
        $this->approval_type = $approval_type;
    }

    function setVoucher_id($voucher_id) {
        $this->voucher_id = $voucher_id;
    }

    function setVoucher_groupapprover_id($voucher_groupapprover_id) {
        $this->voucher_groupapprover_id = $voucher_groupapprover_id;
    }

    function setApproval_status($approval_status) {
        $this->approval_status = $approval_status;
    }

    function setApproval_date($approval_date) {
        $this->approval_date = $approval_date;
    }

    function setApproval_by($approval_by) {
        $this->approval_by = $approval_by;
    }

    function setApprove_by($approve_by) {
        $this->approve_by = $approve_by;
    }

    function setApproval_notes($approval_notes) {
        $this->approval_notes = $approval_notes;
    }

    function setSequence($sequence) {
        $this->sequence = $sequence;
    }

    function setAddon($addon) {
        $this->addon = $addon;
    }

    function setAddby($addby) {
        $this->addby = $addby;
    }

    function setModion($modion) {
        $this->modion = $modion;
    }

    function setModiby($modiby) {
        $this->modiby = $modiby;
    }

    function setInactiveon($inactiveon) {
        $this->inactiveon = $inactiveon;
    }

    function setInactiveby($inactiveby) {
        $this->inactiveby = $inactiveby;
    }

    function setDeleteon($deleteon) {
        $this->deleteon = $deleteon;
    }

    function setDeleteby($deleteby) {
        $this->deleteby = $deleteby;
    }

    function setActive($active) {
        $this->active = $active;
    }

    function setDeleted($deleted) {
        $this->deleted = $deleted;
    }

    function setIn_approval($in_approval) {
        $this->in_approval = $in_approval;
    }

        
    public function setArrayTable($dataArray = NULL) {
        parent::setArrayTable($dataArray);
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;

        if (isset($x['voucher_approval_id'])) { $this->setVoucher_approval_id($x['voucher_approval_id']); }
        if (isset($x['project_id'])) { $this->setProject_id($x['project_id']); }
        if (isset($x['pt_id'])) { $this->setPt_id($x['pt_id']); }
        if (isset($x['approval_type'])) { $this->setApproval_type($x['approval_type']); }
        if (isset($x['voucher_id'])) { $this->setVoucher_id($x['voucher_id']); }
        if (isset($x['voucher_groupapprover_id'])) { $this->setVoucher_groupapprover_id($x['voucher_groupapprover_id']); }
        if (isset($x['approval_status'])) { $this->setApproval_status($x['approval_status']); }
        if (isset($x['approval_date'])) { $this->setApproval_date($x['approval_date']); }
        if (isset($x['approval_by'])) { $this->setApproval_by($x['approval_by']); }
        if (isset($x['approve_by'])) { $this->setApprove_by($x['approve_by']); }
        if (isset($x['approval_notes'])) { $this->setApproval_notes($x['approval_notes']); }
        if (isset($x['sequence'])) { $this->setSequence($x['sequence']); }
        if (isset($x['addon'])) { $this->setAddon($x['addon']); }
        if (isset($x['addby'])) { $this->setAddby($x['addby']); }
        if (isset($x['modion'])) { $this->setModion($x['modion']); }
        if (isset($x['modiby'])) { $this->setModiby($x['modiby']); }
        if (isset($x['inactiveon'])) { $this->setInactiveon($x['inactiveon']); }
        if (isset($x['inactiveby'])) { $this->setInactiveby($x['inactiveby']); }
        if (isset($x['deleteon'])) { $this->setDeleteon($x['deleteon']); }
        if (isset($x['deleteby'])) { $this->setDeleteby($x['deleteby']); }
        if (isset($x['active'])) { $this->setActive($x['active']); }
        if (isset($x['deleted'])) { $this->setDeleted($x['deleted']); }
        if (isset($x['in_approval'])) { $this->setIn_approval($x['in_approval']); }
        if (isset($x['approval_by_email'])) { $this->setApproval_by_email($x['approval_by_email']); }
        if (isset($x['kasbank_id'])) { $this->setKasbank_id($x['kasbank_id']); }


        unset($x);

        /* end add voucher */
    }

    public function getArrayTable() {
        $x = array(
            'voucher_approval_id' => $this->getVoucher_approval_id(),
            'project_id' => $this->getProject_id(),
            'pt_id' => $this->getPt_id(),
            'approval_type' => $this->getApproval_type(),
            'voucher_id' => $this->getVoucher_id(),
            'voucher_groupapprover_id' => $this->getVoucher_groupapprover_id(),
            'approval_status' => $this->getApproval_status(),
            'approval_date' => $this->getApproval_date(),
            'approval_by' => $this->getApproval_by(),
            'approve_by' => $this->getApprove_by(),
            'approval_notes' => $this->getApproval_notes(),
            'sequence' => $this->getSequence(),
            'addon' => $this->getAddon(),
            'addby' => $this->getAddby(),
            'modion' => $this->getModion(),
            'modiby' => $this->getModiby(),
            'inactiveon' => $this->getInactiveon(),
            'inactiveby' => $this->getInactiveby(),
            'deleteon' => $this->getDeleteon(),
            'deleteby' => $this->getDeleteby(),
            'active' => $this->getActive(),
            'deleted' => $this->getDeleted(),
            'in_approval' => $this->getIn_approval(),
            'approval_by_email' => $this->getApproval_by_email(),
            'kasbank_id' => $this->getKasbank_id(),


        );
        return $x;
    }

    public function getArray() {
        return $this->getArrayTable();
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
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
