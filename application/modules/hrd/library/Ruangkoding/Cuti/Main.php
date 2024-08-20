<?php

/**
 * Description of Main
 *
 * @author TOMMY-MIS
 */
class Ruangkoding_Cuti_Main {

    private $tanggalAwal;
    private $tanggalAkhir;
    private $pesanError;
    private $absentSheet;
    private $isSetengahHari;
    private $isHitungDurasi;
    private $durasi;
    private $daftarHakCuti;
    private $hasilAbsentSheet;
    private $hasilHakCuti;
    private $employeeId;

    public function __construct($employeeId, $tanggalAwal, $tanggalAkhir) {
        $this->employeeId = (int) $employeeId;
        $this->tanggalAwal = $tanggalAwal;
        $this->tanggalAkhir = $tanggalAkhir;
        $this->isHitungDurasi = TRUE;
    }

    public function proses() {

        $durasiCuti = 0;

        if (intval($this->employeeId) == 0) {
            $this->pesanError = "[ERR01] Karyawan tidak valid.";
            return FALSE;
        }


        /// memisahkan hari sesuai absent sheet abasentrecord;
        $daftarHari = $this->memisahkanHari($this->tanggalAwal, $this->tanggalAkhir);

        if (count($daftarHari) == 0) {
            return FALSE;
        }


        /// menghitung durasi cuti
        if ($this->isHitungDurasi) {
            $durasiCuti = $this->hitungDurasi($daftarHari);
        } else {
            $durasiCuti = $this->isSetengahHari ? 0.5 : $this->durasi;
        }

        // update hak cuti
        if ($durasiCuti > 0) {
            $this->updateDaftarHakCuti($durasiCuti);
        }


        // hasil
        $this->hasilAbsentSheet = $daftarHari;
        $this->durasi = $durasiCuti;



        //var_dump($this->daftarHakCuti);
        // var_dump($daftarHari);
        // var_dump($durasiCuti);
    }

    private function hitungDurasi($daftarTgl) {
        $durasi = 0;
        if (!is_array($daftarTgl)) {
            $this->pesanError = "[ERR02] Daftar tanggal dari proses bukan array .";
            return $durasi;
        }

        if (count($daftarTgl) == 0) {
            $this->pesanError = "[ERR03] Daftar tanggal dari proses kosong.";
            return $durasi;
        }

        if (count($daftarTgl) == 1) {
            $cuti = new Ruangkoding_Cuti_Cuti($this->isHitungDurasi, $daftarTgl[0], $daftarTgl[0]);
            $cuti->setIsSetengahHari($this->isSetengahHari);
            $durasi = $cuti->proses();
            /// $cuti->printInfo();
        } else {
            foreach ($daftarTgl as $tgl) {
                $cuti = new Ruangkoding_Cuti_Cuti($this->isHitungDurasi, $tgl, $tgl);
                $cuti->setIsSetengahHari($this->isSetengahHari);
                $durasi += $cuti->proses();

                //    $cuti->printInfo();
            }
        }

        if ($this->isSetengahHari) {
            $durasi = 0.5;
        }



        return $durasi;
    }

    /* @return array hari */
    /* @return list hari yang akan diupdate di absent sheet untuk update tipe absen dll. */

    private function memisahkanHari($tanggalAwal, $tanggalHari) {
        $daftarHariCuti = array();
        $jmlHariSama = 0; // jumlah hari yang sama

        $daftarTgl = $this->createDateRangeArray($tanggalAwal, $tanggalHari);

        $absentSheet = $this->absentSheet;

        if (!is_array($absentSheet)) {
            $this->pesanError = "[ERR04] Absentsheet tidak valid.";
            return array();
        }

        if (count($daftarTgl) != count($absentSheet)) {
            $this->pesanError = "[ERR05] Jumlah hari transaksi (" . count($daftarTgl) . ") dan absent sheet (" . count($absentSheet) . ") tidak sama";
            return array();
        }



        /// memilah daftar tanggal dengan tgl absent sheet yang bisa ditransaksikan cuti.
        foreach ($daftarTgl as $tgl) {
            foreach ($absentSheet as $absenTgl) {

                if ($tgl == $absenTgl["tgl"] && $absenTgl["employee_id"] == $this->employeeId && intval($absenTgl["hari_libur"]) == 0) {
                    $jmlHariSama++;

                    if ($absenTgl["ada_tipeabsen"] == 0) { // jika tanggal belum terisi TIPE_ABSEN
                        $daftarHariCuti[] = $tgl;
                    }
                }
            }
        }


        /*
          if ($jmlHariSama != count($absentSheet)) {
          $this->pesanError = "[ERR06] Jumlah hari yang ditemukan tidak sama, ekspetasi " . count($daftarTgl) . ", realitas " . $jmlHariSama;
          return array();
          }
         */






        // daftar hari cuti untuk di update di absent sheet
        return $daftarHariCuti;
    }

    private function updateDaftarHakCuti($durasi) {
        if (!is_array($this->daftarHakCuti)) {
            $this->pesanError = "[ERR07] Daftar hak cuti tidak valid.";
            return FALSE;
        }
        if (count($this->daftarHakCuti) == 0) {
            $this->pesanError = "[ERR08] Jumlah daftar hak cuti = 0";
            return FALSE;
        }

        $temp = array();

        foreach ($this->daftarHakCuti as $hakCuti) {
            if ($hakCuti["employee_id"] == $this->employeeId) {
                $temp[] = $hakCuti;
            }
        }

        if (count($temp) == 0) {
            $this->pesanError = "[ERR09] Jumlah daftar hak cuti untuk karyawan = 0";
            return FALSE;
        }

        /// sort tahun paling lama di atas
        usort($temp, function($a, $b) {
            return $a['tahun'] - $b['tahun'];
        });

        $temp[0]['sisa'] = $temp[0]['sisa'] - $durasi;
        $this->hasilHakCuti = $temp[0];
        //   $this->daftarHakCuti = $temp;
    }

    /**/

    private function createDateRangeArray($strDateFrom, $strDateTo) {
        // takes two dates formatted as YYYY-MM-DD and creates an
        // inclusive array of the dates between the from and to dates.
        // could test validity of dates here but I'm already doing
        // that in the main script

        $aryRange = array();

        $iDateFrom = mktime(1, 0, 0, substr($strDateFrom, 5, 2), substr($strDateFrom, 8, 2), substr($strDateFrom, 0, 4));
        $iDateTo = mktime(1, 0, 0, substr($strDateTo, 5, 2), substr($strDateTo, 8, 2), substr($strDateTo, 0, 4));

        if ($iDateTo >= $iDateFrom) {
            array_push($aryRange, date('Y-m-d', $iDateFrom)); // first entry
            while ($iDateFrom < $iDateTo) {
                $iDateFrom+=86400; // add 24 hours
                array_push($aryRange, date('Y-m-d', $iDateFrom));
            }
        }
        return $aryRange;
    }

    /* @return array
      Memsisahkan dari satu array menjadi array per karyawan
     * 
     *      */

    public static function dataGrouping($absentSheet) {
        $absentSheetPerKaryawan = array();

        if (is_array($absentSheet)) {
            foreach ($absentSheet as $sheet) {

                $employeeId = intval($sheet["employee_id"]);

                if (!key_exists($employeeId, $absentSheetPerKaryawan)) {
                    $absentSheetPerKaryawan[$employeeId] = array();
                }

                $absentSheetPerKaryawan[$employeeId][] = $sheet;
            }
        }





        return $absentSheetPerKaryawan;
    }

    public function getPesanError() {
        return $this->pesanError;
    }

    public function setAbsentSheet($absentSheet) {
        $this->absentSheet = $absentSheet;
    }

    public function setIsSetengahHari($isSetengahHari) {
        $this->isSetengahHari = $isSetengahHari;
    }

    public function setDurasi($durasi) {
        $this->durasi = $durasi;
        $this->isHitungDurasi = FALSE;
    }

    public function setDaftarHakCuti($daftarHakCuti) {
        $this->daftarHakCuti = $daftarHakCuti;
    }

    public function getHasilAbsentSheet() {
        return $this->hasilAbsentSheet;
    }

    public function getHasilHakCuti() {
        return $this->hasilHakCuti;
    }

    public function getDurasi() {
        return $this->durasi;
    }

}
