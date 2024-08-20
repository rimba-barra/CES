<?php

/**
 * Description of Validator
 *
 * @author MIS
 */
class Hrd_Models_Parameters_GlobalValidator extends Box_Models_App_Validator {
    public function run(Hrd_Models_Parameters_Global $d){
        $msg = "";
        var_dump($d->getArrayTable());
        if(!$d->getAbsentType()->getId()){
            $msg = "Invalid absent type";
        }else{
            $this->setStatus(TRUE);
            
        }
        $this->setMsg($msg);
    }
}

?>
