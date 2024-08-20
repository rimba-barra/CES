<?php

/**
 * Description of DepartmentController
 *
 * @author MIS
 */
class Hrd_TrainingattendanceController extends Hrd_Models_App_Template_AbstractMasterController {

    public function _getMainDataModel() {

        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Box_Models_App_DataListCreator('', 'trainingschedule', array(), array()));
        $dm->setObject(new Hrd_Models_Training_Trainingschedule_Trainingschedule());
        $dm->setDao(new Hrd_Models_Training_Trainingschedule_Dao());
        $dm->setValidator(new Hrd_Models_Training_Trainingschedule_Validator());
        $dm->setIdProperty("trainingschedule_id");
        return $dm;
    }

    public function getScheduleRead() {
        $em = new Hrd_Models_Training_Trainingregistration_Trainingregistration();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingregistration_Dao();
        
        $allname = $dao->getAllSchedule($em);
        if(Box_Tools::adaRecord($allname)){
            $allname = Box_Tools::toObjectsb("trainingschedule",
            $allname,FALSE);
        }


        $alltrainname = $dao->getAllTrainingNameKP($em);        
        if(Box_Tools::adaRecord($alltrainname)){
            $alltrainname = Box_Tools::toObjectsb("trainingname", $alltrainname,FALSE);
        }
        
        return Box_Tools::instantRead(array(), array($allname, $alltrainname));

    }

    public function getVTSRead() {
        $em = new Hrd_Models_Training_Trainingregistration_Trainingregistration();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingregistration_Dao();
        $detail = $dao->getDetailSchedule($em,$this->getAppData());
        
        if(Box_Tools::adaRecord($detail)){
            $detail = Box_Tools::toObjectsb("trainingscheduledetail", $detail,FALSE);
        }
        
        return Box_Tools::instantRead(array(), array($detail));

    }

    public function getTELRead() {
        $em = new Hrd_Models_Training_Trainingattendance_Trainingattendance();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingattendance_Dao();
        $detail_emp = $dao->getDetailScheduleRegisterEmp($em,$this->getAppData());

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'trainingattendanceemployee', array(),array());
        
        $dm->setDataList($dataList);
        $dm->setHasil($detail_emp);
        return $dm;

    }

    public function getEDRead() {
        $em = new Hrd_Models_Training_Trainingattendance_Trainingattendance();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingattendance_Dao();
        $detail_emp = $dao->getDetailEmp($em,$this->getAppData(), $this->getAppSession());

        if(Box_Tools::adaRecord($detail_emp)){
            $detail = Box_Tools::toObjectsb("employee", $detail_emp,FALSE);
        }
        
        return Box_Tools::instantRead(array(), array($detail_emp));

    }

    public function getED_attributRead() {
        $em = new Hrd_Models_Training_Trainingattendance_Trainingattendance();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingattendance_Dao();
        $hasil = $dao->getDetailAttribut($em, $this->getAppSession(), $this->getAppData());
        
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'trainingattendanceprocess', array(),array());
        
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;

    }

    public function getED_attachRead() {
        $em = new Hrd_Models_Training_Trainingattendance_Trainingattendance();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingattendance_Dao();
        $hasil = $dao->getDetailAttach($em, $this->getAppSession(), $this->getAppData());
        
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'trainingattendancefile', array(),array());
        
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;

    }

    public function getED_dateRead() {
        $em = new Hrd_Models_Training_Trainingattendance_Trainingattendance();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingattendance_Dao();
        $hasil = $dao->getDetailDate($em, $this->getAppSession(), $this->getAppData());
        
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'trainingattendancedate', array(),array());
        
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;

    }

    public function getED_datescheduleRead() {
        $em = new Hrd_Models_Training_Trainingattendance_Trainingattendance();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingattendance_Dao();
        $hasil = $dao->getDetailDateSchedule($em, $this->getAppSession(), $this->getAppData());
        
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'trainingscheduledate', array(),array());
        
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;

    }

    public function getED_budgetRead() {
        $em = new Hrd_Models_Training_Trainingregistration_Trainingregistration();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingregistration_Dao();
        $detail_emp_budget = $dao->getDetailEmpBudget($em,$this->getAppData());

        if(Box_Tools::adaRecord($detail_emp_budget)){
            $detail_emp_budget = Box_Tools::toObjectsb("employee", $detail_emp_budget,FALSE);
        }
        
        return Box_Tools::instantRead(array(), array($detail_emp_budget));

    }

    public function getEmpRead() {
        
        $dm = new Box_Models_App_Hermes_DataModel();
        
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
        
        $masteremp   = new Hrd_Models_App_Mastertable_Employee();
        $allemp      = $masteremp->prosesDataWithSession($this->getAppSession(), TRUE);
        
        return Box_Tools::instantRead(array(), array($allemp));

    }


    public function getATCRead() {
        $em = new Hrd_Models_Training_Trainingregistration_Trainingregistration();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingregistration_Dao();

        $allcaption = $dao->getBudgetType($em);
        if(Box_Tools::adaRecord($allcaption)){
            $allcaption = Box_Tools::toObjectsb("trainingcaption", $allcaption,FALSE);
        }

        //select
        $detail = $dao->getDetailSchedule($em,$this->getAppData());
        
        if(Box_Tools::adaRecord($detail)){
            $detail = Box_Tools::toObjectsb("trainingscheduledetail", $detail,FALSE);
        }
        
        return Box_Tools::instantRead(array(), array($allcaption,$detail));

    }

    public function getATCSRead() {
        $em = new Hrd_Models_Training_Trainingregistration_Trainingregistration();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingregistration_Dao();

        $getbudget = $dao->getBudgetTypeSelection($em, $this->getAppData());
        if(Box_Tools::adaRecord($getbudget)){
            $getbudget = Box_Tools::toObjectsb("trainingbudgetprogram", $getbudget,FALSE);
        }

        return Box_Tools::instantRead(array(), array($getbudget));

    }

    public function saveOnceAttendanceRead() {
        
        $em = new Hrd_Models_Training_Trainingattendance_Trainingattendance();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingattendance_Dao();

        $hasil = $dao->saveOnceAttendance($em, $this->getAppSession(), $this->getAppData());
        
        $arrayRespon = array("HASIL" => $hasil);
        return Box_Tools::instantRead($arrayRespon);

    }

    public function getdataintranetRead() {
        
        $em = new Hrd_Models_Training_Trainingattendance_Trainingattendance();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingattendance_Dao();
        $hasil = $dao->getdataintranet($em, $this->getAppSession(), $this->getAppData());

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'trainingattendancebrowse', array(),array());
        
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        
        return $dm;

    }

    public function searchdataintranetRead() {
        
        $em = new Hrd_Models_Training_Trainingattendance_Trainingattendance();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingattendance_Dao();
        $hasil = $dao->getdataintranet($em, $this->getAppSession(), $this->getAppData());

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'trainingattendancebrowse', array(),array());
        
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        
        return $dm;

    }

    public function getdetailintranet_attendanceRead(){

        $em = new Hrd_Models_Training_Trainingattendance_Trainingattendance();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingattendance_Dao();
        $hasil = $dao->getdetailintranet_attendance($em, $this->getAppSession(), $this->getAppData());
        
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'trainingattendanceprocess', array(),array());
        
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        // print_r($dm);die();
        return $dm;
    }

    public function trainingdate_existRead(){
        $em = new Hrd_Models_Training_Trainingattendance_Trainingattendance();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingattendance_Dao();
        $hasil = $dao->getalldate($em, $this->getAppSession(), $this->getAppData());
        
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'trainingattendancedate', array(),array());
        
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        
        return $dm;
    }

    public function getAllDatefromScheduleRead(){
        $em = new Hrd_Models_Training_Trainingattendance_Trainingattendance();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingattendance_Dao();
        $hasil = $dao->getAllDatefromSchedule($em, $this->getAppSession(), $this->getAppData());
        
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'trainingscheduledate', array(),array());
        
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        
        return $dm;
    }

    public function trainingfile_existRead(){
        $em = new Hrd_Models_Training_Trainingattendance_Trainingattendance();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingattendance_Dao();
        
        $hasil = $dao->getallfile($em, $this->getAppSession(), $this->getAppData());
        
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'trainingattendancefile', array(),array());
        
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        
        return $dm;
    }

    public function approveIntranetRead() {
        
        $em = new Hrd_Models_Training_Trainingattendance_Trainingattendance();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingattendance_Dao();
        
        $hasil = $dao->approveIntranet($em, $this->getAppSession(), $this->getAppData());
        
        $arrayRespon = array("HASIL" => $hasil);
        return Box_Tools::instantRead($arrayRespon);

    }

    public function rejectIntranetRead() {
        
        $em = new Hrd_Models_Training_Trainingattendance_Trainingattendance();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingattendance_Dao();
        
        $hasil = $dao->rejectIntranet($em, $this->getAppSession(), $this->getAppData());
        
        $arrayRespon = array("HASIL" => $hasil);
        return Box_Tools::instantRead($arrayRespon);

    }

    public function getEmpExistRead() {
        $em = new Hrd_Models_Training_Trainingattendance_Trainingattendance();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingattendance_Dao();
        $emp_exist = $dao->getEmpExist($em, $this->getAppSession(), $this->getAppData());

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'trainingscheduleemployee', array(),array());
        
        $dm->setDataList($dataList);
        $dm->setHasil($emp_exist);
        return $dm;

    }

    public function getScheduleAttachExistRead() {
        $em = new Hrd_Models_Training_Trainingattendance_Trainingattendance();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingattendance_Dao();
        $emp_exist = $dao->getScheduleAttachExist($em, $this->getAppSession(), $this->getAppData());

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'trainingattendancefileschedule', array(),array());
        
        $dm->setDataList($dataList);
        $dm->setHasil($emp_exist);
        return $dm;

    }

    public function getAllCostRead(){
        $em = new Hrd_Models_Training_Trainingattendance_Trainingattendance();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingattendance_Dao();
        $hasil = $dao->getAllCost($em, $this->getAppSession(), $this->getAppData());

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'trainingschedulecost', array(),array());
        
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        
        return $dm;

    }

    public function inputAttendanceDateFormRead(){
        $em = new Hrd_Models_Training_Trainingattendance_Trainingattendance();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingattendance_Dao();
        $input = $dao->saveOnceAttendance($em, $this->getAppSession(), $this->getAppData());
        $hasil = $dao->saveOnceAttendanceDate($em, $this->getAppSession(), $this->getAppData(),$input);
        
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'trainingattendancedate', array(),array());
        
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        
        return $dm;
    }

    public function uploadRead() {

        $ses = $this->getAppSession();


        $data = $this->getAppData();

        $msg = '???';
        $success = FALSE;
        $modeUpload = $data["type"];
      
        $fileName = "";
        $fileUpload = NULL;

        if($data["initial"] == 'schedule'){
            $addpath = $data["initial"].'/';
        }else{
            $addpath = '';
        }

        if ($modeUpload == "dokumen") {
            $fileUpload = new Box_Models_App_FileUpload("/public/app/hrd/uploads/training/".$addpath, "training_" . $ses->getProject()->getId() . "_" . $ses->getPt()->getId() . "_DOKUMEN_" . time(), "pdf");


            $fileUpload->run();
            if (!$fileUpload->isSuccess()) {
                $msg = $fileUpload->getErrorMsg();
            } else {
                $success = TRUE;
                $fileName = $fileUpload->getFileName();
                $msg = $fileName;
            }
        }
        
        $arrayRespon = array("HASIL" => $success, "MSG" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function inputAttendanceFileFormRead(){
        $em = new Hrd_Models_Training_Trainingattendance_Trainingattendance();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingattendance_Dao();
        $input = $dao->saveOnceAttendance($em, $this->getAppSession(), $this->getAppData());
        $hasil = $dao->saveOnceAttendanceFile($em, $this->getAppSession(), $this->getAppData(),$input);
        
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'trainingattendancefile', array(),array());
        
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        return $dm;
    }
    
    public function inputAttendanceFileFormScheduleRead(){
        $em = new Hrd_Models_Training_Trainingattendance_Trainingattendance();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingattendance_Dao();
        $hasil = $dao->saveAttendanceFileSchedule($em, $this->getAppSession(), $this->getAppData());
        
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'trainingattendancefileschedule', array(),array());
        
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        return $dm;
    }

    //AMBIL DARI TRAININGNAME
    public function gettrainingnameRead(){

        $em = new Hrd_Models_Training_Trainingattendance_Trainingattendance();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingattendance_Dao();
        $hasil = $dao->gettrainingname($em, $this->getAppSession(), $this->getAppData());

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'trainingschedule', array(),array());
        
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        
        return $dm;
    }

    //GET EMPLOYEE FOR CLOSE
    public function getEmployeeforCloseRead(){
        $em = new Hrd_Models_Training_Trainingattendance_Trainingattendance();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingattendance_Dao();
        $detail_emp = $dao->getEmployeeforClose($em,$this->getAppData());

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'trainingattendanceemployee', array(),array());
        
        $dm->setDataList($dataList);
        $dm->setHasil($detail_emp);
        return $dm;
    }

    //CLOSE TRAINING
    public function closetrainingnameRead(){
        $em = new Hrd_Models_Training_Trainingattendance_Trainingattendance();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingattendance_Dao();
        
        $hasil = $dao->closetrainingname($em, $this->getAppSession(), $this->getAppData());
        
        $arrayRespon = array("HASIL" => $hasil);
        return Box_Tools::instantRead($arrayRespon);
    }

    

    
    public function employeelistRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'monitoringmatrixemployee', array(), array());
        $dao = new Hrd_Models_Training_Trainingschedule_Dao();
        $employee = new Hrd_Models_Training_Trainingschedule_Trainingschedule();
        $this->setArrayTable($employee, $this->getAppData());       
        $hasil = $dao->getEmployeelist($this->getAppRequest(), $this->getAppSession(), $this->getAppData());
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function parameterRead() {
        
        $m_banding      = new Hrd_Models_App_Mastertable_Banding();
        $data_banding   = $m_banding->prosesDataWithSession($this->getAppSession(), TRUE);
        
        $project        = new Hrd_Models_App_Mastertable_Projectsh();
        $allproject     = $project->prosesDataWithSession($this->getAppSession(), TRUE);
        
        $masterpt       = new Hrd_Models_App_Mastertable_Pt();
        $allpt          = $masterpt->prosesDataWithSession($this->getAppSession(), TRUE);
        
        $hasil = TRUE;

        $arrayRespon = array(
            "HASIL" => $hasil);
        return Box_Tools::instantRead($arrayRespon, array($data_banding, $allproject, $allpt));
    }

    public function generatedateRead() {
        
        $em = new Hrd_Models_Training_Trainingschedule_Trainingschedule();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingschedule_Dao();
        $date = new Hrd_Models_Training_Trainingschedule_Trainingschedule();
        $this->setArrayTable($date, $this->getAppData());
        // $hasil = $dao->getgeneratedate($em,$this->getAppRequest(), $this->getAppSession(), $this->getAppData());
        // $alldate = $dao->getdate($em,$this->getAppRequest(), $this->getAppSession(), $this->getAppData(), $hasil);
        
        // $arrayRespon = array("HASIL" => $hasil, "DATE" => $alldate);
        $arrayRespon = array("HASIL" => $hasil);

        return Box_Tools::instantRead($arrayRespon);
        // return Box_Tools::instantRead(array(), array($generatedate));

    }

    public function trainingdateRead(){
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'trainingscheduledate', array(),array());
        $em = new Hrd_Models_Training_Trainingschedule_Trainingschedule();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingschedule_Dao();
        $data = $this->getAppData();
        $date = new Hrd_Models_Training_Trainingschedule_Trainingschedule();
        $this->setArrayTable($date, $this->getAppData());
        
        $hasil = $dao->getgeneratedate($em,$this->getAppRequest(), $this->getAppSession(), $this->getAppData());
        $alldate = $dao->getdate($em,$this->getAppRequest(), $this->getAppSession(), $this->getAppData(), $data["trainingschedule_id"]);
        $dm->setDataList($dataList);
        $dm->setHasil($alldate);
        return $dm;
    }

    // public function trainingdate_existRead(){
    //     $dm = new Box_Models_App_Hermes_DataModel();
    //     $dataList = new Box_Models_App_DataListCreator('', 'trainingscheduledate', array(),array());
    //     $em = new Hrd_Models_Training_Trainingschedule_Trainingschedule();
    //     $em->setProject($this->getAppSession()->getProject());
    //     $em->setPt($this->getAppSession()->getPt());
    //     $dao = new Hrd_Models_Training_Trainingschedule_Dao();
    //     $data = $this->getAppData();
    //     $date = new Hrd_Models_Training_Trainingschedule_Trainingschedule();
    //     $this->setArrayTable($date, $this->getAppData());
    //     $alldate = $dao->getdate($em,$this->getAppRequest(), $this->getAppSession(), $this->getAppData(), $data["trainingschedule_id"]);
    //     $dm->setDataList($dataList);
    //     $dm->setHasil($alldate);
    //     return $dm;
    // }

    public function deldateRead() {
        $hasil = FALSE;
        $params = $this->getAppData();
        $dao = new Hrd_Models_Training_Trainingschedule_Dao();
        $ses = $this->getAppSession();
        $msg = "...";
        $data = $this->getAppData();
        $hasil = $dao->delDate($data["ids"],$this->getAppSession(),$data["trainingschedule_id"]);


        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'trainingscheduledate', array(),array());
        $em = new Hrd_Models_Training_Trainingschedule_Trainingschedule();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingschedule_Dao();
        $date = new Hrd_Models_Training_Trainingschedule_Trainingschedule();
        $this->setArrayTable($date, $this->getAppData());
        $alldate = $dao->getdate($em,$this->getAppRequest(), $this->getAppSession(), $this->getAppData(), $data["trainingschedule_id"]);
        $dm->setDataList($dataList);
        $dm->setHasil($alldate);
        return $dm;
    }

    //employee

    public function saveheaderRead() {
        
        $em = new Hrd_Models_Training_Trainingschedule_Trainingschedule();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingschedule_Dao();
        $date = new Hrd_Models_Training_Trainingschedule_Trainingschedule();
        $this->setArrayTable($date, $this->getAppData());
        
        $hasil = $dao->saveheader($em,$this->getAppRequest(), $this->getAppSession(), $this->getAppData());
        
        $arrayRespon = array("HASIL" => $hasil);
        return Box_Tools::instantRead($arrayRespon);

    }

    public function selectemployeeRead() {
        $hasil = FALSE;
        $params = $this->getAppData();
        $dao = new Hrd_Models_Training_Trainingschedule_Dao();
        $ses = $this->getAppSession();
        $msg = "...";
        $data = $this->getAppData();
        
        $hasil = $dao->selectemployee($data["ids"],$this->getAppSession(),$data["trainingschedule_id"]);

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'trainingscheduleemployee', array(),array());
        $em = new Hrd_Models_Training_Trainingschedule_Trainingschedule();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingschedule_Dao();
        $emp = new Hrd_Models_Training_Trainingschedule_Trainingschedule();
        $this->setArrayTable($emp, $this->getAppData());
        $allemp = $dao->getemp($em,$this->getAppRequest(), $this->getAppSession(), $this->getAppData(), $data["trainingschedule_id"]);
        $dm->setDataList($dataList);
        $dm->setHasil($allemp);
        return $dm;
    }

    public function trainingemp_existRead(){
        $data = $this->getAppData();
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'trainingscheduleemployee', array(),array());
        $em = new Hrd_Models_Training_Trainingschedule_Trainingschedule();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingschedule_Dao();
        $emp = new Hrd_Models_Training_Trainingschedule_Trainingschedule();
        $this->setArrayTable($emp, $this->getAppData());
        $allemp = $dao->getemp($em,$this->getAppRequest(), $this->getAppSession(), $this->getAppData(), $data["trainingschedule_id"]);
        $dm->setDataList($dataList);
        $dm->setHasil($allemp);
        return $dm;
    }

    public function delempRead() {
        $hasil = FALSE;
        $params = $this->getAppData();
        $dao = new Hrd_Models_Training_Trainingschedule_Dao();
        $ses = $this->getAppSession();
        $msg = "...";
        $data = $this->getAppData();
        
        $hasil = $dao->delemp($data["ids"],$this->getAppSession(),$data["trainingschedule_id"]);

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'trainingscheduleemployee', array(),array());
        $em = new Hrd_Models_Training_Trainingschedule_Trainingschedule();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingschedule_Dao();
        $emp = new Hrd_Models_Training_Trainingschedule_Trainingschedule();
        $this->setArrayTable($emp, $this->getAppData());
        $allemp = $dao->getemp($em,$this->getAppRequest(), $this->getAppSession(), $this->getAppData(), $data["trainingschedule_id"]);
        $dm->setDataList($dataList);
        $dm->setHasil($allemp);
        return $dm;
    }

    public function invitedempRead() {
        $hasil = FALSE;
        $params = $this->getAppData();
        $dao = new Hrd_Models_Training_Trainingschedule_Dao();
        $ses = $this->getAppSession();
        $msg = "...";
        $data = $this->getAppData();
        $hasil = $dao->invitedemp($data["e_name"],$data["e_email"],$data["e_id"],$data["ids"],$this->getAppSession(),$data["trainingschedule_id"]);

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'trainingscheduleemployee', array(),array());
        $em = new Hrd_Models_Training_Trainingschedule_Trainingschedule();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingschedule_Dao();
        $emp = new Hrd_Models_Training_Trainingschedule_Trainingschedule();
        $this->setArrayTable($emp, $this->getAppData());
        $allemp = $dao->getemp($em,$this->getAppRequest(), $this->getAppSession(), $this->getAppData(), $data["trainingschedule_id"]);
        $dm->setDataList($dataList);
        $dm->setHasil($allemp);
        return $dm;
    }

    //added by anas 28042022
    public function deleteAttendanceFileRead(){
        $em = new Hrd_Models_Training_Trainingattendance_Trainingattendance();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingattendance_Dao();
        $hasil = $dao->deleteAttendanceFile($em, $this->getAppSession(), $this->getAppData());
        

        return Box_Tools::instantRead(array("HASIL" => 1,"ID"=>$hasil), array());
    }

    //added by anas 20062022
    public function trainingsurvey_existRead(){
        $em = new Hrd_Models_Training_Trainingattendance_Trainingattendance();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingattendance_Dao();
        $hasil = $dao->getallsurvey($em, $this->getAppSession(), $this->getAppData());
        // var_dump($hasil);exit();
        // $tree = $this->buildTree($hasil['data'], 0, 'menu');

        // var_dump($tree);exit();

        // echo Zend_Json::encode($tree);
        // $this->_helper->viewRenderer->setNoRender(true);


        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'trainingattendancesurvey', array(),array());
        


        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        
        return $dm;
    }

    protected function buildTree(&$arr, $id = 0, $keystr = '') {
        $result = array();
        foreach ($arr as $a) {

            $a['iconCls'] = 'tree-no-icon';
            $key = $keystr . '_parent';

            if ($id == $a[$key]) {
                $subtree = $this->buildTree($arr, $a[$keystr . '_id'], $keystr);
                if (count($subtree)) {
                    $a['expanded'] = true;
                    $a['children'] = $subtree;
                } else {
                    $a['leaf'] = true;
                }
                $result[] = $a;
            }
        }
        return $result;
    }

}

?>
