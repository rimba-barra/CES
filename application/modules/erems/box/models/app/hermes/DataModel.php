<?php

/**
 * Description of ConcreateProcessor
 *
 * @author MIS
 */
class Erems_Box_Models_App_Hermes_DataModel {
    private $dao;
    private $hasil;
    private $object;
    private $dataList;
    private $validator;
    private $idProperty;
    private $directResult;
    private $storedObject;
    
   
    
    /*@boolean*/
    private $requiredDataList;
    /*@boolean*/
    private $requiredModel;
    
    
    public function __construct() {
        $this->requiredDataList = TRUE;
        $this->requiredModel = TRUE;
    }
    
    public function getDao() {
        return $this->dao;
    }

    public function setDao($dao) {
        $this->dao = $dao;
    }

    public function getHasil() {
        return $this->hasil;
    }

    public function setHasil($hasil) {
        $this->hasil = $hasil;
    }

    public function getObject() {
        return $this->object;
    }

    public function setObject($object) {
        $this->object = $object;
    }

    public function getDataList() {
        return $this->dataList;
    }

    public function setDataList($dataList) {
        $this->dataList = $dataList;
    }
    
    public function getValidator() {
        return $this->validator;
    }

    public function setValidator($validator) {
        $this->validator = $validator;
    }
    
    /*added 6 Mei 2014*/
    public function getIdProperty() {
        return $this->idProperty;
    }

    public function setIdProperty($idProperty) {
        $this->idProperty = $idProperty;
    }
    
    public function getDirectResult() {
        return $this->directResult;
    }

    public function setDirectResult($directResult) {
        $this->directResult = $directResult;
    }
    
    public function getStoredObject() {
        return $this->storedObject;
    }

    public function setStoredObject($storedObject) {
        $this->storedObject = $storedObject;
    }
    
    public function getRequiredDataList() {
        return $this->requiredDataList;
    }

    public function setRequiredDataList($requiredDataList) {
        $this->requiredDataList = $requiredDataList;
    }

    public function getRequiredModel() {
        return $this->requiredModel;
    }

    public function setRequiredModel($requiredModel) {
        $this->requiredModel = $requiredModel;
    }
}

?>
