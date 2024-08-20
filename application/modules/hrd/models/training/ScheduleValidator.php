<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ScheduleValidator
 *
 * @author MIS
 */
class Hrd_Models_Training_ScheduleValidator extends Box_Models_App_Validator {
    public function run(Hrd_Models_Training_Schedule $d){
        $msg = "";
    
        if($d->getProgram()->getId()==0){
            $msg = "Please input Training Program";
        }else if(strlen($d->getLocation()) < 5){
            $msg = "Location minimum 5 characters";
        }else if(!$d->getStartDate()){
            $msg = "Please input start date";
        }else if(!$d->getEndDate()){
            $msg = "Please input end date";
        //}else if(Hrd_Models_App_Tools::isCodeExist(new Hrd_Models_Training_ScheduleDao(), $d,"scheduletraining_id")){
           // $msg = "Other schedule already exist in this date range ";
        }else{
            $this->setStatus(TRUE);
            
        }
        $this->setMsg($msg);
    }
}

?>
