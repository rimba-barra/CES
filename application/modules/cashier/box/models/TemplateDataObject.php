<?php

abstract class Cashier_Box_Models_TemplateDataObject {

    private $id;
    private $addOn;
    private $addBy;
    private $modiOn;
    private $modiBy;
    private $inactiveOn;
    private $inactiveBy;
    private $deleteOn;
    private $deleteBy;
    private $actived;
    private $deleted;
    
    public function __construct() {
        
    }

    public function setId($id){
        $this->id = intval($id);
    }
    
    public function getId() {
        return $this->id;
    }
    
    public function setAddOn($ao){
        $this->addOn = $ao;
    }
    
    public function getAddOn(){
        return $this->addOn;
    }
    
    public function setAddBy($ao){
        $this->addBy = $ao;
    }
    
    public function getAddBy(){
        return $this->addBy;
    }
    
    public function setModiOn($ao){
        $this->modiOn = $ao;
    }
    
    public function getModiOn(){
        return $this->modiOn;
    }
    
    public function setModiBy($ao){
        $this->modiBy = $ao;
    }
    
    public function getModiBy(){
        return $this->modiBy;
    }
    
    public function setInactiveOn($ao){
        $this->inactiveOn = $ao;
    }
    
    public function getInactiveOn(){
        return $this->inactiveOn;
    }
    
    public function setInactiveBy($ao){
        $this->inactiveBy = $ao;
    }
    
    public function getInactiveBy(){
        return $this->inactiveBy;
    }
    
    public function setDeleteOn($ao){
        $this->deleteOn = $ao;
    }
    
    public function getDeleteOn(){
        return $this->deleteOn;
    }
    
    public function setDeleteBy($ao){
        $this->deleteBy = $ao;
    }
    
    public function getDeleteBy(){
        return $this->deleteBy;
    }
    
    public function setActived($ao){
        $this->actived = $ao;
    }
    
    public function getActived(){
        return $this->actived;
    }
    
    public function setDeleted($ao){
        $this->deleted = $ao;
    }
    
    public function getDeleted(){
        return $this->deleted;
    }
    
   

}

?>
