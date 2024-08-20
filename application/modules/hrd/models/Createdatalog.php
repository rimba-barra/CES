<?php

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Hrd_Models_Createdatalog extends Zend_Db_Table_Abstract {

    private $setting = null;
    private $function = null;

    function init() {
        date_default_timezone_set('Asia/Jakarta');
        $this->_curdate = date('Y-m-d');
        $this->_curdatetime = date('Y-m-d H:i:s');
        $this->setting = new Hrd_Models_General_Setup;
    }

    public function array_m_employee($data) {
        if (empty($data['leave_quota'])) {
                $data['leave_quota'] = 0;
        }
        
        
        // added by Wulan Sari 2018.05.03
        $data=array_map('trim',$data);
        
        
        
        $record = array(
            'employee_id' => $data['employee_id'],
            'employee_name' => $data['employee_name'],
            'birth_place' => $data['birth_place'],
            'birth_date' => $data['birth_date'],
            'religion_id' => $data['religion_id'],
            'bloodgroup_id' => $data['bloodgroup_id'],
            'sex' => $data['sex'],
            'nik_group' => $data['nik_group'],
            'ktp_number' => $data['ktp_number'],
            'address' => $data['address'],
            'ktp_address' => $data['ktp_address'],
            'zipcode' => $data['zipcode'],
            'last_education' => $data['last_education'],
            'npwp' => $data['npwp'],
            'email' => $data['email'],
            'phone_number' => $data['phone_number'],
            'hp_number' => $data['hp_number'],
            'passport_number' => $data['passport_number'],
            'marriagestatus_id' => $data['marriagestatus_id'],
            'marriage_date' => $data['marriage_date'],
            'child_count' => $data['child_count'],
            'department_id' => $data['department_id'],
            'employeestatus_id' => $data['employeestatus_id'],
            'division_id' => $data['division_id'],
            'actived' => $data['actived'],
            'position_id' => $data['position_id'],
            'addon' => $data['addon'],
            'addby' => $data['addby'],
            'modion' => $data['modion'],
            'modiby' => $data['modiby'],
            'inactiveon' => $data['inactiveon'],
            'inactiveby' => $data['inactiveby'],
            'deleteby' => $data['deleteby'],
            'deleteon' => $data['deleteon'],
            'deleted' => $data['deleted'],
            'employee_nik' => $data['employee_nik'],
            'group_id' => $data['group_id'],
            'groupposition_id' => $data['groupposition_id'],
            'hire_date' => $data['hire_date'],
            'assignation_date' => $data['assignation_date'],
            'contractend_date' => $data['contractend_date'],
            'statusinformation_id' => $data['statusinformation_id'],
            'nonactive_date' => $data['nonactive_date'],
            'employee_active' => $data['employee_active'],
            'pt_id' => $data['pt_id'],
            'project_id' => $data['project_id'],
            'fingerprintcode' => $data['fingerprintcode'],
            'leave_quota' => $data['leave_quota'],
            'reportto' => $data['reportto'],
            'alokasibiaya_id' => $data['alokasibiaya_id'],
            'jobfunction_id' => $data['jobfunction_id'],
            'photo' => $data['photo'],
            'dokumen_kk' => $data['dokumen_kk'],
            'dokumen_npwp' => $data['dokumen_npwp'],
            'dokumen_ktp' => $data['dokumen_ktp'],
            'dokumen_jamsostek' => $data['dokumen_jamsostek'],
            'klaim_frame_tahun_akhir' => $data['klaim_frame_tahun_akhir'],
            'klaim_frame_saldo_akhir' => $data['klaim_frame_saldo_akhir'],
            'alasan_resign' => $data['alasan_resign'],
            'nomor_rekening' => $data['nomor_rekening'],
            'nama_rekening' => $data['nama_rekening'],
            'bank_rekening' => $data['bank_rekening'],
            'email_ciputra' => $data['email_ciputra'],
            'code' => $data['code'],
            'jobfamily_id' => $data['jobfamily_id'],
            'banding_id' => $data['banding_id'],
            'pmdocument_id' => $data['pmdocument_id'],
            'is_valid_personal' => $data['is_valid_personal'],
            'dokumen_bpjs_pp' => $data['dokumen_bpjs_pp'],
            'dokumen_bpjs_k' => $data['dokumen_bpjs_k'],
            'dokumen_bpjs_kk' => $data['dokumen_bpjs_kk'],
            'dokumen_ijazah' => $data['dokumen_ijazah'],
            'dokumen_manulife_p' => $data['dokumen_manulife_p'],
            'dokumen_rekening' => $data['dokumen_rekening'],
            //added by michael 09/08/2021
            'dokumen_vaksin1' => $data['dokumen_vaksin1'],
            'dokumen_vaksin2' => $data['dokumen_vaksin2'],
            //end added by michael 09/08/2021
            'last_update_by_user' => $data['last_update_by_user'],
            'last_update_by_admin' => $data['last_update_by_admin'],
            'api_art_id' => $data['api_art_id'],
            'section_id' => $data['section_id'],
        );        
        return $record;
    }

}
