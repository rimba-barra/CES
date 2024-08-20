<?php

/**
 * Description of OvetimeDao
 *
 * @author MIS
 */
class Hrd_Models_Intranet_OvertimenewDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {

    public function sqlQuery($condition, $configintranet) {
        $obj = new Hrd_Models_Intranet_Configmysql();
        $config = $obj->getConfigdata($configintranet);
        $datah = $config['database'] . '.th_lembur';

        $sql = "
        SELECT * FROM (
            SELECT 
                a.project_id,
                a.pt_id,
                a.employee_id,
                a.assign_to, 
                MIN(a.lembur_dari) AS lembur_dari, 
                MAX(a.lembur_sampai) AS lembur_sampai,
                MIN(a.lembur_dari_plan) AS lembur_dari_plan, 
                MAX(a.lembur_sampai_plan) AS lembur_sampai_plan,
                SEC_TO_TIME(SUM(TIME_TO_SEC(a.jam_lembur_approve))) AS total_time, 
                SUM(TIME_TO_SEC(a.jam_lembur_approve)) / 60 / 60 AS total_dec,
                CASE WHEN a.lemburtype_id IN (1, 4) THEN 'sesudah'
                WHEN a.lemburtype_id IN (2, 5) THEN 'sebelum'
                WHEN a.lemburtype_id IN (3, 6) THEN 'libur'
                END AS lemburtype,
                a.description,
                a.hrd_check
                FROM ".$datah." th
                WHERE th.status = 'CLOSED' 
                and th.is_deleted = 0 
                and th.project_id = $project_id
                and th.pt_id = $pt_id
                GROUP BY assign_to, lemburtype, employee_id
        ) AS a";
        return $sql;
    }
    
    public function SqlCondition($project_id, $pt_id, $condition, $param) {
        $where = " WHERE ";

        //print_r($condition);
        if ($condition == 'default') {
            $where .= " a.hrd_check = 'NO'";
            return $where;
        } else if ($condition == 'filter') {
            $filter = json_decode($param);
        
            if (!empty($filter->lemburtype)) {
                $where .= " AND a.lemburtype = '$filter->lemburtype'";
            }
            if (!empty($filter->hrd_checked)) {
                $where .= " AND a.hrd_check = '$filter->hrd_checked'";
            }
            if (!empty($filter->employee_id)) {
                $where .= " AND a.assign_to = $filter->employee_id";
            }
            
            if (!empty($filter->fromdate)) {
                $where .= " AND a.lembur_dari BETWEEN '$filter->fromdate 00:00:00'  AND '$filter->untildate 23:59:59' ";
            }

            return $where;
        }
    }
    
    public function checkDays($date) {        
        $inweek = date('w', strtotime($date));
        $array_hari = array('Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu');
        $hari = $array_hari[$inweek];
        return $hari;
    }

    public function getAll($project_id, $pt_id, $condition, $configintranet, $limit, $start, $param) {
        $obj = new Hrd_Models_Intranet_Configmysql();
        $config = $obj->getConfigdata($configintranet);
        $setup = new Hrd_Models_General_Setup();
        $obj_overtimeheader = new Hrd_Models_Overtime_Header();
        $dao_overtime = new Hrd_Models_Overtime_Dao();

        $mysqlcon = new mysqli(
                $config['host'], $config['user'], $config['password'], $config['database'], $config['port']
        );
        if ($mysqlcon->connect_error) {
            die("Connection failed: " . $mysqlcon->conneact_error);
            return null;
        } else {
            
            $datah = $config['database'] . '.th_lembur';
            /*
            $sql = "
            SELECT * FROM (
                SELECT 
                    GROUP_CONCAT(lembur_id SEPARATOR ', ') AS lembur_id,
                    project_id,
                    pt_id,
                    employee_id,
                    assign_to, 
                    MIN(a.lembur_dari) AS lembur_dari, 
                    MAX(a.lembur_sampai) AS lembur_sampai,
                    MIN(a.lembur_dari_plan) AS lembur_dari_plan, 
                    MAX(a.lembur_sampai_plan) AS lembur_sampai_plan,
                    SEC_TO_TIME(SUM(TIME_TO_SEC(a.jam_lembur_approve))) AS total_time, 
                    SUM(TIME_TO_SEC(a.jam_lembur_approve)) / 60 / 60 AS total_dec,
                    CASE WHEN a.lemburtype_id IN (1) THEN 'sebelum'
                    WHEN a.lemburtype_id IN (2, 5) THEN 'sesudah'
                    WHEN a.lemburtype_id IN (3, 6) THEN 'libur'
                    WHEN a.lemburtype_id IN (4) THEN 'liburpendek'
                    END AS lemburtype,
                    GROUP_CONCAT(description SEPARATOR ', ') AS description,
                    hrd_check,
                    a.status,
                    SUBSTRING( SEC_TO_TIME( SUM( TIME_TO_SEC( IFNULL(a.jam_lembur_approve,'00:00:00') ) ) ), 1, 8) AS jam_lembur_approve,
                    tgl_close
                    FROM ".$datah." a
                    WHERE a.is_deleted = 0 
                    and a.project_id = $project_id
                    and a.pt_id = $pt_id
                    GROUP BY assign_to, lemburtype, employee_id, hrd_check, DATE(a.lembur_dari), status
            ) AS b";
            */
            //added by mike 2023-05-11 | tambah tipe baru 6 = libur pendek
            //WHEN a.lemburtype_id IN (2, 5) THEN 'sesudah'
            $sql = "
            SELECT * FROM (
                SELECT 
                    lembur_id,
                    project_id,
                    pt_id,
                    employee_id,
                    assign_to, 
                    a.lembur_dari AS lembur_dari, 
                    a.lembur_sampai AS lembur_sampai,
                    a.lembur_dari_plan AS lembur_dari_plan, 
                    a.lembur_sampai_plan AS lembur_sampai_plan,
                    TIME_TO_SEC(a.jam_lembur_approve) AS total_time, 
                    TIME_TO_SEC(a.jam_lembur_approve) / 60 / 60 AS total_dec,
                    CASE WHEN a.lemburtype_id IN (1) THEN 'sebelum'
                    WHEN a.lemburtype_id IN (2) THEN 'sesudah'
                    WHEN a.lemburtype_id IN (3, 6) THEN 'libur'
                    WHEN a.lemburtype_id IN (4) THEN 'liburpendek'
                    WHEN a.lemburtype_id IN (5) THEN 'liburnasionalpendek'
                    END AS lemburtype,
                    description,
                    hrd_check,
                    a.status,                    
                    SUBSTRING( SEC_TO_TIME(TIME_TO_SEC( IFNULL(a.jam_lembur_approve,'00:00:00'))), 1, 8) AS jam_lembur_approve,
                    tgl_close
                    FROM ".$datah." a
                    WHERE a.is_deleted = 0 
                    and a.project_id = $project_id
                    and a.pt_id = $pt_id
            ) AS b";
            $where = " WHERE lembur_dari is not null ";
            /*
            a.status = 'CLOSED' 
                    and
             * 
             */
            
            //print_r($condition);
            if ($condition == 'default') {
                $where .= " b.hrd_check = 'NO'";
            } else if ($condition == 'filter') {
                $filter = json_decode($param);

                if (!empty($filter->status)) {
                    
                    if($filter->status == 'CONFIRM'){
                        $filter->status = 'REPORT';
                    }
                    
                    $where .= " AND b.status = '$filter->status'";
                }
                
                if (!empty($filter->lemburtype)) {
                    $where .= " AND b.lemburtype = '$filter->lemburtype'";
                }
                if (!empty($filter->hrd_checked)) {
                    $where .= " AND b.hrd_check = '$filter->hrd_checked'";
                }
                if (!empty($filter->employee_id)) {
                    $where .= " AND b.assign_to = $filter->employee_id";
                }

                if (!empty($filter->fromdate)) {
                    $where .= " AND b.lembur_dari BETWEEN '$filter->fromdate 00:00:00'  AND '$filter->untildate 23:59:59' ";
                }
            }
            
            // edit by wulan sari 20181215
            $mysqlquery = mysqli_query($mysqlcon, $sql . ' ' . $where . ' order by lembur_dari');
            //echo $sql . ' ' . $where . ' order by lembur_dari';
            $mysqlcount = mysqli_num_rows($mysqlquery);
            
            $mysqlquery = mysqli_query($mysqlcon, $sql . ' ' . $where . ' order by lembur_dari LIMIT '.$limit.' OFFSET '.$start);            
            // end by wulan sari 20181215
            
            $mydata = array();
            while ($myrow = $mysqlquery->fetch_array(MYSQLI_ASSOC)) {
                $rowemployee = $this->getEmployee($myrow['assign_to']);
                $rowemployeeapprove = $this->getEmployee($myrow['employee_id']);
                $date = date('Y-m-d', strtotime($myrow['lembur_dari']));
                $month = date('m', strtotime($myrow['lembur_dari']));
                $year = date('Y', strtotime($myrow['lembur_dari']));
                
                $time_in_plan = date('H:i:s', strtotime($myrow['lembur_dari_plan']));
                $time_out_plan = date('H:i:s', strtotime($myrow['lembur_sampai_plan']));
                $time_in = date('H:i:s', strtotime($myrow['lembur_dari']));
                $time_out = date('H:i:s', strtotime($myrow['lembur_sampai']));      
                
                if ($rowemployee) {//cek apakah data karyawan di ces ada atau tidak
                    $obj_overtimeheader->setArrayTable(array("employee_employee_id"=>$myrow['assign_to'],"date"=>$date));
                    //$obj_overtimeheader->setArrayTable(array("employee_employee_id" => 895, "date" => $date));
                    $rowthabsent = $dao_overtime->getShiftInformation($obj_overtimeheader);

                    if (!empty($rowthabsent[0])) {//cek ada absensinya atau tidak di bulan dan tahunnya
                        $dataabsensi = $rowthabsent[0][0];
                        $myrow['department'] = $rowemployee['department_code'] . '-' . $rowemployee['department_department'];
                        $myrow['employee_id_ces'] = $rowemployee['employee_id'];
                        $myrow['employee_nik'] = $rowemployee['employee_nik'];
                        $myrow['employee_name'] = $rowemployee['employee_name'];
                        $myrow['deptcode'] = $rowemployee['department_code'];
                        $myrow['overtimedate'] = $date;
                        $myrow['days'] = $this->checkDays($date);
                        
                        //start row absensi
                        $myrow['shifttype'] = $dataabsensi['shifttype'];
                        $myrow['shifttype_id'] = $dataabsensi['shifttype_id'];
                        $myrow['absent_id'] = $dataabsensi['absent_id'];
                        $myrow['absentdetail_id'] = $dataabsensi['absentdetail_id'];
                        $myrow['holyday'] = $dataabsensi['holyday'];
                        $myrow['different_day'] = $dataabsensi['different_day'];
                        $myrow['in_time'] = $dataabsensi['in_time'];
                        $myrow['out_time'] = $dataabsensi['out_time'];
                        $myrow['time_in_absensi'] = $dataabsensi['time_in'];
                        $myrow['time_out_absensi'] = $dataabsensi['time_out'];
                        $myrow['time_in'] = $time_in;
                        $myrow['time_out'] = $time_out;
                        $myrow['time_in_plan'] = $time_in_plan;
                        $myrow['time_out_plan'] = $time_out_plan;
                        $myrow['description'] = preg_replace('/[^A-Za-z0-9\-]/', ' ', $myrow['description']);
                        //end row absensi

                        $myrow['department_id_ces'] = $rowemployee['department_id'];
                        $myrow['department'] = $rowemployee['department_department'];
                        $myrow['approve_by'] = $rowemployeeapprove['employee_name'];
                        $myrow['hire_date'] = $rowemployee['hire_date'];
                        $myrow['position_id'] = $rowemployee['position_id'];
                        $myrow['position'] = $rowemployee['position_position'];
                        $myrow['position_description'] = $rowemployee['position_description'];
                        $myrow['configintranet'] = $configintranet;
                        $myrow['employee_employee_id'] = $myrow['assign_to'];
                        $myrow['nik'] = $rowemployee['employee_nik'];
                        $myrow['name'] = $rowemployee['employee_name'];
                        $myrow['start_date'] = $myrow['lembur_dari'];
                        $myrow['end_date'] = $myrow['lembur_sampai'];
                        $myrow['employee_id_intranet'] = $myrow['employee_id'];
                        $myrow['tgl_close'] = $myrow['tgl_close'];
                        $mydata[] = $myrow;
                    }
                }
            }
            $return = array(array(array("totalRow" => $mysqlcount)), $mydata);
            return $return;
            mysqli_free_result($mysqlquery);
            mysqli_close($mysqlcon);
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
    public function updateStatus($configintranet, $id) {
        $obj = new Hrd_Models_Intranet_Configmysql();
        $config = $obj->getConfigdata($configintranet);
        $mysqlcon = new mysqli(
                $config['host'], $config['user'], $config['password'], $config['database'], $config['port']
        );
        if ($mysqlcon->connect_error) {
            die("Connection failed: " . $mysqlcon->conneact_error);
            return null;
        } else {
            $table = $config['database'] . ".th_lembur";
            mysqli_query($mysqlcon, "UPDATE $table SET hrd_check='YES' WHERE lembur_id=$id");
            mysqli_close($mysqlcon);
        }
    }
    
    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        
    }
    
    public function deleteovertimeintranet($configintranet, $id) {
        $obj = new Hrd_Models_Intranet_Configmysql();
        $config = $obj->getConfigdata($configintranet);
        $mysqlcon = new mysqli(
                $config['host'], $config['user'], $config['password'], $config['database'], $config['port']
        );
        if ($mysqlcon->connect_error) {
            echo 'sini';
            die("Connection failed: " . $mysqlcon->connect_error);
            return null;
        } else {
            $table = $config['database'] . ".th_lembur";
            mysqli_query($mysqlcon, "UPDATE $table SET is_deleted=1 WHERE lembur_id=$id");
            mysqli_close($mysqlcon);
            return 1;
        }
    }
    
    // edited by wulan sari 20190320
    public function getAllApi($project_id, $pt_id, $page, $limit, $start, $param) {
        $filter = json_decode($param);
        $hrd_checked = !empty($filter->hrd_checked)? $filter->hrd_checked : '';
        $status = !empty($filter->status)? $filter->status : '';
        $fromdate = !empty($filter->fromdate)? $filter->fromdate : '';
        $untildate = !empty($filter->untildate)? $filter->untildate : '';
        $description = !empty($filter->comment)? $filter->comment : '';
        $lemburtype = !empty($filter->lemburtype)? $filter->lemburtype : '';
        $lembur_id = !empty($filter->lembur_id)? $filter->lembur_id : '';
        $hasil = $this->dbTable->SPExecute('sp_overtime_by_api_read', $page, $limit, $project_id, $pt_id, $hrd_checked, $status, $fromdate, $untildate, $description, $lemburtype, $lembur_id);
        return $hasil;
    }
    
    public function updateStatusApi($id, $admin) {
        $hasil = $this->dbTable->SPExecute('sp_overtime_by_api_update', $admin, $id);
        return $hasil;
    }    
    // end edited by wulan sari 20190320
}

?>
