<?php

/**
 * Description of Employee
 *
 * @author MIS
 */


class Hrd_Models_Master_Employee extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora, Box_Models_Master_InterProjectPt,  Box_Arried{
    private $nik;
    private $name;
    private $birthPlace;
    private $status; /* employeestatus*/
    private $actived;
    private $birthDate;
    private $religion;
    private $bloodGroup;
    private $sex;
    private $nikGroup;
    private $address;
    private $ktp;
    private $zipcode;
    private $lastEducation;
    private $npwp;
    private $phoneNumber;
    private $passport;
    private $marriage;
    private $email;
    private $childCount;
    private $hireDate;
    private $contractEndDate;
    private $assignationDate;
    private $statusInformation;
    private $nonActiveDate;
    private $project;
    private $pt;
    private $temp;
    private $fingerPrintCode;
    private $leaveQuota;
    private $reportTo;
    private $alokasiBiaya;
    private $photo;
    private $dokumenKK;
    private $dokumenNPWP;
    private $dokumenKTP;
    private $dokumenJamsostek;
    private $klaimFrameTahun;
    private $klaimFrameTanggal;
    private $klaimFrameSaldo;
    private $klaimLensaTahun;
    private $klaimLensaTanggal;
    private $klaimLensaSaldo;
    private $alasanResign;
    private $nomorRekening;
    private $namaRekening;
    private $bankRekening;
    private $emailCiputra;
    private $alasanresign_id; // edited by wulan sari 20181012

    /* start added by ahmad riadi 17-07-2017 */
    private $dokumenBPJSPP;
    private $dokumenBPJSK;
    private $dokumenBPJSKK;
    private $dokumenIjazah;
    private $dokumenManulife;
    private $dokumenRekening;
    /* end added by ahmad riadi 17-07-2017 */	

    private $dokumenVAKSIN1;
    private $dokumenVAKSIN2;

     /* start added by ahmad riadi 23-08-2017 */
    private $lastupdatebyuser;
    private $lastupdatebyadmin;
     /* end added by ahmad riadi 23-08-2017 */


   /* start added by ahmad riadi 08-01-2018 */
    private $alokasibiaya_id2;
    private $alokasibiaya_id3;
    /* end added by ahmad riadi 08-01-2018 */	
         
    /* edit by wulan sari 20190806*/
    private $hari_kerja_perminggu;
    /* end edit by wulan sari 20190806*/

    private $project_id;
    private $pt_id;    
    private $project_name;
    private $pt_name;  
    private $worklocation;
    private $worklocation_id;
    private $worklocation_project;
    private $worklocation_project_id;
    private $worklocation_pt;
    private $worklocation_pt_id;
    private $department_department;  
    private $employeestatus_employeestatus;
    private $position_position;
    private $group_code;
    private $statusinformation_hire_date;
    private $statusinformation_assignation_date;
    private $statusinformation_contract_start;
    private $statusinformation_contract_end;

    private $statusinformation_consultant_start;
    private $statusinformation_consultant_end;

    private $jobfamily_jobfamily;
    private $banding_banding;
    private $ibu_kandung;
    private $id_type;
    private $marriagestatus_marriagestatus_id;
    private $marriagestatus_marriagestatus;
    private $nationality;
    private $payroll_group;
    private $payrollgroup_id;
    private $payroll_currency;
    private $payment_method;
    private $calendar_company;
    private $tax_country_code;
    private $cost_center_code;
    private $status_transfer;
    private $action_process;
    private $ptkp_code;
    private $employeestatus_employeestatus_id;
    private $work_shift;
    private $code_alokasibiaya;
    private $name_alokasibiaya;
    private $code_alokasibiaya2;
    private $name_alokasibiaya2;
    private $code_alokasibiaya3;
    private $name_alokasibiaya3;
    private $code;
    private $company_code;
    private $addon;
    private $modion;
    private $payroll_effective_date;
    private $statusinformation_id;
    private $religion_religion_id;
    private $religion_religion;
    private $worklocation_code;

    private $religion_id;
    private $religion_name;
    private $npwp_effective_date;
    private $ptkp_effective_date;
    private $rekening_effective_date;
    private $upload_employee_id;

    private $upload_check;

    /* edit by wulan sari 20200518*/
    private $no_kk;
    private $no_jamsostek;
    private $no_bpjs_pp;
    private $no_bpjs_k;
    private $no_bpjs_kk;
    private $no_ijazah;
    private $no_manulife_p;
    private $no_asuransi;
    private $ptkp_id;
    private $notes;
    private $employee_active_byuser;
    /* end edit by wulan sari 20200518*/

    private $proses;
    private $cancel;

    private $total_late;

    private $avg_late;

    private $is_child;

    //added by anas 10022022
    private $dokumenVAKSIN3;
    private $no_vaksin1;
    private $no_vaksin2;
    private $no_vaksin3;
    //end added by anas

    private $ptkp_claim_code;
    private $ptkp_claim_effective_date;
    private $ptkp_claim_id;

    private $usiaKerjaStartDate;
    private $masaKerjaStartDate;
    private $isKompensasi;

    private $isPensiun;

    private $dokumen_pas_foto;
    private $no_pas_foto;
    private $dokumen_stnk;
    private $no_stnk;

    private $listdocument_id;
    private $header_title;
    private $num_order;
    private $field;

    //added by anas 29012024
    private $total_lost;
    private $avg_lost;
    //end added by anas
        
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "employee_";
        $this->nik = "";
        
        
        
    }
    
    /*start added by ahmad riadi 08-02-2018 */    
    public function cleanData($param) {
        $setup = new Hrd_Models_General_Setup();
        $data = $setup->clean_specialcaracter($param);
        return $data;
    }
    /*end added by ahmad riadi 08-02-2018 */ 


    /* start added by ahmad riadi 08-01-2018 */

    function getAlokasibiaya_id2() {
        return intval($this->alokasibiaya_id2);
    }

    function getAlokasibiaya_id3() {
        return intval($this->alokasibiaya_id3);
    }

    function setAlokasibiaya_id2($alokasibiaya_id2) {
        $this->alokasibiaya_id2 = $alokasibiaya_id2;
    }

    function setAlokasibiaya_id3($alokasibiaya_id3) {
        $this->alokasibiaya_id3 = $alokasibiaya_id3;
    }

    /* end added by ahmad riadi 08-01-2018 */


    
    public function setArrayTable($dataArray=NULL) {
   
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
  
        if(isset ($x['employee_id'])){
           $this->setId($x['employee_id']); 
        }
        if(isset ($x['employee_nik'])){
           $this->setNik($x['employee_nik']); 
        }
        if(isset ($x['employee_name'])){
           $this->setName($x['employee_name']); 
        }
        if(isset ($x['employee_active'])){
           $this->setActived($x['employee_active']); 
        }
        if(isset ($x['hari_kerja_perminggu'])){
           $this->setHari_kerja_perminggu($x['hari_kerja_perminggu']); 
        }
        if(isset ($x['sex'])){
           $this->setSex($x['sex']); 
        }
      
        if(isset ($x['birth_place'])){
           $this->setBirthPlace($x['birth_place']); 
        }
        if(isset ($x['birth_date'])){
           $this->setBirthDate($x['birth_date']); 
        }
        if(isset ($x['sex'])){
           $this->setSex($x['sex']); 
        }
        if(isset ($x['nik_group'])){
           $this->setNikGroup($x['nik_group']); 
        }
        if(isset ($x['address'])){
           $this->setAddress($x['address']); 
        }
        if(isset ($x['zipcode'])){
           $this->setZipcode($x['zipcode']); 
        }
      
        if(isset ($x['npwp'])){
           $this->setNpwp($x['npwp']); 
        }
        if(isset ($x['email'])){
           $this->setEmail($x['email']); 
        }
        if(isset ($x['passport_number'])){
           $this->setPassport($x['passport_number']); 
        }
        if(isset ($x['child_count'])){
           $this->setChildCount($x['child_count']); 
        }
        if(isset ($x['hire_date'])){
           $this->setHireDate($x['hire_date']); 
        }
        if(isset ($x['assignation_date'])){
           $this->setAssignationDate($x['assignation_date']); 
        }
        if(isset ($x['contractend_date'])){
           $this->setContractEndDate($x['contractend_date']); 
        }
        if(isset ($x['nonactive_date'])){
           $this->setNonActiveDate($x['nonactive_date']); 
        }
        if(isset ($x['temp'])){
           $this->setTemp($x['temp']); 
        }
        if(isset ($x['fingerprintcode'])){
           $this->setFingerPrintCode($x['fingerprintcode']); 
        }
        if(isset ($x['leave_quota'])){
           $this->setLeaveQuota($x['leave_quota']); 
        }
        if(isset ($x['reportto_reportto'])){
           $this->getReportTo()->setId($x['reportto_reportto']); 
        }
        
        if(isset ($x['alokasibiaya_alokasibiaya_id'])){
           $this->getAlokasiBiaya()->setId($x['alokasibiaya_alokasibiaya_id']); 
        }
        if(isset ($x['photo'])){
           $this->setPhoto($x['photo']); 
        }
        if(isset ($x['dokumen_kk'])){
           $this->setDokumenKK($x['dokumen_kk']); 
        }
        if(isset ($x['dokumen_npwp'])){
           $this->setDokumenNPWP($x['dokumen_npwp']); 
        }
        if(isset ($x['dokumen_ktp'])){
           $this->setDokumenKTP($x['dokumen_ktp']); 
        }
        if(isset ($x['dokumen_jamsostek'])){
           $this->setDokumenJamsostek($x['dokumen_jamsostek']); 
        }
        if(isset ($x['klaim_frame_tahun_akhir'])){
           $this->setKlaimFrameTahun($x['klaim_frame_tahun_akhir']); 
        }
        if(isset ($x['klaim_frame_tanggal_akhir'])){
           $this->setKlaimFrameTanggal($x['klaim_frame_tanggal_akhir']); 
        }
        if(isset ($x['klaim_frame_saldo_akhir'])){
           $this->setKlaimFrameSaldo($x['klaim_frame_saldo_akhir']); 
        }
        if(isset ($x['klaim_lensa_tahun_akhir'])){
           $this->setKlaimLensaTahun($x['klaim_lensa_tahun_akhir']); 
        }
        if(isset ($x['klaim_frame_tanggal_akhir'])){
           $this->setKlaimLensaTanggal($x['klaim_lensa_tanggal_akhir']); 
        }
        if(isset ($x['klaim_frame_saldo_akhir'])){
           $this->setKlaimLensaSaldo($x['klaim_lensa_saldo_akhir']); 
        }
        if(isset ($x['alasan_resign'])){
           $this->setAlasanResign($x['alasan_resign']); 
        }
        if(isset ($x['alasanresign_id'])){
           $this->setAlasanResignId($x['alasanresign_id']); 
        }
        if(isset ($x['nomor_rekening'])){
           $this->setNomorRekening($x['nomor_rekening']); 
        }
        if(isset ($x['nama_rekening'])){
           $this->setNamaRekening($x['nama_rekening']); 
        }
        if(isset ($x['bank_rekening'])){
           $this->setBankRekening($x['bank_rekening']); 
        }
        if(isset ($x['email_ciputra'])){
           $this->setEmailCiputra($x['email_ciputra']); 
        }

	    if(isset ($x['dokumen_vaksin1'])){
           $this->setDokumenVAKSIN1($x['dokumen_vaksin1']); 
        }
        if(isset ($x['dokumen_vaksin2'])){
           $this->setDokumenVAKSIN2($x['dokumen_vaksin2']); 
        }

         /* start added by ahmad riadi 17-07-2017 */        
        if(isset ($x['dokumen_bpjs_pp'])){
           $this->setDokumenBPJSPP($x['dokumen_bpjs_pp']); 
        }
        if(isset ($x['dokumen_bpjs_k'])){
           $this->setDokumenBPJSK($x['dokumen_bpjs_k']); 
        }
        if(isset ($x['dokumen_bpjs_kk'])){
           $this->setDokumenBPJSK($x['dokumen_bpjs_kk']); 
        }
        if(isset ($x['dokumen_ijazah'])){
           $this->setDokumenIjazah($x['dokumen_ijazah']); 
        }        
        if(isset ($x['dokumen_manulife_p'])){
           $this->setDokumenManulife($x['dokumen_manulife_p']); 
        }
        if(isset ($x['dokumen_rekening'])){
           $this->setDokumenRekening($x['dokumen_rekening']); 
        }
        if(isset ($x['dokumen_jamsostek'])){
           $this->setDokumenJamsostek($x['dokumen_jamsostek']); 
        }        
         /* end added by ahmad riadi 17-07-2017 */

        /* start added by ahmad riadi 23-08-2017 */
           if(isset ($x['last_update_by_user'])){
               $this->setLastupdatebyuser($x['last_update_by_user']); 
            } 
            if(isset ($x['last_update_by_admin'])){
               $this->setLastupdatebyadmin($x['last_update_by_admin']); 
            } 
        /* end added by ahmad riadi 23-08-2017 */  


	/* start added by ahmad riadi 08-01-2018 */
        if (isset($x['alokasibiaya_alokasibiaya_id2'])) {
            $this->setAlokasibiaya_id2($x['alokasibiaya_alokasibiaya_id2']);
        }
        if (isset($x['alokasibiaya_alokasibiaya_id3'])) {
            $this->setAlokasibiaya_id3($x['alokasibiaya_alokasibiaya_id3']);
        }
        /* end added by ahmad riadi 08-01-2018 */


        /* added by wulan sari 20200518*/
        if (isset($x['no_kk'])) {
            $this->setNo_kk($x['no_kk']);
        }
        if (isset($x['no_jamsostek'])) {
            $this->setNo_jamsostek($x['no_jamsostek']);
        }
        if (isset($x['no_bpjs_pp'])) {
            $this->setNo_bpjs_pp($x['no_bpjs_pp']);
        }
        if (isset($x['no_bpjs_k'])) {
            $this->setNo_bpjs_k($x['no_bpjs_k']);
        }
        if (isset($x['no_bpjs_kk'])) {
            $this->setNo_bpjs_kk($x['no_bpjs_kk']);
        }
        if (isset($x['no_ijazah'])) {
            $this->setNo_ijazah($x['no_ijazah']);
        }
        if (isset($x['no_manulife_p'])) {
            $this->setNo_manulife_p($x['no_manulife_p']);
        }
        if (isset($x['no_asuransi'])) {
            $this->setNo_asuransi($x['no_asuransi']);
        }
        if (isset($x['ptkp_id'])) {
            $this->setPtkp_id($x['ptkp_id']);
        }
        if (isset($x['notes'])) {
            $this->setNotes($x['notes']);
        }
        if (isset($x['employee_active_byuser'])) {
            $this->setEmployeeActiveByuser($x['employee_active_byuser']);
        }
        /* end added by wulan sari 20200518*/


        if(isset ($x['project_id'])){
           $this->setProjectId($x['project_id']); 
        }
        if(isset ($x['project_name'])){
           $this->setProjectName($x['project_name']); 
        }
        if(isset ($x['pt_id'])){
           $this->setPtId($x['pt_id']); 
        }
        if(isset ($x['pt_name'])){
           $this->setPtName($x['pt_name']); 
        }
        if(isset ($x['worklocation'])){
           $this->setWorklocation($x['worklocation']); 
        }
        if(isset ($x['worklocation_project'])){
           $this->setWorklocationProject($x['worklocation_project']); 
        }
        if(isset ($x['worklocation_pt'])){
           $this->setWorklocationPt($x['worklocation_pt']); 
        }
        if(isset ($x['worklocation_id'])){
           $this->setWorklocationId($x['worklocation_id']); 
        }
        if(isset ($x['worklocation_project_id'])){
           $this->setWorklocationProjectId($x['worklocation_project_id']); 
        }
        if(isset ($x['worklocation_pt_id'])){
           $this->setWorklocationPtId($x['worklocation_pt_id']); 
        }
        if(isset ($x['department_department'])){
           $this->setDepartmentDepartment($x['department_department']); 
        }
        if(isset ($x['employeestatus_employeestatus'])){
           $this->setEmployeestatusEmployeestatus($x['employeestatus_employeestatus']); 
        }
        if(isset ($x['position_position'])){
           $this->setPositionPosition($x['position_position']); 
        }
        if(isset ($x['group_code'])){
           $this->setGroupCode($x['group_code']); 
        }
        if(isset ($x['statusinformation_hire_date'])){
           $this->setStatusinformationHireDate($x['statusinformation_hire_date']); 
        }
        if(isset ($x['statusinformation_assignation_date'])){
           $this->setStatusinformationAssignationDate($x['statusinformation_assignation_date']); 
        }
        if(isset ($x['statusinformation_contract_start'])){
           $this->setStatusinformationContractStart($x['statusinformation_contract_start']); 
        }
        if(isset ($x['statusinformation_contract_end'])){
           $this->setStatusinformationContractEnd($x['statusinformation_contract_end']); 
        }

        if(isset ($x['statusinformation_consultant_start'])){
           $this->setStatusinformationConsultantStart($x['statusinformation_consultant_start']); 
        }
        if(isset ($x['statusinformation_consultant_end'])){
           $this->setStatusinformationConsultantEnd($x['statusinformation_consultant_end']); 
        }

        if(isset ($x['jobfamily_jobfamily'])){
           $this->setJobfamilyJobfamily($x['jobfamily_jobfamily']); 
        }
        if(isset ($x['banding_banding'])){
           $this->setBandingBanding($x['banding_banding']); 
        }
        if(isset ($x['ibu_kandung'])){
           $this->setIbuKandung($x['ibu_kandung']); 
        }
        if(isset ($x['id_type'])){
           $this->setIdType($x['id_type']); 
        }
        if(isset ($x['marriagestatus_marriagestatus_id'])){
           $this->setMarriageStatusId($x['marriagestatus_marriagestatus_id']); 
        }
        if(isset ($x['marriagestatus_marriagestatus'])){
           $this->setMarriageStatus($x['marriagestatus_marriagestatus']); 
        }
        if(isset ($x['nationality'])){
           $this->setNationality($x['nationality']); 
        }
        if(isset ($x['payroll_group'])){
           $this->setPayrollGroup($x['payroll_group']); 
        }
        if(isset ($x['payrollgroup_id'])){
           $this->setPayrollGroupId($x['payrollgroup_id']); 
        }
        if(isset ($x['payroll_currency'])){
           $this->setPayrollCurrency($x['payroll_currency']); 
        }
        if(isset ($x['payment_method'])){
           $this->setPaymentMethod($x['payment_method']); 
        }
        if(isset ($x['calendar_company'])){
           $this->setCalendarCompany($x['calendar_company']); 
        }
        if(isset ($x['tax_country_code'])){
           $this->setTaxCountryCode($x['tax_country_code']); 
        }
        if(isset ($x['cost_center_code'])){
           $this->setCostCenterCode($x['cost_center_code']); 
        }
        if(isset ($x['status_transfer'])){
           $this->setStatusTransfer($x['status_transfer']); 
        }
        if(isset ($x['action_process'])){
           $this->setActionProcess($x['action_process']); 
        }
        if(isset ($x['ptkp_id'])){
           $this->setPtkpId($x['ptkp_id']); 
        }
        if(isset ($x['ptkp_code'])){
           $this->setPtkpCode($x['ptkp_code']); 
        }
        if(isset ($x['employeestatus_employeestatus_id'])){
           $this->setEmployeestatusEmployeestatusId($x['employeestatus_employeestatus_id']); 
        }
        if(isset ($x['work_shift'])){
           $this->setWorkShift($x['work_shift']); 
        }
        if(isset ($x['code_alokasibiaya'])){
           $this->setCodeAlokasibiaya($x['code_alokasibiaya']); 
        }
        if(isset ($x['name_alokasibiaya'])){
           $this->setNameAlokasibiaya($x['name_alokasibiaya']); 
        }
        if(isset ($x['code_alokasibiaya2'])){
           $this->setCodeAlokasibiaya2($x['code_alokasibiaya2']); 
        }
        if(isset ($x['name_alokasibiaya2'])){
           $this->setNameAlokasibiaya2($x['name_alokasibiaya2']); 
        }
        if(isset ($x['code_alokasibiaya3'])){
           $this->setCodeAlokasibiaya3($x['code_alokasibiaya3']); 
        }
        if(isset ($x['name_alokasibiaya3'])){
           $this->setNameAlokasibiaya3($x['name_alokasibiaya3']); 
        }
        if(isset ($x['code'])){
           $this->setCode($x['code']); 
        }
        if(isset ($x['company_code'])){
           $this->setCompanyCode($x['company_code']); 
        }
        if(isset ($x['addon'])){
           $this->setAddon($x['addon']); 
        }
        if(isset ($x['modion'])){
           $this->setModion($x['modion']); 
        }
        if(isset ($x['payroll_effective_date'])){
           $this->setPayrollEffectiveDate($x['payroll_effective_date']); 
        }
        if(isset ($x['statusinformation_id'])){
           $this->setStatusInformationId($x['statusinformation_id']); 
        }
        if(isset ($x['religion_religion_id'])){
           $this->setReligionReligionId($x['religion_religion_id']); 
        }
        if(isset ($x['religion_religion'])){
           $this->setReligionReligion($x['religion_religion']); 
        }
        if(isset ($x['worklocation_code'])){
           $this->setWorklocationCode($x['worklocation_code']); 
        }

        if(isset ($x['religion_id'])){
           $this->setReligionId($x['religion_id']); 
        }
        if(isset ($x['religion_name'])){
           $this->setReligionName($x['religion_name']); 
        }
        if(isset ($x['npwp_effective_date'])){
           $this->setNpwpDate($x['npwp_effective_date']); 
        }
        if(isset ($x['ptkp_effective_date'])){
           $this->setPtkpDate($x['ptkp_effective_date']); 
        }
        if(isset ($x['rekening_effective_date'])){
           $this->setRekeningDate($x['rekening_effective_date']); 
        }
        if(isset ($x['upload_employee_id'])){
           $this->setUploadEmployeeId($x['upload_employee_id']); 
        }
        if(isset ($x['upload_check'])){
           $this->setUploadCheck($x['upload_check']); 
        }

        if(isset ($x['proses'])){
           $this->setProses($x['proses']); 
        }
        if(isset ($x['cancel'])){
           $this->setCancel($x['cancel']); 
        }

        if(isset ($x['total_late'])){
           $this->setTotalLate($x['total_late']); 
        }

        if(isset ($x['avg_late'])){
           $this->setAvgLate($x['avg_late']); 
        }

        if(isset ($x['is_child'])){
           $this->setIsChild($x['is_child']); 
        }


        /* added by wulan sari 20200518*/
        // if (isset($x['no_kk'])) {
        //     $this->setNo_kk($x['no_kk']);
        // }
        // if (isset($x['no_jamsostek'])) {
        //     $this->setNo_jamsostek($x['no_jamsostek']);
        // }
        // if (isset($x['no_bpjs_pp'])) {
        //     $this->setNo_bpjs_pp($x['no_bpjs_pp']);
        // }
        // if (isset($x['no_bpjs_k'])) {
        //     $this->setNo_bpjs_k($x['no_bpjs_k']);
        // }
        // if (isset($x['no_bpjs_kk'])) {
        //     $this->setNo_bpjs_kk($x['no_bpjs_kk']);
        // }
        // if (isset($x['no_ijazah'])) {
        //     $this->setNo_ijazah($x['no_ijazah']);
        // }
        // if (isset($x['no_manulife_p'])) {
        //     $this->setNo_manulife_p($x['no_manulife_p']);
        // }
        // if (isset($x['no_asuransi'])) {
        //     $this->setNo_asuransi($x['no_asuransi']);
        // }
        /* end added by wulan sari 20200518*/

        
         //added by anas 10022022
         if(isset ($x['dokumen_vaksin3'])){
            $this->setDokumenVAKSIN3($x['dokumen_vaksin3']); 
         }
         if(isset ($x['no_vaksin1'])){
            $this->setNoVAKSIN1($x['no_vaksin1']); 
         }
         if(isset ($x['no_vaksin2'])){
            $this->setNoVAKSIN2($x['no_vaksin2']); 
         }
         if(isset ($x['no_vaksin3'])){
            $this->setNoVAKSIN3($x['no_vaksin3']); 
         }
         //end added by anas

         if(isset ($x['ptkp_claim_id'])){
           $this->setPtkpClaimId($x['ptkp_claim_id']); 
        }
        if(isset ($x['ptkp_claim_code'])){
           $this->setPtkpClaimCode($x['ptkp_claim_code']); 
        }
        if(isset ($x['ptkp_claim_effective_date'])){
           $this->setPtkpClaimDate($x['ptkp_claim_effective_date']); 
        }

        if(isset ($x['masa_kerja_start_date'])){
           $this->setMasaKerjaStartDate($x['masa_kerja_start_date']); 
        }
        if(isset ($x['usia_kerja_start_date'])){
           $this->setUsiaKerjaStartDate($x['usia_kerja_start_date']); 
        }
        if(isset ($x['is_kompensasi'])){
           $this->setIsKompensasi($x['is_kompensasi']); 
        }

        if(isset ($x['is_pensiun'])){
           $this->setIsPensiun($x['is_pensiun']); 
        }

        if(isset ($x['dokumen_pas_foto'])){
            $this->setDokumenPasFoto($x['dokumen_pas_foto']); 
        }
        if(isset ($x['no_pas_foto'])){
            $this->setNoPasFoto($x['no_pas_foto']); 
        }
        if(isset ($x['dokumen_stnk'])){
            $this->setDokumenStnk($x['dokumen_stnk']); 
        }
        if(isset ($x['no_stnk'])){
            $this->setNoStnk($x['no_stnk']); 
        }

        if(isset ($x['listdocument_id'])){
             $this->setListDocumentId($x['listdocument_id']); 
          }
          if(isset ($x['header_title'])){
             $this->setHeader_title($x['header_title']); 
          }
          if(isset ($x['num_order'])){
             $this->setNum_order($x['num_order']); 
          }
          if(isset ($x['field'])){
             $this->setField($x['field']); 
          }


         //added by anas 29012024
         if(isset ($x['total_lost'])){
            $this->setTotalLost($x['total_lost']); 
         }
         if(isset ($x['avg_lost'])){
            $this->setAvgLost($x['avg_lost']); 
         }
         //end added by anas

        $this->getKtp()->setArrayTable($x);
        $this->getPhoneNumber()->setArrayTable($x);
        
        unset($x);

        
    }
    
    public function getArrayTable(){
        
        if(empty($this->getStatusinformationContractEnd())){
            $getStatusinformationContractEnd = '-';
        }else{
            $getStatusinformationContractEnd = $this->getStatusinformationContractEnd();
        }

        if(empty($this->getStatusinformationContractStart())){
            $getStatusinformationContractStart = '-';
        }else{
            $getStatusinformationContractStart = $this->getStatusinformationContractStart();
        }

        if(empty($this->getStatusinformationConsultantEnd())){
            $getStatusinformationConsultantEnd = '-';
        }else{
            $getStatusinformationConsultantEnd = $this->getStatusinformationConsultantEnd();
        }

        if(empty($this->getStatusinformationConsultantStart())){
            $getStatusinformationConsultantStart = '-';
        }else{
            $getStatusinformationConsultantStart = $this->getStatusinformationConsultantStart();
        }

        if(empty($this->getStatusinformationAssignationDate())){
            $getStatusinformationAssignationDate = '-';
        }else{
            $getStatusinformationAssignationDate = $this->getStatusinformationAssignationDate();
        }

        if(empty($this->getNonActiveDate())){
            $getNonActiveDate = '-';
        }else{
            $getNonActiveDate = $this->getNonActiveDate();
        }

        if(empty($this->getNpwpDate())){
            $getNpwpDate = '-';
        }else{
            $getNpwpDate = $this->getNpwpDate();
        }

        if(empty($this->getPtkpDate())){
            $getPtkpDate = '-';
        }else{
            $getPtkpDate = $this->getPtkpDate();
        }

        if(empty($this->getPtkpClaimDate())){
            $getPtkpClaimDate = '-';
        }else{
            $getPtkpClaimDate = $this->getPtkpClaimDate();
        }

        if(empty($this->getRekeningDate())){
            $getRekeningDate = '-';
        }else{
            $getRekeningDate = $this->getRekeningDate();
        }

        if(empty($this->getTotalLate())){
            $getTotalLate = '00:00:00';
        }else{
            $getTotalLate = $this->getTotalLate();
        }

        if(empty($this->getAvgLate())){
            $getAvgLate = '0';
        }else{
            $getAvgLate = $this->getAvgLate();
        }

        if(empty($this->getIsChild())){
            $getIsChild = '0';
        }else{
            $getIsChild = $this->getIsChild();
        }

        //added by michael 05/11/2021
        if(empty($this->getNik())){
            $getNik = '0';
        }else{
            $getNik = $this->getNik();
        }

        if(empty($this->getEmail())){
            $getEmail = '-';
        }else{
            $getEmail = $this->getEmail();
        }

        if(empty($this->getEmailCiputra())){
            $getEmailCiputra = '-';
        }else{
            $getEmailCiputra = $this->getEmailCiputra();
        }

        if(empty($this->getPayrollGroup())){
            $getPayrollGroup = '-';
        }else{
            $getPayrollGroup = $this->getPayrollGroup();
        }

        if(empty($this->getPayrollGroupId())){
            $getPayrollGroupId = '0';
        }else{
            $getPayrollGroupId = $this->getPayrollGroupId();
        }

        if(empty($this->getIsKompensasi())){
            $getIsKompensasi = '0';
        }else{
            $getIsKompensasi = $this->getIsKompensasi();
        }

        if(empty($this->getMasaKerjaStartDate())){
            $getMasaKerjaStartDate = '-';
        }else{
            $getMasaKerjaStartDate = $this->getMasaKerjaStartDate();
        }

        if(empty($this->getUsiaKerjaStartDate())){
            $getUsiaKerjaStartDate = '-';
        }else{
            $getUsiaKerjaStartDate = $this->getUsiaKerjaStartDate();
        }

        if(empty($this->getIsPensiun())){
            $getIsPensiun = '0';
        }else{
            $getIsPensiun = $this->getIsPensiun();
        }
        
        //added by anas 29012024
        if(empty($this->getTotalLost())){
            $getTotalLost = '00:00:00';
        }else{
            $getTotalLost = $this->getTotalLost();
        }

        if(empty($this->getAvgLost())){
            $getAvgLost = '0';
        }else{
            $getAvgLost = $this->getAvgLost();
        }
        //end added by anas


        $x = array(
            "employee_id"=>$this->getId(),
            // "employee_nik"=>$this->getNik(),
            "employee_nik"=>$getNik,
            "employee_name"=>$this->cleanData($this->getName()),
            "employee_active"=>$this->getActived(),
            "hari_kerja_perminggu"=>$this->getHari_kerja_perminggu(),
            "sex"=>$this->getSex(),
            "birth_place"=>$this->getBirthPlace(),
            "birth_date"=>$this->getBirthDate(),
            "sex"=>$this->getSex(),
            "nik_group"=>$this->getNikGroup(),
            "address"=>$this->cleanData($this->getAddress()),
            "zipcode"=>$this->getZipcode(),
            "npwp"=>$this->getNpwp(),
            // "email"=>$this->getEmail(),
            "email"=>$getEmail,
            "passport_number"=>$this->getPassport(),
            "child_count"=>$this->getChildCount(),
            "hire_date"=>$this->getHireDate(),
            "assignation_date"=>$this->getAssignationDate(),
            "contractend_date"=>$this->getContractEndDate(),
            "nonactive_date"=>$getNonActiveDate,
            "temp"=>$this->getTemp(),
            "fingerprintcode"=>$this->getFingerPrintCode(),
            "leave_quota"=>$this->getLeaveQuota(),
            "reportto_reportto"=>$this->getReportTo()->getId(),
            "alokasibiaya_alokasibiaya_id"=>$this->getAlokasiBiaya()->getId(),
            "photo"=>$this->getPhoto(),
            "dokumen_kk"=>$this->getDokumenKK(),
            "dokumen_npwp"=>$this->getDokumenNPWP(),
            "dokumen_ktp"=>$this->getDokumenKTP(),
            "dokumen_jamsostek"=>$this->getDokumenJamsostek(),
            "klaim_frame_tahun_akhir"=>$this->getKlaimFrameTahun(),
            "klaim_frame_tanggal_akhir"=>$this->getKlaimFrameTanggal(),
            "klaim_frame_saldo_akhir"=>$this->getKlaimFrameSaldo(),
            "klaim_lensa_tahun_akhir"=>$this->getKlaimLensaTahun(),
            "klaim_lensa_tanggal_akhir"=>$this->getKlaimLensaTanggal(),
            "klaim_lensa_saldo_akhir"=>$this->getKlaimLensaSaldo(),
            "alasan_resign"=>$this->getAlasanResign(),
            "alasanresign_id"=>$this->getAlasanResignId(),
            "nomor_rekening"=>$this->getNomorRekening(),
            "nama_rekening"=>$this->cleanData($this->getNamaRekening()),
            "bank_rekening"=>$this->getBankRekening(),
            // "email_ciputra"=>$this->getEmailCiputra(),
            "email_ciputra"=>$getEmailCiputra,

            "dokumen_vaksin1"=>$this->getDokumenVAKSIN1(),
            "dokumen_vaksin2"=>$this->getDokumenVAKSIN2(),

	      /* start added by ahmad riadi 17-07-2017 */
           "dokumen_bpjs_pp"=>$this->getDokumenBPJSPP(),
           "dokumen_bpjs_k"=>$this->getDokumenBPJSK(),
           "dokumen_bpjs_kk"=>$this->getDokumenBPJSKK(),
           "dokumen_ijazah"=>$this->getDokumenIjazah(),
           "dokumen_manulife_p"=>$this->getDokumenManulife(),
           "dokumen_rekening"=>$this->getDokumenRekening(),
             /* end added by ahmad riadi 17-07-2017 */	

	    /* start added by ahmad riadi 23-08-2017 */
             "last_update_by_user"=>$this->getLastupdatebyuser(),
             "last_update_by_admin"=>$this->getLastupdatebyadmin(),
            /* end added by ahmad riadi 23-08-2017 */


	    /* start added by ahmad riadi 08-01-2018 */
            "alokasibiaya_alokasibiaya_id2" => $this->getAlokasibiaya_id2(),
            "alokasibiaya_alokasibiaya_id3" => $this->getAlokasibiaya_id3(),
            /* end added by ahmad riadi 08-01-2018 */
		



            /* added by wulan sari 20200518*/
            // "no_kk" => $this->getNo_kk(),
            // "no_jamsostek" => $this->getNo_jamsostek(),
            // "no_bpjs_pp" => $this->getNo_bpjs_pp(),
            // "no_bpjs_k" => $this->getNo_bpjs_k(),
            // "no_bpjs_kk" => $this->getNo_bpjs_kk(),
            // "no_ijazah" => $this->getNo_ijazah(),
            // "no_manulife_p" => $this->getNo_manulife_p(),
            // "no_asuransi" => $this->getNo_asuransi()
            /* end added by wulan sari 20200518*/

            
            'project_id'=>$this->getProjectId(),
            'project_name'=>$this->getProjectName(),
            'pt_id'=>$this->getPtId(),
            'pt_name'=>$this->getPtName(),
            'worklocation'=>$this->getWorklocation(),
            'worklocation_project'=>$this->getWorklocationProject(),
            'worklocation_pt'=>$this->getWorklocationPt(),
            'worklocation_id'=>$this->getWorklocationId(),
            'worklocation_project_id'=>$this->getWorklocationProjectId(),
            'worklocation_pt_id'=>$this->getWorklocationPtId(),
            'department_department'=>$this->getDepartmentDepartment(),
            'employeestatus_employeestatus'=>$this->getEmployeestatusEmployeestatus(),
            'position_position'=>$this->getPositionPosition(),
            'group_code'=>$this->getGroupCode(),
            'statusinformation_hire_date'=>$this->getStatusinformationHireDate(),
            'statusinformation_assignation_date'=>$getStatusinformationAssignationDate,
            'statusinformation_contract_start'=>$getStatusinformationContractStart,
            'statusinformation_contract_end'=>$getStatusinformationContractEnd,
            'statusinformation_consultant_start'=>$getStatusinformationConsultantStart,
            'statusinformation_consultant_end'=>$getStatusinformationConsultantEnd,
            'jobfamily_jobfamily'=>$this->getJobfamilyJobfamily(),
            'banding_banding'=>$this->getBandingBanding(),
            'ibu_kandung'=>$this->getIbuKandung(),
            'id_type'=>$this->getIdType(),
            'marriagestatus_marriagestatus_id'=>$this->getMarriageStatusId(),
            'marriagestatus_marriagestatus'=>$this->getMarriageStatus(),
            'nationality'=>$this->getNationality(),
            // 'payroll_group'=>$this->getPayrollGroup(),
            // 'payrollgroup_id'=>$this->getPayrollGroupId(),
            'payroll_group'=>$getPayrollGroup,
            'payrollgroup_id'=>$getPayrollGroupId,
            'payroll_currency'=>$this->getPayrollCurrency(),
            'payment_method'=>$this->getPaymentMethod(),
            'calendar_company'=>$this->getCalendarCompany(),
            'tax_country_code'=>$this->getTaxCountryCode(),
            'cost_center_code'=>$this->getCostCenterCode(),
            'status_transfer'=>$this->getStatusTransfer(),
            'action_process'=>$this->getActionProcess(),
            'ptkp_id'=>$this->getPtkpId(),
            'ptkp_code'=>$this->getPtkpCode(),
            'ptkp_claim_id'=>$this->getPtkpClaimId(),
            'ptkp_claim_code'=>$this->getPtkpClaimCode(),
            'employeestatus_employeestatus_id'=>$this->getEmployeestatusEmployeestatusId(),
            'work_shift'=>$this->getWorkShift(),
            'code_alokasibiaya'=>$this->getCodeAlokasibiaya(),
            'name_alokasibiaya'=>$this->getNameAlokasibiaya(),
            'code_alokasibiaya2'=>$this->getCodeAlokasibiaya2(),
            'name_alokasibiaya2'=>$this->getNameAlokasibiaya2(),
            'code_alokasibiaya3'=>$this->getCodeAlokasibiaya3(),
            'name_alokasibiaya3'=>$this->getNameAlokasibiaya3(),
            'code'=>$this->getCode(),
            'company_code'=>$this->getCompanyCode(),
            'addon'=>$this->getAddon(),
            'modion'=>$this->getModion(),
            'payroll_effective_date'=>$this->getPayrollEffectiveDate(),
            'statusinformation_id'=>$this->getStatusInformationId(),
            'religion_religion_id'=>$this->getReligionReligionId(),
            'religion_religion'=>$this->getReligionReligion(),
            'worklocation_code'=>$this->getWorklocationCode(),

            'religion_id'=>$this->getReligionId(),
            'religion_name'=>$this->getReligionName(),
            'npwp_effective_date'=>$getNpwpDate,
            'ptkp_effective_date'=>$getPtkpDate,
            'ptkp_claim_effective_date'=>$getPtkpClaimDate,
            'rekening_effective_date'=>$getRekeningDate,
            'upload_employee_id'=>$this->getUploadEmployeeId(),
            'upload_check'=>$this->getUploadCheck(),



            /* added by wulan sari 20200518*/
            "no_kk" => $this->getNo_kk(),
            "no_jamsostek" => $this->getNo_jamsostek(),
            "no_bpjs_pp" => $this->getNo_bpjs_pp(),
            "no_bpjs_k" => $this->getNo_bpjs_k(),
            "no_bpjs_kk" => $this->getNo_bpjs_kk(),
            "no_ijazah" => $this->getNo_ijazah(),
            "no_manulife_p" => $this->getNo_manulife_p(),
            "no_asuransi" => $this->getNo_asuransi(),
            "ptkp_id" => $this->getPtkp_id(),
            "notes" => $this->getNotes(),
            "employee_active_byuser" => $this->getEmployeeActiveByuser(),                
            /* end added by wulan sari 20200518*/

            'proses'=>$this->getProses(),
            'cancel'=>$this->getCancel(),

            'total_late'=>$getTotalLate,

            'avg_late'=>$getAvgLate,

            'is_child'=>$getIsChild,

            //added by anas 10022022
            "dokumen_vaksin3"=>$this->getDokumenVAKSIN3(),
            "no_vaksin1"=>$this->getNoVAKSIN1(),
            "no_vaksin2"=>$this->getNoVAKSIN2(),
            "no_vaksin3"=>$this->getNoVAKSIN3(),
            //end added by anas

            "masa_kerja_start_date"=>$getMasaKerjaStartDate,
            "usia_kerja_start_date"=>$getUsiaKerjaStartDate,
            "is_kompensasi"=>$getIsKompensasi,

            "is_pensiun"=>$getIsPensiun,

            "dokumen_pas_foto"=>$this->getDokumenPasFoto(),
            "no_pas_foto"=>$this->getNoPasFoto(),
            "dokumen_stnk"=>$this->getDokumenStnk(),
            "no_stnk"=>$this->getNoStnk(),

            "listdocument_id"=>$this->getListDocumentId(),
             "header_title"=>$this->getHeader_title(),
             "num_order"=>$this->getNum_order(),
             "field"=>$this->getField(),

            //added by anas 29012024
            'total_lost'=>$getTotalLost,
            'avg_lost'=>$getAvgLost,
            //end added by anas
           
        );
        $y = $this->getKtp()->getArrayTable();
        $z = $this->getPhoneNumber()->getArrayTable();
        $x = array_merge($y,$z,$x);
      
        return $x;
    }

      /* start added by ahmad riadi 23-08-2017 */
     function getLastupdatebyuser() {
         return $this->lastupdatebyuser;
     }

     function getLastupdatebyadmin() {
         return $this->lastupdatebyadmin;
     }

     function setLastupdatebyuser($lastupdatebyuser) {
         $this->lastupdatebyuser = $lastupdatebyuser;
     }

     function setLastupdatebyadmin($lastupdatebyadmin) {
         $this->lastupdatebyadmin = $lastupdatebyadmin;
     }

     /* start added by ahmad riadi 23-08-2017 */
    

    function getDokumenVAKSIN1() {
        return $this->dokumenVAKSIN1;
    }

    function getDokumenVAKSIN2() {
        return $this->dokumenVAKSIN2;
    }

     /* start added by ahmad riadi 17-07-2017 */
    function getDokumenBPJSPP() {
        return $this->dokumenBPJSPP;
    }

    function getDokumenBPJSK() {
        return $this->dokumenBPJSK;
    }

    function getDokumenBPJSKK() {
        return $this->dokumenBPJSKK;
    }

    function getDokumenIjazah() {
        return $this->dokumenIjazah;
    }

    function getDokumenManulife() {
        return $this->dokumenManulife;
    }

    function getDokumenRekening() {
        return $this->dokumenRekening;
    }

    function setDokumenVAKSIN1($dokumenVAKSIN1) {
        $this->dokumenVAKSIN1 = $dokumenVAKSIN1;
    }

    function setDokumenVAKSIN2($dokumenVAKSIN2) {
        $this->dokumenVAKSIN2 = $dokumenVAKSIN2;
    }

    function setDokumenBPJSPP($dokumenBPJSPP) {
        $this->dokumenBPJSPP = $dokumenBPJSPP;
    }

    function setDokumenBPJSK($dokumenBPJSK) {
        $this->dokumenBPJSK = $dokumenBPJSK;
    }

    function setDokumenBPJSKK($dokumenBPJSKK) {
        $this->dokumenBPJSKK = $dokumenBPJSKK;
    }

    function setDokumenIjazah($dokumenIjazah) {
        $this->dokumenIjazah = $dokumenIjazah;
    }

    function setDokumenManulife($dokumenManulife) {
        $this->dokumenManulife = $dokumenManulife;
    }

    function setDokumenRekening($dokumenRekening) {
        $this->dokumenRekening = $dokumenRekening;
    }
     /* end added by ahmad riadi 17-07-2017 */
  
    
    public function getTemp() {
        return $this->temp;
    }

    public function setTemp($temp) {
        $this->temp = $temp;
    }

        
    public function getNik() {
        return $this->nik;
    }

    public function setNik($nik) {
        $this->nik = $nik;
    } 

    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function getStatus() {
        if(!$this->status){
            $this->status = new Hrd_Models_Master_Status();
        }
        return $this->status;
    }

    public function setStatus($status) {
        $this->status = $status;
    }

    public function getActived() {
        return (int)$this->actived;
    }

    public function setActived($actived) {
        $this->actived = (int)$actived;
    }

    public function getHari_kerja_perminggu() {
        return (int)$this->hari_kerja_perminggu;
    }

    public function setHari_kerja_perminggu($hari_kerja_perminggu) {
        $this->hari_kerja_perminggu = (int)$hari_kerja_perminggu;
    }

    public function getSex() {
        return $this->sex;
    }

    public function setSex($sex) {
        $this->sex = $sex;
    }

    public function getEmail() {
        return $this->email;
    }

    public function setEmail($email) {
        $this->email = $email;
    }
    
    public function getBirthPlace() {
        return $this->birthPlace;
    }

    public function setBirthPlace($birthPlace) {
        $this->birthPlace = $birthPlace;
    }

    public function getBirthDate() {
        return $this->birthDate;
    }

    public function setBirthDate($birthDate) {
        $this->birthDate = $birthDate;
    }
    
    public function getLeaveQuota() {
        return $this->leaveQuota;
    }

    public function setLeaveQuota($leaveQuota) {
        $this->leaveQuota = (float)$leaveQuota;
    }

    
    public function getReligion() {
        if(!$this->religion){
            $this->religion = new Hrd_Models_Master_Global_Religion();
        }
        return $this->religion;
    }

    public function setReligion($religion) {
        $this->religion = $religion;
    }

    public function getBloodGroup() {
        if(!$this->bloodGroup){
            $this->bloodGroup = new Hrd_Models_Master_Global_BloodGroup();
        }
        return $this->bloodGroup;
    }

    public function setBloodGroup($bloodGroup) {
        $this->bloodGroup = $bloodGroup;
    }

    public function getNikGroup() {
        return $this->nikGroup;
    }

    public function setNikGroup($nikGroup) {
        $this->nikGroup = $nikGroup;
    }

    public function getAddress() {
        return $this->address;
    }

    public function setAddress($address) {
        $this->address = $address;
    }

    public function getKtp() {
        if(!$this->ktp){
            $this->ktp = new Hrd_Models_Master_General_KTP();
        }
        return $this->ktp;
    }

    public function setKtp($ktp) {
        $this->ktp = $ktp;
    }

    public function getZipcode() {
        return $this->zipcode;
    }

    public function setZipcode($zipcode) {
        $this->zipcode = $zipcode;
    }

    public function getLastEducation() {
        if(!$this->lastEducation){
            $this->lastEducation = new Hrd_Models_Master_Global_Education();
        }
        return $this->lastEducation;
    }

    public function setLastEducation($lastEducation) {
        $this->lastEducation = $lastEducation;
    }

    public function getNpwp() {
        return $this->npwp;
    }

    public function setNpwp($npwp) {
        $this->npwp = $npwp;
    }

    public function getPhoneNumber() {
        if(!$this->phoneNumber){
            $this->phoneNumber = new Hrd_Models_Master_General_PhoneNumber();
        }
        return $this->phoneNumber;
    }

    public function setPhoneNumber($phoneNumber) {
        $this->phoneNumber = $phoneNumber;
    }

    public function getPassport() {
        return $this->passport;
    }

    public function setPassport($passport) {
        $this->passport = $passport;
    }

    public function getMarriage() {
        if(!$this->marriage){
            $this->marriage = new Hrd_Models_Master_Global_MarriageStatus();
        }
        return $this->marriage;
    }

    public function setMarriage($marriage) {
        $this->marriage = $marriage;
    }
    
    public function getChildCount() {
        return $this->childCount;
    }

    public function setChildCount($child) {
        $this->childCount = $child;
    }
    public function getHireDate() {
        return $this->hireDate;
    }

    public function setHireDate($hireDate) {
        $this->hireDate = $hireDate;
    }

    public function getContractEndDate() {
        return $this->contractEndDate;
    }

    public function setContractEndDate($contractEndDate) {
        $this->contractEndDate = $contractEndDate;
    }

    public function getAssignationDate() {
        return $this->assignationDate;
    }

    public function setAssignationDate($assignationDate) {
        $this->assignationDate = $assignationDate;
    }
    
    public function getNonActiveDate() {
        return $this->nonActiveDate;
    }

    public function setNonActiveDate($nonActiveDate) {
        $this->nonActiveDate = $nonActiveDate;
    }
    
    public function getPhoto() {
        return $this->photo;
    }

    public function setPhoto($photo) {
        $this->photo = $photo;
    }

        
    public function getProject() {
        if(!$this->project){
            $this->project = new Box_Models_Master_Project();
        }
        return $this->project;
    }

    public function setProject(Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function getPt() {
        if(!$this->pt){
            $this->pt = new Box_Models_Master_Pt();
        }
        return $this->pt;
    }

    public function setPt(Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }
    
    public function getFingerPrintCode() {
        return $this->fingerPrintCode;
    }

    public function setFingerPrintCode($fingerPrintCode) {
        $this->fingerPrintCode = $fingerPrintCode;
    }
    
    public function getKlaimFrameTahun() {
        return $this->klaimFrameTahun;
    }
    
    public function getKlaimFrameTanggal() {
        return $this->klaimFrameTanggal;
    }

    public function getKlaimFrameSaldo() {
        return $this->klaimFrameSaldo;
    }

    public function getKlaimLensaTahun() {
        return $this->klaimLensaTahun;
    }
    
    public function getKlaimLensaTanggal() {
        return $this->klaimLensaTanggal;
    }

    public function getKlaimLensaSaldo() {
        return $this->klaimLensaSaldo;
    }

    public function setKlaimFrameTahun($klaimFrameTahun) {
        $this->klaimFrameTahun = $klaimFrameTahun;
    }

    public function setKlaimFrameTanggal($klaimFrameTanggal) {
        $this->klaimFrameTanggal = $klaimFrameTanggal;
    }

    public function setKlaimFrameSaldo($klaimFrameSaldo) {
        $this->klaimFrameSaldo = $klaimFrameSaldo;
    }

    public function setKlaimLensaTahun($klaimLensaTahun) {
        $this->klaimLensaTahun = $klaimLensaTahun;
    }

    public function setKlaimLensaTanggal($klaimLensaTanggal) {
        $this->klaimLensaTanggal = $klaimLensaTanggal;
    }

    public function setKlaimLensaSaldo($klaimLensaSaldo) {
        $this->klaimLensaSaldo = $klaimLensaSaldo;
    }

    
    
    
        
    public function getStatusInformation() {
        if(!$this->statusInformation){
            $this->statusInformation = new Hrd_Models_Master_StatusInformation();
        }
        return $this->statusInformation;
    }

    public function setStatusInformation($statusInformation) {
        $this->statusInformation = $statusInformation;
    }
    
    public function getReportTo() {
        if(!$this->reportTo){
            $this->reportTo = new Hrd_Models_Master_ReportTo();
        }
        return $this->reportTo;
    }

    public function setReportTo(Hrd_Models_Master_ReportTo $reportTo) {
        $this->reportTo = $reportTo;
    }
    
    public function getAlokasiBiaya() {
        if(!$this->alokasiBiaya){
            $this->alokasiBiaya = new Hrd_Models_Master_AlokasiBiaya();
        }
        return $this->alokasiBiaya;
    }

    public function setAlokasiBiaya(Hrd_Models_Master_AlokasiBiaya $alokasiBiaya) {
        $this->alokasiBiaya = $alokasiBiaya;
    }

    public function getDokumenKK() {
        return $this->dokumenKK;
    }

    public function getDokumenNPWP() {
        return $this->dokumenNPWP;
    }

    public function getDokumenKTP() {
        return $this->dokumenKTP;
    }

    public function getDokumenJamsostek() {
        return $this->dokumenJamsostek;
    }

    public function setDokumenKK($dokumenKK) {
        $this->dokumenKK = $dokumenKK;
    }

    public function setDokumenNPWP($dokumenNPWP) {
        $this->dokumenNPWP = $dokumenNPWP;
    }

    public function setDokumenKTP($dokumenKTP) {
        $this->dokumenKTP = $dokumenKTP;
    }

    public function setDokumenJamsostek($dokumenJamsostek) {
        $this->dokumenJamsostek = $dokumenJamsostek;
    }
    
    public function getAlasanResign() {
        return $this->alasanResign;
    }

    public function setAlasanResign($alasanResign) {
        $this->alasanResign = $alasanResign;
    }
    
    public function getAlasanResignId() {
        return $this->alasanresign_id;
    }

    public function setAlasanResignId($alasanresign_id) {
        $this->alasanresign_id = $alasanresign_id;
    }
    
    public function getNomorRekening() {
        return $this->nomorRekening;
    }

    public function getNamaRekening() {
        return $this->namaRekening;
    }

    public function setNomorRekening($nomorRekening) {
        $this->nomorRekening = $nomorRekening;
    }

    public function setNamaRekening($namaRekening) {
        $this->namaRekening = $namaRekening;
    }

    public function getBankRekening() {
        return $this->bankRekening;
    }

    public function setBankRekening($bankRekening) {
        $this->bankRekening = $bankRekening;
    }
    
    public function getEmailCiputra() {
        return $this->emailCiputra;
    }

    public function setEmailCiputra($emailCiputra) {
        $this->emailCiputra = $emailCiputra;
    }

    


    /* added by wulan sari 20200518*/
    function getNo_kk() {
        return $this->no_kk;
    }

    function setNo_kk($no_kk) {
        $this->no_kk = $no_kk;
    }
    
    function getNo_jamsostek() {
        return $this->no_jamsostek;
    }
    
    function setNo_jamsostek($no_jamsostek) {
        $this->no_jamsostek = $no_jamsostek;
    }
    
    function getNo_bpjs_pp() {
        return $this->no_bpjs_pp;
    }
    
    function setNo_bpjs_pp($no_bpjs_pp) {
        $this->no_bpjs_pp = $no_bpjs_pp;
    }
    
    function getNo_bpjs_k() {
        return $this->no_bpjs_k;
    }
    
    function setNo_bpjs_k($no_bpjs_k) {
        $this->no_bpjs_k = $no_bpjs_k;
    }
    
    function getNo_bpjs_kk() {
        return $this->no_bpjs_kk;
    }
    
    function setNo_bpjs_kk($no_bpjs_kk) {
        $this->no_bpjs_kk = $no_bpjs_kk;
    }
    
    function getNo_ijazah() {
        return $this->no_ijazah;
    }
    
    function setNo_ijazah($no_ijazah) {
        $this->no_ijazah = $no_ijazah;
    }
        
    function getNo_manulife_p() {
        return $this->no_manulife_p;
    }
    
    function setNo_manulife_p($no_manulife_p) {
        $this->no_manulife_p = $no_manulife_p;
    }
    
    function getNo_asuransi() {
        return $this->no_asuransi;
    }
    
    function setNo_asuransi($no_asuransi) {
        $this->no_asuransi = $no_asuransi;
    }   

    function getPtkp_id() {
        return intval($this->ptkp_id);
    }

    function setPtkp_id($ptkp_id) {
        $this->ptkp_id = $ptkp_id;
    }
    
    function getNotes() {
        return $this->notes;
    }

    function setNotes($notes) {
        $this->notes = $notes;
    }

    function getEmployeeActiveByuser() {
        return $this->employee_active_byuser;
    }
    
    function setEmployeeActiveByuser($employee_active_byuser) {
        $this->employee_active_byuser = $employee_active_byuser;
    }
    /* end added by wulan sari 20200518*/


    public function getProjectId() {
        return $this->project_id;
    }

    public function setProjectId($project_id) {
        $this->project_id = $project_id;
    }

    public function getProjectName() {
        return $this->project_name;
    }

    public function setProjectName($project_name) {
        $this->project_name = $project_name;
    }

    public function getPtId() {
        return $this->pt_id;
    }

    public function setPtId($pt_id) {
        $this->pt_id = $pt_id;
    }

    public function getPtName() {
        return $this->pt_name;
    }

    public function setPtName($pt_name) {
        $this->pt_name = $pt_name;
    }

    public function getWorklocation() {
        return $this->worklocation;
    }

    public function setWorklocation($worklocation) {
        $this->worklocation = $worklocation;
    }

    public function getWorklocationProject() {
        return $this->worklocation_project;
    }

    public function setWorklocationProject($worklocation_project) {
        $this->worklocation_project = $worklocation_project;
    }

    public function getWorklocationPt() {
        return $this->worklocation_project;
    }

    public function setWorklocationPt($worklocation_project) {
        $this->worklocation_project = $worklocation_project;
    }

    public function getWorklocationId() {
        return $this->worklocation_id;
    }

    public function setWorklocationId($worklocation_id) {
        $this->worklocation_id = $worklocation_id;
    }

    public function getWorklocationProjectId() {
        return $this->worklocation_project_id;
    }

    public function setWorklocationProjectId($worklocation_project_id) {
        $this->worklocation_project_id = $worklocation_project_id;
    }

    public function getWorklocationPtId() {
        return $this->worklocation_project_id;
    }

    public function setWorklocationPtId($worklocation_project_id) {
        $this->worklocation_project_id = $worklocation_project_id;
    }   
        
    public function getDepartmentDepartment() {
        return $this->department_department;
    }

    public function setDepartmentDepartment($department_department) {
        $this->department_department = $department_department;
    }

    public function getEmployeestatusEmployeestatus() {
        return $this->employeestatus_employeestatus;
    }

    public function setEmployeestatusEmployeestatus($employeestatus_employeestatus) {
        $this->employeestatus_employeestatus = $employeestatus_employeestatus;
    }

    public function getPositionPosition() {
        return $this->position_position;
    }

    public function setPositionPosition($position_position) {
        $this->position_position = $position_position;
    }

    public function getGroupCode() {
        return $this->group_code;
    }

    public function setGroupCode($group_code) {
        $this->group_code = $group_code;
    }

    public function getStatusinformationHireDate() {
        return $this->statusinformation_hire_date;
    }

    public function setStatusinformationHireDate($statusinformation_hire_date) {
        $this->statusinformation_hire_date = $statusinformation_hire_date;
    }

    public function getStatusinformationAssignationDate() {
        return $this->statusinformation_assignation_date;
    }

    public function setStatusinformationAssignationDate($statusinformation_assignation_date) {
        $this->statusinformation_assignation_date = $statusinformation_assignation_date;
    }

    public function getStatusinformationContractStart() {
        return $this->statusinformation_contract_start;
    }

    public function setStatusinformationContractStart($statusinformation_contract_start) {
        $this->statusinformation_contract_start = $statusinformation_contract_start;
    } 

    public function getStatusinformationContractEnd() {
        return $this->statusinformation_contract_end;
    }

    public function setStatusinformationContractEnd($statusinformation_contract_end) {
        $this->statusinformation_contract_end = $statusinformation_contract_end;
    }

    public function getStatusinformationConsultantStart() {
        return $this->statusinformation_consultant_start;
    }

    public function setStatusinformationConsultantStart($statusinformation_consultant_start) {
        $this->statusinformation_consultant_start = $statusinformation_consultant_start;
    } 

    public function getStatusinformationConsultantEnd() {
        return $this->statusinformation_consultant_end;
    }

    public function setStatusinformationConsultantEnd($statusinformation_consultant_end) {
        $this->statusinformation_consultant_end = $statusinformation_consultant_end;
    }

    public function getJobfamilyJobfamily() {
        return $this->jobfamily_jobfamily;
    }

    public function setJobfamilyJobfamily($jobfamily_jobfamily) {
        $this->jobfamily_jobfamily = $jobfamily_jobfamily;
    }

    public function getBandingBanding() {
        return $this->banding_banding;
    }

    public function setBandingBanding($banding_banding) {
        $this->banding_banding = $banding_banding;
    }

    public function getIbuKandung() {
        return $this->ibu_kandung;
    }

    public function setIbuKandung($ibu_kandung) {
        $this->ibu_kandung = $ibu_kandung;
    }

    public function getIdType() {
        return $this->id_type;
    }

    public function setIdType($id_type) {
        $this->id_type = $id_type;
    }

    public function getMarriageStatusId() {
        return $this->marriagestatus_marriagestatus_id;
    }

    public function setMarriageStatusId($marriagestatus_marriagestatus_id) {
        $this->marriagestatus_marriagestatus_id = $marriagestatus_marriagestatus_id;
    }

    public function getMarriageStatus() {
        return $this->marriagestatus_marriagestatus;
    }

    public function setMarriageStatus($marriagestatus_marriagestatus) {
        $this->marriagestatus_marriagestatus = $marriagestatus_marriagestatus;
    }

    public function getNationality() {
        return $this->nationality;
    }

    public function setNationality($nationality) {
        $this->nationality = $nationality;
    }

    public function getPayrollGroup() {
        return $this->payroll_group;
    }

    public function setPayrollGroup($payroll_group) {
        $this->payroll_group = $payroll_group;
    }

    public function getPayrollGroupId() {
        return $this->payrollgroup_id;
    }

    public function setPayrollGroupId($payrollgroup_id) {
        $this->payrollgroup_id = $payrollgroup_id;
    }

    public function getPayrollCurrency() {
        return $this->payroll_currency;
    }

    public function setPayrollCurrency($payroll_currency) {
        $this->payroll_currency = $payroll_currency;
    }

    public function getPaymentMethod() {
        return $this->payment_method;
    }

    public function setPaymentMethod($payment_method) {
        $this->payment_method = $payment_method;
    }

    public function getCalendarCompany() {
        return $this->calendar_company;
    }

    public function setCalendarCompany($calendar_company) {
        $this->calendar_company = $calendar_company;
    }

    public function getTaxCountryCode() {
        return $this->tax_country_code;
    }

    public function setTaxCountryCode($tax_country_code) {
        $this->tax_country_code = $tax_country_code;
    }

    public function getCostCenterCode() {
        return $this->cost_center_code;
    }

    public function setCostCenterCode($cost_center_code) {
        $this->cost_center_code = $cost_center_code;
    }

    public function getStatusTransfer() {
        return $this->status_transfer;
    }

    public function setStatusTransfer($status_transfer) {
        $this->status_transfer = $status_transfer;
    }

    public function getActionProcess() {
        return $this->action_process;
    }

    public function setActionProcess($action_process) {
        $this->action_process = $action_process;
    }

    public function getPtkpId() {
        return $this->ptkp_id;
    }

    public function setPtkpId($ptkp_id) {
        $this->ptkp_id = $ptkp_id;
    }

    public function getPtkpClaimId() {
        return $this->ptkp_claim_id;
    }

    public function setPtkpClaimId($ptkp_claim_id) {
        $this->ptkp_claim_id = $ptkp_claim_id;
    }

    public function getPtkpCode() {
        return $this->ptkp_code;
    }

    public function setPtkpCode($ptkp_code) {
        $this->ptkp_code = $ptkp_code;
    }

    public function getPtkpClaimCode() {
        return $this->ptkp_claim_code;
    }

    public function setPtkpClaimCode($ptkp_claim_code) {
        $this->ptkp_claim_code = $ptkp_claim_code;
    }

    public function getEmployeestatusEmployeestatusId() {
        return $this->employeestatus_employeestatus_id;
    }

    public function setEmployeestatusEmployeestatusId($employeestatus_employeestatus_id) {
        $this->employeestatus_employeestatus_id = $employeestatus_employeestatus_id;
    }

    public function getWorkShift() {
        return $this->work_shift;
    }

    public function setWorkShift($work_shift) {
        $this->work_shift = $work_shift;
    }

    public function getCodeAlokasibiaya() {
        return $this->code_alokasibiaya;
    }

    public function setCodeAlokasibiaya($code_alokasibiaya) {
        $this->code_alokasibiaya = $code_alokasibiaya;
    }

    public function getNameAlokasibiaya() {
        return $this->name_alokasibiaya;
    }

    public function setNameAlokasibiaya($name_alokasibiaya) {
        $this->name_alokasibiaya = $name_alokasibiaya;
    }

    public function getCodeAlokasibiaya2() {
        return $this->code_alokasibiaya2;
    }

    public function setCodeAlokasibiaya2($code_alokasibiaya2) {
        $this->code_alokasibiaya2 = $code_alokasibiaya2;
    }

    public function getNameAlokasibiaya2() {
        return $this->name_alokasibiaya2;
    }

    public function setNameAlokasibiaya2($name_alokasibiaya2) {
        $this->name_alokasibiaya2 = $name_alokasibiaya2;
    }

    public function getCodeAlokasibiaya3() {
        return $this->code_alokasibiaya3;
    }

    public function setCodeAlokasibiaya3($code_alokasibiaya3) {
        $this->code_alokasibiaya3 = $code_alokasibiaya3;
    }

    public function getNameAlokasibiaya3() {
        return $this->name_alokasibiaya3;
    }

    public function setNameAlokasibiaya3($name_alokasibiaya3) {
        $this->name_alokasibiaya3 = $name_alokasibiaya3;
    }

    public function getCode() {
        return $this->code;
    }

    public function setCode($code) {
        $this->code = $code;
    }

    public function getCompanyCode() {
        return $this->company_code;
    }

    public function setCompanyCode($company_code) {
        $this->company_code = $company_code;
    }

    public function getAddon() {
        return $this->addon;
    }

    public function setAddon($addon) {
        $this->addon = $addon;
    }

    public function getModion() {
        return $this->modion;
    }

    public function setModion($modion) {
        $this->modion = $modion;
    }

    public function getPayrollEffectiveDate() {
        return $this->payroll_effective_date;
    }

    public function setPayrollEffectiveDate($payroll_effective_date) {
        $this->payroll_effective_date = $payroll_effective_date;
    }

    public function getStatusInformationId() {
        return $this->statusinformation_id;
    }

    public function setStatusInformationId($statusinformation_id) {
        $this->statusinformation_id = $statusinformation_id;
    }

    public function getReligionReligionId() {
        return $this->religion_religion_id;
    }

    public function setReligionReligionId($religion_religion_id) {
        $this->religion_religion_id = $religion_religion_id;
    }

    public function getReligionReligion() {
        return $this->religion_religion;
    }

    public function setReligionReligion($religion_religion) {
        $this->religion_religion = $religion_religion;
    }

    public function getWorklocationCode() {
        return $this->worklocation_code;
    }

    public function setWorklocationCode($worklocation_code) {
        $this->worklocation_code = $worklocation_code;
    }

    public function getReligionId() {
        return $this->religion_id;
    }

    public function setReligionId($religion_id) {
        $this->religion_id = $religion_id;
    }

    public function getReligionName() {
        return $this->religion_name;
    }

    public function setReligionName($religion_name) {
        $this->religion_name = $religion_name;
    }

    public function getNpwpDate() {
        return $this->npwp_effective_date;
    }

    public function setNpwpDate($npwp_effective_date) {
        $this->npwp_effective_date = $npwp_effective_date;
    }

    public function getPtkpDate() {
        return $this->ptkp_effective_date;
    }

    public function setPtkpDate($ptkp_effective_date) {
        $this->ptkp_effective_date = $ptkp_effective_date;
    }

    public function getPtkpClaimDate() {
        return $this->ptkp_claim_effective_date;
    }

    public function setPtkpClaimDate($ptkp_claim_effective_date) {
        $this->ptkp_claim_effective_date = $ptkp_claim_effective_date;
    }

    public function getRekeningDate() {
        return $this->rekening_effective_date;
    }

    public function setRekeningDate($rekening_effective_date) {
        $this->rekening_effective_date = $rekening_effective_date;
    }
   
    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function getUploadEmployeeId() {
        return $this->upload_employee_id;
    }

    public function setUploadEmployeeId($upload_employee_id) {
        $this->upload_employee_id = $upload_employee_id;
    }

    public function getUploadCheck() {
        return $this->upload_check;
    }

    public function setUploadCheck($upload_check) {
        $this->upload_check = $upload_check;
    }

    public function getProses() {
        return $this->proses;
    }

    public function getCancel() {
        return $this->cancel;
    }

    public function setProses($proses) {
        $this->proses = $proses;
    }

    public function setCancel($cancel) {
        $this->cancel = $cancel;
    }

    public function getTotalLate() {
        return $this->total_late;
    }   

    public function setTotalLate($total_late) {
        $this->total_late = $total_late;
    }

    public function getAvgLate() {
        return $this->avg_late;
    }   

    public function setAvgLate($avg_late) {
        $this->avg_late = $avg_late;
    }

    public function getIsChild() {
        return $this->is_child;
    }   

    public function setIsChild($is_child) {
        $this->is_child = $is_child;
    } 

    public function getMasaKerjaStartDate() {
        return $this->masaKerjaStartDate;
    }

    public function setMasaKerjaStartDate($masaKerjaStartDate) {
        $this->masaKerjaStartDate = $masaKerjaStartDate;
    }

    public function getUsiaKerjaStartDate() {
        return $this->usiaKerjaStartDate;
    }

    public function setUsiaKerjaStartDate($usiaKerjaStartDate) {
        $this->usiaKerjaStartDate = $usiaKerjaStartDate;
    }

    public function getIsKompensasi() {
        return $this->isKompensasi;
    }

    public function setIsKompensasi($isKompensasi) {
        $this->isKompensasi = $isKompensasi;
    }

    public function getIsPensiun() {
        return $this->isPensiun;
    }

    public function setIsPensiun($isPensiun) {
        $this->isPensiun = $isPensiun;
    }

    public function getDokumenPasFoto() {
        return $this->dokumen_pas_foto;
    }

    public function setDokumenPasFoto($dokumen_pas_foto) {
        $this->dokumen_pas_foto = $dokumen_pas_foto;
    }

    public function getNoPasFoto() {
        return $this->no_pas_foto;
    }

    public function setNoPasFoto($no_pas_foto) {
        $this->no_pas_foto = $no_pas_foto;
    }

    public function getDokumenStnk() {
        return $this->dokumen_stnk;
    }

    public function setDokumenStnk($dokumen_stnk) {
        $this->dokumen_stnk = $dokumen_stnk;
    }

    public function getNoStnk() {
        return $this->no_stnk;
    }

    public function setNoStnk($no_stnk) {
        $this->no_stnk = $no_stnk;
    }

    public function getListDocumentId() {
       return $this->listdocument_id;
   }
   public function setListDocumentId($listdocument_id) {
       $this->listdocument_id = $listdocument_id;
   }

   public function getHeader_title() {
       return $this->header_title;
   }
   public function setHeader_title($header_title) {
       $this->header_title = $header_title;
   }

   public function getNum_order() {
       return $this->num_order;
   }
   public function setNum_order($num_order) {
       $this->num_order = $num_order;
   }

   public function getField() {
       return $this->field;
   }
   public function setField($field) {
       $this->field = $field;
   }

    public function grouped() {
        return array($this->getReligion(),$this->getBloodGroup(),$this->getMarriage(),$this->getLastEducation(),$this->getStatus(),$this->getStatusInformation());
    }

    public function getArray() {
        return $this->getArrayTable();
    }

    //added by anas 10022022
    function getDokumenVAKSIN3() {
        return $this->dokumenVAKSIN3;
    }    
    function setDokumenVAKSIN3($dokumenVAKSIN3) {
        $this->dokumenVAKSIN3 = $dokumenVAKSIN3;
    }

    function getNoVAKSIN1() {
        return $this->no_vaksin1;
    }    
    function setNoVAKSIN1($no_vaksin1) {
        $this->no_vaksin1 = $no_vaksin1;
    }

    function getNoVAKSIN2() {
        return $this->no_vaksin2;
    }    
    function setNoVAKSIN2($no_vaksin2) {
        $this->no_vaksin2 = $no_vaksin2;
    }

    function getNoVAKSIN3() {
        return $this->no_vaksin3;
    }    
    function setNoVAKSIN3($no_vaksin3) {
        $this->no_vaksin3 = $no_vaksin3;
    }

    //added by anas 29012024
    public function getTotalLost() {
        return $this->total_lost;
    }
    public function setTotalLost($total_lost) {
        $this->total_lost = $total_lost;
    }

    public function getAvgLost() {
        return $this->avg_lost;
    }
    public function setAvgLost($avg_lost) {
        $this->avg_lost = $avg_lost;
    }
    //end added by anas




}

?>
