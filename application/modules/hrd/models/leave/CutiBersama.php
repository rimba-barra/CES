<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of CutiBersama
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Leave_CutiBersama {

    private $leave;
    private $session;
    private $msg;
    private $status;
    private $msgProcess;
    private $jumlahKaryawan = 0;
    private $jumlahHari = 0;
    private $listKaryawan;
    private $listHakCuti;
    private $jenisError;
    public $confirmed;

    public function __construct(Hrd_Models_Leave_Leave $leave, Box_Models_App_Session $ses) {
        $this->leave = $leave;
        $this->session = $ses;
    }

    public function process() {
        $leave = $this->leave;
        $decan = NULL;

        if ($leave instanceof Hrd_Models_Leave_Leave) {


            $leave->getAbsentType()->setId(Box_Config::ABSENTTYPE_CUTITAHUNAN);
            if ($leave->getIsHalfDay()) {
                $leave->setDuration(0.5);
                $leave->setEndDate($leave->getStartDate());
            }


            if ($this->getTotalKaryawan() > 0) {


                


                $ids = $this->listKaryawan;

                //// tidak boleh ada karyawan yang tidak mempunyai record hak cuti
                $daoLe = new Hrd_Models_Leave_LeaveEntitlementDao();

                //$hasilLe = $daoLe->getJatahCutiTahunTerakhir($ids, $this->session);
                $hasilLe = $daoLe->getJatahCutiTahunTerlamaYangAktif($ids, $this->session);
                $hasilLe = Box_Tools::toObjectResult($hasilLe, new Hrd_Models_Leave_LeaveEntitlement());










                // echo $this->getTotalKaryawan();
                //  echo count($hasilLe);
                // UNMARK jika membandingkan jumlah karyawan dengan record hak cuti

                $idsAr = explode("~", $ids);
                $listKaryawanTPHC = array(); /// list karyawan yang tidak punya hak cuti
                $tempName = NULL;

                // skip this employee
               // $skipEm = array(1220, 1221, 1222, 1592, 1593, 1594, 1595, 2595);
                $skipEm = array();
                
                foreach ($idsAr as $id) {
                    if (intval($id) > 0) {
                        $match = false;
                        foreach ($hasilLe as $le) {
                            if ($id == $le->getEmployee()->getId()) {
                                $match = true;
                            }
                        }

                        if (!$match) {
                            if (!in_array($id, $skipEm)) {
                                $listKaryawanTPHC[] = $id;
                            }
                        }
                    }
                }


                /// cek jika ada sisa cuti = 0
                $liatEmSisaCutiNol = array();
                foreach ($hasilLe as $le) {
                    if ($le->getRest() == 0) {
                        $liatEmSisaCutiNol[] = $le->getEmployee()->getId();
                    }
                }


                if (count($listKaryawanTPHC) > 0) {
                    $eDao = new Hrd_Models_Master_EmployeeDao();
                    $listEm = $eDao->getAllByIds(implode("~", $listKaryawanTPHC));
                    $listEm = Box_Tools::toObjectResult($listEm, new Hrd_Models_Master_Employee());
                    $tempEmAr = array();
                    foreach ($listEm as $em) {
                        $tempEmAr[] = $em->getName();
                    }

                    $this->msg = "Karyawan berikut belum ada record hak cuti : " . implode(",", $tempEmAr);
                    $this->jenisError = 1;
                /// jika belum konfirmasi, maka lakukan filter ini.
                    /* Jika proses cuti bersama harus mempunyai hak cuti di atas nol */
               /* } else if (count($liatEmSisaCutiNol) > 0 && !$this->confirmed) {
                    $eDao = new Hrd_Models_Master_EmployeeDao();
                    $listEm = $eDao->getAllByIds(implode("~", $liatEmSisaCutiNol));
                    $listEm = Box_Tools::toObjectResult($listEm, new Hrd_Models_Master_Employee());
                    $tempEmAr = array();
                    foreach ($listEm as $em) {
                        $tempEmAr[] = $em->getName();
                    }

                    $this->msg = "Karyawan berikut nilai sisa cuti nol : " . implode(",", $tempEmAr);
                    $this->jenisError = 2;
                
                */
                } else {

                    $date1 = new DateTime($leave->getStartDate());
                    $date2 = new DateTime($leave->getEndDate());
                    $interval = $date1->diff($date2);
                    $durasi = intval($interval->days) + 1;

                    /// mengurangi sisa cuti 
                    foreach ($hasilLe as $le) {
                        $le->setRest(floatval($le->getRest()) - $durasi);
                    }

                    $decanLe = Box_Tools::toDecan($hasilLe);

                    $this->listHakCuti = $decanLe->getDCResult();


                    $rangeHari = $this->fetchRangHari($leave, $ids);

                    $decan = $this->printDecan($rangeHari);





                    $this->msgProcess = $decan[1];
                    $decan = $decan[0];
                    $this->status = TRUE;
                }





                /*

                  $rangeHari = $this->fetchRangHari($leave, $ids);



                  if (count($rangeHari) == 0) {
                  $this->msg = "Tidak ada range hari";
                  } else {
                  $decan = $this->printDecan($rangeHari);

                  $this->msgProcess = $decan[1];
                  $decan = $decan[0];
                  }

                 */

                // var_dump($listKaryawanTPHC);
            } else {
                $this->msg = "Tidak ada karyawan";
            }

            //  $ids = $this->fetchAllKaryawan();
        } // end instanceof Hrd_Models_Leave_Leave

        return $decan;
    }

    private function getTotalKaryawan() {
        $list = $this->listKaryawan;
        $list = rtrim($list, "~");
        $this->listKaryawan = $list;
        $list = explode("~", $list);
        $count = 0;

        if (is_array($list)) {
            if (intval($list[0]) > 0) {
                $count = count($list);
            }
        }
        return $count;
    }

    private function fetchAllKaryawan() {
        $ids = "";

        $dao = new Hrd_Models_Master_EmployeeDao();
        $em = new Hrd_Models_Master_Employee();
        $em->setProject($this->session->getProject());
        $em->setPt($this->session->getPt());

        $dataEm = $dao->getAllWOPL($em);


        if (Box_Tools::adaRecord($dataEm)) {
            $allEm = Box_Tools::toObjects("employee", $dataEm);
        }

        $this->jumlahKaryawan = count($allEm);

        //var_dump(count($allEm));

        foreach ($allEm as $em) {
            $ids = $ids . "~" . $em->getId();
        }

        return $ids;
    }

    private function fetchRangHari(Hrd_Models_Leave_Leave $leave, $idsKaryawan) {
        $ids = $idsKaryawan;
        $allRangeHariEm = array(); //hold range hari by employee;

        if (!$leave->getStartDate() || !$leave->getEndDate()) {
            $this->msg = "[2] Tanggal start dan end cuti tidak valid";
            return $allRangeHariEm;
        }





        $dao = new Hrd_Models_AbsentDao();
        $allRangeHari = $dao->getAbsentSheetByRangeMulti($leave->getStartDate(), $leave->getEndDate(), $ids);



        if (Box_Tools::adaRecord($allRangeHari)) {
            $allRangeHari = Box_Tools::toObjectsb("date", $allRangeHari, FALSE, array('shifttype_', 'absenttype_'));
        } else {
            $allRangeHari = array();
            $this->msg = "[3] Record absent sheet tidak valid";
        }




        foreach ($allRangeHari as $date) {
            // var_dump($date->getAbsentType()->getId());
            $employeeId = $date->getAbsent()->getEmployee()->getId();
            if (!key_exists($employeeId, $allRangeHariEm)) {
                $allRangeHariEm[$employeeId] = array($date);
            } else {
                $allRangeHariEm[$employeeId][] = $date;
            }

            // var_dump($date->getAbsent()->getEmployee()->getId());
        }

        $this->jumlahHari = count($allRangeHariEm);

        return $allRangeHariEm;
    }

    private function printDecan($rangeHari) {
        $allRangeHariEm = $rangeHari;
        $leave = $this->leave;

        $allMsg = array();
        $allDates = array("employee_id" => "",
            "date" => "", "duration" => "", "ishalfday" => "");

        foreach ($allRangeHariEm as $emId => $rangeHari) {

            $leaveEm = new Hrd_Models_Leave_Leave();
            $leaveEm->setStartDate($leave->getStartDate());
            $leaveEm->setEndDate($leave->getEndDate());
            $leaveEm->getEmployee()->setId($emId);
            $leaveEm->setAbsentType($leave->getAbsentType());
            $leaveEm->setDuration($leave->getDuration());
            $leaveEm->setIsHalfDay($leave->getIsHalfDay());



            $mesin = new Hrd_Models_Leave_Mesin($leaveEm);
            if ($mesin->run($rangeHari)) {
                $dates = $mesin->getDates();
                $dates = Box_Tools::toDecan($dates);
                $dcResult = $dates->getDCResult();
                //  var_dump($dates);
                $allDates["duration"] .= $leaveEm->getDuration() . "#";
                $allDates["ishalfday"] .= $leaveEm->getIsHalfDay() . "#";
                $allDates["employee_id"] .= $emId . "#";
                $allDates["date"] .= $dcResult["date"] . "#";
                //  $allDates[$emId] = $dates->getDCResult();
            } else {
                $allMsg[$emId] = $mesin->getMsg();
            }
        }

        return array($allDates, $allMsg);
    }

    public function getMsgProcess() {
        return $this->msgProcess;
    }

    public function getJumlahKaryawan() {
        return $this->jumlahKaryawan;
    }

    public function getJumlahHari() {
        return $this->jumlahHari;
    }

    public function getMsg() {
        return $this->msg;
    }

    public function getStatus() {
        return $this->status;
    }

    public function getListKaryawan() {
        return $this->listKaryawan;
    }

    public function setListKaryawan($listKaryawan) {
        $this->listKaryawan = $listKaryawan;
        $this->jumlahKaryawan = $this->getTotalKaryawan();
    }

    public function getListHakCuti() {
        return $this->listHakCuti;
    }
    
    public function getJenisError(){
        return $this->jenisError;
    }

}
