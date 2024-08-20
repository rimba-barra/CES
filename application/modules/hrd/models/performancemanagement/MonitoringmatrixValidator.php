<?php

class Hrd_Models_Performancemanagement_MonitoringmatrixValidator extends Box_Models_App_Validator {

    public function run(Hrd_Models_Performancemanagement_Monitoringmatrix $d) {
        $msg = "";
        $pattern = '[~]';
		
        $this->setStatus(TRUE);
        $this->setMsg($msg);
    }

}

?>
