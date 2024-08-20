<?php

/**
 * Description of AbsentProcessor
 *
 * @author MIS
 */
class Erems_Models_App_Box_MarketingStockProcessor extends Erems_Models_App_Box_Processor {

    public function daoProses($dao, $object, $modeCreate) {

        switch ($modeCreate) {
            case "setupsheet":
                return $dao->setupShift($object);
                break;
        }
    }

    private function processMarketStock(Erems_Models_Marketingstock_MarketingStock $ms) {
        $data = $this->getData();
        $dataPrices = $data["detail"];
        foreach ($dataPrices as $dataPrice) {
            $price = new Erems_Models_Sales_PriceAlt();
            $price->setArrayTable($dataPrice);
            if($dataPrice["pricetype_id"]==Erems_Box_Config::PRICETYPE_INHOUSE){
                $ms->setHargaJualInHouse($dataPrice["harga_jual"]);
            }
            if($dataPrice["pricetype_id"]==Erems_Box_Config::PRICETYPE_KPR){
                $ms->setHargaJualKPR($dataPrice["harga_jual"]);
            }
            if($dataPrice["pricetype_id"]==Erems_Box_Config::PRICETYPE_TUNAI){
                $ms->setHargaJualTunai($dataPrice["harga_jual"]);
            }
            $ms->addPrice($price);
        }

        $de = new Erems_Box_Delien_DelimiterEnhancer();
        $de->setDelimiterCandidate($ms);
        $de->generate();
        
    }

    public function daoSave($dao, $marketStock) {
        $data = $this->getData();
        $this->processMarketStock($marketStock);
        $serahTerimaDate = $data["serahterima_plan"];
        return $dao->save($marketStock,$data["list_unit_id"],$serahTerimaDate);
    }

    public function daoUpdate($dao, $marketStock) {
        $this->processMarketStock($marketStock);
        $data = $this->getData();
        $marketStock->getUnit()->setId($data["unit_unit_id"]);
     
        $serahTerimaDate = $data["serahterima_plan"];
        return $dao->update($marketStock,$serahTerimaDate);
    }
}
?>