<?php

/**
 * Description of Bank
 *
 * @author tommytoban
 */
class Erems_Models_App_Masterdata_Instrumentpembayaran extends Erems_Box_Models_App_Masterdata_Masterdata {
    public function getDao() {
        return new Erems_Models_Master_InstrumentpembayaranDao();
    }

    public function getTableClass() {
        return new Erems_Models_Master_Instrumentpembayaran();
    }

    public function getTableClassName() {
        return "instrumentpembayaran";
    }

    public function prosesData(\Erems_Box_Models_App_AbDao $dao, \Erems_Box_Models_ObjectEmbedData $objectEmbedata, \Erems_Box_Models_App_Models_ReadWorms $app) {
        $hasil = $dao->getAllWOR();      
        return $hasil;
    }
    
    protected function getMethod($object) {
        return $this->getDao()->getAllWOR();
    }


    

}
