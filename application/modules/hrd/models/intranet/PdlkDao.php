<?php

/**
 * Description of PdlkDao
 *
 * @author MIS
 */
class Hrd_Models_Intranet_PdlkDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {

    public function sqlQuery_old($condition, $configintranet) {
        $obj = new Hrd_Models_Intranet_Configmysql();
        $config = $obj->getConfigdata($configintranet);
        $user = $config['database_sec'] . '.sec_user';
        $employee = $config['database_master'] . '.m_employee';
        $department = $config['database_master'] . '.m_department';
        $datah = $config['database'] . '.th_pdlk';
        $dataapprove = $config['database'] . '.td_pdlkapproval';
        $m_pic = $config['database'] . '.m_pic';
        $m_project = $config['database_master'] . '.m_project';

        $sql = "
                    SELECT
                        h.project_id_ces,
                        h.pt_id_ces,
                        h.employee_id_ces,
                        h.user_id_ces,
                        a.tugas_id,
                        '' as tipe,
                        a.project_id, 
                        a.pt_id, 
                        a.employee_id as employee_id_user_intranet, 
                        a.email_cc_employee_id as employee_id_cc_intranet, 
                        d.NIK, 
                        d.NAME, 
                        a.department_id, 
                        CONCAT(f.code,'-',f.description) AS department, 
                        b.tugasapproval_id,
                        b.employee_id as employee_id_hod_intranet, 
                        e.NAME AS approve_by,
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
                        IF(((a.tugas_other <> '') OR (a.tugas_other <> NULL) ),a.tugas_other,i.name) AS bertugas_ke
                    FROM $datah a
                    LEFT JOIN $dataapprove b ON b.tugas_id = a.tugas_id  
                    LEFT JOIN $employee d ON a.employee_id = d.employee_id
                    LEFT JOIN $employee e ON b.employee_id = e.employee_id
                    LEFT JOIN $department f ON a.department_id = f.department_id
                    LEFT JOIN $user h ON  h.id = d.SEC_USER_ID       
                    LEFT JOIN $m_project i ON i.project_id = a.tugas_to
                    ";
        return $sql;
    }
    public function sqlQuery($condition, $configintranet) {
        $obj = new Hrd_Models_Intranet_Configmysql();
        $config = $obj->getConfigdata($configintranet);
        $user = $config['database_sec'] . '.sec_user';
        $employee = $config['database_master'] . '.m_employee';
        $department = $config['database_master'] . '.m_department';
        $datah = $config['database'] . '.th_pdlk';
        $dataapprove = $config['database'] . '.td_pdlkapproval';
        $m_pic = $config['database'] . '.m_pic';
        $m_project = $config['database_master'] . '.m_project';

        $sql = "    
                       SELECT
                        a.employee_id,
                        c.project_id_ces,
                        c.pt_id_ces,
                        c.employee_id_ces,
                        c.user_id_ces,
                        a.tugas_id,                      
                        a.project_id, 
                        a.tugas_to, 
                        a.tugas_other, 
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
                        a.tipe,
                        b.user_tambah AS td_user_tambah,
                        b.tgl_tambah AS td_tgl_tambah                        
                    FROM $datah a
                    LEFT JOIN $dataapprove b ON b.tugas_id = a.tugas_id 
                    LEFT JOIN $user c ON c.name = a.user_tambah 
                    LEFT JOIN $m_project i ON i.project_id = a.tugas_to
                    ";
        return $sql;
    }

    public function SqlCondition($project_id, $pt_id, $condition, $param) {
        $where = " WHERE ";
        $where .= " b.approval_date IS NOT NULL";
        $where .= " AND c.project_id_ces = $project_id";
        $where .= " AND c.pt_id_ces = $pt_id";
        $where .= " AND a.is_deleted = 0";
        $where .= " AND b.is_deleted = 0";
        if ($condition == 'default') {
            $where .= " AND a.hrd_check = 'NO'";
            $where .= " ORDER BY a.start_date ASC ";
            return $where;
        } else if ($condition == 'getbyid') {
            $id = $param['tugas_id'];
            $where = " WHERE ";
            $where .= " b.approval_date IS NOT NULL";
            $where .= " AND a.is_deleted = 0";
            $where .= " AND b.is_deleted = 0";
            $where .= " AND a.tugas_id = $id";
            return $where;
        } else {
            $filter = json_decode($param);
            $where .= " AND a.hrd_check = '$filter->hrd_checked'";
            if (!empty($filter->tugas_id)) {
                $where .= " AND a.tugas_id = $filter->tugas_id";
            }
            if (!empty($filter->fromdate)) {
                $where .= "  AND STR_TO_DATE(a.start_date,'%Y-%m-%d') BETWEEN '$filter->fromdate' AND '$filter->untildate' ";
            }
            if (!empty($filter->comment)) {
                $where .= " AND a.comment like '%$filter->comment%'";
            }
            if (!empty($filter->deptcode)) {
                $where .= " AND f.code like '%$filter->deptcode%'";
            }
            if (!empty($filter->employee_name)) {
                $where .= " AND d.NAME like '%$filter->employee_name%'";
            }
            $where .= " ORDER BY a.start_date ASC ";
            return $where;
        }
    }

    public function getAll($project_id, $pt_id, $condition, $configintranet, $param) {
        $obj = new Hrd_Models_Intranet_Configmysql();
        $config = $obj->getConfigdata($configintranet);
        //print_r($config);
        $mysqlcon = new mysqli(
                $config['host'], $config['user'], $config['password'], $config['database'], $config['port']
        );
        if ($mysqlcon->connect_error) {
            die("Connection failed: " . $mysqlcon->conneact_error);
            return null;
        } else {
            $field = $this->sqlQuery($condition, $configintranet);
            $where = $this->SqlCondition($project_id, $pt_id, $condition, $param);
            //echo '<pre/>';
            //echo $field . ' ' . $where;


            $mysqlquery = mysqli_query($mysqlcon, $field . ' ' . $where);
            $mysqlcount = mysqli_num_rows($mysqlquery);
            $mydata = array();
            $setup = new Hrd_Models_General_Setup();
            
            while ($myrow = $mysqlquery->fetch_array(MYSQLI_ASSOC)) {
                $rowemployee = $this->getEmployee($myrow['employee_id_user_intranet']);
                if ($rowemployee) { 
                    $dataproject = $setup->getbyid_project($myrow['tugas_to']);
                    
                    $myrow['department_id'] = $rowemployee['department_id'];
                    $myrow['hire_date'] = $rowemployee['hire_date'];
                    $myrow['position_id'] = $rowemployee['position_id'];
                    $myrow['position'] = $rowemployee['position_position'];
                    $myrow['position_description'] = $rowemployee['position_description'];
                    $myrow['configintranet'] = $configintranet;
                    $myrow['NIK'] = $rowemployee['employee_nik'];
                    $myrow['NAME'] = $rowemployee['employee_name'];
                    $myrow['employee_employee_id'] = $myrow['employee_id'];
                    
                    if (empty($myrow['tugas_other'])) {
                        $myrow['parametertlk_id'] = 0;
                        $myrow['tlk_other'] = 0;
                        $myrow['tlk_project_type'] = 1;
                        $myrow['pdlk_note'] = $dataproject['name'];
                    } else {
                        $myrow['parametertlk_id'] = 0;
                        $myrow['tlk_other'] = $myrow['tugas_other'];
                        $myrow['tlk_project_type'] = 2;
                        $myrow['pdlk_note'] = $dataproject['name'];
                    }  
                                        
                    $myrow['start_date'] = $myrow['start_date'];
                    $myrow['end_date'] = $myrow['end_date'];
                    $myrow['status'] = $myrow['tipe'];
                    $mydata[] = $myrow;
                }
            }
            $return = array(array(array("totalRow" => $mysqlcount)), $mydata);
            return $return;
            mysqli_free_result($mysqlquery);
            mysqli_close($mysqlcon);
        }
    }

    public function updateStatusIntranet($configintranet, $id, $hrd_comment,$tipe) {
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
            $table = $config['database'] . ".th_pdlk";
            if (!empty($hrd_comment)) {
                mysqli_query($mysqlcon, "UPDATE $table SET tipe='$tipe',hrd_comment='$hrd_comment',comment_date='$date' WHERE tugas_id=$id and is_deleted=0 ");
            } else {
                mysqli_query($mysqlcon, "UPDATE $table SET tipe='$tipe' WHERE tugas_id=$id and is_deleted=0 ");
            }
            mysqli_close($mysqlcon);
        }
    }
    
    public function updateStatus($configintranet, $id, $hrd_check) {
        $obj = new Hrd_Models_Intranet_Configmysql();
        $config = $obj->getConfigdata($configintranet);
        $mysqlcon = new mysqli(
                $config['host'], $config['user'], $config['password'], $config['database'], $config['port']
        );
        if ($mysqlcon->connect_error) {
            die("Connection failed: " . $mysqlcon->conneact_error);
            return null;
        } else {
            $table = $config['database'] . ".th_pdlk";
            if (!empty($hrd_check)) {
                mysqli_query($mysqlcon, "UPDATE $table SET hrd_check='$hrd_check' WHERE tugas_id=$id");
            }
            mysqli_close($mysqlcon);
        }
    }

    public function getEmailLDAPinIntranet($configintranet, $employee_id) {
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
            $mysqlquery = mysqli_query($mysqlcon, "
                                        SELECT b.* FROM $employee a 
                                        LEFT JOIN $p_ldap b ON a.SEC_USER_ID = b.sec_user_id
                                        WHERE  
                                          a.employee_id =$employee_id
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
        $result = $this->dbTable->SPExecute('sp_employee_read_byid', $employee_id_ces);
        if (!empty($result[0])) {
            return $result[0][0];
        } else {
            return null;
        }
    }

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        
    }

    public function updatePdlkIntranet($configintranet, $id, $hrd_comment, $user_id_and_note) {
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
                mysqli_query($mysqlcon, "UPDATE $table SET hrd_comment='$hrd_comment',comment_date='$date',user_ubah='$user_id_and_note' WHERE tugas_id=$id and is_deleted=0 ");
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
        $obj = new Hrd_Models_Intranet_Pdlk();
        $project_id = $obj->getProject_id_ces();
        $pt_id = $obj->getPt_id_ces();
        $user_id = $obj->getUserlogin();
        $id = $data['tugas_id'];
        $hrd_comment = $data['hrd_comment'];
        $this->updatePdlkIntranet($configintranet, $id, $hrd_comment, $user_id);
        $result = $this->getAll($project_id, $pt_id, 'getbyid', $configintranet, $data);
        if (!empty($result[1])) {
            $row = $result[1][0];
            $statuskirimemail = $data['sendmail'];
            if ($statuskirimemail == 1) {
                if ($row['tugas_other'] != "") {
                    $tugas_to = $row['tugas_other'];
                } else {
                    $rowmproject = $this->get_m_project($configintranet, $row['tugas_to']);
                    if (!empty($rowmproject[0])) {
                        $tmp_tugas_to = $rowmproject[0]['name'];
                    } else {
                        $tmp_tugas_to = '';
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
                $rowemailuser = $this->getEmailLDAPinIntranet($configintranet, $data['employee_id_user_intranet']);
                $rowemailhod = $this->getEmailLDAPinIntranet($configintranet, $data['employee_id_hod_intranet']);
                if (!empty($data['employee_id_cc_intranet'])) {
                    $rowemailcc = $this->getEmailLDAPinIntranet($configintranet, $data['employee_id_cc_intranet']);
                } else {
                    $rowemailcc = '';
                }

                if (!empty($rowemailuser)) {
                    $email_user = $rowemailuser[0]['email'];
                } else {
                    $email_user = '';
                }
                if (!empty($rowemailhod)) {
                    $email_hod = $rowemailhod[0]['email'];
                } else {
                    $email_hod = '';
                }
                if (!empty($rowemailcc)) {
                    $email_cc = $rowemailcc[0]['email'];
                } else {
                    $email_cc = '';
                }
                if (!empty($email_cc)) {
                    $cc_email = array($email_hod, $email_cc);
                } else {
                    $cc_email = array($email_hod);
                }
//                print_r($email_user);
//                print_r($email_hod);
//                print_r($email_cc);

                //$sender = 'ces@ciputra.co.id';
                $to = $email_user;
                //$to = 'ahmad.cipdev@gmail.com';
                $cc_maker = $cc_email;
                //$cc_maker =array('ahmadriadi.ti@gmail.ocm','info.riadii@gmail.com');
                $mail = $obj->get_mail();
                $sender = $mail->emailuser;
                $mail->setData()->setFrom($sender);
                $mail->setData()->setBodyHtml($message);
                $mail->setData()->addTo($to, strtoupper($row['NAME']));
                $mail->setData()->addCc($cc_maker, strtoupper($row['NAME']));
                $mail->setData()->setSubject('[Permohonan  Surat PDLK - HRD Comment] No. Permohonan  #' . $id . ' Tanggal Berangkat ' . date('d F Y', strtotime($data['start_date'])) . ' - Tanggal Kembali ' . date('d F Y', strtotime($data['end_date'])));
                if ($mail->setData()->send()) {
                    //echo 'success';
                } else {
                    //echo 'failed';
                }
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
    public function Updatetlkbyintranet($param, $absentdetail_id, $parametertlk_id, $tlk_other, $tlk_project_type) {
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
        //print_r($note);
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_absentdetailpdlkbyintranet_update', $user_id, $absentdetail_id, $parametertlk_id, $tlk_other, $tlk_project_type, $time_in, $time_out, $schedule1_in, $schedule1_out, $schedule2_in, $schedule2_out, $schedule3_in, $schedule3_out, $total_late, $total_attendance, $total_losttime, $total_hour, $note
        );
        return $hasil;
    }

    /* end added by ahmad riadi 02-06-2017 */
}

?>
