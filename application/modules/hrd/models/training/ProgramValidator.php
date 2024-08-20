<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ProgramValidator
 *
 * @author MIS
 */
class Hrd_Models_Training_ProgramValidator extends Box_Models_App_Validator {
    
    public function run(Hrd_Models_Training_Program $d){
        $msg = "";
    
        if(strlen($d->getCode()) < 1){
            $msg = "Code minimum 1 characters";
        }else if(Hrd_Models_App_Tools::isCodeExist(new Hrd_Models_Training_ProgramDao(), $d,"programtraining_id")){
            $msg = "Code already taken";
        }else if($d->getGroupTraining()->getId()==0){
            $msg = "Please input group training";
       
        }else{
            $this->setStatus(TRUE);
            
        }
        $this->setMsg($msg);
    }
}

?>
