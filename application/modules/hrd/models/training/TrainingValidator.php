<?php

/**
 * Description of TrainingValidator
 *
 * @author MIS
 */
class Hrd_Models_Training_TrainingValidator extends Box_Models_App_Validator {
    public function run(Hrd_Models_Training_Training $d){
        $msg = "";
        
        
    
        if($d->getSchedule()->getId()==0){
            $msg = "Please input Schedule Training";
        }else if(Hrd_Models_App_Tools::isCodeExist(new Hrd_Models_Training_TrainingDao(), $d,"training_id")){
           $msg = "Schedule already taken";
        }else if(count($d->getEmployee())==0){
            $msg = "Karyawan tidak ada";
        }else{
            $this->setStatus(TRUE);
            
        }
        $this->setMsg($msg);
    }
}

?>
