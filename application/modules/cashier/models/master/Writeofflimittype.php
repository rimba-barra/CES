<?php

/**
 * Description of ClusterTran
 *
 * @author MIS
 */
class Cashier_Models_Master_Writeofflimittype extends Cashier_Box_Models_ObjectEmbedData implements Cashier_Box_Kouti_Remora, Cashier_Box_Models_Master_InterProjectPt, Cashier_Box_Delien_DelimiterCandidate {

    private $writeoff_limit_type_id;
    private $addon;
    private $addby;
    private $addbyname;
    private $writeoff_limit_type;
    private $modion;
    private $modiby;
    private $modibyname;
    private $writeoff_limit_unit;
    private $description;
    
    

    public function __construct() {
        parent::__construct();
        $this->project = new Cashier_Box_Models_Master_Project();
        $this->pt = new Cashier_Box_Models_Master_Pt();
        $this->embedPrefix = 'writeofflimittype_';
    }
    
    function getWriteoff_limit_unit() {
        return $this->writeoff_limit_unit;
    }

    function getDescription() {
        return $this->description;
    }

    function setWriteoff_limit_unit($writeoff_limit_unit) {
        $this->writeoff_limit_unit = $writeoff_limit_unit;
    }

    function setDescription($description) {
        $this->description = $description;
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

    function setModion($modion) {
        $this->modion = $modion;
    }

    function setModiby($modiby) {
        $this->modiby = $modiby;
    }

    function setModibyname($modibyname) {
        $this->modibyname = $modibyname;
    }

        
        function getAddbyname() {
        return $this->addbyname;
    }

    function setAddbyname($addbyname) {
        $this->addbyname = $addbyname;
    }
    function getWriteoff_limit_type() {
        return $this->writeoff_limit_type;
    }

    function setWriteoff_limit_type($writeoff_limit_type) {
        $this->writeoff_limit_type = $writeoff_limit_type;
    }

    
    function getWriteoff_limit_type_id() {
        return $this->writeoff_limit_type_id;
    }

    function getAddon() {
        return $this->addon;
    }

    function getAddby() {
        return $this->addby;
    }

    function setWriteoff_limit_type_id($writeoff_limit_type_id) {
        $this->writeoff_limit_type_id = $writeoff_limit_type_id;
    }

    function setAddon($addon) {
        $this->addon = $addon;
    }

    function setAddby($addby) {
        $this->addby = $addby;
    }


        
        public function setArrayTable($dataArray = NULL) {
        parent::setArrayTable($dataArray);
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;

        if (isset($x['writeoff_limit_type'])) {
            $this->setWriteoff_limit_type($x['writeoff_limit_type']);
        }
        if (isset($x['writeoff_limit_type_id'])) {
            $this->setWriteoff_limit_type_id($x['writeoff_limit_type_id']);
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
        if (isset($x['writeoff_limit_unit'])) {
            $this->setWriteoff_limit_unit($x['writeoff_limit_unit']);
        }
        if (isset($x['description'])) {
            $this->setDescription($x['description']);
        }

        unset($x);
    }

    public function getArrayTable() {


        $x = array(
            "writeoff_limit_type_id" => $this->getWriteoff_limit_type_id(),
            "writeoff_limit_type" => $this->getWriteoff_limit_type(),
            "addby" => $this->getAddby(),
            "addon" => $this->getAddon(),
            "addbyname" => $this->getAddbyname(),
            "modion" => $this->getModion(),
            "modiby" => $this->getModiby(),
            "modibyname" => $this->getModibyname(),
            "writeoff_limit_unit" => $this->getWriteoff_limit_unit(),
            "description" => $this->getDescription(),
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
