<?php

/**
 * Description of AbsentDao
 *
 * @author MIS
 */
class Hrd_Models_AllemployeeDao extends Box_Models_App_AbDao {


    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Master_Allemployee $params, $session) {    

        $hasil = $this->dbTable->SPExecute('sp_allemployee_access_read',
        $r->getPage(),
        $r->getLimit(),
        $params->getSubholding_id(),
        $params->getProject_id(),
        $params->getPt_id(),
        $params->getEmployee_name(),
        $params->getSex(),
        $params->getAge_bot(),
        $params->getAge_top(),
        $params->getUsiaKerjaBot(),
        $params->getUsiaKerjaTop(),
        $params->getMasaKerjaBot(),
        $params->getMasaKerjaTop(),
        $params->getIsPensiun(),
        $params->getLast_education(),
        $params->getBanding_id(),
        $params->getEmployeestatus_id(),
        $params->getEmployee_active(),
        $params->getHire_date_start(),
        $params->getHire_date_end(),
        $params->getAssignation_date_start(),
        $params->getAssignation_date_end(),
        $params->getContractend_date_start(),
        $params->getContractend_date_end(),
        $params->getNonactive_date_start(),
        $params->getNonactive_date_end(),
        //tambah ini untuk validasi hak akses
        $session->getUserId(),
        $session->getGroupId()
        );

        if($hasil){
            $temp_hasil = null;
            $temp_hasil[] = $hasil[0];
            foreach($hasil[1] as $key => $row){
                if($row['employeestatus_id'] == '1'){

                    if($row['is_kompensasi'] == '1'){
                        $is_kompensasi = 'Dapat';
                    }elseif($row['is_kompensasi'] == '0'){
                        $is_kompensasi = 'Tidak Dapat';
                    }else{
                        $is_kompensasi = null;
                    }

                    if($row['employee_active'] == '0' && !empty($row['nonactive_date'])){
                        $now = date('Y-m-d', strtotime($row['nonactive_date']));
                    }else{
                        $now = date('Y-m-d');
                    }

                    if($row['usia_kerja_start_date']){
                        $usia_kerja_start_date = date('Y-m-d', strtotime($row['usia_kerja_start_date']));

                        $diff_usia = abs(strtotime($now) - strtotime($usia_kerja_start_date));
                        $years_usia = floor($diff_usia / (365*60*60*24));
                        $months_usia = floor(($diff_usia - $years_usia * 365*60*60*24) / (30*60*60*24));
                        $days_usia = floor(($diff_usia - $years_usia * 365*60*60*24 - $months_usia*30*60*60*24)/ (60*60*24));           
                        $year_in_services_usia = "$years_usia tahun $months_usia bulan $days_usia hari (sampai: $now)";
                    }else{
                        $usia_kerja_start_date = null;
                        $year_in_services_usia = null;
                    }

                    if($row['masa_kerja_start_date']){
                        $masa_kerja_start_date = date('Y-m-d', strtotime($row['masa_kerja_start_date']));
                        
                        $diff_masa = abs(strtotime($now) - strtotime($masa_kerja_start_date)); 
                        $years_masa = floor($diff_masa / (365*60*60*24));
                        $months_masa = floor(($diff_masa - $years_masa * 365*60*60*24) / (30*60*60*24));
                        $days_masa = floor(($diff_masa - $years_masa * 365*60*60*24 - $months_masa*30*60*60*24)/ (60*60*24));           
                        $year_in_services_masa = "$years_masa tahun $months_masa bulan $days_masa hari (sampai: $now)";
                    }else{
                        $masa_kerja_start_date = null;
                        $year_in_services_masa = null;
                    }

                    $pensiun = null;
                    
                }elseif($row['employeestatus_id'] == '2' || $row['employeestatus_id'] == '3' || $row['employeestatus_id'] == '7'){

                    $is_kompensasi = null;

                    if($row['employee_active'] == '0' && !empty($row['nonactive_date'])){
                        $now = date('Y-m-d', strtotime($row['nonactive_date']));
                    }else{
                        $now = date('Y-m-d');
                    }

                    if($row['usia_kerja_start_date']){
                        $usia_kerja_start_date = date('Y-m-d', strtotime($row['usia_kerja_start_date']));

                        $diff_usia = abs(strtotime($now) - strtotime($usia_kerja_start_date));
                        $years_usia = floor($diff_usia / (365*60*60*24));
                        $months_usia = floor(($diff_usia - $years_usia * 365*60*60*24) / (30*60*60*24));
                        $days_usia = floor(($diff_usia - $years_usia * 365*60*60*24 - $months_usia*30*60*60*24)/ (60*60*24));           
                        $year_in_services_usia = "$years_usia tahun $months_usia bulan $days_usia hari (sampai: $now)";
                    }else{
                        $usia_kerja_start_date = null;
                        $year_in_services_usia = null;
                    }

                    $masa_kerja_start_date = null;
                    $year_in_services_masa = null;

                    if($row['is_pensiun'] == 1){
                        $pensiun = 'Pensiun';
                    }else{
                        $pensiun = null;
                    }
                    
                }else{
                    $year_in_services_usia = null;
                    $year_in_services_masa = null;
                    $pensiun = null;
                }
                $temp_hasil[1][$key] = $row;
                $temp_hasil[1][$key]['usia_kerja_count'] = $year_in_services_usia;
                $temp_hasil[1][$key]['masa_kerja_count'] = $year_in_services_masa;
                $temp_hasil[1][$key]['is_pensiun'] = $pensiun;
            }
            $hasil = null;
            $hasil = $temp_hasil;
        }
        
        return $hasil;
    }

    public function getAllEmployeeExport($params, $session) {  
        $hasil = $this->dbTable->SPExecute('sp_allemployee_access_read', 
            1, 
            99999, 
            implode(",",$params['subholding_id']),
            implode(",",$params['project_id']),
            implode(",",$params['pt_id']),
            $params['employee_name'],
            $params['sex'],
            $params['age_bot'],
            $params['age_top'],
            $params['usia_kerja_bot'],
            $params['usia_kerja_top'],
            $params['masa_kerja_bot'],
            $params['masa_kerja_top'],
            $params['is_pensiun'],
            implode(",",$params['last_education']),
            // $params['banding_id'],
            // $params['employeestatus_id'],
            //updated by anas 19042022
            implode(",",$params['banding_id']),
            implode(",",$params['employeestatus_id']),
            //end updated by anas
            $params['employee_active'],
            $params['hire_date_start'],
            $params['hire_date_end'],
            $params['assignation_date_start'],
            $params['assignation_date_end'],
            $params['contractend_date_start'],
            $params['contractend_date_end'],
            $params['nonactive_date_start'],
            $params['nonactive_date_end'],
            //tambah ini untuk validasi hak akses
            $session->getUserId(),
            $session->getGroupId()
        );

        if($hasil){
            $temp_hasil = null;
            $temp_hasil[] = $hasil[0];
            foreach($hasil[1] as $key => $row){
                if($row['employeestatus_id'] == '1'){

                    if($row['is_kompensasi'] == '1'){
                        $is_kompensasi = 'Dapat';
                    }elseif($row['is_kompensasi'] == '0'){
                        $is_kompensasi = 'Tidak Dapat';
                    }else{
                        $is_kompensasi = null;
                    }

                    if($row['employee_active'] == '0' && !empty($row['nonactive_date'])){
                        $now = date('Y-m-d', strtotime($row['nonactive_date']));
                    }else{
                        $now = date('Y-m-d');
                    }

                    if($row['usia_kerja_start_date']){
                        $usia_kerja_start_date = date('Y-m-d', strtotime($row['usia_kerja_start_date']));

                        $diff_usia = abs(strtotime($now) - strtotime($usia_kerja_start_date));
                        $years_usia = floor($diff_usia / (365*60*60*24));
                        $months_usia = floor(($diff_usia - $years_usia * 365*60*60*24) / (30*60*60*24));
                        $days_usia = floor(($diff_usia - $years_usia * 365*60*60*24 - $months_usia*30*60*60*24)/ (60*60*24));           
                        $year_in_services_usia = "$years_usia tahun $months_usia bulan $days_usia hari (sampai: $now)";
                    }else{
                        $usia_kerja_start_date = null;
                        $year_in_services_usia = null;
                    }

                    if($row['masa_kerja_start_date']){
                        $masa_kerja_start_date = date('Y-m-d', strtotime($row['masa_kerja_start_date']));
                        
                        $diff_masa = abs(strtotime($now) - strtotime($masa_kerja_start_date)); 
                        $years_masa = floor($diff_masa / (365*60*60*24));
                        $months_masa = floor(($diff_masa - $years_masa * 365*60*60*24) / (30*60*60*24));
                        $days_masa = floor(($diff_masa - $years_masa * 365*60*60*24 - $months_masa*30*60*60*24)/ (60*60*24));           
                        $year_in_services_masa = "$years_masa tahun $months_masa bulan $days_masa hari (sampai: $now)";
                    }else{
                        $masa_kerja_start_date = null;
                        $year_in_services_masa = null;
                    }

                    $pensiun = null;
                    
                }elseif($row['employeestatus_id'] == '2' || $row['employeestatus_id'] == '3' || $row['employeestatus_id'] == '7'){

                    $is_kompensasi = null;

                    if($row['employee_active'] == '0' && !empty($row['nonactive_date'])){
                        $now = date('Y-m-d', strtotime($row['nonactive_date']));
                    }else{
                        $now = date('Y-m-d');
                    }

                    if($row['usia_kerja_start_date']){
                        $usia_kerja_start_date = date('Y-m-d', strtotime($row['usia_kerja_start_date']));

                        $diff_usia = abs(strtotime($now) - strtotime($usia_kerja_start_date));
                        $years_usia = floor($diff_usia / (365*60*60*24));
                        $months_usia = floor(($diff_usia - $years_usia * 365*60*60*24) / (30*60*60*24));
                        $days_usia = floor(($diff_usia - $years_usia * 365*60*60*24 - $months_usia*30*60*60*24)/ (60*60*24));           
                        $year_in_services_usia = "$years_usia tahun $months_usia bulan $days_usia hari (sampai: $now)";
                    }else{
                        $usia_kerja_start_date = null;
                        $year_in_services_usia = null;
                    }

                    $masa_kerja_start_date = null;
                    $year_in_services_masa = null;

                    if($row['is_pensiun'] == 1){
                        $pensiun = 'Pensiun';
                    }else{
                        $pensiun = null;
                    }
                    
                }else{
                    $year_in_services_usia = null;
                    $year_in_services_masa = null;
                    $pensiun = null;
                }
                $temp_hasil[1][$key] = $row;
                $temp_hasil[1][$key]['usia_kerja_count'] = $year_in_services_usia;
                $temp_hasil[1][$key]['masa_kerja_count'] = $year_in_services_masa;
                $temp_hasil[1][$key]['is_kompensasi'] = $is_kompensasi;
                $temp_hasil[1][$key]['is_pensiun'] = $pensiun;
            }
            $hasil = null;
            $hasil = $temp_hasil;
        }

        if (!empty($hasil[0])) {
            return $hasil[1];
        } else {
            return false;
        }
    }

    public function getAllExportList() {    
        $hasil = $this->dbTable->SPExecute('sp_allemployee_exportlist_read');

        return $hasil;
    }
}

?>
