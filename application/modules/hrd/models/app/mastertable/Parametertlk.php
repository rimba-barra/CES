<?php

/**
 * Description of Position
 *
 * @author MIS
 */
class Hrd_Models_App_Mastertable_Parametertlk  extends Box_Models_App_Masterdata_Masterdata  {
    public function getDao() {
        return new Hrd_Models_Parameters_Tlk_Dao();
    }

    public function getTableClass() {
        return new Hrd_Models_Parameters_Tlk_Tlk();
    }

    public function getTableClassName() {
        return "parametertlk";
    }

    public function prosesData(\Box_Models_App_AbDao $dao, \Box_Models_ObjectEmbedData $objectEmbedata, \Box_Models_App_Models_ReadWorms $app) {
        $ses = $app->getSession();
        $objectEmbedata->setProject($ses->getProject());
        $objectEmbedata->setPt($ses->getPt());
        $hasil = $dao->getAll($app->getRequest(),$objectEmbedata);
      
        return $hasil;
    }    //put your code here
}

?>
