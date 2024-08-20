Ext.define('Cashier.controller.Balancesheet', {
    extend: 'Cashier.library.template.controller.Controllergl',
    alias: 'controller.Balancesheet',
    

    requires: [
        'Cashier.library.template.combobox.Levelcombobox',
        'Cashier.library.template.combobox.Monthcombobox',
        'Cashier.library.template.combobox.Yearcombobox',
    ],

    views: [
        'balancesheet.Panel',
        'balancesheet.FormData'
    ],
   
    stores: [
        //'Balancesheet',
        //'Levelcombox',
        //'Monthdata',
    ],
    models: [
        //'Balancesheet',
        //'Coa'
    ],
    refs: [
        {
            ref: 'formdata',
            selector: 'balancesheetformdata'
        },
        {
            ref: 'paneldata',
            selector: 'balancesheetpanel'
        }
    ],
    controllerName: 'balancesheet',
    fieldName: '',
    bindPrefixName: 'Balancesheet',
    urlprocess: 'cashier/balancesheet/create',
    stimulsoft: "resources/stimulsoft/index.php?stimulsoft_client_key=ViewerFx&stimulsoft_report_key=",
  
    periodedata:null,yeardata: null, paramsStr: null, win: null, params: null, dateNow: new Date(), html: null, winId: 'myReportWindow',
    project_name: null, pt_name: null, userprint: null, urlrequest: null, senddata: null, info: null, form: null,
    cluster:null,
    
    reporttype:null,reportby:0,reportbydesc:null,level:null,month:null,year:null,
    
    init: function (application) {
        var me = this;
        this.control({
            'balancesheetpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setHeight(300);
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setWidth(600);
                    me.panelAfterRender();
                }
            },
            'balancesheetformdata': {
                afterrender: function (panel) {
                    this.formDataAfterRenderCustome();

                }
            },
            'balancesheetformdata button[action=submit]': {
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
        me.value["tcashier_sekarang"] = me.dateNow.getDate() + "-" + (me.dateNow.getMonth() + 1) + "-" + me.dateNow.getFullYear();
        me.value["time_sekarang"] = me.dateNow.getHours() + ":" + me.dateNow.getMinutes() + ":" + me.dateNow.getSeconds();
        me.value["project_id"] = apps.project;
        me.value["pt_id"] = apps.pt;

        me.value["leveldata"] = me.level;
        me.value["monthdata"] = me.month;
        me.value["periode"] = me.periodedata;
        me.value["yeardata"] = me.year;
        me.value["reportby"] = me.reportby;
        me.value["reportdesc"] = me.reportbydesc;
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
        var report = me.checkReportby();
        if(report.reportby==1){
             me.report = 'Balancesheethismonth';
        }else if(report.reportby==4){
             me.report = 'Balancesheethislastmonthyear';
        }else{
            me.report = 'Balancesheethislastmonth';
        }
       
        me.html = me.generateFakeForm(me.value, me.report);
        me.win.down("#MyReportPanel").body.setHTML(me.html);
        $("#fakeReportFormID").submit();
    },
    showReport: function () {
        var me;
        me = this;       
        me.form = me.getFormdata().getForm();  
        if (me.form.isValid()) {
            Ext.getBody().mask("Please wait...");
            resetTimer();
            me.generateReport();   
           // me.arrayData();
           // me.submitReport();
        }
    },
    checkReportby:function(){
       var me,desc,reportby,returndata,thisamount,lastmonth,budget,lastyear;
       me = this;       
       thisamount = me.getValueRadio(me,"#radio1");
       lastmonth = me.getValueRadio(me,"#radio2");
       budget  = me.getValueRadio(me,"#radio3");
       lastyear = me.getValueRadio(me,"#radio4");
       
       if(lastmonth==true && thisamount==false && budget==false && lastyear==false) {
           reportby ='2'; 
           desc ='This Month vs Last Month'; 
       }else if(lastmonth==false && thisamount==true && budget==false && lastyear==false){
           reportby ='1'; 
           desc ='This Month'; 
       }else if(lastmonth==false && thisamount==false && budget==true && lastyear==false){
           reportby ='3'; 
           desc ='This Month vs Budget'; 
       }else if(lastmonth==false && thisamount==false && budget==false && lastyear==true){
           reportby ='4'; 
           desc ='This Month vs This Month Last Year'; 
       }
       
       returndata = {
           "reportby":reportby,
           "desc":desc
       }
         
      return  returndata;
    }, 
    setupData:function(){
         var me,report;
         me = this;  
         report = me.checkReportby();
         me.reportby = report.reportby;
         me.reportbydesc = report.desc;
         me.level = me.getValue(me,"level","value");
         me.month = me.getValue(me,"monthdata","value");
         me.year = me.getValue(me,"yeardata","value");
        
    },
    generateReport: function(){       
         var me,report;
         me = this;  
         me.setupData();
         me.senddata = {
            hideparam: 'generatereport',
            level: me.level,
            report:"N",
            reportby:me.reportby,
            month:me.month,
            year:me.year,
        }
        me.urlrequest = me.urlprocess;
        me.AjaxRequest();     
       
    }, 
    formDataAfterRenderCustome: function () {
        var me, storelevel = '';
        me = this;
        storelevel = me.getStore('Levelcombox');
        storelevel.load({
            params: {
                "hideparam": 'distinctforlevel',
                "report": "N",
                "start": 0,
                "limit": 20,
            },
            callback: function (records, operation, success) {
                storelevel.sort('level', 'ASC');
                if (records[2]) {
                    var row = records[2]['data'];
                    me.setValue(me, 'level', row.level);
                }
            }
        });

        me.defaultRange();
        me.setValue(me, 'monthdata', me.dateNow.getMonth() + 1);
    },
    defaultRange: function () {
        var me = '';
        me = this;
        me.senddata = {
            hideparam: 'defaultrange'
        }
        me.urlrequest = 'cashier/balancesheet/create';
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
            me.setValue(me, 'yeardata', me.yeardata);
        } else if (me.info.parameter == 'default') {
            Ext.getBody().unmask();
        } else if (me.info.parameter == 'generatereport') {
            Ext.getBody().unmask();
            me.form = me.getFormdata().getForm();     
            me.periodedata = me.info.data.untildate;
            me.cluster = me.info.data.cluster;
            me.createWindows();   
            me.arrayData();
            me.submitReport();           
        }
    },
    panelAfterRender: function () {
        var me = this;
        Ext.Ajax.request({
            url:'cashier/balancesheet/read',
            success: function (response) {
                var info = Ext.JSON.decode(response.responseText);
                me.project_name = info.project_name;
                me.pt_name = info.pt_name;
                me.userprint = info.userprint;
            },
        });
    },
});