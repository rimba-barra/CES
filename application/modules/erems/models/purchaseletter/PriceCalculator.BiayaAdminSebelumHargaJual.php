<?php

/**
 * Description of PriceCalculator
 *
 * @author MIS
 */
class Erems_Models_Purchaseletter_PriceCalculator {
    private $unit;
    private $price;
    private $purchaseLetter;
    private $hargaTanah;
    private $hargaKelebihan;
    private $hargaDasar;
    private $hargaNetto;
    private $hargaJual;
    private $hargaTotal;
    private $diskonTanah;
    private $diskonBangunan;
    private $diskonDasar;
    
    public function __construct() {
        $this->unit = new Erems_Models_Unit_UnitTran();
        $this->price = new Erems_Models_Sales_Price();
        $this->purchaseLetter = new Erems_Models_Purchaseletter_PurchaseLetterTransaction();
    }
    
    public function getUnit() {
        return $this->unit;
    }

    public function setUnit(Erems_Models_Unit_UnitTran $unit) {
        $this->unit = $unit;
    }

    protected function getPrice() {
        return $this->price;
    }

    protected function setPrice(Erems_Models_Sales_Price $price) {
        $this->price = $price;
    }
    
    public function getPurchaseLetter() {
        return $this->purchaseLetter;
    }

    public function setPurchaseLetter(Erems_Models_Purchaseletter_PurchaseLetterTransaction $purchaseLetter) {
        $this->purchaseLetter = $purchaseLetter;
        if($purchaseLetter->getPrice() instanceof Erems_Models_Sales_Price){
            $this->price = $purchaseLetter->getPrice();
        }
    }

        
    private function getHargaTanah(){
        $this->hargaTanah = $this->unit->getPropertyInfo()->getLandSize()*$this->price->getPermeter();
        return $this->hargaTanah;
    }
    private function getHargaKelebihan(){
        $this->hargaKelebihan = $this->unit->getPropertyInfo()->getKelebihanTanah()*$this->price->getKelebihan();
        return $this->hargaKelebihan;
    }
    
    private function getHargaDasar(){
        $this->hargaDasar = $this->getHargaTanah()+$this->getHargaKelebihan()+$this->price->getBangunan();
        return $this->hargaDasar;
    }
    
    private function getHargaNetto(){
        $netto = 0.0;
        $propertyInfo = $this->unit->getPropertyInfo();
        $hargaDasar = (double)$this->getHargaDasar();
        $this->diskonDasar = $diskonDasar = (double)$this->getPercentAmount($this->price->getDiscountDasar(),$hargaDasar);  
        $this->diskonTanah = $diskonTanah = (double)$this->getPercentAmount($this->price->getDiscountTanah(),($this->getHargaTanah()+$this->getHargaKelebihan()));
        $this->diskonBangunan = $diskonBangunan = (double) $this->getPercentAmount($this->price->getDiscountBangunan(),  $this->price->getBangunan());
        
        $netto = $hargaDasar - ($diskonDasar+$diskonTanah+$diskonBangunan);
        $this->hargaNetto = $netto;
        return $this->hargaNetto;
    }
    
    private function getHargaJual(){
        $jual = 0.0;
        $priceAdmin = $this->purchaseLetter->getPriceAdmin();
        $hargaNetto = (double)$this->getHargaNetto();
        $pengurangTanah = doubleval($this->price->getDiscountDasar()) > 0? $this->diskonDasar/2 : $this->diskonTanah;
        $pengurangBangunan = doubleval($this->price->getDiscountDasar()) > 0? $this->diskonDasar/2 : $this->diskonBangunan;
        $ppnTanah = (double) $this->getPercentAmountForTax($this->price->getPpnTanah(),($this->getHargaTanah()+$this->getHargaKelebihan()),$pengurangTanah);
        $ppnBangunan = (double) $this->getPercentAmountForTax($this->price->getPpnBangunan(),$this->price->getBangunan(),$pengurangBangunan);
        $ppnPpnbm = (double) $this->getPercentAmount($this->price->getPpnbm(),$hargaNetto);
        $ppnPph22 = (double) $this->getPercentAmount($this->price->getPph22(),$hargaNetto);
        
        
        // marked 21 Juni 2016
        //$jual = $hargaNetto+$ppnTanah+$ppnBangunan+$ppnPpnbm;
        // added 21 juni 2016
        $jual = $hargaNetto+$ppnTanah+$ppnBangunan+$ppnPpnbm+$ppnPph22;
       
        $jual += $this->price->getBbnSertifikat();
        $jual += $this->price->getBajb();
        $jual += $this->price->getBphtb();
        if($priceAdmin instanceof Erems_Models_Sales_PriceAdmin){
            $jual += $priceAdmin->getPrice();
            $jual += $priceAdmin->getSubsidi();
            $jual += $priceAdmin->getPMutu();
            $jual += $priceAdmin->getPaketTambahan();
        }
        $this->hargaJual = $jual;
        
        return $this->hargaJual;
    }
    
    private function getTotal(){
        $total = 0.0;
        $hargaJual = (double)$this->getHargaJual();
        $adminDiscount = $this->getPercentAmount($this->purchaseLetter->getPriceAdmin()->getDiskon(),$hargaJual);
        $total = $hargaJual - $adminDiscount;
        $this->purchaseLetter->getPriceAdmin()->setPriceDiskon($adminDiscount);
        $this->hargaTotal = $total;
        return $this->hargaTotal;
    }
    
    
    public function process(){
        $total = $this->getTotal();
        $this->purchaseLetter->setTotal($this->hargaTotal);
        $this->fillDataPrice($this->purchaseLetter->getPrice());
        
    }
    
    private function fillDataPrice(Erems_Models_Sales_Price $price){
        $price->setJualDasar($this->hargaDasar);
        $price->setNetto($this->hargaNetto);
        $price->setJual($this->hargaJual);
        
    }
    
   


    private function getPercentAmount($percent,$basicAmount){
        return (doubleval($percent)/100)*doubleval($basicAmount);
    }
    
    
    private function getPercentAmountForTax($percent,$basicAmount,$totalDiscount){
        return (doubleval($percent)/100)*doubleval($basicAmount-$totalDiscount);
    }
    


}

?>
