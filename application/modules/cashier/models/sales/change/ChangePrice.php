<?php

/**
 * Description of ChangePrice
 *
 * @author MIS
 */
class Cashier_Models_Sales_Change_ChangePrice extends Cashier_Models_Sales_Change implements Cashier_Box_Kouti_Remora {
    private $newPrice;
    private $price;
    private $priceAdmin;
    private $unitType;
    private $propertyInfo;
    private $priceType;
    private $totalJual;
    private $totalJualNew;
    private $bankKPR;
    private $notesNew;
    
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "changeprice_";
        $this->newPrice = new Cashier_Models_Sales_Price("pricenew_");
        $this->price = new Cashier_Models_Sales_Price();
        
    }
    
    public function getNewPrice() {
        if(!$this->newPrice){
            $this->newPrice = new Cashier_Models_Sales_Price("pricenew_"); 
        }
        return $this->newPrice;
    }

    public function setNewPrice(Cashier_Models_Sales_Price $newPrice) {
        $this->newPrice = $newPrice;
    }
    
    
    public function getPrice() {
        if(!$this->price){
            $this->price = new Cashier_Models_Sales_Price(); 
        }
        return $this->price;
    }

    public function setPrice(Cashier_Models_Sales_Price $price) {
        $this->price = $price;
    }
    
   
    
    public function getUnitType() {
        if(!$this->unitType){
            $this->unitType = new Cashier_Models_Master_Type();
        }
        return $this->unitType;
    }

    public function setUnitType(Cashier_Models_Master_Type $unitType) {
        $this->unitType = $unitType;
    }
    
    public function getPropertyInfo() {
        if(!$this->propertyInfo){
            $this->propertyInfo = new Cashier_Models_Unit_PropertyInfo();
        }
        return $this->propertyInfo;
    }

    public function setPropertyInfo(Cashier_Models_Unit_PropertyInfo $propertyInfo) {
        $this->propertyInfo = $propertyInfo;
    }
    
    public function getPriceAdmin() {
        if(!$this->priceAdmin){
            $this->priceAdmin = new Cashier_Models_Sales_PriceAdmin();
        }
        return $this->priceAdmin;
    }

    public function setPriceAdmin(Cashier_Models_Sales_PriceAdmin $priceAdmin) {
        $this->priceAdmin = $priceAdmin;
    }
    
    public function getPriceType() {
        if(!$this->priceType){
            $this->priceType = new Cashier_Models_Sales_PriceType();
        }
        return $this->priceType;
    }

    public function setPriceType(Cashier_Models_Sales_PriceType $priceType) {
        $this->priceType = $priceType;
    }
    
    
    public function getTotalJual() {
        return $this->totalJual;
    }

    public function setTotalJual($totalJual) {
        $this->totalJual = $totalJual;
    }
    
    public function getTotalJualNew() {
        return $this->totalJualNew;
    }

    public function setTotalJualNew($totalJualNew) {
        $this->totalJualNew = $totalJualNew;
    }
    
    public function getBankKPR() {
        if(!$this->bankKPR){
            $this->bankKPR = new Cashier_Models_Master_Bank();
        }
        return $this->bankKPR;
    }

    public function setBankKPR(Cashier_Models_Master_Bank $bankKPR) {
        $this->bankKPR = $bankKPR;
    }

    
    function getNotesNew() {
        return $this->notesNew;
    }

    function setNotesNew($notesNew) {
        $this->notesNew = $notesNew;
    }

            
    
    
    
    
            
    
    
    public function setArrayTable($dataArray=NULL) {
        parent::setArrayTable($dataArray);
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['changeprice_id'])){
          $this->setId($x['changeprice_id']);
        }
        if(isset ($x['type_id_new'])){
          $this->getUnitType()->setId($x['type_id_new']);
        }
        if(isset ($x['landsize_new'])){
          $this->getPropertyInfo()->setLandSize($x['landsize_new']);
        }
        if(isset ($x['kelebihan_new'])){
          $this->getPropertyInfo()->setKelebihanTanah($x['kelebihan_new']);
        }
        if(isset ($x['buildingsize_new'])){
          $this->getPropertyInfo()->setBuildingSize($x['buildingsize_new']);
        }
        if(isset ($x['pricetype_id_new'])){
          $this->getPriceType()->setId($x['pricetype_id_new']);
        }
        if(isset ($x['purchaseletter_id'])){
          $this->getPurchaseletter()->setId($x['purchaseletter_id']);
        }
        if(isset ($x['changeprice_date'])){
          $this->setDate($x['changeprice_date']);
        }
        if(isset ($x['harga_total_jual'])){
          $this->setTotalJual($x['harga_total_jual']);
        }
        if(isset ($x['harga_total_jual_new'])){
          $this->setTotalJualNew($x['harga_total_jual_new']);
        }
         if(isset ($x['change_note'])){
          $this->setNote($x['change_note']);
        }
        
        if(isset ($x['notes_new'])){
          $this->setNotesNew($x['notes_new']);
        }
     
    }
    
    public function getArrayTable() {
        //$x = parent::getArrayTable();
        $x = array(
            "changeprice_id"=>$this->getId(),
            "type_id_new"=>$this->getUnitType()->getId(),
            "landsize_new"=>$this->getPropertyInfo()->getLandSize(),
            "kelebihan_new"=>$this->getPropertyInfo()->getKelebihanTanah(),
            "buildingsize_new"=>$this->getPropertyInfo()->getBuildingSize(),
            "pricetype_id_new"=>$this->getPriceType()->getId(),
            "purchaseletter_id"=>$this->getPurchaseletter()->getId(),
            "changeprice_date"=>$this->getDate(),
            "harga_total_jual"=>$this->getTotalJual(),
            "harga_total_jual_new"=>$this->getTotalJualNew(),
            "change_note"=>$this->getNote(),
            "notes_new"=>$this->getNotesNew()
        );
        return $x;
        
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getNewPrice(),$this->getPrice(),$this->getBankKPR());
    }
    
    protected function getDatefields() {
        return array("changeprice_date");
    }

}

?>
