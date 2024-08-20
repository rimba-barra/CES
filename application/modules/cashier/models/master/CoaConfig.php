<?php

/**
 * Description of ClusterTran
 *
 * @author MIS
 */
class Cashier_Models_Master_CoaConfig extends Cashier_Box_Models_ObjectEmbedData implements Cashier_Box_Kouti_Remora, Cashier_Box_Models_Master_InterProjectPt, Cashier_Box_Delien_DelimiterCandidate {

    private $coaconfigId;

    private $decription;
    private $detail;
    private $dcResult;
    private $name;
    private $isDefault;
    private $coaCode;
    private $coadetailId;
    private $coadetailDesc;
    private $notes;


    public function __construct() {
        parent::__construct();
        $this->project = new Cashier_Box_Models_Master_Project();
        $this->pt = new Cashier_Box_Models_Master_Pt();
        $this->detail = array();
        $this->embedPrefix = 'coaconfig_';
    }

    function getCoaconfigId() {
        return $this->coaconfigId;
    }

    function getCoadetailId() {
        return $this->coadetailId;
    }

    function setCoaconfigId($coaconfigId) {
        $this->coaconfigId = $coaconfigId;
    }

    function setCoadetailId($coadetailId) {
        $this->coadetailId = $coadetailId;
    }

    function getCoadetailDesc() {
        return $this->coadetailDesc;
    }

    function setCoadetailDesc($coadetailDesc) {
        $this->coadetailDesc = $coadetailDesc;
    }

    function getNotes() {
        return $this->notes;
    }

    function setNotes($notes) {
        $this->notes = $notes;
    }

    public function setArrayTable($dataArray = NULL) {
        parent::setArrayTable($dataArray);
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;
        if (isset($x['description'])) {
            $this->setDecription($x['description']);
        }

        if (isset($x['name'])) {
            $this->setName($x['name']);
        }
        if (isset($x['is_default'])) {
            $this->setIsDefault($x['is_default']);
        }
        if (isset($x['coa_code'])) {
            $this->setCoaCode($x['coa_code']);
        }
        if (isset($x['coa_config_id'])) {
            $this->setId($x['coa_config_id']);
        }
        if (isset($x['coa_config_detail_id'])) {
            $this->setCoadetailId($x['coa_config_detail_id']);
        }
        if (isset($x['coa_config_detail_desc'])) {
            $this->setCoadetailDesc($x['coa_config_detail_desc']);
        }
        if (isset($x['notes'])) {
            $this->setNotes($x['notes']);
        }

        unset($x);
    }

    public function getArrayTable() {

        $x = array(
            "description" => $this->getDecription(),
            "name" => $this->getName(),
            "is_default" => $this->getIsDefault(),
            "coa_code" => $this->getCoaCode(),
            "coa_config_id" => $this->getId(),
            "coa_config_detail_id" => $this->getCoadetailId(),
            "coa_config_detail_desc" => $this->getCoadetailDesc(),
            "notes" => $this->getNotes(),
        );

        return $x;
    }

    public function getProject() {
        return $this->project;
    }

    public function setProject(Cashier_Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function getPt() {
        return $this->pt;
    }

    public function setPt(Cashier_Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

    public function getDecription() {
        return $this->decription;
    }

    public function setDecription($decription) {
        $this->decription = $decription;
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

    function getName() {
        return $this->name;
    }

    function getIsDefault() {
        return $this->isDefault;
    }

    function getCoaCode() {
        return $this->coaCode;
    }

    function setName($name) {
        $this->name = $name;
    }

    function setIsDefault($isDefault) {
        $this->isDefault = $isDefault;
    }

    function setCoaCode($coaCode) {
        $this->coaCode = $coaCode;
    }

    public function setProjectPt(Cashier_Box_Models_Master_Project $project, Cashier_Box_Models_Master_Pt $pt) {
        $this->project = $project;
        $this->pt = $pt;
    }
}

?>
