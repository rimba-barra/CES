Ext.define('Gl.controller.Cashflow', {
    extend: 'Gl.library.template.controller.Controllergl',
    alias: 'controller.Cashflow',
    requires: [
        'Gl.library.template.combobox.Coagrid',
    ],
    views: [
        'cashflow.Panel',
        'cashflow.FormData'
    ],
    stores: [
        'Coacombo',
    ],
    models: [
        'Coa'
    ],
    refs: [
        {
            ref: 'formdata',
            selector: 'cashflowformdata'
        },
        {
            ref: 'paneldata',
            selector: 'cashflowpanel'
        }
    ],
    controllerName: 'cashflow',
    fieldName: '',
    bindPrefixName: 'Cashflow',
    urlprocess: 'gl/cashflow/create',
    stimulsoft: "resources/stimulsoft/index.php?stimulsoft_client_key=ViewerFx&stimulsoft_report_key=",
    yeardata: null, paramsStr: null, win: null, params: null, dateNow: new Date(), html: null, winId: 'myReportWindow',
    project_name: null, pt_name: null, userprint: null, urlrequest: null, senddata: null, info: null, form: null, cluster: null,
    value: null,
    statusdetail: null, statusdetaildesc: null, periode: null, filtercoa: null,
    fromcoa: null, untilcoa: null, fromdate: null, untildate: null,
    init: function (application) {
        var me = this;
        this.control({
            'cashflowpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setHeight(200);
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setWidth(600);
                    me.panelAfterRender();
                }
            },
            'cashflowformdata': {
                afterrender: function (panel) {
                    this.formDataAfterRenderCustome();

                }
            },
            'cashflowformdata [name=fromcoa] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                    value = me.getFormdata().down("[name=fromcoa]").getRawValue();
                    this.autocompletecombo(value);
                },
            },
            'cashflowformdata [name=untilcoa] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                    value = me.getFormdata().down("[name=untilcoa]").getRawValue();
                    this.autocompletecombo(value);
                },
            },
            'cashflowformdata button[action=submit]': {
                click: function () {
                    this.showReport();
                }
            }
        });
    },
    autocompletecombo: function (value) {
        var me, storecoa, value;
        me = this;
        storecoa = me.getStore('Coacombo');
        storecoa.clearFilter();
        storecoa.filter('coa', value);
    },
    arrayData: function () {
        var me;
        me = this;
        me.value = me.form.getValues();
        me.value["project_name"] = me.project_name;
        me.value["pt_name"] = me.pt_name;
        me.value["userprint"] = me.userprint;
        me.value["tgl_sekarang"] = me.dateNow.getDate() + "-" + (me.dateNow.getMonth() + 1) + "-" + me.dateNow.getFullYear();
        me.value["time_sekarang"] = me.dateNow.getHours() + ":" + me.dateNow.getMinutes() + ":" + me.dateNow.getSeconds();
        me.value["project_id"] = apps.project;
        me.value["pt_id"] = apps.pt;

        me.value["statusdetaildesc"] = me.statusdetaildesc;
        me.value["statusdetail"] = me.statusdetail;
        me.value["periode"] = me.periode;
        me.value["filtercoa"] = me.filtercoa;
        me.value["cluster"] = me.cluster;
    },
    createWindows: function () {
        var me = this;
        me.instantWindow('Panel', 800, 'Result ', 'state-report', me.winId, 'masterreport');
        me.paramsStr = me.generateReportParams(me.getFormdata().getForm().getFieldValues());
        me.win = desktop.getWindow(me.winId);
    },
    submitReport: function () {
        var me = this;
        me.report = 'Cashflow';
        me.html = me.generateFakeForm(me.value, me.report);
        me.win.down("#MyReportPanel").body.setHTML(me.html);
        $("#fakeReportFormID").submit();
    },
    showReport: function () {
        var me;
        me = this;
        me.form = me.getFormdata().getForm();  
        me.generateReport();
    },
    setupData: function () {
        var me;
        me = this;

        me.statusdetail = me.getValueRadio(me, "#radiodetail1");
        me.fromcoa = me.getValueCombobox(me, "fromcoa");
        me.untilcoa = me.getValueCombobox(me, "untilcoa");
        me.fromdate = me.getValueCombobox(me, "fromdate");
        me.untildate = me.getValueCombobox(me, "untildate");


        if (me.statusdetail == true) {
            me.statusdetaildesc = 'With Detail';
        } else {
            me.statusdetaildesc = 'Without Detail';
        }

        me.periode = me.fromdate.value + ' to ' + me.untildate.value;
        me.filtercoa = me.fromcoa.value + ' to ' + me.untilcoa.value;

        var returndata = {
            "statusdetail": me.statusdetail,
            "fromcoa": me.fromcoa.value,
            "untilcoa": me.untilcoa.value,
            "fromdate": me.fromdate.value,
            "untildate": me.untildate.value,
        }
        me.arraydata = returndata;
    },
    generateReport: function () {
        var me;
        me = this;
        resetTimer();
        me.setupData();
        me.arraydata['hideparam'] = 'generatereport';
        me.senddata = me.arraydata;
        me.urlrequest = me.urlprocess;
        Ext.getBody().mask("Please wait...");
        me.AjaxRequest();
    },
    formDataAfterRenderCustome: function () {
        var me, storecoa, form = '';
        me = this;
        me.defaultRange();

        form = me.getFormdata();
        storecoa = me.getStore('Coacombo');
        storecoa.load({
            params: {
                "hideparam": 'forcashflow',
                "start": 0,
                "limit": 1000000,
            },
            callback: function (records, operation, success) {
                if (records[0]) {
                    var firstdata = records[0]['data'];
                    form.down("[name=fromcoa]").setValue(firstdata.coa_id);
                    form.down("[name=fromcoa]").setRawValue(firstdata.coa);
                    form.down("[name=untilcoa]").setValue(firstdata.coa_id);
                    form.down("[name=untilcoa]").setRawValue(firstdata.coa);
                }
            }
        });

    },
    defaultRange: function () {
        var me = '';
        me = this;
        me.senddata = {
            hideparam: 'defaultrange'
        }
        me.urlrequest = me.urlprocess;
        me.AjaxRequest();
    },
    AjaxRequest: function () {
        var me;
        me = this;
        Ext.Ajax.request({
            url: me.urlrequest,
            method: 'POST',
	    timeout:100000000,	
            params: {
                data: Ext.encode(me.senddata)
            },
            success: function (response) {
                me.info = Ext.JSON.decode(response.responseText);
                me.setSuccessEvent();
            },
            failure: function (response) {
                me.getFormdata().up('window').close();
            }
        });
    },
    setSuccessEvent: function () {
        var me = this;
        if (me.info.parameter == 'default') {
            if (me.info.counter < 1) {
                Ext.getBody().unmask();
                me.buildWarningAlert(me.info.message);
            } else {
                Ext.getBody().unmask();
                Ext.Msg.show({
                    title: 'Success',
                    msg: 'Process  data successfully.',
                    icon: Ext.Msg.INFO,
                    buttons: Ext.Msg.OK,
                    fn: function () {
                        me.formDataClose();
                    }
                });
            }
        } else if (me.info.parameter == 'defaultrange') {
            var form = me.getFormdata();
            me.yeardata = me.info.data.yeardb;

            form.down("[name=fromdate]").setValue(me.info.data.onedate);
            form.down("[name=untildate]").setValue(me.info.data.onedate);
            form.down("[name=fromdate]").setMinValue(me.yeardata + '-01-01');
            form.down("[name=fromdate]").setMaxValue(me.info.data.enddecember);
            form.down("[name=untildate]").setMinValue(me.yeardata + '-01-01');
            form.down("[name=untildate]").setMaxValue(me.info.data.enddecember);


        } else if (me.info.parameter == 'default') {
            Ext.getBody().unmask();
        } else if (me.info.parameter == 'generatereport') {
            var form = me.getFormdata();
            Ext.getBody().unmask();
            me.cluster = me.info.data.cluster;   
            me.createWindows();
            me.arrayData();
            me.submitReport();
        }
    },
    panelAfterRender: function () {
        var me = this;
        Ext.Ajax.request({
            url: 'gl/cashflow/read',
            success: function (response) {
                var info = Ext.JSON.decode(response.responseText);
                me.project_name = info.project_name;
                me.pt_name = info.pt_name;
                me.userprint = info.userprint;
            },
        });
    },
});