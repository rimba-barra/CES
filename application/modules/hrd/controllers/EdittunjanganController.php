<?php

/**
 * 
 *
 * @author MIS
 */
class Hrd_EdittunjanganController extends Box_Models_App_Hermes_AbstractController {

    protected function testingFlag() {
        return FALSE;
    }

    public function allRead() {
        $paramLains = NULL;
        // param lain lain

        $dao = new Hrd_Models_Payroll_Edittunjangan_Dao();
        $p = new Hrd_Models_Payroll_Edittunjangan_EditTunjangan();
        $p->setProject($this->getAppSession()->getProject());
        $p->setPt($this->getAppSession()->getPt());
        $params = $dao->getAll($this->getAppRequest(), $p);
        if (Box_Tools::adaRecord($params)) {
            $paramLains = Box_Tools::toObjects('edittunjangan', $params, FALSE);
        }





        return Box_Tools::instantRead(array(
                    "HASIL" => 1
                        ), array($paramLains
        ));
    }
    
    public function periodeRead() {
        $paramLains = NULL;
        // param lain lain

        $dao = new Hrd_Models_Payroll_Edittunjangan_Dao();
        $data =  $dao->getMonthYear($this->getAppSession());
      



        return Box_Tools::instantRead(array(
                    "HASIL" => 1,
                    "DATA" => $data
                        ), array(
        ));
    }
    
    public function employeeRead() {
        $paramLains = NULL;
        // param lain lain

        $data = $this->getAppData();
      
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'employee', array('department'), array());
        $dao = new Hrd_Models_Payroll_Edittunjangan_Dao();
        $hasil =  $dao->getEmployee($this->getAppSession(),$data["month"],$data["year"]);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    
    public function valueRead() {
        $paramLains = NULL;
        // param lain lain

        $data = $this->getAppData();
      
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'edittunjangan', array('komponengaji'), array());
        $dao = new Hrd_Models_Payroll_Edittunjangan_Dao();
        $hasil =  $dao->getValue($this->getAppSession(),$data["month"],$data["year"],$data["employee_id"]);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function parameterRead() {




        $mb = new Hrd_Models_App_Mastertable_Department();
        $bb = $mb->prosesDataWithSession($this->getAppSession(), TRUE);


        return Box_Tools::instantRead(array(
                    "HASIL" => 1
                        ), array($bb));
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
        $dm->setUseProcess(FALSE);

        $data = $this->getAppData();
        $hasilSave = FALSE;
        $msg = "Process...";


        $allValue = $data["data"];
        if(count($allValue) > 0){
            $fixAllValue = array();
            foreach ($allValue as $v){
                $et = new Hrd_Models_Payroll_Edittunjangan_EditTunjangan();
                $et->setArrayTable($v);
                $fixAllValue[] = $et;
            }
            if(count($fixAllValue) > 0){
                $decan = Box_Tools::toDecan($fixAllValue);
                $dao = new Hrd_Models_Payroll_Edittunjangan_Dao();
                $hasilSave = $dao->updateValue($decan,$this->getAppSession());
            }
        }
     
  

        



        $dm->setHasil(array("msg" => $msg, "status" => $hasilSave ? TRUE : FALSE));
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
