<?php

/**
 * Description of hrd\models\app\mastertable\LevelCategory
 *
 * @author MIS
 */
class Hrd_Models_App_Mastertable_LevelCategory extends Box_Models_App_Masterdata_Masterdata {
    public function getDao() {
        return new Hrd_Models_Performancemanagement_LevelCategoryDao();
    }

    public function getTableClass() {
        return new Hrd_Models_Performancemanagement_LevelCategory();
    }

    public function getTableClassName() {
        // echo "adgsdfgsdgs";
        return "levelcategory";
    }

    public function prosesData(\Box_Models_App_AbDao $dao, \Box_Models_ObjectEmbedData $objectEmbedata, \Box_Models_App_Models_ReadWorms $app) {
        $hasil = $dao->getAll($app->getRequest(),$objectEmbedata);
        return $hasil;
    }
    
    protected function getMethod($object){
        return $this->getDao()->getWopl($object);
    }
}

?>
