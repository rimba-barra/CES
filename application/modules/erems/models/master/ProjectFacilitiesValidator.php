<?php

/**
 * Description of Validator
 *
 * @author MIS
 */
class Erems_Models_Master_ProjectFacilitiesValidator extends Erems_Box_Models_App_Validator{
    public function run(Erems_Models_Master_ProjectFacilities $pl){
        $msg = "";
        
        $dao = new Erems_Models_Master_ProjectFacilitiesDao();
        $codeCheckResult = $dao->codeExist($pl);

        if(strlen($pl->getName()) < 3){
            $msg = "Nama Project Facilities minimum 3 characters";
        }else if(strlen($pl->getCode()) < 3){
            $msg = "Code Project Facilities minimum 3 character";
        }else if(strlen($pl->getCode()) > 5){
            $msg = "Code Project Facilities maksimum 5 character";
        }else if($pl->getFacilitiesType()->getId() == 0){
            $msg = "Please insert facilities type";
        }else if($codeCheckResult){
            $msg = "Code exist. Please choose another one";
        }else{
            $this->setStatus(TRUE);
        }
        $this->setMsg($msg);
    }
}

?>
