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
class Hrd_Models_Overtime_Validator extends Box_Models_App_Validator {

    private $type;
    private $obj;

    const TIME_TEXT_LENGTH = 8;

    public function run($obj) {
        $msg = "";
        
        $dao = new Hrd_Models_Overtime_Dao();
        $exist = $dao->isExist($obj);
        $absentnull = $dao->isAbsentNull($obj);
                
        // cek kalau lembur sesudah jam kerja        
        $absenttime = $dao->getAbsentTime($obj);
        $absent_in = $absenttime[0][0]['time_in'];
        $absent_out = $absenttime[0][0]['time_out'];
        
        $overtime_time_in_start = $obj->getExecTimeInStart();
        $overtime_time_in_end = $obj->getExecTimeInEnd();
        $overtime_time_out_start = $obj->getExecTimeOutStart();
        $overtime_time_out_end = $obj->getExecTimeOutEnd();
        $overtime_status = $obj->getStatus();
                
        $hasil = $dao->getCekDate($obj);   
        $cek_datetime = $hasil[0][0]['jml'];

        /*
        1:'Sebelum Jam Masuk'
        2:'Sesudah Jam Pulang'
        3:'Keduanya'
        4:'Hari Libur / OFF'
        5:'Hari Libur Pendek'
        */
        $confirm_alert_time = $obj->getConfirm_alert_time();
        $cek_time = '';
        if($overtime_status == 1){ // Sebelum Jam Masuk            
            if($overtime_time_in_start < $absent_in){
                $cek_time = 'overtime_in_lebih_kecil_dari_absent|Jam datang lembur ('.substr($overtime_time_in_start, 0, 5).') lebih kecil dari jam datang absent ('.substr($absent_in, 0, 5).'), yakin akan lanjutkan?';
            } else if($overtime_time_in_end > $absent_out){
                $cek_time = 'overtime_out_lebih_besar_dari_absent|Jam pulang lembur ('.substr($overtime_time_in_end, 0, 5).') lebih besar dari jam pulang absent ('.substr($absent_out, 0, 5).'), yakin akan lanjutkan?';
            }
        } else if($overtime_status == 2 || $overtime_status == 4 || $overtime_status == 5){ // Sesudah Jam Pulang         
            if($overtime_time_out_start < $absent_in){
                $cek_time = 'overtime_in_lebih_kecil_dari_absent|Jam datang lembur ('.substr($overtime_time_out_start, 0, 5).') lebih kecil dari jam datang absent ('.substr($absent_in, 0, 5).'), yakin akan lanjutkan?';
            } else  if($overtime_time_out_end > $absent_out){
                $cek_time = 'overtime_out_lebih_besar_dari_absent|Jam pulang lembur ('.substr($overtime_time_out_end, 0, 5).') lebih besar dari jam pulang absent ('.substr($absent_out, 0, 5).'), yakin akan lanjutkan?';
            }       
        } else if($overtime_status == 3){ // keduanya        
            if($overtime_time_in_start < $absent_in){
                $cek_time = 'overtime_in_lebih_kecil_dari_absent|Jam datang lembur ('.substr($overtime_time_in_start, 0, 5).') lebih kecil dari jam datang absent ('.substr($absent_in, 0, 5).'), yakin akan lanjutkan?';
            } else if($overtime_time_out_end > $absent_out){
                $cek_time = 'overtime_out_lebih_besar_dari_absent|Jam pulang lembur ('.substr($overtime_time_out_end, 0, 5).') lebih besar dari jam pulang absent ('.substr($absent_out, 0, 5).'), yakin akan lanjutkan?';
            } 
        }
        
        if (!$obj->getDate()) {
            $msg = "Invalid date";
        } else if ($cek_datetime) {
            $msg = "Overtime already exists";
        } else if (!$obj->getEmployee()->getId()) {
            $msg = "Invalid employee";
        } else if (strlen($obj->getReason()) < 5) {
            $msg = "Reason minimum 5 characters";
        } else if (!$obj->getStatus()) {
            $msg = "Invalid overtime status";
        } else if($exist && $obj->getId()==0){
             $msg = "Data transaksi untuk tanggal dan jam ini sudah terdaftar";
        } else if($absentnull){
             $msg = "Tidak ada jam masuk dan pulang di absent record";
        } else if($cek_time != '' && $confirm_alert_time != 1){
             $msg = $cek_time;
        } else if(($overtime_time_in_start == '00:00:00' || $overtime_time_in_start == '')
                && ($overtime_time_in_end == '00:00:00' || $overtime_time_in_end == '')
                && ($overtime_time_out_start == '00:00:00' || $overtime_time_out_start == '')
                && ($overtime_time_out_end == '00:00:00' || $overtime_time_out_end == '')){
             $msg = 'Jam Lembur tidak valid';
        } else if($obj->getNilaiLembur() == ''){
             $msg = 'Nilai Lembur tidak ada, silakan tekan tombol process';
        } else {
            $this->setStatus(TRUE);
        }
        
        $this->setMsg($msg);
    }

    /*
      public function run($d) {
      $msg = "";
      if ($this->type == "header") {
      $obj = $this->obj;
      if ($obj instanceof Hrd_Models_Overtime_Header) {
      if (!$obj->getDate()) {
      $msg = "Invalid date";
      } else if (!$obj->getEmployee()->getId()) {
      $msg = "Invalid employee";
      } else if (strlen($obj->getReason()) < 5) {
      $msg = "Reason minimum 5 characters";
      } else if (!$obj->getStatus()) {
      $msg = "Invalid overtime status";
      } else if(strlen ($obj->getPlanBeforeStart()) < 8 && strlen ($obj->getPlanAfterStart()) < 8){
      $msg = "One of the start time must be filled";


      }else {

      $start = 0;
      $end = 0;
      $duration = 0;
      /// check jika before yang keisi
      if($this->validTime($obj->getPlanBeforeStart())){
      $start = new Hrd_Models_App_Date($obj->getPlanBeforeStart());
      $end = new Hrd_Models_App_Date($obj->getPlanBeforeEnd());
      }else{
      $start = new Hrd_Models_App_Date($obj->getPlanAfterStart());

      $end = new Hrd_Models_App_Date($obj->getPlanAfterEnd());
      }
      $duration = $end->getTime() - $start->getTime();
      $amount = Hrd_Models_App_Date::amountDate($duration);

      if($amount->getHour() < 1){
      $msg = "Overtime Plan duration minimum 1 hour";
      }else{
      $this->setStatus(TRUE);
      }

      }
      $this->setMsg($msg);
      }
      } else {
      if (!$d->getStartTime()) {
      $msg = "Invalid start time";
      } else if (!$d->getEndTime()) {
      $msg = "Invalid end time";
      } else {

      $this->setStatus(TRUE);
      }
      $this->setMsg($msg);
      }
      }

     */

    private function validTime($time) {
        if (strlen($time) >= Hrd_Models_Overtime_Validator::TIME_TEXT_LENGTH) {
            return TRUE;
        }
        return FALSE;
    }

}

?>
