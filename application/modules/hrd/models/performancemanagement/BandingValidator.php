<?php 

class Hrd_Models_Performancemanagement_BandingValidator extends Box_Models_App_Validator {
    
    public function run(Hrd_Models_Performancemanagement_Banding $d){
        $msg 	= "";
        $dao 	= new Hrd_Models_Performancemanagement_BandingDao();
        $scode 	= $dao->codeExist($d);
        
        // wulan edit 2020 08 05
        $sname 	= $dao->nameExist($d);
        $countname = count($sname[0]);
        
        /*if (strlen($d->code) < 5){
            $msg 	= "Code minimum 5 characters";
        } else */if (Box_Tools::codeExist($scode, $d, 'banding_id')) {
        	$msg 	= "This code is already exists";
        } else if (strlen($d->banding) < 5) {
        	$msg 	= "Banding Name minimum 5 characters";
        } else if (!$d->description || $d->description == '') {
        	$msg 	= "Description field is still empty";
        } else if ($countname > 0) {
        	$msg 	= "This Banding is already exists";
        } else {
            $this->setStatus(TRUE);
        }
        $this->setMsg($msg);
    }
}

?>