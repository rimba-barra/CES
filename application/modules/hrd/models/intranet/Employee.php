<?php

/**
 * Description of Employee Intranet
 *
 * @author MIS - AHMAD RIADI
 * 
 */
class Hrd_Models_Intranet_Employee {
    //Daftar Config
    public $function;
    public $dbmysql;
    public $model_employee;
    public $employeee_data = null;
    public $errorMsg;
    public $user_id_ces = 0;
    public $user_id_intranet = 0;

    function __construct() {
        $this->function = new Hrd_Models_General_Setup;
        $this->model_employee = new Hrd_Models_Master_EmployeeDao;
        $this->dbmysql = new Hrd_Models_Intranet_Dbmysql;
    }

    public function Authorizeuser($employee_id) {
        $this->getEmployeedatainces($employee_id);	
	 //cek data employee di ces
        if (!empty($this->employeee_data)) {
            $this->dbmysql->getConfigdbintrabet($this->employeee_data['project_id']); //cek config intranet di project data employee
            if (!empty($this->dbmysql->configdbintranet)) {               
                
                $this->dbmysql->getmysqlConfig($this->dbmysql->configdbintranet); // dapatkan data config intranet di file config
                $result_ldap = $this->dbmysql->getdatain_p_sec_user_ldap_byemail($this->employeee_data['email_ciputra']);
                $result_sec_user = $this->dbmysql->getdatain_sec_user_byemployee_idces($this->employeee_data['employee_id']);
                /* jika data karyawan baru, maka cek email di  p_sec_user_ldap, jika belum ada maka buat baru
                 * namun jika sudah ada email_ciputra dan employee_id_ces sudah ada maka update                                   * 
                 */
                
                $data = json_decode($_POST["data"], TRUE);
                if(isset($data['email_ciputra'])){
                    $this->employeee_data['email_ciputra'] = $data['email_ciputra'];
                }
                $this->data_sec_user_sqlsrv();
                $this->data_sec_user_mysql($result_ldap, $result_sec_user);
                $this->data_ldap_mysql($result_ldap, $result_sec_user);
                $this->data_sec_user_group($result_ldap, $result_sec_user);
                $this->data_m_employee($result_ldap, $result_sec_user);

                //added by michael 2022-08-10 untuk keperluan Intranet Ciputra Artpreneur, agar bisa connect, perlu tambahkan di db mereka jg
                if($this->employeee_data['project_id'] == 4038 && $this->employeee_data['pt_id'] == 20){
                    $this->data_intranet_art($this->employeee_data);
                }
                //end added by muichael 2022-08-10
            }

          //create user from master projectpt
            $this->generateuser_from_projectpt($this->employeee_data['project_id'],$this->employeee_data['pt_id']);


        }
    }
    
    public function intranet_belum_diproses($employee_id) {
        $this->getEmployeedatainces($employee_id);	
	//cek data employee di ces
        //edited by michael 11/04/2022
        // $ret = '';
        $ret = null;
        if (!empty($this->employeee_data)) {
            $this->dbmysql->getConfigdbintrabet($this->employeee_data['project_id']); //cek config intranet di project data employee
            if (!empty($this->dbmysql->configdbintranet)) {    
                $this->dbmysql->getmysqlConfig($this->dbmysql->configdbintranet); 
                $th_izin = $this->dbmysql->getdatawithparam($this->dbmysql->tbl_th_izin, array('employee_id' => $employee_id, 'status' => 'APPROVE', 'hrd_check' => 'NO', 'is_deleted' => '0'));
                $th_cuti = $this->dbmysql->getdatawithparam($this->dbmysql->tbl_th_cuti, array('employee_id' => $employee_id, 'status' => 'APPROVE', 'hrd_check' => 'NO', 'is_deleted' => '0'));
                $th_tugas = $this->dbmysql->getdatawithparam($this->dbmysql->tbl_th_tugas, array('employee_id' => $employee_id, 'status' => 'APPROVE', 'hrd_check' => 'NO', 'is_deleted' => '0'));
                $th_lembur = $this->dbmysql->getdatawithparam($this->dbmysql->tbl_th_lembur, array('employee_id' => $employee_id, 'status' => 'CLOSED', 'hrd_check' => 'NO', 'is_deleted' => '0'));

                //added by michael 2023-07-21 | tambahin kondisi kalo belom diproses, tidak bisa di mutasi,dsb
                $th_sakit = $this->dbmysql->getdatawithparam($this->dbmysql->tbl_th_sakit, array('employee_id' => $employee_id, 'status' => 'APPROVE', 'hrd_check' => 'NO', 'is_deleted' => '0'));

                if(count($th_sakit) > 0){
                    $ret = $ret.'<br>'.count($th_sakit).' transaksi sakit intranet belum di proses';
                } 

                $params = array();
                $params['project_id'] = $this->employeee_data['project_id'];
                $params['pt_id'] = $this->employeee_data['pt_id'];
                $params['employee_id'] = $employee_id;

                $th_tukarshift_totaldata = 0;
                $result_tukarshift = $this->model_employee->cektukarshift($params);
                if(array_key_exists(0, $result_tukarshift[0])) {
                    $temp_tukarshift = $result_tukarshift[0];
                    end($temp_tukarshift);
                    $lastkey_tukarshift = key($temp_tukarshift) + 1;
                    $ret = $ret.'<br>'.$lastkey_tukarshift.' transaksi tukarshift intranet belum di proses';
                }

                $th_klaimpengobatan_totaldata = 0;
                $result_klaimpengobatan = $this->model_employee->cekklaimpengobatan($params);
                if(array_key_exists(0, $result_klaimpengobatan[0])) {
                    $temp_klaimpengobatan = $result_klaimpengobatan[0];
                    end($temp_klaimpengobatan);
                    $lastkey_klaimpengobatan = key($temp_klaimpengobatan) + 1;
                    $ret = $ret.'<br>'.$lastkey_klaimpengobatan.' transaksi klaim intranet belum di proses';
                }
                //end added by michael 2023-07-21
                
                if(count($th_izin) > 0){
                    $ret = $ret.'<br>'.count($th_izin).' transaksi izin intranet belum di proses';
                }
                
                if(count($th_cuti) > 0){
                    $ret = $ret.'<br>'.count($th_cuti).' transaksi cuti intranet belum di proses';
                }
                
                if(count($th_tugas) > 0){
                    $ret = $ret.'<br>'.count($th_tugas).' transaksi tugas luar kantor intranet belum di proses';
                }
                
                if(count($th_lembur) > 0){
                    $ret = $ret.'<br>'.count($th_lembur).' transaksi tugas lembur intranet belum di proses';
                }                
            }
        }       
        //edited by michael 11/04/2022
        // $result = '';
        $result = null;
        if ($ret != ''){
            $result[1][0]['RECORD_TOTAL'] = 0;
            $result[2][0]['MSG'] = $ret;
            $result[0][0]['VALIDDATA'] = 0;
        }
        return $result;
    }
    
    
    // start edited by Wulan Sari 2018.10.10
    // saat employee di nonaktifkan, master employee di intranet juga di nonaktifkan
    public function activenonactive_employee_intranet($employee_id, $is_active) {
        $this->getEmployeedatainces($employee_id);	
        if (!empty($this->employeee_data)) {
            $this->dbmysql->getConfigdbintrabet($this->employeee_data['project_id']); //cek config intranet di project data employee
            if (!empty($this->dbmysql->configdbintranet)) {                
                $this->dbmysql->getmysqlConfig($this->dbmysql->configdbintranet); // dapatkan data config intranet di file config
                $result_sec_user = $this->dbmysql->getdatain_sec_user_byemployee_idces($this->employeee_data['employee_id']);
                $id_intranet = $result_sec_user['id'];                
                $record_user_ubah = array(
                    "is_active" => $is_active
                );                
                $this->dbmysql->updatedata($this->dbmysql->tbl_m_employee, $record_user_ubah, array("sec_user_id" => $id_intranet)); 
                
            }
        }
    }
    // end edited by Wulan Sari 2018.10.10


   /* dibuat oleh ahmad riadi 09-10-2017, kebutuhan intranet lintas config */

   public function generateuser_from_projectpt($project_id, $pt_id) {
        $dataprojectpt = $this->dbmysql->getdata_projectpt($project_id, $pt_id);
        if (!empty($dataprojectpt)) {
            if (!empty($dataprojectpt['dbintranet_name'])) {
                $this->dbmysql->getmysqlConfig($dataprojectpt['dbintranet_name']); // dapatkan data config intranet di file config
                $result_ldap = $this->dbmysql->getdatain_p_sec_user_ldap_byemail($this->employeee_data['email_ciputra']);
                $result_sec_user = $this->dbmysql->getdatain_sec_user_byemployee_idces($this->employeee_data['employee_id']);
                /* jika data karyawan baru, maka cek email di  p_sec_user_ldap, jika belum ada maka buat baru
                 * namun jika sudah ada email_ciputra dan employee_id_ces sudah ada maka update                                   * 
                 */
                $data = json_decode($_POST["data"], TRUE);
                $this->employeee_data['email_ciputra'] = $data['email_ciputra'];
                $this->data_sec_user_sqlsrv();
                $this->data_sec_user_mysql($result_ldap, $result_sec_user);
                $this->data_ldap_mysql($result_ldap, $result_sec_user);
                $this->data_sec_user_group($result_ldap, $result_sec_user);
                $this->data_m_employee($result_ldap, $result_sec_user);
            }
        }
    }




    public function data_m_employee($data_ldap = null, $data_sec_user = null) {
        $counter_1 = count($data_ldap);
        $counter_2 = count($data_sec_user);
        $checkexist = intval($counter_1) + intval($counter_2);

        $result_sec_user = $this->dbmysql->getdatain_sec_user_by_id($this->user_id_intranet);
        if ($result_sec_user) {
            $result_ldap = $this->dbmysql->getdatawithparam($this->dbmysql->tbl_p_sec_user_ldap, array('sec_user_id' => $this->user_id_intranet));
            $result_project = $this->dbmysql->getdata_projectces($this->employeee_data['project_id']);
            $result_pt = $this->dbmysql->getdata_ptces($this->employeee_data['pt_id']);

            $religion = null;
            $blood = null;
            $education = null;
            $divcode = null;
            $deptcode = null;
            $jabatan = null;
            $ldap_id = $result_ldap[0]['ldap_id'];

            if ($this->employeee_data['religion_id'] > 0 && !empty($this->employeee_data['religion_id'])) {
                $result_religion = $this->dbmysql->getdata_religionces($this->employeee_data['religion_id']);
                $religion = $result_religion['religion'];
            }

            if ($this->employeee_data['bloodgroup_id'] > 0 && !empty($this->employeee_data['bloodgroup_id'])) {
                $result_blood = $this->dbmysql->getdata_bloodgroupces($this->employeee_data['bloodgroup_id']);
                $blood = $result_blood['bloodgroup'];
            }

            if ($this->employeee_data['last_education'] > 0 && !empty($this->employeee_data['last_education'])) {
                $result_edu = $this->dbmysql->getdata_educationces($this->employeee_data['last_education']);
                $education = $result_edu['education'];
            }

            if ($this->employeee_data['division_id'] > 0 && !empty($this->employeee_data['division_id'])) {
                $result_div = $this->dbmysql->getdata_divisionces($this->employeee_data['division_id']);
                $divcode = $result_div['code'];
            }

            if ($this->employeee_data['department_id'] > 0 && !empty($this->employeee_data['department_id'])) {
                $result_dept = $this->dbmysql->getdata_departmentces($this->employeee_data['department_id']);
                $deptcode = $result_dept['code'];
            }

            if ($this->employeee_data['position_id'] > 0 && !empty($this->employeee_data['position_id'])) {
                $result_position = $this->dbmysql->getdata_positionces($this->employeee_data['position_id']);
                $jabatan = $result_position['position'];
            }

            switch ($this->employeee_data['marriagestatus_id']) {
                case 1:
                    $status = 'SG';
                    break;
                case 2:
                    $status = 'M' . $this->employeee_data['child_count'];
                    break;
                case 3:
                    $status = 'D' . $this->employeee_data['child_count'];
                    break;
                default:
                    $status = null;
                    break;
            }

            $record = array(
                "IS_ACTIVE" => 1,
                "hcms_group_id" => 1,
                "project_id" => $this->employeee_data['project_id'],
                "pt_id" => $this->employeee_data['pt_id'],
                "PER_PROYEK" => $result_project['code'],
                "PER_PT" => $result_pt['code'],
                "SEC_USER_ID" => $this->user_id_intranet,
                "LDAP_ID" => $ldap_id,
                "NIK" => $this->employeee_data['employee_nik'],
                "NAME" => $this->function->clean_specialcaracter($this->employeee_data['employee_name']),
                "TEMPAT_LAHIR" => $this->employeee_data['birth_place'],
                "TGL_LAHIR" => $this->employeee_data['birth_date'],
                "SEX" => $this->employeee_data['sex'],
                "NO_KTP" => $this->employeee_data['ktp_number'],
                "ADDRESS1" => $this->function->clean_specialcaracter($this->employeee_data['address']),
                "AGAMA" => $religion,
                "GOL_DARAH" => $blood,
                "STATUS" => $status,
                "JUMLAH_ANAK" => $this->employeee_data['child_count'],
                "NO_TELP" => $this->employeee_data['phone_number'],
                "PENDIDIKAN_AKHIR" => $education,
                "PER_DIVISI" => $divcode,
                "PER_DEPARTEMEN" => $deptcode,
                "PER_JABATAN" => $jabatan,
                "TGL_MASUK" => $this->employeee_data['hire_date'],
                "EMAIL" => $this->employeee_data['email_ciputra'],
            );

            if ($checkexist == 0) {
                //jika datanya belum ada di ldap,dan sec user, maka buat user groupnya kebutuhan general
                $this->dbmysql->insertdata($this->dbmysql->tbl_m_employee, $record);
            } else {
                if ($counter_2 > 0) {
                    unset($record['IS_ACTIVE']);
                    unset($record['hcms_group_id']);
                    unset($record['SEC_USER_ID']);
                    unset($record['LDAP_ID']);
                    unset($record['IS_ACTIVE']);
                    $this->dbmysql->updatedata($this->dbmysql->tbl_m_employee,$record, array("SEC_USER_ID" => $this->user_id_intranet));
                }
            }
        }
    }

    public function data_sec_user_group($data_ldap = null, $data_sec_user = null) {
        $counter_1 = count($data_ldap);
        $counter_2 = count($data_sec_user);
        $checkexist = intval($counter_1) + intval($counter_2);
        $result_sec_user = $this->dbmysql->getdatain_sec_user_by_id($this->user_id_intranet);
        if ($result_sec_user) {
            $secProgramId = 12; //untuk Aplikasi Intranet
            $secGroupId = 36;  //untuk General User

            $record = array(
                "sec_user" => $this->user_id_intranet,
                "sec_program" => $secProgramId,
                "sec_group" => $secGroupId,
            );
            if ($checkexist == 0) {
                //jika datanya belum ada di ldap,dan sec user, maka buat user groupnya kebutuhan general
                $this->dbmysql->insertdata($this->dbmysql->tbl_sec_user_group, $record);
            }
        }
    }

    public function data_ldap_mysql($data_ldap = null, $data_sec_user = null) {
        $counter_1 = count($data_ldap);
        $counter_2 = count($data_sec_user);
        $checkexist = intval($counter_1) + intval($counter_2);
        $result_sec_user = $this->dbmysql->getdatain_sec_user_by_id($this->user_id_intranet);
        if ($result_sec_user) {
            $record = array(
                "sec_user_id" => $this->user_id_intranet,
                "ldap_id" => $result_sec_user['name'],
                "email" => $this->employeee_data['email_ciputra'],
            );

            if ($checkexist == 0) {
                //jika user ldap belum ada di ldap dan sec_user, maka buat datanya
                $this->dbmysql->insertdata($this->dbmysql->tbl_p_sec_user_ldap, $record);
            }else{
                //tambah fungsi update emailnya.
                    unset($record['sec_user_id']);
                    unset($record['ldap_id']);                  
                    $this->dbmysql->updatedata($this->dbmysql->tbl_p_sec_user_ldap,$record, array("sec_user_id" => $this->user_id_intranet));
            }
        }
    }

    public function data_sec_user_mysql_old($data_ldap = null, $data_sec_user = null) {
        $tmpname = explode(" ", $this->function->clean_specialcaracter($this->employeee_data['employee_name']));
        // $passworddefault = 'sungairaya';

        //update by michael 2022-12-12 | encrypt password
        $passworddefault = $this->encrypt_password_mysql('sungairaya');
        

        $record = array(
            "user_id_ces" => $this->user_id_ces,
            "project_id_ces" => $this->employeee_data['project_id'],
            "pt_id_ces" => $this->employeee_data['pt_id'],
            "employee_id_ces" => $this->employeee_data['employee_id'],
            "name" => $this->employeee_data['email_ciputra'],
            "First_Name" => $tmpname[0],
            "Full_Name" => $this->function->clean_specialcaracter($this->employeee_data['employee_name']),
            "password" => $passworddefault,
        );

        $counter_1 = count($data_ldap);
        $counter_2 = count($data_sec_user);
        $checkexist = intval($counter_1) + intval($counter_2);

        if ($checkexist == 0) {
            //jika user belum ada di ldap dan sec_user, maka buat datanya
            $this->dbmysql->insertdata($this->dbmysql->tbl_sec_user, $record);
            $result_sec_user = $this->dbmysql->getdatawithparam($this->dbmysql->tbl_sec_user, array('name' => $this->employeee_data['email_ciputra']));
            $row_sec_user = $result_sec_user[0];
            $this->user_id_intranet = $row_sec_user['id'];
        } else {
            if ($counter_2 > 0) {
                //jika ada datanya dengan employee_id_ces, maka update datanya
                if(empty($data_sec_user['name'])){ //jika usernya kosong, maka update fieldnamenya
                     $this->dbmysql->update_user_with_name_mysql($record);
                }else{
                     $this->dbmysql->update_user_mysql($record);
                }
                
                $this->user_id_intranet = $data_sec_user['id'];
            }
        }
    }

    public function data_sec_user_mysql($data_ldap = null, $data_sec_user = null) {
        $tmpname = explode(" ", $this->function->clean_specialcaracter($this->employeee_data['employee_name']));
        // $passworddefault = 'sungairaya';

        //update by michael 2022-12-12 | encrypt password
        $passworddefault = $this->encrypt_password_mysql('sungairaya');
               
         $record = array(
            "user_id_ces" => $this->user_id_ces,
            "project_id_ces" => $this->employeee_data['project_id'],
            "pt_id_ces" => $this->employeee_data['pt_id'],
            "employee_id_ces" => $this->employeee_data['employee_id'],
            "name" => $this->employeee_data['email_ciputra'],
            "First_Name" => $tmpname[0],
            "Full_Name" => $this->function->clean_specialcaracter($this->employeee_data['employee_name']),
            "password" => $passworddefault,
        );
         
        $temp = explode("@", $this->employeee_data['email_ciputra']);
        $usernamenonemail = $temp[0];
        $usernamebyemail = $this->employeee_data['email_ciputra'];
        
        $datasecusernonemail = $this->dbmysql->getdatawithparam($this->dbmysql->tbl_sec_user, array('name' => $usernamenonemail));
        $datasecuserbyemail = $this->dbmysql->getdatawithparam($this->dbmysql->tbl_sec_user, array('name' => $usernamebyemail));
        
        $checkusernonemail =0;
        if(!empty($datasecusernonemail[0])){
            $checkusernonemail=1;
        }
        
        $checkuserbyemail =0;
        if(!empty($datasecuserbyemail[0])){
            $checkuserbyemail=1;
        }
        
        $counter_1 = count($data_ldap);
        $counter_2 = count($data_sec_user);
        $checkexist = intval($counter_1) + intval($counter_2);
        
        
        $checkstatusdata = $checkusernonemail+$checkuserbyemail; 
        
        if ($checkstatusdata == 0 && $checkexist==0) {            
            //jika user belum ada di ldap dan sec_user, maka buat datanya
            $this->dbmysql->insertdata($this->dbmysql->tbl_sec_user, $record);
            $result_sec_user = $this->dbmysql->getdatawithparam($this->dbmysql->tbl_sec_user, array('name' => $this->employeee_data['email_ciputra']));
            $row_sec_user = $result_sec_user[0];
            $this->user_id_intranet = $row_sec_user['id'];
        } else { 
            
            if($checkusernonemail > 0 && $checkuserbyemail==0){                
               if($counter_2 ==0) {
                   $this->dbmysql->update_user_with_empid_mysql($record);
               }else{
                   if (empty($data_sec_user['name'])) { //jika usernya kosong, maka update fieldnamenya
                       $this->dbmysql->update_user_with_name_mysql($record);
                   } else {
                       $this->dbmysql->update_user_mysql($record);
                   }                    
               }                
               $this->user_id_intranet = $datasecusernonemail[0]['id'];
            }
            
            
            if ($checkusernonemail == 0 && $checkuserbyemail > 0) {
                if ($counter_2 == 0) {
                    $this->dbmysql->update_user_with_empid_mysql($record);
                } else {
                    if (empty($data_sec_user['name'])) { //jika usernya kosong, maka update fieldnamenya
                        $this->dbmysql->update_user_with_name_mysql($record);
                    } else {
                        $this->dbmysql->update_user_mysql($record);
                    }
                }
                $this->user_id_intranet = $datasecuserbyemail[0]['id'];
            }
            
            if($checkusernonemail > 0 && $checkuserbyemail > 0){                
                if($counter_2 ==0) {
                    $this->dbmysql->update_user_with_empid_mysql($record);
                }else{
                    if (empty($data_sec_user['name'])) { //jika usernya kosong, maka update fieldnamenya
                        $this->dbmysql->update_user_with_name_mysql($record);
                    } else {
                        $this->dbmysql->update_user_mysql($record);
                    }                    
                }                
                $this->user_id_intranet = $datasecusernonemail[0]['id'];
            }
            
            # start edit by  Wulan Sari 06.08.2018
            # Start jika email di hcms - personal berubah maka update user name dan email intranet       
            $sec_intranet = $this->dbmysql->getdatawithparam_sec_mysql($this->dbmysql->tbl_sec_user, array('employee_id_ces' => $this->employeee_data['employee_id']));            
            $name_intranet = $sec_intranet[0]['name'];
            $id_intranet = $sec_intranet[0]['id'];
                        
            if($name_intranet != $usernamebyemail && $name_intranet != $usernamenonemail){                
                $this->dbmysql->update_user_with_name_mysql($record);
                
                # Update username di transaksi                 
                $sec_intranet = $this->dbmysql->getdatawithparam($this->dbmysql->tbl_sec_user, array('employee_id_ces' => $this->employeee_data['employee_id']));            
                $this->user_id_intranet = $sec_intranet[0]['id'];
                
                $result_sec_user = $this->dbmysql->getdatain_sec_user_by_id($this->user_id_intranet);                
                $record_user_tambah = array(
                    "user_tambah" => $result_sec_user['name']
                );             
                $record_user_ubah = array(
                    "user_ubah" => $result_sec_user['name']
                );
                
                $this->dbmysql->updatedata($this->dbmysql->tbl_m_meeting_room, $record_user_tambah, array("user_tambah" => $name_intranet)); 
                $this->dbmysql->updatedata($this->dbmysql->tbl_m_meeting_room, $record_user_ubah, array("user_ubah" => $name_intranet));                
                $this->dbmysql->updatedata($this->dbmysql->tbl_t_booking, $record_user_tambah, array("user_tambah" => $name_intranet)); 
                $this->dbmysql->updatedata($this->dbmysql->tbl_t_booking, $record_user_ubah, array("user_ubah" => $name_intranet));                
                $this->dbmysql->updatedata($this->dbmysql->tbl_t_booking_room, $record_user_tambah, array("user_tambah" => $name_intranet)); 
                $this->dbmysql->updatedata($this->dbmysql->tbl_t_booking_room, $record_user_ubah, array("user_ubah" => $name_intranet));
                $this->dbmysql->updatedata($this->dbmysql->tbl_t_comment, $record_user_tambah, array("user_tambah" => $name_intranet)); 
                $this->dbmysql->updatedata($this->dbmysql->tbl_t_comment, $record_user_ubah, array("user_ubah" => $name_intranet));
                $this->dbmysql->updatedata($this->dbmysql->tbl_t_questionnaire, $record_user_tambah, array("user_tambah" => $name_intranet)); 
                $this->dbmysql->updatedata($this->dbmysql->tbl_t_questionnaire, $record_user_ubah, array("user_ubah" => $name_intranet));
                $this->dbmysql->updatedata($this->dbmysql->tbl_td_cutiapproval, $record_user_tambah, array("user_tambah" => $name_intranet)); 
                $this->dbmysql->updatedata($this->dbmysql->tbl_td_cutiapproval, $record_user_ubah, array("user_ubah" => $name_intranet));
                $this->dbmysql->updatedata($this->dbmysql->tbl_td_cutidetail, $record_user_tambah, array("user_tambah" => $name_intranet)); 
                $this->dbmysql->updatedata($this->dbmysql->tbl_td_cutidetail, $record_user_ubah, array("user_ubah" => $name_intranet));
                $this->dbmysql->updatedata($this->dbmysql->tbl_td_event_attribute, $record_user_tambah, array("user_tambah" => $name_intranet)); 
                $this->dbmysql->updatedata($this->dbmysql->tbl_td_event_attribute, $record_user_ubah, array("user_ubah" => $name_intranet));                
                $this->dbmysql->updatedata($this->dbmysql->tbl_td_forum_attribute, $record_user_tambah, array("user_tambah" => $name_intranet)); 
                $this->dbmysql->updatedata($this->dbmysql->tbl_td_forum_attribute, $record_user_ubah, array("user_ubah" => $name_intranet));
                $this->dbmysql->updatedata($this->dbmysql->tbl_td_forum_post, $record_user_tambah, array("user_tambah" => $name_intranet)); 
                $this->dbmysql->updatedata($this->dbmysql->tbl_td_forum_post, $record_user_ubah, array("user_ubah" => $name_intranet)); 
                $this->dbmysql->updatedata($this->dbmysql->tbl_td_forum_topic_attribute, $record_user_tambah, array("user_tambah" => $name_intranet)); 
                $this->dbmysql->updatedata($this->dbmysql->tbl_td_forum_topic_attribute, $record_user_ubah, array("user_ubah" => $name_intranet)); 
                $this->dbmysql->updatedata($this->dbmysql->tbl_td_gallery_attribute, $record_user_tambah, array("user_tambah" => $name_intranet)); 
                $this->dbmysql->updatedata($this->dbmysql->tbl_td_gallery_attribute, $record_user_ubah, array("user_ubah" => $name_intranet)); 
                $this->dbmysql->updatedata($this->dbmysql->tbl_td_izinapproval, $record_user_tambah, array("user_tambah" => $name_intranet)); 
                $this->dbmysql->updatedata($this->dbmysql->tbl_td_izinapproval, $record_user_ubah, array("user_ubah" => $name_intranet));   
                $this->dbmysql->updatedata($this->dbmysql->tbl_td_news_attribute, $record_user_tambah, array("user_tambah" => $name_intranet)); 
                $this->dbmysql->updatedata($this->dbmysql->tbl_td_news_attribute, $record_user_ubah, array("user_ubah" => $name_intranet));   
                $this->dbmysql->updatedata($this->dbmysql->tbl_td_ticket_attribute, $record_user_tambah, array("user_tambah" => $name_intranet)); 
                $this->dbmysql->updatedata($this->dbmysql->tbl_td_ticket_attribute, $record_user_ubah, array("user_ubah" => $name_intranet));   
                $this->dbmysql->updatedata($this->dbmysql->tbl_td_ticket_history, $record_user_tambah, array("user_tambah" => $name_intranet)); 
                $this->dbmysql->updatedata($this->dbmysql->tbl_td_ticket_history, $record_user_ubah, array("user_ubah" => $name_intranet));   
                $this->dbmysql->updatedata($this->dbmysql->tbl_td_tugasapproval, $record_user_tambah, array("user_tambah" => $name_intranet)); 
                $this->dbmysql->updatedata($this->dbmysql->tbl_td_tugasapproval, $record_user_ubah, array("user_ubah" => $name_intranet));   
                $this->dbmysql->updatedata($this->dbmysql->tbl_td_voucherapproval, $record_user_tambah, array("user_tambah" => $name_intranet)); 
                $this->dbmysql->updatedata($this->dbmysql->tbl_td_voucherapproval, $record_user_ubah, array("user_ubah" => $name_intranet));   
                $this->dbmysql->updatedata($this->dbmysql->tbl_td_voucherdetail, $record_user_tambah, array("user_tambah" => $name_intranet)); 
                $this->dbmysql->updatedata($this->dbmysql->tbl_td_voucherdetail, $record_user_ubah, array("user_ubah" => $name_intranet));   
                $this->dbmysql->updatedata($this->dbmysql->tbl_th_bulletin, $record_user_tambah, array("user_tambah" => $name_intranet)); 
                $this->dbmysql->updatedata($this->dbmysql->tbl_th_bulletin, $record_user_ubah, array("user_ubah" => $name_intranet));   
                $this->dbmysql->updatedata($this->dbmysql->tbl_th_cuti, $record_user_tambah, array("user_tambah" => $name_intranet)); 
                $this->dbmysql->updatedata($this->dbmysql->tbl_th_cuti, $record_user_ubah, array("user_ubah" => $name_intranet));   
                $this->dbmysql->updatedata($this->dbmysql->tbl_th_document, $record_user_tambah, array("user_tambah" => $name_intranet)); 
                $this->dbmysql->updatedata($this->dbmysql->tbl_th_document, $record_user_ubah, array("user_ubah" => $name_intranet));   
                $this->dbmysql->updatedata($this->dbmysql->tbl_th_event, $record_user_tambah, array("user_tambah" => $name_intranet)); 
                $this->dbmysql->updatedata($this->dbmysql->tbl_th_event, $record_user_ubah, array("user_ubah" => $name_intranet));   
                $this->dbmysql->updatedata($this->dbmysql->tbl_th_forum, $record_user_tambah, array("user_tambah" => $name_intranet)); 
                $this->dbmysql->updatedata($this->dbmysql->tbl_th_forum, $record_user_ubah, array("user_ubah" => $name_intranet));   
                $this->dbmysql->updatedata($this->dbmysql->tbl_th_gallery, $record_user_tambah, array("user_tambah" => $name_intranet)); 
                $this->dbmysql->updatedata($this->dbmysql->tbl_th_gallery, $record_user_ubah, array("user_ubah" => $name_intranet));   
                //$this->dbmysql->updatedata($this->dbmysql->tbl_th_highlight, $record_user_tambah, array("user_tambah" => $name_intranet)); 
                //$this->dbmysql->updatedata($this->dbmysql->tbl_th_highlight, $record_user_ubah, array("user_ubah" => $name_intranet));   
                $this->dbmysql->updatedata($this->dbmysql->tbl_th_izin, $record_user_tambah, array("user_tambah" => $name_intranet)); 
                $this->dbmysql->updatedata($this->dbmysql->tbl_th_izin, $record_user_ubah, array("user_ubah" => $name_intranet));   
                $this->dbmysql->updatedata($this->dbmysql->tbl_th_news, $record_user_tambah, array("user_tambah" => $name_intranet)); 
                $this->dbmysql->updatedata($this->dbmysql->tbl_th_news, $record_user_ubah, array("user_ubah" => $name_intranet));   
                $this->dbmysql->updatedata($this->dbmysql->tbl_th_ticket, $record_user_tambah, array("user_tambah" => $name_intranet)); 
                $this->dbmysql->updatedata($this->dbmysql->tbl_th_ticket, $record_user_ubah, array("user_ubah" => $name_intranet));   
                $this->dbmysql->updatedata($this->dbmysql->tbl_th_tugas, $record_user_tambah, array("user_tambah" => $name_intranet)); 
                $this->dbmysql->updatedata($this->dbmysql->tbl_th_tugas, $record_user_ubah, array("user_ubah" => $name_intranet));   
                $this->dbmysql->updatedata($this->dbmysql->tbl_th_voucher, $record_user_tambah, array("user_tambah" => $name_intranet)); 
                $this->dbmysql->updatedata($this->dbmysql->tbl_th_voucher, $record_user_ubah, array("user_ubah" => $name_intranet));   
                $this->dbmysql->updatedata($this->dbmysql->tbl_ticket_project_attribute, $record_user_tambah, array("user_tambah" => $name_intranet)); 
                $this->dbmysql->updatedata($this->dbmysql->tbl_ticket_project_attribute, $record_user_ubah, array("user_ubah" => $name_intranet));                      
                               
                $record_islogin = array(
                    "isLogin" => 0
                );
                $this->dbmysql->updatedata($this->dbmysql->tbl_sec_user, $record_islogin, array("employee_id_ces" => $this->employeee_data['employee_id']));          
                                
            }
            
            $ldap_intranet = $this->dbmysql->getdatawithparam($this->dbmysql->tbl_p_sec_user_ldap, array('sec_user_id' => $id_intranet));
            $email_ldap = $ldap_intranet[0]['email'];
                        
            if(($name_intranet != $usernamebyemail && $name_intranet != $usernamenonemail)
                    OR ($email_ldap != $this->employeee_data['email_ciputra'])){
                
                $result_sec_user = $this->dbmysql->getdatawithparam($this->dbmysql->tbl_sec_user, array('name' => $this->employeee_data['email_ciputra']));
                $row_sec_user = $result_sec_user[0];
                $this->user_id_intranet = $row_sec_user['id'];
                
                $result_sec_user = $this->dbmysql->getdatain_sec_user_by_id($this->user_id_intranet);                
                $record = array(
                    "ldap_id" => $result_sec_user['name'],
                    "email" => $this->employeee_data['email_ciputra'],
                );
                $this->dbmysql->updatedata($this->dbmysql->tbl_p_sec_user_ldap, $record, array("sec_user_id" => $this->user_id_intranet));                           
                $this->dbmysql->updatedata($this->dbmysql->tbl_m_employee, $record, array("sec_user_id" => $this->user_id_intranet));
                
            }
            # End Jika email di hcms - personal berubah maka update user name dan email intranet              
            # End edit by  Wulan Sari 06.08.2018
            
        }
    }

    public function data_sec_user_sqlsrv() {
        $temp = explode("@", $this->employeee_data['email_ciputra']);
        $userIntranet = $temp[0];
        $this->function->_tabledata = 'dbwebsec.dbo.sec_user';
        
        //$result_user_ces_by_email = $this->function->getdata_standard(array("user_name" => $this->employeee_data['email_ciputra'], "deleted" => 0, "active" => 1));
        $result_user_ces_by_email = $this->function->getdata_standard(array("user_name" => $this->employeee_data['email_ciputra'], "deleted" => 0));
        
        //$result_user_ces_by_userintranet = $this->function->getdata_standard(array("user_name" => $userIntranet, "deleted" => 0, "active" => 1));
        $result_user_ces_by_userintranet = $this->function->getdata_standard(array("user_name" => $userIntranet, "deleted" => 0));
        
        //$result_employee_id = $this->function->getdata_standard(array("employee_id" => $this->employeee_data['employee_id'], "deleted" => 0, "active" => 1)); // added by wulan 20180924
        $result_employee_id = $this->function->getdata_standard(array("employee_id" => $this->employeee_data['employee_id'], "deleted" => 0));
        
        $counter_1 = count($result_user_ces_by_userintranet[0]);
        $counter_2 = count($result_user_ces_by_email[0]);
        $counter_3 = count($result_employee_id[0]); // added by wulan 20180924
        $passworddefault = md5('sungairaya');
        
        //print_r($result_user_ces_by_email);
        //exit;

        $record = array(
            "user_name" => $this->employeee_data['email_ciputra'],
            "user_pass" => $passworddefault,
            "user_fullname" => $this->function->clean_specialcaracter($this->employeee_data['employee_name']),
            "user_email" => $this->employeee_data['email_ciputra'],
            "addon" => date("Y-m-d H:i:s"),
            "addby" => $this->function->_user_id,
            "employee_id" => $this->employeee_data['employee_id'],
        );
        
        if ($counter_1 == 0 && $counter_2 == 0 && $counter_3 == 0) {   //jika belum ada    
            $this->function->insertdata($record);
            $rowafterinsert = $this->function->getdata_standard($record);
            if (!empty($rowafterinsert[0])) {
                $this->user_id_ces = $rowafterinsert[0][0]['user_id'];
            }
        }
        
        if ($counter_3 > 0) { //jika employee_id sudah ada  
            $record = array(
                "user_name" => $this->employeee_data['email_ciputra'],
                "user_email" => $this->employeee_data['email_ciputra'],
                
                //commented by anas 07022024 | karena modion, modiby sec_user (SQL) digunakan untuk cek akses jadi tidak boleh diupdate(?)
                // "modion" => date("Y-m-d H:i:s"),
                // "modiby" => $this->function->_user_id
            );
            
            //$this->function->updatedata($record, array("employee_id" => $this->employeee_data['employee_id'], "deleted" => 0, "active" => 1));  
            $this->function->updatedata($record, array("employee_id" => $this->employeee_data['employee_id'], "deleted" => 0));           
            
            $row = $result_employee_id[0][0];
            $this->user_id_ces = $row['user_id'];        
        }

        if ($counter_1 > 0 && $counter_2 == 0) { //jika user id tanpa format email ada, maka update
            $row = $result_user_ces_by_userintranet[0][0];
            $this->dbmysql->update_user_no_format_email($row, $record);
            $this->user_id_ces = $row['user_id'];
        }

        if ($counter_1 == 0 && $counter_2 > 0) { //jika user id dgn format email ada, maka update
            $row = $result_user_ces_by_email[0][0];
            $this->dbmysql->update_user_with_format_email($row, $record);
            $this->user_id_ces = $row['user_id'];
        }

        if ($counter_1 > 0 && $counter_2 > 0) { //jika sudah ada kedua datanya maka beri user_id_ces dengan data yang mengandung email saja
            $row = $result_user_ces_by_userintranet[0][0];
            $this->user_id_ces = $row['user_id'];
        }
        

    }

    public function getEmployeedatainces($employee_id) {
        $totaldata = 0;
        $result = $this->model_employee->getAllByIds($employee_id);
        $totaldata = $result[0][0]['totalRow'];
        if ($totaldata > 0) {
            $this->employeee_data = $result[1][0];
        } else {
            $this->errorMsg = 'Get data employee with employee id ' . $employee_id . ' not found..!';
        }
    }

    public function cleanDate($param) {
        $date = $param;
        if ($param == '1970-01-01') {
            $date = null;
        }
        return $date;
    }

    //added by michael 2022-08-10 untuk keperluan Intranet Ciputra Artpreneur, agar bisa connect, perlu tambahkan di db mereka jg
    public function data_intranet_art($employeee_data){
        $dataprojectpt = $this->dbmysql->getdata_projectpt($this->employeee_data['project_id'], $this->employeee_data['pt_id']);
        $this->dbmysql->getmysqlConfig($dataprojectpt['dbintranet_name']); // dapatkan data config intranet di file config
        $result_sec_user = $this->dbmysql->getdatain_sec_user_byemployee_idces($this->employeee_data['employee_id']);
                      
        if(empty($result_sec_user['username_ca']) && empty($result_sec_user['password_ca'])){
            $record = array(
                "username_ca" => $this->employeee_data['email_ciputra'],
                "password_ca" => 'sungairaya',
                // "employee_id_ces" => $this->employeee_data['employee_id'],
            );
            // $this->dbmysql->update_user_mysql($record);
            $dataprojectpt = $this->dbmysql->getdata_projectpt($this->employeee_data['project_id'], $this->employeee_data['pt_id']);
            $this->dbmysql->getmysqlConfig($dataprojectpt['dbintranet_name']); // dapatkan data config intranet di file config
            $this->dbmysql->updatedata($this->dbmysql->tbl_sec_user, $record, array("employee_id_ces" => $this->employeee_data['employee_id']));
        }      
        
        //dari sini, dipotong"
        $parameter = 'ke=1qaz&ey=2wsx&na=user_dari_ces&|u='.$this->employeee_data['employee_id'].'&|pa=zaq1&as=xsw2&yu=q12we3';

        $parameter1 = base64_encode('ke=1qaz&ey=2wsx&na=user_dari_ces&');
        $parameter2 = base64_encode('u='.$this->employeee_data['employee_id']);
        $parameter3 = base64_encode('&pa=zaq1&as=xsw2&yu=q12we3');

        $parameter123 = $parameter1.'('.$parameter2.'-'.$parameter3;

        $parameter = $parameter123;
        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, "https://intranet.ciputragroup.com/intranet_ca/?w=".$parameter);
        curl_setopt($ch, CURLOPT_HEADER, 0);

        $response = curl_exec($ch);

        curl_close($ch);

        $arrayRespon = array(
            "STATUS" => 1,
            "DATAS" => 1,
            "MSG" => $response
        );
        

        // $this->dbmysql->getmysqlConfigArt('config_art_intranet_art'); // dapatkan data config intranet di file config

        // $check_intranet_art = $this->dbmysql->getdatawithparam($this->dbmysql->tbl_site_user_personalia, array('user_personalia_employee_id_ces' => $this->employeee_data['employee_id'])); 

        // if($this->employee_data['alasanresign_id']){
        //     $status = 0;
        // }else{
        //     $status = 1;
        // }

        // if($this->employee_data['sex'] == 'F'){
        //     $gender = 0;
        // }else{
        //     $gender = 1;
        // }

        // if($this->employee_data['marriage_date'] == '1900-01-01'){
        //     $marriage_date = NULL;
        // }else{
        //     $marriage_date = $this->employee_data['marriage_date'];
        // }

        // if($this->employee_data['bloodgroup_id'] == '1'){
        //     $blood = 'O';
        // }elseif($this->employee_data['bloodgroup_id'] == '2'){
        //     $blood = 'A';
        // }elseif($this->employee_data['bloodgroup_id'] == '3'){
        //     $blood = 'AB';
        // }elseif($this->employee_data['bloodgroup_id'] == '4'){
        //     $blood = 'B';
        // }else{
        //     $blood = NULL;
        // }

        // if($this->employee_data['marriagestatus_id'] == '1'){
        //     $marriage = 0;
        // }elseif($this->employee_data['marriagestatus_id'] == '2'){
        //     $marriage = 1;
        // }elseif($this->employee_data['marriagestatus_id'] == '3'){
        //     $marriage = 2;
        // }else{
        //     $marriage = NULL;
        // }

        // if($this->employee_data['religion_id'] == '1'){
        //     $religion = 'Islam';
        // }elseif($this->employee_data['religion_id'] == '2'){
        //     $religion = 'Kristen';
        // }elseif($this->employee_data['religion_id'] == '3'){
        //     $religion = 'Katholik';
        // }elseif($this->employee_data['religion_id'] == '4'){
        //     $religion = 'Hindu';
        // }elseif($this->employee_data['religion_id'] == '5'){
        //     $religion = 'Buddha';
        // }elseif($this->employee_data['religion_id'] == '6'){
        //     $religion = 'KongHucu';
        // }elseif($this->employee_data['religion_id'] == '7'){
        //     $religion = 'Lain-Lain';
        // }else{
        //     $religion = NULL;
        // }

        // //master employee
        // $record = array(
        //         "user_personalia_created_timestamp" => date('Y-m-d H:i:s'),
        //         "user_personalia_modified_timestamp" => date('Y-m-d H:i:s'),
        //         "user_personalia_status" => $status,
        //         "user_personalia_creator_user_id" => 9999,
        //         "user_personalia_modifier_user_id" => 9999,
        //         "user_personalia_fullname" => $this->employee_data['employee_name'],
        //         "user_personalia_gender" => $gender,
        //         "user_personalia_blood_type" => $blood,
        //         "user_personalia_marital" => $marriage,
        //         "user_personalia_birthdate" => $this->employee_data['birth_date'],
        //         "user_personalia_birthplace" => $this->employee_data['birth_place'],
        //         "user_personalia_religion" => $religion,
        //         "user_personalia_employee_id_ces" => $this->employee_data['employee_id'],
        //         "user_personalia_nik" => $this->employee_data['nik_group'],
        //         "user_personalia_ktp_number" => $this->employee_data['ktp_number'],
        //         "user_personalia_last_education" => NULL,
        //         "user_personalia_npwp" => $this->employee_data['npwp'],
        //         "user_personalia_passport_number" => $this->employee_data['passport_number'],
        //         "user_personalia_marriage_date" => $marriage_date,
        //         "user_personalia_child_count" => $this->employee_data['child_count'],
        //         "user_personalia_activation" => $status,
        //         "user_personalia_exported" => 1,
                
        // );

        // if($check_intranet_art){

        //     $record['user_personalia_modified_timestamp'] = date('Y-m-d H:i:s');
        //     $record['user_personalia_created_timestamp'] = $check_intranet_art[0]['user_personalia_created_timestamp'];

        //     $this->dbmysql->updatedata($this->dbmysql->tbl_site_user_personalia, $record, array("user_personalia_id" => $check_intranet_art[0]['user_personalia_id']));

        //     $this->data_intranet_art_user($this->employee_data);

        // }else{

        //     $record['user_personalia_created_timestamp'] = date('Y-m-d H:i:s');

        //     $this->dbmysql->insertdata($this->dbmysql->tbl_site_user_personalia, $record);

        //     $this->data_intranet_art_user($this->employee_data);
        // }

    }

    // public function data_intranet_art_user($employeee_data){
    //     $this->employee_data = $employeee_data;

    //     $this->dbmysql->getmysqlConfigArt('config_art_intranet_art'); // dapatkan data config intranet di file config

    //     $get_intranet_art = $this->dbmysql->getdatawithparam($this->dbmysql->tbl_site_user_personalia, array('user_personalia_employee_id_ces' => $this->employeee_data['employee_id'])); 

    //     //user

    //     $check_intranet_art_user = $this->dbmysql->getdatawithparammaster($this->dbmysql->tbl_site_user, array('user_personalia_id' => $get_intranet_art[0]['user_personalia_id']));


    //     $password = 'sungairaya';
    //     $passworddefault = md5($password);

    //     //master user
    //     $record = array(
    //                 "user_personalia_id" => $get_intranet_art[0]['user_personalia_id'],
    //                 "user_activation" => 1,
    //                 "user_status" => 1,
    //                 "user_creator_user_id" => 9999,
    //                 "user_modifier_user_id" => 9999,
    //                 "user_name" => $this->employee_data['email_ciputra'],
    //                 "user_pass" => $password,
    //                 "user_pass_md5" => $passworddefault,
    //     );

    //     if(!$check_intranet_art_user){

    //         $record['user_created_timestamp'] = date('Y-m-d H:i:s');
    //         $record['user_activated_timestamp'] = date('Y-m-d H:i:s');
                    
    //         $this->dbmysql->insertdatamaster($this->dbmysql->tbl_site_user, $record);

    //     }else{
    //         $record['user_modified_timestamp'] = date('Y-m-d H:i:s');
    //         $record['user_created_timestamp'] = $check_intranet_art_user[0]['user_created_timestamp'];
    //         $record['user_activated_timestamp'] = $check_intranet_art_user[0]['user_activated_timestamp'];

    //         $this->dbmysql->updatedatamaster($this->dbmysql->tbl_site_user, $record, array("user_id" => $check_intranet_art_user[0]['user_id']));
    //     }

    //     $get_intranet_art_user = $this->dbmysql->getdatawithparammaster($this->dbmysql->tbl_site_user, array('user_personalia_id' => $get_intranet_art[0]['user_personalia_id']));

    //         //company

    //         $check_intranet_art_user_company = $this->dbmysql->getdatawithparammaster($this->dbmysql->tbl_site_user_company, array('user_id' => $get_intranet_art_user[0]['user_id']));


    //             //master user company
    //             $record_company = array(
    //                     "user_id" => $get_intranet_art_user[0]['user_id'],
    //                     "company_id" => 1,
    //                     "user_company_status" => 1,
    //                     "user_company_creator_user_id" => 9999,
    //                     "user_company_modifier_user_id" => 9999,
    //                     "user_company_activation" => 1
    //             );
                        
    //         if(!$check_intranet_art_user_company){
    //             $record_company['user_company_created_timestamp'] = date('Y-m-d H:i:s');

    //             $this->dbmysql->insertdatamaster($this->dbmysql->tbl_site_user_company, $record_company);

    //         }else{
    //             $record_company['user_company_modified_timestamp'] = date('Y-m-d H:i:s');
    //             $record_company['user_company_created_timestamp'] = $check_intranet_art_user_company[0]['user_company_created_timestamp'];

    //             $this->dbmysql->updatedatamaster($this->dbmysql->tbl_site_user_company, $record_company, array("user_company_id" => $check_intranet_art_user_company[0]['user_company_id']));
    //         }

    //         //application

    //         $check_intranet_art_user_application = $this->dbmysql->getdatawithparammaster($this->dbmysql->tbl_site_user_application, array('user_id' => $get_intranet_art_user[0]['user_id']));


    //             //master user application
    //             $record_application = array(
    //                     "user_id" => $get_intranet_art_user[0]['user_id'],
    //                     "application_id" => 2,
    //                     "user_application_status" => 1,
    //                     "user_application_created_timestamp" => date('Y-m-d H:i:s'),
    //                     "user_application_modified_timestamp" => date('Y-m-d H:i:s'),
    //                     "user_application_creator_user_id" => 9999,
    //                     "user_application_modifier_user_id" => 9999,
    //                     "user_application_activation" => 1
    //             );
                        
    //         if(!$check_intranet_art_user_application){
    //             $record_application['user_application_created_timestamp'] = date('Y-m-d H:i:s');

    //             $this->dbmysql->insertdatamaster($this->dbmysql->tbl_site_user_application, $record_application);

    //         }else{
    //             $record_application['user_application_modified_timestamp'] = date('Y-m-d H:i:s');
    //             $record_application['user_application_created_timestamp'] = $check_intranet_art_user_application[0]['user_application_created_timestamp'];

    //             $this->dbmysql->updatedatamaster($this->dbmysql->tbl_site_user_application, $record_application, array("user_application_id" => $check_intranet_art_user_application[0]['user_application_id']));
    //         }

    //         //access

    //         if ($this->employeee_data['department_id'] > 0 && !empty($this->employeee_data['department_id'])) {
    //             $result_dept = $this->dbmysql->getdata_departmentces($this->employeee_data['department_id']);
    //             $deptcode = $result_dept['code'];
    //         }

    //         if ($this->employeee_data['employee_id'] > 0 && !empty($this->employeee_data['employee_id'])) {
    //             $result_internetca = $this->dbmysql->getdata_intranetca($this->employeee_data['employee_id']);
    //             $internetca = $result_internetca;
    //         }else{
    //             $internetca = '';
    //         }
            
    //             //master user access
    //             if($internetca){

    //                 //INVENTORY
    //                 $check_intranet_art_user_access = $this->dbmysql->getdatawithparammaster($this->dbmysql->tbl_site_user_access, array('user_id' => $get_intranet_art_user[0]['user_id'], 'leveluser_id' => 7));

    //                 if($internetca['inventory'] == 1){

    //                     if(!$check_intranet_art_user_access){

    //                         //default INVENTORY (7)
    //                         $record_application = array(
    //                                 "user_id" => $get_intranet_art_user[0]['user_id'],
    //                                 "leveluser_id" => 7,
    //                                 "user_access_status" => 1,
    //                                 "user_access_created_timestamp" => date('Y-m-d H:i:s'),
    //                                 "user_access_modified_timestamp" => date('Y-m-d H:i:s'),
    //                                 "user_access_creator_user_id" => 9999,
    //                                 "user_access_modifier_user_id" => 9999,
    //                                 "user_access_activation" => 1
    //                         );
                                
    //                         $this->dbmysql->insertdatamaster($this->dbmysql->tbl_site_user_access, $record_application);

    //                     }else{

    //                         //default INVENTORY (7)
    //                         $record_application = array(
    //                                 "user_access_status" => 1,
    //                                 "user_access_created_timestamp" => $check_intranet_art_user_access[0]['user_access_created_timestamp'],
    //                                 "user_access_modified_timestamp" => date('Y-m-d H:i:s'),
    //                                 "user_access_creator_user_id" => 9999,
    //                                 "user_access_modifier_user_id" => 9999,
    //                                 "user_access_activation" => 1
    //                         );
                                
    //                         $this->dbmysql->updatedatamaster($this->dbmysql->tbl_site_user_access, $record_application, array('user_id' => $get_intranet_art_user[0]['user_id'], 'leveluser_id' => 7));

    //                     }

    //                 }else{

    //                     if($check_intranet_art_user_access){

    //                         //default INVENTORY (7)
    //                         $record_application = array(
    //                                 "user_access_status" => 0,
    //                                 "user_access_created_timestamp" => $check_intranet_art_user_access[0]['user_access_created_timestamp'],
    //                                 "user_access_modified_timestamp" => date('Y-m-d H:i:s'),
    //                                 "user_access_creator_user_id" => 9999,
    //                                 "user_access_modifier_user_id" => 9999,
    //                                 "user_access_activation" => 0
    //                         );
                                
    //                         $this->dbmysql->updatedatamaster($this->dbmysql->tbl_site_user_access, $record_application, array('user_id' => $get_intranet_art_user[0]['user_id'], 'leveluser_id' => 7));

    //                     }

    //                 }

    //                 //PURCHASING
    //                 $check_intranet_art_user_access = $this->dbmysql->getdatawithparammaster($this->dbmysql->tbl_site_user_access, array('user_id' => $get_intranet_art_user[0]['user_id'], 'leveluser_id' => 6));

    //                 if($internetca['purchasing'] == 1){

    //                     if(!$check_intranet_art_user_access){

    //                         //default Purchasing (6)
    //                         $record_application = array(
    //                                 "user_id" => $get_intranet_art_user[0]['user_id'],
    //                                 "leveluser_id" => 6,
    //                                 "user_access_status" => 1,
    //                                 "user_access_created_timestamp" => date('Y-m-d H:i:s'),
    //                                 "user_access_modified_timestamp" => date('Y-m-d H:i:s'),
    //                                 "user_access_creator_user_id" => 9999,
    //                                 "user_access_modifier_user_id" => 9999,
    //                                 "user_access_activation" => 1
    //                         );
                                
    //                         $this->dbmysql->insertdatamaster($this->dbmysql->tbl_site_user_access, $record_application);

    //                     }else{

    //                         //default Purchasing (6)
    //                         $record_application = array(
    //                                 "user_access_status" => 1,
    //                                 "user_access_created_timestamp" => $check_intranet_art_user_access[0]['user_access_created_timestamp'],
    //                                 "user_access_modified_timestamp" => date('Y-m-d H:i:s'),
    //                                 "user_access_creator_user_id" => 9999,
    //                                 "user_access_modifier_user_id" => 9999,
    //                                 "user_access_activation" => 1
    //                         );
                                
    //                         $this->dbmysql->updatedatamaster($this->dbmysql->tbl_site_user_access, $record_application, array('user_id' => $get_intranet_art_user[0]['user_id'], 'leveluser_id' => 6));
    //                     }

    //                 }else{

    //                     if($check_intranet_art_user_access){

    //                         //default Purchasing (6)
    //                         $record_application = array(
    //                                 "user_access_status" => 0,
    //                                 "user_access_created_timestamp" => $check_intranet_art_user_access[0]['user_access_created_timestamp'],
    //                                 "user_access_modified_timestamp" => date('Y-m-d H:i:s'),
    //                                 "user_access_creator_user_id" => 9999,
    //                                 "user_access_modifier_user_id" => 9999,
    //                                 "user_access_activation" => 0
    //                         );
                                
    //                         $this->dbmysql->updatedatamaster($this->dbmysql->tbl_site_user_access, $record_application, array('user_id' => $get_intranet_art_user[0]['user_id'], 'leveluser_id' => 6));

    //                     }

    //                 }

    //                 //MARKETING
    //                 $check_intranet_art_user_access = $this->dbmysql->getdatawithparammaster($this->dbmysql->tbl_site_user_access, array('user_id' => $get_intranet_art_user[0]['user_id'], 'leveluser_id' => 8));

    //                 if($internetca['marketing'] == 1){

    //                     if(!$check_intranet_art_user_access){

    //                         //default Sales Marketing (8)
    //                         $record_application = array(
    //                                 "user_id" => $get_intranet_art_user[0]['user_id'],
    //                                 "leveluser_id" => 8,
    //                                 "user_access_status" => 1,
    //                                 "user_access_created_timestamp" => date('Y-m-d H:i:s'),
    //                                 "user_access_modified_timestamp" => date('Y-m-d H:i:s'),
    //                                 "user_access_creator_user_id" => 9999,
    //                                 "user_access_modifier_user_id" => 9999,
    //                                 "user_access_activation" => 1
    //                         );
                                
    //                         $this->dbmysql->insertdatamaster($this->dbmysql->tbl_site_user_access, $record_application);

    //                     }else{

    //                         //default Sales Marketing (8)
    //                         $record_application = array(
    //                                 "user_access_status" => 1,
    //                                 "user_access_created_timestamp" => $check_intranet_art_user_access[0]['user_access_created_timestamp'],
    //                                 "user_access_modified_timestamp" => date('Y-m-d H:i:s'),
    //                                 "user_access_creator_user_id" => 9999,
    //                                 "user_access_modifier_user_id" => 9999,
    //                                 "user_access_activation" => 1
    //                         );
                                
    //                         $this->dbmysql->updatedatamaster($this->dbmysql->tbl_site_user_access, $record_application, array('user_id' => $get_intranet_art_user[0]['user_id'], 'leveluser_id' => 8));
    //                     }

    //                 }else{

    //                     if($check_intranet_art_user_access){

    //                         //default Sales Marketing (8)
    //                         $record_application = array(
    //                                 "user_access_status" => 0,
    //                                 "user_access_created_timestamp" => $check_intranet_art_user_access[0]['user_access_created_timestamp'],
    //                                 "user_access_modified_timestamp" => date('Y-m-d H:i:s'),
    //                                 "user_access_creator_user_id" => 9999,
    //                                 "user_access_modifier_user_id" => 9999,
    //                                 "user_access_activation" => 0
    //                         );
                                
    //                         $this->dbmysql->updatedatamaster($this->dbmysql->tbl_site_user_access, $record_application, array('user_id' => $get_intranet_art_user[0]['user_id'], 'leveluser_id' => 8));

    //                     }

    //                 }

    //                 //FINANCE
    //                 $check_intranet_art_user_access = $this->dbmysql->getdatawithparammaster($this->dbmysql->tbl_site_user_access, array('user_id' => $get_intranet_art_user[0]['user_id'], 'leveluser_id' => 9));

    //                 if($internetca['finance'] == 1){

    //                     if(!$check_intranet_art_user_access){

    //                         //default Finance & Accounting (9)
    //                         $record_application = array(
    //                                 "user_id" => $get_intranet_art_user[0]['user_id'],
    //                                 "leveluser_id" => 9,
    //                                 "user_access_status" => 1,
    //                                 "user_access_created_timestamp" => date('Y-m-d H:i:s'),
    //                                 "user_access_modified_timestamp" => date('Y-m-d H:i:s'),
    //                                 "user_access_creator_user_id" => 9999,
    //                                 "user_access_modifier_user_id" => 9999,
    //                                 "user_access_activation" => 1
    //                         );
                                
    //                         $this->dbmysql->insertdatamaster($this->dbmysql->tbl_site_user_access, $record_application);

    //                     }else{

    //                         //default Finance & Accounting (9)
    //                         $record_application = array(
    //                                 "user_access_status" => 1,
    //                                 "user_access_created_timestamp" => $check_intranet_art_user_access[0]['user_access_created_timestamp'],
    //                                 "user_access_modified_timestamp" => date('Y-m-d H:i:s'),
    //                                 "user_access_creator_user_id" => 9999,
    //                                 "user_access_modifier_user_id" => 9999,
    //                                 "user_access_activation" => 1
    //                         );
                                
    //                         $this->dbmysql->updatedatamaster($this->dbmysql->tbl_site_user_access, $record_application, array('user_id' => $get_intranet_art_user[0]['user_id'], 'leveluser_id' => 9));
    //                     }

    //                 }else{

    //                     if($check_intranet_art_user_access){

    //                         //default Finance & Accounting (9)
    //                         $record_application = array(
    //                                 "user_access_status" => 0,
    //                                 "user_access_created_timestamp" => $check_intranet_art_user_access[0]['user_access_created_timestamp'],
    //                                 "user_access_modified_timestamp" => date('Y-m-d H:i:s'),
    //                                 "user_access_creator_user_id" => 9999,
    //                                 "user_access_modifier_user_id" => 9999,
    //                                 "user_access_activation" => 0
    //                         );
                                
    //                         $this->dbmysql->updatedatamaster($this->dbmysql->tbl_site_user_access, $record_application, array('user_id' => $get_intranet_art_user[0]['user_id'], 'leveluser_id' => 9));

    //                     }

    //                 }

    //                 //OPERATIONAL
    //                 $check_intranet_art_user_access = $this->dbmysql->getdatawithparammaster($this->dbmysql->tbl_site_user_access, array('user_id' => $get_intranet_art_user[0]['user_id'], 'leveluser_id' => 10));

    //                 if($internetca['operational'] == 1){

    //                     if(!$check_intranet_art_user_access){

    //                         //default Operations (10)
    //                         $record_application = array(
    //                                 "user_id" => $get_intranet_art_user[0]['user_id'],
    //                                 "leveluser_id" => 10,
    //                                 "user_access_status" => 1,
    //                                 "user_access_created_timestamp" => date('Y-m-d H:i:s'),
    //                                 "user_access_modified_timestamp" => date('Y-m-d H:i:s'),
    //                                 "user_access_creator_user_id" => 9999,
    //                                 "user_access_modifier_user_id" => 9999,
    //                                 "user_access_activation" => 1
    //                         );
                                
    //                         $this->dbmysql->insertdatamaster($this->dbmysql->tbl_site_user_access, $record_application);

    //                     }else{

    //                         //default Operations (10)
    //                         $record_application = array(
    //                                 "user_access_status" => 1,
    //                                 "user_access_created_timestamp" => $check_intranet_art_user_access[0]['user_access_created_timestamp'],
    //                                 "user_access_modified_timestamp" => date('Y-m-d H:i:s'),
    //                                 "user_access_creator_user_id" => 9999,
    //                                 "user_access_modifier_user_id" => 9999,
    //                                 "user_access_activation" => 1
    //                         );
                                
    //                         $this->dbmysql->updatedatamaster($this->dbmysql->tbl_site_user_access, $record_application, array('user_id' => $get_intranet_art_user[0]['user_id'], 'leveluser_id' => 10));
    //                     }

    //                 }else{

    //                     if($check_intranet_art_user_access){

    //                         //default Operations (10)
    //                         $record_application = array(
    //                                 "user_access_status" => 0,
    //                                 "user_access_created_timestamp" => $check_intranet_art_user_access[0]['user_access_created_timestamp'],
    //                                 "user_access_modified_timestamp" => date('Y-m-d H:i:s'),
    //                                 "user_access_creator_user_id" => 9999,
    //                                 "user_access_modifier_user_id" => 9999,
    //                                 "user_access_activation" => 0
    //                         );
                                
    //                         $this->dbmysql->updatedatamaster($this->dbmysql->tbl_site_user_access, $record_application, array('user_id' => $get_intranet_art_user[0]['user_id'], 'leveluser_id' => 10));

    //                     }

    //                 }

    //                 //SALES
    //                 $check_intranet_art_user_access = $this->dbmysql->getdatawithparammaster($this->dbmysql->tbl_site_user_access, array('user_id' => $get_intranet_art_user[0]['user_id'], 'leveluser_id' => 11));

    //                 if($internetca['sales'] == 1){

    //                     if(!$check_intranet_art_user_access){

    //                         //default Sales PRoject (11)
    //                         $record_application = array(
    //                                 "user_id" => $get_intranet_art_user[0]['user_id'],
    //                                 "leveluser_id" => 11,
    //                                 "user_access_status" => 1,
    //                                 "user_access_created_timestamp" => date('Y-m-d H:i:s'),
    //                                 "user_access_modified_timestamp" => date('Y-m-d H:i:s'),
    //                                 "user_access_creator_user_id" => 9999,
    //                                 "user_access_modifier_user_id" => 9999,
    //                                 "user_access_activation" => 1
    //                         );
                                
    //                         $this->dbmysql->insertdatamaster($this->dbmysql->tbl_site_user_access, $record_application);

    //                     }else{

    //                         //default Sales PRoject (11)
    //                         $record_application = array(
    //                                 "user_access_status" => 1,
    //                                 "user_access_created_timestamp" => $check_intranet_art_user_access[0]['user_access_created_timestamp'],
    //                                 "user_access_modified_timestamp" => date('Y-m-d H:i:s'),
    //                                 "user_access_creator_user_id" => 9999,
    //                                 "user_access_modifier_user_id" => 9999,
    //                                 "user_access_activation" => 1
    //                         );
                                
    //                         $this->dbmysql->updatedatamaster($this->dbmysql->tbl_site_user_access, $record_application, array('user_id' => $get_intranet_art_user[0]['user_id'], 'leveluser_id' => 11));
    //                     }

    //                 }else{

    //                     if($check_intranet_art_user_access){

    //                         //default Sales PRoject (11)
    //                         $record_application = array(
    //                                 "user_access_status" => 0,
    //                                 "user_access_created_timestamp" => $check_intranet_art_user_access[0]['user_access_created_timestamp'],
    //                                 "user_access_modified_timestamp" => date('Y-m-d H:i:s'),
    //                                 "user_access_creator_user_id" => 9999,
    //                                 "user_access_modifier_user_id" => 9999,
    //                                 "user_access_activation" => 0
    //                         );
                                
    //                         $this->dbmysql->updatedatamaster($this->dbmysql->tbl_site_user_access, $record_application, array('user_id' => $get_intranet_art_user[0]['user_id'], 'leveluser_id' => 11));

    //                     }

    //                 }
            
    //             }
    // }
    //end added by michael 2022-08-10

    //added by michael 2022-12-12 | encrypt password mysql
    public function encrypt_password_mysql($password = null) {
        $salt = "a1b2c3d4e*20nEVX\69t09@A4a>/Us78g";
        $text = $password;
        $data = trim(base64_encode(mcrypt_encrypt(MCRYPT_RIJNDAEL_256, $salt, $text, MCRYPT_MODE_ECB, mcrypt_create_iv(mcrypt_get_iv_size(MCRYPT_RIJNDAEL_256, MCRYPT_MODE_ECB), MCRYPT_RAND))));
        $result = base64_encode($data);

        return $result;
    }

}

?>
