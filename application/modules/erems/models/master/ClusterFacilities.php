<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ClusterFacilities
 *
 * @author MIS
 */
class Erems_Models_Master_ClusterFacilities extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Models_Master_InterProjectPt, 
        Erems_Box_Kouti_Remora,Erems_Box_Delien_DelimiterCandidate,  Erems_Box_Models_App_Hermes_HasDetail,
 Erems_Box_Models_App_Hermes_DestroyedDetail{
    private $project;
    private $pt;
    private $facilitiesType;
    private $cluster;
    private $code;
    private $name;
    private $description;
    private $image;
    private $detail;
    private $dcResult;
    private $deletedDetail;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = 'clusterfacilities_';
    }
    
    public function getProject() {
        if(!$this->project){
            $this->project = new Erems_Box_Models_Master_Project();
        }
        return $this->project;
    }

    public function setProject(Erems_Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function getPt() {
        if(!$this->pt){
            $this->pt = new Erems_Box_Models_Master_Pt();
        }
        return $this->pt;
    }

    public function setPt(Erems_Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

    public function getCluster() {
        if(!$this->cluster){
            $this->cluster = new Erems_Models_Master_ClusterB();
        }
        return $this->cluster;
    }

    public function setCluster(Erems_Models_Master_ClusterB $cluster) {
        $this->cluster = $cluster;
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
    public function getFacilitiesType() {
        if(!$this->facilitiesType){
            $this->facilitiesType = new Erems_Models_Master_FacilitiesType();
        }
        return $this->facilitiesType;
    }

    public function setFacilitiesType(Erems_Models_Master_FacilitiesType $facilitiesType) {
        $this->facilitiesType = $facilitiesType;
    }
    
    public function getImage() {
        return $this->image;
    }

    public function setImage($image) {
        $this->image = $image;
    }
    
    public function addDetail(Erems_Models_Master_ClusterFacilitiesImage $im){
        $this->detail[] =  $im;
    }
    

    
        
    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['clusterfacilities_id'])){
           $this->setId($x['clusterfacilities_id']); 
        }
        if(isset ($x['facilitiestype_facilitiestype_id'])){
           $this->getFacilitiesType()->setId($x['facilitiestype_facilitiestype_id']); 
        }
        if(isset ($x['cluster_cluster_id'])){
           $this->getCluster()->setId($x['cluster_cluster_id']); 
        }
         if(isset ($x['code'])){
           $this->setCode($x['code']); 
        }
         if(isset ($x['clusterfacilities'])){
           $this->setName($x['clusterfacilities']); 
        }
         if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
        if(isset ($x['layer_img'])){
           $this->setImage($x['layer_img']); 
        }
        unset($x);
    }
    
    public function getArrayTable() {
        $x = array(
            'clusterfacilities_id'=>$this->getId(),
            'facilitiestype_facilitiestype_id'=>$this->getFacilitiesType()->getId(),
            'cluster_cluster_id'=>$this->getCluster()->getId(),
            'code'=>$this->getCode(),
            'clusterfacilities'=>$this->getName(),
            'description'=>$this->getDescription(),
            'layer_img'=>$this->getImage()
        );
        
        return $x;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getCluster(),$this->getFacilitiesType());
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

    public function addDetailObject($detailObject) {
        $this->addDetail($detailObject);
    }

    public function getDetailObject() {
        return new Erems_Models_Master_ClusterFacilitiesImage();
    }

    public function getIndexArName() {
        return "detail";
    }

    public function getDeletedDecanString() {
        return $this->deletedDetail;
    }

    public function getDeletedFieldName() {
        return "deletedRows";
    }

    public function setDeletedDecanString($string) {
        $this->deletedDetail = $string;
    }


}

?>
