<?php
class Erems_Models_App_Masterdata_Salesgroup extends Erems_Box_Models_App_Masterdata_Masterdata {
    public function getDao() {
        return new Erems_Models_Master_SalesgroupDao();
    }

    public function getTableClass() {
        return new Erems_Models_Master_Salesgroup();
    }

    public function getTableClassName() {
        return "salesgroup";
    }

    public function prosesData(\Erems_Box_Models_App_AbDao $dao, \Erems_Box_Models_ObjectEmbedData $objectEmbedata, \Erems_Box_Models_App_Models_ReadWorms $app) {
        $hasil = $dao->getAll($objectEmbedata);
      
        return $hasil;
    }
}