Ext.define('Cashier.controller.Reportchangepricelog', {
    extend: 'Cashier.library.template.controller.Controllergl',
    alias: 'controller.Reportchangepricelog',
    requires: [
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Ptprojectcombobox',
        'Cashier.library.template.combobox.Projectcombobox',
    ],
    views: [
        'reportchangepricelog.Panel',
        'reportchangepricelog.FormData'
    ],
    stores: [
        'Project',
        'Ptbyuser',
        'Ptforcashbon',
        'Pt',
    ],
    models: [
        'Project',
        'Pt',
        'Ptforcashbon'
    ],
    refs: [{
        ref: 'formdata',
        selector: 'reportchangepricelogformdata'
    }, {
        ref: 'paneldata',
        selector: 'reportchangepricelogpanel'
    }, ],
    controllerName: 'reportchangepricelog',
    fieldName: '',
    bindPrefixName: 'Reportchangepricelog',
    reportfile: 'Reportchangepricelog',
    urlprocess: 'cashier/reportchangepricelog/read',
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
            'reportchangepricelogpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function(panel) {
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setHeight(125);
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setWidth(400);
                    me.panelAfterRender();
                }
            },
            'reportchangepricelogformdata': {
                afterrender: function(panel) {
                    this.formDataAfterRenderCustome();
                }
            },
            /*'reportchangepricelogformdata [name=project_id]': {
                change: function(el) {
                    this.loadPtbyProject();
                }

            },*/
            'reportchangepricelogformdata button[action=submit]': {
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
            // ptname = f.down("[name=pt_id]").valueModels[0];

            params["project_id"] = f.down("[name=project_id]").getValue();
            // params["pt_id"] = f.down("[name=pt_id]").getValue();

            params["project_name"] = projectname.data.projectname;
            // params["pt_name"] = ptname.data.ptname;

            // params["from_date"] = me.formatDate(f.down("[name=from_date]").getValue());
            // params["until_date"] = me.formatDate(f.down("[name=until_date]").getValue());

            params["report_alias"] = 'Report_Tracking_Voucher-' + me.getValueCombobox(me, "project_id").value;

            // console.log(params);return;

            var html = me.ReportviewerV2(params, reportFile);
            win.down("#MyReportPanel").body.setHTML(html);
            $("#Reportform").submit();
        }
    },
    /*Processdata: function() {
        var me, form, ptid, projectid, fromdate, untildate;
        me = this;


        form = me.getFormdata();
        formvalue = form.getForm().getValues();

        if (formvalue['from_date'] == "" || formvalue['until_date'] == "") {
            Ext.Msg.alert("Warning", "Date must be filled.");
            return false;
        }

        me.senddata = {
            pt_id: formvalue['pt_id'],
            project_id: formvalue['project_id'],
            datefrom: formvalue['from_date'],
            untildate: formvalue['until_date'],
            hideparam: 'processreport'
        }

        Ext.getBody().mask("Please wait...");
        me.urlrequest = 'cashier/reportchangepricelog/create';
        me.AjaxRequest();
    },
    AjaxRequest: function() {
        var me;
        me = this;
        Ext.Ajax.request({
            url: me.urlrequest,
            method: 'POST',
            timeout: 100000000,
            params: {
                data: Ext.encode(me.senddata)
            },
            success: function(response) {
                me.info = Ext.JSON.decode(response.responseText);
                me.setSuccessEvent();
            },
            failure: function(response) {
                me.getFormdata().up('window').close();
            }
        });
    },
    setSuccessEvent: function() {
        var me = this;
        if (me.info.parameter == 'processreport') {
            Ext.getBody().unmask();
            me.statusprocess = me.info.success;
            if (me.statusprocess == true) {
                me.cluster = me.info.data.cluster;
                me.showReport();
            }
        }
    },
    showReport: function() {
        var me;
        me = this;
        var title = 'Result ' + me.getFormdata().up('window').title;
        me.winId = me.controllerName + '_' + Ext.Date.format(new Date(), 'YmdHis');
        me.form = me.getFormdata().getForm();
        var e = me.getFormdata().down("[name=pt_id]");
        var x = e.getStore().findRecord("pt_id", me.getFormdata().down("[name=pt_id]").getValue(), 0, false, true, true);

        me.instantWindowWithMinimize('Panel', 800, title, 'state-report', me.winId, me.controllerName);

        me.paramsStr = me.generateReportParams(me.getFormdata().getForm().getFieldValues());
        me.win = desktop.getWindow(me.winId);

        if (true) {
            resetTimer();
            me.value = me.form.getValues();
            me.value["project_name"] = x.data['projectname'];
            me.value["pt_name"] = x.data['ptname'];
            me.value["userprint"] = me.userprint;
            me.value["userid"] = me.userid;
            me.value["tgl_sekarang"] = me.dateNow.getDate() + "-" + (me.dateNow.getMonth() + 1) + "-" + me.dateNow.getFullYear();
            me.value["time_sekarang"] = me.dateNow.getHours() + ":" + me.dateNow.getMinutes() + ":" + me.dateNow.getSeconds();
            me.value["project_id"] = x.data['project_id'];
            me.value["pt_id"] = me.getFormdata().down("[name=pt_id]").getValue();
            me.value['datetype'] = me.info.data.paramjs.datetype;
            me.value['date_from'] = me.info.data.paramjs.datefrom;
            me.value['until_date'] = me.info.data.paramjs.untildate;
            me.value['vouchertype'] = me.info.data.paramjs.vouchertype;
            me.value["coastart_id"] = me.getFormdata().down("[name=from_coa_id]").getValue();
            me.value["coaend_id"] = me.getFormdata().down("[name=until_coa_id]").getValue();
            me.value['reporttype'] = me.getFormdata().down("[name=reporttype]").getValue();

            if (me.info.data.paramjs.vouchertype == "") {
                me.value['vouchertype_name'] = "ALL";
            } else if (me.info.data.paramjs.vouchertype == "O") {
                me.value['vouchertype_name'] = "OUT";
            } else if (me.info.data.paramjs.vouchertype == "I") {
                me.value['vouchertype_name'] = "IN";
            }

            me.value['voucherstatus'] = me.info.data.paramjs.voucherstatus;
            me.value['voucherstatus_name'] = me.info.data.paramjs.voucherstatus;
            me.value["tanggal"] = me.value["date_from"] + ' s/d ' + me.value["until_date"];

            var dy = new Date(me.value["fromdate"]);
            me.value["tahun"] = dy.getFullYear();

            var params = me.value;
            var reportFile;

            if (me.value['reporttype'] == "FORMAT 2") {
                reportFile = 'Voucher_transaction_reportver2';
            } else {
                reportFile = 'Voucher_transaction_report';
            }

            me.html = me.ReportviewerV4(params, reportFile, me.win.id, 1);
            me.win.down("#MyReportPanel_" + me.win.id).body.setHTML(me.html);
            $("#Reportform_" + me.win.id).submit();
        }
    },*/
    panelAfterRender: function() {
        var me = this;
        Ext.Ajax.request({
            url: 'cashier/Reportchangepricelog/read',
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

        var me, storeproject, storept = '';
        me = this;

        var f = me.getFormdata();

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
    loadPtbyProject: function() {

        var me = this;
        projectid = me.getFormdata().down("[name=project_id]").getValue();

        if (projectid != null) {
            projectid = me.getFormdata().down("[name=project_id]").getValue();
        } else {
            projectid = apps.project;
        }

        var f = me.getFormdata();
        storecoa = me.getStore('Pt');
        storecoa.load({
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