<?php

class Hrd_PersonalController extends Box_Models_App_Hermes_AbstractController {

    protected function testingFlag() {
        return FALSE;
    }

    public function allRead() {

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'employeeb', array('religion', 'department', 'bloodgroup', 'education', 'marriagestatus'), array());
        $dao = new Hrd_Models_Master_EmployeeDao();
        $employee = new Hrd_Models_Employee_Employee();
        $data = $this->getAppData();
        $employee->setArrayTable($this->getAppData());
        $employee->setProject($this->getAppSession()->getProject());
        $employee->setPt($this->getAppSession()->getPt());


        $hasil = $dao->getAllB($this->getAppRequest(), $employee);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function parameterRead() {
		
        $pma = new Hrd_Models_App_Mastertable_Position();
        $pp = $pma->prosesDataWithSession($this->getAppSession(), TRUE);
		
	
		
	

        $ma = new Hrd_Models_App_Mastertable_AlokasiBiaya();
        $aa = $ma->prosesDataWithSession($this->getAppSession(), TRUE);
		
		

        $dma = new Hrd_Models_App_Mastertable_Department();
        $dd = $dma->prosesDataWithSession($this->getAppSession(), TRUE);
		
        
		
		

        $gpma = new Hrd_Models_App_Mastertable_Groupposition();
        $gpp = $gpma->prosesDataWithSession($this->getAppSession(), TRUE);

        $gma = new Hrd_Models_App_Mastertable_Group();
        $gg = $gma->prosesDataWithSession($this->getAppSession(), TRUE);

        $dima = new Hrd_Models_App_Mastertable_Division();
        $did = $dima->prosesDataWithSession($this->getAppSession(), TRUE);
       
        
        
        /// job function
		
        $jfd = new Hrd_Models_Master_JobFunctionDao();
        $jf = new Hrd_Models_Master_JobFunction();
        $jfh = $jfd->getAllWOPL($jf);
        $jdf = Box_Tools::toObjectResult($jfh, new Hrd_Models_Master_JobFunction());
		
	
	/* start added by ahmad riadi 21-06-2017 */
        $m_banding = new Hrd_Models_App_Mastertable_Banding();
        $data_banding = $m_banding->prosesDataWithSession($this->getAppSession(), TRUE);
        
        $m_jobfamily = new Hrd_Models_App_Mastertable_JobFamily();
        $data_jobfamily = $m_jobfamily->prosesDataWithSession($this->getAppSession(), TRUE);
         /* end added by ahmad riadi 21-06-2017 */	
		
        // worklocation
        $em = new Hrd_Models_Worklocationprojectpt_Worklocationprojectpt();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Worklocationprojectpt_Dao();
        
        $allworklocation = $dao->getAllWoPL($em);
        if(Box_Tools::adaRecord($allworklocation)){
            $allworklocation = Box_Tools::toObjectsb("worklocationprojectpt", $allworklocation,FALSE);
        }

        $hasil = TRUE;

        $arrayRespon = array(
            "HASIL" => $hasil);
        //return Box_Tools::instantRead($arrayRespon, array($aa, $dd, $pp, $gpp, $gg, $did,$jdf));
	 /* edited by ahmad riadi 21-06-2017 */
        return Box_Tools::instantRead($arrayRespon, array($aa, $dd, $pp, $gpp, $gg, $did, $jdf,$data_banding,$data_jobfamily,$allworklocation));
	  //return Box_Tools::instantRead($arrayRespon, array($pp));
	  //return Box_Tools::instantRead($arrayRespon);
    }

    //WORK LOCATION
    public function worklocationprojectpt_inputRead() {
        
        $em = new Hrd_Models_Master_EmployeePersonal();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Master_EmployeeDao();
        
        $hasil = $dao->save_worklocation_personal($em,$this->getAppRequest(), $this->getAppSession(), $this->getAppData());
        
        $arrayRespon = array("HASIL" => $hasil);
        return Box_Tools::instantRead($arrayRespon);

    }

    public function getworklocationprojectpt_employeeRead() {
        
        $em = new Hrd_Models_Master_EmployeePersonal();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Master_EmployeeDao();
        
        $hasil = $dao->detail_worklocation_personal($em,$this->getAppRequest(), $this->getAppSession(), $this->getAppData());
        
        $arrayRespon = array("HASIL" => $hasil);
        return Box_Tools::instantRead($arrayRespon);

    }
    //WORK LOCATION

    //added by michael 2022-08-11
    public function getIntranetcaRead() {
        
        $em = new Hrd_Models_Master_EmployeePersonal();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Master_EmployeeDao();
        
        $hasil = $dao->detail_intranetca_personal($em,$this->getAppRequest(), $this->getAppSession(), $this->getAppData());
        
        $arrayRespon = array("HASIL" => $hasil);
        return Box_Tools::instantRead($arrayRespon);

    }
    public function saveIntranetcaRead() {
        
        $em = new Hrd_Models_Master_EmployeePersonal();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Master_EmployeeDao();

        $hasil = $dao->save_intranetca_personal($em,$this->getAppRequest(), $this->getAppSession(), $this->getAppData());

        $arrayRespon = array("HASIL" => $hasil);
        return Box_Tools::instantRead($arrayRespon);

    }    
    public function projectptRead() {
        
        $project_id = $this->getAppSession()->getProjectId();
        $pt_id = $this->getAppSession()->getPtId();
        return Box_Tools::instantRead(array("project_id" => $project_id,"pt_id" => $pt_id), array());

    }
    //end added by michael 2022-08-11

    public function iskompensasi_inputRead() {
        
        $em = new Hrd_Models_Master_EmployeePersonal();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Master_EmployeeDao();
        
        $hasil = $dao->save_iskompensasi_personal($em,$this->getAppRequest(), $this->getAppSession(), $this->getAppData());
        
        $arrayRespon = array("HASIL" => $hasil);
        return Box_Tools::instantRead($arrayRespon);

    }

    public function ispensiun_inputRead() {
        
        $em = new Hrd_Models_Master_EmployeePersonal();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Master_EmployeeDao();
        
        $hasil = $dao->save_ispensiun_personal($em,$this->getAppRequest(), $this->getAppSession(), $this->getAppData());
        
        $arrayRespon = array("HASIL" => $hasil);
        return Box_Tools::instantRead($arrayRespon);

    }

    //added by michael 2021.08.27
    public function ischild_inputRead() {
        
        $em = new Hrd_Models_Master_EmployeePersonal();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Master_EmployeeDao();
        
        $hasil = $dao->save_ischild_personal($em,$this->getAppRequest(), $this->getAppSession(), $this->getAppData());
        
        $arrayRespon = array("HASIL" => $hasil);
        return Box_Tools::instantRead($arrayRespon);

    }

    public function getischild_employeeRead() {
        
        $em = new Hrd_Models_Master_EmployeePersonal();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Master_EmployeeDao();
        
        $hasil = $dao->detail_ischild_personal($em,$this->getAppRequest(), $this->getAppSession(), $this->getAppData());
        
        $arrayRespon = array("HASIL" => $hasil);
        return Box_Tools::instantRead($arrayRespon);

    }
    //end added by michael 2021.08.27

    public function employeereportoRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'employee', array('department'), array());
        $dao = new Hrd_Models_Master_EmployeeDao();
        $employee = new Hrd_Models_Master_EmployeePersonal();
        //$employee->setArrayTable($this->getAppData());
        $this->setArrayTable($employee, $this->getAppData());

        $employee->setProject($this->getAppSession()->getProject());
        $employee->setPt($this->getAppSession()->getPt());
        //$hasil = $dao->getAllEP($this->getAppRequest(), $employee);	
	$hasil = $dao->getAllEPReportto($this->getAppRequest(), $employee);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function detailRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'employeepersonal', array('religion', 'department','jobfunction','jobfamily','banding', 'bloodgroup', 'education', 'marriagestatus', 'spouse', 'division', 'worklocationprojectpt', 'position', 'group', 'groupposition', 'employeestatus', 'statusinformation', 'reportto', 'alokasibiaya', array("relation", "mother_"), array("relation", "father_")), array("detail", "educations", "relation", "saudaras", "childs", "emgcontact", "jobhistories", "trainings", "deleted", "skills", "organizations","multipositions"));
        //$dao = new Erems_Models_Payment_Dao();
        $employee = new Hrd_Models_Master_EmployeePersonal();

        $employee->setArrayTable($this->getAppData());
        $dao = new Hrd_Models_Master_EmployeeDao();
        $hasil = $dao->getDetail($employee);
        //var_dump($hasil);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function maindetailRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'employeepersonal', array('religion', 'department','jobfunction','jobfamily','banding', 'bloodgroup', 'education', 'marriagestatus', 'spouse', 'division', 'worklocationprojectpt', 'position', 'group', 'groupposition', 'employeestatus', 'statusinformation', array("relation", "mother_"), array("relation", "father_")), array("detail", "educations", "relation", "saudaras", "childs","emgcontact", "jobhistories", "trainings", "deleted", "skills", "organizations","multipositions"));
        //$dao = new Erems_Models_Payment_Dao();
        $employee = new Hrd_Models_Master_EmployeePersonal();

        $employee->setArrayTable($this->getAppData());
        $dao = new Hrd_Models_Master_EmployeeDao();
        $hasil = $dao->getDetail($employee);

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function tandakasihRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'tandakasihtran', array(), array());
        $dao = new Hrd_Models_Tandakasih_Dao();
        $data = $this->getAppData();


        $hasil = $dao->getAllByEmployeeWOPL(intval($data["employee_id"]), $this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId());
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function educationRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'educationhistory', array(), array());
        $dao = new Hrd_Models_Master_GeneralDao();
        $employee = new Hrd_Models_Master_Employee();
        $employee->setArrayTable($this->getAppData());
        $hasil = $dao->getEduHistory($employee, $this->getAppRequest());
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function trainingRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'training', array(), array());
        $dao = new Hrd_Models_Master_GeneralDao();
        $employee = new Hrd_Models_Master_Employee();
        $employee->setArrayTable($this->getAppData());
        $hasil = $dao->getTrainingHistory($employee, $this->getAppRequest());
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        return $dm;
    }

    public function jobhistoryRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'jobhistory', array(), array());
        $dao = new Hrd_Models_Master_GeneralDao();
        $employee = new Hrd_Models_Master_Employee();
        $employee->setArrayTable($this->getAppData());
        $hasil = $dao->getJobstory($employee, $this->getAppRequest());
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function saudaraRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'saudara', array('education'), array());
        $dao = new Hrd_Models_Master_RelationDao();
        $saudara = new Hrd_Models_Master_Saudara();
        $data = $this->getAppData();
        $employee = new Hrd_Models_Master_Employee();
        $employee->setArrayTable($this->getAppData());
        //   $payment->setArrayTable($this->getAppData());
        $hasil = $dao->getAll($this->getAppRequest(), $employee->getId(), $saudara);

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        return $dm;
    }

    public function organizationRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'organization', array(), array());
        $dao = new Hrd_Models_Organization_Dao();
        $em = new Hrd_Models_Master_Employee();
        $em->setArrayTable($this->getAppData());
        $hasil = $dao->getAllByEmployee($em);
        //$hasil = array();
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        return $dm;
    }

    public function childRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'child', array('education'), array());
        $dao = new Hrd_Models_Master_RelationDao();
        $child = new Hrd_Models_Master_Child();
        $data = $this->getAppData();
        $employee = new Hrd_Models_Master_Employee();
        $employee->setArrayTable($this->getAppData());
        //   $payment->setArrayTable($this->getAppData());
        $hasil = $dao->getAll($this->getAppRequest(), $employee->getId(), $child);

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        return $dm;
    }

    public function emgcontactRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'emgcontact', array('education'), array());
        $dao = new Hrd_Models_Master_RelationDao();
        $child = new Hrd_Models_Master_EmergencyContact();
        $data = $this->getAppData();
        $employee = new Hrd_Models_Master_Employee();
        $employee->setArrayTable($this->getAppData());
        //   $payment->setArrayTable($this->getAppData());
        $hasil = $dao->getAll($this->getAppRequest(), $employee->getId(), $child);

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        return $dm;
    }

    public function potencyRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'potencytran', array(), array());
        $dao = new Hrd_Models_Potency_Dao();
        $em = new Hrd_Models_Master_Employee();
        $em->setArrayTable($this->getAppData());


        //   $payment->setArrayTable($this->getAppData());
        $hasil = $dao->getAllByEmployee($em);

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        return $dm;
    }

    public function mainCreate_old() {

        $dm = new Box_Models_App_Hermes_DataModel();
        $employee = new Hrd_Models_Master_EmployeePersonal();
        $validator = new Hrd_Models_Master_EmployeeValidator();
        $validator->setDataParams($this->getAppData());
        $dm->setDao(new Hrd_Models_Master_EmployeeDao());
        $dm->setValidator($validator);
        $dm->setObject($employee);

        return $dm;
    }


     public function mainCreate() {
	$data = $this->getAppData();
        $dm = new Box_Models_App_Hermes_DataModel();
        $employee = new Hrd_Models_Master_EmployeePersonal();
	$employee->setDatamultiposition($data['multipositions']);
        $validator = new Hrd_Models_Master_EmployeeValidator();
        $validator->setDataParams($data);
        $dm->setDao(new Hrd_Models_Master_EmployeeDao());
        $dm->setValidator($validator);
        $dm->setObject($employee);
        return $dm;
    }
	

    public function uploadRead() {

        $ses = $this->getAppSession();


        $data = $this->getAppData();

        $msg = '???';
        $success = FALSE;
        $modeUpload = $data["type"];
        $nik = trim($data["nik"]);
        $emplyoeeId = intval($data["employee_id"]);
        $fileName = "";
        $fileUpload = NULL;
        
        // problem saat nik mengandung / atau \\
        $nik = str_replace('/', '_', $nik);
        $nik = str_replace('\\', '_', $nik);
        
        if (strlen($nik) > 0 && $emplyoeeId > 0) {
            if ($modeUpload == "FOTO") {
                $fileUpload = new Box_Models_App_FileUpload("/" . Box_Config::PERSONAL_FOTO_PATH, "personal_" . $ses->getProject()->getId() . "_" . $ses->getPt()->getId() . "_" . $nik . "_" . time(), "jpg,JPG,png");

                $fileUpload->run();
                if (!$fileUpload->isSuccess()) {
                    $msg = $fileUpload->getErrorMsg();
                } else {
                    $dao = new Hrd_Models_Master_EmployeeDao();


                    // seluruh informasi karyawan lama
                    $oldEmployee = new Hrd_Models_Master_Employee();
                    $oldEmployee->setId($emplyoeeId);
                    $oldEmployee = Box_Tools::toObjects("employee", $dao->getDetail($oldEmployee), TRUE);



                    $em = new Hrd_Models_Master_Employee();
                    $em->setId($emplyoeeId);
                    $em->setPhoto($fileUpload->getFileName());
                    $em->setModiBy($this->getAppSession()->getUser()->getId());
                    $hasilUpdate = $dao->updatePhoto($em);

                    /// hapus foto lama jika ada
                    if (strlen($oldEmployee->getPhoto()) > 0) {
                        $fileOld = Box_Models_App_FileUpload::getFilePath(Box_Config::PERSONAL_FOTO_PATH, $oldEmployee->getPhoto());

                        if (file_exists($fileOld)) {
                            unlink($fileOld);
                        }
                    }



                    $fileName = $fileUpload->getFileName();
                    if ($hasilUpdate) {
                        $success = TRUE;
                        $msg = $fileName;
                    } else {
                        $msg = "Error pada saat simpan data";
                    }
                }
            }else if (                       
                        $modeUpload=='KK'||
                        $modeUpload=='KTP'||
                        $modeUpload=='NPWP'||
                        $modeUpload=='IJAZAH'||
                        $modeUpload=='JAMSOSTEK'||
                        $modeUpload=='BPJS_PP'||
                        $modeUpload=='BPJS_K'||
                        $modeUpload=='BPJS_KK'||
                        $modeUpload=='MANULIFE_P'||
                        $modeUpload=='REKENING'||
                        $modeUpload=='ASURANSI' ||
                        //added by michael 09/08/2021
                        $modeUpload=='VAKSIN1'||
                        $modeUpload=='VAKSIN2'
                        //end added by michael 09/08/2021
                        //added by anas 10022022
                        || $modeUpload=='VAKSIN3'
                        || $modeUpload=='PAS_FOTO'
                        || $modeUpload=='STNK'
               ) {
                if ($_FILES["file_name"]["error"] > 0) {
                    $msg = "Error karena file upload";
                } else {
                    $process = new Hrd_Models_Personaldocument();
                    // $result = $process->processdoc($_FILES, $data);

                    //added by michael 2022-07-08 request bu shirley, vaksin bisa jpg/png 
                    if($modeUpload=='VAKSIN1'||$modeUpload=='VAKSIN2'|| $modeUpload=='VAKSIN3'
                        ||$modeUpload=='PAS_FOTO'|| $modeUpload=='STNK'){
                        $result = $process->processdocimg($_FILES, $data);
                    }else{
                        $result = $process->processdoc($_FILES, $data);
                    }

                    $msg = $result['msg'];
                    $success = $result['success'];
                }

		
	    /*else if($modeUpload == "KK" || $modeUpload == "KTP" || $modeUpload == "NPWP" || $modeUpload == "JAMSOSTEK"){
                
                $fileUpload = new Box_Models_App_FileUpload("/public/app/hrd/uploads/personal/dokumen_".  strtolower($modeUpload)."/", "personal_".strtolower($modeUpload)."_" . $ses->getProject()->getId() . "_" . $ses->getPt()->getId() . "_" . $nik, "pdf");

                $fileUpload->run();
                if (!$fileUpload->isSuccess()) {
                    $msg = $fileUpload->getErrorMsg();
                } else {
                    $dao = new Hrd_Models_Master_EmployeeDao();


                    $hasilUpdate = FALSE;

                    $em = new Hrd_Models_Master_Employee();
                    $em->setId($emplyoeeId);
                  
                    $em->setModiBy($this->getAppSession()->getUser()->getId());
                    $hasilUpdate = $dao->updateDokoumen($em,$modeUpload,$fileUpload->getFileName());



                    $fileName = $fileUpload->getFileName();
                    if ($hasilUpdate) {
                        $success = TRUE;
                        $msg = $fileName;
                    } else {
                        $msg = "Error pada saat simpan data";
                    }
                }
	    */	
            }else if($modeUpload == "IJASAH" || $modeUpload == "SERTIFIKAT"){
                
                $fileUpload = new Box_Models_App_FileUpload("/public/app/hrd/uploads/personal/dokumen_".strtolower($modeUpload)."/", "personal_".strtolower($modeUpload)."_" . $ses->getProject()->getId() . "_" . $ses->getPt()->getId() . "_" . $nik .'_'.time(), "pdf");

                $fileUpload->run();
                if (!$fileUpload->isSuccess()) {
                    $msg = $fileUpload->getErrorMsg();
                } else {
                    $dao = new Hrd_Models_Master_EmployeeDao();


                    $hasilUpdate = TRUE;

                    $em = new Hrd_Models_Master_Employee();
                    $em->setId($emplyoeeId);
                  
                   // $em->setModiBy($this->getAppSession()->getUser()->getId());
                  //  $hasilUpdate = $dao->updateDokoumen($em,$modeUpload,$fileUpload->getFileName());



                    $fileName = $fileUpload->getFileName();
                    if ($hasilUpdate) {
                        $success = TRUE;
                        $msg = $fileName;
                    } else {
                        $msg = "Error pada saat simpan data";
                    }
                }
            }
        } else {
            $msg = "Employee not valid";
        }


        $arrayRespon = array("HASIL" => $success, "MSG" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }

    protected function getDefaultProcessor() {
        return new Hrd_Models_App_Box_EmployeeProcessor();
    }

    public function confCreate($obj, $app) {
        //$obj->setFlag(Erems_Models_App_Config::getv("PAYMENTFLAG_OTHERS")); 
    }

   /* start added by ahmad riadi 20-06-2017 */

    public function getsubholdingRead() {
        $setup = new Hrd_Models_General_Setup();
        $result = $setup->get_subholding();
        $arrayRespon = array("success" => true, "data" => $result);
        return Box_Tools::instantRead($arrayRespon);
    }


    public function getprojectRead() {
        $setup = new Hrd_Models_General_Setup();
        $result = $setup->get_project();
        $arrayRespon = array("success" => true, "data" => $result);
        return Box_Tools::instantRead($arrayRespon);
    }
    public function getptRead_old() {
         $setup = new Hrd_Models_General_Setup();
         $result = $setup->get_pt();
          $arrayRespon = array("success" => true, "data" => $result);
          return Box_Tools::instantRead($arrayRespon);

    }

    public function getptRead() {
        $setup = new Hrd_Models_General_Setup();
        $params = $this->getAppData();
        $project = $setup->setDefaultProjectPt($params);
        $project_id = $project['project_id'];      
        $result = $setup->get_projectpt($project_id);
        $arrayRespon = array("success" => true, "data" => $result);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function employeereportofilterRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'employee', array(), array());
        $dao = new Hrd_Models_Master_EmployeeDao();
        $employee = new Hrd_Models_Master_EmployeePersonal();
        $params = $this->getAppData();
        $this->setArrayTable($employee, $params);
        $hasil = $dao->getDatareportto($params);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }	
    /* end added by ahmad riadi 20-06-2017 */

 
    /* start  added by ahmad riadi 17-07-2017 */
     public function documentRead() {
        $setup = new Hrd_Models_General_Setup();
        $dao = new Hrd_Models_Master_EmployeeDao();
        $params = $this->getAppData();
        $ids = $params['employee_id'];
        $result = $dao->getAllByIds($ids);
        $arrayRespon = array("success" => true, "data" => $result);
        return Box_Tools::instantRead($arrayRespon);
    }
    /* end  added by ahmad riadi 17-07-2017 */



  /* start added by ahmad riadi 22-09-2017 */
  public function validateemailofficeRead() {
        $setup = new Hrd_Models_General_Setup();
        $params = $this->getAppData();
        $setup->_tabledata = $setup->_m_employee;
        $result = $setup->getdata_standard(array("email_ciputra" => $params['email_ciputra']));
        $counter = 0;
        $data = null;
        if (!empty($result[0])) {
            $counter = count($result[0][0]);
            $data = $result[0][0];
        }
        $arrayRespon = array("success" => true, "data" => $data, "counter" => $counter);
        return Box_Tools::instantRead($arrayRespon);
    }
  /* end added by ahmad riadi 22-09-2017 */


   /*start added by ahmad riadi 30-10-2017 */
    public function getdepartmentRead() {
        $dao = new Hrd_Models_Master_DepartmentDao();
        $obj = new Hrd_Models_Master_Department();
        $params = $this->getAppData();
        $obj->getProject()->setId($params['project_id']);
        $obj->getPt()->setId($params['pt_id']);
        $result = $dao->getAllbyparam($obj);
        $return = Box_Tools::toObjectResult($result, $obj);

        $hasil = TRUE;
        $arrayRespon = array(
            "HASIL" => $hasil);

        return Box_Tools::instantRead($arrayRespon, array($return));
    }

    public function getreporttoRead() {
        $dao = new Hrd_Models_Master_EmployeeDao();
        $obj = new Hrd_Models_Master_EmployeePersonal();
        $params = $this->getAppData();
        $result = $dao->getDatareportto($params);
        $return = Box_Tools::toObjectResult($result, $obj);

        $hasil = TRUE;
        $arrayRespon = array(
            "HASIL" => $hasil);

        return Box_Tools::instantRead($arrayRespon, array($return));
    }

    public function getalokasibiayaRead() {
        $dao = new Hrd_Models_Master_AlokasiBiayaDao();
        $obj = new Hrd_Models_Master_AlokasiBiaya();
        $params = $this->getAppData();
        $obj->getProject()->setId($params['project_id']);
        $obj->getPt()->setId($params['pt_id']);
        $result = $dao->getAllWOPL($obj);
        $return = Box_Tools::toObjectResult($result, $obj);

        $hasil = TRUE;
        $arrayRespon = array(
            "HASIL" => $hasil);

        return Box_Tools::instantRead($arrayRespon, array($return));
    }
    
     
    
    public function multipositionRead() {
        $dao = new Hrd_Models_Master_MultipositionDao();
        $obj = new Hrd_Models_Master_Multiposition();
        $data = $this->getAppData();
        $obj->setArrayTable($data);
        $result = $dao->getAll($this->getAppRequest(),$obj);
        $return = Box_Tools::toObjectResult($result, $obj);
        $hasil = TRUE;
        $arrayRespon = array(
            "HASIL" => $hasil);
        return Box_Tools::instantRead($arrayRespon, array($return));
        
    }
    
     /*end added by ahmad riadi 30-10-2017 */



    /*start added by ahmad riadi 05-02-2018 */	
    public function exportdatapersonalRead() {

        $obj = new Hrd_Models_Report_Employee();
        //added by anas 31032022
        $params = $this->getAppData();
        //updated by anas 31032022 - add param dari form search
        $result = $obj->exceldata(json_decode($params['data'], TRUE));    
           
        $hasil = TRUE;
        $arrayRespon = array(
            "HASIL" => $hasil
        );
        return Box_Tools::instantRead($arrayRespon, array($result));

    }
    /*end added by ahmad riadi 05-02-2018 */	

     /*start added by ahmad riadi 14-02-2018 */	   
        
     public function employeehistoryRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'employeehistory', array(), array());
        $dao = new Hrd_Models_Master_GeneralDao();
        $employee = new Hrd_Models_Master_Employeehistory();
        $employee->setArrayTable($this->getAppData());
        $hasil = $dao->getEmployeehistory($employee, $this->getAppRequest());
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
      /*start added by ahmad riadi 14-02-2018 */	


    public function exportlistRead() {

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'employee', array(), array());
        $dao = new Hrd_Models_Master_EmployeeDao();
        $hasil = $dao->getAllExportList();
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    } 

    public function exportvalidationRead() {

        $params = $this->getAppData();
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'employee', array(), array());
        $dao = new Hrd_Models_Master_EmployeeDao();
        $hasil = $dao->exportValidation($params);
        $arrayRespon = array(
            "HASIL" => $hasil
        );
        return Box_Tools::instantRead($arrayRespon);
    } 

    public function exportpdfRead() {

        $params = $this->getAppData();
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'employee', array(), array());
        $dao = new Hrd_Models_Master_EmployeeDao();
        $hasil = $dao->exportDocument($params);
        $arrayRespon = array(
            "HASIL" => $hasil
        );
        return Box_Tools::instantRead($arrayRespon);
    } 

    

}

?>