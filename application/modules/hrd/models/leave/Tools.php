<?php

class Hrd_Models_Leave_Tools {
    
    public static function jatahCuti($hireDate,$tahunGenerate,$jumlahJatahCuti = 12){
        $jatahCuti = 0;
        $date = DateTime::createFromFormat("Y-m-d", $hireDate);
        $tahun = $date->format("Y");
        $tanggal = $date->format("d");
        $bulan = $date->format("m");
        if($tahunGenerate-$tahun==1){
            $jatahCuti = 12 - $bulan;
            if($tanggal < 15){ // jika tanggal masuk di bawah 15 maka dihitung
                $jatahCuti = $jatahCuti+1;
            }
        }else if($tahunGenerate-$tahun >1){
            $jatahCuti = 12;
        }
        return $jatahCuti;
    }
        
}

