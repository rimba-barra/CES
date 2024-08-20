<?php

/**
 * Description of Validator
 *
 * @author MIS
 */
class Erems_Models_Master_BlockValidator extends Erems_Box_Models_App_Validator{
    public function run(Erems_Models_Master_BlockTran $pl){
        $msg = "";
        
        $dao = new Erems_Models_Master_BlockDao();
        $code = $dao->codeExist($pl);
        
        $idExist = 0;
        if($code){
            if(count($code[0]) > 0){
               
                $idExist = $code[0][0]['block_id'];
            }
        }
       
        
        if(strlen($pl->getCode())<1){
            $msg = "Code Block minimum 1 character";
        }else if(strlen($pl->getCode())>5){
            $msg = "Code Block maksimum 5 character";
        }else if(strlen($pl->getName())<5){
            $msg = "Name minimum 5 characters";
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
