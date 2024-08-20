<?php

/**
 * Description of CitraClubValidator
 *
 * @author MIS
 */
class Erems_Models_Master_CitraClubValidator extends Erems_Box_Models_App_Validator {
    public function run(Erems_Models_Master_CitraClub $pl){
        $msg = "";
        
        $dao = new Erems_Models_Master_CitraClubDao();
        $code = $dao->codeExist($pl);
        
        $idExist = 0;
        if($code){
            if(count($code[0]) > 0){
               
                $idExist = $code[0][0]['citraclub_id'];
            }
        }
       
        
        if(strlen($pl->getCode())<1){
            $msg = "Code minimum 1 character";
        }else if(strlen($pl->getName())<5){
            $msg = "Name minimum 5 characters";
      
        } else if($idExist && ($pl->getId() != $idExist)){
            $msg = "Code already taken";
        }else{
            $this->setStatus(TRUE);
            
        }
        $this->setMsg($msg);
    }
}

?>
