Ext.define('Hrd.controller.Transferapimaster', {
    // extend: 'Hrd.template.ControllerForMaster',
    extend: 'Hrd.template.ControllerForMasterDirect',
    // extend: 'Hrd.library.box.controller.ControllerReport',
    // extend: 'Hrd.library.box.controller.Controller',
    alias: 'controller.transferapimaster',
    controllerName: 'transferapimaster',
    bindPrefixName: 'Transferapimaster',
    dateNow: new Date(),
    ParamRender:null,
    last_employee : 0,
    employee_current: 0,
    customfield_count: 0,
    careertransition_count: 0,
    careertransition_last: 0,
    calendar_count: 0,
    calendar_load: 0,
    shift_count: 0,
    shift_load: 0,
    common_count: 0,
    common_load: 0,
    payrollgroup_count: 0,
    payrollgroup_load: 0,
    worklocation_count: 0,
    worklocation_load: 0,
    empstatus_count: 0,
    empstatus_load: 0,
    careertransitiontype_count: 0,
    careertransitiontype_load: 0,
    // urlToken: 'https://careers.ciputragroup.com/api/common/RequestToken',
    // urlServiceRequest: 'https://careers.ciputragroup.com/api/common/ServiceRequest',
    urlToken: '/api/common/RequestToken',
    urlServiceRequest: '/api/common/ServiceRequest',
    otherParamsAT :{leave:0,sick:0,permission:0},
    requires: [
        'Hrd.library.box.tools.Tools',
        'Hrd.library.box.tools.DefaultConfig',
        'Hrd.library.box.tools.EventSelector',
        'Hrd.library.Box.Tools.Browse',
        'Hrd.library.box.tools.Dynamicrequest',
    ],
    refs:[
        {
            ref: 'formprocess',
            selector: 'transferapimasterformprocess'
        },
        {
            ref: 'gridprocess',
            selector: 'transferapimasterprocessgrid'
        },
        {
            ref: 'gridprocessbanding',
            selector: 'transferapimasterprocessbandinggrid'
        },
        {
            ref: 'gridprocessgroup',
            selector: 'transferapimasterprocessgroupgrid'
        },
        {
            ref: 'gridprocessjobfamily',
            selector: 'transferapimasterprocessjobfamilygrid'
        },
        {
            ref: 'gridprocessposition',
            selector: 'transferapimasterprocesspositiongrid'
        },
        {
            ref: 'gridprocessemployee',
            selector: 'transferapimasterprocessemployeegrid'
        },
        
    ],
    init: function(application) {
        this.callParent(arguments);
        var newEvs = {};
        var me = this;
        newEvs['transferapimasterpanel #btnExport'] = {
            click: function(el, val) {
                // this.exportData();  
                me.formProcess();    
            }
        };
        newEvs['transferapimasterformprocess'] = {
            afterrender: function () {
                me.formProcessAfterRender();
            }
        };
        newEvs['transferapimasterpanel [name=projectpt_id]'] = {
            select: function() {
                
               me.selectProjectpt();
            }
        };
        newEvs['transferapimasterpanel [name=transfer_type]'] = {
            change: function() {
               me.selectType();
            }
        };

        newEvs['transferapimasterpanel [name=ptpt_id]'] = {
            select: function() {
               me.selectPt();
            }
        };

        newEvs['transferapimasterformprocess [action=process_cherry]'] = {
            click: function(el, val) {
                me.processCherry();
            }
        };

        //DOWNLOAD LOG
        newEvs['transferapimasterformprocess [action=download_log]'] = {
            click: function(el, val) {
                me.exportData();
            }
        };

        //RESET SAAT GANTI TANGGAL
        newEvs['transferapimasterpanel [name=start_date]'] = {
            focus: function () {
                me.resetAll();
            }
        };
        newEvs['transferapimasterpanel [name=end_date]'] = {
            focus: function () {
                me.resetAll();
            }
        };
        
        console.log(me.controllerName);

        this.control(newEvs);
    },
    /* must override */
    processParams: function(reportData) {
        var me = this;

      
        
       
        var sd = new Date(reportData['params']['start_date']);
        
        //ganti
        // var projectptId = reportData['params']['projectpt_id'];
        //menjadi
        var ptptId = reportData['params']['ptpt_id'];

        // var departmentId = reportData['params']['department_id'];
        var employeeId = reportData['params']['employee_id'];
        reportData['params']['start_date'] = me.tools.dateFunc(reportData['params']['start_date']).toYMD('-');
        reportData['params']['end_date'] = me.tools.dateFunc(reportData['params']['end_date']).toYMD('-');
        reportData['params']['start_date_text'] = me.tools.dateFunc(reportData['params']['start_date']).toDMY('-');
        reportData['params']['end_date_text'] = me.tools.dateFunc(reportData['params']['end_date']).toDMY('-');
        
        //ganti
        //reportData['params']['projectpt_id'] = projectptId==="999"?"0":projectptId;
        //menjadi
        reportData['params']['ptpt_id'] = ptptId==="999"?"0":ptptId;

        // reportData['params']['department_id'] = departmentId==="999"?"0":departmentId;
        reportData['params']['employee_id'] = employeeId==="999"?"0":employeeId;
        

        return reportData;


    },
    
    zendInitLoaded: function(data) {
        var me = this;
        var f = me.getForm();
        var vs = f.getValues();
        
        // ganti
        // me.tools.wesea(data.projectpt, f.down("[name=projectpt_id]")).comboBox(true);
        // menjadi
        me.tools.wesea(data.companycherry, f.down("[name=ptpt_id]")).comboBox(true);

        // me.tools.wesea(data.department, f.down("[name=department_id]")).comboBox(true);
        me.tools.wesea(data.employeeb, f.down("[name=employee_id]")).comboBox(true);

        //ganti
        //f.down("[name=projectpt_id]").setValue('999');
        //menjadi
        f.down("[name=ptpt_id]").setValue('999');

        // f.down("[name=department_id]").setValue('999');
        f.down("[name=employee_id]").setValue('999');

        var choose = vs["transfer_type"];
        if(choose == 'transfer_master'){
             me.setReadonlydata(f);
             f.down("[name=start_date]").setValue('');
             f.down("[name=end_date]").setValue('');
             // f.down("[name=employee_id]").setValue('');
        }else{
            me.unsetReadonlydata(f);
        }
       
        
        return;

    },
    panelAfterRender: function (el) {
        var me = this;
        var f = me.getPanel().down("form");
        var vs = f.getValues();
        me.tools.ajax({
            params: {},
            success: function (data, model) {
                //ganti
                //me.tools.wesea(data.projectpt, f.down("[name=projectpt_id]")).comboBox(true);
                // menjadi
                me.tools.wesea(data.companycherry, f.down("[name=ptpt_id]")).comboBox(true);

                me.tools.wesea(data.employeeb, f.down("[name=employee_id]")).comboBox(true);
                //ganti
                //f.down("[name=projectpt_id]").setValue('999');
                //menjadi
                f.down("[name=ptpt_id]").setValue('999');

                f.down("[name=employee_id]").setValue('999');
            }
        }).read('init');

        var choose = vs["transfer_type"];
        if(choose == 'transfer_master'){
             me.setReadonlydata(f);
             f.down("[name=start_date]").setValue('');
             f.down("[name=end_date]").setValue('');
             // f.down("[name=employee_id]").setValue('');
        }else{
            me.unsetReadonlydata(f);
        }

        
    },
    getEmGrid: function() {
        return this.getForm().down("#employeeListGridID");
    },
    getReportTypeCombo: function() {
        return this.getForm().down("[name=report_type]");
    },
    cleannullinCombo: function (form, value) {
        //ganti
        // if (typeof (form.down("[name=projectpt_id]").getValue()) !== 'number') {
        //     value['projectpt_id'] = '0';
        // }
        //menjadi
        if (typeof (form.down("[name=ptpt_id]").getValue()) !== 'number') {
            value['ptpt_id'] = '0';
        }

        // if (typeof (form.down("[name=department_id]").getValue()) !== 'number') {
        //     value['department_id'] = '0';
        // }
        if (typeof (form.down("[name=employee_id]").getValue()) !== 'number') {
            value['employee_id'] = '0';
        }
        if (!form.down("[name=start_date]").getValue()) {
            value['start_date'] = '1900-01-01';
        }
        if (!form.down("[name=end_date]").getValue()) {
            value['end_date'] = '3000-12-31';
        }
        return value;
    },
     exportData:function(){
        var me, url, formvalue, form;
        me = this;
        form = me.getFormprocess();
        formvalue = me.getFormprocess().getValues();
               
        var p = me.getPanel();
        form.setLoading("Please wait");
        me.tools.ajax({
            params: {},
            params: {
                data: Ext.encode(formvalue)
            },
            success: function (data, model) {
                form.setLoading(false);
                url = data['others'][1]['directdata'];
                if (url) {
                    Ext.Msg.show({
                        title: 'Info',
                        msg: '<a href="' + url + '" target="blank">Download file</a>',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK,
                        fn: function () {
                        }
                    });
                }
            }
        }).read('exportdata');        
     },
     setReadonlydata: function (form) {
        form.down('[name=start_date]').setReadOnly(true);
        form.down('[name=end_date]').setReadOnly(true);
        form.down('[name=employee_id]').setReadOnly(true);
    },
    unsetReadonlydata: function (form) {
        form.down('[name=start_date]').setReadOnly(false);
        form.down('[name=end_date]').setReadOnly(false);
        form.down('[name=employee_id]').setReadOnly(false);
    },
    selectType: function () {
        var me = this;
        var f = me.getPanel().down("form");
        var vs = f.getValues();
        var currentDate = new Date();
        var firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

        var choose = vs["transfer_type"];
        if(choose == 'transfer_master'){
             me.setReadonlydata(f);
             f.down("[name=start_date]").setValue('');
             f.down("[name=end_date]").setValue('');
             f.down("[name=employee_id]").setValue('');
             f.down("[name=ptpt_id]").setValue('999');
        }else{
            me.unsetReadonlydata(f);
            f.down("[name=start_date]").setValue(firstDay);
            f.down("[name=end_date]").setValue(currentDate);
            f.down("[name=ptpt_id]").setValue('999');
        }
        
    },
    resetAll: function () {
        var me = this;
        var f = me.getPanel().down("form");
        var vs = f.getValues();
        
        var choose = vs["transfer_type"];
        if(choose == 'transfer_employee'){
            f.down("[name=ptpt_id]").setValue('999');
            f.down("[name=employee_id]").setValue('999');
        }

    },
     selectProjectpt: function () {
        var me = this;
        var f = me.getPanel().down("form");
        
        var choose_projectpt = f.down("[name=projectpt_id]").getValue();
        
        me.tools.ajax({
        params: {projectpt_id: choose_projectpt},
        success: function (data, model) {
            me.tools.wesea(data.employeeb, f.down("[name=employee_id]")).comboBox();
            }
        }).read('get_employeeprojectpt');
        
    },
    selectPt: function () {
        var me = this;
        var f = me.getPanel().down("form");
        
        var choose_ptpt = f.down("[name=ptpt_id]").getValue();
        var choose_startdate = f.down("[name=start_date]").getValue();
        var choose_enddate   = f.down("[name=end_date]").getValue();
        
        me.tools.ajax({
        params: {pt_id: choose_ptpt,
                start_date : choose_startdate,
                end_date : choose_enddate},
        success: function (data, model) {
            me.tools.wesea(data.employeeb, f.down("[name=employee_id]")).comboBox();
            }
        }).read('get_employeept');
        
    },
    formProcess: function () {
        var me, grid, store;
        me = this;
        var f = me.getPanel().down("form");
        var vs = f.getValues();
        var choose = vs["transfer_type"];

        //HANYA TRANSFER EMPLOYEE AJA YG TIDAK BISA ALL, TP UNTUK SEMENTARA MASTER JUGA
        // if(choose != 'transfer_master'){

            if(f.down('[name=ptpt_id]').getValue() == '' || f.down('[name=ptpt_id]').getValue() == null){
                me.tools.alert.warning("Select Project PT is required");
                return false;
            } else {
                if(f.down('[name=ptpt_id]').getValue() == '999'){
                    me.tools.alert.warning("Project PT tidak boleh ALL");
                    return false;
                }else{
                    me.instantWindow("FormProcess", 950, "Process", "process", "transferapimasterformprocess");

                }
            }

        // }else{
        //     me.instantWindow("FormProcess", 950, "Process", "process", "transferapimasterformprocess");

        // }
        
    },
    formProcessAfterRender: function () {
        var me, grid, store;
        me = this;

        me.last_employee = 0;
        me.employee_current= 0;
        me.customfield_count= 0;
        me.careertransition_count= 0;
        me.careertransition_last= 0;
        me.calendar_count= 0;
        me.shift_count= 0;
        me.common_count= 0;
        me.payrollgroup_count= 0;
        me.worklocation_count= 0;
        me.careertransitiontype_count= 0;
        me.empstatus_count= 0;
        me.calendar_load= 0;
        me.shift_load= 0;
        me.common_load= 0;
        me.payrollgroup_load= 0;
        me.worklocation_load= 0;
        me.careertransitiontype_load= 0;
        me.empstatus_load= 0;

        var f = me.getPanel().down("form");
        //ganti
        // var choose_projectpt = f.down("[name=projectpt_id]").getValue();
        //menjadi
        var choose_ptpt = f.down("[name=ptpt_id]").getValue();
        var choose_employee = f.down("[name=employee_id]").getValue();
        var choose_startdate = f.down("[name=start_date]").getValue();
        var choose_enddate   = f.down("[name=end_date]").getValue();
        
        var fp = me.getFormprocess();

        var vs = f.getValues();
        var choose = vs["transfer_type"];
        fp.down("[action=download_log]").hide();
        fp.setLoading("Please wait...");
        
        if(choose == 'transfer_master'){
            fp.down('#pEmployeeTabID').setDisabled(true);

            fp.down('#pMasterDepartmentTabID').setDisabled(false);
            fp.down('#pMasterBandingTabID').setDisabled(false);
            fp.down('#pMasterGroupTabID').setDisabled(false);
            // fp.down('#pMasterJobFamilyTabID').setDisabled(false);
            fp.down('#pMasterPositionTabID').setDisabled(false);

            fp.down('#tabID').setActiveTab(1);
            
            var gp = me.getGridprocess();
            var sgp = gp.getStore();
            me.tools.ajax({
                params: {
                    //ganti
                    // projectpt_id : choose_projectpt
                    //menjadi
                    pt_id           : choose_ptpt
                },
                success: function (data, model) {
                    me.tools.wesea({data: data, model: model}, gp).grid();
                    sgp.reload();

                    //added by michael 27/09/2021
                    me.tools.alert.info("Silahkan checklist data yang ingin dikirim / Jika tidak checklist data akan dikirimkan semua");
                    //end added by michael 27/09/2021
                }
            }).read('get_master_dept');

            var gpb = me.getGridprocessbanding();
            var sgpb = gpb.getStore();
            me.tools.ajax({
                params: {
                    //ganti
                    // projectpt_id : choose_projectpt
                    //menjadi
                    pt_id           : choose_ptpt
                },
                success: function (data, model) {
                    me.tools.wesea({data: data, model: model}, gpb).grid();
                    sgpb.reload();
                }
            }).read('get_master_banding');

            var gpg = me.getGridprocessgroup();
            var sgpg = gpg.getStore();
            me.tools.ajax({
                params: {
                    //ganti
                    // projectpt_id : choose_projectpt
                    //menjadi
                    pt_id           : choose_ptpt
                },
                success: function (data, model) {
                    me.tools.wesea({data: data, model: model}, gpg).grid();
                    sgpg.reload();
                }
            }).read('get_master_group');

            // var gpjf = me.getGridprocessjobfamily();
            // var sgpjf = gpjf.getStore();
            // me.tools.ajax({
            //     params: {
            //         //ganti
            //         // projectpt_id : choose_projectpt
            //         //menjadi
            //         pt_id           : choose_ptpt
            //     },
            //     success: function (data, model) {
            //         me.tools.wesea({data: data, model: model}, gpjf).grid();
            //         sgpjf.reload();
            //     }
            // }).read('get_master_jobfamily');

            var gpp = me.getGridprocessposition();
            var sgpp = gpp.getStore();
            me.tools.ajax({
                params: {
                    //ganti
                    // projectpt_id : choose_projectpt
                    //menjadi
                    pt_id           : choose_ptpt
                },
                success: function (data, model) {
                    me.tools.wesea({data: data, model: model}, gpp).grid();
                    sgpp.reload();
                }
            }).read('get_master_position');

            fp.down("[name=process_api]").setValue('master');
            fp.down("[name=process_api_model]").setValue('Master');
            fp.setLoading(false);

            

        }else{
            fp.down('#pMasterDepartmentTabID').setDisabled(true);
            fp.down('#pMasterBandingTabID').setDisabled(true);
            fp.down('#pMasterGroupTabID').setDisabled(true);
            // fp.down('#pMasterJobFamilyTabID').setDisabled(true);
            fp.down('#pMasterPositionTabID').setDisabled(true);

            fp.down('#pEmployeeTabID').setDisabled(false);

            fp.down('#tabID').setActiveTab(0);

            var gpe = me.getGridprocessemployee();
            var sgpe = gpe.getStore();

            //comment 27/10/2021
            // me.tools.ajax({
            //     params: {//ganti
            //             // projectpt_id : choose_projectpt
            //             //menjadi
            //             pt_id           : choose_ptpt,
            //              employee_id : choose_employee,
            //              start_date : choose_startdate,
            //              end_date : choose_enddate},
            //     success: function (data, model) {
            //         me.tools.wesea({data: data, model: model}, gpe).grid();
            //         sgpe.reload();
            //         fp.down("[name=process_api]").setValue('employee');
            //         fp.down("[name=process_api_model]").setValue('Employee');

            //         var json_data = JSON.stringify(data);
            //         var need_input_cherry, need_input_cherry_shift, need_input_cherry_calendar;

            //         //CHECK CODECHERRY UDAH KEISI SEMUA BELUM
            //         me.tools.ajax({
            //             params: {   
            //                         pt_id           : choose_ptpt,
            //                          employee_id : choose_employee,
            //                          start_date : choose_startdate,
            //                          end_date : choose_enddate
            //                     },
            //             success: function (data, model) {
            //                 need_input_cherry_code = data.others[0][0];
            //                 if(need_input_cherry_code){
            //                     me.tools.alert.info("Silahkan lengkapi data sebelum dikirim. "+need_input_cherry_code);
            //                     fp.down("[action=process_cherry]").hide();
            //                 }
            //             }
            //         }).read('check_codecherry_employee');

            //         //kalo ada yg belum masternya di cherry
            //         me.tools.ajax({
            //             params: {data:json_data},
            //             success: function (data, model) {
            //                 need_input_cherry_master_emp = data.others[0][0].need_input_cherry_master_emp;

            //                 if(need_input_cherry_master_emp){
            //                     me.tools.alert.info("Ada Master baru yang belum tercatat di Cherry. Silahkan Transfer API Master terlebih dahulu");
            //                     fp.down("[action=process_cherry]").hide();
            //                 } 
            //             }

            //         }).read('get_employee_check');

                    
            //         //CHECK COMMON 
            //         me.tools.ajax({
            //             params: {data:json_data},
            //             success: function (data, model) {
            //                 need_input_cherry = data.others[0][0].need_input_cherry;

            //                 if(need_input_cherry){
            //                     fp.setLoading("Please wait, transfer Global Variable to Cherry...");
            //                     me.common_count = need_input_cherry.length;

            //                     $.each(need_input_cherry, function (key, value) {
            //                         me.saveCommonDb(key,value);
            //                     });

            //                 } 
            //             }

            //         }).read('get_employee_common');

            //         //CHECK WORKSHIFT
            //         me.tools.ajax({
            //             params: {data:json_data},
            //             success: function (data, model) {
            //                 need_input_cherry_shift = data.others[0][0].need_input_cherry_shift;

            //                 if(need_input_cherry_shift){
            //                     fp.setLoading("Please wait, transfer WorkShift to Cherry...");
            //                     me.shift_count = need_input_cherry_shift.length;

            //                     $.each(need_input_cherry_shift, function (key, value) {
            //                         me.saveShiftDb(key,value);
            //                     });
            //                 }
            //             }

            //         }).read('get_employee_workshift');

            //         //CHECK WORKCALENDAR
            //         me.tools.ajax({
            //             params: {data:json_data},
            //             success: function (data, model) {
            //                 need_input_cherry_calendar = data.others[0][0].need_input_cherry_calendar;

            //                 if(need_input_cherry_calendar){
            //                     fp.setLoading("Please wait, transfer Calendar to Cherry...");
            //                     me.calendar_count = need_input_cherry_calendar.length;

            //                     $.each(need_input_cherry_calendar, function (key, value) {
            //                         me.saveCalendarDb(key,value);
            //                     });
            //                 }
                            
                            
            //             }
            //         }).read('get_employee_workcalendar');

            //         //CHECK PAYROLLGROUP
            //         me.tools.ajax({
            //             params: {data:json_data},
            //             success: function (data, model) {
            //                 need_input_cherry_payrollgroup = data.others[0][0].need_input_cherry_payrollgroup;

            //                 if(need_input_cherry_payrollgroup){
            //                     fp.setLoading("Please wait, transfer PayrollGroup to Cherry...");
            //                     me.payrollgroup_count = need_input_cherry_payrollgroup.length;

            //                     $.each(need_input_cherry_payrollgroup, function (key, value) {
            //                         me.savePayrollGroupDb(key,value);
            //                     });
            //                 }
            //             }

            //         }).read('get_employee_payrollgroup');

            //         //CHECK WORKLOCATION
            //         me.tools.ajax({
            //             params: {data:json_data},
            //             success: function (data, model) {
            //                 need_input_cherry_worklocation = data.others[0][0].need_input_cherry_worklocation;

            //                 if(need_input_cherry_worklocation){
            //                     fp.setLoading("Please wait, transfer WorkLocation to Cherry...");
            //                     me.worklocation_count = need_input_cherry_worklocation.length;

            //                     $.each(need_input_cherry_worklocation, function (key, value) {
            //                         me.saveWorkLocationDb(key,value);
            //                     });
            //                 }
            //             }

            //         }).read('get_employee_worklocation');

            //         // empstatus type
            //         var empstatus_var = 'permanent,contract,candidate,daily permanent,daily contract,temporary,consultant';

            //         var need_input_cherry_empstatus = '';
            //         //DB_LOG
            //         me.tools.ajax({
            //             params: {   
            //                         choose_ptpt       : choose_ptpt,
            //                         empstatus_var     : empstatus_var
            //                     },
            //             success: function (data, model) {
            //                 need_input_cherry_empstatus = data.others[0][0].need_input_cherry_empstatus;

            //                 if(need_input_cherry_empstatus){
            //                     fp.setLoading("Please wait, transfer EmployeeStatus to Cherry...");
            //                     me.empstatus_count = need_input_cherry_empstatus.length;

            //                     $.each(need_input_cherry_empstatus, function (key, value) {
            //                         me.saveEmpStatusDb(key,value);
            //                     });
            //                 } 

            //             }
            //         }).read('check_empstatus');

            //         // careertransition type
            //         var careertransition_var = 'Promosi,Rotasi,Mutasi,Demosi,Perubahan Status,Mengundurkan Diri,Pensiun,Pemutusan Hubungan Kerja,Habis Kontrak,Meninggal Dunia,Lainnya';

            //         var need_input_cherry_careertransition = '';
            //         //DB_LOG
            //         me.tools.ajax({
            //             params: {   
            //                         choose_ptpt              : choose_ptpt,
            //                         careertransition_var     : careertransition_var
            //                     },
            //             success: function (data, model) {
            //                 need_input_cherry_careertransition = data.others[0][0].need_input_cherry_careertransition;

            //                 if(need_input_cherry_careertransition){
            //                     fp.setLoading("Please wait, transfer CareerTransitionType to Cherry...");
            //                     me.careertransitiontype_count = need_input_cherry_careertransition.length;

            //                     $.each(need_input_cherry_careertransition, function (key, value) {
            //                         me.saveCareerTransitionDb(key,value);
            //                     });
            //                 } 

            //             }
            //         }).read('check_careertransition');

            //         //careertransition
            //         me.tools.ajax({
            //             params: {   
            //                         choose_ptpt              : choose_ptpt,
            //                         choose_startdate         : choose_startdate,
            //                         choose_enddate           : choose_enddate,
            //                         jsonString               : json_data
            //                     },
            //             success: function (data, model) {
            //                 need_input_cherry_master = data.others[0][0].check_db.need_input_cherry_master;
            //                 need_input_cherry_master_company = data.others[0][0].check_db.need_input_cherry_master_company;
            //                 company_diff = data.others[0][0].check_db.company_diff;
                            
            //                 if(company_diff){
            //                     if(need_input_cherry_master){
            //                         me.tools.alert.info("Ada Proses Mutasi/Promosi/Rotasi/Demosi. Ada Master baru yang belum tercatat di Cherry. Silahkan Transfer API Master terlebih dahulu di PT ("+company_diff+")");
            //                         fp.down("[action=process_cherry]").hide();
            //                     }
                                
            //                     if(need_input_cherry_master_company){
            //                         me.tools.alert.info("Ada Proses Mutasi/Promosi/Rotasi/Demosi. Ada Master Company baru yang belum terdaftar di Cherry. Silahkan cek dan daftarkan yg mungkin belum terdaftar ("+company_diff+") di menu Company.");
            //                         fp.down("[action=process_cherry]").hide();
            //                     }

            //                 }else{
            //                     if(need_input_cherry_master){
            //                         me.tools.alert.info("Ada Proses Mutasi/Promosi/Rotasi/Demosi. Ada Master baru yang belum tercatat di Cherry. Silahkan Transfer API Master terlebih dahulu");
            //                         fp.down("[action=process_cherry]").hide();
            //                     }
            //                 }

            //                 // console.log(need_input_cherry_master);
            //             }
            //         }).read('check_careertransition_employee_first');

                    
            //         fp.setLoading(false);
            //     }
            // }).read('get_master_employee');
            //comment 27/10/2021

            //added by michael 27/09/2021

            //hide dulu buttonnya
            fp.down("[action=process_cherry]").hide();

            //kirim data global dahulu
            me.tools.ajax({
                params: {//ganti
                        // projectpt_id : choose_projectpt
                        //menjadi
                        pt_id           : choose_ptpt,
                         employee_id : choose_employee,
                         start_date : choose_startdate,
                         end_date : choose_enddate},
                success: function (data, model) {
                    // me.tools.wesea({data: data, model: model}, gpe).grid();
                    // sgpe.reload();
                    fp.down("[name=process_api]").setValue('employee');
                    fp.down("[name=process_api_model]").setValue('Employee');

                    var json_data = JSON.stringify(data);
                    var need_input_cherry, need_input_cherry_shift, need_input_cherry_calendar;

                    //CHECK COMMON 
                    me.tools.ajax({
                        params: {data:json_data},
                        success: function (data, model) {
                            need_input_cherry = data.others[0][0].need_input_cherry;

                            if(need_input_cherry){
                                fp.setLoading("Please wait, transfer Global Variable to Cherry...");
                                me.common_count = need_input_cherry.length;

                                $.each(need_input_cherry, function (key, value) {
                                    me.saveCommonDb(key,value);
                                });

                            } 
                        }

                    }).read('get_employee_common');

                    //CHECK WORKSHIFT
                    me.tools.ajax({
                        params: {data:json_data},
                        success: function (data, model) {
                            need_input_cherry_shift = data.others[0][0].need_input_cherry_shift;

                            if(need_input_cherry_shift){
                                fp.setLoading("Please wait, transfer WorkShift to Cherry...");
                                me.shift_count = need_input_cherry_shift.length;

                                $.each(need_input_cherry_shift, function (key, value) {
                                    me.saveShiftDb(key,value);
                                });
                            }
                        }

                    }).read('get_employee_workshift');

                    //CHECK WORKCALENDAR
                    me.tools.ajax({
                        params: {data:json_data},
                        success: function (data, model) {
                            need_input_cherry_calendar = data.others[0][0].need_input_cherry_calendar;

                            if(need_input_cherry_calendar){
                                fp.setLoading("Please wait, transfer Calendar to Cherry...");
                                me.calendar_count = need_input_cherry_calendar.length;

                                $.each(need_input_cherry_calendar, function (key, value) {
                                    me.saveCalendarDb(key,value);
                                });
                            }
                            
                            
                        }
                    }).read('get_employee_workcalendar');

                    //CHECK PAYROLLGROUP
                    me.tools.ajax({
                        params: {data:json_data},
                        success: function (data, model) {
                            need_input_cherry_payrollgroup = data.others[0][0].need_input_cherry_payrollgroup;

                            if(need_input_cherry_payrollgroup){
                                fp.setLoading("Please wait, transfer PayrollGroup to Cherry...");
                                me.payrollgroup_count = need_input_cherry_payrollgroup.length;

                                $.each(need_input_cherry_payrollgroup, function (key, value) {
                                    me.savePayrollGroupDb(key,value);
                                });
                            }
                        }

                    }).read('get_employee_payrollgroup');

                    //CHECK WORKLOCATION
                    me.tools.ajax({
                        params: {data:json_data},
                        success: function (data, model) {
                            need_input_cherry_worklocation = data.others[0][0].need_input_cherry_worklocation;

                            if(need_input_cherry_worklocation){
                                fp.setLoading("Please wait, transfer WorkLocation to Cherry...");
                                me.worklocation_count = need_input_cherry_worklocation.length;

                                $.each(need_input_cherry_worklocation, function (key, value) {
                                    me.saveWorkLocationDb(key,value);
                                });
                            }
                        }

                    }).read('get_employee_worklocation');

                    // empstatus type
                    var empstatus_var = 'permanent,contract,candidate,daily permanent,daily contract,temporary,consultant';

                    var need_input_cherry_empstatus = '';
                    //DB_LOG
                    me.tools.ajax({
                        params: {   
                                    choose_ptpt       : choose_ptpt,
                                    empstatus_var     : empstatus_var
                                },
                        success: function (data, model) {
                            need_input_cherry_empstatus = data.others[0][0].need_input_cherry_empstatus;

                            if(need_input_cherry_empstatus){
                                fp.setLoading("Please wait, transfer EmployeeStatus to Cherry...");
                                me.empstatus_count = need_input_cherry_empstatus.length;

                                $.each(need_input_cherry_empstatus, function (key, value) {
                                    me.saveEmpStatusDb(key,value);
                                });
                            } 

                        }
                    }).read('check_empstatus');

                    // careertransition type
                    var careertransition_var = 'Promosi,Rotasi,Mutasi,Demosi,Perubahan Status,Mengundurkan Diri,Pensiun,Pemutusan Hubungan Kerja,Habis Kontrak,Meninggal Dunia,Lainnya';

                    var need_input_cherry_careertransition = '';
                    //DB_LOG
                    me.tools.ajax({
                        params: {   
                                    choose_ptpt              : choose_ptpt,
                                    careertransition_var     : careertransition_var
                                },
                        success: function (data, model) {
                            need_input_cherry_careertransition = data.others[0][0].need_input_cherry_careertransition;

                            if(need_input_cherry_careertransition){
                                fp.setLoading("Please wait, transfer CareerTransitionType to Cherry...");
                                me.careertransitiontype_count = need_input_cherry_careertransition.length;

                                $.each(need_input_cherry_careertransition, function (key, value) {
                                    me.saveCareerTransitionDb(key,value);
                                });
                            } 

                        }
                    }).read('check_careertransition');

                    
                    // setTimeout(function () {
                    //     fp.setLoading(false);
                    // }, 3000);
                }
            }).read('get_master_employee');
            
            //cek apakah ada master yg belum dikirim
            setTimeout(function () {

            me.tools.ajax({
                params: {//ganti
                        // projectpt_id : choose_projectpt
                        //menjadi
                        pt_id           : choose_ptpt,
                         employee_id : choose_employee,
                         start_date : choose_startdate,
                         end_date : choose_enddate},
                success: function (data, model) {
                    // me.tools.wesea({data: data, model: model}, gpe).grid();
                    // sgpe.reload();
                    fp.down("[name=process_api]").setValue('employee');
                    fp.down("[name=process_api_model]").setValue('Employee');

                    var json_data = JSON.stringify(data);
                    var need_input_cherry, need_input_cherry_shift, need_input_cherry_calendar;

                    //CHECK CODECHERRY UDAH KEISI SEMUA BELUM
                    me.tools.ajax({
                        params: {   
                                    pt_id           : choose_ptpt,
                                     employee_id : choose_employee,
                                     start_date : choose_startdate,
                                     end_date : choose_enddate
                                },
                        success: function (data, model) {
                            need_input_cherry_code = data.others[0][0];
                            if(need_input_cherry_code){
                                me.tools.alert.info("Silahkan lengkapi data sebelum dikirim. "+need_input_cherry_code);
                                fp.down("[action=process_cherry]").hide();
                                fp.setLoading(false);
                            }else{
                                 //kalo ada yg belum masternya di cherry
                                me.tools.ajax({
                                    params: {data:json_data},
                                    success: function (data, model) {
                                        need_input_cherry_master_emp = data.others[0][0].need_input_cherry_master_emp;

                                        if(need_input_cherry_master_emp){
                                            me.tools.alert.info("Ada Master baru yang belum tercatat di Cherry. Silahkan Transfer API Master terlebih dahulu");
                                            fp.down("[action=process_cherry]").hide();
                                            fp.setLoading(false);
                                        }else{
                                            //careertransition
                                            me.tools.ajax({
                                                params: {   
                                                            choose_ptpt              : choose_ptpt,
                                                            choose_startdate         : choose_startdate,
                                                            choose_enddate           : choose_enddate,
                                                            jsonString               : json_data
                                                        },
                                                success: function (data, model) {
                                                    need_input_cherry_master = data.others[0][0].check_db.need_input_cherry_master;
                                                    need_input_cherry_master_company = data.others[0][0].check_db.need_input_cherry_master_company;
                                                    company_diff = data.others[0][0].check_db.company_diff;
                                                    console.log('a');
                                                    if(company_diff){
                                                        console.log('a1');
                                                        if(need_input_cherry_master){
                                                            me.tools.alert.info("Ada Proses Mutasi/Promosi/Rotasi/Demosi. Ada Master baru yang belum tercatat di Cherry. Silahkan Transfer API Master terlebih dahulu di PT ("+company_diff+")");
                                                            fp.down("[action=process_cherry]").hide();
                                                            fp.setLoading(false);
                                                            console.log('a2');
                                                        }
                                                        
                                                        if(need_input_cherry_master_company){
                                                            me.tools.alert.info("Ada Proses Mutasi/Promosi/Rotasi/Demosi. Ada Master Company baru yang belum terdaftar di Cherry. Silahkan cek dan daftarkan yg mungkin belum terdaftar ("+company_diff+") di menu Company.");
                                                            fp.down("[action=process_cherry]").hide();
                                                            fp.setLoading(false);
                                                            console.log('a3');
                                                        }
                                                        
                                                        //added by michael 2023-02-07, krn ada data yg aneh, dia mutasi, master di project pt lama dan baru sudah dikirim, tp tetap tidak muncul saat kirim employeenya
                                                        if(need_input_cherry_master == null && need_input_cherry_master_company == null){
                                                            //munculin data
                                                            me.tools.ajax({
                                                                params: {//ganti
                                                                        // projectpt_id : choose_projectpt
                                                                        //menjadi
                                                                        pt_id           : choose_ptpt,
                                                                         employee_id : choose_employee,
                                                                         start_date : choose_startdate,
                                                                         end_date : choose_enddate},
                                                                success: function (data, model) {
                                                                    me.tools.wesea({data: data, model: model}, gpe).grid();
                                                                    sgpe.reload();
                                                                    me.tools.alert.info("Silahkan checklist data yang ingin dikirim / Jika tidak checklist data akan dikirimkan semua");
                                                                    fp.down("[name=process_api]").setValue('employee');
                                                                    fp.down("[name=process_api_model]").setValue('Employee');
                                                                    fp.setLoading(false);
                                                                    fp.down("[action=process_cherry]").show();
                                                                    
                                                                }
                                                            }).read('get_master_employee');
                                                        }

                                                    }else{
                                                        if(need_input_cherry_master){
                                                            me.tools.alert.info("Ada Proses Mutasi/Promosi/Rotasi/Demosi. Ada Master baru yang belum tercatat di Cherry. Silahkan Transfer API Master terlebih dahulu");
                                                            fp.down("[action=process_cherry]").hide();
                                                            fp.setLoading(false);
                                                            console.log('a4');
                                                        }else{
                                                            console.log('a5');
                                                            //munculin data
                                                            me.tools.ajax({
                                                                params: {//ganti
                                                                        // projectpt_id : choose_projectpt
                                                                        //menjadi
                                                                        pt_id           : choose_ptpt,
                                                                         employee_id : choose_employee,
                                                                         start_date : choose_startdate,
                                                                         end_date : choose_enddate},
                                                                success: function (data, model) {
                                                                    me.tools.wesea({data: data, model: model}, gpe).grid();
                                                                    sgpe.reload();
                                                                    me.tools.alert.info("Silahkan checklist data yang ingin dikirim / Jika tidak checklist data akan dikirimkan semua");
                                                                    fp.down("[name=process_api]").setValue('employee');
                                                                    fp.down("[name=process_api_model]").setValue('Employee');
                                                                    fp.setLoading(false);
                                                                    fp.down("[action=process_cherry]").show();
                                                                    console.log('a6');
                                                                }
                                                            }).read('get_master_employee');
                                                        }
                                                    }
                                                }
                                            }).read('check_careertransition_employee_first');
                                        } 
                                    }

                                }).read('get_employee_check');
                            }
                        }
                    }).read('check_codecherry_employee');

                    
                    fp.setLoading(false);
                }
            }).read('get_master_employee');

            }, 20000);
            //end added by michael 27/09/2021

        }



    },

    //SAVE TO DB EMP STATUS BEFORE API
    saveEmpStatusDb: function (key,value) {
        var me, grid, store;
        me = this;
        
        var jsonString = JSON.stringify(value);
        var result_id;
        //DB_LOG
        me.tools.ajax({
            params: {   
                        jsonString          : jsonString
                    },
            success: function (data, model) {
                if(data.others[0][0].msg == 'berhasil'){
                    result_id = data.others[0][0].result_id;
                    if(result_id){
                        console.log(result_id);
                        var res = me.getEmpStatusToken('submitData',key,value,result_id);
                    }
                }else{
                    console.log('Something error...');
                }
            }
        }).read('save_empstatus_beforeapi');

    },
    //GET TOKEN CHERRY
    getEmpStatusToken: function(action,key,value,result_id){
        var me = this;
        //GET URL DAN USERNAME
        me.tools.ajax({
            params: {},
            success: function (data, model) {
                                    
                var url = data.others[0][0].url;
                var username = data.others[0][0].username;
                var password = data.others[0][0].password;

                $.ajax({
                        type: 'POST',
                        url: url + me.urlToken,
                        contentType: 'application/json',
                        data: JSON.stringify({ 
                                CommandName:"RequestToken",
                                ModelCode:"AppUserAccount",
                                UserName:username,
                                Password:password,
                                ParameterData:[]
                        }),
                        success: function(response){
                            var json = JSON.parse(JSON.stringify(response));
                            var token = json.Token;

                            if(token){
                                if(action == 'submitData'){
                                    me.submitEmpStatusData(token,'insert',key,value,result_id,url,username,password);
                                }
                            }
                            // return token;
                        },
                        error: function(XMLHttpRequest) {
                            console.log('ERROR');
                        }
                }); 
            }
        }).read('urlusername');
        
    },
    //GET SUBMIT CHERRY
    submitEmpStatusData: function(token,action,key,value,result_id,url,username,password){
        var me = this;

        //DEFINITION
            var json_api = JSON.stringify(
                                {
                                    "CommandName":"Submit",
                                    "ModelCode":"EmploymentStatus",
                                    "UserName":username,
                                    "Secure": false,
                                    "Token":token,
                                    "ParameterData": [],
                                    "ModelData": {
                                        "CompanyCode": value.company_code,
                                        "Name": value.name,
                                        "StatusId": "Approved"
                                    },
                                    "ContainFiles": false
                                }
                            );

        $.ajax({
                type: 'POST',
                url: url + me.urlServiceRequest,
                contentType: 'application/json',
                data: json_api ,
                success: function(response){
                    var json = JSON.parse(JSON.stringify(response));
                    var result_data = json.Data;
                    var result_status = json.MessageType;
                    var result_status_message = json.Message;

                    me.updateEmpStatusDb(action,key,value,result_id,result_data,result_status,result_status_message);
                },
                error: function(XMLHttpRequest) {
                    console.log('ERROR');
                }
        }); 
    },
    //UPDATE TO DB EMP STATUS BEFORE API
    updateEmpStatusDb: function (action,key,value,result_id,result_data,result_status,result_status_message) {
        var me, grid, store;
        me = this;
        
        var jsonString = JSON.stringify(value);
        var jsonStringResult = JSON.stringify(result_data);

        // var load = 0;
        // var count = 0;

        //DB_LOG
        me.tools.ajax({
            params: {   
                        action              : action,
                        result_id           : result_id,
                        jsonString          : jsonString,
                        jsonStringResult    : jsonStringResult,
                        result_status       : result_status,
                        result_status_message : result_status_message
                    },
            success: function (data, model) {
                console.log(data);

                var fp = me.getFormprocess();
                var count = parseInt(me.shift_load+1);
                me.empstatus_load = count;
                fp.setLoading("Process EmpStatus data to Cherry "+me.empstatus_load+" of "+me.empstatus_count);

                console.log('empstatus --'+me.empstatus_load+'----'+me.empstatus_count);

                if(me.empstatus_load == me.empstatus_count){
                    me.updateGridEmployee();
                    
                    setTimeout(function () {
                        fp.setLoading(false);
                    }, 3000);
                }
            }
        }).read('update_empstatus_afterapi');

    },

    //SAVE TO DB COMMON BEFORE API
    saveCommonDb: function (key,value) {
        var me, grid, store;
        me = this;
        
        var jsonString = JSON.stringify(value);
        var result_id;
        //DB_LOG
        me.tools.ajax({
            params: {   
                        jsonString          : jsonString
                    },
            success: function (data, model) {
                if(data.others[0][0].msg == 'berhasil'){
                    result_id = data.others[0][0].result_id;
                    if(result_id){
                        console.log(result_id);
                        var res = me.getCommonToken('submitData',key,value,result_id);
                    }
                }else{
                    console.log('Something error...');
                }
            }
        }).read('save_common_beforeapi');

    },
    //GET TOKEN CHERRY
    getCommonToken: function(action,key,value,result_id){
        var me = this;
        //GET URL DAN USERNAME
        me.tools.ajax({
            params: {},
            success: function (data, model) {
                                    
                var url = data.others[0][0].url;
                var username = data.others[0][0].username;
                var password = data.others[0][0].password;

                $.ajax({
                        type: 'POST',
                        url: url + me.urlToken,
                        contentType: 'application/json',
                        data: JSON.stringify({ 
                                CommandName:"RequestToken",
                                ModelCode:"AppUserAccount",
                                UserName:username,
                                Password:password,
                                ParameterData:[]
                        }),
                        success: function(response){
                            var json = JSON.parse(JSON.stringify(response));
                            var token = json.Token;

                            if(token){
                                if(action == 'submitData'){
                                    me.submitCommonData(token,'insert',key,value,result_id,url,username,password);
                                }
                            }
                            // return token;
                        },
                        error: function(XMLHttpRequest) {
                            console.log('ERROR');
                        }
                }); 
            }
        }).read('urlusername');
        
    },
    //GET SUBMIT CHERRY
    submitCommonData: function(token,action,key,value,result_id,url,username,password){
        var me = this;

        //DEFINITION
            var json_api = JSON.stringify(
                                {
                                    "CommandName":"Submit",
                                    "ModelCode":"AppsGlobalLookupVariables",
                                    "UserName":username,
                                    "Secure": false,
                                    "Token":token,
                                    "ParameterData": [],
                                    "ModelData": {
                                        "LookupName": value.key,
                                        "Value": null,
                                        "Name": value.name,
                                        "OrderId": 0,
                                        "Active": true
                                    },
                                    "ContainFiles": false
                                }
                            );

        $.ajax({
                type: 'POST',
                url: url + me.urlServiceRequest,
                contentType: 'application/json',
                data: json_api ,
                success: function(response){
                    var json = JSON.parse(JSON.stringify(response));
                    var result_data = json.Data;
                    var result_status = json.MessageType;
                    var result_status_message = json.Message;

                    me.updateCommonDb(action,key,value,result_id,result_data,result_status,result_status_message);
                },
                error: function(XMLHttpRequest) {
                    console.log('ERROR');
                }
        }); 
    },
    //UPDATE TO DB COMMON BEFORE API
    updateCommonDb: function (action,key,value,result_id,result_data,result_status,result_status_message) {
        var me, grid, store;
        me = this;
        
        var jsonString = JSON.stringify(value);
        var jsonStringResult = JSON.stringify(result_data);

        // var load = 0;
        // var count = 0;

        //DB_LOG
        me.tools.ajax({
            params: {   
                        action              : action,
                        result_id           : result_id,
                        jsonString          : jsonString,
                        jsonStringResult    : jsonStringResult,
                        result_status       : result_status,
                        result_status_message : result_status_message
                    },
            success: function (data, model) {
                console.log(data);

                var fp = me.getFormprocess();
                var count = parseInt(me.common_load+1);
                me.common_load = count;

                fp.setLoading("Process Global Variable data to Cherry "+me.common_load+" of "+me.common_count);

                console.log('GlobalVariable --'+me.common_load+'----'+me.common_count);

                if(me.common_load == me.common_count){
                    me.updateGridEmployee();
                    
                    setTimeout(function () {
                        fp.setLoading(false);
                    }, 3000);
                }
            }
        }).read('update_common_afterapi');

    },

    //SAVE TO DB SHIFT BEFORE API
    saveShiftDb: function (key,value) {
        var me, grid, store;
        me = this;
        
        var jsonString = JSON.stringify(value);
        var result_id;
        //DB_LOG
        me.tools.ajax({
            params: {   
                        jsonString          : jsonString
                    },
            success: function (data, model) {
                if(data.others[0][0].msg == 'berhasil'){
                    result_id = data.others[0][0].result_id;
                    if(result_id){
                        console.log(result_id);
                        var res = me.getShiftToken('submitData',key,value,result_id);
                    }
                }else{
                    console.log('Something error...');
                }
            }
        }).read('save_workshift_beforeapi');

    },
    //GET TOKEN CHERRY
    getShiftToken: function(action,key,value,result_id){
        var me = this;
        //GET URL DAN USERNAME
        me.tools.ajax({
            params: {},
            success: function (data, model) {
                                    
                var url = data.others[0][0].url;
                var username = data.others[0][0].username;
                var password = data.others[0][0].password;

                $.ajax({
                        type: 'POST',
                        url: url + me.urlToken,
                        contentType: 'application/json',
                        data: JSON.stringify({ 
                                CommandName:"RequestToken",
                                ModelCode:"AppUserAccount",
                                UserName:username,
                                Password:password,
                                ParameterData:[]
                        }),
                        success: function(response){
                            var json = JSON.parse(JSON.stringify(response));
                            var token = json.Token;

                            if(token){
                                if(action == 'submitData'){
                                    me.submitShiftData(token,'insert',key,value,result_id,url,username,password);
                                }
                            }
                            // return token;
                        },
                        error: function(XMLHttpRequest) {
                            console.log('ERROR');
                        }
                }); 
            }
        }).read('urlusername');
        
    },
    //GET SUBMIT CHERRY
    submitShiftData: function(token,action,key,value,result_id,url,username,password){
        var me = this;

        //DEFINITION
            var json_api = JSON.stringify(
                                {
                                    "CommandName":"Submit",
                                    "ModelCode":"Workshifts",
                                    "UserName":username,
                                    "Secure": false,
                                    "Token":token,
                                    "ParameterData": [],
                                    "ModelData": {
                                        "CompanyCode": value.company_code,
                                        "Name": value.name,
                                        "Active": true
                                    },
                                    "ContainFiles": false
                                }
                            );

        $.ajax({
                type: 'POST',
                url: url + me.urlServiceRequest,
                contentType: 'application/json',
                data: json_api ,
                success: function(response){
                    var json = JSON.parse(JSON.stringify(response));
                    var result_data = json.Data;
                    var result_status = json.MessageType;
                    var result_status_message = json.Message;

                    me.updateShiftDb(action,key,value,result_id,result_data,result_status,result_status_message);
                },
                error: function(XMLHttpRequest) {
                    console.log('ERROR');
                }
        }); 
    },
    //UPDATE TO DB SHIFT BEFORE API
    updateShiftDb: function (action,key,value,result_id,result_data,result_status,result_status_message) {
        var me, grid, store;
        me = this;
        
        var jsonString = JSON.stringify(value);
        var jsonStringResult = JSON.stringify(result_data);

        // var load = 0;
        // var count = 0;

        //DB_LOG
        me.tools.ajax({
            params: {   
                        action              : action,
                        result_id           : result_id,
                        jsonString          : jsonString,
                        jsonStringResult    : jsonStringResult,
                        result_status       : result_status,
                        result_status_message : result_status_message
                    },
            success: function (data, model) {
                console.log(data);

                var fp = me.getFormprocess();
                var count = parseInt(me.shift_load+1);
                me.shift_load = count;
                fp.setLoading("Process WorkShift data to Cherry "+me.shift_load+" of "+me.shift_count);

                console.log('WorkShift --'+me.shift_load+'----'+me.shift_count);

                if(me.shift_load == me.shift_count){
                    me.updateGridEmployee();
                    
                    setTimeout(function () {
                        fp.setLoading(false);
                    }, 3000);
                }
            }
        }).read('update_workshift_afterapi');

    },

    //SAVE TO DB CALENDAR BEFORE API
    saveCalendarDb: function (key,value) {
        var me, grid, store;
        me = this;
        
        var jsonString = JSON.stringify(value);
        var result_id;
        //DB_LOG
        me.tools.ajax({
            params: {   
                        jsonString          : jsonString
                    },
            success: function (data, model) {
                if(data.others[0][0].msg == 'berhasil'){
                    result_id = data.others[0][0].result_id;
                    if(result_id){
                        console.log(result_id);
                        var res = me.getCalendarToken('submitData',key,value,result_id);
                    }
                }else{
                    console.log('Something error...');
                }
            }
        }).read('save_workcalendar_beforeapi');

    },
    //GET TOKEN CHERRY
    getCalendarToken: function(action,key,value,result_id){
        var me = this;
        //GET URL DAN USERNAME
        me.tools.ajax({
            params: {},
            success: function (data, model) {
                                    
                var url = data.others[0][0].url;
                var username = data.others[0][0].username;
                var password = data.others[0][0].password;

                $.ajax({
                        type: 'POST',
                        url: url + me.urlToken,
                        contentType: 'application/json',
                        data: JSON.stringify({ 
                                CommandName:"RequestToken",
                                ModelCode:"AppUserAccount",
                                UserName:username,
                                Password:password,
                                ParameterData:[]
                        }),
                        success: function(response){
                            var json = JSON.parse(JSON.stringify(response));
                            var token = json.Token;

                            if(token){
                                if(action == 'submitData'){
                                    me.submitCalendarData(token,'insert',key,value,result_id,url,username,password);
                                }
                            }
                            // return token;
                        },
                        error: function(XMLHttpRequest) {
                            console.log('ERROR');
                        }
                }); 
            }
        }).read('urlusername');
        
    },
    //GET SUBMIT CHERRY
    submitCalendarData: function(token,action,key,value,result_id,url,username,password){
        var me = this;

        //DEFINITION
            var json_api = JSON.stringify(
                                {
                                    "CommandName":"Submit",
                                    "ModelCode":"Calendars",
                                    "UserName":username,
                                    "Secure": false,
                                    "Token":token,
                                    "ParameterData": [],
                                    "ModelData": {
                                        "CompanyCode": value.company_code,
                                        "Name": value.name,
                                        "Active": true
                                    },
                                    "ContainFiles": false
                                }
                            );

        $.ajax({
                type: 'POST',
                url: url + me.urlServiceRequest,
                contentType: 'application/json',
                data: json_api ,
                success: function(response){
                    var json = JSON.parse(JSON.stringify(response));
                    var result_data = json.Data;
                    var result_status = json.MessageType;
                    var result_status_message = json.Message;

                    me.updateCalendarDb(action,key,value,result_id,result_data,result_status,result_status_message);
                },
                error: function(XMLHttpRequest) {
                    console.log('ERROR');
                }
        }); 
    },
    //UPDATE TO DB CALENDAR BEFORE API
    updateCalendarDb: function (action,key,value,result_id,result_data,result_status,result_status_message) {
        var me, grid, store;
        me = this;
        
        var jsonString = JSON.stringify(value);
        var jsonStringResult = JSON.stringify(result_data);

        // var load = 0;
        // var count = 0;

        //DB_LOG
        me.tools.ajax({
            params: {   
                        action              : action,
                        result_id           : result_id,
                        jsonString          : jsonString,
                        jsonStringResult    : jsonStringResult,
                        result_status       : result_status,
                        result_status_message : result_status_message
                    },
            success: function (data, model) {
                console.log(data);

                var fp = me.getFormprocess();
                var count = parseInt(me.calendar_load+1);
                me.calendar_load = count;
                fp.setLoading("Process Calendar data to Cherry "+me.calendar_load+" of "+me.calendar_count);

                console.log('Calendar --'+me.calendar_load+'----'+me.calendar_count);

                if(me.calendar_load == me.calendar_count){
                    me.updateGridEmployee();
                    
                    setTimeout(function () {
                        fp.setLoading(false);
                    }, 3000);
                }

            }
        }).read('update_workcalendar_afterapi');

    },

    //SAVE TO DB PayrollGroup BEFORE API
    savePayrollGroupDb: function (key,value) {
        var me, grid, store;
        me = this;
        
        var jsonString = JSON.stringify(value);
        var result_id;
        //DB_LOG
        me.tools.ajax({
            params: {   
                        jsonString          : jsonString
                    },
            success: function (data, model) {
                if(data.others[0][0].msg == 'berhasil'){
                    result_id = data.others[0][0].result_id;
                    if(result_id){
                        console.log(result_id);
                        var res = me.getPayrollGroupToken('submitData',key,value,result_id);
                    }
                }else{
                    console.log('Something error...');
                }
            }
        }).read('save_payrollgroup_beforeapi');

    },
    //GET TOKEN CHERRY
    getPayrollGroupToken: function(action,key,value,result_id){
        var me = this;
        //GET URL DAN USERNAME
        me.tools.ajax({
            params: {},
            success: function (data, model) {
                                    
                var url = data.others[0][0].url;
                var username = data.others[0][0].username;
                var password = data.others[0][0].password;

                $.ajax({
                        type: 'POST',
                        url: url + me.urlToken,
                        contentType: 'application/json',
                        data: JSON.stringify({ 
                                CommandName:"RequestToken",
                                ModelCode:"AppUserAccount",
                                UserName:username,
                                Password:password,
                                ParameterData:[]
                        }),
                        success: function(response){
                            var json = JSON.parse(JSON.stringify(response));
                            var token = json.Token;

                            if(token){
                                if(action == 'submitData'){
                                    me.submitPayrollGroupData(token,'insert',key,value,result_id,url,username,password);
                                }
                            }
                            // return token;
                        },
                        error: function(XMLHttpRequest) {
                            console.log('ERROR');
                        }
                }); 
            }
        }).read('urlusername');
        
    },
    //GET SUBMIT CHERRY
    submitPayrollGroupData: function(token,action,key,value,result_id,url,username,password){
        var me = this;

        //DEFINITION
            var json_api = JSON.stringify(
                                {
                                    "CommandName":"Submit",
                                    "ModelCode":"PayrollGroups",
                                    "UserName":username,
                                    "Secure": false,
                                    "Token":token,
                                    "ParameterData": [],
                                    "ModelData": {
                                        "CompanyCode": value.company_code,
                                        //"TypeCode": value.typecode, 
                                        "TypeCode": "Payroll", 
                                        "Name": value.name,
                                        "Description": value.name,
                                        "InitialAttendanceStartDate": value.date,
                                        "InitialClaimStartDate": value.date,
                                        "InitialOvertimeStartDate": value.date,
                                        "InitialPeriodStartDate": value.date,
                                        "PeriodTypeCode" : "monthly",
                                        "Active": true
                                    },
                                    "ContainFiles": false
                                }
                            );
            // console.log(json_api);
        $.ajax({
                type: 'POST',
                url: url + me.urlServiceRequest,
                contentType: 'application/json',
                data: json_api ,
                success: function(response){
                    var json = JSON.parse(JSON.stringify(response));
                    var result_data = json.Data;
                    var result_status = json.MessageType;
                    var result_status_message = json.Message;

                    me.updatePayrollGroupDb(action,key,value,result_id,result_data,result_status,result_status_message);
                },
                error: function(XMLHttpRequest) {
                    console.log('ERROR');
                }
        }); 
    },
    //UPDATE TO DB PayrollGroup BEFORE API
    updatePayrollGroupDb: function (action,key,value,result_id,result_data,result_status,result_status_message) {
        var me, grid, store;
        me = this;
        
        var jsonString = JSON.stringify(value);
        var jsonStringResult = JSON.stringify(result_data);

        // var load = 0;
        // var count = 0;

        //DB_LOG
        me.tools.ajax({
            params: {   
                        action              : action,
                        result_id           : result_id,
                        jsonString          : jsonString,
                        jsonStringResult    : jsonStringResult,
                        result_status       : result_status,
                        result_status_message : result_status_message
                    },
            success: function (data, model) {
                console.log(data);

                var fp = me.getFormprocess();
                var count = parseInt(me.payrollgroup_load+1);
                me.payrollgroup_load = count;
                fp.setLoading("Process PayrollGroup data to Cherry "+me.payrollgroup_load+" of "+me.payrollgroup_count);

                console.log('PayrollGroup --'+me.payrollgroup_load+'----'+me.payrollgroup_count);

                if(me.payrollgroup_load == me.payrollgroup_count){
                    me.updateGridEmployee();
                    
                    setTimeout(function () {
                        fp.setLoading(false);
                    }, 3000);
                }
            }
        }).read('update_payrollgroup_afterapi');

    },

    //SAVE TO DB WorkLocation BEFORE API
    saveWorkLocationDb: function (key,value) {
        var me, grid, store;
        me = this;
        
        var jsonString = JSON.stringify(value);
        var result_id;
        //DB_LOG
        me.tools.ajax({
            params: {   
                        jsonString          : jsonString
                    },
            success: function (data, model) {
                if(data.others[0][0].msg == 'berhasil'){
                    result_id = data.others[0][0].result_id;
                    if(result_id){
                        console.log(result_id);
                        var res = me.getWorkLocationToken('submitData',key,value,result_id);
                    }
                }else{
                    console.log('Something error...');
                }
            }
        }).read('save_worklocation_beforeapi');

    },
    //GET TOKEN CHERRY
    getWorkLocationToken: function(action,key,value,result_id){
        var me = this;
        //GET URL DAN USERNAME
        me.tools.ajax({
            params: {},
            success: function (data, model) {
                                    
                var url = data.others[0][0].url;
                var username = data.others[0][0].username;
                var password = data.others[0][0].password;

                $.ajax({
                        type: 'POST',
                        url: url + me.urlToken,
                        contentType: 'application/json',
                        data: JSON.stringify({ 
                                CommandName:"RequestToken",
                                ModelCode:"AppUserAccount",
                                UserName:username,
                                Password:password,
                                ParameterData:[]
                        }),
                        success: function(response){
                            var json = JSON.parse(JSON.stringify(response));
                            var token = json.Token;

                            if(token){
                                if(action == 'submitData'){
                                    me.submitWorkLocationData(token,'insert',key,value,result_id,url,username,password);
                                }
                            }
                            // return token;
                        },
                        error: function(XMLHttpRequest) {
                            console.log('ERROR');
                        }
                }); 
            }
        }).read('urlusername');
        
    },
    //GET SUBMIT CHERRY
    submitWorkLocationData: function(token,action,key,value,result_id,url,username,password){
        var me = this;

        //DEFINITION
            var json_api = JSON.stringify(
                                {
                                    "CommandName":"Submit",
                                    "ModelCode":"WorkLocations",
                                    "UserName":username,
                                    "Secure": false,
                                    "Token":token,
                                    "ParameterData": [],
                                    "ModelData": {
                                        "CompanyCode": value.company_code,
                                        "TypeCode": value.typecode, 
                                        "Name": value.name,
                                        "Address": value.address,
                                        "LabelCode": value.labelcode,
                                        "Active": true
                                    },
                                    "ContainFiles": false
                                }
                            );
            // console.log(json_api);
        $.ajax({
                type: 'POST',
                url: url + me.urlServiceRequest,
                contentType: 'application/json',
                data: json_api ,
                success: function(response){
                    var json = JSON.parse(JSON.stringify(response));
                    var result_data = json.Data;
                    var result_status = json.MessageType;
                    var result_status_message = json.Message;

                    me.updateWorkLocationDb(action,key,value,result_id,result_data,result_status,result_status_message);
                },
                error: function(XMLHttpRequest) {
                    console.log('ERROR');
                }
        }); 
    },
    //UPDATE TO DB WorkLocation BEFORE API
    updateWorkLocationDb: function (action,key,value,result_id,result_data,result_status,result_status_message) {
        var me, grid, store;
        me = this;
        
        var jsonString = JSON.stringify(value);
        var jsonStringResult = JSON.stringify(result_data);

        // var load = 0;
        // var count = 0;

        //DB_LOG
        me.tools.ajax({
            params: {   
                        action              : action,
                        result_id           : result_id,
                        jsonString          : jsonString,
                        jsonStringResult    : jsonStringResult,
                        result_status       : result_status,
                        result_status_message : result_status_message
                    },
            success: function (data, model) {
                console.log(data);

                var fp = me.getFormprocess();
                var count = parseInt(me.worklocation_load+1);
                me.worklocation_load = count;
                fp.setLoading("Process WorkLocation data to Cherry "+me.worklocation_load+" of "+me.worklocation_count);

                console.log('WorkLocation --'+me.worklocation_load+'----'+me.worklocation_count);

                if(me.worklocation_load == me.worklocation_count){
                    me.updateGridEmployee();
                    
                    setTimeout(function () {
                        fp.setLoading(false);
                    }, 3000);
                }
            }
        }).read('update_worklocation_afterapi');

    },
    //UPDATE GRID AFTER GRID MUNCUL PERTAMA, JIKA ADA COMMON/CALENDAR/SHIFT/PAYROLLGROUP/CAREERTRANSITION/WORKLOCATION TYPE BARU
    updateGridEmployee: function () {
        var me, grid, store;
        me = this;
        var f = me.getPanel().down("form");
        var choose_ptpt = f.down("[name=ptpt_id]").getValue();
        var choose_employee = f.down("[name=employee_id]").getValue();
        var choose_startdate = f.down("[name=start_date]").getValue();
        var choose_enddate   = f.down("[name=end_date]").getValue();
        var gpe = me.getGridprocessemployee();
        var sgpe = gpe.getStore();
        me.tools.ajax({
            params: {
                        pt_id           : choose_ptpt,
                        employee_id : choose_employee,
                        start_date : choose_startdate,
                        end_date : choose_enddate
                    },
            success: function (data, model) {
                me.tools.wesea({data: data, model: model}, gpe).grid();
                sgpe.reload();
                            
            }
        }).read('get_master_employee');
    },
    DeptSelectAll: function(){
        var me, grid, store;
        me = this;
        var fp = me.getFormprocess();
        fp.down('#tabID').setActiveTab(1);
        gridDept = me.getGridprocess();
        gridDept.getSelectionModel().selectAll();
    },
    BandingSelectAll: function(){
        var me, grid, store;
        me = this;
        var fp = me.getFormprocess();
        fp.down('#tabID').setActiveTab(2);
        gridBanding = me.getGridprocessbanding();
        gridBanding.getSelectionModel().selectAll();
    },
    GroupSelectAll: function(){
        var me, grid, store;
        me = this;
        var fp = me.getFormprocess();
        fp.down('#tabID').setActiveTab(3);
        gridGroup = me.getGridprocessgroup();
        gridGroup.getSelectionModel().selectAll();
    },
    JobFamilySelectAll: function(){
        var me, grid, store;
        me = this;
        gridJobfamily = me.getGridprocessjobfamily();
        gridJobfamily.getSelectionModel().selectAll();
    },
    PositionSelectAll: function(){
        var me, grid, store;
        me = this;
        var fp = me.getFormprocess();
        fp.down('#tabID').setActiveTab(4);
        gridPostion = me.getGridprocessposition();
        gridPostion.getSelectionModel().selectAll();
    },
    EmployeeSelectAll: function(){
        var me, grid, store;
        me = this;
        var fp = me.getFormprocess();
        fp.down('#tabID').setActiveTab(0);
        gridEmployee = me.getGridprocessemployee();
        gridEmployee.getSelectionModel().selectAll();
    },
    //PROCESS TO CHERRY
    processCherry: function () {
        var me, grid, store;
        me = this;
        
        var f = me.getPanel().down("form");
        
        //ganti
        // var choose_projectpt = f.down("[name=projectpt_id]").getValue();
        //menjadi
        var choose_ptpt = f.down("[name=ptpt_id]").getValue();

        var choose_startdate = f.down("[name=start_date]").getValue();
        var choose_enddate   = f.down("[name=end_date]").getValue();
        var choose_employee = f.down("[name=employee_id]").getValue();

        var fp = me.getFormprocess();
        fp.setLoading("Please wait...");
        var process_api = fp.down("[name=process_api]").getValue();
        var process_api_model = fp.down("[name=process_api_model]").getValue();

        if(process_api == 'master'){
            // var str_master = "dept,banding,group,jobfamily,position";

            var str_master = "dept,banding,group,position";
            
            // var str_master = "position";
        }else{
            var str_master = "employee,";
        }
        var strArray_master = str_master.split(",");

        //added by michael 2021.09.20
        Ext.Msg.confirm('Confirm', "Jika anda tidak memilih data maka akan dikirimkan semua / Jika anda memilih data maka hanya data tersebut yang akan dikirimkan. Anda sudah yakin?", function (btn) {
            if (btn == 'yes') {
        //end added by michael 2021.09.20
        
        $.each(strArray_master, function (key, value) {
            if(value){

                //added by michael 2021.09.20

                var department_id_choose = "";
                var banding_id_choose = "";
                var group_id_choose = "";
                var jobfamily_id_choose = "";
                var position_id_choose = "";
                var employee_id_choose = "";

                //DEPT
                if(value == 'dept'){
                    gridDept = me.getGridprocess();
                    recDept = gridDept.getSelectedRecord();
                    
                    if(recDept){
                        idDept = recDept.get("department_id");
                        rowsDept = gridDept.getSelectionModel().getSelection();
                        if (rowsDept.length > 0) {
                            for (var i in rowsDept) {
                                department_id_choose += rowsDept[i]['data']["department_id"] + "~";
                            }
                        }
                    }else{
                        // gridDept.getSelectionModel().selectAll();
                        me.DeptSelectAll();
                        rowsDept = gridDept.getSelectionModel().getSelection();
                        for (var i in rowsDept) {
                            department_id_choose += rowsDept[i]['data']["department_id"] + "~";
                        }
                    }
                }

                //BANDING
                if(value == 'banding'){
                    gridBanding = me.getGridprocessbanding();
                    recBanding = gridBanding.getSelectedRecord();

                    if(recBanding){
                        idBanding = recBanding.get("banding_id");
                        rowsBanding = gridBanding.getSelectionModel().getSelection();
                        if (rowsBanding.length > 0) {
                            for (var i in rowsBanding) {
                                banding_id_choose += rowsBanding[i]['data']["banding_id"] + "~";
                            }
                        }
                    }else{
                        // gridBanding.getSelectionModel().selectAll();
                        me.BandingSelectAll();
                        rowsBanding = gridBanding.getSelectionModel().getSelection();
                        for (var i in rowsBanding) {
                            banding_id_choose += rowsBanding[i]['data']["banding_id"] + "~";
                        }
                    }
                }

                //GROUP
                if(value == 'group'){
                    gridGroup = me.getGridprocessgroup();
                    recGroup = gridGroup.getSelectedRecord();

                    if(recGroup){
                        idGroup = recGroup.get("group_id");
                        rowsGroup = gridGroup.getSelectionModel().getSelection();
                        if (rowsGroup.length > 0) {
                            for (var i in rowsGroup) {
                                group_id_choose += rowsGroup[i]['data']["group_id"] + "~";
                            }
                        }
                    }else{
                        // gridGroup.getSelectionModel().selectAll();
                        me.GroupSelectAll();
                        rowsGroup = gridGroup.getSelectionModel().getSelection();
                        for (var i in rowsGroup) {
                            group_id_choose += rowsGroup[i]['data']["group_id"] + "~";
                        }
                    }
                }

                //JOBFAMILY
                if(value == 'jobfamily'){
                    gridJobfamily = me.getGridprocessjobfamily();
                    recJobfamily = gridJobfamily.getSelectedRecord();

                    if(recJobfamily){
                        idJobfamily = recJobfamily.get("jobfamily_id");
                        rowsJobfamily = gridJobfamily.getSelectionModel().getSelection();
                        if (rowsJobfamily.length > 0) {
                            for (var i in rowsJobfamily) {
                                jobfamily_id_choose += rowsJobfamily[i]['data']["jobfamily_id"] + "~";
                            }
                        }
                    }else{
                        // gridJobfamily.getSelectionModel().selectAll();
                        me.JobFamilySelectAll();
                        rowsJobfamily = gridJobfamily.getSelectionModel().getSelection();
                        for (var i in rowsJobfamily) {
                            jobfamily_id_choose += rowsJobfamily[i]['data']["jobfamily_id"] + "~";
                        }
                    }
                }

                //POSITION
                if(value == 'position'){
                    gridPostion = me.getGridprocessposition();
                    recPostion = gridPostion.getSelectedRecord();

                    if(recPostion){
                        idPostion = recPostion.get("position_id");
                        rowsPostion = gridPostion.getSelectionModel().getSelection();
                        if (rowsPostion.length > 0) {
                            for (var i in rowsPostion) {
                                position_id_choose += rowsPostion[i]['data']["position_id"] + "~";
                            }
                        }
                    }else{
                        // gridPostion.getSelectionModel().selectAll();
                        me.PositionSelectAll();
                        rowsPostion = gridPostion.getSelectionModel().getSelection();
                        for (var i in rowsPostion) {
                            position_id_choose += rowsPostion[i]['data']["position_id"] + "~";
                        }
                    }
                }

                //EMPLOYEE
                if(value == 'employee'){
                    gridEmployee = me.getGridprocessemployee();
                    recEmployee = gridEmployee.getSelectedRecord();

                    if(recEmployee){
                        idEmployee = recEmployee.get("employee_id");
                        rowsEmployee = gridEmployee.getSelectionModel().getSelection();
                        if (rowsEmployee.length > 0) {
                            for (var i in rowsEmployee) {
                                employee_id_choose += rowsEmployee[i]['data']["employee_id"] + "~";
                            }
                        }
                    }else{
                        // gridEmployee.getSelectionModel().selectAll();
                        me.EmployeeSelectAll();
                        rowsEmployee = gridEmployee.getSelectionModel().getSelection();
                        for (var i in rowsEmployee) {
                            employee_id_choose += rowsEmployee[i]['data']["employee_id"] + "~";
                        }
                    }
                }
                //end added by michael 2021.09.20

                //get data
                var datalist, action_to_cherry, data_current_parse, rowdata, lastprocessid;
                me.tools.ajax({
                        params: {
                                    //ganti
                                    // projectpt_id    : choose_projectpt,
                                    //menjadi
                                    pt_id           : choose_ptpt,
                                    start_date      : choose_startdate,
                                    end_date        : choose_enddate,
                                    employee_id     : choose_employee,
                                    process_api     : process_api,
                                    process_api_model : process_api_model,
                                    value           : value,

                                    //added by michael 2021.09.20
                                    department_id_choose    : department_id_choose,
                                    banding_id_choose       : banding_id_choose,
                                    group_id_choose         : group_id_choose,
                                    jobfamily_id_choose     : jobfamily_id_choose,
                                    position_id_choose      : position_id_choose,
                                    employee_id_choose      : employee_id_choose
                                    //end added by michael 2021.09.20
                                },
                        success: function (data, model) {
                            //jika ada, akan di cek dulu ke db dia ud pernah proses apa blm
                            datalist = data;
                            fp.setLoading("Process "+value+" data to Cherry 0 of "+datalist.length);

                            if(value == 'employee'){
                                me.last_employee = datalist.length;
                            }
                            // console.log(this.last_employee);

                            if(datalist){
                                me.tools.ajax({
                                    params: {
                                                process_api         : process_api,
                                                process_api_model   : process_api_model,
                                                value               : value
                                            },
                                    success: function (data, model) {
                                        lastprocessid = data.others[0][0].HASIL;
                                        //SAVE KE DB DULU SEBELUM API (COBA DULU YAAAAAAA)
                                        $.each(datalist, function (key_list, value_list) {

                                            if(value == 'employee'){
                                                var data_current = value_list.employeeb;
                                                var opsi_id      = value_list.employeeb.employee_id;
                                            }
                                            if(value == 'dept'){
                                                var data_current = value_list.department;
                                                var opsi_id      = value_list.department.department_id;
                                            }
                                            if(value == 'banding'){
                                                var data_current = value_list.banding;
                                                var opsi_id      = value_list.banding.banding_id;
                                            }
                                            if(value == 'group'){
                                                var data_current = value_list.group;
                                                var opsi_id      = value_list.group.group_id;
                                            }
                                            if(value == 'jobfamily'){
                                                var data_current = value_list.jobfamily;
                                                var opsi_id      = value_list.jobfamily.jobfamily_id;
                                            }
                                            if(value == 'position'){
                                                var data_current = value_list.position;
                                                var opsi_id      = value_list.position.position_id;
                                            }
                                            
                                            // comment (02/11/2021)
                                            // if(value == 'employee'){
                                            //     var tab = me.getGridprocessemployee();
                                            //     var storetab = tab.getStore();
                                            //     var data_tab = storetab.data.items[key_list].data;
                                            //     data_current = data_tab;
                                            // }
                                            // end comment (02/11/2021)
                                            
                                            var jsonString = JSON.stringify(data_current);

                                            
                                            if(key_list < 1000){
                                                //---------------------------------------------------------- choose_projectpt
                                                me.checkMaster_BeforeAPI(process_api,process_api_model,value,choose_ptpt,choose_startdate,choose_enddate,choose_employee,opsi_id,key_list,data_current,datalist,lastprocessid);
                                                // me.tools.ajax({
                                                //     params: {   
                                                //                 process_api         : process_api,
                                                //                 process_api_model   : process_api_model,
                                                //                 value               : value,
                                                //                 projectpt_id        : choose_projectpt,
                                                //                 start_date          : choose_startdate,
                                                //                 end_date            : choose_enddate,
                                                //                 choose_employee     : choose_employee,
                                                //                 opsi_id             : opsi_id
                                                //             },
                                                //     success: function (data, model) {
                                                //         action_to_cherry = data.others[0][0].ACTION_TO_CHERRY;
                                                //         hasil_get = data.others[0][0].HASIL;
                                                //         // console.log(lastprocessid);
                                                //         var loading = parseInt(key_list+1);
                                                //         fp.setLoading("Process "+value+" data to Cherry "+loading+" of "+datalist.length);
                                                //         console.log("Process "+value+" data to Cherry "+loading+" of "+datalist.length+" opsi_id: "+opsi_id+" value:"+value);
                                                //         console.log(data_current);

                                                //         // if(action_to_cherry == 'insert'){
                                                //         //     //API
                                                //         //     var doIt = 'submitData';
                                                //         //     var res = me.getToken(doIt,value,data_current,action_to_cherry,lastprocessid,'');
                                                //         // }
                                                //         // if(action_to_cherry == 'update'){
                                                //         //     //API
                                                //         //     var doIt = 'updateData';
                                                //         //     var res = me.getToken(doIt,value,data_current,action_to_cherry,lastprocessid,hasil_get);
                                                //         // }
                                                            
                                                //     },
                                                //     failure: function () {
                                                //         console.log('ini error');
                                                //     }
                                                // }).read('checkdata_master');
                                            }else{
                                                setTimeout(function () {
                                                    //---------------------------------------------------------- choose_projectpt
                                                    me.checkMaster_BeforeAPI(process_api,process_api_model,value,choose_ptpt,choose_startdate,choose_enddate,choose_employee,opsi_id,key_list,data_current,datalist,lastprocessid);
                                                }, 10000);

                                            }
                                        });
                                        //UDAH PASTI YAAA
                                        $.each(datalist, function (key_list, value_list) {

                                            if(value == 'employee'){
                                                var data_current = value_list.employeeb;
                                                var opsi_id      = value_list.employeeb.employee_id;
                                            }
                                            if(value == 'dept'){
                                                var data_current = value_list.department;
                                                var opsi_id      = value_list.department.department_id;
                                            }
                                            if(value == 'banding'){
                                                var data_current = value_list.banding;
                                                var opsi_id      = value_list.banding.banding_id;
                                            }
                                            if(value == 'group'){
                                                var data_current = value_list.group;
                                                var opsi_id      = value_list.group.group_id;
                                            }
                                            if(value == 'jobfamily'){
                                                var data_current = value_list.jobfamily;
                                                var opsi_id      = value_list.jobfamily.jobfamily_id;
                                            }
                                            if(value == 'position'){
                                                var data_current = value_list.position;
                                                var opsi_id      = value_list.position.position_id;
                                            }
                                            
                                            // comment (02/11/2021)
                                            // if(value == 'employee'){
                                            //     var tab = me.getGridprocessemployee();
                                            //     var storetab = tab.getStore();
                                            //     var data_tab = storetab.data.items[key_list].data;
                                            //     data_current = data_tab;
                                            // }
                                            // end comment (02/11/2021)

                                            var jsonString = JSON.stringify(data_current);


                                            if(key_list < 1000){
                                                //------------------------------------------------ choose_projectpt
                                                me.checkMaster(process_api,process_api_model,value,choose_ptpt,choose_startdate,choose_enddate,choose_employee,opsi_id,key_list,data_current,datalist,lastprocessid);
                                                // me.tools.ajax({
                                                //     params: {   
                                                //                 process_api         : process_api,
                                                //                 process_api_model   : process_api_model,
                                                //                 value               : value,
                                                //                 projectpt_id        : choose_projectpt,
                                                //                 start_date          : choose_startdate,
                                                //                 end_date            : choose_enddate,
                                                //                 choose_employee     : choose_employee,
                                                //                 opsi_id             : opsi_id
                                                //             },
                                                //     success: function (data, model) {
                                                //         action_to_cherry = data.others[0][0].ACTION_TO_CHERRY;
                                                //         hasil_get = data.others[0][0].HASIL;
                                                //         // console.log(lastprocessid);
                                                //         var loading = parseInt(key_list+1);
                                                //         fp.setLoading("Process "+value+" data to Cherry "+loading+" of "+datalist.length);
                                                //         console.log("Process "+value+" data to Cherry "+loading+" of "+datalist.length+" opsi_id: "+opsi_id+" value:"+value);
                                                //         console.log(data_current);

                                                //         // if(action_to_cherry == 'insert'){
                                                //         //     //API
                                                //         //     var doIt = 'submitData';
                                                //         //     var res = me.getToken(doIt,value,data_current,action_to_cherry,lastprocessid,'');
                                                //         // }
                                                //         // if(action_to_cherry == 'update'){
                                                //         //     //API
                                                //         //     var doIt = 'updateData';
                                                //         //     var res = me.getToken(doIt,value,data_current,action_to_cherry,lastprocessid,hasil_get);
                                                //         // }
                                                            
                                                //     },
                                                //     failure: function () {
                                                //         console.log('ini error');
                                                //     }
                                                // }).read('checkdata_master');
                                            }else{
                                                setTimeout(function () {
                                                    //------------------------------------------------ choose_projectpt
                                                    me.checkMaster(process_api,process_api_model,value,choose_ptpt,choose_startdate,choose_enddate,choose_employee,opsi_id,key_list,data_current,datalist,lastprocessid);
                                                }, 10000);

                                            }
                                        });
                                    }
                                }).read('get_lastprocessid');
                            }else{
                                console.log('kosong...');
                                alert('Tidak ada data yang di process');
                            }
                        }
                }).read('get_master_'+value);
                
            }

        });
        
        //added by michael 2021.09.20
            }
        });
        //end added by michael 2021.09.20
    },
    //Looping cek master
    //----------------------------------------------------------------- choose_projectpt
    checkMaster_BeforeAPI: function(process_api,process_api_model,value,choose_ptpt,choose_startdate,choose_enddate,choose_employee,opsi_id,key_list,data_current,datalist,lastprocessid){
        var me = this;
        var fp = me.getFormprocess();
        var jsonCurrent = JSON.stringify(data_current);

        me.tools.ajax({
            params: {   
                        process_api         : process_api,
                        process_api_model   : process_api_model,
                        value               : value,
                        //projectpt_id        : choose_projectpt,
                        pt_id               : choose_ptpt,
                        start_date          : choose_startdate,
                        end_date            : choose_enddate,
                        choose_employee     : choose_employee,
                        opsi_id             : opsi_id,
                        jsonCurrent         : jsonCurrent
                    },
            success: function (data, model) {
                action_to_cherry = data.others[0][0].ACTION_TO_CHERRY;
                hasil_get = data.others[0][0].HASIL;

                //------------------------------------------------------- choose_projectpt
                // me.saveDbLogBeforeAPI(process_api,process_api_model,value,choose_ptpt,choose_startdate,choose_enddate,choose_employee,opsi_id,key_list,data_current,datalist,lastprocessid);

                changeprofile = data.others[0][0].changeprofile;
                changepayroll = data.others[0][0].changepayroll;
                
                var process_to_cherry = 0;

                if(value == 'employee'){
                    if(action_to_cherry == 'update'){
                        if(changeprofile || changepayroll){
                            process_to_cherry = 1;
                        }else{
                            process_to_cherry = 0;
                        }
                    }else{
                        process_to_cherry = 1;
                    }
                }else{
                    process_to_cherry = 1;
                }

                if(value == 'employee'){
                    // if(process_to_cherry == 1){
                        //------------------------------------------------------- choose_projectpt
                        me.saveDbLogBeforeAPI(process_api,process_api_model,value,choose_ptpt,choose_startdate,choose_enddate,choose_employee,opsi_id,key_list,data_current,datalist,lastprocessid);
                    // }

                    // if(process_to_cherry == 1 && changeprofile){
                    //     //------------------------------------------------------- choose_projectpt
                    //     me.saveDbLogBeforeAPI(process_api,process_api_model,value,choose_ptpt,choose_startdate,choose_enddate,choose_employee,opsi_id,key_list,data_current,datalist,lastprocessid);
                    // }

                    // if(process_to_cherry == 1 && changepayroll){
                    //     //------------------------------------------------------- choose_projectpt
                    //     me.saveDbLogBeforeAPI(process_api,process_api_model,value,choose_ptpt,choose_startdate,choose_enddate,choose_employee,opsi_id,key_list,data_current,datalist,lastprocessid);
                    // }
                }else{
                    //------------------------------------------------------- choose_projectpt
                    me.saveDbLogBeforeAPI(process_api,process_api_model,value,choose_ptpt,choose_startdate,choose_enddate,choose_employee,opsi_id,key_list,data_current,datalist,lastprocessid);
                }

                                                                
            },
            failure: function () {
                console.log('ini error');
            }
    }).read('checkdata_master');
    },
    //Looping cek master
    //------------------------------------------------------- choose_projectpt
    checkMaster: function(process_api,process_api_model,value,choose_ptpt,choose_startdate,choose_enddate,choose_employee,opsi_id,key_list,data_current,datalist,lastprocessid){
        var me = this;
        var fp = me.getFormprocess();
        var jsonCurrent = JSON.stringify(data_current);

        me.tools.ajax({
            params: {   
                        process_api         : process_api,
                        process_api_model   : process_api_model,
                        value               : value,
                        //projectpt_id        : choose_projectpt,
                        pt_id               : choose_ptpt,
                        start_date          : choose_startdate,
                        end_date            : choose_enddate,
                        choose_employee     : choose_employee,
                        opsi_id             : opsi_id,
                        jsonCurrent         : jsonCurrent
                    },
            success: function (data, model) {
                action_to_cherry = data.others[0][0].ACTION_TO_CHERRY;
                hasil_get = data.others[0][0].HASIL;
                changeprofile = data.others[0][0].changeprofile;
                changepayroll = data.others[0][0].changepayroll;

                var process_to_cherry = 0;

                if(value == 'employee'){
                    if(action_to_cherry == 'update'){
                        if(changeprofile || changepayroll){
                            process_to_cherry = 1;
                        }else{
                            process_to_cherry = 0;
                        }
                    }else{
                        process_to_cherry = 1;
                    }
                }else{
                    process_to_cherry = 1;
                }

                // console.log(lastprocessid);
                var loading = parseInt(key_list+1);
                me.employee_current = loading;
                fp.setLoading("Process "+value+" data to Cherry "+loading+" of "+datalist.length);
                console.log("Process "+value+" data to Cherry "+loading+" of "+datalist.length+" opsi_id: "+opsi_id+" value:"+value);
                console.log(data_current);

                // if(process_to_cherry == 1){
                    if(action_to_cherry == 'insert'){
                        //API
                        var doIt = 'submitData';
                        var res = me.getToken(doIt,value,data_current,action_to_cherry,lastprocessid,'',changeprofile,changepayroll);
                    }
                    if(action_to_cherry == 'update' || action_to_cherry == 'already up-to-date'){
                        //API
                        var doIt = 'updateData';
                        var res = me.getToken(doIt,value,data_current,action_to_cherry,lastprocessid,hasil_get,changeprofile,changepayroll);
                    }
                // }
                                                                
            },
            failure: function () {
                console.log('ini error');
            }
    }).read('checkdata_master');
    },
    //GET TOKEN CHERRY
    getToken: function(val,value,data_current,action_to_cherry,lastprocessid,hasil_get,changeprofile,changepayroll){
        var me = this;
        //GET URL DAN USERNAME
        me.tools.ajax({
            params: {},
            success: function (data, model) {
                                    
                var url = data.others[0][0].url;
                var username = data.others[0][0].username;
                var password = data.others[0][0].password;

                $.ajax({
                        type: 'POST',
                        url: url + me.urlToken,
                        contentType: 'application/json',
                        data: JSON.stringify({ 
                                CommandName:"RequestToken",
                                ModelCode:"AppUserAccount",
                                UserName:username,
                                Password:password,
                                ParameterData:[]
                        }),
                        success: function(response){
                            var json = JSON.parse(JSON.stringify(response));
                            var token = json.Token;

                            if(token){
                                if(val == 'submitData'){
                                    me.submitData(token,value,data_current,action_to_cherry,lastprocessid,url,username,password);
                                }
                                if(val == 'getlistData'){
                                    me.getlistData(token);
                                }
                                if(val == 'updateData'){
                                    me.updateData(token,value,data_current,action_to_cherry,lastprocessid,hasil_get,changeprofile,changepayroll,url,username,password);
                                }
                            }
                            // return token;
                        },
                        error: function(XMLHttpRequest) {
                            console.log('ERROR');
                        }
                }); 
            }
        }).read('urlusername');
        
    },
    //GET SUBMIT CHERRY
    submitData: function(token,value,data_current,action_to_cherry,lastprocessid,url,username,password){
        var me = this;

        //DEFINITION
        if(value == 'dept'){
            var json_api = JSON.stringify(
                                {
                                    "CommandName":"Submit",
                                    "ModelCode":"Organizations",
                                    "UserName":username,
                                    "Secure": false,
                                    "Token":token,
                                    "ParameterData": [],
                                    "ModelData": {
                                        "CompanyCode": data_current.company_code,    
                                        "ParentCode": "",
                                        "OrganizationCode": data_current.code,
                                        "Name": data_current.department,
                                        "Description": data_current.department
                                    },
                                    "ContainFiles": false
                                }
                            );
        }


        if(value == 'banding'){
            var json_api = JSON.stringify(
                                {
                                    "CommandName":"Submit",
                                    "ModelCode":"JobTitles",
                                    "UserName":username,
                                    "Secure": false,
                                    "Token":token,
                                    "ParameterData": [],
                                    "ModelData": {
                                        "CompanyCode": data_current.company_code,    
                                        "Name": data_current.banding,
                                        "TitleCode": data_current.code,
                                        "ParentCode": "",
                                        "Description": data_current.description
                                    },
                                    "ContainFiles": false
                                }
                            );
        }

        if(value == 'group'){
            var json_api = JSON.stringify(
                                {
                                    "CommandName":"Submit",
                                    "ModelCode":"JobGrades",
                                    "UserName":username,
                                    "Secure": false,
                                    "Token":token,
                                    "ParameterData": [],
                                    "ModelData": {
                                        "CompanyCode": data_current.company_code,    
                                        "GradeCode": data_current.code,
                                        "Name": data_current.group,
                                        "Description": data_current.group
                                    },
                                    "ContainFiles": false
                                }
                            );
        }

        if(value == 'jobfamily'){
            //BELUM ADA
            var json_api = JSON.stringify(
                                {
                                    "CommandName":"Submit",
                                    "ModelCode":"JobGrades",
                                    "UserName":username,
                                    "Secure": false,
                                    "Token":token,
                                    "ParameterData": [],
                                    "ModelData": {
                                        "CompanyCode": "3F9YZED2DL",    
                                        //BELUM ADA
                                    },
                                    "ContainFiles": false
                                }
                            );
        }

        if(value == 'position'){
            var json_api = JSON.stringify(
                                {
                                    "CommandName":"Submit",
                                    "ModelCode":"JobPositions",
                                    "UserName":username,
                                    "Secure": false,
                                    "Token":token,
                                    "ParameterData": [],
                                    "ModelData": {
                                        "CompanyCode": data_current.company_code,    
                                        "SuperiorityCoverage": "",
                                        "JobCode": data_current.position,
                                        "Name": data_current.position,
                                        "Description": data_current.description,
                                        "ParentCode": ""
                                    },
                                    "ContainFiles": false
                                }
                            );
        }

        if(value == 'employee'){

            var exp_date = '';

            if(data_current.employeestatus_employeestatus_id == '2'){
                if(data_current.statusinformation_contract_end != '-' && data_current.statusinformation_contract_end != '1900-01-01' && data_current.statusinformation_contract_end != '2999-01-01'){
                    exp_date = data_current.statusinformation_contract_end;
                }
            }

            if(data_current.employeestatus_employeestatus_id == '7'){
                if(data_current.statusinformation_consultant_end != '-' && data_current.statusinformation_consultant_end != '1900-01-01' && data_current.statusinformation_consultant_end != '2999-01-01'){
                    exp_date = data_current.statusinformation_consultant_end;
                }
            }

            if(data_current.nonactive_date != '-' && data_current.nonactive_date != '1900-01-01' && data_current.nonactive_date != '2999-01-01'){
                exp_date = data_current.nonactive_date;
            }

            var json_api = JSON.stringify(
                                {
                                    "CommandName":"Submit",
                                    "ModelCode":"EmployeeInformation",
                                    "UserName":username,
                                    "Secure": false,
                                    "Token":token,
                                    "ParameterData": [],
                                    "ModelData": {
                                        "CompanyCode": data_current.company_code,
                                        "BirthDate": data_current.birth_date,
                                        "CurrentAddressSameAsID": false,
                                        "IdAddressLine1": data_current.ktp_address,
                                        "CurrentAddressLine1": data_current.address,
                                        "Relatives": [],
                                        "JoinDate": data_current.statusinformation_hire_date,
                                        "CustomFieldList": [
                                            // {
                                            //    "PropertyName": "ProjectId",
                                            //    "PropertyValue": data_current.project_id
                                            // },
                                            // {
                                            //    "PropertyName": "ProjectName",
                                            //    "PropertyValue": data_current.project_name
                                            // },
                                            // {
                                            //    "PropertyName": "NoBpjsKetenagakerjaan",
                                            //    "PropertyValue": data_current.no_bpjs_kk
                                            // },
                                            // {
                                            //    "PropertyName": "NoBpjsKesehatan",
                                            //    "PropertyValue": data_current.no_bpjs_k
                                            // },
                                            // {
                                            //    "PropertyName": "NoBpjsJaminanPensiun",
                                            //    "PropertyValue": data_current.no_bpjs_pp
                                            // },
                                            // {
                                            //    "PropertyName": "NoManulife",
                                            //    "PropertyValue": data_current.no_manulife_p
                                            // },
                                            // {
                                            //    "PropertyName": "NoAsuransi",
                                            //    "PropertyValue": data_current.no_asuransi
                                            // },
                                            // {
                                            //    "PropertyName": "CodeAlokasiBiaya",
                                            //    "PropertyValue": data_current.code_alokasibiaya
                                            // },
                                            // {
                                            //    "PropertyName": "NameAlokasiBiaya",
                                            //    "PropertyValue": data_current.name_alokasibiaya
                                            // },
                                            // {
                                            //    "PropertyName": "CodeAlokasiBiaya2",
                                            //    "PropertyValue": data_current.code_alokasibiaya2
                                            // },
                                            // {
                                            //    "PropertyName": "NameAlokasiBiaya2",
                                            //    "PropertyValue": data_current.name_alokasibiaya2
                                            // },
                                            // {
                                            //    "PropertyName": "CodeAlokasiBiaya3",
                                            //    "PropertyValue": data_current.code_alokasibiaya3
                                            // },
                                            // {
                                            //    "PropertyName": "NameAlokasiBiaya3",
                                            //    "PropertyValue": data_current.name_alokasibiaya3
                                            // }
                                        ],
                                        "FingerPrintId": data_current.fingerprintcode,
                                        "LocationCode": data_current.code.worklocation_code,
                                        "WorkshiftCode": data_current.code.hari_kerja_perminggu,
                                        "GenderCode": data_current.code.gender_code,
                                        "ReligionCode": data_current.code.religion_code,
                                        "MaritalStatusCode": data_current.code.marriagestatus_code,
                                        "NationalityCode": data_current.code.nationality_code,
                                        "IDType": data_current.code.id_type_code,
                                        "OrganizationCode": data_current.code.department_code,
                                        "JobTitleCode": data_current.code.banding_code,
                                        "JobLevelCode": data_current.code.group_code,
                                        "JobPositionCode": data_current.code.position_code,
                                        "EmploymentStatusCode": data_current.code.employeestatus_code,
                                        "WorkCalendarCode": data_current.code.calendar_company_code,
                                        "TaxStatusCode": data_current.code.ptkp_code,
                                        "PayrollGroupCode": data_current.code.payroll_group,
                                        "PayrollCurrencyCode": data_current.code.payroll_currency_code,
                                        "PayrollPaymentCurrencyCode": data_current.code.payroll_currency_code,
                                        "PayrollPaymentMethodCode": data_current.code.payment_method_code,
                                        "PayrollBankCode": data_current.code.bank_rekening_code,
                                        "TaxCountry": data_current.tax_country_code,
                                        "Nik": data_current.nik_group,
                                        "Name": data_current.employee_name,
                                        "BirthPlace": data_current.birth_place,
                                        "IdType": data_current.code.id_type_code,
                                        "IDNumber": data_current.ktp_number,
                                        "MobilePhone": data_current.phone_number,
                                        "PrivateEmailAddress": data_current.email,
                                        "ExpiredDate": exp_date,
                                        "OfficeEmailAddress": data_current.email_ciputra,
                                        "TaxId": data_current.npwp,
                                        "PayrollBankAccountNumber": data_current.nomor_rekening,
                                        "PayrollBankAccountName": data_current.nama_rekening
                                    },
                                    "ContainFiles": false
                                }
                            );
        }

        $.ajax({
                type: 'POST',
                url: url + me.urlServiceRequest,
                contentType: 'application/json',
                data: json_api ,
                success: function(response){
                    var json = JSON.parse(JSON.stringify(response));
                    var result_data = json.Data;
                    var result_status = json.MessageType;
                    var result_status_message = json.Message;
                    // me.saveDbLog(value,data_current,action_to_cherry,lastprocessid,result_data,result_status,result_status_message);
                    if(value == 'employee'){
                        me.updateDbLog(value,data_current,action_to_cherry,lastprocessid,result_data,result_status,result_status_message,'','','','');

                        if(json.Data){
                            var result_data_code = json.Data.Code;
                            var result_data_insertstamp = json.Data.InsertStamp;
                            var result_data_updatestamp = json.Data.UpdateStamp;
                            var result_data_active = json.Data.Active;

                            var fp = me.getFormprocess();
                            fp.setLoading("Please wait, we will check all data...");


                            //CAREER TRANSITION
                            setTimeout(function () {
                                me.careertransition(value,data_current,action_to_cherry,lastprocessid,result_data,result_status,result_status_message,result_data_code,result_data_insertstamp,result_data_updatestamp,result_data_active);
                            }, 5000);
                            //CUSTOM FIELD
                            //CUSTOM FIELD COMMENT SEMENTARA (05/01/2021)
                            // setTimeout(function () {
                            //     me.customfield(value,data_current,action_to_cherry,lastprocessid,result_data,result_status,result_status_message,result_data_code,result_data_insertstamp,result_data_updatestamp,result_data_active);
                            // }, 5000);
                        }

                        // setTimeout(function () {
                        //     var fp = me.getFormprocess();
                        //     fp.setLoading(false);
                        // }, 20000);

                    }else{
                        me.updateDbLog(value,data_current,action_to_cherry,lastprocessid,result_data,result_status,result_status_message,'','','','');
                    }
                    // console.log(data);
                },
                error: function(XMLHttpRequest) {
                    console.log('ERROR');
                }
        }); 
    },
    //GET UPDATE CHERRY
    updateData: function(token,value,data_current,action_to_cherry,lastprocessid,hasil_get,changeprofile,changepayroll,url,username,password){
        var me = this;

        var code = hasil_get[0].code;
        var insertstamp = hasil_get[0].insertstamp;
        var updatestamp = hasil_get[0].updatestamp;
        
        if(hasil_get[0].active == '1'){
            var active = 'true';
        }else{
            var active = 'true';
        }

        //DEFINITION
        if(value == 'dept'){
            var json_api = JSON.stringify(
                                {
                                    "CommandName":"Submit",
                                    "ModelCode":"Organizations",
                                    "UserName":username,
                                    "Secure": false,
                                    "Token":token,
                                    "ParameterData": [],
                                    "ModelData": {
                                        "Code": code,
                                        "CompanyCode": data_current.company_code,    
                                        "ParentCode": "",
                                        "OrganizationCode": data_current.code,
                                        "Name": data_current.department,
                                        "Description": data_current.department,
                                        "InsertStamp": insertstamp,
                                        "UpdateStamp": updatestamp,
                                        "Active": active
                                    },
                                    "ContainFiles": false
                                }
                            );
        }

        if(value == 'banding'){
            var json_api = JSON.stringify(
                                {
                                    "CommandName":"Submit",
                                    "ModelCode":"JobTitles",
                                    "UserName":username,
                                    "Secure": false,
                                    "Token":token,
                                    "ParameterData": [],
                                    "ModelData": {
                                        "Code": code,
                                        "CompanyCode": data_current.company_code,    
                                        "Name": data_current.banding,
                                        "TitleCode": data_current.code,
                                        "ParentCode": "",
                                        "Description": data_current.description,
                                        "InsertStamp": insertstamp,
                                        "UpdateStamp": updatestamp,
                                        "Active": active
                                    },
                                    "ContainFiles": false
                                }
                            );
        }
        
        if(value == 'group'){
            var json_api = JSON.stringify(
                                {
                                    "CommandName":"Submit",
                                    "ModelCode":"JobGrades",
                                    "UserName":username,
                                    "Secure": false,
                                    "Token":token,
                                    "ParameterData": [],
                                    "ModelData": {
                                        "Code": code,
                                        "CompanyCode": data_current.company_code,    
                                        "GradeCode": data_current.code,
                                        "Name": data_current.group,
                                        "Description": data_current.group,
                                        "InsertStamp": insertstamp,
                                        "UpdateStamp": updatestamp,
                                        "Active": active
                                    },
                                    "ContainFiles": false
                                }
                            );
        }

        if(value == 'position'){
            var json_api = JSON.stringify(
                                {
                                    "CommandName":"Submit",
                                    "ModelCode":"JobPositions",
                                    "UserName":username,
                                    "Secure": false,
                                    "Token":token,
                                    "ParameterData": [],
                                    "ModelData": {
                                        "Code": code,
                                        "CompanyCode": data_current.company_code,    
                                        "SuperiorityCoverage": "",
                                        "JobCode": data_current.position,
                                        "Name": data_current.position,
                                        "Description": data_current.description,
                                        "ParentCode": "",
                                        "InsertStamp": insertstamp,
                                        "UpdateStamp": updatestamp,
                                        "Active": active
                                    },
                                    "ContainFiles": false
                                }
                            );
        }

        if(value == 'employee'){
            
            var exp_date = '';

            if(data_current.employeestatus_employeestatus_id == '2'){
                if(data_current.statusinformation_contract_end != '-' && data_current.statusinformation_contract_end != '1900-01-01' && data_current.statusinformation_contract_end != '2999-01-01'){
                    exp_date = data_current.statusinformation_contract_end;
                }
            }

            if(data_current.employeestatus_employeestatus_id == '7'){
                if(data_current.statusinformation_consultant_end != '-' && data_current.statusinformation_consultant_end != '1900-01-01' && data_current.statusinformation_consultant_end != '2999-01-01'){
                    exp_date = data_current.statusinformation_consultant_end;
                }
            }

            if(data_current.nonactive_date != '-' && data_current.nonactive_date != '1900-01-01' && data_current.nonactive_date != '2999-01-01'){
                exp_date = data_current.nonactive_date;
            }

            var d = new Date(),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) 
                month = '0' + month;
            if (day.length < 2) 
                day = '0' + day;

            var date_curr = year+'-'+month+'-'+day;

            if(changeprofile){

                var code_change = '';
                var insertstamp_change = insertstamp;
                var updatestamp_change = updatestamp;
                var action_to_cherry_change = '';
                var hasil_get_change = '';
                var notes_get_change = '';

                //DB_LOG
                me.tools.ajax({
                    params: {   
                                employee_id            : data_current.employee_id,
                                effectivedate          : data_current.modion,
                                change                 : 'changeprofile'
                            },
                    success: function (data, model) {
                        
                            action_to_cherry_change = data.others[0][0].action_to_cherry;

                            if(action_to_cherry_change == 'update'){
                                hasil_get_change = data.others[0][0].hasil_get;
                                code_change = hasil_get_change[0].code_changeprofile;
                                insertstamp_change = hasil_get_change[0].insertstamp_changeprofile;
                                updatestamp_change = hasil_get_change[0].updatestamp_changeprofile;
                                notes_get_change = hasil_get_change[0].notes_changeprofile +' '+changeprofile;
                            }

                            if(action_to_cherry_change == 'insert'){
                                notes_get_change = "Perubahan pada "+changeprofile;
                            }
                            
                            console.log('Hasil GET EMPLOYEE CHANGE (if exist) -- code '+code_change);
             
                            var json_api = JSON.stringify(
                                            {
                                                "CommandName":"Submit",
                                                // "ModelCode":"EmployeeInformation",
                                                "ModelCode":"EmployeeProfileChangeLog",
                                                "UserName":username,
                                                "Secure": false,
                                                "Token":token,
                                                "ParameterData": [],
                                                "ModelData": {
                                                    // "Code": code,
                                                    // "CompanyCode": data_current.company_code,
                                                    // "BirthDate": data_current.birth_date,
                                                    // "CurrentAddressSameAsID": false,
                                                    // "IdAddressLine1": data_current.ktp_address,
                                                    // "CurrentAddressLine1": data_current.address,
                                                    // "Relatives": [],
                                                    // "JoinDate": data_current.statusinformation_hire_date,
                                                    // "CustomFieldList": [],
                                                    // "WorkshiftCode": data_current.code.hari_kerja_perminggu,
                                                    // "GenderCode": data_current.code.gender_code,
                                                    // "ReligionCode": data_current.code.religion_code,
                                                    // "MaritalStatusCode": data_current.code.marriagestatus_code,
                                                    // "NationalityCode": data_current.code.nationality_code,
                                                    // "IDType": data_current.code.id_type_code,
                                                    // "OrganizationCode": data_current.code.department_code,
                                                    // "JobTitleCode": data_current.code.banding_code,
                                                    // "JobLevelCode": data_current.code.group_code,
                                                    // "JobPositionCode": data_current.code.position_code,
                                                    // "EmploymentStatusCode": data_current.code.employeestatus_code,
                                                    // "WorkCalendarCode": data_current.code.calendar_company_code,
                                                    // "TaxStatusCode": data_current.code.ptkp_code,
                                                    // "PayrollGroupCode": data_current.code.payroll_group,
                                                    // "PayrollCurrencyCode": data_current.code.payroll_currency_code,
                                                    // "PayrollPaymentCurrencyCode": data_current.code.payroll_currency_code,
                                                    // "PayrollPaymentMethodCode": data_current.code.payment_method_code,
                                                    // "PayrollBankCode": data_current.code.bank_rekening_code,
                                                    // "TaxCountry": data_current.tax_country_code,
                                                    // "Nik": data_current.nik_group,
                                                    // "Name": data_current.employee_name,
                                                    // "BirthPlace": data_current.birth_place,
                                                    // "IdType": data_current.code.id_type_code,
                                                    // "IDNumber": data_current.ktp_number,
                                                    // "MobilePhone": data_current.phone_number,
                                                    // "PrivateEmailAddress": data_current.email,
                                                    // "ExpiredDate": exp_date,
                                                    // "OfficeEmailAddress": data_current.email_ciputra,
                                                    // "TaxId": data_current.npwp,
                                                    // "PayrollBankAccountNumber": data_current.nomor_rekening,
                                                    // "PayrollBankAccountName": data_current.nama_rekening,
                                                    // "InsertStamp": insertstamp,
                                                    // "UpdateStamp": updatestamp,
                                                    // "Active": active
                                                    "Code": code_change,
                                                    "EmployeeCode": code,
                                                    // "Notes": "Perubahan pada "+changeprofile,
                                                    "Notes": notes_get_change,
                                                    "Name": data_current.employee_name,
                                                    "GenderCode": data_current.code.gender_code,
                                                    "ReligionCode": data_current.code.religion_code,
                                                    "BirthDate": data_current.birth_date,
                                                    "NationalityCode": data_current.code.nationality_code,
                                                    "BirthPlace": data_current.birth_place,
                                                    "IdType": data_current.code.id_type_code,
                                                    "IdNumber": data_current.ktp_number,
                                                    "MaritalStatusCode": data_current.code.marriagestatus_code,
                                                    "CurrentAddressSameAsId": false,
                                                    "MobilePhone": data_current.phone_number,
                                                    "PrivateEmailAddress": data_current.email,
                                                    "OfficeEmailAddress": data_current.email_ciputra,
                                                    "EffectiveDate": data_current.modion,
                                                    "ExpiredDate": null,
                                                    "StatusId": "Approved",
                                                    "InsertStamp": insertstamp_change,
                                                    "UpdateStamp": updatestamp_change,
                                                    "Active": active,
                                                    "Nik": data_current.nik_group,
                                                    "CompanyCode": data_current.company_code,
                                                    "EmployeeStatusId": "Approved",
                                                    "SkipApproval": true
                                                },
                                                "ContainFiles": false
                                            }
                                        );
                            $.ajax({
                                    type: 'POST',
                                    url: url + me.urlServiceRequest,
                                    contentType: 'application/json',
                                    data: json_api,
                                    success: function(response){
                                        var json = JSON.parse(JSON.stringify(response));
                                        var result_data = json.Data;
                                        var result_status = json.MessageType;
                                        var result_status_message = json.Message;
                                        me.updateDbLog(value,data_current,action_to_cherry,lastprocessid,result_data,result_status,result_status_message,changeprofile,'',data_current.modion,code);
                                    },
                                    error: function(XMLHttpRequest) {
                                        console.log('ERROR');
                                    }
                            });
                        
                    }
                }).read('get_employee_change');

            }

            if(changepayroll){

                var code_change = '';
                var insertstamp_change = insertstamp;
                var updatestamp_change = updatestamp;
                var action_to_cherry_change = '';
                var hasil_get_change = '';
                var notes_get_change = '';

                //DB_LOG
                me.tools.ajax({
                    params: {   
                                employee_id            : data_current.employee_id,
                                effectivedate          : data_current.payroll_effective_date,
                                change                 : 'changepayroll'
                            },
                    success: function (data, model) {
                        
                            action_to_cherry_change = data.others[0][0].action_to_cherry;

                            if(action_to_cherry_change == 'update'){
                                hasil_get_change = data.others[0][0].hasil_get;
                                code_change = hasil_get_change[0].code_changepayroll;
                                insertstamp_change = hasil_get_change[0].insertstamp_changepayroll;
                                updatestamp_change = hasil_get_change[0].updatestamp_changepayroll;
                                notes_get_change = hasil_get_change[0].notes_changepayroll +' '+changepayroll;
                            }

                            if(action_to_cherry_change == 'insert'){
                                notes_get_change = "Perubahan pada "+changepayroll;
                            }
                            
                            console.log('Hasil GET EMPLOYEE CHANGE (if exist) -- code '+code_change);

                            var json_api = JSON.stringify(
                                                {
                                                    "CommandName":"Submit",
                                                    "ModelCode":"EmployeePayrollProfileChanges",
                                                    "UserName":username,
                                                    "Secure": false,
                                                    "Token":token,
                                                    "ParameterData": [],
                                                    "ModelData": {
                                                        "Code": code_change,
                                                        "EmployeeCode": code,
                                                        // "Notes": "Perubahan pada "+changepayroll,
                                                        "Notes": notes_get_change,
                                                        "EffectiveDate": data_current.payroll_effective_date,
                                                        "ExpiredDate": null,
                                                        "PayrollCurrencyCode": data_current.code.payroll_currency_code,
                                                        "PayrollPaymentCurrencyCode": data_current.code.payroll_currency_code,
                                                        "PayrollPaymentMethodCode": data_current.code.payment_method_code,
                                                        "PayrollBankCode": data_current.code.bank_rekening_code,
                                                        "PayrollBankAccountNumber": data_current.nomor_rekening,
                                                        "PayrollBankAccountName": data_current.nama_rekening,
                                                        "PayrollGroupCode": data_current.code.payroll_group,
                                                        "HaveTaxId": true,
                                                        "TaxID": data_current.npwp,
                                                        "TaxStatusCode": data_current.code.ptkp_code,
                                                        "TaxCountry": data_current.tax_country_code,
                                                        "StatusId": "Approved",
                                                        "InsertStamp": insertstamp_change,
                                                        "UpdateStamp": updatestamp_change,
                                                        "Active": true,
                                                        "Nik": data_current.nik_group,
                                                        "Name": data_current.employee_name,
                                                        "EmploymentEffectiveDate": data_current.payroll_effective_date,
                                                        "EmployeeStatusId": "Approved",
                                                        "CompanyCode": data_current.company_code,
                                                        "EmployeeName": data_current.employee_name,
                                                        "StatusName": "Active",
                                                        "SkipApproval": true
                                                    },
                                                    "ContainFiles": false
                                                }
                                            );
                            $.ajax({
                                    type: 'POST',
                                    url: url + me.urlServiceRequest,
                                    contentType: 'application/json',
                                    data: json_api,
                                    success: function(response){
                                        var json = JSON.parse(JSON.stringify(response));
                                        var result_data = json.Data;
                                        var result_status = json.MessageType;
                                        var result_status_message = json.Message;
                                        me.updateDbLog(value,data_current,action_to_cherry,lastprocessid,result_data,result_status,result_status_message,'',changepayroll,data_current.payroll_effective_date,code);
                                    },
                                    error: function(XMLHttpRequest) {
                                        console.log('ERROR');
                                    }
                            });
                        
                    }
                }).read('get_employee_change');


            }
            var json_api = JSON.stringify(
                                {
                                    "CommandName":"GetSingle",
                                    "ModelCode":"EmployeeInformation",
                                    "UserName":username,
                                    "Token":token,
                                    "ParameterData": [
                                        {
                                            "ParamKey": "Code",
                                            "ParamValue": code,
                                            "Operator": "eq"
                                        }
                                    ]
                                }
                            );
        }

        // if(value != 'employee'){
            $.ajax({
                    type: 'POST',
                    url: url + me.urlServiceRequest,
                    contentType: 'application/json',
                    data: json_api,
                    success: function(response){
                        var json = JSON.parse(JSON.stringify(response));
                        var result_data = json.Data;
                        var result_status = json.MessageType;
                        var result_status_message = json.Message;
                        // me.saveDbLog(value,data_current,action_to_cherry,lastprocessid,result_data,result_status,result_status_message);
                        if(value == 'employee'){

                            var fp = me.getFormprocess();
                            var process_api = fp.down("[name=process_api]").getValue();
                            var process_api_model = fp.down("[name=process_api_model]").getValue();

                            me.tools.ajax({
                                params: {   
                                            lastprocessid       : lastprocessid,
                                            value               : value,
                                            process_api         : process_api,
                                            process_api_model   : process_api_model,
                                        },
                                success: function (data, model) {
                                    
                                    var gr_trans = me.getGridprocessemployee();
                                    var s_gr_trans = gr_trans.getStore();
                                    me.tools.wesea({data: data, model: model}, gr_trans).grid();
                                    s_gr_trans.reload();
                                    var fp = me.getFormprocess();
                                    fp.down("[name=process_log_process_id]").setValue(lastprocessid);
                                    fp.down("[name=process_api]").setValue(value);
                                    fp.down("[action=process_cherry]").hide();
                                    fp.down("[action=download_log]").show();
                                }
                            }).read('get_master');


                            // me.updateDbLog(value,data_current,action_to_cherry,lastprocessid,result_data,result_status,result_status_message);

                            if(json.Data){
                                var result_data_code = json.Data.Code;
                                var result_data_insertstamp = json.Data.InsertStamp;
                                var result_data_updatestamp = json.Data.UpdateStamp;
                                var result_data_active = json.Data.Active;

                                var fp = me.getFormprocess();
                                fp.setLoading("Please wait, we will check all data...");


                                //CAREER TRANSITION
                                setTimeout(function () {
                                    me.careertransition(value,data_current,action_to_cherry,lastprocessid,result_data,result_status,result_status_message,result_data_code,result_data_insertstamp,result_data_updatestamp,result_data_active);
                                }, 5000);
                                //CUSTOM FIELD
                                //CUSTOM FIELD COMMENT SEMENTARA (05/01/2021)
                                // setTimeout(function () {
                                //     me.customfield(value,data_current,action_to_cherry,lastprocessid,result_data,result_status,result_status_message,result_data_code,result_data_insertstamp,result_data_updatestamp,result_data_active);
                                // }, 5000);
                            }   
                            // setTimeout(function () {
                            //     var fp = me.getFormprocess();
                            //     fp.setLoading(false);
                            // }, 20000);



                        }else{
                            me.updateDbLog(value,data_current,action_to_cherry,lastprocessid,result_data,result_status,result_status_message,'','','','');
                        }
                        // console.log(data);
                    },
                    // callback: function() {
                    //     var fp = me.getFormprocess();
                    //             fp.setLoading(false);
                    // },
                    error: function(XMLHttpRequest) {
                        console.log('ERROR');
                    }
            }); 

        // }
    },
    //GET LIST CHERRY
    getlistData: function(token){
        var me = this;

        $.ajax({
                type: 'POST',
                url: me.urlServiceRequest,
                contentType: 'application/json',
                data: JSON.stringify(
                    {
                        "UserName":"HCAPI", 
                        "Token":token,
                        "CommandName":"GetList",
                        "ModelCode":"JobTitles",
                        "UserName":"HCAPI",
                        "Token":token,
                        "ParameterData":[]
                    }
                ),
                success: function(response){
                    var json = JSON.parse(JSON.stringify(response));
                    var data = json.Data;
                    console.log(response);
                },
                error: function(XMLHttpRequest) {
                    console.log('ERROR');
                }
        }); 
    },
    //SAVE TO DB LOG
    saveDbLog: function (value,data_current,action_to_cherry,lastprocessid,result_data,result_status,result_status_message) {
        var me, grid, store;
        me = this;
        console.log(result_data);
        var f = me.getPanel().down("form");
        // var choose_projectpt = f.down("[name=projectpt_id]").getValue();
        var choose_ptpt = f.down("[name=ptpt_id]").getValue();
        var choose_startdate = f.down("[name=start_date]").getValue();
        var choose_enddate   = f.down("[name=end_date]").getValue();

        var fp = me.getFormprocess();
        var process_api = fp.down("[name=process_api]").getValue();
        var process_api_model = fp.down("[name=process_api_model]").getValue();

        var jsonString = JSON.stringify(data_current);
        var jsonStringResult = JSON.stringify(result_data);
        
        //DB_LOG
        me.tools.ajax({
            params: {   
                        action_to_cherry    : action_to_cherry,
                        lastprocessid       : lastprocessid,
                        value               : value,
                        process_api         : process_api,
                        process_api_model   : process_api_model,
                        // projectpt_id        : choose_projectpt,
                        ptpt_id             : choose_ptpt,
                        start_date          : choose_startdate,
                        end_date            : choose_enddate,
                        jsonString          : jsonString,
                        jsonStringResult    : jsonStringResult,
                        result_status       : result_status,
                        result_status_message: result_status_message
                    },
            success: function (data, model) {
                if(data.others[0][0].MSG == 'berhasil'){
                    // fp.setLoading("Please wait...");
                    me.tools.ajax({
                        params: {   
                                    lastprocessid       : lastprocessid,
                                    value               : value,
                                    process_api         : process_api,
                                    process_api_model   : process_api_model,
                                },
                        success: function (data, model) {
                            if(value == 'dept'){
                                var gr_trans = me.getGridprocess();
                            }
                            if(value == 'banding'){
                                var gr_trans = me.getGridprocessbanding();
                            }
                            if(value == 'group'){
                                var gr_trans = me.getGridprocessgroup();
                            }
                            if(value == 'jobfamily'){
                                var gr_trans = me.getGridprocessjobfamily();
                            }
                            if(value == 'position'){
                                var gr_trans = me.getGridprocessposition();
                            }
                            if(value == 'employee'){
                                var gr_trans = me.getGridprocessemployee();
                            }
                            
                            var s_gr_trans = gr_trans.getStore();
                            me.tools.wesea({data: data, model: model}, gr_trans).grid();
                            s_gr_trans.reload();
                            fp.down("[name=process_log_process_id]").setValue(lastprocessid);
                            fp.down("[name=process_api]").setValue(value);
                            fp.down("[action=process_cherry]").hide();
                            fp.down("[action=download_log]").show();
                            fp.setLoading(false);
                        }
                    }).read('get_master');
                }else{
                    console.log('Something error...');
                }
            }
        }).read('save_master');

    },
    //SAVE TO DB LOG BEFORE API
    //--------------------------------------------------------------- choose_projectpt
    saveDbLogBeforeAPI: function (process_api,process_api_model,value,choose_ptpt,choose_startdate,choose_enddate,choose_employee,opsi_id,key_list,data_current,datalist,lastprocessid) {
        var me, grid, store;
        me = this;
        
        var f = me.getPanel().down("form");
        // var choose_projectpt = f.down("[name=projectpt_id]").getValue();
        var choose_ptpt = f.down("[name=ptpt_id]").getValue();
        var choose_startdate = f.down("[name=start_date]").getValue();
        var choose_enddate   = f.down("[name=end_date]").getValue();

        var fp = me.getFormprocess();
        var process_api = fp.down("[name=process_api]").getValue();
        var process_api_model = fp.down("[name=process_api_model]").getValue();

        var jsonString = JSON.stringify(data_current);
        
        //DB_LOG
        me.tools.ajax({
            params: {   
                        action_to_cherry    : action_to_cherry,
                        lastprocessid       : lastprocessid,
                        value               : value,
                        process_api         : process_api,
                        process_api_model   : process_api_model,
                        // projectpt_id        : choose_projectpt,
                        ptpt_id             : choose_ptpt,
                        start_date          : choose_startdate,
                        end_date            : choose_enddate,
                        jsonString          : jsonString
                    },
            success: function (data, model) {
                if(data.others[0][0].MSG == 'berhasil'){
                    console.log(data);
                }else{
                    console.log('Something error...');
                }
            }
        }).read('save_master_beforeapi');

    },

    //SAVE TO DB LOG
    updateDbLog: function (value,data_current,action_to_cherry,lastprocessid,result_data,result_status,result_status_message,changeprofile,changepayroll,effectivedate,employeecode) {
        var me, grid, store;
        me = this;
        console.log(result_data);
        var f = me.getPanel().down("form");
        // var choose_projectpt = f.down("[name=projectpt_id]").getValue();
        var choose_ptpt = f.down("[name=ptpt_id]").getValue();
        var choose_startdate = f.down("[name=start_date]").getValue();
        var choose_enddate   = f.down("[name=end_date]").getValue();

        var fp = me.getFormprocess();
        var process_api = fp.down("[name=process_api]").getValue();
        var process_api_model = fp.down("[name=process_api_model]").getValue();

        var jsonString = JSON.stringify(data_current);
        var jsonStringResult = JSON.stringify(result_data);
        
        //DB_LOG
        me.tools.ajax({
            params: {   
                        action_to_cherry    : action_to_cherry,
                        lastprocessid       : lastprocessid,
                        value               : value,
                        process_api         : process_api,
                        process_api_model   : process_api_model,
                        // projectpt_id        : choose_projectpt,
                        ptpt_id             : choose_ptpt,
                        start_date          : choose_startdate,
                        end_date            : choose_enddate,
                        jsonString          : jsonString,
                        jsonStringResult    : jsonStringResult,
                        result_status       : result_status,
                        result_status_message: result_status_message,
                        changeprofile       : changeprofile,
                        changepayroll       : changepayroll,
                        effectivedate       : effectivedate,
                        employeecode        : employeecode
                    },
            success: function (data, model) {
                if(data.others[0][0].MSG == 'berhasil'){
                    // fp.setLoading("Please wait...");
                    me.tools.ajax({
                        params: {   
                                    lastprocessid       : lastprocessid,
                                    value               : value,
                                    process_api         : process_api,
                                    process_api_model   : process_api_model,
                                },
                        success: function (data, model) {
                            if(value == 'dept'){
                                var gr_trans = me.getGridprocess();
                            }
                            if(value == 'banding'){
                                var gr_trans = me.getGridprocessbanding();
                            }
                            if(value == 'group'){
                                var gr_trans = me.getGridprocessgroup();
                            }
                            if(value == 'jobfamily'){
                                var gr_trans = me.getGridprocessjobfamily();
                            }
                            if(value == 'position'){
                                var gr_trans = me.getGridprocessposition();
                            }
                            if(value == 'employee'){
                                var gr_trans = me.getGridprocessemployee();
                            }
                            
                            var s_gr_trans = gr_trans.getStore();
                            me.tools.wesea({data: data, model: model}, gr_trans).grid();
                            s_gr_trans.reload();
                            fp.down("[name=process_log_process_id]").setValue(lastprocessid);
                            fp.down("[name=process_api]").setValue(value);
                            fp.down("[action=process_cherry]").hide();
                            fp.down("[action=download_log]").show();

                            if(value != 'employee'){
                                setTimeout(function () {
                                fp.setLoading(false);
                                }, 20000);
                            }
                            // fp.setLoading(false);
                            
                        }
                    }).read('get_master');
                }else{
                    console.log('Something error...');
                }
            }
        }).read('update_master');

    },

    //CUSTOMFIELD FOR EMPLOYEE
    customfield: function (value,data_current,action_to_cherry,lastprocessid,result_data,result_status,result_status_message,result_data_code,result_data_insertstamp,result_data_updatestamp,result_data_active) {
        var me, grid, store;
        me = this;
        console.log(result_data);
        var f = me.getPanel().down("form");
        // var choose_projectpt = f.down("[name=projectpt_id]").getValue();
        var choose_ptpt = f.down("[name=ptpt_id]").getValue();
        var choose_startdate = f.down("[name=start_date]").getValue();
        var choose_enddate   = f.down("[name=end_date]").getValue();

        var fp = me.getFormprocess();
        var process_api = fp.down("[name=process_api]").getValue();
        var process_api_model = fp.down("[name=process_api_model]").getValue();

        var jsonString = JSON.stringify(data_current);
        var jsonStringResult = JSON.stringify(result_data);

        var customfield_var = 'ProjectId,ProjectName,NoBpjsKetenagakerjaan,NoBpjsKesehatan,NoBpjsJaminanPensiun,NoManulife,NoAsuransi,CodeAlokasiBiaya,NameAlokasiBiaya,CodeAlokasiBiaya2,NameAlokasiBiaya2,CodeAlokasiBiaya3,NameAlokasiBiaya3';

        var need_input_cherry_customfield = '';
        //DB_LOG
        me.tools.ajax({
            params: {   
                        customfield_var     : customfield_var
                    },
            success: function (data, model) {
                need_input_cherry_customfield = data.others[0][0].need_input_cherry_customfield;


                if(need_input_cherry_customfield){
                    fp.setLoading("Transfer Customfield Type...");
                    $.each(need_input_cherry_customfield, function (key, value) {
                        me.saveCustomFieldDb(key,value);

                        // var loading = parseInt(key+1);
                        // fp.setLoading("Process Customfield Type data to Cherry "+loading+" of "+need_input_cherry_customfield.length);
                    });
                } 
                
                // ISI VALUE
                setTimeout(function () {
                    var customfield_split = customfield_var.split(",");

                    fp.setLoading("Transfer Customfield Employee...");
                    $.each(customfield_split, function (key, value) {
                        me.saveCustomFieldValueDb(value,jsonString,jsonStringResult);

                        // var loading = parseInt(key+1);
                        // fp.setLoading("Process Customfield Value data to Cherry "+loading+" of "+customfield_split.length);
                    });

                }, 5000);

                // Param VALUE
                // TEST COMMENT INI (03/12/2020)
                // setTimeout(function () {
                //     fp.setLoading("Transfer Customfield Employee...");
                //     me.getParamCustomFieldValueDb(customfield_var,jsonString,jsonStringResult,data_current,result_data_code,result_data_insertstamp,result_data_updatestamp,result_data_active);

                // }, 5000);

            }
        }).read('check_customfield');

    },
    //SAVE TO DB CUSTOMFIELD BEFORE API
    saveCustomFieldDb: function (key,value) {
        var me, grid, store;
        me = this;
        
        var jsonString = JSON.stringify(value);
        var result_id;
        //DB_LOG
        me.tools.ajax({
            params: {   
                        jsonString          : jsonString
                    },
            success: function (data, model) {
                if(data.others[0][0].msg == 'berhasil'){
                    result_id = data.others[0][0].result_id;
                    if(result_id){
                        console.log(result_id);
                        var res = me.getCustomFieldToken('submitData',key,value,result_id);
                    }
                }else{
                    console.log('Something error...');
                }
            }
        }).read('save_customfield_beforeapi');

    },
    //GET TOKEN CHERRY
    getCustomFieldToken: function(action,key,value,result_id){
        var me = this;
        //GET URL DAN USERNAME
        me.tools.ajax({
            params: {},
            success: function (data, model) {
                                    
                var url = data.others[0][0].url;
                var username = data.others[0][0].username;
                var password = data.others[0][0].password;

                $.ajax({
                        type: 'POST',
                        url: url + me.urlToken,
                        contentType: 'application/json',
                        data: JSON.stringify({ 
                                CommandName:"RequestToken",
                                ModelCode:"AppUserAccount",
                                UserName:username,
                                Password:password,
                                ParameterData:[]
                        }),
                        success: function(response){
                            var json = JSON.parse(JSON.stringify(response));
                            var token = json.Token;

                            if(token){
                                if(action == 'submitData'){
                                    me.submitCustomFieldData(token,'insert',key,value,result_id,url,username,password);
                                }
                            }
                            // return token;
                        },
                        error: function(XMLHttpRequest) {
                            console.log('ERROR');
                        }
                }); 
            }
        }).read('urlusername');
        
    },
    //GET SUBMIT CHERRY
    submitCustomFieldData: function(token,action,key,value,result_id,url,username,password){
        var me = this;

        //DEFINITION
            var json_api = JSON.stringify(
                                {
                                    "CommandName":"Submit",
                                    "ModelCode":"AppsModelCustomFields",
                                    "UserName":username,
                                    "Secure": false,
                                    "Token":token,
                                    "ParameterData": [],
                                    "ModelData": {
                                        "ModelCode": "EmployeeInformation",
                                        "Name": value.name,
                                        "Description": value.name,
                                        "ControlType": "text",
                                        "Active": true
                                    },
                                    "ContainFiles": false
                                }
                            );

        $.ajax({
                type: 'POST',
                url: url + me.urlServiceRequest,
                contentType: 'application/json',
                data: json_api ,
                success: function(response){
                    var json = JSON.parse(JSON.stringify(response));
                    var result_data = json.Data;
                    var result_status = json.MessageType;
                    var result_status_message = json.Message;

                    me.updateCustomFieldDb(action,key,value,result_id,result_data,result_status,result_status_message);
                },
                error: function(XMLHttpRequest) {
                    console.log('ERROR');
                }
        }); 
    },
    //UPDATE TO DB CustomField BEFORE API
    updateCustomFieldDb: function (action,key,value,result_id,result_data,result_status,result_status_message) {
        var me, grid, store;
        me = this;
        
        var jsonString = JSON.stringify(value);
        var jsonStringResult = JSON.stringify(result_data);

        //DB_LOG
        me.tools.ajax({
            params: {   
                        action              : action,
                        result_id           : result_id,
                        jsonString          : jsonString,
                        jsonStringResult    : jsonStringResult,
                        result_status       : result_status,
                        result_status_message : result_status_message
                    },
            success: function (data, model) {
                console.log(data);
                setTimeout(function () {
                            var fp = me.getFormprocess();
                            fp.setLoading(false);
                        }, 10000);
            }
        }).read('update_customfield_afterapi');

    },

    //SAVE TO DB CUSTOMFIELD BEFORE API
    saveCustomFieldValueDb: function (value,jsonString,jsonStringResult) {
        var me, grid, store, action_to_cherry;
        me = this;
        
       
        //DB_LOG
        me.tools.ajax({
            params: {   
                        jsonString          : jsonString,
                        jsonStringResult    : jsonStringResult,
                        value               : value
                    },
            success: function (data, model) {
                if(data.others[0][0].msg == 'berhasil'){
                    result_id = data.others[0][0].result_id;
                    hasil_action_process = data.others[0][0].hasil_action_process;
                    customfield_code = data.others[0][0].customfield_code;
                    employee_code = data.others[0][0].employee_code;
                    customfield_value = data.others[0][0].customfield_value;

                    if(result_id){
                        console.log(result_id);
                        if(data.others[0][0].action_process == 'insert'){
                            action_to_cherry = 'submitData';
                        }else{
                            action_to_cherry = 'updateData';
                        }
                        var res = me.getCustomFieldValueToken(action_to_cherry,value,result_id,hasil_action_process,customfield_code,employee_code,customfield_value);
                    }

                }else{
                    console.log('Something error...');
                }
            }
        }).read('save_customfieldvalue_beforeapi');

    },
    //GET TOKEN CHERRY
    getCustomFieldValueToken: function(action_to_cherry,value,result_id,hasil_action_process,customfield_code,employee_code,customfield_value){
        var me = this;
        //GET URL DAN USERNAME
        me.tools.ajax({
            params: {},
            success: function (data, model) {
                                    
                var url = data.others[0][0].url;
                var username = data.others[0][0].username;
                var password = data.others[0][0].password;

                $.ajax({
                        type: 'POST',
                        url: url + me.urlToken,
                        contentType: 'application/json',
                        data: JSON.stringify({ 
                                CommandName:"RequestToken",
                                ModelCode:"AppUserAccount",
                                UserName:username,
                                Password:password,
                                ParameterData:[]
                        }),
                        success: function(response){
                            var json = JSON.parse(JSON.stringify(response));
                            var token = json.Token;

                            if(token){
                                me.submitCustomFieldValueData(token,url,username,password,action_to_cherry,value,result_id,hasil_action_process,customfield_code,employee_code,customfield_value);
                            }
                            // return token;
                        },
                        error: function(XMLHttpRequest) {
                            console.log('ERROR');
                        }
                }); 
            }
        }).read('urlusername');
        
    },
    //GET SUBMIT CHERRY
    submitCustomFieldValueData: function(token,url,username,password,action_to_cherry,value,result_id,hasil_action_process,customfield_code,employee_code,customfield_value){
        var me = this;

        //DEFINITION
        if(action_to_cherry == 'submitData'){

            var json_api = JSON.stringify(
                                {
                                    "CommandName":"Submit",
                                    "ModelCode":"AppModelCustomFieldValues",
                                    "UserName":username,
                                    "Secure": false,
                                    "Token":token,
                                    "ParameterData": [],
                                    "ModelData": {
                                        "ModelCode": "EmployeeInformation",
                                        "ModelEntityCode": employee_code,
                                        "CustomFieldCode": customfield_code,
                                        "CustomFieldValue": customfield_value,
                                        "BoolCustomFieldValue": false,
                                        "ContainerClass": "",
                                        "Active": true
                                    },
                                    "ContainFiles": false
                                }
                            );
        }

        if(action_to_cherry == 'updateData'){

            var code = hasil_action_process[0].code;
            var insertstamp = hasil_action_process[0].insertstamp;
            var updatestamp = hasil_action_process[0].updatestamp;

            var json_api = JSON.stringify(
                                {
                                    "CommandName":"Submit",
                                    "ModelCode":"AppModelCustomFieldValues",
                                    "UserName":username,
                                    "Secure": false,
                                    "Token":token,
                                    "ParameterData": [],
                                    "ModelData": {
                                        "Code": code,
                                        "ModelCode": "EmployeeInformation",
                                        "ModelEntityCode": employee_code,
                                        "CustomFieldCode": customfield_code,
                                        "CustomFieldValue": customfield_value,
                                        "BoolCustomFieldValue": false,
                                        "ContainerClass": "",
                                        "Active": true,
                                        "InsertStamp" : insertstamp,
                                        "UpdateStamp" : updatestamp
                                    },
                                    "ContainFiles": false
                                }
                            );
        }

        $.ajax({
                type: 'POST',
                url: url + me.urlServiceRequest,
                contentType: 'application/json',
                data: json_api ,
                success: function(response){
                    var json = JSON.parse(JSON.stringify(response));
                    var result_data = json.Data;
                    var result_status = json.MessageType;
                    var result_status_message = json.Message;

                    me.updateCustomFieldValueDb(action_to_cherry,value,result_id,result_data,result_status,result_status_message,customfield_code,employee_code,customfield_value);
                },
                error: function(XMLHttpRequest) {
                    console.log('ERROR');
                }
        }); 
    },
    //UPDATE TO DB CustomFieldValue BEFORE API
    updateCustomFieldValueDb: function (action_to_cherry,value,result_id,result_data,result_status,result_status_message,customfield_code,employee_code,customfield_value) {
        var me, grid, store;
        me = this;
        
        var jsonStringResult = JSON.stringify(result_data);

        //DB_LOG
        me.tools.ajax({
            params: {   
                        result_id           : result_id,
                        jsonStringResult    : jsonStringResult,
                        result_status       : result_status,
                        result_status_message : result_status_message,
                        customfield_code    : customfield_code,
                        employee_code       : employee_code
                    },
            success: function (data, model) {
                console.log(data);
                // setTimeout(function () {
                //             var fp = me.getFormprocess();
                //             fp.setLoading(false);
                //         }, 10000);
                    var fp = me.getFormprocess();
                    var count = parseInt(me.customfield_count+1);
                    me.customfield_count = count;

                    var employee_customfield = parseInt(me.last_employee*13);

                    // fp.setLoading("Process Customfield Employee data to Cherry "+count+" of "+me.last_employee);
                    fp.setLoading("Process Customfield Employee data to Cherry "+count+" of "+employee_customfield);

                    console.log('Customfield --'+me.customfield_count+'----'+count+'----'+me.employee_current+'----'+me.last_employee+'----'+employee_customfield);
                    if(me.customfield_count == employee_customfield){

                        var fp = me.getFormprocess();
                        fp.setLoading(false);
                    }
            }
        }).read('update_customfieldvalue_afterapi');

    },

    //SAVE TO DB CUSTOMFIELD BEFORE API
    getParamCustomFieldValueDb: function (customfield_var,jsonString,jsonStringResult,data_current,result_data_code,result_data_insertstamp,result_data_updatestamp,result_data_active) {
        var me, grid, store;
        me = this;
        
       
        //DB_LOG
        me.tools.ajax({
            params: {   
                        jsonString          : jsonString,
                        jsonStringResult    : jsonStringResult,
                        value               : customfield_var
                    },
            success: function (data, model) {
                param_customfieldvalue = data.others[0][0].param_customfieldvalue;
                if(param_customfieldvalue){
                    var res = me.getCustomFieldValueEmployeeToken(jsonString,jsonStringResult,data_current,param_customfieldvalue,result_data_code,result_data_insertstamp,result_data_updatestamp,result_data_active);
                }
            }
        }).read('getparam_customfieldvalue_beforeapi');

    },

    //GET TOKEN CHERRY
    getCustomFieldValueEmployeeToken: function(jsonString,jsonStringResult,data_current,param_customfieldvalue,result_data_code,result_data_insertstamp,result_data_updatestamp,result_data_active){
        var me = this;
        //GET URL DAN USERNAME
        me.tools.ajax({
            params: {},
            success: function (data, model) {
                                    
                var url = data.others[0][0].url;
                var username = data.others[0][0].username;
                var password = data.others[0][0].password;

                $.ajax({
                        type: 'POST',
                        url: url + me.urlToken,
                        contentType: 'application/json',
                        data: JSON.stringify({ 
                                CommandName:"RequestToken",
                                ModelCode:"AppUserAccount",
                                UserName:username,
                                Password:password,
                                ParameterData:[]
                        }),
                        success: function(response){
                            var json = JSON.parse(JSON.stringify(response));
                            var token = json.Token;

                            if(token){
                                me.updateCustomFieldValueEmployeeData(token,url,username,password,jsonString,jsonStringResult,data_current,param_customfieldvalue,result_data_code,result_data_insertstamp,result_data_updatestamp,result_data_active);
                            }
                            // return token;
                        },
                        error: function(XMLHttpRequest) {
                            console.log('ERROR');
                        }
                }); 
            }
        }).read('urlusername');
        
    },
    //GET SUBMIT CHERRY
    updateCustomFieldValueEmployeeData: function(token,url,username,password,jsonString,jsonStringResult,data_current,param_customfieldvalue,result_data_code,result_data_insertstamp,result_data_updatestamp,result_data_active){
        var me = this;

        var fp = me.getFormprocess();

        //DEFINITION
            var param_customfield = JSON.stringify(param_customfieldvalue);

            var exp_date = '';

            if(data_current.employeestatus_employeestatus_id == '2'){
                if(data_current.statusinformation_contract_end != '-' && data_current.statusinformation_contract_end != '1900-01-01' && data_current.statusinformation_contract_end != '2999-01-01'){
                    exp_date = data_current.statusinformation_contract_end;
                }
            }

            if(data_current.employeestatus_employeestatus_id == '7'){
                if(data_current.statusinformation_consultant_end != '-' && data_current.statusinformation_consultant_end != '1900-01-01' && data_current.statusinformation_consultant_end != '2999-01-01'){
                    exp_date = data_current.statusinformation_consultant_end;
                }
            }
            
            if(data_current.nonactive_date != '-' && data_current.nonactive_date != '1900-01-01' && data_current.nonactive_date != '2999-01-01'){
                exp_date = data_current.nonactive_date;
            }

            var json_api = JSON.stringify(
                                {
                                    "CommandName":"Submit",
                                    "ModelCode":"EmployeeInformation",
                                    "UserName":username,
                                    "Secure": false,
                                    "Token":token,
                                    "ParameterData": [],
                                    "ModelData": {
                                        "Code": result_data_code,
                                        "CompanyCode": data_current.company_code,
                                        // "BirthDate": data_current.birth_date,
                                        // "CurrentAddressSameAsID": false,
                                        // "IdAddressLine1": data_current.ktp_address,
                                        // "CurrentAddressLine1": data_current.address,
                                        // "Relatives": [],
                                        // "JoinDate": data_current.statusinformation_hire_date,
                                        "CustomFieldList": param_customfieldvalue,
                                        "WorkshiftCode": data_current.code.hari_kerja_perminggu,
                                        // "GenderCode": data_current.code.gender_code,
                                        // "MaritalStatusCode": data_current.code.marriagestatus_code,
                                        // "NationalityCode": data_current.code.nationality_code,
                                        // "IDType": data_current.code.id_type_code,
                                        // "OrganizationCode": data_current.code.department_code,
                                        // "JobTitleCode": data_current.code.banding_code,
                                        // "JobLevelCode": data_current.code.group_code,
                                        // "JobPositionCode": data_current.code.position_code,
                                        // "EmploymentStatusCode": data_current.code.employeestatus_code,
                                        "WorkCalendarCode": data_current.code.calendar_company_code,
                                        // "TaxStatusCode": data_current.code.ptkp_code,
                                        "PayrollGroupCode": data_current.code.payroll_group,
                                        // "PayrollCurrencyCode": data_current.code.payroll_currency_code,
                                        // "PayrollPaymentCurrencyCode": data_current.code.payroll_currency_code,
                                        // "PayrollPaymentMethodCode": data_current.code.payment_method_code,
                                        // "PayrollBankCode": data_current.code.bank_rekening_code,
                                        // "TaxCountry": data_current.tax_country_code,
                                        "Nik": data_current.nik_group,
                                        // "Name": data_current.employee_name,
                                        // "BirthPlace": data_current.birth_place,
                                        // "IdType": data_current.code.id_type_code,
                                        "IDNumber": data_current.ktp_number,
                                        // "MobilePhone": data_current.phone_number,
                                        // "PrivateEmailAddress": data_current.email,
                                        // "ExpiredDate": exp_date,
                                        // "OfficeEmailAddress": data_current.email_ciputra,
                                        // "TaxId": data_current.npwp,
                                        // "PayrollBankAccountNumber": data_current.nomor_rekening,
                                        // "PayrollBankAccountName": data_current.nama_rekening,
                                        "InsertStamp": result_data_insertstamp,
                                        "UpdateStamp": result_data_updatestamp,
                                        "Active": result_data_active
                                    },
                                    "ContainFiles": false
                                }
                            );
        

        $.ajax({
                type: 'POST',
                url: url + me.urlServiceRequest,
                contentType: 'application/json',
                data: json_api ,
                success: function(response){
                    var json = JSON.parse(JSON.stringify(response));
                    var result_data = json.Data;
                    var result_status = json.MessageType;
                    var result_status_message = json.Message;

                    // me.updateCustomFieldValueDb(action_to_cherry,value,result_id,result_data,result_status,result_status_message,customfield_code,employee_code,customfield_value);

                    // setTimeout(function () {
                    //         var fp = me.getFormprocess();
                    //         fp.setLoading(false);
                    //     }, 10000);
                    var fp = me.getFormprocess();
                    var count = parseInt(me.customfield_count+1);
                    me.customfield_count = count;
                    fp.setLoading("Process Customfield Employee data to Cherry "+count+" of "+me.last_employee);

                    console.log('Customfield --'+me.customfield_count+'----'+count+'----'+me.employee_current+'----'+me.last_employee);
                    if(me.customfield_count == me.last_employee){

                        var fp = me.getFormprocess();
                        fp.setLoading(false);
                    }
                },
                error: function(XMLHttpRequest) {
                    console.log('ERROR');
                }
        }); 
    },

    //CAREER TRANSITION
    careertransition: function (value,data_current,action_to_cherry,lastprocessid,result_data,result_status,result_status_message,result_data_code,result_data_insertstamp,result_data_updatestamp,result_data_active) {
        var me, grid, store;
        me = this;
        
        var f = me.getPanel().down("form");
        // var choose_projectpt = f.down("[name=projectpt_id]").getValue();
        var choose_ptpt = f.down("[name=ptpt_id]").getValue();
        var choose_startdate = f.down("[name=start_date]").getValue();
        var choose_enddate   = f.down("[name=end_date]").getValue();

        var fp = me.getFormprocess();
        fp.setLoading("Please wait, check CareerTransition...");

        var process_api = fp.down("[name=process_api]").getValue();
        var process_api_model = fp.down("[name=process_api_model]").getValue();

        var jsonString = JSON.stringify(data_current);
        var jsonStringResult = JSON.stringify(result_data);

        var careertransition_var = 'Promosi,Rotasi,Mutasi,Demosi,Perubahan Status,Mengundurkan Diri,Pensiun,Pemutusan Hubungan Kerja,Habis Kontrak,Meninggal Dunia,Lainnya';

        var need_input_cherry_careertransition = '';
        //DB_LOG
        me.tools.ajax({
            params: {   
                        choose_ptpt              : choose_ptpt,
                        careertransition_var     : careertransition_var
                    },
            success: function (data, model) {
                need_input_cherry_careertransition = data.others[0][0].need_input_cherry_careertransition;

                if(need_input_cherry_careertransition){
                    $.each(need_input_cherry_careertransition, function (key, value) {
                        me.saveCareerTransitionDb(key,value);
                    });
                } 
                
                // CREATE CAREER TRANSITION = t_changestatus
                setTimeout(function () {
                    me.checkCareerTransitionEmployeeDb(choose_startdate,choose_enddate,choose_ptpt,jsonString,jsonStringResult);

                }, 5000);

                // Resign
                // if(data_current.nonactive_date != '-' && data_current.nonactive_date != '1900-01-01'){
                //     // setTimeout(function () {
                //         me.checkCareerTransitionEmployeeResignDb(choose_startdate,choose_enddate,choose_ptpt,jsonString,jsonStringResult);

                //     // }, 5000);
                // }

                // // Param VALUE
                // setTimeout(function () {

                //     me.getParamCustomFieldValueDb(customfield_var,jsonString,jsonStringResult,data_current,result_data_code,result_data_insertstamp,result_data_updatestamp,result_data_active);

                // }, 5000);

            }
        }).read('check_careertransition');

    },
    //SAVE TO DB CUSTOMFIELD BEFORE API
    saveCareerTransitionDb: function (key,value) {
        var me, grid, store;
        me = this;
        
        var jsonString = JSON.stringify(value);
        var result_id;
        //DB_LOG
        me.tools.ajax({
            params: {   
                        jsonString          : jsonString
                    },
            success: function (data, model) {
                if(data.others[0][0].msg == 'berhasil'){
                    result_id = data.others[0][0].result_id;
                    if(result_id){
                        console.log(result_id);
                        var res = me.getCareerTransitionToken('submitData',key,value,result_id);
                    }
                }else{
                    console.log('Something error...');
                }
            }
        }).read('save_careertransition_beforeapi');

    },
    //GET TOKEN CHERRY
    getCareerTransitionToken: function(action,key,value,result_id){
        var me = this;
        //GET URL DAN USERNAME
        me.tools.ajax({
            params: {},
            success: function (data, model) {
                                    
                var url = data.others[0][0].url;
                var username = data.others[0][0].username;
                var password = data.others[0][0].password;

                $.ajax({
                        type: 'POST',
                        url: url + me.urlToken,
                        contentType: 'application/json',
                        data: JSON.stringify({ 
                                CommandName:"RequestToken",
                                ModelCode:"AppUserAccount",
                                UserName:username,
                                Password:password,
                                ParameterData:[]
                        }),
                        success: function(response){
                            var json = JSON.parse(JSON.stringify(response));
                            var token = json.Token;

                            if(token){
                                if(action == 'submitData'){
                                    me.submitCareerTransitionData(token,'insert',key,value,result_id,url,username,password);
                                }
                            }
                            // return token;
                        },
                        error: function(XMLHttpRequest) {
                            console.log('ERROR');
                        }
                }); 
            }
        }).read('urlusername');
        
    },
    //GET SUBMIT CHERRY
    submitCareerTransitionData: function(token,action,key,value,result_id,url,username,password){
        var me = this;

        //DEFINITION
        // Mengundurkan Diri,Pensiun,Pemutusan Hubungan Kerja,Habis Kontrak,Meninggal Dunia,Lainnya
        var transition_code = '';
        if(value.name == 'Mengundurkan Diri' || value.name == 'Pemutusan Hubungan Kerja' || value.name == 'Habis Kontrak' || value.name == 'Meninggal Dunia' || value.name == 'Pensiun' || value.name == 'Lainnya'){
            transition_code = 'TerminationTransition';
        }else{
            transition_code = 'RegularTransition';
        }
            
            var json_api = JSON.stringify(
                                {
                                    "CommandName":"Submit",
                                    "ModelCode":"CareerTransitionTypes",
                                    "UserName":username,
                                    "Secure": false,
                                    "Token":token,
                                    "ParameterData": [],
                                    "ModelData": {
                                        // "TypeCode": "RegularTransition",
                                        "TypeCode": transition_code,
                                        "CompanyCode": value.company_code,
                                        "Name": value.name,
                                        "Active": true
                                    },
                                    "ContainFiles": false
                                }
                            );

        $.ajax({
                type: 'POST',
                url: url + me.urlServiceRequest,
                contentType: 'application/json',
                data: json_api ,
                success: function(response){
                    var json = JSON.parse(JSON.stringify(response));
                    var result_data = json.Data;
                    var result_status = json.MessageType;
                    var result_status_message = json.Message;

                    me.updateCareerTransitionDb(action,key,value,result_id,result_data,result_status,result_status_message);
                },
                error: function(XMLHttpRequest) {
                    console.log('ERROR');
                }
        }); 
    },
    //UPDATE TO DB CareerTransition BEFORE API
    updateCareerTransitionDb: function (action,key,value,result_id,result_data,result_status,result_status_message) {
        var me, grid, store;
        me = this;
        
        var jsonString = JSON.stringify(value);
        var jsonStringResult = JSON.stringify(result_data);

        // var load = 0;
        // var count = 0;

        //DB_LOG
        me.tools.ajax({
            params: {   
                        action              : action,
                        result_id           : result_id,
                        jsonString          : jsonString,
                        jsonStringResult    : jsonStringResult,
                        result_status       : result_status,
                        result_status_message : result_status_message
                    },
            success: function (data, model) {
                console.log(data);

                var fp = me.getFormprocess();
                var count = parseInt(me.careertransitiontype_load+1);
                me.careertransitiontype_load = count;
                fp.setLoading("Process CareerTransitionType data to Cherry "+me.careertransitiontype_load+" of "+me.careertransitiontype_count);

                console.log('CareerTransitionType --'+me.careertransitiontype_load+'----'+me.careertransitiontype_count);

                if(me.careertransitiontype_load == me.careertransitiontype_count){
                    me.updateGridEmployee();
                    
                    setTimeout(function () {
                        fp.setLoading(false);
                    }, 3000);
                }
            }
        }).read('update_careertransition_afterapi');

    },

    //CAREER TRANSITION EMPLOYEE
    checkCareerTransitionEmployeeDb: function (choose_startdate,choose_enddate,choose_ptpt,jsonString,jsonStringResult) {
        var me, grid, store;
        me = this;
        
        var f = me.getPanel().down("form");
        var fp = me.getFormprocess();

        var need_input_cherry_careertransition_employee = '';
        //DB_LOG
        me.tools.ajax({
            params: {   
                        choose_ptpt              : choose_ptpt,
                        choose_startdate         : choose_startdate,
                        choose_enddate           : choose_enddate,
                        jsonString               : jsonString,
                        jsonStringResult         : jsonStringResult
                    },
            success: function (data, model) {
                need_input_cherry_careertransition_employee = data.others[0][0].check_db.need_input_cherry_careertransition_employee;
                
                if(need_input_cherry_careertransition_employee){
                    fp.setLoading("Employee Have Career Transition...");

                    me.careertransition_last = need_input_cherry_careertransition_employee.length;

                    $.each(need_input_cherry_careertransition_employee, function (key, value) {
                        //ini sudah pasti
                        me.getCareerTransitionEmployeeDb(key,value);
                        //coba yg ini dulu
                        // me.getCareerTransitionEmployeeBeforeDb(key,value);
                    });
                }else{
                    setTimeout(function () {
                        fp.setLoading(false);
                    }, 10000);
                } 
                
                

            }
        }).read('check_careertransition_employee');

    },
    //check already before
    getCareerTransitionEmployeeBeforeDb: function (key,value) {
        var me, grid, store;
        me = this;
        
        var jsonString = JSON.stringify(value);
        var result_id;
        //DB_LOG
        me.tools.ajax({
            params: {   
                        jsonString          : jsonString
                    },
            success: function (data, model) {
                
                need_update_cherry_careertransition_employee_before = data.others[0][0].need_update_cherry_careertransition_employee_before;
                hasil_get = data.others[0][0].hasil_get;
                msg = data.others[0][0].msg;
                hasil_update = data.others[0][0].hasil_update;

                if(need_update_cherry_careertransition_employee_before){
                    me.saveCareerTransitionEmployeeBeforeDb(need_update_cherry_careertransition_employee_before,hasil_get,msg,hasil_update);

                    //update dulu yg lama expired datenya keiisi baru di submit yg baru
                    // setTimeout(function () {
                    // }, 5000);
                        me.getCareerTransitionEmployeeDb(key,value);
                }else{
                    me.getCareerTransitionEmployeeDb(key,value);
                }
                
            }
        }).read('get_careertransition_employee_before');
    },
    //get log
    getCareerTransitionEmployeeDb: function (key,value) {
        var me, grid, store;
        me = this;
        
        var jsonString = JSON.stringify(value);
        var result_id;
        //DB_LOG
        me.tools.ajax({
            params: {   
                        jsonString          : jsonString
                    },
            success: function (data, model) {
                
                    action_to_cherry = data.others[0][0].action_to_cherry;
                    hasil_get = data.others[0][0].hasil_get;

                    if(action_to_cherry != 'nothing'){
                        me.saveCareerTransitionEmployeeDb(action_to_cherry,key,value,hasil_get);
                    }
                
            }
        }).read('get_careertransition_employee');
    },
    //SAVE TO DB CareerTransitionEmployee BEFORE API
    saveCareerTransitionEmployeeDb: function (action_to_cherry,key,value,hasil_get) {
        var me, grid, store;
        me = this;
        
        var jsonString = JSON.stringify(value);
        var result_id;
        //DB_LOG
        me.tools.ajax({
            params: {   
                        jsonString          : jsonString,
                        action_to_cherry    : action_to_cherry
                    },
            success: function (data, model) {
                if(data.others[0][0].msg == 'berhasil'){
                    result_id = data.others[0][0].result_id;
                    // console.log('----------------------');
                    // console.log(result_id);
                    // console.log('----------------------');
                    if(result_id){
                        var res = me.getCareerTransitionEmployeeToken(action_to_cherry,key,value,hasil_get,result_id);
                    }
                }else{
                    console.log('Something error...');
                }
            }
        }).read('save_careertransitionemployee_beforeapi');

    },
    saveCareerTransitionEmployeeBeforeDb: function (need_update_cherry_careertransition_employee_before,hasil_get,msg,hasil_update) {
        var me, grid, store;
        me = this;
        
        // var res = me.getCareerTransitionEmployeeToken('update','0',need_update_cherry_careertransition_employee_before,hasil_get,hasil_update);
        

    },
    //GET TOKEN CHERRY
    getCareerTransitionEmployeeToken: function(action,key,value,hasil_get,result_id){
        var me = this;
        //GET URL DAN USERNAME
        me.tools.ajax({
            params: {},
            success: function (data, model) {
                                    
                var url = data.others[0][0].url;
                var username = data.others[0][0].username;
                var password = data.others[0][0].password;

                $.ajax({
                        type: 'POST',
                        url: url + me.urlToken,
                        contentType: 'application/json',
                        data: JSON.stringify({ 
                                CommandName:"RequestToken",
                                ModelCode:"AppUserAccount",
                                UserName:username,
                                Password:password,
                                ParameterData:[]
                        }),
                        success: function(response){
                            var json = JSON.parse(JSON.stringify(response));
                            var token = json.Token;

                            if(token){
                                me.submitCareerTransitionEmployeeData(token,action,key,value,hasil_get,result_id,url,username,password);
                            }
                            // return token;
                        },
                        error: function(XMLHttpRequest) {
                            console.log('ERROR');
                        }
                }); 
            }
        }).read('urlusername');
        
    },
    //GET SUBMIT CHERRY
    submitCareerTransitionEmployeeData: function(token,action,key,value,hasil_get,result_id,url,username,password){
        var me = this;

        //DEFINITION
        if(action == 'insert'){
            var json_api = JSON.stringify(
                                {
                                    "CommandName":"Submit",
                                    "ModelCode":"EmployeeCareerTransition",
                                    "UserName":username,
                                    "Secure": false,
                                    "Token":token,
                                    "ParameterData": [],
                                    "ModelData": {
                                        "Date": value.date,
                                        "Nik": value.nik_group,
                                        "EmployeeCode": value.employee_code,
                                        "TypeCode": value.careertransitiontype_code,
                                        "CompanyCode": value.old_company_code,
                                        "OrganizationCode": value.old_department,
                                        "JobTitleCode": value.old_banding,
                                        "JobLevelCode": value.old_group,
                                        "JobPositionCode": value.old_position,
                                        "NewCompanyCode": value.new_company_code,
                                        "NewOrganizationCode": value.new_department,
                                        "NewJobLevelCode": value.new_group,
                                        "NewJobTitleCode": value.new_banding,
                                        "NewJobPositionCode": value.new_position,
                                        "NewEmploymentStatusCode": value.new_empstatus,
                                        "RequestedByCode": "ADM",
                                        "Notes": value.reason,
                                        "Subject": null,
                                        "StatusId": "Approved",
                                        //"ReasonCode": null,
                                        "EffectiveDate": value.effective_date,
                                        // "ExpiredDate": value.expired_date,
                                        "ExpectedExpiredDate": value.expired_date,
                                        "Active": true
                                    },
                                    "ContainFiles": false
                                }
                            );
        }
        if(action == 'update'){
            var code = hasil_get[0].code;
            var insertstamp = hasil_get[0].insertstamp;
            var updatestamp = hasil_get[0].updatestamp;

            var json_api = JSON.stringify(
                                {
                                    "CommandName":"Submit",
                                    "ModelCode":"EmployeeCareerTransition",
                                    "UserName":username,
                                    "Secure": false,
                                    "Token":token,
                                    "ParameterData": [],
                                    "ModelData": {
                                        "Code": code,
                                        "Date": value.date,
                                        "Nik": value.nik_group,
                                        "EmployeeCode": value.employee_code,
                                        "TypeCode": value.careertransitiontype_code,
                                        "CompanyCode": value.old_company_code,
                                        "OrganizationCode": value.old_department,
                                        "JobTitleCode": value.old_banding,
                                        "JobLevelCode": value.old_group,
                                        "JobPositionCode": value.old_position,
                                        "NewCompanyCode": value.new_company_code,
                                        "NewOrganizationCode": value.new_department,
                                        "NewJobLevelCode": value.new_group,
                                        "NewJobTitleCode": value.new_banding,
                                        "NewJobPositionCode": value.new_position,
                                        "NewEmploymentStatusCode": value.new_empstatus,
                                        "RequestedByCode": "ADM",
                                        "Notes": value.reason,
                                        "Subject": null,
                                        "StatusId": "Approved",
                                        //"ReasonCode": null,
                                        "EffectiveDate": value.effective_date,
                                        // "ExpiredDate": value.expired_date,
                                        "ExpectedExpiredDate": value.expired_date,
                                        "Active": true,
                                        "InsertStamp": insertstamp,
                                        "UpdateStamp": updatestamp,
                                    },
                                    "ContainFiles": false
                                }
                            );
        }

        $.ajax({
                type: 'POST',
                url: url + me.urlServiceRequest,
                contentType: 'application/json',
                data: json_api ,
                success: function(response){
                    var json = JSON.parse(JSON.stringify(response));
                    var result_data = json.Data;
                    var result_status = json.MessageType;
                    var result_status_message = json.Message;

                    me.updateCareerTransitionEmployeeDb(action,key,value,result_id,result_data,result_status,result_status_message);
                },
                error: function(XMLHttpRequest) {
                    console.log('ERROR');
                }
        }); 
    },
    //UPDATE TO DB careertransition BEFORE API
    updateCareerTransitionEmployeeDb: function (action,key,value,result_id,result_data,result_status,result_status_message) {
        var me, grid, store;
        me = this;
        var fp = me.getFormprocess();

        var jsonString = JSON.stringify(value);
        var jsonStringResult = JSON.stringify(result_data);

        //DB_LOG
        me.tools.ajax({
            params: {   
                        action              : action,
                        result_id           : result_id,
                        jsonString          : jsonString,
                        jsonStringResult    : jsonStringResult,
                        result_status       : result_status,
                        result_status_message : result_status_message
                    },
            success: function (data, model) {
                // if(last_employee == employee_current){

                //     var fp = me.getFormprocess();
                //     fp.setLoading(false);
                // }

                var fp = me.getFormprocess();
                var count = parseInt(me.careertransition_count+1);
                me.careertransition_count = count;
                // fp.setLoading("Process CareerTransition Employee data to Cherry "+count+" of "+me.careertransition_last);

                console.log('CareerTransition --'+me.careertransition_count+'----'+count+'----'+me.careertransition_last);

                if(me.careertransition_count == me.careertransition_last){
                    fp.setLoading(false);
                }

                //TEST (05/01/2021)
                if(me.careertransition_count > me.careertransition_last){
                    fp.setLoading(false);
                }

                // setTimeout(function () {
                            
                //             fp.setLoading(false);
                //         }, 10000);
            }
        }).read('update_careertransitionemployee_afterapi');

    },

    //CAREER TRANSITION EMPLOYEE RESIGN
    checkCareerTransitionEmployeeResignDb: function (choose_startdate,choose_enddate,choose_ptpt,jsonString,jsonStringResult) {
        var me, grid, store;
        me = this;
        
        var f = me.getPanel().down("form");
        var fp = me.getFormprocess();

        var need_input_cherry_careertransition_employee = '';
        //DB_LOG
        me.tools.ajax({
            params: {   
                        choose_ptpt              : choose_ptpt,
                        choose_startdate         : choose_startdate,
                        choose_enddate           : choose_enddate,
                        jsonString               : jsonString,
                        jsonStringResult         : jsonStringResult
                    },
            success: function (data, model) {
                need_input_cherry_careertransition_employee = data.others[0][0].check_db.need_input_cherry_careertransition_employee;
                
                if(need_input_cherry_careertransition_employee){
                    fp.setLoading("Employee Have Career Transition...");

                    // me.careertransition_last = need_input_cherry_careertransition_employee.length;

                    $.each(need_input_cherry_careertransition_employee, function (key, value) {
                        //ini sudah pasti
                        me.getCareerTransitionEmployeeDb(key,value);
                        //coba yg ini dulu
                        // me.getCareerTransitionEmployeeBeforeDb(key,value);
                    });
                } 
            }
        }).read('check_careertransition_employeeresign');

    },
    //CAREER TRANSITION EMPLOYEE
    checkCareerTransitionEmployeeResignExpBeforeDb: function (choose_startdate,choose_enddate,choose_ptpt,jsonString,jsonStringResult,need_input_cherry_careertransition_employee_resign) {
        var me, grid, store;
        me = this;
        
        var f = me.getPanel().down("form");
        var fp = me.getFormprocess();

        var need_input_cherry_careertransition_employee = '';
        
        var jsonResign = JSON.stringify(need_input_cherry_careertransition_employee_resign);

        //DB_LOG
        me.tools.ajax({
            params: {   
                        choose_ptpt              : choose_ptpt,
                        choose_startdate         : choose_startdate,
                        choose_enddate           : choose_enddate,
                        jsonString               : jsonString,
                        jsonStringResult         : jsonStringResult,
                        jsonResign               : jsonResign

                    },
            success: function (data, model) {
                need_input_cherry_careertransition_employee = data.others[0][0].check_db.need_input_cherry_careertransition_employee;
                
                if(need_input_cherry_careertransition_employee){
                    fp.setLoading("Employee Have Career Transition...");

                    // me.careertransition_last = need_input_cherry_careertransition_employee.length;

                    $.each(need_input_cherry_careertransition_employee, function (key, value) {
                        //ini sudah pasti
                        me.getCareerTransitionEmployeeExpBeforeDb(key,value);
                        //coba yg ini dulu
                        // me.getCareerTransitionEmployeeBeforeDb(key,value);
                    });
                } 
                
                

            }
        }).read('check_careertransition_employee_expbefore');
    },
    //get log
    getCareerTransitionEmployeeExpBeforeDb: function (key,value) {
        var me, grid, store;
        me = this;
        
        var jsonString = JSON.stringify(value);
        var result_id;
        //DB_LOG
        me.tools.ajax({
            params: {   
                        jsonString          : jsonString
                    },
            success: function (data, model) {
                
                    action_to_cherry = data.others[0][0].action_to_cherry;
                    hasil_get = data.others[0][0].hasil_get;

                    if(action_to_cherry != 'nothing'){
                        me.saveCareerTransitionEmployeeExpBeforeDb(action_to_cherry,key,value,hasil_get);
                    }
                
            }
        }).read('get_careertransition_employee_expbefore');
    },
    //SAVE TO DB CareerTransitionEmployee BEFORE API
    saveCareerTransitionEmployeeExpBeforeDb: function (action_to_cherry,key,value,hasil_get) {
        var me, grid, store;
        me = this;
        
        var jsonString = JSON.stringify(value);
        var result_id;
        //DB_LOG
        me.tools.ajax({
            params: {   
                        jsonString          : jsonString,
                        action_to_cherry    : action_to_cherry
                    },
            success: function (data, model) {
                if(data.others[0][0].msg == 'berhasil'){
                    result_id = data.others[0][0].result_id;

                    if(result_id){
                        var res = me.getCareerTransitionEmployeeExpBeforeToken(action_to_cherry,key,value,hasil_get,result_id);
                    }
                }else{
                    console.log('Something error...');
                }
            }
        }).read('save_careertransitionemployee_beforeapi');

    },
    //GET TOKEN CHERRY
    getCareerTransitionEmployeeExpBeforeToken: function(action,key,value,hasil_get,result_id){
        var me = this;
        //GET URL DAN USERNAME
        me.tools.ajax({
            params: {},
            success: function (data, model) {
                                    
                var url = data.others[0][0].url;
                var username = data.others[0][0].username;
                var password = data.others[0][0].password;

                $.ajax({
                        type: 'POST',
                        url: url + me.urlToken,
                        contentType: 'application/json',
                        data: JSON.stringify({ 
                                CommandName:"RequestToken",
                                ModelCode:"AppUserAccount",
                                UserName:username,
                                Password:password,
                                ParameterData:[]
                        }),
                        success: function(response){
                            var json = JSON.parse(JSON.stringify(response));
                            var token = json.Token;

                            if(token){
                                me.submitCareerTransitionEmployeeExpBeforeData(token,action,key,value,hasil_get,result_id,url,username,password);
                            }
                            // return token;
                        },
                        error: function(XMLHttpRequest) {
                            console.log('ERROR');
                        }
                }); 
            }
        }).read('urlusername');
        
    },
    //GET SUBMIT CHERRY
    submitCareerTransitionEmployeeExpBeforeData: function(token,action,key,value,hasil_get,result_id,url,username,password){
        var me = this;

        //DEFINITION
        if(action == 'insert'){
            var json_api = JSON.stringify(
                                {
                                    "CommandName":"Submit",
                                    "ModelCode":"EmployeeCareerTransition",
                                    "UserName":username,
                                    "Secure": false,
                                    "Token":token,
                                    "ParameterData": [],
                                    "ModelData": {
                                        "Date": value.date,
                                        "Nik": value.nik_group,
                                        "EmployeeCode": value.employee_code,
                                        "TypeCode": value.careertransitiontype_code,
                                        "CompanyCode": value.old_company_code,
                                        "OrganizationCode": value.old_department,
                                        "JobTitleCode": value.old_banding,
                                        "JobLevelCode": value.old_group,
                                        "JobPositionCode": value.old_position,
                                        "NewCompanyCode": value.new_company_code,
                                        "NewOrganizationCode": value.new_department,
                                        "NewJobLevelCode": value.new_group,
                                        "NewJobTitleCode": value.new_banding,
                                        "NewJobPositionCode": value.new_position,
                                        "NewEmploymentStatusCode": value.new_empstatus,
                                        "RequestedByCode": "ADM",
                                        "Notes": value.reason,
                                        "Subject": null,
                                        "StatusId": "Approved",
                                        //"ReasonCode": null,
                                        "EffectiveDate": value.effective_date,
                                        // "ExpiredDate": value.expired_date,
                                        "ExpectedExpiredDate": value.expired_date,
                                        "Active": true
                                    },
                                    "ContainFiles": false
                                }
                            );
        }
        if(action == 'update'){
            var code = hasil_get[0].code;
            var insertstamp = hasil_get[0].insertstamp;
            var updatestamp = hasil_get[0].updatestamp;

            var json_api = JSON.stringify(
                                {
                                    "CommandName":"Submit",
                                    "ModelCode":"EmployeeCareerTransition",
                                    "UserName":username,
                                    "Secure": false,
                                    "Token":token,
                                    "ParameterData": [],
                                    "ModelData": {
                                        "Code": code,
                                        "Date": value.date,
                                        "Nik": value.nik_group,
                                        "EmployeeCode": value.employee_code,
                                        "TypeCode": value.careertransitiontype_code,
                                        "CompanyCode": value.old_company_code,
                                        "OrganizationCode": value.old_department,
                                        "JobTitleCode": value.old_banding,
                                        "JobLevelCode": value.old_group,
                                        "JobPositionCode": value.old_position,
                                        "NewCompanyCode": value.new_company_code,
                                        "NewOrganizationCode": value.new_department,
                                        "NewJobLevelCode": value.new_group,
                                        "NewJobTitleCode": value.new_banding,
                                        "NewJobPositionCode": value.new_position,
                                        "NewEmploymentStatusCode": value.new_empstatus,
                                        "RequestedByCode": "ADM",
                                        "Notes": value.reason,
                                        "Subject": null,
                                        "StatusId": "Approved",
                                        //"ReasonCode": null,
                                        "EffectiveDate": value.effective_date,
                                        // "ExpiredDate": value.expired_date,
                                        "ExpectedExpiredDate": value.expired_date,
                                        "Active": true,
                                        "InsertStamp": insertstamp,
                                        "UpdateStamp": updatestamp,
                                    },
                                    "ContainFiles": false
                                }
                            );
        }

        $.ajax({
                type: 'POST',
                url: url + me.urlServiceRequest,
                contentType: 'application/json',
                data: json_api ,
                success: function(response){
                    var json = JSON.parse(JSON.stringify(response));
                    var result_data = json.Data;
                    var result_status = json.MessageType;
                    var result_status_message = json.Message;

                    me.updateCareerTransitionEmployeeExpBeforeDb(action,key,value,result_id,result_data,result_status,result_status_message);
                },
                error: function(XMLHttpRequest) {
                    console.log('ERROR');
                }
        }); 
    },
    //UPDATE TO DB careertransition BEFORE API
    updateCareerTransitionEmployeeExpBeforeDb: function (action,key,value,result_id,result_data,result_status,result_status_message) {
        var me, grid, store;
        me = this;
        var fp = me.getFormprocess();

        var jsonString = JSON.stringify(value);
        var jsonStringResult = JSON.stringify(result_data);

        //DB_LOG
        me.tools.ajax({
            params: {   
                        action              : action,
                        result_id           : result_id,
                        jsonString          : jsonString,
                        jsonStringResult    : jsonStringResult,
                        result_status       : result_status,
                        result_status_message : result_status_message
                    },
            success: function (data, model) {
                var f = me.getPanel().down("form");
                var fp = me.getFormprocess();

                var need_input_cherry_careertransition_employee_resign = '';
                //DB_LOG
                me.tools.ajax({
                    params: {   
                                choose_ptpt              : choose_ptpt,
                                choose_startdate         : choose_startdate,
                                choose_enddate           : choose_enddate,
                                jsonString               : jsonString,
                                jsonStringResult         : jsonStringResult
                            },
                    success: function (data, model) {
                        need_input_cherry_careertransition_employee_resign = data.others[0][0].check_db.need_input_cherry_careertransition_employee;
                        
                        if(need_input_cherry_careertransition_employee_resign){
                            fp.setLoading("Employee Have Career Transition...");
                             
                            // $.each(need_input_cherry_careertransition_employee, function (key, value) {
                            //     me.getCareerTransitionEmployeeResignExpBeforeDb(key,value);
                            // });
                        } 
                    }
                }).read('check_careertransition_employeeresign');
            }
        }).read('update_careertransitionemployee_afterapi');

    },

});