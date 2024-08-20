<?php

/**
 * Description of Unit
 *
 * @author MIS
 */
class Cashier_Models_Master_Unit extends Cashier_Box_Models_ObjectEmbedData implements Cashier_Box_Kouti_Remora, Cashier_Box_Models_Master_InterProjectPt, Cashier_Box_Delien_DelimiterCandidate {

    private $projectId;
    private $ptId;
    private $clusterId;
    private $number;
    private $blockId;
    private $cluster;
    private $mh_type;

    public function __construct($embedPrefix = NULL) {
        parent::__construct();
        //$this->embedPrefix = 'unit_';
        $this->embedPrefix = $embedPrefix == NULL ? 'unit_' : $embedPrefix;
    }

    function getCluster() {
        return $this->cluster;
    }

    function getMh_type() {
        return $this->mh_type;
    }

    function setCluster($cluster) {
        $this->cluster = $cluster;
    }

    function setMh_type($mh_type) {
        $this->mh_type = $mh_type;
    }

        
    public function getProjectId() {
        return $this->projectId;
    }

    public function setProjectId($projectId) {
        $this->projectId = $projectId;
    }

    public function getPtId() {
        return $this->ptId;
    }

    public function setPtId($ptId) {
        $this->ptId = $ptId;
    }

    public function getClusterId() {
        return $this->clusterId;
    }

    public function setClusterId($clusterId) {
        $this->clusterId = $clusterId;
    }

    public function getNumber() {
        return $this->number;
    }

    public function setNumber($number) {
        $this->number = $number;
    }

    public function getBlockId() {
        return $this->blockId;
    }

    public function setBlockId($blockId) {
        $this->blockId = $blockId;
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
        return array_merge($x, array("Modion", "Addon"));
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

    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;
        if (isset($x['unit_id'])) {
            $this->setId($x['unit_id']);
        }
        if (isset($x['project_id'])) {
            $this->setProjectId($x['project_id']);
        }
        if (isset($x['pt_id'])) {
            $this->setPtId($x['pt_id']);
        }
        if (isset($x['cluster_id'])) {
            $this->setClusterId($x['cluster_id']);
        }
        if (isset($x['unit_number'])) {
            $this->setNumber($x['unit_number']);
        }
        if (isset($x['block_id'])) {
            $this->setBlockId($x['block_id']);
        }
        if (isset($x['cluster'])) {
            $this->setCluster($x['cluster']);
        }
        if (isset($x['mh_type'])) {
            $this->setMh_type($x['mh_type']);
        }
        unset($x);
    }

    public function getArrayTable() {
        $x = array();
        $x['unit_id'] = $this->getId();
        $x['project_id'] = $this->getProjectId();
        $x['pt_id'] = $this->getPtId();
        $x['cluster_id'] = $this->getClusterId();
        $x['unit_number'] = $this->getNumber();
        $x['block_id'] = $this->getBlockId();
        $x['cluster'] = $this->getCluster();
        $x['mh_type'] = $this->getMh_type();
        return $x;
    }

}

?>
