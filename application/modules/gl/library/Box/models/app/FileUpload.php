<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of FileUpload
 *
 * @author TOMMY-MIS
 */
class Gl_Box_Models_App_FileUpload {
    private $folder;
    private $prefixName;
    private $errorMsg;
    private $success;
    private $extensions;
    private $fileName;
    private $directUpload;
    private $directUploadFileName;
    
    public function __construct($folder=FALSE,$prefixName=FALSE,$ext=FALSE) {
        $this->folder = $folder; // "/public/uploads/"
        $this->extensions = $ext; // "jpg,gif"
        $this->success = FALSE;
        $this->prefixName = $prefixName;
        $this->directUpload = FALSE;
    }
    
    public function setDirectUpload($directUpload,$fileName) {
        $this->directUpload = $directUpload;
        $this->directUploadFileName = $fileName;
    }

        
    
    
    public function getFolder() {
        return $this->folder;
    }

    public function getErrorMsg() {
        return $this->errorMsg;
    }

    public function isSuccess() {
        return $this->success;
    }

    public function setFolder($folder) {
        $this->folder = $folder;
    }

   
    public function getFileName(){
        return $this->fileName;
    }



            
    public function run(){
        $upload = new Zend_File_Transfer_Adapter_Http();
        $upload->addValidator('Extension', false, array('extension1' => $this->extensions,
            'case' => true));
        
        $selectedExt = "";
        if($this->extensions){
            $temp = explode(",", $this->extensions);
            $selectedExt = $temp[0];
            unset($temp);
        }
        
        if(!$this->directUpload){
            $this->fileName = $this->prefixName.'.'.$selectedExt;
        }else{
            $this->fileName = $this->directUploadFileName;
        }
        
        $upload->addFilter('Rename', array('target' => APPLICATION_PATH . '/..'.$this->folder. $this->fileName, 'overwrite' => true));

        try {
            $upload->receive();
            //var_dump($upload->getErrors());
            $er = $upload->getErrors();
            if(count($er)>0){
                $this->errorMsg = $er[0];
                $this->fileName = FALSE;
            }else{
                $this->success = TRUE;
            }
        } catch (Zend_File_Transfer_Exception $e) {
      
            $this->errorMsg = $e->getMessage();
        }
    }
}
