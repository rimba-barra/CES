<?php

/**
 * Description of Config
 *
 * @author MIS
 */
class Gl_Box_Config {
    const STATUS_PERMANENT = 1;
    const STATUS_CONTRACT = 2;
    const STATUS_CANDIDATE = 3;
    const STATUS_DAILY_PERMANENT = 4;
    const STATUS_DAILY_CONTRACT = 5;
    const STATUS_DAILY_TEMPORARY = 6;
    const PARAM_OVERTIMEVARIABLE = 'overtimeparameter';
    const OVERTIME_TAKENTIME_AFTEROUT = 'AFTER';
    const OVERTIME_TAKENTIME_BEFOREIN = 'BEFORE';
    const OVERTIME_STATUS_BEFOREIN = 1;
    const OVERTIME_STATUS_AFTEROUT = 2;
    const OVERTIME_STATUS_BOTH = 3;
    const OVERTIME_STATUS_HOLIDAY = 4;
    const OVERTIME_STATUS_SHORT_HOLIDAY = 5;
    const OVERTIME_DAYTYPE_HOLIDAY = 2; // lembur di hari libur
    const OVERTIME_DAYTYPE_GENERAL = 1; // lembur di hari biasa
    
    const ABSENTTYPE_SICK = 1009;
    const ABSENTTYPE_IZINMASUKLAMBAT = 1005;
    const ABSENTTYPE_PULANGAWALATAUSAKIT = 1006;
    const ABSENTTYPE_PERMISSION = 1007;
    const ABSENTTYPE_LEAVE = 1004;
    const ABSENTTYPE_CUTIBESAR = 4;
    const ABSENTTYPE_CUTITAHUNAN = 1004;
    
    const ABSENTTYPEGROUP_LEAVE = 2;
    
    const TIME_A_BOT = '07:00:00';
    const TIME_A_TOP = '14:00:00';
    const TIME_B_BOT = '15:00:00';
    const TIME_B_TOP = '21:00:00';
    const TIME_C_BOT = '22:00:00';
    const TIME_C_TOP = '06:00:00';
    
    const ABSENT_EXCEL_FILENAME = 'excelabsent.xls';
    
    const PLAFON_RAWATINAP = 2;
    const PLAFON_SALINNORMAL = 1;
    const PLAFON_SALINABNORMAL = 7;
    const PLAFON_HAMIL = 3;
    const PLAFON_KB = 6;
    const PLAFON_CEKUP = 5;
    const PLAFON_LENSA = 8;
    const PLAFON_FRAME =  4;
    const PLAFON_LAINLAIN = 9;
    
    /*
     * Acuan nama field di form module parameter pengobatan
     */
    const GENERALPARAMATER_NAME_CLAIM_LENSLIMIT = 'claim_lens_limit'; 
    const GENERALPARAMATER_NAME_CLAIM_FRAMELIMIT = 'claim_frame_limit';
    const GENERALPARAMATER_NAME_CLAIM_PASSWORD = 'claim_password';
    
    const EMPLOYEEPARAMETER_NIK_NUMBER = 'nik_number';
    const EMPLOYEEPARAMETER_ATTENDANCE_HOURS = 'attendance_hours';
    const EMPLOYEEPARAMETER_BONUS_ZERO = 'bonus_zero';
    const EMPLOYEEPARAMETER_BONUS_1 = 'bonus_1';
    const EMPLOYEEPARAMETER_BONUS_2 = 'bonus_2';
    const EMPLOYEEPARAMETER_BONUS_3 = 'bonus_3';
    const EMPLOYEEPARAMETER_BONUS_4 = 'bonus_4';
    const EMPLOYEEPARAMETER_NLEAVE_QUOTA = 'nleave_quota';
    const EMPLOYEEPARAMETER_NLEAVE_LIMIT = 'nleave_limit';
    const EMPLOYEEPARAMETER_NLEAVE_AVAILABLE = 'nleave_available';
    const EMPLOYEEPARAMETER_BLEAVE_QUOTA = 'bleave_quota';
    const EMPLOYEEPARAMETER_BLEAVE_LIMIT = 'bleave_limit';
    const EMPLOYEEPARAMETER_BLEAVE_AVAILABLE_1 = 'bleave_available_1';
    const EMPLOYEEPARAMETER_BLEAVE_AVAILABLE_2 = 'bleave_available_2';
    
    const SYS_USEDB_GLOBALPARAMS = 1;
    
    
    const ABSENT_LOST_IN = 1005; // parameter absent type datang telat
    const ABSENT_LOST_OUT = 1006; // parameter absent type pulang cepat
    
    const LEAVE_EXPIRE_DURATION = 2; // year
    const LEAVE_GROUP_TAHUNAN = 1;
    const LEAVE_GROUP_BESAR = 2;
    const LEAVE_IS_KADALUARSA_KADALUARSA = 2;
    
    const BEASISWA_MODULE_BEASISWA = 1;
    const BEASISWA_MODULE_MASUKSEKOLAH = 2;
    
    const PINJAMAN_MODULE_PINJAMAN = 1;
    const PINJAMAN_MODULE_KEJADIAN = 2;
    
    const MEDICALPARAM_PASSWORD = 'medical2015';
    
    const CHANGESTATUSTYPE_PROMOSI = 1;
    const CHANGESTATUSTYPE_ROTASI = 2;
    const CHANGESTATUSTYPE_MUTASI = 3;
    
    const SHIFTTYPE_EXCEL_PATH = 'public/app/gl/uploads/absent/';
    const ABSENT_CSV_PATH = 'public/app/gl/uploads/absent/';
    const TRANSFERDATA_EXCEL_PATH = 'public/app/gl/uploads/transfer/';
    const KOMPONENGAJICSV_PATH = 'public/app/gl/uploads/absent/';
    
    const MIN_BULAN = 1;
    const MAX_BULAN = 12;
    const MIN_TAHUN = 1900;
    const MAX_TAHUN = 2999;
    
    ///////////////////////////////// PAYROLL /////////////////////////////////
    
    const GROUPPAYROLL_B = 'B';
    const GROUPPAYROLL_X = 'X';
    const GROUPPAYROLL_Z = 'Z';
    
    const KOMPONENGAJI_CODE_BONUS = 'BONUS';
    const KOMPONENGAJI_CODE_DANAPENSIUNCOMPANY = 'DANAC';
    const KOMPONENGAJI_CODE_DANAPENSIUNKARYAWAN = 'DANAK';
    const KOMPONENGAJI_CODE_DPT = 'DPT';
    const KOMPONENGAJI_CODE_GAJIPOKOK = 'GAJIPOKOK';
    const KOMPONENGAJI_CODE_JAMINANKEMATIAN = 'JK';
    const KOMPONENGAJI_CODE_JAMINANKECELEKAAN = 'JKC';
    const KOMPONENGAJI_CODE_JAMINANKEMATIANKECELAKAAN = 'JKJKC';
    const KOMPONENGAJI_CODE_MARKETINGADJ = 'MARKET';
    const KOMPONENGAJI_CODE_LEMBUR = 'OT';
    const KOMPONENGAJI_CODE_LEMBURN = 'OTN';
    const KOMPONENGAJI_CODE_JHTCOMPANY = 'PASTEKC';
    const KOMPONENGAJI_CODE_JHTKARYAWAN = 'PJAMSOSTEK';
    const KOMPONENGAJI_CODE_POTLAIN = 'PLAIN';
    const KOMPONENGAJI_CODE_PAJAKAPENGHASILAN21 = 'PPH21';
    const KOMPONENGAJI_CODE_PINJKARYAWAN = 'PPINJAM';
    const KOMPONENGAJI_CODE_PREMIASURANSI = 'PREMI';
    const KOMPONENGAJI_CODE_RAPELLEMBUR = 'ROT';
    const KOMPONENGAJI_CODE_RAPELJHTKARYAWAN = 'RASTEK';
    const KOMPONENGAJI_CODE_RAPELGAJIPOKOK = 'RGP';
    const KOMPONENGAJI_CODE_RAPELJAMINANKECKEM = 'RJKJKK';
    const KOMPONENGAJI_CODE_TUNJASTEK = 'TASTEK';
    const KOMPONENGAJI_CODE_TUNJBBM = 'TBBM';
    const KOMPONENGAJI_CODE_TUNJHARIRAYA = 'THR';
    const KOMPONENGAJI_CODE_TUNJKENDARAAN = 'TKENDARAAN';
    const KOMPONENGAJI_CODE_TUNJKHUSUS = 'TKHUSUS';
    const KOMPONENGAJI_CODE_TUNJLAINLAIN = 'TLAIN';
    const KOMPONENGAJI_CODE_TUNJPPH21 = 'TPPH21';
    const KOMPONENGAJI_CODE_TUNJANGANMAKAN = 'UMAKAN';
    const KOMPONENGAJI_CODE_UANGMAKANEXTRA = 'UMAKANX';
    const KOMPONENGAJI_CODE_UANGPENGOBATAN = 'UOBAT';
    const KOMPONENGAJI_CODE_TUNJTRANSPORT = 'UTRANS';
    
    
    
    private static $variable = array(
        "RT_FATHER"=>1,
        "RT_MOTHER"=>2,
        "RT_SPOUSE"=>3,
        "RT_CHILD"=>4,
        "RT_SAUDARA"=>5,
        "RT_FRIEND"=>6,
        "RT_EMGCONTACT"=>7,
        "payment_flag"=>array(
            "others"=>array(2,"OTHERS")
        ),
       
    );
    
    
    public static function getDailyStatus(){
        return array(self::STATUS_DAILY_CONTRACT,  self::STATUS_DAILY_PERMANENT,self::STATUS_DAILY_TEMPORARY);
    }
    
    public static function getNonDailyStatus(){
        return array(self::STATUS_PERMANENT,self::STATUS_CONTRACT,  self::STATUS_CANDIDATE);
    }

    public static function getv($name) {
        return self::$variable[$name];
   
    }
}

?>
