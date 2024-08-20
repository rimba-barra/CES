<?php


/**
 * Description of Cluster
 *
 * @author MIS
 */
class Erems_Models_App_Masterdata_PtCashier extends Erems_Box_Models_App_Masterdata_Masterdata {
    
      private $requestRead;
    private $appSession;
    
    public function getDao() {
        return new Erems_Models_Master_GeneralDao();
    }

    public function getTableClass() {
        return new Erems_Box_Models_Master_Pt();
    }

    public function getTableClassName() {
        return "pt";
        
    }
    
    public function prosesData(\Erems_Box_Models_App_AbDao $dao, \Erems_Box_Models_ObjectEmbedData $objectEmbedata, \Erems_Box_Models_App_Models_ReadWorms $app) {
        $hasil = array();
        return $hasil;
    }
    
    
    protected function getMethod($object){
        return $this->getDao()->getAllPtCashier($this->requestRead, $this->appSession);
    }

   public function setRequestRead(Erems_Box_Models_App_HasilRequestRead $r){
        $this->requestRead = $r;
    }

    public function setAppSession($session){
        $this->appSession = $session;
    }
    
}

?>
