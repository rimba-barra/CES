<?php

/**
 * Description of ClusterTran
 *
 * @author MIS
 */
class Cashier_Models_Master_Coa extends Cashier_Box_Models_ObjectEmbedData implements Cashier_Box_Kouti_Remora, Cashier_Box_Models_Master_InterProjectPt, Cashier_Box_Delien_DelimiterCandidate {

    private $coa;
    private $name;
    private $type;

    private $level;
    private $parent;
    private $kelsub;
    private $isjournal;
    private $report;
    private $group_gl;
    private $parentcode;
    private $parentname;
    private $coa_status;
    private $modiby;
    private $modion;
    private $addby;
    private $addon;

    private $is_create_setupcashflow;
    private $cashflowtype_id;
    private $department_id;

    
   public function __construct() {

        parent::__construct();
        $this->project = new Cashier_Box_Models_Master_Project();
        $this->pt = new Cashier_Box_Models_Master_Pt();
        $this->kelsub = new Cashier_Models_Master_Kelsub();
        $this->embedPrefix = 'coa_';
    }

    function getCoa() {
        return $this->coa;
    }

    function getName() {
        return $this->name;
    }

    function setCoa($coa) {
        $this->coa = $coa;
    }

    function setName($name) {
        $this->name = $name;
    }

    function getType() {
        return $this->type;
    }

    function getLevel() {
        return $this->level;
    }

    function getParent() {
        return $this->parent;
    }

    function getKelsub() {
        if (!$this->kelsub) {
            $this->kelsub = new Cashier_Models_Master_Kelsub();
        }
        return $this->kelsub;
    }

    function setType($type) {
        $this->type = $type;
    }

    function setLevel($level) {
        $this->level = $level;
    }

    function setParent($parent) {
        $this->parent = $parent;
    }

    function setKelsub(Cashier_Models_Master_Kelsub $kelsub) {
        $this->kelsub = $kelsub;
    }
    
    function getIsjournal() {
        return $this->isjournal;
    }

    function getReport() {
        return $this->report;
    }

    function setIsjournal($isjournal) {
        $this->isjournal = $isjournal;
    }

    function setReport($report) {
        $this->report = $report;
    }

    function getGroup_gl() {
        return $this->group_gl;
    }

    function setGroup_gl($group_gl) {
        $this->group_gl = $group_gl;
    }

    function getParentname() {
        return $this->parentname;
    }

    function setParentname($parentname) {
        $this->parentname = $parentname;
    }

    function getCoastatus() {
        return $this->coa_status;
    }

    function setCoastatus($coa_status) {
        $this->coa_status = $coa_status;
    }

    function getModion() {
        return $this->modion;
    }

    function setModion($modion) {
        $this->modion = $modion;
    }

    function getAddon() {
        return $this->addon;
    }

    function setAddon($addon) {
        $this->addon = $addon;
    }

    function getAddby() {
        return $this->addby;
    }

    function setAddby($addby) {
        $this->addby = $addby;
    }

    function getIsCreateSetupCashflow() {
        return $this->is_create_setupcashflow;
    }

    function setIsCreateSetupCashflow($is_create_setupcashflow) {
        $this->is_create_setupcashflow = $is_create_setupcashflow;
    }

    function getCashflowtypeId() {
        return $this->cashflowtype_id;
    }

    function setCashflowtypeId($cashflowtype_id) {
        $this->cashflowtype_id = $cashflowtype_id;
    }

    function getDepartmentId() {
        return $this->department_id;
    }

    function setDepartmentId($department_id) {
        $this->department_id = $department_id;
    }


        
    public function setArrayTable($dataArray = NULL) {
        parent::setArrayTable($dataArray);
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;

        if (isset($x['coa_id'])) {
            $this->setId($x['coa_id']);
        }
        if (isset($x['coa'])) {
            $this->setCoa($x['coa']);
        }
        if (isset($x['name'])) {
            $this->setName($x['name']);
        }
        if (isset($x['parent_id'])) {
            $this->setParent($x['parent_id']);
        }
        if (isset($x['parent_code'])) {
            $this->setParentcode($x['parent_code']);
        }
        if (isset($x['type'])) {
            $this->setType($x['type']);
        }

        if (isset($x['level'])) {
            $this->setLevel($x['level']);
        }
        if (isset($x['is_journal'])) {
            $this->setIsjournal($x['is_journal']);
        }
        if (isset($x['report'])) {
            $this->setReport($x['report']);
        }
        if (isset($x['group_gl'])) {
            $this->setGroup_gl($x['group_gl']);
        }
        if (isset($x['kelsub_id'])) {
            $this->getKelsub()->setId($x['kelsub_id']);
        }
        if (isset($x['parent_name'])) {
            $this->setParentname($x['parent_name']);
        }
         if (isset($x['coa_status'])) {
            $this->setCoastatus($x['coa_status']);
        }
         if (isset($x['modiby'])) {
            $this->setModiby($x['modiby']);
        }
        if (isset($x['modion'])) {
            $this->setModion($x['modion']);
        }
        if (isset($x['addby'])) {
            $this->setAddby($x['addby']);
        }
        if (isset($x['addon'])) {
            $this->setAddon($x['addon']);
        }
        if (isset($x['is_create_setupcashflow'])) {
            $this->setIsCreateSetupCashflow($x['is_create_setupcashflow']);
        }
        if (isset($x['cashflowtype_id'])) {
            $this->setCashflowtypeId($x['cashflowtype_id']);
        }
        if (isset($x['department_id'])) {
            $this->setDepartmentId($x['department_id']);
        }


        unset($x);
    }

    public function getArrayTable() {


        $x = array(

            "coa_id" => $this->getId(),
            "coa" => $this->getCoa(),
            "name" => $this->getName(),
            "type" => $this->getType(),
            "parent_id" => $this->getParent(),
            "parent_code" => $this->getParentcode(),
            "level" => $this->getLevel(),
            "is_journal" => ($this->getIsjournal() == 0 ? '0': $this->getIsjournal()),
            "report" => $this->getReport(),
            "group_gl" => $this->getGroup_gl(),
            "kelsub_id" => $this->getKelsub()->getId(),
            "parent_name" => $this->getParentname(),
            "coa_status" => $this->getCoastatus(),
            "modiby" => $this->getModiby(),
            "modion" => $this->getModion(),
            "addby" => $this->getAddby(),
            "addon" => $this->getAddon(),
            "is_create_setupcashflow" => $this->getIsCreateSetupCashflow(),
            "cashflowtype_id" => $this->getCashflowtypeId(),
            "department_id" => $this->getDepartmentId()

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


    /**
     * @return mixed
     */
    public function getParentcode()
    {
        return $this->parentcode;
    }

    /**
     * @param mixed $parentcode
     *
     * @return self
     */
    public function setParentcode($parentcode)
    {
        $this->parentcode = $parentcode;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getModiby()
    {
        return $this->modiby;
    }

    /**
     * @param mixed $modiby
     *
     * @return self
     */
    public function setModiby($modiby)
    {
        $this->modiby = $modiby;

        return $this;
    }
}

?>
