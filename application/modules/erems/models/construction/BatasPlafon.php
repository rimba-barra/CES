<?php

/**
 * Description of BatasPlafon
 *
 * @author MIS
 */
class Erems_Models_Construction_BatasPlafon extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Kouti_Remora,  Erems_Box_Models_Master_InterProjectPt {
    private $project;
    private $pt;
    private $plafon;
    private $percent;
    private $targetRS;
    private $targetRE;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "batasplafon_";
       
    
    }
    
    public function setArrayTable($dataArray=NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        if(isset ($x['batasplafon_id'])){
           $this->setId($x['batasplafon_id']); 
        }
        if(isset ($x['persen_desc'])){
           $this->setPercent($x['persen_desc']); 
        }
      
        if(isset ($x['plafon_plafon_id'])){
           $this->getPlafon()->setId($x['plafon_plafon_id']); 
           
        }
        
        if(isset ($x['target_RS'])){
           $this->setTargetRS($x['target_RS']); 
        }
        
        if(isset ($x['target_RE'])){
           $this->setTargetRE($x['target_RE']); 
        }
       
        
        unset($x);
    }
    public function getArrayTable() {
        $x = array(
            "batasplafon_id"=>$this->getId(),
      
            "persen_desc"=>$this->getPercent(),
            "plafon_plafon_id"=>$this->getPlafon()->getId(),
            "target_RS"=>$this->getTargetRS(),
            "target_RE"=>$this->getTargetRE()
        );
        return $x;
                
    }
    
    public function getProject() {
        if(!$this->project){
            $this->project = new Erems_Box_Models_Master_Project();
        }
        return $this->project;
    }

    public function setProject(Erems_Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function getPt() {
        if(!$this->pt){
            $this->pt = new Erems_Box_Models_Master_Pt();
        }
        return $this->pt;
    }

    public function setPt(Erems_Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

    public function getPlafon() {
        if(!$this->plafon){
            $this->plafon = new Erems_Models_Construction_Plafon();
        }
        return $this->plafon;
    }

    public function setPlafon(Erems_Models_Construction_Plafon $plafon) {
        $this->plafon = $plafon;
    }

    public function getPercent() {
        return $this->percent;
    }

    public function setPercent($percent) {
        $this->percent = (double)$percent;
    }
    
    

    public function fillData($data) {
        $this->setArrayTable($data);
    }
    
    
    

    public function grouped() {
        return array($this->getPlafon());
    }

    public function getTargetRS() {
        return $this->targetRS;
    }

    public function getTargetRE() {
        return $this->targetRE;
    }

    public function setTargetRS($targetRS) {
        $this->targetRS = $targetRS;
    }

    public function setTargetRE($targetRE) {
        $this->targetRE = $targetRE;
    }


    
    
}

?>
