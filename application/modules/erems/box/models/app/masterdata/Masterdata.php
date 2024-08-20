<?php

/**
 * Description of Masterdata
 *
 * @author MIS
 */
abstract class Erems_Box_Models_App_Masterdata_Masterdata implements Erems_Box_Models_App_Masterdata_Main {

    public function retrieveData(Erems_Box_Models_App_Models_ReadWorms $app) {

        $dataListName = "masterdata";
        $creator = new Erems_Box_Models_App_DataListCreator('', $this->getTableClassName(), array());
        $app->registerDataList($dataListName, $creator);
        $dao = $this->getDao();
        $app->setRequestModel(TRUE);
        $tableClass = $this->getTableClass();

        $app->prosesDao($dataListName, $this->prosesData($dao, $tableClass, $app));
    }

    /* added 24 September 2014 */

    public function prosesDataWithSession(Erems_Box_Kouti_Session $ses, $arrayReady = false) {
        $object = $this->getTableClass();
        $dao = $this->getDao();
        if ($object instanceof Erems_Box_Models_Master_InterProjectPt) {
            $object->setProject($ses->getProject());
            $object->setPt($ses->getPt());
        }

        $hasil = $this->getMethod($object);
        if ($arrayReady) {
            $allRecord = array();
            if (key_exists(1, $hasil)) {
                foreach ($hasil[1] as $record) {

                    $data = $this->getTableClass();
                    $data->setArrayTable($record);
                    $allRecord[] = $data;
                }
            }

            return $allRecord;
        }

        return $hasil;
    }

    protected function getMethod($object) {
        return $this->getDao()->getAll($object);
    }

    public function prosesDataB() {

        /*
          $hasil = $this->getDao()->getAllWOR();

          return $hasil;
         */
        $hasil = NULL;

        return $hasil;
    }

    /* @return hasil dao */

    abstract function prosesData(Erems_Box_Models_App_AbDao $dao, Erems_Box_Models_ObjectEmbedData $objectEmbedata, Erems_Box_Models_App_Models_ReadWorms $app);
    /* @return string */

    abstract function getTableClassName();
    /* @return Dao */

    abstract function getDao();
    /* @return class */

    abstract function getTableClass();
}

?>
