<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ProsesCuti
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Leave_RecalculateCuti {

    private $session;
    private $msg;
    private $status;
    private $employeeId;
    private $jatahCutiKaryawan;

    public function __construct(Box_Models_App_Session $session,$employeeId = 0) {
        $this->session = $session;
        $this->employeeId = $employeeId;
    }

    public function proses() {
        
        /// load data karyawan 
        $employee = new Hrd_Models_Master_Employee();
        $employee->setId($this->employeeId);
        $dao = new Hrd_Models_Master_EmployeeDao();
        $hasilEm = $dao->getDetail($employee);
        if(Box_Tools::adaRecord($hasilEm)){
            $employee = Box_Tools::toObjectsb("employee", $hasilEm, TRUE);
        } 
        
        
        
        $hireDateRaw = $employee->getHireDate();
        $date = DateTime::createFromFormat("Y-m-d", date("Y-m-d"));
        $tahun = $date->format("Y");
        $hireDate = DateTime::createFromFormat("Y-m-d", $hireDateRaw);
        $totalDurasiCuti = 0;
        $fixJatahCutiKaryawan = 0;
        $jatahCutiKaryawan = array();
        
        // load db
        $allJatahCuti = $this->fetchJatahCuti();
        $allTransaksiCuti = $this->fetchTransaksiCuti();
        foreach($allTransaksiCuti as $cuti){
            if($cuti instanceof Hrd_Models_Leave_Leave){
                $totalDurasiCuti +=$cuti->getDuration();
                
            }
        }
       
        
        /// generate hak cuti
        $jatahCutiBaru = array();
        $tahunMasuk = $hireDate->format("Y");
        $totalDurasiCutiCurrent = $totalDurasiCuti;
        for($i=$tahunMasuk+1;$i<=$tahun;$i++){
            $newLe = new Hrd_Models_Leave_LeaveEntitlement();
            $amount = Hrd_Models_Leave_Tools::jatahCuti($hireDateRaw, $i);
            $newLe->setStartUse($i);
            $newLe->setAmount($amount);
            $newLe->setRest($amount);
            $newLe->setIsLeaveEnd($i==$tahun?FALSE:TRUE);
            $newLe->getEmployee()->setId($employee->getId());
            // kurangi total durasi cuti
            $tempHitung = $newLe->getRest()-$totalDurasiCutiCurrent;
            
            if($totalDurasiCutiCurrent > 0){
                $totalDurasiCutiCurrent = $totalDurasiCutiCurrent - $newLe->getRest();
                $newLe->setRest( $tempHitung > 0? $tempHitung:0);
                // pada record terakhir, semua durasi dikalikan -1;
                if($i==$tahun){
                    $fixJatahCutiKaryawan = $totalDurasiCutiCurrent*(-1);
                     $newLe->setRest($fixJatahCutiKaryawan);
                }
            }
            $jatahCutiBaru[] = $newLe;
            
            
        }
        
        
        // mapping data lama dengan data baru
        foreach($jatahCutiBaru as $jatahCuti){
            foreach($allJatahCuti as $jatahCutiLama){
                if($jatahCuti->getStartUse()== $jatahCutiLama->getStartUse()){
                    $jatahCuti->setId($jatahCutiLama->getId());
                  
                }
            }
        }
        
        $jatahCutiKaryawan[$employee->getId()] = $fixJatahCutiKaryawan;
        
        
        //return $jatahCutiBaru;
        return $this->printToDecan($jatahCutiKaryawan, $jatahCutiBaru);
        
        
        
        
        
        /*
        $ajc = $this->fetchJatahCuti();
        $act = $this->fetchTransaksiCuti();
        
        

        if (count($ajc) == 0) {
            $this->msg = "Tida ada data jatah cuti";
            return FALSE;
        }
        if (count($act) == 0) {
            $this->msg = "Tidak ada transaksi cuti";
            return FALSE;
        }

        $jtcAfterTransaksi = $this->calculateCuti($ajc, $act);

        $hasilPSCK = $this->prosesSisaCutiKaryawan($jtcAfterTransaksi);

        
        return $this->printToDecan($hasilPSCK[0], $hasilPSCK[1]);
          
         
         */

    }
    
    private function printToDecan($allSisaCuti,$jcFinal){
        $sc = array(
            "employee_id"=>"",
            "sisa_cuti"=>""
        );
        foreach($allSisaCuti as $emId => $sisaCuti){
            $sc["employee_id"] .=$emId."~";
            $sc["sisa_cuti"] .=$sisaCuti."~";
        }
        
        $jcf = Box_Tools::toDecan($jcFinal);
        
        return array(
            $sc,$jcf->getDCResult()
        );
    }
    
    

    private function fetchJatahCuti() {
        $ses = $this->session;
        $allJc = array();

        $dao = new Hrd_Models_Leave_LeaveEntitlementDao();
        $le = new Hrd_Models_Leave_LeaveEntitlement();
        $le->setProject($ses->getProject());
        $le->setPt($ses->getPt());
        $le->getEmployee()->setId(intval($this->employeeId));
        $le->setIsLeaveEnd(2); // semua 
        //$hasil = $dao->getAllWOPL($le);
        $hasil = $dao->getAllByEmployeeWOPL($le);
        if (Box_Tools::adaRecord($hasil)) {
            $allJc = Box_Tools::toObjects("leaveentitlement", $hasil);
        }
        
     



        return $allJc;
        // var_dump($allJc);
    }

    private function fetchTransaksiCuti() {
        $session = $this->session;
        $all = array();
        $dao = new Hrd_Models_Leave_Dao();
        $cuti = new Hrd_Models_Leave_Leave();


        $cuti->setProject($session->getProject());
        $cuti->setPt($session->getPt());
        $cuti->getEmployee()->setId(intval($this->employeeId));
       // $hasil = $dao->getAllWOPL($cuti);
        $hasil = $dao->getAllByEmployeeWOPL($cuti);
        if (Box_Tools::adaRecord($hasil)) {
            $all = Box_Tools::toObjects("leave", $hasil);
        }

        return $all;
    }

    public function getMsg() {
        return $this->msg;
    }

    public function getStatus() {
        return $this->status;
    }
    
    public function getEmployeeId() {
        return $this->employeeId;
    }

    public function setEmployeeId($employeeId) {
        $this->employeeId = $employeeId;
    }



}
