<?php

/**
 * Description of Cuti
 *
 * @author TOMMY-MIS
 */
class Ruangkoding_Cuti_Cuti {

    private $tanggalAwal; /// date 
    private $tanggalAkhir; /// date
    private $durasi; // float
    private $isHitungDurasi; /// apakah durais dihitung sistem atau tidak
    private $isSetengahHari; /// apakah setengah hari

    public function __construct($isHitungDurasi = TRUE,$tanggalAwal,$tanggalAkhir) {
        $this->isHitungDurasi = (boolean) $isHitungDurasi;
        $this->tanggalAwal = $tanggalAwal;
        $this->tanggalAkhir = $tanggalAkhir;
    }

    public function proses() {
        $durasi = $this->prosesDurasi();
        return $durasi;
    }

    /* @return float */
    private function prosesDurasi() {
        $durasi = 0.0;
        if ($this->isHitungDurasi) {
            if ($this->isSetengahHari) {
                $durasi = 0.5;
            } else {
                $date1 = $this->tanggalAwal;
                $date2 = $this->tanggalAkhir;

                $diff = abs(strtotime($date2) - strtotime($date1));
                
              

                $years = floor($diff / (365 * 60 * 60 * 24));
                $months = floor(($diff - $years * 365 * 60 * 60 * 24) / (30 * 60 * 60 * 24));
                $days = floor(($diff - $years * 365 * 60 * 60 * 24 - $months * 30 * 60 * 60 * 24) / (60 * 60 * 24));

               // echo  $years."-".$months."-".$days;
                $durasi = $days+1;
            }
        } else {
            $durasi = $this->durasi;
        }
        return $durasi;
    }

    public function setDurasi($durasi) {
        $this->durasi = (float) $durasi;
    }
    
    public function printInfo(){
        echo "HITUNG DURASI : ".($this->isHitungDurasi?"TRUE":"FALSE")."<br/>";
        echo "SETENGAH HARI : ".($this->isSetengahHari?"TRUE":"FALSE")."<br/>";
    }
    
    public function setIsSetengahHari($isSetengahHari){
        $this->isSetengahHari = $isSetengahHari;
    }
    
    
        

}
