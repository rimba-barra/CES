<?php 

class Hrd_Models_Performancemanagement_CompetencyCategoryValidator extends Box_Models_App_Validator {
    
    public function run(Hrd_Models_Performancemanagement_CompetencyCategory $d){
        $msg 	= "";
        $dao 	= new Hrd_Models_Performancemanagement_CompetencyCategoryDao();
        $scode	= $dao->codeExist($d);
    
        if (strlen($d->code) < 5){
            $msg 	= "Code minimum 5 characters";
        } else if (Box_Tools::codeExist($scode, $d, 'competency_category_id')) {
        	$msg 	= "This code is already in use";
        } else if (strlen($d->category) < 5) {
        	$msg 	= "Competency Category minimum 5 characters";
        } else if ($d->description) {
        	$msg 	= "Please enter a description";
        } else {
            $this->setStatus(TRUE);
        }
        $this->setMsg($msg);
    }
}
?>