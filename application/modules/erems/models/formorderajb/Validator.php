<?php

/**
 * Description of Validator
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Formorderajb_Validator extends Erems_Box_Models_App_Validator {
    private $session;
    public $params;

    public function getSession() {
        return $this->session;
    }

    public function setSession($session) {
        $this->session = $session;
    }
   public function run(Erems_Models_Formorderajb_FormOrderAJB $fa){
        $msg = "";
        //var_dump($fa->getPurchaseletter()->getId());
        /// check data sudah ada atau tidak
        // $dao = new Erems_Models_Formorderajb_Dao();
        // $exist = $dao->dataExist($fa);
        // $existbyunit = $dao->dataExistbyUnit($fa->getProject(),$fa->getPt(),$fa->getPurchaseletter()->getId());
        
        // $sudahAdaRecord = FALSE;
        // if(count($exist[0]) > 0){
            // if($exist[0][0]["formorderajb_id"] <> $fa->getId()){
                // $sudahAdaRecord = TRUE;
            // }
        // }
        // $sudahAdaRecordbyUnit = FALSE;
        // if(count($existbyunit[0]) > 0){
            // if($existbyunit[0][0]["formorderajb_id"] <> $fa->getId()){
                // $sudahAdaRecordbyUnit = TRUE;
            // }
        // }
        
        
        if($fa->getPurchaseletter()->getId()==0){
            $msg = "Purchaseletter tidak valid.";
        }
		// else if(strlen($fa->getNomor()) < 3){
            // $msg = "Nomor Form minimal 3 karakter.";
        // }
		else if(strlen($fa->getNomor()) > 200){
            $msg = "Nomor Form maksimal 200 karakter.";
        }
		// else if(strlen($fa->getDate()) < 3){
            // $msg = "Tanggal Form tidak valid.";
        // }
		// else if($sudahAdaRecord){
            // $msg = "Nomor form Order Ajb : ".$fa->getNomor()." sudah terdaftar.";
        // }
		// else if($sudahAdaRecordbyUnit){
            // $msg = "Ajb sudah terdaftar untuk unit tersebut.";
        // }
		else{
            $this->setStatus(TRUE);
            
        }
        $this->setMsg($msg);
    }
}
