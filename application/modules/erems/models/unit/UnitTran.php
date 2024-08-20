<?php

/**
 * Description of UnitTran
 *
 * @author tommytoban
 */
class Erems_Models_Unit_UnitTran extends Erems_Models_Unit_Unit implements Erems_Box_Kouti_Remora,  Erems_Box_Arried {
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
    private $tanahCode2;
    private $isFasum;
    
    public function __construct($params=NULL) {
        parent::__construct($params);
        $this->project = new Erems_Box_Models_Master_Project();
        $this->pt = new Erems_Box_Models_Master_Pt();
        $this->cluster = new Erems_Models_Master_ClusterB();
        $this->block = new Erems_Models_Master_BlockB();
        $this->propertyInfo = new Erems_Models_Unit_PropertyInfo();
        $this->unitHistory = new Erems_Models_Unit_UnitHistory();
        $this->tanahCode = new Erems_Box_Models_Master_Tanahcode();
        $this->tanahCode2 = new Erems_Box_Models_Master_Tanahcode2();
    }
    
    public function getProject() {
        return $this->project;
        
    }

    public function setProject(Erems_Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function getPt() {
        return $this->pt;
    }

    public function setPt(Erems_Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

    public function getCluster() {
        if(!$this->cluster){
            $this->cluster = new Erems_Models_Master_ClusterB();
        }
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

    public function getType() {
        if(!$this->type){
            $this->type = new Erems_Models_Master_Type();
        }
        return $this->type;
    }

    public function setType(Erems_Models_Master_Type $type) {
        $this->type = $type;
    }
    
    public function getBlock() {
        return $this->block;
    }

    public function setBlock(Erems_Models_Master_BlockB $block) {
        $this->block = $block;
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
    
    public function getStatus() {
        if(!$this->status){
            $this->status = new Erems_Models_Unit_Status();
            
        }
        return $this->status;
    }

    public function setStatus($status) {
        if($status instanceof Erems_Models_Unit_Status){
            $this->status = $status;
        }else{
            $this->getStatus()->setId(intval($status));
        }
        
    }
    
    public function getPosition() {
        if(!$this->position){
            $this->position = new Erems_Models_Master_Position();
        }
        return $this->position;
    }

    public function setPosition(Erems_Models_Master_Position $position) {
        $this->position = $position;
    }

    public function getSide() {
        if(!$this->side){
            $this->side = new Erems_Models_Master_Side();
        }
        return $this->side;
    }

    public function setSide(Erems_Models_Master_Side $side) {
        
        $this->side = $side;
    }

    public function getPurpose() {
        if(!$this->purpose){
            $this->purpose = new Erems_Models_Master_Purpose();
        }
        return $this->purpose;
    }

    public function setPurpose(Erems_Models_Master_Purpose $purpose) {
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
        return array($this->getCluster(),$this->getPt(),$this->getProject(),$this->getProductCategory(),$this->getType(),$this->getBlock(),$this->getPosition(),$this->getSide(),$this->getPurpose(),$this->getTanahCode(),$this->getTanahCode2());
    }

    public function getArray() {
        return $this->getArrayTable();
    }
    
    protected function getDatefields() {
        return array("serahterima_plan");
    }
    
    public function getUnitHistory() {
        if(!$this->unitHistory){
            $this->unitHistory = new Erems_Models_Unit_UnitHistory();
        }
        return $this->unitHistory;
    }

    public function setUnitHistory(Erems_Models_Unit_UnitHistory $unitHistory) {
        $this->unitHistory = $unitHistory;
    }

    public function getTanahCode()
    {
        if(!$this->tanahCode){
            $this->tanahCode = new Erems_Box_Models_Master_Tanahcode();
        }
        return $this->tanahCode;
    }

    public function setTanahCode(Erems_Box_Models_Master_Tanahcode $tanahCode)
    {
        $this->tanahCode = $tanahCode;

        return $this;
    }

    public function getTanahCode2()
    {
        if(!$this->tanahCode2){
            $this->tanahCode2 = new Erems_Box_Models_Master_Tanahcode2();
        }
        return $this->tanahCode2;
    }

    public function setTanahCode2(Erems_Box_Models_Master_Tanahcode2 $tanahCode2)
    {
        $this->tanahCode2 = $tanahCode2;

        return $this;
    }

	 public function getIsFasum() {
        return $this->isFasum;
    }

    public function setIsFasum($isFasum) {
        $this->isFasum = $isFasum;
    }
}

?>
