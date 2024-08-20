<?php

/**
 * Description of Cluster
 *
 * @author MIS
 */
class Cashier_Models_Master_Cluster extends Cashier_Box_Models_ObjectEmbedData{
    private $projectId;
    private $ptId;
    private $code;
    private $name;
    private $description;
    private $imgLegendLayer;
    private $imgSitePlant;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = 'cluster_';
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

    public function getCode() {
        return $this->code;
    }

    public function setCode($code) {
        $this->code = $code;
    }

    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function getDescription() {
        return $this->description;
    }

    public function setDescription($description) {
        $this->description = $description;
    }

    public function getImgLegendLayer() {
        return $this->imgLegendLayer;
    }

    public function setImgLegendLayer($imgLegendLayer) {
        $this->imgLegendLayer = $imgLegendLayer;
    }

    public function getImgSitePlant() {
        return $this->imgSitePlant;
    }

    public function setImgSitePlant($imgSitePlant) {
        $this->imgSitePlant = $imgSitePlant;
    }

    public function setArrayTable($dataArray=NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        $this->setId($x['cluster_id']);
        $this->setProjectId($x['project_id']);
        $this->setPtId($x['pt_id']);
        $this->setCode($x['code']);
        $this->setName($x['cluster']);
        $this->setDescription($x['description']);
        $this->setImgLegendLayer($x['img_legendlayer']);
        $this->setImgSitePlant($x['img_siteplant']);
        
    }
    
    public function getArrayTable(){
        $x = array();
        $x['cluster_id'] = $this->getId();
        $x['project_id']  = $this->getProjectId();
        $x['pt_id'] = $this->getPtId();
        $x['code'] = $this->getCode();
        $x['cluster'] = $this->getName();
        $x['description'] = $this->getDescription();
        $x['img_legendlayer'] = $this->getImgLegendLayer();
        $x['img_siteplant'] = $this->getImgSitePlant();
        return $x;
    }
}

?>
