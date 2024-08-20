<?php

class Erems_Models_Masterpanduan extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Kouti_Remora,Erems_Box_Models_Master_InterProjectPt {
    private $menu;
    private $description;
    private $filename;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "panduan_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['panduan_id'])){
           $this->setId($x['panduan_id']); 
        }
        if(isset ($x['menu'])){
           $this->setMenu($x['menu']); 
        }
        if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
        if(isset ($x['filename'])){
           $this->setFilename($x['filename']); 
        }
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'panduan_id'=>$this->getId(),
            'menu'=>$this->getMenu(),
            'description'=>$this->getDescription(),
            'filename'=>$this->getFilename(),
        );
      
        return $x;
    }
    
    public function getMenu() {
        return $this->menu;
    }
    
    public function getDescription() {
        return $this->description;
    }
    
    public function getFilename() {
        return $this->filename;
    }
    
    public function setMenu($menu) {
        $this->menu = $menu;
    }
    
    public function setDescription($description) {
        $this->description = $description;
    }
    
    public function setFilename($filename) {
        $this->filename = $filename;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function getProject() {
        if(!$this->project){
          //  $this->project = new Box_Models_Master_Project();
            $this->project = new Erems_Box_Models_Master_Project();
        }
        return $this->project;
    }

    public function getPt() {
        if(!$this->pt){
           $this->pt = new Erems_Box_Models_Master_Pt();  
        }
        return $this->pt;
        
    }

    public function grouped() {
         return array();
    }

    public function setProject(\Erems_Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function setPt(\Erems_Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }
}