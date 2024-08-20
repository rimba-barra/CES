<?php

/**
 * Description of NegaraTujuan
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Dinas_NegaraTujuan extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,Box_Models_Master_InterProjectPt {
    private $project;
    private $pt;
    private $name;
    private $code;
    private $isLuarNegeri;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "negaratujuan_";
    }
    
    
    
    
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['negaratujuan_id'])){
           $this->setId($x['negaratujuan_id']); 
        }
        if(isset ($x['negaratujuan'])){
           $this->setName($x['negaratujuan']); 
        }
        if(isset ($x['code'])){
           $this->setCode($x['code']); 
        }
        if(isset ($x['is_luarnegeri'])){
           $this->setIsLuarNegeri($x['is_luarnegeri']); 
        }
     
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'negaratujuan_id'=>$this->getId(),
            'negaratujuan'=>$this->getName(),
            'code'=>$this->getCode(),
            'is_luarnegeri'=>$this->getIsLuarNegeri()
           
        );
      
        return $x;
    }
    
    public function getName() {
        return $this->name;
    }

    public function getCode() {
        return $this->code;
    }

    public function getIsLuarNegeri() {
        return $this->isLuarNegeri;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function setCode($code) {
        $this->code = $code;
    }

    public function setIsLuarNegeri($isLuarNegeri) {
        $this->isLuarNegeri = $isLuarNegeri;
    }

        
    public function fillData($data) {
        $this->setArrayTable($data);
    }
    

    public function getProject() {
        if(!$this->project){
            $this->project = new Box_Models_Master_Project();
        }
        return $this->project;
    }

    public function getPt() {
        if(!$this->pt){
            $this->pt = new Box_Models_Master_Pt();
        }
        return $this->pt;
    }

    public function grouped() {
        return array();
    }

    public function setProject(\Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function setPt(\Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

}
