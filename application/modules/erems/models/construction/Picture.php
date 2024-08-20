<?php


/**
 * Description of ConstructionPicture
 *
 * @author tommytoban
 */
class Erems_Models_Construction_Picture extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Arried, Erems_Box_Kouti_Remora  {
     private $title;
     private $construction;
     private $description;
     
     public function __construct() {
         parent::__construct();
         $this->embedPrefix = "constructionpicture_";
         $this->construction = new Erems_Models_Construction_Construction();
     }
     
     public function getTitle() {
         return $this->title;
     }

     public function setTitle($title) {
         $this->title = $title;
     }
     
     public function getConstruction() {
         return $this->construction;
     }

     public function setConstruction(Erems_Models_Construction_Construction $construction) {
         $this->construction = $construction;
     }
     
     public function getDescription() {
         return $this->description;
     }

     public function setDescription($description) {
         $this->description = $description;
     }

          
     public function setArrayTable($dataArray = NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['constructionpicture_id'])){
           $this->setId($x['constructionpicture_id']); 
        }
        if(isset ($x['images'])){
           $this->setTitle($x['images']); 
        }
        if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
        unset($x);
    }
    
    public function getArrayTable() {
        $x = array(
            'constructionpicture_id'=>$this->getId(),
            'images'=>$this->getTitle(),
            'description'=>$this->getDescription()
            
        );
        
        return $x;
    }

    public function getArray() {
        $ar = $this->getArrayTable();
        $y = $this->getConstruction()->getArrayTable();
        $ar = array_merge($ar,$y);
        return $ar;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getConstruction());
    }
    
    
     
     




     
}

?>
