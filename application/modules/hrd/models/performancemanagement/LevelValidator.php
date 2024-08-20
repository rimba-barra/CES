<?php

class Hrd_Models_Performancemanagement_LevelValidator extends Box_Models_App_Validator {
    
    public function run(Hrd_Models_Performancemanagement_Level $d) {
        $msg 	= "";
        $dao 	= new Hrd_Models_Performancemanagement_LevelDao();
        $scode 	= $dao->codeExist($d);

        if ($d->nameid == 0) {
        	$msg 	= "Invalid Competency Name";
        } else if ($d->catid == 0) {
        	$msg 	= "Invalid Competency Level";
        } else if (strlen($d->code) < 5) {
            $msg = "Code minimum 5 characters";
		} else if (Box_Tools::codeExist($scode, $d, 'level_id')) {
			$msg 	= "This code is already in use";
		} else if (!$d->desc) {
			$msg 	= "Description field is still empty";      
		} else if (!$d->sample) {
			$msg 	= "Sample Behaviour field is still empty";    
        } else {
            $this->setStatus(TRUE);
        }
        $this->setMsg($msg);
    }
}

?>
