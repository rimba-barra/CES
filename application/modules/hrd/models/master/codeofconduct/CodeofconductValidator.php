<?php

class Hrd_Models_Master_Codeofconduct_CodeofconductValidator extends Box_Models_App_Validator {

    public function run(Hrd_Models_Master_Codeofconduct_Codeofconduct $d) {
        $msg = "";
        $pattern = '[~]';
        $dao 	= new Hrd_Models_Master_Codeofconduct_CodeofconductDao();
		
		/*
        if (empty($datadetail)) {
            $msg = "Data detail is required";
            $this->setStatus(TRUE);
        } else if (Box_Tools::codeExist($speriod, $d, 'accesslevel_id')) {
			$msg 	= "This period is already exists";
		} else {*/
            $this->setStatus(TRUE);
       // }



        $this->setMsg($msg);
    }

}

?>
