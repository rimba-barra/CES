<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of DecanForObject
 *
 * @author MIS
 */
class Master_Box_Models_App_DecanForObject extends Master_Box_Models_App_Decan {
    public function __construct($member) {
        $this->detail = array();
        
        foreach ($member as $k => $v) {
         
          
           
           $this->detail[] = new Master_Box_Models_App_DecanMember($v->getArrayTable());
            
        }
    }
}

?>
