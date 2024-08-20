<?php

/**
 * Description of Validator
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Komisi_Klaim_Validator extends Erems_Box_Models_App_Validator {
    public function run(Erems_Models_Komisi_Klaim_Klaim $k){
        $msg = "";
        
    
        $dao = new Erems_Models_Komisi_Dao();
      
        $nomorExist = $dao->klaimDataExist($k);
        
       
        
        $dataExist = Erems_Box_Tools::toObjectRow($nomorExist,new Erems_Models_Komisi_Klaim_Klaim());
        
        $idExist = FALSE;
        if($dataExist->getId()){
            if($k->getId()==0){
                $idExist = TRUE;
            }else{
             
                if($k->getId() <> $dataExist->getId()){
                    $idExist = TRUE;
                }
            }
        }
   
      
        if(strlen($k->getNomor_pengajuan()) < 3){
            $msg = "Nomor minimal 3 karakter";
        }else if($idExist){
            $msg = "Nomor : ".$k->getNomor_pengajuan()." sudah terdaftar.";
        }else if(count($k->getDetails())==0){
            $msg = "Tidak ada purchaseletter.";
        }else{
            $this->setStatus(TRUE);
            
        }
        $this->setMsg($msg);
    }
}
