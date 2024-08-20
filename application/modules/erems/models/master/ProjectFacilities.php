<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ProjectFacilities
 *
 * @author MIS
 */
class Erems_Models_Master_ProjectFacilities extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Kouti_Remora,Erems_Box_Delien_DelimiterCandidate,Erems_Box_Models_App_Hermes_HasDetail {
    
    private $project;
    private $pt;
    private $code;
    private $name;
    private $facilitiesType;
    private $layerImg;
    private $description;
    private $detail;
    private $DCResult;
    
    public function __construct($embedPrefix=NULL) {
          parent::__construct();
      //  $this->embedPrefix = "cluster_";
        $this->embedPrefix = $embedPrefix==NULL?'projectfacilities_':$embedPrefix;
        $this->detail = array();
    }
    
    public function setArrayTable($dataArray=NULL) {
    
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
  
        if(isset ($x['projectfacilities_id'])){
           $this->setId($x['projectfacilities_id']); 
        }
        if(isset ($x['code'])){
           $this->setCode($x['code']); 
        }
        if(isset ($x['projectfacilities'])){
           $this->setName($x['projectfacilities']); 
        }
        if(isset ($x['layer_img'])){
           $this->setLayerImg($x['layer_img']); 
        }
        if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
        
        unset($x);
    }
    
    public function getArrayTable(){
        $x = array(
            "projectfacilities_id"=>$this->getId(),
            "code"=>$this->getCode(),
            "projectfacilities"=>$this->getName(),
            "layer_img"=>$this->getLayerImg(),
            "description"=>$this->getDescription()
        );
      
        return $x;
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

    public function getFacilitiesType() {
        if(!$this->facilitiesType){
            $this->facilitiesType = new Erems_Models_Master_FacilitiesType();
        }
        return $this->facilitiesType;
    }

    public function setFacilitiesType(Erems_Models_Master_FacilitiesType $facilitiesType) {
        $this->facilitiesType = $facilitiesType;
    }

    public function getLayerImg() {
        return $this->layerImg;
    }

    public function setLayerImg($layerImg) {
        $this->layerImg = $layerImg;
    }

    public function getDescription() {
        return $this->description;
    }

    public function setDescription($description) {
        $this->description = $description;
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

    public function addDetail(Erems_Models_Master_ProjectFacilitiesImage $detail){
        $this->detail[] = $detail;
    }
        
    
    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getFacilitiesType(),$this->getProject(),$this->getPt());
    }

    public function addDetailObject($detailObject) {
        $this->addDetail($detailObject);
    }

    public function getDetailObject() {
        return new Erems_Models_Master_ProjectFacilitiesImage();
    }

    public function getIndexArName() {
        return "detail"; 
    }

    public function getDCArray() {
        return $this->detail;
    }

    public function getDCResult() {
        return $this->DCResult;
    }

    public function setDCArray($delimiteredArray) {
        $this->DCResult = $delimiteredArray;
    }    //put your code here
}

?>
