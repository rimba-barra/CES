<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Validator
 *
 * @author MIS
 */
class Hrd_Models_Leave_LeaveEntitlementValidator extends Box_Models_App_Validator {

    private $selectedFunc;

    public function __construct($selectedFunc = 'run') {
        parent::__construct();
        $this->selectedFunc = $selectedFunc;
    }

    public function run(Hrd_Models_Leave_LeaveEntitlement $d) {
        $msg = "";
        if ($this->selectedFunc == "run") {
            if ($d->getId() == 0) { /// validate only when insert new
                if (!$this->yearValid($d->getStartUse())) {
                    $msg = "Invalid start date";
                } else if (($d->getEndUse() && !$this->yearValid($d->getEndUse()))) {
                    $msg = "Invalid end date";
                } else if ($d->getEmployee()->getId() == 0) {
                    $msg = "invalid employee";
                }
                /* comment by wulan sari 20190617, karena di project cuti tahunan bisa lebih dari 12, karena cuti bersama masuk sbg cuti
                 * else if (intval($d->getAmount()) > 12 ) {
                    $msg = "The maximum amount of leave entitlement is 12";
                } */
                else {



                    $eDao = new Hrd_Models_Master_EmployeeDao();
                    $em = new Hrd_Models_Master_Employee();
                    $em->setId($d->getEmployee()->getId());
                    $eData = $eDao->getDetail($em);
                    $ems = Box_Tools::toObjects('employee', $eData);

                    $dao = new Hrd_Models_Leave_LeaveEntitlementDao();
                    $hasilHakCuti = $dao->getAllByEmployeeWOPL($d);


                    $tahunTeratas = 0;
                    
                    if (count($hasilHakCuti[1]) > 0) {
                        foreach ($hasilHakCuti[1] as $hhc) {
                            if ($hhc["start_use"] > $tahunTeratas) {
                                $tahunTeratas = $hhc["start_use"];
                            }
                        }
                    }

                    /// 1.  cek hak cuti tahun teratas
                    if ($d->getStartUse() <= $tahunTeratas) {
                        $msg = "Tahun harus di atas ".$tahunTeratas;
                    } else {
                        
                        /// 2. Validate hak cuti
                        $hasil = Hrd_Models_App_Box_LeaveProcessor::validateHakCuti($ems[0], $d);

                        if (!$hasil["status"]) {
                            $msg = $hasil["msg"];
                        } else {
                            $this->setStatus(TRUE);
                        }
                    }
                    
                   
                }
            } else {
                $this->setStatus(TRUE);
            }
        } else if ($this->selectedFunc == "yearly") {
            $msg = $this->yearlyValidator($d);
        } else if ($this->selectedFunc == "cutibesar") {
            $msg = $this->cutibesarValidator($d);
        }

        $this->setMsg($msg);
    }

    private function yearlyValidator(Hrd_Models_Leave_LeaveEntitlement $d) {
        $msg = '';
        if (!$this->yearValid($d->getStartUse())) {
            $msg = "Invalid period";
        } else if (intval($d->getAmount()) == 0) {
            $msg = "Invalid amount of leave entitlement";
        } 
        /* comment by wulan sari 20190617, karena di project cuti tahunan bisa lebih dari 12, karena cuti bersama masuk sbg cuti besar
         * else if (intval($d->getAmount()) > 12 ) {         
            $msg = "The maximum amount of leave entitlement is 12";
         * 
        } */
        else {
            $this->setStatus(TRUE);
        }
        return $msg;
    }

    private function yearValid($year) {
        $year = (int) $year;
        if ($year >= 2000 && $year <= 2100) {
            return TRUE;
        }
        return FALSE;
    }

    private function cutibesarValidator(Hrd_Models_Leave_LeaveEntitlement $d) {
        $msg = '';
            $this->setStatus(TRUE);
        return $msg;
    }
}

?>
