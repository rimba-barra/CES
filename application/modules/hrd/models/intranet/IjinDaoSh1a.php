<?php

/**
 * Description of IjinDao
 *
 * @author MIS
 */
class Hrd_Models_Intranet_IjinDaoSh1a extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {

    public function sqlQuery($condition, $configintranet) {
        //IF((c.izintype = 'keluar_kantor'),a.end_time,'') AS end_time,
        $obj = new Hrd_Models_Intranet_Configmysql();
        $config = $obj->getConfigdata($configintranet);

        $user = $config['database_sec'] . '.sec_user';
        $employee = $config['database_master'] . '.m_employee';
        $department = $config['database_master'] . '.m_department';
        $datah = $config['database'] . '.th_izin';
        $dataapprove = $config['database'] . '.td_izinapproval';
        $datatype = $config['database'] . '.m_izintype';
        $sql = "
                    SELECT
                        a.project_id AS project_id_ces,
                        a.pt_id AS pt_id_ces,
                        a.employee_id AS employee_id_ces,
                        h.user_id_ces,
                        a.izin_id,
                        a.project_id, 
                        a.pt_id, 
                        a.employee_id AS employee_id_user_intranet, 
                        a.email_cc_employee_id AS employee_id_cc_intranet, 
                        d.NIK, 
                        d.NAME, 
                        a.department_id, 
                        CONCAT(f.code,'-',f.description) AS department, 
                        a.izintype_id,
                        c.izintype, 
                        c.is_until, 
                        c.description AS izintype_description,
                        a.izin_date,
                        a.start_time,
                        a.end_time,                       
                        a.description,
                        a.hrd_comment,
                        a.hrd_check,
                        a.comment_date,
                        a.is_deleted,
                        a.user_tambah,
                        a.tgl_tambah, 
                        (
                            SELECT 
                                  GROUP_CONCAT(xemployee.employee_id) 
                            FROM td_izinapproval xdata 
			    LEFT JOIN dbmaster.m_employee xemployee ON xdata.employee_id =xemployee.employee_id
                            WHERE
				xdata.izin_id=a.izin_id 
                                AND xdata.is_deleted=0
			    GROUP BY xdata.izin_id
			) AS reportto_id 
                    FROM $datah a
                    LEFT JOIN $datatype c ON a.izintype_id = c.izintype_id
                    LEFT JOIN $employee d ON a.employee_id = d.employee_id
                    LEFT JOIN $employee e ON b.employee_id = e.employee_id
                    LEFT JOIN $department f ON a.department_id = f.department_id
                    LEFT JOIN $user h ON  h.id = d.SEC_USER_ID                     
                    ";
        //echo $sql;
        return $sql;
    }

    public function SqlCondition($project_id, $pt_id, $condition, $param) {
        $where = " WHERE ";
        $where .= " a.project_id = $project_id";
        $where .= " AND a.pt_id = $pt_id";
        $where .= " AND a.is_deleted = 0";
        if ($condition == 'default') {
            $where .= " AND a.status = 'APPROVE'";
            return $where;
        } else if ($condition == 'getbyid') {
            $ijin_id = $param['izin_id'];
            $where = " WHERE ";
            $where .= "     a.is_deleted = 0";
            $where .= " AND a.izin_id = $ijin_id";
            return $where;
        } else {
            $filter = json_decode($param);
            $where .= " AND a.hrd_check = '$filter->hrd_checked'";
            if (!empty($filter->izin_id)) {
                $where .= " AND a.izin_id = $filter->izin_id";
            }
            if (!empty($filter->approvefrom)) {
                $where .= "  AND STR_TO_DATE(a.izin_date,'%Y-%m-%d') BETWEEN '$filter->approvefrom' AND '$filter->approveuntil' ";
            }
            if (!empty($filter->comment)) {
                $where .= " AND a.comment like '%$filter->comment%'";
            }           
            $ijintype = $this->changeIjincestointranet($filter->ijin);
            if (!empty($ijintype)) {
                $where .= " AND c.izintype like '%$ijintype%'";
            }
            return $where;
        }
    }

    public function getAll($project_id, $pt_id, $condition, $configintranet, $limit, $start, $param) {
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

            //echo $field . ' ' . $where;

            $mysqlquery = mysqli_query($mysqlcon, $field . ' ' . $where);
            $mysqlcount = mysqli_num_rows($mysqlquery);
            
            // edit by wulan sari 20181215
            $mysqlquery = mysqli_query($mysqlcon, $field . ' ' . $where . ' LIMIT '.$limit.' OFFSET '.$start);          
            // end by wulan sari 20181215
            
            $mydata = array();
            while ($myrow = $mysqlquery->fetch_array(MYSQLI_ASSOC)) {
                $rowemployee = $this->getEmployee($myrow['employee_id_ces']);
                $rowemployeeapprove = $this->getEmployee($myrow['employee_id_hod_intranet']);
                $myrow['NIK'] = $rowemployee['employee_nik'];
                $myrow['NAME'] = $rowemployee['employee_name'];                
                $myrow['approve_by'] = $rowemployeeapprove['employee_name'];                
                $myrow['department'] = $rowemployee['department_code'].'-'.$rowemployee['department_department'];
                $ijinceskode = $this->changeIjinintranettoces($myrow['izintype']);
                $rowabsentdetail = $this->getAbsentdetail_byempstartdate($myrow['employee_id_ces'], date('Y-m-d', strtotime($myrow['izin_date'])));
                $rowabsenttype = $this->getAbsenttype($ijinceskode);
                if (isset($rowabsentdetail['absentdetail_id'])) {
                    $myrow['absentdetail_id'] = $rowabsentdetail['absentdetail_id'];
                } else {
                    $myrow['absentdetail_id'] = 0;
                }
                $myrow['configintranet'] = $configintranet;
                $myrow['absenttype_id'] = $rowabsenttype['absenttype_id'];
                $myrow['absenttypegroup_id'] = $rowabsenttype['absenttypegroup_id'];
                $myrow['absenttype_code'] = $rowabsenttype['code'];
                $myrow['department_id'] = $rowemployee['department_id'];
                $myrow['hire_date'] = $rowemployee['hire_date'];
                $myrow['position_id'] = $rowemployee['position_id'];
                $myrow['position'] = $rowemployee['position_position'];
                $myrow['position_description'] = $rowemployee['position_description'];
                $myrow['employee_employee_id'] = $myrow['employee_id_ces'];
                $myrow['absenttype_absenttype_id'] = $rowabsenttype['absenttype_id'];
                $myrow['start_date'] = $myrow['izin_date'];
                $myrow['end_date'] = $myrow['izin_date'];
                $myrow['is_halfday'] = 0;
                $myrow['note'] = $myrow['description'] . " pada " . date("d-m-Y", strtotime($myrow['izin_date'])) . " dari " . $myrow['start_time'] . " sampai " . $myrow['end_time'];
                $myrow['absenttypegroup_absenttypegroup_id'] = $rowabsenttype['absenttypegroup_id'];
                $mydata[] = $myrow;
            }
            $return = array(array(array("totalRow" => $mysqlcount)), $mydata);
            return $return;
            mysqli_free_result($mysqlquery);
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
            $sql ="
                     SELECT b.* FROM $employee a 
                                        LEFT JOIN $p_ldap b ON a.SEC_USER_ID = b.sec_user_id
                                        WHERE  
                                          a.employee_id =$employee_id
                                          AND a.is_active=1
                                          AND b.isblocked IN ('FALSE')
                     ";                     
            $mysqlquery = mysqli_query($mysqlcon,$sql);
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
            $table = $config['database'] . ".th_izin";

            if (!empty($hrd_comment)) {
                mysqli_query($mysqlcon, "UPDATE $table SET hrd_check='$hrd_check',hrd_comment='$hrd_comment',comment_date='$date' WHERE izin_id=$id and is_deleted=0 ");
            } else {
                mysqli_query($mysqlcon, "UPDATE $table SET hrd_check='$hrd_check' WHERE izin_id=$id and is_deleted=0 ");
            }
            mysqli_close($mysqlcon);
        }
    }

    // public function updateIjinIntranet($configintranet, $id, $hrd_comment, $user_id_and_note) {
    // added by michael 17/11/2021
    // comment diatas
    public function updateIjinIntranet($configintranet, $id, $hrd_comment, $user_id_and_note, $sendemail) {
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
            $table = $config['database'] . ".th_izin";

            if (!empty($hrd_comment)) {
                // mysqli_query($mysqlcon, "UPDATE $table SET hrd_comment='$hrd_comment',comment_date='$date',user_ubah='$user_id_and_note' WHERE izin_id=$id and is_deleted=0 ");
                //added by michael 17/11/2021
                //comment diatas
                mysqli_query($mysqlcon, "UPDATE $table SET hrd_comment='$hrd_comment',comment_date='$date',user_ubah='$user_id_and_note', send_email = '$sendemail' WHERE izin_id=$id and is_deleted=0 ");
                //end added by michael 17/11/2021
            } else {
                mysqli_query($mysqlcon, "UPDATE $table SET user_ubah='$user_id_and_note' WHERE izin_id=$id and is_deleted=0 ");
            }
            mysqli_close($mysqlcon);
        }
    }

    public function changeIjinintranettoces($ijintypeintranet) {
        if ($ijintypeintranet == 'datang_terlambat') {
            $kodeijinces = "I-ML"; //IZIN MASUK LAMBAT
        } else if ($ijintypeintranet == 'pulang_awal') {
            $kodeijinces = "I-PA/S"; //IZIN PULANG AWAL/SAKIT
        } else if ($ijintypeintranet == 'keluar_kantor') {
            //$kodeijinces = "I-TM"; //alasan tidak masuk telah dikonfirmasi pak tommy 13042017
	    $kodeijinces = "I-KL"; //TELAH DI REVISI parameter ini untuk izin keluar kantor tanpa potong cuti	
        } else if ($ijintypeintranet == 'lupa_absen_datang') {
            //$kodeijinces = "I-TM"; //alasan tidak masuk telah dikonfirmasi pak tommy 13042017
            $kodeijinces = "I-LAM"; //di revisi konfirmasi devina 08022018
        } else if ($ijintypeintranet == 'lupa_absen_pulang') {
            //$kodeijinces = "I-TM"; //alasan tidak masuk telah dikonfirmasi pak tommy 13042017
            $kodeijinces = "I-LAP"; //di revisi konfirmasi devina 08022018
        }
        return $kodeijinces;
    }

    public function changeIjincestointranet($ijintypeces) {
        if ($ijintypeces == 'IZIN MASUK LAMBAT') {
            $ijintype = "datang_terlambat"; //IZIN PULANG AWAL/SAKIT
        } else if ($ijintypeces == 'IZIN PULANG AWAL/SAKIT') {
            $ijintype = "pulang_awal";
        }else if ($ijintypeces == 'IZIN KELUAR KANTOR') {
            $ijintype = "keluar_kantor";
        } else {
            $ijintype = null;
        }
        return $ijintype;
    }

    public function getAbsenttype($ijintype) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_absenttype_read', 1, 1, '', $ijintype);
        return $hasil[1][0];
    }

    public function getEmployee($employee_id_ces) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_employee_read_byid', $employee_id_ces);
        return $hasil[0][0];
    }

    public function getAbsentdetail_byempstartdate($employee_id, $startdate) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_absentdetail_byempstartdate_read', $employee_id, $startdate);
        if (!empty($hasil[0])) {
            return $hasil[0][0];
        } else {
            return array(array("absentdetail_id" => 0));
        }
    }

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        
    }

    function Sendemail($configintranet, $data) {
        $obj = new Hrd_Models_Intranet_Ijin();
        $project_id = $obj->getProject_id_ces();
        $pt_id = $obj->getPt_id_ces();
        $user_id = $obj->getUserlogin();
        $id = $data['izin_id'];
        $hrd_comment = $data['hrd_comment'];

        // $this->updateIjinIntranet($configintranet, $id, $hrd_comment, $user_id);

        //added by michael 17/11/2021
        //comment yg diatas
        $this->updateIjinIntranet($configintranet, $id, $hrd_comment, $user_id, $data['sendmail']);
        //end added by michael 17/11/2021

        $result = $this->getAll($project_id, $pt_id, 'getbyid', $configintranet, $data);
        if (!empty($result[1])) {
            $row = $result[1][0];
            $statuskirimemail = $data['sendmail'];
            $hari_ijin = new DateTime($data['izin_date']);
            $hari = $hari_ijin->format('l');
            if ($hari == "Sunday")
                $hari = "Minggu";
            if ($hari == "Monday")
                $hari = "Senin";
            if ($hari == "Tuesday")
                $hari = "Selasa";
            if ($hari == "Wednesday")
                $hari = "Rabu";
            if ($hari == "Thursday")
                $hari = "Kamis";
            if ($hari == "Friday")
                $hari = "Jumat";
            if ($hari == "Saturday")
                $hari = "Sabtu";

            $tanggal = $hari_ijin->format('d F Y');
            $time_start = new DateTime($data['start_time']);
            $time_start = $time_start->format('H:i');
            if ($row['is_until'] == "1") {
                $time_end = new DateTime($data['end_time']);
                $time_end = $time_end->format('H:i');
            } else {
                $time_end = "";
            }

            if ($statuskirimemail == 1) {
                $message = '<html><body>';
                /* link ke logo intranet */ $message .= '<img src="https://intranet.ciputragroup.com/production/intranet/library/timthumb/timthumb.php?
src=https://intranet.ciputragroup.com/production/attachment/thumbnail/ciputra_logo.jpg&h=62&w=62&zc=1" alt="Intranet Request System" />';
                $message .= '<p>Dear Bapak / Ibu,</p>';
                $message .= "<p>Permohonan ijin yang dibuat oleh user dari INTRANET REQUEST SYSTEM berikut :</p>";
                $message .= "Nama	: <strong>" . strtoupper($row['NAME']) . "</strong><br>";
                $message .= "Tgl Masuk	: <strong>" . date('d F Y', strtotime($data['hire_date'])) . "</strong><br>";
                $message .= "Departemen	: <strong>" . $row['department'] . "</strong><br>";
                $message .= "Jabatan	: <strong>" . $row['position_description'] . "</strong><br>";
                $message .= "Jenis Ijin	: <strong>" . $row['izintype'] . "</strong><br>";
                if ($time_end != "") {
                    $message .= "Pukul  : <strong>" . $time_start . " s/d " . $time_end . "</strong><br>";
                } else {
                    $message .= "Pukul			: <strong>" . $time_start . "</strong><br>";
                }
                $message .= "Hari/Tanggal	: <strong>" . $hari . "/" . $tanggal . "</strong><br>";
                $message .= "Keperluan	:<br>";
                $message .= "<strong>" . $row['description'] . "</strong></p>";
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
                //$sender = 'ces@ciputra.co.id';
                $to = $email_user;
                //$to = 'ahmad.cipdev@gmail.com';
                $cc_maker =$cc_email;
                //$cc_maker =array('ahmadriadi.ti@gmail.ocm','info.riadii@gmail.com');
                $mail = $obj->get_mail();

                // $sender = $mail->emailuser;
                
                //added by michael 18/11/2021
                $sender = 'no.reply@ciputra.com';
                //end added by michael 18/11/2021

                $mail->setData()->setFrom($sender);
                $mail->setData()->setBodyHtml($message);
                $mail->setData()->addTo($to, strtoupper($row['NAME']));
                $mail->setData()->addCc($cc_maker, strtoupper($row['NAME']));
                $mail->setData()->setSubject('[Permohonan Ijin - HRD Comment] No. Permohonan Ijin  #' . $id . ' Tanggal ' . $tanggal);
                if ($mail->setData()->send()) {
                    //echo 'success';
                } else {
                    //echo 'failed';
                }
                
            }
        }
    }

}

?>
