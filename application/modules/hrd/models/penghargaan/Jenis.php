<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Jenis
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Penghargaan_Jenis extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora {
    private $code;
    private $name;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "jenispenghargaan_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['jenispenghargaan_id'])){
           $this->setId($x['jenispenghargaan_id']); 
        }
        if(isset ($x['code'])){
           $this->setCode($x['code']); 
        }
         if(isset ($x['jenispenghargaan'])){
           $this->setName($x['jenispenghargaan']); 
        }
       
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'jenispenghargaan_id'=>$this->getId(),
             'code'=>$this->getCode(),
             'jenispenghargaan'=>$this->getName(),
           
        );
      
        return $x;
    }
    
    public function getCode() {
        return $this->code;
    }

    public function getName() {
        return $this->name;
    }

    public function setCode($code) {
        $this->code = $code;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }

}
