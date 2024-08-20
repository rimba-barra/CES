<?php

/**
 * Description of SourceMoneyValidator
 *
 * @author MIS
 */
class Erems_Models_Master_SourceMoneyValidator extends Erems_Box_Models_App_Validator {
    public function run(Erems_Models_Master_SourceMoney $pl){
        $msg = "";
        
        $dao = new Erems_Models_Master_SourceMoneyDao();
        $code = $dao->codeExist($pl);
        
        $idExist = 0;
        if($code){
            if(count($code[0]) > 0){
               
                $idExist = $code[0][0]['sourcemoney_id'];
            }
        }
       
        
        if(strlen($pl->getName())<1){
            $msg = "Code minimum 1 character";
       
        } else if($idExist && ($pl->getId() != $idExist)){
            $msg = "Code already taken";
        }else{
            $this->setStatus(TRUE);
            
        }
        $this->setMsg($msg);
    }
}

?>
