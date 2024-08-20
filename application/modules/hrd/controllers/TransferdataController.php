<?php

/**
 * Description of AbsentrecordController
 *
 * @author MIS
 */
require_once dirname(__DIR__) . '../library/phpexcel/PHPExcel/IOFactory.php';

class Hrd_TransferdataController extends Box_Models_App_Hermes_AbstractController {

    protected function testingFlag() {
        return FALSE;
    }

    public function allRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'transferdetail', array('employee'));
        $dao = new Hrd_Models_Payroll_Transfer_Dao();
        $header = new Hrd_Models_Payroll_Transfer_Transfer();

        //$this->setArrayTable($leave,$this->getAppData());
        $header->setArrayTable($this->getAppData());
        Hrd_Models_App_Box_TransferProcessor::fillMonthYear($header);
        $header->setProject($this->getAppSession()->getProject());
        $header->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAllDetail($this->getAppRequest(), $header);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function updatetunjanganRead() {
        $data = $this->getAppData();
        $success = FALSE;
        $msg = "...";



        $dao = new Hrd_Models_Payroll_Transfer_Dao();
        $header = new Hrd_Models_Payroll_Transfer_Transfer();

        //$this->setArrayTable($leave,$this->getAppData());
        //$header->setArrayTable($this->getAppData());
        $header->setBatch($data["batch_filter"]);
        $header->getKomponenGaji()->setId($data["komponengaji_komponengaji_id"]);
        $my = Box_Tools::splitMonthYear($data["monthyear_filter"]);
        $header->setMonth($my[0]);
        $header->setYear($my[1]);
        $header->setProject($this->getAppSession()->getProject());
        $header->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAllDetailWOPL($header);

        if (Box_Tools::adaRecord($hasil)) {
            $allTransferde = Box_Tools::toObjects("transferdetail", $hasil);

            $allTunjangan = array();
            foreach ($allTransferde as $transferde) {
                if ($transferde instanceof Hrd_Models_Payroll_Transfer_TransferDetail) {
                    $tunjangan = new Hrd_Models_Payroll_Tunjangan_TunjanganTetap();
                    $tunjangan->setKomponenGaji($header->getKomponenGaji());
                    $tunjangan->setValue($transferde->getValue());
                    $tunjangan->setEmployee($transferde->getEmployee());
                    $allTunjangan[] = $tunjangan;
                }
            }

            if (count($allTunjangan) > 0) {
                $decan = Box_Tools::toDecan($allTunjangan);
                $dao = new Hrd_Models_Payroll_Tunjangan_Dao();
                $success = $dao->saveMulti($this->getAppSession(), $decan);
            }
        } else {
            $msg = "Tidak ada data transfer";
        }



        return Box_Tools::instantRead(array(
                    "HASIL" => $success,
                    "MSG" => $msg
        ));
    }

    public function periodeRead() {

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'transfer', array(), array());
        $dao = new Hrd_Models_Payroll_Transfer_Dao();
        $pg = new Hrd_Models_Payroll_Transfer_Transfer();
        $pg->setArrayTable($this->getAppData());
        $pg->setProject($this->getAppSession()->getProject());
        $pg->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getPeriode($pg);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function batchRead() {

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'transfer', array(), array());
        $dao = new Hrd_Models_Payroll_Transfer_Dao();
        $pg = new Hrd_Models_Payroll_Transfer_Transfer();

        $data = $this->getAppData();
        $my = Box_Tools::splitMonthYear($data["monthyear"]);


        $pg->setArrayTable($data);
        $pg->setMonth($my[0]);
        $pg->setYear($my[1]);
        $pg->setProject($this->getAppSession()->getProject());
        $pg->setPt($this->getAppSession()->getPt());
        $hasil = $dao->fetchBatch($pg);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function komponenRead() {

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'komponengaji', array(), array());
        $dao = new Hrd_Models_Payroll_Transfer_Dao();
        $pg = new Hrd_Models_Payroll_Transfer_Transfer();

        $data = $this->getAppData();

        $my = Box_Tools::splitMonthYear($data["monthyear"]);



        $pg->setArrayTable($this->getAppData());
        $pg->setMonth($my[0]);
        $pg->setYear($my[1]);
        $pg->setProject($this->getAppSession()->getProject());
        $pg->setPt($this->getAppSession()->getPt());
        $hasil = $dao->fetchKomponen($pg);
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

    public function simpanmapRead() {
        $data = $this->getAppData();
        $success = FALSE;
        $msg = "...";
        //$dataMap = $data["data"];
        $dataMap = Zend_Json::decode($data["data"]);
        $fileName = $data["file_name"];


        /// cek dan ambil id di databse transfer
        $allHeader = array();
        foreach ($dataMap as $row) {

            $transfer = new Hrd_Models_Payroll_Transfer_Transfer();
            $transfer->setMonthYear($row["periode"]);
            $transfer->getKomponenGaji()->setId($row["komponengaji_komponengaji_id"]);
            $transfer->setNo($row["no"]);
            $transfer->setIsRoundUp($row["is_roundup"]);
            Hrd_Models_App_Box_TransferProcessor::fillMonthYear($transfer);
            $allHeader[] = $transfer;
        }

        // $decan = Box_Tools::toDecan($allHeader);
        //var_dump($decan->getDCResult());

        if (count($allHeader) > 0) {



            //// check header di database + ambil batch terakhir tiap header
            $decan = Box_Tools::toDecan($allHeader);

            $daoTransfer = new Hrd_Models_Payroll_Transfer_Dao();
            $hasilSave = $daoTransfer->saveSelect($decan, $this->getAppSession());
            $decanText = $hasilSave[0][0]["result"];
            $decanText = explode("~", $decanText);
            
           
            
            foreach ($decanText as $decanT) {
                $decanT = explode(",", $decanT);
                if (count($decanT) > 1) {

                    // matchmaking
                    foreach ($allHeader as $header) {
                        if ($header->getKomponenGaji()->getId() == $decanT[3] &&
                                $header->getMonth() == $decanT[1] &&
                                $header->getYear() == $decanT[2]) {

                            $header->setId($decanT[0]);
                        }
                    }
                }
            }
            
            


            
                // buka file excel yang sudah di upload untuk di proses lagi
                $ste = new Hrd_Models_Payroll_Transfer_ImportExcel();
                $hasilProcess = $ste->processDataEmployee($fileName, $this->getAppSession(), $allHeader);

                if ($ste->getStatus()) {


                    $decan = Box_Tools::toDecan($hasilProcess);

                    $daoTransfer = new Hrd_Models_Payroll_Transfer_Dao();
                    
                   

                    $success = $daoTransfer->saveMultiDetail($decan, $this->getAppSession());

                    if ($success) {
                        $success = 1;
                        $msg = "Success";
                    } else {
                        $msg = "Error pada saat proses database";
                    }
                } else {
                    $msg = $ste->getMsg();
                }
            
        }
       
        return Box_Tools::instantRead(array(
                    "HASIL" => $success,
                    "MSG" => $msg
        ));
    }

    public function deletebatchRead() {
        $data = $this->getAppData();
        $dao = new Hrd_Models_Payroll_Transfer_Dao();
        $transfer = new Hrd_Models_Payroll_Transfer_Transfer();
        $transfer->setArrayTable($this->getAppData());
        Hrd_Models_App_Box_TransferProcessor::fillMonthYear($transfer);
        $success = $dao->deleteBatch($this->getAppSession()->getUser()->getId(), $transfer);
        //
        return Box_Tools::instantRead(array(
                    "SUCCESS" => $success
        ));
    }

    public function deleteRead() {
        $data = $this->getAppData();
        $dao = new Hrd_Models_Payroll_Transfer_Dao();
        $success = $dao->deleteOne($data["id"], $this->getAppSession()->getUser()->getId());

        return Box_Tools::instantRead(array(
                    "SUCCESS" => $success
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

    public function processexcelRead() {
        $app = new Box_Models_App_Models_Create($this);
        $msg = '???';
        $success = FALSE;
        $data = $this->getAppData();
        //  $month = intval($data["month"]);
        // $year = intval($data["year"]);
        $fileName = $data["file_name"];



        $ste = new Hrd_Models_Payroll_Transfer_ImportExcel();
        $hasilProcess = $ste->process($fileName, $this->getAppSession());

        if ($ste->getStatus()) {
            $success = TRUE;
            
        } else {
            $msg = $ste->getMsg();
        }


        $arrayRespon = array("HASIL" => $success, "MSG" => $msg,
            "DATA" => $hasilProcess);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function uploadRead() {

        $ses = $this->getAppSession();


        $data = $this->getAppData();

        $msg = '???';
        $success = FALSE;
        $modeUpload = $data["type"];
        $fileUpload = NULL;
        if ($modeUpload == "importexcel") {
            $fileUpload = new Box_Models_App_FileUpload("/" . Box_Config::TRANSFERDATA_EXCEL_PATH, "transfer_" . $ses->getProject()->getId() . "_" . $ses->getPt()->getId(), "xlsx");
        }

        $fileUpload->run();
        if (!$fileUpload->isSuccess()) {
            $msg = $fileUpload->getErrorMsg();
        } else {
            $success = TRUE;
            $msg = $fileUpload->getFileName();
        }

        $arrayRespon = array("HASIL" => $success, "MSG" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }

    protected function getDefaultProcessor() {
        return new Hrd_Models_App_Box_TransferProcessor();
    }

}

?>
