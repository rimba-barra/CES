<?php

/**
 * Description of DinasDao
 *
 * @author MIS
 */
class Hrd_Models_Intranet_DinasDaoKp extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {

    public function sqlQuery($condition, $configintranet) {
        $obj = new Hrd_Models_Intranet_Configmysql();
        $config = $obj->getConfigdata($configintranet);
        $user = $config['database_sec'] . '.sec_user';
        $employee = $config['database_master'] . '.m_employee';
        $department = $config['database_master'] . '.m_department';
        $datah = $config['database'] . '.th_tugas';
        $dataapprove = $config['database'] . '.td_tugasapproval';
        $m_project = $config['database_master'] . '.m_project';

        $sql = "
                    SELECT
                        a.employee_id as employee_id_ces,
                        a.tugas_id,
                        a.project_id, 
                        a.pt_id, 
                        a.employee_id as employee_id_user_intranet, 
                        a.email_cc_employee_id as employee_id_cc_intranet, 
                        a.department_id, 
                        b.tugasapproval_id,
                        b.employee_id as employee_id_hod_intranet, 
                        b.approval_date,
                        b.approvallevel_id,  
                        a.start_date,
                        a.end_date,
                        a.tugas_to,                       
                        a.tugas_other,                       
                        a.description,
                        a.hrd_comment,
                        a.hrd_check,
                        a.comment_date,
                        a.is_deleted,
                        a.user_tambah,
                        a.tgl_tambah,
                        b.user_tambah AS td_user_tambah,
                        b.tgl_tambah AS td_tgl_tambah,
                        i.code,
                        i.location,
                        IF(((a.tugas_other <> '') OR (a.tugas_other <> NULL) ),a.tugas_other,i.name) AS bertugas_ke,                        
                        case when a.status is null or a.status = '' then 'SUBMIT' else a.status end as status
                    FROM $datah a
                    LEFT JOIN $dataapprove b ON b.tugas_id = a.tugas_id  
                    LEFT JOIN $user h ON h.employee_id_ces = a.employee_id
                    LEFT JOIN $m_project i ON i.project_id = a.tugas_to
                    ";
        return $sql;
    }

    public function SqlCondition($project_id, $pt_id, $condition, $param) {
        $where = " WHERE ";
        //$where .= " b.approval_date IS NOT NULL";
        $where .= " h.project_id_ces = $project_id";
        $where .= " AND h.pt_id_ces = $pt_id";
        $where .= " AND a.is_deleted = 0";
        $where .= " AND b.is_deleted = 0";
        if ($condition == 'default') {
            $where .= " AND a.hrd_check = 'NO'";
            $where .= " ORDER BY a.start_date ASC ";
            return $where;
        }else if ($condition == 'getbyid') {
            $id = $param['tugas_id'];
            $where = " WHERE ";
            //$where .= " b.approval_date IS NOT NULL";
            $where .= " a.is_deleted = 0";
            $where .= " AND b.is_deleted = 0";
            $where .= " AND a.tugas_id = $id";
            return $where;
        } else {
            $filter = json_decode($param);
            $where .= " AND a.hrd_check = '$filter->hrd_checked'";
            if (!empty($filter->tugas_id)) {
                $where .= " AND a.tugas_id = $filter->tugas_id";
            }
            if (!empty($filter->status)) {
                if($filter->status == 'SUBMIT'){
                    $where .= " AND (a.status = '' or a.status is null)";                         
                } else {
                    $where .= " AND a.status = '$filter->status'";
                }
            }
            if (!empty($filter->fromdate)) {
                $where .= "  AND STR_TO_DATE(a.start_date,'%Y-%m-%d') BETWEEN '$filter->fromdate' AND '$filter->untildate' ";
            }
            if (!empty($filter->comment)) {
                $where .= " AND a.comment like '%$filter->comment%'";
            }
            /*
            if (!empty($filter->deptcode)) {
                $where .= " AND f.code like '%$filter->deptcode%'";
            }*/
            // wulan edit 20190206
            if (!empty($filter->department_id)) {
                $where .= " AND a.department_id = $filter->department_id";
            }
            if (!empty($filter->employee_id)) {
                $where .= " AND a.employee_id = $filter->employee_id";
            }
            // end wulan edit 20190206           
            $where .= " ORDER BY a.start_date ASC ";
            return $where;
        }
    }

    public function getAll($project_id, $pt_id, $condition, $configintranet, $limit, $start, $param) {
        $obj = new Hrd_Models_Intranet_Configmysql();
        $config = $obj->getConfigdata($configintranet);
        $mysqlcon = new mysqli(
                $config['host'], $config['user'], $config['password'], $config['database'], $config['port']
        );
            $field = $this->sqlQuery($condition, $configintranet);
            $where = $this->SqlCondition($project_id, $pt_id, $condition, $param);

            //echo $field . ' ' . $where;

            $mysqlquery = mysqli_query($mysqlcon, $field . ' ' . $where);
            $mysqlcount = mysqli_num_rows($mysqlquery);
            
            // edit by wulan sari 20181215
            //echo $field . ' ' . $where;
        if ($mysqlcon->connect_error) {
            die("Connection failed: " . $mysqlcon->conneact_error);
            return null;
        } else {
            $field = $this->sqlQuery($condition, $configintranet);
            $where = $this->SqlCondition($project_id, $pt_id, $condition, $param);

            //echo $field . ' ' . $where;

            $mysqlquery = mysqli_query($mysqlcon, $field . ' ' . $where);
            $mysqlcount = mysqli_num_rows($mysqlquery);
            
            // edit by wulan sari 20181215
            //echo $field . ' ' . $where;
            $mysqlquery = mysqli_query($mysqlcon, $field . ' ' . $where . ' LIMIT '.$limit.' OFFSET '.$start);          
            // end by wulan sari 20181215
            
            $mydata = array();
            while ($myrow = $mysqlquery->fetch_array(MYSQLI_ASSOC)) {
                $rowemployee = $this->getEmployee($myrow['employee_id_ces']);
                $myrow['NIK'] = $rowemployee['employee_nik'];
                $myrow['NAME'] = $rowemployee['employee_name'];  
                $myrow['department'] = $rowemployee['department_department']; 
                $rowemployeeapprove = $this->getEmployee($myrow['employee_id_hod_intranet']);
                $myrow['approve_by'] = $rowemployeeapprove['employee_name'];
                $myrow['department_id'] = $rowemployee['department_id'];
                $myrow['hire_date'] = $rowemployee['hire_date'];
                $myrow['position_id'] = $rowemployee['position_id'];
                $myrow['position'] = $rowemployee['position_position'];
                $myrow['position_description'] = $rowemployee['position_description'];
                $myrow['configintranet'] = $configintranet;
                $myrow['employee_employee_id'] = $myrow['employee_id_ces'];
                
                $myrow['start_date'] = $myrow['start_date'];
                $myrow['end_date'] = $myrow['end_date'];
                
                $rowproject = $this->getProject($myrow['tugas_to']);
                $tugas_other = $myrow['tugas_other'];
                if($tugas_other != '' || $tugas_other != NULL ){
                    $bertugas_ke = $myrow['tugas_other'];
                } else {
                    $bertugas_ke = $rowproject['name'];                    
                }
                $myrow['bertugas_ke'] = $bertugas_ke;       
                $rowparamtlk = $this->getParametertlk_getbyname($myrow['bertugas_ke']);
                if (isset($rowparamtlk[0][0]['parametertlk_id'])) {
                    $myrow['parametertlk_id'] = $rowparamtlk[0][0]['parametertlk_id'];
                    $myrow['tlk_other'] = 0;
                    $myrow['tlk_project_type'] = 1;
                } else {
                    $myrow['parametertlk_id'] = 0;
                    $myrow['tlk_other'] = $myrow['bertugas_ke'];
                    $myrow['tlk_project_type'] = 2;
                }
                $mydata[] = $myrow;
            }
            $return = array(array(array("totalRow" => $mysqlcount)), $mydata);
            return $return;
            mysqli_free_result($mysqlquery);
            mysqli_close($mysqlcon);
        }
    }

    public function updateStatusIntranet($configintranet, $id, $hrd_check, $hrd_comment) {
        $obj = new Hrd_Models_Intranet_Configmysql();
        $config = $obj->getConfigdata($configintranet);
        $mysqlcon = new mysqli(
                $config['host'], $config['user'], $config['password'], $config['database'], $config['port']
        );
        if ($mysqlcon->connect_error) {
            die("Connection failed: " . $mysqlcon->conneact_error);
            return null;
        } else {
            $date = date('Y-m-d');
            $table = $config['database'] . ".th_tugas";
            if (!empty($hrd_comment)) {
                mysqli_query($mysqlcon, "UPDATE $table SET hrd_check='$hrd_check',hrd_comment='$hrd_comment',comment_date='$date' WHERE tugas_id=$id and is_deleted=0 ");
            } else {
                mysqli_query($mysqlcon, "UPDATE $table SET hrd_check='$hrd_check' WHERE tugas_id=$id and is_deleted=0 ");
            }
            mysqli_close($mysqlcon);
        }
    }
     public function getEmailLDAPinIntranet($configintranet,$employee_id) {
        $obj = new Hrd_Models_Intranet_Configmysql();
        $config = $obj->getConfigdata($configintranet);
        $mysqlcon = new mysqli(
                $config['host'], $config['user'], $config['password'], $config['database'], $config['port']
        );
        if ($mysqlcon->connect_error) {
            die("Connection failed: " . $mysqlcon->conneact_error);
            return null;
        } else {
            $p_ldap = $config['database_sec'] . '.p_sec_user_ldap';
            $employee = $config['database_master'] . '.m_employee';
            $sec_user = $config['database_sec'] . '.sec_user';
            /*
            $mysqlquery = mysqli_query($mysqlcon, "
                                        SELECT b.* FROM $employee a 
                                        LEFT JOIN $p_ldap b ON a.SEC_USER_ID = b.sec_user_id
                                        WHERE  
                                          a.employee_id =$employee_id
                                          AND a.is_active=1
                                          AND b.isblocked IN ('FALSE')
                        ");
            */
            
            // edit by wulan sari 20181130
            $mysqlquery = mysqli_query($mysqlcon, "
                                        SELECT b.* FROM $employee a 
                                        LEFT JOIN $p_ldap b ON a.SEC_USER_ID = b.sec_user_id
                                        LEFT JOIN $sec_user c ON c.name = a.ldap_id
                                        WHERE  
                                          c.employee_id_ces =$employee_id
                                          AND a.is_active=1
                                          AND b.isblocked IN ('FALSE')
                        ");
                        
            $mysqlcount = mysqli_num_rows($mysqlquery);
            $mydata = array();
            while ($myrow = $mysqlquery->fetch_array(MYSQLI_ASSOC)) {
                $mydata[] = $myrow;
            }
            return $mydata;
            mysqli_free_result($mysqlquery);
            mysqli_close($mysqlcon);
        }
    }

    public function getParametertlk_getbyname($name) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_parametertlk_getbyname_read', $name);
        return $hasil;
    }
    public function getAbsentdetail_byempdate($employee_id, $date) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_absentdetail_byempstartdate_read', $employee_id, $date);
        if (!empty($hasil[0])) {
            return $hasil[0][0];
        } else {
            return array(array("absentdetail_id" => 0));
        }
    }
    
    public function getEmployee($employee_id_ces) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_employee_read_byid', $employee_id_ces);
        if(isset($hasil[0][0])){
            return $hasil[0][0];
        } else {
            return 0;
        }
    }

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        
    }
    
    // public function updateDinasIntranet($configintranet, $id, $hrd_comment, $user_id_and_note) {
    // added by michael 17/11/2021
    // comment diatas
    public function updateDinasIntranet($configintranet, $id, $hrd_comment, $user_id_and_note, $sendemail) {
    // end added by michael 17/11/2021

        $obj = new Hrd_Models_Intranet_Configmysql();
        $config = $obj->getConfigdata($configintranet);
        $mysqlcon = new mysqli(
                $config['host'], $config['user'], $config['password'], $config['database'], $config['port']
        );
        if ($mysqlcon->connect_error) {
            die("Connection failed: " . $mysqlcon->conneact_error);
            return null;
        } else {
            $date = date('Y-m-d');
            $table = $config['database'] . ".th_tugas";

            if (!empty($hrd_comment)) {
                // mysqli_query($mysqlcon, "UPDATE $table SET hrd_comment='$hrd_comment',comment_date='$date',user_ubah='$user_id_and_note' WHERE tugas_id=$id and is_deleted=0 ");
                //added by michael 17/11/2021
                //comment diatas
                mysqli_query($mysqlcon, "UPDATE $table SET hrd_comment='$hrd_comment',comment_date='$date',user_ubah='$user_id_and_note', send_email = '$sendemail' WHERE tugas_id=$id and is_deleted=0 ");
                //end added by michael 17/11/2021
            } else {
                mysqli_query($mysqlcon, "UPDATE $table SET user_ubah='$user_id_and_note' WHERE tugas_id=$id and is_deleted=0 ");
            }
            mysqli_close($mysqlcon);
        }
    }
     public function get_m_project($configintranet, $id) {
        $obj = new Hrd_Models_Intranet_Configmysql();
        $config = $obj->getConfigdata($configintranet);
        $mysqlcon = new mysqli(
                $config['host'], $config['user'], $config['password'], $config['database'], $config['port']
        );
        if ($mysqlcon->connect_error) {
            die("Connection failed: " . $mysqlcon->conneact_error);
            return null;
        } else {
            $m_project = $config['database_master'] . '.m_project';
            $mysqlquery = mysqli_query($mysqlcon, "
                                        SELECT * FROM $m_project 
                                        WHERE  
                                           project_id =$id
                                          AND is_deleted=0
                                         
                        ");
            $mysqlcount = mysqli_num_rows($mysqlquery);
            $mydata = array();
            while ($myrow = $mysqlquery->fetch_array(MYSQLI_ASSOC)) {
                $mydata[] = $myrow;
            }
            return $mydata;
            mysqli_free_result($mysqlquery);
            mysqli_close($mysqlcon);
        }
    }
    
     function Sendemail($configintranet, $data) {
        $obj = new Hrd_Models_Intranet_Dinas();
        $project_id = $obj->getProject_id_ces();
        $pt_id = $obj->getPt_id_ces();
        $user_id = $obj->getUserlogin();
        $id = $data['tugas_id'];
        $hrd_comment = $data['hrd_comment'];

        // $this->updateDinasIntranet($configintranet, $id, $hrd_comment, $user_id);

        //added by michael 17/11/2021
        //comment yg diatas
        $this->updateDinasIntranet($configintranet, $id, $hrd_comment, $user_id, $data['sendmail']);
        //end added by michael 17/11/2021

        $result = $this->getAll($project_id, $pt_id, 'getbyid', $configintranet, 1, 0, $data);
        if (!empty($result[1])) {
            $row = $result[1][0];
            $statuskirimemail = $data['sendmail'];
            if ($statuskirimemail == 1) {
                if ($row['tugas_other'] != "") {
                    $tugas_to = $row['tugas_other'];
                } else {
                    $rowmproject = $this->get_m_project($configintranet,$row['tugas_to']);
                    if(!empty($rowmproject[0])){
                        $tmp_tugas_to = $rowmproject[0]['name'];
                    }else{
                        $tmp_tugas_to ='';
                    }
                    $tugas_to = $tmp_tugas_to;
                }
                 $message = '<html><body>';
                /* link ke logo intranet */ $message .= '<img src="https://intranet.ciputragroup.com/production/intranet/library/timthumb/timthumb.php?
src=https://intranet.ciputragroup.com/production/attachment/thumbnail/ciputra_logo.jpg&h=62&w=62&zc=1" alt="Intranet Request System" />';
                $message .= '<p>Dear Bapak / Ibu,</p>';
                $message .= "<p>Permohonan Tugas Luar Kantor yang dibuat oleh user dari INTRANET REQUEST SYSTEM berikut :</p>";
                $message .= "Nama	: <strong>" . strtoupper($row['NAME']) . "</strong><br>";
                $message .= "Tgl Masuk	: <strong>" . date('d F Y', strtotime($data['hire_date'])) . "</strong><br>";
                $message .= "Departemen	: <strong>" . $row['department'] . "</strong><br>";
                $message .= "Jabatan	: <strong>" . $row['position_description'] . "</strong><br>";
                $message .= "Untuk bertugas ke	: <strong>" . $tugas_to . "</strong><br>";
                $message .= "Tanggal Berangkat	: <strong>" . date('d F Y', strtotime($data['start_date'])) . "</strong><br>";
                $message .= "Tanggal Kembali	: <strong>" . date('d F Y', strtotime($data['end_date'])) . "</strong><br>";
                $message .= "Keperluan	:<br>";
                $message .= "<strong>" . nl2br($row['description']) . "</strong></p>";
                $message .= "<p>&nbsp;</p>";
                $message .= "<p>Telah dilakukan pengecekan oleh bagian HRD, <br>";
                $message .= "Keterangan HRD	:<br>";
                $message .= "<strong>" . nl2br($hrd_comment) . "</strong></p>";
                $message .= "<p>&nbsp;</p>";
                $message .= "<p>Regards,</p>";
                $message .= "Intranet Request system";
                $message .= "</body></html>";
                
                
                //email pengirim langsung pake ces aja - di konfirmasi pak jerry                 
                //berdasarkan disktusi 02-05-2017 dengan pak jerry, email menggunakan 
                //database intranet
                $rowemailuser = $this->getEmailLDAPinIntranet($configintranet,$data['employee_id_user_intranet']);
                $rowemailhod = $this->getEmailLDAPinIntranet($configintranet,$data['employee_id_hod_intranet']);
                if(!empty($data['employee_id_cc_intranet'])){
                     $rowemailcc = $this->getEmailLDAPinIntranet($configintranet,$data['employee_id_cc_intranet']);
                }else{
                     $rowemailcc = '';
                }
               
                if(!empty($rowemailuser)){
                    $email_user = $rowemailuser[0]['email'];
                }else{
                    $email_user = '';
                }
                if(!empty($rowemailhod)){
                    $email_hod = $rowemailhod[0]['email'];
                }else{
                    $email_hod = '';
                }
                if(!empty($rowemailcc)){
                    $email_cc = $rowemailcc[0]['email'];
                }else{
                    $email_cc = '';
                }                
                if(!empty($email_cc)){
                    $cc_email = array ($email_hod,$email_cc);
                }else{
                    $cc_email = array ($email_hod);
                }
//                print_r($email_user);
//                print_r($email_hod);
//                print_r($email_cc);
                
                /*
                //$sender = 'ces@ciputra.co.id';
                $to = $email_user;
                //$to = 'ahmad.cipdev@gmail.com';
                $cc_maker =$cc_email;
                //$cc_maker =array('ahmadriadi.ti@gmail.ocm','info.riadii@gmail.com');
                $mail = $obj->get_mail();
                $sender = $mail->emailuser;
                $mail->setData()->setFrom($sender);
                $mail->setData()->setBodyHtml($message);
                $mail->setData()->addTo($to, strtoupper($row['NAME']));
                $mail->setData()->addCc($cc_maker, strtoupper($row['NAME']));
                $mail->setData()->setSubject('[Permohonan  Surat Tugas Luar Kantor - HRD Comment] No. Permohonan  #' . $id . ' Tanggal Berangkat ' . date('d F Y', strtotime($data['start_date'])) . ' - Tanggal Kembali ' . date('d F Y', strtotime($data['end_date'])));
                if ($mail->setData()->send()) {
                    //echo 'success';
                } else {
                    //echo 'failed';
                }
                 * 
                 */
                
                // edit by Wulan Sari 20181130
                $sender = 'no.reply@ciputra.com';
                $to = $email_user;
                $mail = new Hrd_Models_General_Email();
                $mail->setData()->setFrom($sender);
                $mail->setData()->setBodyHtml($message);
                $mail->setData()->addTo($to, strtoupper($row['NAME']));
                $mail->setData()->addCc($cc_email, strtoupper($row['NAME']));
                $mail->setData()->setSubject('[Permohonan Surat Tugas Luar Kantor - HRD Comment] No. Permohonan  #' . $id . ' Tanggal Berangkat ' . date('d F Y', strtotime($data['start_date'])) . ' - Tanggal Kembali ' . date('d F Y', strtotime($data['end_date'])));
                if ($mail->setData()->send()) {
                    //echo 'success';
                } else {
                    //echo 'failed';
                }
                // end edit by Wulan Sari 20181130
                
            }
        }
    }


  /* start added by ahmad riadi 02-06-2017 */

    public function getAbsentdetail_byid($id) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_absentdetail_byid_read', $id);
        if (!empty($hasil[0])) {
            return $hasil[0][0];
        } else {
            return array(array("absentdetail_id" => 0));
        }
    }   
    public function getshift_byid($id) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_shifttype_byid_read', $id);
        if (!empty($hasil[0])) {
            return $hasil[0][0];
        } else {
            return array(array("shifttype_id" => 0));
        }
    }

    public function Updatetlkbyintranet($param,$absentdetail_id,$parametertlk_id,$tlk_other,$tlk_project_type) {
        $user_id = $param->getAddBy();
        $time_in = $param->getTimeIn();
        $time_out = $param->getTimeOut();
        $schedule1_in = $param->getTimeA()->getIn();
        $schedule1_out = $param->getTimeA()->getOut();
        $schedule2_in = $param->getTimeB()->getIn();
        $schedule2_out = $param->getTimeB()->getOut();
        $schedule3_in = $param->getTimeC()->getIn();
        $schedule3_out = $param->getTimeC()->getOut();
        $total_late = $param->getLate();
        $total_attendance = $param->getTotalAttendance();
        $total_losttime = $param->getTimeLost();
        $total_hour = $param->getTotalHours();
        $note = $param->getNote();
        
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_absentdetailtlkbyintranet_update',
                                            $user_id,
                                            $absentdetail_id,
                                            $parametertlk_id,
                                            $tlk_other,
                                            $tlk_project_type,
                                            $time_in,
                                            $time_out,
                                            $schedule1_in,
                                            $schedule1_out,
                                            $schedule2_in,
                                            $schedule2_out,
                                            $schedule3_in,
                                            $schedule3_out,
                                            $total_late,
                                            $total_attendance,
                                            $total_losttime,
                                            $total_hour,
                                            $note
        );
        return $hasil;
    }
    /* end added by ahmad riadi 02-06-2017 */

      
    public function getProject($id) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_project_byid_read', $id);
        if (!empty($hasil[0])) {
            return $hasil[0][0];
        } else {
            return array(array("project_id" => 0));
        }
    }

}

?>
