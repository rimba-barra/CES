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
class Hrd_Models_Leave_ProsesCuti {

    private $session;
    private $msg;
    private $status;

    public function __construct(Box_Models_App_Session $session) {
        $this->session = $session;
    }

    public function proses() {
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
       
      //  var_dump($allSisaCuti);
        
        return $this->printToDecan($hasilPSCK[0], $hasilPSCK[1]);
       

        // var_dump($rekapCuti);
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
            $sc,$jcf
        );
    }

    private function calculateCuti($allJatahCuti, $allTransaksiCuti) {
        $ajc = $allJatahCuti;
        $act = $allTransaksiCuti;

        //var_dump(count($act));
        $rekapCuti = array();

        /*
          format hasil
          [$employeeID]=> array(
         *   [$year1] => $durasi,
         *   [$year2] => $durasi
         * )
         */
        foreach ($act as $t) {
            if ($t instanceof Hrd_Models_Leave_Leave) {
                $employeeId = $t->getEmployee()->getId();
                $duration = $t->getDuration();
                if ($employeeId == 2005) {

                    $date = DateTime::createFromFormat("Y-m-d", $t->getStartDate());
                    $tahun = $date->format("Y");
                    if (key_exists($employeeId, $rekapCuti)) {
                        if (key_exists($tahun, $rekapCuti[$employeeId])) {
                            $rekapCuti[$employeeId][$tahun] += $duration;
                        } else {
                            $rekapCuti[$employeeId][$tahun] = $duration;
                        }
                    } else {
                        $rekapCuti[$employeeId] = array();
                        $rekapCuti[$employeeId][$tahun] = $duration;
                    }
                }
            }
        }

        
        foreach ($rekapCuti as $rekapPerKaryawan) {
            foreach ($rekapPerKaryawan as $year => $durasi) {
                foreach ($ajc as $jc) {
                    if ($jc instanceof Hrd_Models_Leave_LeaveEntitlement) {

                     //   if ($jc->getEmployee()->getId() == 2005) {
                            if ($jc->getStartUse() === $year) {
                                $jc->setRest($jc->getAmount() - $durasi);
                            }
                           // var_dump($jc->getRest());

                            //   var_dump($jc->getAmount());
                            //var_dump($jc->getRest());
                       // }
                    }
                }
            }
        }
         
         

        return $ajc;
    }

    private function prosesSisaCutiKaryawan($allJatahCutiKaryawan) {
        $year = (int) date("Y");
        $result = array();
        foreach ($allJatahCutiKaryawan as $jc) {
            if ($jc instanceof Hrd_Models_Leave_LeaveEntitlement) {
                $employeeId = (int) $jc->getEmployee()->getId();
                $sisaPerTahun = (int) $jc->getRest();

                if ($jc->getStartUse() <= $year) {
                    
                    $isKadaluarsa = strtotime($jc->getExpiredDate()) < strtotime($year."-01-01") ? TRUE:FALSE;

                    // pengNOLan sisa cuti;
                    if ($jc->getStartUse() < $year && $sisaPerTahun > 0 && $isKadaluarsa) {
                        $sisaPerTahun = 0;
                    } 


                    if (key_exists($employeeId, $result)) {
                
                            $result[$employeeId] += $sisaPerTahun;
                       
                    } else {
                        $result[$employeeId] = $sisaPerTahun;
                    }
                    
                    $jc->setRest($sisaPerTahun);
                }
            }
        }

        return array(
            $result,
            $allJatahCutiKaryawan
        );
    }

    private function fetchJatahCuti() {
        $ses = $this->session;
        $allJc = array();

        $dao = new Hrd_Models_Leave_LeaveEntitlementDao();
        $le = new Hrd_Models_Leave_LeaveEntitlement();
        $le->setProject($ses->getProject());
        $le->setPt($ses->getPt());
        $hasil = $dao->getAllWOPL($le);
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
        $hasil = $dao->getAllWOPL($cuti);
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

}
