<?php

/**
 * Description of Periode PM
 *
 * @author MIS
 */


class Hrd_Models_Performancemanagement_Approvalmatrixperiodepm extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora, Box_Arried{
    public $periode;
    
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "periodepm_";
        
    }
    
    public function setArrayTable($dataArray=NULL) {
        
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['periode'])){
            $this->setId($x['periode']);
        }
        if(isset ($x['periode'])){
            $this->setPeriode($x['periode']);
        }
        unset($x);
        
        
    }
    
    public function getArrayTable(){
        $x = array(
            "periode"=>$this->getPeriode()
            
        );
        return $x;
    }
    
    public function getPeriode() {
        return $this->periode;
    }
    
    public function setPeriode($periode) {
        $this->periode = $periode;
    }
    /*
     public function getProject() {
     if(!$this->project){
     $this->project = new Box_Models_Master_Project();
     }
     return $this->project;
     }
     
     public function setProject(Box_Models_Master_Project $project) {
     $this->project = $project;
     }
     
     public function getPt() {
     if(!$this->pt){
     $this->pt = new Box_Models_Master_Pt();
     }
     return $this->pt;
     }
     
     public function setPt(Box_Models_Master_Pt $pt) {
     $this->pt = $pt;
     }
     
     */
    
    public function fillData($data) {
        $this->setArrayTable($data);
    }
    
    public function grouped() {
        return array();
    }
    
    public function getArray() {
        return $this->getArrayTable();
    }
    
    
}

?>
