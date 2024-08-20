<?php

/**
 * Description of AbsentrecordController
 *
 * @author MIS
 */
class Hrd_AnggarantrainingController extends Box_Models_App_Hermes_AbstractController {

    protected function testingFlag() {
        return FALSE;
    }

    public function allRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'anggarantraining', array('employee', 'department'));
        $dao = new Hrd_Models_Training_AnggaranDao();
        $header = new Hrd_Models_Training_Anggaran();

        //$this->setArrayTable($leave,$this->getAppData());
        $data = $this->getAppData();
        $year = isset($data["year"])?$data["year"]:0;
        $department = isset($data["department_id"])?$data["department_id"]:0;

        $hasil = $dao->getAllByDepartment($this->getAppRequest(), $this->getAppSession(), $year, $department);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function deleteRead() {
        $data = $this->getAppData();
        $dao = new Hrd_Models_Training_AnggaranDao();
        $success = $dao->deleteOne($data["id"], $this->getAppSession()->getUser()->getId());

        return Box_Tools::instantRead(array(
                    "SUCCESS" => $success
        ));
    }

    public function parameterRead() {

        $ma = new Hrd_Models_App_Mastertable_Department();
        $aa = $ma->prosesDataWithSession($this->getAppSession(), TRUE);

        $dao = new Hrd_Models_Training_AnggaranDao();
        $allyear = $dao->getAllYear($this->getAppSession());

        if (Box_Tools::adaRecordSimple($allyear)) {
            // $allYear = $allyear[0][0];

            $temp = array();
            foreach ($allyear[0] as $y) {

                $temp[] = $y["year"];
            }
            $allyear = $temp;
        } else {

            $allYear = FALSE;
        }


        return Box_Tools::instantRead(array(
                    "HASIL" => 1,
                    "YEARS" => $allyear
                        ), array($aa));
    }

    public function generateRead() {

        $hasil = FALSE;

        $data = $this->getAppData();
        $year = intval($data["year"]);
        $msg = "Process...";

        $aDao = new Hrd_Models_Training_AnggaranDao();

        $dao = new Hrd_Models_Master_EmployeeDao();
        $em = new Hrd_Models_Master_Employee();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $allEm = $dao->getAllWOPL($em);
        
        if (Box_Tools::adaRecord($allEm)) {
            
            $allEm = Box_Tools::toObjects("employee", $allEm, FALSE);
            
            $allAng = array();

            // cek jika copy dari tahun sebelumnya
            if (intval($data["is_copy"]) == 1) {
                $tahunBefore = $year - 1;
                $allAnggaranBefore = $aDao->getAllByYear($this->getAppSession(), $tahunBefore);
                $allAnggaranBefore = Box_Tools::toObjects("anggarantraining", $allAnggaranBefore, FALSE);
                if (Box_Tools::adaRecord($allAnggaranBefore)) {
                    $isFound = FALSE;
                    foreach ($allEm as $em) {

                        $anggaran = new Hrd_Models_Training_Anggaran();
                        
                        foreach ($allAnggaranBefore as $anggaranBefore) {
                            if ($anggaranBefore->getEmployee()->getId() == $em->getId()) {

                                $anggaran->setNilai($anggaranBefore->getNilai());

                                $isFound = TRUE;
                            }
                        }
                        /// jika tidak ada data sebelumnya set nilai 0
                        if (!$isFound) {


                            $anggaran->setNilai(0);
                        }
                        $anggaran->setYear($year);
                        $anggaran->setEmployee($em);
                        $anggaran->setPemakaian(0);
                        $anggaran->setSisa(0);
                        $allAng[] = $anggaran;
                        $isFound = FALSE;
                    }
                } else {
                    foreach ($allEm as $em) {
                        $anggaran = new Hrd_Models_Training_Anggaran();
                        $anggaran->setYear($year);
                        $anggaran->setEmployee($em);
                        $anggaran->setNilai(0);
                        $anggaran->setPemakaian(0);
                        $anggaran->setSisa(0);
                        $allAng[] = $anggaran;
                    }
                }
            } else {
                foreach ($allEm as $em) {
                    $anggaran = new Hrd_Models_Training_Anggaran();
                    $anggaran->setYear($year);
                    $anggaran->setEmployee($em);
                    $anggaran->setNilai(0);
                    $anggaran->setPemakaian(0);
                    $anggaran->setSisa(0);
                    $allAng[] = $anggaran;
                }
            }


            if (count($allAng) > 0) {

                $decan = Box_Tools::toDecan($allAng);
                $hasil = $aDao->saveGen($decan, $this->getAppSession());
            }
        }else{
            $msg = "Tidak ada karyawan";
        }


        return Box_Tools::instantRead(array(
                    "HASIL" => $hasil,
                    "MSG"=>$msg
        ));
    }

    public function mainCreate() {

        $dm = new Box_Models_App_Hermes_DataModel();
        $obj = new Hrd_Models_Training_Anggaran();

        $dm->setDao(new Hrd_Models_Training_AnggaranDao());
        $dm->setValidator(new Hrd_Models_Training_AnggaranValidator());
        $dm->setObject($obj);

        return $dm;
    }

    protected function getDefaultProcessor() {
        return new Hrd_Models_App_Box_Processor();
    }

}

?>
