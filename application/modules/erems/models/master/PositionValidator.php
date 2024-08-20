<?php

/**
 * Description of Validator
 *
 * @author MIS
 */
class Erems_Models_Master_PositionValidator extends Erems_Box_Models_App_Validator{
    public function run(Erems_Models_Master_Position $pl){
        $msg = "";
        
        $dao = new Erems_Models_Master_PositionDao();
        $code = $dao->codeExist($pl);
        
        $idExist = 0;
        if($code){
            if(count($code[0]) > 0){
               
                $idExist = $code[0][0]['position_id'];
            }
        }
       
        
        if(strlen($pl->getCode())<1){
            $msg = "Code Posisi minimum 1 karakter";
        }else if(strlen($pl->getCode())>5){
            $msg = "Code Posisi maksimal 5 karakter";
        }else if(strlen($pl->getName())<5){
            $msg = "Nama Posisi minimum 5 karakter";
        }else if($pl->getCluster()->getId()==0){
            $msg = "Invalid cluster";
        } else if($idExist && ($pl->getId() != $idExist)){
            $msg = "Code already taken";
        }else{
            $this->setStatus(TRUE);
            
        }
        $this->setMsg($msg);
    }
}

?>
