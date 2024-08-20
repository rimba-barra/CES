<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ReportTo
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Master_ReportTo extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora {
    private $nik; //added by ahmad riadi 20092017
    private $name;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "reportto_";
        
        
    }
    
    public function setArrayTable($dataArray=NULL) {
   
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
  
        if(isset ($x['reportto'])){
           $this->setId($x['reportto']); 
        }
        if(isset ($x['name'])){
           $this->setName($x['name']); 
        }
        if(isset ($x['nik'])){ //added by ahmad riadi 20092017
           $this->setNik($x['nik']); 
        }       
        
        unset($x);

        
    }
    
    public function getArrayTable(){
        $x = array(
            "reportto"=>$this->getId(),
            "name"=>$this->getName(),
            "nik"=>$this->getNik(), //added by ahmad riadi 20092017
            
           
        );
       
        return $x;
    }
    
    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }
    
    //added by ahmad riadi 20092017
    function getNik() {
        return $this->nik;
    }

    function setNik($nik) {
        $this->nik = $nik;
    }
            
    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }

}
