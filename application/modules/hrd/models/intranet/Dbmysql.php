<?php

/**
 * Description of Employee Intranet
 *
 * @author MIS - AHMAD RIADI
 * 
 */
class Hrd_Models_Intranet_Dbmysql {
    //setup
    public $configmysql = null;
    public $configdbintranet = null;
    public $configintranet = null;
    public $dbmysql = null;
    //tabel data
    public $tbl_m_employee = null;
    public $tbl_sec_user = null;
    public $tbl_p_sec_user_ldap = null;
    public $tbl_sec_user_group = null;
    
    // start add by Wulan 06.08.2018
    public $tbl_m_meeting_room = null;
    public $tbl_t_booking = null;
    public $tbl_t_booking_room = null;
    public $tbl_t_comment = null;
    public $tbl_t_questionnaire = null;
    public $tbl_td_cutiapproval = null;
    public $tbl_td_cutidetail = null;
    public $tbl_td_event_attribute = null;
    public $tbl_td_forum_attribute = null;
    public $tbl_td_forum_post = null;
    public $tbl_td_forum_topic_attribute = null;
    public $tbl_td_gallery_attribute = null;
    public $tbl_td_izinapproval = null;
    public $tbl_td_news_attribute = null;
    public $tbl_td_ticket_attribute = null;
    public $tbl_td_ticket_history = null;
    public $tbl_td_tugasapproval = null;
    public $tbl_td_voucherapproval = null;
    public $tbl_td_voucherdetail = null;
    public $tbl_th_bulletin = null;
    public $tbl_th_cuti = null;
    public $tbl_th_document = null;
    public $tbl_th_event = null;
    public $tbl_th_forum = null;
    public $tbl_th_gallery = null;
    public $tbl_th_highlight = null;
    public $tbl_th_izin = null;
    public $tbl_th_news = null;
    public $tbl_th_ticket = null;
    public $tbl_th_tugas = null;
    public $tbl_th_voucher = null;
    public $tbl_ticket_project_attribute = null;
    public $tbl_th_sakit = null;
    // End add by Wulan 06.08.2018

    //added by michael
    public $tbl_site_user_personalia = null;
    public $tbl_site_user_personalia_job = null;
    public $tbl_site_user_personalia_mail = null;
    public $tbl_site_user_personalia_phone = null;
    public $tbl_site_user_personalia_address = null;
    public $tbl_site_user = null;
    public $tbl_site_user_company = null;
    public $tbl_site_leveluser = null;
    public $tbl_site_user_access = null;
    public $tbl_site_user_application = null;
    //end added by michael
    
    
    //other
    public $errorMsg = null;

    function __construct() {
        $this->function = new Hrd_Models_General_Setup;
        $this->configmysql = new Hrd_Models_Intranet_Configmysql;
    }


    public function update_user_with_name_mysql($record) {
        $employee_id = $record['employee_id_ces'];
        unset($record['password']);
        unset($record['employee_id_ces']);
        $whereset = array('employee_id_ces' => $employee_id);
        $this->updatedata_sec_mysql($this->tbl_sec_user, $record, $whereset);
    }
    
    public function update_user_mysql($record) {
        $employee_id = $record['employee_id_ces'];
        unset($record['name']);
        unset($record['password']);
        unset($record['employee_id_ces']);
        $whereset = array('employee_id_ces' => $employee_id);
        $this->updatedata($this->tbl_sec_user, $record, $whereset);
    }
    public function update_user_with_empid_mysql($record) {
        $employee_id = $record['employee_id_ces'];
        unset($record['name']);
        unset($record['password']);
        $whereset = array('employee_id_ces' => $employee_id);
        $this->updatedata($this->tbl_sec_user, $record, $whereset);
    }

    public function update_user_no_format_email($row, $record) {
	//unset($record['user_name']);
        unset($record['user_pass']);
        unset($record['addon']);
        unset($record['addby']);

        //commented by anas 07022024 | karena modion, modiby sec_user (SQL) digunakan untuk cek akses jadi tidak boleh diupdate(?)
        // $record['modion'] = date("Y-m-d H:i:s");
        // $record['modiby'] = $this->function->_user_id;

        $whereset = array("user_id" => $row['user_id']);
	$this->function->_tabledata = 'dbwebsec.dbo.sec_user';

        $this->function->updatedata($record, $whereset);
    }

    public function update_user_with_format_email($row, $record) {
        unset($record['user_name']);
        unset($record['user_pass']);
        unset($record['addon']);
        unset($record['addby']);

        //commented by anas 07022024 | karena modion, modiby sec_user (SQL) digunakan untuk cek akses jadi tidak boleh diupdate(?)
        // $record['modion'] = date("Y-m-d H:i:s");
        // $record['modiby'] = $this->function->_user_id;

        $whereset = array("user_id" => $row['user_id']);

	 $this->function->_tabledata = 'dbwebsec.dbo.sec_user';
        $this->function->updatedata($record, $whereset);
    }
    

    public function getConfigdbintrabet($project_id) {
        $configDao = new Hrd_Models_Intranet_ConfigDao();
        $configDb = $configDao->getProjectconfig($project_id);
        if (!empty($configDb[0])) {
            $this->configdbintranet = $configDb[0][0]['dbintranet_name'];
        } else {
            $this->errorMsg = 'No Config data in project_id' . $project_id;
        }
    }

    public function getmysqlConfig($config) {
        $configdata = $this->configmysql->getConfigdata($config);
        $this->configintranet = $configdata;
        $dbwebsec = $this->configintranet['database_sec'];
        $dbmaster = $this->configintranet['database_master'];
        $dbintranet = $this->configintranet['database'];
        $this->tbl_m_employee = $dbmaster . '.m_employee';
        $this->tbl_sec_user = $dbwebsec . '.sec_user';
        $this->tbl_p_sec_user_ldap = $dbwebsec . '.p_sec_user_ldap';
        $this->tbl_sec_user_group = $dbwebsec . '.sec_user_group';
        $this->tbl_m_employee = $dbmaster . '.m_employee';
        
        // start add by Wulan 06.08.2018        
        $this->tbl_m_meeting_room = $dbintranet . '.m_meeting_room';
        $this->tbl_t_booking = $dbintranet . '.t_booking';
        $this->tbl_t_booking_room = $dbintranet . '.t_booking_room';
        $this->tbl_t_comment = $dbintranet . '.t_comment';
        $this->tbl_t_questionnaire = $dbintranet . '.t_questionnaire';
        $this->tbl_td_cutiapproval = $dbintranet . '.td_cutiapproval';
        $this->tbl_td_cutidetail = $dbintranet . '.td_cutidetail';
        $this->tbl_td_event_attribute = $dbintranet . '.td_event_attribute';
        $this->tbl_td_forum_attribute = $dbintranet . '.td_forum_attribute';
        $this->tbl_td_forum_post = $dbintranet . '.td_forum_post';
        $this->tbl_td_forum_topic_attribute = $dbintranet . '.td_forum_topic_attribute';
        $this->tbl_td_gallery_attribute = $dbintranet . '.td_gallery_attribute';
        $this->tbl_td_izinapproval = $dbintranet . '.td_izinapproval';
        $this->tbl_td_news_attribute = $dbintranet . '.td_news_attribute';
        $this->tbl_td_ticket_attribute = $dbintranet . '.td_ticket_attribute';
        $this->tbl_td_ticket_history = $dbintranet . '.td_ticket_history';
        $this->tbl_td_tugasapproval = $dbintranet . '.td_tugasapproval';
        $this->tbl_td_voucherapproval = $dbintranet . '.td_voucherapproval';
        $this->tbl_td_voucherdetail = $dbintranet . '.td_voucherdetail';
        $this->tbl_th_bulletin = $dbintranet . '.th_bulletin';
        $this->tbl_th_cuti = $dbintranet . '.th_cuti';
        $this->tbl_th_document = $dbintranet . '.th_document';
        $this->tbl_th_event = $dbintranet . '.th_event';
        $this->tbl_th_forum = $dbintranet . '.th_forum';
        $this->tbl_th_gallery = $dbintranet . '.th_gallery';
        $this->tbl_th_highlight = $dbintranet . '.th_highlight';
        $this->tbl_th_izin = $dbintranet . '.th_izin';
        $this->tbl_th_news = $dbintranet . '.th_news';
        $this->tbl_th_ticket = $dbintranet . '.th_ticket';
        $this->tbl_th_tugas = $dbintranet . '.th_tugas';
        $this->tbl_th_voucher = $dbintranet . '.th_voucher';
        $this->tbl_th_lembur = $dbintranet . '.th_lembur';
        $this->tbl_ticket_project_attribute = $dbintranet . '.ticket_project_attribute';  
        $this->tbl_th_sakit = $dbintranet . '.th_sakit';      
        // End add by Wulan 06.08.2018
    
    }

    public function getmysqlConfigArt($config) {
        $configdata = $this->configmysql->getConfigdataArt($config);
        $this->configintranet = $configdata;
        $intranet_art_database = $this->configintranet['database'];
        $master_art_database = $this->configintranet['database_master'];

        $this->tbl_site_user_personalia = 'site_user_personalia';
        $this->tbl_site_user_personalia_job = 'site_user_personalia_job';
        $this->tbl_site_user_personalia_mail = 'site_user_personalia_mail';
        $this->tbl_site_user_personalia_phone = 'site_user_personalia_phone';
        $this->tbl_site_user_personalia_address = 'site_user_personalia_address';
        $this->tbl_site_user = 'site_user';
        $this->tbl_site_user_company = 'site_user_company';
        $this->tbl_site_leveluser = 'site_leveluser';
        $this->tbl_site_user_access = 'site_user_access';
        $this->tbl_site_user_application = 'site_user_application';
    
    }

    public function setConnection() {
        $this->dbmysql = new mysqli($this->configintranet['host'], $this->configintranet['user'], $this->configintranet['password'], $this->configintranet['database'], $this->configintranet['port']);
        if ($this->dbmysql->connect_errno) {
            $this->errorMsg = 'Connection to mysql error with message ' . $this->dbmysql->connect_errno;
            return false;
        }
    }

    public function setConnectionMaster() {
        $this->dbmysql = new mysqli($this->configintranet['host'], $this->configintranet['user'], $this->configintranet['password'], $this->configintranet['database_master'], $this->configintranet['port']);
        if ($this->dbmysql->connect_errno) {
            $this->errorMsg = 'Connection to mysql error with message ' . $this->dbmysql->connect_errno;
            return false;
        }
    }
    
    public function getdatain_p_sec_user_ldap_byemail($email) {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $this->errorMsg = " Invalid email.";
            return null;
        } else {
            $result = $this->getdatawithparam($this->tbl_p_sec_user_ldap, array('email' => $email));
            if ($result) {
                return $result[0];
            } else {
                return null;
            }
        }
    }
    
    public function getdatain_sec_user_by_id($id) {
        $result = $this->getdatawithparam($this->tbl_sec_user, array('id' => $id));
        if ($result) {
            return $result[0];
        } else {
            return null;
        }
    }
    public function getdatain_sec_user_byemployee_idces($employee_id_ces) {
        $result = $this->getdatawithparam($this->tbl_sec_user, array('employee_id_ces' => $employee_id_ces));
        if ($result) {
            return $result[0];
        } else {
            return null;
        }
    }
    
    function getdata_projectces($project_id) {
        $this->function->_tabledata = 'dbmaster.dbo.m_project';
        $result = $this->function->getdata_standard(array("project_id" =>$project_id));
        return $result[0][0];
        
    }

    function getdata_ptces($pt_id) {
        $this->function->_tabledata = 'dbmaster.dbo.m_pt';
        $result = $this->function->getdata_standard(array("pt_id" =>$pt_id));
       return $result[0][0];
    }
    function getdata_religionces($religion_id) {        
        $this->function->_tabledata = 'dbmaster.dbo.m_religion';
        $result = $this->function->getdata_standard(array("religion_id" =>$religion_id));
       return $result[0][0];
    }
    function getdata_bloodgroupces($bloodgroup_id) {
        $this->function->_tabledata = 'hrd.dbo.m_bloodgroup';
        $result = $this->function->getdata_standard(array("bloodgroup_id" =>$bloodgroup_id));
       return $result[0][0];
    }
    function getdata_marriagestatusces($marriage_id) {
        $this->function->_tabledata = 'hrd.dbo.m_marriagestatus';
        $result = $this->function->getdata_standard(array("marriagestatus_id" =>$marriage_id));
       return $result[0][0];
    }
    function getdata_educationces($last_education) {
        $this->function->_tabledata = 'hrd.dbo.m_education';
        $result = $this->function->getdata_standard(array("education_id" =>$last_education));
       return $result[0][0];
    }
    function getdata_divisionces($division_id) {
        $this->function->_tabledata = 'hrd.dbo.m_division';
        $result = $this->function->getdata_standard(array("division_id" =>$division_id));
       return $result[0][0];
    }
    function getdata_departmentces($department_id) {
        $this->function->_tabledata = 'hrd.dbo.m_department';
        $result = $this->function->getdata_standard(array("department_id" =>$department_id));
       return $result[0][0];
    }
    function getdata_positionces($position_id) {
        $this->function->_tabledata = 'hrd.dbo.m_position';
        $result = $this->function->getdata_standard(array("position_id" =>$position_id));
       return $result[0][0];
    }
    function getdata_intranetca($employee_id) {
        $this->function->_tabledata = 'hrd.dbo.m_intranetca';
        $result = $this->function->getdata_standard(array("employee_id" =>$employee_id,"deleted" => 0));
       return $result[0][0];
    }

    function getdata_projectpt($project_id,$pt_id) {
        $this->function->_tabledata = 'dbmaster.dbo.m_projectpt';
        $result = $this->function->getdata_standard(array("project_id" => $project_id,"pt_id" => $pt_id));
        return $result[0][0];
    }

    function getdatanoparam($table) {
        $this->setConnection();
        $sql = "
                 SELECT * FROM $table  
               ";
        $array = array();
        if ($result = $this->dbmysql->query($sql)) {
            while ($row = $result->fetch_assoc()) {
                $array[] = $row;
            }
            if (is_array($array) && count($array) > 0) {
                return $array;
            } else {
                return null;
            }    
            /* free result set */
            $result->close();
        }
         /* close connection */
        $this->dbmysql->close();
    }

    function getdatawithparam($table, $param) {
        $this->setConnection();
        $result = $this->function->extract_array_allstring_formanual($param);
        $array = array();
        $where = $result['whereset'];
        $sql = "
                 SELECT * FROM $table  $where  
               "; 

        if ($result = $this->dbmysql->query($sql)) {
            while ($row = $result->fetch_assoc()) {
                $array[] = $row;
            }
            if (is_array($array) && count($array) > 0) {
                return $array;
            } else {
                return null;
            }    
            /* free result set */
            $result->close();
        }
        /* close connection */
        $this->dbmysql->close();
    }

    function getdatawithparammaster($table, $param) {
        $this->setConnectionMaster();
        $result = $this->function->extract_array_allstring_formanual($param);
        $array = array();
        $where = $result['whereset'];
        $sql = "
                 SELECT * FROM $table  $where  
               "; 
        if ($result = $this->dbmysql->query($sql)) {
            while ($row = $result->fetch_assoc()) {
                $array[] = $row;
            }
            if (is_array($array) && count($array) > 0) {
                return $array;
            } else {
                return null;
            }    
            /* free result set */
            $result->close();
        }
        /* close connection */
        $this->dbmysql->close();
    }

    function insertdata($table, $record) {
        $this->setConnection();
        $result = $this->function->extract_array_allstring_formanual($record);
        $key = $result['key'];
        $values = $result['values'];
        $sql = "
                 INSERT INTO $table ($key) VALUES ($values)  
               ";
        $return = $this->dbmysql->query($sql);      
        $this->dbmysql->close();
        /* close connection */
        return $return;
    }

    function insertdatamaster($table, $record) {
        $this->setConnectionMaster();
        $result = $this->function->extract_array_allstring_formanual($record);
        $key = $result['key'];
        $values = $result['values'];
        $sql = "
                 INSERT INTO $table ($key) VALUES ($values)  
               ";
        $return = $this->dbmysql->query($sql);      
        $this->dbmysql->close();
        /* close connection */
        return $return;
    }

    function updatedata($table, $record, $whereset) {
        $this->setConnection();
        $resultdata = $this->function->extract_array_allstring_formanual($record);
        $resultwhere = $this->function->extract_array_allstring_formanual($whereset);
        $data = $resultdata['setdata'];
        $where = $resultwhere['whereset'];
        $sql = "
                 UPDATE $table SET $data $where
               ";
        $return = $this->dbmysql->query($sql);       
        $this->dbmysql->close();
        /* close connection */
        return $return;
    }

    function updatedatamaster($table, $record, $whereset) {
        $this->setConnectionMaster();
        $resultdata = $this->function->extract_array_allstring_formanual($record);
        $resultwhere = $this->function->extract_array_allstring_formanual($whereset);
        $data = $resultdata['setdata'];
        $where = $resultwhere['whereset'];
        $sql = "
                 UPDATE $table SET $data $where
               ";
        $return = $this->dbmysql->query($sql);       
        $this->dbmysql->close();
        /* close connection */
        return $return;
    }

    function updatedata_sec_mysql($table, $record, $whereset) {
        $this->setConnection();
        $resultdata = $this->function->extract_array_allstring_formanual($record);
        $resultwhere = $this->function->extract_array_allstring_formanual($whereset);
        $data = $resultdata['setdata'];
        $where = $resultwhere['whereset'];
        $sql = "
                UPDATE $table SET $data $where
                and id NOT IN (SELECT sec_user_id FROM ".$this->tbl_p_sec_user_ldap." WHERE isblocked = TRUE)
               ";
        $return = $this->dbmysql->query($sql);       
        $this->dbmysql->close();
        /* close connection */
        return $return;
    }
    
    function getdatawithparam_sec_mysql($table, $param) {
        $this->setConnection();
        $result = $this->function->extract_array_allstring_formanual($param);
        $array = array();
        $where = $result['whereset'];
        $sql = "
                SELECT * FROM $table  $where  
                and id NOT IN (SELECT sec_user_id FROM ".$this->tbl_p_sec_user_ldap." WHERE isblocked = TRUE)
               ";
        if ($result = $this->dbmysql->query($sql)) {
            while ($row = $result->fetch_assoc()) {
                $array[] = $row;
            }
            if (is_array($array) && count($array) > 0) {
                return $array;
            } else {
                return null;
            }    
            /* free result set */
            $result->close();
        }
        /* close connection */
        $this->dbmysql->close();
    }

}
