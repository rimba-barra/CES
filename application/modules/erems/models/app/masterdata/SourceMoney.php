<?php


/**
 * Description of Cluster
 *
 * @author MIS
 */
class Erems_Models_App_Masterdata_SourceMoney extends Erems_Box_Models_App_Masterdata_Masterdata {

    
    public function getDao() {
        return new Erems_Models_Master_GeneralDao();
    }

    public function getTableClass() {
        return new Erems_Models_Master_SourceMoney();
    }

    public function getTableClassName() {
        return "sourcemoney";
        
    }
    
    public function prosesData(\Erems_Box_Models_App_AbDao $dao, \Erems_Box_Models_ObjectEmbedData $objectEmbedata, \Erems_Box_Models_App_Models_ReadWorms $app) {
        $hasil = FALSE;
        return $hasil;
    }
    
    
    protected function getMethod($object){
        return $this->getDao()->getAllSourceMoney();
    }

   
}

?>
