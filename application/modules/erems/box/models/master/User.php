<?php

/**
 * Description of User
 *
 * @author MIS
 */
class Erems_Box_Models_Master_User extends Erems_Box_Models_ObjectEmbedData {
    private $name;
    private $fullName;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = 'user_';
    }
   
    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function getFullName() {
        return $this->fullName;
    }

    public function setFullName($fullName) {
        $this->fullName = $fullName;
    }
    
    public function setArrayTable($dataArray=NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        $this->setId($x['user_id']);
        $this->setName($x['user_name']);
        $this->setFullName($x['user_fullname']);
        
    }
    
    public function getArrayTable(){
        $x = array();
        $x['user_id'] = $this->getId();
        $x['user_name']  = $this->getName();
        $x['user_fullname'] = $this->getFullName();
        return $x;
    }


}

?>
