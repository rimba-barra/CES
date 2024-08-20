<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Angsuran
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Pinjaman_Angsuran extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,  Box_Arried {
    private $pinjaman;
    private $date;
    private $ke;
    private $nilai;
    private $lunas;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "angsuran_";
    }
    
    
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['angsuran_id'])){
           $this->setId($x['angsuran_id']); 
        }
        if(isset ($x['pinjaman_pinjaman_id'])){
           $this->getPinjaman()->setId($x['pinjaman_pinjaman_id']); 
        }
        
        if(isset ($x['date'])){
           $this->setDate($x['date']); 
        }
        if(isset ($x['ke'])){
           $this->setKe($x['ke']); 
        }
        if(isset ($x['nilai'])){
           $this->setNilai($x['nilai']); 
        }
        if(isset ($x['lunas'])){
           $this->setLunas($x['lunas']); 
        }
        
        
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'angsuran_id'=>$this->getId(),
            'pinjaman_pinjaman_id'=>$this->getPinjaman()->getId(),
            'date'=>$this->getDate(),
            'ke'=>$this->getKe(),
            'nilai'=>$this->getNilai(),
            'lunas'=>$this->getLunas()
           
        );
      
        return $x;
    }
   
    public function getPinjaman() {
        if(!$this->pinjaman){
            $this->pinjaman = new Hrd_Models_Pinjaman_Transaksi();
        }
        return $this->pinjaman;
    }

    public function getDate() {
        return $this->date;
    }

    public function getKe() {
        return $this->ke;
    }

    public function getNilai() {
        return $this->nilai;
    }

    public function getLunas() {
        return $this->lunas;
    }

    public function setPinjaman(Hrd_Models_Pinjaman_Transaksi $pinjaman) {
        $this->pinjaman = $pinjaman;
    }

    public function setDate($date) {
        $this->date = $date;
    }

    public function setKe($ke) {
        $this->ke = $ke;
    }

    public function setNilai($nilai) {
        $this->nilai = $nilai;
    }

    public function setLunas($lunas) {
        $this->lunas = $lunas;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function getArray() {
        return $this->getArrayTable();
    }

    public function grouped() {
        return array($this->getPinjaman());
    }
    
    public function getDatefields() {
        return array("date");
    }

}
