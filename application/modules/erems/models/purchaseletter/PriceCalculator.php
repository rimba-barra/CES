<?php

/**
 * Description of PriceCalculator
 *
 * @author MIS
 */
class Erems_Models_Purchaseletter_PriceCalculator {

    private $tools;
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

    public $isEditTanahpermeter;
    public $isEditTotaltanah;
    public $isEditKelebihantanahpermeter;
    public $isEditTotalkelebihantanah;
    public $isEditBangunanpermeter;
    public $isEditTotalbangunan;
    public $isEditPersenPPNTanah;
    public $isEditAmountPPNTanah;
    public $isEditPersenPPNBangunan;
    public $isEditAmountPPNBangunan;
    public $isEditPersenPPNBM;
    public $isEditAmountPPNBM;
    public $isEditPersenPPH22;
    public $isEditAmountPPH22;
    public $isEditPersenPPNSubsididp;
    public $isEditAmountPPNSubsididp;
    public $isEditPersenPPNInterior;
    public $isEditAmountPPNInterior;

    public function __construct() {
        $this->tools          = new Erems_Box_Tools();
        $this->unit           = new Erems_Models_Unit_UnitTran();
        $this->price          = new Erems_Models_Sales_Price();
        $this->purchaseLetter = new Erems_Models_Purchaseletter_PurchaseLetterTransaction();

        $this->isEditTanahpermeter          = FALSE;
		$this->isEditTotaltanah             = FALSE;
		$this->isEditKelebihantanahpermeter = FALSE;
		$this->isEditTotalkelebihantanah    = FALSE;
		$this->isEditBangunanpermeter       = FALSE;
		$this->isEditTotalbangunan          = FALSE;
		$this->isEditPersenPPNTanah         = FALSE;
		$this->isEditAmountPPNTanah         = FALSE;
		$this->isEditPersenPPNBangunan      = FALSE;
		$this->isEditAmountPPNBangunan      = FALSE;
		$this->isEditPersenPPNBM            = FALSE;
		$this->isEditAmountPPNBM            = FALSE;
		$this->isEditPersenPPH22            = FALSE;
		$this->isEditPersenPPNSubsididp     = FALSE;
		$this->isEditAmountPPNSubsididp     = FALSE;
		$this->isEditPersenPPNInterior      = FALSE;
		$this->isEditAmountPPNInterior      = FALSE;
    }

    public function getUnit() { return $this->unit; }
    public function setUnit(Erems_Models_Unit_UnitTran $unit) { $this->unit = $unit; }
    protected function getPrice() { return $this->price; }
    protected function setPrice(Erems_Models_Sales_Price $price) { $this->price = $price; }
    public function getPurchaseLetter() { return $this->purchaseLetter; }
    public function setPurchaseLetter(Erems_Models_Purchaseletter_PurchaseLetterTransaction $purchaseLetter) {
        $this->purchaseLetter = $purchaseLetter;
        if ($purchaseLetter->getPrice() instanceof Erems_Models_Sales_Price) {
            $this->price = $purchaseLetter->getPrice();
        }
    }

    private function getHargaBangunan() {
        if($this->isEditBangunanpermeter === true){
            $hargaBangunan = $this->unit->getPropertyInfo()->getBuildingSize() * $this->price->getBangunanpermeter();
        }
        else{
            $hargaBangunan = $this->price->getBangunan();
        }

        $hargaBangunan = round($hargaBangunan, 2);
        return $hargaBangunan;
    }

    private function getHargaTanah() {
        if($this->isEditTanahpermeter === true){
            $this->hargaTanah = $this->unit->getPropertyInfo()->getLandSize() * $this->price->getPermeter();
        }
        else{
            $this->hargaTanah = $this->price->getTanah();
        }
        $this->hargaTanah = $this->tools->rounding($this->hargaTanah);

        return $this->hargaTanah;
    }

    private function getHargaKelebihan() {
         if($this->isEditKelebihantanahpermeter === true){
            $this->hargaKelebihan = $this->unit->getPropertyInfo()->getKelebihanTanah() * $this->price->getKelebihan();
        }
        else{
            $this->hargaKelebihan = $this->price->getTotalKelebihan();
        }
        $this->hargaKelebihan = $this->tools->rounding($this->hargaKelebihan);

        return $this->hargaKelebihan;
    }

    private function getSubsidiDp(){
        return $this->price->getSubsidiDp();
    }

    private function getHargaInterior(){
        return $this->price->getHargaInterior();
    }

    private function getHargaDasar() {
        $this->hargaDasar = $this->getHargaTanah() + $this->getHargaKelebihan() + $this->getHargaBangunan() + $this->getSubsidiDp() + $this->getHargaInterior();
        $this->hargaDasar = $this->tools->rounding($this->hargaDasar);

        return $this->hargaDasar;
    }

    private function getHargaNetto() {
        $propertyInfo = $this->unit->getPropertyInfo();
        $hargaDasar   = (double) $this->getHargaDasar();

        $diskonDasar    = 0;
        $diskonTanah    = 0;
        $diskonBangunan = 0;
        if ($this->price instanceof Erems_Models_Sales_Price) {
            $diskonDasar    = $this->diskonDasar = $this->tools->rounding($this->price->getAfterDiscountDasar());
            $diskonTanah    = $this->diskonTanah = $this->tools->rounding($this->price->getAfterDiscountTanah());
            $diskonBangunan = $this->diskonBangunan = $this->tools->rounding($this->price->getAfterDiscountBangunan());
        }

        $netto = $hargaDasar - ($diskonDasar + $diskonTanah + $diskonBangunan);
        $netto = $this->tools->rounding($netto);

        $this->hargaNetto = $netto;
        return $this->hargaNetto;
    }

    private function getHargaJual() {
        $priceAdmin  = $this->purchaseLetter->getPriceAdmin();
        $hargaNetto  = (double) $this->getHargaNetto();

        if($this->isEditPersenPPNTanah === true) {
            $ppnTanah = (double) $this->getPercentAmountForTax($this->price->getPpnTanah(), ($this->getHargaTanah() + $this->getHargaKelebihan()), $this->diskonTanah);
        }
        else{
            $ppnTanah = $this->price->getAfterPpnTanah();
        }

        if($this->isEditPersenPPNBangunan === true){
            $ppnBangunan = (double) $this->getPercentAmountForTax($this->price->getPpnBangunan(), $this->getHargaBangunan(), $this->diskonBangunan);
        }
        else{
            $ppnBangunan = $this->price->getAfterPpnBangunan();
        }

        if($this->isEditPersenPPNBM === true){
            $ppnPpnbm = (double) $this->getPercentAmount($this->price->getPpnbm(), $hargaNetto);
        }
        else{
            $ppnPpnbm = $this->price->getAfterPpnbm();
        }

        if($this->isEditPersenPPH22 === false){
            $ppnPph22 = (double) $this->getPercentAmount($this->price->getPph22(), $hargaNetto);
        }
        else{
            $ppnPph22 = $this->price->getAfterPph22();
        }

        if($this->isEditPersenPPNSubsididp === false){
            $ppnSubsididp = (double) $this->getPercentAmount($this->price->getPpnSubsididp(), $this->getSubsidiDp());
        }
        else{
            $ppnSubsididp = $this->price->getAfterPpnSubsididp();
        }

        if($this->isEditPersenPPNInterior === false){
            $ppnInterior = (double) $this->getPercentAmount($this->price->getPpnInterior(), $this->getHargaInterior());
        }
        else{
            $ppnInterior = $this->price->getAfterPpnInterior();
        }

		$ppnTanah     = $this->tools->rounding($ppnTanah);
		$ppnBangunan  = $this->tools->rounding($ppnBangunan);
		$ppnSubsididp = $this->tools->rounding($ppnSubsididp);
		$ppnInterior  = $this->tools->rounding($ppnInterior);
		$ppnPpnbm     = $this->tools->rounding($ppnPpnbm);
		$ppnPph22     = $this->tools->rounding($ppnPph22);

        $jual = $hargaNetto + $ppnTanah + $ppnBangunan + $ppnSubsididp + $ppnInterior + $ppnPpnbm + $ppnPph22 + $this->price->getBbnSertifikat() + $this->price->getBajb() + $this->price->getBphtb();

        if ($priceAdmin instanceof Erems_Models_Sales_PriceAdmin) {
            $jual += $priceAdmin->getPMutu();
        }

        $jual = $this->tools->rounding($jual);

        $this->hargaJual = $jual;
        return $this->hargaJual;
    }

    private function getTotal() {
        $hargaJual = (double) $this->getHargaJual();

        $adminDiscount = $this->tools->rounding($this->getPercentAmount($this->purchaseLetter->getPriceAdmin()->getDiskon(), $hargaJual));

        $total = ($hargaJual + $this->purchaseLetter->getPriceAdmin()->getPrice() + $this->purchaseLetter->getPriceAdmin()->getSubsidi() + $this->purchaseLetter->getPriceAdmin()->getPaketTambahan() + $this->purchaseLetter->getPriceAdmin()->getAsuransi())  - $adminDiscount;

        $total = $this->tools->rounding($total);

        $total = $total + $this->purchaseLetter->getHargaPembulatan();

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
