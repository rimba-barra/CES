<?php

/**
 * Description of PriceValidator
 *
 * @author MIS
 */
class Erems_Models_Purchaseletter_PriceValidator extends Erems_Box_Models_App_Validator {
    private $unit;
    private $price;
    
    public function __construct() {
        parent::__construct();
        $this->unit = new Erems_Models_Unit_UnitTran();
        $this->price = new Erems_Models_Sales_Price();
    }
    
    public function getUnit() {
        return $this->unit;
    }

    public function setUnit(Erems_Models_Unit_UnitTran $unit) {
        $this->unit = $unit;
    }

    public function getPrice() {
        return $this->price;
    }

    public function setPrice(Erems_Models_Sales_Price $price) {
        $this->price = $price;
    }

    public function run(){
        $unit = $this->unit;
        $price = $this->price;
        $landSize = $unit->getPropertyInfo()->getLandSize();
        $hargaKelebihan = ($unit->getPropertyInfo()->getKelebihanTanah()*$price->getKelebihan());
        $hargaTanah = $landSize*$price->getPermeter();
    }
}

?>
