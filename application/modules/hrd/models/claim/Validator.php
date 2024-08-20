<?php

/**
 * Description of Validator
 *
 * @author MIS
 */
class Hrd_Models_Claim_Validator extends Box_Models_App_Validator {

    private $session;

    public function setSession($session) {
        $this->session = $session;
    }

   
    public function run(Hrd_Models_Claim_ClaimGlasses $d) {
        $msg = "";


        $jenisPengobatanCode = $d->getType() == "F" ? "FRAME" : "LENSA";
        $nilaiPlafon = $this->getNilaPlafon($d, $jenisPengobatanCode);

        $dao = new Hrd_Models_Claim_Dao();
        $nilaiKlaim = doubleval($d->getTotal());
        
        $tahunKlaim = date("Y", strtotime($d->getDate()));


        $daoParam = new Hrd_Models_Master_GeneralParameterDao();
        $hasilParam = $daoParam->getParamsByProjectPtWOPL($this->session->getProject()->getId(), $this->session->getPt()->getId(), "medicalparameter");


        $hasilParam = Box_Tools::toObjectResult($hasilParam, new Hrd_Models_Master_GeneralParameter());
        $minimalTahun = 0;
        
        foreach ($hasilParam as $param) {
        
            if($d->getType()=="F" && $param->getName()==Box_Config::GENERALPARAMATER_NAME_CLAIM_FRAMELIMIT){
                $minimalTahun = $param->getValue();
            }else if($d->getType()=="L" && $param->getName()==Box_Config::GENERALPARAMATER_NAME_CLAIM_LENSLIMIT){
                $minimalTahun = $param->getValue();
            }
        }

        

        $klaimPeriod = $dao->getAllWOPL($d,$tahunKlaim);

        $klaimPeriod = Box_Tools::toObjectResult($klaimPeriod, new Hrd_Models_Claim_ClaimGlasses());
        $tahunTerakhirKlaim = 0;
        $oldTotalKlaim = 0;
        $count = 0;
        foreach ($klaimPeriod as $klaim) {
            $tahun = date("Y",  strtotime($klaim->getDate()));
            if ($klaim instanceof Hrd_Models_Claim_ClaimGlasses) {
                if($tahun==$tahunKlaim){
                    $oldTotalKlaim += doubleval($klaim->getTotal());
                }
                if($count==0){
                    $tahunTerakhirKlaim = $tahun;
                } 
            }
            $count++;
        }

        $nilaiKlaim = $nilaiKlaim + $oldTotalKlaim;




        if (!$d->getDate()) {
            $msg = "Tanggal tidak valid";
        } else if ($d->getEmployee()->getId() == 0) {
            $msg = "Karyawan tidak valid";
      //  } else if ($nilaiPlafon == 0) {
            //$msg = "Configurasi plafon golongan untuk '" . $jenisPengobatanCode . "' tidak ada.";
       // } else if($minimalTahun > 1 && ($tahunKlaim - $tahunTerakhirKlaim <= $minimalTahun)){
          //  $msg = "Tanggal klaim masih di bawah ".$minimalTahun. " tahun";
      // } else if ($nilaiKlaim > $nilaiPlafon && $nilaiPlafon > 0) {
          
          // $msg = "Nilai klaim lebih besar dari plafon.";
        } else {
            $this->setStatus(TRUE);
        }
        
     
        
        $this->setMsg($msg);
    }
     
  
    
    /*
    public function run(Hrd_Models_Claim_ClaimGlasses $d) {
        $msg = "";


        $jenisPengobatanCode = $d->getType() == "F" ? "FRAME" : "LENSA";
        $nilaiPlafon = $this->getNilaPlafon($d, $jenisPengobatanCode);

        $dao = new Hrd_Models_Claim_Dao();
        $nilaiKlaim = doubleval($d->getTotal());
        
        $tahunKlaim = date("Y", strtotime($d->getDate()));


        $daoParam = new Hrd_Models_Master_GeneralParameterDao();
        $hasilParam = $daoParam->getParamsByProjectPtWOPL($this->session->getProject()->getId(), $this->session->getPt()->getId(), "medicalparameter");


        $hasilParam = Box_Tools::toObjectResult($hasilParam, new Hrd_Models_Master_GeneralParameter());
        $minimalTahun = 0;
        
        foreach ($hasilParam as $param) {
        
            if($d->getType()=="F" && $param->getName()==Box_Config::GENERALPARAMATER_NAME_CLAIM_FRAMELIMIT){
                $minimalTahun = $param->getValue();
            }else if($d->getType()=="L" && $param->getName()==Box_Config::GENERALPARAMATER_NAME_CLAIM_LENSLIMIT){
                $minimalTahun = $param->getValue();
            }
        }

        

        $klaimPeriod = $dao->getAllWOPL($d,$tahunKlaim);

        $klaimPeriod = Box_Tools::toObjectResult($klaimPeriod, new Hrd_Models_Claim_ClaimGlasses());
        $tahunTerakhirKlaim = 0;
        $oldTotalKlaim = 0;
        $count = 0;
        foreach ($klaimPeriod as $klaim) {
            $tahun = date("Y",  strtotime($klaim->getDate()));
            if ($klaim instanceof Hrd_Models_Claim_ClaimGlasses) {
                if($tahun==$tahunKlaim){
                    $oldTotalKlaim += doubleval($klaim->getTotal());
                }
                if($count==0){
                    $tahunTerakhirKlaim = $tahun;
                } 
            }
            $count++;
        }

        $nilaiKlaim = $nilaiKlaim + $oldTotalKlaim;




        if (!$d->getDate()) {
            $msg = "Tanggal tidak valid";
        } else if ($d->getEmployee()->getId() == 0) {
            $msg = "Karyawan tidak valid";
        } else if ($nilaiPlafon == 0) {
            $msg = "Configurasi plafon golongan untuk '" . $jenisPengobatanCode . "' tidak ada.";
        } else if($minimalTahun > 1 && ($tahunKlaim - $tahunTerakhirKlaim <= $minimalTahun)){
            $msg = "Tanggal klaim masih di bawah ".$minimalTahun. " tahun";
       } else if ($nilaiKlaim > $nilaiPlafon && $nilaiPlafon > 0) {
          //  $msg = "Nilai klaim lebih besar dari plafon " . $nilaiKlaim . " - " . $nilaiPlafon;
           $msg = "Nilai klaim lebih besar dari plafon.";
        } else {
            $this->setStatus(TRUE);
        }
        
     
        
        $this->setMsg($msg);
    }
      
     
     */
    

    private function getNilaPlafon(Hrd_Models_Claim_ClaimGlasses $d, $jenisPengobatanCode) {
        $status = FALSE;



        $nilaiPlafon = 0;
        $tahunKlaim = date("Y", strtotime($d->getDate()));

        $progressive = "PROGRESIVE";

        $plafonGroup = new Hrd_Models_Pengobatan_Plafon();
        $plafonGroup->setProject($this->session->getProject());
        $plafonGroup->setPt($this->session->getPt());
        $daoPlafon = new Hrd_Models_Pengobatan_Dao();
        $allPlafonGroup = $daoPlafon->getAllWOPL($plafonGroup);

        $daoEmployee = new Hrd_Models_Master_EmployeeDao();
        $employee = new Hrd_Models_Master_Employee();
        $employee->setId($d->getEmployee()->getId());
        $employeeDetail = $daoEmployee->getDetail($employee);
        $employeeDetail = Box_Tools::toObjectRow($employeeDetail, new Hrd_Models_Employee_Employee());
        $allPlafonGroup = Box_Tools::toObjectResult($allPlafonGroup, new Hrd_Models_Pengobatan_Plafon(), array(new Hrd_Models_Pengobatan_Type()));





        if (count($allPlafonGroup) > 0) {
            foreach ($allPlafonGroup as $pg) {
                if ($pg instanceof Hrd_Models_Pengobatan_Plafon) {




                    if ($pg->getEmployeeGroup()->getId() == $employeeDetail->getGroup()->getId() && $pg->getYear() == $tahunKlaim && $pg->getType()->getCode() == $jenisPengobatanCode) {

                        $nilaiPlafon = $pg->getValue();
                    }
                }
            }
        }

        /* Khusus lensa */
        if ($d->getType() == "L") {
            if ($d->getLensType() == $progressive) {
                $nilaiPlafon = $nilaiPlafon * 2;
            }
        }

        /*

          if ($d->getTotal() <= $nilaiPlafon) {
          $status = TRUE;
          }

         */


        //var_dump($employeeDetail->getGroup()->getId());
        //var_dump($allPlafonGroup);

        return $nilaiPlafon;
    }

}

?>
