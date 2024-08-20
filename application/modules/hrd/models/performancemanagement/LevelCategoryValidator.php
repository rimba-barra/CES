<?php 
/*  ZEND VALIDATOR MODELS FOR 'Competency Level' */

class Hrd_Models_Performancemanagement_LevelCategoryValidator extends Box_Models_App_Validator {
    
    public function run(Hrd_Models_Performancemanagement_LevelCategory $d){
        $msg 	= "";
        $dao 	= new Hrd_Models_Performancemanagement_LevelCategoryDao();
        $scode 	= $dao->codeExist($d);
    
        if (strlen($d->code) < 5){
            $msg 	= "Code minimum 5 characters";
        } else if (Box_Tools::codeExist($scode, $d, 'level_cateogry_id')) {
        	$msg 	= "This code is already in use";
        } else if (strlen($d->category) < 5) {
        	$msg 	= "Competency Level minimum 5 characters";
        } else {
            $this->setStatus(TRUE);
        }
        $this->setMsg($msg);
    }
}

?>