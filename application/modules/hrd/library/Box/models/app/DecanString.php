<?php

/**
 * Description of DecanString
 *
 * @author MIS
 */
class Box_Models_App_DecanString extends Box_Models_App_Decan {

    public function __construct($member) {
        $this->detail = array();
        $this->key = "key";
        foreach ($member as $k => $v) {
       


            $a = array();
            $a[$this->key] = $v;
            $this->detail[] = new Box_Models_App_DecanMember($a);
        }
    }

}

?>
