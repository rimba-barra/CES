<?php

/**
 * Description of Price
 *
 * @author MIS
 */
class Cashier_Models_Sales_Price extends Cashier_Box_Models_ObjectEmbedData implements Cashier_Box_Kouti_Remora,  Cashier_Box_Arried {

    private $unitId;
    private $priceTypeId;
    private $permeter;
    private $kelebihan;
    private $totalKelebihan;
    private $tanah;
    private $bangunan;
    private $jualDasar;
    private $netto;
    private $bbnSertifikat;
    private $bphtb;
    private $bajb;
    private $jual;
    private $unit;
    private $priceType;
    private $discountDasar;
    private $discountTanah;
    private $discountBangunan;
    private $afterDiscountDasar;
    private $afterDiscountTanah;
    private $afterDiscountBangunan;
    private $ppnTanah;
    private $ppnBangunan;
    private $afterPpnTanah;
    private $afterPpnBangunan;
    private $ppnbm;
    private $pph22;
    private $afterPpnbm;
    private $afterPph22;
    private $tanahpermeterText;

    public function __construct($embedPrefix = NULL) {
        parent::__construct();
        $this->embedPrefix = $embedPrefix == NULL ? 'price_' : $embedPrefix;
        $this->unit = new Cashier_Models_Unit_Unit();
        $this->priceType = new Cashier_Models_Sales_PriceType();
    }

    public function getUnitId() {
        return $this->unitId;
    }

    public function setUnitId($unitId) {
        $this->unitId = (int) $unitId;
    }

    public function getPriceTypeId() {
        return $this->priceTypeId;
    }

    public function setPriceTypeId($priceTypeId) {
        $this->priceTypeId = $priceTypeId;
    }

    public function getPermeter() {
        return $this->permeter;
    }

    public function setPermeter($permeter) {
        $this->permeter = (double) $permeter;
    }

    public function getKelebihan() {
        return $this->kelebihan;
    }

    public function setKelebihan($kelebihan) {
        $this->kelebihan = (double) $kelebihan;
    }

    public function getTanah() {
        return $this->tanah;
    }

    public function setTanah($tanah) {
        $this->tanah = (double) $tanah;
    }

    public function getBangunan() {
        return $this->bangunan;
    }

    public function setBangunan($bangunan) {
        $this->bangunan = (double) $bangunan;
    }

    public function getJualDasar() {
        return $this->jualDasar;
    }

    public function setJualDasar($jualDasar) {
        $this->jualDasar = (double) $jualDasar;
    }

    public function getNetto() {
        return $this->netto;
    }

    public function setNetto($netto) {
        $this->netto = (double) $netto;
    }

    public function getBbnSertifikat() {
        return $this->bbnSertifikat;
    }

    public function setBbnSertifikat($bbnSertifikat) {
        $this->bbnSertifikat = (double) $bbnSertifikat;
    }

    public function getBphtb() {
        return $this->bphtb;
    }

    public function setBphtb($bphtb) {
        $this->bphtb = (double) $bphtb;
    }

    public function getBajb() {
        return $this->bajb;
    }

    public function setBajb($bajb) {
        $this->bajb = (double) $bajb;
    }

    public function getJual() {
        return $this->jual;
    }

    public function setJual($jual) {
        $this->jual = (double) $jual;
    }

    public function getUnit() {
        return $this->unit;
    }

    public function setUnit(Cashier_Models_Unit_Unit $unit) {
        $this->unit = $unit;
    }

    public function getPriceType() {
        return $this->priceType;
    }

    public function setPriceType(Cashier_Models_Sales_PriceType $priceType) {
        $this->priceType = $priceType;
    }

    public function getDiscountDasar() {
        return (double) $this->discountDasar;
    }

    public function setDiscountDasar($discountDasar) {
        $this->discountDasar = (double) $discountDasar;
    }

    public function getDiscountTanah() {
        return (double) $this->discountTanah;
    }

    public function setDiscountTanah($discountTanah) {
        $this->discountTanah = (double) $discountTanah;
    }

    public function getDiscountBangunan() {
        return (double) $this->discountBangunan;
    }

    public function setDiscountBangunan($discountBangunan) {
        $this->discountBangunan = (double) $discountBangunan;
    }

    public function getAfterDiscountDasar() {
        return (double) $this->afterDiscountDasar;
    }

    public function setAfterDiscountDasar($afterDiscountDasar) {
        $this->afterDiscountDasar = (double) $afterDiscountDasar;
    }

    public function getAfterDiscountTanah() {
        return (double) $this->afterDiscountTanah;
    }

    public function setAfterDiscountTanah($afterDiscountTanah) {
        $this->afterDiscountTanah = (double) $afterDiscountTanah;
    }

    public function getAfterDiscountBangunan() {
        return (double) $this->afterDiscountBangunan;
    }

    public function setAfterDiscountBangunan($afterDiscountBangunan) {
        $this->afterDiscountBangunan = (double) $afterDiscountBangunan;
    }

    public function getPpnTanah() {
        return (double) $this->ppnTanah;
    }

    public function setPpnTanah($ppnTanah) {
        $this->ppnTanah = (double) $ppnTanah;
    }

    public function getPpnBangunan() {
        return (double) $this->ppnBangunan;
    }

    public function setPpnBangunan($ppnBangunan) {
        $this->ppnBangunan = (double) $ppnBangunan;
    }

    public function getAfterPpnTanah() {
        return (double) $this->afterPpnTanah;
    }

    public function setAfterPpnTanah($afterPpnTanah) {
        $this->afterPpnTanah = (double) $afterPpnTanah;
    }

    public function getAfterPpnBangunan() {
        return (double) $this->afterPpnBangunan;
    }

    public function setAfterPpnBangunan($afterPpnBangunan) {
        $this->afterPpnBangunan = (double) $afterPpnBangunan;
    }

    public function getTotalKelebihan() {
        return (double) $this->totalKelebihan;
    }

    public function setTotalKelebihan($totalKelebihan) {
        $this->totalKelebihan = (double) $totalKelebihan;
    }
    
    public function getPpnbm() {
        return (double)$this->ppnbm;
    }

    public function setPpnbm($ppnbm) {
        $this->ppnbm = (double) $ppnbm;
    }

    public function getPph22() {
        return (double)$this->pph22;
    }

    public function setPph22($pph22) {
        $this->pph22 = (double) $pph22;
    }

    public function getAfterPpnbm() {
        return (double) $this->afterPpnbm;
    }

    public function setAfterPpnbm($afterPpnbm) {
        $this->afterPpnbm = (double)$afterPpnbm;
    }

    public function getAfterPph22() {
        return (double)$this->afterPph22;
    }

    public function setAfterPph22($afterPph22) {
        $this->afterPph22 = (double) $afterPph22;
    }
    
    function getTanahpermeterText() {
        return $this->tanahpermeterText;
    }

    function setTanahpermeterText($tanahpermeterText) {
        $this->tanahpermeterText = $tanahpermeterText;
    }

    
    
    public function setArrayTable($dataArray = NULL) {

        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;
        if (isset($x['price_id'])) {
            $this->setId($x['price_id']);
        }
        if (isset($x['unit_id'])) {
            $this->setUnitId($x['unit_id']);
        }
        if (isset($x['pricetype_id'])) {
            $this->setPriceTypeId($x['pricetype_id']);
        }

        if (isset($x[$this->fieldPrefix . 'tanahpermeter'])) {

            $this->setPermeter($x[$this->fieldPrefix . 'tanahpermeter']);
        }

        if (isset($x['kelebihantanah'])) {
            $this->setKelebihan($x['kelebihantanah']);
        }
        if (isset($x['harga_kelebihantanah'])) {
            $this->setTotalKelebihan($x['harga_kelebihantanah']);
        }
        if (isset($x['harga_tanah'])) {
            $this->setTanah($x['harga_tanah']);
        }
        if (isset($x['harga_bangunan'])) {
            $this->setBangunan($x['harga_bangunan']);
        }
        if (isset($x['harga_jualdasar'])) {
            $this->setJualDasar($x['harga_jualdasar']);
        }
        if (isset($x['harga_neto'])) {
            $this->setNetto($x['harga_neto']);
        }
        if (isset($x['harga_bbnsertifikat'])) {
            $this->setBbnSertifikat($x['harga_bbnsertifikat']);
        }
        if (isset($x['harga_bphtb'])) {
            $this->setBphtb($x['harga_bphtb']);
        }
        if (isset($x['harga_bajb'])) {
            $this->setBajb($x['harga_bajb']);
        }
        if (isset($x['harga_jual'])) {
            $this->setJual($x['harga_jual']);
        }

        ///

        if (isset($x['persen_dischargadasar'])) {
            $this->setDiscountDasar($x['persen_dischargadasar']);
        }
        if (isset($x['harga_dischargadasar'])) {
            $this->setAfterDiscountDasar($x['harga_dischargadasar']);
        }
        if (isset($x['persen_dischargatanah'])) {
            $this->setDiscountTanah($x['persen_dischargatanah']);
        }
        if (isset($x['harga_dischargatanah'])) {
            $this->setAfterDiscountTanah($x['harga_dischargatanah']);
        }
        if (isset($x['persen_dischargabangunan'])) {
            $this->setDiscountBangunan($x['persen_dischargabangunan']);
        }
        if (isset($x['harga_dischargabangunan'])) {
            $this->setAfterDiscountBangunan($x['harga_dischargabangunan']);
        }





        if (isset($x['persen_ppntanah'])) {
            $this->setPpnTanah($x['persen_ppntanah']);
        }
        if (isset($x['harga_ppntanah'])) {
            $this->setAfterPpnTanah($x['harga_ppntanah']);
        }
        if (isset($x['persen_ppnbangunan'])) {
            $this->setPpnBangunan($x['persen_ppnbangunan']);
        }
        if (isset($x['harga_ppnbangunan'])) {
            $this->setAfterPpnBangunan($x['harga_ppnbangunan']);
        }
        if (isset($x['persen_ppnbm'])) {
            $this->setPpnbm($x['persen_ppnbm']);
        }
        if (isset($x['harga_ppnbm'])) {
            $this->setAfterPpnbm($x['harga_ppnbm']);
        }
        if (isset($x['persen_pph22'])) {
            $this->setPph22($x['persen_pph22']);
        }
        if (isset($x['harga_pph22'])) {
            $this->setAfterPph22($x['harga_pph22']);
        }
        if (isset($x['tanahpermeter_text'])) {
            $this->setTanahpermeterText($x['tanahpermeter_text']);
        }

        unset($x);
    }

    public function getArrayTable() {
        $x = array(
            'price_id' => $this->getId(),
            'unit_id' => $this->getUnitId(),
            'pricetype_id' => $this->getPriceTypeId(),
            'tanahpermeter' => $this->getPermeter(),
            'kelebihantanah' => $this->getKelebihan(),
            'harga_kelebihantanah' => $this->getTotalKelebihan(),
            'harga_tanah' => $this->getTanah(),
            'harga_bangunan' => $this->getBangunan(),
            'harga_jualdasar' => $this->getJualDasar(),
            'harga_neto' => $this->getNetto(),
            'harga_bbnsertifikat' => $this->getBbnSertifikat(),
            'harga_bphtb' => $this->getBphtb(),
            'harga_bajb' => $this->getBajb(),
            'harga_jual' => $this->getJual(),
            'persen_dischargadasar' => $this->getDiscountDasar(),
            'harga_dischargadasar' => $this->getAfterDiscountDasar(),
            'persen_dischargatanah' => $this->getDiscountTanah(),
            'harga_dischargatanah' => $this->getAfterDiscountTanah(),
            'persen_dischargabangunan' => $this->getDiscountBangunan(),
            'harga_dischargabangunan' => $this->getAfterDiscountBangunan(),
            'persen_ppntanah' => $this->getPpnTanah(),
            'harga_ppntanah' => $this->getAfterPpnTanah(),
            'persen_ppnbangunan' => $this->getPpnBangunan(),
            'harga_ppnbangunan' => $this->getAfterPpnBangunan(),
            'persen_ppnbm' => $this->getPpnbm(),
            'harga_ppnbm' => $this->getAfterPpnbm(),
            'persen_pph22' => $this->getPph22(),
            'harga_pph22' => $this->getAfterPph22(),
            'tanahpermeter_text'=>$this->getTanahpermeterText()
        );
        return $x;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getUnit(), $this->getPriceType());
    }

    public function getArray() {
        return $this->getArrayTable();
    }

}

?>
