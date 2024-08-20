<?php

/**
 * Description of Backlog
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Purchaseletter_Backlog extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Kouti_Remora{
    
    private $saldoUMGL;
    private $penerimaan;
    private $proyeksi;
    private $hppTanah;
    private $hppBangunan;
    private $hppTotal;
    private $potensiAR;
    private $potensiReceivable;
    
    
    public function __construct($embedPrefix=NULL) {
        parent::__construct();
         $this->embedPrefix = $embedPrefix==NULL?'backlog_':$embedPrefix;
       
    }
    
     public function setArrayTable($dataArray=NULL) {
       // $x = $dataArray;
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        if(isset ($x['backlog_id'])){
          $this->setId($x['backlog_id']);
        }
        if(isset ($x['saldo_um_gl'])){
          $this->setSaldoUMGL($x['saldo_um_gl']);
        }
        if(isset ($x['penerimaan'])){
          $this->setPenerimaan($x['penerimaan']);
        }
        if(isset ($x['proyeksi'])){
          $this->setProyeksi($x['proyeksi']);
        }
        if(isset ($x['hpp_tanah'])){
          $this->setHppTanah($x['hpp_tanah']);
        }
        if(isset ($x['hpp_bangunan'])){
          $this->setHppBangunan($x['hpp_bangunan']);
        }
        if(isset ($x['hpp_total'])){
          $this->setHppTotal($x['hpp_total']);
        }
        if(isset ($x['potensial_ar'])){
          $this->setPotensiAR($x['potensial_ar']);
        }
        if(isset ($x['potensial_receivable'])){
          $this->setPotensiReceivable($x['potensial_receivable']);
        }
        
        
        unset($x);
        
   
        
    }
    
    public function getArrayTable(){
        $x = array(
            "backlog_id"=>$this->getId(),
            "saldo_um_gl"=>$this->getSaldoUMGL(),
            "penerimaan"=>$this->getPenerimaan(),
            "proyeksi"=>$this->getProyeksi(),
            "hpp_tanah"=>$this->getHppTanah(),
            "hpp_bangunan"=>$this->getHppBangunan(),
            "hpp_total"=>$this->getHppTotal(),
            "potensial_ar"=>$this->getPotensiAR(),
            "potensial_receivable"=>$this->getPotensiReceivable()
        );
      
        
        return $x;
    }
    
    function getSaldoUMGL() {
        return $this->saldoUMGL;
    }

    function getPenerimaan() {
        return $this->penerimaan;
    }

    function getProyeksi() {
        return $this->proyeksi;
    }

    function getHppTanah() {
        return $this->hppTanah;
    }

    function getHppBangunan() {
        return $this->hppBangunan;
    }

    function getHppTotal() {
        return $this->hppTotal;
    }

    function getPotensiAR() {
        return $this->potensiAR;
    }

    function getPotensiReceivable() {
        return $this->potensiReceivable;
    }

    function setSaldoUMGL($saldoUMGL) {
        $this->saldoUMGL = $saldoUMGL;
    }

    function setPenerimaan($penerimaan) {
        $this->penerimaan = $penerimaan;
    }

    function setProyeksi($proyeksi) {
        $this->proyeksi = $proyeksi;
    }

    function setHppTanah($hppTanah) {
        $this->hppTanah = $hppTanah;
    }

    function setHppBangunan($hppBangunan) {
        $this->hppBangunan = $hppBangunan;
    }

    function setHppTotal($hppTotal) {
        $this->hppTotal = $hppTotal;
    }

    function setPotensiAR($potensiAR) {
        $this->potensiAR = $potensiAR;
    }

    function setPotensiReceivable($potensiReceivable) {
        $this->potensiReceivable = $potensiReceivable;
    }    
    
    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }

}
