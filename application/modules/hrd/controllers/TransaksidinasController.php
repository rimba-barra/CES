<?php

/**
 * Description of AbsentrecordController
 *
 * @author MIS
 */
class Hrd_TransaksidinasController extends Box_Models_App_Hermes_WingedBController {

    protected function testingFlag() {
        return FALSE;
    }

    public function nomorsuratRead() {

        $data = $this->getAppData();
        $success = FALSE;
        $msg = "...";
   
     
       // echo $date->format('Y-m-d');
        $bulan = intval(date("m", strtotime($data["date"])));
        $tahun = intval(date("Y", strtotime($data["date"])));
        $dao = new Hrd_Models_Dinas_NomorSuratDao();
        $d = new Hrd_Models_Dinas_NomorSurat();
        $d->setProject($this->getAppSession()->getProject());
        $d->setPt($this->getAppSession()->getPt());
        $nomorsurat = $dao->getAllWOPL($d);
        $hasilData = NULL;
        if (Box_Tools::adaRecord($nomorsurat)) {
            $allNomorSurat = Box_Tools::toObjectsb("nomorsuratdinas", $nomorsurat, FALSE);
            foreach ($allNomorSurat as $ns) {
              
                if ($ns->getBulan() == $bulan && $ns->getTahun() == $tahun) {
                    $hasilData = $ns->getArrayTable();
                    $success = TRUE;
                }
                
            }
        }

        if (!$hasilData) {
            $msg = "Tidak ada nomor xxx surat untuk periode " . $bulan . " / " . $tahun;
        }

        return Box_Tools::instantRead(array(
                    "HASIL" => $success,
                    "MSG" => $msg,
                    "DATA" => $hasilData
        ));
    }

    public function dinasRead() {

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'dinastran', array('employee', 'project'), array('detail', 'deletedRows', 'nomorsurat'));
        $dao = new Hrd_Models_Dinas_TransaksiDao();
        $enti = new Hrd_Models_Dinas_Transaksi();

        $enti->setArrayTable($this->getAppData());
        $enti->setProject($this->getAppSession()->getProject());
        $enti->setPt($this->getAppSession()->getPt());

        $dm->setDataList($dataList);
        $dm->setHasil($dao->getAllByEmployee($this->getAppRequest(), $enti));
        return $dm;
    }

    public function biayaRead() {

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'dinasdetail', array('dinastran'), array());
        $dao = new Hrd_Models_Dinas_TransaksiDao();
        //  $enti = new Hrd_Models_Dinas_TransaksiDetail();
        //   $enti->setArrayTable($this->getAppData());

        $data = $this->getAppData();
        $dm->setDataList($dataList);
        $dm->setHasil($dao->getBiaya($data["dinas_id"]));
        return $dm;
    }

    public function projectRead() {

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'project', array(), array());
        $dao = new Hrd_Models_General_Dao();
        //  $enti = new Hrd_Models_Dinas_TransaksiDetail();
        //   $enti->setArrayTable($this->getAppData());

        $data = $this->getAppData();
        $dm->setDataList($dataList);
        $dm->setHasil($dao->getAllProject($this->getAppRequest()));
        return $dm;
    }

    public function detailRead() {
        $dm = new Box_Models_App_Hermes_DataModel();

        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $creator = new Box_Models_App_Creator();
        $dao = new Hrd_Models_Dinas_TransaksiDao();


        $paramsRequestResult = Box_Tools::globalParamsExistLeave($this->getAppSession());


        $masterG = new Hrd_Models_App_Mastertable_DinasParameterUang();
        $allG = $masterG->prosesDataWithSession($this->getAppSession(), TRUE);



        $lastNomorSurat = $dao->getLastNomorSurat($this->getAppSession());





        $otherAT = array(array(
                "GLOBALPARAMSEXIST" => $paramsRequestResult["status"],
                "GLOBALPARAMSMSG" => $paramsRequestResult["msg"],
                "GLOBALPARAMSPARAMS" => $paramsRequestResult["parameters"],
                "EXPIRE_DURATION" => Box_Config::LEAVE_EXPIRE_DURATION
        ));
        $hasilArray = array($otherAT, $allG);

        if (count($lastNomorSurat[1]) > 0) {
            $lastNomorSurat = Box_Tools::toObjectsb("nomorsuratdinas", $lastNomorSurat, TRUE);
            $hasilArray[] = $lastNomorSurat;
        }

        $dm->setHasil($hasilArray);


        return $dm;
    }

    protected function getDefaultProcessor() {
        return new Hrd_Models_App_Box_DinasProcessor();
    }

    protected function getMainDao() {
        return new Hrd_Models_Dinas_TransaksiDao();
    }

    protected function getMainFieldID() {
        return "dinas_id";
    }

    protected function getMainObject() {
        return new Hrd_Models_Dinas_Transaksi();
    }

    protected function getMainValidator() {
        $v = new Hrd_Models_Dinas_TransaksiValidator();

        return $v;
    }

}

?>
