<?php

class Cashier_Models_Validator_MultiProjectValidator extends Cashier_Box_Models_App_Validator {
    
  
   
   public function run($pl){
        $msg = "";   
        $dao = $this->controller->getDao();
        $name = $dao->codeExist($pl,$this->appRequest);
        
        $idExist = 0;
        $val ='';
        $val2 ='';
        if($name){

            if(count($name[0]) > 0) {
                $idExist = $name[0][0]['user_id'];
                $val = $name[0][0]['user_fullname'];
                $val2 = $name[0][0]['project_name'];
            }
        }

        if($idExist && ($pl->getId() != $idExist)){
            $msg = "".$val." already had access to ".$val2."";
        }
        else {
            
            if($this->action =='update') {
               
                $update = $dao->update($pl,$this->appRequest);
            }
            else {
                $update = $dao->save($pl,$this->appRequest);
            }
           
            
            if($update) {
                $msg = "Success";
                $this->setStatus(TRUE);
            }
            else {
                $msg = "Unable to proccess data.";
            }
        }
     
        $this->setMsg($msg);
    }
}
