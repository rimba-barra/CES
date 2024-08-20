<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of LeaveProcessor
 *
 * @author MIS
 */
class Hrd_Models_App_Box_LeaveProcessor extends Hrd_Models_App_Box_Processor {
    /* @int */

    private $leaveGroup;

    public function daoProses($dao, $object, $modeCreate) {

        switch ($modeCreate) {
            case "generateyearly":
                return $this->yearlyDo($dao, $object, $modeCreate);
                break;
        }
    }

    /* @return int */

    private function getLeaveAmount($date, $startYear, $pastAmount, $isAkumulasi) {



        $currentYear = (int) date("Y");

        $currentMonth = (int) date("m");
        if ($startYear > $currentYear) {
            $currentYear = $startYear;
            $currentMonth = 1;
        }
        $month = (int) date("m", strtotime($date));
        $year = (int) date("Y", strtotime($date));



        $datetime1 = new DateTime($startYear . '-' . date('m') . '-' . date('d'));
        $datetime2 = new DateTime($date);
        $interval = $datetime1->diff($datetime2);
        $workingYear = $interval->format('%Y%');
        $diffMonth = $interval->format('%m%');


        // $leaveAmount = $this->leaveAmountFormula($month,$currentMonth,$year,$currentYear);
        $data = $this->getData();
        if ($this->leaveGroup == 2) {
            if ($workingYear >= 5) {
                $leaveAmount = $data['amount'];
            } else {
                $leaveAmount = 0;
            }
        } else {
            if ($workingYear > 0) {
                $leaveAmount = $data['amount'];
            } else if ($workingYear == 0 && $diffMonth > 3) {
                $leaveAmount = (int) $diffMonth;
            } else {
                $leaveAmount = 0;
            }
        }

        if (intval($isAkumulasi)) { // hanya berlaku akumulasi untuk tahunan
            $leaveAmount = intval($leaveAmount) + intval($pastAmount);
        }

        return $leaveAmount;
    }

    /* @return int */

    private function leaveAmountFormula($m1, $m2, $y1, $y2) {

        $x = ($y2 - $y1) * 12 + $m2 - $m1;
        return $x;
    }

    private function yearlyDo($dao, $object, $modeCreate) {
        $daoResult = null;

        //// get list employee
        $data = $this->getData();

        $isProportional = FALSE;
        $isProportional = (boolean) $data["proportional"];

        $eDao = new Hrd_Models_Leave_LeaveEntitlementDao();
        $list = $eDao->getListEmployee2($this->getSession()->getProject()->getId(), $this->getSession()->getPt()->getId());

        $listEmployee = array();



        $list = $list[1];
        $employeeIds = '';


        foreach ($list as $li) {

            $tahunTerbawah = (int) $li["hak_cuti_paling_awal"];
            /// 1.  cek hak cuti tahun teratas
            if ($tahunTerbawah > 0) {
                if ($object->getStartUse() >= $tahunTerbawah) {
                    $e = new Hrd_Models_Master_Employee();
                    $e->setArrayTable($li);
                    $listEmployee[] = $e;
                    $employeeIds .=$e->getId() . '~';
                }
            } else {
                $e = new Hrd_Models_Master_Employee();
                $e->setArrayTable($li);
                $listEmployee[] = $e;
                $employeeIds .=$e->getId() . '~';
            }
        }

       

        if (count($listEmployee) == 0) {
           
            return 0;
        }





        // get all hak cuti
        $daoLE = new Hrd_Models_Leave_LeaveEntitlementDao();
        $le = new Hrd_Models_Leave_LeaveEntitlement();
        $ses = $this->getSession();

        $leHasil = $dao->getJatahCutiTahunTerakhir($employeeIds, $this->getSession());



        $leHasil = Box_Tools::toObjectsb('leaveentitlement', $leHasil, FALSE);





        if (!$leHasil) {
            $leHasil = array();
        }

        unset($le);

       




        $validList = array();

        $updateLe = array();
        
   
        if (count($listEmployee) > 0) {
            foreach ($listEmployee as $em) {
                $hasil = Hrd_Models_App_Box_LeaveProcessor::validateHakCuti($em, $object);
              
                if ($hasil["status"]) {
                    $bulanKerja = Box_Tools::getJumlahBulanKerja($em->getHireDate(), $object->getStartUse() . '-01-01');
                  
                    if ($bulanKerja > 0) {
                        $jatahCutiBaru = new Hrd_Models_Leave_LeaveEntitlement();
                        $amount = 0;
                        if ($bulanKerja >= 12) {
                            //$em->setTemp($object->getAmount());
                            $amount = $object->getAmount();
                        } else {
                            $amount = $bulanKerja;
                            //   $em->setTemp($bulanKerja);
                        }

                        $jatahCutiBaru->setAmount($amount);
                        $jatahCutiBaru->setRest($amount);

                        /// check bulan sebelumnya ada minus atau gak
                        foreach ($leHasil as $le) {
                            if ($le->getEmployee()->getId() == $em->getId() && $le->getStartUse() < $object->getStartUse() && $le->getRest() < 0) {
                                //  $em->setTemp($em->getTemp() + $le->getRest());
                                $jatahCutiBaru->setRest($jatahCutiBaru->getRest() + $le->getRest());

                                /// add ke dalam list jatah cuti yang harus diupdate
                                $le->setRest(0);
                                $updateLe[] = $le;
                            }
                        }
                        $jatahCutiBaru->getEmployee()->setId($em->getId());

                        $validList[] = $jatahCutiBaru;
                    }else{
                        
                    }
                }
            }
        }
        //var_dump($le);


        $decanLe = Box_Tools::toDecan($updateLe);

     


        if (count($validList) > 0) {
            $decan = Box_Tools::toDecan($validList);


             


            $daoResult = $dao->generateYearly($object, $decan->getDCResult(), $decanLe->getDCResult());
       
            return $daoResult;
        }else{
            echo "Tida ada data yang valid untuk digenerate";
            die();
        }

        return 0;
    }

    public static function validateHakCuti(Hrd_Models_Master_Employee $em, Hrd_Models_Leave_LeaveEntitlement $le) {

        $hasilAr = array("msg" => "Process", "status" => FALSE);
        /// cek lama kerja karyawan
        /// informasi karyawan
        $hireDate = $em->getHireDate();
        
      
        $durasiKerja = Box_Tools::dateDifference($le->getStartUse() . '-01-01', $hireDate); /// return jumlah hari
        $hariSetahun = 365;
        $hari3bulan = 30 * 3;


        $tahunHireDate = Box_Tools::dateDatePart("y", $hireDate);

        if ($le->getStartUse() < $tahunHireDate) {
            $hasilAr["msg"] = "Tahun tidak valid";
            return $hasilAr;
        }
        
      

        if ($durasiKerja < $hari3bulan) {
            $hasilAr["msg"] = "Durasi kerja masih di bawah 3 bulan";
        } else {
            if ($le->getLeavegroup() == Box_Config::LEAVE_GROUP_BESAR) {

                $tahunHire = date("Y", strtotime($hireDate));

                $fixLimaTahun = $le->getStartUse() - $tahunHire;

                if ($fixLimaTahun < 5) {
                    $hasilAr["msg"] = "Durasi kerja masih di bawah 5 tahun";
                } else {




                    if (($le->getStartUse() - $tahunHire) % 5 == 0) {
                        $hasilAr["status"] = TRUE;
                    } else {
                        $hasilAr["msg"] = "Tahun bukan kelipatan 5 tahun kerja";
                    }
                }
            } else {
                $hasilAr["status"] = TRUE;
            }
        }

        return $hasilAr;
    }

}

?>
