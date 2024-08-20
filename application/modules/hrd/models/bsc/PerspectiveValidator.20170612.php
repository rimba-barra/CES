<?php

class Hrd_Models_Bsc_PerspectiveValidator extends Box_Models_App_Validator {
    
    // public function run(Hrd_Models_Bsc_PerspectivePercentage $d) {
        
    //     $msg        = "";
    //     $dao        = new Hrd_Models_Bsc_PerspectivePercentageDao();
    //     $scode      = $dao->codeExist($d);
        
    //     $pr         = $scode[0][0]['project_name'];
    //     $pt         = $scode[0][0]['pt_name'];
    //     $dp         = $scode[0][0]['department_name'];
    //     $detail     = $d->getDCResult();
    //     $pattern    = '[~]';
    //     $bandid     = preg_split($pattern, $detail['banding_id']);

    //     if (Box_Tools::codeExist($scode, $d, 'exist')) {
    //         $msg    = "".$pr.", ".$pt." and ".$dp." already exist" ;
    //     } else {
    //         $this->setStatus(TRUE);
    //     }
    //     $this->setMsg($msg);
    // }

    public function __construct() {
        $this->setStatus(FALSE);
    }

    public function run($d) {
        $msg    = "";
        $dao    = new Hrd_Models_Bsc_PerspectiveDao();
        $sname  = $dao->codeExist($d);
        // var_dump($sname);
        // if (strlen($d->oumname) < 1){
        //     $msg    = "Please fill OUM name first.";
        // } else if (Box_Tools::codeExist($sname, $d, 'oum_id')) {
        //     $msg    = "This OUM Name is already in use";
        // } else if (!$d->oumdesc) {
        //     $msg    = "Description field is still empty";
        // } else {
        //     $this->setStatus(TRUE);
        // }
        // $this->setMsg($msg);
    }
}

?>
