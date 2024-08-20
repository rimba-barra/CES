<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of TestObj
 *
 * @author MIS
 */
class Erems_Models_Expenserequest_TestObj {
    private $id;
    private $name;
    private $dataArray;
    
    public function __construct($id=0,$name="") {
        $this->id = $id;
        $this->name = $name;
    
    }
    
    public function automateInsert(){
        $a = $this->dataArray;
        foreach($a as $k=>$v){
            
        }
    }
    
    public function getId() {
        return $this->id;
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function getDataArray() {
        return $this->dataArray;
    }

    public function setDataArray($dataArray) {
        $this->dataArray = $dataArray;
    }

    
    
    
}

?>
