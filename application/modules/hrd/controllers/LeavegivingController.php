<?php

/**
 * Description of AbsentrecordController
 *
 * @author MIS
 */
class Hrd_LeavegivingController extends Box_Models_App_Hermes_WingedBController {

    protected function testingFlag() {
        return FALSE;
    }

    public function leaveRead() {

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'leaveentitlement', array('employee'), array());
        $dao = new Hrd_Models_Leave_LeaveEntitlementDao();
        $enti = new Hrd_Models_Leave_LeaveEntitlement();

        $enti->setArrayTable($this->getAppData());
        $enti->setProject($this->getAppSession()->getProject());
        $enti->setPt($this->getAppSession()->getPt());

        $dm->setDataList($dataList);
        $dm->setHasil($dao->getAllByEmployee($this->getAppRequest(), $enti));
        return $dm;
    }

    public function detailRead() {
        $dm = new Box_Models_App_Hermes_DataModel();

        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $creator = new Box_Models_App_Creator();


        $paramsRequestResult = Box_Tools::globalParamsExistLeave($this->getAppSession());

        $dma = new Hrd_Models_App_Mastertable_Department();
        $da = $dma->prosesDataWithSession($this->getAppSession(), TRUE);




        $otherAT = array(array(
                "GLOBALPARAMSEXIST" => $paramsRequestResult["status"],
                "GLOBALPARAMSMSG" => $paramsRequestResult["msg"],
                "GLOBALPARAMSPARAMS" => $paramsRequestResult["parameters"],
                "EXPIRE_DURATION" => Box_Config::LEAVE_EXPIRE_DURATION
        ));

        $dm->setHasil(array($otherAT, $da));


        return $dm;
    }

    public function habiscutiRead() {
        $dm = new Box_Models_App_Hermes_DataModel();

        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $creator = new Box_Models_App_Creator();

        $hasil = FALSE;
        $msg = "...";

        $dao = new Hrd_Models_Leave_LeaveEntitlementDao();
        $enti = new Hrd_Models_Leave_LeaveEntitlement();

        $enti->setArrayTable($this->getAppData());
        $enti->setProject($this->getAppSession()->getProject());
        $enti->setPt($this->getAppSession()->getPt());

        $jatahCutis = $dao->getAllByEmployeeWOPL($enti);
        $jatahCutis = Box_Tools::toObjects('leaveentitlement', $jatahCutis);
        $date = date('Y-m-d');

        $decanCE = NULL;

        $expiredJatahCuti = array();
        $cutiExpired = array();
        foreach ($jatahCutis as $jatahCuti) {
            if ($jatahCuti instanceof Hrd_Models_Leave_LeaveEntitlement) {
                if ($date > $jatahCuti->getExtensionDate()) {

                    // tambahkan ke dalam list untuk dimasukkan ke dalam transaksi cuti



                    $leave = new Hrd_Models_Leave_Leave();
                    $leave->setStartDate($jatahCuti->getStartUse() . "-01-01");
                    $leave->setEndDate($jatahCuti->getExtensionDate());
                    $leave->getAbsentType()->setId($jatahCuti->getLeavegroup() == Box_Config::LEAVE_GROUP_BESAR ? Box_Config::ABSENTTYPE_CUTIBESAR : Box_Config::ABSENTTYPE_CUTITAHUNAN);
                    $leave->getEmployee()->setId($jatahCuti->getEmployee()->getId());
                    $leave->setNote("PROSES KADALUARSA");
                    $leave->setDuration($jatahCuti->getRest());
                    $leave->setIsKadaluarsa(Box_Config::LEAVE_IS_KADALUARSA_KADALUARSA);
                    $cutiExpired[] = $leave;


                    $jatahCuti->setRest(0);
                    $expiredJatahCuti[] = $jatahCuti;
                }
            }
        }

        if (count($expiredJatahCuti) > 0) {
            $de = new Box_Delien_DelimiterEnhancer();
            $decan = new Box_Models_App_DecanForObject($expiredJatahCuti);
            $de->setDelimiterCandidate($decan);
            $de->generate();

            /*
              echo "<pre>";
              var_dump($decan->getDCResult());
              echo "</pre>";
             */



            if (count($cutiExpired) > 0) {
                $decanCE = new Box_Models_App_DecanForObject($cutiExpired);
                $de->setDelimiterCandidate($decanCE);
                $de->generate();

                /*
                  echo "<pre>";
                  var_dump($decanCE->getDCResult());
                  echo "</pre>";

                 */
            }







            $hasil = $dao->updateHabisCuti($decan, $this->getAppSession(), $decanCE);
        } else {
            $msg = "Tidak ada jatah cuti yang kadaluarsa";
        }


        $otherAT = array(array(
                "HASIL" => $hasil,
                "MSG" => $msg
        ));

        $dm->setHasil(array($otherAT));


        return $dm;
    }

    public function prosesRead() {

        $hasil = FALSE;
        $msg = "";

        $data = $this->getAppData();
        $mode = intval($data["per"]);

        if ($mode == 2) { // untuk mode "all"
            $msg = "Fitur belum tersedia";
        } else {
            $pc = new Hrd_Models_Leave_RecalculateCuti($this->getAppSession());
            $pc->setEmployeeId($data["employee_id"]);


            $hasilPc = $pc->proses();




            $dao = new Hrd_Models_Leave_LeaveEntitlementDao();

            $hasil = $dao->updateAllAndSisaCutiKaryawan($this->getAppSession(), $hasilPc[0], $hasilPc[1]);
        }



        $arrayRespon = array("HASIL" => $hasil,
            "MSG" => $msg);
        return Box_Tools::instantRead($arrayRespon, array());
    }

    /*
      public function prosesRead() {

      $hasil = FALSE;
      $msg = "";



      // $date = "2015-12-31";


      $pc  = new Hrd_Models_Leave_ProsesCuti($this->getAppSession());
      $hasilPc = $pc->proses();
      if(!$hasilPc){
      $msg = $pc->getMsg();
      }

      $dao = new Hrd_Models_Leave_LeaveEntitlementDao();

      $hasil = $dao->updateAllAndSisaCutiKaryawan($hasilPc[0], $hasilPc[1]);


      $arrayRespon = array("HASIL" => $hasil,
      "MSG" => $msg);
      return Box_Tools::instantRead($arrayRespon, array());
      }
     */

    public function generateyearlyCreate() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $obj = new Hrd_Models_Leave_LeaveEntitlement();


        $dm->setDao(new Hrd_Models_Leave_LeaveEntitlementDao());
        $dm->setValidator(new Hrd_Models_Leave_LeaveEntitlementValidator("yearly"));
        $dm->setObject($obj);

        return $dm;
    }

    public function generatecutibesarCreate() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $obj = new Hrd_Models_Leave_LeaveEntitlement();


        $dm->setDao(new Hrd_Models_Leave_LeaveEntitlementDao());
        $dm->setValidator(new Hrd_Models_Leave_LeaveEntitlementValidator("cutibesar"));
        $dm->setObject($obj);
        
        return $dm;
    }
//
//    public function generatecutibesarCreate() {
//        $obj = new Hrd_Models_Leave_LeaveEntitlement();
//        $obj->setArrayTable($this->getAppData());
//        
//        $dao = new Hrd_Models_Leave_LeaveEntitlementDao();        
//        $hasil = $dao->generatecutibesar($this->getAppSession(), $obj);
//                
//        $dm = new Box_Models_App_Hermes_DataModel();
//        $dm->setDao(new Hrd_Models_Leave_LeaveEntitlementDao());
//        $dm->setObject($obj);
//
//        return $dm;
//        
//    }

    protected function getDefaultProcessor() {
        return new Hrd_Models_App_Box_LeaveProcessor();
    }

    protected function getMainDao() {
        return new Hrd_Models_Leave_LeaveEntitlementDao();
    }

    protected function getMainFieldID() {
        return "leaveentitlements_id";
    }

    protected function getMainObject() {
        return new Hrd_Models_Leave_LeaveEntitlement();
    }

    protected function getMainValidator() {
        return new Hrd_Models_Leave_LeaveEntitlementValidator();
    }

    //added by anas 08122021
    public function kompensasiExtraLeaveRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'kompensasiextraleave', array('employee'), array());
        $dao = new Hrd_Models_Leave_LeaveEntitlementDao();
        $enti = new Hrd_Models_Leave_LeaveEntitlement();
        $enti->setArrayTable($this->getAppData());
        $enti->setProject($this->getAppSession()->getProject());
        $enti->setPt($this->getAppSession()->getPt());

        $dm->setDataList($dataList);
        $dm->setHasil($dao->getAllKompensasiExtraLeaveByEmployee($this->getAppRequest(), $enti));

        return $dm;
    }

    //added by michael 20220614 | untuk keperluan Cuti Hotel
    public function detailParameterTerbitRead() {
        
        $em = new Hrd_Models_Leave_ParamCuti();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Leave_Dao();
        
        $hasil = $dao->getAllParameterTerbit($this->getAppRequest(), $em, $this->getAppData());
        if(Box_Tools::adaRecord($hasil)){
            $hasil = Box_Tools::toObjectsb("paramcuti", $hasil,FALSE);
        }
       
        return Box_Tools::instantRead(array(), array($hasil));

    }

    public function detailParameterExpiredRead() {
        
        $em = new Hrd_Models_Leave_ParamCutiExpired();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Leave_Dao();
        
        $hasil = $dao->getAllParameterExpired($this->getAppRequest(), $em, $this->getAppData());
        if(Box_Tools::adaRecord($hasil)){
            $hasil = Box_Tools::toObjectsb("paramcutiexpired", $hasil,FALSE);
        }
       
        return Box_Tools::instantRead(array(), array($hasil));

    }

    public function detailbandingRead() {

        $data = $this->getAppData();
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'banding', array(), array());
        $dao = new Hrd_Models_Performancemanagement_BandingDao();
        $obj = new Hrd_Models_Performancemanagement_Banding();
        $obj->setArrayTable($this->getAppData());

        $dm->setDataList($dataList);
        
        if($data['parametercuti_id']){
            $dm->setHasil($dao->getAllBandingParamCuti($obj, $data));
        }else{
            $dm->setHasil($dao->getAllBanding($obj, $data));
        }

        return $dm;
    }

    public function detailbandingcontractRead() {

        $data = $this->getAppData();
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'banding', array(), array());
        $dao = new Hrd_Models_Performancemanagement_BandingDao();
        $obj = new Hrd_Models_Performancemanagement_Banding();
        $obj->setArrayTable($this->getAppData());

        $dm->setDataList($dataList);
        
        if($data['parametercuti_id']){
            $dm->setHasil($dao->getAllBandingParamCutiContract($obj, $data));
        }else{
            $dm->setHasil($dao->getAllBanding($obj, $data));
        }

        return $dm;
    }

    public function saveParamRead() {

        $hasil = FALSE;
        $ses = $this->getAppSession();
        $msg = "...";
        $jenisError = 0;
        $confirmed = FALSE; 
        $proses = 0;
        $empproses = 0;

        $data = $this->getAppData();

        $em = new Hrd_Models_Leave_ParamCutiDetail();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());

        $confirmed = array_key_exists("confirmed", $data);

        $isValid = false;

        if($data['opsiparam'] == 2){
            if (!array_key_exists("parametercuti_terbit_id",$data) && !$data['parametercuti_terbit_id']) {
                $msg = "Terbit berdasarkan masih kosong";
            } else if (!array_key_exists("parametercuti_expired_id",$data) && !$data['parametercuti_expired_id']) {
                $msg = "Expired berdasarkan masih kosong";
            } else if (!array_key_exists("expired_sampai",$data) && !$data['expired_sampai']) {
                $msg = "Expired sampai masih kosong";
            } else {
                $isValid = true;
            }
        }else{
            $isValid = true;
        }

        if ($isValid) {

            $dao = new Hrd_Models_Leave_Dao();
            $proses = $dao->proses_saveParam($this->getAppSession(), $em, $data);
            $msg = "Success..";
        }
        

        $arrayRespon = array("HASIL" => $proses,"MSG" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function getParamRead() {
        $em = new Hrd_Models_Leave_ParamCutiDetail();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Leave_Dao();
        
        $hasil = $dao->getDetailParameter($this->getAppRequest(), $em, $this->getAppData());
        if(Box_Tools::adaRecord($hasil)){
            $hasil = Box_Tools::toObjectsb("paramcutidetail", $hasil,FALSE);
        }
       
        return Box_Tools::instantRead(array(), array($hasil));
    }

    //---

    public function detailParameterPhTerbitRead() {
        
        $em = new Hrd_Models_Leave_ParamCutiPh();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Leave_Dao();
        
        $hasil = $dao->getAllParameterTerbitPh($this->getAppRequest(), $em, $this->getAppData());
        if(Box_Tools::adaRecord($hasil)){
            $hasil = Box_Tools::toObjectsb("paramcutiph", $hasil,FALSE);
        }
       
        return Box_Tools::instantRead(array(), array($hasil));

    }

    public function detailParameterPhExpiredRead() {
        
        $em = new Hrd_Models_Leave_ParamCutiPhExpired();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Leave_Dao();
        
        $hasil = $dao->getAllParameterExpiredPh($this->getAppRequest(), $em, $this->getAppData());
        if(Box_Tools::adaRecord($hasil)){
            $hasil = Box_Tools::toObjectsb("paramcutiphexpired", $hasil,FALSE);
        }
       
        return Box_Tools::instantRead(array(), array($hasil));

    }

    public function detailbandingphRead() {

        $data = $this->getAppData();
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'banding', array(), array());
        $dao = new Hrd_Models_Performancemanagement_BandingDao();
        $obj = new Hrd_Models_Performancemanagement_Banding();
        $obj->setArrayTable($this->getAppData());

        $dm->setDataList($dataList);
        
        if($data['parametercutiph_id']){
            $dm->setHasil($dao->getAllBandingParamCutiPh($obj, $data));
        }else{
            $dm->setHasil($dao->getAllBanding($obj, $data));
        }

        return $dm;
    }

    public function detailbandingcontractphRead() {

        $data = $this->getAppData();
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'banding', array(), array());
        $dao = new Hrd_Models_Performancemanagement_BandingDao();
        $obj = new Hrd_Models_Performancemanagement_Banding();
        $obj->setArrayTable($this->getAppData());

        $dm->setDataList($dataList);
        
        if($data['parametercutiph_id']){
            $dm->setHasil($dao->getAllBandingParamCutiPhContract($obj, $data));
        }else{
            $dm->setHasil($dao->getAllBanding($obj, $data));
        }

        return $dm;
    }

    public function detailholidayRead() {

        $data = $this->getAppData();
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'holidayname', array(), array());
        $dao = new Hrd_Models_Leave_Dao();
        $obj = new Hrd_Models_Leave_ParamHoliday();
        $obj->setArrayTable($this->getAppData());

        $dm->setDataList($dataList);
        
        if($data['parametercutiph_id']){
            $dm->setHasil($dao->getAllHolidayParam($obj, $data));
        }else{
            $dm->setHasil($dao->getAllHoliday($obj, $data));
        }

        return $dm;
    }

    public function saveParamPhRead() {

        $hasil = FALSE;
        $ses = $this->getAppSession();
        $msg = "...";
        $jenisError = 0;
        $confirmed = FALSE; 
        $proses = 0;
        $empproses = 0;

        $data = $this->getAppData();

        $em = new Hrd_Models_Leave_ParamCutiPhDetail();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());

        $confirmed = array_key_exists("confirmed", $data);

        $isValid = false;

        if($data['opsiparamph'] == 2){
            if (!array_key_exists("parametercutiph_terbit_id",$data) && !$data['parametercutiph_terbit_id']) {
                $msg = "Terbit berdasarkan masih kosong";
            } else if (!array_key_exists("parametercutiph_expired_id",$data) && !$data['parametercutiph_expired_id']) {
                $msg = "Expired berdasarkan masih kosong";
            } else if (!array_key_exists("expired_sampai_ph",$data) && !$data['expired_sampai_ph']) {
                $msg = "Expired sampai masih kosong";
            } else {
                $isValid = true;
            }
        }else{
            $isValid = true;
        }

        if ($isValid) {

            $dao = new Hrd_Models_Leave_Dao();
            $proses = $dao->proses_saveParamPh($this->getAppSession(), $em, $data);
            $msg = "Success..";
        }
        

        $arrayRespon = array("HASIL" => $proses,"MSG" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function getParamPhRead() {
        $em = new Hrd_Models_Leave_ParamCutiPhDetail();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Leave_Dao();
        
        $hasil = $dao->getDetailParameterPh($this->getAppRequest(), $em, $this->getAppData());
        if(Box_Tools::adaRecord($hasil)){
            $hasil = Box_Tools::toObjectsb("paramcutiphdetail", $hasil,FALSE);
        }
       
        return Box_Tools::instantRead(array(), array($hasil));
    }

    public function detailbandingphspecialRead() {

        $data = $this->getAppData();
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'banding', array(), array());
        $dao = new Hrd_Models_Performancemanagement_BandingDao();
        $obj = new Hrd_Models_Performancemanagement_Banding();
        $obj->setArrayTable($this->getAppData());

        $dm->setDataList($dataList);
        
        if($data['parametercutiph_id']){
            $dm->setHasil($dao->getAllBandingParamCutiPhSpecial($obj, $data));
        }else{
            $dm->setHasil($dao->getAllBandingHolidayname($obj, $data));
        }

        return $dm;
    }

    public function detailbandingcontractphspecialRead() {

        $data = $this->getAppData();
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'banding', array(), array());
        $dao = new Hrd_Models_Performancemanagement_BandingDao();
        $obj = new Hrd_Models_Performancemanagement_Banding();
        $obj->setArrayTable($this->getAppData());

        $dm->setDataList($dataList);
        
        if($data['parametercutiph_id']){
            $dm->setHasil($dao->getAllBandingParamCutiPhContractSpecial($obj, $data));
        }else{
            $dm->setHasil($dao->getAllBandingHolidayname($obj, $data));
        }

        return $dm;
    }

}

?>
