<?php

class Cashier_Models_Validator_MasterChequeDetailValidator extends Cashier_Box_Models_App_Validator {
    
    public $appRequest;
    public $session;
    public $action;
   
   public function run(Cashier_Models_Transaction_ChequeDetail $pl){
        $msg = "";
       

        $dao = new Cashier_Models_Master_ChequeDao();
        $name = $dao->codeExistDetail($pl,$this->appRequest);
     
        $idExist = 0;
        $val ='';
        if($name){
            if(count($name[0]) > 0) {
                $idExist = $name[0][0]['chequedetail_id'];
                $val = $name[0][0]['vid'];
            }
        }

        if($idExist && ($pl->getId() != $idExist)){
            $msg = "Voucher ".$val." already issued.";
        }
        else {
            
            if($this->action =='update') {
                $update = $dao->updatedetail($pl,$this->appRequest);
            }
            else {
                $update = $dao->savedetail($pl,$this->appRequest);
            }
           
            
            if($update) {
                $msg = "SUCCESS";
                $this->setStatus(TRUE);
            }
            else {
                $msg = "Unable to proccess data.";
            }
        }
     
        $this->setMsg($msg);
    }
}
