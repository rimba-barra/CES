Ext.define('Cashier.controller.Reporttrackingvoucher', {
    extend: 'Cashier.library.template.controller.Controllergl',
    alias: 'controller.Reporttrackingvoucher',
    requires: [
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Ptprojectcombobox',
        'Cashier.library.template.combobox.Projectcombobox',
        'Cashier.library.template.combobox.Departmentcombobox',
        'Cashier.library.template.combobox.Vouchermakercombobox',
    ],
    views: [
        'reporttrackingvoucher.Panel',
        'reporttrackingvoucher.FormData'
    ],
    stores: [
        'Project',
        'Ptbyuser',
        'Ptforcashbon',
        'Pt',
        'Department',
        'Vouchermaker'
    ],
    models: [
        'Project',
        'Pt',
        'Ptforcashbon',
        'Vouchermaker'
    ],
    refs: [{
        ref: 'formdata',
        selector: 'reporttrackingvoucherformdata'
    }, {
        ref: 'paneldata',
        selector: 'reporttrackingvoucherpanel'
    }, ],
    controllerName: 'reporttrackingvoucher',
    fieldName: '',
    bindPrefixName: 'Reporttrackingvoucher',
    reportfile: 'Reporttrackingvoucher',
    urlprocess: 'cashier/reporttrackingvoucher/read',
    fromdate: null,
    untildate: null,
    stimulsoft: "resources/stimulsoft/index.php?stimulsoft_client_key=ViewerFx&stimulsoft_report_key=",
    paramsStr: null,
    win: null,
    params: null,
    dateNow: new Date(),
    html: null,
    winId: 'myReportWindow',
    checksub: null,
    report: null,
    statusprocess: null,
    project_name: null,
    pt_name: null,
    userid: null,
    userprint: null,
    urlrequest: null,
    senddata: null,
    info: null,
    form: null,
    cluster: null,
    getMe: function() {
        var me = this;
        return _Apps.getController(me.bindPrefixName);
    },
    init: function(application) {
        var me = this;
        this.control({
            'reporttrackingvoucherpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function(panel) {
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setHeight(250);
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setWidth(800);
                    me.panelAfterRender();
                }
            },
            'reporttrackingvoucherformdata': {
                afterrender: function(panel) {
                    this.formDataAfterRenderCustome();
                }
            },
            'reporttrackingvoucherformdata [name=project_id]': {
                select: function(el) {
                    this.loadPtbyProject();
                }

            },
            'reporttrackingvoucherformdata [name=pt_id]': {
                change: function(el) {
                    this.loadDeptbyPt();
                    this.loadVoucherMakerbyPt();
                }

            },
            'reporttrackingvoucherformdata button[action=submit]': {
                click: function() {
                    // me.Processdata();
                    me.ProcessReport();

                }
            },
        });
    },
    ProcessReport: function() {
        var me = this;
        var f = me.getFormdata();
        var winId = 'myReportWindow';
        me.instantWindow('Panel', 800, 'Result ', 'state-report', winId, 'masterreport');
        var paramsStr = me.generateReportParams(me.getFormdata().getForm().getFieldValues());
        var win = desktop.getWindow(winId);
        // return;
        if (win) {
            var params = me.getFormdata().getForm().getFieldValues();
            var dateNow = new Date();

            var reportFile = me.reportfile;
            projectname = f.down("[name=project_id]").valueModels[0];
            ptname = f.down("[name=pt_id]").valueModels[0];

            params["project_id"] = f.down("[name=project_id]").getValue();
            params["pt_id"] = f.down("[name=pt_id]").getValue();

            params["project_name"] = projectname.data.projectname;
            params["pt_name"] = ptname.data.ptname;

            params["department_id"] = f.down("[name=department_id]").getValue();
            params["addby"] = f.down("[name=addby]").getValue();

            params["datetype"] = f.down("[name=datetype]").getValue();
            params["from_date"] = me.formatDate(f.down("[name=from_date]").getValue());
            params["until_date"] = me.formatDate(f.down("[name=until_date]").getValue());
            
            params["condition"] = f.down("[name=condition]").getValue();
            params["is_tkb"] = f.down("[name=is_tkb]").getValue();

            if(params["is_tkb"]){
                params["is_tkb"] = '1';
            }else{
                params["is_tkb"] = '0';
            }

            console.log(params);

            params["report_alias"] = 'Report_Tracking_Voucher-' + me.getValueCombobox(me, "pt_id").value + '_' + params["from_date"] + '_' + params["until_date"];

            // console.log(params);return;

            var html = me.ReportviewerV2(params, reportFile);
            win.down("#MyReportPanel").body.setHTML(html);
            $("#Reportform").submit();
        }
    },
    panelAfterRender: function() {
        var me = this.getMe();
        Ext.Ajax.request({
            url: 'cashier/Reporttrackingvoucher/read',
            success: function(response) {
                var info = Ext.JSON.decode(response.responseText);
                me.project_name = info.project_name;
                me.pt_name = info.pt_name;
                me.userprint = info.userprint;
                me.userid = info.userid;
            },
        });
    },
    formDataAfterRenderCustome: function() {
        var me, f;
        me = this.getMe();
        f = me.getFormdata();
        me.setProjectFormData();
        f.down("[name=department_id]").getStore().load();
        this.loadPtbyProject();
        this.loadDeptbyPt();
        this.loadVoucherMakerbyPt();
        me.setVoucherMakerFormData();
    },
    setProjectFormData: function () {
        var me, f, storeproject
        me = this.getMe();
        f = me.getFormdata();
        storeproject = me.getStore('Project');
        storeproject.load({
            params: {
                "hideparam": 'projectpt',
                "project_id": apps.project,
                "start": 0,
                "limit": 1000000,
            },
            callback: function(recordscode, operationcode, successcode) {
                if (successcode) {
                    if (recordscode[0]) {
                        var firstdatacode = recordscode[0]['data'];
                        f.down("[name=project_id]").setValue(parseInt(apps.project));

                    }
                }
            }

        });        
    },
    setVoucherMakerFormData: function () {
        var me, storevouchermaker;
        me = this.getMe();
        storevouchermaker = me.getStore("Vouchermaker");
        storevouchermaker.proxy.extraParams = {
            "hideparam": 'getvouchermaker',
            "project_id": apps.project,
            "pt_id": apps.pt,
        }
        storevouchermaker.reload({
            params: {
                "hideparam": 'getvouchermaker',
                "pt_id" : apps.pt,
                "project_id" : apps.project
            },
            callback: function (records, operation, success) {
                /*storevouchermaker.each(function (record)
                {
                    if (record.data['department_id'] == me.department_id) {
                        me.setVal(form, 'department_id', record.data['department_id']);
                    }
                });*/
            }
        });
    },
    loadPtbyProject: function() {

        var me = this.getMe();
        projectid = me.getFormdata().down("[name=project_id]").getValue();

        if (projectid != null) {
            projectid = me.getFormdata().down("[name=project_id]").getValue();
        } else {
            projectid = apps.project;
        }

        var f = me.getFormdata();
        storept = me.getStore('Pt');
        storept.load({
            params: {
                "hideparam": 'getptbyuserproject',
                "start": 0,
                "limit": 1000000,
                "project_id": projectid,
                "user_id": apps.uid
            },
            callback: function(records, operation, success) {
                if (records[0]) {
                    var row = records[0]['data'];
                    me.setValueCombobox(me, 'pt_id', row.pt_id, row.ptname);
                }
            }
        });
    },
    loadDeptbyPt: function () {
        var me, store, form;
        me = this.getMe();
        form = me.getFormdata();
        store = me.getStore("Department");
        store.reload({
            params: {
                "hideparam": 'getdepartmentbyprojectpt',
                "user_id": apps.uid,
                "project_id" : form.down("[name=project_id]").getValue(),
                "pt_id" : form.down("[name=pt_id]").getValue(),
            },
            callback: function (records, operation, success) {
                /*store.each(function (record)
                {
                    if (record.data['department_id'] == me.department_id) {
                        me.setVal(form, 'department_id', record.data['department_id']);
                    }
                });*/
            }
        });
    },
    loadVoucherMakerbyPt: function () {
        var me, storevouchermaker;
        me = this.getMe();
        form = me.getFormdata();
        storevouchermaker = me.getStore("Vouchermaker");
        storevouchermaker.proxy.extraParams = {
            "hideparam": 'getvouchermaker',
            "project_id" : form.down("[name=project_id]").getValue(),
            "pt_id" : form.down("[name=pt_id]").getValue(),
        }
        storevouchermaker.reload({
            params: {
                "hideparam": 'getvouchermaker',
                "project_id" : form.down("[name=project_id]").getValue(),
                "pt_id" : form.down("[name=pt_id]").getValue(),
            },
            callback: function (records, operation, success) {
                /*storevouchermaker.each(function (record)
                {
                    if (record.data['department_id'] == me.department_id) {
                        me.setVal(form, 'department_id', record.data['department_id']);
                    }
                });*/
            }
        });
    },
    formatDate: function(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    },
});