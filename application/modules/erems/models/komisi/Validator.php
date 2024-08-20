<?php

/**
 * Description of Validator
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Komisi_Validator extends Erems_Box_Models_App_Validator {
   public function run(Erems_Models_Komisi_KomisiTran $k){
        $msg = "";
        
    
        $dao = new Erems_Models_Komisi_Dao();
      
        $nomorExist = $dao->dataExist($k);
        
        $dataExist = Erems_Box_Tools::toObjectRow($nomorExist,new Erems_Models_Komisi_KomisiTran());
        
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
   
     
        
        
        if(strlen($k->getKomisitran_no()) < 3){
            $msg = "Nomor minimal 3 karakter";
        }else if($idExist){
            $msg = "Nomor : ".$k->getKomisitran_no()." sudah terdaftar.";
        }else if($k->getPurchaseletter()->getId()==0){
            $msg = "Purchaseletter tidak valid";
        }else if($k->getKomisi()->getId()==0){
            $msg = "Master komisi tidak valid";
        }else{
            $this->setStatus(TRUE);
            
        }
        $this->setMsg($msg);
    }
}
