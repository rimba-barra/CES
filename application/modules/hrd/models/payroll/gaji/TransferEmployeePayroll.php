<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Tools
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Payroll_Gaji_TransferEmployeePayroll {

    private $msg;
    private $status;
    private $ses;
    private $totalEm; // total employee
    private $totalMg; // total mastergaji lama
    private $totalNewMg; /// total mastergaji baru setelah di match dengan data karyawan
    private $decan;

    /* @return void */

    public final function run(Box_Models_App_Session $session) {
        $this->ses = $session;
        $allEm = $this->fetchEmployee();
        $allOldMg = $this->fetchMasterGaji();
        $this->totalMg = count($allOldMg);
        $this->totalEm = count($allEm);
        if ($this->totalEm == 0) {
            $this->msg = "Tidak ada data karyawan";
        } else {
            $allNewMg = $this->generateMasterGaji($allEm, $allOldMg);
            $this->totalNewMg = count($allNewMg);
            if($this->totalNewMg==0){
                $this->msg = "Tidak ada data karyawan baru";
            }else{
                $this->decan = Box_Tools::toDecan($allNewMg);
                $this->status = TRUE;
            }
            
        }
    }

    private function generateMasterGaji($allEm, $allOldMg) {
        $allMg = array();
        $dataExist = FALSE;
        foreach ($allEm as $em) {
            $dataExist = FALSE;
            foreach ($allOldMg as $oldMg) {
                if ($oldMg->getEmployee()->getId() == $em->getId()) {
                    $dataExist = TRUE;
                }
            }

            if (!$dataExist) {
                $mg = new Hrd_Models_Payroll_Gaji_Gaji();
                $mg->setEmployee($em);
                $allMg[] = $mg;
            }
        }
        return $allMg;
    }

    private function fetchMasterGaji() {
        $dao = new Hrd_Models_Payroll_Gaji_Dao();
        $d = new Hrd_Models_Payroll_Gaji_Gaji();
        $d->setProject($this->ses->getProject());
        $d->setPt($this->ses->getPt());
        $hasil = $dao->getAllWOPL($d);
        $allMg = array();
        if (Box_Tools::adaRecord($hasil)) {
            $allMg = Box_Tools::toObjects("gaji", $hasil);
        }
        return $allMg;
    }

    private function fetchEmployee() {
        $dao = new Hrd_Models_Master_EmployeeDao();
        $em = new Hrd_Models_Master_Employee();
        $em->setProject($this->ses->getProject());
        $em->setPt($this->ses->getPt());
        $hasil = $dao->getAllWOPL($em);
        $allEm = array();
        if (Box_Tools::adaRecord($hasil)) {
            $allEm = Box_Tools::toObjectsb("employee", $hasil);
        }
        return $allEm;
    }

    public function getMsg() {
        return $this->msg;
    }

    public function getStatus() {
        return $this->status;
    }
    
    public function getDecan(){
        return $this->decan;
    }

}
