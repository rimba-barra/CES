<?php

/**
 * Description of PaymentDetail
 *
 * @author MIS
 */
class Cashier_Models_Transaction_Voucherattachment extends Cashier_Box_Models_ObjectEmbedData implements Cashier_Box_Kouti_Remora, Cashier_Box_Models_Master_InterProjectPt, Cashier_Box_Delien_DelimiterCandidate {

    private $attachment_id;
    private $project_id;
    private $pt_id;
    private $transaction_id;
    private $module;
    private $filename;
    private $path;
    private $description;
    private $filesize;
    private $addon;
    private $addby;
    private $modion;
    private $modiby;
    private $inactiveon;
    private $inactiveby;
    private $deleteon;
    private $deleteby;
    private $user_fullname;


    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "voucherattachment_";
        $this->project = new Cashier_Box_Models_Master_Project();
        $this->pt = new Cashier_Box_Models_Master_Pt();
    }
    
    function getAttachment_id() {
        return $this->attachment_id;
    }

    function getProject_id() {
        return $this->project_id;
    }

    function getPt_id() {
        return $this->pt_id;
    }

    function getTransaction_id() {
        return $this->transaction_id;
    }

    function getModule() {
        return $this->module;
    }

    function getFilename() {
        return $this->filename;
    }

    function getPath() {
        return $this->path;
    }

    function getDescription() {
        return $this->description;
    }

    function getFilesize() {
        return $this->filesize;
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

    function getUserFullName() {
        return $this->user_fullname;
    }

    function setAttachment_id($attachment_id) {
        $this->attachment_id = $attachment_id;
    }

    function setProject_id($project_id) {
        $this->project_id = $project_id;
    }

    function setPt_id($pt_id) {
        $this->pt_id = $pt_id;
    }

    function setTransaction_id($transaction_id) {
        $this->transaction_id = $transaction_id;
    }

    function setModule($module) {
        $this->module = $module;
    }

    function setFilename($filename) {
        $this->filename = $filename;
    }

    function setPath($path) {
        $this->path = $path;
    }

    function setDescription($description) {
        $this->description = $description;
    }

    function setFilesize($filesize) {
        $this->filesize = $filesize;
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

    function setUserFullname($user_fullname) {
        $this->user_fullname = $user_fullname;
    }
    
    public function setArrayTable($dataArray = NULL) {
        parent::setArrayTable($dataArray);
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;

        if (isset($x['attachment_id'])) { $this->setAttachment_id($x['attachment_id']); }
        if (isset($x['project_id'])) { $this->setProject_id($x['project_id']); }
        if (isset($x['pt_id'])) { $this->setPt_id($x['pt_id']); }
        if (isset($x['transaction_id'])) { $this->setTransaction_id($x['transaction_id']); }
        if (isset($x['module'])) { $this->setModule($x['module']); }
        if (isset($x['filename'])) { $this->setFilename($x['filename']); }
        if (isset($x['path'])) { $this->setPath($x['path']); }
        if (isset($x['description'])) { $this->setDescription($x['description']); }
        if (isset($x['filesize'])) { $this->setFilesize($x['filesize']); }
        if (isset($x['addon'])) { $this->setAddon($x['addon']); }
        if (isset($x['addby'])) { $this->setAddby($x['addby']); }
        if (isset($x['modion'])) { $this->setModion($x['modion']); }
        if (isset($x['modiby'])) { $this->setModiby($x['modiby']); }
        if (isset($x['inactiveon'])) { $this->setInactiveon($x['inactiveon']); }
        if (isset($x['inactiveby'])) { $this->setInactiveby($x['inactiveby']); }
        if (isset($x['deleteon'])) { $this->setDeleteon($x['deleteon']); }
        if (isset($x['deleteby'])) { $this->setDeleteby($x['deleteby']); }
        if (isset($x['user_fullname'])) { $this->setUserFullname($x['user_fullname']); }

        unset($x);

        /* end add voucher */
    }

    public function getArrayTable() {
        $x = array(
            'attachment_id' => $this->getAttachment_id(),
            'project_id' => $this->getProject_id(),
            'pt_id' => $this->getPt_id(),
            'transaction_id' => $this->getTransaction_id(),
            'module' => $this->getModule(),
            'filename' => $this->getFilename(),
            'path' => $this->getPath(),
            'description' => $this->getDescription(),
            'filesize' => $this->getFilesize(),
            'addon' => $this->getAddon(),
            'addby' => $this->getAddby(),
            'modion' => $this->getModion(),
            'modiby' => $this->getModiby(),
            'inactiveon' => $this->getInactiveon(),
            'inactiveby' => $this->getInactiveby(),
            'deleteon' => $this->getDeleteon(),
            'deleteby' => $this->getDeleteby(),
            'user_fullname' => $this->getUserFullName(),

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
