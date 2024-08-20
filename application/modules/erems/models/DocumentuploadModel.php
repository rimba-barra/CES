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
class Erems_Models_DocumentuploadModel extends Erems_Box_Models_ObjectEmbedData{
    private $sppjb_id;
    private $doc_doc_filename;
    private $document_type;
    private $doc_type;
    private $description;
    private $purchaseletter_id;

    public function __construct() {
        parent::__construct();
        $this->embedPrefix = 'documentupload_';
    }
    
    public function setArrayTable($dataArray=NULL) {
    
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
  
        if(isset ($x['sppjb_doc_id'])){
           $this->setId($x['sppjb_doc_id']); 
        }
        if(isset ($x['sppjb_id'])){
           $this->setCancellationId($x['sppjb_id']); 
        }
        if(isset ($x['doc_filename'])){
           $this->setFileName($x['doc_filename']); 
        }
        if(isset ($x['doc_type'])){
           $this->setFileType($x['doc_type']); 
        }
        if(isset ($x['document_type'])){
           $this->setDocumentType($x['document_type']); 
        }
        if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
                
        unset($x);
        
    }
    
    public function getArrayTable(){
        $x = array(
            "sppjb_doc_id"=>$this->getId(),
            "sppjb_id"=>$this->getSppjbId(),
            "doc_filename"=>$this->getFileName(),
            "doc_type"=>$this->getFileType(),
            "document_type"=>$this->getDocumentType(),
            "description"=>$this->getDescription(),
        );
      
        return $x;
    }

    public function getSppjbId() {
        return $this->sppjb_id;
    }

    public function getFileName() {
        return $this->doc_filename;
    }

    public function getFileType() {
        return $this->doc_type;
    }

    public function getDocumentType() {
        return $this->document_type;
    }

    public function getFileType() {
        return $this->doc_type;
    }

    public function setSppjbId($sppjb_id) {
        $this->sppjb_id = $sppjb_id;
    }

    public function setFileType($doc_filename) {
        $this->doc_filename = $doc_filename;
    }

    public function setFileTyoe($doc_type) {
        $this->doc_type = $doc_type;
    }

    public function setDocumentType($document_type) {
        $this->document_type = $document_type;
    }

    public function setDescription($description) {
        $this->description = $description;
    }
}
