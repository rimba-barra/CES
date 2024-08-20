<?php
/**
 * Description of ParameterEntity
 *
 * @author MIS
 */
class Gl_Models_App_ParameterEntity implements Gl_Box_Arried{
    private $id;
    private $name;
    private $value;
    
    public function getId() {
        return $this->id;
    }

    public function setId($id) {
        $this->id = (int)$id;
    }

        
    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function getValue() {
        return $this->value;
    }

    public function setValue($value) {
        $this->value = $value;
    }

    public function getArray() {
       return array(
           "id"=>$this->getId(),
           "value"=>$this->getValue()
       );
    }


}

?>
