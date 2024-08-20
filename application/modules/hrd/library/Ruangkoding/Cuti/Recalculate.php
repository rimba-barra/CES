<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Recalculate
 *
 * @author TOMMY-MIS
 */
class Ruangkoding_Cuti_Recalculate {
    
    public $sisaCutiAkhir = 0; // sisa cuti pada tahun terakhir di daftar hak cuti
    public $tanggalMasuk;
    private $errorMsg = "";
    private $transaksi; // sheet transaksi
    private $hakCuti; // sheet hak cuti
    
    public function sayHello(){
        return "Hello";
    }
    
    public function proses(){
      
        /*
        $hakCuti = array(
            array("tahun"=>2015,"sisa"=>0),
            array("tahun"=>2016,"sisa"=>10),
        );
         $this->hakCuti = $hakCuti;
        */
        
        
        // hitung => hak cuti dikurangi jumlah cuti
        // hitung2 => pengnolan dari atas
        /*
        $transaksiCuti = array(
            array("tahun"=>2010,"jumlah_cuti"=>2,"hak_cuti"=>NULL,"hitung"=>NULL,"hitung2"=>NULL),
            array("tahun"=>2011,"jumlah_cuti"=>13,"hak_cuti"=>NULL,"hitung"=>NULL,"hitung2"=>NULL),
            array("tahun"=>2012,"jumlah_cuti"=>5.5,"hak_cuti"=>NULL,"hitung"=>NULL,"hitung2"=>NULL),
            array("tahun"=>2013,"jumlah_cuti"=>9,"hak_cuti"=>NULL,"hitung"=>NULL,"hitung2"=>NULL),
            array("tahun"=>2014,"jumlah_cuti"=>6,"hak_cuti"=>NULL,"hitung"=>NULL,"hitung2"=>NULL),
            array("tahun"=>2015,"jumlah_cuti"=>15,"hak_cuti"=>NULL,"hitung"=>NULL,"hitung2"=>NULL),
            array("tahun"=>2016,"jumlah_cuti"=>5,"hak_cuti"=>NULL,"hitung"=>NULL,"hitung2"=>NULL)
        );
          $this->transaksi =  $transaksiCuti;
         
         */
        
       
        
       
       
        
        
         // sort tahun terkecil di atas
        usort($this->transaksi, function($a, $b) {
            return $a['tahun'] - $b['tahun'];
        });
        
        
        
        $this->buatHakCuti();
        
       
        
       
        
        
        
        $this->hitung();
        
     
        
      
        
        $this->hitung2();
        
       // sort tahun terbesar di atas
        usort($this->transaksi, function($a, $b) {
            return $b['tahun'] - $a['tahun'];
        });
        // sort tahun terbesar di atas
        usort($this->hakCuti, function($a, $b) {
            return $b['tahun'] - $a['tahun'];
        });
        
        $this->taruhhakcuti();
        
     //   var_dump($this->hakCuti);
        
        /* contoh final state
        $transaksiCuti = array(
            array("tahun"=>2012,"jumlah_cuti"=>2,"hak_cuti"=>0,"hitung"=>-2,"hitung2"=>0),
            array("tahun"=>2013,"jumlah_cuti"=>6,"hak_cuti"=>3,"hitung"=>-3,"hitung2"=>-5),
            array("tahun"=>2014,"jumlah_cuti"=>5,"hak_cuti"=>12,"hitung"=>7,"hitung2"=>2),
            array("tahun"=>2015,"jumlah_cuti"=>12.5,"hak_cuti"=>12,"hitung"=>-0.5,"hitung2"=>1.5),
            array("tahun"=>2016,"jumlah_cuti"=>4,"hak_cuti"=>12,"hitung"=>8,"hitung2"=>9.5)
        );
         
         */
        
        
    }
    
    private function buatHakCuti(){
        if(!$this->tanggalMasuk){
            $this->errorMsg .= "Tanggal masuk tidak valid.";
           // return FALSE;
        }
        
        
       
        
        /// mencari hak cuti tahun kedua
        $bulan = date("n",strtotime($this->tanggalMasuk));
      //  var_dump($bulan);
        $tgl = date("d",strtotime($this->tanggalMasuk));
        $jumlahHakCutiTahunKedua = 12-$bulan;
        // kalau masuk di bawah tgl 15 maka dapat cuti 1 bulan
        $jumlahHakCutiTahunKedua = $tgl > 15? $jumlahHakCutiTahunKedua: $jumlahHakCutiTahunKedua+1;
        
      //  var_dump($jumlahHakCutiTahunKedua);
        
        for($i=0;$i<count($this->transaksi);$i++){
            if($i==0){
                $this->transaksi[$i]["hak_cuti"] = 0;
            }else if($i==1){
                $this->transaksi[$i]["hak_cuti"] = $jumlahHakCutiTahunKedua;
            }else{
                 $this->transaksi[$i]["hak_cuti"] = 12;
            }
        }
        
       
        
      //  return TRUE;
    }
    
    public function getErrorMsg(){
        return $this->errorMsg;
    }
    
    /*hak cuti dikurangi jumlah cuti*/
    private function hitung(){
        for($i=0;$i<count($this->transaksi);$i++){
            $this->transaksi[$i]["hitung"] = $this->transaksi[$i]["hak_cuti"]-$this->transaksi[$i]["jumlah_cuti"];
        }
    }
    
    /* pengurangan hak cuti dari tahun terkecil*/
    private function hitung2(){
        for($i=0;$i<count($this->transaksi);$i++){
            if($i==0){
                $this->transaksi[$i]["hitung2"] = 0;
            }else if($i==1){
                $this->transaksi[$i]["hitung2"] = $this->transaksi[$i]["hitung"] + $this->transaksi[$i-1]["hitung"];
            }else{
                $this->transaksi[$i]["hitung2"] = $this->transaksi[$i]["hitung"] + $this->transaksi[$i-1]["hitung2"];
            }
           
        }
    }
    
    private function taruhhakcuti(){
        $saldo = 0;
        for($i=0;$i<count($this->transaksi);$i++){
            for($j=0;$j<count($this->hakCuti);$j++){
                if($this->transaksi[$i]["tahun"]==$this->hakCuti[$j]["tahun"]){
                    if($i==0){
                        $saldo = $this->transaksi[$i]["hitung2"]- $this->hakCuti[$j]["sisa"];
                     
                    }
                    if($i==1){
                        $this->hakCuti[$j]["sisa"] = $saldo;
                    }
                    
                }
            }
           
        }
    }
    
    public function getHakCuti(){
        return $this->hakCuti;
    }
    
    public function setTransaksiCuti($daftarCuti){
        $this->transaksi = $daftarCuti;
    }
    
    public function setHakCuti($hakCuti){
        $this->hakCuti = $hakCuti;
    }
}
