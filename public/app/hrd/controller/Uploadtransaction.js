Ext.define('Hrd.controller.Uploadtransaction', {
    // extend: 'Hrd.template.ControllerForMaster',
    extend: 'Hrd.template.ControllerForMasterDirect',
    // extend: 'Hrd.library.box.controller.ControllerReport',
    // extend: 'Hrd.library.box.controller.Controller',
    urlToken: '/api/common/RequestToken',
    urlServiceRequest: '/api/common/ServiceRequest',
    alias: 'controller.uploadtransaction',
    controllerName: 'uploadtransaction',
    bindPrefixName: 'Uploadtransaction',
    dateNow: new Date(),
    uploadFotoKlik:0,
    ParamRender:null,
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
            selector: 'uploadtransactionformprocess'
        },
        {
            ref: 'gridprocess',
            selector: 'uploadtransactionprocessgrid'
        },
        {
            ref: 'gridprocesscutibesar',
            selector: 'uploadtransactionprocesscutibesargrid'
        },
        {
            ref: 'gridprocessmedicalclaim',
            selector: 'uploadtransactionprocessmedicalclaimgrid'
        },
        {
            ref: 'gridprocessovertime',
            selector: 'uploadtransactionprocessovertimegrid'
        },
        {
            ref: 'gridprocessuangmakan',
            selector: 'uploadtransactionprocessuangmakangrid'
        },
        {
            ref: 'gridprocessunpaidleave',
            selector: 'uploadtransactionprocessunpaidleavegrid'
        },
        {
            ref: 'gridprocesssaldocutibayar',
            selector: 'uploadtransactionprocesssaldocutibayargrid'
        },
        {
            ref: 'gridprocesspotongantransport',
            selector: 'uploadtransactionprocesspotongantransportgrid'
        },
        {
            ref: 'gridprocesssaldocutiminus',
            selector: 'uploadtransactionprocesssaldocutiminusgrid'
        },
        
    ],
    init: function(application) {
        this.callParent(arguments);
        var newEvs = {};
        var me = this;
        newEvs['uploadtransactionpanel #btnUpload'] = {
            click: function(el, val) {
                me.formUploadProcess();    
            }
        };
        newEvs['uploadtransactionpanel #file_name_upload'] = {
            change: function(fld, a) {

                me.formUploadFoto(fld, a, 'mode');
            }
        };
        newEvs['uploadtransactionpanel #view_file'] = {
            click: function(el, val) {
                me.viewFile();    
            }
        };
        newEvs['uploadtransactionpanel [name=upload_type]'] = {
            change: function() {
               me.selectType();
            }
        };
        newEvs['uploadtransactionpanel #btnViewTable'] = {
            click: function(el, val) {
                me.formViewTable();    
            }
        };
        newEvs['uploadtransactionformprocess'] = {
            afterrender: function () {
                me.formViewTableAfterRender();
            }
        };

        newEvs['uploadtransactionpanel #download_template_file'] = {
            click: function(el, val) {
                me.templateFile();    
            }
        };

        //process to cherry
        newEvs['uploadtransactionformprocess [action=process_cherry]'] = {
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
        
        var currentDate = new Date();
        var firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

        me.tools.ajax({
            params: {},
            success: function (data, model) {
                f.down("#view_file").hide();
                f.down("#file_name_upload").hide();
                me.tools.wesea(data.projectpt, f.down("[name=projectpt_id]")).comboBox(true);
                // me.tools.wesea(data.companycherry, f.down("[name=ptpt_id]")).comboBox(true);
                f.down("[name=projectpt_id]").setValue('');
                f.down('[name=projectpt_id]').setReadOnly(true);
                // f.down("[name=ptpt_id]").setValue('');
                // f.down('[name=ptpt_id]').setReadOnly(true);
                f.down('[name=start_date]').setReadOnly(true);
                f.down('[name=end_date]').setReadOnly(true);
                f.down('[name=payroll_month]').setReadOnly(true);
                f.down('[name=payroll_year]').setReadOnly(true);
                me.tools.alert.warning("Please Select Upload Transaction Data!");

                var year = new Date().getFullYear();
                f.down("[name=payroll_year]").setValue(year);

                var month = new Date().getMonth()+1;
                f.down("[name=payroll_month]").setValue(month);

                f.down("[name=start_date]").setValue(firstDay);
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
     setReadonlydata: function (form) {
        form.down("#file_name_upload").hide();
        form.down("[name=projectpt_id]").setValue('');
        form.down('[name=projectpt_id]').setReadOnly(true);
        // form.down("[name=ptpt_id]").setValue('');
        // form.down('[name=ptpt_id]').setReadOnly(true);
        form.down('[name=start_date]').setReadOnly(true);
        form.down('[name=end_date]').setReadOnly(true);
        form.down('[name=payroll_month]').setReadOnly(true);
        form.down('[name=payroll_year]').setReadOnly(true);
        form.down("#download_template_file").setDisabled(true);
    },
    unsetReadonlydata: function (form) {
        form.down("#file_name_upload").show();
        form.down('[name=projectpt_id]').setReadOnly(false);
        // form.down('[name=ptpt_id]').setReadOnly(false);
        form.down('[name=start_date]').setReadOnly(false);
        form.down('[name=end_date]').setReadOnly(false);
        form.down('[name=payroll_month]').setReadOnly(false);
        form.down('[name=payroll_year]').setReadOnly(false);
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
           window.open(document.URL+"app/hrd/uploads/cherry/dokumen/template_uploadtransaction/template_"+fileName+".xlsx");
      
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
        var start_date = '';
        var end_date = '';
        var choose_type = vs["upload_type"];

        if(form.down('[name=start_date]').getValue() == '' || form.down('[name=start_date]').getValue() == null){
            me.tools.alert.warning("Start date is required");
            return false;
        } else {
           start_date = form.down("[name=start_date]").getValue();
        }

        if(form.down('[name=end_date]').getValue() == '' || form.down('[name=end_date]').getValue() == null){
            me.tools.alert.warning("End date is required");
            return false;
        } else {
           end_date = form.down("[name=end_date]").getValue();
        }

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

        var choose_payroll_month = form.down("[name=payroll_month]").getValue();
        var choose_payroll_year   = form.down("[name=payroll_year]").getValue();

        p.setLoading('Please wait...');
        me.tools.ajax({
            params: {
                file_name: fn,
                start_date: start_date,
                end_date: end_date,
                choose_projectpt: choose_projectpt,
                // choose_ptpt: choose_ptpt,
                choose_type: choose_type,
                payroll_month: choose_payroll_month,
                payroll_year: choose_payroll_year
            },
            success: function (data, model) {
                console.log(data);
                p.setLoading(false);
                if (data['others'][0][0]['MSG'] == 'Success') {
                    me.tools.alert.info("Success");
                    me.instantWindow("FormProcess", 950, "View Table", "viewtable", "uploadtransactionformprocess");
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
            me.instantWindow("FormProcess", 950, "View Table", "viewtable", "uploadtransactionformprocess");
        }
        
    },
    formViewTableAfterRender: function () {
        var me, grid, store;
        me = this;
        var f = me.getPanel().down("form");

        var choose_projectpt = '';
        // var choose_ptpt = '';
        var choose_startdate = '';
        var choose_enddate = '';

        if(f.down('[name=projectpt_id]').getValue() == '' || f.down('[name=projectpt_id]').getValue() == null){
            me.tools.alert.warning("Select Project PT is required");
            return false;
        } else {
            choose_projectpt = f.down("[name=projectpt_id]").getValue();
        }

        // if(f.down('[name=ptpt_id]').getValue() == '' || f.down('[name=ptpt_id]').getValue() == null){
        //     me.tools.alert.warning("Select PT is required");
        //     return false;
        // } else {
        //     choose_ptpt = f.down("[name=ptpt_id]").getValue();
        // }

        if(f.down('[name=start_date]').getValue() == '' || f.down('[name=start_date]').getValue() == null){
            me.tools.alert.warning("Start date is required");
            return false;
        } else {
           choose_startdate = f.down("[name=start_date]").getValue();
        }

        if(f.down('[name=end_date]').getValue() == '' || f.down('[name=end_date]').getValue() == null){
            me.tools.alert.warning("End date is required");
            return false;
        } else {
           choose_enddate = f.down("[name=end_date]").getValue();
        }

        if(f.down('[name=payroll_month]').getValue() == '' || f.down('[name=payroll_month]').getValue() == null){
            me.tools.alert.warning("Payroll Month is required");
            return false;
        } else {
           payroll_month = f.down("[name=payroll_month]").getValue();
        }

        if(f.down('[name=payroll_year]').getValue() == '' || f.down('[name=payroll_year]').getValue() == null){
            me.tools.alert.warning("Payroll Year is required");
            return false;
        } else {
           payroll_year = f.down("[name=payroll_year]").getValue();
        }

        var fp = me.getFormprocess();

        var vs = f.getValues();
        var choose = vs["upload_type"];
        // fp.down("[action=download_log]").hide();
        fp.setLoading("Please wait...");
        
        if(choose == 'uploadtransaction_attendance'){
            fp.down('#pAttendanceTabID').setDisabled(false);
            fp.down('#tabID').setActiveTab(0);

            fp.down('#pOvertimeTabID').setDisabled(true);
            fp.down('#pUangMakanTabID').setDisabled(true);
            fp.down('#pMedicalClaimTabID').setDisabled(true);
            fp.down('#pUnpaidLeaveTabID').setDisabled(true);
            fp.down('#pCutiBesarTabID').setDisabled(true);
            fp.down('#pSaldoCutiBayarTabID').setDisabled(true);
            fp.down('#pPotonganTransportTabID').setDisabled(true);
            fp.down('#pSaldoCutiMinusTabID').setDisabled(true);

            var gp = me.getGridprocess();
            var sgp = gp.getStore();
            me.tools.ajax({
                params: {
                            projectpt_id    : choose_projectpt,
                            // ptpt_id         : choose_ptpt,
                            start_date      : choose_startdate,
                            end_date        : choose_enddate,
                            choose          : choose,
                            payroll_month   : payroll_month,
                            payroll_year    : payroll_year
                        },
                success: function (data, model) {
                    me.tools.wesea({data: data, model: model}, gp).grid();
                    sgp.reload();
                    // fp.down("[name=process_api]").setValue('attendance');
                    // fp.down("[name=process_api_model]").setValue('Attendance');
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
                                    me.tools.alert.info("Ada Master Employee yang belum ditransfer, jika ingin transfer transaksi ini, silahkan transfer employeenya terlebih dahulu");
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
            }).read('get_transaction_attendance');

        }
        if(choose == 'uploadtransaction_overtime'){
            fp.down('#pOvertimeTabID').setDisabled(false);
            fp.down('#tabID').setActiveTab(1);

            fp.down('#pAttendanceTabID').setDisabled(true);
            fp.down('#pUangMakanTabID').setDisabled(true);
            fp.down('#pMedicalClaimTabID').setDisabled(true);
            fp.down('#pUnpaidLeaveTabID').setDisabled(true);
            fp.down('#pCutiBesarTabID').setDisabled(true);
            fp.down('#pSaldoCutiBayarTabID').setDisabled(true);
            fp.down('#pPotonganTransportTabID').setDisabled(true);
            fp.down('#pSaldoCutiMinusTabID').setDisabled(true);

            
            var go = me.getGridprocessovertime();
            var sgo = go.getStore();
            me.tools.ajax({
                params: {
                            projectpt_id    : choose_projectpt,
                            // ptpt_id         : choose_ptpt,
                            start_date      : choose_startdate,
                            end_date        : choose_enddate,
                            choose          : choose,
                            payroll_month   : payroll_month,
                            payroll_year    : payroll_year
                        },
                success: function (data, model) {
                    me.tools.wesea({data: data, model: model}, go).grid();
                    sgo.reload();
                    // fp.down("[name=process_api]").setValue('overtime');
                    // fp.down("[name=process_api_model]").setValue('Overtime');
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
                                    me.tools.alert.info("Ada Master Employee yang belum ditransfer, jika ingin transfer transaksi ini, silahkan transfer employeenya terlebih dahulu");
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
            }).read('get_transaction_overtime');

        }

        if(choose == 'uploadtransaction_uangmakan'){
            fp.down('#pUangMakanTabID').setDisabled(false);
            fp.down('#tabID').setActiveTab(2);

            fp.down('#pAttendanceTabID').setDisabled(true);
            fp.down('#pOvertimeTabID').setDisabled(true);
            fp.down('#pMedicalClaimTabID').setDisabled(true);
            fp.down('#pUnpaidLeaveTabID').setDisabled(true);
            fp.down('#pCutiBesarTabID').setDisabled(true);
            fp.down('#pSaldoCutiBayarTabID').setDisabled(true);
            fp.down('#pPotonganTransportTabID').setDisabled(true);
            fp.down('#pSaldoCutiMinusTabID').setDisabled(true);

            
            var gu = me.getGridprocessuangmakan();
            var sgu = gu.getStore();
            me.tools.ajax({
                params: {
                            projectpt_id    : choose_projectpt,
                            // ptpt_id         : choose_ptpt,
                            start_date      : choose_startdate,
                            end_date        : choose_enddate,
                            choose          : choose,
                            payroll_month   : payroll_month,
                            payroll_year    : payroll_year
                        },
                success: function (data, model) {
                    me.tools.wesea({data: data, model: model}, gu).grid();
                    sgu.reload();
                    // fp.down("[name=process_api]").setValue('uangmakan');
                    // fp.down("[name=process_api_model]").setValue('UangMakan');
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
                                    me.tools.alert.info("Ada Master Employee yang belum ditransfer, jika ingin transfer transaksi ini, silahkan transfer employeenya terlebih dahulu");
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
            }).read('get_transaction_uangmakan');

        }

        if(choose == 'uploadtransaction_medicalclaim'){
            fp.down('#pMedicalClaimTabID').setDisabled(false);
            fp.down('#tabID').setActiveTab(3);

            fp.down('#pAttendanceTabID').setDisabled(true);
            fp.down('#pOvertimeTabID').setDisabled(true);
            fp.down('#pUangMakanTabID').setDisabled(true);
            fp.down('#pUnpaidLeaveTabID').setDisabled(true);
            fp.down('#pCutiBesarTabID').setDisabled(true);
            fp.down('#pSaldoCutiBayarTabID').setDisabled(true);
            fp.down('#pPotonganTransportTabID').setDisabled(true);
            fp.down('#pSaldoCutiMinusTabID').setDisabled(true);

            
            var gm = me.getGridprocessmedicalclaim();
            var sgm = gm.getStore();
            me.tools.ajax({
                params: {
                            projectpt_id    : choose_projectpt,
                            // ptpt_id         : choose_ptpt,
                            start_date      : choose_startdate,
                            end_date        : choose_enddate,
                            choose          : choose,
                            payroll_month   : payroll_month,
                            payroll_year    : payroll_year
                        },
                success: function (data, model) {
                    me.tools.wesea({data: data, model: model}, gm).grid();
                    sgm.reload();
                    // fp.down("[name=process_api]").setValue('medicalclaim');
                    // fp.down("[name=process_api_model]").setValue('MedicalClaim');
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
                                    me.tools.alert.info("Ada Master Employee yang belum ditransfer, jika ingin transfer transaksi ini, silahkan transfer employeenya terlebih dahulu");
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
            }).read('get_transaction_medicalclaim');

        }

        if(choose == 'uploadtransaction_unpaidleave'){
            fp.down('#pUnpaidLeaveTabID').setDisabled(false);
            fp.down('#tabID').setActiveTab(4);

            fp.down('#pAttendanceTabID').setDisabled(true);
            fp.down('#pOvertimeTabID').setDisabled(true);
            fp.down('#pUangMakanTabID').setDisabled(true);
            fp.down('#pMedicalClaimTabID').setDisabled(true);
            fp.down('#pCutiBesarTabID').setDisabled(true);
            fp.down('#pSaldoCutiBayarTabID').setDisabled(true);
            fp.down('#pPotonganTransportTabID').setDisabled(true);
            fp.down('#pSaldoCutiMinusTabID').setDisabled(true);

            
            var gul = me.getGridprocessunpaidleave();
            var sgul = gul.getStore();
            me.tools.ajax({
                params: {
                            projectpt_id    : choose_projectpt,
                            // ptpt_id         : choose_ptpt,
                            start_date      : choose_startdate,
                            end_date        : choose_enddate,
                            choose          : choose,
                            payroll_month   : payroll_month,
                            payroll_year    : payroll_year
                        },
                success: function (data, model) {
                    me.tools.wesea({data: data, model: model}, gul).grid();
                    sgul.reload();
                    // fp.down("[name=process_api]").setValue('unpaidleave');
                    // fp.down("[name=process_api_model]").setValue('UnpaidLeave');
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
                                    me.tools.alert.info("Ada Master Employee yang belum ditransfer, jika ingin transfer transaksi ini, silahkan transfer employeenya terlebih dahulu");
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
            }).read('get_transaction_unpaidleave');

        }

        if(choose == 'uploadtransaction_cutibesar'){
            fp.down('#pCutiBesarTabID').setDisabled(false);
            fp.down('#tabID').setActiveTab(5);

            fp.down('#pAttendanceTabID').setDisabled(true);
            fp.down('#pOvertimeTabID').setDisabled(true);
            fp.down('#pUangMakanTabID').setDisabled(true);
            fp.down('#pMedicalClaimTabID').setDisabled(true);
            fp.down('#pUnpaidLeaveTabID').setDisabled(true);
            fp.down('#pSaldoCutiBayarTabID').setDisabled(true);
            fp.down('#pPotonganTransportTabID').setDisabled(true);
            fp.down('#pSaldoCutiMinusTabID').setDisabled(true);

            
            var gcb = me.getGridprocesscutibesar();
            var sgcb = gcb.getStore();
            me.tools.ajax({
                params: {
                            projectpt_id    : choose_projectpt,
                            // ptpt_id         : choose_ptpt,
                            start_date      : choose_startdate,
                            end_date        : choose_enddate,
                            choose          : choose,
                            payroll_month   : payroll_month,
                            payroll_year    : payroll_year
                        },
                success: function (data, model) {
                    me.tools.wesea({data: data, model: model}, gcb).grid();
                    sgcb.reload();
                    // fp.down("[name=process_api]").setValue('cutibesar');
                    // fp.down("[name=process_api_model]").setValue('CutiBesar');
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
                                    me.tools.alert.info("Ada Master Employee yang belum ditransfer, jika ingin transfer transaksi ini, silahkan transfer employeenya terlebih dahulu");
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
            }).read('get_transaction_cutibesar');

        }

        if(choose == 'uploadtransaction_saldocutibayar'){
            fp.down('#pSaldoCutiBayarTabID').setDisabled(false);
            fp.down('#tabID').setActiveTab(6);

            fp.down('#pAttendanceTabID').setDisabled(true);
            fp.down('#pOvertimeTabID').setDisabled(true);
            fp.down('#pUangMakanTabID').setDisabled(true);
            fp.down('#pMedicalClaimTabID').setDisabled(true);
            fp.down('#pUnpaidLeaveTabID').setDisabled(true);
            fp.down('#pCutiBesarTabID').setDisabled(true);
            fp.down('#pPotonganTransportTabID').setDisabled(true);
            fp.down('#pSaldoCutiMinusTabID').setDisabled(true);

            
            var gsb = me.getGridprocesssaldocutibayar();
            var sgsb = gsb.getStore();
            me.tools.ajax({
                params: {
                            projectpt_id    : choose_projectpt,
                            // ptpt_id         : choose_ptpt,
                            start_date      : choose_startdate,
                            end_date        : choose_enddate,
                            choose          : choose,
                            payroll_month   : payroll_month,
                            payroll_year    : payroll_year
                        },
                success: function (data, model) {
                    me.tools.wesea({data: data, model: model}, gsb).grid();
                    sgsb.reload();
                    // fp.down("[name=process_api]").setValue('saldocutibayar');
                    // fp.down("[name=process_api_model]").setValue('SaldoCutiBayar');
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
                                    me.tools.alert.info("Ada Master Employee yang belum ditransfer, jika ingin transfer transaksi ini, silahkan transfer employeenya terlebih dahulu");
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
            }).read('get_transaction_saldocutibayar');

        }

        if(choose == 'uploadtransaction_potongantransport'){
            fp.down('#pPotonganTransportTabID').setDisabled(false);
            fp.down('#tabID').setActiveTab(7);

            fp.down('#pAttendanceTabID').setDisabled(true);
            fp.down('#pOvertimeTabID').setDisabled(true);
            fp.down('#pUangMakanTabID').setDisabled(true);
            fp.down('#pMedicalClaimTabID').setDisabled(true);
            fp.down('#pUnpaidLeaveTabID').setDisabled(true);
            fp.down('#pCutiBesarTabID').setDisabled(true);
            fp.down('#pSaldoCutiBayarTabID').setDisabled(true);
            fp.down('#pSaldoCutiMinusTabID').setDisabled(true);

            
            var gpt = me.getGridprocesspotongantransport();
            var sgpt = gpt.getStore();
            me.tools.ajax({
                params: {
                            projectpt_id    : choose_projectpt,
                            // ptpt_id         : choose_ptpt,
                            start_date      : choose_startdate,
                            end_date        : choose_enddate,
                            choose          : choose,
                            payroll_month   : payroll_month,
                            payroll_year    : payroll_year
                        },
                success: function (data, model) {
                    me.tools.wesea({data: data, model: model}, gpt).grid();
                    sgpt.reload();
                    // fp.down("[name=process_api]").setValue('potongantransport');
                    // fp.down("[name=process_api_model]").setValue('PotonganTransport');
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
                                    me.tools.alert.info("Ada Master Employee yang belum ditransfer, jika ingin transfer transaksi ini, silahkan transfer employeenya terlebih dahulu");
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
            }).read('get_transaction_potongantransport');

        }

        if(choose == 'uploadtransaction_saldocutiminus'){
            fp.down('#pSaldoCutiMinusTabID').setDisabled(false);
            fp.down('#tabID').setActiveTab(8);

            fp.down('#pAttendanceTabID').setDisabled(true);
            fp.down('#pOvertimeTabID').setDisabled(true);
            fp.down('#pUangMakanTabID').setDisabled(true);
            fp.down('#pMedicalClaimTabID').setDisabled(true);
            fp.down('#pUnpaidLeaveTabID').setDisabled(true);
            fp.down('#pCutiBesarTabID').setDisabled(true);
            fp.down('#pSaldoCutiBayarTabID').setDisabled(true);
            fp.down('#pPotonganTransportTabID').setDisabled(true);

            
            var gsm = me.getGridprocesssaldocutiminus();
            var sgsm = gsm.getStore();
            me.tools.ajax({
                params: {
                            projectpt_id    : choose_projectpt,
                            // ptpt_id         : choose_ptpt,
                            start_date      : choose_startdate,
                            end_date        : choose_enddate,
                            choose          : choose,
                            payroll_month   : payroll_month,
                            payroll_year    : payroll_year
                        },
                success: function (data, model) {
                    me.tools.wesea({data: data, model: model}, gsm).grid();
                    sgsm.reload();
                    // fp.down("[name=process_api]").setValue('saldocutibayar');
                    // fp.down("[name=process_api_model]").setValue('SaldoCutiBayar');
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
                                    me.tools.alert.info("Ada Master Employee yang belum ditransfer, jika ingin transfer transaksi ini, silahkan transfer employeenya terlebih dahulu");
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
            }).read('get_transaction_saldocutiminus');

        }

        //CHECK PERIODE PAYROLL DICHERRY
        me.cherryPayrollPeriode();
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
        var start_date = '';
        var end_date = '';
        var choose_type = vs["upload_type"];

        if(form.down('[name=start_date]').getValue() == '' || form.down('[name=start_date]').getValue() == null){
            me.tools.alert.warning("Start date is required");
            return false;
        } else {
           start_date = form.down("[name=start_date]").getValue();
        }

        if(form.down('[name=end_date]').getValue() == '' || form.down('[name=end_date]').getValue() == null){
            me.tools.alert.warning("End date is required");
            return false;
        } else {
           end_date = form.down("[name=end_date]").getValue();
        }

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

        var choose_payroll_month = form.down("[name=payroll_month]").getValue();
        var choose_payroll_year   = form.down("[name=payroll_year]").getValue();

        Ext.Msg.confirm('Confirm', "Apakah data sudah benar? Apakah akan kirim ke cherry?", function (btn) {
                if (btn == 'yes') {

                    fp.setLoading("Please wait...");

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
                            
                                me.tools.ajax({
                                    params: {
                                            choose_type         : choose_type,
                                            projectpt_id        : choose_projectpt,
                                            payroll_month       : choose_payroll_month,
                                            payroll_year        : choose_payroll_year
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
                                                                remove_cherry: 1,
                                                                start_date          : start_date,
                                                                end_date            : end_date,
                                                                payroll_month       : choose_payroll_month,
                                                                payroll_year        : choose_payroll_year
                                                            },
                                                        success: function (data, model) {
                                                            var message = data.others[0][0].message;
                                                            var doIt = data.others[0][0].hasil.action;
                                                            var values = data.others[0][0].hasil.value;
                                                            var data_current = data.others[0][0].hasil.data_current;
                                                            var action_to_cherry = data.others[0][0].hasil.action;
                                                            var hasil_get = data.others[0][0].hasil.hasil_get;
                                                            var hasil_get_all = data.others[0][0].hasil.hasil_get_all;
                                                            

                                                            var result_data = '';
                                                            var result_status = '';
                                                            var result_status_message = '';

                                                            if(message == 'berhasil'){
                                                                //YANG REMOVE BELOM DI CEK KE CHERRYNYA
                                                                var res = me.getTokenMaster(doIt,values,data_current,action_to_cherry,lastprocessid,hasil_get,hasil_get_all,'');
                                                                // me.updateDbLogRemove(values,data_current,action_to_cherry,lastprocessid,result_data,result_status,result_status_message,'','','','');
                                                            }

                                                        }
                                                    }).read('save_beforesubmit');
                                                }
                                            });
                                        }
                                    }
                                }).read('checkdata_removecherry');
                            
                            //get data semua yang aktif
                            me.tools.ajax({
                                    params: {
                                            choose_type : choose_type,
                                            projectpt_id : choose_projectpt,
                                            start_date          : start_date,
                                            end_date            : end_date,
                                            payroll_month       : choose_payroll_month,
                                            payroll_year        : choose_payroll_year
                                        },
                                    success: function (data, model) {

                                        //check productivity form sudah ada atau belum
                                        me.tools.ajax({
                                            params: {projectpt_id : choose_projectpt},
                                            success: function (data, model) {
                                                need_input_cherry = data.others[0][0].need_input_cherry;

                                                if(need_input_cherry){

                                                    $.each(need_input_cherry, function (key, value) {
                                                        me.savePformDb(key,value);
                                                    });

                                                } 
                                            }

                                        }).read('get_productivity_form');

                                        $.each(data, function (key, value) {

                                            me.tools.ajax({
                                                params: {
                                                        choose_type : choose_type,
                                                        projectpt_id : choose_projectpt,
                                                        lastprocessid : lastprocessid,
                                                        value : JSON.stringify(value),
                                                        remove_cherry: 0,
                                                        start_date          : start_date,
                                                        end_date            : end_date,
                                                        payroll_month       : choose_payroll_month,
                                                        payroll_year        : choose_payroll_year
                                                    },
                                                success: function (data, model) {
                                                    var message = data.others[0][0].message;
                                                    var doIt = data.others[0][0].hasil.action;
                                                    var values = data.others[0][0].hasil.value;
                                                    var data_current = data.others[0][0].hasil.data_current;
                                                    var action_to_cherry = data.others[0][0].hasil.action;
                                                    var hasil_get = data.others[0][0].hasil.hasil_get;
                                                    var hasil_get_all = data.others[0][0].hasil.hasil_get_all;
                                                    
                                                    var result_data = '';
                                                    var result_status = '';
                                                    var result_status_message = '';

                                                    if(message == 'berhasil'){
                                                        var res = me.getTokenMaster(doIt,values,data_current,action_to_cherry,lastprocessid,hasil_get,hasil_get_all,'');
                                                        // me.updateDbLog(values,data_current,action_to_cherry,lastprocessid,result_data,result_status,result_status_message,'','','','');
                                                    }
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

    //SAVE TO DB Pform BEFORE API
    savePformDb: function (key,value) {
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
                    result_id = data.others[0][0].hasil;
                    if(result_id){
                        console.log(result_id);
                        var res = me.getPformToken('submitData',key,value,result_id);
                        // me.updatePformDb('submitData',key,value,result_id,result_data,result_status,result_status_message);
                    }
                }else{
                    console.log('Something error...');
                }
            }
        }).read('save_productivity_form_beforeapi');

    },
    //GET TOKEN CHERRY
    getPformToken: function(action,key,value,result_id){
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
                                    me.submitPformData(token,'insert',key,value,result_id,url,username,password);
                                }
                            }
                            // return token;
                        },
                        error: function(XMLHttpRequest) {
                            alert('ERROR');
                        }
                }); 
            }
        }).read('urlusername');
        
    },
    //GET SUBMIT CHERRY
    submitPformData: function(token,action,key,value,result_id,url,username,password){
        var me = this;

        //DEFINITION
            var json_api = JSON.stringify(
                                {
                                    "CommandName":"Submit",
                                    "ModelCode":"EMProductivityFormSchemas",
                                    "UserName":username,
                                    "Secure": false,
                                    "Token":token,
                                    "ParameterData": [],
                                    "ModelData": {
                                        "CompanyCode": value.company_code,
                                        "FormKeyProperty": value.formkeyproperty,
                                        "Name": value.name,
                                        "DetailList":[
                                            {
                                                "Active" : true,
                                                "Description" : value.detail.attendance_desc,
                                                "FormulationCode": value.detail.attendance_formula,
                                            },
                                            {
                                                "Active" : true,
                                                "Description" : value.detail.overtime_desc,
                                                "FormulationCode":value.detail.overtime_formula,
                                            },
                                            {
                                                "Active" : true,
                                                "Description" : value.detail.uangmakanlembur_desc,
                                                "FormulationCode":value.detail.uangmakanlembur_formula,
                                            },
                                            {
                                                "Active" : true,
                                                "Description" : value.detail.medicalclaim_desc,
                                                "FormulationCode":value.detail.medicalclaim_formula,
                                            },
                                            {
                                                "Active" : true,
                                                "Description" : value.detail.unpaidleave_desc,
                                                "FormulationCode":value.detail.unpaidleave_formula,
                                            },
                                            {
                                                "Active" : true,
                                                "Description" : value.detail.cutibesar_desc,
                                                "FormulationCode":value.detail.cutibesar_formula,
                                            },
                                            {
                                                "Active" : true,
                                                "Description" : value.detail.saldocutidibayarkan_desc,
                                                "FormulationCode":value.detail.saldocutidibayarkan_formula,
                                            },
                                            {
                                                "Active" : true,
                                                "Description" : value.detail.potongantransport_desc,
                                                "FormulationCode":value.detail.potongantransport_formula,
                                            },
                                            {
                                                "Active" : true,
                                                "Description" : value.detail.saldocutiminus_desc,
                                                "FormulationCode":value.detail.saldocutiminus_formula,
                                            }
                                        ],
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

                    me.updatePformDb(action,key,value,result_id,result_data,result_status,result_status_message);
                },
                error: function(XMLHttpRequest) {
                    alert('ERROR');
                }
        }); 
    },
    //UPDATE TO DB COMMON BEFORE API
    updatePformDb: function (action,key,value,result_id,result_data,result_status,result_status_message) {
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
                        result_id           : JSON.stringify(result_id),
                        jsonString          : jsonString,
                        jsonStringResult    : jsonStringResult,
                        result_status       : result_status,
                        result_status_message : result_status_message
                    },
            success: function (data, model) {
                console.log(data);
            }
        }).read('update_productivity_form_afterapi');

    },

    //---------------------------------------------------------------------------------------------------------------------
    //MASTER API START
    //GET TOKEN CHERRY
    getTokenMaster: function(val,value,data_current,action_to_cherry,lastprocessid,hasil_get,hasil_get_all,changepayroll){
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
                                    me.updateDataMaster(token,value,data_current,action_to_cherry,lastprocessid,hasil_get,hasil_get_all,changepayroll,url,username,password);
                                }
                                if(val == 'remove'){
                                    me.removeDataMaster(token,value,data_current,action_to_cherry,lastprocessid,hasil_get,hasil_get_all,changepayroll,url,username,password);
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
    submitDataMaster: function(token,values,data_current,action_to_cherry,lastprocessid,url,username,password){
        var me = this;

        //DEFINITION
        var f = me.getPanel().down("form");
        var vs = f.getValues();
        var choose_startdate = f.down("[name=start_date]").getValue();
        var choose_enddate   = f.down("[name=end_date]").getValue();
        var choose_payroll_month = f.down("[name=payroll_month]").getValue();
        var choose_payroll_year   = f.down("[name=payroll_year]").getValue();

        var value;
        if(values == 'attendance'){
            value = data_current.total_attendance;
        }
        if(values == 'overtime'){
            value = data_current.total_overtime;
        }
        if(values == 'uangmakanlembur'){
            value = data_current.total_uang_makan;
        }
        if(values == 'medicalclaim'){
            value = data_current.total_medical_claim;
        }
        if(values == 'unpaidleave'){
            value = data_current.total_unpaid_leave;
        }
        if(values == 'cutibesar'){
            value = '1';
        }
        if(values == 'saldocutibayar'){
            value = data_current.total_saldocuti_bayar;
        }
        if(values == 'potongantransport'){
            value = data_current.total_potongan_transport;
        }
        if(values == 'saldocutiminus'){
            value = data_current.total_saldocuti_minus;
        }
        
        //enddate
        var d = new Date(choose_enddate),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        var end_date = year+'-'+month+'-'+day;

        //startdate
        var d = new Date(choose_startdate),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        var start_date = year+'-'+month+'-'+day;


        me.tools.ajax({
            params: {   companycode: data_current.company_code,
                        choose_payroll_month : choose_payroll_month,
                        choose_payroll_year : choose_payroll_year
                    },
            success: function (data, model) {
                    var cutoffdate = data.others[0][0].HASIL.cutoffdate;
                    var json_api = JSON.stringify(
                                        {
                                            "CommandName":"Submit",
                                            "ModelCode":"EMEmployeeProductivityForms",
                                            "UserName":username,
                                            "Secure": false,
                                            "Token":token,
                                            "ParameterData": [],
                                            "ModelData": {
                                                "CompanyCode": data_current.company_code,
                                                "Date": cutoffdate,
                                                "EmployeeCode": data_current.code.employee_code,
                                                "FormCode": data_current.code.productivity_form_code,
                                                //"Notes": "Process start date: "+start_date+" - end date:"+end_date,
                                                "Notes": "Payroll Process Bulan: "+choose_payroll_month+" Tahun: "+choose_payroll_year,
                                                "StatusId": "Approved",
                                                "DetailList":[
                                                    {
                                                        "Active" : true,
                                                        "ItemCode" : data_current.code.productivitydetail_form_code,
                                                        "Value": value,
                                                    }
                                                ],
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

                            me.updateDbLog(values,data_current,action_to_cherry,lastprocessid,result_data,result_status,result_status_message,'','','','');
                        },
                        error: function(XMLHttpRequest) {
                            alert('ERROR');
                        }
                }); 

                    }
        }).read('getcherryCutOffDate');
    },
    //GET UPDATE CHERRY
    updateDataMaster: function(token,values,data_current,action_to_cherry,lastprocessid,hasil_get,hasil_get_all,changepayroll,url,username,password){
        var me = this;
        
        var code = hasil_get_all[0].code;
        var insertstamp = hasil_get_all[0].insertstamp;
        var updatestamp = hasil_get_all[0].updatestamp;

        var code_detail = '';
        console.log(hasil_get);
        if(hasil_get[0]){
            code_detail = hasil_get[0].code_detail;
        }

        if(hasil_get_all[0].active == '1'){
            var active = 'true';
        }else{
            var active = 'true';
        }

        //DEFINITION
        var f = me.getPanel().down("form");
        var vs = f.getValues();
        var choose_startdate = f.down("[name=start_date]").getValue();
        var choose_enddate   = f.down("[name=end_date]").getValue();
        var choose_payroll_month = f.down("[name=payroll_month]").getValue();
        var choose_payroll_year   = f.down("[name=payroll_year]").getValue();
        var choose = vs["transfer_type"];
        var value;
        if(values == 'attendance'){
            value = data_current.total_attendance;
        }
        if(values == 'overtime'){
            value = data_current.total_overtime;
        }
        if(values == 'uangmakanlembur'){
            value = data_current.total_uang_makan;
        }
        if(values == 'medicalclaim'){
            value = data_current.total_medical_claim;
        }
        if(values == 'unpaidleave'){
            value = data_current.total_unpaid_leave;
        }
        if(values == 'cutibesar'){
            value = '1';
        }
        if(values == 'saldocutibayar'){
            value = data_current.total_saldocuti_bayar;
        }
        if(values == 'potongantransport'){
            value = data_current.total_potongan_transport;
        }
        if(values == 'saldocutiminus'){
            value = data_current.total_saldocuti_minus;
        }

        //enddate
        var d = new Date(choose_enddate),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        var end_date = year+'-'+month+'-'+day;

        //startdate
        var d = new Date(choose_startdate),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        var start_date = year+'-'+month+'-'+day;

        me.tools.ajax({
            params: {   companycode: data_current.company_code,
                        choose_payroll_month : choose_payroll_month,
                        choose_payroll_year : choose_payroll_year
                    },
            success: function (data, model) {
                    var cutoffdate = data.others[0][0].HASIL.cutoffdate;
                    if(code_detail){

                        var json_api = JSON.stringify(
                                            {
                                                "CommandName":"Submit",
                                                "ModelCode":"EMEmployeeProductivityForms",
                                                "UserName":username,
                                                "Secure": false,
                                                "Token":token,
                                                "ParameterData": [],
                                                "ModelData": {
                                                    "Code": code,  
                                                    "CompanyCode": data_current.company_code,
                                                    // "Date": end_date,
                                                    "Date": cutoffdate,
                                                    "EmployeeCode": data_current.code.employee_code,
                                                    "FormCode": data_current.code.productivity_form_code,
                                                    // "Notes": "Process start date: "+start_date+" - end date:"+end_date,
                                                    "Notes": "Payroll Process Bulan: "+choose_payroll_month+" Tahun: "+choose_payroll_year,
                                                    "StatusId": "Approved",
                                                    "DetailList":[
                                                        {
                                                            "Code": code_detail,
                                                            "Active" : true,
                                                            "ItemCode" : data_current.code.productivitydetail_form_code,
                                                            "Value": value,
                                                            "StatusId": "Approved"
                                                        }
                                                    ],
                                                    "InsertStamp": insertstamp,
                                                    "UpdateStamp": updatestamp,
                                                    "Active": active
                                                },
                                                "ContainFiles": false
                                            }
                                        );

                    }else{

                        var json_api = JSON.stringify(
                                            {
                                                "CommandName":"Submit",
                                                "ModelCode":"EMEmployeeProductivityForms",
                                                "UserName":username,
                                                "Secure": false,
                                                "Token":token,
                                                "ParameterData": [],
                                                "ModelData": {
                                                    "Code": code,  
                                                    "CompanyCode": data_current.company_code,
                                                    // "Date": end_date,
                                                    "Date": cutoffdate,
                                                    "EmployeeCode": data_current.code.employee_code,
                                                    "FormCode": data_current.code.productivity_form_code,
                                                    // "Notes": "Process start date: "+start_date+" - end date:"+end_date,
                                                    "Notes": "Payroll Process Bulan: "+choose_payroll_month+" Tahun: "+choose_payroll_year,
                                                    "StatusId": "Approved",
                                                    "DetailList":[
                                                        {
                                                            "Active" : true,
                                                            "ItemCode" : data_current.code.productivitydetail_form_code,
                                                            "Value": value,
                                                        }
                                                    ],
                                                    "InsertStamp": insertstamp,
                                                    "UpdateStamp": updatestamp,
                                                    "Active": active
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

                                me.updateDbLog(values,data_current,action_to_cherry,lastprocessid,result_data,result_status,result_status_message,'','','','');

                            },
                            error: function(XMLHttpRequest) {
                                alert('ERROR');
                            }
                    }); 

                }
        }).read('getcherryCutOffDate');

    },
    //GET UPDATE CHERRY
    removeDataMaster: function(token,values,data_current,action_to_cherry,lastprocessid,hasil_get,hasil_get_all,changepayroll,url,username,password){
        var me = this;

        var me = this;
        
        var code = hasil_get_all[0].code;
        var insertstamp = hasil_get_all[0].insertstamp;
        var updatestamp = hasil_get_all[0].updatestamp;

        var code_detail = '';
        console.log(hasil_get);
        if(hasil_get[0]){
            code_detail = hasil_get[0].code_detail;
        }

        if(hasil_get_all[0].active == '1'){
            var active = 'true';
        }else{
            var active = 'true';
        }

        //DEFINITION
        var f = me.getPanel().down("form");
        var vs = f.getValues();
        var choose_startdate = f.down("[name=start_date]").getValue();
        var choose_enddate   = f.down("[name=end_date]").getValue();
        var choose_payroll_month = f.down("[name=payroll_month]").getValue();
        var choose_payroll_year   = f.down("[name=payroll_year]").getValue();
        var choose = vs["transfer_type"];
        var value;


        //enddate
        var d = new Date(choose_enddate),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        var end_date = year+'-'+month+'-'+day;

        //startdate
        var d = new Date(choose_startdate),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        var start_date = year+'-'+month+'-'+day;

        me.tools.ajax({
            params: {   companycode: data_current.company_code,
                        choose_payroll_month : choose_payroll_month,
                        choose_payroll_year : choose_payroll_year
                    },
            success: function (data, model) {
                    var cutoffdate = data.others[0][0].HASIL.cutoffdate;
                    

                        var json_api = JSON.stringify(
                                            {
                                                "CommandName":"Submit",
                                                "ModelCode":"EMEmployeeProductivityForms",
                                                "UserName":username,
                                                "Secure": false,
                                                "Token":token,
                                                "ParameterData": [],
                                                "ModelData": {
                                                    "Code": code,  
                                                    "CompanyCode": data_current.company_code,
                                                    // "Date": end_date,
                                                    "Date": cutoffdate,
                                                    "EmployeeCode": data_current.code.employee_code,
                                                    "FormCode": data_current.code.productivity_form_code,
                                                    // "Notes": "Process start date: "+start_date+" - end date:"+end_date,
                                                    "Notes": "Payroll Process Bulan: "+choose_payroll_month+" Tahun: "+choose_payroll_year,
                                                    "StatusId": "Approved",
                                                    "DetailList":[
                                                        {
                                                            "Code": code_detail,
                                                            "Active" : true,
                                                            "ItemCode" : data_current.code.productivitydetail_form_code,
                                                            "Value": 0,
                                                            "StatusId": "Approved"
                                                        }
                                                    ],
                                                    "InsertStamp": insertstamp,
                                                    "UpdateStamp": updatestamp,
                                                    "Active": active
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

                                me.updateDbLogRemove(values,data_current,action_to_cherry,lastprocessid,result_data,result_status,result_status_message,'','','','');

                            },
                            error: function(XMLHttpRequest) {
                                alert('ERROR');
                            }
                    }); 

                }
        }).read('getcherryCutOffDate');

    },
   
    updateDbLog: function (value,data_current,action_to_cherry,lastprocessid,result_data,result_status,result_status_message) {
        var me, grid, store;
        me = this;
        console.log(result_data);
        var f = me.getPanel().down("form");
        var vs = f.getValues();
        var choose_type = vs["upload_type"];
        var choose_projectpt = f.down("[name=projectpt_id]").getValue();
        // var choose_ptpt = f.down("[name=ptpt_id]").getValue();
        var choose_startdate = f.down("[name=start_date]").getValue();
        var choose_enddate   = f.down("[name=end_date]").getValue();
        var choose_payroll_month = f.down("[name=payroll_month]").getValue();
        var choose_payroll_year   = f.down("[name=payroll_year]").getValue();

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
                        start_date          : choose_startdate,
                        end_date            : choose_enddate,
                        payroll_month       : choose_payroll_month,
                        payroll_year        : choose_payroll_year,
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
                                    choose_type         : choose_type,
                                    projectpt_id        : choose_projectpt,
                                    start_date          : choose_startdate,
                                    end_date            : choose_enddate,
                                    payroll_month       : choose_payroll_month,
                                    payroll_year        : choose_payroll_year
                                },
                        success: function (data, model) {
                            if(value == 'attendance'){
                                var gr_trans = me.getGridprocess();
                            }
                            if(value == 'cutibesar'){
                                var gr_trans = me.getGridprocesscutibesar();
                            }
                            if(value == 'medicalclaim'){
                                var gr_trans = me.getGridprocessmedicalclaim();
                            }
                            if(value == 'overtime'){
                                var gr_trans = me.getGridprocessovertime();
                            }
                            if(value == 'uangmakan'){
                                var gr_trans = me.getGridprocessuangmakan();
                            }
                            if(value == 'unpaidleave'){
                                var gr_trans = me.getGridprocessunpaidleave();
                            }
                            if(value == 'saldocutibayar'){
                                var gr_trans = me.getGridprocesssaldocutibayar();
                            }
                            if(value == 'potongantransport'){
                                var gr_trans = me.getGridprocesspotongantransport();
                            }
                            if(value == 'saldocutiminus'){
                                var gr_trans = me.getGridprocesssaldocutiminus();
                            }
                            
                            var s_gr_trans = gr_trans.getStore();
                            me.tools.wesea({data: data, model: model}, gr_trans).grid();
                            s_gr_trans.reload();
                            
                            fp.setLoading(false);

                            // me.getLastActivityPtId();
                            
                        }
                    }).read('get_data');
                }else{
                    alert('Something error...');
                }
            }
        }).read('update_transaction');

    },
    updateDbLogRemove: function (value,data_current,action_to_cherry,lastprocessid,result_data,result_status,result_status_message,changeprofile,changepayroll,effectivedate,employeecode) {
        var me, grid, store;
        me = this;
        console.log(result_data);
        var f = me.getPanel().down("form");
        var fp = me.getFormprocess();
        var vs = f.getValues();
        var choose_type = vs["upload_type"];
        var choose_projectpt = f.down("[name=projectpt_id]").getValue();
        // var choose_ptpt = f.down("[name=ptpt_id]").getValue();
        var choose_startdate = f.down("[name=start_date]").getValue();
        var choose_enddate   = f.down("[name=end_date]").getValue();
        var choose_payroll_month = f.down("[name=payroll_month]").getValue();
        var choose_payroll_year   = f.down("[name=payroll_year]").getValue();

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
                        start_date          : choose_startdate,
                        end_date            : choose_enddate,
                        payroll_month       : choose_payroll_month,
                        payroll_year        : choose_payroll_year,
                        jsonString          : jsonString,
                        jsonStringResult    : jsonStringResult,
                        result_status       : result_status,
                        result_status_message: result_status_message
                    },
            success: function (data, model) {
                console.log(data);
            }
        }).read('update_transaction_remove');

    },
    //MASTER API END
    //---------------------------------------------------------------------------------------------------------------------

    //ambil periode payroll di cherry
    cherryPayrollPeriode: function () {
        var me, grid, store;
        me = this;
        var f                       = me.getPanel().down("form");
        var choose_projectpt        = f.down("[name=projectpt_id]").getValue();
        var choose_payroll_month    = f.down("[name=payroll_month]").getValue();
        var choose_payroll_year     = f.down("[name=payroll_year]").getValue();

        var fp = me.getFormprocess();
        fp.setLoading("Please wait...");

        me.tools.ajax({
            params: {projectpt_id: choose_projectpt},
            success: function (data, model) {

                var companycode     = data.others[0][0].HASIL.company_code;

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
                                        //DEFINITION
                                            var json_api = JSON.stringify(
                                                            {
                                                                "CommandName":"GetSingle",
                                                                "ModelCode":"PayrollPeriods",
                                                                "UserName":username,
                                                                "Token":token,
                                                                "ParameterData":[
                                                                    {
                                                                        "ParamKey": "CompanyCode",
                                                                        "ParamValue": companycode,
                                                                        "Operator": "eq"
                                                                    },
                                                                    {
                                                                        "ParamKey": "Month",
                                                                        "ParamValue": choose_payroll_month,
                                                                        "Operator": "eq"
                                                                    },
                                                                    {
                                                                        "ParamKey": "Year",
                                                                        "ParamValue": choose_payroll_year,
                                                                        "Operator": "eq"
                                                                    }
                                                                ]
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
                                                    
                                                    if(result_data.Code){
                                                        var jsonStringResult = JSON.stringify(result_data);

                                                        me.tools.ajax({
                                                            params: {   
                                                                        jsonStringResult    : jsonStringResult
                                                                    },
                                                            success: function (data, model) {

                                                                fp.setLoading(false);
                                                                fp.down("[action=process_cherry]").show();
                                                            }
                                                        }).read('cherryCutOffDate');
                                                    }else{
                                                        fp.setLoading(false);
                                                        me.tools.alert.info("Periode cut off date Bulan "+choose_payroll_month+" Tahun "+choose_payroll_year+" di cherry belum di setting, Silahkan hubungi PIC Cherry");
                                                        fp.down("[action=process_cherry]").hide();
                                                    }

                                                },
                                                error: function(XMLHttpRequest) {
                                                    alert('ERROR');
                                                }
                                        }); 
                                    }
                                    // return token;
                                },
                                error: function(XMLHttpRequest) {
                                    alert('ERROR');
                                }
                        }); 
                    }
                }).read('urlusername');
                
            }
        }).read('companycodecherry');
    },
});