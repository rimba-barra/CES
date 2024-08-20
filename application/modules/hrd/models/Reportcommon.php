<?php

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Hrd_Models_Reportcommon extends Zend_Db_Table_Abstract {

    private $setting = null;

    function init() {
        date_default_timezone_set('Asia/Jakarta');
        $this->_curdate = date('Y-m-d');
        $this->_curdatetime = date('Y-m-d H:i:s');
        $this->setting = new Hrd_Models_General_Setup();
    }

    function RoutesAllRequest($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'read';
                $x = explode(".", $this->setting->_param['reportfile']);
                $reportfile = $x[0];
                switch ($reportfile) {
                    case 'HrdLemburDetail':
                        $return = $this->getdata_HrdLemburDetail($param);
                        $data = $return;
                        break;
                    case 'HrdLemburRekap':
                        $return = $this->getdata_HrdLemburRekap($param);
                        $data = $return;
                        break;
                    case 'Absentreportformate':
                        $return = $this->getdata_Absentreportformate($param);
                        $data = $return;
                        break;   
                    case 'HrdCutiHak':
                        $return = $this->getdata_HrdCutiHak($param);
                        $data = $return;
                        break;                  
                    case 'HrdCutiTransaksi':
                        $return = $this->getdata_HrdCutiTransaksi($param);
                        $data = $return;
                        break;                    
                    case 'HrdUangKehadiran':
                        $return = $this->getdata_HrdUangKehadiran($param);
                        $data = $return;
                        break;                        
                    case 'HrdUangKehadiranpt':
                        $return = $this->getdata_HrdUangKehadiran($param);
                        $data = $return;
                        break;                             
                    case 'CompetencyMatrix':
                        $return = $this->getdata_CompetencyMatrix($param);
                        $data = $return;
                        break;                               
                    case 'HrdReportapprovalmatrix':
                        $return = $this->getdata_HrdReportapprovalmatrix($param);
                        $data = $return;
                        break;      
                    case 'Absentreportformata':
                        $return = $this->getdata_Absentreportformata($param);
                        $data = $return;
                        break;   					
                    case 'Absentreportizinpm':
                        $return = $this->getdata_Absentreportizinpm($param);
                        $data = $return;
                        break;  
                    case 'HrdAbsentHarian':
                        $return = $this->getdata_HrdAbsentHarian($param);
                        $data = $return;
                        break;  
                    case 'HrdAbsentHarianMhl':
                        $return = $this->getdata_HrdAbsentHarianMhl($param);
                        $data = $return;
                        break;  

                    // added by Michael 2021.08.24 
                    case 'HrdSickLeave':
                        $return = $this->getdata_HrdSickLeave($param);
                        $data = $return;
                        break; 
                    case 'HrdSickLeaveAttach':
                        $return = $this->getdata_HrdSickLeaveAttach($param);
                        $data = $return;
                        break; 
                    //end added by Michael 2021.08.24 

                    //added by Michael 2021.11.22
                    case 'HrdSanksiKeterlambatan':
                        $return = $this->getdata_HrdSanksiKeterlambatan($param);
                        $data = $return;
                        break; 
                    case 'HrdPermit':
                        $return = $this->getdata_HrdPermit($param);
                        $data = $return;
                        break; 
                    //end added by Michael 2021.11.22


                    case 'HrdAbsentHarianb':
                        $return = $this->getdata_HrdAbsentHarianb($param);
                        $data = $return;
                        break;  
                    case 'HrdAbsentTerlambat':
                        $return = $this->getdata_HrdAbsentTerlambat($param);
                        $data = $return;
                        break;  	
                    case 'HrdLemburTransaksi':
                        $return = $this->getdata_HrdLemburTransaksi($param);
                        $data = $return;
                        break;  
                    case 'HrdLemburTransaksiRekap':
                        $return = $this->getdata_HrdLemburTransaksiRekap($param);
                        $data = $return;
                        break; 
                    case 'HrdLemburTransaksiFaktor':
                        $return = $this->getdata_HrdLemburTransaksiFaktor($param);
                        $data = $return;
                        break;  
                    case 'HrdLemburTransaksiFaktorRekap':
                        $return = $this->getdata_HrdLemburTransaksiFaktorRekap($param);
                        $data = $return;
                        break;  
                    case 'HrdKehadiran':
                        $return = $this->getdata_HrdKehadiran($param);
                        $data = $return;
                        break;  
                    case 'HrdLaporanpengobatan':
                        $return = $this->getdata_HrdLaporanpengobatan($param);
                        $data = $return;
                        break;  		
                    //added by anas 21122021 - untuk stimulsoft
                    case 'HrdAbsentHarianMhlRekap':
                        $return = $this->getdata_HrdAbsentHarianMhlRekap($param);
                        $data = $return;
                        break; 
                    //end added by anas	
                    case 'PersonalDocument':
                        $return = $this->getdata_PersonalDocument($param);
                        $data = $return;
                        break;    

                    //added by anas 06022024
                    case 'PrivacyPolicy':
                        $return = $this->getdata_privacypolicy($param);
                        $data = $return;
                        break;  

                    default:
                        $return = null;
                        $data = null;
                        $valid = true;
                        $counter = 0;
                        $message = 'no action';
                }
                
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }
    
    public function getdata_HrdLemburDetail($param) {
        $this->setting->_storeprocedure = 'sp_report_lembur_detail';
        $sp_data = array(
            $param['project_project_id'], 
            $param['pt_pt_id'],
            $param['department_id'],
            $param['status_karyawan'],
            $param['start_date'],
            $param['end_date'],
            $param['start_date_process'],
            $param['end_date_process'],
        );
        
        $result = $this->setting->executeSPReport($sp_data);
        $return = array();
        if (!empty($result[0])) {
            $return = $result[0];
        }
        return $return;
    }
    
    public function getdata_HrdLemburRekap($param) {
        $this->setting->_storeprocedure = 'sp_report_lembur_rekap';
        $sp_data = array(
            $param['project_project_id'], 
            $param['pt_pt_id'],
            $param['department_id'],
            $param['status_karyawan'],
            $param['start_date'],
            $param['end_date'],
            $param['start_date_process'],
            $param['end_date_process'],
        );
        
        $result = $this->setting->executeSPReport($sp_data);
        $return = array();
        if (!empty($result[0])) {
            $return = $result[0];
        }
        return $return;
    }
    
    public function getdata_Absentreportformate($param) {
        $this->setting->_storeprocedure = 'sp_report_absent_format_e';
        $sp_data = array(
            $param['project_project_id'], 
            $param['pt_pt_id'],
            $param['start_date'],
            $param['end_date']
        );
        
        $result = $this->setting->executeSPReport($sp_data);
        $return = array();
        if (!empty($result[0])) {
            $return = $result[0];
        }
        return $return;
    }
    
    public function getdata_HrdCutiHak($param) {
        $this->setting->_storeprocedure = 'sp_report_cuti_hak';
        $sp_data = array(
            $param['project_project_id'], 
            $param['pt_pt_id'],
            $param['group_id'],
            $param['employee_id'],
            $param['department_id'],
            $param['status_karyawan'],
            $param['start_date'],
            $param['end_date']

            //added by anas 06112023 | untuk data by department / kelompok absensi
            , $param['pilihan_filter'],
            $param['kelompokabsensi_id']
        );
                
        $result = $this->setting->executeSPReport($sp_data);
        $return = array();
        if (!empty($result[0])) {
            $return = $result[0];
        }
        return $return;
    }
    
    public function getdata_Absentreportformata($param) {
        $this->setting->_storeprocedure = 'sp_report_absent_format_a';
        $sp_data = array(
            $param['project_project_id'], 
            $param['pt_pt_id'],
			$param['employee_id'],
			$param['department_id'],
			$param['status_karyawan'],
            $param['start_date'],
            $param['end_date'],
			
        );
        $result = $this->setting->executeSPReport($sp_data);
         
        $return = array();
        if (!empty($result[0])) {
            $return = $result[0];
        }
        return $return;
    }
    
    
    public function getdata_HrdCutiTransaksi($param) {
        $this->setting->_storeprocedure = 'sp_report_cuti_transaksi';
        $sp_data = array(
            $param['project_project_id'], 
            $param['pt_pt_id'],
            $param['group_id'],
            $param['employee_id'],
            $param['department_id'],
            $param['status_karyawan'],
            $param['start_date'],
            $param['end_date']
        );
        
        $result = $this->setting->executeSPReport($sp_data);
         
        $return = array();
        if (!empty($result[0])) {
            $return = $result[0];
        }
        return $return;
    }
                
    public function getdata_Absentreportizinpm($param) {
        $this->setting->_storeprocedure = 'sp_report_absent_format_a_pm';
        $sp_data = array(
            $param['project_project_id'], 
            $param['pt_pt_id'],
			$param['employee_id'],
			$param['department_id'],
			$param['status_karyawan'],
            $param['start_date'],
            $param['end_date'],
			
        );
        
        $result = $this->setting->executeSPReport($sp_data);
        $return = array();
        if (!empty($result[0])) {
            $return = $result[0];
        }
        return $return;
    }
    
    public function getdata_HrdUangKehadiran($param) {
        $this->setting->_storeprocedure = 'sp_report_uangkehadiran';
        $sp_data = array(
            $param['project_project_id'], 
            $param['pt_pt_id'],
            $param['department_id'],
            $param['employeestatus_group'],
            $param['start_date'],
            $param['end_date'],
            $param['alokasibiaya_id']
        );
        
        $result = $this->setting->executeSPReport($sp_data);
         
        $return = array();
        if (!empty($result[0])) {
            $return = $result[0];
        }
        return $return;
    }
	
    public function getdata_HrdAbsentHarian($param) {
        $this->setting->_storeprocedure = 'sp_report_absent_dailyb';
        $sp_data = array(
            $param['project_project_id'], 
            $param['pt_pt_id'],
			$param['employee_id'],
			$param['department_id'],
			$param['status_karyawan'],
            $param['start_date'],
            $param['end_date'],
			
        );
        
        $result = $this->setting->executeSPReport($sp_data);
        $return = array();
        if (!empty($result[0])) {
            $return = $result[0];
        }
        return $return;
    }

    public function getdata_HrdAbsentHarianMhl($param) {

        //updated by anas 03012022 - updated sp 
        $this->setting->_storeprocedure = 'sp_report_absent_dailyb_mhl';
        $sp_data = array(
            $param['project_project_id'], 
            $param['pt_pt_id'],
            $param['employee_id'],
            $param['department_id'],
            $param['status_karyawan'],
            $param['start_date'],
            $param['end_date'],
            
        );
        
        $result = $this->setting->executeSPReport($sp_data);
        $return = array();
        if (!empty($result[0])) {
            $return = $result[0];
        }
        return $return;
    }
        
    public function getdata_CompetencyMatrix($param) {
        $this->setting->_storeprocedure = 'sp_reportcompetencymatrix_read';
        $sp_data = array(
            $param['jobfamily_id']
        );
        $result = $this->setting->executeSPReport($sp_data);
         
        $return = array();
        if (!empty($result[0])) {
            $return = $result[0];
        }
        return $return;
    }
	
    public function getdata_HrdAbsentHarianb($param) {
        //$this->setting->_storeprocedure = 'sp_report_absent_daily_sh3b'; // perhitungan MHL sudah di field time_lost
        $this->setting->_storeprocedure = 'sp_report_absent_dailyb';
        $sp_data = array(
            $param['project_project_id'], 
            $param['pt_pt_id'],
			$param['employee_id'],
			$param['department_id'],
			$param['status_karyawan'],
            $param['start_date'],
            $param['end_date'],
			
        );
		
        $result = $this->setting->executeSPReport($sp_data);
        $return = array();
        if (!empty($result[0])) {
            $return = $result[0];
        }
        return $return;
        
    }
    
    public function getdata_HrdReportapprovalmatrix($param) {
        $this->setting->_storeprocedure = 'sp_report_approvalmatrix';
        $sp_data = array(
            $param['project_project_id'], 
            $param['pt_pt_id'],
            $param['employee_name'],
            $param['department_id']
        );
        $result = $this->setting->executeSPReport($sp_data);
         
        $return = array();
        if (!empty($result[0])) {
            $return = $result[0];
        }
        return $return;
        
    }	
	
    public function getdata_HrdAbsentTerlambat($param) {
        $this->setting->_storeprocedure = 'sp_report_absent_late';
        $sp_data = array(
            $param['project_project_id'], 
            $param['pt_pt_id'],
			$param['employee_id'],
			$param['department_id'],
			$param['status_karyawan'],
            $param['start_date'],
            $param['end_date'],
			
        );
		
        $result = $this->setting->executeSPReport($sp_data);
        $return = array();
        if (!empty($result[0])) {
            $return = $result[0];
        }
        return $return;
        
    }

    // added by Michael 2021.08.24 
    public function getdata_HrdSickLeave($param) {
        $this->setting->_storeprocedure = 'sp_report_absent_sickleave';
        $sp_data = array(
            $param['project_project_id'], 
            $param['pt_pt_id'],
            $param['employee_id'],
            $param['department_id'],
            $param['status_karyawan'],
            $param['start_date'],
            $param['end_date'],
            
        );
        
        $result = $this->setting->executeSPReport($sp_data);
        $return = array();
        if (!empty($result[0])) {
            $return = $result[0];
        }
        return $return;
        
    }

    public function getdata_HrdSickLeaveAttach($param) {
        $this->setting->_storeprocedure = 'sp_report_absent_sickleave';
        $sp_data = array(
            $param['project_project_id'], 
            $param['pt_pt_id'],
            $param['employee_id'],
            $param['department_id'],
            $param['status_karyawan'],
            $param['start_date'],
            $param['end_date'],
            
        );
        
        $result = $this->setting->executeSPReport($sp_data);
        $return = array();
        if (!empty($result[0])) {
            $return = $result[0];
        }
        return $return;
        
    }
    // end added by Michael 2021.08.24 

    //added by Michael 2021.11.22
    public function getdata_HrdSanksiKeterlambatan($param) {
        $this->setting->_storeprocedure = 'sp_report_absent_sanksiketerlambatan';
        $sp_data = array(
            $param['project_project_id'], 
            $param['pt_pt_id'],
            $param['employee_id'],
            $param['department_id'],
            $param['status_karyawan'],
            $param['start_date'],
            $param['end_date'],
            
        );
        
        $result = $this->setting->executeSPReport($sp_data);
        $return = array();
        if (!empty($result[0])) {
            $return = $result[0];
        }
        return $return;
        
    }

    public function getdata_HrdPermit($param) {
        $this->setting->_storeprocedure = 'sp_report_absent_permit';
        $sp_data = array(
            $param['project_project_id'], 
            $param['pt_pt_id'],
            $param['employee_id'],
            $param['department_id'],
            $param['status_karyawan'],
            $param['start_date'],
            $param['end_date'],
            
        );
        
        $result = $this->setting->executeSPReport($sp_data);
        $return = array();
        if (!empty($result[0])) {
            $return = $result[0];
        }
        return $return;
        
    }
    // end added by Michael 2021.11.22

    public function getdata_HrdLemburTransaksi($param) {
        $this->setting->_storeprocedure = 'sp_report_lembur_transaksi';
        $sp_data = array(
            $param['project_project_id'], 
            $param['pt_pt_id'],'',
			$param['department_id'],
			$param['status_karyawan'],
            $param['start_date'],
            $param['end_date'],
            $param['start_date_process'],
            $param['end_date_process'],
			
        );
		
        $result = $this->setting->executeSPReport($sp_data);
        $return = array();
        if (!empty($result[0])) {
            $return = $result[0];
        }
        return $return;
    }	

    public function getdata_HrdLemburTransaksiRekap($param) {
        $this->setting->_storeprocedure = 'sp_report_lembur_transaksi_rekap';
        $sp_data = array(
            $param['project_project_id'], 
            $param['pt_pt_id'],
			$param['department_id'],
			$param['status_karyawan'],
            $param['start_date'],
            $param['end_date'],
            $param['start_date_process'],
            $param['end_date_process'],
			
        );
		
        $result = $this->setting->executeSPReport($sp_data);
        $return = array();
        if (!empty($result[0])) {
            $return = $result[0];
        }
        return $return;
    }

    public function getdata_HrdLemburTransaksiFaktor($param) {
        $this->setting->_storeprocedure = 'sp_report_lembur_transaksi_faktor';
        $sp_data = array(
            $param['project_project_id'], 
            $param['pt_pt_id'],'',
            $param['department_id'],
            $param['status_karyawan'],
            $param['start_date'],
            $param['end_date'],
            $param['start_date_process'],
            $param['end_date_process'],
        );
        
        $result = $this->setting->executeSPReport($sp_data);
        $return = array();
        if (!empty($result[0])) {
            $return = $result[0];
        }
        return $return;
    }   

    public function getdata_HrdLemburTransaksiFaktorRekap($param) {
        $this->setting->_storeprocedure = 'sp_report_lembur_transaksi_faktor_rekap';
        $sp_data = array(
            $param['project_project_id'], 
            $param['pt_pt_id'],
            $param['department_id'],
            $param['status_karyawan'],
            $param['start_date'],
            $param['end_date'],
            $param['start_date_process'],
            $param['end_date_process'],
        );
        
        $result = $this->setting->executeSPReport($sp_data);
        $return = array();
        if (!empty($result[0])) {
            $return = $result[0];
        }
        return $return;
    }	
    
    public function getdata_HrdKehadiran($param) {
        $this->setting->_storeprocedure = 'sp_report_kehadiran';
        $sp_data = array(
            $param['project_project_id'], 
            $param['pt_pt_id'],
            $param['department_id'],
            0,
            $param['start_date'],
            $param['end_date'],
            0			
        );
		
        $result = $this->setting->executeSPReport($sp_data);
        $return = array();
        if (!empty($result[0])) {
            $return = $result[0];
        }
        return $return;
    }	
    
    public function getdata_HrdLaporanpengobatan($param) {
        $param['alokasibiaya_id'] = empty($param['alokasibiaya_id'])? 999 : $param['alokasibiaya_id'];
        $param['jenispengobatan_id'] = empty($param['jenispengobatan_id'])? 999 : $param['jenispengobatan_id'];
        
        $this->setting->_storeprocedure = 'sp_report_klaim';
        $sp_data = array(
            $param['project_project_id'], 
            $param['pt_pt_id'],
            $param['start_date'],
            $param['end_date'],
            $param['department_id'],
            $param['employee_id'],
            $param['employeestatus_id'],
            -1,
            $param['alokasibiaya_id'],
            $param['jenispengobatan_id']
        );
        $result = $this->setting->executeSPReport($sp_data);
        $return = array();
        if (!empty($result[0])) {
            $return = $result[0];
        }
        return $return;
    }	
    
    //added by anas 21122021 - untuk stimulsoft
    public function getdata_HrdAbsentHarianMhlRekap($param) {
        $this->setting->_storeprocedure = 'sp_report_absent_dailyb_rekap';
        $sp_data = array(
            $param['project_project_id'], 
            $param['pt_pt_id'],
            $param['employee_id'],
            $param['department_id'],
            $param['status_karyawan'],
            $param['start_date'],
            $param['end_date'],            
        );
        
        $result = $this->setting->executeSPReport($sp_data);
        $return = array();
        if (!empty($result[0])) {
            $return = $result[0];
        }
        return $return;
    }

    public function getdata_PersonalDocument($param) {

        $this->setting->_storeprocedure = 'sp_reportpersonaldocument_read';
        $sp_data = array(
            $param['employee_id'],
            $param['doc_list']
        );
        $result = $this->setting->executeSPReport($sp_data);

        foreach($temp_listing as $key_listing => $item_listing){
            $array_show[$item_listing.'_show'] = 'no';
        }

        $listing = 'dokumen_asuransi,dokumen_bpjs_k,dokumen_bpjs_kk,dokumen_bpjs_pp,dokumen_ijazah,dokumen_jamsostek,dokumen_kk,dokumen_ktp,dokumen_manulife_p,dokumen_npwp,dokumen_rekening,dokumen_vaksin1,dokumen_vaksin2,dokumen_vaksin3,dokumen_pas_foto,dokumen_stnk';

        $temp_listing = explode(',', $listing);

        $show_listing = $param['doc_list'];

        $temp_show_listing = explode(',', $show_listing);

        $array_show = NULL;

        foreach($temp_listing as $key_listing => $item_listing){
            $array_show[$item_listing.'_show'] = 'no';
        }

        foreach($temp_listing as $key_listing => $item_listing){
            foreach($temp_show_listing as $key_show_listing => $item_show_listing){
                if($item_listing == $item_show_listing){
                    $array_show[$item_show_listing.'_show'] = 'yes';
                }
            }
        }

        $temp_res = array_merge($result[0][0],$array_show);

        $res[0][0] = $temp_res;

        $return = array();
        if (!empty($res[0])) {
            $return = $res[0];
        }
        return $return;
    }

    //added by anas 06022024 - untuk stimulsoft privacy policy letter
    public function getdata_privacypolicy($param) {
        $this->setting->_storeprocedure = 'sp_privacypolicy_reportdata_read';
        $sp_data = array(
            $param['id'], 
            $param['employee_id']         
        );
        
        $result = $this->setting->executeSPReport($sp_data);
        $return = array();
        if (!empty($result[0])) {
            $return = $result[0];
        }
        return $return;
    }
    
}
