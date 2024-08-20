<?php
/**
 * Description of ClusterB
 *
 * @author MIS
 */
class Erems_Models_Master_FacilitiesType extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Kouti_Remora{
    private $code;
    private $name;
    private $description;
    private $icon;
    
    
    public function __construct($embedPrefix=NULL) {
        parent::__construct();
     
        $this->embedPrefix = $embedPrefix==NULL?'facilitiestype_':$embedPrefix;
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

    public function getIcon() {
        return $this->icon;
    }

    public function setIcon($icon) {
        $this->icon = $icon;
    }

       
    
    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['facilitiestype_id'])){
           $this->setId($x['facilitiestype_id']); 
        }
        if(isset ($x['code'])){
           $this->setCode($x['code']); 
        }
        if(isset ($x['facilitiestype'])){
           $this->setName($x['facilitiestype']); 
        }
         if(isset ($x['icon'])){
           $this->setIcon($x['icon']); 
        }
         if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
        unset($x);
    }
    
    public function getArrayTable() {
        $x = array(
            'facilitiestype_id'=>$this->getId(),
            'code'=>$this->getCode(),
            'facilitiestype'=>$this->getName(),
            'icon'=>$this->getIcon(),
            'description'=>$this->getDescription()
            
            
            
        );
        
        return $x;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }

    

}

?>
