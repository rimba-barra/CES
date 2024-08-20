<?php


/**
 * Description of Object
 *
 * @author MIS
 */

class Erems_Box_Models_App_Config_Object {
    private $id;
    private $name;
    public function __construct($id,$name) {
        $this->id = $id;
        $this->name = $name;
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
    
    


    
}

?>
