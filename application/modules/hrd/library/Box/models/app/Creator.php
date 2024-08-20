<?php

/**
 * Description of Creator
 *
 * @author MIS
 */
class Box_Models_App_Creator {

    public function create($className = "", $params = "") {
        switch ($className) {
            case 'newtest':
                return new Hrd_Models_Newtest_NewTest();
                break;
            case 'absent':
                return new Hrd_Models_Absent();
                break;
            case 'absenttype':
                return new Hrd_Models_Master_AbsentType();
                break;
            case 'absenttypegroup':
                return new Hrd_Models_Master_AbsentTypeGroup();
                break;
            case 'alokasibiaya':
                return new Hrd_Models_Master_AlokasiBiaya();
                break;
            case 'anggarantandakasih':
                return new Hrd_Models_Tandakasih_Anggaran();
                break;
            case 'anggarantraining':
                return new Hrd_Models_Training_Anggaran();
                break;
            case 'angsuran':
                return new Hrd_Models_Pinjaman_Angsuran();
                break;
            /* start added by ahmad riadi 15032017 */
            case 'approvalmatrix':
                return new Hrd_Models_Performancemanagement_Approvalmatrix();
                break;
            case 'approvalmatrixdetail':
                return new Hrd_Models_Performancemanagement_Approvalmatrixdetail();
                break;
            case 'approvallevel':
                return new Hrd_Models_Performancemanagement_Approvallevel();
                break;
            /* end added by ahmad riadi 15032017 */
            case 'banding':
                return new Hrd_Models_Performancemanagement_Banding();
                break;
            case 'bank':
                return new Hrd_Models_Payroll_Bank_Bank();
                break;
            case 'beasiswatran':
                return new Hrd_Models_Beasiswa_Transaksi();
                break;
            case 'bloodgroup':
                return new Hrd_Models_Master_Global_BloodGroup();
                break;
            case 'bobotnilai':
                return new Hrd_Models_Master_BobotNilai();
                break;
            case 'calendar':
                return new Hrd_Models_Calendar_Calendar();
                break;
            case 'calendardetail':
                return new Hrd_Models_Calendar_CalendarDetail();
                break;
            case 'child':
                return new Hrd_Models_Master_Child();
                break;
            case 'claim':
                return new Hrd_Models_Claim_Claim();
                break;
            case 'claimglasses':
                return new Hrd_Models_Claim_ClaimGlasses();
                break;
            case 'costcontrol':
                return new Hrd_Models_Payroll_Costcontrol_CostControl();
                break;
            case 'cca':
                return new Hrd_Models_Payroll_Costcontrol_Cca();
                break;
            case 'ccb':
                return new Hrd_Models_Payroll_Costcontrol_Ccb();
                break;
            case 'ccc':
                return new Hrd_Models_Payroll_Costcontrol_Ccc();
                break;
            case 'competency':
                return new Hrd_Models_Performancemanagement_Competency();
                break;
            case 'competencycategory':
                return new Hrd_Models_Performancemanagement_CompetencyCategory();
                break;
            case 'competencynames':
                return new Hrd_Models_Performancemanagement_CompetencyNames();
                break;
            case 'currency':
                return new Hrd_Models_Master_General_Currency();
                break;
            case 'date':
                return new Hrd_Models_Master_General_Date();
                break;
            case 'department':
                return new Hrd_Models_Master_Department($params);
                break;
            case 'trainingdate':
                return new Hrd_Models_Training_DetailDate();
                break;

            case 'dinasdetail':
                return new Hrd_Models_Dinas_TransaksiDetail();
                break;
            case 'dinastran':
                return new Hrd_Models_Dinas_Transaksi();
                break;
            case 'division':
                return new Hrd_Models_Master_Division();
                break;
            case 'editgaji':
                return new Hrd_Models_Payroll_Editgaji_Editgaji();
                break;
            case 'edittunjangan':
                return new Hrd_Models_Payroll_Edittunjangan_EditTunjangan();
                break;
            case 'education':
                return new Hrd_Models_Master_Global_Education();
                break;
            case 'educationhistory':
                return new Hrd_Models_Master_EducationHistory();
                break;
            case 'emgcontact':
                return new Hrd_Models_Master_EmergencyContact();
                break;
            case 'employee':
                return new Hrd_Models_Master_Employee();
                break;
            case 'employeeb':
                return new Hrd_Models_Employee_Employee();
                break;
            case 'employeehistory':
                return new Hrd_Models_Master_Employeehistory();
                break;
            case 'employeepersonal':
                return new Hrd_Models_Master_EmployeePersonal();
                break;
            case 'employeerelation':
                return new Hrd_Models_Master_EmployeeRelation();
                break;
            case 'employeestatus':
                return new Hrd_Models_Master_Status($params);
                break;
            case 'gaji':
                return new Hrd_Models_Payroll_Gaji_Gaji();
                break;
            case 'generalparameter':
                return new Hrd_Models_Master_GeneralParameter();
                break;
            case 'globalparameter':
                return new Hrd_Models_Parameters_Global();
                break;
            case 'group':
                return new Hrd_Models_Master_Group($params);
                break;
            case 'grouppayroll':
                return new Hrd_Models_Master_GroupPayroll();
                break;
            case 'groupposition':
                return new Hrd_Models_Master_GroupPosition();
                break;
            case 'grouptraining':
                return new Hrd_Models_Training_Group();
                break;
            /* start added by ahmad riadi 06-04-2017 */
            case 'intranetcuti':
                return new Hrd_Models_Intranet_Cuti();
                break;
            case 'intranetcutidetail':
                return new Hrd_Models_Intranet_Cutidetail();
                break;
            case 'intranetijin':
                return new Hrd_Models_Intranet_Ijin();
                break;
            case 'intranettukarshift':
                return new Hrd_Models_Intranet_Tukarshift();
                break;
            case 'intranetdinas':
                return new Hrd_Models_Intranet_Dinas();
                break;
            case 'intranetpdlk':
                return new Hrd_Models_Intranet_Pdlk();
                break;
            case 'intranetovertime':
                return new Hrd_Models_Intranet_Overtime();
                break;
            /* end added by ahmad riadi 06-04-2017 */
            // added by Michael 2021.06.15 
            case 'intranetsakit':
                return new Hrd_Models_Intranet_Sakit();
                break;
            // end added by Michael 2021.06.15 
            case 'jabatan':
                return new Hrd_Models_Master_Jabatan();
                break;
            case 'jenispenghargaan':
                return new Hrd_Models_Penghargaan_Jenis();
                break;
            case 'jenispengobatan':
                return new Hrd_Models_Pengobatan_Type();
                break;
            /* start added by ahmad riadi 15032017 */
            case 'jenisdokumen':
                return new Hrd_Models_Master_Jenisdokumen();
                break;
            /* end added by ahmad riadi 15032017 */
            case 'jenjangpendidikan':
                return new Hrd_Models_Master_General_JenjangPendidikan();
                break;
            case 'jobdesc':
                return new Hrd_Models_Jobdesc_Jobdesc();
                break;
            case 'jobfamily':
                return new Hrd_Models_Performancemanagement_JobFamily();
                break;
            case 'jobfunction':
                return new Hrd_Models_Master_JobFunction();
                break;
            case 'jobhistory':
                return new Hrd_Models_Master_JobHistory();
                break;
            case 'joinkomponen':
                return new Hrd_Models_Payroll_Join_Join();
                break;

            case 'karyawanmod':
                return new Hrd_Models_Mod_Karyawan();
                break;
            case 'komponengaji':
                return new Hrd_Models_Payroll_Komponen_Komponen($params == "" ? NULL : $params);
                break;
            case 'komponenlembur':
                return new Hrd_Models_Payroll_Lembur_Komponen();
                break;
            case 'leave':
                return new Hrd_Models_Leave_Leave();
                break;
            case 'leaveentitlement':
                return new Hrd_Models_Leave_LeaveEntitlement();
                break;
            case 'level':
                return new Hrd_Models_Performancemanagement_Level();
                break;
            case 'levelcategory':
                return new Hrd_Models_Performancemanagement_LevelCategory();
                break;
            /* start added by ahmad riadi 06-06-2017 */
            case 'logfingerprint':
                return new Hrd_Models_Absent_Logfingerprint();
                break;
            /* end added by ahmad riadi 06-06-2017 */
            //added by michael 09/12/2021
            case 'alllogfingerprint':
                return new Hrd_Models_Absent_AllLogfingerprint();
                break;
            //end added by michael 09/12/2021
            //added by michael 16/12/2021
            case 'reminderabsensi':
                return new Hrd_Models_Absent_Reminderabsensi();
                break;
            //end added by michael 16/12/2021
            case 'marriagestatus':
                return new Hrd_Models_Master_Global_MarriageStatus();
                break;
            case 'trainingbudget':
                return new Hrd_Models_Training_Trainingbudget_Trainingbudget();
                break;
            case 'trainingallsubholding':
                return new Hrd_Models_Training_Trainingallsubholding_Trainingallsubholding();
                break;
            case 'trainingperiode':
                return new Hrd_Models_Training_Trainingperiode_Trainingperiode();
                break;
            case 'trainingbudgetprogram':
                return new Hrd_Models_Training_Trainingbudgetprogram_Trainingbudgetprogram();
                break;
            case 'trainingbudgetadjustment':
                return new Hrd_Models_Training_Trainingbudgetadjustment_Trainingbudgetadjustment();
                break;
            case 'trainingcaption':
                return new Hrd_Models_Training_Trainingcaption_Trainingcaption();
                break;
            case 'trainingname':
                return new Hrd_Models_Training_Trainingname_Trainingname();
                break;
            case 'trainingschedule':
                return new Hrd_Models_Training_Trainingschedule_Trainingschedule();
                break;
            case 'trainingscheduledate':
                return new Hrd_Models_Training_Trainingschedule_Trainingscheduledate();
                break;
            case 'trainingscheduleemployee':
                return new Hrd_Models_Training_Trainingschedule_Trainingscheduleemployee();
                break;
            case 'trainingschedulecost':
                return new Hrd_Models_Training_Trainingschedule_Trainingschedulecost();
                break;
            case 'trainingregister':
                return new Hrd_Models_Training_Trainingregistration_Trainingregistration();
                break;
            case 'trainingregistrationbrowse':
                return new Hrd_Models_Training_Trainingregistration_Trainingregistrationbrowse();
                break;
            case 'trainingregistrationprocess':
                return new Hrd_Models_Training_Trainingregistration_Trainingregistrationprocess();
                break;
            case 'trainingattendancebrowse':
                return new Hrd_Models_Training_Trainingattendance_Trainingattendancebrowse();
                break;
            case 'trainingattendanceprocess':
                return new Hrd_Models_Training_Trainingattendance_Trainingattendanceprocess();
                break;
            case 'trainingattendancedate':
                return new Hrd_Models_Training_Trainingattendance_Trainingattendancedate();
                break;
            case 'trainingattendancefile':
                return new Hrd_Models_Training_Trainingattendance_Trainingattendancefile();
                break;
            case 'trainingattendanceemployee':
                return new Hrd_Models_Training_Trainingattendance_Trainingattendanceemployee();
                break;
            case 'trainingattendancefileschedule':
                return new Hrd_Models_Training_Trainingattendance_Trainingattendancefileschedule();
                break;
            case 'trainingoutstanding':
                return new Hrd_Models_Training_Trainingoutstanding_Trainingoutstanding();
                break;
            case 'trainingoutstandingtransaction':
                return new Hrd_Models_Training_Trainingoutstanding_Trainingoutstandingtransaction();
                break;
            case 'trainingarsip':
                return new Hrd_Models_Training_Trainingarsip_Trainingarsip();
                break;
            case 'uploadmaster':
                return new Hrd_Models_Upload_Uploadmaster();
                break;
            case 'transferapitransaction':
                return new Hrd_Models_Transferapi_Transferapitransaction();
                break;
            case 'transferapitransactionlog':
                return new Hrd_Models_Transferapi_Transferapitransactionlog();
                break;
            case 'masterkategorisk':
                return new Hrd_Models_Master_Kategorisk_MasterKategoriSK();
                break;
            case 'firstdayform':
                return new Hrd_Models_Firstday_Firstdayform_Firstdayform();
                break;
            case 'firstdayemployee':
                return new Hrd_Models_Firstday_Firstdayemployee_Firstdayemployee();
                break;
            case 'firstdayemployeetransaction':
                return new Hrd_Models_Firstday_Firstdayemployee_Firstdayemployeetransaction();
                break;
            case 'masterworklocation':
                return new Hrd_Models_Master_Worklocation_MasterWorkLocation();
                break;
            case 'worklocationprojectpt':
                return new Hrd_Models_Worklocationprojectpt_Worklocationprojectpt();
                break;
            case 'companycherry':
                return new Hrd_Models_Companycherry_Companycherry();
                break;
            case 'competencywawancara':
                return new Hrd_Models_Performancemanagement_Competencywawancara_Competencywawancara();
                break;
            case 'contohjobfamily':
                return new Hrd_Models_Performancemanagement_Contohjobfamily_Contohjobfamily();
                break;
            case 'projectpt':
                return new Hrd_Models_Master_Projectpt_ProjectPt();
                break;
            case 'ptaccess':
                return new Hrd_Models_Master_Ptaccess_PtAccess();
                break;
            case 'mastersk':
                return new Hrd_Models_Master_Sk_MasterSK();
                break;
            case 'ptkp':
                return new Hrd_Models_Master_Ptkp_Ptkp();
                break;
            case 'personalischild':
                return new Hrd_Models_Personalischild_Personalischild();
                break;
            case 'extraleave':
                return new Hrd_Models_Leave_ExtraLeave();
                break;
            case 'sanksiketerlambatan':
                return new Hrd_Models_Leave_SanksiKeterlambatan();
                break;
            case 'matrixcompetency':
                return new Hrd_Models_Performancemanagement_MatrixCompetency();
                break;
            case 'mod':
                return new Hrd_Models_Mod_Mod();
                break;
            case 'month':
                return new Hrd_Models_Master_General_Month();
                break;
            case 'mutasi':
                return new Hrd_Models_Changestatus_Mutasi();
                break;
            /* start added by ahmad riadi 15032017 */
            case 'mtatatertib':
                return new Hrd_Models_Master_Mtatatertib();
                break;

            /* start added by ahmad riadi 29102017 */
            case 'multiposition':
                return new Hrd_Models_Master_Multiposition();
                break;
            /* start added by ahmad riadi 15032017 */


            case 'mhasilkerja':
                return new Hrd_Models_Master_Mhasilkerja();
                break;
            /* end added by ahmad riadi 15032017 */
            case 'negaratujuan':
                return new Hrd_Models_Dinas_NegaraTujuan();
                break;
            case 'nomorsuratdinas':
                return new Hrd_Models_Dinas_NomorSurat();
                break;
            case 'organization':
                return new Hrd_Models_Organization_Organization();
                break;
            case 'uom':
                return new Hrd_Models_Bsc_Uom();
                break;
            case 'overtime':
                return new Hrd_Models_Overtime_Overtime();
                break;
            case 'overtimeheader':
                return new Hrd_Models_Overtime_Header();
                break;
            case 'overtimeindex':
                return new Hrd_Models_Overtime_Index_Index();
                break;
            case 'overtimevariable':
                return new Hrd_Models_Parameters_Overtimevariable();
                break;
            case 'overtimevp':
                return new Hrd_Models_Master_Overtimevp();
                break;
            case 'parameter':
                return new Hrd_Models_Master_Parameter();
                break;
            //parameterbeasiswa
            /* start added by ahmad riadi 15032017 */
            case 'packagemanagement':
                return new Hrd_Models_Master_Packagemanagement_Packagemanagement();
                break;
            case 'packagemanagementdetail':
                return new Hrd_Models_Master_Packagemanagement_Packagemanagementdetail();
                break;
            /* end added by ahmad riadi 15032017 */
            case 'parameterbeasiswa':
                return new Hrd_Models_Beasiswa_Parameter();
                break;
            case 'parameterlosttime':
                return new Hrd_Models_Parameters_Losttime_LostTime();
                break;
            case 'parametertlk':
                return new Hrd_Models_Parameters_Tlk_Tlk();
                break;
            case 'parameteruang':
                return new Hrd_Models_Dinas_ParameterUang();
                break;
            case 'payparambayar':
                return new Hrd_Models_Payroll_Param_Bayar();
                break;
            case 'payparamlain':
                return new Hrd_Models_Payroll_Param_Lainlain();
                break;
            case 'payparampajak':
                return new Hrd_Models_Payroll_Param_Pajak();
                break;
            case 'payparamptkp':
                return new Hrd_Models_Payroll_Param_Ptkp();
                break;
            case 'penghargaan':
                return new Hrd_Models_Penghargaan_Transaksi();
                break;
            case 'perjalanandinas':
                return new Hrd_Models_Dinas_PerjalananDinas();
                break;
            /* start added by ahmad riadi 15032017 */
            case 'periodeproses':
                return new Hrd_Models_Performancemanagement_Periodeproses();
                break;
            /* end added by ahmad riadi 15032017 */
            case 'perspective':
                return new Hrd_Models_Bsc_Perspective();
                break;
            case 'perspectivepercentage':
                return new Hrd_Models_Bsc_PerspectivePercentage();
                break;
            case 'perspectivepercentagedetail':
                return new Hrd_Models_Bsc_PerspectivePercentageDetail();
                break;
            case 'pinjaman':
                return new Hrd_Models_Pinjaman_Transaksi();
                break;
            case 'plafonkaryawan':
                return new Hrd_Models_Plafon_PlafonKaryawan();
                break;
            /*  case 'plafonkaryawanvalue':
              return new Hrd_Models_Plafon_PlafonKaryawanValue();
              break; */
            case 'plafonpengobatan':
                return new Hrd_Models_Pengobatan_Plafon();
                break;
            case 'polashift':
                return new Hrd_Models_Shift_Pola();
                break;
            case 'position':
                return new Hrd_Models_Master_Position($params);
                break;
            case 'potency':
                return new Hrd_Models_Potency_Potency();
                break;
            case 'potencytran':
                return new Hrd_Models_Potency_Tran();
                break;
            case 'programtraining':
                return new Hrd_Models_Training_Program();
                break;
            case 'project':
                return new Box_Models_Master_Project();
                break;
            case 'promosi':
                return new Hrd_Models_Changestatus_Promosi();
                break;
            case 'prosesgaji':
                return new Hrd_Models_Payroll_Proses_Gaji();
                break;
            case 'pt':
                return new Box_Models_Master_Pt();
                break;
            case 'rangkingpa':
                return new Hrd_Models_Master_RangkingPA();
                break;
            case 'relation':
                return new Hrd_Models_Master_Relation($params == "" ? NULL : $params);
                break;
            case 'religion':
                return new Hrd_Models_Master_Global_Religion();
                break;
            case 'reportto':
                return new Hrd_Models_Master_ReportTo();
                break;
            case 'rotasi':
                return new Hrd_Models_Changestatus_Rotasi();
                break;
            case 'sanction':
                return new Hrd_Models_Sanction_Sanction();
                break;
            case 'sanctiontype':
                return new Hrd_Models_Master_SanctionType();
                break;
            case 'saudara':
                return new Hrd_Models_Master_Saudara();
                break;
            case 'scheduletraining':
                return new Hrd_Models_Training_Schedule();
                break;

            case 'setuppayroll':
                return new Hrd_Models_Payroll_Setup_Setup();
                break;
            case 'sex':
                return new Hrd_Models_Master_Global_Sex();
                break;
            case 'shifttype':
                return new Hrd_Models_Master_ShiftType();
                break;
            case 'spouse':
                return new Hrd_Models_Master_Spouse();
                break;

            case 'statuschange':
                return new Hrd_Models_Statuschange_StatusChange();
                break;
            case 'statusinformation':
                return new Hrd_Models_Master_StatusInformation($params);
                break;
            /* start added by ahmad riadi 15032017 */
            case 'statusperiode':
                return new Hrd_Models_Performancemanagement_Statusperiode();
                break;
            /* end added by ahmad riadi 15032017 */
            case 'tandakasih':
                return new Hrd_Models_Master_TandaKasih();
                break;
            case 'tandakasihtran':
                return new Hrd_Models_Tandakasih_TandaKasih();
                break;
            case 'tipepinjaman':
                return new Hrd_Models_Pinjaman_Tipe();
                break;
            case 'tipetandakasih':
                return new Hrd_Models_Tandakasih_Tipe();
                break;

            case 'training':
                return new Hrd_Models_Master_Training();
                break;
            case 'trainingdetail':
                return new Hrd_Models_Training_TrainingDetail();
                break;
            case 'trainingtran':
                return new Hrd_Models_Training_Training();
                break;
            case 'transfer':
                return new Hrd_Models_Payroll_Transfer_Transfer();
                break;
            case 'transferdetail':
                return new Hrd_Models_Payroll_Transfer_TransferDetail();
                break;
            case 'tunjangangroup':
                return new Hrd_Models_Payroll_Tunjangan_TunjanganGroup();
                break;
            case 'tukeroff': //added by ahmad riadi 06-11-2017
                return new Hrd_Models_Master_Tukeroff();
                break;
            case 'transactionapi': //added by ahmad riadi 09-03-2018
                return new Hrd_Models_Intranet_Transactionapi();
                break;
            case 'tunjangantetap':
                return new Hrd_Models_Payroll_Tunjangan_TunjanganTetap();
                break;
            case 'uangdinas':
                return new Hrd_Models_Dinas_UangDinas();
                break;
            case 'uangdinasdetail':
                return new Hrd_Models_Dinas_UangDinasDetail();
                break;
            case 'variabelgaji':
                return new Hrd_Models_Payroll_Variabel_Variabel();
                break;
            //add by Tirtha
            case 'approvalmatrix':
                return new Hrd_Models_Performancemanagement_Approvalmatrix();
                break;
            case 'approvalmatrixdetail':
                return new Hrd_Models_Performancemanagement_Approvalmatrixdetail();
                break;
            case 'approvallevel':
                return new Hrd_Models_Performancemanagement_Approvallevel();
                break;
            case 'periodeproses':
                return new Hrd_Models_Performancemanagement_Periodeproses();
                break;
            case 'statusperiode':
                return new Hrd_Models_Performancemanagement_Statusperiode();
                break;
            //end add by Tirtha
            // add by wulan
            case 'employeeall':
                return new Hrd_Models_Performancemanagement_Approvalmatrixemployee();
                break;
            case 'departmentall':
                return new Hrd_Models_Performancemanagement_Approvalmatrixdepartment();
                break;
            case 'periodepm':
                return new Hrd_Models_Performancemanagement_Approvalmatrixperiodepm();
                break;
            case 'accesslevel':
                return new Hrd_Models_Master_Accesslevel_Accesslevel();
                break;
            case 'usermonitoringlevel':
                return new Hrd_Models_Performancemanagement_Usermonitoringlevel();
                break;
            case 'monitoringmatrix':
                return new Hrd_Models_Performancemanagement_Monitoringmatrix();
                break;
            case 'monitoringmatrixdetail':
                return new Hrd_Models_Performancemanagement_Monitoringmatrixdetail();
                break;
            case 'monitoringmatrixemployee':
                return new Hrd_Models_Performancemanagement_Monitoringmatrixemployee();
                break;
            case 'scoringbsc':
                return new Hrd_Models_Master_Scoringbsc_Scoringbsc();
                break;
            case 'scoringbscdetail':
                return new Hrd_Models_Master_Scoringbsc_Scoringbscdetail();
                break;
            case 'kelompokabsensi':
                return new Hrd_Models_Master_Kelompokabsensi_Kelompokabsensi();
                break;
            case 'kelompokabsensidetail':
                return new Hrd_Models_Master_Kelompokabsensi_Kelompokabsensidetail();
                break;
            case 'kelompokabsensiemployee':
                return new Hrd_Models_Master_Kelompokabsensi_Kelompokabsensiemployee();
                break;
            case 'reloadpm':
                return new Hrd_Models_Performancemanagement_Reloadpm();
                break;
            case 'codeofconduct':
                return new Hrd_Models_Master_Codeofconduct_Codeofconduct();
                break;
            case 'codeofconductemployee':
                return new Hrd_Models_Master_Codeofconduct_Employee();
                break;
            case 'codeofconductproject':
                return new Hrd_Models_Master_Codeofconduct_Project();
                break;
            case 'organizationchart':
                return new Hrd_Models_Organizationchart_Organizationchart();
                break;
            case 'organizationchartdetail':
                return new Hrd_Models_Organizationchart_Organizationchartdetail();
                break;
            case 'organizationchartposition':
                return new Hrd_Models_Organizationchart_Organizationchartposition();
                break;       
            case 'accessgroup':
                return new Hrd_Models_Master_Accessgroup_Accessgroup();
                break;    
            case 'accessgroupdetail':
                return new Hrd_Models_Accessgroupdetail_Accessgroupdetail();
                break;    
            case 'accessgroupdetaildetail':
                return new Hrd_Models_Accessgroupdetail_Accessgroupdetaildetail();
                break;   
            case 'accessgroupdetailemployee':
                return new Hrd_Models_Accessgroupdetail_Accessgroupdetailemployee();
                break; 
            case 'accessgroupuser':
                return new Hrd_Models_Accessgroupuser_Accessgroupuser();
                break; 
            case 'reasondetail':
                return new Hrd_Models_Absent_Reasondetail();
                break; 
            //end add by Wulan
                
            //added by anas 08122021
            case 'kompensasiextraleave':
                return new Hrd_Models_Leave_KompensasiExtraLeave();
                break;

            //added by anas 02022022
            case 'allemployee':
                return new Hrd_Models_Master_Allemployee();
                break;

            case 'allclaim':
                return new Hrd_Models_Master_Allclaim();
                break;

            //added by anas 20062022
            case 'trainingattendancesurvey':
                return new Hrd_Models_Training_Trainingattendance_Trainingattendancesurvey();

            //added by michael 20220614 | untuk keperluan Cuti Hotel
            case 'paramcuti':
                return new Hrd_Models_Leave_ParamCuti();
                break;
            case 'paramcutiexpired':
                return new Hrd_Models_Leave_ParamCutiExpired();
                break;
            case 'paramcutidetail':
                return new Hrd_Models_Leave_ParamCutiDetail();
                break;
            case 'paramcutiph':
                return new Hrd_Models_Leave_ParamCutiPh();
                break;
            case 'paramcutiphexpired':
                return new Hrd_Models_Leave_ParamCutiPhExpired();
                break;
            case 'paramcutiphdetail':
                return new Hrd_Models_Leave_ParamCutiPhDetail();
                break;
            case 'holidayname':
                return new Hrd_Models_Leave_ParamHoliday();
                break;
            case 'parameterclaim':
                return new Hrd_Models_Parameterclaim_Parameterclaim();
                break;
            case 'claimbasedon':
                return new Hrd_Models_Parameterclaim_Claimbasedon();
                break;
            case 'claimupdate':
                return new Hrd_Models_Parameterclaim_Claimupdate();
                break;

            //added by anas 14092023
            case 'hcreportlog':
                return new Hrd_Models_Master_Hcreportlog();

                break;  
            //added by rico 12012024
            case 'timelog':
                return new Hrd_Models_Absent_Timelog();
                break;  
            //added by rico 12012024
            case 'logabsentdetail':
                return new Hrd_Models_Absent_Logabsentdetail();
                break;        
                
                

            //added by anas 22012024
            case 'statuschange_log':
                return new Hrd_Models_Statuschange_StatusChangelog();
                break;


            //added by anas 06022024
            case 'privacypolicy':
                return new Hrd_Models_Master_Privacypolicy();
                break;        

            //added by rico 26022024
            case 'listperformancemanagement':
                return new Hrd_Models_Master_Listperformancemanagement();
                break;
				
			//added by anas 15012024
            case 'documentcontract':
                return new Hrd_Models_Performancemanagement_DocumentContract();
                break;
            case 'approvalcontract':
                return new Hrd_Models_Performancemanagement_ApprovalContract();
                break;
            case 'pmcontract':
                return new Hrd_Models_Performancemanagement_PMContract();
                break;	
				
            default:
                return NULL;
                break;
        }
    }

}

?>
