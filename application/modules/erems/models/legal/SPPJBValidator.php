<?php

/**
 * Description of SPPJBValidator
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Legal_SPPJBValidator extends Erems_Box_Models_App_Validator {
   public function run(Erems_Models_Legal_SPPJBSby $sb){
        $msg = "";
        
        /// check data sudah ada atau tidak
        /*
        $dao = new Erems_Models_Formorderajb_Dao();
        $exist = $dao->dataExist($sb);
        
        $sudahAdaRecord = FALSE;
        if(count($exist[0]) > 0){
            if($exist[0][0]["formorderajb_id"] <> $sb->getId()){
                $sudahAdaRecord = TRUE;
            }
        }
        */
        
        
        if(strlen($sb->getNumber()) < 3){
            $msg = "Nomor SPPJB minimal 3 karakter";
        }else if(intval($sb->getPihak1_parametersppjb_id())==0){
            $msg = "Pihak 1 tidak valid.";
        }else{
            $this->setStatus(TRUE);
            
        }
        $this->setMsg($msg);
    }
}
