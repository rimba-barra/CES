<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of PlafonkaryawanController
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

        $pm = new Hrd_Models_Plafon_PlafonMixer();
        $plafon = $pm->unmix($data);
        $plafon->setArrayTable($data);
        $plafon->setProject($this->getAppSession()->getProject());
        $plafon->setPt($this->getAppSession()->getPt());

        $validator = new Hrd_Models_Plafon_Validator();
        $validator->run($plafon);
        $msgError = "Processing...";
        $hasil = FALSE;
        if (!$validator->getStatus()) {
            $msgError = $validator->getMsg();
            $hasil = FALSE;
        } else {
            $de = new Box_Delien_DelimiterEnhancer();
            
            $de->setDelimiterCandidate($plafon);
            $de->generate();
            $dao = $this->getMainDao();
            $hasilDb = $dao->save($plafon,$this->getAppSession());
            $hasil = $hasilDb;
            $msgError = "SUCCESS";
            
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
        //  $dataList = new Box_Models_App_DataListCreator('', 'plafonkaryawanvalue', array('jenispengobatan'));


        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $st = $this->getMainObject();
        $st->setArrayTable($this->getAppData());
        $st->setProject($this->getAppSession()->getProject());
        $st->setPt($this->getAppSession()->getPt());
        $dao = $this->getMainDao();
        $data = $this->getAppData();
        $year = isset($data["year"]) ? $data["year"] : 0;
        $st->setYear($year);
        $hasil = $dao->getByEmployee($st);
        $objects = Box_Tools::toObjects('plafonkaryawanvalue', $hasil);



        $hasil = Hrd_Models_Plafon_PlafonMixer::mix($objects);



        $otherAT = array(array(
                "PLAFONKARYAWAN" => $hasil
        ));


        $dm->setHasil($otherAT);
        return $dm;
    }

    public function generateRead() {
        $dm = new Box_Models_App_Hermes_DataModel();

        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $creator = new Box_Models_App_Creator();
        $data = $this->getAppData();

        // get list plafon
        $dao = new Hrd_Models_Pengobatan_Dao();
        $plafon = new Hrd_Models_Pengobatan_Plafon();
        $plafon->setProject($this->getAppSession()->getProject());
        $plafon->setPt($this->getAppSession()->getPt());
        $plafon->setYear(isset($data["year"]) ? $data["year"] : 0);
        $plafonByYear = $dao->getAll($this->getAppRequest(), $plafon);
        if (is_array($plafonByYear) && isset($plafonByYear[1])) {
            //var_dump($plafonByYear[1]);
        }

        // get all employee
        $eDao = new Hrd_Models_Master_EmployeeDao();
        $em = new Hrd_Models_Master_EmployeePersonal();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $allEmployee = $eDao->getAllEP($this->getAppRequest(), $em);
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
                $plafonKaryawan->setIsGlobal(0);
                foreach ($plafonByYear[1] as $pf) {
                    if ($em["group_id"] == $pf["group_id"]) {
                        $plafonValue = new Hrd_Models_Plafon_PlafonKaryawanValue();
                        $plafonValue->getPlafonKaryawan()->setId($count);
                        $plafonValue->getType()->setId($pf["jenispengobatan_id"]);
                        $plafonValue->setValue($pf["value"]);
                        $plafonKaryawan->addDetail($plafonValue);
                    }
                }
                // $allPlafon[] = $plafonKaryawan;

                $de->setDelimiterCandidate($plafonKaryawan);
                $de->generate();

                // merge all detail
                if ($plafonKaryawan->getDCResult()) { // jika ada detail
                    foreach ($plafonKaryawan->getDCResult() as $k => $v) {
                        if (key_exists($k, $tempAr)) {
                            $tempAr[$k] = $tempAr[$k] . '~' . $v;
                        } else {
                            $tempAr[$k] = $v;
                        }
                    }
                    $allPlafon[] = $plafonKaryawan;
                }

                $count++;
            }
            //  var_dump($tempAr);
            $de = new Box_Delien_DelimiterEnhancer();
            $decan = new Box_Models_App_DecanForObject($allPlafon);
            $de->setDelimiterCandidate($decan);
            $de->generate();
            
            
            


            $dao = $this->getMainDao();
            $hasil = $dao->saveGen($this->getAppSession(), $decan, $tempAr);
        }




        $otherAT = array(array(
                "STATUS" => $hasil
        ));

        $dm->setHasil(array($otherAT));


        return $dm;
    }

    /*
      public function generateRead() {
      $dm = new Box_Models_App_Hermes_DataModel();

      $dm->setDirectResult(TRUE);
      $dm->setRequiredDataList(FALSE);
      $dm->setRequiredModel(FALSE);

      $creator = new Box_Models_App_Creator();
      $data = $this->getAppData();

      // get list plafon
      $dao = new Hrd_Models_Pengobatan_Dao();
      $plafon = new Hrd_Models_Pengobatan_Plafon();
      $plafon->setProject($this->getAppSession()->getProject());
      $plafon->setPt($this->getAppSession()->getPt());
      $plafon->setYear(isset($data["year"]) ? $data["year"] : 0);
      $plafonByYear = $dao->getAll($this->getAppRequest(), $plafon);
      if (is_array($plafonByYear) && isset($plafonByYear[1])) {
      //var_dump($plafonByYear[1]);
      }

      // get all employee
      $eDao = new Hrd_Models_Master_EmployeeDao();
      $em = new Hrd_Models_Master_EmployeePersonal();
      $em->setProject($this->getAppSession()->getProject());
      $em->setPt($this->getAppSession()->getPt());
      $allEmployee = $eDao->getAllEP($this->getAppRequest(), $em);
      $allPlafon = array();
      if (is_array($allEmployee) && isset($allEmployee[1])) {
      foreach ($allEmployee[1] as $em) {
      $empPlafon = new Hrd_Models_Pengobatan_PlafonKaryawan();
      $empPlafon->setYear($plafon->getYear());
      $empPlafon->getEmployee()->setId($em["employee_id"]);

      foreach ($plafonByYear[1] as $pf) {
      if ($em["group_id"] == $pf["group_id"]) {

      //$empPlafon->get

      if ($pf["jenispengobatan_id"] == Box_Config::PLAFON_RAWATINAP) {
      $empPlafon->setRawatInap($pf["value"]);
      }
      if ($pf["jenispengobatan_id"] == Box_Config::PLAFON_SALINNORMAL) {
      $empPlafon->setSalinNormal($pf["value"]);
      }
      if ($pf["jenispengobatan_id"] == Box_Config::PLAFON_SALINABNORMAL) {
      $empPlafon->setSalinAbNormal($pf["value"]);
      }
      if ($pf["jenispengobatan_id"] == Box_Config::PLAFON_HAMIL) {
      $empPlafon->setKehamilan($pf["value"]);
      }
      if ($pf["jenispengobatan_id"] == Box_Config::PLAFON_KB) {
      $empPlafon->setKeluargaBerencana($pf["value"]);
      }
      if ($pf["jenispengobatan_id"] == Box_Config::PLAFON_CEKUP) {
      $empPlafon->setCekup($pf["value"]);
      }
      if ($pf["jenispengobatan_id"] == Box_Config::PLAFON_LENSA) {
      $empPlafon->setLensa($pf["value"]);
      }
      if ($pf["jenispengobatan_id"] == Box_Config::PLAFON_FRAME) {
      $empPlafon->setFrame($pf["value"]);
      }


      }
      }

      $allPlafon[] = $empPlafon;
      }


      $de = new Box_Delien_DelimiterEnhancer();
      $decan = new Box_Models_App_DecanForObject($allPlafon);
      $de->setDelimiterCandidate($decan);
      $de->generate();




      $dao = $this->getMainDao();
      $hasil = $dao->saveGen($decan,$this->getAppSession());
      }




      $otherAT = array(array(
      "STATUS" => $hasil
      ));

      $dm->setHasil(array($otherAT));


      return $dm;
      }
     */

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
        return new Hrd_Models_Pengobatan_PlafonKaryawanValidator();
    }

    protected function getDefaultProcessor() {
        return new Hrd_Models_App_Box_Processor();
    }

}

?>
