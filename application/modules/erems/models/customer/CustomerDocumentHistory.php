<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of CustomerDocument
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Customer_CustomerDocumentHistory extends Erems_Box_Models_ObjectEmbedData{
    private $type;
    private $Addon;
    private $Addby;
    private $fileName;
    private $description;
    private $user_fullname;
    private $alasan;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = 'customerdocument_';
    }
    
    public function setArrayTable($dataArray=NULL) {
    
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
  
        if(isset ($x['document_id'])){
           $this->setId($x['document_id']); 
        }
        if(isset ($x['type'])){
           $this->setType($x['type']); 
        }
        if(isset ($x['filename'])){
           $this->setFileName($x['filename']); 
        }
        if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
        if(isset ($x['Addby'])){
           $this->setAddby($x['Addby']); 
        }
        if(isset ($x['Addon'])){
           $this->setAddon(date("d-m-Y H:i:s", strtotime($x['Addon']))); 
        }
        if(isset ($x['user_fullname'])){
           $this->setUser_fullname($x['user_fullname']); 
        }
        if(isset ($x['alasan'])){
           $this->setAlasan($x['alasan']); 
        }
                
        unset($x);
        
    }
    
    public function getArrayTable(){
        $x = array(
            "document_id"=>$this->getId(),
            "filename"=>$this->getFileName(),
            "description"=>$this->getDescription(),
            "type"=>$this->getType(),
            "Addby"=>$this->getAddby(),
            "Addon"=>$this->getAddon(),
            "user_fullname"=>$this->getUser_fullname(),
            "alasan"=>$this->getAlasan()
        );
      
        return $x;
    }

    public function getFileName() {
        return $this->fileName;
    }

    public function getDescription() {
        return $this->description;
    }

    public function getType() {
        return $this->type;
    }

    public function getAddby() {
        return $this->Addby;
    }

    public function getAddon() {
        return date("d-m-Y H:i:s", strtotime($this->Addon));
    }

    public function getUser_fullname() {
        return $this->user_fullname;
    }

    public function getAlasan() {
        return $this->alasan;
    }

    public function setFileName($fileName) {
        $this->fileName = $fileName;
    }

    public function setDescription($description) {
        $this->description = $description;
    }

    public function setType($type) {
        $this->type = $type;
    }

    public function setAddby($Addby) {
        $this->Addby = $Addby;
    }

    public function setAddon($Addon) {
        $this->Addon = $Addon;
    }

    public function setUser_fullname($user_fullname) {
        $this->user_fullname = $user_fullname;
    }

    public function setAlasan($alasan) {
        $this->alasan = $alasan;
    }


}
