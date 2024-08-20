<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of PlafonValidator
 *
 * @author MIS
 */
class Erems_Models_Construction_PlafonValidator extends Erems_Box_Models_App_Validator {
    public function run(Erems_Models_Construction_Plafon $pl){
        $msg = "";
        
       
       
        
        if(strlen($pl->getName())<2){
            $msg = "Code minimum 2 characters";
        }else if($pl->getPercent() <= 0){
            $msg = "Percent must be higher than 0";
        }else if($pl->getPercent() > 100){
            $msg = "Percent must be not higher than 100";
        }else{
            $this->setStatus(TRUE);
            
        }
        $this->setMsg($msg);
    }
}

?>
