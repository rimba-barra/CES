<?php

/**
 * Description of Tlk
 *
 * @author MIS
 */
class Hrd_Models_Parameters_Tlk_Tlk extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,  Box_Models_Master_InterProjectPt  {
    private $code;
    private $name;
    private $project;
    private $pt;
    private $uangTransport;
    private $uangSaku;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "parametertlk_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['parametertlk_id'])){
           $this->setId($x['parametertlk_id']); 
        }
        if(isset ($x['code'])){
           $this->setCode($x['code']); 
        }
        if(isset ($x['name'])){
           $this->setName($x['name']); 
        }
        if(isset ($x['uang_transport'])){
           $this->setUangTransport($x['uang_transport']); 
        }
        if(isset ($x['uang_saku'])){
           $this->setUangSaku($x['uang_saku']); 
        }
       
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'parametertlk_id'=>$this->getId(),
            'code'=>$this->getCode(),
            'name'=>$this->getName(),
            'uang_transport'=>$this->getUangTransport(),
            'uang_saku'=>$this->getUangSaku()
        );
      
        return $x;
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

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getProject(),$this->getPt());
    }
    
    public function getUangTransport() {
        return $this->uangTransport;
    }

    public function getUangSaku() {
        return $this->uangSaku;
    }

    public function setUangTransport($uangTransport) {
        $this->uangTransport = $uangTransport;
    }

    public function setUangSaku($uangSaku) {
        $this->uangSaku = $uangSaku;
    }




}

?>
