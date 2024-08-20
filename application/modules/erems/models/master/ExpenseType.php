<?php

/**
 * Description of ExpenseType
 *
 * @author MIS
 */
class Erems_Models_Master_ExpenseType extends Erems_Box_Models_ObjectEmbedData {
    private $name;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = 'expensetype_';
    }
    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }
    
    public function setArrayTable($dataArray=NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        $this->setId($x['expensetype_id']);
        $this->setName($x['expensetype']);
        
    }
    
    
    public function getArrayTable(){
        $x = array();
        $x['expensetype_id'] = $this->getId();
        $x['expensetype']  = $this->getName();
        return $x;
    }


}

?>
