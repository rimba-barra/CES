<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of unitDocument
 *
 * @author TOMMY-MIS
 */
class Erems_Models_DocumentpembatalanModel extends Erems_Box_Models_ObjectEmbedData{
    private $cancellation_id;
    private $purchaseletter_id;
    private $unit;
    private $fileName;
    private $description;

    public function __construct() {
        parent::__construct();
        $this->embedPrefix = 'documentpembatalan_';
    }
    
    public function setArrayTable($dataArray=NULL) {
    
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
  
        if(isset ($x['cancellationdocument_id'])){
           $this->setId($x['cancellationdocument_id']); 
        }
        if(isset ($x['cancellation_id'])){
           $this->setCancellationId($x['cancellation_id']); 
        }
        if(isset ($x['purchaseletter_id'])){
           $this->setPurchaseletterId($x['purchaseletter_id']); 
        }
        if(isset ($x['filename'])){
           $this->setFileName($x['filename']); 
        }
        if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
                
        unset($x);
        
    }
    
    public function getArrayTable(){
        $x = array(
            "cancellationdocument_id"=>$this->getId(),
            "cancellation_id"=>$this->getCancellationId(),
            "purchaseletter_id"=>$this->getPurchaseletterId(),
            "filename"=>$this->getFileName(),
            "description"=>$this->getDescription(),
        );
      
        return $x;
    }

    public function getCancellationId() {
        return $this->cancellation_id;
    }

    public function getPurchaseletterId() {
        return $this->purchaseletter_id;
    }

    public function getFileName() {
        return $this->fileName;
    }

    public function getDescription() {
        return $this->description;
    }

    public function setCancellationId($cancellation_id) {
        $this->cancellation_id = $cancellation_id;
    }

    public function setPurchaseletterId($purchaseletter_id) {
        $this->purchaseletter_id = $purchaseletter_id;
    }

    public function setFileName($fileName) {
        $this->fileName = $fileName;
    }

    public function setDescription($description) {
        $this->description = $description;
    }
}
