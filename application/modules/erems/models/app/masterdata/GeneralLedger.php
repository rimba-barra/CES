<?php

/**
 * Description of Erems_Models_App_Masterdata_GeneralLedger
 *
 * @author semy
 */
class Erems_Models_App_Masterdata_GeneralLedger extends Erems_Box_Models_App_Masterdata_Masterdata {
    public function getDao() {
        return new Erems_Models_Master_GeneralLedgerDao();
    }

    public function getTableClass() {
        return new Erems_Models_Master_GeneralLedger();
    }

    public function getTableClassName() {
        return "m_coa";
    }

  /*  public function prosesData(Erems_Box_Models_App_AbDao $dao, Erems_Box_Models_ObjectEmbedData $objectEmbedata, Erems_Models_App_Models_ReadWorms $app) {
        $objectEmbedata->setProject($app->getSession()->getProject());
        $objectEmbedata->setPt($app->getSession()->getPt());
        $hasil = $dao->getAll($objectEmbedata);
    
        return $hasil;
    }*/
    
 public function prosesData(\Erems_Box_Models_App_AbDao $dao, \Erems_Box_Models_ObjectEmbedData $objectEmbedata, \Erems_Box_Models_App_Models_ReadWorms $app) {
     $objectEmbedata->setProject($app->getSession()->getProject());
        $objectEmbedata->setPt($app->getSession()->getPt());
        $hasil = $dao->getAll($objectEmbedata);
        return $hasil;
 }


}