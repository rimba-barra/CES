<?php

class Hrd_Models_Performancemanagement_CompetencyNamesValidator extends Box_Models_App_Validator {
    
    public function run(Hrd_Models_Performancemanagement_CompetencyNames $d) {
        $msg 	= "";
        $dao 	= new Hrd_Models_Performancemanagement_CompetencyNamesDao();
        $scode 	= $dao->codeExist($d);

        if (strlen($d->code) < 5) {
            $msg 	= "Code minimum 5 characters";
        } else if ($d->catid == 0) {
        	$msg 	= "Invalid Competency Category";
        } else if (Box_Tools::codeExist($scode, $d, 'competency_name_id')) {
        	$msg 	= "This code is already in use";
        } else if (strlen($d->name) < 5) {
        	$msg 	= "Competency Name minimum 5 characters";
        } else if (!$d->desc) {
        	$msg 	= "Description field is still empty";
        } else if (!$d->interview) {
            $msg    = "Interview Question field is still empty";
        } else if (!$d->tips) {
            $msg    = "Competency Development Tips field is still empty";
        } else if (!$d->media) {
            $msg    = "Competency Development Media field is still empty";
        } else {    
            $this->setStatus(TRUE);
        }
        $this->setMsg($msg);
    }
}

?>
