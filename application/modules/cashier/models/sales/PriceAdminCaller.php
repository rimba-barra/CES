<?php

/**
 * Description of PriceAdmin
 *
 * @author MIS
 */
class Cashier_Models_Sales_PriceAdminCaller extends Cashier_Box_Models_ObjectEmbedData {
    private $price;
    private $paketTambahan;
    private $subsidi;
    private $diskon;
    private $priceDiskon;
    /*penilaian Mutu*/
    private $pMutu;
    private $asuransi;
    
    public function __construct($embedPrefix=NULL) {
        parent::__construct();
        $this->embedPrefix = $embedPrefix==NULL?"priceadmin_":$embedPrefix;
    }

    
    public function getPrice() {
        return (double)$this->price;
    }

    public function setPrice($price) {
        $this->price = (double)$price;
    }

    public function getPaketTambahan() {
        return (double)$this->paketTambahan;
    }

    public function setPaketTambahan($paketTambahan) {
        $this->paketTambahan = (double)$paketTambahan;
    }

    public function getSubsidi() {
        return (double)$this->subsidi;
    }

    public function setSubsidi($subsidi) {
        $this->subsidi = (double)$subsidi;
    }

    public function getDiskon() {
        return (double)$this->diskon;
    }

    public function setDiskon($diskon) {
        $this->diskon = (double)$diskon;
    }

    public function getPriceDiskon() {
        return (double)$this->priceDiskon;
    }

    public function setPriceDiskon($priceDiskon) {
        $this->priceDiskon = (double)$priceDiskon;
    }

    public function getPMutu() {
        return (double)$this->pMutu;
    }

    public function setPMutu($pMutu) {
        $this->pMutu = (double)$pMutu;
    }
    
    function getAsuransi() {
        return $this->asuransi;
    }

    function setAsuransi($asuransi) {
        $this->asuransi = $asuransi;
    }

        

    public function setArrayTable($dataArray=NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['harga_administrasi'])){
          $this->setPrice($x['harga_administrasi']);
        }
        if(isset ($x['harga_paket_tambahan'])){
          $this->setPaketTambahan($x['harga_paket_tambahan']);
        }
        if(isset ($x['harga_admsubsidi'])){
          $this->setSubsidi($x['harga_admsubsidi']);
        }
        if(isset ($x['persen_salesdisc'])){
          $this->setDiskon($x['persen_salesdisc']);
        }
        if(isset ($x['harga_salesdisc'])){
          $this->setPriceDiskon($x['harga_salesdisc']);
        }
        if(isset ($x['harga_pmutu'])){
          $this->setPMutu($x['harga_pmutu']);
        }
        if(isset ($x['biaya_asuransi'])){
          $this->setAsuransi($x['biaya_asuransi']);
        }
        
        unset($x);
    }
    
    public function getArrayTable() {
        $x = array(
            'harga_administrasi'=>$this->getPrice(),
            'harga_paket_tambahan'=>$this->getPaketTambahan(),
            'harga_admsubsidi'=>$this->getSubsidi(),
            'persen_salesdisc'=>$this->getDiskon(),
            'harga_salesdisc'=>$this->getPriceDiskon(),
            'harga_pmutu'=>$this->getPMutu(),
            'biaya_asuransi'=>$this->getAsuransi()
        );
        return $x;
    }

    
}

?>
