<?php

/**
 * Description of Upload
 *
 * @author tommytoban
 */


class Box_Models_App_ImageUpload {
    private $folder;
    private $extensions;
    private $errorMsg;
    private $success;
    private $prefixName;
    private $imageName;
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

    public function getExtensions() {
        return $this->extensions;
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

    public function setExtensions($extensions) {
        $this->extensions = $extensions;
    }
    
    public function getPrefixName() {
        return $this->prefixName;
    }

    public function setPrefixName($prefixName) {
        $this->prefixName = $prefixName;
    }

    public function getImageName() {
        return $this->imageName;
    }


            
    public function run(){
        $upload = new Zend_File_Transfer_Adapter_Http();
        $upload->addValidator('Extension', false, array('extension1' => $this->extensions,
            'case' => true));
        if(!$this->directUpload){
            $this->imageName = $this->prefixName.time().'.jpg';
        }else{
            $this->imageName = $this->directUploadFileName;
        }
        
        $upload->addFilter('Rename', array('target' => APPLICATION_PATH . '/..'.$this->folder. $this->imageName, 'overwrite' => true));

        try {
            $upload->receive();
            //var_dump($upload->getErrors());
            $er = $upload->getErrors();
            if(count($er)>0){
                $this->errorMsg = $er[0];
                $this->imageName = FALSE;
            }else{
                $this->success = TRUE;
            }
        } catch (Zend_File_Transfer_Exception $e) {
      
            $this->errorMsg = $e->getMessage();
        }
    }
}
