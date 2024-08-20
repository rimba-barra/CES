<?php

/**
 * Description of ClusterTran
 *
 * @author MIS
 */
class Cashier_Models_Master_Pph extends Cashier_Box_Models_ObjectEmbedData {

    private $tipepajakdetailid;
    private $tipepajakdetail;
    private $description;
    private $projectId;
    private $ptId;
    private $percentage;


    
   public function __construct($embedPrefix = NULL) {

        parent::__construct();
        $this->embedPrefix = $embedPrefix == NULL ? 'pph_' : $embedPrefix;
    }
    function getPercentage() {
        return $this->percentage;
    }

    function setPercentage($percentage) {
        $this->percentage = $percentage;
    }

    function getTipepajakdetailid() {
        return $this->tipepajakdetailid;
    }

    function setTipepajakdetailid($tipepajakdetailid) {
        $this->tipepajakdetailid = $tipepajakdetailid;
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

    function getTipepajakdetail() {
        return $this->tipepajakdetail;
    }

    function getDescription() {
        return $this->description;
    }

    function setTipepajakdetail($tipepajakdetail) {
        $this->tipepajakdetail = $tipepajakdetail;
    }

    function setDescription($description) {
        $this->description = $description;
    }

            
    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;

        if (isset($x['tipepajakdetail_id'])) {
            $this->setTipepajakdetailid($x['tipepajakdetail_id']);
        }
        if (isset($x['tipepajakdetail'])) {
            $this->setTipepajakdetail($x['tipepajakdetail']);
        }
        if (isset($x['description'])) {
            $this->setDescription($x['description']);
        }
        if (isset($x['percentage'])) {
            $this->setPercentage($x['percentage']);
        }

        unset($x);
    }

    public function getArrayTable() {

        $x = array();
        $x['tipepajakdetail_id'] = $this->getTipepajakdetailid();
        $x['tipepajakdetail'] = $this->getTipepajakdetail();
        $x['description'] = $this->getDescription();
        $x['percentage'] = $this->getPercentage();

        return $x;
    }



}

?>
