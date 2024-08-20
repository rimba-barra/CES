<?php

/**
 * Description of Validator
 *
 * @author TOMMY-MIS
 */
class Master_Models_Project_Validator extends Master_Box_Models_App_Validator {
   public function run(Master_Models_Project_Project $p){
        $msg = "";
        
        /// check data sudah ada atau tidak
        $dao = new Master_Models_Project_Dao();
        $exist = $dao->dataExist($p);
        
        $sudahAdaRecord = FALSE;
        if(count($exist[0]) > 0){
            if($exist[0][0]["project_id"] <> $p->getId()){
                $sudahAdaRecord = TRUE;
            }
        }
 
        
        
        if(strlen($p->getName()) < 3){
            $msg = "Nama Project minimal 3 karakter.";
        }else if(strlen($p->getCode()) < 2){
            $msg = "Short Name minimal 2 karakter";
        }else if($sudahAdaRecord){
            $msg = "Project dengan nama : ".$p->getName()." sudah terdaftar.";
        }else{
            $this->setStatus(TRUE);
            
        }
        $this->setMsg($msg);
    }
}
