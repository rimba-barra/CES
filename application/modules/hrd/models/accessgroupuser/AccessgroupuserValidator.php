<?php

class Hrd_Models_Accessgroupuser_AccessgroupuserValidator extends Box_Models_App_Validator {

    public function run(Hrd_Models_Accessgroupuser_Accessgroupuser $d) {
        $msg = "";
        $pattern = '[~]';
		
        $dao 	= new Hrd_Models_Accessgroupuser_AccessgroupuserDao();
        $semployee_id 	= $dao->codeExist($d);
		/*
        if (empty($datadetail)) {
            $msg = "Data detail is required";
            $this->setStatus(TRUE);
        } else */
        if (Box_Tools::codeExist($semployee_id, $d, 'employee_id')) {
                $msg 	= "This Employee is already exists";
        } else {
            $this->setStatus(TRUE);
        }

        $this->setMsg($msg);
    }

}

?>
