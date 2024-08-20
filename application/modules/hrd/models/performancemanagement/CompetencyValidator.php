<?php 

class Hrd_Models_Performancemanagement_CompetencyValidator extends Box_Models_App_Validator {
    
    public function run(Hrd_Models_Performancemanagement_Competency $d){
        $msg 	= "";
    	$dao 	= new Hrd_Models_Performancemanagement_CompetencyDao();
    	$scode 	= $dao->codeExist($d);

        if (strlen($d->code) < 5){
            $msg 	= "Code minimum 5 characters";
        } else if (Box_Tools::codeExist($scode, $d, 'competency_id')) {
        	$msg 	= "This code is already in use";
        } else if (!$d->desc) {
        	$msg 	= "Description field is still empty";
        } else {
            $this->setStatus(TRUE);
        }
        $this->setMsg($msg);
    }
}

?>