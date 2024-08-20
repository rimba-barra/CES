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
    public $isEditNilaiPPNTanah;
    public $isEditNilaiPPNBangunan;

    public function __construct() {
        $this->unit = new Erems_Models_Unit_UnitTran();
        $this->price = new Erems_Models_Sales_Price();
        $this->purchaseLetter = new Erems_Models_Purchaseletter_PurchaseLetterTransaction();
        $this->isEditNilaiPPNBangunan = FALSE;
        $this->isEditNilaiPPNTanah = FALSE;
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
        if ($purchaseLetter->getPrice() instanceof Erems_Models_Sales_Price) {
            $this->price = $purchaseLetter->getPrice();
        }
    }

    private function getHargaTanah() {
        $this->hargaTanah = $this->unit->getPropertyInfo()->getLandSize() * $this->price->getPermeter();
        return $this->hargaTanah;
    }

    private function getHargaKelebihan() {
        $this->hargaKelebihan = $this->unit->getPropertyInfo()->getKelebihanTanah() * $this->price->getKelebihan();
        return $this->hargaKelebihan;
    }

    private function getHargaDasar() {
        $this->hargaDasar = $this->getHargaTanah() + $this->getHargaKelebihan() + $this->price->getBangunan();
        return $this->hargaDasar;
    }

    private function getHargaNetto() {
        $netto = 0.0;
        $propertyInfo = $this->unit->getPropertyInfo();
        $hargaDasar = (double) $this->getHargaDasar();
        // $this->diskonDasar = $diskonDasar = (double)$this->getPercentAmount($this->price->getDiscountDasar(),$hargaDasar);  
        // $this->diskonTanah = $diskonTanah = (double)$this->getPercentAmount($this->price->getDiscountTanah(),($this->getHargaTanah()+$this->getHargaKelebihan()));
        // $this->diskonBangunan = $diskonBangunan = (double) $this->getPercentAmount($this->price->getDiscountBangunan(),  $this->price->getBangunan());
       

        if ($this->price instanceof Erems_Models_Sales_Price) {
            $diskonDasar = $this->diskonDasar = $this->price->getAfterDiscountDasar();
            $diskonTanah = $this->diskonTanah = $this->price->getAfterDiscountTanah();
            $diskonBangunan = $this->diskonBangunan = $this->price->getAfterDiscountBangunan();
        }
      

        $netto = $hargaDasar - ($diskonDasar + $diskonTanah + $diskonBangunan);
        
     
        $this->hargaNetto = $netto;
        return $this->hargaNetto;
    }

    private function getHargaJual() {
        $jual = 0.0;
        $priceAdmin = $this->purchaseLetter->getPriceAdmin();
        $hargaNetto = (double) $this->getHargaNetto();
        /// formula CEDAR marked on 20161208
        /* [1]
        $pengurangTanah = doubleval($this->price->getDiscountDasar()) > 0 ? $this->diskonDasar / 2 : $this->diskonTanah;
        $pengurangBangunan = doubleval($this->price->getDiscountDasar()) > 0 ? $this->diskonDasar / 2 : $this->diskonBangunan;
        $ppnTanah = (double) $this->getPercentAmountForTax($this->price->getPpnTanah(), ($this->getHargaTanah() + $this->getHargaKelebihan()), $pengurangTanah);
        $ppnBangunan = (double) $this->getPercentAmountForTax($this->price->getPpnBangunan(), $this->price->getBangunan(), $pengurangBangunan);
       */
        /// /formula CEDAR
        
        
        /// [2] formula CITRA INDAH add on 20161208
       // $ppnTanah = (double) $this->getPercentAmountForTax($this->price->getPpnTanah(), ($this->getHargaTanah() + $this->getHargaKelebihan()),$this->diskonTanah);
        //$ppnBangunan = (double) $this->getPercentAmountForTax($this->price->getPpnBangunan(), $this->price->getBangunan(),$this->diskonBangunan);
        /// /formula
        // addon 20171010
        $ppnTanah = 0.0;
        $ppnBangunan = 0.0;
        if($this->isEditNilaiPPNTanah===FALSE){
            $ppnTanah = (double) $this->getPercentAmountForTax($this->price->getPpnTanah(), ($this->getHargaTanah() + $this->getHargaKelebihan()),$this->diskonTanah);
        
        }else{
           
            $ppnTanah = $this->price->getAfterPpnTanah();
        }
        
        if($this->isEditNilaiPPNBangunan===FALSE){
            $ppnBangunan = (double) $this->getPercentAmountForTax($this->price->getPpnBangunan(), $this->price->getBangunan(),$this->diskonBangunan);
        
        }else{
           $ppnBangunan =  $this->price->getAfterPpnBangunan();
        }
        
        $ppnPpnbm = (double) $this->getPercentAmount($this->price->getPpnbm(), $hargaNetto);
        $ppnPph22 = (double) $this->getPercentAmount($this->price->getPph22(), $hargaNetto);
        
        
        // added 20181105
        $ppnPpnbm = floor($ppnPpnbm);
        $ppnPph22 = floor($ppnPph22);
        $ppnBangunan = floor($ppnBangunan);
        $ppnTanah = floor($ppnTanah);
  
        
        // marked 21 Juni 2016
        //$jual = $hargaNetto+$ppnTanah+$ppnBangunan+$ppnPpnbm;
        // added 21 juni 2016
        $jual = $hargaNetto + $ppnTanah + $ppnBangunan + $ppnPpnbm + $ppnPph22;

        $jual += $this->price->getBbnSertifikat();
        $jual += $this->price->getBajb();
        $jual += $this->price->getBphtb();
        if ($priceAdmin instanceof Erems_Models_Sales_PriceAdmin) {
            $jual += $priceAdmin->getPMutu();
            //   $jual += $priceAdmin->getPrice();
            //  $jual += $priceAdmin->getSubsidi();
            // $jual += $priceAdmin->getPaketTambahan();
        }
        $this->hargaJual = $jual;

        return $this->hargaJual;
    }

    private function getTotal() {
        $total = 0.0;
        $hargaJual = (double) $this->getHargaJual();
        
       
        
        $adminDiscount = $this->getPercentAmount($this->purchaseLetter->getPriceAdmin()->getDiskon(), $hargaJual);
        
        //addon 20181105
        $adminDiscount = floor($adminDiscount);
        
       // $total = $hargaJual - ($adminDiscount + $this->purchaseLetter->getPriceAdmin()->getPrice() + $this->purchaseLetter->getPriceAdmin()->getSubsidi() + $this->purchaseLetter->getPriceAdmin()->getPaketTambahan());
        
        $total = ($hargaJual + $this->purchaseLetter->getPriceAdmin()->getPrice() + $this->purchaseLetter->getPriceAdmin()->getSubsidi() + $this->purchaseLetter->getPriceAdmin()->getPaketTambahan() + $this->purchaseLetter->getPriceAdmin()->getAsuransi())  - $adminDiscount;
        
     
        
        $totalBulat = floor($total);
        $desimalVal = $total - $totalBulat;
        if($desimalVal > 0.50){
            $total = ceil($total);
        }else{
            $total = floor($total);
        }
        
        $this->purchaseLetter->getPriceAdmin()->setPriceDiskon($adminDiscount);
        $this->hargaTotal = $total;
        return $this->hargaTotal;
    }

    public function process() {
        $total = $this->getTotal();
       
        
        $this->purchaseLetter->setTotal($this->hargaTotal);
        $this->fillDataPrice($this->purchaseLetter->getPrice());
    }

    private function fillDataPrice(Erems_Models_Sales_Price $price) {
        $price->setJualDasar($this->hargaDasar);
        $price->setNetto($this->hargaNetto);
        $price->setJual($this->hargaJual);
    }

    private function getPercentAmount($percent, $basicAmount) {
        return (doubleval($percent) / 100) * doubleval($basicAmount);
    }

    private function getPercentAmountForTax($percent, $basicAmount, $totalDiscount) {
        return (doubleval($percent) / 100) * doubleval($basicAmount - $totalDiscount);
    }

}

?>
