<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of LeaveSubmissionProcessor
 *
 * @author MIS
 */
class Hrd_Models_App_Box_LeaveSubmissionProcessor extends Hrd_Models_App_Box_Processor {

    private $dates;
    private $hasilJatahCuti;
    private $jatahCutiKaryawan; // buat di simpan tabel m_employee

    public function daoSave($dao, $object) {



        return $dao->save($object, $this->dates, $this->hasilJatahCuti, $this->jatahCutiKaryawan);
    }

    public function proses(Hrd_Models_Leave_Leave $leave, $validationStorage) {
        $this->validationStorage = $validationStorage;
        $leave = $this->afterValidation($leave);
        return $leave;
    }

    protected function afterValidation($leave) {

        $vs = $this->validationStorage;



        if (intval($leave->getIsHalfDay())) {

            $tempDate = array($vs[0][0]);
            $vs[0] = $tempDate;
        }



        $decan = Box_Tools::toDecan($vs[0]);
        $dcResult = $decan->getDCResult();

        
        
        $dao = new Hrd_Models_Leave_LeaveEntitlementDao();
        
        // added by wulan sari 20190702
        $dc_date = $dcResult['date'];
        $ex_date = explode('~', $dc_date);
        $count = count($ex_date);
        $i = 0;
        $valid_date = '';
        for($i = 0; $i<$count; $i++){
            $cek = $dao->getShift($ex_date[$i], $leave);
            $holyday = $cek[0][0]['holyday'];
            if($holyday != 1){                
                $valid_date = $valid_date == ''? $valid_date . $ex_date[$i] : $valid_date . '~'.$ex_date[$i];
            }
        }
        $this->dates = $valid_date;//$dcResult['date'];
        // end added by wulan sari 20190702
        
        
        //if (intval($leave->getIsHalfDay())) { // comment by Wulan Sari 27.04.2018
        if (intval($leave->getIsHalfDay()) || $leave->getIsHalfDay() == 'true') { // added by Wulan Sari 27.04.2018
            $duration = 0.5;
        } else {
            if($this->dates == ''){
                $duration = 0;
            } else {
                $duration = count(explode('~', $this->dates));
            }
        }
        
        // added by Wulan Sari 06.06.2018 
        /* kalau generate dari Cuti Bersama, user bisa isi manual duration nya*/
        /*
        sementara comment dulu karena problem karena selalu sudah diset
        $get_duration = $leave->getDuration();
        if(isset($get_duration)){
           $duration = $leave->getDuration()*1;
        }*/
        /// informasi jatah cuti 

        $le = new Hrd_Models_Leave_LeaveEntitlement();
        $ses = $this->getSession();

        $leaveGroup = $leave->getAbsentType()->getId() == Box_Config::ABSENTTYPE_CUTIBESAR ? Box_Config::LEAVE_GROUP_BESAR : Box_Config::LEAVE_GROUP_TAHUNAN;

        // $le->setProject($ses->getProject());
        // $le->setPt($ses->getPt());
        
        // added by Michael 2021.05.19
        $le->setProject($leave->getProject());
        $le->setPt($leave->getPt());
        // end  added by Michael 2021.05.19

        $le->setEmployee($leave->getEmployee());
        $le->setLeavegroup($leaveGroup);
        $le->setIsLeaveEnd(0);

        //added by anas 06122021
        if($leave->getAbsentType()->getCode() == "C-EXT")
        {
            $lDao = new Hrd_Models_Leave_Dao();
            $leHasil = $lDao->getAllByEmployeeExtraLeave($le, $leave->getStartDate(), $leave->getEndDate());
        }
        else
        {
            // $leHasil = $dao->getAllByEmployeeWOPL($le);

            //added by michael 2022-06-08 karena cuti bersama dari Bu Shirley mau supaya bisa dipotong cuti tahunan/cuti besar, soalnya dulu cuma cuti tahunan aja
            if($leave->getDari() && $leave->getDari() == 'cutibersama'){
              $leHasil = $dao->getAllByEmployeeWOPL_cutibersama($le);
            }else{
              $leHasil = $dao->getAllByEmployeeWOPL($le);
            }
        }


        $leHasil = Box_Tools::toObjectsb('leaveentitlement', $leHasil, FALSE);
        
        if(count($leHasil) == 0){
            return 'leave_record_required';
        }
        
        $currentDurasi = $duration;
        $updateLe = array();
        $jatahCutiE = 0; // jatah cuti untuk karyawan
        $counter = 0;

        /// proses hak cuti
        $this->hasilJatahCuti = array();
        $this->prosesHakCuti($duration, 0, $leHasil, $leave, $leaveGroup);
        $this->hasilJatahCuti = $leHasil;
     

        
        //var_dump($leHasil);
        // hitung semua jatah cuti karyawan
        $dao = new Hrd_Models_Leave_Dao();
        $lHasil = Box_Tools::toObjectsb('leave', $dao->getAllWOPL($leave));
        $currentJumlahCuti = 0;
        
        //added by anas 06122021
        //jadi khusus kompensasi cuti extra leave jumlah cuti gk termasuk current cuti
        if($leave->getAbsentType()->getCode() != "C-EXT")
        {
            foreach ($lHasil as $dLeave) {
                if ($dLeave instanceof Hrd_Models_Leave_Leave) {

                    if ($dLeave->getLeaveBind() == 0) { /// jika belum ke bind sama jatah cuti
                        $currentJumlahCuti +=$dLeave->getDuration();
                    }
                }
            }            
        }

        $currentDurasi = $currentDurasi + $currentJumlahCuti;


        if ($currentDurasi > $jatahCutiE) {
            $jatahCutiE = $jatahCutiE - $currentDurasi;
        }
        $this->jatahCutiKaryawan = $jatahCutiE;


        $decanLe = Box_Tools::toDecan($this->hasilJatahCuti);
        $this->hasilJatahCuti = $decanLe->getDCResult();
// print_r($this->hasilJatahCuti);die();
        //added by anas 06122021
        if($leave->getAbsentType()->getCode() == "C-EXT")
        {
            $rest = explode('~', $this->hasilJatahCuti["rest"]);
            $countR = count($rest);
            $i = 0;

            for($i = 0; $i<$count; $i++){
                if($rest[$i] < 0)
                {
                    return 'leave_balance_not_enough';
                }
            }
        }
        //end added by anas


        $leave->setDuration($duration);

        return $leave;
    }

    //added by michael 11/11/2021
    public function hitungIrisan ($cuti, $date1, $date2){
            $dc_date = '';
            
            $dates = array($date1);
            while(end($dates) < $date2){
                $dates[] = date('Y-m-d', strtotime(end($dates).' +1 day'));
            }

            $dc_date = implode('~', $dates);


            // $dc_date = $date1.'~'.$date2;
            $ex_date = explode('~', $dc_date);
            $count = count($ex_date);
            $i = 0;
            $valid_date = '';
            $dao = new Hrd_Models_Leave_LeaveEntitlementDao();
            for($i = 0; $i<$count; $i++){
                $cek = $dao->getShift($ex_date[$i], $cuti);
                $holyday = $cek[0][0]['holyday'];
                if($holyday != 1){                
                    $valid_date = $valid_date == ''? $valid_date . $ex_date[$i] : $valid_date . '~'.$ex_date[$i];
                }
            }
            $dates = $valid_date;

            if (intval($cuti->getIsHalfDay()) || $cuti->getIsHalfDay() == 'true') { 
                $duration = 0.5;
            } else {
                if($dates == ''){
                    $duration = 0;
                } elseif($date1 == $date2){
                    $duration = 1;
                } else {
                    $duration = count(explode('~', $dates));
                }
            }

            return $duration;
    }
    //end added by michael 11/11/2021

    public function prosesHakCuti($durasiCuti, $indexHakCuti, $listHakCuti, $cuti, $leaveGroup) {
        //  var_dump($listHakCuti[$indexHakCuti]->getLeavegroup());
        //  if ($listHakCuti[$indexHakCuti]->getLeavegroup() == $leaveGroup) {
        
        //added by michael 11/11/2021
        
        // $expiredDate = $listHakCuti[$indexHakCuti]->getExpiredDate();
        
        // edit by michael 11/01/2022 , case jika ditanda tangan Pak Tulus cuti bisa diperpanjang lebih dari 1.5th, jadinya baca extension_date
        $expiredDate = $listHakCuti[$indexHakCuti]->getExtensionDate();
        
        // $startDate = $cuti->getstartDate();
        // $endDate = $cuti->getendDate();
        //updated by michael 20220615, karena ini hasilnya datetime, sementara expired date date
        $startDate = date('Y-m-d',strtotime($cuti->getstartDate()));
        $endDate = date('Y-m-d',strtotime($cuti->getendDate()));

        if($expiredDate < $startDate && $expiredDate < $endDate){
          $alreadyExpiredDate = 1;
          $irisan = 0;
        }
        // elseif($startDate <= $expiredDate && $expiredDate <= $endDate){
        //updated by michael 01042022
        //jadi $expiredDate < $endDate, karena extension date mempet dengan enddate
        elseif($startDate <= $expiredDate && $expiredDate < $endDate) 
        {
          $alreadyExpiredDate = 0;
          $irisan = 1;
        }else{
          $alreadyExpiredDate = 0;
          $irisan = 0;
        }
        //end added by michael 11/11/2021

        

        $sisa = doubleval($listHakCuti[$indexHakCuti]->getRest());
        $sisaAkhir = 0;

        if ($sisa > 0) {

          //added by michael 11/11/2021
          if($alreadyExpiredDate != 1 && $irisan != 1){
          //end added by michael 11/11/2021

            if ($durasiCuti > $sisa) {
                $sisaAkhir = 0;
                $durasiCuti = $durasiCuti - $sisa;
                // print_r($durasiCuti);die();
                /// jika tidak ada hak cuti berikutnya maka minus untuk tahun ini 
                if(!array_key_exists($indexHakCuti + 1, $listHakCuti)){
                    $sisaAkhir = $sisaAkhir - $durasiCuti;
                }
                
            } else {
                $sisaAkhir = $sisa - $durasiCuti;
                $durasiCuti = 0;
            }
            
          //added by michael 11/11/2021
          }elseif($alreadyExpiredDate == 0 && $irisan == 1){

            //HITUNG dari awal cuti sampai expired, potong sebagian dulu
            $durasiCuti_BefIrisan = $this->hitungIrisan($cuti, $startDate,$expiredDate);

            if ($durasiCuti_BefIrisan > $sisa) {
                $sisaAkhir = 0;
                $durasiCuti = $durasiCuti - $sisa;
                
                /// jika tidak ada hak cuti berikutnya maka minus untuk tahun ini 
                if(!array_key_exists($indexHakCuti + 1, $listHakCuti)){
                    $sisaAkhir = $sisaAkhir - $durasiCuti;
                }
                
            } else {
                $sisaAkhir = $sisa - $durasiCuti_BefIrisan;
                $durasiCuti = $durasiCuti - $durasiCuti_BefIrisan;

                // PERLU KONFIRMASI (?)
                /// jika tidak ada hak cuti berikutnya maka minus untuk tahun ini 
                if($durasiCuti > 0 && !array_key_exists($indexHakCuti + 1, $listHakCuti)){
                    $sisaAkhir = $sisaAkhir - $durasiCuti;
                    $durasiCuti = 0;
                }
            }

          }else{
            $sisaAkhir = $sisa;
            $durasiCuti = $durasiCuti;

            // PERLU KONFIRMASI (?)
            /// jika tidak ada hak cuti berikutnya maka minus untuk tahun ini 
            if($durasiCuti > 0 && !array_key_exists($indexHakCuti + 1, $listHakCuti)){
                $sisaAkhir = $sisaAkhir - $durasiCuti;
                $durasiCuti = 0;
            }
          }
          //end added by michael 11/11/2021

            $listHakCuti[$indexHakCuti]->setRest($sisaAkhir);
           // var_dump("sisa : " . $listHakCuti[$indexHakCuti]->getRest());
        } else { 
           
            /// jika tidak punya hak cuti tahun berikutnya, maka potong cuti di tahun ini
            if (!array_key_exists($indexHakCuti + 1, $listHakCuti)) {
                $listHakCuti[$indexHakCuti]->setRest($sisa- doubleval($durasiCuti));
                $durasiCuti = 0;
            }
        }
        
       

      
 
        if ($durasiCuti > 0 && array_key_exists($indexHakCuti + 1, $listHakCuti)) {

            $this->prosesHakCuti($durasiCuti, $indexHakCuti + 1, $listHakCuti, $cuti, $leaveGroup);
        }
        
    }

    /*
      protected function afterValidation($leave) {

      $vs = $this->validationStorage;



      if (intval($leave->getIsHalfDay())) {

      $tempDate = array($vs[0][0]);
      $vs[0] = $tempDate;
      }



      $decan = Box_Tools::toDecan($vs[0]);
      $dcResult = $decan->getDCResult();

      $this->dates = $dcResult['date'];

      if (intval($leave->getIsHalfDay())) {
      $duration = 0.5;
      } else {
      $duration = count(explode('~', $this->dates));
      }


      /// informasi jatah cuti

      $dao = new Hrd_Models_Leave_LeaveEntitlementDao();
      $le = new Hrd_Models_Leave_LeaveEntitlement();
      $ses = $this->getSession();

      $leaveGroup = $leave->getAbsentType()->getId() == Box_Config::ABSENTTYPE_CUTIBESAR ? Box_Config::LEAVE_GROUP_BESAR : Box_Config::LEAVE_GROUP_TAHUNAN;

      $le->setProject($ses->getProject());
      $le->setPt($ses->getPt());
      $le->setEmployee($leave->getEmployee());
      // $le->setLeavegroup();
      $le->setIsLeaveEnd(0);
      $leHasil = $dao->getAllByEmployeeWOPL($le);

      $leHasil = Box_Tools::toObjectsb('leaveentitlement', $leHasil, FALSE);


      $currentDurasi = $duration;
      $updateLe = array();
      $jatahCutiE = 0; // jatah cuti untuk karyawan
      $counter = 0;

      foreach ($leHasil as $les) {
      if ($les instanceof Hrd_Models_Leave_LeaveEntitlement) {
      // mendaftarkan jatah cuti yang berinteraksi dengan penggunaan cuti
      if ($les->getLeavegroup() == $leaveGroup) {

      if ($currentDurasi > 0) {
      // kalau sisa cuti nol maka cek jatah cuti berikutnya
      if ($les->getRest() <= 0) {

      $addHakCutiBerikut = FALSE;
      if (array_key_exists($counter + 1, $leHasil)) {
      if ($leHasil[$counter + 1]->getLeavegroup() == $leaveGroup) {
      $addHakCutiBerikut = TRUE;
      }
      }

      if ($addHakCutiBerikut) {
      $leHasil[$counter + 1]->setRest($leHasil[$counter + 1]->getRest() - $currentDurasi);
      $currentDurasi = 0;
      $updateLe[] = $leHasil[$counter + 1];
      } else {
      $les->setRest($les->getRest() - $currentDurasi);
      $currentDurasi = 0;
      $updateLe[] = $les;
      }

      } else {
      $addHakCutiBerikut = FALSE;
      if (array_key_exists($counter + 1, $leHasil)) {
      if ($leHasil[$counter + 1]->getLeavegroup() == $leaveGroup) {
      $addHakCutiBerikut = TRUE;
      }
      }
      if ($addHakCutiBerikut) {
      $sisaCuti = $les->getRest() - $currentDurasi;
      $temp = $sisaCuti;
      $sisaCuti = $sisaCuti <= 0 ? 0 : $sisaCuti;
      $les->setRest($sisaCuti);
      $currentDurasi = abs($temp);
      } else {
      $les->setRest($les->getRest() - $currentDurasi);
      $currentDurasi = 0;
      }
      $updateLe[] = $les;
      }



      }
      }

      $jatahCutiE += $les->getRest();
      }
      $counter++;
      }

      // hitung semua jatah cuti karyawan
      $dao = new Hrd_Models_Leave_Dao();
      $lHasil = Box_Tools::toObjectsb('leave', $dao->getAllWOPL($leave));
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
      $this->jatahCutiKaryawan = $jatahCutiE;


      $decanLe = Box_Tools::toDecan($updateLe);
      $this->hasilJatahCuti = $decanLe->getDCResult();





      $leave->setDuration($duration);

      return $leave;
      }

     */

    public static function hitungSisaCuti(Hrd_Models_Leave_LeaveEntitlement $les, $leaveGroup, $currentDurasi) {
        $hasil = array("updatele" => array(), "jatahcutie" => 0);
        if ($les->getLeavegroup() == $leaveGroup) {
            if ($currentDurasi > 0) {
                $sisaCuti = $les->getRest();
                if ($sisaCuti >= $currentDurasi) {
                    $les->setRest($sisaCuti - $currentDurasi);
                    $currentDurasi = 0;
                } else {
                    $currentDurasi = $currentDurasi - $sisaCuti;
                    $les->setRest(0);
                }

                $hasil["updatele"][] = $les;
            }
        }
        $hasil["jatahcutie"] = $les->getRest();

        return $hasil;
    }

    public static function getValidTanggalCuti(Hrd_Models_Leave_Leave $d) {
        $aDao = new Hrd_Models_AbsentDao();

        $hasil = $aDao->getAbsentSheetByRange($d->getStartDate(), $d->getEndDate(), $d->getEmployee()->getId());


        $hasil = Box_Tools::toObjectsb('date', $hasil, FALSE, array('shifttype_'));

        $validDate = array();
        foreach ($hasil as $date) {
            if ($date instanceof Hrd_Models_Master_General_Date) {

                if ($date->getShiftType()->getHolyday() == 0 && $date->getShiftType()->getId() > 0) {
                    $validDate[] = $date;
                }
            }
        }



        if (count($validDate) > 0) {
            $decan = Box_Tools::toDecan($validDate);
            $dcResult = $decan->getDCResult();

            if (count($dcResult) > 0) {
                $validDate = $dcResult['date'];
            } else {
                return FALSE;
            }
        } else {
            return FALSE;
        }
        return $validDate;
    }

    public function getDates() {
        return $this->dates;
    }

    public function getHasilJatahCuti() {
        return $this->hasilJatahCuti;
    }

    public function getJatahCutiKaryawan() {
        return $this->jatahCutiKaryawan;
    }

    /* @param $arrayHari => '2016-01-01~2016-01-02~....' */

    public static function getDurasi($arrayHari, $isHalfDay) {
        $jumlahHari = 0;

        $arrayHari = explode("~", $arrayHari);
        $jumlahHari = count($arrayHari);



        return $isHalfDay ? 0.5 : $jumlahHari;
    }

}

?>
