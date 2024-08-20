Ext.define('Gl.controller.Generateshl', {
    extend: 'Gl.library.template.controller.Controllergl',
    alias: 'controller.Generateshl',
    requires: [
        'Gl.library.tools.Mytools',
        'Gl.library.template.combobox.Monthcombobox',
    ],
    views: [
        'generateshl.Panel',
        'generateshl.FormData'
    ],
    stores: [
        'Generateshl',
        'Monthdata',
    ],
    models: [
        'Generateshl',
    ],
    refs: [
        {ref: 'formdata', selector: 'generateshlformdata'},
        {ref: 'paneldata', selector: 'generateshlpanel'}
    ],
    //setting properties variabel
    controllerName: 'generateshl',
    fieldName: '',
    bindPrefixName: 'Generateshl',
    urlsubmit: 'gl/generateshl/create',
    yeardata: null, fromdate: null, untildate: null, getyear: null, dateNow: new Date(),
    form: null, value: null, info: null, senddata: null, periode: null,
    reportdate: null, reportby: 0, msg: null,
    init: function (application) {
        var me = this;
        this.control({
            'generateshlpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setHeight(160);
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setWidth(300);
                }
            },
            'generateshlformdata': {
                afterrender: function (panel) {
                    this.formDataAfterRenderCustome();
                }
            },
            'generateshlformdata [name=processdate]': {
            },
            'generateshlformdata button[action=submit]': {
                click: function () {
                    me.getReportdate();
                }
            }
        });
    },
    getReportdate: function () {
        var me,res, month,tmpdate,tmpdate2,thedate,thisdate,enddate;
        me=this;
        //month = me.getValue(me, "monthdata", "value");
        //thisdate = new Date(me.yeardata, month, 0);
        //me.reportdate = thisdate.getDate() + "-" + (thisdate.getMonth() + 1) + "-" + thisdate.getFullYear()
        tmpdate = me.getValue(me, "processdate", "value");
        tmpdate2 = me.getValue(me, "processdate", "raw");
        res = tmpdate2.split("-");
        thedate = new Date(res[2], res[1], 0);        
        enddate = thedate.getDate() + "-" + (thedate.getMonth() + 1) + "-" + thedate.getFullYear();
        thisdate = tmpdate.getDate() + "-" + (tmpdate.getMonth() + 1) + "-" + tmpdate.getFullYear();
        if(thisdate==enddate){
             me.reportdate = me.getValue(me, "processdate", "raw");  
             me.dataSubmit();
        }else{
            me.buildWarningAlert('Generete Journal Bunga SHL Cannot Process, please select end of date for create Journal Bunga SHL');
        }
        
    },
    dataSubmit: function () {
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
        returndata = {
            "reportby": '2',
            "desc": null
        }
        return  returndata;
    },
    setupData: function () {
        var me, report, month, thisdate;
        me = this;
        report = me.checkReportby();
        me.reportby = report.reportby;
        me.reportbydesc = report.desc;

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
    generateData: function () {
        var me, report;
        me = this;
        me.setupData();
        me.senddata = {
            hideparam: 'generatedata',
            reportdate: me.reportdate,
            reportby: me.reportby
        }
        me.urlrequest = me.urlprocess;
        me.AjaxRequest();
    },
    confirmData: function (msgdata) {
        var me;
        me = this;
        Ext.Msg.show({
            title: 'Generate Bunga SHL',
            msg: msgdata,
            width: 300,
            closable: false,
            buttons: Ext.Msg.YESNO,
            buttonText:
                    {
                        yes: 'YES',
                        no: 'CANCEL'
                    },
            multiline: false,
            fn: function (buttonValue, inputText, showConfig) {
                if (buttonValue == 'yes') {
                    me.generateData();
                }
            },
            icon: Ext.Msg.QUESTION
        });

    },
    formDataAfterRenderCustome: function () {
        var me,month;
        me = this;
        me.senddata = {
            hideparam: 'defaultrange'
        }
        me.AjaxRequest();
        
        //jika menggunakan bulan
        if(me.dateNow.getMonth()==0){
           month = me.dateNow.getMonth()+1;
        }else if(me.dateNow.getMonth()==11){
           month = me.dateNow.getMonth()+1;
        }else{
           month = me.dateNow.getMonth();
        } 
         //jika menggunakan bulan
        //me.setValue(me, 'monthdata', month);
    },
    AjaxRequest: function () {
        var me;
        me = this;
        Ext.getBody().mask("Processing data, please wait...", 'loading');
        Ext.Ajax.request({
            url: me.urlsubmit,
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
            me.setValue(me, 'processdate', me.info.data.onedate);
            form.down("[name=processdate]").setMinValue(me.yeardata + '-01-01');
            form.down("[name=processdate]").setMaxValue(me.info.data.enddecember);           
            
        } else if (me.info.parameter == 'checkdata') {
            Ext.getBody().unmask();
            if (me.info.data.flagjournal > 0 && me.info.data.counter > 0) {
                me.buildWarningAlert(me.info.data.message);
            } else if (me.info.data.flagjournal < 1 && me.info.data.counter > 0) {
                me.buildWarningAlert(me.info.data.message);
            } else if (me.info.data.flagjournal > 0 && me.info.data.counter < 1) {
                me.confirmData(me.info.data.messagejournal);
            } else {
                //langsung proses
                me.generateData();
            }
        } else if (me.info.parameter == 'generatedata') {
            Ext.getBody().unmask();
            if (me.info.data.counter > 0) {
                me.buildWarningAlert(me.info.data.message);
            } else {
                me.buildWarningAlert(me.info.data.message);
            }
        }
    }
});