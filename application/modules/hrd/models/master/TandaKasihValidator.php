<?php

/**
 * Description of TandaKasihValidator
 *
 * @author MIS
 */
class Hrd_Models_Master_TandaKasihValidator extends Box_Models_App_Validator {
    public function run(Hrd_Models_Master_TandaKasih $d){
        $msg = "";
        
        
        
        
        if($d->getGroup()->getId()==0){
            $msg = "Invalid category";
        }else if(Hrd_Models_App_Tools::isCodeExist(new Hrd_Models_Master_TandaKasihDao(), $d,"tandakasih_id")){
            $msg = "Data has been added by this category (golongan).";
        }else{
            $this->setStatus(TRUE);
            
        }
        $this->setMsg($msg);
    }
}

?>
