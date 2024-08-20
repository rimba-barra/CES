<?php

/**
 * Description of ClusterTran
 *
 * @author MIS
 */
class Cashier_Models_Master_Kelsub extends Cashier_Box_Models_ObjectEmbedData implements Cashier_Box_Kouti_Remora,  Cashier_Box_Models_Master_InterProjectPt,Cashier_Box_Delien_DelimiterCandidate {
    
    private $kelsub;
    private $description;
    
    
   public function __construct() {
        parent::__construct();
        $this->project = new Cashier_Box_Models_Master_Project();
        $this->pt = new Cashier_Box_Models_Master_Pt();
        $this->embedPrefix = 'kelsub_';
    }

    function getKelsub() {
        return $this->kelsub;
    }

    function getDescription() {
        return $this->description;
    }

    function setKelsub($kelsub) {
        $this->kelsub = $kelsub;
    }

    function setDescription($description) {
        $this->description = $description;
    }

    
                    
                
    public function setArrayTable($dataArray = NULL) {
        parent::setArrayTable($dataArray);
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        if(isset ($x['kelsub_id'])){
           $this->setId($x['kelsub_id']); 
        }
        if(isset ($x['kelsub'])){
           $this->setKelsub($x['kelsub']); 
        }
        if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
 
       
        unset($x);
        
    }
    
    public function getArrayTable() {
           

        $x = array(
            "kelsub_id"=>$this->getId(),     
            "kelsub"=>$this->getKelsub(),     
            "description"=>$this->getDescription(),     
           
            
        );
        
        return $x;
    }
    

    
    
    public function getProject() {
        return $this->project;
    }

    public function setProject(Cashier_Box_Models_Master_Project $project) {
        $this->project = $project;
    }
    
     public function setProjectPt(Cashier_Box_Models_Master_Project $project, Cashier_Box_Models_Master_Pt $pt) {
        $this->project = $project;
        $this->pt = $pt;
    }

    public function getPt() {
        return $this->pt;
    }

    public function setPt(Cashier_Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getProject(),$this->getPt());
    }
    
    protected function getDatefields() {
        $x = parent::getDatefields();
        return array_merge($x,array("Modion","Addon"));
    }

    public function getDCArray() {
        return $this->detail;
    }

    public function getDCResult() {
        return $this->dcResult;
    }

    public function setDCArray($delimiteredArray) {
        $this->dcResult = $delimiteredArray;
    }



}

?>
