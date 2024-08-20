<?php

class Hrd_Models_Master_Scoringbsc_ScoringbscValidator extends Box_Models_App_Validator {

    public function run(Hrd_Models_Master_Scoringbsc_Scoringbsc $d) {
        $msg = "";
        $datadetail = $d->getDCResult();
        $pattern = '[~]';
        $dao 	= new Hrd_Models_Master_Scoringbsc_ScoringbscDao();
        $speriod 	= $dao->periodExist($d);

        if (empty($datadetail)) {
            $msg = "Data detail is required";
            $this->setStatus(TRUE);
        } else if (Box_Tools::codeExist($speriod, $d, 'scoringbsc_id')) {
			$msg 	= "This period is already exists";
		} else {
			/*
            $bobots = $datadetail['bobot'];
            $arrayPercent = preg_split($pattern, $bobots);
            $persentasebobot = 0;

            for ($i = 0; $i < count($arrayPercent); $i++) {
                $eachPercent['each'] = $arrayPercent[$i];
                $persentasebobot += floatval($eachPercent['each']);
            }

            if (strlen($d->code) < 1) {
                $msg = "Code is requires";
            } else if (strlen($d->package_name) < 1) {
                $msg = "Code is requires";
            } else {
                $this->setStatus(TRUE);
            }*/
                $this->setStatus(TRUE);
        }



        $this->setMsg($msg);
    }

}

?>
