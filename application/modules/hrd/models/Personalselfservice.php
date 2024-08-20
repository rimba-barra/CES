<?php

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Hrd_Models_Personalselfservice extends Zend_Db_Table_Abstract {

    private $setting = null;
    private $dao_emp = null;
    private $t_relationtype = null;
    private $t_relation = null;
    private $ps_relation = null;
    private $log_m_employee = null;
    private $log_t_relation = null;
    private $t_organization = null;
    private $ps_organization = null;
    private $log_t_organization = null;
    private $t_education = null;
    private $log_t_education = null;
    private $ps_education = null;
    private $t_traininghistory = null;
    private $ps_traininghistory = null;
    private $log_t_traininghistory = null;
    private $t_potency = null;
    private $ps_potency = null;
    private $log_t_potency = null;
    private $t_jobhistory = null;
    private $ps_jobhistory = null;
    private $log_t_jobhistory = null;
    private $m_employee = null;	
    private $t_statusinformation = null;	
    // id : 1893 sec user, punya account dengan username api.hcms.art 



    function init() {
        $this->setting = new Hrd_Models_General_Setup();
        $this->dao_emp = new Hrd_Models_Master_EmployeeDao();
        $this->setting->_storeprocedure = 'sp_personalselfservice';
        $this->t_relationtype = 't_relationtype';
        $this->t_relation = 't_relation';
        $this->ps_relation = 'ps_relation';
        $this->ps_employee = 'ps_employee';
        $this->m_employee = 'm_employee';
        $this->log_m_employee = 'log_m_employee';
        $this->log_t_relation = 'log_t_relation';
        $this->t_organization = 't_organization';
        $this->ps_organization = 'ps_organization';
        $this->log_t_organization = 'log_t_organization';
        $this->t_education = 't_educationhistory';
        $this->ps_education = 'ps_educationhistory';
        $this->log_t_education = 'log_t_educationhistory';
        $this->t_traininghistory = 't_traininghistory';
        $this->ps_traininghistory = 'ps_traininghistory';
        $this->log_t_traininghistory = 'log_t_traininghistory';
        $this->t_potency = 't_employeepotency';
        $this->ps_potency = 'ps_employeepotency';
        $this->log_t_potency = 'log_t_employeepotency';
        $this->t_jobhistory = 't_jobhistory';
        $this->ps_jobhistory = 'ps_jobhistory';
        $this->log_t_jobhistory = 'log_t_jobhistory';
        $this->ps_document = 'ps_dokumen';
        $this->log_document = 'log_dokumen';
	$this->t_statusinformation = 't_statusinformation';

    }

    function RoutesAllActions($param) {
        $return['success'] = false;

        if (is_array($param) && count($param)) {
            try {


                $this->setting->_param = $param;
                switch ($this->setting->_param['mode_read']) {
                    case 'searching':
                        if (!is_numeric($this->setting->_param['employee_id'])) {
                            $this->setting->_param['employee_name'] = $this->setting->_param['employee_id'];
                            $this->setting->_param['employee_id'] = 0;
                        }

                        $implode_employee_id = $this->getdataInps();
                        $this->setting->_param['implodedata_employee'] = $implode_employee_id;

                        if ($param['status'] == 1) {
                            $this->setting->_paramsql = 'read_updatedata';
                        } else if ($param['status'] == 2) {
                            $this->setting->_paramsql = 'read_valid';
                        } else if ($param['status'] == 3) {
                            $this->setting->_paramsql = 'read_notupdateandvalid';
                        }else if($param['status'] == 4) {
                            $this->setting->_paramsql = 'read_new_employee';
			   //$result = $this->setting->executeSP();
			   //print_r($result);	 	
                        }
                        
                        $result = $this->setting->executeSP();
                        //print_r($this->setting->_dataexec);
                        $counter = $result[0][0]['RECORD_TOTAL'];
                        $data = $result[1];
                        $message = null;
                        $valid = true;
                        break;
                    case 'getdefaultdepartment':
                        $result = $this->setting->get_defaultdepartment();
                        //print_r($this->setting->_dataexec);
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        $data = $result[2];
                        $message = null;
                        $valid = true;
                        break;
                    case 'getdefaultemployee':
                        $result = $this->setting->get_defaultemployee();
                        //print_r($this->setting->_dataexec);
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        $data = $result[2];
                        $message = null;
                        $valid = true;
                        break;
                    case 'getdata_approve_spouse':
                        $this->setting->_paramsql = $this->setting->_param['mode_read'];
                        $this->setting->_param = array(
                            'employee_id' => $param['employee_id'],
                            'relationtype_id' => 3,
                        );
                        $result = $this->setting->executeSP();
                        if (!empty($result[0])) {
                            $data = $result[0][0];
                            $valid = true;
                            $counter = 1;
                        } else {
                            $data = null;
                            $valid = false;
                            $counter = 0;
                        }
                        $message = 'get data spouse';
                        break;
                    case 'getdatachield':
                        $this->setting->_paramsql = 'getdata_approve_spouse';
                        $this->setting->_param = array(
                            'employee_id' => $param['employee_id'],
                            'relationtype_id' => 4,
                        );
                        $result = $this->setting->executeSP();
                        //print_r($this->setting->_dataexec);
                        if (!empty($result[0])) {
                            $data = $result[0];
                            $valid = true;
                            $counter = 1;
                        } else {
                            $data = null;
                            $valid = false;
                            $counter = 0;
                        }
                        $message = 'get data chield';
                        break;
                    case 'getdatasibling':
                        $this->setting->_paramsql = 'getdata_approve_spouse';
                        $this->setting->_param = array(
                            'employee_id' => $param['employee_id'],
                            'relationtype_id' => 5,
                        );
                        $result = $this->setting->executeSP();
                        //print_r($this->setting->_dataexec);
                        if (!empty($result[0])) {
                            $data = $result[0];
                            $valid = true;
                            $counter = 1;
                        } else {
                            $data = null;
                            $valid = false;
                            $counter = 0;
                        }
                        $message = 'get data sibling';
                        break;
                    case 'getdata_approve_father':
                        $this->setting->_paramsql = 'getdata_approve_spouse';
                        $this->setting->_param = array(
                            'employee_id' => $param['employee_id'],
                            'relationtype_id' => 1,
                        );
                        $result = $this->setting->executeSP();
                        if (!empty($result[0])) {
                            $data = $result[0][0];
                            $valid = true;
                            $counter = 1;
                        } else {
                            $data = null;
                            $valid = false;
                            $counter = 0;
                        }
                        $message = 'get data father';
                        break;
                    case 'getdata_approve_mother':
                        $this->setting->_paramsql = 'getdata_approve_spouse';
                        $this->setting->_param = array(
                            'employee_id' => $param['employee_id'],
                            'relationtype_id' => 2,
                        );
                        $result = $this->setting->executeSP();
                        if (!empty($result[0])) {
                            $data = $result[0][0];
                            $valid = true;
                            $counter = 1;
                        } else {
                            $data = null;
                            $valid = false;
                            $counter = 0;
                        }
                        $message = 'get data mother';
                        break;
                    case 'getdatacontactemergency':
                        $this->setting->_paramsql = 'getdata_approve_spouse';
                        $this->setting->_param = array(
                            'employee_id' => $param['employee_id'],
                            'relationtype_id' => 7,
                        );
                        $result = $this->setting->executeSP();
                        if (!empty($result[0])) {
                            $data = $result[0];
                            $valid = true;
                            $counter = 1;
                        } else {
                            $data = null;
                            $valid = false;
                            $counter = 0;
                        }
                        $message = 'get data contact emergency';
                        break;
                    case 'getdataorganization':
                        $paramdata = array(
                            'employee_id' => $param['employee_id'],
                        );
                        $result = $this->getdata_in_transaction_table($this->ps_organization, $paramdata);
                        if (!empty($result[0])) {
                            $data = $result[0];
                            $valid = true;
                            $counter = 1;
                        } else {
                            $data = null;
                            $valid = false;
                            $counter = 0;
                        }
                        $message = 'get data organization';
                        break;
                    case 'getdataeducationformal':
                        $paramdata = array(
                            'employee_id' => $param['employee_id'],
                        );
                        $result = $this->getdata_in_transaction_table($this->ps_education, $paramdata);
                        if (!empty($result[0])) {
                            $data = $result[0];
                            $valid = true;
                            $counter = 1;
                        } else {
                            $data = null;
                            $valid = false;
                            $counter = 0;
                        }
                        $message = 'get data education formal';
                        break;
                    case 'getdataeducationnonformal':
                        $paramdata = array(
                            'employee_id' => $param['employee_id'],
                        );
                        $result = $this->getdata_in_transaction_table($this->ps_traininghistory, $paramdata);
                        if (!empty($result[0])) {
                            $data = $result[0];
                            $valid = true;
                            $counter = 1;
                        } else {
                            $data = null;
                            $valid = false;
                            $counter = 0;
                        }
                        $message = 'get data education formal';
                        break;
                    case 'getdata_approve_potency':
                        $paramdata = array(
                            'employee_id' => $param['employee_id'],
                        );
                        $result = $this->getdata_in_transaction_table($this->ps_potency, $paramdata);
                        if (!empty($result[0])) {
                            $data = $result[0];
                            $valid = true;
                            $counter = 1;
                        } else {
                            $data = null;
                            $valid = false;
                            $counter = 0;
                        }
                        $message = 'get data potency';
                        break;
                    case 'getdatajobhistory':
                        $paramdata = array(
                            'employee_id' => $param['employee_id'],
                        );
                        $result = $this->getdata_in_transaction_table($this->ps_jobhistory, $paramdata);
                        if (!empty($result[0])) {
                            $data = $result[0];
                            $valid = true;
                            $counter = 1;
                        } else {
                            $data = null;
                            $valid = false;
                            $counter = 0;
                        }
                        $message = 'get data job history';
                        break;
                    case 'getdata_newdata_employee':
                        $paramdata = array(
                            'project_id' => $param['project_id'],
                            'pt_id' => $param['pt_id'],
                            'employee_nik' =>$this->setting->setStringdata($param['employee_nik']),
                        );
 			//print_r($paramdata);
                        $result = $this->getdata_in_transaction_table($this->ps_employee, $paramdata);
                        $activetab = array(
                            'ps_employee' => 1,
                            'ps_education' => 0,
                            'ps_potency' => 0,
                            'ps_jobhistory' => 0,
                            'ps_organization' => 0,
                            'ps_relation' => 0,
                            'ps_traininghistory' => 0,
                            'ps_document' => 0,
                            'ps_family' => 0,
                        );
                        
                        if (!empty($result[0])) { 
                            $result[0][0]['activetab'] =$activetab; 
                            $data = $result[0][0];
                            $valid = true;
                            $counter = 1;
                        } else {
                            $data = array();
                            $data['activetab']=$activetab;
                            $valid = false;
                            $counter = 0;
                        }
                        $message = 'get data new employee in temporary';
                        break;
                     case 'getdata_approve_employee':
                       $employee_id =$param['employee_id'];
                        $paramdata = array(
                            'employee_id' => $employee_id,
                        );
                        $result = $this->getdata_in_transaction_table($this->ps_employee, $paramdata);
                        if (!empty($result[0])) {
                            $activetab = $this->getactivetab($employee_id);    
                            $result[0][0]['activetab'] =$activetab; 
                            $data = $result[0][0];
                            $valid = true;
                            $counter = 1;
                        } else {
                            $activetab = $this->getactivetab($employee_id); 
                            $data = array();
                            $data['activetab']=$activetab;
                            $valid = false;
                            $counter = 0;
                        }
                        $message = 'get data employee in temporary';
                        break;


		     case 'getdata_already_valid':
                        $paramdata = array(
                            'employee_id' => $param['employee_id'],
                        );
                        $result = $this->getdata_in_transaction_table($this->m_employee, $paramdata);
                        if (!empty($result[0])) {
                            $data = $result[0][0];
                            $valid = true;
                            $counter = 1;
                        } else {
                            $data = null;
                            $valid = false;
                            $counter = 0;
                        }
                        $message = 'get data employee in real data';
                        break;  	


                    case 'getdatadocument':
                        $paramdata = array(
                            'employee_id' => $param['employee_id'],
                        );
                        $result = $this->getdata_in_transaction_table($this->ps_document, $paramdata);
                        if (!empty($result[0])) {
                            $data = $result[0][0];
                            $valid = true;
                            $counter = 1;
                        } else {
                            $data = null;
                            $valid = false;
                            $counter = 0;
                        }
                        $message = 'get data document in temporary';
                        break;

                    case 'approve':
                        $msg = $this->Approvedata($param);
                        $result = null;
                        $data = null;
                        $valid = true;
                        $counter = 0;
                        $message = $msg;
                        break;
                    case 'createemployee':
                        $msg = $this->Createdata($param);
                        $result = null;
                        $data = null;
                        $valid = true;
                        $counter = 0;
                        $message = $msg;
                        break;
                    default:
                        $result = null;
                        $data = null;
                        $valid = true;
                        $counter = 0;
                        $message = 'no action';
                }

                $return = array(
                    "success" => $valid,
                    "data" => $data,
                    "msg" => $message,
                    "total" => $counter,
                    "counter" => $counter,
                    "parameter" => $param['mode_read'],
                );
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }


  

  public function getdataInps() {
        $paramdata = array();
        $ids = array();
        $resultemp = $this->setting->getdata($this->ps_employee);
        $resultedu = $this->setting->getdata($this->ps_education);
        $resultptc = $this->setting->getdata($this->ps_potency);
        $resultjobhis = $this->setting->getdata($this->ps_jobhistory);
        $resultorg = $this->setting->getdata($this->ps_organization);
        $resultrelation = $this->setting->getdata($this->ps_relation);
        $resulttraining = $this->setting->getdata($this->ps_traininghistory);
        $resultdoc = $this->setting->getdata($this->ps_document);

        if (!empty($resultemp[0])) {
            foreach ($resultemp[0] as $row) {
                if(empty($row['employee_id']) || $row['employee_id']==0){
                     $ids[] =0;
                }else{
                    $ids[] = $row['employee_id'];
                }
               
            }
        }
        
        if (!empty($resultedu[0])) {
            foreach ($resultedu[0] as $row) {
               if(empty($row['employee_id']) || $row['employee_id']==0){
                     $ids[] =0;
                }else{
                    $ids[] = $row['employee_id'];
                }
            }
        }
        if (!empty($resultptc[0])) {
            foreach ($resultptc[0] as $row) {
                if(empty($row['employee_id']) || $row['employee_id']==0){
                     $ids[] =0;
                }else{
                    $ids[] = $row['employee_id'];
                }
            }
        }
        if (!empty($resultjobhis[0])) {
            foreach ($resultjobhis[0] as $row) {
                if(empty($row['employee_id']) || $row['employee_id']==0){
                     $ids[] =0;
                }else{
                    $ids[] = $row['employee_id'];
                }
            }
        }
        if (!empty($resultorg[0])) {
            foreach ($resultorg[0] as $row) {
                if(empty($row['employee_id']) || $row['employee_id']==0){
                     $ids[] =0;
                }else{
                    $ids[] = $row['employee_id'];
                }
            }
        }
        if (!empty($resultrelation[0])) {
            foreach ($resultrelation[0] as $row) {
                if(empty($row['employee_id']) || $row['employee_id']==0){
                     $ids[] =0;
                }else{
                    $ids[] = $row['employee_id'];
                }
            }
        }
        if (!empty($resulttraining[0])) {
            foreach ($resulttraining[0] as $row) {
               if(empty($row['employee_id']) || $row['employee_id']==0){
                     $ids[] =0;
                }else{
                    $ids[] = $row['employee_id'];
                }
            }
        }
        if (!empty($resultdoc[0])) {
            foreach ($resultdoc[0] as $row) {
               if(empty($row['employee_id']) || $row['employee_id']==0){
                     $ids[] =0;
                }else{
                    $ids[] = $row['employee_id'];
                }
            }
        }
        $employee_id = implode(',', $ids);
        return $employee_id;
    }

     public function getactivetab($employee_id) {
        $tabdata = array(
            'ps_employee'=>0,
            'ps_education'=>0,
            'ps_potency'=>0,
            'ps_jobhistory'=>0,
            'ps_organization'=>0,
            'ps_relation'=>0,
            'ps_traininghistory'=>0,
            'ps_document'=>0,
            'ps_family'=>0,
        );
        
        $paramdata = array(
            'employee_id' => $employee_id,
        );
                
        $resultemp = $this->getdata_in_transaction_table($this->ps_employee, $paramdata);
        $resultedu = $this->getdata_in_transaction_table($this->ps_education, $paramdata);
        $resultptc = $this->getdata_in_transaction_table($this->ps_potency, $paramdata);
        $resultjobhis = $this->getdata_in_transaction_table($this->ps_jobhistory, $paramdata);
        $resultorg = $this->getdata_in_transaction_table($this->ps_organization, $paramdata);
        $resulttraining = $this->getdata_in_transaction_table($this->ps_traininghistory, $paramdata);
        $resultdoc = $this->getdata_in_transaction_table($this->ps_document, $paramdata);
        
        /*end edit by wulan sari 20181013*/
        $paramdata_relation = array(
            'employee_id' => $employee_id,
            'relationtype_id' => 7,
        );
        $resultrelation_emergency = $this->getdata_in_transaction_table($this->ps_relation, $paramdata_relation);
        
        $paramdata_relation = array(
            'employee_id' => $employee_id,
            'relationtype_id' => 1,
        );
        $resultrelation_father = $this->getdata_in_transaction_table($this->ps_relation, $paramdata_relation);
        
        $paramdata_relation = array(
            'employee_id' => $employee_id,
            'relationtype_id' => 2,
        );
        $resultrelation_mother = $this->getdata_in_transaction_table($this->ps_relation, $paramdata_relation);
        
        $paramdata_relation = array(
            'employee_id' => $employee_id,
            'relationtype_id' => 3,
        );
        $resultrelation_spouse = $this->getdata_in_transaction_table($this->ps_relation, $paramdata_relation);
        
        $paramdata_relation = array(
            'employee_id' => $employee_id,
            'relationtype_id' => 4,
        );
        $resultrelation_child = $this->getdata_in_transaction_table($this->ps_relation, $paramdata_relation);
        
        $paramdata_relation = array(
            'employee_id' => $employee_id,
            'relationtype_id' => 5,
        );
        $resultrelation_sibling = $this->getdata_in_transaction_table($this->ps_relation, $paramdata_relation);
        /*end edit by wulan sari 20181013*/
        

        if (!empty($resultemp[0])) {
                $tabdata['ps_employee']=1;
        }
        if (!empty($resultedu[0])) {
             $tabdata['ps_education']=1;
        }
        if (!empty($resultptc[0])) {
           $tabdata['ps_potency']=1;
        }        
        if (!empty($resultjobhis[0])) {
           $tabdata['ps_jobhistory']=1;
        }
        if (!empty($resultorg[0])) {
           $tabdata['ps_organization']=1;
        }
        if (!empty($resultrelation_emergency[0])) {
           $tabdata['ps_relation']=1;
        }
        if (!empty($resultrelation_sibling[0]) 
                || !empty($resultrelation_spouse[0]) 
                || !empty($resultrelation_child[0])
                || !empty($resultrelation_mother[0])
                || !empty($resultrelation_father[0])){
           $tabdata['ps_family']=1;
        }
        
        if (!empty($resulttraining[0])) {
           $tabdata['ps_traininghistory']=1;
        }        
        if (!empty($resultdoc[0])) {
           $tabdata['ps_document']=1;
        }        
        return $tabdata;
    }

  
    
     public function Createdata($param) {
        $paramdata = array(
            'project_id' => $param['project_id'],
            'pt_id' => $param['pt_id'],
            'employee_nik' => $this->setting->setStringdata($param['employee_nik']),
            'deleted'=>'0'
        );

        $result = $this->getdata_in_transaction_table($this->ps_employee, $paramdata);
       
        if (!empty($result[0])) {
            $paramdata['employee_nik'] = $this->setting->setStringdata($paramdata['employee_nik']);
            $resultexist = $this->getdata_in_transaction_table($this->m_employee, $paramdata);
            //print_r($resultexist[0]);
            //exit;
            if (empty($resultexist[0])) {
                //jika data tidak ada, maka buat data employeenya
                $row = $result[0][0];
                //buang field yang tidak dibutuhkan               
                unset($row['employee_id']);              
                unset($row['modion']);
                unset($row['modiby']);
                unset($row['inactiveon']);
                unset($row['inactiveby']);
                unset($row['deleteon']);
                unset($row['deleteby']);
                unset($row['active']);
                unset($row['deleted']);
                
                //buat default isi field
		$row['statusinformation_id'] = $this->data_statusinformation($row);		
                $row['employee_active']=1;
                $row['actived']=1;
                $row['deleted']=0;
		$row['leave_quota']=0;

                
                //create data in m_employee
                $this->setting->_tabledata = $this->m_employee;                  
                $this->setting->insertdata_v2($row);                  
                 //destroy data in ps_employee
                $this->setting->_tabledata =$this->ps_employee;
                $this->setting->deletedata($paramdata);
                
                //return success message
                 return "Data With Employee Name :".$row['employee_name'].", Employee NIK :".$row['employee_nik']." Succes created";
            } else {
                return "Data Alredy Exist";
            }
        } else {
            return "Data is empty";
        }
    }


  public function data_statusinformation($param) {
        $record = array(
            "project_id" => $param['project_id'],
            "pt_id" => $param['pt_id'],
            "employee_nik" => $param['employee_nik'],
            "employeestatus_id" => $param['employeestatus_id'],
            "hire_date" => date('Y-m-d', strtotime($param['hire_date'])),
            "assignation_date" => date('Y-m-d', strtotime($param['assignation_date'])),
            "contract_end" => $param['contractend_date'],
            "addby" => $param['addby'],
            "addon" => $param['addon'],
            "active" => 1,
            "deleted" => 0,
        );
      
        $resultexist = $this->getdata_in_transaction_table($this->t_statusinformation, array(
            "project_id" => $param['project_id'],
            "pt_id" => $param['pt_id'],
            "employee_nik" => $this->setting->setStringdata($param['employee_nik']),
            "hire_date" => $this->setting->setStringdata(date('Y-m-d', strtotime($param['hire_date']))),
            "assignation_date" => $this->setting->setStringdata(date('Y-m-d', strtotime($param['assignation_date']))),
            "contract_end" =>  $this->setting->setStringdata(date('Y-m-d', strtotime($param['contractend_date'])))
        ));
        
         
        if (!empty($resultexist[0])) {
            $row = $resultexist[0][0];
            return $row['statusinformation_id'];
        } else {
            $this->setting->_tabledata = $this->t_statusinformation;
            $this->setting->insertdata_v2($record);
            
            
            $hire_date = date('Y-m-d', strtotime($param['hire_date']));
            $assignation_date = date('Y-m-d', strtotime($param['assignation_date']));
            $contract_end = date('Y-m-d', strtotime($param['contractend_date']));
            
            $resultafterinsert = $this->getdata_in_transaction_table($this->t_statusinformation, array(
                "project_id" => $param['project_id'],
                "pt_id" => $param['pt_id'],
                "employee_nik" => $this->setting->setStringdata($param['employee_nik']),
                "hire_date" => $this->setting->setStringdata(($hire_date=='1970-01-01')?'1900-01-01':$hire_date),
                "assignation_date" => $this->setting->setStringdata(($assignation_date=='1970-01-01')?'1900-01-01':$assignation_date),
                "contract_end" =>  $this->setting->setStringdata(($contract_end=='1970-01-01')?'1900-01-01':$contract_end)
            ));
            $row = $resultafterinsert[0][0];           
            return $row['statusinformation_id'];
        }
    }


    public function Approvedata($param) {
        $employee_id = $param['employee_id'];
        /* nilai 2 terjadi error, 1 berhasil di approve, 0 tidak terjadi apa-apa 
         * default bernilai 2
         */
        $valid_log_emp = 2;
        $valid_log_relation_spouse = 2;
        $valid_log_relation_chield = 2;
        $valid_log_relation_parent = 2;
        $valid_log_relation_sibling = 2;
        $valid_log_relation_contact_emergency = 2;
        $valid_log_organization = 2;
        $valid_log_educationformal = 2;
        $valid_log_educationunformal = 2;
        $valid_log_potency = 2;
        $valid_log_workhistory = 2;
        $valid_log_document = 2;

        $valid_log_emp = $this->create_originaldata_to_employee_log($employee_id);
        $valid_log_relation_spouse = $this->create_originaldata_to_relation_log_spouse($employee_id);
        $valid_log_relation_chield = $this->create_originaldata_to_relation_log_chield($employee_id);
        $valid_log_relation_parent = $this->create_originaldata_to_relation_log_parent($employee_id);
        $valid_log_relation_sibling = $this->create_originaldata_to_relation_log_sibling($employee_id);
        $valid_log_relation_contact_emergency = $this->create_originaldata_to_relation_log_contact_emergency($employee_id);
        $valid_log_organization = $this->create_originaldata_to_organization_log($employee_id);
        $valid_log_educationformal = $this->create_originaldata_to_educationformal_log($employee_id);
        $valid_log_educationunformal = $this->create_originaldata_to_educationunformal_log($employee_id);
        $valid_log_potency = $this->create_originaldata_to_potency_log($employee_id);
        $valid_log_workhistory = $this->create_originaldata_to_workhistory_log($employee_id);
        $valid_log_document = $this->update_document($employee_id);

        $arraycheck = array($valid_log_emp, $valid_log_relation_spouse, $valid_log_relation_chield,
            $valid_log_relation_parent, $valid_log_relation_sibling, $valid_log_relation_contact_emergency,
            $valid_log_educationformal, $valid_log_organization, $valid_log_educationunformal,
            $valid_log_potency, $valid_log_workhistory, $valid_log_document
        );

        
        if (!in_array(2, $arraycheck)) {
            //$data = array("employee_id" => $employee_id, 'is_valid_personal' => 1);
	    $data = array("employee_id" => $employee_id, 'is_valid_personal' => 1,'last_update_by_admin'=>date('Y-m-d H:i:s'));
            $wheredata = array("employee_id" => $employee_id);
            $this->update_transaction_table($this->m_employee, 'employee_id', $data, $wheredata);
	    $this->cleanDate();
            $msg = 'Process Update data from Personal Self Service, Finish';
        } else {
            $msg = 'Process Update data from Personal Self Service, Failed';
        }

        $datareturn = ' <strong> Status  = ' . $msg . '</strong> <br/>';
        $datareturn .= 'valid_employee = ' . $valid_log_emp . '<br/>';
        $datareturn .= 'valid_relation_spouse = ' . $valid_log_relation_spouse . '<br/>';
        $datareturn .= 'valid_relation_chield = ' . $valid_log_relation_chield . '<br/>';
        $datareturn .= 'valid_relation_parent = ' . $valid_log_relation_parent . '<br/>';
        $datareturn .= 'valid_relation_sibling = ' . $valid_log_relation_sibling . '<br/>';
        $datareturn .= 'valid_relation_contact_emergency = ' . $valid_log_relation_contact_emergency . '<br/>';
        $datareturn .= 'valid_organization = ' . $valid_log_organization . '<br/>';
        $datareturn .= 'valid_educationformal = ' . $valid_log_educationformal . '<br/>';
        $datareturn .= 'valid_educationunformal = ' . $valid_log_educationunformal . '<br/>';
        $datareturn .= 'valid_potency = ' . $valid_log_potency . '<br/>';
        $datareturn .= 'valid_workhistory = ' . $valid_log_workhistory . '<br/>';
        $datareturn .= 'valid_document = ' . $valid_log_document . '<br/>';



        return $datareturn;
    }

    public function create_originaldata_to_employee_log($employee_id) {
        $this->setting->_paramsql = 'getdata_forapprove_emp_by_id';
        $this->setting->_param = array('employee_id' => $employee_id);
        $result_tmp = $this->setting->executeSP();
        
        $validdata = 0;
        if (!empty($result_tmp[0])) {
            $result = $this->dao_emp->getAllByIds($employee_id);
            
            $counter = $result[0][0]['totalRow'];
            if ($counter > 0) {
                $data = $result[1][0];
                
                // edit by Wulan Sari 20181029     
                $data['leave_quota'] = $data['leave_quota'] == '' ? 0 : $data['leave_quota'];    
                
                //create data log     
                $return = $this->create_log_table($this->log_m_employee, $data);
                //print_r($data);

                if (is_array($return)) {
                    if (!empty($return[0])) {
                        //pengecekan seperti ini, pasti bernilai true, akan di proses untuk update
                        if ($return[0]) {
                            //update data
                            $data_tmp = $result_tmp[0][0];
                            /* di set menjadi string */

                            /*
                              $data_tmp['ktp_number'] = $this->setting->setStringdata($data_tmp['ktp_number']);
                              $data_tmp['zipcode'] = $this->setting->setStringdata($data_tmp['zipcode']);
                              $data_tmp['npwp'] = $this->setting->setStringdata($data_tmp['npwp']);
                              $data_tmp['phone_number'] = $this->setting->setStringdata($data_tmp['phone_number']);
                              $data_tmp['hp_number'] = $this->setting->setStringdata($data_tmp['hp_number']);
                              $data_tmp['passport_number'] = $this->setting->setStringdata($data_tmp['passport_number']);
                             */



                            //unset($data_tmp['pmdocument_id']); //diabaikan
                            unset($data_tmp['pt_id']); //diabaikan 
                            unset($data_tmp['project_id']); //diabaikan 
                            unset($data_tmp['department_id']); //diabaikan 
                            unset($data_tmp['employee_nik']); //diabaikan 
                            unset($data_tmp['employeestatus_id']); //diabaikan 
                            unset($data_tmp['division_id']); //diabaikan 
                            unset($data_tmp['group_id']); //diabaikan 
                            unset($data_tmp['groupposition_id']); //diabaikan 
                            unset($data_tmp['hire_date']); //diabaikan 
                            unset($data_tmp['assignation_date']); //diabaikan 
                            unset($data_tmp['contractend_date']); //diabaikan
                            unset($data_tmp['fingerprintcode']); //diabaikan 		 
                            unset($data_tmp['nonactive_date']); //diabaikan 
                            unset($data_tmp['reportto']); //diabaikan 
                            unset($data_tmp['alokasibiaya_id']); //diabaikan 
                            unset($data_tmp['alasan_resign']); //diabaikan 
                            unset($data_tmp['nomor_rekening']); //diabaikan 
                            unset($data_tmp['nama_rekening']); //diabaikan 
                            unset($data_tmp['bank_rekening']); //diabaikan 
                            unset($data_tmp['email_ciputra']); //diabaikan 
                            unset($data_tmp['jobfamily_id']); //diabaikan 
                            unset($data_tmp['banding_id']); //diabaikan
                            unset($data_tmp['deleted']); //diabaikan 			
                            unset($data_tmp['active']); //tidak ada fieldnya                          
                            $validdata = $this->update_transaction_tablev2($this->m_employee, 'employee_id', $data_tmp, $data);
                        }
                    }
                }
            }
        }
        if ($validdata == 0) {
            $msg = 'No data in temporary';
        } else {
            $this->delete_temporary_table($this->ps_employee, 'employee_id', $employee_id);
            $msg = 'Success update data from temporary';
        }
        
        return $msg;
    }

    public function create_originaldata_to_relation_log_spouse($employee_id) {
        $this->setting->_paramsql = 'getdata_forapprove_relation_spouse_by_empid';
        $this->setting->_param = array('employee_id' => $employee_id);
        $result_tmp = $this->setting->executeSP();
        $validdata = 0;
        if (!empty($result_tmp[0])) {
            $record_tmp = $result_tmp[0][0];

            /* di set menjadi string */
            /*
              $record_tmp['phone_number'] = $this->setting->setStringdata($record_tmp['hp_number']);
              $record_tmp['hp_number'] = $this->setting->setStringdata($record_tmp['hp_number']);
              $record_tmp['company_phone'] = $this->setting->setStringdata($record_tmp['company_phone']);
             */


            $relation_id = $record_tmp['relation_id'];
            if (!empty($relation_id) & $relation_id > 0) {
                $param_tmp = $result_tmp[0][0];
                $this->setting->_tabledata = $this->t_relation;
                $param = array(
                    'deleted' => 0,
                    'employee_id' => $employee_id,
                    'relation_id' => $relation_id,
                );
                $result = $this->setting->getdata_standard($param);




                if (!empty($result[0])) {
                    /* for update data with step :
                     * 1. create log
                     * 2. update data
                     */
                    //create data log                
                    $return = $this->create_log_table($this->log_t_relation, $result[0][0]);
                    if (is_array($return)) {
                        if (!empty($return[0])) {
                            //pengecekan seperti ini, pasti bernilai true, akan di proses untuk update
                            if ($return[0]) {
                                //update data  
                                $validdata = $this->update_transaction_tablev2($this->t_relation, 'relation_id', $record_tmp, $result[0][0]);
                            }
                        }
                    }
                }
            } else {
                /* for create data with step :
                 * 1. create data in original table
                 */
                $validdata = $this->insert_transaction_tablev2($this->t_relation, 'relation_id', $record_tmp);
            }
        }

        if ($validdata == 0) {
            $msg = 'No data in temporary';
        } else {
            $this->setting->_tabledata = $this->ps_relation;
            $this->setting->deletedata(array(
                'employee_id' => $employee_id,
                'relationtype_id' => 3, //Child
                    )
            );
            $msg = 'Success update data from temporary';
        }
        return $msg;
    }

    public function create_originaldata_to_relation_log_chield($employee_id) {
        $this->setting->_paramsql = 'getdata_forapprove_relation_chield_by_empid';
        $this->setting->_param = array('employee_id' => $employee_id);
        $result_tmp = $this->setting->executeSP();
        $validdata = 0;

        if (!empty($result_tmp[0])) {
            $result = $result_tmp[0];
            foreach ($result as $row) {
                /*
                  $this->setting->_paramsql = 'getdata_relation';
                  $this->setting->_param = array(
                  'employee_id' => $employee_id,
                  'name' => $row['name'],
                  'relationtype_id' => $row['relationtype_id'],
                  );
                  $result_relation = $this->setting->executeSP();
                 * 
                 */
                $relation_id = $row['relation_id'];
                if (!empty($relation_id) & $relation_id > 0) {
                    $this->setting->_tabledata = $this->t_relation;
                    $param = array(
                        'deleted' => 0,
                        'employee_id' => $employee_id,
                        'relation_id' => $relation_id,
                    );
                    $result_relation = $this->setting->getdata_standard($param);
                    if (!empty($result_relation[0])) {
                        /* for update data with step :
                         * 1. create log
                         * 2. update data
                         */
                        //create data log                   
                        $return = $this->create_log_table($this->log_t_relation, $result_relation[0][0]);
                        if (is_array($return)) {
                            if (!empty($return[0])) {
                                //pengecekan seperti ini, pasti bernilai true, akan di proses untuk update
                                if ($return[0]) {
                                    //update data   
                                    $validdata = $this->update_transaction_tablev2($this->t_relation, 'relation_id', $row, $result_relation[0][0]);
                                }
                            }
                        }
                    }
                } else {
                    /* for create data with step :
                     * 1. create data in original table
                     */
                    $validdata = $this->insert_transaction_tablev2($this->t_relation, 'relation_id', $row);
                }
            }
        }

        if ($validdata == 0) {
            $msg = 'No data in temporary';
        } else {
            $this->setting->_tabledata = $this->ps_relation;
            $this->setting->deletedata(array(
                'employee_id' => $employee_id,
                'relationtype_id' => 4, //Child
                    )
            );
            $msg = 'Success update data from temporary';
        }
        return $msg;
    }

    public function create_originaldata_to_relation_log_parent($employee_id) {
        $this->setting->_paramsql = 'getdata_forapprove_relation_parent_by_empid';
        $this->setting->_param = array('employee_id' => $employee_id);
        $result_tmp = $this->setting->executeSP();
        $validdata = 0;
        if (!empty($result_tmp[0])) {
            $result = $result_tmp[0];
            foreach ($result as $row) {
                /*
                  $this->setting->_paramsql = 'getdata_relation';
                  $this->setting->_param = array(
                  'employee_id' => $employee_id,
                  'name' => $row['name'],
                  'relationtype_id' => $row['relationtype_id'],
                  );
                  $result_relation = $this->setting->executeSP();
                 * 
                 */

                $relation_id = $row['relation_id'];
                if (!empty($relation_id) & $relation_id > 0) {
                    $this->setting->_tabledata = $this->t_relation;
                    $param = array(
                        'deleted' => 0,
                        'employee_id' => $employee_id,
                        'relation_id' => $relation_id,
                    );
                    $result_relation = $this->setting->getdata_standard($param);
                    if (!empty($result_relation[0])) {
                        /* for update data with step :
                         * 1. create log
                         * 2. update data
                         */
                        //create data log                   
                        $return = $this->create_log_table($this->log_t_relation, $result_relation[0][0]);
                        if (is_array($return)) {
                            if (!empty($return[0])) {
                                //pengecekan seperti ini, pasti bernilai true, akan di proses untuk update
                                if ($return[0]) {
                                    //update data   
                                    $validdata = $this->update_transaction_tablev2($this->t_relation, 'relation_id', $row, $result_relation[0][0]);
                                }
                            }
                        }
                    }
                } else {
                    /* for create data with step :
                     * 1. create data in original table
                     */
                    $validdata = $this->insert_transaction_tablev2($this->t_relation, 'relation_id', $row);
                }
            }
        }
        if ($validdata == 0) {
            $msg = 'No data in temporary';
        } else {
            $this->setting->_tabledata = $this->ps_relation;
            $this->setting->deletedata(array(
                'employee_id' => $employee_id,
                'relationtype_id' => 1, //Ayah
                    )
            );
            $this->setting->deletedata(array(
                'employee_id' => $employee_id,
                'relationtype_id' => 2, //Ibu
                    )
            );
            $msg = 'Success update data from temporary';
        }
        return $msg;
    }

    public function create_originaldata_to_relation_log_sibling($employee_id) {
        $this->setting->_paramsql = 'getdata_forapprove_relation_sibling_by_empid';
        $this->setting->_param = array('employee_id' => $employee_id);
        $result_tmp = $this->setting->executeSP();
        $validdata = 0;
        if (!empty($result_tmp[0])) {
            $result = $result_tmp[0];
            foreach ($result as $row) {
                /*
                  $this->setting->_paramsql = 'getdata_relation';
                  $this->setting->_param = array(
                  'employee_id' => $employee_id,
                  'name' => $row['name'],
                  'relationtype_id' => $row['relationtype_id'],
                  );
                  $result_relation = $this->setting->executeSP();
                 * 
                 */

                $relation_id = $row['relation_id'];
                if (!empty($relation_id) & $relation_id > 0) {
                    $this->setting->_tabledata = $this->t_relation;
                    $param = array(
                        'deleted' => 0,
                        'employee_id' => $employee_id,
                        'relation_id' => $relation_id,
                    );
                    $result_relation = $this->setting->getdata_standard($param);
                    if (!empty($result_relation[0])) {
                        /* for update data with step :
                         * 1. create log
                         * 2. update data
                         */
                        //create data log
                        $return = $this->create_log_table($this->log_t_relation, $result_relation[0][0]);
                        if (is_array($return)) {
                            if (!empty($return[0])) {
                                //pengecekan seperti ini, pasti bernilai true, akan di proses untuk update
                                if ($return[0]) {
                                    //update data                                
                                    $validdata = $this->update_transaction_tablev2($this->t_relation, 'relation_id', $row, $result_relation[0][0]);
                                }
                            }
                        }
                    }
                } else {
                    /* for create data with step :
                     * 1. create data in original table
                     */
                    $validdata = $this->insert_transaction_tablev2($this->t_relation, 'relation_id', $row);
                }
            }
        }
        if ($validdata == 0) {
            $msg = 'No data in temporary';
        } else {
            $this->setting->_tabledata = $this->ps_relation;
            $this->setting->deletedata(array(
                'employee_id' => $employee_id,
                'relationtype_id' => 5, //Saudara
                    )
            );
            $msg = 'Success update data from temporary';
        }
        return $msg;
    }

    public function create_originaldata_to_relation_log_contact_emergency($employee_id) {
        $this->setting->_paramsql = 'getdata_forapprove_relation_contactemergency_by_empid';
        $this->setting->_param = array('employee_id' => $employee_id);
        $result_tmp = $this->setting->executeSP();
        $validdata = 0;
        if (!empty($result_tmp[0])) {
            $result = $result_tmp[0];
            foreach ($result as $row) {
                /*
                  $this->setting->_paramsql = 'getdata_relation';
                  $this->setting->_param = array(
                  'employee_id' => $employee_id,
                  'name' => $row['name'],
                  'relationtype_id' => $row['relationtype_id'],
                  );
                  $result_relation = $this->setting->executeSP();
                 * 
                 */


                /* di set menjadi string */
                /*
                  $row['phone_number'] = $this->setting->setStringdata($row['phone_number']);
                  $row['hp_number'] = $this->setting->setStringdata($row['hp_number']);
                  $row['company_phone'] = $this->setting->setStringdata($row['company_phone']);
                 * 
                 */

                $relation_id = $row['relation_id'];
                if (!empty($relation_id) & $relation_id > 0) {
                    $this->setting->_tabledata = $this->t_relation;
                    $param = array(
                        'deleted' => 0,
                        'employee_id' => $employee_id,
                        'relation_id' => $relation_id,
                    );
                    $result_relation = $this->setting->getdata_standard($param);


                    if (!empty($result_relation[0])) {
                        /* for update data with step :
                         * 1. create log
                         * 2. update data
                         */
                        //create data log                    
                        $return = $this->create_log_table($this->log_t_relation, $result_relation[0][0]);
                        if (is_array($return)) {
                            if (!empty($return[0])) {
                                //pengecekan seperti ini, pasti bernilai true, akan di proses untuk update
                                if ($return[0]) {
                                    //update data                                
                                    $validdata = $this->update_transaction_tablev2($this->t_relation, 'relation_id', $row, $result_relation[0][0]);
                                }
                            }
                        }
                    }
                } else {
                    /* for create data with step :
                     * 1. create data in original table
                     */
                    $validdata = $this->insert_transaction_tablev2($this->t_relation, 'relation_id', $row);
                }
            }
        }
        if ($validdata == 0) {
            $msg = 'No data in temporary';
        } else {
            $this->setting->_tabledata = $this->ps_relation;
            $this->setting->deletedata(array(
                'employee_id' => $employee_id,
                'relationtype_id' => 7, //Emergency
                    )
            );
            $msg = 'Success update data from temporary';
        }
        return $msg;
    }

    public function create_originaldata_to_organization_log($employee_id) {
        $this->setting->_paramsql = 'getdata_forapprove_organization_by_empid';
        $this->setting->_param = array('employee_id' => $employee_id);
        $result_tmp = $this->setting->executeSP();
        $validdata = 0;
        if (!empty($result_tmp[0])) {
            $result = $result_tmp[0];
            foreach ($result as $row) {
                // get data in transaction table
                $organization_id = $row['organization_id'];
                if (!empty($organization_id) && $organization_id > 0) {
                    $param = array(
                        'deleted' => 0,
                        'employee_id' => $employee_id,
                        'organization_id' => $organization_id,
                    );

                    $result = $this->getdata_in_transaction_table($this->t_organization, $param);
                    if (!empty($result[0])) {
                        /* for update data with step :
                         * 1. create log
                         * 2. update data
                         */
                        //create data log                    
                        $return = $this->create_log_table($this->log_t_organization, $result[0][0]);
                        if (is_array($return)) {
                            if (!empty($return[0])) {
                                //pengecekan seperti ini, pasti bernilai true, akan di proses untuk update
                                if ($return[0]) {
                                    //update data                              
                                    $validdata = $this->update_transaction_tablev2($this->t_organization, 'organization_id', $row, $result[0][0]);
                                }
                            }
                        }
                    }
                } else {
                    /* for create data with step :
                     * 1. create data in original table
                     */
                    $validdata = $this->insert_transaction_tablev2($this->t_organization, 'organization_id', $row);
                }
            }
        }
        if ($validdata == 0) {
            $msg = 'No data in temporary';
        } else {
            $this->delete_temporary_table($this->ps_organization, 'employee_id', $employee_id);
            $msg = 'Success update data from temporary';
        }
        return $msg;
    }

    public function create_originaldata_to_educationformal_log($employee_id) {
        $this->setting->_paramsql = 'getdata_forapprove_eduformal_by_empid';
        $this->setting->_param = array('employee_id' => $employee_id);
        $result_tmp = $this->setting->executeSP();
        $validdata = 0;
        if (!empty($result_tmp[0])) {
            $result = $result_tmp[0];
            foreach ($result as $row) {
                $educationhistory_id = $row['educationhistory_id'];
                if (!empty($educationhistory_id) && $educationhistory_id > 0) {
                    // get data in transaction table
                    $param = array(
                        'deleted' => 0,
                        'employee_id' => $employee_id,
                        'educationhistory_id' => $row['educationhistory_id'],
                    );
                    $result = $this->getdata_in_transaction_table($this->t_education, $param);
                    if (!empty($result[0])) {
                        /* for update data with step :
                         * 1. create log
                         * 2. update data
                         */
                        //create data log                    
                        $return = $this->create_log_table($this->log_t_education, $result[0][0]);
                        if (is_array($return)) {
                            if (!empty($return[0])) {
                                //pengecekan seperti ini, pasti bernilai true, akan di proses untuk update
                                if ($return[0]) {
                                    //update data                                
                                    $validdata = $this->update_transaction_tablev2($this->t_education, 'educationhistory_id', $row, $result[0][0]);
                                }
                            }
                        }
                    }
                } else {
                    /* for create data with step :
                     * 1. create data in original table
                     */
                    $validdata = $this->insert_transaction_tablev2($this->t_education, 'educationhistory_id', $row);
                }
            }
        }
        if ($validdata == 0) {
            $msg = 'No data in temporary';
        } else {
            $this->delete_temporary_table($this->ps_education, 'employee_id', $employee_id);
            $msg = 'Success update data from temporary';
        }
        return $msg;
    }

    public function create_originaldata_to_educationunformal_log($employee_id) {
        $this->setting->_paramsql = 'getdata_forapprove_eduunformal_by_empid';
        $this->setting->_param = array('employee_id' => $employee_id);
        $result_tmp = $this->setting->executeSP();
        $validdata = 0;
        if (!empty($result_tmp[0])) {
            $result = $result_tmp[0];
            foreach ($result as $row) {

                $traininghistory_id = $row['traininghistory_id'];
                if (!empty($traininghistory_id) && $traininghistory_id > 0) {
                    // get data in transaction table
                    $param = array(
                        'deleted' => 0,
                        'employee_id' => $employee_id,
                        'traininghistory_id' => $row['traininghistory_id'],
                    );
                    $result = $this->getdata_in_transaction_table($this->t_traininghistory, $param);
                    if (!empty($result[0])) {
                        /* for update data with step :
                         * 1. create log
                         * 2. update data
                         */
                        //create data log                  
                        $return = $this->create_log_table($this->log_t_traininghistory, $result[0][0]);
                        if (is_array($return)) {
                            if (!empty($return[0])) {
                                //pengecekan seperti ini, pasti bernilai true, akan di proses untuk update
                                if ($return[0]) {
                                    //update data                                
                                    $validdata = $this->update_transaction_tablev2($this->t_traininghistory, 'traininghistory_id', $row, $result[0][0]);
                                }
                            }
                        }
                    }
                } else {
                    /* for create data with step :
                     * 1. create data in original table
                     */
                    $validdata = $this->insert_transaction_tablev2($this->t_traininghistory, 'traininghistory_id', $row);
                }
            }
        }

        if ($validdata == 0) {
            $msg = 'No data in temporary';
        } else {
            $this->delete_temporary_table($this->ps_traininghistory, 'employee_id', $employee_id);
            $msg = 'Success update data from temporary';
        }
        return $msg;
    }

    public function create_originaldata_to_potency_log($employee_id) {
        $this->setting->_paramsql = 'getdata_forapprove_potency_by_empid';
        $this->setting->_param = array('employee_id' => $employee_id);
        $result_tmp = $this->setting->executeSP();
        $validdata = 0;
        if (!empty($result_tmp[0])) {
            $result = $result_tmp[0];
            foreach ($result as $row) {
                // get data in transaction table
                $param = array(
                    'deleted' => 0,
                    'employee_id' => $employee_id,
                    'potency_id' => $row['potency_id']
                );
                $result = $this->getdata_in_transaction_table($this->t_potency, $param);
                if (!empty($result[0])) {
                    /* for update data with step :
                     * 1. create log
                     * 2. update data
                     */
                    //create data log
                    $return = $this->create_log_table($this->log_t_potency, $result[0][0]);
                    if (is_array($return)) {
                        if (!empty($return[0])) {
                            //pengecekan seperti ini, pasti bernilai true, akan di proses untuk update
                            if ($return[0]) {
                                //update data                               
                                $validdata = $this->update_transaction_tablev2($this->t_potency, 'employeepotency_id', $row, $result[0][0]);
                            }
                        }
                    }
                } else {
                    /* for create data with step :
                     * 1. create data in original table
                     */
                    $validdata = $this->insert_transaction_tablev2($this->t_potency, 'employeepotency_id', $row);
                }
            }
        }
        if ($validdata == 0) {
            $msg = 'No data in temporary';
        } else {
            $this->delete_temporary_table($this->ps_potency, 'employee_id', $employee_id);
            $msg = 'Success update data from temporary';
        }
        return $msg;
    }

    public function create_originaldata_to_workhistory_log($employee_id) {
        $this->setting->_paramsql = 'getdata_forapprove_workhistory_by_empid';
        $this->setting->_param = array('employee_id' => $employee_id);
        $result_tmp = $this->setting->executeSP();
        $validdata = 0;
        if (!empty($result_tmp[0])) {
            $result = $result_tmp[0];

            foreach ($result as $row) {
                $jobhistory_id = $row['jobhistory_id'];
                if (!empty($jobhistory_id) && $jobhistory_id > 0) { 
                    // get data in transaction table
                    $param = array(
                        'deleted' => 0,
                        'employee_id' => $employee_id,
                        'jobhistory_id' => $row['jobhistory_id'],
                    );
                    $result = $this->getdata_in_transaction_table($this->t_jobhistory, $param);
                    if (!empty($result[0])) {
                        //create data log                    
                        $return = $this->create_log_table($this->log_t_jobhistory, $result[0][0]);
                        if (is_array($return)) {
                            if (!empty($return[0])) {
                                //pengecekan seperti ini, pasti bernilai true, akan di proses untuk update
                                if ($return[0]) {
                                    //update data                                
                                    $validdata = $this->update_transaction_tablev2($this->t_jobhistory, 'jobhistory_id', $row, $result[0][0]);
                                }
                            }
                        }
                    }
                } else {
                    $validdata = $this->insert_transaction_tablev2($this->t_jobhistory, 'jobhistory_id', $row);
                }
            }
        }
        if ($validdata == 0) {
            $msg = 'No data in temporary';
        } else {
            $this->delete_temporary_table($this->ps_jobhistory, 'employee_id', $employee_id);
            $msg = 'Success update data from temporary';
        }
        return $msg;
    }

    public function update_document($employee_id) {
        $this->setting->_paramsql = 'getdata_forapprove_document';
        $this->setting->_param = array('employee_id' => $employee_id);

        $result_tmp = $this->setting->executeSP();
        $validdata = 0;
        if (!empty($result_tmp[0])) {
            $basesource = getcwd() . '/app/hrd/uploads_tmp/personal_system/' . $employee_id . '/';
            $basedestination = getcwd() . '/app/hrd/uploads/personal/' . $employee_id . '/';

            if (!file_exists($basedestination)) {
                mkdir($basedestination, 0777, true);
            }

            $result = $result_tmp[0];
            foreach ($result as $row) {
                // get data in transaction table
                $param = array(
                    'deleted' => 0,
                    'employee_id' => $employee_id,
                );
                $result = $this->getdata_in_transaction_table($this->m_employee, $param);
                if (!empty($result[0])) {
                    $docempbackup = array(
                        'employee_id' => $result[0][0]['employee_id'],
                        'dokumen_kk' => $result[0][0]['dokumen_kk'],
                        'dokumen_npwp' => $result[0][0]['dokumen_npwp'],
                        'dokumen_ktp' => $result[0][0]['dokumen_ktp'],
                        'dokumen_jamsostek' => $result[0][0]['dokumen_jamsostek'],
                        'dokumen_bpjs_pp' => $result[0][0]['dokumen_bpjs_pp'],
                        'dokumen_bpjs_k' => $result[0][0]['dokumen_bpjs_k'],
                        'dokumen_bpjs_kk' => $result[0][0]['dokumen_bpjs_kk'],
                        'dokumen_ijazah' => $result[0][0]['dokumen_ijazah'],
                        'dokumen_manulife_p' => $result[0][0]['dokumen_manulife_p'],
                        'dokumen_rekening' => $result[0][0]['dokumen_rekening'],
                        'dokumen_asuransi' => $result[0][0]['dokumen_asuransi'],
                        //added by michael 09/08/2021
                        'dokumen_vaksin1' => $result[0][0]['dokumen_vaksin1'],
                        'dokumen_vaksin2' => $result[0][0]['dokumen_vaksin2'],
                        //end added by michael 09/08/2021
                        'addon' => $result[0][0]['addon'],
                        'addby' => $result[0][0]['addby'],
                        'modion' => $result[0][0]['modion'],
                        'modiby' => $result[0][0]['modiby'],
                        'inactiveon' => $result[0][0]['inactiveon'],
                        'inactiveby' => $result[0][0]['inactiveby'],
                        'deleteby' => $result[0][0]['deleteby'],
                        'deleteon' => $result[0][0]['deleteon'],
                        'deleted' => $result[0][0]['deleted'],
                        'no_kk' => $result[0][0]['no_kk'],
                        'no_npwp' => $result[0][0]['npwp'],
                        'no_ktp' => $result[0][0]['ktp_number'],
                        'no_jamsostek' => $result[0][0]['no_jamsostek'],
                        'no_bpjs_pp' => $result[0][0]['no_bpjs_pp'],
                        'no_bpjs_k' => $result[0][0]['no_bpjs_k'],
                        'no_bpjs_kk' => $result[0][0]['no_bpjs_kk'],
                        'no_ijazah' => $result[0][0]['no_ijazah'],
                        'no_manulife_p' => $result[0][0]['no_manulife_p'],
                        'no_asuransi' => $result[0][0]['no_asuransi'],
                        'bank_rekening' => $result[0][0]['bank_rekening'],
                        'nama_rekening' => $result[0][0]['nama_rekening'],
                        'nomor_rekening' => $result[0][0]['nomor_rekening'],
                        //added by anas 10022022
                        'dokumen_vaksin3' => $result[0][0]['dokumen_vaksin3'],

                        'dokumen_pas_foto' => $result[0][0]['dokumen_pas_foto'],
                        'dokumen_stnk' => $result[0][0]['dokumen_stnk'],
                    );
                    $return = $this->create_log_table($this->log_document, $docempbackup);
                    
                    if (is_array($return)) {
                        if (!empty($return[0])) {
                            //pengecekan seperti ini, pasti bernilai true, akan di proses untuk update
                            if ($return[0]) {
                                //update data  
                                $kk = $this->checkdataexist($employee_id, $row['dokumen_kk'], 'kk', $result[0][0]['dokumen_kk']);
                                $npwp = $this->checkdataexist($employee_id, $row['dokumen_npwp'], 'npwp', $result[0][0]['dokumen_npwp']);
                                $ktp = $this->checkdataexist($employee_id, $row['dokumen_ktp'], 'ktp', $result[0][0]['dokumen_ktp']);
                                $jamsostek = $this->checkdataexist($employee_id, $row['dokumen_jamsostek'], 'jamsostek', $result[0][0]['dokumen_jamsostek']);
                                $bpjs_pp = $this->checkdataexist($employee_id, $row['dokumen_bpjs_pp'], 'bpjs_pp', $result[0][0]['dokumen_bpjs_pp']);
                                $bpjs_k = $this->checkdataexist($employee_id, $row['dokumen_bpjs_k'], 'bpjs_k', $result[0][0]['dokumen_bpjs_k']);
                                $bpjs_kk = $this->checkdataexist($employee_id, $row['dokumen_bpjs_kk'], 'bpjs_kk', $result[0][0]['dokumen_bpjs_kk']);
                                $ijazah = $this->checkdataexist($employee_id, $row['dokumen_ijazah'], 'ijazah', $result[0][0]['dokumen_ijazah']);
                                $manulife_p = $this->checkdataexist($employee_id, $row['dokumen_manulife_p'], 'manulife_p', $result[0][0]['dokumen_manulife_p']);
                                $rekening = $this->checkdataexist($employee_id, $row['dokumen_rekening'], 'rekening', $result[0][0]['dokumen_rekening']);
                                $asuransi = $this->checkdataexist($employee_id, $row['dokumen_asuransi'], 'asuransi', $result[0][0]['dokumen_asuransi']);
                                //added by michael 09/08/2021
                                $vaksin1 = $this->checkdataexist($employee_id, $row['dokumen_vaksin1'], 'vaksin1', $result[0][0]['dokumen_vaksin1']);
                                $vaksin2 = $this->checkdataexist($employee_id, $row['dokumen_vaksin2'], 'vaksin2', $result[0][0]['dokumen_vaksin2']);
                                //end added by michael 09/08/2021
                                
                                $no_kk = $this->checkdataexistv2($row['no_kk'], $result[0][0]['no_kk']);
                                $no_npwp = $this->checkdataexistv2($row['no_npwp'], $result[0][0]['npwp']);
                                $no_ktp = $this->checkdataexistv2($row['no_ktp'], $result[0][0]['ktp_number']);
                                $no_jamsostek = $this->checkdataexistv2($row['no_jamsostek'], $result[0][0]['no_jamsostek']);
                                $no_bpjs_pp = $this->checkdataexistv2($row['no_bpjs_pp'], $result[0][0]['no_bpjs_pp']);
                                $no_bpjs_k = $this->checkdataexistv2($row['no_bpjs_k'], $result[0][0]['no_bpjs_k']);
                                $no_bpjs_kk = $this->checkdataexistv2($row['no_bpjs_kk'], $result[0][0]['no_bpjs_kk']);
                                $no_ijazah = $this->checkdataexistv2($row['no_ijazah'], $result[0][0]['no_ijazah']);
                                $no_manulife_p = $this->checkdataexistv2($row['no_manulife_p'], $result[0][0]['no_manulife_p']);
                                $no_asuransi = $this->checkdataexistv2($row['no_asuransi'], $result[0][0]['no_asuransi']);
                                $bank_rekening = $this->checkdataexistv2($row['bank_rekening'], $result[0][0]['bank_rekening']);
                                $nama_rekening = $this->checkdataexistv2($row['nama_rekening'], $result[0][0]['nama_rekening']);
                                $nomor_rekening = $this->checkdataexistv2($row['nomor_rekening'], $result[0][0]['nomor_rekening']);
                                //added by michael 09/08/2021
                                $no_vaksin1 = $this->checkdataexistv2($row['no_vaksin1'], $result[0][0]['no_vaksin1']);
                                $no_vaksin2 = $this->checkdataexistv2($row['no_vaksin2'], $result[0][0]['no_vaksin2']);
                                //end added by michael 09/08/2021
                                //added by anas 10022022
                                $vaksin3 = $this->checkdataexist($employee_id, $row['dokumen_vaksin3'], 'vaksin3', $result[0][0]['dokumen_vaksin3']);
                                $no_vaksin3 = $this->checkdataexistv2($row['no_vaksin3'], $result[0][0]['no_vaksin3']);
                                //end added by anas

                                $pas_foto = $this->checkdataexist($employee_id, $row['dokumen_pas_foto'], 'pas_foto', $result[0][0]['dokumen_pas_foto']);
                                $no_pas_foto = $this->checkdataexistv2($row['no_pas_foto'], $result[0][0]['no_pas_foto']);
                                $stnk = $this->checkdataexist($employee_id, $row['dokumen_stnk'], 'stnk', $result[0][0]['dokumen_stnk']);
                                $no_stnk = $this->checkdataexistv2($row['no_stnk'], $result[0][0]['no_stnk']);
                                
                                $docupdate = array(
                                    'employee_id' => $row['employee_id'],
                                    'dokumen_kk' => $kk,
                                    'dokumen_npwp' => $npwp,
                                    'dokumen_ktp' => $ktp,
                                    'dokumen_jamsostek' => $jamsostek,
                                    'dokumen_bpjs_pp' => $bpjs_pp,
                                    'dokumen_bpjs_k' => $bpjs_k,
                                    'dokumen_bpjs_kk' => $bpjs_kk,
                                    'dokumen_ijazah' => $ijazah,
                                    'dokumen_manulife_p' => $manulife_p,
                                    'dokumen_rekening' => $rekening,
                                    'dokumen_asuransi' => $asuransi,
                                    //added by michael 09/08/2021
                                    'dokumen_vaksin1' => $vaksin1,
                                    'dokumen_vaksin2' => $vaksin2,
                                    //end added by michael 09/08/2021
                                    'no_kk' => $no_kk,
                                    'npwp' => $no_npwp,
                                    'ktp_number' => $no_ktp,
                                    'no_jamsostek' => $no_jamsostek,
                                    'no_bpjs_pp' => $no_bpjs_pp,
                                    'no_bpjs_k' => $no_bpjs_k,
                                    'no_bpjs_kk' => $no_bpjs_kk,
                                    'no_ijazah' => $no_ijazah,
                                    'no_manulife_p' => $no_manulife_p,
                                    'no_asuransi' => $no_asuransi,
                                    //added by michael 09/08/2021
                                    'no_vaksin1' => $no_vaksin1,
                                    'no_vaksin2' => $no_vaksin2,
                                    //end added by michael 09/08/2021
                                    'bank_rekening' => $bank_rekening,
                                    'nama_rekening' => $nama_rekening,
                                    'nomor_rekening' => $nomor_rekening,
                                    //added by anas 10022022
                                    'dokumen_vaksin3' => $vaksin3,
                                    'no_vaksin3' => $no_vaksin3,
                                    //end added by anas
                                    'dokumen_pas_foto' => $pas_foto,
                                    'no_pas_foto' => $no_pas_foto,
                                    'dokumen_stnk' => $stnk,
                                    'no_stnk' => $no_stnk,
                                );
                                
                                $validdata = $this->update_transaction_tablev2($this->m_employee, 'employee_id', $docupdate, $param);
                                if ($validdata) {
                                    $this->beliefmedia_recurse_copy($basesource, $basedestination);
                                }
                            }
                        }
                    }
                }
            }
        }
        if ($validdata == 0) {
            $msg = 'No data in temporary';
        } else {
            $this->delete_temporary_table($this->ps_document, 'employee_id', $employee_id);
            $msg = 'Success update data from temporary';
        }
        return $msg;
    }

    public function checkdataexist($employee_id, $data, $prefix, $oldata) {
        $format = "personal/" . $employee_id;
        if (!empty($data)) {
            $return = $format . "/$prefix/" . $data;
        } else {
            $return = $oldata;
        }
        return $return;
    }

    public function checkdataexistv2($data, $oldata) {
        if (!empty($data)) {
            $return = $data;
        } else {
            $return = $oldata;
        }
        return $return;
    }

    public function beliefmedia_recurse_copy($src, $dst) {
        /* Returns false if src doesn't exist */
        $dir = @opendir($src);

        /* Make destination directory. False on failure */
        if (!file_exists($dst))
            @mkdir($dst);

        /* Recursively copy */
        while (false !== ($file = readdir($dir))) {

            if (( $file != '.' ) && ( $file != '..' )) {
                if (is_dir($src . '/' . $file))
                    $this->beliefmedia_recurse_copy($src . '/' . $file, $dst . '/' . $file);
                else
                    copy($src . '/' . $file, $dst . '/' . $file);
            }
        }
        closedir($dir);
    }

    public function getdata_in_transaction_table($table, $param) {
        $this->setting->_tabledata = $table;
        $result = $this->setting->getdata_standard($param);
        return $result;
    }

    public function create_log_table($table, $data) {
        $data['log_basedata'] = 'personalselfservice';
        $data['log_user_id_approve'] = $this->setting->_user_id;
        $this->setting->_tabledata = $table;
        $return = $this->setting->insertdata_v2($data);
        
        return $return;
    }

    public function insert_transaction_table($table, $prefix, $row) {
        $validdata = 0;
        $this->setting->_tabledata = $table;
        unset($row[$prefix]); //tidak boleh di insert
        $returninsert = $this->setting->insertdata($row);
        if (is_array($returninsert)) {
            if (!empty($returninsert[0])) {
                $validdata = $returninsert[0];
            }
        }
        return $validdata;
    }

    public function insert_transaction_tablev2($table, $prefix, $row) {
        $validdata = 0;
        $this->setting->_tabledata = $table;
        unset($row[$prefix]); //tidak boleh di insert
        $returninsert = $this->setting->insertdata_v2($row);
        if (is_array($returninsert)) {
            if (!empty($returninsert[0])) {
                $validdata = $returninsert[0];
            }
        }
        return $validdata;
    }

    public function update_transaction_table($table, $prefix, $data_tmp, $data_original) {
        $validdata = 0;
        unset($data_tmp[$prefix]);  //tidak boleh di update
        $this->setting->_tabledata = $table;
        $returnupdate = $this->setting->updatedata($data_tmp, array($prefix => $data_original[$prefix]));
        if (is_array($returnupdate)) {
            if (!empty($returnupdate[0])) {
                $validdata = $returnupdate[0];
            }
        }
        return $validdata;
    }

    public function update_transaction_tablev2($table, $prefix, $data_tmp, $data_original) {
        $validdata = 0;
        unset($data_tmp[$prefix]);  //tidak boleh di update
        $data_tmp = str_replace("'","",$data_tmp);
        $this->setting->_tabledata = $table;
        $returnupdate = $this->setting->updatedatav2($data_tmp, array($prefix => $data_original[$prefix]));
        
        if (is_array($returnupdate)) {
            if (!empty($returnupdate[0])) {
                $validdata = $returnupdate[0];
            }
        }
        return $validdata;
    }

    public function delete_temporary_table($table, $prefix, $id) {
        $validdata = 0;
        $this->setting->_tabledata = $table;
        $returndelete = $this->setting->deletedata(array($prefix => $id));
        if (is_array($returndelete)) {
            if (!empty($returndelete[0])) {
                $validdata = $returndelete[0];
            }
        }
        return $validdata;
    }

    public function cleanDate() {
        $sql = "
            update $this->m_employee set marriage_date=null where convert(date,marriage_date) IN (''1800-01-01'',''1900-01-01'',''1970-01-01'')
            update $this->m_employee set hire_date=null where convert(date,hire_date) IN (''1800-01-01'',''1900-01-01'',''1970-01-01'')
            update $this->t_jobhistory set start_date=NULL where convert(date,start_date) IN (''1800-01-01'',''1900-01-01'',''1970-01-01'')
            update $this->t_jobhistory set end_date=NULL where convert(date,end_date) IN (''1800-01-01'',''1900-01-01'',''1970-01-01'')
            update $this->t_relation  set birth_date=null where convert(date,birth_date) IN (''1800-01-01'',''1900-01-01'',''1970-01-01'')
            update $this->t_relation set rip_date=null where convert(date,rip_date) IN (''1800-01-01'',''1900-01-01'',''1970-01-01'')
            update $this->t_education set start_year=null where convert(date,start_year) IN (''1800-01-01'',''1900-01-01'',''1970-01-01'')
            update $this->t_education set end_year=null where convert(date,end_year) IN (''1800-01-01'',''1900-01-01'',''1970-01-01'')
            ";
        $this->setting->customefromquery($sql);
    }


}

?>
