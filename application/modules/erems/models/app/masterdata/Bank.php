<?php

/**
 * Description of Bank
 *
 * @author tommytoban
 */
class Erems_Models_App_Masterdata_Bank extends Erems_Box_Models_App_Masterdata_Masterdata {
    public function getDao() {
        return new Erems_Models_Master_BankDao();
    }

    public function getTableClass() {
        return new Erems_Models_Master_Bank();
    }

    public function getTableClassName() {
        return "bank";
    }

    public function prosesData(\Erems_Box_Models_App_AbDao $dao, \Erems_Box_Models_ObjectEmbedData $objectEmbedata, \Erems_Box_Models_App_Models_ReadWorms $app) {
        $hasil = $dao->getAll($objectEmbedata);
      
        return $hasil;
    }

    

}
