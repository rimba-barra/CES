<?php


/**
 * Description of Validator
 *
 * @author MIS
 */
class Hrd_Models_Overtime_Index_Validator extends Box_Models_App_Validator  {
    public function run(Hrd_Models_Overtime_Index_Index $d){
        $msg = "";
        if($d->getOvertimeType()==0){
            $msg = "Invalid Overtime type";
        }else{
            $this->setStatus(TRUE);
            
        }
        $this->setMsg($msg);
    }
}

?>
