<?php

/**
 * Description of CutiDao
 *
 * @author MIS
 * - UI disamakan dengan di Intranet
 * - Default yang muncul hrd_check = NO, jika HRD sudah proses ke ces maka hrd_check = YES
 * 
 */
class Hrd_Models_Intranet_CutiDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {

    public function sqlQuery($condition, $config) {
        $obj = new Hrd_Models_Intranet_Configmysql();
        $config = $obj->getConfigdata($config);
        $user = $config['database_sec'] . '.sec_user';
        $employee = $config['database_master'] . '.m_employee';
        $department = $config['database_master'] . '.m_department';
        $cutih = $config['database'] . '.th_cuti';
        $cutiapprove = $config['database'] . '.td_cutiapproval';
        $cutiapprovelevel = $config['database'] . '.m_approvallevel';
        $cutitype = $config['database'] . '.m_cutitype';
        $sql = "
                    SELECT
                        h.project_id_ces,
                        h.pt_id_ces,
                        h.employee_id_ces,
                        h.user_id_ces,
                        a.cuti_id,
                        a.project_id, 
                        a.pt_id, 
                        a.employee_id as employee_id_user_intranet, 
                        a.email_cc_employee_id as employee_id_cc_intranet, 
                        d.NIK, 
                        d.NAME, 
                        a.department_id, 
                        CONCAT(f.code,'-',f.description) AS department, 
                        a.cutitype_id,
                        c.cutitype, 
                        c.is_potongcuti, 
                        c.description as cutitype_description, 
                        b.cutiapproval_id,
                        b.employee_id as employee_id_hod_intranet, 
                        e.NAME AS approve_by,
                        b.approval_date,
                        b.approvallevel_id,                         
                        a.lama_cuti as total, 
                        a.sisa_cuti,
                        b.approval_date,
                        a.comment_date,
                        a.description,
                        a.hrd_comment,
                        a.hrd_check,
                        a.is_deleted,
                        a.user_tambah,
                        a.tgl_tambah,
                        b.user_tambah AS td_user_tambah,
                        b.tgl_tambah AS td_tgl_tambah,
                        a.attachment      
                    FROM $cutih a
                    LEFT JOIN $cutiapprove b ON b.cuti_id = a.cuti_id                   
                    LEFT JOIN $cutitype c ON a.cutitype_id = c.cutitype_id
                    LEFT JOIN $employee d ON a.employee_id = d.employee_id
                    LEFT JOIN $employee e ON b.employee_id = e.employee_id
                    LEFT JOIN $department f ON a.department_id = f.department_id
                    LEFT JOIN $user h ON h.id = d.SEC_USER_ID                  
                    ";
        return $sql;
    }

    public function SqlCondition($project_id, $pt_id, $condition, $param) {
        $where = " WHERE ";
        $where .= " b.approval_date IS NOT NULL";
        $where .= " AND h.project_id_ces = $project_id";
        $where .= " AND h.pt_id_ces = $pt_id";
        $where .= " AND a.is_deleted = 0";
        $where .= " AND b.is_deleted = 0";
        if ($condition == 'default') {
            $where .= " AND a.hrd_check = 'NO'";
            return $where;
        } else if ($condition == 'getbyid') {
            $cuti_id = $param['cuti_id'];
            $where = " WHERE ";
            $where .= " b.approval_date IS NOT NULL";
            $where .= " AND a.is_deleted = 0";
            $where .= " AND b.is_deleted = 0";
            $where .= " AND a.cuti_id = $cuti_id";
            return $where;
        } else {
            $filter = json_decode($param);
            $where .= " AND a.hrd_check = '$filter->hrd_checked'";
            if (!empty($filter->cuti_id)) {
                $where .= " AND a.cuti_id = $filter->cuti_id";
            }
            if (!empty($filter->approvefrom)) {
                $where .= "  AND STR_TO_DATE(b.approval_date,'%Y-%m-%d') BETWEEN '$filter->approvefrom' AND '$filter->approveuntil' ";
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
            if (!empty($filter->cuti)) {
                $where .= " AND c.cutitype like '%$filter->cuti%'";
            }
            return $where;
        }
    }

    public function getreportto_in_multiposition($employee_id) {
        $setup = new Hrd_Models_General_Setup();
        $result = $setup->getdata_multiposition_byemployee_id($employee_id);
        if ($result) {
            $data = array();
            foreach ($result as $row) {
                if (!empty($row['reportto_id']) && $row['reportto_id'] > 0) {
                    $data[] = $row;
                }
            }
        }        
        if (!empty($data)) {
            $datareportto = array();
            foreach ($data as $rowdata) {
                $rowemployee = $this->getEmployee($rowdata['reportto_id']);
                $datareportto[] = $rowemployee['employee_name'];
            }
            $implodedata = implode(',', $datareportto);
            return $implodedata;
        } else {
            $data = null;
        }
        return $data;
    }
    
    public function getAll($project_id, $pt_id, $condition, $configintranet, $limit, $start, $param = null) {
        $obj = new Hrd_Models_Intranet_Configmysql();
        $config = $obj->getConfigdata($configintranet);
        $mysqlcon = new mysqli(
                $config['host'], $config['user'], $config['password'], $config['database'], $config['port']
        );
        if ($mysqlcon->connect_error) {
            die("Connection failed: " . $mysqlcon->conneact_error);
            return null;
        } else {
            $field = $this->sqlQuery($condition, $configintranet);
            $where = $this->SqlCondition($project_id, $pt_id, $condition, $param);
            
            $mysqlquery = mysqli_query($mysqlcon, $field . ' ' . $where);
            $mysqlcount = mysqli_num_rows($mysqlquery);
            
            // edit by wulan sari 20181215
            $mysqlquery = mysqli_query($mysqlcon, $field . ' ' . $where . ' LIMIT '.$limit.' OFFSET '.$start);          
            // end by wulan sari 20181215
            
            $mydata = array();
            while ($myrow = $mysqlquery->fetch_array(MYSQLI_ASSOC)) {
                $rowemployee = $this->getEmployee($myrow['employee_id_ces']);
                $rowabsenttype = $this->getAbsenttype($myrow['cutitype']);              
                $myrow['absenttype_id_default'] = $rowabsenttype['absenttype_id'];
                $myrow['absenttype_id'] = $rowabsenttype['absenttype_id'];
                $myrow['absenttypegroup_id'] = $rowabsenttype['absenttypegroup_id'];
                $myrow['absenttype_code'] = $rowabsenttype['code'];
                $myrow['department_id'] = $rowemployee['department_id'];
                $myrow['hire_date'] = $rowemployee['hire_date'];
                $myrow['position_id'] = $rowemployee['position_id'];
                $myrow['position'] = $rowemployee['position_position'];
                $myrow['position_description'] = $rowemployee['position_description'];
                $myrow['leave_quota'] = $rowemployee['leave_quota'];
                $myrow['hrd_comment_default'] = $myrow['hrd_comment'];
                $reportoinmultiposition = $this->getreportto_in_multiposition($myrow['employee_id_ces']);
                $myrow['reportoinmultiposition'] = $reportoinmultiposition;

                //added by michael 16/11/2021
                $myrow['attachment'] = $myrow['attachment'];
                //end added by micahel 16/11/2021

                $mydata[] = $myrow;
            }
            $return = array(array(array("totalRow" => $mysqlcount)), $mydata);
            return $return;
            mysqli_free_result($mysqlquery);
            mysqli_close($mysqlcon);
        }
    }

    public function getCutidetail($cuti_id, $configintranet) {
        $obj = new Hrd_Models_Intranet_Configmysql();
        $config = $obj->getConfigdata($configintranet);
        $mysqlcon = new mysqli(
                $config['host'], $config['user'], $config['password'], $config['database'], $config['port']
        );
        if ($mysqlcon->connect_error) {
            die("Connection failed: " . $mysqlcon->conneact_error);
            return null;
        } else {
            $mysqlquery = mysqli_query($mysqlcon, "SELECT * FROM td_cutidetail WHERE cuti_id=$cuti_id and is_deleted=0 ");
            $mysqlcount = mysqli_num_rows($mysqlquery);
            $mydata = array();
            while ($myrow = $mysqlquery->fetch_array(MYSQLI_ASSOC)) {
                $mydata[] = $myrow;
            }
            $return = array(array(array("totalRow" => $mysqlcount)), $mydata);
            return $return;
            mysqli_free_result($mysqlquery);
            mysqli_close($mysqlcon);
        }
    }

    public function updateStatusCutiIntranet($configintranet,$cuti_id,$hrd_check) {
        $obj = new Hrd_Models_Intranet_Configmysql();
        $config = $obj->getConfigdata($configintranet);
        $mysqlcon = new mysqli(
                $config['host'], $config['user'], $config['password'], $config['database'], $config['port']
        );
        if ($mysqlcon->connect_error) {
            die("Connection failed: " . $mysqlcon->conneact_error);
            return null;
        } else {
            $table = $config['database'] . ".th_cuti";
            mysqli_query($mysqlcon, "UPDATE $table SET hrd_check='$hrd_check' WHERE cuti_id=$cuti_id and is_deleted=0 ");
            mysqli_close($mysqlcon);
        }
    }
    // public function updateCutiIntranet($configintranet, $cuti_id, $cutitype_id,$hrd_comment,$user_id) {
    // added by michael 17/11/2021
    // comment diatas
    public function updateCutiIntranet($configintranet, $cuti_id, $cutitype_id,$hrd_comment,$user_id,$sendemail) {
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
            $table = $config['database'] . ".th_cuti";
            $user_id_and_note ="user id in ces :".$user_id;
            if (!empty($hrd_comment)) {
                
                // mysqli_query($mysqlcon, "UPDATE $table SET cutitype_id=$cutitype_id,hrd_comment='$hrd_comment',comment_date='$date',user_ubah='$user_id_and_note' WHERE cuti_id=$cuti_id and is_deleted=0 ");
                //added by michael 17/11/2021
                //comment diatas
                mysqli_query($mysqlcon, "UPDATE $table SET cutitype_id=$cutitype_id,hrd_comment='$hrd_comment',comment_date='$date',user_ubah='$user_id_and_note', send_email = '$sendemail' WHERE cuti_id=$cuti_id and is_deleted=0 ");
                //end added by michael 17/11/2021
            } else {
                mysqli_query($mysqlcon, "UPDATE $table SET cutitype_id=$cutitype_id,user_ubah='$user_id_and_note'  WHERE cuti_id=$cuti_id and is_deleted=0 ");
            }
            mysqli_close($mysqlcon);
        }
    }

    public function getAbsenttype($absenttype) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_absenttype_read', 1, 1, $absenttype, '');
        return $hasil[1][0];
    }

    //updated by anas 25102023 | add param enddate dan hasil bisa null
    public function getAbsentdetail_byempstartdate($employee_id, $startdate, $enddate) {
        // $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_absentdetail_byempstartdate_read', $employee_id, $startdate, $enddate);
        return $hasil;
    }

    public function getEmployee($employee_id_ces) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_employee_read_byid', $employee_id_ces);
        return $hasil[0][0];
    }

    public function getLeaveentitlementsEmployee($employee_id_ces, $year) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_leaveentitlement_employee', $employee_id_ces, $year);
        return $hasil[0][0];
    }

    public function savetoCesdata($param) {
        $hasil = 0;
        if (count($param['leave_quota']) == 0) {
            $param["rest"] = "";
            $param["leaveentitlements_id"] = "";
        }
        $hasil = $this->dbTable->SPUpdate('sp_leave_create', $param['addby'], $param['start_date'], $param['end_date'], $param['absenttype_id'], $param['employee_id'], $param['project_id'], $param['pt_id'], $param['note'], $param['dates'], $param['duration'], $param['halfday'], $param['leaveentitlements_id'], $param['rest'], $param['leave_quota']
        );
        return $hasil;
    }

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        
    }

    public function save(Hrd_Models_Leave_Leave $d, $dates, $hasilJatahCuti, $jatahCutiKaryawan) {
        $hasil = 0;
        if (count($hasilJatahCuti) == 0) {
            $hasilJatahCuti["rest"] = "";
            $hasilJatahCuti["leaveentitlements_id"] = "";
        }
        // $d->getIsHalfDay() nilainya 1 atau 0 , kalau 0.5 maka 1, kalau gak maka 0
        //leaveentitlements_id 
        // ["rest"] -> rest_awal-> 12
        // -> rest_akhir = rest_awal - durasi
        //$jatahCutiKaryawan -> select  leave_quota dari m_employee
        // leave_quota_akhir = leave_quota - durasi
        //$dates = range tanggal, misal pengajuannya 3 hari maka sebanyak tanggal itu 2017-01-01~2017-01-02~2017-01-03 

        $hasil = $this->dbTable->SPUpdate('sp_leave_create', $d->getAddBy(), $startDate, $d->getEndDate(), $d->getAbsentType()->getId(), $d->getEmployee()->getId(), $d->getProject()->getId(), $d->getPt()->getId(), $d->getNote(), $dates, $d->getDuration(), $d->getIsHalfDay(), $hasilJatahCuti["leaveentitlements_id"], $hasilJatahCuti["rest"], $jatahCutiKaryawan);

        if ($hasil = 1) {
            /// update ke intranet
        }

        /*
          $hasil = $this->dbTable->SPUpdate('sp_leave_create',$d->getAddBy(),
          $d->getStartDate(),$d->getEndDate(),$d->getAbsentType()->getId(),
          $d->getEmployee()->getId(),$d->getProject()->getId(),$d->getPt()->getId(),
          $d->getNote(),$dates,$d->getDuration(),$d->getIsHalfDay(),
          $hasilJatahCuti["leaveentitlements_id"],
          $hasilJatahCuti["rest"],
          $jatahCutiKaryawan);
         */


        return $hasil;
    }

    /* start added 27-04-2017 */

    public function getLeavetypeinIntranet($configintranet, $jeniscutiintranet) {
        $obj = new Hrd_Models_Intranet_Configmysql();
        $config = $obj->getConfigdata($configintranet);
        $mysqlcon = new mysqli(
                $config['host'], $config['user'], $config['password'], $config['database'], $config['port']
        );
        if ($mysqlcon->connect_error) {
            die("Connection failed: " . $mysqlcon->conneact_error);
            return null;
        } else {
            $mysqlquery = mysqli_query($mysqlcon, "SELECT * FROM m_cutitype WHERE cutitype='$jeniscutiintranet' and is_deleted=0 ");
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

    public function getAbsenttypebyid($absenttype_id) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_absenttypebyid_read', $absenttype_id);
        return $hasil[0][0];
    }

    public function changeCuticestointranet($configintranet, $absenttype_id) {
        $rowabsenttype = $this->getAbsenttypebyid($absenttype_id);
        $jeniscuti = $rowabsenttype['absenttype'];
        if ($jeniscuti == 'CUTI TAHUNAN') {
            $jeniscutiintranet = "Cuti Tahunan";
        } else if ($jeniscuti == 'CUTI INSIDENTIL') {
            $jeniscutiintranet = "Cuti Insidentil";
        } else if ($jeniscuti == 'CUTI BESAR 5 TAHUNAN') {
            $jeniscutiintranet = "CUTI BESAR";
        }
        //added by anas 06122021
        else
        {
            $jeniscutiintranet = $jeniscuti;
        }
        
        $rowjeniscutiintranet = $this->getLeavetypeinIntranet($configintranet, $jeniscutiintranet);
        return $rowjeniscutiintranet[0];
    }

    function Sendemail($configintranet, $data) {
        $obj = new Hrd_Models_Intranet_Cuti();
        $project_id = $obj->getProject_id_ces();
        $pt_id = $obj->getPt_id_ces();        
        $user_id = $obj->getUserlogin();  
        
        $rowjeniscutiintranet = $this->changeCuticestointranet($configintranet,$data['absenttype_id']);
        $cuti_id=$data['cuti_id'];
        $hrd_comment=$data['hrd_comment'];
        $cutitype_id = intval($rowjeniscutiintranet['cutitype_id']);
        $cutitype = $rowjeniscutiintranet['cutitype'];          
        
        // $this->updateCutiIntranet($configintranet, $cuti_id, $cutitype_id, $hrd_comment,$user_id);

        //added by michael 17/11/2021
        //comment yg diatas
        $this->updateCutiIntranet($configintranet, $cuti_id, $cutitype_id, $hrd_comment,$user_id,$data['sendmail']);
        //end added by michael 17/11/2021

        $resulth = $this->getAll($project_id, $pt_id, 'getbyid', $configintranet, $data);
        if (!empty($resulth[1])) {
            $rowh = $resulth[1][0];
            $statuskirimemail = $data['sendmail'];
            //flag email walau cuti tipe berubah dan commenta di isi, apabila 
            //flag send emailnya tidak tercentang maka tidak terkirim emailnya.
            if ($statuskirimemail == 1) {
                $message = '<html><body>';
 /*link ke logo intranet */    $message .= '<img src="https://intranet.ciputragroup.com/production/intranet/library/timthumb/timthumb.php?
src=https://intranet.ciputragroup.com/production/attachment/thumbnail/ciputra_logo.jpg&h=62&w=62&zc=1" alt="Intranet Request System" />';
                $message .= '<p>Dear Bapak / Ibu,</p>';
                $message .= "<p>Permohonan cuti yang dibuat oleh user dari INTRANET REQUEST SYSTEM berikut :</p>";
                $message .= "<p>Nama	: <strong>" . strtoupper($rowh['NAME']) . "</strong><br>";
                $message .= "Tgl Masuk	: <strong>" . date('d F Y', strtotime($rowh['hire_date'])) . "</strong><br>";
                $message .= "Departemen	: <strong>" . $rowh['department'] . "</strong><br>";
                $message .= "Jabatan	: <strong>" . $rowh['position_description'] . "</strong><br>";
                $message .= "Jenis Cuti	: <strong>" . $rowh['cutitype'] . "</strong><br>";
                $message .= "Lama Cuti	: <strong>" . $rowh['total'] . "</strong><br>";
                $message .= "Sisa Cuti	: <strong>" . $rowh['sisa_cuti'] . "</strong><br>";
                $message .= "Hari/Tanggal Cuti :</p>";
                $message .= '<table width="500" border="1" cellpadding="0" cellspacing="0">';
                $message .= '<tr align="center">';
                $message .= '<td><strong>Tgl Awal Cuti</strong></td>';
                $message .= '<td><strong>Tgl Akhir Cuti</strong></td>';
                $message .= '<td><strong>Jumlah Hari</strong></td>';
                $message .= '</tr>';
                $resutlcutidetail = $this->getCutidetail($cuti_id, $configintranet);
                if (!empty($resutlcutidetail[1])) {
                    foreach ($resutlcutidetail[1] as $rowd) {
                        $message .= '<tr>';
                        $message .= '<td>' . date('d-M-Y', strtotime($rowd['start_date'])) . '</td>';
                        $message .= '<td>' . date('d-M-Y', strtotime($rowd['end_date'])) . '</td>';
                        $message .= '<td>' . $rowd['total'] . '</td>';
                        $message .= '</tr>';
                    }
                } else {
                    $message .= '<tr>';
                    $message .= '<td>' . '' . '</td>';
                    $message .= '<td>' . '' . '</td>';
                    $message .= '<td>' . '' . '</td>';
                    $message .= '</tr>';
                }
                $message .= '</table>';
                $message .= "<p>Keperluan	:<br>";
                $message .= "<strong>" . $rowh['description'] . "</strong></p>";
                $message .= "<p>&nbsp;</p>";
                $message .= "<p>Telah dilakukan pengecekan oleh bagian HRD, <br>";
                $message .= "Keterangan HRD	:<br>";
                $message .= "<strong>" . nl2br($rowh['hrd_comment']) . "</strong></p>";
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
                //$sender = 'ces@ciputra.co.id';
                $to = $email_user;
                //$to = 'ahmad.cipdev@gmail.com';
                $cc_maker =$cc_email;
                //$cc_maker =array('ahmadriadi.ti@gmail.ocm','info.riadii@gmail.com');
                $mail = $obj->get_mail();

                $sender = $mail->emailuser;

                //added by michael 18/11/2021
                $sender = 'no.reply@ciputra.com';
                //end added by michael 18/11/2021
                
                $mail->setData()->setFrom($sender);
                $mail->setData()->setBodyHtml($message);
                $mail->setData()->addTo($to, strtoupper($rowh['NAME']));
                $mail->setData()->addCc($cc_maker, strtoupper($rowh['NAME']));
                $mail->setData()->setSubject('[Permohonan Cuti - HRD Comment] No. Permohonan Cuti #' . $cuti_id . ' [' . $cutitype . ']');
                if ($mail->setData()->send()) {
                    //echo 'success';
                } else {
                    //echo 'failed';
                }
            }
        }
    }

    /* end added 27-04-2017 */
}

?>
