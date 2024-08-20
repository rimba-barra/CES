<?php

/**
 * Description of AbsentrecordController
 *
 * @author MIS
 */
class Hrd_PlafonkaryawanController extends Box_Models_App_Hermes_WingedBController {

    protected function testingFlag() {
        return FALSE;
    }
    
    
    
    public function saveRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        //  $dataList = new Box_Models_App_DataListCreator('', 'plafonkaryawanvalue', array('jenispengobatan'));


        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $data = $this->getAppData();

        $plafon = new Hrd_Models_Plafon_PlafonKaryawan();
        $plafon->setArrayTable($data);
        $validator = new Hrd_Models_Plafon_Validator();
        $validator->run($plafon);
        $msgError = "Processing...";
        $hasil = FALSE;
        if (!$validator->getStatus()) {
            $msgError = $validator->getMsg();
            $hasil = FALSE;
        } else {
            
            $dao = new Hrd_Models_Plafon_PlafonKaryawanDao();
            $hasil = $dao->save($plafon,$this->getAppSession());
            /*
            $de = new Box_Delien_DelimiterEnhancer();
            
            $de->setDelimiterCandidate($plafon);
            $de->generate();
            $dao = $this->getMainDao();
            $hasilDb = $dao->save($plafon,$this->getAppSession());
            $hasil = $hasilDb;
            $msgError = "SUCCESS";
             
             */
            
        }




        

        $otherAT = array(array(
                "RESULT" => $hasil,
                "MSG" => $msgError
        ));


        $dm->setHasil($otherAT);
        return $dm;
    }

    public function plafonkaryawanRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'plafonkaryawan', array('employee'), array());
        $dao = new Hrd_Models_Plafon_PlafonKaryawanDao();
        $plafon = new Hrd_Models_Plafon_PlafonKaryawan();

        $plafon->setArrayTable($this->getAppData());
        $plafon->setProject($this->getAppSession()->getProject());
        $plafon->setPt($this->getAppSession()->getPt());

        $dm->setDataList($dataList);
        $dm->setHasil($dao->getByEmployee($plafon));
        return $dm;
    }

    public function generateRead() {
        $dm = new Box_Models_App_Hermes_DataModel();

        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $creator = new Box_Models_App_Creator();
        $data = $this->getAppData();

        

        // get all employee
        $eDao = new Hrd_Models_Master_EmployeeDao();
        $em = new Hrd_Models_Master_EmployeePersonal();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $allEmployee = $eDao->getAllWOPL($em);
        $allPlafon = array();
        $count = 1;
        if (is_array($allEmployee) && isset($allEmployee[1])) {

            $de = new Box_Delien_DelimiterEnhancer();

            $tempAr = array();

            foreach ($allEmployee[1] as $em) {
                $plafonKaryawan = new Hrd_Models_Plafon_PlafonKaryawan();
                $plafonKaryawan->setId($count); // set temp id
                $plafonKaryawan->getEmployee()->setId($em["employee_id"]);
                $plafonKaryawan->setYear($data["year"]);
            

                $allPlafon[] = $plafonKaryawan;

                $count++;
            }
            //  var_dump($tempAr);
            $de = new Box_Delien_DelimiterEnhancer();
            $decan = new Box_Models_App_DecanForObject($allPlafon);
            $de->setDelimiterCandidate($decan);
            $de->generate();
            
            
            


            $dao = $this->getMainDao();
            $hasil = $dao->saveGen($this->getAppSession(), $decan);
        }




        $otherAT = array(array(
                "STATUS" => $hasil
        ));

        $dm->setHasil(array($otherAT));


        return $dm;
    }

    

    public function detailRead() {
        $dm = new Box_Models_App_Hermes_DataModel();

        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $creator = new Box_Models_App_Creator();



        $dao = new Hrd_Models_Pengobatan_Dao();



        $otherAT = array(array(
                "LISTYEARS" => $dao->getYears($this->getAppSession())
        ));

        $dm->setHasil(array($otherAT));


        return $dm;
    }

    

    protected function getDefaultProcessor() {
        return new Hrd_Models_App_Box_Processor();
    }

    protected function getMainDao() {
        return new Hrd_Models_Plafon_PlafonKaryawanDao();
    }

    protected function getMainFieldID() {
        return "plafonkaryawan_id";
    }

    protected function getMainObject() {
        return new Hrd_Models_Plafon_PlafonKaryawan();
    }

    protected function getMainValidator() {
        $v = new Hrd_Models_Plafon_Validator();
      
        return $v;
    }

}

?>
