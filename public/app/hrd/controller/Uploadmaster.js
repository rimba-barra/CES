Ext.define('Hrd.controller.Uploadmaster', {
    // extend: 'Hrd.template.ControllerForMaster',
    extend: 'Hrd.template.ControllerForMasterDirect',
    // extend: 'Hrd.library.box.controller.ControllerReport',
    // extend: 'Hrd.library.box.controller.Controller',
    alias: 'controller.uploadmaster',
    controllerName: 'uploadmaster',
    bindPrefixName: 'Uploadmaster',
    dateNow: new Date(),
    uploadFotoKlik:0,
    ParamRender:null,
    urlToken: '/api/common/RequestToken',
    urlServiceRequest: '/api/common/ServiceRequest',
    otherParamsAT :{leave:0,sick:0,permission:0},
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
    careertransitiontype_count: 0,
    careertransitiontype_load: 0,
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
            selector: 'uploadmasterformprocess'
        },
        {
            ref: 'gridprocess',
            selector: 'uploadmasterprocessgrid'
        },
        {
            ref: 'gridprocessbanding',
            selector: 'uploadmasterprocessbandinggrid'
        },
        {
            ref: 'gridprocessgroup',
            selector: 'uploadmasterprocessgroupgrid'
        },
        {
            ref: 'gridprocessjobfamily',
            selector: 'uploadmasterprocessjobfamilygrid'
        },
        {
            ref: 'gridprocessposition',
            selector: 'uploadmasterprocesspositiongrid'
        },
        {
            ref: 'gridprocessemployee',
            selector: 'uploadmasterprocessemployeegrid'
        },
        {
            ref: 'gridprocesscareertransition',
            selector: 'uploadmasterprocesscareertransitiongrid'
        },
        
    ],
    init: function(application) {
        this.callParent(arguments);
        var newEvs = {};
        var me = this;
        newEvs['uploadmasterpanel #btnUpload'] = {
            click: function(el, val) {
                me.formUploadProcess();    
            }
        };
        newEvs['uploadmasterpanel #file_name_upload'] = {
            change: function(fld, a) {

                me.formUploadFoto(fld, a, 'mode');
            }
        };
        newEvs['uploadmasterpanel #view_file'] = {
            click: function(el, val) {
                me.viewFile();    
            }
        };
        newEvs['uploadmasterpanel [name=upload_type]'] = {
            change: function() {
               me.selectType();
            }
        };
        newEvs['uploadmasterpanel #btnViewTable'] = {
            click: function(el, val) {
                me.formViewTable();    
            }
        };
        newEvs['uploadmasterformprocess'] = {
            afterrender: function () {
                me.formViewTableAfterRender();
            }
        };

        newEvs['uploadmasterpanel #download_template_file'] = {
            click: function(el, val) {
                me.templateFile();    
            }
        };

        newEvs['uploadmasterpanel #download_projectpt'] = {
            click: function(el, val) {
                me.exportDataProjectPt();
            }
        };

        //process to cherry
        newEvs['uploadmasterformprocess [action=process_cherry]'] = {
            click: function(el, val) {
                me.processCherry();  
            }
        };
        
        console.log(me.controllerName);

        this.control(newEvs);
    },
    /* must override */
    processParams: function(reportData) {
        var me = this;

        var sd = new Date(reportData['params']['start_date']);
        var projectptId = reportData['params']['projectpt_id'];
        reportData['params']['projectpt_id'] = projectptId==="999"?"0":projectptId;
        // var ptptId = reportData['params']['ptpt_id'];
        // reportData['params']['ptpt_id'] = ptptId==="999"?"0":ptptId;
        
        return reportData;
    },
    
    zendInitLoaded: function(data) {
        var me = this;
        var f = me.getForm();
        var vs = f.getValues();

        me.tools.wesea(data.projectpt, f.down("[name=projectpt_id]")).comboBox(true);
        f.down("[name=projectpt_id]").setValue('');

        // me.tools.wesea(data.companycherry, f.down("[name=ptpt_id]")).comboBox(true);
        // f.down("[name=ptpt_id]").setValue('');

        return;

    },
    panelAfterRender: function (el) {
        var me = this;
        var f = me.getPanel().down("form");
        var vs = f.getValues();
        me.tools.ajax({
            params: {},
            success: function (data, model) {
                f.down("#view_file").hide();
                f.down("#file_name_upload").hide();
                me.tools.wesea(data.projectpt, f.down("[name=projectpt_id]")).comboBox(true);
                f.down("[name=projectpt_id]").setValue('');
                f.down('[name=projectpt_id]').setReadOnly(true);
                // me.tools.wesea(data.companycherry, f.down("[name=ptpt_id]")).comboBox(true);
                // f.down("[name=ptpt_id]").setValue('');
                // f.down('[name=ptpt_id]').setReadOnly(true);
                me.tools.alert.warning("Please Select Upload Master Data!");
            }
        }).read('init');
        
    },
    getEmGrid: function() {
        return this.getForm().down("#employeeListGridID");
    },
    getReportTypeCombo: function() {
        return this.getForm().down("[name=report_type]");
    },
    cleannullinCombo: function (form, value) {
        if (typeof (form.down("[name=projectpt_id]").getValue()) !== 'number') {
            value['projectpt_id'] = '0';
        }
        // if (typeof (form.down("[name=ptpt_id]").getValue()) !== 'number') {
        //     value['ptpt_id'] = '0';
        // }
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
     exportDataProjectPt:function(){
        var me, url, formvalue, form;
        me = this;
        form = me.getPanel().down("form");
        formvalue = form.getValues();
               
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
        }).read('exportdataprojectpt');        
     },
     setReadonlydata: function (form) {
        form.down("#file_name_upload").hide();
        form.down("[name=projectpt_id]").setValue('');
        form.down('[name=projectpt_id]').setReadOnly(true);
        // form.down("[name=ptpt_id]").setValue('');
        // form.down('[name=ptpt_id]').setReadOnly(true);
        form.down("#download_template_file").setDisabled(true);
    },
    unsetReadonlydata: function (form) {
        form.down("#file_name_upload").show();
        form.down('[name=projectpt_id]').setReadOnly(false);
        // form.down('[name=ptpt_id]').setReadOnly(false);
        form.down("#download_template_file").setDisabled(false);
    },
    selectType: function () {
        var me = this;
        var f = me.getPanel().down("form");
        var vs = f.getValues();
        var currentDate = new Date();

        var choose = vs["upload_type"];
        if(choose == ''){
             me.setReadonlydata(f);
        }else{
            me.unsetReadonlydata(f);
            f.down("[name=file_name_upload]").setValue('');
            f.down("[name=file_name_show]").setValue('');
            f.down("#view_file").hide();
            if(choose == 'uploadmaster_careertransition'){
                f.down("#download_projectpt").setDisabled(false);
            }else{
                f.down("#download_projectpt").setDisabled(true);
            }
        }
        
    },
    formUploadFoto: function(fld, a, mode) {
        var me = this;

        if (me.uploadFotoKlik === 0) {
            var me = this;
            var form = me.getPanel().down("form");
            var p = form.up("window");
            var vs = form.getValues();
            var choose = vs["upload_type"];

            me.uploadFile({
                form: form,
                showalert: false,
                params: {
                    "type": 'dokumen', 
                    'choose': choose
                  //  "nik": me.getFormdata().down("[name=employee_nik]").getValue(),
                   // "employee_id":me.getFormdata().down("[name=employee_id]").getValue()
                },
                callback: {
                    success: function(fn) {
                        p.setLoading(false);
                        //console.log(fn);
                      //  me.refreshPhotoInfo(fn);
                        me.uploadFotoKlik = 0;
                        form.down("[name=file_name_upload]").setValue(fn);
                        form.down("[name=file_name_show]").show();
                        form.down("[name=file_name_show]").setValue(fn);
                        form.down("#view_file").show();
                        console.log(fn);

                    },
                    failure: function() {
                        me.uploadFotoKlik = 0;
                        p.setLoading(false);
                    }
                }
            });
            
            me.uploadFotoKlik = 1;
        }


    },
    viewFile:function(){
       var me = this;
       var f = me.getPanel().down("form");
       var vs = f.getValues();
       var choose_type = vs["upload_type"];
       var fileName = f.down("[name=file_name_show]").getValue();
       if(fileName.length > 0){
           window.open(document.URL+"app/hrd/uploads/cherry/dokumen/"+choose_type+"/"+fileName);
      
       }else{
           me.tools.alert.warning("Tidak ada file");
       }
    },
    templateFile:function(){
        var me = this;
        var f = me.getPanel().down("form");
        var vs = f.getValues();
        var choose_type = vs["upload_type"];
        var fileName = choose_type;
       if(fileName.length > 0){
           window.open(document.URL+"app/hrd/uploads/cherry/dokumen/template_uploadmaster/template_"+fileName+".xlsx");
      
       }else{
           me.tools.alert.warning("Tidak ada file");
       }
    },
    formUploadProcess: function () {
        var me, grid, store;
        me = this;
        var form = me.getPanel().down("form");
        var p = me.getPanel();
        var vs = form.getValues();

        var choose_projectpt = '';
        // var choose_ptpt = '';
        var fn = '';
        var choose_type = vs["upload_type"];

        if(form.down('[name=projectpt_id]').getValue() == '' || form.down('[name=projectpt_id]').getValue() == null){
            me.tools.alert.warning("Select Project PT is required");
            return false;
        } else {
            if(form.down('[name=projectpt_id]').getValue() == '999'){
                me.tools.alert.warning("Project PT tidak boleh ALL");
                return false;
            }else{
                choose_projectpt = form.down("[name=projectpt_id]").getValue();
            }
        }

        // if(form.down('[name=ptpt_id]').getValue() == '' || form.down('[name=ptpt_id]').getValue() == null){
        //     me.tools.alert.warning("Select PT is required");
        //     return false;
        // } else {
        //     if(form.down('[name=ptpt_id]').getValue() == '999'){
        //         me.tools.alert.warning("PT tidak boleh ALL");
        //         return false;
        //     }else{
        //         choose_ptpt = form.down("[name=ptpt_id]").getValue();
        //     }
        // }

        if(form.down('[name=file_name_show]').getValue() == '' || form.down('[name=file_name_show]').getValue() == null){
            me.tools.alert.warning("Upload File is required");
            return false;
        } else {
           fn = form.down("[name=file_name_show]").getValue();
        }
        p.setLoading('Please wait...');
        me.tools.ajax({
            params: {
                file_name: fn,
                choose_projectpt: choose_projectpt,
                 // choose_ptpt: choose_ptpt,
                choose_type: choose_type
            },
            success: function (data, model) {
                console.log(data);
                p.setLoading(false);
                if (data['others'][0][0]['MSG'] == 'Success') {
                    me.tools.alert.info("Success");
                    me.instantWindow("FormProcess", 950, "View Table", "viewtable", "uploadmasterformprocess");
                } else {
                    me.tools.alert.warning(data['others'][0][0]['MSG']);
                }


            }
        }).read('uploadexcel');
        
    },
    formViewTable: function () {
        var me, grid, store;
        me = this;
        var f = me.getPanel().down("form");
        if(f.down('[name=projectpt_id]').getValue() == '' || f.down('[name=projectpt_id]').getValue() == null){
            me.tools.alert.warning("Select Project PT is required");
            return false;
        }
        // if(f.down('[name=ptpt_id]').getValue() == '' || f.down('[name=ptpt_id]').getValue() == null){
        //     me.tools.alert.warning("Select PT is required");
        //     return false;
        // }
        else{
            if(f.down('[name=projectpt_id]').getValue() == '999'){
                me.tools.alert.warning("Project PT tidak boleh ALL");
                return false;
            }else{
                me.instantWindow("FormProcess", 950, "View Table", "viewtable", "uploadmasterformprocess");
            }
        }
        
    },
    formViewTableAfterRender: function () {
        var me, grid, store;
        me = this;
        var f = me.getPanel().down("form");

        if(f.down('[name=projectpt_id]').getValue() == '' || f.down('[name=projectpt_id]').getValue() == null){
            me.tools.alert.warning("Select Project PT is required");
            return false;
        } 
        // if(f.down('[name=ptpt_id]').getValue() == '' || f.down('[name=ptpt_id]').getValue() == null){
        //     me.tools.alert.warning("Select PT is required");
        //     return false;
        // }
        else {
            choose_projectpt = f.down("[name=projectpt_id]").getValue();
        }

        var fp = me.getFormprocess();

        var vs = f.getValues();
        var choose = vs["upload_type"];
        // fp.down("[action=download_log]").hide();
        fp.setLoading("Please wait...");
        
        if(choose == 'uploadmaster_department'){
            fp.down('#pMasterDepartmentTabID').setDisabled(false);

            fp.down('#pEmployeeTabID').setDisabled(true);
            fp.down('#pMasterBandingTabID').setDisabled(true);
            fp.down('#pMasterGroupTabID').setDisabled(true);
            fp.down('#pMasterJobFamilyTabID').setDisabled(true);
            fp.down('#pMasterPositionTabID').setDisabled(true);
            fp.down('#pCareerTransitionTabID').setDisabled(true);

            fp.down('#tabID').setActiveTab(1);
            
            var gp = me.getGridprocess();
            var sgp = gp.getStore();
            me.tools.ajax({
                params: {
                        projectpt_id : choose_projectpt,
                        // ptpt_id : choose_ptpt,
                        upload_type   : choose},
                success: function (data, model) {
                    me.tools.wesea({data: data, model: model}, gp).grid();
                    sgp.reload();
                    fp.setLoading(false);
                    if(data.length > 0){
                        fp.down("[action=process_cherry]").setDisabled(false);
                    }else{
                        fp.down("[action=process_cherry]").setDisabled(true);
                    }
                }
            }).read('get_master_dept');

        }
        if(choose == 'uploadmaster_banding'){
            fp.down('#pMasterBandingTabID').setDisabled(false);

            fp.down('#pEmployeeTabID').setDisabled(true);
            fp.down('#pMasterDepartmentTabID').setDisabled(true);
            fp.down('#pMasterGroupTabID').setDisabled(true);
            fp.down('#pMasterJobFamilyTabID').setDisabled(true);
            fp.down('#pMasterPositionTabID').setDisabled(true);
            fp.down('#pCareerTransitionTabID').setDisabled(true);

            fp.down('#tabID').setActiveTab(2);
            
            var gpb = me.getGridprocessbanding();
            var sgpb = gpb.getStore();
            me.tools.ajax({
                params: {
                        projectpt_id : choose_projectpt,
                        // ptpt_id : choose_ptpt,
                        upload_type   : choose},
                success: function (data, model) {
                    me.tools.wesea({data: data, model: model}, gpb).grid();
                    sgpb.reload();
                    fp.setLoading(false);
                    if(data.length > 0){
                        fp.down("[action=process_cherry]").setDisabled(false);
                    }else{
                        fp.down("[action=process_cherry]").setDisabled(true);
                    }
                }
            }).read('get_master_banding');


        }
        if(choose == 'uploadmaster_group'){
            fp.down('#pMasterGroupTabID').setDisabled(false);

            fp.down('#pEmployeeTabID').setDisabled(true);
            fp.down('#pMasterDepartmentTabID').setDisabled(true);
            fp.down('#pMasterBandingTabID').setDisabled(true);
            fp.down('#pMasterJobFamilyTabID').setDisabled(true);
            fp.down('#pMasterPositionTabID').setDisabled(true);
            fp.down('#pCareerTransitionTabID').setDisabled(true);

            fp.down('#tabID').setActiveTab(3);
            
            var gpg = me.getGridprocessgroup();
            var sgpg = gpg.getStore();
            me.tools.ajax({
                params: {
                        projectpt_id : choose_projectpt,
                        // ptpt_id : choose_ptpt,
                        upload_type   : choose},
                success: function (data, model) {
                    me.tools.wesea({data: data, model: model}, gpg).grid();
                    sgpg.reload();
                    fp.setLoading(false);
                    if(data.length > 0){
                        fp.down("[action=process_cherry]").setDisabled(false);
                    }else{
                        fp.down("[action=process_cherry]").setDisabled(true);
                    }
                }
            }).read('get_master_group');


        }
        if(choose == 'uploadmaster_jobfamily'){
            fp.down('#pMasterJobFamilyTabID').setDisabled(false);

            fp.down('#pEmployeeTabID').setDisabled(true);
            fp.down('#pMasterDepartmentTabID').setDisabled(true);
            fp.down('#pMasterBandingTabID').setDisabled(true);
            fp.down('#pMasterGroupTabID').setDisabled(true);
            fp.down('#pMasterPositionTabID').setDisabled(true);
            fp.down('#pCareerTransitionTabID').setDisabled(true);

            fp.down('#tabID').setActiveTab(4);
            
            var gpjf = me.getGridprocessjobfamily();
            var sgpjf = gpjf.getStore();
            me.tools.ajax({
                params: {
                        projectpt_id : choose_projectpt,
                        // ptpt_id : choose_ptpt,
                        upload_type   : choose},
                success: function (data, model) {
                    me.tools.wesea({data: data, model: model}, gpjf).grid();
                    sgpjf.reload();
                    fp.setLoading(false);
                    if(data.length > 0){
                        fp.down("[action=process_cherry]").setDisabled(false);
                    }else{
                        fp.down("[action=process_cherry]").setDisabled(true);
                    }
                }
            }).read('get_master_jobfamily');


        }
        if(choose == 'uploadmaster_position'){
            fp.down('#pMasterPositionTabID').setDisabled(false);

            fp.down('#pEmployeeTabID').setDisabled(true);
            fp.down('#pMasterDepartmentTabID').setDisabled(true);
            fp.down('#pMasterBandingTabID').setDisabled(true);
            fp.down('#pMasterGroupTabID').setDisabled(true);
            fp.down('#pMasterJobFamilyTabID').setDisabled(true);
            fp.down('#pCareerTransitionTabID').setDisabled(true);

            fp.down('#tabID').setActiveTab(5);
            
            var gpp = me.getGridprocessposition();
            var sgpp = gpp.getStore();
            me.tools.ajax({
                params: {
                        projectpt_id : choose_projectpt,
                        // ptpt_id : choose_ptpt,
                        upload_type   : choose},
                success: function (data, model) {
                    me.tools.wesea({data: data, model: model}, gpp).grid();
                    sgpp.reload();
                    fp.setLoading(false);
                    if(data.length > 0){
                        fp.down("[action=process_cherry]").setDisabled(false);
                    }else{
                        fp.down("[action=process_cherry]").setDisabled(true);
                    }
                }
            }).read('get_master_position');

        }
        if(choose == 'uploadmaster_employee'){
            fp.down('#pEmployeeTabID').setDisabled(false);

            fp.down('#pMasterDepartmentTabID').setDisabled(true);
            fp.down('#pMasterBandingTabID').setDisabled(true);
            fp.down('#pMasterGroupTabID').setDisabled(true);
            fp.down('#pMasterJobFamilyTabID').setDisabled(true);
            fp.down('#pMasterPositionTabID').setDisabled(true);
            fp.down('#pCareerTransitionTabID').setDisabled(true);

            fp.down('#tabID').setActiveTab(0);
            
            var gpe = me.getGridprocessemployee();
            var sgpe = gpe.getStore();
            me.tools.ajax({
                params: {
                        projectpt_id : choose_projectpt,
                        // ptpt_id : choose_ptpt,
                        upload_type   : choose},
                success: function (data, model) {
                    me.tools.wesea({data: data, model: model}, gpe).grid();
                    sgpe.reload();
                    // fp.setLoading(false);
                    fp.setLoading("Please wait, we are checking all the attributes...");
                    if(data.length > 0){
                        // cek kalo master lain sudah 
                        me.tools.ajax({
                            params: {
                                    projectpt_id : choose_projectpt,
                                    // ptpt_id : choose_ptpt,
                                    upload_type   : choose},
                            success: function (data, model) {
                                if(data.others[0][0].MSG == 'ada'){
                                    fp.down("[action=process_cherry]").setDisabled(true);
                                    me.tools.alert.info("Ada Master Department/Banding/Group/Position yang belum ditransfer, jika ingin transfer employee, silahkan transfer masternya terlebih dahulu");
                                    // return false;
                                }else{
                                    fp.down("[action=process_cherry]").setDisabled(false);
                                }
                            }
                        }).read('cek_master_employee_attr');

                        //input employee attr ke cherry
                        var json_data = JSON.stringify(data);
                        var need_input_cherry, need_input_cherry_shift, need_input_cherry_calendar;
                        //COMMON
                        me.tools.ajax({
                            params: {data:json_data},
                            success: function (data, model) {
                                need_input_cherry = data.others[0][0].need_input_cherry;

                                if(need_input_cherry){
                                    // fp.setLoading("Please wait, transfer Global Variable to Cherry...");
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
                                    // fp.setLoading("Please wait, transfer WorkShift to Cherry...");
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
                                    // fp.setLoading("Please wait, transfer Calendar to Cherry...");
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
                                    // fp.setLoading("Please wait, transfer PayrollGroup to Cherry...");
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
                                     // fp.setLoading("Please wait, transfer WorkLocation to Cherry...");
                                    me.worklocation_count = need_input_cherry_worklocation.length;

                                    $.each(need_input_cherry_worklocation, function (key, value) {
                                         me.saveWorkLocationDb(key,value);
                                    });
                                }
                            }

                        }).read('get_employee_worklocation');

                        // careertransition type
                        var careertransition_var = 'Promosi,Rotasi,Mutasi,Demosi,Perubahan Status,Mengundurkan Diri,Pensiun,Pemutusan Hubungan Kerja,Habis Kontrak,Meninggal Dunia,Lainnya,Testing';

                        var need_input_cherry_careertransition = '';
                        //DB_LOG
                        me.tools.ajax({
                            params: {   
                                        projectpt_id             : choose_projectpt,
                                        careertransition_var     : careertransition_var
                                    },
                            success: function (data, model) {
                                need_input_cherry_careertransition = data.others[0][0].need_input_cherry_careertransition;

                                if(need_input_cherry_careertransition){
                                                        // fp.setLoading("Please wait, transfer CareerTransitionType to Cherry...");
                                    me.careertransitiontype_count = need_input_cherry_careertransition.length;

                                    $.each(need_input_cherry_careertransition, function (key, value) {
                                        me.saveCareerTransitionDb(key,value);
                                    });
                                } 

                            }
                        }).read('check_careertransition');

                        // fp.down("[action=process_cherry]").setDisabled(false);
                    }else{
                        fp.down("[action=process_cherry]").setDisabled(true);
                    }
                    
                    // fp.setLoading(false);

                    setTimeout(function () {
                        me.updateGridEmployee();

                        //CHECK CODECHERRY UDAH KEISI SEMUA BELUM
                        me.tools.ajax({
                            params: {   
                                        projectpt_id : choose_projectpt,
                                        // ptpt_id : choose_ptpt,
                                        upload_type   : choose
                                    },
                            success: function (data, model) {
                                need_input_cherry_code = data.others[0][0];
                                if(need_input_cherry_code){
                                    me.tools.alert.info("Silahkan lengkapi data sebelum dikirim. "+need_input_cherry_code);
                                    fp.down("[action=process_cherry]").setDisabled(true);
                                }else{
                                    fp.down("[action=process_cherry]").setDisabled(false);
                                }

                            }
                        }).read('check_codecherry_employee');

                        setTimeout(function () {
                            fp.setLoading(false);
                        }, 2000);

                    }, 9000);

                }
            }).read('get_master_employee');

        }
        if(choose == 'uploadmaster_careertransition'){
            fp.down('#pCareerTransitionTabID').setDisabled(false);

            fp.down('#pEmployeeTabID').setDisabled(true);
            fp.down('#pMasterDepartmentTabID').setDisabled(true);
            fp.down('#pMasterBandingTabID').setDisabled(true);
            fp.down('#pMasterGroupTabID').setDisabled(true);
            fp.down('#pMasterJobFamilyTabID').setDisabled(true);
            fp.down('#pMasterPositionTabID').setDisabled(true);

            fp.down('#tabID').setActiveTab(6);
            
            var gpe = me.getGridprocesscareertransition();
            var sgpe = gpe.getStore();
            me.tools.ajax({
                params: {
                        projectpt_id : choose_projectpt,
                        // ptpt_id : choose_ptpt,
                        upload_type   : choose},
                success: function (data, model) {
                    me.tools.wesea({data: data, model: model}, gpe).grid();
                    sgpe.reload();
                    fp.setLoading(false);
                    if(data.length > 0){
                        // cek kalo master lain sudah 
                        me.tools.ajax({
                            params: {
                                    projectpt_id : choose_projectpt,
                                    // ptpt_id : choose_ptpt,
                                    upload_type   : choose},
                            success: function (data, model) {
                                if(data.others[0][0].MSG == 'ada'){
                                    fp.down("[action=process_cherry]").setDisabled(true);
                                    me.tools.alert.info("Ada Master Employee yang belum ditransfer, jika ingin transfer career transition, silahkan transfer employeenya terlebih dahulu");
                                    // return false;
                                }else{
                                    fp.down("[action=process_cherry]").setDisabled(false);
                                }
                            }
                        }).read('cek_master_employee');

                        fp.down("[action=process_cherry]").setDisabled(false);
                    }else{
                        fp.down("[action=process_cherry]").setDisabled(true);
                    }
                }
            }).read('get_master_careertransition');

        }

    },
    //PROCESS TO CHERRY
    processCherry: function () {
        var me, grid, store;
        me = this;
        var form = me.getPanel().down("form");
        var p = me.getPanel();
        var vs = form.getValues();
        var fp = me.getFormprocess();

        var choose_projectpt = '';

        var fn = '';
        var choose_type = vs["upload_type"];

        if(form.down('[name=projectpt_id]').getValue() == '' || form.down('[name=projectpt_id]').getValue() == null){
            me.tools.alert.warning("Select Project PT is required");
            return false;
        } else {
            if(form.down('[name=projectpt_id]').getValue() == '999'){
                me.tools.alert.warning("Project PT tidak boleh ALL");
                return false;
            }else{
                choose_projectpt = form.down("[name=projectpt_id]").getValue();
            }
        }

        Ext.Msg.confirm('Confirm', "Apakah data sudah benar? Apakah akan kirim ke cherry?", function (btn) {
                if (btn == 'yes') {
                    
                    fp.setLoading("Please wait...");

                    //company
                    var new_company;

                    me.tools.ajax({
                        params: {
                                choose_projectpt : choose_projectpt
                            },
                        success: function (data, model) {
                            var hasil = data.others[0][0].HASIL;
                            var action = data.others[0][0].ACTION_TO_CHERRY;
                            var ptname = data.others[0][0].PTNAME;
                            var ptpt_id = data.others[0][0].PTID;
                            
                            //KALO BELOM TERDAFTAR INSERT DULU
                            if(action == 'insert'){
                                //GET URL DAN USERNAME
                                me.tools.ajax({
                                    params: {},
                                    success: function (data, model) {
                                        
                                        var url = data.others[0][0].url;
                                        var username = data.others[0][0].username;
                                        var password = data.others[0][0].password;

                                        me.getToken(action,hasil,ptpt_id,ptname,url,username,password);
                                        new_company = 1;
                                    }
                                }).read('urlusername');
                            }else{
                                new_company = 0;
                            }
                        }
                    }).read('check_company');


                    //get data
                    var data ;

                    setTimeout(function () {

                    me.tools.ajax({
                        params: {
                                choose_type : choose_type,
                                projectpt_id : choose_projectpt
                            },
                        success: function (data, model) {
                            var lastprocessid = data.others[0][0].lastprocessid;

                            //delete data yg sebelumnya udah pernah di process to cherry, dan sekarang setelah di upload yg baru, data tersebut jadi tidak ada
                            if(choose_type != 'uploadmaster_employee' && choose_type != 'uploadmaster_careertransition'){
                                me.tools.ajax({
                                    params: {
                                            choose_type : choose_type,
                                            projectpt_id : choose_projectpt
                                        },
                                    success: function (data_removecherry, model) {
                                        
                                        if(data_removecherry){
                                            $.each(data_removecherry, function (key, value) {
                                                if(value){

                                                    
                                                    me.tools.ajax({
                                                        params: {
                                                                choose_type : choose_type,
                                                                projectpt_id : choose_projectpt,
                                                                lastprocessid : lastprocessid,
                                                                value : JSON.stringify(value),
                                                                remove_cherry: 1
                                                            },
                                                        success: function (data, model) {
                                                            var message = data.others[0][0].message;
                                                            var doIt = data.others[0][0].hasil.action;
                                                            var values = data.others[0][0].hasil.value;
                                                            var data_current = data.others[0][0].hasil.data_current;
                                                            var action_to_cherry = data.others[0][0].hasil.action;
                                                            var hasil_get = data.others[0][0].hasil.hasil_get;
                                                            var changeprofile = data.others[0][0].changeprofile;
                                                            var changepayroll = data.others[0][0].changepayroll;
                                                            console.log(message);
                                                            console.log(doIt);
                                                            console.log(values);
                                                            console.log(data_current);
                                                            console.log(action_to_cherry);
                                                            console.log(hasil_get);
                                                            console.log(changeprofile);
                                                            console.log(changepayroll);

                                                            var result_data = '';
                                                            var result_status = '';
                                                            var result_status_message = '';

                                                            if(message == 'berhasil'){
                                                                //YANG REMOVE BELOM DI CEK KE CHERRYNYA
                                                                var res = me.getTokenMaster(doIt,values,data_current,action_to_cherry,lastprocessid,hasil_get,changeprofile,changepayroll);
                                                                // me.updateDbLogRemove(values,data_current,action_to_cherry,lastprocessid,result_data,result_status,result_status_message,'','','','');
                                                            }

                                                        }
                                                    }).read('save_beforesubmit');
                                                }
                                            });
                                        }
                                    }
                                }).read('checkdata_removecherry');
                            }
                            //get data semua yang aktif
                            me.tools.ajax({
                                    params: {
                                            choose_type : choose_type,
                                            projectpt_id : choose_projectpt
                                        },
                                    success: function (data, model) {

                                        if(choose_type == 'uploadmaster_employee'){
                                            var json_data = JSON.stringify(data);
                                            var need_input_cherry, need_input_cherry_shift, need_input_cherry_calendar;
                                            //COMMON
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

                                            // careertransition type
                                            var careertransition_var = 'Promosi,Rotasi,Mutasi,Demosi,Perubahan Status,Mengundurkan Diri,Pensiun,Pemutusan Hubungan Kerja,Habis Kontrak,Meninggal Dunia,Lainnya';

                                            var need_input_cherry_careertransition = '';
                                            //DB_LOG
                                            me.tools.ajax({
                                                params: {   
                                                            projectpt_id             : choose_projectpt,
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
                                        }

                                        $.each(data, function (key, value) {

                                            me.tools.ajax({
                                                params: {
                                                        choose_type : choose_type,
                                                        projectpt_id : choose_projectpt,
                                                        lastprocessid : lastprocessid,
                                                        value : JSON.stringify(value),
                                                        remove_cherry: 0
                                                    },
                                                success: function (data, model) {
                                                    var message = data.others[0][0].message;
                                                    var doIt = data.others[0][0].hasil.action;
                                                    var values = data.others[0][0].hasil.value;
                                                    var data_current = data.others[0][0].hasil.data_current;
                                                    var action_to_cherry = data.others[0][0].hasil.action;
                                                    var hasil_get = data.others[0][0].hasil.hasil_get;
                                                    var changeprofile = data.others[0][0].changeprofile;
                                                    var changepayroll = data.others[0][0].changepayroll;
                                                    console.log(message);
                                                    console.log(doIt);
                                                    console.log(values);
                                                    console.log(data_current);
                                                    console.log(action_to_cherry);
                                                    console.log(hasil_get);
                                                    console.log(changeprofile);
                                                    console.log(changepayroll);

                                                    var result_data = '';
                                                    var result_status = '';
                                                    var result_status_message = '';

                                                    // if(message == 'berhasil'){
                                                        var res = me.getTokenMaster(doIt,values,data_current,action_to_cherry,lastprocessid,hasil_get,changeprofile,changepayroll);
                                                        // me.updateDbLog(values,data_current,action_to_cherry,lastprocessid,result_data,result_status,result_status_message,'','','','');
                                                    // }
                                                }
                                            }).read('save_beforesubmit');
                                        });
                                    }
                            }).read('get_data');

                        }
                    }).read('lastprocessid');

                    }, 5000);
                }
        });
    },

    //------------------------------------------------------------------------------------------------------------------
    //COMPANY API START

    //GET TOKEN CHERRY
    getToken: function(action,hasil,ptpt_id,ptname,url,username,password){
        var me = this;

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
                        if(action == 'insert'){
                            me.submitData(action,hasil,ptpt_id,ptname,url,username,password,token);
                        }
                    }
                    // return token;
                },
                error: function(XMLHttpRequest) {
                    alert('ERROR');
                }
        }); 
    },
    //GET SUBMIT CHERRY
    submitData: function(action,hasil,ptpt_id,ptname,url,username,password,token){
        var me = this;

        $.ajax({
                type: 'POST',
                url: url + me.urlServiceRequest,
                contentType: 'application/json',
                data: JSON.stringify(
                    {
                        "CommandName":"Submit",
                        "ModelCode":"Companies",
                        "UserName":username,
                        "Secure": false,
                        "Token":token,
                        "ParameterData": [],
                        "ModelData": {
                            "LabelCode": ptname,
                            "Name": ptname,
                            "Description": ptname
                        },
                        "ContainFiles": false
                    }
                ),
                success: function(response){
                    var json = JSON.parse(JSON.stringify(response));
                    var result_data = json.Data;
                    var result_data_code = json.Data.Code;
                    var result_status = json.MessageType;
                    var result_status_message = json.Message;
                    me.saveMaster(action,hasil,ptpt_id,ptname,result_data,result_data_code,result_status,result_status_message);
                    
                    //GET TAX STATUS
                    me.getTaxStatus(action,hasil,ptpt_id,ptname,url,username,password,token,result_data,result_data_code);

                    //Employment STATUS
                    me.saveEmpStatus(action,hasil,ptpt_id,ptname,url,username,password,token,result_data,result_data_code);
                },
                error: function(XMLHttpRequest) {
                    alert('ERROR');
                }
        }); 
    },
    //SAVE TO DB LOG
    saveMaster: function (action,hasil,ptpt_id,ptname,result_data,result_data_code,result_status,result_status_message) {
        var me, grid, store;
        me = this;
        var g = me.getGrid();
        // var sg = g.getStore();
        // var f = me.getFormdata();
        var jsonStringResult = JSON.stringify(result_data);

        //DB MASTER
        me.tools.ajax({
            params: {   
                        action                          : action,
                        hasil                           : hasil,
                        ptpt_id                         : ptpt_id,
                        ptname                          : ptname,
                        result_data                     : result_data,
                        result_data_code                : result_data_code,
                        result_status                   : result_status,
                        result_status_message           : result_status_message
                    },
            success: function (data, model) {
                if(data.others[0][0].MSG == 'berhasil'){
                    //DB LOG
                    me.tools.ajax({
                        params: {   
                                    action                          : action,
                                    hasil                           : hasil,
                                    ptpt_id                         : ptpt_id,
                                    ptname                          : ptname,
                                    result_data                     : result_data,
                                    jsonStringResult                : jsonStringResult,
                                    result_data_code                : result_data_code,
                                    result_status                   : result_status,
                                    result_status_message           : result_status_message,
                                    company_id                      : data.others[0][0].hasil
                                },
                        success: function (data, model) {
                            console.log(data);
                            // me.tools.alert.info("Success Create and Send to Cherry");
                            // sg.reload();
                            // f.up('window').close();
                        }
                    }).read('savelog');
                }else{
                    console.log('gagal save log company');
                    // me.tools.alert.warning("Failed Create Company and Send to Cherry");
                    // sg.reload();
                    // f.up('window').close();
                }
            }
        }).read('savemaster');

        // f.setLoading(false);

    },

    //GET TAX STATUS CHERRY
    getTaxStatus: function(action,hasil,ptpt_id,ptname,url,username,password,token,result_data,result_data_code){
        var me = this;

        $.ajax({
                type: 'POST',
                url: url + me.urlServiceRequest,
                contentType: 'application/json',
                data: JSON.stringify(
                    {
                        "CommandName": "GetList",
                        "ModelCode": "PayrollTaxStatus",
                        "UserName": username,
                        "Token": token,
                        "ParameterData": [
                            
                            {
                                "ParamKey": "Active",
                                "ParamValue": "True",
                                "Operator": "eq"
                            },
                            {
                                "ParamKey": "CompanyCode",
                                "ParamValue": result_data_code,
                                "Operator": "eq"
                            }

                        ]
                    }
                ),
                success: function(response){
                    var json = JSON.parse(JSON.stringify(response));
                    var result_data = json.Data;
                    me.saveMasterTaxStatus(result_data);

                },
                error: function(XMLHttpRequest) {
                    alert('ERROR');
                }
        }); 
    },
    saveMasterTaxStatus: function (result_data) {
        var me, grid, store;
        me = this;
        // var g = me.getGrid();
        // var sg = g.getStore();
        // var f = me.getFormdata();
        var jsonStringResult = JSON.stringify(result_data);

        //DB MASTER
        me.tools.ajax({
            params: {   
                        jsonStringResult                : jsonStringResult
                    },
            success: function (data, model) {
                console.log(data);
            }
        }).read('savetaxstatus');

    },

    //GET EMP STATUS CHERRY
    saveEmpStatus: function(action,hasil,ptpt_id,ptname,url,username,password,token,result_data,result_data_code){
        var me = this;

        var str_master = "permanent,contract,candidate,daily permanent,daily contract,temporary";

        var strArray_master = str_master.split(",");

        $.each(strArray_master, function (key, value) {
            $.ajax({
                    type: 'POST',
                    url: url + me.urlServiceRequest,
                    contentType: 'application/json',
                    data: JSON.stringify(
                        {
                            "CommandName":"Submit",
                            "ModelCode":"EmploymentStatus",
                            "UserName":username,
                            "Secure": false,
                            "Token":token,
                            "ParameterData": [],
                            "ModelData": {
                                "CompanyCode": result_data_code,
                                "Name": value,
                                "StatusId": "Approved"
                            },
                            "ContainFiles": false
                        }
                    ),
                    success: function(response){
                        var json = JSON.parse(JSON.stringify(response));
                        var result_data = json.Data;
                        var result_data_code = json.Data.Code;
                        var result_status = json.MessageType;
                        var result_status_message = json.Message;
                        me.saveMasterEmpStatus(result_data,result_data_code,result_status,result_status_message);

                    },
                    error: function(XMLHttpRequest) {
                        alert('ERROR');
                    }
            }); 

        });
    },
    saveMasterEmpStatus: function (result_data,result_data_code,result_status,result_status_message) {
        var me, grid, store;
        me = this;
        // var g = me.getGrid();
        // var sg = g.getStore();
        // var f = me.getFormdata();
        var jsonStringResult = JSON.stringify(result_data);

        //DB MASTER
        me.tools.ajax({
            params: {   
                        jsonStringResult                : jsonStringResult,
                        result_data_code                : result_data_code,
                        result_status                   : result_status,
                        result_status_message           : result_status_message,
                    },
            success: function (data, model) {
                console.log(data);
            }
        }).read('saveempstatus');

    },

    //COMMON CHERRY
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

                // fp.setLoading("Process Global Variable data to Cherry "+me.common_load+" of "+me.common_count);

                console.log('GlobalVariable --'+me.common_load+'----'+me.common_count);

                // if(me.common_load == me.common_count){
                //     me.updateGridEmployee();
                    
                //     // setTimeout(function () {
                //     //     fp.setLoading(false);
                //     // }, 3000);
                // }
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
                // fp.setLoading("Process WorkShift data to Cherry "+me.shift_load+" of "+me.shift_count);

                console.log('WorkShift --'+me.shift_load+'----'+me.shift_count);

                // if(me.shift_load == me.shift_count){
                //     me.updateGridEmployee();
                    
                //     setTimeout(function () {
                //         fp.setLoading(false);
                //     }, 3000);
                // }
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
                // fp.setLoading("Process Calendar data to Cherry "+me.calendar_load+" of "+me.calendar_count);

                console.log('Calendar --'+me.calendar_load+'----'+me.calendar_count);

                // if(me.calendar_load == me.calendar_count){
                //     me.updateGridEmployee();
                    
                //     setTimeout(function () {
                //         fp.setLoading(false);
                //     }, 3000);
                // }

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
                // fp.setLoading("Process PayrollGroup data to Cherry "+me.payrollgroup_load+" of "+me.payrollgroup_count);

                console.log('PayrollGroup --'+me.payrollgroup_load+'----'+me.payrollgroup_count);

                // if(me.payrollgroup_load == me.payrollgroup_count){
                //     me.updateGridEmployee();
                    
                //     setTimeout(function () {
                //         fp.setLoading(false);
                //     }, 3000);
                // }
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
                // fp.setLoading("Process WorkLocation data to Cherry "+me.worklocation_load+" of "+me.worklocation_count);

                console.log('WorkLocation --'+me.worklocation_load+'----'+me.worklocation_count);

                // if(me.worklocation_load == me.worklocation_count){
                //     me.updateGridEmployee();
                    
                //     setTimeout(function () {
                //         fp.setLoading(false);
                //     }, 3000);
                // }
            }
        }).read('update_worklocation_afterapi');

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
                // fp.setLoading("Process CareerTransitionType data to Cherry "+me.careertransitiontype_load+" of "+me.careertransitiontype_count);

                console.log('CareerTransitionType --'+me.careertransitiontype_load+'----'+me.careertransitiontype_count);

                // if(me.careertransitiontype_load == me.careertransitiontype_count){
                //     me.updateGridEmployee();
                    
                //     setTimeout(function () {
                //         fp.setLoading(false);
                //     }, 3000);
                // }
            }
        }).read('update_careertransition_afterapi');

    },

    //COMPANY API END
    //--------------------------------------------------------------------------------------------------------------------

    //---------------------------------------------------------------------------------------------------------------------
    //MASTER API START
    //GET TOKEN CHERRY
    getTokenMaster: function(val,value,data_current,action_to_cherry,lastprocessid,hasil_get,changeprofile,changepayroll){
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
                                if(val == 'insert'){
                                    me.submitDataMaster(token,value,data_current,action_to_cherry,lastprocessid,url,username,password);
                                }
                                if(val == 'update' || val == 'already up-to-date'){
                                    me.updateDataMaster(token,value,data_current,action_to_cherry,lastprocessid,hasil_get,changeprofile,changepayroll,url,username,password);
                                }
                                if(val == 'remove'){
                                    me.removeDataMaster(token,value,data_current,action_to_cherry,lastprocessid,hasil_get,changeprofile,changepayroll,url,username,password);
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
    submitDataMaster: function(token,value,data_current,action_to_cherry,lastprocessid,url,username,password){
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
                                        // "LocationCode": data_current.code.worklocation_code,
                                        "LocationCode": '',
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

        if(value == 'careertransition'){
            var json_api = JSON.stringify(
                                {
                                    "CommandName":"Submit",
                                    "ModelCode":"EmployeeCareerTransition",
                                    "UserName":username,
                                    "Secure": false,
                                    "Token":token,
                                    "ParameterData": [],
                                    "ModelData": {
                                        "Date": data_current.date,
                                        "Nik": data_current.nik_group,
                                        "EmployeeCode": data_current.employee_code,
                                        "TypeCode": data_current.careertransition_type_code,
                                        "CompanyCode": data_current.old_company_code,
                                        "OrganizationCode": data_current.old_dept_code,
                                        "JobTitleCode": data_current.old_banding_code,
                                        "JobLevelCode": data_current.old_group_code,
                                        "JobPositionCode": data_current.old_position_code,
                                        "NewCompanyCode": data_current.new_company_code,
                                        "NewOrganizationCode": data_current.new_dept_code,
                                        "NewJobLevelCode": data_current.new_group_code,
                                        "NewJobTitleCode": data_current.new_banding_code,
                                        "NewJobPositionCode": data_current.new_position_code,
                                        "NewEmploymentStatusCode": data_current.new_empstatus_code,
                                        "RequestedByCode": "ADM",
                                        "Notes": data_current.reason,
                                        "Subject": null,
                                        "StatusId": "Approved",
                                        //"ReasonCode": null,
                                        "EffectiveDate": data_current.effective_date,
                                        // "ExpiredDate": data_current.expired_date,
                                        "ExpectedExpiredDate": data_current.expired_date,
                                        "Active": true
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

                        }


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
    updateDataMaster: function(token,value,data_current,action_to_cherry,lastprocessid,hasil_get,changeprofile,changepayroll,url,username,password){
        var me = this;

        var code = hasil_get[0].code;
        var insertstamp = hasil_get[0].insertstamp;
        var updatestamp = hasil_get[0].updatestamp;

        var do_action;
        
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
            // var json_api = JSON.stringify(
            //                     {
            //                         "CommandName":"GetSingle",
            //                         "ModelCode":"EmployeeInformation",
            //                         "UserName":username,
            //                         "Token":token,
            //                         "ParameterData": [
            //                             {
            //                                 "ParamKey": "Code",
            //                                 "ParamValue": code,
            //                                 "Operator": "eq"
            //                             }
            //                         ]
            //                     }
            //                 );
        }

        if(value == 'careertransition'){
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
                                        "Date": data_current.date,
                                        "Nik": data_current.nik_group,
                                        "EmployeeCode": data_current.employee_code,
                                        "TypeCode": data_current.careertransition_type_code,
                                        "CompanyCode": data_current.old_company_code,
                                        "OrganizationCode": data_current.old_dept_code,
                                        "JobTitleCode": data_current.old_banding_code,
                                        "JobLevelCode": data_current.old_group_code,
                                        "JobPositionCode": data_current.old_position_code,
                                        "NewCompanyCode": data_current.new_company_code,
                                        "NewOrganizationCode": data_current.new_dept_code,
                                        "NewJobLevelCode": data_current.new_group_code,
                                        "NewJobTitleCode": data_current.new_banding_code,
                                        "NewJobPositionCode": data_current.new_position_code,
                                        "NewEmploymentStatusCode": data_current.new_empstatus_code,
                                        "RequestedByCode": "ADM",
                                        "Notes": data_current.reason,
                                        "Subject": null,
                                        "StatusId": "Approved",
                                        //"ReasonCode": null,
                                        "EffectiveDate": data_current.effective_date,
                                        // "ExpiredDate": data_current.expired_date,
                                        "ExpectedExpiredDate" : data_current.expired_date,
                                        "InsertStamp": insertstamp,
                                        "UpdateStamp": updatestamp,
                                        "Active": active
                                    },
                                    "ContainFiles": false
                                }
                            );
        }

        if(value != 'employee'){

            if(value == 'careertransition'){
                if(data_current.need_transfer == '1'){
                    do_action = '1';
                }else{
                    do_action = '-1';
                }
            }else{
                do_action = '1';
            }

            if(do_action == '1'){
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
                            // if(value == 'employee'){

                            //     var f = me.getPanel().down("form");
                            //     var choose_projectpt = f.down("[name=projectpt_id]").getValue();
                            //     var fp = me.getFormprocess();
                            //     var vs = f.getValues();
                            //     var choose = vs["upload_type"];

                            //     me.tools.ajax({
                            //         params: {
                            //             projectpt_id : choose_projectpt,
                            //             // ptpt_id : choose_ptpt,
                            //             upload_type   : choose},
                            //         success: function (data, model) {
                            //             if(value == 'employee'){
                            //                 var gr_trans = me.getGridprocessemployee();
                            //             }
                                        
                            //             var s_gr_trans = gr_trans.getStore();
                            //             me.tools.wesea({data: data, model: model}, gr_trans).grid();
                            //             s_gr_trans.reload();

                            //             fp.setLoading(false);
                                        
                            //         }
                            //     }).read('get_master_'+value);


                                // if(json.Data){
                                //     var result_data_code = json.Data.Code;
                                //     var result_data_insertstamp = json.Data.InsertStamp;
                                //     var result_data_updatestamp = json.Data.UpdateStamp;
                                //     var result_data_active = json.Data.Active;

                                // }   



                            // }else{
                                me.updateDbLog(value,data_current,action_to_cherry,lastprocessid,result_data,result_status,result_status_message,'','','','');
                            // }
                            // console.log(data);
                        },

                        error: function(XMLHttpRequest) {
                            console.log('ERROR');
                        }
                }); 

            }

        }else{
            if(changeprofile === "" && changepayroll === ""){
                var f = me.getPanel().down("form");
                            var choose_projectpt = f.down("[name=projectpt_id]").getValue();
                            var fp = me.getFormprocess();
                            var vs = f.getValues();
                            var choose = vs["upload_type"];

                            me.tools.ajax({
                                params: {
                                    projectpt_id : choose_projectpt,
                                    // ptpt_id : choose_ptpt,
                                    upload_type   : choose},
                                success: function (data, model) {
                                    if(value == 'employee'){
                                        var gr_trans = me.getGridprocessemployee();
                                    }
                                    
                                    var s_gr_trans = gr_trans.getStore();
                                    me.tools.wesea({data: data, model: model}, gr_trans).grid();
                                    s_gr_trans.reload();

                                    fp.setLoading(false);
                                    
                                }
                            }).read('get_master_'+value);
            }
        }
    },
    //GET UPDATE CHERRY
    removeDataMaster: function(token,value,data_current,action_to_cherry,lastprocessid,hasil_get,changeprofile,changepayroll,url,username,password){
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
                                    "CommandName":"Remove",
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
                                    "CommandName":"Remove",
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
                                    "CommandName":"Remove",
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
                                    "CommandName":"Remove",
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

                        me.updateDbLogRemove(value,data_current,action_to_cherry,lastprocessid,result_data,result_status,result_status_message,'','','','');
                        
                    },

                    error: function(XMLHttpRequest) {
                        console.log('ERROR');
                    }
            }); 

        // }
    },
    updateDbLog: function (value,data_current,action_to_cherry,lastprocessid,result_data,result_status,result_status_message,changeprofile,changepayroll,effectivedate,employeecode) {
        var me, grid, store;
        me = this;
        console.log(result_data);
        var f = me.getPanel().down("form");
        var choose_projectpt = f.down("[name=projectpt_id]").getValue();
        var fp = me.getFormprocess();
        var vs = f.getValues();
        var choose = vs["upload_type"];
        // var choose_ptpt = f.down("[name=ptpt_id]").getValue();
        // var choose_startdate = f.down("[name=start_date]").getValue();
        // var choose_enddate   = f.down("[name=end_date]").getValue();

        var fp = me.getFormprocess();
        // var process_api = fp.down("[name=process_api]").getValue();
        // var process_api_model = fp.down("[name=process_api_model]").getValue();

        var jsonString = JSON.stringify(data_current);
        var jsonStringResult = JSON.stringify(result_data);
        
        //DB_LOG
        me.tools.ajax({
            params: {   
                        action_to_cherry    : action_to_cherry,
                        lastprocessid       : lastprocessid,
                        value               : value,
                        // process_api         : process_api,
                        // process_api_model   : process_api_model,
                        projectpt_id        : choose_projectpt,
                        // ptpt_id             : choose_ptpt,
                        // start_date          : choose_startdate,
                        // end_date            : choose_enddate,
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
                if(data.others[0][0].MSG == 'berhasil' && action_to_cherry != 'remove'){
                    // fp.setLoading("Please wait...");
                    me.tools.ajax({
                        params: {
                            projectpt_id : choose_projectpt,
                            // ptpt_id : choose_ptpt,
                            upload_type   : choose},
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
                            if(value == 'careertransition'){
                                var gr_trans = me.getGridprocesscareertransition();
                            }
                            
                            var s_gr_trans = gr_trans.getStore();
                            me.tools.wesea({data: data, model: model}, gr_trans).grid();
                            s_gr_trans.reload();
                            
                            // fp.down("[action=process_cherry]").hide();
                            // fp.down("[action=download_log]").show();

                            // if(value != 'employee'){
                            //     fp.setLoading(false);
                            // }
                            fp.setLoading(false);
                            
                        }
                    }).read('get_master_'+value);
                }else{
                    console.log('Something error...');
                }
            }
        }).read('update_master');

    },
    updateDbLogRemove: function (value,data_current,action_to_cherry,lastprocessid,result_data,result_status,result_status_message,changeprofile,changepayroll,effectivedate,employeecode) {
        var me, grid, store;
        me = this;
        console.log(result_data);
        var f = me.getPanel().down("form");
        var choose_projectpt = f.down("[name=projectpt_id]").getValue();
        var fp = me.getFormprocess();
        var vs = f.getValues();
        var choose = vs["upload_type"];
        // var choose_ptpt = f.down("[name=ptpt_id]").getValue();
        // var choose_startdate = f.down("[name=start_date]").getValue();
        // var choose_enddate   = f.down("[name=end_date]").getValue();

        var fp = me.getFormprocess();
        // var process_api = fp.down("[name=process_api]").getValue();
        // var process_api_model = fp.down("[name=process_api_model]").getValue();

        var jsonString = JSON.stringify(data_current);
        var jsonStringResult = JSON.stringify(result_data);
        
        //DB_LOG
        me.tools.ajax({
            params: {   
                        action_to_cherry    : action_to_cherry,
                        lastprocessid       : lastprocessid,
                        value               : value,
                        // process_api         : process_api,
                        // process_api_model   : process_api_model,
                        projectpt_id        : choose_projectpt,
                        // ptpt_id             : choose_ptpt,
                        // start_date          : choose_startdate,
                        // end_date            : choose_enddate,
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
                console.log(data);
            }
        }).read('update_master_remove');

    },
    //MASTER API END
    //---------------------------------------------------------------------------------------------------------------------

     //UPDATE GRID AFTER GRID MUNCUL PERTAMA, JIKA ADA COMMON/CALENDAR/SHIFT/PAYROLLGROUP/CAREERTRANSITION/WORKLOCATION TYPE BARU
    updateGridEmployee: function () {
        var me, grid, store;
        me = this;
        var f = me.getPanel().down("form");
        var fp = me.getFormprocess();

        var choose_projectpt = f.down("[name=projectpt_id]").getValue();

        var vs = f.getValues();
        var choose = vs["upload_type"];

        var gpe = me.getGridprocessemployee();
        var sgpe = gpe.getStore();
        me.tools.ajax({
            params: {
                        projectpt_id : choose_projectpt,
                        // ptpt_id : choose_ptpt,
                        upload_type   : choose
                    },
            success: function (data, model) {
                me.tools.wesea({data: data, model: model}, gpe).grid();
                sgpe.reload();
                            
            }
        }).read('get_master_employee');


    },
});