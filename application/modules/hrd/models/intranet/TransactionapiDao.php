<?php

/**
 * Description of TransactionapiDao
 *
 * @author MIS - Ahmad Riadi
 */
class Hrd_Models_Intranet_TransactionapiDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {

    public $setup = null;
    public $project_id = null;
    public $pt_id = null;
    public $tablename = null;

    public function __construct() {
        parent::__construct();
        $this->setup = new Hrd_Models_General_Setup();
        $this->project_id = $this->setup->_project_id;
        $this->pt_id = $this->setup->_pt_id;
        $this->tablename = 't_transaction_by_api';
    }

    // public function sqldata() {
    // added by Michael 2021.05.19
    public function sqldata($data) { 
    // end added by Michael 2021.05.19 

        $m_employee = $this->setup->_m_employee;
        $m_department = $this->setup->_m_department;
        $m_absenttype = $this->setup->_m_absenttype;
        $th_absent = $this->setup->_th_absent;
        $td_absentdetail = $this->setup->_td_absentdetail;

        // $project_id = $this->project_id;
        // $pt_id = $this->pt_id;

        // added by Michael 2021.05.19
        $project_id = $data['project_id'];
        $pt_id = $data['pt_id'];
        // added by Michael 2021.05.19
        
        $sql = "
                SELECT 
                  a.*,
                  b.employee_name,b.employee_nik,
                  c.department,c.code as deptcode,
                  d.absenttype,
                  case  when a.tipe_cuti=1 then ''C-THN'' 
                        when  a.tipe_cuti=2 then ''C-BSR'' 
                        when  a.tipe_cuti=3 then ''C-INS'' end as leavetype,
                  case  when a.tipe_tlk=1 then ''Internal''                         
                        when a.tipe_tlk=2 then ''External'' end as tlktype      
                FROM $this->tablename a
                LEFT JOIN $m_employee b on a.employee_id = b.employee_id
                LEFT JOIN $m_department c on b.department_id = c.department_id
                LEFT JOIN $m_absenttype d on d.code = a.tipe_izin
                WHERE 
                    a.deleted=0
                    AND a.project_id=".$project_id."
                    AND a.pt_id=".$pt_id."

                ";
        
        return $sql;
    }

    public function conditiondata($condition, $param = null) {
        $where = '';
        if ($condition == 'default') {
            $where .= ' AND a.is_process=0  ';
            
            // added by Wulan Sari 2018.05.07
            $where .= ' AND a.is_approve=1  '; 
            $where .= ' AND a.is_cancel=0  '; 
            
            
        } else {
            $id = $param['transaction_id'];
            $employee_id = $param['employee_id'];
            $for_transaction = $param['for_transaction'];
            $departement_id = $param['department_id'];
            $fromdate = $param['fromdate'];
            $untildate = $param['untildate'];
            $is_approve = $param['is_approve'];
            $is_canceled = $param['is_canceled']; // added by Wulan Sari 2019.05.07
            $is_process = $param['is_process']; // added by Wulan Sari 2019.10.05

            $where .= '  ';
            if ($param['transaction_id'] > 0) {
                $where .= " AND a.transaction_id=$id ";
            }
            if ($param['employee_id'] > 0) {
                $where .= " AND a.employee_id=$employee_id ";
            }
            if ($param['department_id'] > 0) {
                $where .= " AND b.department_id=$departement_id ";
            }
            if (!empty($param['for_transaction'])) {
                $where .= " AND a.for_transaction=''$for_transaction'' ";
            }
            if (!empty($fromdate)) {
                $where .= " AND a.daritanggal >=''$fromdate'' ";
            }
            if (!empty($untildate)) {
                $where .= " AND a.daritanggal <=''$untildate'' ";
            }
                        
            // added by Wulan Sari 2018.05.07
            if (!empty($is_approve)) {
                $where .= " AND a.is_approve = 1 ";
            } else {
                $where .= " AND a.is_approve = 0 ";                
            }
            if (!empty($is_canceled)) {
                $where .= " AND a.is_cancel = 1 ";
            } else {
                $where .= " AND a.is_cancel = 0 ";                
            }
            // end added by Wulan Sari 2018.05.07
            // 
            // added by Wulan Sari 2019.10.05
            if (!empty($is_process)) {
                $where .= " AND a.is_process = 1 ";
            } else {
                $where .= " AND a.is_process = 0 ";                
            }
            
        }
        return $where;
    }

    // public function getFilterdata($param, $limit, $start) {
    // added by Michael 2021.05.19 
    public function getFilterdata($param, $limit, $start, $param_data) {
    // end added by Michael 2021.05.19 

        // $sql = $this->sqldata();

        // added by Michael 2021.05.19 
        $sql = $this->sqldata($param_data);
        // end added by Michael 2021.05.19

        $where = $this->conditiondata('filter', $param);
        
        // cari total data
        $query = $sql . ' ' . $where; //echo $query; exit;
        //echo $query; exit;
        $result = $this->setup->customefromquery($query);
        $count = count($result[0]);
        
        $query = $sql . ' ' . $where . ' order by transaction_date desc OFFSET '.$start.' ROWS FETCH NEXT '.$limit.' ROWS ONLY'; 
        //echo $query; exit;
        $result = $this->setup->customefromquery($query);
        if (!empty($result[0])) {
            $counter = $count;
            $data = $result[0];
            // return $this->returnData($counter, $data);

            // added by Michael 2021.05.19 
            return $this->returnData($counter, $data, $param_data);
            // end added by Michael 2021.05.19 
        } else {
            return array(array(array("totalRow" => 0)), array());
        }
    }

    // public function getAll($limit, $start) {
    // added by Michael 2021.05.19 
    public function getAll($limit, $start, $param_data) {
    // end added by Michael 2021.05.19 

        // $sql = $this->sqldata();

        // added by Michael 2021.05.19 
        $sql = $this->sqldata($param_data);
        // end added by Michael 2021.05.19

        $where = $this->conditiondata('default');
        
        // cari total data
        $query = $sql . ' ' . $where; //echo $query; exit;
        $result = $this->setup->customefromquery($query);
        $count = count($result[0]);
        
        $query = $sql . ' ' . $where . ' order by transaction_date desc OFFSET '.$start.' ROWS FETCH NEXT '.$limit.' ROWS ONLY';

        $result = $this->setup->customefromquery($query);
        if (!empty($result[0])) {
            $counter = $count;
            $data = $result[0];

            // return $this->returnData($counter, $data);

            // added by Michael 2021.05.19 
            return $this->returnData($counter, $data, $param_data);
            // end added by Michael 2021.05.19 

        } else {
            return array(array(array("totalRow" => 0)), array());
        }
    }

    // public function returnData($counter, $data) {
    // added by Michael 2021.05.19 
    public function returnData($counter, $data, $param_data) {
    // added by Michael 2021.05.19 

        $arraydata = array();
        foreach ($data as $row) {
            $row['employee_employee_id'] = $row['employee_id'];
            $row['start_date'] = $row['daritanggal'];
            $row['end_date'] = $row['sampaitanggal'];
            $row['keterangan'] = preg_replace('/[^A-Za-z0-9\-]/', ' ', $row['keterangan']);

            $date = $row['daritanggal'];
            $employee_id = $row['employee_id'];
            
            // $datathabsent = $this->get_thAbsent($employee_id, $date);
            // added by Michael 2021.05.19 
            $datathabsent = $this->get_thAbsent($employee_id, $date, $param_data);
            // added by Michael 2021.05.19

            if ($datathabsent) {//cek data th absent
                $absent_id = $datathabsent['absent_id'];
                $datatdabsent = $this->get_tdAbsent($absent_id, $date);
                if ($datatdabsent) { //cek data td absent   
                    if ($row['for_transaction'] == 'izin' || $row['for_transaction'] == 'cuti') {
                        if ($row['for_transaction'] == 'izin') {
                            $absenttype = $this->setup->getdata_absenttype_bycode($row['tipe_izin']);
                        } else if ($row['for_transaction'] == 'cuti') {
                            //$absenttype = $this->setup->getdata_absenttype_bycode($row['tipe_cuti']); //  commment by Wulan Sari 2018.04.27
                            $absenttype = $this->setup->getdata_absenttype_bycode($row['leavetype']); //  added by Wulan Sari 2018.04.27
                        }
                        $row['absenttypegroup_absenttypegroup_id'] = $absenttype['absenttypegroup_id'];
                        $row['absenttype_absenttype_id'] = $absenttype['absenttype_id'];
                        $row['absenttype_code'] = $absenttype['code'];
                    }
                    
                    $row['absentdetail_id'] = $datatdabsent['absentdetail_id'];
                    $arraydata[] = $row;
                }
            }
        }
        $return = array(array(array("totalRow" => $counter)), $arraydata);
        return $return;
    }

    // public function get_thAbsent($employee_id, $date) {
    // added by Michael 2021.05.19 
    public function get_thAbsent($employee_id, $date, $param_data) {
    // end added by Michael 2021.05.19 

        $tmp_date = explode("-", $date);
        $year = $tmp_date[0];
        $month = $tmp_date[1];
        $day = $tmp_date[2];

        $resultthabsent = $this->setup->getdata_standard_bytable($this->setup->_th_absent, array(
            // "project_id" => $this->setup->_project_id,
            // "pt_id" => $this->setup->_pt_id,

            // added by Michael 2021.05.19
            "project_id" => $param_data['project_id'],
            "pt_id" => $param_data['pt_id'], 
            // end added by Michael 2021.05.19 

            "employee_id" => $employee_id,
            "month" => $month,
            "year" => $year,
            "month" => $month,
            "deleted" => '0',
        ));

        if (!empty($resultthabsent[0])) {
            $rowthabsent = $resultthabsent[0][0];
            return $rowthabsent;
        } else {
            return null;
        }
    }

    public function get_tdAbsent($absent_id, $date) {
        $resulttdabsent = $this->setup->getdata_standard_bytable($this->setup->_td_absentdetail, array(
            "absent_id" => $absent_id,
            "date" => $date,
            "deleted" => '0',
        ));
        if (!empty($resulttdabsent[0])) {
            return $resulttdabsent[0][0];
        } else {
            return null;
        }
    }

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        
    }

}

?>
