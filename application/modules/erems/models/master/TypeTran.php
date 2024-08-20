<?php
/**
 * Description of TypeTran
 *
 * @author MIS
 */
class Erems_Models_Master_TypeTran extends Erems_Models_Master_Type implements Erems_Box_Kouti_Remora,Erems_Box_Delien_DelimiterCandidate {
    private $cluster;
    private $productCategory;
    private $propertyInfo;
    private $description;
    private $attribute;
    private $DCResult;
    private $purpose_id;
    
    public function __construct($embedPrefix=NULL) {
        parent::__construct($embedPrefix);
        $this->cluster = new Erems_Models_Master_ClusterB();
        $this->productCategory = new Erems_Models_Master_ProductCategory();
        $this->propertyInfo = new Erems_Models_Unit_PropertyInfo();
        $this->attribute = array();
    }
    
    public function getCluster() {
        return $this->cluster;
    }

    public function setCluster(Erems_Models_Master_ClusterB $cluster) {
        $this->cluster = $cluster;
    }

    public function getProductCategory() {
        if(!$this->productCategory){
            $this->productCategory = new Erems_Models_Master_ProductCategory();
        }
        return $this->productCategory;
    }

    public function setProductCategory(Erems_Models_Master_ProductCategory $productCategory) {
        
        $this->productCategory = $productCategory;
    }

    public function getPropertyInfo() {
        if(!$this->propertyInfo){
            $this->propertyInfo = new Erems_Models_Unit_PropertyInfo();
            
        }
        return $this->propertyInfo;
    }

    public function setPropertyInfo(Erems_Models_Unit_PropertyInfo $propertyInfo) {
        $this->propertyInfo = $propertyInfo;
    }

    public function getDescription() {
        return $this->description;
    }

    public function setDescription($description) {
        $this->description = $description;
    }

    public function getPurposeID() {
        return $this->purpose_id;
    }

    public function setPurposeID($purpose_id) {
        $this->purpose_id = $purpose_id;
    }
    
    public function addAttribute(Erems_Models_Type_Attribute $attr){
        $this->attribute[] = $attr;
    }
    
    public function getAttribute($pos){
        if(key_exists($pos,$this->attribute)){
            return $this->attribute[$pos];
        }
    }
    
    public function setArrayTable($dataArray = NULL) {
        parent::setArrayTable($dataArray);
        $this->getPropertyInfo()->setArrayTable($dataArray);
        $x = $dataArray;
        if(isset ($x['building_class'])){
           $this->setBuildingClass($x['building_class']); 
        }
        if(isset ($x['salesgroup'])){
           $this->setSalesGroup($x['salesgroup']); 
        }
        if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
        if(isset ($x['purpose_id'])){
           $this->setPurposeID($x['purpose_id']); 
        }
    }
    
    public function getArrayTable() {
        $x = parent::getArrayTable();
        $y = $this->getPropertyInfo()->getArrayTable();
        $x = array_merge($x,$y);
       
        $y = array(
            "building_class"=>$this->getBuildingClass(),
            "salesgroup"=>$this->getSalesGroup(),
            "description"=>$this->getDescription(),
            "purpose_id"=>$this->getPurposeID()
        );
        $x = array_merge($x,$y);
      
        return $x;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getCluster(),$this->getProductCategory());
    }

    public function getDCArray() {
        return $this->attribute;
    }

    public function getDCResult() {
        return $this->DCResult;
    }

    public function setDCArray($delimiteredArray) {
        $this->DCResult = $delimiteredArray;
    }
}

?>
