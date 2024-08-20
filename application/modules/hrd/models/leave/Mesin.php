<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Mesin
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Leave_Mesin {

    private $leave;
    private $msg;
    private $validDate;
    /// result;

    private $duration;
    private $jumlahJatahCuti;
    private $listUpdateJatahCuti;
    private $dates;

    public function __construct(Hrd_Models_Leave_Leave $leave) {
        $this->leave = $leave;
    }

    public function run($rangeHari) {
        $valid = $this->validate($rangeHari);
        if (!$valid["status"]) {
            $this->msg = $valid["msg"];
            return FALSE;
        }


        $this->dates = $valid["validdate"];

        return TRUE;





        $leave = $this->leave;

        $vs = $this->validDate;



        /* jika setengah hari maka ambil 1 hari saja */
        if (intval($leave->getIsHalfDay())) {

            //   $tempDate = array($vs[0]);
            $vs = array($vs[0]);
        }



        //   var_dump($vs);


        if (intval($leave->getIsHalfDay())) {
            $duration = 0.5;
        } else {
            $duration = count($vs);
        }

        $this->duration = $duration;

        $hasilJatahCuti = $this->prosesJatahCuti($leave, $duration, $listJatahCuti, $listCutiKaryawan);

        //   var_dump($hasilJatahCuti);
        $decan = Box_Tools::toDecan($vs);
        $dcResult = $decan->getDCResult();

        $this->dates = $dcResult['date'];

        $this->listUpdateJatahCuti = $hasilJatahCuti["list"];
        $this->jumlahJatahCuti = $hasilJatahCuti["jumlah"];
    }

    private function checkJatahCuti($listJatahCuti) {
        $jatahCuti = NULL;
        foreach ($listJatahCuti as $les) {
            if ($les instanceof Hrd_Models_Leave_LeaveEntitlement) {
                if ($les->getLeavegroup() == $leaveGroup) {
                    
                }

                /*

                  // mendaftarkan jatah cuti yang berinteraksi dengan penggunaan cuti
                  if ($les->getLeavegroup() == $leaveGroup) {

                  $date = DateTime::createFromFormat("Y-m-d",$leave->getStartDate());
                  $y  = $date->format("Y");


                  if ($currentDurasi > 0 && $les->getRest() > 0 && $les->getStartUse() <= $y) {
                  $sisaCuti = $les->getRest();
                  if ($sisaCuti >= $currentDurasi) {

                  $les->setRest($sisaCuti - $currentDurasi);
                  $currentDurasi = 0;
                  } else {
                  $les->setRest($sisaCuti - $currentDurasi);
                  $currentDurasi = $currentDurasi - $sisaCuti;
                  }

                  $updateLe[] = $les;
                  }
                  }

                 */

                //  $jatahCutiE += $les->getRest();
            }
        }
        return array($jatahCuti);
    }

    private function prosesJatahCuti(Hrd_Models_Leave_Leave $leave, $duration, $listJatahCuti, $listCutiKaryawan) {
        $currentDurasi = $duration;
        $updateLe = array();
        $jatahCutiE = 0; // jatah cuti untuk karyawan

        $leaveGroup = $leave->getAbsentType()->getId() == Box_Config::ABSENTTYPE_CUTIBESAR ? Box_Config::LEAVE_GROUP_BESAR : Box_Config::LEAVE_GROUP_TAHUNAN;

        foreach ($listJatahCuti as $les) {
            if ($les instanceof Hrd_Models_Leave_LeaveEntitlement) {



                // mendaftarkan jatah cuti yang berinteraksi dengan penggunaan cuti
                if ($les->getLeavegroup() == $leaveGroup) {

                    $date = DateTime::createFromFormat("Y-m-d", $leave->getStartDate());
                    $y = $date->format("Y");


                    if ($currentDurasi > 0 && $les->getRest() > 0 && $les->getStartUse() <= $y) {
                        $sisaCuti = $les->getRest();
                        if ($sisaCuti >= $currentDurasi) {

                            $les->setRest($sisaCuti - $currentDurasi);
                            $currentDurasi = 0;
                        } else {
                            $les->setRest($sisaCuti - $currentDurasi);
                            $currentDurasi = $currentDurasi - $sisaCuti;
                        }

                        $updateLe[] = $les;
                    }
                }

                $jatahCutiE += $les->getRest();
            }
        }

        // hitung semua jatah cuti karyawan

        $lHasil = $listCutiKaryawan;
        $currentJumlahCuti = 0;
        foreach ($lHasil as $dLeave) {
            if ($dLeave instanceof Hrd_Models_Leave_Leave) {

                if ($dLeave->getLeaveBind() == 0) { /// jika belum ke bind sama jatah cuti
                    $currentJumlahCuti +=$dLeave->getDuration();
                }
            }
        }

        $currentDurasi = $currentDurasi + $currentJumlahCuti;




        if ($currentDurasi > $jatahCutiE) {
            $jatahCutiE = $jatahCutiE - $currentDurasi;
        }
        // $this->jatahCutiKaryawan = $jatahCutiE;


        $decanLe = Box_Tools::toDecan($updateLe);
        //  $this->hasilJatahCuti = $decanLe->getDCResult();

        return array(
            "list" => $decanLe->getDCResult(),
            "jumlah" => $jatahCutiE
        );
    }

    private function validate($rangeHari) {
        $d = $this->leave; /// leave object
        $hasil = FALSE;
        $msg = "";





        $validDate = $this->fetchNonOffDays($rangeHari,$d);



        if (!$d->getStartDate()) {
            $msg = "Invalid start date";
        } else if (!$d->getEndDate()) {
            $msg = "Invalid end date";
        } else if (intval($d->getAbsentType()->getId()) == 0) {
            $msg = "Invalid absent type";
        } else if (intval($d->getEmployee()->getId()) == 0) {
            $msg = "Invalid employee";
        } else if (count($validDate) == 0) {
            $msg = "Range hari tidak valid";
        } else {
            $hasil = TRUE;
        }

        return array(
            "status" => $hasil,
            "validdate" => $validDate,
            "msg" => $msg
        );
    }

    /* @param $listHari array of Hrd_Models_Master_General_Date */

    private function fetchNonOffDays($listHari,Hrd_Models_Leave_Leave $leave) {
        $validDate = array();
        if (!is_array($listHari)) {
            return $validDate;
        }
        foreach ($listHari as $date) {
            if ($date instanceof Hrd_Models_Master_General_Date) {

                if ($date->getShiftType()->getHolyday() == 0 && $date->getShiftType()->getId() > 0 && !in_array($date->getAbsentType()->getId(), array(Box_Config::ABSENTTYPE_LEAVE, Box_Config::ABSENTTYPE_CUTIBESAR, Box_Config::ABSENTTYPE_CUTITAHUNAN))) {
                    $validDate[] = $date;
                    
                    // hitung durasi
                    if(!$leave->getIsHalfDay()){
                        $leave->setDuration($leave->getDuration()+1);
                    }
                }
            }
        }

        return $validDate;
    }

    public static function fetchAbsentSheet(Hrd_Models_Leave_Leave $leave) {
        /// cek ada di hari off atau gak
        $aDao = new Hrd_Models_AbsentDao();
        $hasil = $aDao->getAbsentSheetByRange($leave->getStartDate(), $leave->getEndDate(), $leave->getEmployee()->getId());

        if (!Box_Tools::adaRecord($hasil)) {
            return FALSE;
        }


        $hasil = Box_Tools::toObjectsb('date', $hasil, FALSE, array('shifttype_', 'absenttype_'));

        return $hasil;
    }

    public static function fetchJatahCuti(Hrd_Models_Leave_Leave $leave, Box_Models_App_Session $ses) {

        $dao = new Hrd_Models_Leave_LeaveEntitlementDao();
        $le = new Hrd_Models_Leave_LeaveEntitlement();


        $le->setProject($ses->getProject());
        $le->setPt($ses->getPt());
        $le->setEmployee($leave->getEmployee());
        // $le->setLeavegroup();
        $le->setIsLeaveEnd(0);
        $leHasil = $dao->getAllByEmployeeWOPL($le);

        if (!Box_Tools::adaRecord($leHasil)) {
            return FALSE;
        }

        return Box_Tools::toObjectsb('leaveentitlement', $leHasil, FALSE);
    }

    public static function fetchCutiKaryawan(Hrd_Models_Leave_Leave $leave) {
        $dao = new Hrd_Models_Leave_Dao();
        $hasil = $dao->getAllWOPL($leave);
        if (!Box_Tools::adaRecord($hasil)) {
            return FALSE;
        }
        return Box_Tools::toObjectsb('leave', $hasil);
    }

    public function getMsg() {
        return $this->msg;
    }

    public function getLeave() {
        return $this->leave;
    }

    public function getDuration() {
        return $this->duration;
    }

    public function getJumlahJatahCuti() {
        return $this->jumlahJatahCuti;
    }

    public function getListUpdateJatahCuti() {
        return $this->listUpdateJatahCuti;
    }

    public function getDates() {
        return $this->dates;
    }

}
