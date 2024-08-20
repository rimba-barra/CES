<?php

/**
 * Description of Bank
 *
 * @author tommytoban
 */
class Erems_Models_App_Masterdata_PurposeBuy extends Erems_Box_Models_App_Masterdata_Masterdata {
    public function getDao() {
        return new Erems_Models_Master_GeneralDao();
    }

    public function getTableClass() {
        return new Erems_Models_Master_PurposeBuy();
    }

    public function getTableClassName() {
        return "purposebuy";
    }

    public function prosesData(\Erems_Box_Models_App_AbDao $dao, \Erems_Box_Models_ObjectEmbedData $objectEmbedata, \Erems_Box_Models_App_Models_ReadWorms $app) {
       // $hasil = $dao->getAllPurpose($app->getData(),$objectEmbedata);
        $hasil = $dao->getAllPurposeBuyWOR($objectEmbedata);
        return $hasil;
    }
    
    protected function getMethod($object){
        
        return $this->getDao()->getAllPurposeBuyWOR($object);
    }

    

}
