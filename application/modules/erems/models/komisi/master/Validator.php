<?php

/**
 * Description of Validator
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Komisi_Master_Validator extends Erems_Box_Models_App_Validator {
   public function run(Erems_Models_Komisi_Master_MasterKomisi $k){
        $msg = "";
        
        /// check data sudah ada atau tidak

        $dao = new Erems_Models_Komisi_Master_Dao();
        $exist = $dao->dataExist($k);
        
        $sudahAdaRecord = FALSE;
        if(count($exist[0]) > 0){
            if($exist[0][0]["komisi_id"] <> $k->getId()){
                $sudahAdaRecord = TRUE;
            }
        }
        
        
        
        if(strlen($k->getCode()) < 3){
            $msg = "Kode minimal 3 karakter";
        }else if($sudahAdaRecord){
            $msg = "Kode ".$k->getCode()." sudah terdaftar";
        }else{
            $this->setStatus(TRUE);
            
        }
        $this->setMsg($msg);
    }
}
