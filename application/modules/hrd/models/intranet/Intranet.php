<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Intranet
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Intranet_Intranet {

    public $errorMsg;
    public $status;
    public $userAdmin;
    public $server;
    public $user;
    public $password;
    public $database;
    public $databaseSec;
    public $databaseMaster;
    public $projectId;

    public function __construct() {
        $this->errorMsg = "";
        $this->status = FALSE;
        // $this->server = "localhost:6415";
        //  $this->user = "intranet";
        // $this->password = "sepuluhenambelas";
    }

    public function run($employee) {

      
 

        $configName = NULL;

        $configDao = new Hrd_Models_Intranet_ConfigDao();
        $configDb = $configDao->getProjectconfig(intval($this->projectId));
      //  $configDb = $configDao->getProjectconfig(999999);
     // var_dump($configDb);
        if (isset($configDb[0])) {
            $configName = $configDb[0][0]["dbintranet_name"];
        }
        
        if (!$configName) {
            $this->errorMsg = "Tidak ada Nama Config";
            return;
        }

       

        $config = new Hrd_Models_Intranet_Configmysql();
        $config = $config->getConfigdata($configName);
        if (strlen($config["host"]) == 0) {
            $this->errorMsg = "Config database tidak ada.";
            return;
        }


        $this->server = $config["host"];
        $this->server = strlen($config["port"]) > 0 ? $this->server . ":" . $config["port"] : $this->server;
        $this->user = $config["user"];
        $this->password = $config["password"];
        $this->database = $config["database"];
        $this->databaseMaster = $config["database_master"];
        $this->databaseSec = $config["database_sec"];

        if (intval($this->userAdmin) == 0) {
            $this->errorMsg = "Invalid user admin.";
            return;
        }
        $email = $employee->getEmailCiputra();
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $this->errorMsg = "Invalid email.";
            return;
        }
        
        $temp = explode("@", $email);
        $userIntranet = $temp[0];

        $userId = $this->checkUSerCes($employee,$userIntranet);



        $link = $this->connectMysql();

        if (!$link) {
            return;
        }




        $this->checkUserIntranet($link, $email, $userId, $employee);
    }

    private function connectMysql() {
        $link = NULL;
        // if (!$link = mysql_connect('localhost', 'root', '')) {
        if (!$link = mysql_connect($this->server, $this->user, $this->password)) {
            $this->errorMsg = '[0a] Could not connect to mysql';
            return FALSE;
        }

        if (!mysql_select_db($this->databaseSec, $link)) {
            $this->errorMsg = '[0b] Could not select database dbwebsec';
            return FALSE;
        }
        return $link;
    }

    private function checkUserIntranet($link, $email, $userId, $employee) {
        //$temp = explode("@", $email);
       // $userIntranet = $temp[0];
        $userIntranet = $email;


        // $sql = 'SELECT * FROM sec_user WHERE name = "' . $userIntranet . '"';
        $sql = 'SELECT * FROM sec_user WHERE employee_id_ces =' . intval($employee->getId());
        $result = mysql_query($sql, $link);

        if (!$result) {
            $this->errorMsg = '[1]. Could not run query: ' . mysql_error();
            return FALSE;
        }



        $numRows = mysql_num_rows($result); // jumlah record



        $secUserId = 0;

        if ($numRows == 0) { // jika tidak ada record
            mysql_free_result($result);

            // $sql = "INSERT INTO sec_user (employee_id_ces,pt_id_ces,project_id_ces,user_id_ces,name,password)"
            //         . " VALUES(" . $employee->getId() . "," . $employee->getPt()->getId() . ","
            //         . "" . $employee->getProject()->getId() . "," . $userId . ",'" . $userIntranet . "','sungairaya')";

            //update by michael 2022-12-12 | encrypt password
            $passworddefault = $this->encrypt_password_mysql('sungairaya');

            $sql = "INSERT INTO sec_user (employee_id_ces,pt_id_ces,project_id_ces,user_id_ces,name,password)"
                    . " VALUES(" . $employee->getId() . "," . $employee->getPt()->getId() . ","
                    . "" . $employee->getProject()->getId() . "," . $userId . ",'" . $userIntranet . "','".$passworddefault."')";

            $result = mysql_query($sql, $link);

            if (!$result) {
                $this->errorMsg = '[2]. Could not run query: ' . mysql_error();
                return FALSE;
            }

            $secUserId = mysql_insert_id();

            // var_dump($secUserId);
        } else {
            while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
                //var_dump($row);
                $secUserId = $row["id"];
            }



            mysql_free_result($result);
            
            /*
            $sql = "UPDATE sec_user set employee_id_ces = " . $employee->getId() . ","
                    . "pt_id_ces = " . $employee->getPt()->getId() . ","
                    . "project_id_ces = " . $employee->getProject()->getId() . ","
                    . "user_id_ces = " . $userId . ",name = '" . $userIntranet . "' WHERE id= ".$secUserId."";
          
            $result = mysql_query($sql, $link);

            if (!$result) {
                $this->errorMsg = '[2b]. Could not run query: ' . mysql_error();
                return FALSE;
            }
             
             */
            
            
            
        }

        /// check ke psec_user_ldap
        $sql = 'SELECT * FROM p_sec_user_ldap WHERE sec_user_id = ' . intval($secUserId);
        $result = mysql_query($sql, $link);

        if (!$result) {
            $this->errorMsg = '[3]. Could not run query: ' . mysql_error();
            return FALSE;
        }



        $numRows = mysql_num_rows($result); // jumlah record





        if ($numRows == 0) { // jika tidak ada record
            mysql_free_result($result);

            $sql = "INSERT INTO p_sec_user_ldap (sec_user_id,ldap_id,email)"
                    . " VALUES(" . $secUserId . ",'" . $userIntranet . "','" . $email . "')";
            $result = mysql_query($sql, $link);

            if (!$result) {
                $this->errorMsg = '[4]. Could not run query: ' . mysql_error();
                return FALSE;
            }

            // $secUserId = mysql_insert_id();
            // var_dump($secUserId);
        } else {
            $tempId = 0;
            while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
                //var_dump($row);
                $tempId = $row["sec_user_id"];
            }

            mysql_free_result($result);
            
            

            $sql = "UPDATE p_sec_user_ldap set email = '" . $email . "'  WHERE sec_user_id =  " . $tempId;
            //$sql = "UPDATE p_sec_user_ldap set email = '" . $email . "',ldap_id = '" . $email . "'  WHERE sec_user_id =  " . $tempId;

            $result = mysql_query($sql, $link);

            if (!$result) {
                $this->errorMsg = '[4.b]. Could not run query: ' . mysql_error();
                return FALSE;
            }
        }

        /// check ke sec_user_group
        $secProgramId = 12;
        $secGroupId = 36;
        $sql = 'SELECT * FROM sec_user_group WHERE sec_user = ' . intval($secUserId) . ' and sec_program = ' . $secProgramId;
        //$sql = 'SELECT * FROM sec_user_group WHERE sec_user = ' . intval($secUserId) . ' and sec_program = ' . $secProgramId . ' and sec_group=' . $secGroupId;
        
        $result = mysql_query($sql, $link);

        if (!$result) {
            $this->errorMsg = '[5]. Could not run query: ' . mysql_error();
            return FALSE;
        }



        $numRows = mysql_num_rows($result); // jumlah record



        if ($numRows == 0) { // jika tidak ada record
            mysql_free_result($result);

            $sql = "INSERT INTO sec_user_group (sec_user,sec_program,sec_group)"
                    . " VALUES(" . intval($secUserId) . "," . $secProgramId . ",'" . $secGroupId . "')";
            $result = mysql_query($sql, $link);

            if (!$result) {
                $this->errorMsg = '[6]. Could not run query: ' . mysql_error();
                return FALSE;
            }

            // $secUserId = mysql_insert_id();
            // var_dump($secUserId);
        } else {


            mysql_free_result($result);
        }


        /// m_employee intranet
        if (!mysql_select_db($this->databaseMaster, $link)) {
            $this->errorMsg = 'Could not select database : dbmaster';
            return FALSE;
        }


        $dao = new Hrd_Models_Intranet_IntranetDao();
        $emDb = $dao->getEmployeeDetail($employee->getId());

        $departmentCode = $emDb[1][0]["department_code"];
        $jabatanCode = $emDb[1][0]["position_position"];



        /// check m_employee intranet
        $projectId = 1;
        $ptId = 1;
        $perProyek = 'A';
        $perPT = 'A01';
        $nik = $employee->getNik();
        $name = $employee->getName();
        // $sql = 'SELECT * FROM m_employee WHERE project_id = '.$projectId.' and pt_id = '.$ptId.' and PER_PROYEK = "'.$perProyek.'" and PER_PT = "'.$perPT.'" and NIK = "'.$nik.'"';
        $sql = 'SELECT * FROM m_employee WHERE sec_user_id = ' . intval($secUserId);
        $result = mysql_query($sql, $link);

        if (!$result) {
            $this->errorMsg = '[7]. Could not run query: ' . mysql_error();
            return FALSE;
        }





        $numRows = mysql_num_rows($result); // jumlah record



        if ($numRows == 0) { // jika tidak ada record
            mysql_free_result($result);

            /*
            $sql = "INSERT INTO m_employee (project_id,PER_PROYEK,pt_id,PER_PT,NIK,NAME,EMAIL,IS_ACTIVE,hcms_group_id,LDAP_ID,SEC_USER_ID,PER_DEPARTEMEN,PER_JABATAN)"
                    . " VALUES(" . $projectId . ",'" . $perProyek . "'," . $ptId . ",'" . $perPT . "','" . $nik . "','" . $name . "','" . $email . "',1,1,'" . $userIntranet . "'," . $secUserId . ",'" . $departmentCode . "','" . $jabatanCode . "')";
           */
              $sql = "INSERT INTO m_employee (project_id,PER_PROYEK,pt_id,PER_PT,NIK,NAME,EMAIL,IS_ACTIVE,hcms_group_id,LDAP_ID,SEC_USER_ID,PER_DEPARTEMEN,PER_JABATAN)"
                    . " VALUES(1,'" . $perProyek . "',1,'" . $perPT . "','" . $nik . "','" . $name . "','" . $email . "',1,1,'" . $userIntranet . "'," . $secUserId . ",'" . $departmentCode . "','" . $jabatanCode . "')";
            
            $result = mysql_query($sql, $link);

            if (!$result) {
                $this->errorMsg = '[8]. Could not run query: ' . mysql_error();
                return FALSE;
            }
        } else {

            $tempId = 0;
            while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
                //var_dump($row);
                $tempId = $row["employee_id"];
            }

            mysql_free_result($result);

            $sql = "UPDATE m_employee set nik = '" . $nik . "', PER_DEPARTEMEN = '" . $departmentCode . "',PER_JABATAN = '" . $jabatanCode . "', NAME = '" . $name . "', EMAIL = '" . $email . "'    WHERE employee_id =  " . $tempId;

            $result = mysql_query($sql, $link);

            if (!$result) {
                $this->errorMsg = '[8.b]. Could not run query: ' . mysql_error();
                return FALSE;
            }
        }
    }

    /* @return int - user_id */

    private function checkUSerCes($employee,$user) {


        $dao = new Hrd_Models_Intranet_IntranetDao();
        $hasil = $dao->saveUserCes($employee, $this->userAdmin, md5("sungairaya"),$user);

        return $hasil[0][0]["user_id"];
    }


    //added by michael 2022-12-12 | encrypt password mysql
    public function encrypt_password_mysql($password = null) {
        $salt = "a1b2c3d4e*20nEVX\69t09@A4a>/Us78g";
        $text = $password;
        $data = trim(base64_encode(mcrypt_encrypt(MCRYPT_RIJNDAEL_256, $salt, $text, MCRYPT_MODE_ECB, mcrypt_create_iv(mcrypt_get_iv_size(MCRYPT_RIJNDAEL_256, MCRYPT_MODE_ECB), MCRYPT_RAND))));
        $result = base64_encode($data);

        return $result;
    }

}
