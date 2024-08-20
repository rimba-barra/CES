<?php

/**
 * Description of AbsentrecordController
 *
 * @author MIS
 */
require_once dirname(__DIR__) . '../library/phpexcel/PHPExcel/IOFactory.php';


ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Hrd_AbsentrecordController_BU20220311 extends Box_Models_App_Hermes_AbstractController {

    public function invalidabsentinitRead() {

        // added by Michael 2021.05.19 
        $data = $this->getAppData();
        if (array_key_exists("projectptid_opsi",$data) && $data['projectptid_opsi']){

            $projectptid_opsi = $data["projectptid_opsi"];
            $data['projectpt_id'] = $projectptid_opsi;

            $dao = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao->getProjectPtId($this->getAppSession(), $data);

            $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
            $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

            $data['project_id'] = $projectid_opsi;
            $data['pt_id'] = $ptid_opsi;

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $data['project_id'] = $this->getAppSession()->getProjectId();
            $data['pt_id'] = $this->getAppSession()->getPtid();

            $dao = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao->getProject_Pt_Id($this->getAppSession(), $data);

            $data['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }
        // end added by Michael 2021.05.19 

        $ma = new Hrd_Models_App_Mastertable_Department();
        // $aa = $ma->prosesDataWithSession($this->getAppSession(), TRUE);
        $aa = $ma->prosesDataWithoutSession($this->getAppSession(), TRUE, $data);




        return Box_Tools::instantRead(array(
                    "HASIL" => 1,
                        ), array($aa));
    }

    public function sendmailiaRead() {
        $hasil = FALSE;
        $params = $this->getAppData();
        $msg = "proses...";
        $emails = $params["emails"];
        $employeeDatas = explode("~", $emails);
        $suksesCount = 0;
        $msgErrmail = array();



        if (count($employeeDatas) > 0) {

            foreach ($employeeDatas as $employeeData) {
                $employeeData = explode("##", $employeeData);
                $email = $employeeData[0];
                $nama = $employeeData[1];
                if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
                    try {
                        $message = '<html><body>';
                        $message .= '<p>Dear Bapak / Ibu, ' . $nama . '</p>';
                        $message .= "<p>Email: </p>";
                        $message .= "</body></html>";

                        $to = $email;
                        $mail = new Hrd_Models_General_Email();
                        $mail->getMail()->setFrom('no.reply@ciputra.com', "HCMS System");

                        $mail->getMail()->setBodyHtml(nl2br($message));
                        $mail->getMail()->addTo($email, $nama);
                        $mail->getMail()->addCc("hr.admin@ciputra.co.id", "hr.admin");
                        //$mail->addCc('emailAddress', 'nameUser');
                        $mail->getMail()->setSubject('Pemberitahuan Absent');
                        $mail->getMail()->send();

                        $suksesCount ++;

                        // $statusSentMail = TRUE;
                    } catch (Zend_Mail_Exception $e) {
                        //  $statusSentMail = FALSE;
                        $msgErrmail[] = $email;
                    }
                }
            }
        }

        $hasil = $suksesCount > 0 ? TRUE : FALSE;

        if (count($msgErrmail) > 0) {
            $msg = "Error email ke : ";
            $msg .= implode(",", $msgErrmail);
        }



        $arrayRespon = array("HASIL" => $hasil, "MSG" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function employeeiaRead() {
        $data = $this->getAppData();
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'date', array('employee', 'department'), array());
        $dao = new Hrd_Models_AbsentDao();
        $startDate = $data["start_date"];
        $endDate = $data["end_date"];




        $dg = new Hrd_Models_App_DayGenerator(1, 2016);

        $dm->setDataList($dataList);
        $dm->setHasil($dao->getInvalidAbsent($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId(), $startDate, $endDate));
        $dm->setStoredObject(array("dayGenerator" => $dg));
        return $dm;
    }

    public function jatahcutiRead() {

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'leaveentitlement', array('employee'), array());
        $dao = new Hrd_Models_Leave_LeaveEntitlementDao();
        $enti = new Hrd_Models_Leave_LeaveEntitlement();

        $enti->setArrayTable($this->getAppData());

        // added by Michael 2021.05.19 
        $data = $this->getAppData();
        if (array_key_exists("projectptid_opsi",$data) && $data['projectptid_opsi']){

            $projectptid_opsi = $data["projectptid_opsi"];
            $data['projectpt_id'] = $projectptid_opsi;

            $dao_projectpt = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao_projectpt->getProjectPtId($this->getAppSession(), $data);

            $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
            $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

            $data['project_id'] = $projectid_opsi;
            $data['pt_id'] = $ptid_opsi;

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $data['project_id'] = $this->getAppSession()->getProjectId();
            $data['pt_id'] = $this->getAppSession()->getPtid();

            $dao_projectpt = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao_projectpt->getProject_Pt_Id($this->getAppSession(), $data);

            $data['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }
        
        $project = new Box_Models_Master_Project();
        $project->setId($data['project_id']);

        $pt = new Box_Models_Master_Pt();
        $pt->setId($data['pt_id']);
        // end added by Michael 2021.05.19 


        // $enti->setProject($this->getAppSession()->getProject());
        // $enti->setPt($this->getAppSession()->getPt());

        // added by Michael 2021.05.19 
        $enti->setProject($project);
        $enti->setPt($pt);
        // end added by Michael 2021.05.19 

        $dm->setDataList($dataList);
        $dm->setHasil($dao->getAllByEmployeeWOPL($enti));
        return $dm;
    }
    
    public function overtimeRead() {

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'overtime', array(), array());
        $dao = new Hrd_Models_Overtime_Dao();
        $enti = new Hrd_Models_Overtime_Overtime();
        $employee = new Hrd_Models_Employee_Employee();
        $employee->setArrayTable($this->getAppData());

        $enti->setArrayTable($this->getAppData());
        // $enti->setProject($this->getAppSession()->getProject());
        // $enti->setPt($this->getAppSession()->getPt());

        // added by Michael 2021.05.19 
        $data = $this->getAppData();
        if (array_key_exists("projectptid_opsi",$data) && $data['projectptid_opsi']){

            $projectptid_opsi = $data["projectptid_opsi"];
            $data['projectpt_id'] = $projectptid_opsi;

            $dao_projectpt = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao_projectpt->getProjectPtId($this->getAppSession(), $data);

            $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
            $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

            $data['project_id'] = $projectid_opsi;
            $data['pt_id'] = $ptid_opsi;

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $data['project_id'] = $this->getAppSession()->getProjectId();
            $data['pt_id'] = $this->getAppSession()->getPtid();

            $dao_projectpt = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao_projectpt->getProject_Pt_Id($this->getAppSession(), $data);

            $data['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }
        
        $project = new Box_Models_Master_Project();
        $project->setId($data['project_id']);

        $pt = new Box_Models_Master_Pt();
        $pt->setId($data['pt_id']);

        $enti->setProject($project);
        $enti->setPt($pt);
        // end added by Michael 2021.05.19 
        
        $params = $this->getAppData();

        $dm->setDataList($dataList);
        $dm->setHasil($dao->getAllWithEmployeeFilter($this->getAppRequest(), $enti, $employee, $params["date"], $params["date"]));
        return $dm;
    }
    
    public function deletereasonRead() {
        $hasil = FALSE;
        $params = $this->getAppData();

        // added by Michael 2021.05.19 
        if (array_key_exists("projectptid_opsi",$params) && $params['projectptid_opsi']){

            $projectptid_opsi = $params["projectptid_opsi"];
            $params['projectpt_id'] = $projectptid_opsi;

            $dao_projectpt = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao_projectpt->getProjectPtId($this->getAppSession(), $params);

            $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
            $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

            $params['project_id'] = $projectid_opsi;
            $params['pt_id'] = $ptid_opsi;

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $params['project_id'] = $this->getAppSession()->getProjectId();
            $params['pt_id'] = $this->getAppSession()->getPtid();

            $dao_projectpt = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao_projectpt->getProject_Pt_Id($this->getAppSession(), $params);

            $params['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }
        
        $project = new Box_Models_Master_Project();
        $project->setId($params['project_id']);

        $pt = new Box_Models_Master_Pt();
        $pt->setId($params['pt_id']);
        // end added by Michael 2021.05.19 

        $msg = "proses...";
        $dao = new Hrd_Models_AbsentDao();
        $date = new Hrd_Models_Master_General_Date();
        $date->setId(intval($params["absentdetail_id"]));

        // $hasil = $dao->deleteReason($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId(), $date, $this->getAppSession()->getUser()->getId());

        // added by Michael 2021.05.19 
        $hasil = $dao->deleteReason($params['project_id'], $params['pt_id'], $date, $this->getAppSession()->getUser()->getId());
        // end added by Michael 2021.05.19 
                
        // update by Wulan 2020 07 07
        // #1
        // $project_id = $this->getAppSession()->getProject()->getId();

        // #2
        // added by Michael 2021.05.19 
        $project_id = $params['project_id'];
        // end added by Michael 2021.05.19 

        $dao = new Hrd_Models_Intranet_ConfigDao();
        $data = $dao->getProjectconfig($project_id);
        if (!empty($data[0])) {
            $subholding_subname = $data[0][0]['subholding_subname'];
            if($subholding_subname == 'sh1b'){        
                $dao_absent = new Hrd_Models_AbsentDao();
                $dates = $params['start_date'].'~';
                $dao_absent->update_wfh_attn_byid_raya($params['employee_id'], $dates, $this->getAppSession());
            }
        }
        
        $arrayRespon = array("HASIL" => $hasil, "MSG" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function yearfilterRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'absent', array(), array());
        $dao = new Hrd_Models_AbsentDao();

        // added by Michael 2021.05.19 
        $data_params = $this->getAppData();
        if (array_key_exists("projectptid_opsi",$data_params) && $data_params['projectptid_opsi']){

            if($data_params['projectptid_opsi']){

                $data_params['projectpt_id'] = $data_params['projectptid_opsi'];

                $hasil_projectpt = $dao->getProjectPtId($this->getAppSession(), $data_params);

                $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
                $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

                $data_params['project_id'] = $projectid_opsi;
                $data_params['pt_id'] = $ptid_opsi;

            }

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $data_params['project_id'] = $this->getAppSession()->getProjectId();
            $data_params['pt_id'] = $this->getAppSession()->getPtid();

            $hasil_projectpt = $dao->getProject_Pt_Id($this->getAppSession(), $data_params);

            $data_params['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }
        // end added by Michael 2021.05.19 

        $dm->setDataList($dataList);
        // $dm->setHasil($dao->getYears($this->getAppSession()));
        $dm->setHasil($dao->getYears($this->getAppSession(),$data_params));
        return $dm;
    }

    public function monthfilterRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'absent', array(), array());
        $data = $this->getAppData();
        $dao = new Hrd_Models_AbsentDao();

        // added by Michael 2021.05.19 
        if (array_key_exists("projectptid_opsi",$data) && $data['projectptid_opsi']){

            if($data['projectptid_opsi']){

                $data['projectpt_id'] = $data['projectptid_opsi'];

                $hasil_projectpt = $dao->getProjectPtId($this->getAppSession(), $data);

                $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
                $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

                $data['project_id'] = $projectid_opsi;
                $data['pt_id'] = $ptid_opsi;
            }

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $data['project_id'] = $this->getAppSession()->getProjectId();
            $data['pt_id'] = $this->getAppSession()->getPtid();

            $hasil_projectpt = $dao->getProject_Pt_Id($this->getAppSession(), $data);

            $data['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }
        // end added by Michael 2021.05.19 

        $absent = new Hrd_Models_Absent();
        $absent->setYear($data["year"]);
        $absent->setProject($this->getAppSession()->getProject());
        $absent->setPt($this->getAppSession()->getPt());
        $dm->setDataList($dataList);
        // $dm->setHasil($dao->getMonths($absent));
        $dm->setHasil($dao->getMonths($absent, $data));
        return $dm;
    }

    public function departmentfilterRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'department', array(), array());
        $data = $this->getAppData();
        $dao = new Hrd_Models_AbsentDao();

        // added by Michael 2021.05.19 
        if (array_key_exists("projectptid_opsi",$data) && $data['projectptid_opsi']){

            if($data['projectptid_opsi']){

                $data['projectpt_id'] = $data['projectptid_opsi'];

                $hasil_projectpt = $dao->getProjectPtId($this->getAppSession(), $data);

                $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
                $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

                $data['project_id'] = $projectid_opsi;
                $data['pt_id'] = $ptid_opsi;

            }

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $data['project_id'] = $this->getAppSession()->getProjectId();
            $data['pt_id'] = $this->getAppSession()->getPtid();

            $hasil_projectpt = $dao->getProject_Pt_Id($this->getAppSession(), $data);

            $data['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }
        // end added by Michael 2021.05.19 

        $absent = new Hrd_Models_Absent();
        $absent->setYear($data["year"]);
        $absent->setMonth($data["month"]);
        $absent->setProject($this->getAppSession()->getProject());
        $absent->setPt($this->getAppSession()->getPt());
        $dm->setDataList($dataList);
        // $dm->setHasil($dao->getDepartments($absent));
        $dm->setHasil($dao->getDepartments($absent, $data));
        return $dm;
    }

    public function periodeterakhirRead() {
        $hasil = FALSE;
        $data = array();
        $dao = new Hrd_Models_AbsentDao();

        // added by Michael 2021.05.19 
        $data_params = $this->getAppData();
        if (array_key_exists("projectptid_opsi",$data_params)){

            $data_params['projectpt_id'] = $data_params['projectptid_opsi'];

            $hasil_projectpt = $dao->getProjectPtId($this->getAppSession(), $data_params);

            $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
            $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

            $data_params['project_id'] = $projectid_opsi;
            $data_params['pt_id'] = $ptid_opsi;

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $data_params['project_id'] = $this->getAppSession()->getProjectId();
            $data_params['pt_id'] = $this->getAppSession()->getPtid();

            $hasil_projectpt = $dao->getProject_Pt_Id($this->getAppSession(), $data_params);

            $data_params['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }
        // end added by Michael 2021.05.19 
        

        // $hasil = $dao->getLastPeriod($this->getAppSession());
        $hasil = $dao->getLastPeriod($this->getAppSession(), $data_params);

        $str = "";
        $month = 0;
        $year = 0;
        if (Box_Tools::adaRecordSimple($hasil)) {
            $month = $hasil[0][0]["month"];
            $year = $hasil[0][0]["year"];
        } else {
            
            /* comment by Wulan Sari 2018.05.07
            $month = Date("m");
            $year = Date("Y"); 
             */
            
            /* added by Wulan Sari 2018.05.07 
             * untuk default jika record last periode tidak ada maka defaultnya januari tahun berjalan
            */
            $month = '12';
            $year = Date("Y") - 1; 
            
            
        }


        $date = new DateTime($year . '-' . $month . '-01');
        $date->add(new DateInterval('P1M'));


        $msg = "";
        $data = $date->format('m/Y');


        $arrayRespon = array("HASIL" => "", "MSG" => $msg, "DATA" => $data);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function cutibersamaRead() {




        $hasil = FALSE;
        $params = $this->getAppData();
        $dao = new Hrd_Models_AbsentDao();
        $ses = $this->getAppSession();
        $msg = "...";
        $jenisError = 0;
        $confirmed = FALSE; // sudah yakin untuk memproses cuti bersama


        $data = $this->getAppData();

        $confirmed = array_key_exists("confirmed", $data);

        // added by Michael 2021.05.19 
        if (array_key_exists("projectptid_opsi",$data) && $data['projectptid_opsi']){

            if($data['projectptid_opsi']){

                $data['projectpt_id'] = $data['projectptid_opsi'];

                $hasil_projectpt = $dao->getProjectPtId($this->getAppSession(), $data);

                $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
                $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

                $data['project_id'] = $projectid_opsi;
                $data['pt_id'] = $ptid_opsi;

            }

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $data['project_id'] = $this->getAppSession()->getProjectId();
            $data['pt_id'] = $this->getAppSession()->getPtid();

            $hasil_projectpt = $dao->getProject_Pt_Id($this->getAppSession(), $data);

            $data['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }
        // end added by Michael 2021.05.19



        $leave = new Hrd_Models_Leave_Leave();
        $leave->setArrayTable($data);
        $leave->setAddBy($this->getAppSession()->getUser()->getId());

        // $leave->setProject($this->getAppSession()->getProject());
        // $leave->setPt($this->getAppSession()->getPt());

        // added by Michael 2021.05.19 
        $project = new Box_Models_Master_Project();
        $project->setId($projectid_opsi);

        $pt = new Box_Models_Master_Pt();
        $pt->setId($ptid_opsi);

        $leave->setProject($project);
        $leave->setPt($pt);
        // end added by Michael 2021.05.19 


        /// get id absenttype
        $absentTypeCode = Box_Config::ABSENTTYPE_CODE_TAHUNAN;
        $mdDao = new Hrd_Models_General_Dao();

        // $hasilmd = $mdDao->getMasterDataId("ABSENTTYPE", $absentTypeCode, $this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId());

        // added by Michael 2021.05.19 
        $hasilmd = $mdDao->getMasterDataId("ABSENTTYPE", $absentTypeCode, $projectid_opsi, $ptid_opsi);
        // end added by Michael 2021.05.19 

        $absentType = Box_Tools::toObjectRow($hasilmd, new Hrd_Models_Master_AbsentType());




        $isValid = false;
        /// validasi 
        if (!$leave->getStartDate()) {
            $msg = "Tanggal awal tidak valid.";
        } else if (!$leave->getEndDate()) {
            $msg = "Tanggal akhir tidak valid.";
        } else if (strlen($leave->getNote()) < 3) {
            $msg = "Keterangan minimal 3 karakter.";
        } else if ($absentType->getId() == 0) {
            $msg = "Master data " . $absentTypeCode . " tidak terdaftar";
        } else {
            
            $isValid = true;
        }
        /// end validasi

        if ($isValid) {


            $leave->getAbsentType()->setId($absentType->getId());
            $cb = new Hrd_Models_Leave_CutiBersama($leave, $this->getAppSession());
            $cb->setListKaryawan($data["ids"]);
            $cb->confirmed = $confirmed;
            $cb->jumlahHakCutiKepotong = $params["jml_hari_kepotong"];
            
            
            // added by Wulan Sari 06.06.2018
            $leave->setDuration($params["jml_hari_kepotong"]);

            
    

            $decan = $cb->process();
            $listHakCuti = $cb->getListHakCuti();



            // var_dump($cb->getMsg());
            // die();
            // var_dump($listHakCuti);

            if (!$cb->getStatus()) {
                $msg = $cb->getMsg();
                $jenisError = $cb->getJenisError();
            } else {

                $employeeIds = explode("~", $data["ids"]);

                $allLeave = array();

                $validatorErrorMSg = "";
                $jumlahTidahLolosValidasi = 0;
                $karyawanTidakLolosValidasi = array();
                $karyawanTidakLolosValidasiData = array();
                $dataCutiSetelahValidasi = array();
                $count = 0;
                foreach ($employeeIds as $id) {
                    $employeeId = intval($id);
                    if ($employeeId > 0) {
                        $newLeave = new Hrd_Models_Leave_Leave();
                        $newLeave = clone $leave;
                        $newLeave->getEmployee()->setId($employeeId);

                        $validator = new Hrd_Models_Leave_Validator();
                        $validator->run($newLeave);

                        //    var_dump($newLeave->getEmployee()->getId());

                        if (!$validator->getStatus()) {
                            // $validatorErrorMSg .= $validator->getMsg()." | ";
                            // $jumlahTidahLolosValidasi++;
                            $karyawanTidakLolosValidasi[] = $employeeId;
                            $karyawanTidakLolosValidasiData[] = array(
                                "em" => $employeeId,
                                "msg_error" => $validator->getMsg()
                            );
                        } else {

                            $dataCutiSetelahValidasi[] = array(
                                "em" => $employeeId,
                                "leave" => $leave,
                                "storage" => $validator->getStorage()
                            );
                            //  var_dump($dataCutiSetelahValidasi[$count]["leave"]->getEmployee()->getId());
                            $count++;
                        }
                        unset($newLeave);
                    }
                }




                if (count($karyawanTidakLolosValidasi) > 0) {
                    $karyawanTidakLolosValidasi = implode("~", $karyawanTidakLolosValidasi);
                    /// ambil nama karyawan
                    $eDao = new Hrd_Models_Master_EmployeeDao();
                    $listEm = $eDao->getAllByIds($karyawanTidakLolosValidasi);
                    $listEm = Box_Tools::toObjectResult($listEm, new Hrd_Models_Master_Employee());
                    $tempEr = array();
                    foreach ($karyawanTidakLolosValidasiData as $k => $val) {
                        foreach ($listEm as $liste) {
                            if ($liste->getId() == $val["em"]) {
                                $tempEr[] = $liste->getName() . " " . $karyawanTidakLolosValidasiData[$k]["msg_error"] . " <br/>";
                            }
                        }
                    }
                    $msg = "Proses tidak dapat dilanjutkan karena : <br/>";
                    $msg .= implode(" ", $tempEr);
                    $jenisError = 99;
                } else {
                    // semua karyawan lolos validasi 
                    $dao = new Hrd_Models_Leave_Dao();
                    foreach ($dataCutiSetelahValidasi as $k => $dataCutiSv) {

                        $dataCutiSv["leave"]->getEmployee()->setId($dataCutiSv["em"]);
                        $processor = new Hrd_Models_App_Box_LeaveSubmissionProcessor();
                        $processor->setSession($this->getAppSession());
                        $leaveAfterProcess = $processor->proses($dataCutiSv["leave"], $dataCutiSv["storage"]);
                        //  $dataCutiSetelahValidasi[$k]["processor"] = $processor;
                        // var_dump($dataCutiSv["em"]);

                        //$hasilSave = $dao->save2($leaveAfterProcess, $processor->getDates(), $processor->getHasilJatahCuti(), $processor->getJatahCutiKaryawan());
                        $hasilSave = $dao->save($leaveAfterProcess, $processor->getDates(), $processor->getHasilJatahCuti(), $processor->getJatahCutiKaryawan());
                    }

                    $hasil = TRUE;
                    $msg = "Sukses";
                }
            }
        }

        $arrayRespon = array("HASIL" => $hasil, "JENISERR" => $jenisError, "MSG" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }

    // added by Michael 2021.06.30 
    public function cutitambahanRead() {

        $hasil = FALSE;
        $params = $this->getAppData();
        $dao = new Hrd_Models_AbsentDao();
        $ses = $this->getAppSession();
        $msg = "...";
        $jenisError = 0;
        $confirmed = FALSE; 
        $proses = 0;
        $empproses = 0;

        $data = $this->getAppData();

        $confirmed = array_key_exists("confirmed", $data);

        if (array_key_exists("projectptid_opsi",$data) && $data['projectptid_opsi']){

            if($data['projectptid_opsi']){

                $data['projectpt_id'] = $data['projectptid_opsi'];

                $hasil_projectpt = $dao->getProjectPtId($this->getAppSession(), $data);

                $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
                $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

                $data['project_id'] = $projectid_opsi;
                $data['pt_id'] = $ptid_opsi;

            }

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $data['project_id'] = $this->getAppSession()->getProjectId();
            $data['pt_id'] = $this->getAppSession()->getPtid();

            $hasil_projectpt = $dao->getProject_Pt_Id($this->getAppSession(), $data);

            $data['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }

        $isValid = false;
        /// validasi 
        if (!array_key_exists("extraleave_id",$data) && !$data['extraleave_id']) {
            $msg = "Extra Leave Id null";
        } else if (!array_key_exists("periode",$data) && !$data['periode']) {
            $msg = "Periode null";
        } else if (!array_key_exists("leavegroup",$data) && !$data['leavegroup']) {
            $msg = "Leave Group null";
        } else if (!array_key_exists("expired_date",$data) && !$data['expired_date']) {
            $msg = "Expired Date null";
        } else if (!array_key_exists("amount",$data) && !$data['amount'] && !is_numeric($data['amount'])) {
            $msg = "Leave Entitlements null / Leave Entitlements bukan angka";
        } else if (!array_key_exists("description",$data) && !$data['description']) {
            $msg = "Description Date null";
        } else if (!array_key_exists("ids",$data) && !$data['ids']) {
            $msg = "Employee null";
        } else {
            $isValid = true;
        }
        /// end validasi

        if ($isValid) {

            $dao = new Hrd_Models_AbsentDao();
            $employeeIds = explode("~", $data["ids"]);
            
            $desc_form = $data['description'];
            //employee yg dipilih
            foreach($employeeIds as $key => $item){
                if($item){
                    $data['employee_id'] = $item;
                    $data['description'] = $desc_form;
                    $check_proses = $dao->check_proses($this->getAppSession(), $data);
                    
                    if($check_proses[0] && array_key_exists("0",$check_proses[0])){
                        if($check_proses[0][0]['proses'] == 0){
                            
                            $check_leaveentitlements = $dao->check_leaveentitlements($this->getAppSession(), $data);
                            
                            if($check_leaveentitlements[0][0]['totalRow'] > 0){
                                $data['rest_update'] = $check_leaveentitlements[1][0]['rest'] + $data['amount'];
                                $data['description'] = $data['description'].' (ExtraLeaveId: '. $data['extraleave_id'].') ';

                                if($check_leaveentitlements[1][0]['description']){
                                    $data['description'] = $check_leaveentitlements[1][0]['description'] .', '. $data['description'];
                                }

                                // tambah karena ada cuti policy baru 2021
                                $data['leaveentitlements_id'] = $check_leaveentitlements[1][0]['leaveentitlements_id'];

                                $proses = $dao->prosesupdate_cutitambahan($this->getAppSession(), $data);
                                $msg = "Success..";
                            }else{
                                
                                $data['leaveentitlements_id'] = 0;

                                $proses = $dao->prosescreate_cutitambahan($this->getAppSession(), $data);
                                $msg = "Success..";
                            }

                            $empproses++;
                        }
                    }
                }
            }

            //employee yg di cancel tp sudah diproses
            $check_proses_empcancel = $dao->check_proses_empcancel($this->getAppSession(), $data);

            if($check_proses_empcancel[0] && array_key_exists("0",$check_proses_empcancel[0])){
                foreach($check_proses_empcancel[0] as $key => $item){
                    if($item && $item['proses'] == 1){
                        $data['employee_id'] = $item['employee_id'];
                        $data['description'] = $desc_form;
                        $check_leaveentitlements = $dao->check_leaveentitlements($this->getAppSession(), $data);

                        if($check_leaveentitlements[0][0]['totalRow'] > 0){
                            $data['rest_update'] = $check_leaveentitlements[1][0]['rest'] - $data['amount'];

                            if($check_leaveentitlements[1][0]['description']){
                                $data['description'] = $check_leaveentitlements[1][0]['description'] .', '. $data['description'].' (Cancel ExtraLeaveId: '. $data['extraleave_id'].') ';

                            }

                            // tambah karena ada cuti policy baru 2021
                            $data['leaveentitlements_id'] = $check_leaveentitlements[1][0]['leaveentitlements_id'];

                            $proses = $dao->prosesupdate_cutitambahan($this->getAppSession(), $data);
                            $prosesupdateemp = $dao->cancelprosesemp_cutitambahan($this->getAppSession(), $data);
                        }
                    }
                }
            }

            $proses = $dao->prosesupdate_isproses_cutitambahan($this->getAppSession(), $data);

            if($empproses == 0 ){
                $msg = "Success, tapi tidak ada employee baru yg harus diproses..";
            }else{
                $msg = "Success..";
            }
        }
        

        $arrayRespon = array("HASIL" => $proses,"MSG" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function saveheader_cutitambahanRead() {
        
        $data = $this->getAppData();
        $dao = new Hrd_Models_AbsentDao();

        if (array_key_exists("projectptid_opsi",$data) && $data['projectptid_opsi']){

            if($data['projectptid_opsi']){

                $data['projectpt_id'] = $data['projectptid_opsi'];

                $hasil_projectpt = $dao->getProjectPtId($this->getAppSession(), $data);

                $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
                $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

                $data['project_id'] = $projectid_opsi;
                $data['pt_id'] = $ptid_opsi;

            }

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $data['project_id'] = $this->getAppSession()->getProjectId();
            $data['pt_id'] = $this->getAppSession()->getPtid();

            $hasil_projectpt = $dao->getProject_Pt_Id($this->getAppSession(), $data);

            $data['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }

        if($data['extraleave_id']){
            $hasil = $dao->updateheader_cutitambahan($this->getAppSession(), $data);
        }else{
            $hasil = $dao->saveheader_cutitambahan($this->getAppSession(), $data);
        }

        if($hasil){
            $msg = "success";
        }else{
            $msg = "error";
        }

        $arrayRespon = array("hasil" => $hasil, "msg" => $msg);
        return Box_Tools::instantRead($arrayRespon);

    }
    public function employeelist_cutitambahanRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'kelompokabsensiemployee', array(), array());
        $data = $this->getAppData();
        $dao = new Hrd_Models_AbsentDao();

        if (array_key_exists("projectptid_opsi",$data) && $data['projectptid_opsi']){

            if($data['projectptid_opsi']){

                $data['projectpt_id'] = $data['projectptid_opsi'];

                $hasil_projectpt = $dao->getProjectPtId($this->getAppSession(), $data);

                $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
                $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

                $data['project_id'] = $projectid_opsi;
                $data['pt_id'] = $ptid_opsi;

            }

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $data['project_id'] = $this->getAppSession()->getProjectId();
            $data['pt_id'] = $this->getAppSession()->getPtid();

            $hasil_projectpt = $dao->getProject_Pt_Id($this->getAppSession(), $data);

            $data['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }
           
        $hasil = $dao->getEmployeelist($this->getAppRequest(), $this->getAppSession(), $data);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    public function loglist_cutitambahanRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'extraleave', array(), array());
        $data = $this->getAppData();
        $dao = new Hrd_Models_AbsentDao();

        if (array_key_exists("projectptid_opsi",$data) && $data['projectptid_opsi']){

            if($data['projectptid_opsi']){

                $data['projectpt_id'] = $data['projectptid_opsi'];

                $hasil_projectpt = $dao->getProjectPtId($this->getAppSession(), $data);

                $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
                $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

                $data['project_id'] = $projectid_opsi;
                $data['pt_id'] = $ptid_opsi;

            }

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $data['project_id'] = $this->getAppSession()->getProjectId();
            $data['pt_id'] = $this->getAppSession()->getPtid();

            $hasil_projectpt = $dao->getProject_Pt_Id($this->getAppSession(), $data);

            $data['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }
           
        $hasil = $dao->getLoglist($this->getAppRequest(), $this->getAppSession(), $data);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    // end added by Michael 2021.06.30 

    /* mark on 20170505
      public function cutibersamaRead() {




      $hasil = FALSE;
      $params = $this->getAppData();
      $dao = new Hrd_Models_AbsentDao();
      $ses = $this->getAppSession();
      $msg = "...";
      $jenisError = 0;
      $confirmed = FALSE; // sudah yakin untuk memproses cuti bersama


      $data = $this->getAppData();

      $confirmed = array_key_exists("confirmed", $data);





      $leave = new Hrd_Models_Leave_Leave();
      $leave->setArrayTable($data);
      $leave->setAddBy($this->getAppSession()->getUser()->getId());
      $leave->setProject($this->getAppSession()->getProject());
      $leave->setPt($this->getAppSession()->getPt());


      /// get id absenttype
      $absentTypeCode = Box_Config::ABSENTTYPE_CODE_TAHUNAN;
      $mdDao = new Hrd_Models_General_Dao();
      $hasilmd = $mdDao->getMasterDataId("ABSENTTYPE", $absentTypeCode, $this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId());
      $absentType = Box_Tools::toObjectRow($hasilmd, new Hrd_Models_Master_AbsentType());




      $isValid = false;
      /// validasi
      if (!$leave->getStartDate()) {
      $msg = "Tanggal awal tidak valid.";
      } else if (!$leave->getEndDate()) {
      $msg = "Tanggal akhir tidak valid.";
      } else if (strlen($leave->getNote()) < 3) {
      $msg = "Keterangan minimal 3 karakter.";
      } else if ($absentType->getId() == 0) {
      $msg = "Master data " . $absentTypeCode . " tidak terdaftar";
      } else {
      $isValid = true;
      }



      /// end validasi

      if ($isValid) {







      $leave->getAbsentType()->setId($absentType->getId());
      $cb = new Hrd_Models_Leave_CutiBersama($leave, $this->getAppSession());
      $cb->setListKaryawan($data["ids"]);
      $cb->confirmed = $confirmed;
      $cb->jumlahHakCutiKepotong = $params["jml_hari_kepotong"];



      $decan = $cb->process();
      $listHakCuti = $cb->getListHakCuti();



      // var_dump($cb->getMsg());
      // die();
      // var_dump($listHakCuti);

      if (!$cb->getStatus()) {
      $msg = $cb->getMsg();
      $jenisError = $cb->getJenisError();
      } else {

      $dao = new Hrd_Models_General_Dao();
      $absentSheet = $dao->getAbsentSheetByListKaryawan($data["ids"], $this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId(), $leave->getStartDate(), $leave->getEndDate());



      $absentSheet = $absentSheet[0];
      $absentSheet = Ruangkoding_Cuti_Main::dataGrouping($absentSheet);


      $daftarHakCuti = $dao->getHakCutiByListKaryawan($data["ids"], $this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId(), Box_Config::LEAVE_GROUP_TAHUNAN);


      $daftarHakCuti = $daftarHakCuti[0];
      $daftarHakCuti = Ruangkoding_Cuti_Main::dataGrouping($daftarHakCuti);








      $arKaryawan = explode("~", $data["ids"]);

      $dataSaveAbsentRecord = array();
      $dataSaveHakCuti = array();
      $dataSaveTransaksiCuti = array();


      if (count($arKaryawan) > 0) {
      foreach ($arKaryawan as $karyawan) {
      $karyawan = intval($karyawan);
      if ($karyawan > 0) {
      $prosesCuti = new Ruangkoding_Cuti_Main($karyawan, $leave->getStartDate(), $leave->getEndDate());
      $prosesCuti->setAbsentSheet($absentSheet[$karyawan]);
      $prosesCuti->setDaftarHakCuti($daftarHakCuti[$karyawan]);
      $prosesCuti->setIsSetengahHari(intval($data["is_halfday"]) == 1 ? TRUE : FALSE);
      $prosesCuti->setDurasi($data["jml_hari_kepotong"]); /// jika durasi diinput dari user
      $prosesCuti->proses();

      /// pembuatan data untuk simpan ke absent record
      $has = $prosesCuti->getHasilAbsentSheet();
      foreach ($has as $row) {
      $absent = new Hrd_Models_Master_General_Date();
      $absent->setDate($row);
      $absent->getAbsent()->getEmployee()->setId($karyawan);
      $absent->getAbsentType()->setCode(Box_Config::ABSENTTYPE_CODE_TAHUNAN);
      $absent->setNote($leave->getNote());
      $dataSaveAbsentRecord[] = $absent;
      }

      // pembuatan data untuk simpan ke hak cuti
      $hhc = $prosesCuti->getHasilHakCuti();

      $hakCuti = new Hrd_Models_Leave_LeaveEntitlement();
      $hakCuti->getEmployee()->setId($karyawan);
      $hakCuti->setStartUse($hhc["tahun"]);
      $hakCuti->setRest($hhc["sisa"]);
      $dataSaveHakCuti[] = $hakCuti;

      // var_dump($prosesCuti->getDurasi());
      // pembuatan data untuk simpan ke transaksi cuti
      $transaksiCuti = new Hrd_Models_Leave_Leave();
      $transaksiCuti->setStartDate($leave->getStartDate());
      $transaksiCuti->setEndDate($leave->getEndDate());
      $transaksiCuti->getEmployee()->setId($karyawan);
      $transaksiCuti->getAbsentType()->setCode(Box_Config::ABSENTTYPE_CODE_TAHUNAN);
      $transaksiCuti->setDuration($prosesCuti->getDurasi());
      $transaksiCuti->setIsHalfDay(intval($data["is_halfday"]) == 1 ? TRUE : FALSE);
      $transaksiCuti->setNote($leave->getNote());
      $dataSaveTransaksiCuti[] = $transaksiCuti;


      //var_dump($prosesCuti->getHasilHakCuti());
      echo $prosesCuti->getPesanError();
      }
      }
      }


      $decan = Box_Tools::toDecan($dataSaveAbsentRecord);
      $decanHakCuti = Box_Tools::toDecan($dataSaveHakCuti);
      $decanTransaksiCuti = Box_Tools::toDecan($dataSaveTransaksiCuti);






      $dao = new Hrd_Models_Leave_Dao();
      $hasil = $dao->saveCutiBersama($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId(), Box_Config::LEAVE_GROUP_TAHUNAN, $leave, $decan->getDCResult(), $decanHakCuti->getDCResult(), $decanTransaksiCuti->getDCResult());



      //
      //
      //  $dao = new Hrd_Models_Leave_Dao();
      //  $hasil = $dao->saveCutiBersama($leave, $decan, $listHakCuti);



      if (!$hasil) {
      $msg = "Terjadi kesalahan ketika memproses di database";
      $jenisError = 99;
      }
      }
      }






      $arrayRespon = array("HASIL" => $hasil, "JENISERR" => $jenisError, "MSG" => $msg);
      return Box_Tools::instantRead($arrayRespon);
      }

     */

    /*
      public function cutibersamaRead() {


      $absentSheet = array(
      array("tgl" => "2016-07-10", "ada_tipeabsen" => TRUE),
      array("tgl" => "2016-07-11", "ada_tipeabsen" => FALSE),
      // array("tgl" => "2016-07-12", "ada_tipeabsen" => FALSE),
      // array("tgl" => "2016-07-13", "ada_tipeabsen" => TRUE),
      // array("tgl" => "2016-07-14", "ada_tipeabsen" => FALSE),
      // array("tgl" => "2016-07-15", "ada_tipeabsen" => FALSE)

      );

      /// daftar hak cuti by tipe hak cuti
      $daftarHakCuti = array(
      array("tahun"=>"2015","sisa"=>12),
      array("tahun"=>"2014","sisa"=>6),
      array("tahun"=>"2015","sisa"=>7)
      );

      $prosesCuti = new Ruangkoding_Cuti_Main("2016-07-10","2016-07-11");
      $prosesCuti->setAbsentSheet($absentSheet);
      $prosesCuti->setDaftarHakCuti($daftarHakCuti);
      //  $prosesCuti->setDurasi(7); /// jika durasi diinput dari user
      $prosesCuti->proses();

      var_dump($prosesCuti->getHasilAbsentSheet());

      echo $prosesCuti->getPesanError();


      die();

      $hasil = FALSE;
      $params = $this->getAppData();
      $dao = new Hrd_Models_AbsentDao();
      $ses = $this->getAppSession();
      $msg = "...";
      $jenisError = 0;
      $confirmed = FALSE; // sudah yakin untuk memproses cuti bersama


      $data = $this->getAppData();

      $confirmed = array_key_exists("confirmed", $data);





      $leave = new Hrd_Models_Leave_Leave();
      $leave->setArrayTable($data);
      $leave->setAddBy($this->getAppSession()->getUser()->getId());
      $leave->setProject($this->getAppSession()->getProject());
      $leave->setPt($this->getAppSession()->getPt());


      /// get id absenttype
      $absentTypeCode = Box_Config::ABSENTTYPE_CODE_TAHUNAN;
      $mdDao = new Hrd_Models_General_Dao();
      $hasilmd = $mdDao->getMasterDataId("ABSENTTYPE", $absentTypeCode, $this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId());
      $absentType = Box_Tools::toObjectRow($hasilmd, new Hrd_Models_Master_AbsentType());




      $isValid = false;
      /// validasi
      if (!$leave->getStartDate()) {
      $msg = "Tanggal awal tidak valid.";
      } else if (!$leave->getEndDate()) {
      $msg = "Tanggal akhir tidak valid.";
      } else if (strlen($leave->getNote()) < 3) {
      $msg = "Keterangan minimal 3 karakter.";
      } else if ($absentType->getId() == 0) {
      $msg = "Master data " . $absentTypeCode . " tidak terdaftar";
      } else {
      $isValid = true;
      }



      /// end validasi

      if ($isValid) {
      $leave->getAbsentType()->setId($absentType->getId());
      $cb = new Hrd_Models_Leave_CutiBersama($leave, $this->getAppSession());
      $cb->setListKaryawan($data["ids"]);
      $cb->confirmed = $confirmed;
      $cb->jumlahHakCutiKepotong = $params["jml_hari_kepotong"];



      $decan = $cb->process();
      $listHakCuti = $cb->getListHakCuti();



      // var_dump($cb->getMsg());
      // die();
      // var_dump($listHakCuti);

      if (!$cb->getStatus()) {
      $msg = $cb->getMsg();
      $jenisError = $cb->getJenisError();
      } else {





      $dao = new Hrd_Models_Leave_Dao();
      $hasil = $dao->saveCutiBersama($leave, $decan, $listHakCuti);



      if (!$hasil) {
      $msg = "Terjadi kesalahan ketika memproses di database";
      $jenisError = 99;
      }
      }
      }






      $arrayRespon = array("HASIL" => $hasil, "JENISERR" => $jenisError, "MSG" => $msg);
      return Box_Tools::instantRead($arrayRespon);
      }
     */

    public function employeecutibersamaRead() {

        // added by Michael 2021.05.19 
        $data = $this->getAppData();

        if (array_key_exists("projectptid_opsi",$data) && $data['projectptid_opsi']){

            $projectptid_opsi = $data["projectptid_opsi"];
            $data['projectpt_id'] = $projectptid_opsi;

            $dao = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao->getProjectPtId($this->getAppSession(), $data);

            $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
            $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

            $data['project_id'] = $projectid_opsi;
            $data['pt_id'] = $ptid_opsi;

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $data['project_id'] = $this->getAppSession()->getProjectId();
            $data['pt_id'] = $this->getAppSession()->getPtid();

            $dao = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao->getProject_Pt_Id($this->getAppSession(), $data);

            $projectid_opsi = $data['project_id'];
            $ptid_opsi = $data['pt_id'];
            $data['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }
        // end added by Michael 2021.05.19

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'employee', array(), array());
        $dao = new Hrd_Models_Master_EmployeeDao();
        $em = new Hrd_Models_Master_EmployeePersonal();

        // $em->setProject($this->getAppSession()->getProject());
        // $em->setPt($this->getAppSession()->getPt());

        // added by Michael 2021.05.19 
        $project = new Box_Models_Master_Project();
        $project->setId($projectid_opsi);

        $pt = new Box_Models_Master_Pt();
        $pt->setId($ptid_opsi);

        $em->setProject($project);
        $em->setPt($pt);
        // end added by Michael 2021.05.19 

        $hasil = $dao->getAllEPJustActiveWOPL($em);

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    // added by Michael 2021.06.30 
    public function employeecutitambahanRead() {

        // added by Michael 2021.05.19 
        $data = $this->getAppData();

        if (array_key_exists("projectptid_opsi",$data) && $data['projectptid_opsi']){

            $projectptid_opsi = $data["projectptid_opsi"];
            $data['projectpt_id'] = $projectptid_opsi;

            $dao = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao->getProjectPtId($this->getAppSession(), $data);

            $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
            $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

            $data['project_id'] = $projectid_opsi;
            $data['pt_id'] = $ptid_opsi;

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $data['project_id'] = $this->getAppSession()->getProjectId();
            $data['pt_id'] = $this->getAppSession()->getPtid();

            $dao = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao->getProject_Pt_Id($this->getAppSession(), $data);

            $projectid_opsi = $data['project_id'];
            $ptid_opsi = $data['pt_id'];
            $data['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }
        // end added by Michael 2021.05.19

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'employee', array(), array());
        $dao = new Hrd_Models_Master_EmployeeDao();
        $em = new Hrd_Models_Master_EmployeePersonal();

        // $em->setProject($this->getAppSession()->getProject());
        // $em->setPt($this->getAppSession()->getPt());

        // added by Michael 2021.05.19 
        $project = new Box_Models_Master_Project();
        $project->setId($projectid_opsi);

        $pt = new Box_Models_Master_Pt();
        $pt->setId($ptid_opsi);

        $em->setProject($project);
        $em->setPt($pt);
        // end added by Michael 2021.05.19 

        // $hasil = $dao->getAllEPJustActiveWOPL($em);
        $hasil = $dao->getAllEPJustActiveWOPL_CutiTambahan($this->getAppRequest(), $data);

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    // end added by Michael 2021.06.30 

    public function setupshiftRead() {
        $hasil = FALSE;
        $params = $this->getAppData();
        $dao = new Hrd_Models_AbsentDao();
        $ses = $this->getAppSession();
        $msg = "...";

        // added by Michael 2021.05.19 
        if (array_key_exists("projectptid_opsi",$params) && $params['projectptid_opsi']){

            if($params['projectptid_opsi']){

                $params['projectpt_id'] = $params['projectptid_opsi'];

                $hasil_projectpt = $dao->getProjectPtId($this->getAppSession(), $params);

                $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
                $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

                $params['project_id'] = $projectid_opsi;
                $params['pt_id'] = $ptid_opsi;

            }

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $params['project_id'] = $this->getAppSession()->getProjectId();
            $params['pt_id'] = $this->getAppSession()->getPtid();

            $hasil_projectpt = $dao->getProject_Pt_Id($this->getAppSession(), $params);

            $params['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }
        // end added by Michael 2021.05.19 

        //  var_dump($params);
        $updateType = "";
        if ($params["update_type"] == "division")
            $updateType = "DEPARTMENT";
        else if ($params["update_type"] == "kelompok")
            $updateType = "KELOMPOK";
        else if ($params["update_type"] == "all")
            $updateType = "ALL";

        // $hasil = $dao->updateShiftType($this->getAppSession(), $updateType, $params["month"], $params["year"], $params["days"], $params["shifttype_id"], $params["department_id"], $params["kelompokabsensi_id"]);
        // added by Michael 2021.05.19 
        $hasil = $dao->updateShiftType($this->getAppSession(), $updateType, $params["month"], $params["year"], $params["days"], $params["shifttype_id"], $params["department_id"], $params["kelompokabsensi_id"], $params);
        // end added by Michael 2021.05.19 

        $arrayRespon = array("STATUS" => $hasil, "MSG" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function fixdateRead() {
        $hasil = FALSE;
        $params = $this->getAppData();
        $dao = new Hrd_Models_AbsentDao();
        $ses = $this->getAppSession();
        $hasil = $dao->fixdate($ses->getUser()->getId(), $params["month"], $params["year"]);
        $arrayRespon = array("HASIL" => $hasil);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function tlklistRead() {
        $dm = new Box_Models_App_Hermes_DataModel();

        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $dao = new Hrd_Models_Parameters_Tlk_Dao();
        $tlk = new Hrd_Models_Parameters_Tlk_Tlk();

        // $tlk->setProject($this->getAppSession()->getProject());
        // $tlk->setPt($this->getAppSession()->getPt());

        // added by Michael 2021.05.19 
        $data = $this->getAppData();

        if (array_key_exists("projectptid_opsi",$data) && $data['projectptid_opsi']){

            $projectptid_opsi = $data["projectptid_opsi"];
            $data['projectpt_id'] = $projectptid_opsi;

            $dao_projectpt = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao_projectpt->getProjectPtId($this->getAppSession(), $data);

            $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
            $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

            $data['project_id'] = $projectid_opsi;
            $data['pt_id'] = $ptid_opsi;

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $data['project_id'] = $this->getAppSession()->getProjectId();
            $data['pt_id'] = $this->getAppSession()->getPtid();

            $dao_projectpt = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao_projectpt->getProject_Pt_Id($this->getAppSession(), $data);

            $projectid_opsi = $data['project_id'];
            $ptid_opsi = $data['pt_id'];
            $data['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }
        $project = new Box_Models_Master_Project();
        $project->setId($projectid_opsi);

        $pt = new Box_Models_Master_Pt();
        $pt->setId($ptid_opsi);

        $tlk->setProject($project);
        $tlk->setPt($pt);
        // end added by Michael 2021.05.19


        $allTlk = $dao->getAllWOPL($tlk);

        $allTlk = Box_Tools::toObjectResult($allTlk, new Hrd_Models_Parameters_Tlk_Tlk());


        $otherAT = array(array(
                "HASIL" => TRUE
        ));


        $dm->setHasil(array($allTlk, $otherAT));


        return $dm;
    }

    /*
      public function tlklistRead() {
      $dm = new Box_Models_App_Hermes_DataModel();

      $dao = new Hrd_Models_Parameters_Tlk_Dao();
      $tlk = new Hrd_Models_Parameters_Tlk_Tlk();
      $tlk->setProject($this->getAppSession()->getProject());
      $tlk->setPt($this->getAppSession()->getPt());
      $dm->setDataList(new Box_Models_App_DataListCreator('', 'parametertlk', array(), array()));
      $dm->setHasil($dao->getAllWOPL($tlk));
      return $dm;
      }
     */

    public function detailreasonRead() {
        $ma = new Hrd_Models_App_Mastertable_AbsentType();
        $aa = $ma->prosesDataWithSession($this->getAppSession(), TRUE);


        $params = $this->getAppData();
        $leaveId = intval($params["leave_id"]);

        $leaveDao = new Hrd_Models_Leave_Dao();
        $leave = new Hrd_Models_Leave_Leave();

        $leave->setId($leaveId);

        $leaveDb = $leaveDao->getDetail($leave);

        $leave = count($leaveDb[0]) > 0 ? $leaveDb[0][0] : null;


        $hasil = FALSE;
        $arrayRespon = array(
            "HASIL" => $hasil,
            "CUTI" => $leave,
            "ABSENTTYPEGROUP_LEAVE" => Box_Config::ABSENTTYPEGROUP_LEAVE,
            "ABSENTTYPEGROUPCODE_LEAVE" => Box_Config::ABSENTTYPEGROUP_CODE_LEAVE);
        return Box_Tools::instantRead($arrayRespon, array($aa));
    }

    public function updatetimeRead() {

        $hasil = FALSE;
        $msg = "Proses...";

        $data = $this->getAppData();

        // added by Michael 2021.05.19 

        if (array_key_exists("projectptid_opsi",$data) && $data['projectptid_opsi']){

            $projectptid_opsi = $data["projectptid_opsi"];
            $data['projectpt_id'] = $projectptid_opsi;

            $dao = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao->getProjectPtId($this->getAppSession(), $data);

            $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
            $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

            $data['project_id'] = $projectid_opsi;
            $data['pt_id'] = $ptid_opsi;

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $data['project_id'] = $this->getAppSession()->getProjectId();
            $data['pt_id'] = $this->getAppSession()->getPtid();

            $dao = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao->getProject_Pt_Id($this->getAppSession(), $data);

            $projectid_opsi = $data['project_id'];
            $ptid_opsi = $data['pt_id'];
            $data['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }

        // end added by Michael 2021.05.19

        $dao = new Hrd_Models_AbsentDao();
        
        $absentDetail = new Hrd_Models_Master_General_Date();

        $absentDetail->setArrayTable($data);

        //var_dump($absentDetail->getArrayTable());

        $dao = new Hrd_Models_AbsentDao();

        $absentHeader = new Hrd_Models_Absent();

        // $absentHeader->setProject($this->getAppSession()->getProject());
        // $absentHeader->setPt($this->getAppSession()->getPt());

        // added by Michael 2021.05.19 
        $project = new Box_Models_Master_Project();
        $project->setId($projectid_opsi);

        $pt = new Box_Models_Master_Pt();
        $pt->setId($ptid_opsi);

        $absentHeader->setProject($project);
        $absentHeader->setPt($pt);
        // end added by Michael 2021.05.19 

        $absentHeader->setMonth($data["month"]);
        $absentHeader->setYear($data["year"]);
        $absentHeader->getEmployee()->setId($data["employee_id"]);

        $date = $data["year"] . "-" . $data["month"] . "-" . $data["day"];

        $absentExist = $dao->getAbsentSheetWOPL($absentHeader, $date, $date);


        // var_dump($absentDetail->getArrayTable());
        //var_dump($absentExist);
        /// cek data dari database
        $absentDetail->setAddBy($this->getAppSession()->getUser()->getId());
        
        // $mp = new Hrd_Models_Absent_MasterProcess($this->getAppSession());
        
        // added by Michael 2021.05.19
        $mp = new Hrd_Models_Absent_MasterProcess($this->getAppSession(),$data);
        
        // end added by Michael 2021.05.19

        $mp->process($absentDetail);

        // add on 20161202
        // bisa update attendance total, karena permintaan ibu Linda
        $absentDetail->setTotalAttendance($data["attendance_total"]);
        
        // add by wulan 20200623
        $absentDetail->setTotalTransport($data["transport_total"]);




        $hasil = $dao->updateTime($absentDetail);


            
        // add by wulan 25 10 2021
        $r = $this->getAppData();
        $lates_month = $r["month"];
        $lates_year = $r["year"];       
        $project_id = $this->getAppSession()->getProject()->getId();
        $pt_id = $this->getAppSession()->getPt()->getId();
        if($project_id == 1){ // && $pt_id == 1
            $this->update_wfh_attn($lates_month, $lates_year);
        } else {
            $this->update_wfh_attn_common($lates_month, $lates_year);            
        }


        $arrayRespon = array(
            "HASIL" => $hasil,
            "MSG" => $msg
        );
        return Box_Tools::instantRead($arrayRespon, array());
    }

    public function createreasonRead() {

        $hasil = FALSE;
        $msg = "Proses...";

        $data = $this->getAppData();

        // added by Michael 2021.05.19 
        if (array_key_exists("projectptid_opsi",$data) && $data['projectptid_opsi']){

            $projectptid_opsi = $data["projectptid_opsi"];
            $data['projectpt_id'] = $projectptid_opsi;

            $dao = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao->getProjectPtId($this->getAppSession(), $data);

            $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
            $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

            $data['project_id'] = $projectid_opsi;
            $data['pt_id'] = $ptid_opsi;

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $data['project_id'] = $this->getAppSession()->getProjectId();
            $data['pt_id'] = $this->getAppSession()->getPtid();

            $dao = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao->getProject_Pt_Id($this->getAppSession(), $data);

            $projectid_opsi = $data['project_id'];
            $ptid_opsi = $data['pt_id'];
            $data['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }
        // end added by Michael 2021.05.19 

        $rawData = $data;
        $hakCutiId = array_key_exists("leaveentitlements_id", $rawData) ? $rawData["leaveentitlements_id"] : 0;

        $data = array("", array($data));        
        
        $leave = Box_Tools::toObjectsb("leave", $data, TRUE, array('absenttype_'));

        // $leave->setProject($this->getAppSession()->getProject());
        // $leave->setPt($this->getAppSession()->getPt());

        // added by Michael 2021.05.19 
        $project = new Box_Models_Master_Project();
        $project->setId($projectid_opsi);

        $pt = new Box_Models_Master_Pt();
        $pt->setId($ptid_opsi);

        $leave->setProject($project);
        $leave->setPt($pt);
        // end added by Michael 2021.05.19 

        $leave->setAddBy($this->getAppSession()->getUser()->getId());
        $leave->getAbsentType()->setCode($rawData["absenttype_code"]);
        // var_dump($leave->getArrayTable());
        
        // edit by wulan sari 20190822
        // untuk kasus pengajuan tapi shift belum di generate HRD, maka hari cuti yg dipotong dihitung lagi sesuai hari kerja, 
        // di hitungnya di  Hrd_Models_App_Box_LeaveSubmissionProcessor aftervalidation       
        if (isset($rawData['cuti_id_intranet'])) {
            $leave->setDuration(NULL);
        }
        
        $validator = new Hrd_Models_Leave_Validator();
        $validator->run($leave);


        /// ambil detail tipe alasan tidak hadir
        $alasanDao = new Hrd_Models_Master_AbsentTypeDao();
        $alasans = $alasanDao->getAllSimple();
        $alasans = Box_Tools::toObjectResult($alasans, new Hrd_Models_Master_AbsentType());
        foreach ($alasans as $a) {
            /// set alasan di transaksi cuti
            if ($a->getCode() == $leave->getAbsentType()->getCode()) {
                $leave->setAbsentType($a);
            }
        }



        if ($validator->getStatus()) {

            /// cek group alasan tidak hadir
            /// jika tergolong cuti maka masukkan ke dalam tabel cuti

            if (intval($leave->getAbsentType()->getIsCutLeave()) == 1) {
                // if ($leave->getAbsentType()->getGroup()->getId() == Box_Config::ABSENTTYPEGROUP_LEAVE) {


                $processor = new Hrd_Models_App_Box_LeaveSubmissionProcessor();
                $processor->setSession($this->getAppSession());
                

                $leave = $processor->proses($leave, $validator->getStorage());
                
                if($leave == 'leave_record_required'){                    
                    $arrayRespon = array(
                        "HASIL" => 0,
                        "MSG" => 'Process Failed. Leave record is required'
                    );
                    return Box_Tools::instantRead($arrayRespon, array());
                }

                
                // edit by wulan sari 20190731
                $jumlahHari = 0;
                $dates = $processor->getDates();
                $dates = explode("~", $dates);
                $count = count($dates);
                for($i = 0; $i<$count; $i++){
                    if($dates[$i] != ''){
                        $jumlahHari++;
                    }                    
                }
                $hakCutiAmount = $leave->getIsHalfDay() ? 0.5 : $jumlahHari;
                $leave->setDuration($hakCutiAmount);
                // end edit by wulan sari 20190731
                
                /*
                $jumlahHari = 0;
                $dates = $processor->getDates();
                $dates = explode("~", $dates);
                $jumlahHari = count($dates);
                $hakCutiAmount = $leave->getIsHalfDay() ? 0.5 : $jumlahHari;
                 * 
                 */               


                /// daftar hak cuti
                $allHc = array();
                $daoHc = new Hrd_Models_Leave_LeaveEntitlementDao();
                $hcFilter = new Hrd_Models_Leave_LeaveEntitlement();
                $hcFilter->getEmployee()->setId($leave->getEmployee()->getId());

                // $hcFilter->setProject($this->getAppSession()->getProject());
                // $hcFilter->setPt($this->getAppSession()->getPt());

                // added by Michael 2021.05.19 
                $hcFilter->setProject($project);
                $hcFilter->setPt($pt);
                // end added by Michael 2021.05.19 

                $allHc = $daoHc->getAllByEmployeeWOPL($hcFilter);
                $allHc = Box_Tools::toObjectResult($allHc, new Hrd_Models_Leave_LeaveEntitlement());





                if (count($allHc) > 0) {
                    
                    /// proses cuti 
                    $leaveAfterProcess = $leave;
                    $lDao = new Hrd_Models_Leave_Dao();
                    $hasilSave = $lDao->save($leaveAfterProcess, $processor->getDates(), $processor->getHasilJatahCuti(), $processor->getJatahCutiKaryawan());
                    //echo $hasilSave;

                    /// proses absent detail

                    $daoAbsent = new Hrd_Models_AbsentDao();

                    $hasil = $daoAbsent->updateDescCuti($this->getAppSession()->getUser()->getId(), $leave);

                    /// mark on 2017 05 10
                    /// update description di absent record;

                    /*

                      $leaveGroup = $leave->getAbsentType()->getCode() == Box_Config::ABSENTTYPE_CODE_BESAR5TAHUN ? Box_Config::LEAVE_GROUP_BESAR : Box_Config::LEAVE_GROUP_TAHUNAN;

                      $hakCutiBerkurang = array(
                      "id" => "",
                      "rest" => ""
                      );

                      $jumlahPotongCuti = 0;

                      if (intval($leave->getAbsentType()->getIsCutLeave()) > 0) {
                      $tempFound = FALSE;
                      $sisaCuti = $hakCutiAmount; /// variabel untuk menampung pengurangan cuti dan hak cuti per tahun



                      foreach ($allHc as $k => $hc) {

                      if ($hc->getLeaveGroup() == $leaveGroup) {


                      if (!$hc->getIsLeaveEnd() && $sisaCuti > 0) {
                      //$hakCutiId = $hc->getId();

                      $tempSisa = $hc->getRest() - $sisaCuti;
                      /// cek jika masih ada jatah cuti tahun berikutnya
                      if ($tempSisa < 0) {
                      if (array_key_exists($k + 1, $allHc)) {
                      if ($allHc[$k + 1]->getRest() > 0 && !$allHc[$k + 1]->getIsLeaveEnd() && ($sisaCuti - $hc->getRest()) > 0) {
                      $tempSisa = 0;
                      }
                      }
                      }


                      $hakCutiBerkurang["id"] .=$hc->getId() . "~";
                      $hakCutiBerkurang["rest"] .=$tempSisa . "~";
                      $sisaCuti = $hc->getRest() - $sisaCuti;
                      }
                      }
                      }



                      $jumlahPotongCuti = $leave->getAbsentType()->getIsCutLeave() ? $hakCutiAmount : 0;
                      }


                      $daoAbsent = new Hrd_Models_AbsentDao();
                      $hasil = $daoAbsent->updateDescCuti($this->getAppSession()->getUser()->getId(), $leave);

                      $lDao = new Hrd_Models_Leave_Dao();
                      $hasil = $lDao->saveWithDefinedLeaveEnt($leave, $processor->getDates(), $hakCutiBerkurang, $jumlahPotongCuti);
                     */
                } else {
                    $msg = "Tidak ada hak cuti. Silahkan membuat hak cuti terlebih dahulu.";
                }
            } else {


                /// hanya update absent record karyawan

                $fixDates = $validator->getStorage();

                $fixDates = Box_Tools::toDecan($fixDates[0]);
                $dcResult = $fixDates->getDCResult();
                $dates = $dcResult['date'];
                $dao = new Hrd_Models_AbsentDao();
                // check jika absenttype termasuk izin

                $jatahCutiKepotong = Hrd_Models_Absent_Tools::procesPotongCutiByIzin($leave, $this->getAppSession());

                
                /// edit by Wulan 23.11.2018
                /// info dari HRD 23.11.2018, ABSENTTYPE_IZINMASUKLAMBAT dan ABSENTTYPE_PULANGAWALATAUSAKIT tidak potong cuti
                /*
                if (intval($jatahCutiKepotong->getId()) > 0) {
                    $hasil = $dao->updateByIzin($leave, $dates, $jatahCutiKepotong);
                } else {
                 * 
                 */
                    $dt = $this->getAppData(); 

                    // added by Michael 2021.05.19 
                    if (array_key_exists("projectptid_opsi",$dt) && $dt['projectptid_opsi']){

                        $projectptid_opsi = $dt["projectptid_opsi"];
                        $dt['projectpt_id'] = $projectptid_opsi;

                        $dao = new Hrd_Models_AbsentDao();
                        $hasil_projectpt = $dao->getProjectPtId($this->getAppSession(), $dt);

                        $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
                        $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

                        $dt['project_id_ces'] = $projectid_opsi;
                        $dt['pt_id_ces'] = $ptid_opsi;

                        $dt['project_id'] = $projectid_opsi;
                        $dt['pt_id'] = $ptid_opsi;

                    }else{
                        //CURRENT PROJECTPT saat pilih dari START
                        $dt['project_id_ces'] = $this->getAppSession()->getProjectId();
                        $dt['pt_id_ces'] = $this->getAppSession()->getPtid();

                        $dt['project_id'] = $this->getAppSession()->getProjectId();
                        $dt['pt_id'] = $this->getAppSession()->getPtid();

                        $dao = new Hrd_Models_AbsentDao();
                        $hasil_projectpt = $dao->getProject_Pt_Id($this->getAppSession(), $dt);

                        $projectid_opsi = $dt['project_id'];
                        $ptid_opsi = $dt['pt_id'];
                        $dt['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
                    }
                    // end added by Michael 2021.05.19 

                    if ($leave->getAbsentType()->getCode() == "I-ML") {
                        $hasil = $dao->updateByRangeDateAbsentTypeIzinMasukLambat($leave, $dates);
                        

                    } else if ($leave->getAbsentType()->getCode() == "I-MLL" || $leave->getAbsentType()->getCode() == "TOFFS") {
                        $hasil = $dao->updateByRangeDateAbsentTypeRemoveLostime($leave, $dates);
                        

                    } else if (isset($dt['start_time']) && ($leave->getAbsentType()->getCode() == "I-LAM" || $leave->getAbsentType()->getCode() == "I-GAM")) {
                        
                        $dt['in_7_14'] = '';
                        $dt['in_15_21'] = '';
                        $dt['in_22_6'] = '';   
                        
                        if ($dt['start_time'] >= '07:00:00' && $dt['start_time'] <= '15:00:00') {
                            $dt['in_7_14'] = $dt['start_time'];
                        }

                        if ($dt['start_time'] >= '15:00:00' && $dt['start_time'] <= '21:00:00') {
                            $dt['in_15_21'] = $dt['start_time'];
                        }

                        if ($dt['start_time'] >= '22:00:00' && $dt['start_time'] <= '00:00:00') {
                            $dt['in_22_6'] = $dt['start_time'];
                        }

                        if ($dt['start_time'] >= '00:00:00' && $dt['start_time'] <= '06:00:00') {
                            $dt['in_22_6'] = $dt['start_time'];
                        }

                        $hakCutiAmount = Hrd_Models_App_Box_LeaveSubmissionProcessor::getDurasi($dates, $leave->getIsHalfDay());
                        $hasil = $dao->updateByRangeDateAbsentTypeLam($leave, $dates, $hakCutiId, $hakCutiAmount, $this->getAppSession(), $dt);
                        
                    } else if (isset($dt['end_time']) && ($leave->getAbsentType()->getCode() == "I-LAP" || $leave->getAbsentType()->getCode() == "I-GAP")) {
                        
                        $dt['out_7_14'] = '';
                        $dt['out_15_21'] = '';
                        $dt['out_22_6'] = '';        

                        if ($dt['end_time'] >= '07:00:00' && $dt['end_time'] <= '15:00:00') {
                            $dt['out_7_14'] = $dt['end_time'];
                        }

                        if ($dt['end_time'] >= '15:00:00' && $dt['end_time'] <= '21:00:00') {
                            $dt['out_15_21'] = $dt['end_time'];
                        }

                        if ($dt['end_time'] >= '22:00:00' && $dt['end_time'] <= '00:00:00') {
                            $dt['out_22_6'] = $dt['end_time'];
                        }

                        if ($dt['end_time'] >= '00:00:00' && $dt['end_time'] <= '06:00:00') {
                            $dt['out_22_6'] = $dt['end_time'];
                        }

                        $hakCutiAmount = Hrd_Models_App_Box_LeaveSubmissionProcessor::getDurasi($dates, $leave->getIsHalfDay());
                        $hasil = $dao->updateByRangeDateAbsentTypeLap($leave, $dates, $hakCutiId, $hakCutiAmount, $this->getAppSession(), $dt);
                        
                    } else {
                        $hakCutiAmount = Hrd_Models_App_Box_LeaveSubmissionProcessor::getDurasi($dates, $leave->getIsHalfDay());
                        // $hasil = $dao->updateByRangeDateAbsentTypeC($leave, $dates, $hakCutiId, $hakCutiAmount, $this->getAppSession());

                        // added by Michael 2021.05.19
                        $hasil = $dao->updateByRangeDateAbsentTypeC($leave, $dates, $hakCutiId, $hakCutiAmount, $this->getAppSession(), $dt);
                        // end added by Michael 2021.05.19

                    }
                //}
            }
            
            
            // add by wulan sari 20191008
            if (isset($dt['start_time']) && ($leave->getAbsentType()->getCode() == "I-LAM" || $leave->getAbsentType()->getCode() == "I-GAM")) {
                $get_absent = $dao->getabsentdetail_id($leave, $dates);

                // $this->latelost_after_permit_process($get_absent); 

                // added by Michael 2021.05.19
                $this->latelost_after_permit_process($get_absent, $dt); 
                // end added by Michael 2021.05.19             

            } else if (isset($dt['end_time']) && ($leave->getAbsentType()->getCode() == "I-LAP" || $leave->getAbsentType()->getCode() == "I-GAP")) {
                $get_absent = $dao->getabsentdetail_id($leave, $dates);

                // $this->latelost_after_permit_process($get_absent);

                // added by Michael 2021.05.19
                $this->latelost_after_permit_process($get_absent, $dt); 
                // end added by Michael 2021.05.19
                
            } else if ($leave->getAbsentType()->getCode() == "C-THN" || $leave->getAbsentType()->getCode() == "C-BSR") {                
                $count = count($dates);
                for($i = 0; $i<$count; $i++){
                    if($dates[$i] != ''){                        
                        $daoAbsent->updateByRangeDateAbsentTypeRemoveLostime($leave, $dates[$i]);
                        
                        //sp_absentdetail_updateattn_byid_raya
                    }                    
                }
            }            
                    
            if (!$hasil) {
                //  $msg = "Something happened when processing your request ";
            } else {
                $hasil = TRUE;
                $msg = "Success";
            }
        } else {
            $msg = $validator->getMsg();
        }

        $arrayRespon = array(
            "HASIL" => $hasil,
            "MSG" => $msg
        );
        
        /* start added by ahmad riadi 18-04-2017 */
        if ($hasil == true) {
            if (isset($rawData['cuti_id_intranet'])) {
                //echo 'ada'; exit;
                $this->updatestatuscutiintranet($rawData['configintranet'], $rawData['cuti_id_intranet'], $rawData['cutitype_id_intranet'], $rawData['hrd_check_intranet'], $rawData['hrd_comment_intranet']);
                            
            }
            if (isset($rawData['izin_id'])) {
                //echo 'ada';
                $this->updatestatusijinintranet($rawData['configintranet'], $rawData['izin_id'], $rawData['hrd_comment']);
            }


            // added by Michael 2021.06.15 
            if (isset($rawData['sakit_id'])) {
                //echo 'ada';
                $this->updatestatussakitintranet($rawData['configintranet'], $rawData['sakit_id'], $rawData['hrd_comment']);
            }
            // end added by Michael 2021.06.15 
            

            if (isset($rawData['is_cuti'])) {
                // update by Wulan 2020 07 07

                // $project_id = $this->getAppSession()->getProject()->getId(); 

                // added by Michael 2021.05.19 
                $project_id = $projectid_opsi;
                // end added by Michael 2021.05.19


                $dao = new Hrd_Models_Intranet_ConfigDao();
                $data = $dao->getProjectconfig($project_id);
                if (!empty($data[0])) {
                    $subholding_subname = $data[0][0]['subholding_subname'];
                    if($subholding_subname == 'sh1b'){                    
                        $dao_absent = new Hrd_Models_AbsentDao();
                        $dates = $processor->getDates();
                        $dao_absent->update_wfh_attn_byid_raya($rawData['employee_employee_id'], $dates, $this->getAppSession());
                    }
                }
            }
            
            // add by wulan 25 10 2021
            $r = $this->getAppData();
            $ex = explode('-', $r["start_date"]);
            $lates_month = $ex[1];
            $lates_year = $ex[0];            
            $project_id = $this->getAppSession()->getProject()->getId();
            $pt_id = $this->getAppSession()->getPt()->getId();
            if($project_id == 1){ // && $pt_id == 1
                $this->update_wfh_attn($lates_month, $lates_year);
            } else {
                $this->update_wfh_attn_common($lates_month, $lates_year);            
            }

        }
        /* end added by ahmad riadi 18-04-2017 */

        return Box_Tools::instantRead($arrayRespon, array());
    }
    
    public function createreason_tukarshiftRead(){
        $data = $this->getAppData();
        $dao_absent = new Hrd_Models_AbsentDao();
        $dao_absent->proses_tukarshift($this->getAppSession(), $data);
    }
    
    public function dataPdlkPdln($param) {
        $setup = new Hrd_Models_General_Setup();
        $project_id = $setup->_project_id;
        $pt_id = $setup->_pt_id;

        // added by Michael 2021.05.19 
        $project_id = $param['project_id'];
        $pt_id = $param['pt_id'];
        // added by Michael 2021.05.19 

        $name = $param['status'];
        $dataparametertlk = $setup->getbyprojectptid_and_name_parametertlk($project_id, $pt_id, $name);
        $param['parametertlk_id'] = $dataparametertlk['parametertlk_id'];
        $param['description'] = $param['pdlk_note'];
        return $param;
    }

    public function createtlkRead() {
        $hasil = FALSE;
        $msg = "Proses...";

        $data = $this->getAppData();

        // added by Michael 2021.05.19 
        if (array_key_exists("projectptid_opsi",$data) && $data['projectptid_opsi']){

            $projectptid_opsi = $data["projectptid_opsi"];
            $data['projectpt_id'] = $projectptid_opsi;

            $dao = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao->getProjectPtId($this->getAppSession(), $data);

            $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
            $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

            $data['project_id'] = $projectid_opsi;
            $data['pt_id'] = $ptid_opsi;

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $data['project_id'] = $this->getAppSession()->getProjectId();
            $data['pt_id'] = $this->getAppSession()->getPtid();

            $dao = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao->getProject_Pt_Id($this->getAppSession(), $data);

            $projectid_opsi = $data['project_id'];
            $ptid_opsi = $data['pt_id'];
            $data['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }
        // end added by Michael 2021.05.19 

        if (isset($data['transaction'])) {
            if ($data['transaction'] == 'pdlk') {
                $data = $this->dataPdlkPdln($data);
            }
        }
        
        /// ambil data shift
        $shiftFilter = new Hrd_Models_Master_ShiftType();

        // $shiftFilter->setProject($this->getAppSession()->getProject());
        // $shiftFilter->setPt($this->getAppSession()->getPt());

        // added by Michael 2021.05.19 
        $project = new Box_Models_Master_Project();
        $project->setId($projectid_opsi);

        $pt = new Box_Models_Master_Pt();
        $pt->setId($ptid_opsi);

        $shiftFilter->setProject($project);
        $shiftFilter->setPt($pt);
        // end added by Michael 2021.05.19 

        $daoShift = new Hrd_Models_Master_ShiftTypeDao();
        $hasilShift = $daoShift->getAllWOPL($shiftFilter);
        $hasilShift = Box_Tools::toObjectResult($hasilShift, new Hrd_Models_Master_ShiftType());

        $validDates = Hrd_Models_Absent_Tools::getNonHariOffTlk($data["start_date"], $data["end_date"], $data["employee_employee_id"]);

        $onDutyId = $data["parametertlk_id"];
        $tlkOther = trim($data["tlk_other"]);
        $tlkProjectType = intval($data["tlk_project_type"]);
        if (count($validDates) > 0) {

            // $mp = new Hrd_Models_Absent_MasterProcess($this->getAppSession());
        
            // added by Michael 2021.05.19
            $mp = new Hrd_Models_Absent_MasterProcess($this->getAppSession(), $data);
            // end added by Michael 2021.05.19

            foreach ($validDates as $date) {
                
                if ($date instanceof Hrd_Models_Master_General_Date) {

                    $date->setTlkProjectType($tlkProjectType);
                    $date->setTotalAttendance(1);
                    

                    if ($tlkProjectType == 2 && strlen($tlkOther) > 0) {
                        $date->getParameterTlk()->setId(0);
                        $date->setTlkOther($tlkOther);
                    } else {
                        $date->getParameterTlk()->setId($onDutyId);
                        $date->setTlkOther("");
                    }


                    /// ambil time in dan time out di shift
                    foreach ($hasilShift as $shift) {
                        if ($shift->getId() == $date->getShiftType()->getId()) {

                            if ($shift instanceof Hrd_Models_Master_ShiftType) {
                                                                
                                // edit by wulan sari 20190121
                                // untuk sh1b saat transaksi dari intranet maka ambil date time dari transaksi intranet        
                                if (isset($data['basedata'])) {
                                    $setup = new Hrd_Models_General_Setup();
                                    $dao_absent = new Hrd_Models_AbsentDao();
                                    // $checkSH = $dao_absent->checkSH($setup->_project_id);
                                    // added by Michael 2021.05.19 
                                    $checkSH = $dao_absent->checkSH($data['project_id']);
                                    // end added by Michael 2021.05.19 
                                    
                                    // edit by wulan 7 april 2021, requested by HC SH3A
                                    $date->setNote($data["description"]);
                                    
                                    
                                    if ($data['basedata'] == 'intranet' && strtolower($checkSH['subholding_subname']) == 'sh1b') {
                                        $date->setTimeIn(date('H:i:s', strtotime($data["start_date_time"])));
                                        $date->setTimeOut(date('H:i:s', strtotime($data["end_date_time"])));
                                        $mp->process($date);
                                    } else if($data['basedata'] == 'intranet' && $shift->getCode() == 'WFH') { //tgl 23 maret 2020 ada request dari HC utk shift WFH ambil jam TLK
                                        $date->setTimeIn(date('H:i:s', strtotime($data["start_date_time"])));
                                        $date->setTimeOut(date('H:i:s', strtotime($data["end_date_time"])));
                                        $mp->process($date);
                                    } else if($data['basedata'] == 'intranet' && $shift->getIsFlexi() == '1') {
                                        //tgl 26 okt 2020 updated, karena ada request dari HC SH3A (Pak Christian)  : 
                                        //jadi yg pak chris kesimpulannya : untuk jam masuk ambil yg plg pagi (antara jam tlk/jam fingerprint) , sedangkan jam pulang ambil paling lama (antara jam tlk/jam fingerprint) NFlexi
                                        $start_tlk = strtotime(date('H:i:s', strtotime($data["start_date_time"])));
                                        $end_tlk = strtotime(date('H:i:s', strtotime($data["end_date_time"])));                                        
                                        $start_shift = strtotime($shift->getInTime());
                                        $end_shift = strtotime($shift->getOutTime());
                                        
                                        if($start_shift < $start_tlk){
                                            $date->setTimeIn($shift->getInTime());
                                        } else {                                            
                                            $date->setTimeIn(date('H:i:s', strtotime($data["start_date_time"])));
                                        }
                                        
                                        if($end_shift > $end_tlk){
                                            $date->setTimeOut($shift->getOutTime());
                                        } else {                                            
                                            $date->setTimeOut(date('H:i:s', strtotime($data["end_date_time"])));
                                        }                                        
                                        $mp->process($date);
                                    } else {
                                        $date->setTimeIn($shift->getInTime());
                                        $date->setTimeOut($shift->getOutTime());
                                        $mp->process($date);

                                    }
                                    
                                    
                                } else {
                                    $date->setTimeIn($shift->getInTime());
                                    $date->setTimeOut($shift->getOutTime());
                                    $mp->process($date);
                                }
                                
                                
                            }
                        }
                    }


                    // var_dump($date->getArrayTable());
                }
            }
            
            /*
            $dt['in_7_14'] = '';
            $dt['in_15_21'] = '';
            $dt['in_22_6'] = '';   

            if ($dt['start_time'] >= '07:00:00' && $dt['start_time'] <= '15:00:00') {
                $dt['in_7_14'] = $dt['start_time'];
            }

            if ($dt['start_time'] >= '15:00:00' && $dt['start_time'] <= '21:00:00') {
                $dt['in_15_21'] = $dt['start_time'];
            }

            if ($dt['start_time'] >= '22:00:00' && $dt['start_time'] <= '00:00:00') {
                $dt['in_22_6'] = $dt['start_time'];
            }

            if ($dt['start_time'] >= '00:00:00' && $dt['start_time'] <= '06:00:00') {
                $dt['in_22_6'] = $dt['start_time'];
            }
            */
            
            $decan = Box_Tools::toDecan($validDates);
            $dao = new Hrd_Models_AbsentDao();
            $rowdatapost = $decan->getDCResult();
            
            /* start edited by ahmad riadi 02-06-2017 */
            if (isset($data['basedata'])) {
                if ($data['basedata'] == 'intranet') {
                    $this->updatetimebyTLK($rowdatapost, $data);
                }
                $hasil = 1;
            } else {
                $hasil = $dao->updateTlk2($this->getAppSession(), $decan);
            }
            /* end edited by ahmad riadi 02-06-2017 */




            //$hasil = $dao->updateTlk2($this->getAppSession(), $decan);


            if (!$hasil) {
                $msg = "Something error when processing your request.";
            }
        } else {
            //$msg = "Hari bukan termasuk hari kerja";
            $msg = "Hari tidak valid";
        }



        $arrayRespon = array(
            "HASIL" => $hasil,
            "MSG" => $msg
        );
        /* start added by ahmad riadi 18-04-2017 */
        if ($hasil > 0) {
            if (isset($data['tugas_id'])) {
                //echo 'ada';
                if (isset($data['transaction'])) {
                    if ($data['transaction'] == 'pdlk') {
                        $this->updatestatuspdlkintranet($data['configintranet'], $data['tugas_id']);
                    }
                } else {
                    $this->updatestatusdinasintranet($data['configintranet'], $data['tugas_id'], $data['hrd_comment']);
                }
            }
        }
        /* end added by ahmad riadi 18-04-2017 */


        return Box_Tools::instantRead($arrayRespon, array());
    }

    public function uploadexcelRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);




        $creator = new Box_Models_App_Creator();

        $hasil = FALSE;



        $success = FALSE;

        $rawAbsent = array(
            array("date" => "2014-11-18", "time" => "08:30:00", "id" => "ExampleName"),
            array("date" => "2014-11-18", "time" => "22:30:00", "id" => "ExampleName"),
            array("date" => "2014-11-19", "time" => "09:30:00", "id" => "ExampleName"),
            array("date" => "2014-11-19", "time" => "21:30:00", "id" => "ExampleName")
        );

        foreach ($rawAbsent as $row) {
            
        }



        $msg = "uploading...";
        $time = "20:30:00";
        $time2 = "08:30:00";
        $date = "2014-11-18";
        $date2 = "2014-11-18";
        $shiftType = new Hrd_Models_Master_ShiftType();
        $shiftType->setInTime("22:30:00");
        $shiftType->setOutTime("08:30:00");
        $absentDetail = new Hrd_Models_Master_General_Date();
        $timeIdentifier = new Hrd_Models_Absent_TimeIdentifier($time, $date, $shiftType, $absentDetail);
        $timeIdentifier->run();
        $timeIdentifier = new Hrd_Models_Absent_TimeIdentifier($time2, $date2, $shiftType, $absentDetail);
        $timeIdentifier->run();


        die();





        $ep = new Hrd_Models_Absent_ExcelProcessor();
        $ep->run(11, 2014, $creator, $this->getAppSession(), $this->getAppRequest());
        $success = $ep->getStatus();
        $msg = $ep->getMessage();


        die();


        $imageUpload = new Box_Models_App_ImageUpload("/public/app/hrd/uploads/absent/excel/", "excel_", "xls");
        $imageUpload->setDirectUpload(TRUE, $this->getAppSession()->getProject()->getId() . '_' . $this->getAppSession()->getPt()->getId() . '' . Box_Config::ABSENT_EXCEL_FILENAME);
        $imageUpload->run();

        if (!$imageUpload->isSuccess()) {
            $msg = $imageUpload->getErrorMsg();
        } else {
            $ep = new Hrd_Models_Absent_ExcelProcessor();
            $ep->run(11, 2014, $creator, $this->getAppSession(), $this->getAppRequest());
            $success = $ep->getStatus();
            $msg = $ep->getMessage();
        }



        $otherAT = array(array(
                "STATUS" => $success ? TRUE : FALSE,
                "MSG" => $msg
        ));




        $dm->setHasil(array($otherAT));


        return $dm;
    }

    public function allRead() {



        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'date', array('shifttype', 'absenttype', 'project', 'parametertlk'), array());
        $dao = new Hrd_Models_AbsentDao();

        $absent = new Hrd_Models_Absent();
        $r = $this->getAppData();

        // added by Michael 2021.05.19 
        if (array_key_exists("projectptid_opsi",$r) && $r['projectptid_opsi']){

            if($r['projectptid_opsi']){

                $r['projectpt_id'] = $r['projectptid_opsi'];

                $hasil_projectpt = $dao->getProjectPtId($this->getAppSession(), $r);

                $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
                $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

                $r['project_id'] = $projectid_opsi;
                $r['pt_id'] = $ptid_opsi;

            }

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $r['project_id'] = $this->getAppSession()->getProjectId();
            $r['pt_id'] = $this->getAppSession()->getPtid();

            $hasil_projectpt = $dao->getProject_Pt_Id($this->getAppSession(), $r);

            $r['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }
        // end added by Michael 2021.05.19 

        $absent->setArrayTable($r);
        $dg = new Hrd_Models_App_DayGenerator($absent->getMonth(), $absent->getYear());
        $absent->getEmployee()->setArrayTable($r);
        // $hasil = $dao->getRoster($absent, $this->getAppSession());
        $hasil = $dao->getRoster($absent, $this->getAppSession(), $r);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        $dm->setStoredObject(array("dayGenerator" => $dg));
        return $dm;
    }

    public function startparamsRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'absent', array('department', 'employee'), array());
        $dao = new Hrd_Models_AbsentDao();
        $absent = new Hrd_Models_Absent();
        $data = $this->getAppData();
        $ses = $this->getAppSession();

        // added by Michael 2021.05.19 
        if (array_key_exists("projectptid_opsi",$data) && $data['projectptid_opsi']){

            if($data['projectptid_opsi']){

                $data['projectpt_id'] = $data['projectptid_opsi'];

                $hasil_projectpt = $dao->getProjectPtId($this->getAppSession(), $data);

                $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
                $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

                $data['project_id'] = $projectid_opsi;
                $data['pt_id'] = $ptid_opsi;

            }

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $data['project_id'] = $this->getAppSession()->getProjectId();
            $data['pt_id'] = $this->getAppSession()->getPtid();

            $hasil_projectpt = $dao->getProject_Pt_Id($this->getAppSession(), $data);

            $data['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }
        // end added by Michael 2021.05.19 

        $absent->setArrayTable($data);
        $absent->setProject($ses->getProject());
        $absent->setPt($ses->getPt());

        $dm->setDataList($dataList);
        
        // edit by Wulan Sari 25.04.2018
        //#1
        //$dm->setHasil($dao->getStartParams($absent, $data["department_id"]));
        //#2
        // $dm->setHasil($dao->getStartParams($absent, $data["department_id"], $data["kelompokabsensi_id"]));
        //#3
        $dm->setHasil($dao->getStartParams($absent, $data["department_id"], $data["kelompokabsensi_id"], $data));
        
        return $dm;
    }

    public function employeeRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'absentrecord', array(), array());
        $dao = new Hrd_Models_Master_EmployeeDao();
        $dm->setDataList($dataList);
        $dm->setHasil($dao->getAll($this->getAppRequest(), new Hrd_Models_Master_Employee()));
        return $dm;
    }

    public function deleteabsentdateRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $creator = new Box_Models_App_Creator();

        //===== MASTERDATA == //
        $data = $this->getAppData();
        $detail = new Hrd_Models_Master_General_Date();
        $detail->setArrayTable($this->getAppData());
        $detail->setDeleteBy($this->getAppSession()->getUser()->getId());
        $dao = new Hrd_Models_AbsentDao();
        $hasil = $dao->deleteabsentday($detail);


        $otherAT = array(array(
                "STATUSDELETE" => $hasil ? TRUE : FALSE,
        ));




        $dm->setHasil(array($otherAT));


        return $dm;
    }

    public function deletemainabsentRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $creator = new Box_Models_App_Creator();

        //===== MASTERDATA == //
        $data = $this->getAppData();
        $a = new Hrd_Models_Absent();
        $a->setArrayTable($this->getAppData());
        $a->setDeleteBy($this->getAppSession()->getUser()->getId());
        $dao = new Hrd_Models_AbsentDao();
        $hasil = $dao->deletemainabsent($a);


        $otherAT = array(array(
                "STATUSDELETE" => $hasil ? TRUE : FALSE,
        ));




        $dm->setHasil(array($otherAT));


        return $dm;
    }

    public function filtersRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);


        $data = $this->getAppData();

        $dao = new Hrd_Models_AbsentDao();
        $years = $dao->getYears($this->getAppSession());

        $months = $dao->getMonths($this->getAppSession());

        $departments = $dao->getDepartments();

        $employees = $dao->getEmployes($this->getAppSession());



        $dm->setHasil(array($years, $months, $departments, $employees));


        return $dm;
    }

    public function genholidayRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $creator = new Box_Models_App_Creator();




        $data = $this->getAppData();

        // added by Michael 2021.05.19 
        if (array_key_exists("projectptid_opsi",$data) && $data['projectptid_opsi']){

            $projectptid_opsi = $data["projectptid_opsi"];
            $data['projectpt_id'] = $projectptid_opsi;

            $dao_projectpt = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao_projectpt->getProjectPtId($this->getAppSession(), $data);

            $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
            $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

            $data['project_id'] = $projectid_opsi;
            $data['pt_id'] = $ptid_opsi;

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $data['project_id'] = $this->getAppSession()->getProjectId();
            $data['pt_id'] = $this->getAppSession()->getPtid();

            $dao_projectpt = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao_projectpt->getProject_Pt_Id($this->getAppSession(), $data);

            $projectid_opsi = $data['project_id'];
            $ptid_opsi = $data['pt_id'];
            $data['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }

        $project = new Box_Models_Master_Project();
        $project->setId($projectid_opsi);

        $pt = new Box_Models_Master_Pt();
        $pt->setId($ptid_opsi);

        // end added by Michael 2021.05.19

        $hasil = FALSE;
        $msg = "Procesing...";
        $processType = $data["process_type"];
        switch ($processType) {
            case "employee":

                $absent = new Hrd_Models_Absent();

                $this->setArrayTable($absent, $data);
                
                // $absent->setProject($this->getAppSession()->getProject());
                // $absent->setPt($this->getAppSession()->getPt());

                // added by Michael 2021.05.19
                $absent->setProject($project);
                $absent->setPt($pt);
                // end added by Michael 2021.05.19

                $absent->getEmployee()->setId($data["employee_id"]);
                $validator = new Hrd_Models_AbsentToolValidator("GENHOLIDAY");
                $validator->run($absent);
                $hasilValidation = $validator->getStatus();
                $msg = $validator->getMsg();
                $hasil = FALSE;
                if ($hasilValidation) {
                    /// by employee
                    $daoCal = new Hrd_Models_Calendar_Dao();

                    // get calender
                    $calHasil = $daoCal->getDetailByEmployee($absent);

                    // get absent sheet
                    $daoAbs = new Hrd_Models_AbsentDao();
                    $absHasil = $daoAbs->getAbsentSheet($absent, $this->getAppRequest());
                    $tempDate1 = NULL;
                    $tempDate2 = NULL;
                    if ($absHasil) {
                        if (count($absHasil[0]) > 0) {
                            foreach ($absHasil[0] as $row) {
                                $tempDate1 = date("Y-m-d", strtotime($row["date"]));
                                foreach ($calHasil[0] as $cRow) {

                                    $tempDate2 = date("Y-m-d", strtotime($cRow["date"]));
                                    if ($tempDate1 == $tempDate2) {
                                        $absentDetail = new Hrd_Models_Master_General_Date();
                                        $absentDetail->setId($row["absentdetail_id"]);
                                        $absentDetail->getShiftType()->setId($cRow["shifttype_id"]);
                                        $absent->addDetail($absentDetail);
                                    }
                                }
                            }

                            $de = new Box_Delien_DelimiterEnhancer();
                            $de->setDelimiterCandidate($absent);
                            $de->generate();

                            $hasil = $daoAbs->setupShiftByEmployee($absent, $this->getAppSession());
                        }
                    }
                } else {
                    $hasil = $hasilValidation;
                }
                break;
            case "department":
                $dsp = new Hrd_Models_Absent_Shiftprocess_DepartmentShiftProcess($this->getAppRequest(), $this->getAppSession());
                $validator = new Hrd_Models_AbsentToolValidator("GENHOLIDAYBYDIVISION");

                // set absent data from request
                $absent = new Hrd_Models_Absent();
                $this->setArrayTable($absent, $data);
                
                // $absent->setProject($this->getAppSession()->getProject());
                // $absent->setPt($this->getAppSession()->getPt());

                // added by Michael 2021.05.19
                $absent->setProject($project);
                $absent->setPt($pt);
                // end added by Michael 2021.05.19

                $emp = new Hrd_Models_Master_EmployeePersonal();
                $emp->getDepartment()->setId($data["department_id"]);
                $absent->setEmployee($emp);


                $dsp->setValidator($validator);
                $dsp->run($absent);

                $hasil = $dsp->getStatus();
                $msg = $dsp->getErrorMessage();

                break;
            case "all":
                $dsp = new Hrd_Models_Absent_Shiftprocess_AllShiftProcess($this->getAppRequest(), $this->getAppSession());
                $validator = new Hrd_Models_AbsentToolValidator("GENHOLIDAYBYALL");

                // set absent data from request
                $absent = new Hrd_Models_Absent();
                $this->setArrayTable($absent, $data);

                // $absent->setProject($this->getAppSession()->getProject());
                // $absent->setPt($this->getAppSession()->getPt());

                // added by Michael 2021.05.19
                $absent->setProject($project);
                $absent->setPt($pt);
                // end added by Michael 2021.05.19


                $dsp->setValidator($validator);
                $dsp->run($absent);



                $hasil = $dsp->getStatus();
                $msg = $dsp->getErrorMessage();
                break;
        }








        $otherAT = array(array(
                "STATUS" => $hasil ? TRUE : FALSE,
                "MSG" => $msg
        ));




        $dm->setHasil(array($otherAT));


        return $dm;
    }

    public function transferinfocsvRead() {
        $hasil = FALSE;
        $errorMsg = "...";
        $isDelete = FALSE;
        $request = $this->getAppData();
        $isDelete = intval($request["is_delete"]);

        $appData = $this->getAppData();
        $month = isset($appData["month"]) ? $appData["month"] : date("m");
        $year = isset($appData["year"]) ? $appData["year"] : date("Y");

        // added by Michael 2021.05.19 
        if (array_key_exists("projectptid_opsi",$appData) && $appData['projectptid_opsi']){

            $projectptid_opsi = $appData["projectptid_opsi"];
            $appData['projectpt_id'] = $projectptid_opsi;

            $dao_projectpt = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao_projectpt->getProjectPtId($this->getAppSession(), $appData);

            $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
            $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

            $appData['project_id'] = $projectid_opsi;
            $appData['pt_id'] = $ptid_opsi;

            $project_id = $projectid_opsi;

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $appData['project_id'] = $this->getAppSession()->getProjectId();
            $appData['pt_id'] = $this->getAppSession()->getPtid();

            $dao_projectpt = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao_projectpt->getProject_Pt_Id($this->getAppSession(), $appData);

            $appData['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }
        // end added by Michael 2021.05.19 

        $errorMsg = 'Error Msg';
        $hasil = NULL;

        //  $data = new Hrd_Models_Absent_Data_SqlServer();
        // comment by Wulan Sari 24.04.2018
        //$data = new Hrd_Models_Absent_Data_Csv($appData["file_name"]);
        
        // added by Wulan Sari 24.04.2018
        //#1
        // $data = new Hrd_Models_Absent_Data_Csv($appData["file_name"], $this->getAppSession());
        
        //#2
        // added by Michael 2021.05.19 
        $data = new Hrd_Models_Absent_Data_Csv($appData["file_name"], $this->getAppSession(), $appData);
        // end added by Michael 2021.05.19 

        $data->setYear($year);
        $data->setMonth($month);
        $data->setStartDay($appData["start_day"]);
        $data->setEndDay($appData["end_day"]);
        $importer = new Hrd_Models_Absent_Importer($data);
        $process = $importer->process();
        $fpnl = array();
        $newDataFix = array();

        ////// dev
        //var_dump($importer->getHeader()->getDCResult());
        // die();
        //// end dev

        if ($process) {


            $dcResult = $importer->getHeader()->getDCResult();
            $psnno = $dcResult["psnno"];

            $jumlahData = count(explode("~", $dcResult["psnno"]));
            $newData = explode("~", $dcResult["psnno"]);
            $newDataTI = explode("~", $dcResult["time_in"]); // timeIn
            $newDataTO = explode("~", $dcResult["time_out"]);
            $newDataD = explode("~", $dcResult["date"]);
            $count = 0;
            $countData = 0;
            $jumlahGroup = 0;
            $newDataFix[$jumlahGroup] = array("psnno" => "", "time_in" => "", "time_out" => "", "date" => "");
            foreach ($newData as $record) {
                if ($count >= 10) {
                    $count = 0;
                    $jumlahGroup++;
                    $newDataFix[$jumlahGroup] = array("psnno" => "", "time_in" => "", "time_out" => "", "date" => "");
                }

                $newDataFix[$jumlahGroup]["psnno"] .= $newData[$countData] . "~";
                $newDataFix[$jumlahGroup]["time_in"] .= $newDataTI[$countData] . "~";
                $newDataFix[$jumlahGroup]["time_out"] .= $newDataTO[$countData] . "~";
                $newDataFix[$jumlahGroup]["date"] .= $newDataD[$countData] . "~";

                $countData++;
                $count++;
            }

            $hasil = TRUE;
        }
        $errorMsg = $importer->getErrorMessage();
        $arrayRespon = array("STATUS" => $hasil ? TRUE : FALSE,
            "FPNUMBERLIST" => $newDataFix,
            "ERRORMSG" => $errorMsg);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function transferinfoRead() {
        $hasil = FALSE;
        $errorMsg = "...";
        $isDelete = FALSE;
        $request = $this->getAppData();
        $isDelete = intval($request["is_delete"]);

        $appData = $this->getAppData();
        $month = isset($appData["month"]) ? $appData["month"] : date("m");
        $year = isset($appData["year"]) ? $appData["year"] : date("Y");
        
        $errorMsg = 'Error Msg';
        $hasil = NULL;

        // added by Michael 2021.05.19 
        if (array_key_exists("projectptid_opsi",$appData) && $appData['projectptid_opsi']){

            $projectptid_opsi = $appData["projectptid_opsi"];
            $appData['projectpt_id'] = $projectptid_opsi;

            $dao_projectpt = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao_projectpt->getProjectPtId($this->getAppSession(), $appData);

            $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
            $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

            $appData['project_id'] = $projectid_opsi;
            $appData['pt_id'] = $ptid_opsi;

            $project_id = $projectid_opsi;

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $appData['project_id'] = $this->getAppSession()->getProjectId();
            $appData['pt_id'] = $this->getAppSession()->getPtid();

            $dao_projectpt = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao_projectpt->getProject_Pt_Id($this->getAppSession(), $appData);

            $appData['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }
        // end added by Michael 2021.05.19 

        // $data = Hrd_Models_Absent_Data_SqlServerDbs::getDb($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId());

        // added by Michael 2021.05.19 
        $data = Hrd_Models_Absent_Data_SqlServerDbs::getDb($appData['project_id'], $appData['pt_id']);
        // end added by Michael 2021.05.19 




        $data->setYear($year);
        $data->setMonth($month);
        $data->setStartDay($appData["start_day"]);
        $data->setEndDay($appData["end_day"]);
        $importer = new Hrd_Models_Absent_Importer($data);
        $process = $importer->process();
        $fpnl = array();
        $newDataFix = array();
        if ($process) {


            $dcResult = $importer->getHeader()->getDCResult();
            $psnno = $dcResult["psnno"];

            $jumlahData = count(explode("~", $dcResult["psnno"]));
            $newData = explode("~", $dcResult["psnno"]);
            $newDataTI = explode("~", $dcResult["time_in"]); // timeIn
            $newDataTO = explode("~", $dcResult["time_out"]);
            $newDataD = explode("~", $dcResult["date"]);
            $count = 0;
            $countData = 0;
            $jumlahGroup = 0;
            $newDataFix[$jumlahGroup] = array("psnno" => "", "time_in" => "", "time_out" => "", "date" => "");
            foreach ($newData as $record) {
                if ($count >= 10) {
                    $count = 0;
                    $jumlahGroup++;
                    $newDataFix[$jumlahGroup] = array("psnno" => "", "time_in" => "", "time_out" => "", "date" => "");
                }

                $newDataFix[$jumlahGroup]["psnno"] .= $newData[$countData] . "~";
                $newDataFix[$jumlahGroup]["time_in"] .= $newDataTI[$countData] . "~";
                $newDataFix[$jumlahGroup]["time_out"] .= $newDataTO[$countData] . "~";
                $newDataFix[$jumlahGroup]["date"] .= $newDataD[$countData] . "~";

                $countData++;
                $count++;
            }

            $hasil = TRUE;
        }
        $errorMsg = $importer->getErrorMessage();
        $arrayRespon = array("STATUS" => $hasil ? TRUE : FALSE,
            "FPNUMBERLIST" => $newDataFix,
            "ERRORMSG" => $errorMsg);

        return Box_Tools::instantRead($arrayRespon);
    }

    // add by wulan 23 o4 2020
    public function transferteamsRead() {
        $hasil = FALSE;
        $errorMsg = "...";
        $appData = $this->getAppData();
        
        $daoAbs = new Hrd_Models_AbsentDao();            
        $ses = $this->getAppSession();  
        $daoAbs->absent_teams_transfer($ses->getUser()->getId(), $ses->getProject()->getId(), $ses->getPt()->getId(), $appData["start_date"], $appData["end_date"]);            

        $arrayRespon = array("STATUS" => 1 ? TRUE : FALSE,
            "FPNUMBERLIST" => '',
            "ERRORMSG" => '');

        return Box_Tools::instantRead($arrayRespon);
    }
    
    public function transfersaveRead() {
        $hasil = TRUE;

        $data = $this->getAppData();


        $fpnl = json_decode($data["data"], TRUE);

        $dao = new Hrd_Models_AbsentDao();
        $hasil = $dao->transferFingerPrintB($fpnl, $this->getAppSession());

        $arrayRespon = array("STATUS" => $hasil ? TRUE : FALSE);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function processtransferRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $creator = new Box_Models_App_Creator();
        // $data = new Hrd_Models_Absent_Data_JsonString();
        $isDelete = FALSE;
        $request = $this->getAppData();
        $isDelete = intval($request["is_delete"]);

        $appData = $this->getAppData();
        $month = isset($appData["month"]) ? $appData["month"] : date("m");
        $year = isset($appData["year"]) ? $appData["year"] : date("Y");



        $errorMsg = 'Error Msg';
        $hasil = NULL;

        $data = new Hrd_Models_Absent_Data_SqlServer();
        $data->setYear($year);
        $data->setMonth($month);
        $data->setStartDay($appData["start_day"]);
        $data->setEndDay($appData["end_day"]);
        $importer = new Hrd_Models_Absent_Importer($data);
        $process = $importer->process();
        if ($process) {

            $dao = new Hrd_Models_AbsentDao();

            if ($isDelete) { /// jika delete temporary
                $hasilDelete = $dao->deleteTemporaryTransfer();
            }




            $hasil = $dao->transferFingerPrint($importer->getHeader(), $this->getAppSession());

            //var_dump($importer->getHeader()->getDCResult());
        }
        $errorMsg = $importer->getErrorMessage();


        $otherAT = array(array(
                "STATUS" => $hasil ? TRUE : FALSE,
                "ERRORMSG" => $errorMsg
        ));




        $dm->setHasil(array($otherAT));


        return $dm;
    }

    /*
      public function processtransferRead() {
      $dm = new Box_Models_App_Hermes_DataModel();
      $dm->setDirectResult(TRUE);
      $dm->setRequiredDataList(FALSE);
      $dm->setRequiredModel(FALSE);

      $creator = new Box_Models_App_Creator();
      // $data = new Hrd_Models_Absent_Data_JsonString();
      $isDelete = FALSE;
      $request = $this->getAppData();
      $isDelete = intval($request["is_delete"]);

      $appData = $this->getAppData();
      $month = isset($appData["month"]) ? $appData["month"] : date("m");
      $year = isset($appData["year"]) ? $appData["year"] : date("Y");



      $errorMsg = 'Error Msg';
      $hasil = NULL;

      $data = new Hrd_Models_Absent_Data_SqlServer();
      $data->setYear($year);
      $data->setMonth($month);
      $data->setStartDay($appData["start_day"]);
      $data->setEndDay($appData["end_day"]);
      $importer = new Hrd_Models_Absent_Importer($data);
      $process = $importer->process();
      if ($process) {

      $dao = new Hrd_Models_AbsentDao();

      if ($isDelete) { /// jika delete temporary
      $hasilDelete = $dao->deleteTemporaryTransfer();
      }




      $hasil = $dao->transferFingerPrint($importer->getHeader(), $this->getAppSession());

      //var_dump($importer->getHeader()->getDCResult());
      }
      $errorMsg = $importer->getErrorMessage();


      $otherAT = array(array(
      "STATUS" => $hasil ? TRUE : FALSE,
      "ERRORMSG" => $errorMsg
      ));




      $dm->setHasil(array($otherAT));


      return $dm;
      }
     */

    public function attachsaveRead() {
        $hasil = TRUE;

        $data = $this->getAppData();

        // added by Michael 2021.05.19 
        if (array_key_exists("projectptid_opsi",$data) && $data['projectptid_opsi']){

            $projectptid_opsi = $data["projectptid_opsi"];
            $data['projectpt_id'] = $projectptid_opsi;

            $dao_projectpt = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao_projectpt->getProjectPtId($this->getAppSession(), $data);

            $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
            $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

            $data['project_id'] = $projectid_opsi;
            $data['pt_id'] = $ptid_opsi;

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $data['project_id'] = $this->getAppSession()->getProjectId();
            $data['pt_id'] = $this->getAppSession()->getPtid();

            $dao_projectpt = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao_projectpt->getProject_Pt_Id($this->getAppSession(), $data);

            $projectid_opsi = $data['project_id'];
            $ptid_opsi = $data['pt_id'];
            $data['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }

        $project = new Box_Models_Master_Project();
        $project->setId($projectid_opsi);

        $pt = new Box_Models_Master_Pt();
        $pt->setId($ptid_opsi);

        // end added by Michael 2021.05.19

        $fpnl = json_decode($data["data"], TRUE);
        //$dao = new Hrd_Models_AbsentDao();
        //$hasil = $dao->updateAbsentByFingerPrintB($fpnl, $this->getAppSession());
        //$arrayRespon = array("STATUS" => $hasil ? TRUE : FALSE);

        //#1
        // $result = $this->checkdataAttachsave($fpnl);

        //#2
        // added by Michael 2021.05.19
        $result = $this->checkdataAttachsave($fpnl,$data);
        // end added by Michael 2021.05.19

        $arrayRespon = array("STATUS" => $result ? TRUE : FALSE);
        return Box_Tools::instantRead($arrayRespon);
    }

    /* start added by ahmad riadi 14-06-2017 */

    // public function checkdataAttachsave($dataabsen) {
    // added by Michael 2021.05.19
    public function checkdataAttachsave($dataabsen,$data) {
    // end added by Michael 2021.05.19
    
        $ar_absendetail = explode('~', $dataabsen['absentdetail_id']);
        if (count($ar_absendetail) > 0) {
            $arraytmp = array();
            $dao_shift = new Hrd_Models_Master_ShiftTypeDao();
            $dao_absent = new Hrd_Models_AbsentDao();
            $absentDetail = new Hrd_Models_Master_General_Date();
            
            // $mp = new Hrd_Models_Absent_MasterProcess($this->getAppSession());
        
            // added by Michael 2021.05.19
            $mp = new Hrd_Models_Absent_MasterProcess($this->getAppSession(),$data);
            // end added by Michael 2021.05.19

            $absentHeader = new Hrd_Models_Absent();

            //$index = 0;
            $ar_in_7_14 = explode('~', $dataabsen['in_7_14']);
            $ar_out_7_14 = explode('~', $dataabsen['out_7_14']);
            $ar_in_15_21 = explode('~', $dataabsen['in_15_21']);
            $ar_out_15_21 = explode('~', $dataabsen['out_15_21']);
            $ar_in_22_6 = explode('~', $dataabsen['in_22_6']);
            $ar_out_22_6 = explode('~', $dataabsen['out_22_6']);
            $ar_late = explode('~', $dataabsen['late']);
            $ar_attendance_total = explode('~', $dataabsen['attendance_total']);
            $ar_transport_total = explode('~', $dataabsen['transport_total']); // added by wulan sari 20200622
            $ar_total_hours = explode('~', $dataabsen['total_hours']);
            $ar_time_in = explode('~', $dataabsen['time_in']);
            $ar_time_out = explode('~', $dataabsen['time_out']);
            $ar_time_lost = explode('~', $dataabsen['time_lost']);
            $ar_date = explode('~', $dataabsen['date']);


            $lates_year = '';
            $lates_month = '';
            $lates_employee_id = '';
            foreach ($ar_absendetail as $rowabdetail) {
                $absentdetail_id = $rowabdetail;

                $position_array = array_search($absentdetail_id, $ar_absendetail);
                $index = $position_array;

                if (isset($ar_date[$index])) {


                    $date = $ar_date[$index];
                    $in_7_14 = $ar_in_7_14[$index];
                    $out_7_14 = $ar_out_7_14[$index];
                    $in_15_21 = $ar_in_15_21[$index];
                    $out_15_21 = $ar_out_15_21[$index];
                    $in_22_6 = $ar_in_22_6[$index];
                    $out_22_6 = $ar_out_22_6[$index];
                    $late = $ar_late[$index];
                    $total_hours = $ar_total_hours[$index];
                    $time_in = $ar_time_in[$index];
                    $time_out = $ar_time_out[$index];
                    $time_lost = $ar_time_lost[$index];
                    $rowabsentdetail = $dao_absent->getAbsentdetail_byid($absentdetail_id);
                    
                    //start added by ahmad riadi 22-09-2017 - request devina jika s-kd telatnya di hapus

                    if (!empty($rowabsentdetail['absenttype_id'])) {
                        $rowabsenttype = $dao_absent->getAbsentType($rowabsentdetail['absenttype_id']);
                        $paramreset = $this->code_for_reset_late($rowabsenttype['code'], $late, $time_lost);
                        $late = $paramreset['late'];
                        $time_lost = $paramreset['time_lost'];
                    }

                    //end added by ahmad riadi 22-09-2017                   

                    if (isset($rowabsentdetail['shifttype_id'])) {
                        
                        //start added by Wulan Sari 06-06-2018 - request HRD jika shift libur maka telat dihapus
                        if($rowabsentdetail['holyday'] == 1){
                            $late = NULL;
                            $time_lost = NULL;
                        }
                        //end added by Wulan Sari 06-06-2018 - request HRD jika shift libur maka telat dihapus

                        $rowshift = $dao_shift->getshift_byid($rowabsentdetail['shifttype_id']);
                        $arraydata = array(
                            "absentdetail_id" => $absentdetail_id,
                            "shifttype_shifttype_id" => $rowabsentdetail['shifttype_id'],
                            "employee_id" => $rowabsentdetail['employee_id'],
                            "month" => date('m', strtotime($date)),
                            "year" => date('Y', strtotime($date)),
                            "day" => date('d', strtotime($date)),
                            "time_in" => $time_in,
                            "time_out" => $time_out,
                        );

                        $user_id = $this->getAppSession()->getUser()->getId();
                        $absentDetail->setArrayTable($arraydata);

                        // $absentHeader->setProject($this->getAppSession()->getProject());
                        // $absentHeader->setPt($this->getAppSession()->getPt());

                        // added by Michael 2021.05.19
                        $project = new Box_Models_Master_Project();
                        $project->setId($data['project_id']);

                        $pt = new Box_Models_Master_Pt();
                        $pt->setId($data['pt_id']);

                        $absentHeader->setProject($project);
                        $absentHeader->setPt($pt);
                        // end added by Michael 2021.05.19

                        $absentHeader->setMonth($arraydata["month"]);
                        $absentHeader->setYear($arraydata["year"]);
                        $absentHeader->getEmployee()->setId($arraydata["employee_id"]);
                        $absentDetail->setAddBy($user_id);
                        $mp->process($absentDetail);
                        $arrayupdate = $absentDetail->getArrayTable();
                        
                        $arraytmp['absentdetail_id'] = $absentdetail_id;
                        $arraytmp['in_7_14'] = $in_7_14;
                        $arraytmp['out_7_14'] = $out_7_14;
                        $arraytmp['in_15_21'] = $in_15_21;
                        $arraytmp['out_15_21'] = $out_15_21;
                        $arraytmp['in_22_6'] = $in_22_6;
                        $arraytmp['out_22_6'] = $out_22_6;
                        $arraytmp['late'] = $late;
                        $arraytmp['shift_code'] = $rowshift['code'];
                        
                        
                        //edit by wulan sari 20181105 request ibu Shirley SH3B dan sudah diskusi dengan HR KP dan IT, 
                        //jam masuk ada atau jam pulang ada maka attendance jadi 1
                        //edit by wulan sari 20190325 hari libur attendance nol 
                        if (($rowshift['in_time'] != '00:00:00' && $rowshift['in_time'] != '') || 
                                ($rowshift['out_time'] != '00:00:00' && $rowshift['out_time'] != ''))
                        {
                            if(($in_7_14 != '' && $in_7_14 != '00:00:00') || 
                                    ($out_7_14 != '' && $out_7_14 != '00:00:00') ||
                                    ($in_15_21 != '' && $in_15_21 != '00:00:00') ||
                                    ($out_15_21 != '' && $out_15_21 != '00:00:00') ||
                                    ($in_22_6 != '' && $in_22_6 != '00:00:00') ||
                                    ($out_22_6 != '' && $out_22_6 != '00:00:00')){
                                $arrayupdate['attendance_total'] = 1;
                                $arrayupdate['transport_total'] = 1; // added by wulan sari 20200622
                            }
                        } else {
                            $arrayupdate['attendance_total'] = 0;
                            $arrayupdate['transport_total'] = 0; // added by wulan sari 20200622
                        }                       
                                                
                        $arraytmp['attendance_total'] = $arrayupdate['attendance_total'];
                        $arraytmp['transport_total'] = $arrayupdate['transport_total']; // added by wulan sari 20200622
                        $arraytmp['total_hours'] = $total_hours;
                        $arraytmp['time_in'] = $time_in;
                        $arraytmp['time_out'] = $time_out;
                        $arraytmp['time_lost'] = $time_lost;
                        $arraytmp['date'] = $date;
                        $dao_absent->updateForAbsentDetail($arraytmp, $this->getAppSession());
                        $lates_month = date('m', strtotime($date));
                        $lates_year = date('Y', strtotime($date));
                        $lates_employee_id = $rowabsentdetail['employee_id'];
                        
                        if($arraytmp['shift_code'] != 'CRN'){
                            /* start added by ahmad riadi 20-06-2017 */
                            $this->cleardata_permit_latein_fastout($absentdetail_id);
                            /* end added by ahmad riadi 20-06-2017 */
                        }
                        //  $index++;
                        
                    }
                }
            }
        }

        if (!empty($lates_month) && !empty($lates_employee_id) && $arraytmp['shift_code'] != 'CRN') {
            $dao_absent->cleardata_Employeeinoffiflate($lates_year, $lates_month, $lates_employee_id, $this->getAppSession());
            
            
            // baris ini pindah ke function batch_update() by wulan sari 20200623
            //$this->cleardata_Halfdayleave_iflate($lates_year, $lates_month);
            // start added by ahmad riadi 03-07-2017
            //$this->update_note_absentrecord_fromleave($lates_year, $lates_month);
            // start added by ahmad riadi 03-07-2017 
        }
        
        /*
         * baris ini pindah ke function batch_update() by wulan sari 20200623
        // update by Wulan 2020 05 02
        // khusus KP saat WFH attendence = 1 hanya jika ada fingerprint mulai April 2020 - ....)        
        $project_id = $this->getAppSession()->getProject()->getId();
        $pt_id = $this->getAppSession()->getPt()->getId();
        if($project_id == 1 && $pt_id == 1){
            $this->update_wfh_attn($lates_month, $lates_year);
        }
        */
        
        return true;
    }

    /* end added by ahmad riadi 14-06-2017 */
    
    public function batch_updateRead() {  
        $r = $this->getAppData();
        $lates_month = $r["m"];
        $lates_year = $r["y"];
        
        $this->cleardata_Halfdayleave_iflate($lates_year, $lates_month);
        /* start added by ahmad riadi 03-07-2017 */
        $this->update_note_absentrecord_fromleave($lates_year, $lates_month);
        /* start added by ahmad riadi 03-07-2017 */
        
        // update by Wulan 2020 05 02
        // khusus KP saat WFH attendence = 1 hanya jika ada fingerprint mulai April 2020 - ....)        
        $project_id = $this->getAppSession()->getProject()->getId();
        $pt_id = $this->getAppSession()->getPt()->getId();
        if($project_id == 1){ // && $pt_id == 1
            $this->update_wfh_attn($lates_month, $lates_year);
        } else {
            $this->update_wfh_attn_common($lates_month, $lates_year);            
        }
        
        // update by Wulan 2020 07 07
        $project_id = $this->getAppSession()->getProject()->getId();                
        $dao = new Hrd_Models_Intranet_ConfigDao();
        $data = $dao->getProjectconfig($project_id);
        if (!empty($data[0])) {
            $subholding_subname = $data[0][0]['subholding_subname'];
            if($subholding_subname == 'sh1b'){
                $dao_absent = new Hrd_Models_AbsentDao();
                $dao_absent->update_wfh_attn_raya($lates_month, $lates_year, $this->getAppSession());
            }
        }
        
        
        // added by wulan 22 10 2021
        // $this->update_citradream($lates_month, $lates_year);   
        
        
        $arrayRespon = array("STATUS" => TRUE);
        return Box_Tools::instantRead($arrayRespon);
        
    }
    
    /*
    // added by wulan 22 10 2021
    public function update_citradream($lates_year, $lates_month) {
        $dao_absent = new Hrd_Models_AbsentDao();
        $dao_absent->update_citradream($lates_year, $lates_month, $this->getAppSession());
    }
    */

    /* start added by ahmad riadi 22-09-2017 */

    public function code_for_reset_late($paramcode, $late, $time_lost) {
        $inresetcode = array('S-KD');
        $return = array("late" => $late, "time_lost" => $time_lost);
        if (in_array($paramcode, $inresetcode)) {
            $return = array("late" => NULL, "time_lost" => NULL);
        }
        return $return;
    }

    /* end added by ahmad riadi 22-09-2017 */





    /* start added by ahmad riadi 19-06-2017 */



    /*
      public function cleardata_Halfdayleave_iflate($lates_year, $lates_month) {
      $dao_absent = new Hrd_Models_AbsentDao();
      $dao_shift = new Hrd_Models_Master_ShiftTypeDao();
      $result = $dao_absent->Getdataleavehalfinlate($lates_year, $lates_month);
      if ($result) {
      foreach ($result as $row) {
      $rowshift = $dao_shift->getshift_byid($row['shifttype_id']);
      $shitf_time_in = $row['date'].' '.$rowshift['in_time'];
      $shitf_time_out = $row['date'].' '.$rowshift['out_time'];
      $shitf_hour = (strtotime($shitf_time_out) - strtotime($shitf_time_in)) / 3600;
      $break_hour = 0;
      $shift_totalhour = $shitf_hour-$break_hour;
      $shift_half_timein = $shift_totalhour-5;
      $end_half_time_in = date('Y-m-d H:i:s', strtotime("+".($shift_half_timein-1)." hours", strtotime($shitf_time_in)));
      $start_half_time_out = date('Y-m-d H:i:s', strtotime("+".($shift_half_timein-1)." hours", strtotime($shitf_time_in)));
      $filter_time = date('Y-m-d H:i:s', strtotime("+".$shift_half_timein." hours", strtotime($shitf_time_in)));
      $date_time_in = $row['date'].' '.$row['time_in'];

      $time_in = date('H:i:s', strtotime($shitf_time_in));
      $time_out = date('H:i:s', strtotime($date_time_in));
      $date_clean_late_hour = date('Y-m-d H:i:s', strtotime($row['date'].' '.Box_Tools::timeDifference($time_in, $time_out)));
      $date_late_hour = date('Y-m-d H:i:s', strtotime($row['date'].' '.$row['late']));
      $late_hour = Box_Tools::timeDifference(date('H:i:s', strtotime($date_clean_late_hour)), date('H:i:s', strtotime($date_late_hour)));
      $lost_time = $row['time_lost'];


      if ($date_time_in >= $shitf_time_in && $date_time_in <= $filter_time) {
      $time_in = date('H:i:s', strtotime($shitf_time_in));
      $time_out = date('H:i:s', strtotime($date_time_in));
      $date_clean_lost_time_hour = date('Y-m-d H:i:s', strtotime($row['date'].' '.Box_Tools::timeDifference($time_in, $time_out)));
      $date_lost_time_hour = date('Y-m-d H:i:s', strtotime($row['date'].' '.$lost_time));
      $lost = Box_Tools::timeDifference(date('H:i:s', strtotime($date_clean_lost_time_hour)), date('H:i:s', strtotime($date_lost_time_hour)));
      $lost_time = date('H:i:s', strtotime($row['date'].' '.$lost));
      }

      if ($date_time_in >= $filter_time && $date_time_in <= $shitf_time_out) {
      $time_in = date('H:i:s', strtotime($filter_time));
      $time_out = date('H:i:s', strtotime($shitf_time_out));
      $date_clean_lost_time_hour = date('Y-m-d H:i:s', strtotime($row['date'].' '.Box_Tools::timeDifference($time_in, $time_out)));
      $date_lost_time_hour = date('Y-m-d H:i:s', strtotime($row['date'].' '.$lost_time));
      $lost = Box_Tools::timeDifference(date('H:i:s', strtotime($date_clean_lost_time_hour)), date('H:i:s', strtotime($date_lost_time_hour)));
      $lost_time = date('H:i:s', strtotime($row['date'].' '.$lost));
      }

      $late_hour = date('H:i:s', strtotime($row['date'].' '.$late_hour));
      $user_id = $this->getAppSession()->getUser()->getId();
      $dao_absent->cleardata_Employeein_halfleaveiflate($row['absentdetail_id'],$late_hour,$lost_time,$user_id);

      }
      }
      }

     */

    public function cleardata_Halfdayleave_iflate($lates_year, $lates_month) {
        $dao_absent = new Hrd_Models_AbsentDao();
        $dao_shift = new Hrd_Models_Master_ShiftTypeDao();        
        $ses = $this->getAppSession();  
        $result = $dao_absent->Getdataleavehalfinlate($lates_year, $lates_month, $ses->getProject()->getId(), $ses->getPt()->getId());
        if ($result) {
            foreach ($result as $row) {
                $rowshift = $dao_shift->getshift_byid($row['shifttype_id']);
                $shitf_time_in = $row['date'] . ' ' . $rowshift['in_time'];
                $shitf_time_out = $row['date'] . ' ' . $rowshift['out_time'];
                $shitf_hour = (strtotime($shitf_time_out) - strtotime($shitf_time_in)) / 3600;
                $break_hour = 0;
                $shift_totalhour = $shitf_hour - $break_hour;
                $shift_half_timein = $shift_totalhour - 5;
                $end_half_time_in = date('Y-m-d H:i:s', strtotime("+" . ($shift_half_timein - 1) . " hours", strtotime($shitf_time_in)));
                $start_half_time_out = date('Y-m-d H:i:s', strtotime("+" . ($shift_half_timein - 1) . " hours", strtotime($shitf_time_in)));
                $filter_time = date('Y-m-d H:i:s', strtotime("+" . $shift_half_timein . " hours", strtotime($shitf_time_in)));
                $date_time_in = $row['date'] . ' ' . $row['time_in'];
                $date_time_out = $row['date'] . ' ' . $row['time_out'];
                $late_hour = $row['late'];
                $lost_time = $row['time_lost'];

                $data_hour_bytimein = (strtotime($date_time_in) - strtotime($shitf_time_in)) / 3600;
                $data_hour_bytimeout = (strtotime($date_time_out) - strtotime($shitf_time_out)) / 3600;

                $flag_from_time_in = 0;
                $flag_from_time_out = 0;

                if ($data_hour_bytimein > 0) {
                    $flag_from_time_in = $data_hour_bytimein;
                }

                if ($data_hour_bytimeout < 0) {
                    $flag_from_time_out = abs($data_hour_bytimeout);
                }

                if ($flag_from_time_in > $flag_from_time_out) {
                    $time_in = date('H:i:s', strtotime($shitf_time_in));
                    $time_out = date('H:i:s', strtotime($date_time_in));
                    $date_clean_late_hour = date('Y-m-d H:i:s', strtotime($row['date'] . ' ' . Box_Tools::timeDifference($time_in, $time_out)));
                    $date_late_hour = date('Y-m-d H:i:s', strtotime($row['date'] . ' ' . $row['late']));
                    $late_hour = Box_Tools::timeDifference(date('H:i:s', strtotime($date_clean_late_hour)), date('H:i:s', strtotime($date_late_hour)));
                    $date_clean_lost_time_hour = date('Y-m-d H:i:s', strtotime($row['date'] . ' ' . Box_Tools::timeDifference($time_in, $time_out)));
                    $date_lost_time_hour = date('Y-m-d H:i:s', strtotime($row['date'] . ' ' . $lost_time));
                    $lost = Box_Tools::timeDifference(date('H:i:s', strtotime($date_clean_lost_time_hour)), date('H:i:s', strtotime($date_lost_time_hour)));
                    $lost_time = date('H:i:s', strtotime($row['date'] . ' ' . $lost));
                }

                if ($flag_from_time_in < $flag_from_time_out) {
                    $time_in = date('H:i:s', strtotime($date_time_out));
                    $time_out = date('H:i:s', strtotime($shitf_time_out));
                    $date_clean_lost_time_hour = date('Y-m-d H:i:s', strtotime($row['date'] . ' ' . Box_Tools::timeDifference($time_in, $time_out)));
                    $date_lost_time_hour = date('Y-m-d H:i:s', strtotime($row['date'] . ' ' . $lost_time));
                    $lost = Box_Tools::timeDifference(date('H:i:s', strtotime($date_clean_lost_time_hour)), date('H:i:s', strtotime($date_lost_time_hour)));
                    $lost_time = date('H:i:s', strtotime($row['date'] . ' ' . $lost));
                }

                $late_hour = date('H:i:s', strtotime($row['date'] . ' ' . $late_hour));
                $user_id = $this->getAppSession()->getUser()->getId();
                $dao_absent->cleardata_Employeein_halfleaveiflate($row['absentdetail_id'], $late_hour, $lost_time, $user_id);
            }
        }
    }

    /* end added by ahmad riadi 19-06-2017 */



    /* start added by ahmad riadi 20-06-2017 */
    
    public function cleardata_permit_latein_fastout($absentdetail_id) {
        $dao_absent = new Hrd_Models_AbsentDao();
        $dao_shift = new Hrd_Models_Master_ShiftTypeDao();
        $row = $dao_absent->getAbsentdetail_forlateinfastout_by_id($absentdetail_id);
        if ($row) {
            $rowshift = $dao_shift->getshift_byid($row['shifttype_id']);
            $shitf_time_in = $row['date'] . ' ' . $rowshift['in_time'];
            $shitf_time_out = $row['date'] . ' ' . $rowshift['out_time'];
            $shitf_hour = (strtotime($shitf_time_out) - strtotime($shitf_time_in)) / 3600;
            $break_hour = 0;
            $shift_totalhour = $shitf_hour - $break_hour;
            $shift_half_timein = $shift_totalhour - 5;
            $filter_time = date('Y-m-d H:i:s', strtotime("+" . $shift_half_timein . " hours", strtotime($shitf_time_in)));
            $date_time_in = $row['date'] . ' ' . $row['time_in'];
            $date_time_out = $row['date'] . ' ' . $row['time_out'];

            $late_hour = $row['late'];
            $lost_time = $row['time_lost'];

            if ($row['code'] == 'I-ML') {
                $time_in = date('H:i:s', strtotime($shitf_time_in));
                $time_out = date('H:i:s', strtotime($date_time_in));
                $date_clean_late_hour = date('Y-m-d H:i:s', strtotime($row['date'] . ' ' . Box_Tools::timeDifference($time_in, $time_out)));
                $date_late_hour = date('Y-m-d H:i:s', strtotime($row['date'] . ' ' . $row['late']));
                $late_hour = Box_Tools::timeDifference(date('H:i:s', strtotime($date_clean_late_hour)), date('H:i:s', strtotime($date_late_hour)));
                $date_clean_lost_time_hour = date('Y-m-d H:i:s', strtotime($row['date'] . ' ' . Box_Tools::timeDifference($time_in, $time_out)));
                $date_lost_time_hour = date('Y-m-d H:i:s', strtotime($row['date'] . ' ' . $lost_time));
                $lost = Box_Tools::timeDifference(date('H:i:s', strtotime($date_clean_lost_time_hour)), date('H:i:s', strtotime($date_lost_time_hour)));
                $lost_time = date('H:i:s', strtotime($row['date'] . ' ' . $lost));
            }

            if ($row['code'] == 'I-PA/S') {
                $time_in = date('H:i:s', strtotime($date_time_out));
                $time_out = date('H:i:s', strtotime($shitf_time_out));
                $date_clean_lost_time_hour = date('Y-m-d H:i:s', strtotime($row['date'] . ' ' . Box_Tools::timeDifference($time_in, $time_out)));
                $date_lost_time_hour = date('Y-m-d H:i:s', strtotime($row['date'] . ' ' . $lost_time));
                $lost = Box_Tools::timeDifference(date('H:i:s', strtotime($date_clean_lost_time_hour)), date('H:i:s', strtotime($date_lost_time_hour)));
                $lost_time = date('H:i:s', strtotime($row['date'] . ' ' . $lost));
            }
                        
            $late_hour = date('H:i:s', strtotime($row['date'] . ' ' . $late_hour));
            $user_id = $this->getAppSession()->getUser()->getId();
            
            // edit by wulan sari 20190814 : request dari Art dan sudah disetujui hrd KP supaya I-MLL tidak menghitung late
            if ($row['code'] == 'I-MLL' || $row['code'] == 'TOFFS'){ // || $rowshift['holyday'] == 1) {
                $dao_absent->cleardata_Employeein_permitlateinfastout($absentdetail_id, '00:00:00', '00:00:00', $user_id);   
                
            } else {
                $dao_absent->cleardata_Employeein_permitlateinfastout($absentdetail_id, $late_hour, $lost_time, $user_id);                
            }
        }
    }

    /* end added by ahmad riadi 20-06-2017 */
    
    
    // #1
    // add by wulan sari 20191008
    // public function latelost_after_permit_process($row) {

    //#2
    // added by Michael 2021.05.19
    public function latelost_after_permit_process($row, $dt) {
    // end added by Michael 2021.05.19

        $data['absentdetail_id'] = $row['absentdetail_id'];
        $data['time_in'] = $row['time_in'];
        $data['time_out'] = $row['time_out'];
        $data['description'] = $row['description'];
        $data['attendance_total'] = $row['attendance_total'];
        $data['employee_id'] = $row['employee_id'];
        $data['month'] = date('m', strtotime($row['date']));
        $data['day'] = $row['day'];
        $data['year'] = date('Y', strtotime($row['date']));
        $data['shifttype_shifttype_id'] = $row['shifttype_id'];
        
        $dao = new Hrd_Models_AbsentDao();
        $absentDetail = new Hrd_Models_Master_General_Date();
        $absentDetail->setArrayTable($data);

        $dao = new Hrd_Models_AbsentDao();

        $absentHeader = new Hrd_Models_Absent();
        $absentHeader->setProject($this->getAppSession()->getProject());
        $absentHeader->setPt($this->getAppSession()->getPt());
        $absentHeader->setMonth($data["month"]);
        $absentHeader->setYear($data["year"]);
        $absentHeader->getEmployee()->setId($data["employee_id"]);

        $date = $data["year"] . "-" . $data["month"] . "-" . $data["day"];

        $absentExist = $dao->getAbsentSheetWOPL($absentHeader, $date, $date);
        
        /// cek data dari database
        $absentDetail->setAddBy($this->getAppSession()->getUser()->getId());
        
        // $mp = new Hrd_Models_Absent_MasterProcess($this->getAppSession());
        
        // added by Michael 2021.05.19
        $mp = new Hrd_Models_Absent_MasterProcess($this->getAppSession(),$dt);
        // end added by Michael 2021.05.19

        $mp->process($absentDetail);

        $absentDetail->setTotalAttendance($data["attendance_total"]);

        $hasil = $dao->updateTime($absentDetail);
    }
    // end add by wulan sari 20191008


    /* start added by ahmad riadi 03-07-2017 */

    public function update_note_absentrecord_fromleave($lates_year, $lates_month) {
        $ses = $this->getAppSession();
        $dao_absent = new Hrd_Models_AbsentDao();
        $result = $dao_absent->Getdataleave($lates_year, $lates_month, $ses->getProject()->getId(), $ses->getPt()->getId());
        if ($result) {
            foreach ($result as $row) {
                $absentdetail_id = $row['absentdetail_id'];
                $description = $row['note'];
                $dao_absent->Updatenote_absentrecord($absentdetail_id, $description, $this->getAppSession());
            }
        }
    }

    /* end added by ahmad riadi 03-07-2017 */
    
    public function attachfingerprintinfoRead() {
        $request = $this->getAppData();
        $creator = new Box_Models_App_Creator();
        $msg = "...";
        $hasil = FALSE;
                
        /// get transfer data
        $absent = new Hrd_Models_Absent();
        $data = $this->getAppData();

        // added by Michael 2021.05.19 
        if (array_key_exists("projectptid_opsi",$data) && $data['projectptid_opsi']){

            $projectptid_opsi = $data["projectptid_opsi"];
            $data['projectpt_id'] = $projectptid_opsi;

            $dao_projectpt = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao_projectpt->getProjectPtId($this->getAppSession(), $data);

            $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
            $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

            $data['project_id'] = $projectid_opsi;
            $data['pt_id'] = $ptid_opsi;

            $project_id = $projectid_opsi;

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $data['project_id'] = $this->getAppSession()->getProjectId();
            $data['pt_id'] = $this->getAppSession()->getPtid();

            $dao_projectpt = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao_projectpt->getProject_Pt_Id($this->getAppSession(), $data);

            $data['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }
        // end added by Michael 2021.05.19 
        
        // $absent->setProject($this->getAppSession()->getProject());
        // $absent->setPt($this->getAppSession()->getPt());

        // added by Michael 2021.05.19
        $project = new Box_Models_Master_Project();
        $project->setId($data['project_id']);

        $pt = new Box_Models_Master_Pt();
        $pt->setId($data['pt_id']);

        $absent->setProject($project);
        $absent->setPt($pt);
        // end added by Michael 2021.05.19

        
        $m = isset($data["month"]) ? $data["month"] : date("m");
        $y = isset($data["year"]) ? $data["year"] : date("Y");
        $absent->setYear($y);
        $absent->setMonth($m);

        $dao = new Hrd_Models_AbsentDao();
        $allFingerPrint = $dao->getAllFingerPrint($absent);

        // $lostTime = new Hrd_Models_Absent_LostTime($this->getAppSession())

        // added by Michael 2021.05.19
        $lostTime = new Hrd_Models_Absent_LostTime($this->getAppSession(), $data);
        // end added by Michael 2021.05.19



        // get employee absent sheet
        // $allAbsentFingerPrint = $dao->getAllAbsentFingerPrint($absent);

        // added by Michael 2021.05.19
        $allAbsentFingerPrint = $dao->getAllAbsentFingerPrint($absent, $data);
        // end added by Michael 2021.05.19


        $tempDate = NULL;
        $absentHeader = new Hrd_Models_Absent();

        /* get all shifttype */
        $daost = new Hrd_Models_Master_ShiftTypeDao();
        $daost->setSession($this->getAppSession());
        // $shifTypes = $daost->getAllWOPL();


        // added by Michael 2021.05.19 
        $shiftFilter = new Hrd_Models_Master_ShiftType();
        $project = new Box_Models_Master_Project();
        $project->setId($projectid_opsi);

        $pt = new Box_Models_Master_Pt();
        $pt->setId($ptid_opsi);

        $shiftFilter->setProject($project);
        $shiftFilter->setPt($pt);
        $shifTypes = $daost->getAllWOPL($shiftFilter);
        // end added by Michael 2021.05.19 

        

        $shifTypes = Hrd_Models_Absent_Tools::buildObjects($creator, "shifttype", $shifTypes, 1);

        // $hal = new Hrd_Models_Absent_ProcessHal($this->getAppSession(), $shifTypes);

        // added by Michael 2021.05.19
        $hal = new Hrd_Models_Absent_ProcessHal($this->getAppSession(), $shifTypes, $data);
        // added by Michael 2021.05.19

        if (count($allAbsentFingerPrint[0]) > 0) { // jika ada sheet
            foreach ($allAbsentFingerPrint[0] as $row) {
                $tempDate = date("Y-m-d", strtotime($row["date"]));
                if (count($allFingerPrint[0]) > 0) {
                    foreach ($allFingerPrint[0] as $fpRow) {

                        if ($row["employee_fingerprintcode"] > 0) {

                            // echo $row["employee_fingerprintcode"]."<br/>";

                            if ($row["employee_fingerprintcode"] == $fpRow["psnno"]) {




                                if ($tempDate == $fpRow["date"]) {
                                    $absenDetail = new Hrd_Models_Master_General_Date();
                                    $absenDetail->setId($row["absentdetail_id"]);
                                    Hrd_Models_Absent_Tools::attachTimeByShiftType($absenDetail, $fpRow["time_in"], TRUE);
                                    Hrd_Models_Absent_Tools::attachTimeByShiftType($absenDetail, $fpRow["time_out"], FALSE);

                                    $absenDetail->setTimeIn($fpRow["time_in"]);
                                    $absenDetail->setTimeOut($fpRow["time_out"]);


                                    // process late
                                    if (count($shifTypes) > 0) {

                                        foreach ($shifTypes as $st) {

                                            if ($row["shifttype_id"] == $st->getId()) {
                                                Hrd_Models_Absent_Tools::attachLate($absenDetail, $st->getInTime(), $st);

                                                Hrd_Models_Absent_Tools::attachAttendance($absenDetail, $st);
                                                $hal->attachProcess($absenDetail, $st);
                                            } else {
                                                
                                            }
                                        }
                                    } else {
                                        $msg = "Tidak ada data shifttype";
                                    }



                                    $absenDetail->setTimeLost($lostTime->getAmount($fpRow["time_in"], $fpRow["time_out"], $shifTypes, $row['shifttype_id']));

                                    $absenDetail->setDate($tempDate);

                                    $absentHeader->addDetail($absenDetail);
                                }
                            } else {
                                $msg = "Finger print ada yang tidak cocok";
                            }
                        } else {
                            $msg = "Finger print code tidak ada ...";
                        }
                    }
                } else {
                    $msg = "Finger print data not found for this month (" . $m . "-" . $y . ")";
                }
            }
        } else {
            $msg = "Employee absent sheet not found for this month (" . $m . "-" . $y . ")";
        }



        $de = new Box_Delien_DelimiterEnhancer();
        $de->setDelimiterCandidate($absentHeader);
        $de->generate();



        $defaultArray = array("absentdetail_id" => "", "in_7_14" => "", "out_7_14" => "", "in_15_21" => "",
            "out_15_21" => "", "in_22_6" => "", "out_22_6" => "", "late" => "", "attendance_total" => "", "transport_total" => "",
            "total_hours" => "", "time_in" => "", "time_out" => "", "time_lost" => "", "date" => "");

        $tempAr = $defaultArray;
        $newDataFix = array();

        if (count($absentHeader->getDCResult()) > 0) {
            foreach ($absentHeader->getDCResult() as $k => $v) {
                $tempAr[$k] = explode("~", $v);
            }

            /// split hasil array
            $count = 0;
            $countData = 0;
            $jumlahGroup = 0;
            $newDataFix[$jumlahGroup] = $defaultArray;
            foreach ($tempAr["absentdetail_id"] as $record) {
                if ($count >= 10) {
                    $count = 0;
                    $jumlahGroup++;
                    $newDataFix[$jumlahGroup] = $defaultArray;
                }

                foreach ($tempAr as $k => $v) {
                    if (key_exists($k, $newDataFix[$jumlahGroup])) {
                        $newDataFix[$jumlahGroup][$k] .= $v[$countData] . "~";
                    }
                }


                $countData++;
                $count++;
            }
        }


        ///end split hasil array
        if (count($newDataFix) > 0) {
            $hasil = TRUE;
        }


        $arrayRespon = array(
            "STATUS" => $hasil ? TRUE : FALSE,
            "DATAS" => $newDataFix,
            "MSG" => $hasil ? $msg : $msg
        );
        return Box_Tools::instantRead($arrayRespon);
    }

    /*
      public function attachfingerprintRead() {





      $dm = new Box_Models_App_Hermes_DataModel();
      $dm->setDirectResult(TRUE);
      $dm->setRequiredDataList(FALSE);
      $dm->setRequiredModel(FALSE);
      $msg = "Processing";

      $creator = new Box_Models_App_Creator();
      $request = $this->getAppData();

      $hasil = FALSE;

      /// get transfer data
      $absent = new Hrd_Models_Absent();
      $absent->setProject($this->getAppSession()->getProject());
      $absent->setPt($this->getAppSession()->getPt());
      $data = $this->getAppData();
      $m = isset($data["month"]) ? $data["month"] : date("m");
      $y = isset($data["year"]) ? $data["year"] : date("Y");
      $absent->setYear($y);
      $absent->setMonth($m);

      $dao = new Hrd_Models_AbsentDao();
      $allFingerPrint = $dao->getAllFingerPrint($absent);

      $lostTime = new Hrd_Models_Absent_LostTime($this->getAppSession());



      // get employee absent sheet
      $allAbsentFingerPrint = $dao->getAllAbsentFingerPrint($absent);



      $tempDate = NULL;
      $absentHeader = new Hrd_Models_Absent();

      /// get all shifttype
      $daost = new Hrd_Models_Master_ShiftTypeDao();
      $shifTypes = $daost->getAll($this->getAppRequest(), new Hrd_Models_Master_ShiftType());
      $shifTypes = Hrd_Models_Absent_Tools::buildObjects($creator, "shifttype", $shifTypes, 1);

      $hal = new Hrd_Models_Absent_ProcessHal($this->getAppSession(), $shifTypes);


      if (count($allAbsentFingerPrint[0]) > 0) { // jika ada sheet
      foreach ($allAbsentFingerPrint[0] as $row) {
      $tempDate = date("Y-m-d", strtotime($row["date"]));
      if (count($allFingerPrint[0]) > 0) {
      foreach ($allFingerPrint[0] as $fpRow) {
      if ($row["employee_fingerprintcode"] > 0) {

      if ($row["employee_fingerprintcode"] == $fpRow["psnno"]) {


      if ($tempDate == $fpRow["date"]) {
      $absenDetail = new Hrd_Models_Master_General_Date();
      $absenDetail->setId($row["absentdetail_id"]);

      Hrd_Models_Absent_Tools::attachTimeByShiftType($absenDetail, $fpRow["time_in"], TRUE);
      Hrd_Models_Absent_Tools::attachTimeByShiftType($absenDetail, $fpRow["time_out"], FALSE);

      // process late
      if (count($shifTypes) > 0) {
      foreach ($shifTypes as $st) {
      if ($row["shifttype_id"] == $st->getId()) {
      Hrd_Models_Absent_Tools::attachLate($absenDetail, $st->getInTime());
      Hrd_Models_Absent_Tools::attachAttendance($absenDetail, $st);
      $hal->attachProcess($absenDetail, $st);
      }
      }
      }

      $absenDetail->setTimeIn($fpRow["time_in"]);
      $absenDetail->setTimeOut($fpRow["time_out"]);



      $absenDetail->setTimeLost($lostTime->getAmount($fpRow["time_in"], $fpRow["time_out"], $shifTypes, $row['shifttype_id']));

      $absenDetail->setDate($tempDate);

      $absentHeader->addDetail($absenDetail);
      }
      }
      }
      }
      } else {
      $msg = "Finger print data not found for this month (" . $m . "-" . $y . ")";
      }
      }
      } else {
      $msg = "Employee absent sheet not found for this month (" . $m . "-" . $y . ")";
      }



      $de = new Box_Delien_DelimiterEnhancer();
      $de->setDelimiterCandidate($absentHeader);
      $de->generate();








      if ($absentHeader->getDCResult()) {
      $hasil = $dao->updateAbsentByFingerPrint($absentHeader, $this->getAppSession());
      } else {

      }





      /// check jika ada kesamaan tanggal dan nomor fingerprint


      $otherAT = array(array(
      "STATUS" => $hasil ? TRUE : FALSE,
      "MSG" => $hasil ? "SUCCESS" : $msg
      ));




      $dm->setHasil(array($otherAT));


      return $dm;
      }

     */

    public function processdayRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $creator = new Box_Models_App_Creator();

        //===== MASTERDATA == //
        $msg = "Processing...";
        $hasil = FALSE;

        $data = $this->getAppData();
        $absent = new Hrd_Models_Absent();
        $absent->setMonth($data["month"]);
        $absent->setYear($data["year"]);

        $processor = new Hrd_Models_Absent_ProcessDay();
        $processor->run($absent, $this->getAppSession(), $this->getAppRequest());
        $hasil = $processor->getHasil();
        $msg = $processor->getMsg();




        $otherAT = array(array(
                "STATUS" => $hasil ? TRUE : FALSE,
                "MSG" => $msg
        ));




        $dm->setHasil(array($otherAT));


        return $dm;
    }

    public function processhalRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $creator = new Box_Models_App_Creator();


        $msg = "Processing...";
        $hasil = FALSE;


        /* get all shifttype */
        $daost = new Hrd_Models_Master_ShiftTypeDao();
        $shifTypes = $daost->getAll($this->getAppRequest(), new Hrd_Models_Master_ShiftType());
        $shifTypes = Hrd_Models_Absent_Tools::buildObjects($creator, "shifttype", $shifTypes, 1);


        // added by Michael 2021.05.19 
        $data = $this->getAppData();
        if (array_key_exists("projectptid_opsi",$data) && $data['projectptid_opsi']){

            $projectptid_opsi = $data["projectptid_opsi"];
            $data['projectpt_id'] = $projectptid_opsi;

            $dao_projectpt = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao_projectpt->getProjectPtId($this->getAppSession(), $data);

            $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
            $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

            $data['project_id'] = $projectid_opsi;
            $data['pt_id'] = $ptid_opsi;

            $project_id = $projectid_opsi;

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $data['project_id'] = $this->getAppSession()->getProjectId();
            $data['pt_id'] = $this->getAppSession()->getPtid();

            $dao_projectpt = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao_projectpt->getProject_Pt_Id($this->getAppSession(), $data);

            $data['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }
        // end added by Michael 2021.05.19 

        // $optionSelector = new Hrd_Models_Absent_OptionSelector($this->getAppData(), new Hrd_Models_Absent_ProcessHal($this->getAppSession(), $shifTypes));
        
        $optionSelector = new Hrd_Models_Absent_OptionSelector($this->getAppData(), new Hrd_Models_Absent_ProcessHal($this->getAppSession(), $shifTypes, $data));

        $optionSelector->run($this->getAppSession(), $this->getAppRequest());


        $otherAT = array(array(
                "STATUS" => $optionSelector->getHasil(),
                "MSG" => $optionSelector->getMsg()
        ));




        $dm->setHasil(array($otherAT));


        return $dm;
    }

    public function processlateRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $creator = new Box_Models_App_Creator();

        //===== MASTERDATA == //
        $msg = "Processing...";
        $hasil = FALSE;
        $data = $this->getAppData();
        $process = $data["process"];

        switch ($process) {
            case 'employee':
                $employeeId = intval($data["employee_id"]);

                $absent = new Hrd_Models_Absent();

                $absent->setMonth($data["month"]);
                $absent->setYear($data["year"]);
                $absent->getEmployee()->setId($employeeId);

                $processor = new Hrd_Models_Absent_ProcessLate();
                $processor->run($absent, $this->getAppSession(), $this->getAppRequest());
                $hasil = $processor->getHasil();
                $msg = $processor->getMsg();


                break;
            case 'department':

                $absent = new Hrd_Models_Absent();
                $absent->setMonth($data["month"]);
                $absent->setYear($data["year"]);

                $processor = new Hrd_Models_Absent_ProcessLate();
                $processor->run($absent, $this->getAppSession(), $this->getAppRequest());
                $hasil = $processor->getHasil();
                $msg = $processor->getMsg();

                break;
            case 'all':

                $absent = new Hrd_Models_Absent();
                $absent->setMonth($data["month"]);
                $absent->setYear($data["year"]);

                $processor = new Hrd_Models_Absent_ProcessLate();
                $processor->run($absent, $this->getAppSession(), $this->getAppRequest());
                $hasil = $processor->getHasil();
                $msg = $processor->getMsg();

                break;
        }


        $otherAT = array(array(
                "STATUS" => $hasil ? TRUE : FALSE,
                "MSG" => $msg
        ));




        $dm->setHasil(array($otherAT));


        return $dm;
    }

    public function processabsentRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $creator = new Box_Models_App_Creator();

        //===== MASTERDATA == //
        $msg = "Processing...";
        $hasil = FALSE;
        $data = $this->getAppData();
        $process = $data["process"];
        $startDate = $data["start_date"];
        $endDate = $data["end_date"];
        switch ($process) {
            case 'employee':
                $employeeId = intval($data["employee_id"]);

                $absent = new Hrd_Models_Absent();

                $absent->setMonth($data["month"]);
                $absent->setYear($data["year"]);
                $absent->getEmployee()->setId($employeeId);

                $processor = new Hrd_Models_Absent_SetupShiftManual();
                $processor->run($absent, $this->getAppSession(), $this->getAppRequest());
                $hasil = $processor->getHasil();
                $msg = $processor->getMsg();


                break;
            case 'department':

                $absent = new Hrd_Models_Absent();
                $absent->setMonth($data["month"]);
                $absent->setYear($data["year"]);

                $processor = new Hrd_Models_Absent_SetupShiftManual();
                $processor->run($absent, $this->getAppSession(), $this->getAppRequest());
                $hasil = $processor->getHasil();
                $msg = $processor->getMsg();

                break;
            case 'all':

                $absent = new Hrd_Models_Absent();
                $absent->setMonth($data["month"]);
                $absent->setYear($data["year"]);

                $processor = new Hrd_Models_Absent_SetupShiftManual();
                $processor->run($absent, $this->getAppSession(), $this->getAppRequest());
                $hasil = $processor->getHasil();
                $msg = $processor->getMsg();

                break;
        }


        $otherAT = array(array(
                "STATUS" => $hasil ? TRUE : FALSE,
                "MSG" => $msg
        ));




        $dm->setHasil(array($otherAT));


        return $dm;
    }

    public function mainCreate() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $obj = new Hrd_Models_Master_General_Date();

        $dm->setDao(new Hrd_Models_AbsentDao());
        $dm->setValidator(new Hrd_Models_AbsentValidator());
        $dm->setObject($obj);

        return $dm;
    }

    public function setupsheetCreate() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $obj = new Hrd_Models_Absent();

        $dm->setDao(new Hrd_Models_AbsentDao());
        $dm->setValidator(new Hrd_Models_AbsentMainValidator());
        $dm->setObject($obj);

        return $dm;
    }

    public function absenttlkCreate() {

        $dm = new Box_Models_App_Hermes_DataModel();
        $obj = new Hrd_Models_Absent();
        $validator = new Hrd_Models_AbsentMainValidator();
        $validator->setNoValidation(TRUE);
        $dm->setDao(new Hrd_Models_AbsentDao());
        $dm->setValidator($validator);
        $dm->setObject($obj);

        return $dm;
    }

    public function updatebyrangedateCreate() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $obj = new Hrd_Models_Absent();
        $validator = new Hrd_Models_AbsentMainValidator();
        $validator->setNoValidation(TRUE);
        $dm->setDao(new Hrd_Models_AbsentDao());
        $dm->setValidator($validator);
        $dm->setObject($obj);

        return $dm;
    }

    public function generateRead() {
        
    }

    /* @result fetch employee */

    public function newRead() {
        $r = $this->getAppData();
        $month = $r["month_pick"];
        $year = $r["year_pick"];

        // added by Michael 2021.05.19 
        if (array_key_exists("projectptid_opsi",$r)){

            $projectptid_opsi = $r["projectptid_opsi"];
            $r['projectpt_id'] = $projectptid_opsi;

            $dao = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao->getProjectPtId($this->getAppSession(), $r);

            $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
            $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

            $r['project_id'] = $projectid_opsi;
            $r['pt_id'] = $ptid_opsi;

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $r['project_id'] = $this->getAppSession()->getProjectId();
            $r['pt_id'] = $this->getAppSession()->getPtid();

            $dao = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao->getProject_Pt_Id($this->getAppSession(), $r);

            $r['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }
        // end added by Michael 2021.05.19 
        
        
        $data = array();
        $days = array("sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday");
        $maxDay = cal_days_in_month(CAL_GREGORIAN, $month, $year);
        $dao = new Hrd_Models_AbsentDao();
        // $hasil = $dao->saveNewSheet(array("month" => $month, "year" => $year, "maxday" => $maxDay), $this->getAppSession());
        $hasil = $dao->saveNewSheet(array("month" => $month, "year" => $year, "maxday" => $maxDay, "project_id" => $projectid_opsi, "pt_id" => $ptid_opsi), $this->getAppSession());

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'employeepersonal', array('department'), array());

        $data = $dao->getListEmployee($month, $year);
        $dm->setDataList($dataList);
        $dm->setHasil($data);

        return $dm;
    }

    public function shifttypeexcelRead() {
        $app = new Box_Models_App_Models_Create($this);
        $msg = '???';
        $success = FALSE;
        $data = $this->getAppData();

        // added by Michael 2021.05.19 
        if (array_key_exists("projectptid_opsi",$data) && $data['projectptid_opsi']){

            $projectptid_opsi = $data["projectptid_opsi"];
            $data['projectpt_id'] = $projectptid_opsi;

            $dao = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao->getProjectPtId($this->getAppSession(), $data);

            $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
            $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

            $data['project_id'] = $projectid_opsi;
            $data['pt_id'] = $ptid_opsi;

            $project_id = $projectid_opsi;

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $data['project_id'] = $this->getAppSession()->getProjectId();
            $data['pt_id'] = $this->getAppSession()->getPtid();

            $dao = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao->getProject_Pt_Id($this->getAppSession(), $data);

            $data['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }
        // end added by Michael 2021.05.19 


        $month = intval($data["month"]);
        $year = intval($data["year"]);
        $fileName = $data["file_name"];
        $ste = new Hrd_Models_Absent_ShiftTypeExcel();
        
        // edited by wulan sari 20190102
        // diupdate utk cari cara yang lebih cepat
        //#1
        // $success = $ste->process_v2($fileName, $this->getAppSession(), $month, $year);

        //#2
        // added by Michael 2021.05.19 
        $success = $ste->process_v2($fileName, $this->getAppSession(), $month, $year, $data);
        // end added by Michael 2021.05.19 

        if ($success) {
            $success = TRUE;
            $msg = "Success";
        } else {
            $msg = "Error pada saat proses database";
        }

        $arrayRespon = array("HASIL" => $success, "MSG" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }
    
    /*
    public function shifttypeexcelRead() {
        $app = new Box_Models_App_Models_Create($this);
        $msg = '???';
        $success = FALSE;
        $data = $this->getAppData();
        $month = intval($data["month"]);
        $year = intval($data["year"]);
        $fileName = $data["file_name"];
        $ste = new Hrd_Models_Absent_ShiftTypeExcel();
        
        $decan = $ste->process($fileName, $this->getAppSession());

        if ($ste->getStatus()) {
            $aDao = new Hrd_Models_AbsentDao();
            $success = $aDao->updateShiftTypeExcel($this->getAppSession(), $month, $year, $decan);
            if ($success) {
                $success = TRUE;
                $msg = "Success";
            } else {
                $msg = "Error pada saat proses database";
            }
        } else {
            $msg = $ste->getMsg();
        }

        $arrayRespon = array("HASIL" => $success, "MSG" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }
    */
    
    public function uploadRead() {

        $ses = $this->getAppSession();


        $data = $this->getAppData();

        $msg = '???';
        $success = FALSE;
        $modeUpload = $data["type"];
        $fileUpload = NULL;
        if ($modeUpload == "csv") {
            $fileUpload = new Box_Models_App_FileUpload("/" . Box_Config::SHIFTTYPE_EXCEL_PATH, "absent_" . $ses->getProject()->getId() . "_" . $ses->getPt()->getId(), "csv");
        } else if ($modeUpload == "excel") {
            $fileUpload = new Box_Models_App_FileUpload("/" . Box_Config::SHIFTTYPE_EXCEL_PATH, "absentshift_" . $ses->getProject()->getId() . "_" . $ses->getPt()->getId(), "xlsx");
        }
        // added by Michael 2021.06.15 
         else if ($modeUpload == "dokumen") {
            $fileUpload = new Box_Models_App_FileUpload("/public/app/hrd/uploads/sakit/", "sakit_" . $ses->getProject()->getId() . "_" . $ses->getPt()->getId() . "_DOKUMEN_" . time(), "png,PNG,jpg,JPG,jpeg,JPEG");
        }
        // end added by Michael 2021.06.15 
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

    /* CUMA UNTUK UPLOAD FILE EXCEL SHIFT TYPE , YANG LAINNYA PAKE uploadRead */

    public function uploadAction() {
        $app = new Box_Models_App_Models_Create($this);
        //$app = new Erems_Box_Models_App_Models_Create($this);

        $ses = $app->getSession();
        $msg = '???';
        $success = FALSE;
        $fileUpload = new Box_Models_App_FileUpload("/" . Box_Config::SHIFTTYPE_EXCEL_PATH, "absentshift_" . $ses->getProject()->getId() . "_" . $ses->getPt()->getId(), "xlsx");
        $fileUpload->run();
        if (!$fileUpload->isSuccess()) {
            $msg = $fileUpload->getErrorMsg();
        } else {
            $success = TRUE;
            $msg = $fileUpload->getFileName();
        }





        $app->setMsg($msg);
        $app->setSuccess($success);
        $app->run();
    }

    protected function getDefaultProcessor() {
        return new Hrd_Models_App_Box_AbsentProcessor();
    }

    protected function testingFlag() {
        
    }

    /* start added by ahmad riadi 06-04-2017 */

    public function checkconfigintranetRead() {

        $project_id = $this->getAppSession()->getProject()->getId();

        // added by Michael 2021.05.19 
        $data = $this->getAppData();
        if (array_key_exists("projectptid_opsi",$data) && $data['projectptid_opsi']){

            $projectptid_opsi = $data["projectptid_opsi"];
            $data['projectpt_id'] = $projectptid_opsi;

            $dao = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao->getProjectPtId($this->getAppSession(), $data);

            $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
            $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

            $data['project_id'] = $projectid_opsi;
            $data['pt_id'] = $ptid_opsi;

            $project_id = $projectid_opsi;

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $data['project_id'] = $this->getAppSession()->getProjectId();
            $data['pt_id'] = $this->getAppSession()->getPtid();

            $dao = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao->getProject_Pt_Id($this->getAppSession(), $data);

            $data['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }
        // end added by Michael 2021.05.19 

        $dao = new Hrd_Models_Intranet_ConfigDao();
        $data = $dao->getProjectconfig($project_id);
        if (!empty($data[0])) {
            return Box_Tools::instantRead(array("HASIL" => 1,), array($data[0][0]));
        } else {
            return Box_Tools::instantRead(array("HASIL" => 1,), array());
        }
    }

    public function absenttypeRead() {

        // added by Michael 2021.05.19 
        $data = $this->getAppData();
        if (array_key_exists("projectptid_opsi",$data) && $data['projectptid_opsi']){

            $projectptid_opsi = $data["projectptid_opsi"];
            $data['projectpt_id'] = $projectptid_opsi;

            $dao = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao->getProjectPtId($this->getAppSession(), $data);

            $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
            $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

            $data['project_id'] = $projectid_opsi;
            $data['pt_id'] = $ptid_opsi;

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $data['project_id'] = $this->getAppSession()->getProjectId();
            $data['pt_id'] = $this->getAppSession()->getPtid();

            $dao = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao->getProject_Pt_Id($this->getAppSession(), $data);

            $data['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }
        // end added by Michael 2021.05.19 

        $ma = new Hrd_Models_App_Mastertable_AbsentType();
        // $aa = $ma->prosesDataWithSession($this->getAppSession(), TRUE);
        $aa = $ma->prosesDataWithoutSession($this->getAppSession(), TRUE, $data);
        $hasil = FALSE;
        $arrayRespon = array(
            "HASIL" => $hasil,
            "ABSENTTYPEGROUP_LEAVE" => Box_Config::ABSENTTYPEGROUP_LEAVE,
            "ABSENTTYPEGROUPCODE_LEAVE" => Box_Config::ABSENTTYPEGROUP_CODE_LEAVE);
        return Box_Tools::instantRead($arrayRespon, array($aa));
    }

    public function getdatacutiintranetRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'intranetcuti', array(), array());
        $setup = new Hrd_Models_General_Setup();
        
        // edit by wulan sari
        // cek SH karena perlakukannya beda yang sudah implement intranet attndance KP dengan yg belum
        $dao_absent = new Hrd_Models_AbsentDao();
        $checkSH = $dao_absent->checkSH($setup->_project_id);
        
        if (strtolower($checkSH['subholding_subname']) == 'sh1a') {
            $dao = new Hrd_Models_Intranet_CutiDaoSh1a();
        } else if (strtolower($checkSH['subholding_subname']) == 'kp' || 
                strtolower($checkSH['subholding_subname']) == 'sh1b' || 
                strtolower($checkSH['subholding_subname']) == 'sh3a' || 
                strtolower($checkSH['subholding_subname']) == 'sh3b' || 
                strtolower($checkSH['subholding_subname']) == 'century21') {
            $dao = new Hrd_Models_Intranet_CutiDaoKp();
        } else {
            $dao = new Hrd_Models_Intranet_CutiDao();
        }

        $obj = new Hrd_Models_Intranet_Cuti();
        $obj->setArrayTable($this->getAppData());
        $project_id = $this->getAppSession()->getProject()->getId();
        $pt_id = $this->getAppSession()->getPt()->getId();
        $data = $this->getAppData();
        $config = $data['configintranet'];
        $hasil = $dao->getAll($project_id, $pt_id, 'default', $config, $data['limit'], $data['start'], null);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function getdatacutidetailintranetRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'intranetcutidetail', array(), array());
        $setup = new Hrd_Models_General_Setup();
        
        // edit by wulan sari
        // cek SH karena perlakukannya beda yang sudah implement intranet attndance KP dengan yg belum
        $dao_absent = new Hrd_Models_AbsentDao();
        $checkSH = $dao_absent->checkSH($setup->_project_id);
        
        if (strtolower($checkSH['subholding_subname']) == 'sh1a') {
            $dao = new Hrd_Models_Intranet_CutiDaoSh1a();
        } else if (strtolower($checkSH['subholding_subname']) == 'kp' || 
                strtolower($checkSH['subholding_subname']) == 'sh1b' || 
                strtolower($checkSH['subholding_subname']) == 'sh3a' || 
                strtolower($checkSH['subholding_subname']) == 'sh3b' || 
                strtolower($checkSH['subholding_subname']) == 'century21') {
            $dao = new Hrd_Models_Intranet_CutiDaoKp();
        } else {
            $dao = new Hrd_Models_Intranet_CutiDao();
        }
        $obj = new Hrd_Models_Intranet_Cutidetail();
        $obj->setArrayTable($this->getAppData());
        $data = $this->getAppData();
        $cuti_id = $data['cuti_id'];
        $config = $data['configintranet'];
        $hasil = $dao->getCutidetail($cuti_id, $config);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function filtercutiintranetRead() {

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'intranetcuti', array(), array());
        $setup = new Hrd_Models_General_Setup();
        
        // edit by wulan sari
        // cek SH karena perlakukannya beda yang sudah implement intranet attndance KP dengan yg belum
        $dao_absent = new Hrd_Models_AbsentDao();
        $checkSH = $dao_absent->checkSH($setup->_project_id);
        
        $obj = new Hrd_Models_Intranet_Cuti();
        $data = $this->getAppData();
        $obj->setArrayTable($this->getAppData());
        $project_id = $this->getAppSession()->getProject()->getId();
        $pt_id = $this->getAppSession()->getPt()->getId();

        // added by Michael 2021.05.19 
        if (array_key_exists("projectptid_opsi",$data) && $data['projectptid_opsi']){

            $projectptid_opsi = $data["projectptid_opsi"];
            $data['projectpt_id'] = $projectptid_opsi;

            $dao_projectpt = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao_projectpt->getProjectPtId($this->getAppSession(), $data);

            $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
            $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

            $data['project_id'] = $projectid_opsi;
            $data['pt_id'] = $ptid_opsi;

            $project_id = $projectid_opsi;
            $pt_id = $ptid_opsi;
            $checkSH = $dao_absent->checkSH($project_id);

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $data['project_id'] = $this->getAppSession()->getProjectId();
            $data['pt_id'] = $this->getAppSession()->getPtid();

            $dao_projectpt = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao_projectpt->getProject_Pt_Id($this->getAppSession(), $data);

            $data['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }
        // end added by Michael 2021.05.19 

        if (strtolower($checkSH['subholding_subname']) == 'sh1a') {
            $dao = new Hrd_Models_Intranet_CutiDaoSh1a(); 
        } else if (strtolower($checkSH['subholding_subname']) == 'kp' || 
                strtolower($checkSH['subholding_subname']) == 'sh1b' || 
                strtolower($checkSH['subholding_subname']) == 'sh3a' || 
                strtolower($checkSH['subholding_subname']) == 'sh3b' || 
                strtolower($checkSH['subholding_subname']) == 'century21') {
            $dao = new Hrd_Models_Intranet_CutiDaoKp();
        } else {
            $dao = new Hrd_Models_Intranet_CutiDao();
        }

        $hasil = $dao->getAll($project_id, $pt_id, 'filter', $data['configintranet'], $data['limit'], $data['start'], $data['paramdata']);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function getdataijinintranetRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'intranetijin', array(), array());
        $setup = new Hrd_Models_General_Setup();
        
        // edit by wulan sari
        // cek SH karena perlakukannya beda yang sudah implement intranet attndance KP dengan yg belum
        $dao_absent = new Hrd_Models_AbsentDao();
        $checkSH = $dao_absent->checkSH($setup->_project_id);
                
        if (strtolower($checkSH['subholding_subname']) == 'sh1a') {
            $dao = new Hrd_Models_Intranet_IjinDaoSh1a();
        } else if (strtolower($checkSH['subholding_subname']) == 'kp' || 
                strtolower($checkSH['subholding_subname']) == 'sh1b' || 
                strtolower($checkSH['subholding_subname']) == 'sh3a' || 
                strtolower($checkSH['subholding_subname']) == 'sh3b' || 
                strtolower($checkSH['subholding_subname']) == 'century21') {
            $dao = new Hrd_Models_Intranet_IjinDaoKp();
        } else {
            $dao = new Hrd_Models_Intranet_IjinDao();
        }
        $obj = new Hrd_Models_Intranet_Ijin();
        $obj->setArrayTable($this->getAppData());
        $data = $this->getAppData();
        $project_id = $this->getAppSession()->getProject()->getId();
        $pt_id = $this->getAppSession()->getPt()->getId();
        $hasil = $dao->getAll($project_id, $pt_id, 'default', $data['configintranet'], $data['limit'], $data['start'], null);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function filterijinintranetRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'intranetijin', array(), array());
        $setup = new Hrd_Models_General_Setup();
        
        // edit by wulan sari
        // cek SH karena perlakukannya beda yang sudah implement intranet attndance KP dengan yg belum
        $dao_absent = new Hrd_Models_AbsentDao();
        $checkSH = $dao_absent->checkSH($setup->_project_id);
        
        $obj = new Hrd_Models_Intranet_Ijin();
        $data = $this->getAppData();
        $obj->setArrayTable($this->getAppData());
        $project_id = $this->getAppSession()->getProject()->getId();
        $pt_id = $this->getAppSession()->getPt()->getId();

         // added by Michael 2021.05.19 
        if (array_key_exists("projectptid_opsi",$data) && $data['projectptid_opsi']){

            $projectptid_opsi = $data["projectptid_opsi"];
            $data['projectpt_id'] = $projectptid_opsi;

            $dao_projectpt = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao_projectpt->getProjectPtId($this->getAppSession(), $data);

            $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
            $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

            $data['project_id'] = $projectid_opsi;
            $data['pt_id'] = $ptid_opsi;

            $project_id = $projectid_opsi;
            $pt_id = $ptid_opsi;
            $checkSH = $dao_absent->checkSH($project_id);

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $data['project_id'] = $this->getAppSession()->getProjectId();
            $data['pt_id'] = $this->getAppSession()->getPtid();

            $dao_projectpt = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao_projectpt->getProject_Pt_Id($this->getAppSession(), $data);

            $data['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }

        // end added by Michael 2021.05.19 
        
        if (strtolower($checkSH['subholding_subname']) == 'sh1a') {
            $dao = new Hrd_Models_Intranet_IjinDaoSh1a();
        } else if (strtolower($checkSH['subholding_subname']) == 'kp' || 
                strtolower($checkSH['subholding_subname']) == 'sh1b' || 
                strtolower($checkSH['subholding_subname']) == 'sh3a' || 
                strtolower($checkSH['subholding_subname']) == 'sh3b' || 
                strtolower($checkSH['subholding_subname']) == 'century21') {
            $dao = new Hrd_Models_Intranet_IjinDaoKp();
        } else {
            $dao = new Hrd_Models_Intranet_IjinDao();
        }

        $hasil = $dao->getAll($project_id, $pt_id, 'filter', $data['configintranet'], $data['limit'], $data['start'], $data['paramdata']);
        
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function getdatadinasintranetRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'intranetdinas', array(), array());
        $setup = new Hrd_Models_General_Setup();
        
        // edit by wulan sari
        // cek SH karena perlakukannya beda yang sudah implement intranet attndance KP dengan yg belum
        $dao_absent = new Hrd_Models_AbsentDao();
        $checkSH = $dao_absent->checkSH($setup->_project_id);
        
        if (strtolower($checkSH['subholding_subname']) == 'sh1a') {
            $dao = new Hrd_Models_Intranet_DinasDaoSh1a();
        } else if (strtolower($checkSH['subholding_subname']) == 'kp' || 
                strtolower($checkSH['subholding_subname']) == 'sh1b' || 
                strtolower($checkSH['subholding_subname']) == 'sh3a' || 
                strtolower($checkSH['subholding_subname']) == 'sh3b' || 
                strtolower($checkSH['subholding_subname']) == 'century21') {
            $dao = new Hrd_Models_Intranet_DinasDaoKp();
        } else {
            $dao = new Hrd_Models_Intranet_DinasDao();
        }
        $obj = new Hrd_Models_Intranet_Dinas();
        $obj->setArrayTable($this->getAppData());
        $data = $this->getAppData();
        $project_id = $this->getAppSession()->getProject()->getId();
        $pt_id = $this->getAppSession()->getPt()->getId();
        $hasil = $dao->getAll($project_id, $pt_id, 'default', $data['configintranet'], $data['limit'], $data['start'], null);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function filterdinasintranetRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'intranetdinas', array(), array());
        $setup = new Hrd_Models_General_Setup();
        
        // edit by wulan sari
        // cek SH karena perlakukannya beda yang sudah implement intranet attndance KP dengan yg belum
        $dao_absent = new Hrd_Models_AbsentDao();
        $checkSH = $dao_absent->checkSH($setup->_project_id);
        
        $obj = new Hrd_Models_Intranet_Dinas();
        $data = $this->getAppData();
        $obj->setArrayTable($this->getAppData());
        $project_id = $this->getAppSession()->getProject()->getId();
        $pt_id = $this->getAppSession()->getPt()->getId();

        // added by Michael 2021.05.19 
        if (array_key_exists("projectptid_opsi",$data) && $data['projectptid_opsi']){

            $projectptid_opsi = $data["projectptid_opsi"];
            $data['projectpt_id'] = $projectptid_opsi;

            $dao_projectpt = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao_projectpt->getProjectPtId($this->getAppSession(), $data);

            $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
            $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

            $data['project_id'] = $projectid_opsi;
            $data['pt_id'] = $ptid_opsi;

            $project_id = $projectid_opsi;
            $pt_id = $ptid_opsi;
            $checkSH = $dao_absent->checkSH($project_id);

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $data['project_id'] = $this->getAppSession()->getProjectId();
            $data['pt_id'] = $this->getAppSession()->getPtid();

            $dao_projectpt = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao_projectpt->getProject_Pt_Id($this->getAppSession(), $data);

            $data['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }

        // end added by Michael 2021.05.19 

        if (strtolower($checkSH['subholding_subname']) == 'sh1a') {
            $dao = new Hrd_Models_Intranet_DinasDaoSh1a();
        } else if (strtolower($checkSH['subholding_subname']) == 'kp' || 
                strtolower($checkSH['subholding_subname']) == 'sh1b' || 
                strtolower($checkSH['subholding_subname']) == 'sh3a' || 
                strtolower($checkSH['subholding_subname']) == 'sh3b' || 
                strtolower($checkSH['subholding_subname']) == 'century21') {
            $dao = new Hrd_Models_Intranet_DinasDaoKp();
        } else {
            $dao = new Hrd_Models_Intranet_DinasDao();
        }
        $hasil = $dao->getAll($project_id, $pt_id, 'filter', $data['configintranet'], $data['limit'], $data['start'], $data['paramdata']);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    // added by Michael 2021.06.15 
    public function getdatasakitintranetRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'intranetsakit', array(), array());
        $setup = new Hrd_Models_General_Setup();
        
        // edit by wulan sari
        // cek SH karena perlakukannya beda yang sudah implement intranet attndance KP dengan yg belum
        $dao_absent = new Hrd_Models_AbsentDao();
        $checkSH = $dao_absent->checkSH($setup->_project_id);
        
        if (strtolower($checkSH['subholding_subname']) == 'sh1a') {
            $dao = new Hrd_Models_Intranet_SakitDaoSh1a();
        } else if (strtolower($checkSH['subholding_subname']) == 'kp' || 
                strtolower($checkSH['subholding_subname']) == 'sh1b' || 
                strtolower($checkSH['subholding_subname']) == 'sh3a' || 
                strtolower($checkSH['subholding_subname']) == 'sh3b' || 
                strtolower($checkSH['subholding_subname']) == 'century21') {
            $dao = new Hrd_Models_Intranet_SakitDaoKp();
        } else {
            $dao = new Hrd_Models_Intranet_SakitDao();
        }
        $obj = new Hrd_Models_Intranet_Sakit();
        $obj->setArrayTable($this->getAppData());
        $data = $this->getAppData();
        $project_id = $this->getAppSession()->getProject()->getId();
        $pt_id = $this->getAppSession()->getPt()->getId();
        $hasil = $dao->getAll($project_id, $pt_id, 'default', $data['configintranet'], $data['limit'], $data['start'], null);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function filtersakitintranetRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'intranetsakit', array(), array());
        $setup = new Hrd_Models_General_Setup();
        
        // edit by wulan sari
        // cek SH karena perlakukannya beda yang sudah implement intranet attndance KP dengan yg belum
        $dao_absent = new Hrd_Models_AbsentDao();
        $checkSH = $dao_absent->checkSH($setup->_project_id);
        
        $obj = new Hrd_Models_Intranet_Sakit();
        $data = $this->getAppData();
        $obj->setArrayTable($this->getAppData());
        $project_id = $this->getAppSession()->getProject()->getId();
        $pt_id = $this->getAppSession()->getPt()->getId();

        // added by Michael 2021.05.19 
        if (array_key_exists("projectptid_opsi",$data) && $data['projectptid_opsi']){

            $projectptid_opsi = $data["projectptid_opsi"];
            $data['projectpt_id'] = $projectptid_opsi;

            $dao_projectpt = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao_projectpt->getProjectPtId($this->getAppSession(), $data);

            $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
            $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

            $data['project_id'] = $projectid_opsi;
            $data['pt_id'] = $ptid_opsi;

            $project_id = $projectid_opsi;
            $pt_id = $ptid_opsi;
            $checkSH = $dao_absent->checkSH($project_id);

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $data['project_id'] = $this->getAppSession()->getProjectId();
            $data['pt_id'] = $this->getAppSession()->getPtid();

            $dao_projectpt = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao_projectpt->getProject_Pt_Id($this->getAppSession(), $data);

            $data['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }

        // end added by Michael 2021.05.19 

        if (strtolower($checkSH['subholding_subname']) == 'sh1a') {
            $dao = new Hrd_Models_Intranet_SakitDaoSh1a();
        } else if (strtolower($checkSH['subholding_subname']) == 'kp' || 
                strtolower($checkSH['subholding_subname']) == 'sh1b' || 
                strtolower($checkSH['subholding_subname']) == 'sh3a' || 
                strtolower($checkSH['subholding_subname']) == 'sh3b' || 
                strtolower($checkSH['subholding_subname']) == 'century21') {
            $dao = new Hrd_Models_Intranet_SakitDaoKp();
        } else {
            $dao = new Hrd_Models_Intranet_SakitDao();
        }

        $hasil = $dao->getAll($project_id, $pt_id, 'filter', $data['configintranet'], $data['limit'], $data['start'], $data['paramdata']);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    // end added by Michael 2021.06.15 

    public function employeeprojectptRead() {

        // added by Michael 2021.05.19 
        $data = $this->getAppData();
        if (array_key_exists("projectptid_opsi",$data) && $data['projectptid_opsi']){

            $projectptid_opsi = $data["projectptid_opsi"];
            $data['projectpt_id'] = $projectptid_opsi;

            $dao = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao->getProjectPtId($this->getAppSession(), $data);

            $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
            $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

            $data['project_id'] = $projectid_opsi;
            $data['pt_id'] = $ptid_opsi;

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $data['project_id'] = $this->getAppSession()->getProjectId();
            $data['pt_id'] = $this->getAppSession()->getPtid();

            $dao = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao->getProject_Pt_Id($this->getAppSession(), $data);

            $data['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }
        // end added by Michael 2021.05.19 

        $obj = new Hrd_Models_App_Mastertable_Employee();
        // $data = $obj->prosesDataWithSession($this->getAppSession(), TRUE);
        $data = $obj->prosesDataWithoutSession($this->getAppSession(), TRUE, $data);
        return Box_Tools::instantRead(array("HASIL" => 1,), array($data));
    }

    public function positionRead() {

        // added by Michael 2021.05.19 
        $data = $this->getAppData();
        if (array_key_exists("projectptid_opsi",$data) && $data['projectptid_opsi']){

            $projectptid_opsi = $data["projectptid_opsi"];
            $data['projectpt_id'] = $projectptid_opsi;

            $dao = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao->getProjectPtId($this->getAppSession(), $data);

            $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
            $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

            $data['project_id'] = $projectid_opsi;
            $data['pt_id'] = $ptid_opsi;

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $data['project_id'] = $this->getAppSession()->getProjectId();
            $data['pt_id'] = $this->getAppSession()->getPtid();

            $dao = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao->getProject_Pt_Id($this->getAppSession(), $data);

            $data['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }
        // end added by Michael 2021.05.19 

        $obj = new Hrd_Models_App_Mastertable_Position();
        // $data = $obj->prosesDataWithSession($this->getAppSession(), TRUE);
        $data = $obj->prosesDataWithoutSession($this->getAppSession(), TRUE, $data);
        return Box_Tools::instantRead(array("HASIL" => 1,), array($data));
    }

    public function cutidetailintranetRead() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $data = $this->getAppData();
        $param = Zend_Json::decode($data['paramdata']);
        $obj = new Hrd_Models_Intranet_Cuti();
        $setup = new Hrd_Models_General_Setup();
        
        // edit by wulan sari
        // cek SH karena perlakukannya beda yang sudah implement intranet attndance KP dengan yg belum
        $dao_absent = new Hrd_Models_AbsentDao();
        $checkSH = $dao_absent->checkSH($setup->_project_id);
        
        if (strtolower($checkSH['subholding_subname']) == 'sh1a') {
            $dao = new Hrd_Models_Intranet_CutiDaoSh1a();
        } else if (strtolower($checkSH['subholding_subname']) == 'kp' || 
                strtolower($checkSH['subholding_subname']) == 'sh1b' || 
                strtolower($checkSH['subholding_subname']) == 'sh3a' || 
                strtolower($checkSH['subholding_subname']) == 'sh3b' || 
                strtolower($checkSH['subholding_subname']) == 'century21') {
            $dao = new Hrd_Models_Intranet_CutiDaoKp();
        } else {
            $dao = new Hrd_Models_Intranet_CutiDao();
        }
        $user_id = $this->getAppSession()->getUser()->getId();
        $project_id = $this->getAppSession()->getProject()->getId();
        $pt_id = $this->getAppSession()->getPt()->getId();
        $arraydata = array();

        foreach ($param as $rowh) {
            $rowjeniscutiintranet = $dao->changeCuticestointranet($data['configintranet'], $rowh['absenttype_id']);
            $resultdetail = $dao->getCutidetail($rowh['cuti_id'], $data['configintranet']);
            //print_r($rowh);			
            foreach ($resultdetail[1] as $rowd) {
                $employee_id_ces = $rowh['employee_id_ces'];
                $startdate = date("Y-m-d", strtotime($rowd['start_date']));
                $start_use = date("Y", strtotime($rowd['start_date']));
                $enddate = date("Y-m-d", strtotime($rowd['end_date']));
                $dates = $obj->rangeDate($startdate, $enddate);
                $leave_quota = $rowh['leave_quota'];
                $absenttype_id = $rowh['absenttype_id'];
                $absenttypegroup_id = $rowh['absenttypegroup_id'];
                $absenttype_code = $rowh['absenttype_code'];
                $note = $rowh['description'];
                $duration = $rowd['total'];
                $halfday = ($duration == 0.5) ? 1 : 0;
                //$rowleaveentitlement = $dao->getLeaveentitlementsEmployee($employee_id_ces, $start_use);
                //$leaveentitlements_id = $rowleaveentitlement['leaveentitlements_id'];
                //$restold = $rowleaveentitlement['rest'];
                //$restnew = $restold - $duration;
                $rowabsentdetail = $dao->getAbsentdetail_byempstartdate($employee_id_ces, $startdate);
                if (empty($rowabsentdetail)) {
                    $absentdetail_id = 0;
                } else {
                    $absentdetail_id = $rowabsentdetail[0]['absentdetail_id'];
                }

                $record = array(
                    "addby" => $user_id,
                    "project_id" => $project_id,
                    "configintranet" => $data['configintranet'], //for config to file .ini
                    "cuti_id_intranet" => $rowh['cuti_id'], //for update to dbintranet
                    "cutitype_id_intranet" => intval($rowjeniscutiintranet['cutitype_id']), //for update to dbintranet
                    "cutitype_intranet" => $rowjeniscutiintranet['cutitype'], //for update to dbintranet
                    "hrd_check_intranet" => "YES", //for update to dbintranet
                    "hrd_comment_intranet" => trim($rowh['hrd_comment']), //for update to dbintranet
                    "pt_id" => $pt_id,
                    "absentdetail_id" => $absentdetail_id,
                    "employee_employee_id" => $employee_id_ces,
                    "start_date" => $startdate,
                    "end_date" => $enddate,
                    "dates" => $dates,
                    "leave_quota" => $leave_quota,
                    "absenttype_absenttype_id" => $absenttype_id,
                    "note" => $note,
                    "duration" => $duration,
                    "is_halfday" => $halfday,
                    "absenttypegroup_absenttypegroup_id" => $absenttypegroup_id,
                    "absenttype_code" => $absenttype_code,
                        //   "leaveentitlements_id" => $leaveentitlements_id,
                        //   "rest" => $restnew,

                    //added by michael 16/11/2021
                    "attachment" => $rowh['attachment'],
                    //end added by michael 16/11/2021
                );
                $arraydata[] = $record;
            }
        }
        return Box_Tools::instantRead(array("HASIL" => 1,), array($arraydata));
    }

    public function updatestatuscutiintranet($config, $cuti_id_intranet, $cutitype_id, $hrd_check, $hrd_comment) {
        $setup = new Hrd_Models_General_Setup();
        
        // edit by wulan sari
        // cek SH karena perlakukannya beda yang sudah implement intranet attndance KP dengan yg belum
        $dao_absent = new Hrd_Models_AbsentDao();
        $checkSH = $dao_absent->checkSH($setup->_project_id);
        
        if (strtolower($checkSH['subholding_subname']) == 'sh1a') {
            $dao = new Hrd_Models_Intranet_CutiDaoSh1a();
        } else if (strtolower($checkSH['subholding_subname']) == 'kp' || 
                strtolower($checkSH['subholding_subname']) == 'sh1b' || 
                strtolower($checkSH['subholding_subname']) == 'sh3a' || 
                strtolower($checkSH['subholding_subname']) == 'sh3b' || 
                strtolower($checkSH['subholding_subname']) == 'century21') {
            $dao = new Hrd_Models_Intranet_CutiDaoKp();
        } else {
            $dao = new Hrd_Models_Intranet_CutiDao();
        }
        // $dao->updateStatusCutiIntranet($config, $cuti_id_intranet,$cutitype_id,$hrd_check, $hrd_comment);
        $dao->updateStatusCutiIntranet($config, $cuti_id_intranet, $hrd_check);
    }

    public function updatestatusijinintranet($config, $id, $hrd_comment) {
        $setup = new Hrd_Models_General_Setup();
        
        // edit by wulan sari
        // cek SH karena perlakukannya beda yang sudah implement intranet attndance KP dengan yg belum
        $dao_absent = new Hrd_Models_AbsentDao();
        $checkSH = $dao_absent->checkSH($setup->_project_id);
        
        if (strtolower($checkSH['subholding_subname']) == 'sh1a') {
            $dao = new Hrd_Models_Intranet_IjinDaoSh1a();
        } else if (strtolower($checkSH['subholding_subname']) == 'kp' || 
                strtolower($checkSH['subholding_subname']) == 'sh1b' || 
                strtolower($checkSH['subholding_subname']) == 'sh3a' || 
                strtolower($checkSH['subholding_subname']) == 'sh3b' || 
                strtolower($checkSH['subholding_subname']) == 'century21') {
            $dao = new Hrd_Models_Intranet_IjinDaoKp();
        } else {
            $dao = new Hrd_Models_Intranet_IjinDao();
        }
        $dao->updateStatusIntranet($config, $id, "YES", $hrd_comment);
    }

    public function updatestatusdinasintranet($config, $id, $hrd_comment) {
        $setup = new Hrd_Models_General_Setup();
        
        // edit by wulan sari
        // cek SH karena perlakukannya beda yang sudah implement intranet attndance KP dengan yg belum
        $dao_absent = new Hrd_Models_AbsentDao();
        $checkSH = $dao_absent->checkSH($setup->_project_id);
        
        if (strtolower($checkSH['subholding_subname']) == 'sh1a') {
            $dao = new Hrd_Models_Intranet_DinasDaoSh1a();
        } else if (strtolower($checkSH['subholding_subname']) == 'kp' || 
                strtolower($checkSH['subholding_subname']) == 'sh1b' || 
                strtolower($checkSH['subholding_subname']) == 'sh3a' || 
                strtolower($checkSH['subholding_subname']) == 'sh3b' || 
                strtolower($checkSH['subholding_subname']) == 'century21') {
            $dao = new Hrd_Models_Intranet_DinasDaoKp();
        } else {
            $dao = new Hrd_Models_Intranet_DinasDao();
        }
        $dao->updateStatusIntranet($config, $id, "YES", $hrd_comment);
    }

    // added by Michael 2021.06.15 
    public function updatestatussakitintranet($config, $id, $hrd_comment) {
        $setup = new Hrd_Models_General_Setup();
        
        // edit by wulan sari
        // cek SH karena perlakukannya beda yang sudah implement intranet attndance KP dengan yg belum
        $dao_absent = new Hrd_Models_AbsentDao();
        $checkSH = $dao_absent->checkSH($setup->_project_id);
        
        if (strtolower($checkSH['subholding_subname']) == 'sh1a') {
            $dao = new Hrd_Models_Intranet_SakitDaoSh1a();
        } else if (strtolower($checkSH['subholding_subname']) == 'kp' || 
                strtolower($checkSH['subholding_subname']) == 'sh1b' || 
                strtolower($checkSH['subholding_subname']) == 'sh3a' || 
                strtolower($checkSH['subholding_subname']) == 'sh3b' || 
                strtolower($checkSH['subholding_subname']) == 'century21') {
            $dao = new Hrd_Models_Intranet_SakitDaoKp();
        } else {
            $dao = new Hrd_Models_Intranet_SakitDao();
        }
        $dao->updateStatusIntranet($config, $id, "YES", $hrd_comment);
    }
    // end added by Michael 2021.06.15 

    public function updatecutiintranetinchangeRead() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $setup = new Hrd_Models_General_Setup();
        
        // edit by wulan sari
        // cek SH karena perlakukannya beda yang sudah implement intranet attndance KP dengan yg belum
        $dao_absent = new Hrd_Models_AbsentDao();
        $checkSH = $dao_absent->checkSH($setup->_project_id);
        
        if (strtolower($checkSH['subholding_subname']) == 'sh1a') {
            $dao = new Hrd_Models_Intranet_CutiDaoSh1a();
        } else if (strtolower($checkSH['subholding_subname']) == 'kp' || 
                strtolower($checkSH['subholding_subname']) == 'sh1b' || 
                strtolower($checkSH['subholding_subname']) == 'sh3a' || 
                strtolower($checkSH['subholding_subname']) == 'sh3b' || 
                strtolower($checkSH['subholding_subname']) == 'century21') {
            $dao = new Hrd_Models_Intranet_CutiDaoKp();
        } else {
            $dao = new Hrd_Models_Intranet_CutiDao();
        }
        $data = $this->getAppData();
        $param = Zend_Json::decode($data['paramdata']);
        $configintranet = $data['configintranet'];
        $dao->Sendemail($configintranet, $param);
        return Box_Tools::instantRead(array("HASIL" => 1,), array());
    }

    public function updateijinintranetinchangeRead() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $setup = new Hrd_Models_General_Setup();
        
        // edit by wulan sari
        // cek SH karena perlakukannya beda yang sudah implement intranet attndance KP dengan yg belum
        $dao_absent = new Hrd_Models_AbsentDao();
        $checkSH = $dao_absent->checkSH($setup->_project_id);
        
        if (strtolower($checkSH['subholding_subname']) == 'sh1a') {
            $dao = new Hrd_Models_Intranet_IjinDaoSh1a();
        } else if (strtolower($checkSH['subholding_subname']) == 'kp' || 
                strtolower($checkSH['subholding_subname']) == 'sh1b' || 
                strtolower($checkSH['subholding_subname']) == 'sh3a' || 
                strtolower($checkSH['subholding_subname']) == 'sh3b' || 
                strtolower($checkSH['subholding_subname']) == 'century21') {
            $dao = new Hrd_Models_Intranet_IjinDaoKp();
        } else {
            $dao = new Hrd_Models_Intranet_IjinDao();
        }
        $data = $this->getAppData();
        $param = Zend_Json::decode($data['paramdata']);
        $configintranet = $data['configintranet'];
        $dao->Sendemail($configintranet, $param);
        return Box_Tools::instantRead(array("HASIL" => 1,), array());
    }

    public function updatedinasintranetinchangeRead() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $setup = new Hrd_Models_General_Setup();
        
        // edit by wulan sari
        // cek SH karena perlakukannya beda yang sudah implement intranet attndance KP dengan yg belum
        $dao_absent = new Hrd_Models_AbsentDao();
        $checkSH = $dao_absent->checkSH($setup->_project_id);
        
        if (strtolower($checkSH['subholding_subname']) == 'sh1a') {
            $dao = new Hrd_Models_Intranet_DinasDaoSh1a();
        } else if (strtolower($checkSH['subholding_subname']) == 'kp' || 
                strtolower($checkSH['subholding_subname']) == 'sh1b' || 
                strtolower($checkSH['subholding_subname']) == 'sh3a' || 
                strtolower($checkSH['subholding_subname']) == 'sh3b' || 
                strtolower($checkSH['subholding_subname']) == 'century21') {
            $dao = new Hrd_Models_Intranet_DinasDaoKp();
        } else {
            $dao = new Hrd_Models_Intranet_DinasDao();
        }
        $data = $this->getAppData();
        $param = Zend_Json::decode($data['paramdata']);
        $configintranet = $data['configintranet'];
        $dao->Sendemail($configintranet, $param);
        return Box_Tools::instantRead(array("HASIL" => 1,), array());
    }

    /* end added by ahmad riadi 06-04-2017 */

    // added by Michael 2021.06.15 
    public function updatesakitintranetinchangeRead() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $setup = new Hrd_Models_General_Setup();
        
        // edit by wulan sari
        // cek SH karena perlakukannya beda yang sudah implement intranet attndance KP dengan yg belum
        $dao_absent = new Hrd_Models_AbsentDao();
        $checkSH = $dao_absent->checkSH($setup->_project_id);
        
        if (strtolower($checkSH['subholding_subname']) == 'sh1a') {
            $dao = new Hrd_Models_Intranet_SakitDaoSh1a();
        } else if (strtolower($checkSH['subholding_subname']) == 'kp' || 
                strtolower($checkSH['subholding_subname']) == 'sh1b' || 
                strtolower($checkSH['subholding_subname']) == 'sh3a' || 
                strtolower($checkSH['subholding_subname']) == 'sh3b' || 
                strtolower($checkSH['subholding_subname']) == 'century21') {
            $dao = new Hrd_Models_Intranet_SakitDaoKp();
        } else {
            $dao = new Hrd_Models_Intranet_SakitDao();
        }
        $data = $this->getAppData();
        $param = Zend_Json::decode($data['paramdata']);
        $configintranet = $data['configintranet'];
        $dao->Sendemail($configintranet, $param);
        return Box_Tools::instantRead(array("HASIL" => 1,), array());
    }
    // added by Michael 2021.06.15 

    /* start added by ahmad riadi 02-06-2017 */

    public function updatetimebyTLK($rowdatapost, $data) {
        $setup = new Hrd_Models_General_Setup();
        // edit by wulan sari
        // cek SH karena perlakukannya beda yang sudah implement intranet attndance KP dengan yg belum
        $dao_absent = new Hrd_Models_AbsentDao();

        // $checkSH = $dao_absent->checkSH($setup->_project_id);
        
        // added by Michael 2021.05.19
        $checkSH = $dao_absent->checkSH($data['project_id']);
        // added by Michael 2021.05.19
        
        $absentDetail = new Hrd_Models_Master_General_Date();

        if (isset($data['transaction'])) {
            if ($data['transaction'] == 'pdlk') {
                $dao = new Hrd_Models_Intranet_PdlkDao();
            } else {
                $setup = new Hrd_Models_General_Setup();
                if (strtolower($checkSH['subholding_subname']) == 'sh1a') {
                    $dao = new Hrd_Models_Intranet_DinasDaoSh1a();
                } else if (strtolower($checkSH['subholding_subname']) == 'kp' || 
                        strtolower($checkSH['subholding_subname']) == 'sh1b' || 
                        strtolower($checkSH['subholding_subname']) == 'sh3a' || 
                        strtolower($checkSH['subholding_subname']) == 'sh3b' || 
                        strtolower($checkSH['subholding_subname']) == 'century21') {
                    $dao = new Hrd_Models_Intranet_DinasDaoKp();
                } else {
                    $dao = new Hrd_Models_Intranet_DinasDao();
                }
            }
        } else {
            $setup = new Hrd_Models_General_Setup();
            if (strtolower($checkSH['subholding_subname']) == 'sh1a') {
                $dao = new Hrd_Models_Intranet_DinasDaoSh1a();
            } else if (strtolower($checkSH['subholding_subname']) == 'kp' || 
                    strtolower($checkSH['subholding_subname']) == 'sh1b' || 
                    strtolower($checkSH['subholding_subname']) == 'sh3a' || 
                    strtolower($checkSH['subholding_subname']) == 'sh3b' || 
                    strtolower($checkSH['subholding_subname']) == 'century21') {
                $dao = new Hrd_Models_Intranet_DinasDaoKp();
            } else {
                $dao = new Hrd_Models_Intranet_DinasDao();
            }
        }
        $dao_absent = new Hrd_Models_AbsentDao();
        $absentHeader = new Hrd_Models_Absent();

        // $mp = new Hrd_Models_Absent_MasterProcess($this->getAppSession());

        // added by Michael 2021.05.19
        $mp = new Hrd_Models_Absent_MasterProcess($this->getAppSession(),$data);
        // end added by Michael 2021.05.19

        $ar_absendetail = explode('~', $rowdatapost['absentdetail_id']);
        if (count($ar_absendetail) > 0) {
            $index = 0;
            $ar_day = explode('~', $rowdatapost['day']);
            $ar_in_7_14 = explode('~', $rowdatapost['in_7_14']);
            $ar_out_7_14 = explode('~', $rowdatapost['out_7_14']);
            $ar_in_15_21 = explode('~', $rowdatapost['in_15_21']);
            $ar_out_15_21 = explode('~', $rowdatapost['out_15_21']);
            $ar_in_22_6 = explode('~', $rowdatapost['in_22_6']);
            $ar_out_22_6 = explode('~', $rowdatapost['out_22_6']);
            $ar_shifttype_id = explode('~', $rowdatapost['shifttype_shifttype_id']);
            $ar_parametertlk_id = explode('~', $rowdatapost['parametertlk_parametertlk_id']);
            $ar_description = explode('~', $rowdatapost['description']);
            $ar_date = explode('~', $rowdatapost['date']);
            $ar_tlk_other = explode('~', $rowdatapost['tlk_other']);
            $ar_tlk_project_type = explode('~', $rowdatapost['tlk_project_type']);
            $ar_time_in = explode('~', $rowdatapost['time_in']);
            $ar_time_out = explode('~', $rowdatapost['time_out']);

            foreach ($ar_absendetail as $rowabdetail) {
                $absentdetail_id = $rowabdetail;
                $day = $ar_day[$index];
                $in_7_14 = $ar_in_7_14[$index];
                $out_7_14 = $ar_out_7_14[$index];
                $in_15_21 = $ar_in_15_21[$index];
                $out_15_21 = $ar_out_15_21[$index];
                $in_22_6 = $ar_in_22_6[$index];
                $out_22_6 = $ar_out_22_6[$index];
                $shifttype_id = $ar_shifttype_id[$index];
                $parametertlk_id = $ar_parametertlk_id[$index];
                
                if (isset($data['transaction'])) {
                    if ($data['transaction'] == 'pdlk') {
                        $description = $data['description'];
                    } else {
                        $description = $ar_description[$index];
                    }
                } else {
                    $description = $ar_description[$index];
                }


                $date = $ar_date[$index];
                $year = date('Y', strtotime($ar_date[$index]));
                $month = date('m', strtotime($ar_date[$index]));
                $tlk_other = $ar_tlk_other[$index];
                $tlk_project_type = $ar_tlk_project_type[$index];
                $time_in = $ar_time_in[$index];
                $time_out = $ar_time_out[$index];


                $rowabsentdetail = $dao->getAbsentdetail_byid($absentdetail_id);
                $rowshift = $dao->getshift_byid($shifttype_id);

                $arraydata = array(
                    "absentdetail_id" => $absentdetail_id,
                    "shifttype_shifttype_id" => $shifttype_id,
                    "description" => $description,
                    "employee_id" => $data['employee_id_ces'],
                    "month" => $month,
                    "year" => $year,
                    "day" => $day,
                    "time_in" => $time_in,
                    "time_out" => $time_out,
                );
                
                /* bugs karena !== '' tidak bisa memfilter data kosong, harus dengan !empty() */
                /*

                  $flag_time_in = 0;
                  $flag_time_out = 0;
                  if ($rowshift['in_time'] >= '07:00:00' && $rowshift['in_time'] <= '15:00:00') {
                  if ($rowabsentdetail['in_7_14'] !== '' && $rowabsentdetail['in_7_14'] !== '00:00:00') {
                  $arraydata['time_in'] = $rowabsentdetail['in_7_14'];
                  $flag_time_in = 1;
                  }

                  }

                  if ($rowshift['out_time'] >= '07:00:00' && $rowshift['out_time'] <= '15:00:00') {
                  if ($rowabsentdetail['out_7_14'] !== '' && $rowabsentdetail['out_7_14'] !== '00:00:00') {
                  $arraydata['time_out'] = $rowabsentdetail['out_7_14'];
                  $flag_time_out = 1;
                  }
                  }


                  if ($rowshift['in_time'] >= '15:00:00' && $rowshift['in_time'] <= '21:00:00') {
                  if ($rowabsentdetail['in_15_21'] !== '' && $rowabsentdetail['in_15_21'] !== '00:00:00') {
                  $arraydata['time_in'] = $rowabsentdetail['in_15_21'];
                  $flag_time_in = 1;
                  }
                  }

                  if ($rowshift['out_time'] >= '15:00:00' && $rowshift['out_time'] <= '21:00:00') {
                  if ($rowabsentdetail['out_15_21'] !== '' && $rowabsentdetail['out_15_21'] !== '00:00:00') {
                  $arraydata['time_out'] = $rowabsentdetail['out_15_21'];
                  $flag_time_out = 1;
                  }
                  }


                  if ($rowshift['in_time'] >= '22:00:00' && $rowshift['in_time'] <= '06:00:00') {
                  if ($rowabsentdetail['in_22_6'] !== '' && $rowabsentdetail['in_22_6'] !== '00:00:00') {
                  $arraydata['time_in'] = $rowabsentdetail['in_22_6'];
                  $flag_time_in = 1;
                  }
                  }

                  if ($rowshift['out_time'] >= '22:00:00' && $rowshift['out_time'] <= '06:00:00') {
                  if ($rowabsentdetail['out_22_6'] !== '' && $rowabsentdetail['out_22_6'] !== '00:00:00') {
                  $arraydata['time_out'] = $rowabsentdetail['out_22_6'];
                  $flag_time_out = 1;
                  }
                  }
                 */

                //tgl 23 maret 2020 ada request dari HC utk shift WFH ambil jam TLK
                if($rowshift['code'] == 'WFH'){
                    $arraydata['in_7_14'] = NULL;
                    $arraydata['out_7_14'] = NULL;
                    $arraydata['in_15_21'] = NULL;
                    $arraydata['out_15_21'] = NULL;
                    $arraydata['in_22_6'] = NULL;
                    $arraydata['out_22_6'] = NULL;
                    
                    if ($time_in >= '07:00:00' && $time_in < '15:00:00') {
                        $arraydata['in_7_14'] = $time_in;
                    }
                    
                    if ($time_out >= '07:00:00' && $time_out < '15:00:00') {
                        $arraydata['out_7_14'] = $time_out;
                    }
                    
                    if ($time_in >= '15:00:00' && $time_in < '22:00:00') {
                        $arraydata['in_15_21'] = $time_in;
                    }
                    
                    if ($time_out >= '15:00:00' && $time_out < '22:00:00') {
                        $arraydata['out_15_21'] = $time_out;
                    }
                    
                    if ($time_in >= '22:00:00' && $time_in < '07:00:00') {
                        $arraydata['in_22_6'] = $time_in;
                    }
                    
                    if ($time_out >= '22:00:00' && $time_out < '07:00:00') {
                        $arraydata['out_22_6'] = $time_out;
                    }
                    
                } else if($rowshift['is_flexi'] == '1'){
                    
                    //tgl 26 okt 2020 updated, karena ada request dari HC SH3A (Pak Christian)  : 
                    //jadi yg pak chris kesimpulannya : untuk jam masuk ambil yg plg pagi (antara jam tlk/jam fingerprint) , sedangkan jam pulang ambil paling lama (antara jam tlk/jam fingerprint) untuk shift NFlexi
                    $start_tlk = strtotime(date('H:i:s', strtotime($time_in)));
                    $end_tlk = strtotime(date('H:i:s', strtotime($time_out)));                                        
                    $start_shift = strtotime($rowshift['in_time']);
                    $end_shift = strtotime($rowshift['out_time']);
                    
                    if($start_shift < $start_tlk){
                        $time_in = $rowshift['in_time'];
                    }

                    if($end_shift > $end_tlk){
                        $time_out = $rowshift['out_time'];
                    }

                    $arraydata['in_7_14'] = NULL;
                    $arraydata['out_7_14'] = NULL;
                    $arraydata['in_15_21'] = NULL;
                    $arraydata['out_15_21'] = NULL;
                    $arraydata['in_22_6'] = NULL;
                    $arraydata['out_22_6'] = NULL;
                    
                    if ($time_in >= '07:00:00' && $time_in < '15:00:00') {
                        $arraydata['in_7_14'] = $time_in;
                    }
                    
                    if ($time_out >= '07:00:00' && $time_out < '15:00:00') {
                        $arraydata['out_7_14'] = $time_out;
                    }
                    
                    if ($time_in >= '15:00:00' && $time_in < '22:00:00') {
                        $arraydata['in_15_21'] = $time_in;
                    }
                    
                    if ($time_out >= '15:00:00' && $time_out < '22:00:00') {
                        $arraydata['out_15_21'] = $time_out;
                    }
                    
                    if ($time_in >= '22:00:00' && $time_in < '07:00:00') {
                        $arraydata['in_22_6'] = $time_in;
                    }
                    
                    if ($time_out >= '22:00:00' && $time_out < '07:00:00') {
                        $arraydata['out_22_6'] = $time_out;
                    }
                    
                    
                } else {
                    
                    /* update by ahmad riadi 14-06-2017 */

                    $flag_time_in = 0;
                    $flag_time_out = 0;
                    //if ($rowshift['in_time'] >= '07:00:00' && $rowshift['in_time'] <= '15:00:00') {
                    if ($rowshift['in_time'] >= '07:00:00' && $rowshift['in_time'] < '15:00:00') {
                        if (!empty($rowabsentdetail['in_7_14']) && $rowabsentdetail['in_7_14'] !== '00:00:00') {
                            $arraydata['time_in'] = $rowabsentdetail['in_7_14'];
                            $flag_time_in = 1;
                        }
                    }

                    //if ($rowshift['out_time'] >= '07:00:00' && $rowshift['out_time'] <= '15:00:00') {
                    if ($rowshift['out_time'] >= '07:00:00' && $rowshift['out_time'] < '15:00:00') {
                        if (!empty($rowabsentdetail['out_7_14']) && $rowabsentdetail['out_7_14'] !== '00:00:00') {
                            $arraydata['time_out'] = $rowabsentdetail['out_7_14'];
                            $flag_time_out = 1;
                        }
                    }

                    //if ($rowshift['in_time'] >= '15:00:00' && $rowshift['in_time'] <= '21:00:00') {
                    if ($rowshift['in_time'] >= '15:00:00' && $rowshift['in_time'] < '22:00:00') {
                        if (!empty($rowabsentdetail['in_15_21']) && $rowabsentdetail['in_15_21'] !== '00:00:00') {
                            $arraydata['time_in'] = $rowabsentdetail['in_15_21'];
                            $flag_time_in = 1;
                        }
                    }

                    //if ($rowshift['out_time'] >= '15:00:00' && $rowshift['out_time'] <= '21:00:00') {
                    if ($rowshift['out_time'] >= '15:00:00' && $rowshift['out_time'] < '22:00:00') {
                        if (!empty($rowabsentdetail['out_15_21']) && $rowabsentdetail['out_15_21'] !== '00:00:00') {
                            $arraydata['time_out'] = $rowabsentdetail['out_15_21'];
                            $flag_time_out = 1;
                        }
                    }

                    //if ($rowshift['in_time'] >= '22:00:00' && $rowshift['in_time'] <= '06:00:00') {
                    if ($rowshift['in_time'] >= '22:00:00' && $rowshift['in_time'] < '07:00:00') {
                        if (!empty($rowabsentdetail['in_22_6']) && $rowabsentdetail['in_22_6'] !== '00:00:00') {
                            $arraydata['time_in'] = $rowabsentdetail['in_22_6'];
                            $flag_time_in = 1;
                        }
                    }

                    //if ($rowshift['out_time'] >= '22:00:00' && $rowshift['out_time'] <= '06:00:00') {
                    if ($rowshift['out_time'] >= '22:00:00' && $rowshift['out_time'] < '07:00:00') {
                        if (!empty($rowabsentdetail['out_22_6']) && $rowabsentdetail['out_22_6'] !== '00:00:00') {
                            $arraydata['time_out'] = $rowabsentdetail['out_22_6'];
                            $flag_time_out = 1;
                        }
                    }

                    if ($arraydata['time_in'] == $rowshift['in_time'] && $arraydata['time_out'] == $rowshift['out_time']) {
                        /* apabila jam in dan out sama dengan jam di shift karyawan
                         * maka tidak usah cek kondisi untuk tlk,
                         * input sesuai jam karyawan
                         */
                        $flag_time_in = 0;
                        $flag_time_out = 0;
                    }

                    /* kebutuhan untuk simulasi data
                      $flag_time_in = 0; //di rubah sesuai kebutuhan
                      $flag_time_out = 1; //di rubah sesuai kebutuhan
                      $arraydata['time_in'] = '08:50:00'; //di rubah sesuai kebutuhan
                      $arraydata['time_out'] = '13:00:00'; //di rubah sesuai kebutuhan
                     */


                    if ($flag_time_in > 0 || $flag_time_out > 0) {
                        $datetime_shift_in = date('Y-m-d H:i:s', strtotime($date . ' ' . $rowshift['in_time']));
                        $datetime_shift_out = date('Y-m-d H:i:s', strtotime($date . ' ' . $rowshift['out_time']));
                        $date_time_in = date('Y-m-d H:i:s', strtotime($date . ' ' . $arraydata['time_in']));
                        $date_time_out = date('Y-m-d H:i:s', strtotime($date . ' ' . $arraydata['time_out']));


                        if ($flag_time_in == 1 && $flag_time_out == 0) {
                            $start_filter_time = date('Y-m-d H:i:s', strtotime("-4 hours", strtotime($datetime_shift_in)));
                            $end_filter_time = date('Y-m-d H:i:s', strtotime("+2 hours", strtotime($datetime_shift_in)));
                            if ($date_time_in >= $start_filter_time && $date_time_in <= $end_filter_time) {
                                /*
                                 * di dalam kondisi ini apabila time in masuk dalam filter maka
                                 * time in tidak di replace dengan default shift karyawan
                                 */
                                $arraydata['time_in'] = date('H:i:s', strtotime($date_time_in));
                            } else {
                                /*
                                 * di dalam kondisi ini apabila time in tidak masuk dalam filter maka
                                 * time in  di replace dengan default shift karyawan
                                 */
                                $arraydata['time_in'] = date('H:i:s', strtotime($datetime_shift_in));
                            }
                        }

                        if ($flag_time_in == 0 && $flag_time_out == 1) {
                            $start_filter_time = date('Y-m-d H:i:s', strtotime("-2 hours", strtotime($datetime_shift_out)));
                            $end_filter_time = date('Y-m-d H:i:s', strtotime("+4 hours", strtotime($datetime_shift_out)));


                            if ($date_time_out >= $start_filter_time && $date_time_out <= $end_filter_time) {
                                /*
                                 * di dalam kondisi ini apabila time out masuk dalam filter maka
                                 * time out tidak di replace dengan default shift karyawan
                                 */
                                $arraydata['time_out'] = date('H:i:s', strtotime($date_time_out));
                            } else {
                                /*
                                 * di dalam kondisi ini apabila time out tidak masuk dalam filter maka
                                 * time out  di replace dengan default shift karyawan
                                 */
                                $arraydata['time_out'] = date('H:i:s', strtotime($datetime_shift_out));
                            }
                        }
                    }
                    
                    
                }
                
                $user_id = $this->getAppSession()->getUser()->getId();
                $absentDetail->setArrayTable($arraydata);

                // $absentHeader->setProject($this->getAppSession()->getProject());
                // $absentHeader->setPt($this->getAppSession()->getPt());

                // added by Michael 2021.05.19
                $project = new Box_Models_Master_Project();
                $project->setId($data['project_id']);

                $pt = new Box_Models_Master_Pt();
                $pt->setId($data['pt_id']);

                $absentHeader->setProject($project);
                $absentHeader->setPt($pt);
                // end added by Michael 2021.05.19

                $absentHeader->setMonth($arraydata["month"]);
                $absentHeader->setYear($arraydata["year"]);
                $absentHeader->getEmployee()->setId($arraydata["employee_id"]);
                $absentDetail->setAddBy($user_id);                
                $mp->process($absentDetail);
                
                if($rowshift['code'] == 'WFH'){
                    $absentDetail->setTotalAttendance(1);
                }
                
                $dao->Updatetlkbyintranet($absentDetail, $absentdetail_id, $parametertlk_id, $tlk_other, $tlk_project_type);
                $index++;
            }
        }
    }

    /* end added by ahmad riadi 02-06-2017 */

    //added by michael 16/12/2021
    public function getdatareminderabsensiRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'reminderabsensi', array(), array());
        $dao = new Hrd_Models_Absent_ReminderabsensiDao();
        $obj = new Hrd_Models_Absent_Reminderabsensi();
        $postdata = $this->getAppData();

        if (array_key_exists("projectptid_opsi",$postdata) && $postdata['projectptid_opsi']){

            $projectptid_opsi = $postdata["projectptid_opsi"];
            $postdata['projectpt_id'] = $projectptid_opsi;

            $dao_postdata = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao_postdata->getProjectPtId($this->getAppSession(), $postdata);

            $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
            $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

            $postdata['project_id'] = $projectid_opsi;
            $postdata['pt_id'] = $ptid_opsi;

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $postdata['project_id'] = $this->getAppSession()->getProjectId();
            $postdata['pt_id'] = $this->getAppSession()->getPtid();

            $dao_postdata = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao_postdata->getProject_Pt_Id($this->getAppSession(), $postdata);

            $projectid_opsi = $postdata['project_id'];
            $ptid_opsi = $postdata['pt_id'];
            $postdata['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }

        $obj->setArrayTable($postdata);

        $hasil = $dao->getAll($this->getAppRequest(), $obj, $postdata);

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function sendemailreminderRead() {

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'reminderabsensi', array(), array());
        $dao = new Hrd_Models_Absent_ReminderabsensiDao();
        $obj = new Hrd_Models_Absent_Reminderabsensi();

        $postdata = $this->getAppData();

        if (array_key_exists("projectptid_opsi",$postdata) && $postdata['projectptid_opsi']){

            $projectptid_opsi = $postdata["projectptid_opsi"];
            $postdata['projectpt_id'] = $projectptid_opsi;

            $dao_postdata = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao_postdata->getProjectPtId($this->getAppSession(), $postdata);

            $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
            $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

            $postdata['project_id'] = $projectid_opsi;
            $postdata['pt_id'] = $ptid_opsi;

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $postdata['project_id'] = $this->getAppSession()->getProjectId();
            $postdata['pt_id'] = $this->getAppSession()->getPtid();

            $dao_postdata = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao_postdata->getProject_Pt_Id($this->getAppSession(), $postdata);

            $projectid_opsi = $postdata['project_id'];
            $ptid_opsi = $postdata['pt_id'];
            $postdata['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }
        
        $obj->setArrayTable($postdata);

        if (isset($postdata['paramdata'])) {
            $parampost = Zend_Json::decode($postdata['paramdata']);
        }

        $employee = '';

        if($parampost){
            foreach($parampost as $key => $item){
                $employee[$item['employee_id']][] = $item;
            }
        }

        $suksesCount = 0;
        $msgErrmail = array();
        $msg = '';

        if($employee){
            foreach($employee as $key => $item){
                if(isset($item[0]['email_ciputra'])){
                    try {
                        
                        $message = '<html><body>';
                        $message .= '<p>Dear Bapak/Ibu,</p>';                    
                        $message .= "<p>Berikut ini ada beberapa tanggal absensi Bapak/Ibu yang kosong/tidak lengkap.<br>Mohon bantuan Bapak/Ibu untuk memeriksa kembali dan melengkapi apabila ada absen yang masih belum ada Jam masuk/Jam pulang.</p>";
                        $message .= "<table style='width:100%;'>";
                        $message .= "<tr style='background: #e1e1e1;'>";
                        $message .= "<th style='border:1px solid; width: 250px;'>Nama</th>";
                        $message .= "<th style='border:1px solid;'>Tanggal</th>";
                        $message .= "<th style='border:1px solid;'>Shift</th>";
                        $message .= "<th style='border:1px solid;'>Jam Masuk</th>";
                        $message .= "<th style='border:1px solid;'>Jam Pulang</th>";
                        $message .= "</tr>";
                        
                        foreach($item as $key_item => $item_item){
                            $message .= "<tr>";
                            $message .= "<td style='text-align:center;border:1px solid;'>".$item_item['employee_name']."</td>";
                            $message .= "<td style='text-align:center;border:1px solid;'>".date('d/m/Y', strtotime($item_item['date']))."</td>";
                            $message .= "<td style='text-align:center;border:1px solid;'>".$item_item['shifttype_code']."<br>(".date('H:i', strtotime($item_item['shifttype_timein']))." - ".date('H:i', strtotime($item_item['shifttype_timeout'])).")</td>";

                            if($item_item['time_in'] == '00:00:00'){
                                $time_in = '';
                            }else{
                                $time_in = date('H:i:s', strtotime($item_item['time_in']));
                            }

                            if($item_item['time_out'] == '00:00:00'){
                                $time_out = '';
                            }else{
                                $time_out = date('H:i:s', strtotime($item_item['time_out']));
                            }

                            $message .= "<td style='text-align:center;border:1px solid;'>".$time_in."</td>";
                            $message .= "<td style='text-align:center;border:1px solid;'>".$time_out."</td>";

                            $message .= "</tr>";
                        }

                        $message .= "</table>";
                        $message .= "<br>";

                        $message .= "Demikian informasi ini kami sampaikan. Terima kasih atas perhatian dan kerjasama Bapak/Ibu.<br><br>";       
                        $message .= "Human Capital<br><br>";
                        $message .= "*Email informasi ini digenerate otomatis oleh Ciputra Enterprise System";
                        $message .= "</body></html>";     

                        //$sender = 'ces@ciputra.co.id';
                        $sender = 'no.reply@ciputra.com';
                       
                        if($postdata['read_email'] == 'general'){
                            // $to = 'miketjahya95@gmail.com';
                            $to = $item[0]['email'];
                        }else{

                            // $to = 'michael@ciputra.com';
                            $to = $item[0]['email_ciputra'];
                        }

                        $mail = new Hrd_Models_General_Email();
                        $mail->setData()->setFrom($sender, $sender);
                        $mail->setData()->setBodyHtml($message);
                        $mail->setData()->addTo($to, $to);
                        $mail->setData()->setSubject('[HCMS] Reminder Absensi'); 

                        if(!$mail->setData()->send()){
                              $msgErrmail[] = $to;
                        } else {
                              $alreadySent = $dao->alreadySent($obj, $this->getAppSession(), $item);
                              $suksesCount ++;
                        }

                        // $mail->setData()->send();       

                        // $alreadySent = $dao->alreadySent($obj, $this->getAppSession(), $item);

                        // $suksesCount ++;

                    } catch (Zend_Mail_Transport_Exception $e) {
                        echo $e->message();
                        // $msgErrmail[] = $to;
                    }
                }
            }
        }


        $hasil = $suksesCount > 0 ? TRUE : FALSE;

        if (count($msgErrmail) > 0) {
            $msg = "Error email ke : ";
            $msg .= implode(",", $msgErrmail);
        }

        $arrayRespon = array("HASIL" => $hasil, "MSG" => $msg);
        return Box_Tools::instantRead($arrayRespon);
        // $hasil = $dao->getAll($this->getAppRequest(), $obj, $postdata);

        // $dm->setDataList($dataList);
        // $dm->setHasil($hasil);
        // return $dm;
    }
    //end added by michael 16/12/2021

    /* start added by ahmad riadi 06-06-2017 */

    public function getdatalogfingerprintRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'logfingerprint', array(), array());
        $dao = new Hrd_Models_Absent_LogfingerprintDao();
        $obj = new Hrd_Models_Absent_Logfingerprint();
        $postdata = $this->getAppData();

        // added by Michael 2021.05.19 
        if (array_key_exists("projectptid_opsi",$postdata) && $postdata['projectptid_opsi']){

            $projectptid_opsi = $postdata["projectptid_opsi"];
            $postdata['projectpt_id'] = $projectptid_opsi;

            $dao_postdata = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao_postdata->getProjectPtId($this->getAppSession(), $postdata);

            $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
            $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

            $postdata['project_id'] = $projectid_opsi;
            $postdata['pt_id'] = $ptid_opsi;

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $postdata['project_id'] = $this->getAppSession()->getProjectId();
            $postdata['pt_id'] = $this->getAppSession()->getPtid();

            $dao_postdata = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao_postdata->getProject_Pt_Id($this->getAppSession(), $postdata);

            $projectid_opsi = $postdata['project_id'];
            $ptid_opsi = $postdata['pt_id'];
            $postdata['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }
        // end added by Michael 2021.05.19 

        $obj->setArrayTable($postdata);

        // $hasil = $dao->getAll($this->getAppRequest(), $obj);

        // added by Michael 2021.05.19 
        $hasil = $dao->getAll($this->getAppRequest(), $obj, $postdata);
        // end added by Michael 2021.05.19 

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    /* end added by ahmad riadi 06-06-2017 */

    //added by michael 02/12/2021
    public function getdataalllogfingerprintRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'alllogfingerprint', array(), array());
        $dao = new Hrd_Models_Absent_AlllogfingerprintDao();
        $obj = new Hrd_Models_Absent_Alllogfingerprint();
        $postdata = $this->getAppData();


        if (array_key_exists("projectptid_opsi",$postdata) && $postdata['projectptid_opsi']){

            $projectptid_opsi = $postdata["projectptid_opsi"];
            $postdata['projectpt_id'] = $projectptid_opsi;

            $dao_postdata = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao_postdata->getProjectPtId($this->getAppSession(), $postdata);

            $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
            $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

            $postdata['project_id'] = $projectid_opsi;
            $postdata['pt_id'] = $ptid_opsi;

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $postdata['project_id'] = $this->getAppSession()->getProjectId();
            $postdata['pt_id'] = $this->getAppSession()->getPtid();

            $dao_postdata = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao_postdata->getProject_Pt_Id($this->getAppSession(), $postdata);

            $projectid_opsi = $postdata['project_id'];
            $ptid_opsi = $postdata['pt_id'];
            $postdata['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }

        $data = Hrd_Models_Absent_Data_SqlServerDbs::getDb($postdata['project_id'], $postdata['pt_id']);

        // if($postdata['project_id'] == 1 && $postdata['pt_id'] == 1 || $postdata['project_id'] == 5096 && $postdata['pt_id'] == 5232){
        if($postdata['project_id'] == 1 && $postdata['pt_id'] == 1){
            $dao_getdata = new Hrd_Models_Absent_Data_SqlServer($postdata['project_id'], $postdata['pt_id']);
            //$hasil = Hrd_Models_Absent_Data_SqlServer::get_all_log($data,$postdata);
        }else{
            $dao_getdata = new Hrd_Models_Absent_Data_SqlServerProject($postdata['project_id'], $postdata['pt_id']);
            //$hasil = Hrd_Models_Absent_Data_SqlServerProject::get_all_log($data,$postdata);
        }
        
        $hasil = $dao_getdata->get_all_log($data,$postdata);


        if($hasil['message'] == 'Success'){
            $dm->setDataList($dataList);
            $dm->setHasil($hasil['data']);
        }else{
            $dm = FALSE;
        }


        return $dm;
    }
    //end added by michael 02/12/2021



    /* start added by ahmad riadi 02-11-2017 */

    public function getdatashiftRead() {
        $dao = new Hrd_Models_Master_ShiftTypeDao();
        $obj = new Hrd_Models_Master_ShiftType();
        $data = $this->getAppData();
        $obj->getProject()->setId($this->getAppSession()->getProject()->getId());
        $obj->getPt()->setId($this->getAppSession()->getPt()->getId());
        $obj->setArrayTable($data);
        $result = $dao->getAll($this->getAppRequest(), $obj);
        $return = Box_Tools::toObjectResult($result, $obj);
        $hasil = TRUE;
        $arrayRespon = array(
            "HASIL" => $hasil);
        return Box_Tools::instantRead($arrayRespon, array($return));
    }

    public function getdataabsentindateRead() {
        $data = $this->getAppData();
        $dao = new Hrd_Models_AbsentDao();
        $data['date'] = date('Y-m-d', strtotime($data['date']));
        // $data['date'] = date('Y-m-d',strtotime('1990-01-01'));
        $data = $dao->Getabsent_by_empid_date($data['employee_id'], $data['date']);
        if (!empty($data)) {
            return Box_Tools::instantRead(array("HASIL" => 1,), array($data));
        } else {
            return Box_Tools::instantRead(array("HASIL" => 0,), array());
        }
    }

    public function getdatatukeroffRead() {
        ini_set("memory_limit", "-1");
        ini_set('max_execution_time', 0);
        
        $param = $this->getAppData();
        if (isset($param['paramdata'])) {
            $parampost = Zend_Json::decode($param['paramdata']);
            $param = array_merge($param, $parampost);
        }
        $session = $this->getAppSession();
        $request = $this->getAppRequest();
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'tukeroff', array(), array());
        $dao = new Hrd_Models_Master_TukeroffDao();
        $obj = new Hrd_Models_Master_Tukeroff();
        $obj->setProject_id($session->getProject()->getId());
        $obj->setPt_id($session->getPt()->getId());
        $obj->setArrayTable($param);
        $hasil = $dao->getAll_in_Temp($request, $obj);
        $return = array(array(array("totalRow" => 0)), array());
        if ($hasil[0]) {
            $result = $hasil[1];
            $returndata = array();
            foreach ($result as $row) {
                $dao_absent = new Hrd_Models_AbsentDao();
                $dao_shift = new Hrd_Models_Master_ShiftTypeDao();
                $obj_shift = new Hrd_Models_Master_ShiftType();
                $obj_shift->getProject()->setId($this->getAppSession()->getProject()->getId());
                $obj_shift->getPt()->setId($this->getAppSession()->getPt()->getId());
                $obj_shift->setArrayTable(array('code' => 'OFF'));
                $result_shift = $dao_shift->getAll($request, $obj_shift);
                if ($result_shift[0][0]['totalRow']) {
                    $rowshift = $result_shift[1][0];
                    $row['ke_shift'] = $rowshift['shifttype'];
                    $row['ke_shifttype_id'] = $rowshift['shifttype_id'];
                }

                $data_absent_dari_tanggal = $dao_absent->Getabsent_by_empid_date($row['employee_id'], date('Y-m-d', strtotime($row['dari_tanggal'])));
                $data_absent_ke_tanggal = $dao_absent->Getabsent_by_empid_date($row['employee_id'], date('Y-m-d', strtotime($row['ke_tanggal'])));

                if (!empty($data_absent_dari_tanggal) && !empty($data_absent_ke_tanggal)) {
                    $row['dari_shifttype_id'] = $data_absent_dari_tanggal['shifttype_id'];
                    $row['dari_absentdetail_id'] = $data_absent_dari_tanggal['absentdetail_id'];
                    $row['ke_absentdetail_id'] = $data_absent_ke_tanggal['absentdetail_id'];
                    $result_mshift = $dao_shift->getshift_byid($row['dari_shifttype_id']);
                    $row['dari_shift'] = $result_mshift['shifttype'];
                    $row['dari_description'] = preg_replace('/[^A-Za-z0-9\-]/', ' ', $row['dari_description']);
                    $row['ke_description'] = preg_replace('/[^A-Za-z0-9\-]/', ' ', $row['ke_description']);

                    $returndata[] = $row;
                }
            }
            $return = array(array(array("totalRow" => $hasil[0][0]['totalRow'])), $returndata);
        }
        $dm->setDataList($dataList);
        $dm->setHasil($return);
        return $dm;
    }

    public function createtukeroffRead() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $request = $this->getAppRequest();
        $session = $this->getAppSession();
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'tukeroff', array(), array());
        $dao_tukeroff = new Hrd_Models_Master_TukeroffDao();
        $obj_tukeroff = new Hrd_Models_Master_Tukeroff();
        $obj_tukeroff->setProject_id($session->getProject()->getId());
        $obj_tukeroff->setPt_id($session->getPt()->getId());
        $hasil = $dao_tukeroff->getAll_in_Temp($request, $obj_tukeroff);
        $return = array(array(array("totalRow" => 0)), array());

        $dao = new Hrd_Models_Master_TukeroffDao();
        $obj = new Hrd_Models_Master_Tukeroff();
        $data = $this->getAppData();
        $param = Zend_Json::decode($data['paramdata']);
        if (!empty($param)) {

            foreach ($param as $row) {
                $obj->setArrayTable($row);
                $dao->save($obj);
            }

            $obj->setProject_id($this->getAppSession()->getProject()->getId());
            $obj->setPt_id($this->getAppSession()->getPt()->getId());
            $this->ProcessApproveTukerOff();
            $this->ProcessCancelTukerOff();
        }
        $dm->setDataList($dataList);
        $dm->setHasil($return);
        return $dm;
    }

    public function ProcessApproveTukerOff() {
        $setup = new Hrd_Models_General_Setup();
        $dao = new Hrd_Models_Master_TukeroffDao();
        $dao_absent = new Hrd_Models_AbsentDao();
        $obj = new Hrd_Models_Master_Tukeroff();
        $obj->setProject_id($this->getAppSession()->getProject()->getId());
        $obj->setPt_id($this->getAppSession()->getPt()->getId());
        $result = $dao->DataApprove($obj);



        if ($result[0][0]['totalRow']) {
            $record = $result[1];

            foreach ($record as $row) {


                $data_absent_dari_tanggal = $dao_absent->Getabsent_by_empid_date($row['employee_id'], date('Y-m-d', strtotime($row['dari_tanggal'])));
                $data_absent_ke_tanggal = $dao_absent->Getabsent_by_empid_date($row['employee_id'], date('Y-m-d', strtotime($row['ke_tanggal'])));

                if (!empty($data_absent_dari_tanggal) && !empty($data_absent_ke_tanggal)) {

                    $dao_absent->create_logdata_absentdetail($data_absent_dari_tanggal, 'tukeroff_approve_dari_tanggal');
                    $dao_absent->create_logdata_absentdetail($data_absent_ke_tanggal, 'tukeroff_approve_ke_tanggal');

                    $setup->_tabledata = $setup->_td_absentdetail;
                    $absentdetail_id_darishift = $data_absent_dari_tanggal['absentdetail_id'];
                    $record_dari_shift = array(
                        "attendance_total" => 1, //di info harus di set 1
                        "shifttype_id" => $row['dari_shifttype_id'],
                        "description" => $row['dari_description'],
                    );


                    $setup->updatedatav2($record_dari_shift, array('absentdetail_id' => $absentdetail_id_darishift));


                    $setup->_tabledata = $setup->_td_absentdetail;
                    $absentdetail_id_keshift = $data_absent_ke_tanggal['absentdetail_id'];
                    if($row['is_fullday'] == 1){
                        $record_ke_shift = array(
                            "shifttype_id" => $row['ke_shifttype_id'],
                            "description" => $row['ke_description']
                        );
                    } else {
                        $record_ke_shift = array(
                            "shifttype_id" => $row['ke_shifttype_id'],
                            "description" => $row['ke_description'],
                            "absenttype_id"=>33
                        );
                    }
                    
                    $setup->updatedatav2($record_ke_shift, array('absentdetail_id' => $absentdetail_id_keshift));

                    $setup->_tabledata = $setup->_t_tukeroff;
                    $setup->updatedatav2(array('status_proses' => 1), array('tukeroff_id' => $row['tukeroff_id']));


                    $setup->_tabledata = $setup->_t_tukeroff_tmp;
                    $setup->deletedatav2(array(
                        'employee_id' => $row['employee_id'],
                        'tukeroff_date' => $row['tukeroff_date'],
                        'dari_tanggal' => $row['dari_tanggal'],
                        'ke_tanggal' => $row['ke_tanggal'],
                            )
                    );
                }
            }
        }
    }

    public function ProcessCancelTukerOff() {
        $setup = new Hrd_Models_General_Setup();
        $dao = new Hrd_Models_Master_TukeroffDao();
        $dao_absent = new Hrd_Models_AbsentDao();
        $obj = new Hrd_Models_Master_Tukeroff();
        $obj->setProject_id($this->getAppSession()->getProject()->getId());
        $obj->setPt_id($this->getAppSession()->getPt()->getId());
        $result = $dao->DataCancel($obj);

        //cek data harus ada di temporary
        if ($result[0][0]['totalRow']) {
            $record = $result[1];
            foreach ($record as $row) {
                $data_absent_dari_tanggal = $dao_absent->Getabsent_by_empid_date($row['employee_id'], date('Y-m-d', strtotime($row['dari_tanggal'])));
                $data_absent_ke_tanggal = $dao_absent->Getabsent_by_empid_date($row['employee_id'], date('Y-m-d', strtotime($row['ke_tanggal'])));
                //cek data harus ada di absent record
                if (!empty($data_absent_dari_tanggal) && !empty($data_absent_ke_tanggal)) {

                    //cek id absensi detail harus ada
                    if (intval($row['dari_absentdetail_id']) > 0 && intval($row['ke_absentdetail_id']) > 0) {

                        $data_log_absent_dari = $dao_absent->Getabsent_in_log($row['dari_absentdetail_id'], "tukeroff_approve_dari_tanggal");
                        $data_log_absent_ke = $dao_absent->Getabsent_in_log($row['ke_absentdetail_id'], "tukeroff_approve_ke_tanggal");

                        //cek data harus ada di log
                        if (!empty($data_log_absent_dari) && !empty($data_log_absent_ke)) {

                            $row_log_absent_dari = $data_log_absent_dari[0];
                            $row_log_absent_ke = $data_log_absent_ke[0];

                            $dao_absent->create_logdata_absentdetail($data_absent_dari_tanggal, 'tukeroff_cancel_dari_tanggal');
                            $dao_absent->create_logdata_absentdetail($data_absent_ke_tanggal, 'tukeroff_cancel_ke_tanggal');

                            $setup->_tabledata = $setup->_td_absentdetail;
                            $absentdetail_id_darishift = $data_absent_dari_tanggal['absentdetail_id'];
                            $record_dari_shift = array(
                                "shifttype_id" => $row_log_absent_dari['shifttype_id'],
                                "attendance_total" => $row_log_absent_dari['attendance_total'],
                                "description" => $row_log_absent_dari['description'],
                            );
                            $setup->updatedata($record_dari_shift, array('absentdetail_id' => $absentdetail_id_darishift));

                            $setup->_tabledata = $setup->_td_absentdetail;
                            $absentdetail_id_keshift = $data_absent_ke_tanggal['absentdetail_id'];

                            if($row['is_fullday'] == 1){
                                $record_ke_shift = array(
                                    "shifttype_id" => $row_log_absent_ke['shifttype_id'],
                                    "attendance_total" => $row_log_absent_ke['attendance_total'],
                                    "description" => $row_log_absent_ke['description']
                                );
                            } else {
                                $record_ke_shift = array(
                                    "shifttype_id" => $row_log_absent_ke['shifttype_id'],
                                    "attendance_total" => $row_log_absent_ke['attendance_total'],
                                    "description" => $row_log_absent_ke['description'],
                                    "absenttype_id"=>NULL
                                );
                            }

                            $setup->updatedata($record_ke_shift, array('absentdetail_id' => $absentdetail_id_keshift));

                            $setup->_tabledata = $setup->_t_tukeroff;
                            $setup->updatedatav2(array('status_proses' => 1), array('tukeroff_id' => $row['tukeroff_id']));

                            $setup->_tabledata = $setup->_t_tukeroff_tmp;
                            $setup->deletedatav2(array(
                                'employee_id' => $row['employee_id'],
                                'tukeroff_date' => $row['tukeroff_date'],
                                'dari_tanggal' => $row['dari_tanggal'],
                                'ke_tanggal' => $row['ke_tanggal'],
                                    )
                            );
                        }
                    }
                }
            }
        }
    }

    /* end added by ahmad riadi 02-11-2017 */


    /* start added by ahmad riadi 06-11-2017 */

    public function updateshiftbyabsentdetailidRead() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $setup = new Hrd_Models_General_Setup();
        $data = $this->getAppData();
        $param = Zend_Json::decode($data['paramdata']);
        $setup->_tabledata = 'hrd.dbo.td_absentdetail';
        $setup->updatedatav2(array("shifttype_id" => $param['shifttype_id'], "modiby" => $setup->_user_id, "modion" => date('Y-m-d H:i:s')), array('absentdetail_id' => $param['absentdetail_id']));
        return Box_Tools::instantRead(array("HASIL" => 1,), array());
    }

    /* end added by ahmad riadi 06-11-2017 */


    /* start added by ahmad riadi 13-12-2017 */

    public function processgeneratebyworkgroupRead() {
        date_default_timezone_set('Asia/Jakarta');
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $setup = new Hrd_Models_General_Setup();
        $data = $this->getAppData();
        $param = Zend_Json::decode($data['paramdata']);
        $workgroup_id = $param['workgroup_id'];
        $from = $param['fromperiode'];
        $until = $param['untilperiode'];
        $this->createThAbsent($workgroup_id, $from, $until);
        $this->createTdAbsent($workgroup_id, $from, $until);
        return Box_Tools::instantRead(array("HASIL" => 1,), array());
    }

    public function createThAbsent($workgroup_id, $from, $until) {
        date_default_timezone_set('Asia/Jakarta');
        $setup = new Hrd_Models_General_Setup();
        $fromdate = date('Y-m-01', strtotime(date('Y', strtotime($from)) . '-' . date('m', strtotime($from))));
        $endfilterdate = date('Y-m-t', strtotime(date('Y', strtotime($until)) . '-' . date('m', strtotime($until))));
        while ($fromdate <= $endfilterdate) {
            $firstdate = $fromdate;
            $result = $setup->getdata_standard_bytable($setup->_md_workgroupemployee, array(
                "workgroup_id" => $workgroup_id,
                "deleted" => '0',
            ));

            if (!empty($result[0])) {
                foreach ($result[0] as $row) {
                    $tmp_date = explode("-", $firstdate);
                    $year = $tmp_date[0];
                    $month = $tmp_date[1];

                    $record = array(
                        "project_id" => $setup->_project_id,
                        "pt_id" => $setup->_pt_id,
                        "employee_id" => $row['employee_id'],
                        "month" => $month,
                        "year" => $year,
                        "month" => $month,
                        "addon" => date('Y-m-d H:i:s'),
                        "addby" => $setup->_user_id,
                    );


                    $resultthabsent = $setup->getdata_standard_bytable($setup->_th_absent, array(
                        "project_id" => $setup->_project_id,
                        "pt_id" => $setup->_pt_id,
                        "employee_id" => $row['employee_id'],
                        "month" => $month,
                        "year" => $year,
                        "month" => $month,
                        "deleted" => '0',
                    ));

                    if (empty($resultthabsent[0])) {
                        $setup->_tabledata = $setup->_th_absent;
                        $setup->insertdata_v2($record);
                    }
                }
            }
            $fromdate = date('Y-m-d', strtotime("+1 month", strtotime($firstdate)));
        }
    }

    public function createTdAbsent($workgroup_id, $from, $until) {
        date_default_timezone_set('Asia/Jakarta');
        $setup = new Hrd_Models_General_Setup();
        $counterdays = $setup->countingDays($from, $until);

        $result = $setup->getdata_standard_bytable($setup->_md_workgroupshift, array(
            "workgroup_id" => $workgroup_id,
            "deleted" => '0',
        ));




        if (!empty($result[0])) {
            $counterprocess = 0;
            $squencedata = 1;
            $counterdays = 0;
            $pengurangdays = 0;
            $last_squence = $this->lastSquence($result[0]);

            while ($from <= $until) {
                $counterprocess++;
                $pengurangdays++;
                $date = $from;


                $result = $setup->getdata_standard_bytable($setup->_md_workgroupshift, array(
                    "workgroup_id" => $workgroup_id,
                    "deleted" => '0',
                    "indexdata" => $squencedata,
                ));


                //print_r($result);
                //exit;


                if (!empty($result[0])) {

                    $row = $result[0][0];
                    $status_dayofweek = $row['status_dayofweek'];
                    if ($status_dayofweek) {//jika status status_dayofweek true, maka ambil nilia counter dari tanggal
                        $pengurangdays = date('N', strtotime(date('Y-m-d', strtotime($date))));
                    }

                    $counterdays = $row['counterdays'];

                    $squencedata = $row['indexdata'];
                    $resultemployeeshitf = $setup->getdata_standard_bytable($setup->_md_workgroupemployee, array(
                        "workgroup_id" => $workgroup_id,
                        "deleted" => '0',
                    ));

                    if (!empty($resultemployeeshitf[0])) {
                        // echo $counterdays;
                        foreach ($resultemployeeshitf[0] as $rowemployeeshift) {
                            $tmp_date = explode("-", $date);
                            $year = $tmp_date[0];
                            $month = $tmp_date[1];
                            $day = $tmp_date[2];

                            $resultthabsent = $setup->getdata_standard_bytable($setup->_th_absent, array(
                                "project_id" => $setup->_project_id,
                                "pt_id" => $setup->_pt_id,
                                "employee_id" => $rowemployeeshift['employee_id'],
                                "month" => $month,
                                "year" => $year,
                                "month" => $month,
                                "deleted" => '0',
                            ));

                            if (!empty($resultthabsent[0])) {
                                $rowthabsent = $resultthabsent[0][0];
                                $absent_id = $rowthabsent['absent_id'];


                                $record = array(
                                    "absent_id" => $absent_id,
                                    "shifttype_id" => $row['shifttype_id'],
                                    "day" => $day,
                                    "date" => $date
                                );


                                $resulttdabsent = $setup->getdata_standard_bytable($setup->_td_absentdetail, array(
                                    "absent_id" => $absent_id,
                                    "date" => $date,
                                    "deleted" => '0',
                                ));


                                //print_r($setup->_dataexec);

                                if (empty($resulttdabsent[0])) {
                                    $setup->_tabledata = $setup->_td_absentdetail;
                                    $setup->insertdata_v2($record);
                                }
                            }
                        }
                    }
                    $sisahari = $counterdays - $pengurangdays;
                    if ($sisahari == 0) {
                        if ($last_squence == $squencedata) {
                            $squencedata = 1;
                        } else {
                            $squencedata++;
                        }
                        $pengurangdays = 0;
                    }
                } else {
                    $squencedata = 1;
                    $pengurangdays = 0;
                }
                $from = date('Y-m-d', strtotime("+1 days", strtotime($date)));
            }
        }
    }

    public function lastSquence($data) {
        $top_squence = array();
        foreach ($data as $row) {
            $top_squence[] = intval($row['indexdata']);
        }
        rsort($top_squence);
        $last_squence = $top_squence[0];
        return $last_squence;
    }

    /* end added by ahmad riadi 13-12-2017 */



    /* start added by ahmad riadi 14-12-2017 */

    public function parameterpdlkRead() {
        $dnt = new Hrd_Models_Dinas_NegaraTujuanDao();
        $nt = new Hrd_Models_Dinas_NegaraTujuan();
        $nt->setProject($this->getAppSession()->getProject());
        $nt->setPt($this->getAppSession()->getPt());
        $negaratujuan = $dnt->getAllWOPL($nt);
        $negaratujuan = Box_Tools::toObjectResult($negaratujuan, new Hrd_Models_Dinas_NegaraTujuan());


        $dcr = new Hrd_Models_General_Dao();
        $currency = $dcr->getAllCurrency();
        $currency = Box_Tools::toObjectResult($currency, new Hrd_Models_Master_General_Currency());

        $md = new Hrd_Models_App_Mastertable_Project();
        $project = $md->prosesDataWithSession($this->getAppSession(), TRUE);

        $hasil = TRUE;
        $arrayRespon = array(
            "HASIL" => $hasil);
        return Box_Tools::instantRead($arrayRespon, array($negaratujuan, $project, $currency));
    }

    public function getdatapdlkintranetRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'intranetpdlk', array(), array());
        $dao = new Hrd_Models_Intranet_PdlkDao();
        $obj = new Hrd_Models_Intranet_Pdlk();
        $obj->setArrayTable($this->getAppData());
        $data = $this->getAppData();
        $project_id = $this->getAppSession()->getProject()->getId();
        $pt_id = $this->getAppSession()->getPt()->getId();
        $hasil = $dao->getAll($project_id, $pt_id, 'default', $data['configintranet'], null);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function filterpdlkintranetRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'intranetpdlk', array(), array());
        $dao = new Hrd_Models_Intranet_PdlkDao();
        $obj = new Hrd_Models_Intranet_Pdlk();
        $data = $this->getAppData();
        $obj->setArrayTable($this->getAppData());
        $project_id = $this->getAppSession()->getProject()->getId();
        $pt_id = $this->getAppSession()->getPt()->getId();
        $hasil = $dao->getAll($project_id, $pt_id, 'filter', $data['configintranet'], $data['paramdata']);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function updatepdlkintranetinchangeRead() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $dao = new Hrd_Models_Intranet_PdlkDao();
        $data = $this->getAppData();
        $param = Zend_Json::decode($data['paramdata']);
        $configintranet = $data['configintranet'];
        $id = $param['tugas_id'];
        $tipe = $param['status'];
        $hrd_comment = $param['hrd_comment'];
        $dao->updateStatusIntranet($configintranet, $id, $hrd_comment, $tipe);
        //$dao->Sendemail($configintranet, $param);
        return Box_Tools::instantRead(array("HASIL" => 1,), array());
    }

    public function updatestatuspdlkintranet($config, $id) {
        $dao = new Hrd_Models_Intranet_PdlkDao();
        $dao->updateStatus($config, $id, "YES");
    }

    /* end added by ahmad riadi 14-12-2017 */


    /* start added by ahmad riadi 04-01-2018 */

    public function getdataovertimeintranetRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'intranetovertime', array(), array());
        $dao = new Hrd_Models_Intranet_OvertimeDao();
        $obj = new Hrd_Models_Intranet_Overtime();
        $obj->setArrayTable($this->getAppData());
        $data = $this->getAppData();
        $project_id = $this->getAppSession()->getProject()->getId();
        $pt_id = $this->getAppSession()->getPt()->getId();
        $hasil = $dao->getAll($project_id, $pt_id, 'default', $data['configintranet'], null);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    /* end added by ahmad riadi 04-01-2018 */



    /* start added by ahmad riadi 09-03-2018 */

    public function getdatabyapiRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'transactionapi', array(), array());
        $dao = new Hrd_Models_Intranet_TransactionapiDao();
        $obj = new Hrd_Models_Intranet_Transactionapi();
        $data = $this->getAppData();

         // added by Michael 2021.05.19 
        if (array_key_exists("projectptid_opsi",$data) && $data['projectptid_opsi']){

            $projectptid_opsi = $data["projectptid_opsi"];
            $data['projectpt_id'] = $projectptid_opsi;

            $dao_projectpt = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao_projectpt->getProjectPtId($this->getAppSession(), $data);

            $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
            $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

            $data['project_id'] = $projectid_opsi;
            $data['pt_id'] = $ptid_opsi;

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $data['project_id'] = $this->getAppSession()->getProjectId();
            $data['pt_id'] = $this->getAppSession()->getPtid();

            $dao_projectpt = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao_projectpt->getProject_Pt_Id($this->getAppSession(), $data);

            $projectid_opsi = $data['project_id'];
            $ptid_opsi = $data['pt_id'];
            $data['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }
        // end added by Michael 2021.05.19 

        $obj->setArrayTable($data);

        // $hasil = $dao->getAll($data['limit'], $data['start']);

        // added by Michael 2021.05.19 
        $hasil = $dao->getAll($data['limit'], $data['start'], $data);
        // end added by Michael 2021.05.19 

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    public function getdatafilterbyapiRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'transactionapi', array(), array());
        $dao = new Hrd_Models_Intranet_TransactionapiDao();
        $obj = new Hrd_Models_Intranet_Transactionapi();
        $data = $this->getAppData();

         // added by Michael 2021.05.19 
        if (array_key_exists("projectptid_opsi",$data) && $data['projectptid_opsi']){

            $projectptid_opsi = $data["projectptid_opsi"];
            $data['projectpt_id'] = $projectptid_opsi;

            $dao_projectpt = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao_projectpt->getProjectPtId($this->getAppSession(), $data);

            $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
            $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

            $data['project_id'] = $projectid_opsi;
            $data['pt_id'] = $ptid_opsi;

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $data['project_id'] = $this->getAppSession()->getProjectId();
            $data['pt_id'] = $this->getAppSession()->getPtid();

            $dao_projectpt = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao_projectpt->getProject_Pt_Id($this->getAppSession(), $data);

            $projectid_opsi = $data['project_id'];
            $ptid_opsi = $data['pt_id'];
            $data['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }
        // end added by Michael 2021.05.19 

        $parampost = json_decode($data['paramdata'],true);
        unset($data['paramdata']);
        $param = array_merge($data, $parampost);
        $obj->setArrayTable($param);
        $paramdata = $obj->getArrayTable();

        // $hasil = $dao->getFilterdata($paramdata, $data['limit'], $data['start']);

        // added by Michael 2021.05.19 
        $hasil = $dao->getFilterdata($paramdata, $data['limit'], $data['start'], $data);
        // end added by Michael 2021.05.19 

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function setsuccessprocessapiRead() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $setup = new Hrd_Models_General_Setup();
        $data = $this->getAppData();
        $id = $data['transaction_id'];
        $for_transaction = $data['for_transaction'];
        if (isset($data['paramdata'])) {
            $param = Zend_Json::decode($data['paramdata']);
        }
        $setup->_tabledata = 'hrd.dbo.t_transaction_by_api';
        $setup->updatedatav2(array("is_process" => 1, "modiby" => $setup->_user_id, "modion" => date('Y-m-d H:i:s')), array('transaction_id' => $id, 'for_transaction' => $for_transaction));
        return Box_Tools::instantRead(array("HASIL" => 1,), array());
    }

    /* end added by ahmad riadi 09-03-2018 */
    
    // added by Wulan Sari 25.04.2018
    public function listcbRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $data = $this->getAppData();

        // added by Michael 2021.05.19 
        if (array_key_exists("projectptid_opsi",$data)){

            $projectptid_opsi = $data["projectptid_opsi"];
            $data['projectpt_id'] = $projectptid_opsi;

            $dao = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao->getProjectPtId($this->getAppSession(), $data);

            $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
            $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

            $data['project_id'] = $projectid_opsi;
            $data['pt_id'] = $ptid_opsi;
        }else{
            
            //CURRENT PROJECTPT saat pilih dari START
            $data['project_id'] = $this->getAppSession()->getProjectId();
            $data['pt_id'] = $this->getAppSession()->getPtid();

            $dao = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao->getProject_Pt_Id($this->getAppSession(), $data);

            $data['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }
        // end added by Michael 2021.05.19 

        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
        
        $kelompokabsensi_dao = new Hrd_Models_Master_Kelompokabsensi_KelompokabsensiDao();
        // $kelompokabsensi = $kelompokabsensi_dao->getAllWoPL($this->getAppSession());
        $kelompokabsensi = $kelompokabsensi_dao->getAllWoPL($this->getAppSession(), $data);
        $kelompokabsensi = Box_Tools::toObjectResult($kelompokabsensi, new Hrd_Models_Master_Kelompokabsensi_Kelompokabsensi());
        
        $dm->setHasil(array($kelompokabsensi));
        
        return $dm;
    }
    // End added by Wulan Sari 25.04.2018

    // added by Michael 2021.05.19 
    public function listprojectptRead() { 

        $dm = new Box_Models_App_Hermes_DataModel();
        $data = $this->getAppData();
        
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $projectid_curr = $this->getAppSession()->getProjectId();
        $ptid_curr = $this->getAppSession()->getPtid();
        $projectptid_curr = array();

        $dao = new Hrd_Models_Master_Projectpt_Dao();
        $projectpt = new Hrd_Models_Master_Projectpt_ProjectPt();
        $projectpt->setUserid($this->getAppSession()->getUserId());
        $projectpt->setGroupid($this->getAppSession()->getGroupId());
        $hasil = $dao->getAllWoPL($projectpt);

        $allprojectpt = array();
        foreach ($hasil[1] as $record){
    
            $projectpt = new Hrd_Models_Master_Projectpt_ProjectPt();
            $projectpt->setArrayTable($record);
            $allprojectpt[] = $projectpt;

            if($record['project_id'] == $projectid_curr && $record['pt_id'] == $ptid_curr){
                $projectptid_curr['projectptid_curr'] = $record['projectpt_id'];
            }
        }

        
        $dm->setHasil(array($allprojectpt,$projectptid_curr));
        
        return $dm;

    }

    public function mastersetupshift_projectptRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $data = $this->getAppData();

        if (array_key_exists("projectptid_opsi",$data) && $data['projectptid_opsi']){

            $projectptid_opsi = $data["projectptid_opsi"];
            $data['projectpt_id'] = $projectptid_opsi;

            $dao = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao->getProjectPtId($this->getAppSession(), $data);

            $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
            $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

            $data['project_id'] = $projectid_opsi;
            $data['pt_id'] = $ptid_opsi;

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $data['project_id'] = $this->getAppSession()->getProjectId();
            $data['pt_id'] = $this->getAppSession()->getPtid();

            $dao = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao->getProject_Pt_Id($this->getAppSession(), $data);

            $data['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }

        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $dao = new Hrd_Models_AbsentDao();
        $em = new Hrd_Models_Master_ShiftType();
        $hasil = $dao->getMasterSetupShiftProjectPt($em, $this->getAppSession(), $data);
        $allshift = array();
        foreach ($hasil[1] as $record){
    
            $shift = new Hrd_Models_Master_ShiftType();
            $shift->setArrayTable($record);
            $allshift[] = $shift;

        }

        $dm->setHasil(array($allshift));
        
        return $dm;
        
    } 

    public function detail_setupshiftRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $data = $this->getAppData();

        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $dao = new Hrd_Models_Master_ShiftTypeDao();
        $em = new Hrd_Models_Master_ShiftType();
        $hasil = $dao->getshift_byid($data['getid']);
        $dm->setHasil(array($hasil));
        
        return $dm;
        
    } 
    // end added by Michael 2021.05.19 
    
    
    public function gantishiftRead() {
        
        $hasil = FALSE;
        $msg = "Proses...";

        $data = $this->getAppData();
        $rawData = $data;
        
        $daoAbsent = new Hrd_Models_AbsentDao();
        $hasil = $daoAbsent->gantishift($data, $this->getAppSession());
        if(!$hasil){
            $msg = 'Problem when process, time in not found';
        }
        
        $arrayRespon = array(
            "HASIL" => $hasil,
            "MSG" => $msg
        );
        
        return Box_Tools::instantRead($arrayRespon, array());
    }

    public function inoutwfhRead() {
        
        $hasil = FALSE;
        $msg = "Proses...";

        $data = $this->getAppData();
        $rawData = $data;
        
        $daoAbsent = new Hrd_Models_AbsentDao();
        $hasil = $daoAbsent->inoutwfh($data, $this->getAppSession());
        if(!$hasil){
            $msg = 'Problem when process, time in not found';
        }
        
        $arrayRespon = array(
            "HASIL" => $hasil,
            "MSG" => $msg
        );
        
        return Box_Tools::instantRead($arrayRespon, array());
    }
    

    /* add by wulan 2020 0502 */
    public function update_wfh_attn($lates_year, $lates_month) {
        $dao_absent = new Hrd_Models_AbsentDao();
        $dao_absent->update_wfh_attn($lates_year, $lates_month, $this->getAppSession());
    }
    /* end add by wulan 2020 0502 */
    
    // add by wulan 13042021
    public function update_wfh_attn_common($lates_year, $lates_month) {
        $dao_absent = new Hrd_Models_AbsentDao();
        $dao_absent->update_wfh_attn_common($lates_year, $lates_month, $this->getAppSession());
    }
    
    // added by wulan sari 20200828
    public function reasondetailRead() {        
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'reasondetail', array(), array());
        $dao = new Hrd_Models_AbsentDao();
        $enti = new Hrd_Models_Absent_Reasondetail();
        $enti->setArrayTable($this->getAppData());        
        $params = $this->getAppData();        
        $dm->setDataList($dataList);
        $dm->setHasil($dao->getReasondetail($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId(), $params["absentdetail_id"]));        
        return $dm;
    }

    // added by Michael 2021.06.15 
    public function getattachmentRead() {

        $dm = new Box_Models_App_Hermes_DataModel();
        
        $dao = new Hrd_Models_AbsentDao();
        $absent = new Hrd_Models_Absent();
        $r = $this->getAppData();

        if (array_key_exists("projectptid_opsi",$r) && $r['projectptid_opsi']){

            if($r['projectptid_opsi']){

                $r['projectpt_id'] = $r['projectptid_opsi'];

                $hasil_projectpt = $dao->getProjectPtId($this->getAppSession(), $r);

                $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
                $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

                $r['project_id'] = $projectid_opsi;
                $r['pt_id'] = $ptid_opsi;

            }

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $r['project_id'] = $this->getAppSession()->getProjectId();
            $r['pt_id'] = $this->getAppSession()->getPtid();

            $hasil_projectpt = $dao->getProject_Pt_Id($this->getAppSession(), $r);

            $r['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }


        $absent->setArrayTable($r);
        $absent->getEmployee()->setArrayTable($r);
        $hasil = $dao->getAttachment($absent, $this->getAppSession(), $r);

        $arrayRespon = array("hasil" => $hasil[1]);
        return Box_Tools::instantRead($arrayRespon);
    }    
    // end added by Michael 2021.06.15 
    
    // added by Wulan 2021.07.19
    public function filtertukarshiftintranetRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'intranettukarshift', array(), array());
        $setup = new Hrd_Models_General_Setup();
        
        // edit by wulan sari
        // cek SH karena perlakukannya beda yang sudah implement intranet attndance KP dengan yg belum
        $dao_absent = new Hrd_Models_AbsentDao();
        $checkSH = $dao_absent->checkSH($setup->_project_id);
        
        $obj = new Hrd_Models_Intranet_Tukarshift();
        $obj->setArrayTable($this->getAppData());
        $data = $this->getAppData();
        $project_id = $this->getAppSession()->getProject()->getId();
        $pt_id = $this->getAppSession()->getPt()->getId();
        
        $dao = new Hrd_Models_Intranet_TukarshiftDao();
        if (isset($data['paramdata'])) {
            $param = Zend_Json::decode($data['paramdata']);
        }
        $hasil = $dao->getAll($project_id, $pt_id, 'filter', $data['limit'], $data['start'], $param);
                
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
        
    }
    public function getdatatukarshiftintranetRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'intranettukarshift', array(), array());
        $setup = new Hrd_Models_General_Setup();
        
        $dao_absent = new Hrd_Models_AbsentDao();
        $checkSH = $dao_absent->checkSH($setup->_project_id);
        
        $obj = new Hrd_Models_Intranet_Tukarshift();
        $data = $this->getAppData();
        $obj->setArrayTable($this->getAppData());
        $project_id = $this->getAppSession()->getProject()->getId();
        $pt_id = $this->getAppSession()->getPt()->getId();
    }
    // end added by Wulan 2021.07.19

    // added by Michael 2021.06.30
    public function parameterRead() {
        
        $data = $this->getAppData();
        if (array_key_exists("projectptid_opsi",$data) && $data['projectptid_opsi']){

            $projectptid_opsi = $data["projectptid_opsi"];
            $data['projectpt_id'] = $projectptid_opsi;
            $dao_projectpt = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao_projectpt->getProjectPtId($this->getAppSession(), $data);
            

            $dao = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao->getProjectPtId($this->getAppSession(), $data);

            $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
            $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

            $data['project_id'] = $projectid_opsi;
            $data['pt_id'] = $ptid_opsi;

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $data['project_id'] = $this->getAppSession()->getProjectId();
            $data['pt_id'] = $this->getAppSession()->getPtid();

            $dao = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao->getProject_Pt_Id($this->getAppSession(), $data);

            $data['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }

        $department     = new Hrd_Models_App_Mastertable_Department();
        $alldepartment  = $department->prosesDataWithoutSession($this->getAppSession(), TRUE, $data);
        
        $hasil = TRUE;

        $arrayRespon = array(
            "HASIL" => $hasil);
        return Box_Tools::instantRead($arrayRespon, array($alldepartment));
    }

    public function selectemployee_cutitambahanRead() {

        $data = $this->getAppData();
        if (array_key_exists("projectptid_opsi",$data) && $data['projectptid_opsi']){

            $projectptid_opsi = $data["projectptid_opsi"];
            $data['projectpt_id'] = $projectptid_opsi;

            $dao = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao->getProjectPtId($this->getAppSession(), $data);

            $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
            $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

            $data['project_id'] = $projectid_opsi;
            $data['pt_id'] = $ptid_opsi;

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $data['project_id'] = $this->getAppSession()->getProjectId();
            $data['pt_id'] = $this->getAppSession()->getPtid();

            $dao = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao->getProject_Pt_Id($this->getAppSession(), $data);

            $data['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }

        $dao = new Hrd_Models_AbsentDao();
        $success = $dao->selectemployee_cutitambahan($this->getAppSession(), $data);
        return Box_Tools::instantRead(array(
                    "SUCCESS" => $success
        ));
    }

    public function removeemployee_cutitambahanRead() {

        $data = $this->getAppData();
        if (array_key_exists("projectptid_opsi",$data) && $data['projectptid_opsi']){

            $projectptid_opsi = $data["projectptid_opsi"];
            $data['projectpt_id'] = $projectptid_opsi;

            $dao = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao->getProjectPtId($this->getAppSession(), $data);

            $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
            $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

            $data['project_id'] = $projectid_opsi;
            $data['pt_id'] = $ptid_opsi;

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $data['project_id'] = $this->getAppSession()->getProjectId();
            $data['pt_id'] = $this->getAppSession()->getPtid();

            $dao = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao->getProject_Pt_Id($this->getAppSession(), $data);

            $data['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }

        $dao = new Hrd_Models_AbsentDao();

        if($data['extraleave_id'] && $data['proses'] == 1 && $data['cancel'] == 0 && $data['employee_id']){
                        
            $check_leaveentitlements = $dao->check_leaveentitlements($this->getAppSession(), $data);
            
            if($check_leaveentitlements[0][0]['totalRow'] > 0){
                $data['rest_update'] = $check_leaveentitlements[1][0]['rest'] - $data['amount'];

                if($check_leaveentitlements[1][0]['description']){
                    $data['description'] = $check_leaveentitlements[1][0]['description'] .', '. $data['description'].' (Cancel ExtraLeaveId: '. $data['extraleave_id'].') ';

                }

                // tambah karena ada cuti policy baru 2021
                $data['leaveentitlements_id'] = $check_leaveentitlements[1][0]['leaveentitlements_id'];

                $proses = $dao->prosesupdate_cutitambahan($this->getAppSession(), $data);
                $prosesupdateemp = $dao->cancelprosesemp_cutitambahan($this->getAppSession(), $data);
            }
        }
                        
        $success = $dao->removeemployee_cutitambahan($this->getAppSession(), $data);
        return Box_Tools::instantRead(array(
                    "SUCCESS" => $success
        ));
    }

    public function viewemployee_cutitambahanRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'kelompokabsensiemployee', array(), array());
        $data = $this->getAppData();
        $dao = new Hrd_Models_AbsentDao();

        if (array_key_exists("projectptid_opsi",$data) && $data['projectptid_opsi']){

            if($data['projectptid_opsi']){

                $data['projectpt_id'] = $data['projectptid_opsi'];

                $hasil_projectpt = $dao->getProjectPtId($this->getAppSession(), $data);

                $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
                $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

                $data['project_id'] = $projectid_opsi;
                $data['pt_id'] = $ptid_opsi;

            }

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $data['project_id'] = $this->getAppSession()->getProjectId();
            $data['pt_id'] = $this->getAppSession()->getPtid();

            $hasil_projectpt = $dao->getProject_Pt_Id($this->getAppSession(), $data);

            $data['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }
           
        $hasil = $dao->getviewEmployeelist($this->getAppRequest(), $this->getAppSession(), $data);

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        return $dm;
    }
    
    public function cancelproses_cutitambahanRead() {

        $msg = 'Success..';

        $data = $this->getAppData();
        if (array_key_exists("projectptid_opsi",$data) && $data['projectptid_opsi']){

            $projectptid_opsi = $data["projectptid_opsi"];
            $data['projectpt_id'] = $projectptid_opsi;

            $dao = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao->getProjectPtId($this->getAppSession(), $data);

            $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
            $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

            $data['project_id'] = $projectid_opsi;
            $data['pt_id'] = $ptid_opsi;

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $data['project_id'] = $this->getAppSession()->getProjectId();
            $data['pt_id'] = $this->getAppSession()->getPtid();

            $dao = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao->getProject_Pt_Id($this->getAppSession(), $data);

            $data['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }

        $dao = new Hrd_Models_AbsentDao();
        if($data['extraleave_id']){
            
            $detail = $dao->getdetail_cutitambahan($this->getAppSession(), $data);
            $data['periode'] = $detail[0][0]['periode'];
            $data['leavegroup'] = $detail[0][0]['leavegroup'];
            $data['expired_date'] = $detail[0][0]['expired_date'];
            $data['amount'] = $detail[0][0]['amount'];
            $data['description'] = $detail[0][0]['description'];
            $data['proses'] = $detail[0][0]['proses'];
            $desc_form = $data['description'];
            
            $employeeIds = $dao->getviewEmployeelist_isproses($this->getAppRequest(), $this->getAppSession(), $data);
            
            if($employeeIds[1] && array_key_exists("1",$employeeIds)){
                $employeeIds = $employeeIds[1];

                foreach($employeeIds as $key => $item){
                    if($item){
                        $data['employee_id'] = $item['employee_id'];
                        $data['description'] = $desc_form;
                        $check_leaveentitlements = $dao->check_leaveentitlements($this->getAppSession(), $data);
                        
                        if($check_leaveentitlements[0][0]['totalRow'] > 0){
                            $data['rest_update'] = $check_leaveentitlements[1][0]['rest'] - $data['amount'];

                            if($check_leaveentitlements[1][0]['description']){
                                $data['description'] = $check_leaveentitlements[1][0]['description'] .', '. $data['description'].' (Cancel ExtraLeaveId: '. $data['extraleave_id'].') ';

                            }

                            // tambah karena ada cuti policy baru 2021
                            $data['leaveentitlements_id'] = $check_leaveentitlements[1][0]['leaveentitlements_id'];

                            $proses = $dao->prosesupdate_cutitambahan($this->getAppSession(), $data);
                            $prosesupdateemp = $dao->cancelprosesemp_cutitambahan($this->getAppSession(), $data);
                            $msg = "Success..";
                        }
                    }
                }

            }

            $prosesupdate = $dao->cancelproses_cutitambahan($this->getAppSession(), $data);
        }

        $arrayRespon = array("HASIL" => $prosesupdate,"MSG" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function editproses_cutitambahanRead() {
        
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'extraleave', array(), array());
        $data = $this->getAppData();
        $dao = new Hrd_Models_AbsentDao();

        if (array_key_exists("projectptid_opsi",$data) && $data['projectptid_opsi']){

            if($data['projectptid_opsi']){

                $data['projectpt_id'] = $data['projectptid_opsi'];

                $hasil_projectpt = $dao->getProjectPtId($this->getAppSession(), $data);

                $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
                $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

                $data['project_id'] = $projectid_opsi;
                $data['pt_id'] = $ptid_opsi;

            }

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $data['project_id'] = $this->getAppSession()->getProjectId();
            $data['pt_id'] = $this->getAppSession()->getPtid();

            $hasil_projectpt = $dao->getProject_Pt_Id($this->getAppSession(), $data);

            $data['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }
           
        $hasil = $dao->getdetail_cutitambahan($this->getAppSession(), $data);
        
        $arrayRespon = array("HASIL" => $hasil[0][0]);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function editprosesemployee_cutitambahanRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'kelompokabsensiemployee', array(), array());
        $data = $this->getAppData();
        $dao = new Hrd_Models_AbsentDao();

        if (array_key_exists("projectptid_opsi",$data) && $data['projectptid_opsi']){

            if($data['projectptid_opsi']){

                $data['projectpt_id'] = $data['projectptid_opsi'];

                $hasil_projectpt = $dao->getProjectPtId($this->getAppSession(), $data);

                $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
                $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

                $data['project_id'] = $projectid_opsi;
                $data['pt_id'] = $ptid_opsi;

            }

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $data['project_id'] = $this->getAppSession()->getProjectId();
            $data['pt_id'] = $this->getAppSession()->getPtid();

            $hasil_projectpt = $dao->getProject_Pt_Id($this->getAppSession(), $data);

            $data['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }
           
        $hasil = $dao->getviewEmployeelist($this->getAppRequest(), $this->getAppSession(), $data);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        return $dm;
    }

    public function savebutcancel_cutitambahanRead() {

        $hasil = FALSE;
        $params = $this->getAppData();
        $dao = new Hrd_Models_AbsentDao();
        $ses = $this->getAppSession();
        $msg = "...";
        $jenisError = 0;
        $confirmed = FALSE; 
        $proses = 0;
        $empproses = 0;

        $data = $this->getAppData();

        $confirmed = array_key_exists("confirmed", $data);

        if (array_key_exists("projectptid_opsi",$data) && $data['projectptid_opsi']){

            if($data['projectptid_opsi']){

                $data['projectpt_id'] = $data['projectptid_opsi'];

                $hasil_projectpt = $dao->getProjectPtId($this->getAppSession(), $data);

                $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
                $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

                $data['project_id'] = $projectid_opsi;
                $data['pt_id'] = $ptid_opsi;

            }

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $data['project_id'] = $this->getAppSession()->getProjectId();
            $data['pt_id'] = $this->getAppSession()->getPtid();

            $hasil_projectpt = $dao->getProject_Pt_Id($this->getAppSession(), $data);

            $data['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }

        $isValid = false;
        /// validasi 
        if (!array_key_exists("extraleave_id",$data) && !$data['extraleave_id']) {
            $msg = "Extra Leave Id null";
        } else if (!array_key_exists("periode",$data) && !$data['periode']) {
            $msg = "Periode null";
        } else if (!array_key_exists("leavegroup",$data) && !$data['leavegroup']) {
            $msg = "Leave Group null";
        } else if (!array_key_exists("expired_date",$data) && !$data['expired_date']) {
            $msg = "Expired Date null";
        } else if (!array_key_exists("amount",$data) && !$data['amount'] && !is_numeric($data['amount'])) {
            $msg = "Leave Entitlements null / Leave Entitlements bukan angka";
        } else if (!array_key_exists("description",$data) && !$data['description']) {
            $msg = "Description Date null";
        } else {
            $isValid = true;
        }
        /// end validasi

        if ($isValid) {

            $dao = new Hrd_Models_AbsentDao();
            $desc_form = $data['description'];
            //employee yg di cancel tp sudah diproses
            $check_proses_empcancel = $dao->check_proses_empcancel($this->getAppSession(), $data);

            if($check_proses_empcancel[0] && array_key_exists("0",$check_proses_empcancel[0])){
                foreach($check_proses_empcancel[0] as $key => $item){
                    if($item && $item['proses'] == 1){
                        $data['employee_id'] = $item['employee_id'];
                        $data['description'] = $desc_form;
                        $check_leaveentitlements = $dao->check_leaveentitlements($this->getAppSession(), $data);

                        if($check_leaveentitlements[0][0]['totalRow'] > 0){
                            $data['rest_update'] = $check_leaveentitlements[1][0]['rest'] - $data['amount'];

                            if($check_leaveentitlements[1][0]['description']){
                                $data['description'] = $check_leaveentitlements[1][0]['description'] .', '. $data['description'].' (Cancel ExtraLeaveId: '. $data['extraleave_id'].') ';

                            }

                            // tambah karena ada cuti policy baru 2021
                            $data['leaveentitlements_id'] = $check_leaveentitlements[1][0]['leaveentitlements_id'];

                            $proses = $dao->prosesupdate_cutitambahan($this->getAppSession(), $data);
                            $prosesupdateemp = $dao->cancelprosesemp_cutitambahan($this->getAppSession(), $data);
                        }
                    }
                }
            }

            $proses = $dao->cancelproses_cutitambahan($this->getAppSession(), $data);
            $msg = "Success..";

        }
        

        $arrayRespon = array("HASIL" => $proses,"MSG" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }
    // end added by Michael 2021.06.30 

    // added by Michael 2021.07.16 
    public function sanksiketerlambatanRead() {

        $hasil = FALSE;
        $params = $this->getAppData();
        $dao = new Hrd_Models_AbsentDao();
        $ses = $this->getAppSession();
        $msg = "...";
        $jenisError = 0;
        $confirmed = FALSE; 
        $proses = 0;
        $empproses = 0;

        $data = $this->getAppData();

        $confirmed = array_key_exists("confirmed", $data);

        if (array_key_exists("projectptid_opsi",$data) && $data['projectptid_opsi']){

            if($data['projectptid_opsi']){

                $data['projectpt_id'] = $data['projectptid_opsi'];

                $hasil_projectpt = $dao->getProjectPtId($this->getAppSession(), $data);

                $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
                $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

                $data['project_id'] = $projectid_opsi;
                $data['pt_id'] = $ptid_opsi;

            }

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $data['project_id'] = $this->getAppSession()->getProjectId();
            $data['pt_id'] = $this->getAppSession()->getPtid();

            $hasil_projectpt = $dao->getProject_Pt_Id($this->getAppSession(), $data);

            $data['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }

        $isValid = false;
        /// validasi 
        if (!array_key_exists("sanksiketerlambatan_id",$data) && !$data['sanksiketerlambatan_id']) {
            $msg = "Sanksi Keterlambatan Id null";
        } else if (!array_key_exists("periode",$data) && !$data['periode']) {
            $msg = "Periode null";
        } else if (!array_key_exists("periode_month",$data) && !$data['periode_month']) {
            $msg = "Month null";
        }  else if (!array_key_exists("amount",$data) && !$data['amount'] && !is_numeric($data['amount'])) {
            $msg = "Leave Entitlements null / Leave Entitlements bukan angka";
        } else if (!array_key_exists("description",$data) && !$data['description']) {
            $msg = "Description Date null";
        } else if (!array_key_exists("ids",$data) && !$data['ids']) {
            $msg = "Employee null";
        } else {
            $isValid = true;
        }
        /// end validasi

        if ($isValid) {

            $dao = new Hrd_Models_AbsentDao();
            $employeeIds = explode("~", $data["ids"]);
            
            $desc_form = $data['description'];
            $amount_form = $data['amount'];

            //employee yg dipilih
            foreach($employeeIds as $key => $item){
                if($item){
                    $amount_sanksiketerlambatan = 0;
                    $total_sanksiketerlambatan = 0;
                    $data['amount'] = $amount_form;
                    $temp_item_leaveentitlements = '';
                    $last_key_item_leaveentitlements = 0;

                    $data['employee_id'] = $item;
                    $data['description'] = $desc_form;
                    $check_proses = $dao->check_proses_sanksiketerlambatan($this->getAppSession(), $data);

                    if($check_proses[0] && array_key_exists("0",$check_proses[0])){
                        if($check_proses[0][0]['proses'] == 0){
                            
                            //check urutan cuti yg dari dulu
                            $check_leaveentitlements_order = $dao->check_leaveentitlements_sanksiketerlambatan_order($this->getAppSession(), $data);
                            $item_leaveentitlements_choose = '';

                            if($check_leaveentitlements_order[0] && array_key_exists("0",$check_leaveentitlements_order[0]) && $check_leaveentitlements_order[0][0]['totalRow'] > 0){

                                $item_leaveentitlements = $check_leaveentitlements_order[1];

                                $temp_item_leaveentitlements = $item_leaveentitlements;
                                end($temp_item_leaveentitlements);
                                $last_key_item_leaveentitlements = key($temp_item_leaveentitlements);

                                foreach($item_leaveentitlements as $key_item => $item_item){
                                    
                                    //CEK ini cuma 1 record/banyak
                                    if($last_key_item_leaveentitlements > 0){
                                        if($item_item['rest'] > 0 && empty($item_leaveentitlements_choose)){
                                            if($item_item['rest'] < $data['amount']){
                                                $item_leaveentitlements_choose[] = $item_item;
                                                $item_leaveentitlements_choose[] = $item_leaveentitlements[$key_item+1];
                                            }else{
                                                $item_leaveentitlements_choose[] = $item_item;
                                            }
                                        }
                                    }else{
                                            $item_leaveentitlements_choose[] = $item_item;
                                    }
                                }

                                //JIKA BANYAK LEAVEENTITLEMENTS TAPI 0 semua, tidak masuk ke yg atas, ambil record terakhir
                                if($last_key_item_leaveentitlements > 0 && empty($item_leaveentitlements_choose)){
                                    for ($i=$last_key_item_leaveentitlements; $i >= 0 ; $i--) { 
                                        if($item_leaveentitlements[$i]['rest'] <= 0 && 
                                            $item_leaveentitlements[$i]['leavegroup'] == 1 &&
                                            empty($item_leaveentitlements_choose)){
                                            
                                            $item_leaveentitlements_choose[] = $item_leaveentitlements[$i];
                                        }
                                    }
                                }
                            }

                            //setelah tau pakai cuti yg mana, baru execute
                            if($item_leaveentitlements_choose){
                            
                                $amount_sanksiketerlambatan = 0;
                                $total_sanksiketerlambatan = $data['amount'];
                                
                                foreach($item_leaveentitlements_choose as $key_choose => $item_choose){
                                    
                                    if($total_sanksiketerlambatan > 0){

                                        $count_sanksiketerlambatan = $item_choose['rest'] - $total_sanksiketerlambatan;
                                        
                                        if($item_choose['rest'] <= 0){
                                            $amount_sanksiketerlambatan = $total_sanksiketerlambatan;
                                        }else{
                                            if($count_sanksiketerlambatan < 0){
                                                $amount_sanksiketerlambatan = $item_choose['rest'];
                                                $total_sanksiketerlambatan = $total_sanksiketerlambatan - $amount_sanksiketerlambatan;
                                            }else{
                                                $amount_sanksiketerlambatan = $total_sanksiketerlambatan;
                                            }
                                        }

                                        $data['periode'] = $item_choose['start_use'];
                                        $data['leavegroup'] = $item_choose['leavegroup'];
                                        $data['leaveentitlements_id'] = $item_choose['leaveentitlements_id'];
                                        $data['amount_sanksiketerlambatan'] = $amount_sanksiketerlambatan;
                                        $data['description'] = $desc_form;

                                        $check_leaveentitlements = $dao->check_leaveentitlements_sanksiketerlambatan($this->getAppSession(), $data);

                                        if($check_leaveentitlements[0][0]['totalRow'] > 0){
                                            $data['rest_update'] = $check_leaveentitlements[1][0]['rest'] - $amount_sanksiketerlambatan;
                                            $data['description'] = $data['description'].' (SanksiKeterlambatanId: '. $data['sanksiketerlambatan_id'].') ';

                                            if($check_leaveentitlements[1][0]['description']){
                                                $data['description'] = $check_leaveentitlements[1][0]['description'] .', '. $data['description'];
                                            }

                                            $proses = $dao->prosesupdate_sanksiketerlambatan($this->getAppSession(), $data);
                                            $proses_create = $dao->proses_sanksiketerlambatan_leaveentitlements($this->getAppSession(), $data);
                                            $msg = "Success..";
                                            $empproses++;
                                        }
                                    }
                                }
                            }else{
                                $amount_minus = '-'.$data['amount'];
                                $data['amount'] = $amount_minus;

                                $data['leavegroup'] = 1;
                                $data['expired_date'] = ($data['periode'] + 1).'-12-31';
                                $data['description'] = $desc_form;
                                $data['amount_sanksiketerlambatan'] = $amount_minus;

                                $proses = $dao->prosescreate_sanksiketerlambatan($this->getAppSession(), $data);
                                
                                $data['leaveentitlements_id'] = $proses;

                                $proses_create = $dao->proses_sanksiketerlambatan_leaveentitlements($this->getAppSession(), $data);
                                $msg = "Success..";
                                $empproses++;
                            }

                            // $check_leaveentitlements = $dao->check_leaveentitlements_sanksiketerlambatan($this->getAppSession(), $data);

                            // if($check_leaveentitlements[0][0]['totalRow'] > 0){
                            //     $data['rest_update'] = $check_leaveentitlements[1][0]['rest'] - $data['amount'];
                            //     $data['description'] = $data['description'].' (SanksiKeterlambatanId: '. $data['sanksiketerlambatan_id'].') ';

                            //     if($check_leaveentitlements[1][0]['description']){
                            //         $data['description'] = $check_leaveentitlements[1][0]['description'] .', '. $data['description'];
                            //     }

                            //     $proses = $dao->prosesupdate_sanksiketerlambatan($this->getAppSession(), $data);
                            //     $msg = "Success..";
                            // }else{
                            //     $proses = $dao->prosescreate_sanksiketerlambatan($this->getAppSession(), $data);
                            //     $msg = "Success..";
                            // }

                            // $empproses++;
                        }
                    }
                }
            }

            //employee yg di cancel tp sudah diproses
            $check_proses_empcancel = $dao->check_proses_empcancel_sanksiketerlambatan($this->getAppSession(), $data);

            if($check_proses_empcancel[0] && array_key_exists("0",$check_proses_empcancel[0])){
                foreach($check_proses_empcancel[0] as $key => $item){
                    if($item && $item['proses'] == 1){
                        $data['employee_id'] = $item['employee_id'];
                        $data['description'] = $desc_form;

                        $get_sanksiketerlambatan_leaveentitlements_use = $dao->get_sanksiketerlambatan_leaveentitlements_use($this->getAppSession(), $data);

                        if($get_sanksiketerlambatan_leaveentitlements_use[0][0]['totalRow'] > 0){
                            foreach($get_sanksiketerlambatan_leaveentitlements_use[1] as $key_item => $item_item){

                                $data['leaveentitlements_id'] = $item_item['leaveentitlements_id'];
                                $check_leaveentitlements = $dao->check_leaveentitlements_sanksiketerlambatan_id($this->getAppSession(), $data);

                                if($check_leaveentitlements[0][0]['totalRow'] > 0){
                                    $data['periode'] = $item_item['periode'];
                                    $data['leavegroup'] = $item_item['leavegroup'];

                                    if($item_item['amount'] < 0){
                                        $item_item['amount'] = abs($item_item['amount']);
                                    }

                                    $data['rest_update'] = $check_leaveentitlements[1][0]['rest'] + $item_item['amount'];

                                    if($check_leaveentitlements[1][0]['description']){
                                        $data['description'] = $check_leaveentitlements[1][0]['description'] .', '. $data['description'].' (Cancel SanksiKeterlambatanId: '. $data['sanksiketerlambatan_id'].') ';

                                    }

                                    $proses = $dao->prosesupdate_sanksiketerlambatan($this->getAppSession(), $data);
                                    $proses_update = $dao->prosesupdate_sanksiketerlambatan_leaveentitlements($this->getAppSession(), $data);
                                    $prosesupdateemp = $dao->cancelprosesemp_sanksiketerlambatan($this->getAppSession(), $data);
                                }
                            }
                        }

                        // $check_leaveentitlements = $dao->check_leaveentitlements_sanksiketerlambatan($this->getAppSession(), $data);

                        // if($check_leaveentitlements[0][0]['totalRow'] > 0){
                        //     $data['rest_update'] = $check_leaveentitlements[1][0]['rest'] - $data['amount'];

                        //     if($check_leaveentitlements[1][0]['description']){
                        //         $data['description'] = $check_leaveentitlements[1][0]['description'] .', '. $data['description'].' (Cancel SanksiKeterlambatanId: '. $data['sanksiketerlambatan_id'].') ';

                        //     }

                        //     $proses = $dao->prosesupdate_sanksiketerlambatan($this->getAppSession(), $data);
                        //     $prosesupdateemp = $dao->cancelprosesemp_sanksiketerlambatan($this->getAppSession(), $data);
                        // }
                    }
                }
            }

            $proses = $dao->prosesupdate_isproses_sanksiketerlambatan($this->getAppSession(), $data);

            if($empproses == 0 ){
                $msg = "Success, tapi tidak ada employee baru yg harus diproses..";
            }else{
                $msg = "Success..";
            }
        }
        

        $arrayRespon = array("HASIL" => $proses,"MSG" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function saveheader_sanksiketerlambatanRead() {
        
        $data = $this->getAppData();
        $dao = new Hrd_Models_AbsentDao();

        if (array_key_exists("projectptid_opsi",$data) && $data['projectptid_opsi']){

            if($data['projectptid_opsi']){

                $data['projectpt_id'] = $data['projectptid_opsi'];

                $hasil_projectpt = $dao->getProjectPtId($this->getAppSession(), $data);

                $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
                $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

                $data['project_id'] = $projectid_opsi;
                $data['pt_id'] = $ptid_opsi;

            }

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $data['project_id'] = $this->getAppSession()->getProjectId();
            $data['pt_id'] = $this->getAppSession()->getPtid();

            $hasil_projectpt = $dao->getProject_Pt_Id($this->getAppSession(), $data);

            $data['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }

        if($data['sanksiketerlambatan_id']){
            $hasil = $dao->updateheader_sanksiketerlambatan($this->getAppSession(), $data);
        }else{
            $hasil = $dao->saveheader_sanksiketerlambatan($this->getAppSession(), $data);
        }

        if($hasil){
            $msg = "success";
        }else{
            $msg = "error";
        }

        $arrayRespon = array("hasil" => $hasil, "msg" => $msg);
        return Box_Tools::instantRead($arrayRespon);

    }
    public function employeelist_sanksiketerlambatanRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'kelompokabsensiemployee', array(), array());
        $data = $this->getAppData();
        $dao = new Hrd_Models_AbsentDao();

        if (array_key_exists("projectptid_opsi",$data) && $data['projectptid_opsi']){

            if($data['projectptid_opsi']){

                $data['projectpt_id'] = $data['projectptid_opsi'];

                $hasil_projectpt = $dao->getProjectPtId($this->getAppSession(), $data);

                $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
                $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

                $data['project_id'] = $projectid_opsi;
                $data['pt_id'] = $ptid_opsi;

            }

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $data['project_id'] = $this->getAppSession()->getProjectId();
            $data['pt_id'] = $this->getAppSession()->getPtid();

            $hasil_projectpt = $dao->getProject_Pt_Id($this->getAppSession(), $data);

            $data['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }
           
        $hasil = $dao->getEmployeelist_sanksiketerlambatan($this->getAppRequest(), $this->getAppSession(), $data);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    public function loglist_sanksiketerlambatanRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'sanksiketerlambatan', array(), array());
        $data = $this->getAppData();
        $dao = new Hrd_Models_AbsentDao();

        if (array_key_exists("projectptid_opsi",$data) && $data['projectptid_opsi']){

            if($data['projectptid_opsi']){

                $data['projectpt_id'] = $data['projectptid_opsi'];

                $hasil_projectpt = $dao->getProjectPtId($this->getAppSession(), $data);

                $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
                $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

                $data['project_id'] = $projectid_opsi;
                $data['pt_id'] = $ptid_opsi;

            }

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $data['project_id'] = $this->getAppSession()->getProjectId();
            $data['pt_id'] = $this->getAppSession()->getPtid();

            $hasil_projectpt = $dao->getProject_Pt_Id($this->getAppSession(), $data);

            $data['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }
           
        $hasil = $dao->getLoglist_sanksiketerlambatan($this->getAppRequest(), $this->getAppSession(), $data);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function parameter_sanksiketerlambatanRead() {
        
        $data = $this->getAppData();
        if (array_key_exists("projectptid_opsi",$data) && $data['projectptid_opsi']){

            $projectptid_opsi = $data["projectptid_opsi"];
            $data['projectpt_id'] = $projectptid_opsi;

            $dao = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao->getProjectPtId($this->getAppSession(), $data);

            $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
            $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

            $data['project_id'] = $projectid_opsi;
            $data['pt_id'] = $ptid_opsi;

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $data['project_id'] = $this->getAppSession()->getProjectId();
            $data['pt_id'] = $this->getAppSession()->getPtid();

            $dao = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao->getProject_Pt_Id($this->getAppSession(), $data);

            $data['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }

        $department     = new Hrd_Models_App_Mastertable_Department();
        $alldepartment  = $department->prosesDataWithoutSession($this->getAppSession(), TRUE, $data);
        
        $hasil = TRUE;

        $arrayRespon = array(
            "HASIL" => $hasil);
        return Box_Tools::instantRead($arrayRespon, array($alldepartment));
    }

    public function selectemployee_sanksiketerlambatanRead() {

        $data = $this->getAppData();
        if (array_key_exists("projectptid_opsi",$data) && $data['projectptid_opsi']){

            $projectptid_opsi = $data["projectptid_opsi"];
            $data['projectpt_id'] = $projectptid_opsi;

            $dao = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao->getProjectPtId($this->getAppSession(), $data);

            $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
            $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

            $data['project_id'] = $projectid_opsi;
            $data['pt_id'] = $ptid_opsi;

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $data['project_id'] = $this->getAppSession()->getProjectId();
            $data['pt_id'] = $this->getAppSession()->getPtid();

            $dao = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao->getProject_Pt_Id($this->getAppSession(), $data);

            $data['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }

        $dao = new Hrd_Models_AbsentDao();
        $success = $dao->selectemployee_sanksiketerlambatan($this->getAppSession(), $data);
        return Box_Tools::instantRead(array(
                    "SUCCESS" => $success
        ));
    }

    public function removeemployee_sanksiketerlambatanRead() {

        $data = $this->getAppData();
        if (array_key_exists("projectptid_opsi",$data) && $data['projectptid_opsi']){

            $projectptid_opsi = $data["projectptid_opsi"];
            $data['projectpt_id'] = $projectptid_opsi;

            $dao = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao->getProjectPtId($this->getAppSession(), $data);

            $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
            $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

            $data['project_id'] = $projectid_opsi;
            $data['pt_id'] = $ptid_opsi;

            $project_id = $projectid_opsi;
            $pt_id = $ptid_opsi;
            $checkSH = $dao->checkSH($project_id);

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $data['project_id'] = $this->getAppSession()->getProjectId();
            $data['pt_id'] = $this->getAppSession()->getPtid();

            $dao = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao->getProject_Pt_Id($this->getAppSession(), $data);

            $data['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }

        $dao = new Hrd_Models_AbsentDao();

        if($data['sanksiketerlambatan_id'] && $data['proses'] == 1 && $data['cancel'] == 0 && $data['employee_id']){
            
            $get_sanksiketerlambatan_leaveentitlements_use = $dao->get_sanksiketerlambatan_leaveentitlements_use($this->getAppSession(), $data);

                        if($get_sanksiketerlambatan_leaveentitlements_use[0][0]['totalRow'] > 0){
                            foreach($get_sanksiketerlambatan_leaveentitlements_use[1] as $key_item => $item_item){

                                $data['leaveentitlements_id'] = $item_item['leaveentitlements_id'];
                                $check_leaveentitlements = $dao->check_leaveentitlements_sanksiketerlambatan_id($this->getAppSession(), $data);

                                if($check_leaveentitlements[0][0]['totalRow'] > 0){
                                    $data['periode'] = $item_item['periode'];
                                    $data['leavegroup'] = $item_item['leavegroup'];

                                    if($item_item['amount'] < 0){
                                        $item_item['amount'] = abs($item_item['amount']);
                                    }

                                    $data['rest_update'] = $check_leaveentitlements[1][0]['rest'] + $item_item['amount'];

                                    if($check_leaveentitlements[1][0]['description']){
                                        $data['description'] = $check_leaveentitlements[1][0]['description'] .', '. $data['description'].' (Cancel SanksiKeterlambatanId: '. $data['sanksiketerlambatan_id'].') ';

                                    }

                                    $proses = $dao->prosesupdate_sanksiketerlambatan($this->getAppSession(), $data);
                                    $proses_update = $dao->prosesupdate_sanksiketerlambatan_leaveentitlements($this->getAppSession(), $data);
                                    $prosesupdateemp = $dao->cancelprosesemp_sanksiketerlambatan($this->getAppSession(), $data);
                                }
                            }
                        }

            // $check_leaveentitlements = $dao->check_leaveentitlements_sanksiketerlambatan($this->getAppSession(), $data);
            
            // if($check_leaveentitlements[0][0]['totalRow'] > 0){
            //     $data['rest_update'] = $check_leaveentitlements[1][0]['rest'] - $data['amount'];

            //     if($check_leaveentitlements[1][0]['description']){
            //         $data['description'] = $check_leaveentitlements[1][0]['description'] .', '. $data['description'].' (Cancel SanksiKeterlambatanId: '. $data['sanksiketerlambatan_id'].') ';

            //     }

            //     $proses = $dao->prosesupdate_sanksiketerlambatan($this->getAppSession(), $data);
            //     $prosesupdateemp = $dao->cancelprosesemp_sanksiketerlambatan($this->getAppSession(), $data);
            // }

        }
                        
        $success = $dao->removeemployee_sanksiketerlambatan($this->getAppSession(), $data);
        return Box_Tools::instantRead(array(
                    "SUCCESS" => $success
        ));
    }

    public function viewemployee_sanksiketerlambatanRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'kelompokabsensiemployee', array(), array());
        $data = $this->getAppData();
        $dao = new Hrd_Models_AbsentDao();

        if (array_key_exists("projectptid_opsi",$data) && $data['projectptid_opsi']){

            if($data['projectptid_opsi']){

                $data['projectpt_id'] = $data['projectptid_opsi'];

                $hasil_projectpt = $dao->getProjectPtId($this->getAppSession(), $data);

                $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
                $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

                $data['project_id'] = $projectid_opsi;
                $data['pt_id'] = $ptid_opsi;

            }

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $data['project_id'] = $this->getAppSession()->getProjectId();
            $data['pt_id'] = $this->getAppSession()->getPtid();

            $hasil_projectpt = $dao->getProject_Pt_Id($this->getAppSession(), $data);

            $data['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }
           
        $hasil = $dao->getviewEmployeelist_sanksiketerlambatan($this->getAppRequest(), $this->getAppSession(), $data);

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        return $dm;
    }
    
    public function cancelproses_sanksiketerlambatanRead() {

        $msg = 'Success..';

        $data = $this->getAppData();
        if (array_key_exists("projectptid_opsi",$data) && $data['projectptid_opsi']){

            $projectptid_opsi = $data["projectptid_opsi"];
            $data['projectpt_id'] = $projectptid_opsi;

            $dao = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao->getProjectPtId($this->getAppSession(), $data);

            $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
            $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

            $data['project_id'] = $projectid_opsi;
            $data['pt_id'] = $ptid_opsi;

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $data['project_id'] = $this->getAppSession()->getProjectId();
            $data['pt_id'] = $this->getAppSession()->getPtid();

            $dao_projectpt = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao_projectpt->getProject_Pt_Id($this->getAppSession(), $data);
        
            $dao = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao->getProject_Pt_Id($this->getAppSession(), $data);

            $data['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }

        // end added by Michael 2021.05.19 
        
        //$dao = new Hrd_Models_Intranet_TukarshiftDao();
        //$hasil = $dao->getAll2($project_id, $pt_id, 'filter', $data['limit'], $data['start'], $data['paramdata']);

        $dao = new Hrd_Models_AbsentDao();
        if($data['sanksiketerlambatan_id']){
            
            $detail = $dao->getdetail_sanksiketerlambatan($this->getAppSession(), $data);
            $data['periode'] = $detail[0][0]['periode'];
            $data['periode_month'] = $detail[0][0]['periode_month'];
            $data['amount'] = $detail[0][0]['amount'];
            $data['description'] = $detail[0][0]['description'];
            $data['proses'] = $detail[0][0]['proses'];
            $desc_form = $data['description'];
            
            $employeeIds = $dao->getviewEmployeelist_isproses_sanksiketerlambatan($this->getAppRequest(), $this->getAppSession(), $data);
            
            if($employeeIds[1] && array_key_exists("1",$employeeIds)){
                $employeeIds = $employeeIds[1];

                foreach($employeeIds as $key => $item){
                    if($item){
                        $data['employee_id'] = $item['employee_id'];
                        $data['description'] = $desc_form;

                        $get_sanksiketerlambatan_leaveentitlements_use = $dao->get_sanksiketerlambatan_leaveentitlements_use($this->getAppSession(), $data);

                        if($get_sanksiketerlambatan_leaveentitlements_use[0][0]['totalRow'] > 0){
                            foreach($get_sanksiketerlambatan_leaveentitlements_use[1] as $key_item => $item_item){

                                $data['leaveentitlements_id'] = $item_item['leaveentitlements_id'];
                                $check_leaveentitlements = $dao->check_leaveentitlements_sanksiketerlambatan_id($this->getAppSession(), $data);

                                if($check_leaveentitlements[0][0]['totalRow'] > 0){
                                    $data['periode'] = $item_item['periode'];
                                    $data['leavegroup'] = $item_item['leavegroup'];
                                    
                                    if($item_item['amount'] < 0){
                                        $item_item['amount'] = abs($item_item['amount']);
                                    }

                                    $data['rest_update'] = $check_leaveentitlements[1][0]['rest'] + $item_item['amount'];
                                    
                                    if($check_leaveentitlements[1][0]['description']){
                                        $data['description'] = $check_leaveentitlements[1][0]['description'] .', '. $data['description'].' (Cancel SanksiKeterlambatanId: '. $data['sanksiketerlambatan_id'].') ';

                                    }

                                    $proses = $dao->prosesupdate_sanksiketerlambatan($this->getAppSession(), $data);
                                    $proses_update = $dao->prosesupdate_sanksiketerlambatan_leaveentitlements($this->getAppSession(), $data);
                                    $prosesupdateemp = $dao->cancelprosesemp_sanksiketerlambatan($this->getAppSession(), $data);
                                }
                            }
                        }

                        // $check_leaveentitlements = $dao->check_leaveentitlements_sanksiketerlambatan($this->getAppSession(), $data);
                        
                        // if($check_leaveentitlements[0][0]['totalRow'] > 0){
                        //     $data['rest_update'] = $check_leaveentitlements[1][0]['rest'] - $data['amount'];

                        //     if($check_leaveentitlements[1][0]['description']){
                        //         $data['description'] = $check_leaveentitlements[1][0]['description'] .', '. $data['description'].' (Cancel SanksiKeterlambatanId: '. $data['sanksiketerlambatan_id'].') ';

                        //     }

                        //     $proses = $dao->prosesupdate_sanksiketerlambatan($this->getAppSession(), $data);
                        //     $prosesupdateemp = $dao->cancelprosesemp_sanksiketerlambatan($this->getAppSession(), $data);
                        //     $msg = "Success..";
                        // }
                    }
                }

            }

            $prosesupdate = $dao->cancelproses_sanksiketerlambatan($this->getAppSession(), $data);
        }

        $arrayRespon = array("HASIL" => $prosesupdate,"MSG" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function editproses_sanksiketerlambatanRead() {
        
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'extraleave', array(), array());
        $data = $this->getAppData();
        $dao = new Hrd_Models_AbsentDao();

        if (array_key_exists("projectptid_opsi",$data) && $data['projectptid_opsi']){

            if($data['projectptid_opsi']){

                $data['projectpt_id'] = $data['projectptid_opsi'];

                $hasil_projectpt = $dao->getProjectPtId($this->getAppSession(), $data);

                $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
                $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

                $data['project_id'] = $projectid_opsi;
                $data['pt_id'] = $ptid_opsi;

            }

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $data['project_id'] = $this->getAppSession()->getProjectId();
            $data['pt_id'] = $this->getAppSession()->getPtid();

            $hasil_projectpt = $dao->getProject_Pt_Id($this->getAppSession(), $data);

            $data['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }
           
        $hasil = $dao->getdetail_sanksiketerlambatan($this->getAppSession(), $data);
        
        $arrayRespon = array("HASIL" => $hasil[0][0]);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function editprosesemployee_sanksiketerlambatanRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'kelompokabsensiemployee', array(), array());
        $data = $this->getAppData();
        $dao = new Hrd_Models_AbsentDao();

        if (array_key_exists("projectptid_opsi",$data) && $data['projectptid_opsi']){

            if($data['projectptid_opsi']){

                $data['projectpt_id'] = $data['projectptid_opsi'];

                $hasil_projectpt = $dao->getProjectPtId($this->getAppSession(), $data);

                $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
                $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

                $data['project_id'] = $projectid_opsi;
                $data['pt_id'] = $ptid_opsi;

            }

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $data['project_id'] = $this->getAppSession()->getProjectId();
            $data['pt_id'] = $this->getAppSession()->getPtid();

            $hasil_projectpt = $dao->getProject_Pt_Id($this->getAppSession(), $data);

            $data['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }
           
        $hasil = $dao->getviewEmployeelist_sanksiketerlambatan($this->getAppRequest(), $this->getAppSession(), $data);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        return $dm;
    }

    public function savebutcancel_sanksiketerlambatanRead() {

        $hasil = FALSE;
        $params = $this->getAppData();
        $dao = new Hrd_Models_AbsentDao();
        $ses = $this->getAppSession();
        $msg = "...";
        $jenisError = 0;
        $confirmed = FALSE; 
        $proses = 0;
        $empproses = 0;

        $data = $this->getAppData();

        $confirmed = array_key_exists("confirmed", $data);

        if (array_key_exists("projectptid_opsi",$data) && $data['projectptid_opsi']){

            if($data['projectptid_opsi']){

                $data['projectpt_id'] = $data['projectptid_opsi'];

                $hasil_projectpt = $dao->getProjectPtId($this->getAppSession(), $data);

                $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
                $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

                $data['project_id'] = $projectid_opsi;
                $data['pt_id'] = $ptid_opsi;

            }

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $data['project_id'] = $this->getAppSession()->getProjectId();
            $data['pt_id'] = $this->getAppSession()->getPtid();

            $hasil_projectpt = $dao->getProject_Pt_Id($this->getAppSession(), $data);

            $data['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }

        $isValid = false;
        /// validasi 
        if (!array_key_exists("sanksiketerlambatan_id",$data) && !$data['extraleave_id']) {
            $msg = "Sanksi Keterlambatan Id null";
        } else if (!array_key_exists("periode",$data) && !$data['periode']) {
            $msg = "Periode null";
        } else if (!array_key_exists("periode_month",$data) && !$data['periode_month']) {
            $msg = "Month null";
        }  else if (!array_key_exists("amount",$data) && !$data['amount'] && !is_numeric($data['amount'])) {
            $msg = "Leave Entitlements null / Leave Entitlements bukan angka";
        } else if (!array_key_exists("description",$data) && !$data['description']) {
            $msg = "Description Date null";
        } else {
            $isValid = true;
        }
        /// end validasi

        if ($isValid) {

            $dao = new Hrd_Models_AbsentDao();
            $desc_form = $data['description'];
            //employee yg di cancel tp sudah diproses
            $check_proses_empcancel = $dao->check_proses_empcancel_sanksiketerlambatan($this->getAppSession(), $data);

            if($check_proses_empcancel[0] && array_key_exists("0",$check_proses_empcancel[0])){
                foreach($check_proses_empcancel[0] as $key => $item){
                    if($item && $item['proses'] == 1){
                        $data['employee_id'] = $item['employee_id'];
                        $data['description'] = $desc_form;

                        $get_sanksiketerlambatan_leaveentitlements_use = $dao->get_sanksiketerlambatan_leaveentitlements_use($this->getAppSession(), $data);

                        if($get_sanksiketerlambatan_leaveentitlements_use[0][0]['totalRow'] > 0){
                            foreach($get_sanksiketerlambatan_leaveentitlements_use[1] as $key_item => $item_item){

                                $data['leaveentitlements_id'] = $item_item['leaveentitlements_id'];
                                $check_leaveentitlements = $dao->check_leaveentitlements_sanksiketerlambatan_id($this->getAppSession(), $data);

                                if($check_leaveentitlements[0][0]['totalRow'] > 0){
                                    $data['periode'] = $item_item['periode'];
                                    $data['leavegroup'] = $item_item['leavegroup'];

                                    if($item_item['amount'] < 0){
                                        $item_item['amount'] = abs($item_item['amount']);
                                    }
                                    
                                    $data['rest_update'] = $check_leaveentitlements[1][0]['rest'] + $item_item['amount'];

                                    if($check_leaveentitlements[1][0]['description']){
                                        $data['description'] = $check_leaveentitlements[1][0]['description'] .', '. $data['description'].' (Cancel SanksiKeterlambatanId: '. $data['sanksiketerlambatan_id'].') ';

                                    }

                                    $proses = $dao->prosesupdate_sanksiketerlambatan($this->getAppSession(), $data);
                                    $proses_update = $dao->prosesupdate_sanksiketerlambatan_leaveentitlements($this->getAppSession(), $data);
                                    $prosesupdateemp = $dao->cancelprosesemp_sanksiketerlambatan($this->getAppSession(), $data);
                                }
                            }
                        }

                        // $check_leaveentitlements = $dao->check_leaveentitlements_sanksiketerlambatan($this->getAppSession(), $data);

                        // if($check_leaveentitlements[0][0]['totalRow'] > 0){
                        //     $data['rest_update'] = $check_leaveentitlements[1][0]['rest'] - $data['amount'];

                        //     if($check_leaveentitlements[1][0]['description']){
                        //         $data['description'] = $check_leaveentitlements[1][0]['description'] .', '. $data['description'].' (Cancel SanksiKeterlambatanId: '. $data['sanksiketerlambatan_id'].') ';

                        //     }

                        //     $proses = $dao->prosesupdate_sanksiketerlambatan($this->getAppSession(), $data);
                        //     $prosesupdateemp = $dao->cancelprosesemp_sanksiketerlambatan($this->getAppSession(), $data);
                        // }
                    }
                }
            }

            $proses = $dao->cancelproses_sanksiketerlambatan($this->getAppSession(), $data);
            $msg = "Success..";

        }
        

        $arrayRespon = array("HASIL" => $proses,"MSG" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function employeesanksiketerlambatanRead() {

        $data = $this->getAppData();

        if (array_key_exists("projectptid_opsi",$data) && $data['projectptid_opsi']){

            $projectptid_opsi = $data["projectptid_opsi"];
            $data['projectpt_id'] = $projectptid_opsi;

            $dao = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao->getProjectPtId($this->getAppSession(), $data);

            $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
            $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

            $data['project_id'] = $projectid_opsi;
            $data['pt_id'] = $ptid_opsi;

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $data['project_id'] = $this->getAppSession()->getProjectId();
            $data['pt_id'] = $this->getAppSession()->getPtid();

            $dao = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao->getProject_Pt_Id($this->getAppSession(), $data);

            $projectid_opsi = $data['project_id'];
            $ptid_opsi = $data['pt_id'];
            $data['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'employee', array(), array());
        $dao = new Hrd_Models_Master_EmployeeDao();
        $em = new Hrd_Models_Master_EmployeePersonal();

        $project = new Box_Models_Master_Project();
        $project->setId($projectid_opsi);

        $pt = new Box_Models_Master_Pt();
        $pt->setId($ptid_opsi);

        $em->setProject($project);
        $em->setPt($pt);

        $hasil = $dao->getAllEPJustActiveWOPL_SanksiKeterlambatan($this->getAppRequest(), $data);

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    // end added by Michael 2021.07.16
        
    
    // added by wulan 22 10 2021
    public function shiftdetailRead() {

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'shifttype', array(), array());
        $dao = new Hrd_Models_Master_ShiftTypeDao();
        $enti = new Hrd_Models_Master_ShiftType();
        $employee = new Hrd_Models_Employee_Employee();
        $employee->setArrayTable($this->getAppData());

        $enti->setArrayTable($this->getAppData());
        // $enti->setProject($this->getAppSession()->getProject());
        // $enti->setPt($this->getAppSession()->getPt());

        // added by Michael 2021.05.19 
        $data = $this->getAppData();
        if (array_key_exists("projectptid_opsi",$data) && $data['projectptid_opsi']){

            $projectptid_opsi = $data["projectptid_opsi"];
            $data['projectpt_id'] = $projectptid_opsi;

            $dao_projectpt = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao_projectpt->getProjectPtId($this->getAppSession(), $data);

            $projectid_opsi = $hasil_projectpt[1][0]['project_id'];
            $ptid_opsi = $hasil_projectpt[1][0]['pt_id'];

            $data['project_id'] = $projectid_opsi;
            $data['pt_id'] = $ptid_opsi;

        }else{
            //CURRENT PROJECTPT saat pilih dari START
            $data['project_id'] = $this->getAppSession()->getProjectId();
            $data['pt_id'] = $this->getAppSession()->getPtid();

            $dao_projectpt = new Hrd_Models_AbsentDao();
            $hasil_projectpt = $dao_projectpt->getProject_Pt_Id($this->getAppSession(), $data);

            $data['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        }
        
        $project = new Box_Models_Master_Project();
        $project->setId($data['project_id']);

        $pt = new Box_Models_Master_Pt();
        $pt->setId($data['pt_id']);

        $enti->setProject($project);
        $enti->setPt($pt);
        // end added by Michael 2021.05.19 
        
        $params = $this->getAppData();

        $dm->setDataList($dataList);
        $dm->setHasil($dao->getAllWithEmployeeFilter($data['project_id'], $data['pt_id'], $params["absentdetail_id"]));
        return $dm;
    }

}

?>