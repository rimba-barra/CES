<?php
/**
 * Description of ProjectFacilitiesImage
 *
 * @author MIS
 */
class Erems_Models_Master_ProjectFacilitiesImage extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Kouti_Remora,  Erems_Box_Arried, Erems_Box_Models_Master_InterProjectPt{
    private $project;
    private $pt;
    private $projectFacilities;
    private $title;
    private $image;
    private $isDefault;
    private $description;
    
    public function __construct($embedPrefix=NULL) {
          parent::__construct();
      //  $this->embedPrefix = "cluster_";
        $this->embedPrefix = $embedPrefix==NULL?'projectfacilitiesimage_':$embedPrefix;
    }
    
    
    public function setArrayTable($dataArray=NULL) {
    
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
  
        if(isset ($x['projectfacilities_images_id'])){
           $this->setId($x['projectfacilities_images_id']); 
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
    
    public function getArrayTable(){
        $x = array(
            "projectfacilities_images_id"=>$this->getId(),
            "title"=>$this->getTitle(),
            "image"=>$this->getImage(),
            "is_default"=>$this->getIsDefault(),
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

    public function getProjectFacilities() {
        if(!$this->projectFacilities){
            $this->projectFacilities = new Erems_Models_Master_ProjectFacilities();
        }
        return $this->projectFacilities;
    }

    public function setProjectFacilities(Erems_Models_Master_ProjectFacilities $projectFacilities) {
        $this->projectFacilities = $projectFacilities;
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
        $this->isDefault = $isDefault;
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
        return array($this->getProject(),$this->getPt(),$this->getProjectFacilities());
    }

    public function getArray() {
        return $this->getArrayTable();
    }


}

?>
