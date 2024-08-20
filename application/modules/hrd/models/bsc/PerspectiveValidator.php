<?php 

class Hrd_Models_Bsc_PerspectiveValidator extends Box_Models_App_Validator {
    
    public function __construct() {
        $this->setStatus(FALSE);
    }

    public function run(Hrd_Models_Bsc_Perspective $d){
        $msg 	= "";
        $dao    = new Hrd_Models_Bsc_PerspectiveDao();
        $sname  = $dao->codeExist($d, $d->getProjectId());
		
        if (Box_Tools::codeExist($sname, $d, 'perspective_id')) {
        	$msg 	= "This Code is already in use";
        } else {
            $this->setStatus(TRUE);
        }
        $this->setMsg($msg);
		
    }
}

?>