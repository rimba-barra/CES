<?php

/**
 * Description of Validator
 *
 * @author MIS
 */
class Hrd_Models_Parameters_Losttime_Validator extends Box_Models_App_Validator {
    public function run(Hrd_Models_Parameters_Losttime_LostTime $d){
        $msg = "";
        if(!$d->getAbsentType()->getId()){
            $msg = "Invalid absent type";
        }else{
            $this->setStatus(TRUE);
            
        }
        $this->setMsg($msg);
    }
}

?>
