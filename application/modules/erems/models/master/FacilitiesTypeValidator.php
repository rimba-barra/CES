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
class Erems_Models_Master_FacilitiesTypeValidator extends Box_Models_App_Validator {
    public function run(Erems_Models_Master_FacilitiesType $d){
        $msg = "";
        
        $dao = new Erems_Models_Master_FacilitiesTypeDao();
        $codeCheckResult = $dao->codeExist($d);    
        
        if(strlen($d->getName()) < 1){
            $msg = "Tipe Fasilitas minimal 1 karakter";
        }else if(strlen($d->getCode()) < 2){
            $msg = "Kode Fasilitas minimal 2 karakter";
        }else if($codeCheckResult){
            $msg = "Code exist. Please choose another one";
        }else{
            $this->setStatus(TRUE);
            
        }
        $this->setMsg($msg);
    }
}

?>
