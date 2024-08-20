<?php

/**
 * 
 *
 * @author MIS
 */
class Hrd_SetuppayrollController extends Box_Models_App_Hermes_AbstractController {

    protected function testingFlag() {
        return FALSE;
    }

    public function allRead() {

        $data = $this->getAppData();
      
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'setuppayroll', array(), array());
        $dao = new Hrd_Models_Payroll_Setup_Dao();
        $s = new Hrd_Models_Payroll_Setup_Setup();
        $s->setProject($this->getAppSession()->getProject());
        $s->setPt($this->getAppSession()->getPt());
        $hasil =  $dao->getAll($this->getAppRequest(),$s);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    
    public function mainRead() {

        $data = $this->getAppData();
      
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'setuppayroll', array('komponengaji'), array());
        $dao = new Hrd_Models_Payroll_Setup_Dao();
        $s = new Hrd_Models_Payroll_Setup_Setup();
        $s->setArrayTable($this->getAppData());
        $s->setProject($this->getAppSession()->getProject());
        $s->setPt($this->getAppSession()->getPt());
        $hasil =  $dao->getAll($this->getAppRequest(),$s);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    
    public function deleteRead() {
        $data = $this->getAppData();
        $dao = new Hrd_Models_Payroll_Setup_Dao();
        $success = $dao->deleteOne($data["id"], $this->getAppSession()->getUser()->getId());

        return Box_Tools::instantRead(array(
                    "SUCCESS" => $success
        ));
    }
    
    

    public function parameterRead() {


        $mc = new Hrd_Models_App_Mastertable_KomponenGaji();
        $cc = $mc->prosesDataWithSession($this->getAppSession(), TRUE);


        $mb = new Hrd_Models_App_Mastertable_GroupPayroll();
        $bb = $mb->prosesDataWithSession($this->getAppSession(), TRUE);


        return Box_Tools::instantRead(array(
                    "HASIL" => 1
                        ), array($cc,$bb));
    }

    public function generateRead() {

        $hasil = FALSE;
        $msg = "Process...";
        $data = $this->getAppData();
        $bulan = $data["month"];
        $tahun = $data["year"];
        $bulanTahun = $data["monthyear"];


        $daoVG = new Hrd_Models_Payroll_Variabel_Dao();
        $vg = new Hrd_Models_Payroll_Variabel_Variabel();
        $vg->setProject($this->getAppSession()->getProject());
        $vg->setPt($this->getAppSession()->getPt());

        $dataVG = $daoVG->getAllWOPL($vg);
        unset($vg);

        $daoE = new Hrd_Models_Master_EmployeeDao();
        $em = new Hrd_Models_Employee_Employee();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dataE = $daoE->getAllWOPL($em);
        unset($em);
        $allEt = array(); /// hold all edit tunjangan
        if (Box_Tools::adaRecord($dataE)) {
            $dataE = Box_Tools::toObjectsb("employee", $dataE, FALSE);

            if (Box_Tools::adaRecord($dataVG)) {
                $dataVG = Box_Tools::toObjectsb("variabelgaji", $dataVG, FALSE);

                foreach ($dataE as $em) {
                    foreach ($dataVG as $vg) {
                    
                        $et = new Hrd_Models_Payroll_Edittunjangan_EditTunjangan();
                        $et->setEmployee($em);
                        $et->setMonth($bulan);
                        $et->setYear($tahun);
                        $et->setMonthYear($bulanTahun);
                        $et->setKomponen($vg->getKomponenGaji());
                        $allEt[] = $et;
                    }
                }
            } else {
                $msg = "Tidak ada data variabel gaji";
            }
        } else {
            $msg = "Tidak ada data karyawan";
        }

        if (count($allEt) > 0) {
            $decan = Box_Tools::toDecan($allEt);
            
       

            $dao = new Hrd_Models_Payroll_Edittunjangan_Dao();
            $hasil = $dao->generateSave($decan, $this->getAppSession());
        }




        return Box_Tools::instantRead(array(
                    "HASIL" => $hasil,
                    "MSG" => $msg
                        ), array());
    }

    public function mainCreate() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $c = new Hrd_Models_Payroll_Setup_Setup();
        
        $dm->setDao(new Hrd_Models_Payroll_Setup_Dao());
        $dm->setValidator(new Hrd_Models_Payroll_Setup_Validator());
        $dm->setObject($c);
       
        return $dm;
    }

    /* public function mainDelete() {
      $dm = new Box_Models_App_Hermes_DataModel();
      $dm->setObject(new Hrd_Models_Sanction_Sanction());
      $dm->setDao(new Hrd_Models_Sanction_Dao());
      $dm->setIdProperty("sanction_id");
      return $dm;
      } */

    protected function getDefaultProcessor() {
        return new Hrd_Models_App_Box_Processor();
    }

}

?>
