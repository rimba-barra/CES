<?php


/**
 * Description of CitraClub
 *
 * @author MIS
 */

class Erems_Models_App_Masterdata_CitraClub extends Erems_Box_Models_App_Masterdata_Masterdata{
    public function getDao() {
        return new Erems_Models_Master_CitraClubDao();
    }

    public function getTableClass() {
        return new Erems_Models_Master_CitraClub();
    }

    public function getTableClassName() {
        return "citraclub";
    }

    public function prosesData(\Erems_Box_Models_App_AbDao $dao, \Erems_Box_Models_ObjectEmbedData $objectEmbedata, \Erems_Box_Models_App_Models_ReadWorms $app) {
         $objectEmbedata->setProject($app->getSession()->getProject());
        $objectEmbedata->setPt($app->getSession()->getPt());
        $hasil = $dao->getAll($objectEmbedata);
        return $hasil;
    }
    
    protected function getMethod($object){
        return $this->getDao()->getAllOld($object);
    }
    
    
}

?>
