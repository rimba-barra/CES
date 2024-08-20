<?php

/**
 * Description of AbsentrecordController
 *
 * @author MIS
 */
class Hrd_ProsesgajiController extends Box_Models_App_Hermes_AbstractController {

    protected function testingFlag() {
        return FALSE;
    }

    public function allRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'prosesgaji', array('employee'));
        $dao = new Hrd_Models_Payroll_Proses_Dao();
        $header = new Hrd_Models_Payroll_Proses_Gaji();

        $data = $this->getAppData();


        //$this->setArrayTable($leave,$this->getAppData());
        $header->setArrayTable($data);
        if (key_exists("monthyear", $data)) {
            $my = Box_Tools::splitMonthYear($data["monthyear"]);
            $header->setMonth($my[0]);
            $header->setYear($my[1]);
        }


        $header->setProject($this->getAppSession()->getProject());
        $header->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAll($this->getAppRequest(), $header);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function periodeRead() {

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'prosesgaji', array(), array());
        $dao = new Hrd_Models_Payroll_Proses_Dao();
        $pg = new Hrd_Models_Payroll_Proses_Gaji();
        $pg->setArrayTable($this->getAppData());
        $pg->setProject($this->getAppSession()->getProject());
        $pg->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getPeriode($pg);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function groupRead() {

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'prosesgaji', array(), array());
        $dao = new Hrd_Models_Payroll_Proses_Dao();
        $pg = new Hrd_Models_Payroll_Proses_Gaji();

        $data = $this->getAppData();
        $my = Box_Tools::splitMonthYear($data["monthyear"]);


        $pg->setArrayTable($data);
        $pg->setMonth($my[0]);
        $pg->setYear($my[1]);
        $pg->setProject($this->getAppSession()->getProject());
        $pg->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getGroup($pg);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function komponenRead() {

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'komponengaji', array(), array());
        $dao = new Hrd_Models_Payroll_Proses_Dao();
        $pg = new Hrd_Models_Payroll_Proses_Gaji();

        $data = $this->getAppData();

        $my = Box_Tools::splitMonthYear($data["monthyear"]);



        $pg->setArrayTable($this->getAppData());
        $pg->setMonth($my[0]);
        $pg->setYear($my[1]);
        $pg->setProject($this->getAppSession()->getProject());
        $pg->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getKomponen($pg);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function komponengajiRead() {

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'prosesgaji', array(), array());
        $dao = new Hrd_Models_Payroll_Proses_Dao();
        $pg = new Hrd_Models_Payroll_Proses_Gaji();
        $pg->setArrayTable($this->getAppData());
        $pg->setProject($this->getAppSession()->getProject());
        $pg->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getPeriode($pg);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function maindetailRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'transfer', array('komponengaji'), array('detail'));
        $dao = new Hrd_Models_Payroll_Transfer_Dao();
        $header = new Hrd_Models_Payroll_Transfer_Transfer();

        //$this->setArrayTable($leave,$this->getAppData());
        $header->setArrayTable($this->getAppData());
        $header->setProject($this->getAppSession()->getProject());
        $header->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAll($this->getAppRequest(), $header);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function alltransferRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'transfer', array('employee'));
        $dao = new Hrd_Models_Payroll_Transfer_Dao();
        $header = new Hrd_Models_Payroll_Transfer_Transfer();

        //$this->setArrayTable($leave,$this->getAppData());
        $header->setArrayTable($this->getAppData());
        $header->setProject($this->getAppSession()->getProject());
        $header->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAll($this->getAppRequest(), $header);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function deleteRead() {
        $data = $this->getAppData();
        $dao = new Hrd_Models_Payroll_Transfer_Dao();
        $success = $dao->deleteOne($data["id"], $this->getAppSession()->getUser()->getId());

        return Box_Tools::instantRead(array(
                    "SUCCESS" => $success
        ));
    }

    public function generatenextRead() {
        $data = $this->getAppData();
        $hasil = FALSE;
        $month = $data["month"];
        $year = $data["year"];
        $allKom = FALSE;
        $allEm = FALSE;
        $msg = "...";

        $proses = new Hrd_Models_Payroll_Proses_Proses();
        $hasilProses = $proses->run($this->getAppSession(), $month, $year);

        if (!$hasilProses) {
            $msg = $proses->getMsg();
        } else {
            $decan = Box_Tools::toDecan($hasilProses);
            $dao = new Hrd_Models_Payroll_Proses_Dao();
            $pg = new Hrd_Models_Payroll_Proses_Gaji();
            $pg->setAddBy($this->getAppSession()->getUser()->getId());
            $pg->setProject($this->getAppSession()->getProject());
            $pg->setPt($this->getAppSession()->getPt());
            $pg->setMonth($month);
            $pg->setYear($year);
            $pg->setMonthYear(Box_Tools::akda($month) . "/" . $year);
            $hasil = $dao->save($pg, $decan);
            if (!$hasil) {
                $msg = "Terjadi kesalahan pada saat penyimpanan data";
            }
        }




        return Box_Tools::instantRead(array(
                    "HASIL" => $hasil,
                    "MSG" => $msg
        ));
    }

    public function parameterRead() {




        $ma = new Hrd_Models_App_Mastertable_KomponenGaji();
        $aa = $ma->prosesDataWithSession($this->getAppSession(), TRUE);


        /// get all transfer data
        $dao = new Hrd_Models_Payroll_Transfer_Dao();
        $header = new Hrd_Models_Payroll_Transfer_Transfer();

        //$this->setArrayTable($leave,$this->getAppData());
        $header->setArrayTable($this->getAppData());
        $header->setProject($this->getAppSession()->getProject());
        $header->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAllForBatchFilter($this->getAppRequest(), $header);
        $allTd = array(); // transfer data
        $allBatch = array();
        if (Box_Tools::adaRecord($hasil)) {

            $allTd = Box_Tools::toObjects("transfer", $hasil, FALSE);
        }



        $allPeriode = array();
        if (count($allTd) > 0) {
            foreach ($allTd as $transfer) {
                $allBatch[] = array($transfer->getBatch(), $transfer->getMonthYear());

                $my = $transfer->getMonthYear();
                if (!in_array($my, $allPeriode)) {
                    $allPeriode[] = $my;
                }
            }
        }



        return Box_Tools::instantRead(array(
                    "HASIL" => 1,
                    "BATCH" => $allBatch,
                    "MY" => $allPeriode,
                        ), array(
                    $aa
        ));
    }

    public function employeeRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'employee', array('department'), array());
        $dao = new Hrd_Models_Master_EmployeeDao();
        $employee = new Hrd_Models_Master_EmployeePersonal();
        //$employee->setArrayTable($this->getAppData());
        $this->setArrayTable($employee, $this->getAppData());

        $employee->setProject($this->getAppSession()->getProject());
        $employee->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAllEP($this->getAppRequest(), $employee);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function mainCreate() {

        $dm = new Box_Models_App_Hermes_DataModel();
        $obj = new Hrd_Models_Payroll_Transfer_Transfer();

        $dm->setDao(new Hrd_Models_Payroll_Transfer_Dao());
        $dm->setValidator(new Hrd_Models_Payroll_Transfer_Validator());
        $dm->setObject($obj);

        return $dm;
    }

    protected function getDefaultProcessor() {
        return new Hrd_Models_App_Box_Processor();
    }

}

?>
