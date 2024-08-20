<?php

/**
 * Description of Masterdata
 *
 * @author MIS
 */
abstract class Box_Models_App_Masterdata_Masterdata implements Box_Models_App_Masterdata_Main {

    public function retrieveData(Box_Models_App_Models_ReadWorms $app) {

        $dataListName = "masterdata";
        $creator = new Box_Models_App_DataListCreator('', $this->getTableClassName(), array());
        $app->registerDataList($dataListName, $creator);
        $dao = $this->getDao();
        $app->setRequestModel(TRUE);
        $tableClass = $this->getTableClass();

        // added 20 Oct 2015
        // menambahkan session
        if ($tableClass instanceof Box_Models_Master_InterProjectPt) {
            $ses = $app->getSession();
            $tableClass->setProject($ses->getProject());
            $tableClass->setPt($ses->getPt());
        }


        $app->prosesDao($dataListName, $this->prosesData($dao, $tableClass, $app));
    }

    public function prosesDataWithSession(Box_Kouti_Session $ses, $arrayReady = false) {
		
        $object = $this->getTableClass();
        $dao = $this->getDao();
        if ($object instanceof Box_Models_Master_InterProjectPt) {
            $object->setProject($ses->getProject());
            $object->setPt($ses->getPt());
        }

        $hasil = $this->getMethod($object);
		
        if ($arrayReady) {
            $allRecord = array();
            if (is_array($hasil)) {
                if (key_exists(1, $hasil)) {
                    foreach ($hasil[1] as $record) {

                        $data = $this->getTableClass();
                        $data->setArrayTable($record);
                        $allRecord[] = $data;
                    }
                }
            }
			
			
            return $allRecord;
        }
		
		

        return $hasil;
    }

    // added by Michael 2021.05.19
    public function prosesDataWithoutSession(Box_Kouti_Session $ses, $arrayReady = false, $data) {
        
        $object = $this->getTableClass();
        $dao = $this->getDao();

        $project = new Box_Models_Master_Project();
        $project->setId($data['project_id']);

        $pt = new Box_Models_Master_Pt();
        $pt->setId($data['project_id']);

        if ($object instanceof Box_Models_Master_InterProjectPt) {
            $object->setProject($project);
            $object->setPt($pt);
        }

        // $hasil = $this->getMethod($object);
        $hasil = $this->getMethod_CustomProjectPt($object,$data);
        
        if ($arrayReady) {
            $allRecord = array();
            if (is_array($hasil)) {
                if (key_exists(1, $hasil)) {
                    foreach ($hasil[1] as $record) {

                        $data = $this->getTableClass();
                        $data->setArrayTable($record);
                        $allRecord[] = $data;
                    }
                }
            }
            
            
            return $allRecord;
        }
        


        return $hasil;
    }
    // end added by Michael 2021.05.19

    //added by Michael 2022-12-27 | ambil dari FAMS
    public function prosesDataWithoutSessionFams(Box_Kouti_Session $ses, $arrayReady = false, $data) {
        
        $object = $this->getTableClass();
        $dao = $this->getDao();

        $project = new Box_Models_Master_Project();
        $project->setId($data['project_id']);

        $pt = new Box_Models_Master_Pt();
        $pt->setId($data['project_id']);

        if ($object instanceof Box_Models_Master_InterProjectPt) {
            $object->setProject($project);
            $object->setPt($pt);
        }

        // $hasil = $this->getMethod($object);
        $hasil = $this->getMethod_Fams($object,$data);
        
        if ($arrayReady) {
            $allRecord = array();
            if (is_array($hasil)) {
                if (key_exists(1, $hasil)) {
                    foreach ($hasil[1] as $record) {

                        $data = $this->getTableClass();
                        $data->setArrayTable($record);
                        $allRecord[] = $data;
                    }
                }
            }
            
            
            return $allRecord;
        }
        


        return $hasil;
    }
    //end added by Michael 2022-12-27


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

    abstract function prosesData(Box_Models_App_AbDao $dao, Box_Models_ObjectEmbedData $objectEmbedata, Box_Models_App_Models_ReadWorms $app);
    /* @return string */

    abstract function getTableClassName();
    /* @return Dao */

    abstract function getDao();
    /* @return class */

    abstract function getTableClass();
}

?>
