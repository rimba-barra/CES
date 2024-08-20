<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Transaksi
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Cac_Transaksi {

    private $kelipatan = 100000000;
    private $nomorAwal = 100000;
    private $hasilHeader;
    private $hasilDetail;
    private $hasilNomor;
    public $dataPenjualan;

    public function __construct() {
        
    }

    public function proses() {
        //// CONTOH FORMAT DATA PENJUALAN 
        /*
        $dataPenjualan = array(
            array("cac" => 1, "netto" => 200000, "harga_sales" => 10000, "total_jual" => 10000000, "purchase_id" => 1),
            array("cac" => 2, "netto" => 200000, "harga_sales" => 10000, "total_jual" => 24000000, "purchase_id" => 3),
            array("cac" => 1, "netto" => 200000, "harga_sales" => 10000, "total_jual" => 56000000, "purchase_id" => 2)
        );
         
         */
        $dataPenjualan = $this->dataPenjualan;
        $hasilHeader = array();
        $hasilDetail = array();
        $hasilNomor = array();

        /// bikin point
        foreach ($dataPenjualan as $row) {
            $point = floor($row["total_jual"] / $this->kelipatan);

            /// data detail
            $hasilDetail[] = array("cac" => $row["cac"], "purchase_id" => $row["purchase_id"], "point" => $point);

            /// data header
            if (!key_exists($row["cac"], $hasilHeader)) {
                $hasilHeader[$row["cac"]] = array("point" => $point, "netto" => $row["netto"],
                    "harga_sales" => $row["harga_sales"],
                    "total_jual" => $row["total_jual"]);
            } else {
                $hasilHeader[$row["cac"]]["point"] = $hasilHeader[$row["cac"]]["point"] + $point;
                $hasilHeader[$row["cac"]]["netto"] = $hasilHeader[$row["cac"]]["netto"] + $row["netto"];
                $hasilHeader[$row["cac"]]["harga_sales"] = $hasilHeader[$row["cac"]]["harga_sales"] + $row["harga_sales"];
                $hasilHeader[$row["cac"]]["total_jual"] = $hasilHeader[$row["cac"]]["total_jual"] + $row["total_jual"];
            }
        }

        $nomor = intval($this->nomorAwal);

        // bikin nomor
        foreach ($hasilDetail as $row) {
            for ($i = 0; $i < $row["point"]; $i++) {
                $hasilNomor[] = array(
                    "cac" => $row["cac"],
                    "purchase_id"=>$row["purchase_id"],
                    "nomor" => str_pad($nomor, 7, "0", STR_PAD_LEFT)
                );
                $nomor++;
            }
        }
        
        $this->hasilHeader = $hasilHeader;
        $this->hasilDetail = $hasilDetail;
        $this->hasilNomor = $hasilNomor;
        
        
        
    }
    
    public function getHasilHeader(){
        return $this->hasilHeader;
    }

    public function getHasilDetail(){
        return $this->hasilDetail;
    }
    
    public function getHasilNomor(){
        return $this->hasilNomor;
    }
    
    public function setNomorAwal($nomorAwal){
        $this->nomorAwal = $nomorAwal;
    }
    
    public function setKelipatan($kelipatan){
        $this->kelipatan = $kelipatan;
    }
}
