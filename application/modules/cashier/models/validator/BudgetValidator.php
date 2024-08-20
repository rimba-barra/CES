<?php

class Cashier_Models_Validator_BudgetValidator extends Cashier_Box_Models_App_Validator {
    
    public $appRequest;
   
   public function run(Cashier_Models_Master_BudgetCoa $pl){
        $msg = "";
       
        $dao = new Cashier_Models_Master_BudgetCoaDao();
        $name = $dao->codeExist($pl,$this->appRequest);
        
        $idExist = 0;
        if($name){
            if(count($name[0]) > 0) {
                $idExist = $name[0][0]['budget_id'];
            }
        }

        if($idExist && ($pl->getId() == $idExist)){
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

    public function run_v2(Cashier_Models_Master_BudgetCoa $pl){ //untuk update tanpa dicek id nya ini untuk master budget coa
        $msg = "";
       
        $dao = new Cashier_Models_Master_BudgetCoaDao();
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
