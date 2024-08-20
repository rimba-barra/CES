<?php

/**
 * Description of UnitTran
 *
 * @author tommytoban
 */
class Erems_Models_TemplatechecklistModel extends Erems_Box_Models_ObjectEmbedData {
    private $project;
    private $pt;
    private $checklist_bangunan_id;
    private $type_id;
    private $filename;
    private $description;
    private $type;

    public function __construct($embedPrefix=NULL) {
        parent::__construct();
        $this->embedPrefix = $embedPrefix==NULL?'checklist_bangunan_':$embedPrefix;
    }
    
    public function setArrayTable($dataArray=NULL) {
    
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        if(isset ($x['checklist_bangunan_id'])){
           $this->setId($x['checklist_bangunan_id']); 
        }
        if(isset ($x['type_id'])){
           $this->setTypeId($x['type_id']); 
        }
        if(isset ($x['filename'])){
           $this->setFilename($x['filename']); 
        }
        if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
        if(isset ($x['type'])){
           $this->setType($x['type']); 
        }
        unset($x);
        
    }
    
    public function getArrayTable(){
        $x = array(
            "checklist_bangunan_id"=>$this->getId(),      
            "type_id"=>$this->getTypeId(),      
            "filename"=>$this->getFilename(),      
            "description"=>$this->getDescription(),      
            "type"=>$this->getType()    
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

    public function getId() {
        return $this->checklist_bangunan_id;
    }

    public function setId($checklist_bangunan_id) {
        $this->checklist_bangunan_id = $checklist_bangunan_id;
    }

    public function getTypeId() {
        return $this->type_id;
    }

    public function setTypeId($type_id) {
        $this->type_id = $type_id;
    }

    public function getFilename() {
        return $this->filename;
    }

    public function setFilename($filename) {
        $this->filename = $filename;
    }

    public function getDescription() {
        return $this->description;
    }

    public function setDescription($description) {
        $this->description = $description;
    }

    public function getType() {
        return $this->type;
    }

    public function setType($type) {
        $this->type = $type;
    }
}
?>