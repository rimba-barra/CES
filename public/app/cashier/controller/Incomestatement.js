Ext.define('Cashier.controller.Incomestatement', {
    extend: 'Cashier.library.template.controller.Controllergl',
    alias: 'controller.Incomestatement',
    requires: [
        'Cashier.library.template.combobox.Levelcombobox',
        'Cashier.library.template.combobox.Monthcombobox',
        'Cashier.library.template.combobox.Yearcombobox',
		'Cashier.library.template.combobox.Ptcombobox'
    ],
    views: [
        'incomestatement.Panel',
        'incomestatement.FormData'
    ],
    stores: [
        'Incomestatement',
        'Levelcombox',
        'Monthdata',
    ],
    models: [
        'Incomestatement',
        'Coa'
    ],
    refs: [
        {
            ref: 'formdata',
            selector: 'incomestatementformdata'
        },
        {
            ref: 'paneldata',
            selector: 'incomestatementpanel'
        }
    ],
    controllerName: 'incomestatement',
    fieldName: '',
    bindPrefixName: 'Incomestatement',
    urlprocess: 'cashier/incomestatement/create',
    stimulsoft: "resources/stimulsoft/index.php?stimulsoft_client_key=ViewerFx&stimulsoft_report_key=",
    yeardata: null, paramsStr: null, win: null, params: null, dateNow: new Date(), html: null, winId: 'myReportWindow',
    project_name: null, pt_name: null, userprint: null, urlrequest: null, senddata: null, info: null, form: null,cluster:null,
  
    reporttype: null, reportby: 0, reportbydesc: null, level: null, month: null, year: null, periode: null,
    init: function (application) {
        var me = this;
        this.control({
            'incomestatementpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setHeight(280);
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setWidth(600);
                    me.panelAfterRender();
                }
            },
            'incomestatementformdata': {
                afterrender: function (panel) {
                    this.formDataAfterRenderCustome();

                }
            },
            'incomestatementformdata button[action=submit]': {
                click: function () {
                    this.showReport();
                }
            }
        });
    },
    arrayData: function () {
        var me;
        me = this;

        me.value = me.form.getValues();
        me.value["project_name"] = me.project_name;
        me.value["pt_name"] = me.pt_name;
        me.value["pt_name"] = me.getValueCombobox(me,"pt_id").value;
        me.value["userprint"] = me.userprint;
        me.value["tgl_sekarang"] = me.dateNow.getDate() + "-" + (me.dateNow.getMonth() + 1) + "-" + me.dateNow.getFullYear();
        me.value["time_sekarang"] = me.dateNow.getHours() + ":" + me.dateNow.getMinutes() + ":" + me.dateNow.getSeconds();
        
        me.value["project_id"] = apps.project;
        me.value["pt_id"] = apps.pt;
        
        var f = me.getFormdata();
        valueModels = f.down("[name=pt_id]").valueModels[0];
        me.value["pt_id"] = f.down("[name=pt_id]").getValue();
        me.value["project_id"] = valueModels.data.project_id;
            

        me.value["leveldata"] = me.level;
        me.value["monthdata"] = me.month;
        me.value["yeardata"] = me.year;
        me.value["reportby"] = me.reportby;
        me.value["reportdesc"] = me.reportbydesc;
        me.value["periode"] = me.periode;
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
        me.report = 'Installstatementthismonth';
        me.html = me.generateFakeForm(me.value, me.report);
        me.win.down("#MyReportPanel").body.setHTML(me.html);
        $("#fakeReportFormID").submit();
    },
    showReport: function () {
        var me;
        me = this;
        me.generateReport();     
    },
    setupData: function () {
        var me;
        me = this;
        me.reporttype = me.getValue(me, "reporttypeincome", "value");
        if (me.reporttype == true) {
            me.reportby = 1;
            me.reportbydesc = "This Month";
        } else {
            me.reportby = 2;
            me.reportbydesc = "This Month vs Last Month vs Budget";
        }
        me.level = me.getValue(me, "levelincome", "value");
        me.month = me.getValue(me, "monthdataincome", "value");
        me.year = me.getValue(me, "yeardataincome", "value");
    },
    generateReport: function () {
        var me;
        me = this;
        me.setupData();
        me.senddata = {
            hideparam: 'generatereport',
            level: me.level,
            report: "L",
            reportby: me.reportby,
            month: me.month,
            year: me.year,
        }
        me.urlrequest = me.urlprocess;
        Ext.getBody().mask("Please wait...");
        me.AjaxRequest();
    },
    formDataAfterRenderCustome: function () {
        var me, storelevel = '';
        me = this;
        storelevel = me.getStore('Levelcombox');
        storelevel.load({
            params: {
                "hideparam": 'distinctforlevel',
                "report": "L",
                "start": 0,
                "limit": 20,
            },
            callback: function (records, operation, success) {
                storelevel.sort('level', 'ASC');
                if (records[2]) {
                    var row = records[2]['data'];
                    me.setValue(me, 'levelincome', row.level);
                }
            }
        });
		
		storept = me.getStore('Pt');

        Ext.Ajax.request({
            url: 'cashier/balancesheetb/read',
            success: function (response) {
                var info = Ext.JSON.decode(response.responseText);

                storept.load({
                    params: {
                        "hideparam": 'ptbyuser',
                        "start": 0,
                        "limit": 1000000 
                    },
                    callback: function (records, operation, success) {
                        if (records[0]) {
                            var row = records[0]['data'];
                            f.down("[name=pt_id]").setValue(parseInt(apps.pt));
                            //me.setValueCombobox(me, 'pt_id', row.pt_id,row.ptname);
                        }

                    }
                });
            },
        });

        me.defaultRange();
        me.setValue(me, 'monthdataincome', me.dateNow.getMonth() + 1);
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
            Ext.getBody().unmask();
            me.yeardata = me.info.data.yeardb;
            me.setValue(me, 'yeardataincome', me.yeardata);
        } else if (me.info.parameter == 'default') {
            Ext.getBody().unmask();
        } else if (me.info.parameter == 'generatereport') {
            var form = me.getFormdata();
            Ext.getBody().unmask();
            me.periode = me.info.data.untildate;            
            me.cluster = me.info.data.cluster;   
            
            me.form = me.getFormdata().getForm();           
            if (me.form.isValid()) {
                resetTimer();
                me.createWindows();
                me.arrayData();
                me.submitReport();
            }

        }
    },
    panelAfterRender: function () {
        var me = this;
        Ext.Ajax.request({
            url: 'cashier/dailytransaction/read',
            success: function (response) {
                var info = Ext.JSON.decode(response.responseText);
                me.project_name = info.project_name;
                me.pt_name = info.pt_name;
                me.userprint = info.userprint;
            },
        });
    },
});