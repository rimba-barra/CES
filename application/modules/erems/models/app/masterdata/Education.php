<?php

/**
 * Description of Bank
 *
 * @author tommytoban
 */
class Erems_Models_App_Masterdata_Education extends Erems_Box_Models_App_Masterdata_Masterdata {
    public function getDao() {
        return new Erems_Models_Master_EducationDao();
    }

    public function getTableClass() {
        return new Erems_Models_Master_Education();
    }

    public function getTableClassName() {
        return "education";
    }

    public function prosesData(\Erems_Box_Models_App_AbDao $dao, \Erems_Box_Models_ObjectEmbedData $objectEmbedata, \Erems_Box_Models_App_Models_ReadWorms $app) {
        $hasil = $dao->getAll($objectEmbedata);
      
        return $hasil;
    }

    

}
