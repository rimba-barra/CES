<?php


/**
 * Description of DecanMember
 *
 * @author MIS
 */
class Erems_Box_Models_App_DecanMember implements Erems_Box_Arried {
    private $data;
    public function __construct($data) {
        $this->data = (array)$data;
    }
    public function getArray() {
       return $this->data;
    }   
}

?>
