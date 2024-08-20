<?php

class Hrd_Models_Performancemanagement_MatrixCompetencyValidator extends Box_Models_App_Validator {
    
    public function run(Hrd_Models_Performancemanagement_MatrixCompetency $d) {
        $msg        = "";
        $dao        = new Hrd_Models_Performancemanagement_MatrixCompetencyDao();
        $scode      = $dao->codeExist($d);
		if(!isset($scode[0][0]['banding'])){
			$scode[0][0]['banding'] = '';
		}
		if(!isset($scode[0][0]['jobfamily'])){
			$scode[0][0]['jobfamily'] = '';
		}
		if(!isset($scode[0][0]['exist'])){
			$scode[0][0]['exist'] = '';
		}
		if(!isset($scode[0][0]['matrixcompetency_id'])){
			$scode[0][0]['matrixcompetency_id'] = '';
		}
        $banding    = $scode[0][0]['banding'];
        $jobfam     = $scode[0][0]['jobfamily'];
        $matrixcompetency_id     = $scode[0][0]['matrixcompetency_id'];
        $detail     = $d->getDCResult();
        $pattern    = '[~]';
        $bandid     = preg_split($pattern, $detail['banding_id']);

        if ($d->bandid == 0 || $d->bandid == '') {
            $msg 	= "Invalid Banding";
        } else if ($detail['level_id'] == 0 ) {
        	$msg 	= "Please choose level first";
        } else if ($matrixcompetency_id == '' && Box_Tools::codeExist($scode, $d, 'exist')) {
            $msg    = "".$banding." and ".$jobfam." already exist" ;
        } else {
            $this->setStatus(TRUE);
        }
        $this->setMsg($msg);
    }
}

?>
