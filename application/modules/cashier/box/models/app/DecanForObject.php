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
class Cashier_Box_Models_App_DecanForObject extends Cashier_Box_Models_App_Decan {
    public function __construct($member) {
        $this->detail = array();
        
        foreach ($member as $k => $v) {
         
          
           
           $this->detail[] = new Cashier_Box_Models_App_DecanMember($v->getArrayTable());
            
        }
    }
}

?>
