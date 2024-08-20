<?php

/**
 * Description of RelationType
 *
 * @author MIS
 */
class Hrd_Models_Master_RelationType extends Box_Models_ObjectEmbedData {
    private $name;
    private $description;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "relationtype_";
    }
    
    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function getDescription() {
        return $this->description;
    }

    public function setDescription($description) {
        $this->description = $description;
    }


}

?>
