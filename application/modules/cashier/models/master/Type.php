<?php

/**
 * Description of Type
 *
 * @author MIS
 */
class Cashier_Models_Master_Type extends Cashier_Box_Models_ObjectEmbedData {
    private $code;
    private $name;
    private $clusterId;
    private $productCategoryId;
    protected $buildingClass;
    protected $salesGroup;
    
    public function __construct($embedPrefix=NULL) {
        parent::__construct();
     //   $this->embedPrefix = 'type_';
        $this->embedPrefix = $embedPrefix==NULL?'type_':$embedPrefix;
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

    public function getClusterId() {
        return $this->clusterId;
    }

    public function setClusterId($clusterId) {
        $this->clusterId = $clusterId;
    }

    public function getProductCategoryId() {
        return $this->productCategoryId;
    }

    public function setProductCategoryId($productCategoryId) {
        $this->productCategoryId = $productCategoryId;
    }
    
    public function getBuildingClass() {
        return $this->buildingClass;
    }

    public function setBuildingClass($buildingClass) {
        $this->buildingClass = $buildingClass;
    }

    public function getSalesGroup() {
        return $this->salesGroup;
    }

    public function setSalesGroup($salesGroup) {
        $this->salesGroup = $salesGroup;
    }
    
    public function setArrayTable($dataArray=NULL) {
       // $x = $dataArray;
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        if(isset ($x['type_id'])){
          $this->setId($x['type_id']);
        }
        if(isset ($x['code'])){
          $this->setCode($x['code']);
        }
        if(isset ($x['productcategory_id'])){
          $this->setProductCategoryId($x['productcategory_id']);
        }
        if(isset ($x['cluster_id'])){
          $this->setClusterId($x['cluster_id']);
        }
        if(isset ($x['name'])){
          $this->setName($x['name']);
        }
        if(isset ($x['building_class'])){
           $this->setBuildingClass($x['building_class']); 
        }
        if(isset ($x['salesgroup'])){
           $this->setSalesGroup($x['salesgroup']); 
        }
      
        
        unset($x);
        
   
        
    }
    
    public function getArrayTable(){
        $x = array(
            "type_id"=>$this->getId(),
            "code"=>$this->getCode(),
            "productcategory_id"=>$this->getProductCategoryId(),
            "cluster_id"=>$this->getClusterId(),
            "name"=>$this->getName(),
            "building_class"=>$this->getBuildingClass(),
            "salesgroup"=>$this->getSalesGroup()
        );
      
        
        return $x;
    }


    
}

?>
