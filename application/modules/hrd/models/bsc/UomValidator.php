<?php 

class Hrd_Models_Bsc_UomValidator extends Box_Models_App_Validator {
    
    public function run(Hrd_Models_Bsc_Uom $d){
        $msg 	= "";
        $dao 	= new Hrd_Models_Bsc_UomDao();
        $sname 	= $dao->codeExist($d);
    
        if (strlen($d->uomname) < 1){
            $msg 	= "Please fill OUM name first.";
        } else if (Box_Tools::codeExist($sname, $d, 'uom_id')) {
        	$msg 	= "This OUM Name is already in use";
        } else if (!$d->uomdesc) {
        	$msg 	= "Description field is still empty";
        } else {
            $this->setStatus(TRUE);
        }
        $this->setMsg($msg);
    }
}

?>