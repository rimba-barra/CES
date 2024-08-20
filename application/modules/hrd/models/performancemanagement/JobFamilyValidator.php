<?php 

class Hrd_Models_Performancemanagement_JobFamilyValidator extends Box_Models_App_Validator {
    
    public function run(Hrd_Models_Performancemanagement_JobFamily $d){
        $msg 	= "";
        $dao 	= new Hrd_Models_Performancemanagement_JobFamilyDao();
        $scode 	= $dao->codeExist($d);
    
        if (strlen($d->code) < 5){
            $msg 	= "Code minimum 5 characters";
        } else if (Box_Tools::codeExist($scode, $d, 'jobfamily_id')) {
        	$msg 	= "This code is already in use";
        } else if (strlen($d->jobfamily) < 5) {
        	$msg 	= "Job Family name minimum 5 characters";
        } else if (!$d->description) {
        	$msg 	= "Please enter a description";
        } else {
            $this->setStatus(TRUE);
        }
        $this->setMsg($msg);
    }
}

?>