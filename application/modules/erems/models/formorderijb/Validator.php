<?php

/**
 * Description of Validator
 *
 * @author RIZALDI-MIS
 */
class Erems_Models_Formorderijb_Validator extends Erems_Box_Models_App_Validator {
    
    private $session;
    public $params;

    public function getSession() {
        return $this->session;
    }

    public function setSession($session) {
        $this->session = $session;
    }
   public function run(Erems_Models_Formorderijb_FormOrderIJB $fa){
        $msg = "";
        
        /// check data sudah ada atau tidak
        // $dao = new Erems_Models_Formorderijb_Dao();
        // $exist = $dao->dataExist($this->session->getProject()->getId(),$this->session->getPt()->getId(),$fa->getFormorderijbNo());
        // $existbyunit = $dao->dataExistbyUnit($this->session->getProject(),$this->session->getPt(),$fa->getPurchaseletter()->getId());
        
        // $sudahAdaRecord = FALSE;
        // if(count($exist[0]) > 0){
            // if($exist[0][0]["formorderijb_id"] <> $fa->getId()){
                // $sudahAdaRecord = TRUE;
            // }
        // }
        // $sudahAdaRecordbyUnit = FALSE;
        // if(count($existbyunit[0]) > 0){
            // if($existbyunit[0][0]["formorderijb_id"] <> $fa->getId()){
                // $sudahAdaRecordbyUnit = TRUE;
            // }
        // }
        // echo $fa->getBiayaSplitz()<0;exit;
        
        $setStatus = FALSE;
        while(true){
            // added by rico 09062021
            // if(empty($fa->getFormorderijbNo())){
            //     $msg = "IJB No harus diisi";
            //     break;
            // }
            if(empty($fa->getFormorderijbDate())){
                $msg = "IJB Date harus diisi";
                break;
            }
            if($fa->getIsBiayaSplitz() == "1"){
                if($fa->getBiayaSplitz() == 0 || $fa->getBiayaSplitz() == "" ){
                    $msg = "Biaya Splitz harus diisi";
                    break;
                }
            }
            if($fa->getPurchaseletter()->getId()==0){
                $msg = "Purchaseletter tidak valid.";
                break;
            }

            $setStatus = TRUE;
            break;
        }
        $this->setStatus($setStatus);
        // if($fa->getPurchaseletter()->getId()==0){
        //     $msg = "Purchaseletter tidak valid.";
        // }
		// else if($sudahAdaRecord){
            // $msg = "Nomor form Order Ijb : ".$fa->getFormorderijbNo()." sudah terdaftar.";
        // }else if($sudahAdaRecordbyUnit){
            // $msg = "Ijb sudah terdaftar untuk unit tersebut.";
        // }else if($fa->getFormorderijbNo()==""){
            // $msg = "Silahkan isi IJB No.";
            
            // //validasi di lepas untuk cls surabaya edited imaam on 02/07/2019
// //        }else if($fa->getFormorderijbDate()==""){
// //            $msg = "Silahkan isi IJB Date.";
        
            
        // }
		// else{
  //           $this->setStatus(TRUE);
            
  //       }
        $this->setMsg($msg);
    }
}
