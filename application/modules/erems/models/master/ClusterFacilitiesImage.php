<?php

/**
 * Description of ClusterFacilitiesImage
 *
 * @author MIS
 */
class Erems_Models_Master_ClusterFacilitiesImage extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Models_Master_InterProjectPt,
        Erems_Box_Kouti_Remora,  Erems_Box_Arried {
    private $project;
    private $pt;
    private $clusterFacilities;
    private $title;
    private $image;
    private $isDefault;
    private $description;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = 'clusterfacilitiesimage_';
    }
    
    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['clusterfacilities_images_id'])){
           $this->setId($x['clusterfacilities_images_id']); 
        }
        if(isset ($x['clusterfacilities_clusterfacilities_id'])){
           $this->getClusterFacilities()->setId($x['clusterfacilities_clusterfacilities_id']); 
        }
        if(isset ($x['title'])){
           $this->setTitle($x['title']); 
        }
         if(isset ($x['image'])){
           $this->setImage($x['image']); 
        }
         if(isset ($x['is_default'])){
           $this->setIsDefault($x['is_default']); 
        }
         if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
        unset($x);
    }
    
    public function getArrayTable() {
        $x = array(
            'clusterfacilities_images_id'=>$this->getId(),
            'clusterfacilities_clusterfacilities_id'=>$this->getClusterFacilities()->getId(),
            'title'=>$this->getTitle(),
            'image'=>$this->getImage(),
            'is_default'=>$this->getIsDefault(),
            'description'=>$this->getDescription()
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

    public function getClusterFacilities() {
        if(!$this->clusterFacilities){
            $this->clusterFacilities = new Erems_Models_Master_ClusterFacilities();
        }
        return $this->clusterFacilities;
    }

    public function setClusterFacilities(Erems_Models_Master_ClusterFacilities $clusterFacilities) {
        $this->clusterFacilities = $clusterFacilities;
    }

    public function getTitle() {
        return $this->title;
    }

    public function setTitle($title) {
        $this->title = $title;
    }

    public function getImage() {
        return $this->image;
    }

    public function setImage($image) {
        $this->image = $image;
    }

    public function getIsDefault() {
        return $this->isDefault;
    }

    public function setIsDefault($isDefault) {
        $this->isDefault = (int) $isDefault;
    }

    public function getDescription() {
        return $this->description;
    }

    public function setDescription($description) {
        $this->description = $description;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getClusterFacilities());
    }

    public function getArray() {
        return $this->getArrayTable();
    }


}

?>
