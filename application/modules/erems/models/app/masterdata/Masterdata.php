<?php

/**
 * Description of Masterdata
 *
 * @author MIS
 */
abstract class Erems_Models_App_Masterdata_Masterdata implements Erems_Models_App_Masterdata_Main {
    public function retrieveData(Erems_Models_App_Models_ReadWorms $app) {
      
        $dataListName = "masterdata";
        $creator = new Erems_Models_App_DataListCreator('', $this->getTableClassName(), array());
        $app->registerDataList($dataListName, $creator);
        $dao = $this->getDao();
        $app->setRequestModel(TRUE);
        $tableClass = $this->getTableClass();
     
        $app->prosesDao($dataListName,$this->prosesData($dao,$tableClass,$app));
    }
    /*@return hasil dao*/
    abstract function prosesData(Erems_Models_App_AbDao $dao,Erems_Models_ObjectEmbedData $objectEmbedata,Erems_Models_App_Models_ReadWorms $app);
    /*@return string*/
    abstract function getTableClassName();
    /*@return Dao*/
    abstract function getDao();
    /*@return class*/
    abstract function getTableClass();
}

?>
