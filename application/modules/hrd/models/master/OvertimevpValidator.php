<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of OvertimevpValidator
 *
 * @author MIS
 */
class Hrd_Models_Master_OvertimevpValidator extends Box_Models_App_Validator {
    public function run(Hrd_Models_Master_Overtimevp $d){
        $msg = "";
        
        
        
        
        if($d->getStartYear()==0){
            $msg = "Invalid Start Year";
        }else if($d->getEndYear() < $d->getStartYear()){
            $msg = "End Year must be higher or same with start year";
        }else{
            $this->setStatus(TRUE);
            
        }
        $this->setMsg($msg);
    }
}

?>
