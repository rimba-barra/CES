<?php

/**
 * Description of UnitTran
 *
 * @author tommytoban
 */
class Cashier_Models_Unit_UnitTran extends Cashier_Models_Unit_Unit implements Cashier_Box_Kouti_Remora,  Cashier_Box_Arried {
    private $project;
    private $pt;
    private $cluster;
    private $block;
    private $productCategory;
    private $type;
    private $propertyInfo;
    private $status;
    private $position;
    private $side;
    private $purpose;
    private $unitHistory;
    private $tanahCode;
    
    public function __construct($params=NULL) {
        parent::__construct($params);
        $this->project = new Cashier_Box_Models_Master_Project();
        $this->pt = new Cashier_Box_Models_Master_Pt();
        $this->cluster = new Cashier_Models_Master_ClusterB();
        $this->block = new Cashier_Models_Master_BlockB();
        $this->propertyInfo = new Cashier_Models_Unit_PropertyInfo();
        $this->unitHistory = new Cashier_Models_Unit_UnitHistory();
        $this->tanahCode = new Cashier_Box_Models_Master_Tanahcode();
    }
    
    public function getProject() {
        return $this->project;
        
    }

    public function setProject(Cashier_Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function getPt() {
        return $this->pt;
    }

    public function setPt(Cashier_Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

    public function getCluster() {
        if(!$this->cluster){
            $this->cluster = new Cashier_Models_Master_ClusterB();
        }
        return $this->cluster;
    }

    public function setCluster(Cashier_Models_Master_ClusterB $cluster) {
        $this->cluster = $cluster;
    }
        public function getProductCategory() {
        if(!$this->productCategory){
            $this->productCategory = new Cashier_Models_Master_ProductCategory();
        }
        return $this->productCategory;
    }

    public function setProductCategory(Cashier_Models_Master_ProductCategory $productCategory) {
        $this->productCategory = $productCategory;
    }

    public function getType() {
        if(!$this->type){
            $this->type = new Cashier_Models_Master_Type();
        }
        return $this->type;
    }

    public function setType(Cashier_Models_Master_Type $type) {
        $this->type = $type;
    }
    
    public function getBlock() {
        return $this->block;
    }

    public function setBlock(Cashier_Models_Master_BlockB $block) {
        $this->block = $block;
    }
    
    public function getPropertyInfo() {
        if(!$this->propertyInfo){
            $this->propertyInfo = new Cashier_Models_Unit_PropertyInfo();
        }
        return $this->propertyInfo;
    }
    
    

    
    public function setPropertyInfo(Cashier_Models_Unit_PropertyInfo $propertyInfo) {
        $this->propertyInfo = $propertyInfo;
    }
    
    public function getStatus() {
        if(!$this->status){
            $this->status = new Cashier_Models_Unit_Status();
            
        }
        return $this->status;
    }

    public function setStatus($status) {
        if($status instanceof Cashier_Models_Unit_Status){
            $this->status = $status;
        }else{
            $this->getStatus()->setId(intval($status));
        }
        
    }
    
    public function getPosition() {
        if(!$this->position){
            $this->position = new Cashier_Models_Master_Position();
        }
        return $this->position;
    }

    public function setPosition(Cashier_Models_Master_Position $position) {
        $this->position = $position;
    }

    public function getSide() {
        if(!$this->side){
            $this->side = new Cashier_Models_Master_Side();
        }
        return $this->side;
    }

    public function setSide(Cashier_Models_Master_Side $side) {
        
        $this->side = $side;
    }

    public function getPurpose() {
        if(!$this->purpose){
            $this->purpose = new Cashier_Models_Master_Purpose();
        }
        return $this->purpose;
    }

    public function setPurpose(Cashier_Models_Master_Purpose $purpose) {
        $this->purpose = $purpose;
    }

        
    public function setArrayTable($dataArray = NULL) {
        parent::setArrayTable($dataArray);
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        $this->getPropertyInfo()->setArrayTable($x);
        
    }
    
    public function getArrayTable() {
        $x = parent::getArrayTable();
        $y = $this->getPropertyInfo()->getArrayTable();
        $x = array_merge($x,$y);
        return $x;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getCluster(),$this->getPt(),$this->getProject(),$this->getProductCategory(),
            $this->getType(),$this->getBlock(),$this->getPosition(),$this->getSide(),$this->getPurpose(), $this->getTanahCode());
    }

    public function getArray() {
        return $this->getArrayTable();
    }
    
    protected function getDatefields() {
        return array("serahterima_plan");
    }
    
    public function getUnitHistory() {
        if(!$this->unitHistory){
            $this->unitHistory = new Cashier_Models_Unit_UnitHistory();
        }
        return $this->unitHistory;
    }

    public function setUnitHistory(Cashier_Models_Unit_UnitHistory $unitHistory) {
        $this->unitHistory = $unitHistory;
    }

    public function getTanahCode()
    {
        if(!$this->tanahCode){
            $this->tanahCode = new Cashier_Box_Models_Master_Tanahcode();
        }
        return $this->tanahCode;
    }

    public function setTanahCode(Cashier_Box_Models_Master_Tanahcode $tanahCode)
    {
        $this->tanahCode = $tanahCode;

        return $this;
    }

}

?>
