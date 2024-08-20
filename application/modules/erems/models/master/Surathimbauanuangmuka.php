<?php


/**
 * Description of Surathimbauanuangmuka
 *
 * @author tommytoban
 */
class Erems_Models_Master_Surathimbauanuangmuka extends Erems_Box_Models_ObjectEmbedData {
    private $cluster_code;
    private $unit_number;
    private $firstpurchase_date;
    private $purchase_date;
    private $purchaseletter_no;
    private $customer_name;
    private $pricetype;
    private $land_size;
    private $building_size;
    private $type_name;
    private $harga_netto;
    private $harga_total_jual;
    private $total_payment;
    private $persen_bayar;
    private $last_payment_date;
    private $sppjb_sign_date;
    private $kpr_acc_date;
    private $ajb_date;
    private $serahterima_date;
    private $progress;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "purchaseletter_";
    }
    
    public function setArrayTable($dataArray=NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;

        if(isset ($x['cluster_code'])){
           $this->setClusterCode($x['cluster_code']); 
        }
        if(isset ($x['unit_number'])){
           $this->setUnitNumber($x['unit_number']); 
        }
        if(isset ($x['firstpurchase_date'])){
           $this->setFirstpurchaseDate($x['firstpurchase_date']); 
        }
        if(isset ($x['purchase_date'])){
           $this->setPurchaseDate($x['purchase_date']); 
        }
        if(isset ($x['purchaseletter_no'])){
           $this->setPurchaseNo($x['purchaseletter_no']); 
        }
        if(isset ($x['customer_name'])){
           $this->setCustomerName($x['customer_name']); 
        }
        if(isset ($x['pricetype'])){
           $this->setPriceType($x['pricetype']); 
        }
        if(isset ($x['land_size'])){
           $this->setLandSize($x['land_size']); 
        }
        if(isset ($x['building_size'])){
           $this->setBuildingSize($x['building_size']); 
        }
        if(isset ($x['type_name'])){
           $this->setTypeName($x['type_name']); 
        }
        if(isset ($x['harga_netto'])){
           $this->setHargaNetto($x['harga_netto']); 
        }
        if(isset ($x['harga_total_jual'])){
           $this->setHargaTotalJual($x['harga_total_jual']); 
        }
        if(isset ($x['total_payment'])){
           $this->setTotalPayment($x['total_payment']); 
        }
        if(isset ($x['persen_bayar'])){
           $this->setPersenBayar($x['persen_bayar']); 
        }
        if(isset ($x['last_payment_date'])){
           $this->setLastPaymentDate($x['last_payment_date']); 
        }
        if(isset ($x['sppjb_sign_date'])){
           $this->setSppjbSignDate($x['sppjb_sign_date']); 
        }
        if(isset ($x['kpr_acc_date'])){
           $this->setKprAccDate($x['kpr_acc_date']); 
        }
        if(isset ($x['ajb_date'])){
           $this->setAjbDate($x['ajb_date']); 
        }
        if(isset ($x['serahterima_date'])){
           $this->setSerahterimaDate($x['serahterima_date']); 
        }
        if(isset ($x['progress'])){
           $this->setProgresss($x['progress']); 
        }
        
        unset($x);
    }
    
    public function getArrayTable(){
        $x = array(
            "cluster_code"=>$this->getClusterCode(),
            "unit_number"=>$this->getUnitNumber(),
            "firstpurchase_date"=>$this->getName(),
            "purchase_date"=>$this->getPurchaseDate(),
            "purchaseletter_no"=>$this->getPurchaseNo(),
            "customer_name"=>$this->getCustomerName(),
            "pricetype"=>$this->getPriceType(),
            "land_size"=>$this->getLandSize(),
            "building_size"=>$this->getBuildingSize(),
            "type_name"=>$this->getTypeName(),
            "harga_netto"=>$this->getHargaNetto(),
            "harga_total_jual"=>$this->getHargaTotalJual(),
            "total_payment"=>$this->getTotalPayment(),
            "persen_bayar"=>$this->getPersenBayar(),
            "last_payment_date"=>$this->getLastPaymentDate(),
            "sppjb_sign_date"=>$this->getSppjbSignDate(),
            "kpr_acc_date"=>$this->getKprAccDate(),
            "ajb_date"=>$this->getAjbDate(),
            "serahterima_date"=>$this->getSerahterimaDate(),
            "progress"=>$this->getProgress()
        );
        
        return $x;
    }
    
    public function getClusterCode() {
        return $this->cluster_code;
    }

    public function setClusterCode($cluster_code) {
        $this->cluster_code = $cluster_code;
    }

    public function getUnitNumber() {
        return $this->unit_number;
    }

    public function setUnitNumber($unit_number) {
        $this->unit_number = $unit_number;
    }

    public function getFirstpurchaseDate() {
        return $this->firstpurchase_date;
    }

    public function setFirstpurchaseDate($firstpurchase_date) {
        $this->firstpurchase_date = $firstpurchase_date;
    }

    public function getPurchaseDate() {
        return $this->purchase_date;
    }

    public function setPurchaseDate($purchase_date) {
        $this->purchase_date = $purchase_date;
    }

    public function getPurchaseNo() {
        return $this->purchaseletter_no;
    }

    public function setPurchaseNo($purchaseletter_no) {
        $this->purchaseletter_no = $purchaseletter_no;
    }

    public function getCustomerName() {
        return $this->customer_name;
    }

    public function setCustomerName($customer_name) {
        $this->customer_name = $customer_name;
    }

    public function getPriceType() {
        return $this->pricetype;
    }

    public function setPriceType($pricetype) {
        $this->pricetype = $pricetype;
    }

    public function getLandSize() {
        return $this->land_size;
    }

    public function setLandSize($land_size) {
        $this->land_size = $land_size;
    }

    public function getBuildingSize() {
        return $this->building_size;
    }

    public function setBuildingSize($building_size) {
        $this->building_size = $building_size;
    }

    public function getTypeName() {
        return $this->type_name;
    }

    public function setTypeName($type_name) {
        $this->type_name = $type_name;
    }

    public function getHargaNetto() {
        return $this->harga_netto;
    }

    public function setHargaNetto($harga_netto) {
        $this->harga_netto = $harga_netto;
    }

    public function getHargaTotalJual() {
        return $this->harga_total_jual;
    }

    public function setHargaTotalJual($harga_total_jual) {
        $this->harga_total_jual = $harga_total_jual;
    }

    public function getTotalPayment() {
        return $this->total_payment;
    }

    public function setTotalPayment($total_payment) {
        $this->total_payment = $total_payment;
    }

    public function getPersenBayar() {
        return $this->persen_bayar;
    }

    public function setPersenBayar($persen_bayar) {
        $this->persen_bayar = $persen_bayar;
    }

    public function getLastPaymentDate() {
        return $this->last_payment_date;
    }

    public function setLastPaymentDate($last_payment_date) {
        $this->last_payment_date = $last_payment_date;
    }

    public function getSppjbSignDate() {
        return $this->sppjb_sign_date;
    }

    public function setSppjbSignDate($sppjb_sign_date) {
        $this->sppjb_sign_date = $sppjb_sign_date;
    }

    public function getKprAccDate() {
        return $this->kpr_acc_date;
    }

    public function setKprAccDate($kpr_acc_date) {
        $this->kpr_acc_date = $kpr_acc_date;
    }

    public function getAjbDate() {
        return $this->ajb_date;
    }

    public function setAjbDate($ajb_date) {
        $this->ajb_date = $ajb_date;
    }

    public function getSerahterimaDate() {
        return $this->serahterima_date;
    }

    public function setSerahterimaDate($serahterima_date) {
        $this->serahterima_date = $serahterima_date;
    }

    public function getProgress() {
        return $this->progress;
    }

    public function setProgresss($progress) {
        $this->progress = $progress;
    }
}

?>
