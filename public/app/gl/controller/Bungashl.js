Ext.define('Gl.controller.Bungashl', {
    extend: 'Gl.library.template.controller.Controllergl',
    alias: 'controller.Bungashl',
    views: [
        'bungashl.Panel',
        'bungashl.FormData'
    ],
    stores: [
        'Bungashl',
      
    ],
    models: [
        'Bungashl',
      
    ],
    refs: [
        {
            ref: 'formdata',
            selector: 'bungashlformdata'
        },
        {
            ref: 'paneldata',
            selector: 'bungashlpanel'
        }
    ],
    controllerName: 'bungashl',
    fieldName: '',
    bindPrefixName: 'Bungashl',
    urlprocess: 'gl/bungashl/create',
    stimulsoft: "resources/stimulsoft/index.php?stimulsoft_client_key=ViewerFx&stimulsoft_report_key=",
    periode: null, yeardata: null, paramsStr: null, win: null, params: null, dateNow: new Date(), html: null, winId: 'myReportWindow',
    project_name: null, pt_name: null, userprint: null, urlrequest: null, senddata: null, info: null, form: null,
    reporttype: null, reportby: 0, reportbydesc: null, level: null, month: null, year: null, reportdate: null,
    test:null,cluster:null,filteraccount:null,filtersubaccount:null,filtersubcode:null,
    init: function (application) {
        var me = this;
        this.control({
            'bungashlpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setHeight(200);
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setWidth(360);
                    me.panelAfterRender();
                }
            },
            'bungashlformdata': {
                afterrender: function (panel) {
                    this.formDataAfterRenderCustome();

                }
            },
            'bungashlformdata button[action=submit]': {
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
        me.value["userprint"] = me.userprint;
        me.value["tgl_sekarang"] = me.dateNow.getDate() + "-" + (me.dateNow.getMonth() + 1) + "-" + me.dateNow.getFullYear();
        me.value["time_sekarang"] = me.dateNow.getHours() + ":" + me.dateNow.getMinutes() + ":" + me.dateNow.getSeconds();
        me.value["project_id"] = apps.project;
        me.value["pt_id"] = apps.pt;

        me.value["reportdate"] = me.reportdate;
        me.value["reportby"] = me.reportby;
        me.value["reportdesc"] = me.reportbydesc;
        me.value["cluster"] = me.cluster;
        me.value["periode"] = me.periode;
        me.value["filteraccount"] = me.filteraccount;
        me.value["filtersubaccount"] = me.filtersubaccount;
        me.value["filtersubcode"] = me.filtersubcode;
    },    
    createWindows: function () {
        var me = this;
        me.instantWindow('Panel', 800, 'Result ', 'state-report', me.winId, 'masterreport');
        me.paramsStr = me.generateReportParams(me.getFormdata().getForm().getFieldValues());
        me.win = desktop.getWindow(me.winId);
    },
    submitReport: function () {
        var me = this;
        me.report = 'Bungashlgroupmonth';
        me.html = me.generateFakeForm(me.value, me.report);
        me.win.down("#MyReportPanel").body.setHTML(me.html);
        $("#fakeReportFormID").submit();
    },
    showReport: function () {
        var me;
        me = this;        
        me.form = me.getFormdata().getForm();
        if (me.form.isValid()) {
            resetTimer();
            me.checkData();
        }
    },
    checkReportby: function () {
        var me, desc, reportby, returndata, tahun, bulan;
        me = this;
        tahun = me.getValueRadio(me, "#radio1");
        bulan = me.getValueRadio(me, "#radio2");

        if (tahun == true && bulan == false) {
            reportby = '1';
            desc = 'Begining Year';
        } else if (tahun == false && bulan == true) {
            reportby = '2';
            desc = 'Begining Month';
        }

        returndata = {
            "reportby": reportby,
            "desc": desc
        }

        return  returndata;

    },
    setupData: function () {
        var me, report;
        me = this;
        report = me.checkReportby();
        me.reportby = report.reportby;
        me.reportbydesc = report.desc;
        me.reportdate = me.getValue(me, "reportdate", "raw");
    },
    checkData: function () {
        var me, report;
        me = this;
        me.setupData();
        me.senddata = {
            hideparam: 'checkdata',
            reportdate: me.reportdate,
            reportby: me.reportby
        }
        me.urlrequest = me.urlprocess;
        me.AjaxRequest();
    },
    generateReport: function () {
        var me, report;
        me = this;
        me.setupData();
        me.senddata = {
            hideparam: 'generatereport',
            reportdate: me.reportdate,
            reportby: me.reportby
        }
        me.urlrequest = me.urlprocess;
        Ext.getBody().mask('Please wait...');
        me.AjaxRequest();
    },
    formDataAfterRenderCustome: function () {
        var me, store = '';
        me = this;      
        me.defaultRange();
    },
    defaultRange: function () {
        var me = '';
        me = this;
        me.senddata = {
            hideparam: 'defaultrange'
        }
        me.urlrequest = 'gl/bungashl/create';
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
            me.setValue(me, 'reportdate', me.info.data.onedate);
        } else if (me.info.parameter == 'default') {
            Ext.getBody().unmask();
        } else if (me.info.parameter == 'checkdata') {
            if(me.info.counter > 0 ){
                 me.buildWarningAlert(me.info.message);
            }else{               
                me.generateReport();
            }
        } else if (me.info.parameter == 'generatereport') {
            Ext.getBody().unmask();
            resetTimer();
            me.cluster = me.info.data.cluster;   
            me.filteraccount = me.info.data.filteraccount;   
            me.filtersubaccount = me.info.data.filtersubaccount;   
            me.filtersubcode = me.info.data.filtersubcode;   
            me.periode = me.info.data.periode;   
            me.createWindows();
            me.arrayData();
            me.submitReport();
           
        }
    },
    panelAfterRender: function () {
        var me = this;
        Ext.Ajax.request({
            url: 'gl/bungashl/read',
            success: function (response) {
                var info = Ext.JSON.decode(response.responseText);
                me.project_name = info.project_name;
                me.pt_name = info.pt_name;
                me.userprint = info.userprint;
            },
        });
    },
});