<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of KlaimpengobatanController
 *
 * @author MIS
 */
require_once dirname(__DIR__) . '../library/phpexcel/PHPExcel/IOFactory.php';
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Hrd_KlaimpengobatanController extends Box_Models_App_Hermes_WingedBController {
    
    public function allRead(){
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'employeeb', array('department','employeestatus','statusinformation','group','position'),array());
        $dao = new Hrd_Models_Master_EmployeeDao();
        $em = new Hrd_Models_Employee_Employee();
        $em->setArrayTable($this->getAppData());
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
       
        //$hasil = $dao->getAllEP($this->getAppRequest(),$em);
    $hasil = $dao->getAllForMultiplemodule($this->getAppRequest(),$em);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    protected function testingFlag() {
        return FALSE;
    }

    public function detailRead() {
        $dm = new Box_Models_App_Hermes_DataModel();

        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $creator = new Box_Models_App_Creator();
        
        /*
        $masterPT = new Hrd_Models_App_Mastertable_JenisPengobatan();
        $allPT = $masterPT->prosesDataWithSession($this->getAppSession(), TRUE);
        */
        
        // add by wulan 25 feb 2021
        $dao = new Hrd_Models_Pengobatan_TypeDao();
        $d = new Hrd_Models_Pengobatan_Type();
        $allPT = $dao->getAllWOPL_exclude_kacamata($d);
        $allPT = Box_Tools::toObjectResult($allPT, new Hrd_Models_Pengobatan_Type());
        
        $plafonPG = new Hrd_Models_App_Mastertable_PlafonGolongan();
        $allPG = $plafonPG->prosesDataWithSession($this->getAppSession(), TRUE);

        $data = $this->getAppData();
        $dao = new Hrd_Models_Pengobatan_PlafonKaryawanDao();
        $plafon = new Hrd_Models_Pengobatan_PlafonKaryawan();
        $plafon->setProject($this->getAppSession()->getProject());
        $plafon->setPt($this->getAppSession()->getPt());
        $plafon->setYear(isset($data["year"]) ? $data["year"] : 0);


        $pkaDao = new Hrd_Models_Plafon_PlafonKaryawanDao();
        $pkaFilter = new Hrd_Models_Plafon_PlafonKaryawan();
        $pkaFilter->setProject($this->getAppSession()->getProject());
        $pkaFilter->setPt($this->getAppSession()->getPt());
        $dataPlafon = $pkaDao->getAllWOPL($pkaFilter);
        //var_dump($dataPlafon);
        $dataPlafon = Box_Tools::toObjectResult($dataPlafon, new Hrd_Models_Plafon_PlafonKaryawan());
       

        /* 
         * @index array = KODE di master jenis pengobatan , @value array = field di table plafon karyawan
         *  */
        $plafonMap = array(
            'CHECKUP' => 'checkup',
            'FRAME' => 'frame',
            'HAMIL' => 'kehamilan',
            'PAPSMEAR/KB' => 'keluarga_berencana',
            'OTHER' => 'lainlain',
            'LENSA' => 'lensa',
            'SALIN2' => 'persalinan_abnormal',
            'SALIN1' => 'persalinan_normal',
            'RawatJalan' => 'rawat_jalan',
            'KOSONG' => 'rawat_inap',
            'KOSONG' => 'yearly_dokter',
            'KOSONG' => 'yearly_gigi',
            'KOSONG' => 'yearly_global',
            'KOSONG' => 'yearly_lab',
            'KOSONG' => 'yearly_obat'
        );

        $otherAT = array(array(
                "PLAFONMAP" => $plafonMap
        ));


        $dm->setHasil(array($allPT, $dataPlafon, $allPG, $otherAT));


        return $dm;
    }

    public function plafonkaryawanRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'plafonkaryawan', array());

        $st = $this->getMainObject();
        $st->setArrayTable($this->getAppData());
        $st->setProject($this->getAppSession()->getProject());
        $st->setPt($this->getAppSession()->getPt());
        $dao = $this->getMainDao();

        $hasil = $dao->getByEmployee($st);



        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function claimRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'claim', array('jenispengobatan'));
        $dao = $this->getMainDao();
        $ob = $this->getMainObject();
        $ob->setArrayTable($this->getAppData());
        $ob->setProject($this->getAppSession()->getProject());
        $ob->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAll($this->getAppRequest(), $ob);

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    protected function getMainDao() {
        return new Hrd_Models_Claim_ClaimDao();
    }

    protected function getMainFieldID() {
        return "klaimpengobatan_id";
    }

    protected function getMainObject() {
        return new Hrd_Models_Claim_Claim();
    }

    protected function getMainValidator() {
        $v = new Hrd_Models_Claim_ClaimValidator();
        $v->setCurrentSession($this->getAppSession());
        return $v;
    }

    protected function getDefaultProcessor() {
        return new Hrd_Models_App_Box_Processor();
    }


    public function uploadexcelRead() {
        $app = new Box_Models_App_Models_Create($this);
        $msg = '???';
        $success = FALSE;
        $data = $this->getAppData();

        $fileName = $data["file_name"];
        $upload = new Hrd_Models_Claim_UploadclaimExcel();
    
        $return = $upload->process_upload($fileName, $this->getAppSession(),$data);
        
        if ($return['status'] == 1) {
            $success = TRUE;
            $msg = "Success";
        } else {
            $success = FALSE;
            $msg = $return['msg'];
        }

        $arrayRespon = array("HASIL" => $success, "MSG" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }

    // INI UNTUK UPLOAD FILENYA
    public function uploadRead() {

        $ses = $this->getAppSession();


        $data = $this->getAppData();

        $msg = '???';
        $success = FALSE;
        $modeUpload = $data["type"];

      
        $fileName = "";
        $fileUpload = NULL;

        if ($modeUpload == "dokumen") {
            $fileUpload = new Box_Models_App_FileUpload("/public/app/hrd/uploads/claim/", "claim_" . $ses->getProject()->getId() . "_" . $ses->getPt()->getId() . "_" .date('Y_m_d'). "_" . time(), "xlsx");


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

    public function checkplafonRead(){

        $em = new Hrd_Models_Claim_Claim();
        $dao = new Hrd_Models_Claim_ClaimDao();

        $hasil = $dao->checkPlafon($this->getAppSession());
        

        if($hasil){
            $msg = 'failed';
        }else{
            $msg = 'success';
        }

        $arrayRespon = array("HASIL" => $hasil,"MSG" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function employeeprojectptRead() {

        // added by Michael 2021.05.19 
        $data = $this->getAppData();
        $data['project_id'] = $this->getAppSession()->getProjectId();
        $data['pt_id'] = $this->getAppSession()->getPtid();

        $dao = new Hrd_Models_AbsentDao();
        $hasil_projectpt = $dao->getProject_Pt_Id($this->getAppSession(), $data);

        $data['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];

        $obj = new Hrd_Models_App_Mastertable_Employee();
        // $data = $obj->prosesDataWithSession($this->getAppSession(), TRUE);
        $data = $obj->prosesDataWithoutSession($this->getAppSession(), TRUE, $data);
        return Box_Tools::instantRead(array("HASIL" => 1,), array($data));
    }

    public function invalidabsentinitRead() {

        // added by Michael 2021.05.19 
        $data = $this->getAppData();
        $data['project_id'] = $this->getAppSession()->getProjectId();
        $data['pt_id'] = $this->getAppSession()->getPtid();

        $dao = new Hrd_Models_AbsentDao();
        $hasil_projectpt = $dao->getProject_Pt_Id($this->getAppSession(), $data);

        $data['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];

        $ma = new Hrd_Models_App_Mastertable_Department();
        // $aa = $ma->prosesDataWithSession($this->getAppSession(), TRUE);
        $aa = $ma->prosesDataWithoutSession($this->getAppSession(), TRUE, $data);

        return Box_Tools::instantRead(array(
                    "HASIL" => 1,
                        ), array($aa));
    }

    public function filterintranetRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'claim', array(), array());
        $setup = new Hrd_Models_General_Setup();
        
        $obj = new Hrd_Models_Claim_Claim();
        $data = $this->getAppData();
        $obj->setArrayTable($this->getAppData());
        $data['project_id'] = $this->getAppSession()->getProject()->getId();
        $data['pt_id'] = $this->getAppSession()->getPt()->getId();

        $data['project_id'] = $this->getAppSession()->getProjectId();
        $data['pt_id'] = $this->getAppSession()->getPtid();

        $dao_projectpt = new Hrd_Models_AbsentDao();
        $hasil_projectpt = $dao_projectpt->getProject_Pt_Id($this->getAppSession(), $data);

        $data['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];

        $dao = new Hrd_Models_Claim_ClaimDao();

        $hasil = $dao->getAllBrowse($this->getAppRequest(),$this->getAppSession(),$data);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function getdatabrowseRead() {

        $data = $this->getAppData();
        $data['project_id'] = $this->getAppSession()->getProjectId();
        $data['pt_id'] = $this->getAppSession()->getPtid();

        $em = new Hrd_Models_Claim_Claim();
        $dao = new Hrd_Models_Claim_ClaimDao();

        $hasil = $dao->getDetailBrowse($this->getAppRequest(),$this->getAppSession(),$data);
        
        if($hasil){
            $msg = 'success';
        }else{
            $msg = 'failed';
        }

        $arrayRespon = array("HASIL" => $hasil,"MSG" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function processbrowseRead() {

        $data = $this->getAppData();
        $data['project_id'] = $this->getAppSession()->getProjectId();
        $data['pt_id'] = $this->getAppSession()->getPtid();

        $em = new Hrd_Models_Claim_Claim();
        $dao = new Hrd_Models_Claim_ClaimDao();

        $hasil = $dao->processBrowse($this->getAppRequest(),$this->getAppSession(),$data);
        
        if($hasil){
            $msg = 'success';
        }else{
            $msg = 'failed';
        }

        $arrayRespon = array("HASIL" => $hasil,"MSG" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function rejectbrowseRead() {

        $data = $this->getAppData();
        $data['project_id'] = $this->getAppSession()->getProjectId();
        $data['pt_id'] = $this->getAppSession()->getPtid();

        $em = new Hrd_Models_Claim_Claim();
        $dao = new Hrd_Models_Claim_ClaimDao();

        $hasil = $dao->rejectBrowse($this->getAppRequest(),$this->getAppSession(),$data);
        
        if($hasil){
            $msg = 'success';
        }else{
            $msg = 'failed';
        }

        $arrayRespon = array("HASIL" => $hasil,"MSG" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function processkacamatabrowseRead() {

        $data = $this->getAppData();
        $data['project_id'] = $this->getAppSession()->getProjectId();
        $data['pt_id'] = $this->getAppSession()->getPtid();

        $em = new Hrd_Models_Claim_Claim();
        $dao = new Hrd_Models_Claim_ClaimDao();

        $hasil = $dao->processKacamataBrowse($this->getAppRequest(),$this->getAppSession(),$data);
        
        if($hasil){
            $msg = 'success';
        }else{
            $msg = 'failed';
        }

        $arrayRespon = array("HASIL" => $hasil,"MSG" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function rejectkacamatabrowseRead() {

        $data = $this->getAppData();
        $data['project_id'] = $this->getAppSession()->getProjectId();
        $data['pt_id'] = $this->getAppSession()->getPtid();

        $em = new Hrd_Models_Claim_Claim();
        $dao = new Hrd_Models_Claim_ClaimDao();

        $hasil = $dao->rejectKacamataBrowse($this->getAppRequest(),$this->getAppSession(),$data);
        
        if($hasil){
            $msg = 'success';
        }else{
            $msg = 'failed';
        }

        $arrayRespon = array("HASIL" => $hasil,"MSG" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }

    //kacamata
    public function plafoninfo_kacamataRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
        
        $creator = new Box_Models_App_Creator();
        
        $masterPT = new Hrd_Models_App_Mastertable_JenisPengobatan();
        $allPT = $masterPT->prosesDataWithSession($this->getAppSession(), TRUE);
        
        

        $data = $this->getAppData();
        $dao = new Hrd_Models_Pengobatan_PlafonKaryawanDao();
        $plafon = new Hrd_Models_Pengobatan_PlafonKaryawan();
        $plafon->setProject($this->getAppSession()->getProject());
        $plafon->setPt($this->getAppSession()->getPt());
        $plafon->setYear(isset($data["year"])?$data["year"]:0);
        
        $dataPlafon = $dao->getAllByYear($this->getAppRequest(),$plafon);
        $plafons = array();
        if(isset($dataPlafon[1])){
            foreach ($dataPlafon[1] as $rec){
                $plafon = new Hrd_Models_Pengobatan_PlafonKaryawan();
                $plafon->setArrayTable($rec);
                $plafons[] = $plafon;
            }
        }
        
      
        /// param limit
        $daoParam = new Hrd_Models_Master_GeneralParameterDao();
      //  $hasilParam = $daoParam->getParamsByProjectPtWOPL($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId(), "medicalparameter");
        $hasilParam = $daoParam->getParamsByProjectPtWOPLB("medicalparameter",$this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId());

        $hasilParam = Box_Tools::toObjectResult($hasilParam, new Hrd_Models_Master_GeneralParameter());
        $minimalTahun = 0;
        $persenPenambahan = 0;
        
        foreach ($hasilParam as $param) {
            
            
        
            if($data["jenis"]=="FRAME" && $param->getName()==Box_Config::GENERALPARAMATER_NAME_CLAIM_FRAMELIMIT){
                $minimalTahun = $param->getValue();
            }else if($data["jenis"]=="LENSA" && $param->getName()==Box_Config::GENERALPARAMATER_NAME_CLAIM_LENSLIMIT){
                $minimalTahun = $param->getValue();
            }
            
           
            
            if($param->getName()==Box_Config::GENERALPARAMATER_NAME_CLAIM_PERCENTADDPLF){
                $persenPenambahan = $param->getValue();
            }
        }
        
        /// /param limit
        
        
        /// employee detail
        $dao = new Hrd_Models_Master_EmployeeDao();
        $em = new Hrd_Models_Master_EmployeePersonal();
        $em->setId(intval($data["employee_id"]));
        $hasilEmployee = $dao->getDetail($em);
        $hasilEmployee = Box_Tools::toObjectRow($hasilEmployee,new Hrd_Models_Master_Employee());
        /// /employee detail
        
        $otherAT = array(array(
            "PARAM_LIMIT"=>$minimalTahun,
            "PARAM_PERSENADD"=>$persenPenambahan
        ));
       

        $dm->setHasil(array($allPT,$plafons,$hasilEmployee,$otherAT));
        
        
        return $dm;
    }

    public function plafongolongan_kacamataRead(){
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'plafonpengobatan', array('jenispengobatan'),array());
        $dao = new Hrd_Models_Pengobatan_Dao();
        $plafon = new Hrd_Models_Pengobatan_Plafon();
        $plafon->setProject($this->getAppSession()->getProject());
        $plafon->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAllWOPL($plafon);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    //FAMS

    public function filterpfamsRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'claim', array(), array());
        $setup = new Hrd_Models_General_Setup();
        
        $obj = new Hrd_Models_Claim_Claim();
        $data = $this->getAppData();
        $obj->setArrayTable($this->getAppData());
        $data['project_id'] = $this->getAppSession()->getProject()->getId();
        $data['pt_id'] = $this->getAppSession()->getPt()->getId();

        $data['project_id'] = $this->getAppSession()->getProjectId();
        $data['pt_id'] = $this->getAppSession()->getPtid();

        $dao_projectpt = new Hrd_Models_AbsentDao();
        $hasil_projectpt = $dao_projectpt->getProject_Pt_Id($this->getAppSession(), $data);

        $data['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];

        $dao = new Hrd_Models_Claim_ClaimDao();

        //CEK APAKAH ADA YG SUDAH DI PAID
        $paid = $dao->paidFams();

        $hasil = $dao->getAllPfams($this->getAppRequest(),$this->getAppSession(),$data);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        return $dm;
    }

    public function filterdatapfamsRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'claim', array(), array());
        $setup = new Hrd_Models_General_Setup();
        
        $obj = new Hrd_Models_Claim_Claim();
        $data = $this->getAppData();
        $obj->setArrayTable($this->getAppData());
        $data['project_id'] = $this->getAppSession()->getProject()->getId();
        $data['pt_id'] = $this->getAppSession()->getPt()->getId();

        $data['project_id'] = $this->getAppSession()->getProjectId();
        $data['pt_id'] = $this->getAppSession()->getPtid();

        $dao_projectpt = new Hrd_Models_AbsentDao();
        $hasil_projectpt = $dao_projectpt->getProject_Pt_Id($this->getAppSession(), $data);

        $data['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];

        $dao = new Hrd_Models_Claim_ClaimDao();

        // $hasil = $dao->getAllPfams($this->getAppRequest(),$this->getAppSession(),$data);
        $hasil = json_decode($data['paramdata'],TRUE);

        $temp_hasil = $hasil;
        end($temp_hasil); 
        $last_hasil = key($temp_hasil) + 1;

        $return_hasil[0][0]['totalRow'] = $last_hasil;
        $return_hasil[1] = $hasil;

        $dm->setDataList($dataList);
        $dm->setHasil($return_hasil);
        return $dm;
    }

    public function departmentfamsRead() {

        $data = $this->getAppData();
        $data['project_id'] = $this->getAppSession()->getProjectId();
        $data['pt_id'] = $this->getAppSession()->getPtid();

        $dao = new Hrd_Models_AbsentDao();
        $hasil_projectpt = $dao->getProject_Pt_Id($this->getAppSession(), $data);

        $data['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];
        $data['user_id'] = $this->getAppSession()->getUser()->getId();

        $ma = new Hrd_Models_App_Mastertable_Department();
        // $aa = $ma->prosesDataWithSession($this->getAppSession(), TRUE);
        $aa = $ma->prosesDataWithoutSessionFams($this->getAppSession(), TRUE, $data);

        return Box_Tools::instantRead(array(
                    "HASIL" => 1,
                        ), array($aa));

        return $dm;
    }

    public function datafamsinitRead() {

        $data = $this->getAppData();
        $data['project_id'] = $this->getAppSession()->getProjectId();
        $data['pt_id'] = $this->getAppSession()->getPtid();

        $dao = new Hrd_Models_AbsentDao();
        $hasil_projectpt = $dao->getProject_Pt_Id($this->getAppSession(), $data);

        $data['projectpt'] = $hasil_projectpt[1][0];

        $data['text'] = 'YBS: TUNJ. PENGOBATAN KARY '.strtoupper(date('M')).date('y');

        return Box_Tools::instantRead(array('projectpt'=>$data['projectpt'],'text'=>$data['text']));
    }

    public function create_fams_voucherdepartmentRead() {

        $data = $this->getAppData();

        $dao = new Hrd_Models_Claim_ClaimDao();
        $hasil_api = $dao->getAPI($this->getAppRequest(),$this->getAppSession(),$data);
        $hasil_api_token = $dao->getAPI_token($this->getAppRequest(),$this->getAppSession(),$data);

        $dao_lastprocess = new Hrd_Models_Claim_ClaimDao();
        $hasil_lastprocess = $dao_lastprocess->getLastProcess($this->getAppRequest(),$this->getAppSession(),$data);

        //data
        $user_id = $this->getAppSession()->getUserId();
        $project_id = $data['project_id'];
        $pt_id = $data['pt_id'];

        $dao_projectpt = new Hrd_Models_AbsentDao();
        $hasil_projectpt = $dao_projectpt->getProject_Pt_Id($this->getAppSession(), $data);
        $projectpt_id = $hasil_projectpt[1][0]['projectpt_id'];

        $deptcode = $data['code'];

        $reg_date = date('Y-m-d',strtotime($data['reg_date']));
        $duedate = date('Y-m-d',strtotime($data['duedate']));

        $dataflow = 'O';
        $vendor = 'YBS';

        $payment_method = $data['payment_method'];
        $description = $data['description'];

        $data_param = json_decode($data['paramdata'],TRUE);

        if($data_param){

            $temp_data_param = $data_param;
            end($temp_data_param);
            $end_key = key($temp_data_param);

            $detail_array = array();
            $sumdetail_array = array();
            $subdetail_array = array();
            $detail = '{';

            $sum_money = 0;

            foreach($data_param as $key => $item){
                
                $money = explode('.', $item['claim_value']);
                $money = $money[0];

                $detail .= '"'.$key.'":';
                $detail .= '{';
                $detail .= '"coa":"99.99.999",';
                $detail .= '"description":"'.$description.' - '.$item['employee_name'].'",';
                $detail .= '"dataflow":"I",';
                $detail .= '"amount_detail":"'.$money.'",';
                $detail .= '"subdetail":"{}"';                
                $detail .= '}';

                if($key != $end_key){
                    $detail .= ',';
                }

                //versi array
                $detail_array[] = array(
                                        'coa'               => '99.99.999',
                                        'description'       => $description.' - '.$item['employee_name'],
                                        'dataflow'          => 'I',
                                        'amount_detail'     => $money,
                                        'subdetail'         => $subdetail_array
                                );

                //2023-04-10 | req Deslie, coa 99.99.999 isinya bundling lgsg totalan nya
                if($project_id == '1' || $project_id == '5096'){
                    $sum_money += $money;
                }
                //end 2023-04-10
            }

            $detail .= '}';

            //2023-04-10 | req Deslie, coa 99.99.999 isinya bundling lgsg totalan nya
            if($sum_money > 0){
                $sumdetail_array[] = array(
                                            'coa'               => '99.99.999',
                                            'description'       => $description,
                                            'dataflow'          => 'I',
                                            'amount_detail'     => $sum_money,
                                            'subdetail'         => $subdetail_array
                                    );
                
                $detail_array = NULL;
                $detail_array = $sumdetail_array;
            }
            //end 2023-04-10
        }

        if($hasil_api && $hasil_api_token){
            
            $url = $hasil_api[1][0]['url'];

            if($hasil_lastprocess){
                //all
                if($hasil_lastprocess[0]){
                    $count_all = $hasil_lastprocess[0][0]['uploadapi_id_all'];
                    $explode_all = explode('-', $count_all);
                    $count_all_id = $explode_all[3] + 1;
                }else{
                    $count_all_id = '1';
                }
                //projectpt
                if($hasil_lastprocess[1]){
                    $count_projectpt = $hasil_lastprocess[1][0]['uploadapi_id_projectpt'];
                    $explode_projectpt = explode('-', $count_projectpt);
                    $count_projectpt_id = $explode_projectpt[2] + 1;
                }else{
                    $count_projectpt_id = '1';
                }

                //year
                if($hasil_lastprocess[0]){
                    $count_year = $hasil_lastprocess[0][0]['uploadapi_id_all'];
                    $explode_year = explode('-', $count_year);
                    $count_year_id = $explode_year[0];

                    $initial_year_now = 'MED'.date('y');

                    //kalo yearnya beda, maka reset semuanya dari 1
                    if($initial_year_now != $count_year_id){
                        $count_all_id = '1';
                        $count_projectpt_id = '1';
                    }

                }
            }
            
            //(intitial) = MED
            //(year) = 22
            //(projectpt_id) = 1
            //(count_total_projectpt) = 1
            //(count_total_allprojectpt) = 1

            //result = MED22-1-1-1

            $uploaduniquenumber = 'MED'.date('y').'-'.$projectpt_id.'-'.$count_projectpt_id.'-'.$count_all_id;
            $data['uploaduniquenumber'] = $uploaduniquenumber;

            $date_now = date('Y-m-d').' 08:30:00';

            //request token
            $signature_token = $this->generateOauthSignature($hasil_api_token[1][0]['privatekey'], $hasil_api_token[1][0]['client_secret'], $date_now);

            $response_token = $this->getToken($date_now, $hasil_api_token, $signature_token);

            // $curl_token = curl_init();

            // curl_setopt_array($curl_token, array(
            //   CURLOPT_URL => $hasil_api_token[1][0]['url'],
            //   CURLOPT_RETURNTRANSFER => true,
            //   CURLOPT_ENCODING => '',
            //   CURLOPT_MAXREDIRS => 10,
            //   CURLOPT_TIMEOUT => 0,
            //   CURLOPT_FOLLOWLOCATION => true,
            //   CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            //   CURLOPT_CUSTOMREQUEST => 'POST',
            //   CURLOPT_POSTFIELDS =>'{
            //     "grantType":"client_credentials",
            //     "privateKey" : "'.$hasil_api_token[1][0]['privatekey'].'"
            // }',
            //   CURLOPT_HTTPHEADER => array(
            //     'X-API-KEY: '.$hasil_api_token[1][0]['client_secret'],
            //     'X-TIMESTAMP: '.$date_now,
            //     'X-SIGNATURE: '.$signature_token,
            //     'Content-Type: application/json'
            //   ),
            // ));

            // $response_token = curl_exec($curl_token);

            // curl_close($curl_token);

            // $response_token = '{
            //     "statusCode": "2007300",
            //     "message": "Successful",
            //     "accessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Im1pY2hhZWxAY2lwdXRyYS5jb206NDAwRUQxOTlERDRFQURFQ0RERjRCRTExQjQ0MjhCRjI6NDA2NSIsImlhdCI6MTY3Njk0NzMwNiwiZXhwIjoxNjc2OTUwOTA2fQ.HKq_obxwOXn-DVQg8DlcOWJWh5r_OG9EUogxbxbiZOg",
            //     "tokenType": "bearer",
            //     "expiresIn": 3600
            // }';

            $response = '';

            if($response_token){

                $result_token = json_decode($response_token,TRUE);

                if($result_token['statusCode'] == '2007300'){

                    $accessToken = $result_token['accessToken'];

                    //hit API
                    $url_api_explode = explode('.com', $hasil_api[1][0]['url']);
                    
                    if(($project_id == '5096' && $pt_id == '5232') || ($project_id == '4065' && $pt_id == '4223')){
                        $datasource = 'TEST';
                        $project_id = '4065';
                        $pt_id = '4223';
                    }else{
                        $datasource = 'HCMS';
                    }

                    $body_hash = array(
                                    'uploaduniquenumber' => $uploaduniquenumber,
                                    'datasource' => $datasource,
                                    'project_id' => $project_id,
                                    'pt_id' => $pt_id,
                                    'projectpt_id' => ' ',
                                    'department' => $deptcode,
                                    'reg_date' => $reg_date,
                                    'duedate' => $duedate,
                                    'dataflow' => $dataflow,
                                    'vendor' => $vendor,
                                    "vendor_note" => "",
                                    'description' => $description,
                                    'payment_method' => $payment_method,
                                    'addby' => $user_id,
                                    'is_sop' => '',
                                    'no_sop_or_spk' => '',
                                    'vendor_bank_currency' => 'IDR',
                                    'vendor_bank_account_name' => '',
                                    'vendor_bank_account_no' => '',
                                    'vendor_bank_name' => '',
                                    'is_pajak' => '',
                                    'detail' => $detail_array
                                );

                    $body_hash_json = json_encode($body_hash);

                    $signature_api = $this->generateServiceSignature($hasil_api[1][0]['client_secret'],'POST',$url_api_explode[1],$accessToken,$date_now,$body_hash_json );

                    $curl = curl_init();

                    curl_setopt_array($curl, array(
                      CURLOPT_URL => $hasil_api[1][0]['url'],
                      CURLOPT_RETURNTRANSFER => true,
                      CURLOPT_ENCODING => '',
                      CURLOPT_MAXREDIRS => 10,
                      CURLOPT_TIMEOUT => 0,
                      CURLOPT_FOLLOWLOCATION => true,
                      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                      CURLOPT_CUSTOMREQUEST => 'POST',
                      CURLOPT_POSTFIELDS => $body_hash_json,
                      CURLOPT_HTTPHEADER => array(
                        'Authorization: Bearer '.$accessToken,
                        'X-TIMESTAMP: '.$date_now,
                        'X-SIGNATURE: '.$signature_api,
                        'Content-Type: application/json'
                      ),
                    ));

                    $response = curl_exec($curl);

                    curl_close($curl);

                    // $response = '{
                    //                 "statusCode": "2012001",
                    //                 "message": "Success Insert Data Voucher Department.",
                    //                 "data": {
                    //                     "voucher_no": "FA0008/12",
                    //                     "datasource": "TEST",
                    //                     "uploaduniquenumber": "33"
                    //                 },
                    //                 "additionalInfo": []
                    //             }';
                }
            }

            // $curl = curl_init();

            // curl_setopt_array($curl, array(
            //   CURLOPT_URL => $hasil_api[1][0]['url'],
            //   CURLOPT_RETURNTRANSFER => true,
            //   CURLOPT_ENCODING => '',
            //   CURLOPT_MAXREDIRS => 10,
            //   CURLOPT_TIMEOUT => 0,
            //   CURLOPT_FOLLOWLOCATION => true,
            //   CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            //   CURLOPT_CUSTOMREQUEST => 'POST',
            //   CURLOPT_POSTFIELDS => array(
            //     'uploaduniquenumber' => $uploaduniquenumber,
            //     'datasource' => 'HCM',
            //     'project_id' => '4065',
            //     'pt_id' => '4223',
            //     // 'project_id' => $project_id,
            //     // 'pt_id' => $pt_id,
            //     'projectpt_id' => ' ',
            //     'department_id' => '5904',
            //     // 'department_id' => $department_id,
            //     'reg_date' => $reg_date,
            //     'duedate' => $duedate,
            //     'dataflow' => $dataflow,
            //     'vendor' => $vendor,
            //     'description' => $description,
            //     'payment_method' => $payment_method,
            //     'addby' => '9469',
            //     // 'addby' => $user_id,
            //     'detail' => $detail,
            //     'approveby_id' => '0',
            //     'vendor_bank_currency' => 'IDR',
            //     'vendor_bank_account_name' => '',
            //     'vendor_bank_account_no' => '',
            //     'vendor_bank_name' => '',
            //     'is_pjk' => '',
            //     'is_pajak' => ''),
            //   CURLOPT_HTTPHEADER => array(
            //     'X-API-KEY: '.$hasil_api[1][0]['apikey']
            //   ),
            // ));

            // $response = curl_exec($curl);

            // curl_close($curl);
            

            // $response = '{"statusCode":201,"message":"Success Insert Data Voucher Department.","data":{"success":1,"message":"SUCCESS: Voucher No. IT0012\/12","voucher_no":"IT0012\/12"}}';

            if($response){

                $result = json_decode($response,TRUE);

                //2012001 create | 2002002 update
                if($result['statusCode'] == '2012001' || $result['statusCode'] == '2002002'){
                    
                    $status = 1;
                    $message = $result['message'].'! Pengiriman data ke FAMS Anda berhasil, silahkan cek Voucher Department Anda..';

                    $voucher_no = $result['data']['voucher_no'];
                    $data['voucher_no'] = $voucher_no;

                    foreach($data_param as $key => $item){
                        $dao_process = new Hrd_Models_Claim_ClaimDao();
                        $hasil_process = $dao_process->processFams($this->getAppRequest(),$this->getAppSession(),$data, $item);
                    }

                }else{
                    $status = 0;
                    $message = $result['message'].'! Pengiriman data ke FAMS Anda gagal..';
                }

            }else{
                $status = 0;
                $message = 'Connection Failed ! Pengiriman data ke FAMS Anda gagal..';
            }

            $arrayRespon = array(
                "STATUS" => $status,
                "MSG" => $message
            );
            return Box_Tools::instantRead($arrayRespon);

        }
    }

    function getToken($date_now, $hasil_api_token, $signature_token){
            $curl_token = curl_init();

            curl_setopt_array($curl_token, array(
              CURLOPT_URL => $hasil_api_token[1][0]['url'],
              CURLOPT_RETURNTRANSFER => true,
              CURLOPT_ENCODING => '',
              CURLOPT_MAXREDIRS => 10,
              CURLOPT_TIMEOUT => 0,
              CURLOPT_FOLLOWLOCATION => true,
              CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
              CURLOPT_CUSTOMREQUEST => 'POST',
              CURLOPT_POSTFIELDS =>'{
                "grantType":"client_credentials",
                "privateKey" : "'.$hasil_api_token[1][0]['privatekey'].'"
            }',
              CURLOPT_HTTPHEADER => array(
                'X-API-KEY: '.$hasil_api_token[1][0]['client_secret'],
                'X-TIMESTAMP: '.$date_now,
                'X-SIGNATURE: '.$signature_token,
                'Content-Type: application/json'
              ),
            ));

            $response_token = curl_exec($curl_token);

            curl_close($curl_token);

            // $response_token = '{
            //     "statusCode": "2007300",
            //     "message": "Successful",
            //     "accessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Im1pY2hhZWxAY2lwdXRyYS5jb206NDAwRUQxOTlERDRFQURFQ0RERjRCRTExQjQ0MjhCRjI6NDA2NSIsImlhdCI6MTY3Njk0NzMwNiwiZXhwIjoxNjc2OTUwOTA2fQ.HKq_obxwOXn-DVQg8DlcOWJWh5r_OG9EUogxbxbiZOg",
            //     "tokenType": "bearer",
            //     "expiresIn": 3600
            // }';

            return $response_token;
    }

    function generateOauthSignature($private_key_str, $client_id, $iso_time)
    {
$private_key = <<<EOF
-----BEGIN PRIVATE KEY-----
$private_key_str
-----END PRIVATE KEY-----
EOF;
        $algo = "SHA256";
        $dataToSign = $client_id . "|" . $iso_time;
        openssl_sign($dataToSign, $binary_signature, $private_key, $algo);
        $signature = base64_encode($binary_signature);
        return $signature;
    }


    function hashbody($body)
    {
        if (empty($body)) {
            $body = '';
        } else {
            //$toStrip = [" ", "\r", "\n", "\t"];
            //$body = str_replace($toStrip, '', $body);
        }
        return strtolower(hash('sha256', $body));
    }

    function getRelativeUrl($url)
    {
        $path = parse_url($url, PHP_URL_PATH);
        if (empty($path)) {
            $path = '/';
        }

        $query = parse_url($url, PHP_URL_QUERY);
        if ($query) {
            parse_str($query, $parsed);
            ksort($parsed);
            $query = '?' . http_build_query($parsed);
        }
        $formatedUrl = $path . $query;
        return $formatedUrl;
    }

    function generateServiceSignature($client_secret, $method,$url, $auth_token, $isoTime, $bodyToHash = "")
    {
        $hash = hash("sha512", "");
        if (is_array($bodyToHash)) {
            $encoderData = json_encode($bodyToHash, JSON_UNESCAPED_SLASHES);
            $hash = $this->hashbody($encoderData);
        } else {
            $hash = $this->hashbody($bodyToHash);
        }

        $stringToSign = $method.":".$this->getRelativeUrl($url) . ":" . $auth_token . ":" . $hash . ":" . $isoTime;
        $signature = base64_encode(hash_hmac('sha512', $stringToSign, $client_secret, true));
        return $signature;
    }

    public function filterdatadeletepfamsRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'claim', array(), array());
        $setup = new Hrd_Models_General_Setup();
        
        $obj = new Hrd_Models_Claim_Claim();
        $data = $this->getAppData();
        $obj->setArrayTable($this->getAppData());
        $data['project_id'] = $this->getAppSession()->getProject()->getId();
        $data['pt_id'] = $this->getAppSession()->getPt()->getId();

        $data['project_id'] = $this->getAppSession()->getProjectId();
        $data['pt_id'] = $this->getAppSession()->getPtid();

        $dao_projectpt = new Hrd_Models_AbsentDao();
        $hasil_projectpt = $dao_projectpt->getProject_Pt_Id($this->getAppSession(), $data);

        $data['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];

        $dao = new Hrd_Models_Claim_ClaimDao();

        $paramdata = json_decode($data['paramdata'],TRUE);
        $temp_voucher = array();
        
        $hasil = '';

        if($paramdata){

            foreach($paramdata as $key => $item){
                $temp_voucher[] = $item['voucher_no'];
            }

            $voucher_no = array_unique($temp_voucher);

            $temp_end_voucher_no = $voucher_no;
            end($temp_end_voucher_no);
            $end_key_voucher_no = key($temp_end_voucher_no);
            
            $temp_voucher_no = '';
            foreach($voucher_no as $key => $item){
                $temp_voucher_no .= "".$item."";
                if($key < $end_key_voucher_no){
                    $temp_voucher_no = ",";
                }
            }

            $voucher_no = $temp_voucher_no;
            $data['voucher_no'] = $voucher_no;

            $hasil = $dao->getAllPfams_voucherno($this->getAppRequest(),$this->getAppSession(),$data);
        }

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function delete_fams_voucherdepartmentRead() {

        $data = $this->getAppData();

        $dao = new Hrd_Models_Claim_ClaimDao();
        $hasil_api = $dao->getAPI($this->getAppRequest(),$this->getAppSession(),$data);

        //data
        $user_id = $this->getAppSession()->getUserId();
        $project_id = $data['project_id'];
        $pt_id = $data['pt_id'];

        $dao_projectpt = new Hrd_Models_AbsentDao();
        $hasil_projectpt = $dao_projectpt->getProject_Pt_Id($this->getAppSession(), $data);
        $projectpt_id = $hasil_projectpt[1][0]['projectpt_id'];

        $description = $data['description'];

        $paramdata = json_decode($data['paramdata'],TRUE);

        if($paramdata){
            
            $dao = new Hrd_Models_Claim_ClaimDao();

            $temp_uploadapi = array();
            
            foreach($paramdata as $key => $item){
                $temp_uploadapi[] = $item['uploadapi_id'];
            }

            $uploadapi_id = array_unique($temp_uploadapi);
        }

        if($hasil_api){
            
            $hasil_api_token = $dao->getAPI_token($this->getAppRequest(),$this->getAppSession(),$data);

            $date_now = date('Y-m-d').' 08:30:00';

            //request token
            $signature_token = $this->generateOauthSignature($hasil_api_token[1][0]['privatekey'], $hasil_api_token[1][0]['client_secret'], $date_now);

            $response_token = $this->getToken($date_now, $hasil_api_token, $signature_token);

            $response = '';

            if($response_token){

                $result_token = json_decode($response_token,TRUE);

                if($result_token['statusCode'] == '2007300'){

                    $accessToken = $result_token['accessToken'];

                    //hit API
                    $url_api_explode = explode('.com', $hasil_api[1][0]['url']);
                    
                    if(($project_id == '5096' && $pt_id == '5232') || ($project_id == '4065' && $pt_id == '4223')){
                        $datasource = 'TEST';
                        $project_id = '4065';
                        $pt_id = '4223';
                    }else{
                        $datasource = 'HCMS';
                    }

                    foreach($uploadapi_id as $key => $item){

                        $body_hash = array(
                                        "uploaduniquenumber" => $item,
                                        "project_id" => $project_id,
                                        "pt_id" => $pt_id,
                                        "datasource" => $datasource,
                                        "reasondelete" => $description,
                                        "deleteby" => $user_id
                                    );

                        $body_hash_json = json_encode($body_hash);

                        $signature_api = $this->generateServiceSignature($hasil_api[1][0]['client_secret'],'DELETE',$url_api_explode[1],$accessToken,$date_now,$body_hash_json );

                        $curl = curl_init();

                        curl_setopt_array($curl, array(
                          CURLOPT_URL => $hasil_api[1][0]['url'],
                          CURLOPT_RETURNTRANSFER => true,
                          CURLOPT_ENCODING => '',
                          CURLOPT_MAXREDIRS => 10,
                          CURLOPT_TIMEOUT => 0,
                          CURLOPT_FOLLOWLOCATION => true,
                          CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                          CURLOPT_CUSTOMREQUEST => 'DELETE',
                          CURLOPT_POSTFIELDS => $body_hash_json,
                          CURLOPT_HTTPHEADER => array(
                            'Authorization: Bearer '.$accessToken,
                            'X-TIMESTAMP: '.$date_now,
                            'X-SIGNATURE: '.$signature_api,
                            'Content-Type: application/json'
                          ),
                        ));

                        $response = curl_exec($curl);

                        curl_close($curl);

                        // $response = '{
                        //                 "statusCode": "2002003",
                        //                 "message": "Success Hapus Data Voucher Department.",
                        //                 "data": {
                        //                     "voucher_no": "FA0008/12",
                        //                     "datasource": "TEST",
                        //                     "uploaduniquenumber": "33"
                        //                 },
                        //                 "additionalInfo": []
                        //             }';

                        if($response){

                            $result = json_decode($response,TRUE);

                            if($result['statusCode'] == 2002003){
                            
                                $status = 1;
                                $message = $result['message'].'! Pengiriman data ke FAMS Anda berhasil, silahkan cek Voucher Department Anda..';

                                $voucher_no = $result['data']['voucher_no'];
                                $data['voucher_no'] = $voucher_no;
                                
                                $paramdelete = array();
                                $paramdelete['project_id'] = $data['project_id'];;
                                $paramdelete['pt_id'] = $data['pt_id'];;
                                $paramdelete['voucher_no'] = $voucher_no;
                                
                                $dao_process = new Hrd_Models_Claim_ClaimDao();
                                $getalldeletedata_voucherno = $dao_process->getAllPfams_voucherno($this->getAppRequest(),$this->getAppSession(),$paramdelete);
                                
                                foreach($getalldeletedata_voucherno[1] as $key_param => $item_param){
                                    //$dao_process = new Hrd_Models_Claim_ClaimDao();
                                    $hasil_process = $dao_process->deleteFams($this->getAppRequest(),$this->getAppSession(),$data, $item, $item_param);
                                }
                                
                            }else{
                                $status = 0;
                                $message = $result['message'].'! Pengiriman data ke FAMS Anda gagal..';
                            }

                        }else{
                            $status = 0;
                            $message = 'Connection Failed ! Pengiriman data ke FAMS Anda gagal..';
                        }
                    }
                }
            }else{
               $status = 0;
               $message = 'Connection Failed ! Pengiriman data ke FAMS Anda gagal..'; 
            }

            // $url = $hasil_api[1][0]['url'];

            // foreach($uploadapi_id as $key => $item){

            //     // $curl = curl_init();

            //     // curl_setopt_array($curl, array(
            //     //   CURLOPT_URL => $hasil_api[1][0]['url'],
            //     //   CURLOPT_RETURNTRANSFER => true,
            //     //   CURLOPT_ENCODING => '',
            //     //   CURLOPT_MAXREDIRS => 10,
            //     //   CURLOPT_TIMEOUT => 0,
            //     //   CURLOPT_FOLLOWLOCATION => true,
            //     //   CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            //     //   CURLOPT_CUSTOMREQUEST => 'DELETE',
            //     //   CURLOPT_POSTFIELDS => '{
            //     //         "uploaduniquenumber" : "'.$item.'",
            //     //         "project_id" : '.$project_id.',
            //     //         "pt_id" : '.$pt_id.',
            //     //         "datasource" : "HCM",
            //     //         "reasondelete" : "'.$description.'",
            //     //         "deleteby_id" : "'.$user_id.'"
            //     //     }',
            //     //   CURLOPT_HTTPHEADER => array(
            //     //     'X-API-KEY: '.$hasil_api[1][0]['apikey'],
            //     //     'Content-Type: application/json'
            //     //   ),
            //     // ));

            //     // $response = curl_exec($curl);

            //     // curl_close($curl);

            //     $response = '{"statusCode":201,"message":"Success Hapus Data Voucher Department.","data":{"success":1,"message":"Voucher Deleted Successfully","voucher_no":"IT0012\/12"}}';
                
            //     if($response){

            //         $result = json_decode($response,TRUE);

            //         if($result['statusCode'] == 201){
                    
            //             $status = 1;
            //             $message = $result['message'].'! Pengiriman data ke FAMS Anda berhasil, silahkan cek Voucher Department Anda..';

            //             $voucher_no = $result['data']['voucher_no'];
            //             $data['voucher_no'] = $voucher_no;
                        
            //             foreach($paramdata as $key_param => $item_param){
            //                 $dao_process = new Hrd_Models_Claim_ClaimDao();
            //                 $hasil_process = $dao_process->deleteFams($this->getAppRequest(),$this->getAppSession(),$data, $item, $item_param);
            //             }
                        
            //         }else{
            //             $status = 0;
            //             $message = $result['message'].'! Pengiriman data ke FAMS Anda gagal..';
            //         }

            //     }else{
            //         $status = 0;
            //         $message = 'Connection Failed ! Pengiriman data ke FAMS Anda gagal..';
            //     }


            // }

            $arrayRespon = array(
                "STATUS" => $status,
                "MSG" => $message
            );
            return Box_Tools::instantRead($arrayRespon);

        }
    }

    public function exportdataRead() {

        $obj = new Hrd_Models_Report_ClaimProcess();

        $params = $this->getAppData();
        $data = json_decode($params['data'], TRUE);

        $em = new Hrd_Models_Claim_Claim();
        $dao = new Hrd_Models_Claim_ClaimDao();

        $res = array();
        foreach($data as $key => $item){
            $param = array();
            $param['project_id'] = $this->getAppSession()->getProjectId();
            $param['pt_id'] = $this->getAppSession()->getPtid();
            $param['id'] = $item['klaimpengobatan_kacamata_id'];
            $param['jenispengobatan_id'] = $item['jenispengobatan_id'];

            $detail = $dao->getDetailBrowse($this->getAppRequest(),$this->getAppSession(),$param);
            if($detail){
                $res[] = $detail;
            }
        }

        $result = $obj->exceldata($res);    
           
        $hasil = TRUE;
        $arrayRespon = array(
            "HASIL" => $hasil
        );
        return Box_Tools::instantRead($arrayRespon, array($result));

    }

    public function plafoninfoRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
        
        $creator = new Box_Models_App_Creator();
        
        $masterPT = new Hrd_Models_App_Mastertable_JenisPengobatan();
        $allPT = $masterPT->prosesDataWithSession($this->getAppSession(), TRUE);
        
        

        $data = $this->getAppData();
        $dao = new Hrd_Models_Pengobatan_PlafonKaryawanDao();
        $plafon = new Hrd_Models_Pengobatan_PlafonKaryawan();
        $plafon->setProject($this->getAppSession()->getProject());
        $plafon->setPt($this->getAppSession()->getPt());
        $plafon->setYear(isset($data["year"])?$data["year"]:0);
        
        $dataPlafon = $dao->getAllByYear($this->getAppRequest(),$plafon);
        $plafons = array();
        if(isset($dataPlafon[1])){
            foreach ($dataPlafon[1] as $rec){
                $plafon = new Hrd_Models_Pengobatan_PlafonKaryawan();
                $plafon->setArrayTable($rec);
                $plafons[] = $plafon;
            }
        }
        
      
        /// param limit
        $daoParam = new Hrd_Models_Master_GeneralParameterDao();
      //  $hasilParam = $daoParam->getParamsByProjectPtWOPL($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId(), "medicalparameter");
        $hasilParam = $daoParam->getParamsByProjectPtWOPLB("medicalparameter",$this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId());

        $hasilParam = Box_Tools::toObjectResult($hasilParam, new Hrd_Models_Master_GeneralParameter());
        $minimalTahun = 0;
        $persenPenambahan = 0;
        
        foreach ($hasilParam as $param) {
            
            
        
            if($data["jenis"]=="FRAME" && $param->getName()==Box_Config::GENERALPARAMATER_NAME_CLAIM_FRAMELIMIT){
                $minimalTahun = $param->getValue();
            }else if($data["jenis"]=="LENSA" && $param->getName()==Box_Config::GENERALPARAMATER_NAME_CLAIM_LENSLIMIT){
                $minimalTahun = $param->getValue();
            }
            
           
            
            if($param->getName()==Box_Config::GENERALPARAMATER_NAME_CLAIM_PERCENTADDPLF){
                $persenPenambahan = $param->getValue();
            }
        }
        
        /// /param limit
        
        
        /// employee detail
        $dao = new Hrd_Models_Master_EmployeeDao();
        $em = new Hrd_Models_Master_EmployeePersonal();
        $em->setId(intval($data["employee_id"]));
        $hasilEmployee = $dao->getDetail($em);
        $hasilEmployee = Box_Tools::toObjectRow($hasilEmployee,new Hrd_Models_Master_Employee());
        /// /employee detail
        
        $otherAT = array(array(
            "PARAM_LIMIT"=>$minimalTahun,
            "PARAM_PERSENADD"=>$persenPenambahan
        ));
       

        $dm->setHasil(array($allPT,$plafons,$hasilEmployee,$otherAT));
        
        
        return $dm;
    }

    
}

?>
