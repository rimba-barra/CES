<?php
/**
 * Description of GroupValidator
 *
 * @author MIS
 */
class Hrd_Models_Training_GroupValidator extends Box_Models_App_Validator {
   
    
    public function run(Hrd_Models_Training_Group $d){
        $msg = "";
    
        if(strlen($d->getCode()) < 1){
            $msg = "Code minimum 1 characters";
        }else if(Hrd_Models_App_Tools::isCodeExist(new Hrd_Models_Training_GroupDao(), $d,"grouptraining_id")){
            $msg = "Code already taken";
        }else{
            $this->setStatus(TRUE);
            
        }
        $this->setMsg($msg);
    }
}

?>
