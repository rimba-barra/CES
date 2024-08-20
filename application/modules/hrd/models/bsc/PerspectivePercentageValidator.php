<?php 

class Hrd_Models_Bsc_PerspectivePercentageValidator extends Box_Models_App_Validator {
    
    public function run(Hrd_Models_Bsc_PerspectivePercentage $d){
		$msg            = "";
        $dao            = new Hrd_Models_Bsc_PerspectivePercentageDao();
        //$scode          = $dao->codeExist($d); //var_dump($scode); echo "abc"; exit(); 
        // $projectName    = $scode[0][0]['project_name'];
        // $ptName         = $scode[0][0]['pt_name'];
        // $deptName       = $scode[0][0]['department_name'];
        $detail         = $d->getDCResult();
		//var_dump($detail);exit;
        $percentages    = $detail['percentage'];
        $pattern        = '[~]';
        $arrayPercent   = preg_split($pattern, $percentages);
        $total          = 0;

        for ($i = 0; $i < count($arrayPercent); $i++) { 
            $eachPercent['each']    = $arrayPercent[$i];
            $total += floatval($eachPercent['each']);
        }
// var_dump($total['each']);
        if ($total < 100) {
            $msg    = "Total Percentage is < 100%";
        } else if ($total > 100) {
            $msg    = "Total Percentage is > 100%";
        // } else if (Box_Tools::codeExist($scode, $d, 'exist')) {
        //     $msg    = "Perspective Percentage for ".$projectName.", ".$ptName.", and ".$deptName." already exist" ;
        } else {
            $this->setStatus(TRUE);
        }
        $this->setMsg($msg);
    }
}

?>