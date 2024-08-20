<?php

class Hrd_Models_Accessgroupdetail_AccessgroupdetailValidator extends Box_Models_App_Validator {

    public function run(Hrd_Models_Accessgroupdetail_Accessgroupdetail $d) {
        $msg = "";
        $pattern = '[~]';
		
        $this->setStatus(TRUE);
        $this->setMsg($msg);
    }

}

?>
