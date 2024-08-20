<?php

/**
 * Description of Validator
 *
 * @author MIS
 */
class Erems_Models_Spk_Validator extends Erems_Box_Models_App_Validator {

    private $durasi;
    private $modeProses;
    public $session;

    public function getDurasi() {
        return $this->durasi;
    }

    public function setModeProses($proses) {
        $this->modeProses = $proses;
    }

    public function setDurasi($durasi) {
        $this->durasi = $durasi;
    }

    private function codeAlreadyTaken(Erems_Models_Spk_SpkTransaction $spkTrn, $codeExist) {
        $hasil = true;
        if ($spkTrn->getId() == 0) { /// for save
            if ($codeExist == 0) {
                $hasil = FALSE;
            }
        } else { // for update
            if ($codeExist > 0) {
                if ($codeExist == $spkTrn->getId()) {
                    $hasil = FALSE;
                }
            } else {
                $hasil = FALSE;
            }
        }
        return $hasil;
    }

    public function run(Erems_Models_Spk_SpkTransaction $spkTrn) {
        $msgEr = "Unknown Error.";
        $dao = new Erems_Models_Spk_SpkDao();
        
        $codeExist = $dao->checkCC($spkTrn,$this->session->getProject()->getId());

        $details = $spkTrn->getDCResult();
        /// jika modeProses kode maka validasi berlaku untuk pembentukan spk/edit spk
        if ($this->modeProses == "CANCEL") {
          
            
            if($spkTrn->getId()==0){
                $msgEr = "Invalid SPK";
            } else if (strtotime(Erems_Box_Tools::cleanDate($spkTrn->getStatus()->getDate())) == 0) {
                $msgEr = "Please insert cancel date";
            } else if (strlen($spkTrn->getStatus()->getNote()) == 0) {
                $msgEr = "Please insert cancel note";
            }else{
                $this->setStatus(TRUE);
            }
            
        }else if ($this->modeProses == "CLOSE") {
          
            
            if($spkTrn->getId()==0){
                $msgEr = "Invalid SPK";
            } else if (strtotime(Erems_Box_Tools::cleanDate($spkTrn->getStatus()->getDate())) == 0) {
                $msgEr = "Please insert close date";
            } else if (strlen($spkTrn->getStatus()->getNote()) == 0) {
                $msgEr = "Please insert close note";
            }else{
                $this->setStatus(TRUE);
            }
            
        } else {
            
            $genco = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getProject()->getId(), $this->session->getPt()->getId());
            $isNoNeedCode = $genco->activateSh1Features("spk_spk_code");

            if($isNoNeedCode > 0){
                $IsCodeAlreadyTaken = FALSE;
                $codeLength = 1;
            }else{
                $IsCodeAlreadyTaken = $this->codeAlreadyTaken($spkTrn, $codeExist);
                $codeLength = strlen($spkTrn->getCode());
            }

            if ($IsCodeAlreadyTaken) {
                $msgEr = "Code already exist";
            } else if ($spkTrn->getJobFee() == 0) {
                $msgEr = "Invalid Job fee";
            } else if (strlen($spkTrn->getJobTitle()) == 0) {
                $msgEr = "Invalid Job Title";
            } else if ($spkTrn->getContractor()->getId() == 0) {
                $msgEr = "Invalid Contractor";
            } else if ($spkTrn->getSpkType()->getId() == 0) {
                $msgEr = "Invalid Spk Type";
            } else if (!strtotime($spkTrn->getDate())) {
                $msgEr = "Invalid Spk Date";
            } else if ($codeLength == 0) {
                $msgEr = "Invalid Code";
            } else {
                /// checking time
                $durasi = 0;
                $s = $spkTrn->getTimeStart();
                $e = $spkTrn->getTimeEnd();
                if (strtotime($s) && strtotime($e)) {
                    $s = date_parse_from_format("Y-m-d", $s);
                    $e = date_parse_from_format("Y-m-d", $e);
                    //  $s = date_parse_from_format("d-m-Y", $s);
                   // $e = date_parse_from_format("d-m-Y", $e);
                    if ($s["year"] == $e["year"]) {
                        if ($s["month"] < $e["month"]) {
                            $durasi = $e["month"] - $s["month"];
                        }
                    } else if ($s["year"] < $e["year"]) {
                        $durasi = (12 - $s["month"]) + $e["month"];
                    }
                }
                if ($durasi == 0) {
                    $msgEr = "Invalid time frame";
                } else {
                    $spkTrn->setDurasi($durasi);
                    $this->setStatus(TRUE);
                }
                $this->setDurasi($durasi);
            }
        }

        $this->setMsg($msgEr);
    }

}

?>
