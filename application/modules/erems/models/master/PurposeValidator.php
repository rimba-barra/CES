<?php

/**
 * Description of Validator
 *
 * @author MIS
 */
class Erems_Models_Master_PurposeValidator extends Erems_Box_Models_App_Validator{
    
    public $session;
    
    public function run(Erems_Models_Master_Purpose $pl){
        $msg = "";
        
        $dao = new Erems_Models_Master_PurposeDao();
        $code = $dao->codeExist($pl,$this->session->getProject()->getId(),$this->session->getPt()->getId());
        
        $idExist = 0;
        if($code){
            if(count($code[0]) > 0){
               
                $idExist = $code[0][0]['purpose_id'];
            }
        }
       
        
        if(strlen($pl->getCode())<2){
            $msg = "Code minimum 2 character";
        }else if(strlen($pl->getName())<5){
            $msg = "Purpose minimum 5 characters";
        } else if($idExist && ($pl->getId() != $idExist)){
            $msg = "Code already taken";
        }else{
            $this->setStatus(TRUE);
            
        }
        $this->setMsg($msg);
    }
}

?>
