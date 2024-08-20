<?php
class Erems_Models_MasterpanduanValidator extends Erems_Box_Models_App_Validator{
   public function run(Erems_Models_Masterpanduan $pl){
        $msg = "";
        
        $this->setStatus(TRUE);
        $this->setMsg($msg);
    }
}