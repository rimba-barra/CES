<?php

/**
 * Description of ClaimValidator
 *
 * @author MIS
 */
class Hrd_Models_Claim_ClaimValidator extends Box_Models_App_Validator {
    
    

    public function run(Hrd_Models_Claim_Claim $d) {
        $msg = "";
        $daoKaryawan = new Hrd_Models_Master_EmployeeDao();
        $daoGP = new Hrd_Models_Master_GeneralParameterDao();
        $codeJP = $this->getJPCode($d->getType()->getId());

        $isHSS = $this->isPlafonHSS($codeJP); // termasuk klaim Hamil atau Salin
        $jumlahAnak = 0;
        $paramLimitAnak = 99;
        $validSalinHamil = FALSE;
        
        // ambil data personal
        $hasilKaryawan = $daoKaryawan->getDetail($d->getEmployee());
        $hasilKaryawan = Box_Tools::toObjectRow($hasilKaryawan,new Hrd_Models_Master_Employee());
        
     
        
        /// jika termasuk Hamil atau Salin
        if($isHSS){
            
            
  
             $jumlahAnak = $hasilKaryawan->getChildCount();
          
           //  $validSalinHamil = $this->checkKlaimSalindanHamil($d);
             
             
             /// ambil param medical
             
            $hasilParams = $daoGP->getParamsByProjectPtWOPLB("medicalparameter",$this->currentSession->getProject()->getId(),
                    $this->currentSession->getPt()->getId());
            $hasilParams = Box_Tools::toObjectResult($hasilParams, new Hrd_Models_Master_GeneralParameter());
            
       
            foreach($hasilParams as $hp){
                if($hp instanceof Hrd_Models_Master_GeneralParameter){
                 
                    if($hp->getName()==Box_Config::GENERALPARAMATER_NAME_CLAIM_CHILDLIMIT){
                        $paramLimitAnak = intval($hp->getValue());
                    }
                }
            }
            
        }
        
        
        
     
        
        
        

        

        if ($d->getId() == 0) {

            if ($d->getEmployee()->getId() == 0) {
                $msg = "Invalid Employee";
            } else if ($d->getType()->getId() == 0) {
                $msg = "Please insert claim type";
            } else if (!$d->getDate()) {
                $msg = "Invalid date";
            } else if (!$d->getReceiptDate()) {
                $msg = "Invalid receipt date";
            } else if (!$d->getYear()) {
                $msg = "Invalid Year";
            } else if ($isHSS && $jumlahAnak >= $paramLimitAnak ){
                $msg = " The number of children up to the filing of these claims is 3";
            //} else if ($this->isKlaimSS($codeJP) && $hasilKaryawan->getSex()=="F"){
             //   $msg = "Female employees can not file a claim is";
            //} else if ($validSalinHamil["isHSS"] && $validSalinHamil["adaPlafonHSS"] && $validSalinHamil["klaim910"]) {
              //  $msg = "Waktu untuk klaim ini harus di bawah 9 bulan 10 hari.";
            } else {
                $this->setStatus(TRUE);
            }
        } else { // validate for edit mode
            if ($d->getType()->getId() == 0) {
                $msg = "Please insert claim type";
            } else if (!$d->getDate()) {
                $msg = "Invalid date";
            } else if (!$d->getReceiptDate()) {
                $msg = "Invalid receipt date";
            } else {
                $this->setStatus(TRUE);
            }
        }
        
        

        $this->setMsg($msg);
    }

    private function checkKlaimSalindanHamil(Hrd_Models_Claim_Claim $klaim) {
        $hasil = array(
            "isHSS" => FALSE,
            "adaPlafonHSS" => FALSE, // ada plafon hamil salin 1 salin 2 
            "klaim910" => FALSE, //9 bulang 10 hari ke belakang
            "adaPLafonSS" => FALSE, // step 2
            "adaHamilSetelahSS" => FALSE // step 3
        );

        // semua jenis pengobatan
        $daoJenis = new Hrd_Models_Pengobatan_TypeDao();
        $allJenis = $daoJenis->getAllWOPL(new Hrd_Models_Pengobatan_Type());
        $allJenis = Box_Tools::toObjectResult($allJenis, new Hrd_Models_Pengobatan_Type());


        $codeJenis = $this->getJenisPengobatanCode($allJenis, $klaim->getType()->getId());
        $tanggalKlaim = $klaim->getDate();
        $tahunKlaim = date("Y", strtotime($tanggalKlaim));



        // jika jenis pengobatan = HAMIL OR SALIN1 OR SALIN2
        if ($this->isPlafonHSS($codeJenis)) {
            $hasil["isHSS"] = TRUE;

            // ambil semua klaim karyawan
            $klaimFilter = $klaim;
            $tempYear = $klaim->getYear();
            $klaimFilter->setYear(0);
            $daoClaim = new Hrd_Models_Claim_ClaimDao();
            $allKlaim = $daoClaim->getAllWOPL($klaimFilter);
            $allKlaim = Box_Tools::toObjectResult($allKlaim, new Hrd_Models_Claim_Claim(), array(new Hrd_Models_Pengobatan_Type()));
            $klaim->setYear($tempYear);



            $topHss = $this->topHSS($allKlaim, $tanggalKlaim);

            if ($topHss) {
                $hasil["adaPlafonHSS"] = TRUE;


                //$lamaHari = intval(Box_Tools::dateDifference($tanggalKlaim, $klaimKyw->getDate()));
                $lamaHari = floor((strtotime($tanggalKlaim) - strtotime($topHss->getDate())) / (60 * 60 * 24));

                $bulan9hari10 = (30 * 9) + 10;

                var_dump($lamaHari);
                var_dump($bulan9hari10);

                /// cek transaksi 9 bulan 10 hari ke belakang

                if ($lamaHari < $bulan9hari10 && $lamaHari > 0) {
                    $hasil["klaim910"] = TRUE;

                    if ($topHss->getType()->getCode() == Box_Config::JENISPENGOBATANCODE_SALIN1 ||
                            $topHss->getType()->getCode() == Box_Config::JENISPENGOBATANCODE_SALIN2) {

                        $hasil["adaPLafonSS"] = TRUE;

                        // cek ada klaim hamil setelah klaim ini

                        if ($this->adaPlafonHamilSetelahSalin($allKlaim, $topHss->getDate())) {
                            $hasil["adaHamilSetelahSS"] = TRUE;
                        }
                    }
                }
            }
        }

        return $hasil;
    }

    // isKlaimHSS
    private function isPlafonHSS($codeJenis) {
        if ($codeJenis == Box_Config::JENISPENGOBATANCODE_HAMIL ||
                $codeJenis == Box_Config::JENISPENGOBATANCODE_SALIN1 ||
                $codeJenis == Box_Config::JENISPENGOBATANCODE_SALIN2) {
            return TRUE;
        }
        return FALSE;
    }
    
    private function isKlaimSS($codeJenis) {
        if ($codeJenis == Box_Config::JENISPENGOBATANCODE_SALIN1 ||
                $codeJenis == Box_Config::JENISPENGOBATANCODE_SALIN2) {
            return TRUE;
        }
        return FALSE;
    }

    private function adaPlafonHamilSetelahSalin($allKlaim, $tanggalSalin) {
        $ada = FALSE;
        foreach ($allKlaim as $klaimKyw) {
            $jpCode = $klaimKyw->getType()->getCode();



            if ($jpCode == Box_Config::JENISPENGOBATANCODE_HAMIL && strtotime($tanggalSalin) < strtotime($klaimKyw->getDate())) {
                $ada = TRUE;
            }
        }

        return $ada;
    }
    
    private function getJPCode($idJenisPengobatan){
        $daoJenis = new Hrd_Models_Pengobatan_TypeDao();
        $allJenis = $daoJenis->getAllWOPL(new Hrd_Models_Pengobatan_Type());
        $allJenis = Box_Tools::toObjectResult($allJenis, new Hrd_Models_Pengobatan_Type());


       
        
        $code = "";
        foreach ($allJenis as $jenis) {
            if ($jenis->getId() == $idJenisPengobatan) {
                $code = $jenis->getCode();
            }
        }
        return $code;
    }

    private function topHSS($allKlaim, $tanggalKlaim) {
        $klaim = FALSE;


        foreach ($allKlaim as $klaimKyw) {
            $jpCode = $klaimKyw->getType()->getCode();
            if ($this->isPlafonHSS($jpCode)) {


                if (!$klaim) {
                    $klaim = $klaimKyw;
                }
            }
        }

        return $klaim;
    }

    private function getJenisPengobatanCode($allJenis, $id) {
        $code = "";
        foreach ($allJenis as $jenis) {
            if ($jenis->getId() == $id) {
                $code = $jenis->getCode();
            }
        }
        return $code;
    }

}

?>
