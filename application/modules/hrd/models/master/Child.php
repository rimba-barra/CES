<?php

/**
 * Description of Child
 *
 * @author MIS
 */
class Hrd_Models_Master_Child extends Hrd_Models_Master_Relation{
    public function __construct($embedPrefix = NULL) {
        parent::__construct($embedPrefix);
        $this->embedPrefix = "child_";
        $type = new Hrd_Models_Master_RelationType();
        $type->setId(Box_Config::getv("RT_CHILD"));
        $this->setRelationType($type);
        
    }
    
  
    
    public function getArrayTable() {
        $x = parent::getArrayTable();
        $x["relationtype_id"] = Box_Config::getv("RT_CHILD");
        return $x;
    }
    
   

    
}

?>
