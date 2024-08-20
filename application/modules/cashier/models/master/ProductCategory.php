<?php

/**
 * Description of Category
 *
 * @author tommytoban
 */
class Cashier_Models_Master_ProductCategory extends Cashier_Box_Models_ObjectEmbedData implements Cashier_Box_Kouti_Remora,Cashier_Box_Models_Master_InterProjectPt{
    private $projectId;
    private $ptId;
    private $code;
    private $name;
    private $description;
    private $project;
    private $pt;
    
    public function __construct($embedPrefix=NULL) {
        parent::__construct();
      //  $this->embedPrefix = 'productcategory_';
        $this->embedPrefix = $embedPrefix==NULL?'productcategory_':$embedPrefix;
    }
    
    public function getProjectId() {
        return $this->projectId;
    }

    public function setProjectId($projectId) {
        $this->projectId = $projectId;
    }

    public function getPtId() {
        return $this->ptId;
    }

    public function setPtId($ptId) {
        $this->ptId = $ptId;
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
    
    public function getProject() {
        if(!$this->project){
            $this->project = new Cashier_Box_Models_Master_Project();
        }
        return $this->project;
    }

    public function setProject(Cashier_Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function getPt() {
        if(!$this->pt){
           $this->pt = new Cashier_Box_Models_Master_Pt(); 
        }
        return $this->pt;
    }

    public function setPt(Cashier_Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

        
    public function setArrayTable($dataArray=NULL) {
       // $x = $dataArray;
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['productcategory_id'])){
           $this->setId($x['productcategory_id']); 
        }
        if(isset ($x['project_id'])){
           $this->setProjectId($x['project_id']); 
        }
        if(isset ($x['pt_id'])){
           $this->setPtId($x['pt_id']); 
        }
        if(isset ($x['code'])){
           $this->setCode($x['code']); 
        }
        if(isset ($x['productcategory'])){
           $this->setName($x['productcategory']); 
        }
        if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
        
        unset($x);
        
        /*end add voucher*/
        
    }
    
    public function getArrayTable(){
        $x = array(
            "productcategory_id"=>$this->getId(),
            "project_id"=>$this->getProjectId(),
            "pt_id"=>$this->getPtId(),
            "code"=>$this->getCode(),
            "productcategory"=>$this->getName(),
            "description"=>$this->getDescription()  
        );
      
        return $x;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getProject(),$this->getPt());
    }


}

?>
