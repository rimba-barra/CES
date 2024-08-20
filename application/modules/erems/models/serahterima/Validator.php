<?php

/**
 * Description of Validator
 *
 * @author RIZALDI-MIS
 */
class Erems_Models_Serahterima_Validator extends Erems_Box_Models_App_Validator {
    
    private $session;
    public $params;

    public function getSession() {
        return $this->session;
    }

    public function setSession($session) {
        $this->session = $session;
    }
   public function run(Erems_Models_Serahterima_Serahterima $fa){
        $msg = "";
        
        /// check data sudah ada atau tidak
        $dao = new Erems_Models_Serahterima_Dao();
        $existbyunit = $dao->dataExistbyUnit($this->session->getProject(),$this->session->getPt(),$fa->getPurchaseletter()->getId());
        
        $sudahAdaRecordbyUnit = FALSE;
        if(count($existbyunit[0]) > 0){
            if($existbyunit[0][0]["serahterima_id"] <> $fa->getId()){
                $sudahAdaRecordbyUnit = TRUE;
            }
        }
        
        if($fa->getPurchaseletter()->getId()==0){
            $msg = "Purchaseletter tidak valid.";
        }else if($fa->getSerahterimaDate()==''){
            $msg = "Silahkan isi tanggal serah terima.";
        }else if($sudahAdaRecordbyUnit){
            $msg = "Sudah terdaftar untuk unit tersebut.";
        }else{
            $this->setStatus(TRUE);
            
        }
        $this->setMsg($msg);
    }
}
