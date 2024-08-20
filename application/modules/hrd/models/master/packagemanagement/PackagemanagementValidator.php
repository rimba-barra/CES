<?php

class Hrd_Models_Master_Packagemanagement_PackagemanagementValidator extends Box_Models_App_Validator {

    public function run(Hrd_Models_Master_Packagemanagement_Packagemanagement $d) {
        $msg = "";
        $datadetail = $d->getDCResult();
        $pattern = '[~]';

        if (empty($datadetail)) {
            $msg = "Data detail is required";
            $this->setStatus(TRUE);
        } else {
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
            }
        }



        $this->setMsg($msg);
    }

}

?>
