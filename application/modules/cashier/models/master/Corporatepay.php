<?php

/**
 * Description of ClusterTran
 *
 * @author MIS
 */
class Cashier_Models_Master_Corporatepay extends Cashier_Box_Models_ObjectEmbedData implements Cashier_Box_Kouti_Remora, Cashier_Box_Models_Master_InterProjectPt, Cashier_Box_Delien_DelimiterCandidate {

    private $corporatepay_id;
    private $filename;
    private $filedate;
    private $debitsource_id;
    private $status;
    private $active;
    private $addon;
    private $addby;
    private $deleted;
    private $deleteby;
    private $deleteon;
    private $modion;
    private $modiby;
    private $addbyname;
    private $debitsource;
    private $transferdate;
    private $downloaded_times;


    public function __construct() {
        parent::__construct();
        $this->project = new Cashier_Box_Models_Master_Project();
        $this->pt = new Cashier_Box_Models_Master_Pt();
        $this->embedPrefix = 'corporatepay_';
    }
    function getDownloadedTimes() {
        return $this->downloaded_times;
    }

    function setDownloadedTimes($downloaded_times) {
        $this->downloaded_times = $downloaded_times;
    }

    function getTransferdate() {
        return $this->transferdate;
    }

    function setTransferdate($transferdate) {
        $this->transferdate = $transferdate;
    }

        function getDebitsource() {
        return $this->debitsource;
    }

    function setDebitsource($debitsource) {
        $this->debitsource = $debitsource;
    }

        function getAddbyname() {
        return $this->addbyname;
    }

    function setAddbyname($addbyname) {
        $this->addbyname = $addbyname;
    }

        function getCorporatepay_id() {
        return $this->corporatepay_id;
    }

    function getFilename() {
        return $this->filename;
    }

    function getFiledate() {
        return $this->filedate;
    }

    function getDebitsource_id() {
        return $this->debitsource_id;
    }

    function getStatus() {
        return $this->status;
    }

    function getActive() {
        return $this->active;
    }

    function getAddon() {
        return $this->addon;
    }

    function getAddby() {
        return $this->addby;
    }

    function getDeleted() {
        return $this->deleted;
    }

    function getDeleteby() {
        return $this->deleteby;
    }

    function getDeleteon() {
        return $this->deleteon;
    }

    function getModion() {
        return $this->modion;
    }

    function getModiby() {
        return $this->modiby;
    }

    function setCorporatepay_id($corporatepay_id) {
        $this->corporatepay_id = $corporatepay_id;
    }

    function setFilename($filename) {
        $this->filename = $filename;
    }

    function setFiledate($filedate) {
        $this->filedate = $filedate;
    }

    function setDebitsource_id($debitsource_id) {
        $this->debitsource_id = $debitsource_id;
    }

    function setStatus($status) {
        $this->status = $status;
    }

    function setActive($active) {
        $this->active = $active;
    }

    function setAddon($addon) {
        $this->addon = $addon;
    }

    function setAddby($addby) {
        $this->addby = $addby;
    }

    function setDeleted($deleted) {
        $this->deleted = $deleted;
    }

    function setDeleteby($deleteby) {
        $this->deleteby = $deleteby;
    }

    function setDeleteon($deleteon) {
        $this->deleteon = $deleteon;
    }

    function setModion($modion) {
        $this->modion = $modion;
    }

    function setModiby($modiby) {
        $this->modiby = $modiby;
    }

                
        public function setArrayTable($dataArray = NULL) {
        parent::setArrayTable($dataArray);
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;
        if (isset($x['corporatepay_id'])) { $this->setCorporatepay_id($x['corporatepay_id']); }
        if (isset($x['filename'])) { $this->setFilename($x['filename']); }
        if (isset($x['filedate'])) { $this->setFiledate($x['filedate']); }
        if (isset($x['debitsource_id'])) { $this->setDebitsource_id($x['debitsource_id']); }
        if (isset($x['debitsource'])) { $this->setDebitsource($x['debitsource']); }
        if (isset($x['status'])) { $this->setStatus($x['status']); }
        if (isset($x['active'])) { $this->setActive($x['active']); }
        if (isset($x['addon'])) { $this->setAddon($x['addon']); }
        if (isset($x['addby'])) { $this->setAddby($x['addby']); }
        if (isset($x['deleted'])) { $this->setDeleted($x['deleted']); }
        if (isset($x['deleteby'])) { $this->setDeleteby($x['deleteby']); }
        if (isset($x['deleteon'])) { $this->setDeleteon($x['deleteon']); }
        if (isset($x['modion'])) { $this->setModion($x['modion']); }
        if (isset($x['modiby'])) { $this->setModiby($x['modiby']); }
        if (isset($x['addbyname'])) { $this->setAddbyname($x['addbyname']); }
        if (isset($x['transferdate'])) { $this->setTransferdate($x['transferdate']); }
        if (isset($x['downloaded_times'])) { $this->setDownloadedTimes($x['downloaded_times']); }


        unset($x);
    }

    public function getArrayTable() {


        $x = array(
            'corporatepay_id' => $this->getCorporatepay_id(),
            'filename' => $this->getFilename(),
            'filedate' => $this->getFiledate(),
            'debitsource_id' => $this->getDebitsource_id(),
            'debitsource' => $this->getDebitsource(),
            'status' => $this->getStatus(),
            'active' => $this->getActive(),
            'addon' => $this->getAddon(),
            'addby' => $this->getAddby(),
            'deleted' => $this->getDeleted(),
            'deleteby' => $this->getDeleteby(),
            'deleteon' => $this->getDeleteon(),
            'modion' => $this->getModion(),
            'modiby' => $this->getModiby(),
            'addbyname' => $this->getAddbyname(),
            'transferdate' => $this->getTransferdate(),
            'downloaded_times' => $this->getDownloadedTimes(),

        );

        return $x;
    }

    public function grouped() {
        return array($this->getProject(), $this->getPt());
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
