<?php

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Hrd_Models_Groupemployee extends Zend_Db_Table_Abstract {

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
        $this->setting->_storeprocedure = 'sp_groupemployee';
        $this->dao_emp = new Hrd_Models_Master_EmployeeDao();
        $this->_createdatalog = new Hrd_Models_Createdatalog();
        $this->_intranet = new Hrd_Models_Intranet_Employee();
        $this->path = 'app/hrd/uploads/groupemployee/';
        $this->folderapps = getcwd() . '/' . $this->path;
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
                            $this->update_employee($originaldata_m_employee, 'groupemployee_approve', $param);
                        }
                        break;
                    case 'update':
                        
                        // input ke log
                        $param_read['groupemployee_id'] = $param['groupemployee_id'];
                        $param_read['hideparam'] = 'log';
                        $this->setting->_paramsql = 'log';
                        $this->setting->_param = $param_read;
                        $this->setting->executeSP();
                        
                        $originaldata_m_employee = $this->dao_emp->getAllByIds($param['employee_id']);
                        
                        $result = $this->updateData($param);
                        $data = $result[2][0]['MSG'];
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        $message = $result[2][0]['MSG'];
                        $valid = $result[0][0]['VALIDDATA'];  
                        
                        if ($valid == true) {                            
                            $this->update_employee($originaldata_m_employee, 'groupemployee_approve', $param);   
                            
                            $group_id_lama = $originaldata_m_employee[1][0]['group_id'];
                            $group_id_baru = $param['group_id'];
                            
                            if($group_id_lama != $group_id_baru){
                                // Group lama
                                $param_read['group_id'] = $group_id_lama;
                                $param_read['hideparam'] = 'getgroup';
                                $this->setting->_paramsql = 'getgroup';
                                $this->setting->_param = $param_read;
                                $result_group = $this->setting->executeSP();
                                $data_group = $result_group[0][0];
                                $code_lama = $data_group['code'];
                                
                                // Group baru
                                $param_read['group_id'] = $group_id_baru;
                                $param_read['hideparam'] = 'getgroup';
                                $this->setting->_paramsql = 'getgroup';
                                $this->setting->_param = $param_read;
                                $result_group = $this->setting->executeSP();
                                $data_group = $result_group[0][0];
                                $code_baru = $data_group['code'];

                                //send email to root user
                                $param_read['project_id'] = $originaldata_m_employee[1][0]['project_id'];
                                $param_read['pt_id'] = $originaldata_m_employee[1][0]['pt_id'];
                                $param_read['hideparam'] = 'root_user';
                                $this->setting->_paramsql = 'root_user';
                                $this->setting->_param = $param_read;
                                $result_root = $this->setting->executeSP();
                                
                                foreach ($result_root[0] as $key => $val) {
                                    $root_email = $val['email_ciputra'];
                                    $root_name = $val['employee_name'];
                                    $employee_name = $originaldata_m_employee[1][0]['employee_name'];
                                    $employee_name = ucwords($employee_name);
                                    
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
                                        <p>
                                        Diinformasikan bahwa terdapat perubahan data karyawan a.n $employee_name <br>
                                        melalui HCMS - Personal Group (Golongan), sbb : <br>
                                        </p>
                                        <p>
                                        Golongan Lama : $code_lama <br>
                                        Golongan Baru : $code_baru
                                        </p>   
                                        <br><br>
                                        <p>Regards,</p>
                                        <p>Ciputra Enterprise System</p>
                                      </body>
                                    </html>";

                                    $subject = "Personal Group (Golongan) of Employee " . $employee_name . ' Updated';
                                    $this->_mail->setData()->setFrom($this->_mail->emailuser);
                                    $this->_mail->setData()->setBodyHtml($html);
                                    $this->_mail->setData()->addTo($root_email, $root_name);
                                    $this->_mail->setData()->setSubject($subject);
                                    $this->_mail->setData()->send();

                                    if ($this->_mail->setData()->send()) {
                                        //echo 'succes send mail';
                                    } else {
                                        //echo 'failed send mail';
                                    }
                                }                               
                            }
                            
                            // supaya return ga error;
                            $this->setting->_param['mode_read'] = 'update';
                                                    
                        }
                        break;
                    default:
                        $result = null;
                        $valid = true;
                        $counter = 0;
                        $message = 'no action';
                }
                
                if($this->setting->_param['mode_read'] == 'exportdata'){
                    $return = $data;
                } else {
                    $return = array(
                        "success" => $valid,
                        "data" => $data,
                        "msg" => $message,
                        "total" => $counter,
                        "counter" => $counter,
                        "parameter" => $param['mode_read'],
                    );
                    
                }
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

    public function update_employee($dataemployee, $basedata, $param) {
        $counter = $dataemployee[0][0]['totalRow'];
        if ($counter > 0) {
            $this->changedatainEmployee($param['employee_id'], $param);
        }
    }
    
    public function changedatainEmployee($employee_id, $param) {
        $tabledata = 'hrd.dbo.m_employee';
        $record = array(
            "group_id" => $param['group_id'],
            "modiby" => $this->setting->_user_id,
            "modion" => date('Y-m-d H:i:s'),
        );
        $whereset = array(
            "employee_id" => $employee_id
        );
        $this->setting->_tabledata = $tabledata;
        $this->setting->updatedatav2($record, $whereset);
    }
    
    public function createData($param) {
        $this->setting->_paramsql = 'create';
        $this->setting->_param = $param;
        $result = $this->setting->executeSP();
        return $result;
    }

    public function updateData($param) {
        $this->setting->_paramsql = 'update';
        $this->setting->_iddata = $param['groupemployee_id'];
        $this->setting->_param = $param;
        $result = $this->setting->executeSP();
        return $result;
    }
    
    public function conditionbgColor($text1, $text2) {
        if ($text1 == $text2) {
            $bgcolor = '';
        } else {
            $bgcolor = 'yellow';
        }
        return $bgcolor;
    }
    
    function deleteData($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'groupemployee_id';
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
}
