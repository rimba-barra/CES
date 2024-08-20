<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of EmployeeValidator
 *
 * @author MIS
 */
class Hrd_Models_Master_GeneralParameterValidator extends Box_Models_App_Validator {
    public function run(Hrd_Models_Master_GeneralParameter $d){
        $msg = "";
        if(strlen($d->getName()) < 1){
            $msg = "Name minimum 1 characters";
        }else{
            
            /// check data exist;
            $dao = new Hrd_Models_Master_GeneralParameterDao();
            $exist = (int)$dao->exist($d);
            if($exist > 0 && $d->getId()==0){
                $msg = "Parameter already created with the module name";
            
            }else{
                $this->setStatus(TRUE); 
            }
            
            
            
        }
        $this->setMsg($msg);
    }
}

?>
