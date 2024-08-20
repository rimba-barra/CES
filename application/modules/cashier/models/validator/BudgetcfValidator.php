<?php

class Cashier_Models_Validator_BudgetcfValidator extends Cashier_Box_Models_App_Validator {
    
    public $appRequest;
   
   public function run(Cashier_Models_Master_BudgetCF $pl){
        $msg = "";
       
        $dao = new Cashier_Models_Master_BudgetCFDao();
        $name = $dao->codeExist($pl,$this->appRequest);
        
        $idExist = 0;
        if($name){
            if(count($name[0]) > 0) {
                $idExist = $name[0][0]['budget_id'];
            }
        }

        if($idExist && ($pl->getId() != $idExist)){
            $msg = "COA ".$idExist." already inserted.";
        }
        else {
            $update = $dao->update($pl,$this->appRequest);

            if($update) {
                $msg = "Berhasil";
                $this->setStatus(TRUE);
            }
            else {
                $msg = "Unable to proccess data.";
            }
        }
     
        $this->setMsg($msg);
    }

    public function runV2(Cashier_Models_Master_BudgetCF $pl){
        $msg = "";
       
        $dao = new Cashier_Models_Master_BudgetCFDao();
        $name = $dao->codeExist($pl,$this->appRequest);
        
        $idExist = 0;
        if($name){
            if(count($name[0]) > 0) {
                $idExist = $name[0][0]['budget_id'];
            }
        }

        $update = $dao->update($pl,$this->appRequest);
        if($update) {
            $msg = "Berhasil";
            $this->setStatus(TRUE);
        }else {
            $msg = "Unable to proccess data.";
        }

        $this->setMsg($msg);
    }
}
