<?php

/**
 * Description of Price
 *
 * @author MIS
 */
class Cashier_Models_Sales_PriceAlt extends Cashier_Models_Sales_Price{

   

    public function __construct($embedPrefix = NULL) {
        parent::__construct($embedPrefix);
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

        if (isset($x['persen_dischargedasar'])) {
            $this->setDiscountDasar($x['persen_dischargedasar']);
        }
        if (isset($x['harga_dischargedasar'])) {
            $this->setAfterDiscountDasar($x['harga_dischargedasar']);
        }
        if (isset($x['persen_dischargetanah'])) {
            $this->setDiscountTanah($x['persen_dischargetanah']);
        }
        if (isset($x['harga_dischargetanah'])) {
            $this->setAfterDiscountTanah($x['harga_dischargetanah']);
        }
        if (isset($x['persen_dischargebangunan'])) {
            $this->setDiscountBangunan($x['persen_dischargebangunan']);
        }
        if (isset($x['harga_dischargebangunan'])) {
            $this->setAfterDiscountBangunan($x['harga_dischargebangunan']);
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
            'persen_dischargedasar' => $this->getDiscountDasar(),
            'harga_dischargedasar' => $this->getAfterDiscountDasar(),
            'persen_dischargetanah' => $this->getDiscountTanah(),
            'harga_dischargetanah' => $this->getAfterDiscountTanah(),
            'persen_dischargebangunan' => $this->getDiscountBangunan(),
            'harga_dischargebangunan' => $this->getAfterDiscountBangunan(),
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


}

?>
