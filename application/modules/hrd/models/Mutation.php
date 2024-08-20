<?php

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Hrd_Models_Mutation extends Zend_Db_Table_Abstract {

    private $setting = null;
    private $function = null;
    private $destination = null;
    private $folderapps = null;
    private $path = null;
    private $_mail = null;
    private $_createdatalog = null;
    private $_intranet = null;

    function init() {
        date_default_timezone_set('Asia/Jakarta');
        $this->_curdate = date('Y-m-d');
        $this->_curdatetime = date('Y-m-d H:i:s');
        $this->setting = new Hrd_Models_General_Setup;
        $this->setting->_storeprocedure = 'sp_mutation';
        $this->dao_emp = new Hrd_Models_Master_EmployeeDao();
        $this->_createdatalog = new Hrd_Models_Createdatalog();
        $this->_intranet = new Hrd_Models_Intranet_Employee();
        $this->path = 'app/hrd/uploads/mutasi/';
        $this->folderapps = getcwd() . '/' . $this->path;
        //$this->_mail = Zend_Controller_Action_HelperBroker::getStaticHelper('Email');
        $this->_mail = new Hrd_Models_General_Email();
    }

    function RoutesAllActions($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'read';


                switch ($this->setting->_param['mode_read']) {
                    case 'default':
                        $result = $this->setting->executeSP();
                        $data = $result[1];
                        $counter = $result[0][0]['RECORD_TOTAL'];
                        $message = null;
                        $valid = true;
                        break;
                    case 'searching':
                        $result = $this->setting->executeSP();
                        $data = $result[1];
                        $counter = $result[0][0]['RECORD_TOTAL'];
                        $message = null;
                        $valid = true;
                        break;
                    case 'create':
                        $originaldata_m_employee = $this->dao_emp->getAllByIds($param['employee_id']);
                        $result = $this->createData($param);
                        $data = $result[2][0]['MSG'];
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        $message = $result[2][0]['MSG'];
                        $valid = $result[0][0]['VALIDDATA'];
                        if ($valid == true) {
                           $this->sendmaildatarequest($param);
                        }
                        break;
                    case 'update':
                        $originaldata_m_employee = $this->dao_emp->getAllByIds($param['employee_id']);
                        $result = $this->updateData($param);
                        $data = $result[2][0]['MSG'];
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        $message = $result[2][0]['MSG'];
                        $valid = $result[0][0]['VALIDDATA'];
                        if ($valid == true) {
                            $this->sendmaildatarequest($param);
                        }
                        break;
                    case 'approve':
                        $originaldata_m_employee = $this->dao_emp->getAllByIds($param['employee_id']);
                        $result = $this->approveData($param);
                        $data = $result[2][0]['MSG'];
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        $message = $result[2][0]['MSG'];
                        $valid = $result[0][0]['VALIDDATA'];
                        if ($valid == true){
                            if(strtotime($param['effective_date']) <= strtotime(date('Y-m-d'))) {                        
                                $this->create_history_employee($originaldata_m_employee, 'mutation_approve', $param);
                                $this->setting->setapplied($param['changestatus_id']);
                                if ($param['changetype_id'] == 3) {
                                    $this->_intranet->Authorizeuser($param['employee_id']);
                                }
                            }
                            $this->sendmaildataapprove($param);  
                        }
                        break;
                    case 'print':
                        $data = $this->printData($param);
                        $counter = 1;
                        $message = null;
                        $valid = true;
                        break;


                    default:
                        $result = null;
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
    
    public function checkuserApprove($param) {
        $userdata = $this->setting->getUserdata();
        if ($userdata['employee_id'] > 0 && !empty($userdata['employee_id'])) {
            
        } else {
            
        }
    }

    public function create_history_employee($dataemployee, $basedata, $param) {
        $counter = $dataemployee[0][0]['totalRow'];
        if ($counter > 0) {
            $data = $dataemployee[1][0];
            if (empty($data['leave_quota'])) {
                $data['leave_quota'] = 0;
            }
           
            /* di remark karena data yang masuk ke m_employee_history harus apa adanya
              $data['nonactive_date'] = $param['effective_date'];
              $data['employee_active'] = '0';
              $data['alasan_resign'] = 'mutasi';
             * 
             */
            $this->setting->_tabledata = 'hrd.dbo.m_employee_history';
            $data = $this->_createdatalog->array_m_employee($data);
            $data['histrory_basedata'] = $basedata;
            $data['history_by_user_id'] = $this->setting->_user_id;
            $return = $this->setting->insertdata_v2($data);
            if (is_array($return)) {
                /* ketika history berhasil dibuat maka, step berikutnya
                 * merubah data karyawannya
                 */
                if (!empty($return[0])) {
                    if ($return[0]) {
                        $this->changedatainMultiposition($dataemployee, $param);
                        $this->changedatainEmployee($param['employee_id'], $param);
                    }
                }
            }
        }
    }

    public function changedatainEmployee($employee_id, $param) {
        $tabledata = 'hrd.dbo.m_employee';
        $record = array(
            "project_id" => $param['new_project_id'],
            "pt_id" => $param['new_pt_id'],
            "division_id" => 0,
            "department_id" => $param['new_department_id'],
            "position_id" => $param['new_position_id'],
            "group_id" => $param['new_group_id'],
            "jobfamily_id" => $param['new_jobfamily_id'],
            "banding_id" => $param['new_banding_id'],
            "reportto" => $param['new_reportto_id'],
            "alokasibiaya_id" => $param['new_costcenter1'],
            "alokasibiaya_id2" => $param['new_costcenter2'],
            "alokasibiaya_id3" => $param['new_costcenter3'],
            "section_id" => $param['new_section_id'],
            "hari_kerja_perminggu" => $param['new_hari_kerja_perminggu'],
            "modiby" => $this->setting->_user_id,
            "modion" => date('Y-m-d H:i:s'),
        );
        $whereset = array(
            "employee_id" => $employee_id
        );
        $this->setting->_tabledata = $tabledata;
        $this->setting->updatedatav2($record, $whereset);
    }

    public function changedatainMultiposition($dataemployee, $param) {
        $counter = $dataemployee[0][0]['totalRow'];
        if ($counter > 0) {
            $tabledata = 'hrd.dbo.t_employee_multiposition';
            $data = $dataemployee[1][0];
            $resultmultiposition = $this->setting->getdata_bytableparam_v2($tabledata, array(
                "is_default" => '1',
                "employee_id" => $data['employee_id'],
                "project_id" => $data['project_id'],
                "pt_id" => $data['pt_id'],
            ));
            if (!empty($resultmultiposition[0])) {
                $datamultiposition = $resultmultiposition[0][0];
                $employee_multiposition_id = $datamultiposition['employee_multiposition_id'];
                $record = array(
                    "project_id" => $param['new_project_id'],
                    "pt_id" => $param['new_pt_id'],
                    "department_id" => $param['new_department_id'],
                    "position_id" => $param['new_position_id'],
                    "jobfamily_id" => $param['new_jobfamily_id'],
                    "reportto_id" => $param['new_reportto_id'],
                    "section_id" => $param['new_section_id'],
                    "alokasibiaya_id" => $param['new_costcenter1'],
                    "modiby" => $this->setting->_user_id,
                    "modion" => date('Y-m-d H:i:s'),
                );
                $whereset = array(
                    "employee_multiposition_id" => $employee_multiposition_id
                );
                $this->setting->_tabledata = $tabledata;
                $this->setting->updatedatav2($record, $whereset);
            }
        }
    }

    public function createData($param) {
        
        //edit by michael 2023-04-13 | req Bu Shirley, kalo Promosi, Rotasi, Mutasi & atasannya sama, gak perlu cek transaksi ess
        // $cek_transaksi = $this->_intranet->intranet_belum_diproses($param['employee_id']);

        // 1 PROMOSI -- 2 ROTASI -- 3 MUTASI -- 4 DEMOSI
        if(($param['changetype_id'] == '1' || $param['changetype_id'] == '2' || $param['changetype_id'] == '4') 
            && $param['old_reportto_id'] == $param['new_reportto_id'] ){
            $cek_transaksi = '';
        }else{
            $cek_transaksi = $this->_intranet->intranet_belum_diproses($param['employee_id']);
        }

        if($cek_transaksi == ''){
            $this->setting->_paramsql = 'create';
            $this->setting->_param = $param;
            $result = $this->setting->executeSP();
            return $result;
        } else {
            return $cek_transaksi;
        }
    }

    public function updateData($param) {
        $this->setting->_paramsql = 'update';
        $this->setting->_iddata = $param['changestatus_id'];
        $this->setting->_param = $param;
        $result = $this->setting->executeSP();
        return $result;
    }

    public function approveData($param) {
        $this->setting->_paramsql = 'approve';
        $this->setting->_iddata = $param['changestatus_id'];
        $this->setting->_param = $param;
        $result = $this->setting->executeSP();
        return $result;
    }

    function deleteData($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'changestatus_id';
            $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
            foreach ($param as $key => $val) {
                if (is_array($val)) {
                    $param[$key_name] .= $val[$key_name] . ',';
                }
            }
            try {
                $this->setting->_iddata = $param[$key_name];
                $this->setting->_paramsql = 'delete';
                $result = $this->setting->executeSP();
                $valid = $result[0][0]['VALIDDATA'];
                $counter = $result[1][0]['RECORD_TOTAL'];
                $message = $result[2][0]['MSG'];

                $return = array(
                    "success" => $valid,
                    "total" => $counter,
                    "msg" => $message,
                );
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }

    function createFolder() {
        if (!file_exists($this->destination)) {
            mkdir($this->destination, 0777, true);
        }
    }

    function createFolderError() {
        if (!file_exists($this->destination_error)) {
            mkdir($this->destination_error, 0777, true);
        }
    }

    function Createupload($post, $files) {
//$name = date('Ymd') . '.pdf';
        $filesupload = $files['uploadfile'];
        $name = $filesupload['name'];
        $namedata = $post['changestatus_id'];
        $typedocument = $post['typedocument'];
        $file_tmp = $files['uploadfile']['tmp_name'];
        $this->destination = $this->folderapps . $namedata;
        $fullpathfile = $this->destination . '/' . $name;
        $path = $this->path . $namedata . '/' . $name;
        $this->createFolder();
        if (move_uploaded_file($file_tmp, $fullpathfile)) {
            $this->setting->_tabledata = 't_changestatus';
            $record = array("sk_file_upload_path" => $path);
            $whereset = array("changestatus_id" => $post['changestatus_id']);
            $this->setting->updatedata($record, $whereset);

            $recorddocument = array(
                "changestatus_id" => $post['changestatus_id'],
                "filename" => $name,
                "locationpath" => $path,
                "typedocument" => $typedocument,
                "addon" => date('Y-m-d H:i:s'),
                "addby" => $this->setting->_user_id,
            );
            $this->setting->insertdata_byparamtable($this->setting->_td_changestatusdocument, $recorddocument);
            return array('success' => true, 'msg' => "Upload Success");
        } else {
            return array('success' => false, 'msg' => "Upload failed");
        }
    }

    public function setStatussendmail($param, $status = 0) {
        //$flag, 0 = belum terikirim, 1= sudah di kirim untuk request,2=sudah di kirim untuk approve
        $param['statusemail'] = $status;
        $this->setting->_paramsql = 'updatestatusemail';
        $this->setting->_param = $param;
        $result = $this->setting->executeSP();
        return $result;
    }

    public function sendmaildatarequest($param) {
        $dataemployee = $this->setting->getbyid_employee($param['employee_id']);
        $dataapprove = $this->setting->getbyid_employee($param['approvalby']);
        $datauser = $this->setting->getbyid_user($this->setting->_user_id);
        $employee_name = $dataemployee['employee_name'];
        $emailemployee = $dataemployee['email_ciputra'];
        $emailforapprove = $dataapprove['email_ciputra'];
        $emailuser = $datauser['user_email'];
        $statustransfer = $this->changeStatus($param['changetype_id']);
        $message = $this->designcontentRequestEmail($param);    
        $addto = $emailforapprove;   ;
        
        // Comment by Wulan Sari 18-04.2018
        //$addtoalias = $employee_name;
        
        // Add by Wulan Sari 18-04.2018
        $addtoalias = $dataapprove['employee_name'];
        
        $subject = "Employee Transfer Request for Approval " . $employee_name . ' ' . $statustransfer;
        $this->_mail->setData()->setFrom($this->_mail->emailuser);
        $this->_mail->setData()->setBodyHtml($message);
        $this->_mail->setData()->addTo($addto, $addtoalias);
        $this->_mail->setData()->addCc($emailuser);
        $this->_mail->setData()->setSubject($subject);
        if ($this->_mail->setData()->send()) {
            //$this->setStatussendmail($param,1);
            //echo 'succes send mail';
        } else {
            //echo 'failed send mail';
        }
    }

    public function sendmaildatarequest_test($param) {
        $dataemployee = $this->setting->getbyid_employee($param['employee_id']);
        $dataapprove = $this->setting->getbyid_employee($param['approvalby']);
        $datauser = $this->setting->getbyid_user($this->setting->_user_id);
        $employee_name = $dataemployee['employee_name'];
        //$emailemployee = $dataemployee['email_ciputra'];
        $emailemployee = 'ahmad.cipdev@gmail.com';
        //$emailforapprove = $dataapprove['email_ciputra'];
        $emailforapprove = 'ahmadriadi.ti@gmail.com';
        //$emailuser = $datauser['user_email'];
        $emailuser = 'ahmad.cipdev@gmail.com';
        $statustransfer = $this->changeStatus($param['changetype_id']);
        $message = $this->designcontentRequestEmail($param);
        $addto = $emailforapprove;
        $addtoalias = $employee_name;
        $subject = "Employee Transfer Request for Approval " . $employee_name . ' ' . $statustransfer;
        $this->_mail->setData()->setFrom($this->_mail->emailuser);
        $this->_mail->setData()->setBodyHtml($message);
        $this->_mail->setData()->addTo($addto, $addtoalias);
        $this->_mail->setData()->addCc($emailuser);
        $this->_mail->setData()->setSubject($subject);
        if ($this->_mail->setData()->send()) {
            //$this->setStatussendmail($param,1);
            //echo 'succes send mail';
        } else {
            //echo 'failed send mail';
        }
    }

    public function sendmaildataapprove($param) {
        $dataemployee = $this->setting->getbyid_employee($param['employee_id']);
        $dataapprove = $this->setting->getbyid_employee($param['approvalby']);
        $datauser = $this->setting->getbyid_user($param['addby']);
        $employee_name = $dataemployee['employee_name'];
        $emailemployee = $dataemployee['email_ciputra'];
        //$emailemployee = 'ahmad.cipdev@gmail.com';
        $emailforapprove = $dataapprove['email_ciputra'];
        //$emailforapprove = 'ahmadriadi.ti@gmail.com';
        $emailuser = $datauser['user_email'];
        //$emailuser = 'ahmad.cipdev@gmail.com';
        $statustransfer = $this->changeStatus($param['changetype_id']);
        $message = $this->designcontentApproveEmail($param);
        $addto = $emailuser;
        $addtoalias = $employee_name;
        $subject = "Employee Transfer Has Been Approved " . $employee_name . ' ' . $statustransfer;
        $this->_mail->setData()->setFrom($this->_mail->emailuser);
        $this->_mail->setData()->setBodyHtml($message);
        $this->_mail->setData()->addTo($addto, $addtoalias);
        $this->_mail->setData()->addCc($emailforapprove);
        $this->_mail->setData()->setSubject($subject);
        if ($this->_mail->setData()->send()) {
            //$this->setStatussendmail($param,2);
            //echo 'succes send mail';
        } else {
            //echo 'failed send mail';
        }
    }

    public function sendmaildataapprove_test($param) {
        $dataemployee = $this->setting->getbyid_employee($param['employee_id']);
        $dataapprove = $this->setting->getbyid_employee($param['approvalby']);
        $datauser = $this->setting->getbyid_user($param['addby']);
        $employee_name = $dataemployee['employee_name'];
        //$emailemployee = $dataemployee['email_ciputra'];
        $emailemployee = 'wulan.sari@ciputra.com';
        //$emailforapprove = $dataapprove['email_ciputra'];
        $emailforapprove = 'wulan.sari@ciputra.com';
        //$emailuser = $datauser['user_email'];
        $emailuser = 'wulan.sari@ciputra.com';
        $statustransfer = $this->changeStatus($param['changetype_id']);
        $message = $this->designcontentApproveEmail($param);
        $addto = $emailuser;
        $addtoalias = $employee_name;
        $subject = "Employee Transfer Has Been Approved " . $employee_name . ' ' . $statustransfer;
        $this->_mail->setData()->setFrom($this->_mail->emailuser);
        $this->_mail->setData()->setBodyHtml($message);
        $this->_mail->setData()->addTo($addto, $addtoalias);
        $this->_mail->setData()->addCc($emailuser);
        $this->_mail->setData()->setSubject($subject);
        if ($this->_mail->setData()->send()) {
            //$this->setStatussendmail($param,2);
            //echo 'succes send mail';
        } else {
            //echo 'failed send mail';
        }
    }

    public function designcontentRequestEmail($param) {
        $dataemployee = $this->setting->getbyid_employee($param['employee_id']);
        $dataapprove = $this->setting->getbyid_employee($param['approvalby']);
        $datauser = $this->setting->getbyid_user($this->setting->_user_id);
        $dataoldproject = $this->setting->getbyid_project($param['old_project_id']);
        $datanewproject = $this->setting->getbyid_project($param['new_project_id']);
        $dataoldpt = $this->setting->getbyid_pt($param['old_pt_id']);
        $datanewpt = $this->setting->getbyid_pt($param['new_pt_id']);
        $dataolddepartment = $this->setting->getbyid_department($param['old_department_id']);
        $datanewdepartment = $this->setting->getbyid_department($param['new_department_id']);
        $dataoldsection = $this->setting->getbyid_section($param['old_section_id']);
        $datanewsection = $this->setting->getbyid_section($param['new_section_id']);
        $dataold_jobfamily = $this->setting->getbyid_jobfamily($param['old_jobfamily_id']);
        $datanew_jobfamily = $this->setting->getbyid_jobfamily($param['new_jobfamily_id']);
        $dataold_position = $this->setting->getbyid_position($param['old_position_id']);
        $datanew_position = $this->setting->getbyid_position($param['new_position_id']);
        $dataold_banding = $this->setting->getbyid_banding($param['old_banding_id']);
        $datanew_banding = $this->setting->getbyid_banding($param['new_banding_id']);
        $dataold_group = $this->setting->getbyid_group($param['old_group_id']);
        $datanew_group = $this->setting->getbyid_group($param['new_group_id']);
        $dataold_atasan = $this->setting->getbyid_employee($param['old_reportto_id']);
        $datanew_atasan = $this->setting->getbyid_employee($param['new_reportto_id']);
        $dataold_jabatan_atasan = $this->setting->getbyid_position($dataold_atasan['position_id']);
        $datanew_jabatan_atasan = $this->setting->getbyid_position($datanew_atasan['position_id']);
        $dataold_alokasi1 = $this->setting->getbyid_alokasibiaya($param['old_costcenter1']);
        $datanew_alokasi1 = $this->setting->getbyid_alokasibiaya($param['new_costcenter1']);
        $dataold_alokasi2 = $this->setting->getbyid_alokasibiaya($param['old_costcenter2']);
        $datanew_alokasi2 = $this->setting->getbyid_alokasibiaya($param['new_costcenter2']);
        $dataold_alokasi3 = $this->setting->getbyid_alokasibiaya($param['old_costcenter3']);
        $datanew_alokasi3 = $this->setting->getbyid_alokasibiaya($param['new_costcenter3']);
        $statustransfer = $this->changeStatus($param['changetype_id']);
        $statustransferlower = ucfirst(strtolower($this->changeStatus($param['changetype_id'])));        
        $old_hari_kerja_perminggu = $param['old_hari_kerja_perminggu'];// added by wulan sari 20200519
        $new_hari_kerja_perminggu = $param['new_hari_kerja_perminggu'];// added by wulan sari 20200519

        $old_project = $new_project = '';
        $old_pt = $new_pt = '';
        $old_department = $new_department = '';
        $old_section = $new_section = '';
        $old_jobfamily = $new_jobfamily = '';
        $old_position = $new_position = '';
        $old_banding = $new_banding = '';
        $old_group = $new_group = '';
        $old_reportto = $new_reportto = '';
        $old_jabatanreportto = $new_jabatanreportto = '';
        $old_alokasibiaya1 = $new_alokasibiaya1 = '';
        $old_alokasibiaya2 = $new_alokasibiaya2 = '';
        $old_alokasibiaya3 = $new_alokasibiaya3 = '';

        if ($dataoldproject) {
            $old_project = $dataoldproject['name'];
        }
        if ($datanewproject) {
            $new_project = $datanewproject['name'];
        }

        if ($dataoldpt) {
            $old_pt = $dataoldpt['name'];
        }

        if ($datanewpt) {
            $new_pt = $datanewpt['name'];
        }

        if ($dataolddepartment) {
            $old_department = $dataolddepartment['department'];
        }

        if ($datanewdepartment) {
            $new_department = $datanewdepartment['department'];
        }

        if ($dataoldsection) {
            $old_section = $dataoldsection['section'];
        }
        if ($datanewsection) {
            $new_section = $datanewsection['section'];
        }

        if ($dataold_jobfamily) {
            $old_jobfamily = $dataold_jobfamily['jobfamily'];
        }
        if ($datanew_jobfamily) {
            $new_jobfamily = $datanew_jobfamily['jobfamily'];
        }

        if ($dataold_position) {
            $old_position = $dataold_position['description'];
        }
        if ($datanew_position) {
            $new_position = $datanew_position['description'];
        }

        if ($dataold_banding) {
            $old_banding = $dataold_banding['banding'];
        }
        if ($datanew_banding) {
            $new_banding = $datanew_banding['banding'];
        }

        if ($dataold_group) {
            $old_group = $dataold_group['code'];
        }
        if ($datanew_group) {
            $new_group = $datanew_group['code'];
        }
        if ($dataold_atasan) {
            $old_reportto = $dataold_atasan['employee_name'];
        }
        if ($datanew_atasan) {
            $new_reportto = $datanew_atasan['employee_name'];
        }
        if ($dataold_jabatan_atasan) {
            $old_jabatanreportto = $dataold_jabatan_atasan['description'];
        }
        if ($datanew_jabatan_atasan) {
            $new_jabatanreportto = $datanew_jabatan_atasan['description'];
        }

        if ($dataold_alokasi1) {
            $old_alokasibiaya1 = $dataold_alokasi1['name'];
        }

        if ($datanew_alokasi1) {
            $new_alokasibiaya1 = $datanew_alokasi1['name'];
        }
        if ($dataold_alokasi2) {
            $old_alokasibiaya2 = $dataold_alokasi2['name'];
        }
        if ($datanew_alokasi2) {
            $new_alokasibiaya2 = $datanew_alokasi2['name'];
        }
        if ($dataold_alokasi3) {
            $old_alokasibiaya3 = $dataold_alokasi3['name'];
        }
        if ($datanew_alokasi3) {
            $new_alokasibiaya3 = $datanew_alokasi3['name'];
        }
        $nik = $dataemployee['employee_nik'];
        $namakaryawan = $dataemployee['employee_name'];
        $statuskaryawan = $param['employeestatus'];
        $contract_ke = $param['contract_ke'];
        $tanggalmasuk = $this->setting->checkDate(date('d-m-Y', strtotime($param['hire_date'])));
        $mulaikontrak = $this->setting->checkDate(date('d-m-Y', strtotime($param['mulaikontrak'])));
        $berakhirkontrak = $this->setting->checkDate(date('d-m-Y', strtotime($param['berakhirkontrak'])));
        $tanggalpengankatan = $this->setting->checkDate(date('d-m-Y', strtotime($param['assignation_date'])));
        $effective_date = $this->setting->checkDate(date('d-m-Y', strtotime($param['effective_date'])));
        $reason = $param['reason'];
        $note = $param['note'];
        $skno = $param['sk_number'];
        $approveby = $dataapprove['employee_name'];
        $userfullname = $datauser['user_fullname'];
        $currentdate = date('d-m-Y H:i:s');
        $goto = 'https://ces.ciputragroup.com';

        $colorproject = $this->conditionbgColor($old_project, $new_project);
        $colorpt = $this->conditionbgColor($old_pt, $new_pt);
        $colordept = $this->conditionbgColor($old_department, $new_department);
        $colorsection = $this->conditionbgColor($old_section, $new_section);
        $colorjobfam = $this->conditionbgColor($old_jobfamily, $new_jobfamily);
        $colorbanding = $this->conditionbgColor($old_banding, $new_banding);
        $colorgroup = $this->conditionbgColor($old_group, $new_group);
        $colorposition = $this->conditionbgColor($old_position, $new_position);
        $colorreporto = $this->conditionbgColor($old_reportto, $new_reportto);
        $colorjabreporto = $this->conditionbgColor($old_jabatanreportto, $new_jabatanreportto);
        $coloralokasi1 = $this->conditionbgColor($old_alokasibiaya1, $new_alokasibiaya1);
        $coloralokasi2 = $this->conditionbgColor($old_alokasibiaya2, $new_alokasibiaya2);
        $coloralokasi3 = $this->conditionbgColor($old_alokasibiaya3, $new_alokasibiaya3);
        $colorworkingdays = $this->conditionbgColor($old_hari_kerja_perminggu, $new_hari_kerja_perminggu); // added by wulan sari 20200519



        $html = "
                        <html>
                          <head>
                              <style>
                                  #tablecontent{
                                      border: 1px solid black;
                                      border-collapse: collapse;
                                  }
                              </style>
                          </head>
                          <body>
                            Kepada Yth,<br/>
                            $approveby <br/>                                
                            Terdapat pengajuan perubahan data karyawan yang  memerlukan proses approval, berikut detail informasi yang diajukan :
                            <br/><br/><br/>
                            
                              <div align = 'center'><strong style = 'font-size:20px' >FORMULIR PERUBAHAN DATA KARYAWAN</strong></div>
                              <p>Setelah menimbang adanya Kebutuhan Management, Kompetensi, Prestasi, Masa Kerja dari
                              <table>
                                  <tr>
                                      <td>NIK</td>
                                      <td>:</td>
                                      <td>$nik</td>
                                  </tr>
                                  <tr>
                                      <td>Nama</td>
                                      <td>:</td>
                                      <td>$namakaryawan</td>
                                  </tr>
                                  <tr>
                                      <td>Tanggal Masuk Kerja</td>
                                      <td>:</td>
                                      <td>$tanggalmasuk</td>
                                  </tr>
                                  ";
        if ($statuskaryawan == 'permanent') {
            $html .= "
                
                                 <tr>
                                      <td>Status Karyawan</td>
                                      <td>:</td>
                                      <td>Pegawai Tetap Sejak Tanggal $tanggalpengankatan</td>
                                  </tr>
                                  ";
        } else {
            $html .= "
                        <tr>
                <td>Status Karyawan</td>
				<td>:</td>
				<td>Kontrak ke $contract_ke,  Tanggal $mulaikontrak s/d Tanggal $berakhirkontrak</td>
				<td>				
				</td>
            </tr>
            ";
        }




        $html .= "             
                              </table>
                              <br/>
                              Kami akan mengusulkan <strong>$statustransfer</strong> bagi yang bersangkutan sbb :
                              <br/><br/>
                              <table width = '100%'border = '1' id = 'tablecontent'>
                                  <tr>

                                      <td colspan = '3'>
                                          <div align = 'center'><strong>$statustransferlower Dari</strong></div>
                                          <table width = '100%' border = '1' id = 'tablecontent'>
                                              <tr>
                                                  <td width = '180' align = 'left'><strong>Proyek</strong></td>
                                                  <td width = '5' align = 'center'><strong>:</strong></td>
                                                  <td>$old_project</td>
                                              </tr>
                                              <tr>
                                                  <td width = '180' align = 'left'><strong>PT</strong></td>
                                                  <td width = '5' align = 'center'><strong>:</strong></td>
                                                  <td>$old_pt</td>
                                              </tr>
                                              <tr>
                                                  <td width = '180' align = 'left'><strong>Departemen</strong></td>
                                                  <td width = '5' align = 'center'><strong>:</strong></td>
                                                  <td>$old_department</td>
                                              </tr>
                                              <tr>
                                                  <td width = '180' align = 'left'><strong>Section</strong></td>
                                                  <td width = '5' align = 'center'><strong>:</strong></td>
                                                  <td>$old_section</td>
                                              </tr>
                                              <tr>
                                                  <td width = '180' align = 'left'><strong>Job Family</strong></td>
                                                  <td width = '5' align = 'center'><strong>:</strong></td>
                                                  <td>$old_jobfamily</td>
                                              </tr>
                                              <tr>
                                                  <td width = '180' align = 'left'><strong>Jabatan</strong></td>
                                                  <td width = '5' align = 'center'><strong>:</strong></td>
                                                  <td>$old_position</td>
                                              </tr>
                                              <tr>
                                                  <td width = '180' align = 'left'><strong>Banding</strong></td>
                                                  <td width = '5' align = 'center'><strong>:</strong></td>
                                                  <td>$old_banding</td>
                                              </tr>
                                              <tr>
                                                  <td width = '180' align = 'left'><strong>Golongan</strong></td>
                                                  <td width = '5' align = 'center'><strong>:</strong></td>
                                                  <td>$old_group</td>
                                              </tr>
                                              <tr>
                                                  <td width = '180' align = 'left'><strong>Atasan Langsung</strong></td>
                                                  <td width = '5' align = 'center'><strong>:</strong></td>
                                                  <td>$old_reportto</td>
                                              </tr>
                                              <tr>
                                                  <td width = '180' align = 'left'><strong>Jabatan Atasan Langsung</strong></td>
                                                  <td width = '5' align = 'center'><strong>:</strong></td>
                                                  <td>$old_jabatanreportto</td>
                                              </tr>
                                              <tr>
                                                  <td width = '180' align = 'left'><strong>Alokasi Biaya 1</strong></td>
                                                  <td width = '5' align = 'center'><strong>:</strong></td>
                                                  <td>$old_alokasibiaya1</td>
                                              </tr>
                                              <tr>
                                                  <td width = '180' align = 'left'><strong>Alokasi Biaya 2</strong></td>
                                                  <td width = '5' align = 'center'><strong>:</strong></td>
                                                  <td>$old_alokasibiaya2</td>
                                              </tr>
                                              <tr>
                                                  <td width = '180' align = 'left'><strong>Alokasi Biaya 3</strong></td>
                                                  <td width = '5' align = 'center'><strong>:</strong></td>
                                                  <td>$old_alokasibiaya3</td>
                                              </tr>
                                              <tr>
                                                  <td width = '180' align = 'left'><strong>Working Days</strong></td>
                                                  <td width = '5' align = 'center'><strong>:</strong></td>
                                                  <td>$old_hari_kerja_perminggu</td>
                                              </tr>
                                          </table>
                                      </td>

                                      <td colspan = '3'><div align = 'center'><strong>$statustransferlower Ke</strong></div>
                                          <table width = '100%' border = '1' id = 'tablecontent'>
                                              <tr>
                                                  <td width = '180' align = 'left' bgcolor='$colorproject'><strong>Proyek</strong></td>
                                                  <td width = '5' align = 'center' bgcolor='$colorproject'><strong>:</strong></td>
                                                  <td bgcolor='$colorproject'>$new_project</td>
                                              </tr>
                                              <tr>
                                                  <td width = '180' align = 'left' bgcolor='$colorpt'><strong>PT</strong></td>
                                                  <td width = '5' align = 'center' bgcolor='$colorpt'><strong>:</strong></td>
                                                  <td bgcolor='$colorpt'>$new_pt</td>
                                              </tr>
                                              <tr>
                                                  <td width = '180' align = 'left' bgcolor='$colordept'><strong>Departemen</strong></td>
                                                  <td width = '5' align = 'center' bgcolor='$colordept'><strong>:</strong></td>
                                                  <td bgcolor='$colordept'>$new_department</td>
                                              </tr>
                                              <tr>
                                                  <td width = '180' align = 'left' bgcolor='$colorsection'><strong>Section</strong></td>
                                                  <td width = '5' align = 'center' bgcolor='$colorsection'><strong>:</strong></td>
                                                  <td bgcolor='$colorsection'>$new_section</td>
                                              </tr>
                                              <tr>
                                                  <td width = '180' align = 'left' bgcolor='$colorjobfam'><strong>Job Family</strong></td>
                                                  <td width = '5' align = 'center' bgcolor='$colorjobfam'><strong>:</strong></td>
                                                  <td bgcolor='$colorjobfam'>$new_jobfamily</td>
                                              </tr>
                                              <tr>
                                                  <td width = '180' align = 'left' bgcolor='$colorposition'><strong>Jabatan</strong></td>
                                                  <td width = '5' align = 'center' bgcolor='$colorposition'><strong>:</strong></td>
                                                  <td bgcolor='$colorposition'>$new_position</td>
                                              </tr>
                                              <tr>
                                                  <td width = '180' align = 'left' bgcolor='$colorbanding'><strong>Banding</strong></td>
                                                  <td width = '5' align = 'center' bgcolor='$colorbanding'><strong>:</strong></td>
                                                  <td bgcolor='$colorbanding'>$new_banding</td>
                                              </tr>
                                              <tr>
                                                  <td width = '180' align = 'left' bgcolor='$colorgroup'><strong>Golongan</strong></td>
                                                  <td width = '5' align = 'center' bgcolor='$colorgroup'><strong>:</strong></td>
                                                  <td bgcolor='$colorgroup'>$new_group</td>
                                              </tr>
                                              <tr>
                                                  <td width = '180' align = 'left' bgcolor='$colorreporto'><strong>Atasan Langsung</strong></td>
                                                  <td width = '5' align = 'center' bgcolor='$colorreporto'><strong>:</strong></td>
                                                  <td bgcolor='$colorreporto'>$new_reportto</td>
                                              </tr>
                                              <tr>
                                                  <td width = '180' align = 'left' bgcolor='$colorjabreporto'><strong>Jabatan Atasan Langsung</strong></td>
                                                  <td width = '5' align = 'center' bgcolor='$colorjabreporto'><strong>:</strong></td>
                                                  <td bgcolor='$colorjabreporto'>$new_jabatanreportto</td>
                                              </tr>
                                              <tr>
                                                  <td width = '180' align = 'left' bgcolor='$coloralokasi1'><strong>Alokasi Biaya 1</strong></td>
                                                  <td width = '5' align = 'center' bgcolor='$coloralokasi1'><strong>:</strong></td>
                                                  <td bgcolor='$coloralokasi1'>$new_alokasibiaya1</td>
                                              </tr>
                                              <tr>
                                                  <td width = '180' align = 'left' bgcolor='$coloralokasi2'><strong>Alokasi Biaya 2</strong></td>
                                                  <td width = '5' align = 'center' bgcolor='$coloralokasi2'><strong>:</strong></td>
                                                  <td bgcolor='$coloralokasi2'>$new_alokasibiaya2</td>
                                              </tr>
                                              <tr>
                                                  <td width = '180' align = 'left' bgcolor='$coloralokasi3'><strong>Alokasi Biaya 3</strong></td>
                                                  <td width = '5' align = 'center' bgcolor='$coloralokasi3'><strong>:</strong></td>
                                                  <td bgcolor='$coloralokasi3'>$new_alokasibiaya3</td>
                                              </tr>
                                              <tr>
                                                  <td width = '180' align = 'left' bgcolor='$colorworkingdays'><strong>Working Days</strong></td>
                                                  <td width = '5' align = 'center' bgcolor='$colorworkingdays'><strong>:</strong></td>
                                                  <td bgcolor='$colorworkingdays'>$new_hari_kerja_perminggu</td>
                                              </tr>
                                          </table>
                                      </td>
                              </table>                              
            
                              <p>
                                  Efektif Per Tanggal :$effective_date<br/>
                                  Dengan Pertimbangan :$reason<br/>
                                  Penambahan/perubahan/penyesuaian tugas dan lain-lain (bila ada) :<br/>$note<br/>
                              </p>
                              <p>
                               Nomor SK : $skno
                              </p>
                              <br/>


                              Jakarta, <?php echo date('d F Y');
                      ?>
                              <table width='100%'>
                                  <tr>
                                      <td colspan='3'>
                                          Dibuat oleh,
                                          <br/><br/>
                                          [$currentdate]<br/>
                                          $userfullname
                                      </td>
                                      <td colspan='3'>
                                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                      </td>
                                      <td colspan='3'>Disetujui oleh,
                                          <br/><br/>
                                          [-]<br/>
                                          $approveby
                                      </td>
                                  </tr>
                              </table>
                              <br/><br/>
                               Mohon bantuan untuk melakukan Revisi atau Approval atas data tersebut dari Aplikasi HCMS, untuk melakukan proses tersebut silakan klik tombol dibawah ini.<br><br>
                               <a href='$goto' style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;display:inline-block;text-align:center;text-decoration:none;height:36px;line-height:36px;padding-left:8px; padding-right:8px; min-width:88px; font-size:14px;font-weight:400;color:#ffffff; background-color:#4CAF50;border-radius:2px; border-width:0px;text-shadow:7px 6px 9px #000000;' target='_blank'>Go to Ciputra Web Application</a><br><br> 
                        </body>
                      </html>
                ";

        return $html;
    }

    public function designcontentApproveEmail($param) {
        $datachangestatus = $this->setting->getbyid_changestatus($param['changestatus_id']);
        $approvedate = $datachangestatus['approve_date'];
        $datauser = $this->setting->getbyid_user($param['addby']);
        $datauserapprove = $this->setting->getbyid_user($datachangestatus['approve_user_id']);
        $userapprove = null;
        if ($datauserapprove) {
            $userapprove = $datauserapprove['user_fullname'];
        }
        $dataemployee = $this->setting->getbyid_employee($param['employee_id']);
        $dataapprove = $this->setting->getbyid_employee($param['approvalby']);
        $dataoldproject = $this->setting->getbyid_project($param['old_project_id']);
        $datanewproject = $this->setting->getbyid_project($param['new_project_id']);
        $dataoldpt = $this->setting->getbyid_pt($param['old_pt_id']);
        $datanewpt = $this->setting->getbyid_pt($param['new_pt_id']);
        $dataolddepartment = $this->setting->getbyid_department($param['old_department_id']);
        $datanewdepartment = $this->setting->getbyid_department($param['new_department_id']);
        $dataoldsection = $this->setting->getbyid_section($param['old_section_id']);
        $datanewsection = $this->setting->getbyid_section($param['new_section_id']);
        $dataold_jobfamily = $this->setting->getbyid_jobfamily($param['old_jobfamily_id']);
        $datanew_jobfamily = $this->setting->getbyid_jobfamily($param['new_jobfamily_id']);
        $dataold_position = $this->setting->getbyid_position($param['old_position_id']);
        $datanew_position = $this->setting->getbyid_position($param['new_position_id']);
        $dataold_banding = $this->setting->getbyid_banding($param['old_banding_id']);
        $datanew_banding = $this->setting->getbyid_banding($param['new_banding_id']);
        $dataold_group = $this->setting->getbyid_group($param['old_group_id']);
        $datanew_group = $this->setting->getbyid_group($param['new_group_id']);
        $dataold_atasan = $this->setting->getbyid_employee($param['old_reportto_id']);
        $datanew_atasan = $this->setting->getbyid_employee($param['new_reportto_id']);
        $dataold_jabatan_atasan = $this->setting->getbyid_position($dataold_atasan['position_id']);
        $datanew_jabatan_atasan = $this->setting->getbyid_position($datanew_atasan['position_id']);
        $dataold_alokasi1 = $this->setting->getbyid_alokasibiaya($param['old_costcenter1']);
        $datanew_alokasi1 = $this->setting->getbyid_alokasibiaya($param['new_costcenter1']);
        $dataold_alokasi2 = $this->setting->getbyid_alokasibiaya($param['old_costcenter2']);
        $datanew_alokasi2 = $this->setting->getbyid_alokasibiaya($param['new_costcenter2']);
        $dataold_alokasi3 = $this->setting->getbyid_alokasibiaya($param['old_costcenter3']);
        $datanew_alokasi3 = $this->setting->getbyid_alokasibiaya($param['new_costcenter3']);
        $statustransfer = $this->changeStatus($param['changetype_id']);
        $statustransferlower = ucfirst(strtolower($this->changeStatus($param['changetype_id'])));        
        $old_hari_kerja_perminggu = $param['old_hari_kerja_perminggu'];// added by wulan sari 20200519
        $new_hari_kerja_perminggu = $param['new_hari_kerja_perminggu'];// added by wulan sari 20200519

        $old_project = $new_project = '';
        $old_pt = $new_pt = '';
        $old_department = $new_department = '';
        $old_section = $new_section = '';
        $old_jobfamily = $new_jobfamily = '';
        $old_position = $new_position = '';
        $old_banding = $new_banding = '';
        $old_group = $new_group = '';
        $old_reportto = $new_reportto = '';
        $old_jabatanreportto = $new_jabatanreportto = '';
        $old_alokasibiaya1 = $new_alokasibiaya1 = '';
        $old_alokasibiaya2 = $new_alokasibiaya2 = '';
        $old_alokasibiaya3 = $new_alokasibiaya3 = '';

        if ($dataoldproject) {
            $old_project = $dataoldproject['name'];
        }
        if ($datanewproject) {
            $new_project = $datanewproject['name'];
        }

        if ($dataoldpt) {
            $old_pt = $dataoldpt['name'];
        }

        if ($datanewpt) {
            $new_pt = $datanewpt['name'];
        }

        if ($dataolddepartment) {
            $old_department = $dataolddepartment['department'];
        }

        if ($datanewdepartment) {
            $new_department = $datanewdepartment['department'];
        }

        if ($dataoldsection) {
            $old_section = $dataoldsection['section'];
        }
        if ($datanewsection) {
            $new_section = $datanewsection['section'];
        }

        if ($dataold_jobfamily) {
            $old_jobfamily = $dataold_jobfamily['jobfamily'];
        }
        if ($datanew_jobfamily) {
            $new_jobfamily = $datanew_jobfamily['jobfamily'];
        }

        if ($dataold_position) {
            $old_position = $dataold_position['description'];
        }
        if ($datanew_position) {
            $new_position = $datanew_position['description'];
        }

        if ($dataold_banding) {
            $old_banding = $dataold_banding['banding'];
        }
        if ($datanew_banding) {
            $new_banding = $datanew_banding['banding'];
        }

        if ($dataold_group) {
            $old_group = $dataold_group['code'];
        }
        if ($datanew_group) {
            $new_group = $datanew_group['code'];
        }
        if ($dataold_atasan) {
            $old_reportto = $dataold_atasan['employee_name'];
        }
        if ($datanew_atasan) {
            $new_reportto = $datanew_atasan['employee_name'];
        }
        if ($dataold_jabatan_atasan) {
            $old_jabatanreportto = $dataold_jabatan_atasan['description'];
        }
        if ($datanew_jabatan_atasan) {
            $new_jabatanreportto = $datanew_jabatan_atasan['description'];
        }

        if ($dataold_alokasi1) {
            $old_alokasibiaya1 = $dataold_alokasi1['name'];
        }

        if ($datanew_alokasi1) {
            $new_alokasibiaya1 = $datanew_alokasi1['name'];
        }
        if ($dataold_alokasi2) {
            $old_alokasibiaya2 = $dataold_alokasi2['name'];
        }
        if ($datanew_alokasi2) {
            $new_alokasibiaya2 = $datanew_alokasi2['name'];
        }
        if ($dataold_alokasi3) {
            $old_alokasibiaya3 = $dataold_alokasi3['name'];
        }
        if ($datanew_alokasi3) {
            $new_alokasibiaya3 = $datanew_alokasi3['name'];
        }
        $nik = $dataemployee['employee_nik'];
        $namakaryawan = $dataemployee['employee_name'];
        $statuskaryawan = $param['employeestatus'];
        $contract_ke = $param['contract_ke'];
        $tanggalmasuk = $this->setting->checkDate(date('d-m-Y', strtotime($param['hire_date'])));
        $mulaikontrak = $this->setting->checkDate(date('d-m-Y', strtotime($param['mulaikontrak'])));
        $berakhirkontrak = $this->setting->checkDate(date('d-m-Y', strtotime($param['berakhirkontrak'])));
        $tanggalpengankatan = $this->setting->checkDate(date('d-m-Y', strtotime($param['assignation_date'])));
        $effective_date = $this->setting->checkDate(date('d-m-Y', strtotime($param['effective_date'])));
        $reason = $param['reason'];
        $note = $param['note'];
        $skno = $param['sk_number'];
        $approveby = $dataapprove['employee_name'];
        $userfullname = $datauser['user_fullname'];
        $currentdate = date('d-m-Y H:i:s', strtotime($datachangestatus['addon']));
        $goto = 'https://ces.ciputragroup.com';

        $colorproject = $this->conditionbgColor($old_project, $new_project);
        $colorpt = $this->conditionbgColor($old_pt, $new_pt);
        $colordept = $this->conditionbgColor($old_department, $new_department);
        $colorsection = $this->conditionbgColor($old_section, $new_section);
        $colorjobfam = $this->conditionbgColor($old_jobfamily, $new_jobfamily);
        $colorbanding = $this->conditionbgColor($old_banding, $new_banding);
        $colorgroup = $this->conditionbgColor($old_group, $new_group);
        $colorposition = $this->conditionbgColor($old_position, $new_position);
        $colorreporto = $this->conditionbgColor($old_reportto, $new_reportto);
        $colorjabreporto = $this->conditionbgColor($old_jabatanreportto, $new_jabatanreportto);
        $coloralokasi1 = $this->conditionbgColor($old_alokasibiaya1, $new_alokasibiaya1);
        $coloralokasi2 = $this->conditionbgColor($old_alokasibiaya2, $new_alokasibiaya2);
        $coloralokasi3 = $this->conditionbgColor($old_alokasibiaya3, $new_alokasibiaya3);        
        $colorworkingdays = $this->conditionbgColor($old_hari_kerja_perminggu, $new_hari_kerja_perminggu); // added by wulan sari 20200519



        $html = "
                        <html>
                          <head>
                              <style>
                                  #tablecontent{
                                      border: 1px solid black;
                                      border-collapse: collapse;
                                  }
                              </style>
                          </head>
                          <body>
                            Kepada Yth,<br/>
                            $userfullname <br/>                                
                            Pengajuan perubahan data karyawan $namakaryawan telah dilakukan approve oleh $userapprove, berikut detail informasi yang diajukan :
                            <br/><br/><br/>
                            
                              <div align = 'center'><strong style = 'font-size:20px' >FORMULIR PERUBAHAN DATA KARYAWAN</strong></div>
                              <p>Setelah menimbang adanya Kebutuhan Management, Kompetensi, Prestasi, Masa Kerja dari
                              <table>
                                  <tr>
                                      <td>NIK</td>
                                      <td>:</td>
                                      <td>$nik</td>
                                  </tr>
                                  <tr>
                                      <td>Nama</td>
                                      <td>:</td>
                                      <td>$namakaryawan</td>
                                  </tr>
                                  <tr>
                                      <td>Tanggal Masuk Kerja</td>
                                      <td>:</td>
                                      <td>$tanggalmasuk</td>
                                  </tr>
                                  ";
        if ($statuskaryawan == 'permanent') {
            $html .= "
                
                                 <tr>
                                      <td>Status Karyawan</td>
                                      <td>:</td>
                                      <td>Pegawai Tetap Sejak Tanggal $tanggalpengankatan</td>
                                  </tr>
                                  ";
        } else {
            $html .= "
                        <tr>
                <td>Status Karyawan</td>
				<td>:</td>
				<td>Kontrak ke $contract_ke,  Tanggal $mulaikontrak s/d Tanggal $berakhirkontrak</td>
				<td>				
				</td>
            </tr>
            ";
        }




        $html .= "             
                              </table>
                              <br/>
                              Data <strong>$statustransfer</strong> bagi yang bersangkutan sbb :
                              <br/><br/>
                              <table width = '100%'border = '1' id = 'tablecontent'>
                                  <tr>

                                      <td colspan = '3'>
                                          <div align = 'center'><strong>$statustransferlower Dari</strong></div>
                                          <table width = '100%' border = '1' id = 'tablecontent'>
                                              <tr>
                                                  <td width = '180' align = 'left'><strong>Proyek</strong></td>
                                                  <td width = '5' align = 'center'><strong>:</strong></td>
                                                  <td>$old_project</td>
                                              </tr>
                                              <tr>
                                                  <td width = '180' align = 'left'><strong>Pt</strong></td>
                                                  <td width = '5' align = 'center'><strong>:</strong></td>
                                                  <td>$old_pt</td>
                                              </tr>
                                              <tr>
                                                  <td width = '180' align = 'left'><strong>Departemen</strong></td>
                                                  <td width = '5' align = 'center'><strong>:</strong></td>
                                                  <td>$old_department</td>
                                              </tr>
                                              <tr>
                                                  <td width = '180' align = 'left'><strong>Section</strong></td>
                                                  <td width = '5' align = 'center'><strong>:</strong></td>
                                                  <td>$old_section</td>
                                              </tr>
                                              <tr>
                                                  <td width = '180' align = 'left'><strong>Job Family</strong></td>
                                                  <td width = '5' align = 'center'><strong>:</strong></td>
                                                  <td>$old_jobfamily</td>
                                              </tr>
                                              <tr>
                                                  <td width = '180' align = 'left'><strong>Jabatan</strong></td>
                                                  <td width = '5' align = 'center'><strong>:</strong></td>
                                                  <td>$old_position</td>
                                              </tr>
                                              <tr>
                                                  <td width = '180' align = 'left'><strong>Banding</strong></td>
                                                  <td width = '5' align = 'center'><strong>:</strong></td>
                                                  <td>$old_banding</td>
                                              </tr>
                                              <tr>
                                                  <td width = '180' align = 'left'><strong>Golongan</strong></td>
                                                  <td width = '5' align = 'center'><strong>:</strong></td>
                                                  <td>$old_group</td>
                                              </tr>
                                              <tr>
                                                  <td width = '180' align = 'left'><strong>Atasan Langsung</strong></td>
                                                  <td width = '5' align = 'center'><strong>:</strong></td>
                                                  <td>$old_reportto</td>
                                              </tr>
                                              <tr>
                                                  <td width = '180' align = 'left'><strong>Jabatan Atasan Langsung</strong></td>
                                                  <td width = '5' align = 'center'><strong>:</strong></td>
                                                  <td>$old_jabatanreportto</td>
                                              </tr>
                                              <tr>
                                                  <td width = '180' align = 'left'><strong>Alokasi Biaya 1</strong></td>
                                                  <td width = '5' align = 'center'><strong>:</strong></td>
                                                  <td>$old_alokasibiaya1</td>
                                              </tr>
                                              <tr>
                                                  <td width = '180' align = 'left'><strong>Alokasi Biaya 2</strong></td>
                                                  <td width = '5' align = 'center'><strong>:</strong></td>
                                                  <td>$old_alokasibiaya2</td>
                                              </tr>
                                              <tr>
                                                  <td width = '180' align = 'left'><strong>Alokasi Biaya 3</strong></td>
                                                  <td width = '5' align = 'center'><strong>:</strong></td>
                                                  <td>$old_alokasibiaya3</td>
                                              </tr>
                                              <tr>
                                                  <td width = '180' align = 'left'><strong>Working Days</strong></td>
                                                  <td width = '5' align = 'center'><strong>:</strong></td>
                                                  <td>$old_hari_kerja_perminggu</td>
                                              </tr>
                                          </table>
                                      </td>
                                      <td colspan = '3'><div align = 'center'><strong>$statustransferlower Ke</strong></div>
                                          <table width = '100%' border = '1' id = 'tablecontent'>
                                              <tr>
                                                  <td width = '180' align = 'left' bgcolor='$colorproject'><strong>Proyek</strong></td>
                                                  <td width = '5' align = 'center' bgcolor='$colorproject'><strong>:</strong></td>
                                                  <td bgcolor='$colorproject'>$new_project</td>
                                              </tr>
                                              <tr>
                                                  <td width = '180' align = 'left' bgcolor='$colorpt'><strong>Pt</strong></td>
                                                  <td width = '5' align = 'center' bgcolor='$colorpt'><strong>:</strong></td>
                                                  <td bgcolor='$colorpt'>$new_pt</td>
                                              </tr>
                                              <tr>
                                                  <td width = '180' align = 'left' bgcolor='$colordept'><strong>Departemen</strong></td>
                                                  <td width = '5' align = 'center' bgcolor='$colordept'><strong>:</strong></td>
                                                  <td bgcolor='$colordept'>$new_department</td>
                                              </tr>
                                              <tr>
                                                  <td width = '180' align = 'left' bgcolor='$colorsection'><strong>Section</strong></td>
                                                  <td width = '5' align = 'center' bgcolor='$colorsection'><strong>:</strong></td>
                                                  <td bgcolor='$colorsection'>$new_section</td>
                                              </tr>
                                              <tr>
                                                  <td width = '180' align = 'left' bgcolor='$colorjobfam'><strong>Job Family</strong></td>
                                                  <td width = '5' align = 'center' bgcolor='$colorjobfam'><strong>:</strong></td>
                                                  <td bgcolor='$colorjobfam'>$new_jobfamily</td>
                                              </tr>
                                              <tr>
                                                  <td width = '180' align = 'left' bgcolor='$colorposition'><strong>Jabatan</strong></td>
                                                  <td width = '5' align = 'center' bgcolor='$colorposition'><strong>:</strong></td>
                                                  <td bgcolor='$colorposition'>$new_position</td>
                                              </tr>
                                              <tr>
                                                  <td width = '180' align = 'left' bgcolor='$colorbanding'><strong>Banding</strong></td>
                                                  <td width = '5' align = 'center' bgcolor='$colorbanding'><strong>:</strong></td>
                                                  <td bgcolor='$colorbanding'>$new_banding</td>
                                              </tr>
                                              <tr>
                                                  <td width = '180' align = 'left' bgcolor='$colorgroup'><strong>Golongan</strong></td>
                                                  <td width = '5' align = 'center' bgcolor='$colorgroup'><strong>:</strong></td>
                                                  <td bgcolor='$colorgroup'>$new_group</td>
                                              </tr>
                                              <tr>
                                                  <td width = '180' align = 'left' bgcolor='$colorreporto'><strong>Atasan Langsung</strong></td>
                                                  <td width = '5' align = 'center' bgcolor='$colorreporto'><strong>:</strong></td>
                                                  <td bgcolor='$colorreporto'>$new_reportto</td>
                                              </tr>
                                              <tr>
                                                  <td width = '180' align = 'left' bgcolor='$colorjabreporto'><strong>Jabatan Atasan Langsung</strong></td>
                                                  <td width = '5' align = 'center' bgcolor='$colorjabreporto'><strong>:</strong></td>
                                                  <td bgcolor='$colorjabreporto'>$new_jabatanreportto</td>
                                              </tr>
                                              <tr>
                                                  <td width = '180' align = 'left' bgcolor='$coloralokasi1'><strong>Alokasi Biaya 1</strong></td>
                                                  <td width = '5' align = 'center' bgcolor='$coloralokasi1'><strong>:</strong></td>
                                                  <td bgcolor='$coloralokasi1'>$new_alokasibiaya1</td>
                                              </tr>
                                              <tr>
                                                  <td width = '180' align = 'left' bgcolor='$coloralokasi2'><strong>Alokasi Biaya 2</strong></td>
                                                  <td width = '5' align = 'center' bgcolor='$coloralokasi2'><strong>:</strong></td>
                                                  <td bgcolor='$coloralokasi2'>$new_alokasibiaya2</td>
                                              </tr>
                                              <tr>
                                                  <td width = '180' align = 'left' bgcolor='$coloralokasi3'><strong>Alokasi Biaya 3</strong></td>
                                                  <td width = '5' align = 'center' bgcolor='$coloralokasi3'><strong>:</strong></td>
                                                  <td bgcolor='$coloralokasi3'>$new_alokasibiaya3</td>
                                              </tr>
                                              <tr>
                                                  <td width = '180' align = 'left' bgcolor='$colorworkingdays'><strong>Working Days</strong></td>
                                                  <td width = '5' align = 'center' bgcolor='$colorworkingdays'><strong>:</strong></td>
                                                  <td bgcolor='$colorworkingdays'>$new_hari_kerja_perminggu</td>
                                              </tr>
                                          </table>
                                      </td>
                              </table>
                              <p>
                                  Efektif Per Tanggal :$effective_date<br/>
                                  Dengan Pertimbangan :$reason<br/>
                                  Penambahan/perubahan/penyesuaian tugas dan lain-lain (bila ada) :<br/>$note<br/>
                              </p>
                              <p>
                               Nomor SK : $skno
                              </p>
                              <br/>


                              Jakarta, <?php echo date('d F Y');
                      ?>
                              <table width='100%'>
                                  <tr>
                                      <td colspan='3'>
                                          Dibuat oleh,
                                          <br/><br/>
                                          [$currentdate]<br/>
                                          $userfullname
                                      </td>
                                      <td colspan='3'>
                                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                      </td>
                                      <td colspan='3'>Disetujui oleh,
                                          <br/><br/>
                                          [$approvedate]<br/>
                                          $userapprove
                                      </td>
                                  </tr>
                              </table>
                              <br/><br/> ";

        //if ($statustransferlower == 'mutasi') { //jika data perubahan mutasi cetak html berikut
        $html .= "  
                               Adapun hal yang harus di perhatikan terkait perubahan data karyawan tersebut antara lain :<br/>
                                PM : <br/>
                                  - Approval Matrix <br/>
                                  - Package Document <br/>
                                  - Data PM Karyawan <br/>

                                Personal Data:<br/>
                                   - Finger Print Code Karyawan<br><br>  
                                   
                                Absensi:<br/>
                                   - Data Absensi<br> 
                                   - Shift<br>  
                                   - Cuti, Ijin, Lembur, TLK<br>  
                                ";
        //}

        $html .= "Daftarkan perubahan data karyawan di menu Career -> Perubahan Status Karyawan. <br/>  
                                <a href='$goto' style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;display:inline-block;text-align:center;text-decoration:none;height:36px;line-height:36px;padding-left:8px; padding-right:8px; min-width:88px; font-size:14px;font-weight:400;color:#ffffff; background-color:#4CAF50;border-radius:2px; border-width:0px;text-shadow:7px 6px 9px #000000;' target='_blank'>Go to Ciputra Web Application</a><br><br> 
                       
                        </body>
                      </html>
                ";

        return $html;
    }

    public function conditionbgColor($text1, $text2) {
        if ($text1 == $text2) {
            $bgcolor = '';
        } else {
            $bgcolor = 'yellow';
        }
        return $bgcolor;
    }

    public function changeStatus($changestatus_id) {
        switch ($changestatus_id) {
            case 1:
                return 'PROMOSI';
                break;
            case 2:
                return 'ROTASI';
                break;
            case 3:
                return 'MUTASI';
                break;
            case 4:
                return 'DEMOSI';
                break;
        }
    }

    public function printData($param) {
        $datachangestatus = $this->setting->getbyid_changestatus($param['changestatus_id']);
        $approvedate = $datachangestatus['approve_date'];
        $datauser = $this->setting->getbyid_user($param['addby']);
        $datauserapprove = $this->setting->getbyid_user($datachangestatus['approve_user_id']);
        $userapprove = null;
        if ($datauserapprove) {
            $userapprove = $datauserapprove['user_fullname'];
        }
        $dataemployee = $this->setting->getbyid_employee($param['employee_id']);
        $dataapprove = $this->setting->getbyid_employee($param['approvalby']);
        $dataoldproject = $this->setting->getbyid_project($param['old_project_id']);
        $datanewproject = $this->setting->getbyid_project($param['new_project_id']);
        $dataoldpt = $this->setting->getbyid_pt($param['old_pt_id']);
        $datanewpt = $this->setting->getbyid_pt($param['new_pt_id']);
        $dataolddepartment = $this->setting->getbyid_department($param['old_department_id']);
        $datanewdepartment = $this->setting->getbyid_department($param['new_department_id']);
        $dataoldsection = $this->setting->getbyid_section($param['old_section_id']);
        $datanewsection = $this->setting->getbyid_section($param['new_section_id']);
        $dataold_jobfamily = $this->setting->getbyid_jobfamily($param['old_jobfamily_id']);
        $datanew_jobfamily = $this->setting->getbyid_jobfamily($param['new_jobfamily_id']);
        $dataold_position = $this->setting->getbyid_position($param['old_position_id']);
        $datanew_position = $this->setting->getbyid_position($param['new_position_id']);
        $dataold_banding = $this->setting->getbyid_banding($param['old_banding_id']);
        $datanew_banding = $this->setting->getbyid_banding($param['new_banding_id']);
        $dataold_group = $this->setting->getbyid_group($param['old_group_id']);
        $datanew_group = $this->setting->getbyid_group($param['new_group_id']);
        $dataold_atasan = $this->setting->getbyid_employee($param['old_reportto_id']);
        $datanew_atasan = $this->setting->getbyid_employee($param['new_reportto_id']);
        $dataold_jabatan_atasan = $this->setting->getbyid_position($dataold_atasan['position_id']);
        $datanew_jabatan_atasan = $this->setting->getbyid_position($datanew_atasan['position_id']);
        $dataold_alokasi1 = $this->setting->getbyid_alokasibiaya($param['old_costcenter1']);
        $datanew_alokasi1 = $this->setting->getbyid_alokasibiaya($param['new_costcenter1']);
        $dataold_alokasi2 = $this->setting->getbyid_alokasibiaya($param['old_costcenter2']);
        $datanew_alokasi2 = $this->setting->getbyid_alokasibiaya($param['new_costcenter2']);
        $dataold_alokasi3 = $this->setting->getbyid_alokasibiaya($param['old_costcenter3']);
        $datanew_alokasi3 = $this->setting->getbyid_alokasibiaya($param['new_costcenter3']);
        $statustransfer = $this->changeStatus($param['changetype_id']);
        $statustransferlower = ucfirst($this->changeStatus($param['changetype_id']));

        $old_project = $new_project = '';
        $old_pt = $new_pt = '';
        $old_department = $new_department = '';
        $old_section = $new_section = '';
        $old_jobfamily = $new_jobfamily = '';
        $old_position = $new_position = '';
        $old_banding = $new_banding = '';
        $old_group = $new_group = '';
        $old_reportto = $new_reportto = '';
        $old_jabatanreportto = $new_jabatanreportto = '';
        $old_alokasibiaya1 = $new_alokasibiaya1 = '';
        $old_alokasibiaya2 = $new_alokasibiaya2 = '';
        $old_alokasibiaya3 = $new_alokasibiaya3 = '';

        if ($dataoldproject) {
            $old_project = $dataoldproject['name'];
        }
        if ($datanewproject) {
            $new_project = $datanewproject['name'];
        }

        if ($dataoldpt) {
            $old_pt = $dataoldpt['name'];
        }

        if ($datanewpt) {
            $new_pt = $datanewpt['name'];
        }

        if ($dataolddepartment) {
            $old_department = $dataolddepartment['department'];
        }

        if ($datanewdepartment) {
            $new_department = $datanewdepartment['department'];
        }

        if ($dataoldsection) {
            $old_section = $dataoldsection['section'];
        }
        if ($datanewsection) {
            $new_section = $datanewsection['section'];
        }

        if ($dataold_jobfamily) {
            $old_jobfamily = $dataold_jobfamily['jobfamily'];
        }
        if ($datanew_jobfamily) {
            $new_jobfamily = $datanew_jobfamily['jobfamily'];
        }

        if ($dataold_position) {
            $old_position = $dataold_position['description'];
        }
        if ($datanew_position) {
            $new_position = $datanew_position['description'];
        }

        if ($dataold_banding) {
            $old_banding = $dataold_banding['banding'];
        }
        if ($datanew_banding) {
            $new_banding = $datanew_banding['banding'];
        }

        if ($dataold_group) {
            $old_group = $dataold_group['code'];
        }
        if ($datanew_group) {
            $new_group = $datanew_group['code'];
        }
        if ($dataold_atasan) {
            $old_reportto = $dataold_atasan['employee_name'];
        }
        if ($datanew_atasan) {
            $new_reportto = $datanew_atasan['employee_name'];
        }
        if ($dataold_jabatan_atasan) {
            $old_jabatanreportto = $dataold_jabatan_atasan['description'];
        }
        if ($datanew_jabatan_atasan) {
            $new_jabatanreportto = $datanew_jabatan_atasan['description'];
        }

        if ($dataold_alokasi1) {
            $old_alokasibiaya1 = $dataold_alokasi1['name'];
        }

        if ($datanew_alokasi1) {
            $new_alokasibiaya1 = $datanew_alokasi1['name'];
        }
        if ($dataold_alokasi2) {
            $old_alokasibiaya2 = $dataold_alokasi2['name'];
        }
        if ($datanew_alokasi2) {
            $new_alokasibiaya2 = $datanew_alokasi2['name'];
        }
        if ($dataold_alokasi3) {
            $old_alokasibiaya3 = $dataold_alokasi3['name'];
        }
        if ($datanew_alokasi3) {
            $new_alokasibiaya3 = $datanew_alokasi3['name'];
        }
        $nik = $dataemployee['employee_nik'];
        $namakaryawan = $dataemployee['employee_name'];
        $statuskaryawan = $param['employeestatus'];
        $contract_ke = $param['contract_ke'];
        $tanggalmasuk = $this->setting->checkDate(date('d-m-Y', strtotime($param['hire_date'])));
        $mulaikontrak = $this->setting->checkDate(date('d-m-Y', strtotime($param['mulaikontrak'])));
        $berakhirkontrak = $this->setting->checkDate(date('d-m-Y', strtotime($param['berakhirkontrak'])));
        $tanggalpengankatan = $this->setting->checkDate(date('d-m-Y', strtotime($param['assignation_date'])));
        $effective_date = $this->setting->checkDate(date('d-m-Y', strtotime($param['effective_date'])));
        $reason = $param['reason'];
        $note = $param['note'];
        $skno = $param['sk_number'];
        $approveby = $dataapprove['employee_name'];
        $userfullname = $datauser['user_fullname'];
        $currentdate = date('d-m-Y H:i:s', strtotime($datachangestatus['addon']));

        if ($statuskaryawan == 'permanent') {
            $statusdatakaryawan = "Pegawai Tetap Sejak Tanggal $tanggalpengankatan";
        } else {
            $statusdatakaryawan = " Kontrak ke $contract_ke,  Tanggal $mulaikontrak s/d Tanggal $berakhirkontrak ";
        }
        
        // added by wulan sari 20190625
        $old_group = $old_group == '' ? 'xxx' : $old_group;
        $new_group = $new_group == '' ? 'xxx' : $new_group;
        // end added by wulan sari 20190625
        
        $return = array(
            "employee_nik" => $nik,
            "employee_name" => $namakaryawan,
            "hire_date" => $tanggalmasuk,
            "statuskaryawan" => $statusdatakaryawan,
            "statusdata" => $statustransfer,
            "statusdata2" => ucfirst(strtolower($statustransferlower)),
            "old_projectname" => $old_project,
            "new_projectname" => $new_project,
            "old_ptname" => $old_pt,
            "new_ptname" => $new_pt,
            "old_department" => $old_department,
            "new_department" => $new_department,
            "old_section" => $old_section,
            "new_section" => $new_section,
            "old_jobfamily" => $old_jobfamily,
            "new_jobfamily" => $new_jobfamily,
            "old_jabatan" => $old_position,
            "new_jabatan" => $new_position,
            "old_banding" => $old_banding,
            "new_banding" => $new_banding,
            "old_groupcode" => $old_group,
            "new_groupcode" => $new_group,
            "old_atasanlangsung" => $old_reportto,
            "new_atasanlangsung" => $new_reportto,
            "old_jabatanatasanlangsung" => $old_jabatanreportto,
            "new_jabatanatasanlangsung" => $new_jabatanreportto,
            "old_alokasibiaya1" => $old_alokasibiaya1,
            "old_alokasibiaya2" => $old_alokasibiaya2,
            "old_alokasibiaya3" => $old_alokasibiaya3,
            "new_alokasibiaya1" => $new_alokasibiaya1,
            "new_alokasibiaya2" => $new_alokasibiaya2,
            "new_alokasibiaya3" => $new_alokasibiaya3,
            "efective_date" => $effective_date,
            "pertimbangan" => $reason,
            "catatan" => $note,
            "dibuatoleh" => $userfullname,
            "disetujui" => $userapprove,
            "skno" => $skno,
        );
        return $return;
    }
    
    // edit by wulan sari 20190813
    function applied_approve() {
        $param['changetype_id'] = 3;
        $param['employee_id'] = 2013;
        $originaldata_m_employee = $this->dao_emp->getAllByIds(2013);
        $this->create_history_employee($originaldata_m_employee, 'mutation_approve', $param);
        if ($param['changetype_id'] == 3) {
            $this->_intranet->Authorizeuser($param['employee_id']);
        }
    }
    // end edit by wulan sari 20190813

}
