<?php

/**
 * Description of Validator
 *
 * @author MIS
 */
class Erems_Models_Master_ProductCategoryValidator extends Erems_Box_Models_App_Validator{
    public function run(Erems_Models_Master_ProductCategory $pl){
        $msg = "";
        
        $dao = new Erems_Models_Master_ProductCategoryDao();
        $code = $dao->codeExist($pl);
        
        $idExist = 0;
        if($code){
            if(count($code[0]) > 0){
               
                $idExist = $code[0][0]['productcategory_id'];
            }
        }
       
        
        if(strlen($pl->getCode())<3){
            $msg = "Code minimum 3 character";
        }else if(strlen($pl->getCode())>5){
            $msg = "Code maximum 5 characters";
        }else if(strlen($pl->getName())<5){
            $msg = "Product Category minimum 5 characters";
        }else if(strlen($pl->getName())>30){
            $msg = "Product Category maximum 30 characters";
        }else if($idExist && ($pl->getId() != $idExist)){
            $msg = "Code already taken";
        }else{
            $this->setStatus(TRUE);
            
        }
        $this->setMsg($msg);
    }
}

?>
