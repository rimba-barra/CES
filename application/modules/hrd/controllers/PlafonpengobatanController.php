<?php

class Hrd_PlafonpengobatanController extends Box_Models_App_Hermes_AbstractController {

    protected function testingFlag() {
        return FALSE;
    }

    public function allRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'plafonpengobatan', array('jenispengobatan', 'group', 'ptkp'), array());
        $data = $this->getAppData();
        $dao = new Hrd_Models_Pengobatan_Dao();
        $plafon = new Hrd_Models_Pengobatan_Plafon();
        $plafon->setArrayTable($data);
        $plafon->getEmployeeGroup()->setId(isset($data["group_id"])?$data["group_id"]:0);
        $plafon->getType()->setId(isset($data["jenispengobatan_id"])?$data["jenispengobatan_id"]:0);

        $plafon->getEmployeePtkp()->setId(isset($data["ptkp_id"])?$data["ptkp_id"]:0);

        $plafon->setProject($this->getAppSession()->getProject());
        $plafon->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAll($this->getAppRequest(), $plafon);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function detailRead() {
        $dm = new Box_Models_App_Hermes_DataModel();

        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $creator = new Box_Models_App_Creator();

        $masterPT = new Hrd_Models_App_Mastertable_JenisPengobatan();
        $allPT = $masterPT->prosesDataWithSession($this->getAppSession(), TRUE);

        $masterG = new Hrd_Models_App_Mastertable_Group();
        $allG = $masterG->prosesDataWithSession($this->getAppSession(), TRUE);

        $dao = new Hrd_Models_Pengobatan_Dao();
        $allYears = $dao->getYears($this->getAppSession());
        
        $masterSk = new Hrd_Models_App_Mastertable_MasterSK();
        $allSk = $masterSk->prosesDataWithSession($this->getAppSession(), TRUE);
        
        $masterPtkp = new Hrd_Models_App_Mastertable_Ptkp();
        $allPtkp = $masterPtkp->prosesDataWithSession($this->getAppSession(), TRUE);
      
        if(count($allYears[1])==0){
            $allYears[1]=array(array("year"=>date("Y")));
        }


        $otherAT = array(array(
                "LISTYEARS" => $allYears
        ));

        $dm->setHasil(array($allPT, $allG,$allSk, $otherAT, $allPtkp));


        return $dm;
    }
    
    public function generateallgroupRead() {
        $hasil = FALSE;
        $params = $this->getAppData();
        $msg = "proses...";
        $isValid = FALSE;
        $data = json_decode($params["data"],TRUE);
      
        
        $plafon = new Hrd_Models_Pengobatan_Plafon();
        $plafon->setArrayTable($data);
        $plafon->setProject($this->getAppSession()->getProject());
        $plafon->setPt($this->getAppSession()->getPt());
        $plafon->setAddBy($this->getAppSession()->getUser()->getId());
        // validasi
        if ($plafon->getYear() == 0) {
            $msg = "Tahun tidak valid.";
        } else if ((strtotime($plafon->getStartDate())) > (strtotime($plafon->getEndDate()))) {
            $msg = "Periode tidak valid.";
        } else if ($plafon->getType()->getId() == 0) {
            $msg = "Jenis pengobatan tidak valid.";
        } else {
            $isValid = TRUE;
            $msg = "valid param";
        }
        
        // /validasi
        
        if($isValid){
            /// ambil semua golongan
            $gFilter = new Hrd_Models_Master_Group();
            $gFilter->setProject($this->getAppSession()->getProject());
            $gFilter->setPt($this->getAppSession()->getPt());
            
            $gDao = new Hrd_Models_Master_GroupDao();
           
            $gAll = $gDao->getAllWoF($gFilter);
            $gAll = Box_Tools::toObjectResult($gAll, new Hrd_Models_Master_Group());
          //  var_dump($gAll);
            if(count($gAll)==0){
                $msg = "Tidak ada daftar golongan.";
            }else{
                $allNewPlafon = array();
                foreach($gAll as $g){
                    $newPlafon = new Hrd_Models_Pengobatan_Plafon();
                    $newPlafon->setArrayTable($data);
                    $newPlafon->setEmployeeGroup($g);
                    $allNewPlafon[] = $newPlafon;
                }
                
                $decan = Box_Tools::toDecan($allNewPlafon);
               
                $dcResult = $decan->getDCResult();
                $groups = $dcResult["group_group_id"];
                
                $dao = new Hrd_Models_Pengobatan_Dao();
                $hasil = $dao->saveGenerateByGroup($plafon, $groups);
                if($hasil){
                    $msg = "Sukses";
                }
            }
        }
        
        
     

        $arrayRespon = array("HASIL" => $hasil, "MSG" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function generateallptkpRead() {
        $hasil = FALSE;
        $params = $this->getAppData();
        $msg = "proses...";
        $isValid = FALSE;
        $data = json_decode($params["data"],TRUE);
      
        
        $plafon = new Hrd_Models_Pengobatan_Plafon();
        $plafon->setArrayTable($data);
        $plafon->setProject($this->getAppSession()->getProject());
        $plafon->setPt($this->getAppSession()->getPt());
        $plafon->setAddBy($this->getAppSession()->getUser()->getId());
        // validasi
        if ($plafon->getYear() == 0) {
            $msg = "Tahun tidak valid.";
        } else if ((strtotime($plafon->getStartDate())) > (strtotime($plafon->getEndDate()))) {
            $msg = "Periode tidak valid.";
        } else if ($plafon->getType()->getId() == 0) {
            $msg = "Jenis pengobatan tidak valid.";
        } else {
            $isValid = TRUE;
            $msg = "valid param";
        }
        
        // /validasi
        
        if($isValid){
            /// ambil semua golongan
            $gFilter = new Hrd_Models_Master_Ptkp_Ptkp();
            $gFilter->setProjectid($this->getAppSession()->getProject());
            $gFilter->setPtid($this->getAppSession()->getPt());
            
            $gDao = new Hrd_Models_Master_Ptkp_Dao();
           
            $gAll = $gDao->getAllWoPL($gFilter);
            $gAll = Box_Tools::toObjectResult($gAll, new Hrd_Models_Master_Ptkp_Ptkp());
          //  var_dump($gAll);
            if(count($gAll)==0){
                $msg = "Tidak ada daftar ptkp.";
            }else{
                $allNewPlafon = array();
                foreach($gAll as $g){
                    $newPlafon = new Hrd_Models_Pengobatan_Plafon();
                    $newPlafon->setArrayTable($data);
                    $newPlafon->setEmployeePtkp($g);
                    $allNewPlafon[] = $newPlafon;
                }
                
                $decan = Box_Tools::toDecan($allNewPlafon);
               
                $dcResult = $decan->getDCResult();
                $ptkp = $dcResult["ptkp_id"];
                
                $dao = new Hrd_Models_Pengobatan_Dao();
                $hasil = $dao->saveGenerateByPtkp($plafon, $ptkp);
                if($hasil){
                    $msg = "Sukses";
                }
            }
        }
        
        
     

        $arrayRespon = array("HASIL" => $hasil, "MSG" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function generateallgroupptkpRead() {
        $hasil = FALSE;
        $params = $this->getAppData();
        $msg = "proses...";
        $isValid = FALSE;
        $data = json_decode($params["data"],TRUE);
      
        
        $plafon = new Hrd_Models_Pengobatan_Plafon();
        $plafon->setArrayTable($data);
        $plafon->setProject($this->getAppSession()->getProject());
        $plafon->setPt($this->getAppSession()->getPt());
        $plafon->setAddBy($this->getAppSession()->getUser()->getId());
        // validasi
        if ($plafon->getYear() == 0) {
            $msg = "Tahun tidak valid.";
        } else if ((strtotime($plafon->getStartDate())) > (strtotime($plafon->getEndDate()))) {
            $msg = "Periode tidak valid.";
        } else if ($plafon->getType()->getId() == 0) {
            $msg = "Jenis pengobatan tidak valid.";
        } else {
            $isValid = TRUE;
            $msg = "valid param";
        }
        
        // /validasi
        
        if($isValid){
            /// ambil semua golongan
            $gFilter = new Hrd_Models_Master_Group();
            $gFilter->setProject($this->getAppSession()->getProject());
            $gFilter->setPt($this->getAppSession()->getPt());
            
            $gDao = new Hrd_Models_Master_GroupDao();
           
            $gAll = $gDao->getAllWoF($gFilter);
            $gAll = Box_Tools::toObjectResult($gAll, new Hrd_Models_Master_Group());

            /// ambil semua ptkp
            $pFilter = new Hrd_Models_Master_Ptkp_Ptkp();
            $pFilter->setProjectid($this->getAppSession()->getProject());
            $pFilter->setPtid($this->getAppSession()->getPt());
            
            $pDao = new Hrd_Models_Master_Ptkp_Dao();
           
            $pAll = $pDao->getAllWoPL($pFilter);
            $pAll = Box_Tools::toObjectResult($pAll, new Hrd_Models_Master_Ptkp_Ptkp());
          //  var_dump($gAll);
            if(count($gAll)==0 && count($pAll)==0){
                $msg = "Tidak ada daftar golongan.";
            }else{
                $allNewPlafon = array();
                // foreach($gAll as $g){
                //     foreach($pAll as $p){
                //         $newPlafon = new Hrd_Models_Pengobatan_Plafon();
                //         $newPlafon->setArrayTable($data);
                //         $newPlafon->setEmployeeGroup($g);
                //         $newPlafon->setEmployeePtkp($p);
                //         $allNewPlafon[] = $newPlafon;
                //     }
                // }
                foreach($gAll as $g){
                    $newPlafon = new Hrd_Models_Pengobatan_Plafon();
                    $newPlafon->setArrayTable($data);
                    $newPlafon->setEmployeeGroup($g);
                    $allNewPlafon[] = $newPlafon;
                }

                $allNewPlafon_p = array();
                foreach($pAll as $p){
                    $newPlafon_p = new Hrd_Models_Pengobatan_Plafon();
                    $newPlafon_p->setArrayTable($data);
                    $newPlafon_p->setEmployeePtkp($p);
                    $allNewPlafon_p[] = $newPlafon_p;
                }

                
                $decan = Box_Tools::toDecan($allNewPlafon);
                $decan_p = Box_Tools::toDecan($allNewPlafon_p);
               
                $dcResult = $decan->getDCResult();
                $dcResult_p = $decan_p->getDCResult();

                $groups = $dcResult["group_group_id"];
                $ptkp = $dcResult_p["ptkp_id"];
                
                $dao = new Hrd_Models_Pengobatan_Dao();
                $hasil = $dao->saveGenerateByGroupPtkp($plafon, $groups, $ptkp);
                if($hasil){
                    $msg = "Sukses";
                }
            }
        }
        
        
     

        $arrayRespon = array("HASIL" => $hasil, "MSG" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function generateplafonRead() {
        $dm = new Box_Models_App_Hermes_DataModel();

        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        //$dao = new Hrd_Models_Pengobatan_Dao();
        /// get all golongan
        $gDao = new Hrd_Models_Master_GroupDao();
        $gAll = $gDao->getAll($this->getAppRequest(), new Hrd_Models_Master_Group());



        /// get all jenis plafon
        $jDao = new Hrd_Models_Pengobatan_TypeDao();
        $jAll = $jDao->getAll($this->getAppRequest(), new Hrd_Models_Pengobatan_Type());

        /// create all record for all golongan all jenis plafon
        if (key_exists(1, $jAll) && key_exists(1, $gAll)) {
            $jAll = $jAll[1];
            $gAll = $gAll[1];
            $allPlafon = array();
            foreach ($gAll as $g) {
                foreach ($jAll as $j) {
                    $plafon = new Hrd_Models_Pengobatan_Plafon();
                    $plafon->getType()->setId($j["jenispengobatan_id"]);
                    $plafon->getEmployeeGroup()->setId($g["group_id"]);
                    $plafon->setStartDate(date("Y-m-d"));
                    $plafon->setEndDate(date("Y-m-d"));
                    $plafon->setYear(date("Y"));
                    $allPlafon[] = $plafon;
                }
            }
            $de = new Box_Delien_DelimiterEnhancer();
            $decan = new Box_Models_App_DecanForObject($allPlafon);
            $de->setDelimiterCandidate($decan);
            $de->generate();
            
            $dao = new Hrd_Models_Pengobatan_Dao();
            $hasil = $dao->saveGenerated($decan,$this->getAppSession());
            
        }



        


        $otherAT = array(array(
                "STATUS" => $hasil
        ));

        $dm->setHasil(array($otherAT));


        return $dm;
    }

    public function copyfromoldRead() {
        $dm = new Box_Models_App_Hermes_DataModel();

        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $dao = new Hrd_Models_Pengobatan_Dao();


        $otherAT = array(array(
                "STATUS" => $dao->copyfromold($this->getAppSession())
        ));

        $dm->setHasil(array($otherAT));


        return $dm;
    }

    public function maindetailRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'employeepersonal', array('religion', 'department', 'bloodgroup', 'education', 'marriagestatus', 'spouse', 'division', 'position', 'group', 'groupposition', 'employeestatus', 'statusinformation', array("relation", "mother_"), array("relation", "father_")), array("detail", "educations", "relation", "saudaras", "childs", "jobhistories", "trainings", "deleted", "skills", "organizations"));
        //$dao = new Erems_Models_Payment_Dao();
        $employee = new Hrd_Models_Master_EmployeePersonal();

        $employee->setArrayTable($this->getAppData());
        $dao = new Hrd_Models_Master_EmployeeDao();
        $hasil = $dao->getDetail($employee);

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function mainDelete() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setObject(new Hrd_Models_Pengobatan_Plafon());
        $dm->setDao(new Hrd_Models_Pengobatan_Dao());
        $dm->setIdProperty("plafonpengobatan_id");
        return $dm;
    }

    public function mainCreate() {

        $dm = new Box_Models_App_Hermes_DataModel();
        $plafon = new Hrd_Models_Pengobatan_Plafon();

        $dm->setDao(new Hrd_Models_Pengobatan_Dao());
        $dm->setValidator(new Hrd_Models_Pengobatan_Validator());
        $dm->setObject($plafon);

        return $dm;
    }

    protected function getDefaultProcessor() {
        return new Hrd_Models_App_Box_Processor();
    }

}

?>