<?php

/**
 * Description of hrd\models\app\mastertable\Approvallevel
 *
 * @author MIS
 */
class Hrd_Models_App_Mastertable_Approvallevel extends Box_Models_App_Masterdata_Masterdata {
    public function getDao() {
        return new Hrd_Models_Performancemanagement_ApprovallevelDao();
    }

    public function getTableClass() {
        return new Hrd_Models_Performancemanagement_Approvallevel();
    }

    public function getTableClassName() {
        return "approvallevel";
    }

    public function prosesData(\Box_Models_App_AbDao $dao, \Box_Models_ObjectEmbedData $objectEmbedata, \Box_Models_App_Models_ReadWorms $app) {
        $hasil = $dao->getAll($app->getRequest(),$objectEmbedata);
        return $hasil;
    }
    
    protected function getMethod($object){
        return $this->getDao()->getApprovallevel($object);
    }
}

?>
