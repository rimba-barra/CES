<?php

/**
 * Description of Bank
 *
 * @author tommytoban
 */
class Erems_Models_App_Masterdata_Purpose extends Erems_Box_Models_App_Masterdata_Masterdata {
    public function getDao() {
        return new Erems_Models_Master_GeneralDao();
    }

    public function getTableClass() {
        return new Erems_Models_Master_Purpose();
    }

    public function getTableClassName() {
        return "purpose";
    }

    public function prosesData(\Erems_Box_Models_App_AbDao $dao, \Erems_Box_Models_ObjectEmbedData $objectEmbedata, \Erems_Box_Models_App_Models_ReadWorms $app) {
       // $hasil = $dao->getAllPurpose($app->getData(),$objectEmbedata);
        $hasil = $dao->getAllPurposeWOR($objectEmbedata);
        return $hasil;
    }
    
    protected function getMethod($object){
        
        return $this->getDao()->getAllPurposeWOR($object);
    }

    

}
