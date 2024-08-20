Ext.define('Cashier.controller.Balancesheetkp', {
    extend: 'Cashier.library.template.controller.Controllergl',
    alias: 'controller.Balancesheetkp',
    requires: [
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Coacomboboxgrid',
        'Cashier.library.template.combobox.Coagrid',
        //'Cashier.library.template.combobox.Ptcombobox',
		'Cashier.library.template.combobox.Levelcombobox',
        'Cashier.library.template.combobox.Monthcombobox',
        'Cashier.library.template.combobox.Yearcombobox',
        'Cashier.library.template.combobox.Ptprojectcombobox',
        'Cashier.library.template.combobox.Projectptcombobox'
    ],
	
    views: [
        'balancesheetkp.Panel',
        'balancesheetkp.FormData'
    ],

    stores: [
        'Balancesheetkp',
        'Coacombo',
        'Pt',
		'Levelcombox',
        'Monthdata',
        'Projectpt'
    ],
	
    models: [
        'Balancesheetkp',
        'Coa',
        'Pt',
        'Projectpt'
    ],

    refs: [
        {
            ref: 'formdata',
            selector: 'balancesheetkpformdata'
        },
        {
            ref: 'paneldata',
            selector: 'balancesheetkppanel'
        }
    ],
    controllerName: 'balancesheetkp',
    fieldName: '',
    bindPrefixName: 'Balancesheetkp',
    reportfile: 'Balancesheetkp',
    urlprocess: 'cashier/balancesheetkp/create',
    stimulsoft: "resources/stimulsoft/index.php?stimulsoft_client_key=ViewerFx&stimulsoft_report_key=",
    yeardata: null, paramsStr: null, win: null, params: null, dateNow: new Date(), html: null, winId: 'myReportWindow',
    project_name: null, pt_name: null, userprint: null, urlrequest: null, senddata: null, info: null, form: null,
    cluster:null,arraydata:null,value:null,
    
    fromcoa:null,untilcoa:null,detailtype:null,detaildesc:null,headertype:null,headerdesc:null,
    periode:null,fromdate:null,untildate:null,
    init: function (application) {
        var me = this;
        this.control({
            'balancesheetkppanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setHeight(250);
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setWidth(600);
                    me.panelAfterRender();
                }
            },
            'balancesheetkpformdata': {
                afterrender: function (panel) {
                    this.formDataAfterRenderCustome();

                }
            },
            'balancesheetkpformdata [name=from_coa_id] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                    value = me.getFormdata().down("[name=from_coa_id]").getRawValue();
                    this.autocompletecombo(value);
                },
                
            },
            'balancesheetkpformdata [name=until_coa_id] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                    value = me.getFormdata().down("[name=until_coa_id]").getRawValue();
                    this.autocompletecombo(value);
                },
            },
            'balancesheetkpformdata button[action=submit]': {
                click: function () {
                    this.processReport();
                }
            },
            'balancesheetkpformdata [name=pt_id]': {
                change: function (the, newValue, oldValue, eOpts) {
                    this.loadCoabypt(newValue);
                }
            },

            
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
        me.value["tcashier_sekarang"] = me.dateNow.getDate() + "-" + (me.dateNow.getMonth() + 1) + "-" + me.dateNow.getFullYear();
        me.value["time_sekarang"] = me.dateNow.getHours() + ":" + me.dateNow.getMinutes() + ":" + me.dateNow.getSeconds();
        me.value["project_id"] = apps.project;
        me.value["pt_id"] = apps.pt;

        me.value["detaildesc"] = me.arraydata.detaildesc;
        me.value["headerdesc"] = me.arraydata.headerdesc;
        me.value["periode"] = me.arraydata.fromdate+' to '+me.arraydata.untildate;
        me.value["filtercoa"] = me.arraydata.fromcoa+' to '+me.arraydata.untilcoa;
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
        me.report = 'Balancesheetkp';       
        me.html = me.generateFakeForm(me.value, me.report);
        me.win.down("#MyReportPanel").body.setHTML(me.html);
        $("#fakeReportFormID").submit();
        Ext.getBody().unmask();
    },
     showReport: function () {
        var me;
        me = this;       
        me.form = me.getFormdata().getForm();  
        if (me.form.isValid()) {          
            resetTimer();
            me.setupData();
            me.generateReport(); 
        }
        Ext.getBody().unmask();
    },
    setupData:function(){
       var me,returndata,headerdesc,detaildesc,headertype,detailtype,detailyes,detailno,headeryes,headerno,
               fromcoa,untilcoa,fromdate,untildate;
       me = this;     
       level = me.getValueCombobox(me,"level");   
       yeardata = me.getValueCombobox(me,"yeardata");
       mothdata = me.getValueCombobox(me,"mothdata");  



       returndata = {
           "level":level,
           "yeardata":yeardata,
           "mothdata":mothdata
       }
       
       me.arraydata = returndata;
    },
    
    generateReport: function(){       
         var me,report;
         me = this;  
         me.arraydata['hideparam'] ='generatereport';
         me.senddata = me.arraydata;
         me.urlrequest = me.urlprocess;
         //Ext.getBody().mask("Please wait...");
         me.AjaxRequest();     
    },    
    panelAfterRender: function () {
        var me = this;
        Ext.Ajax.request({
            url: 'cashier/balancesheetkp/read',
            success: function (response) {
                var info = Ext.JSON.decode(response.responseText);
                me.project_name = info.project_name;
                me.pt_name = info.pt_name;
                me.userprint = info.userprint;
            },
        });
    },
    formDataAfterRenderCustome: function () {
        var me, storecoa = '', storept = '';
        me = this;
        me.defaultRange();
        var f = me.getFormdata();
        

        storept = me.getStore('Projectpt');

        Ext.Ajax.request({
            url: 'cashier/balancesheetkp/read',
            success: function (response) {
                var info = Ext.JSON.decode(response.responseText);

                storept.load({
                    params: {
                        "hideparam": 'projectpt',
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
        me.urlrequest = 'cashier/dailytransaction/create';
        me.AjaxRequest();
    },
    AjaxRequest: function () {
        var me;
        me = this;
        console.log(me.urlrequest);
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

            var date = new Date();
            var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
            var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            me.yeardata = me.info.data.yeardb;
            me.setValue(me, 'yeardata', me.yeardata);

        } else if (me.info.parameter == 'default') {
            Ext.getBody().unmask();
        } else if (me.info.parameter == 'generatereport') {
            Ext.getBody().unmask();
            me.cluster = me.info.data.cluster;
            me.createWindows();   
            me.arrayData();
            me.submitReport();   
            Ext.getBody().unmask();        
        } else if (me.info.parameter == 'generatereportexcelthismonth') {
            Ext.getBody().unmask();
            var file_path = me.info.data.url;  
            var a = document.createElement('A');
            a.href = file_path;
            a.download = file_path.substr(file_path.lastIndexOf('/') + 1);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            Ext.getBody().unmask();
        }
    },
    processReport: function () {

        var me = this;
        var winId = me.controllerName + '_' + Ext.Date.format(new Date(), 'His');
        var title = 'Result ' + me.getFormdata().up('window').title;
        
        var f = me.getFormdata();
        var reporttype = f.down("[name=reporttype]").getValue();
        var layouttype = f.down("[name=layouttype]").getValue();
		var params = me.getFormdata().getForm().getFieldValues();
		
		reporttype = params.reporttype[1];
		
		if(reporttype===null){
			reporttype='VERSI 1';
		}

        // SEFTIAN ALFREDO 15/02/2022 - PENAMBAHAN VERSI 3
        if(reporttype=='VERSI 1' || reporttype=='VERSI 2' || reporttype=='VERSI 3'){
            me.instantWindowWithMinimize('Panel', 800, title, 'state-report', winId, me.controllerName);
        }else if(reporttype=='EXCEL'){
            
        }else{
            me.instantWindowWithMinimize('Panel', 800, title, 'state-report', winId, me.controllerName);
        }

        
        var paramsStr = me.generateReportParams(me.getFormdata().getForm().getFieldValues());
        var win = desktop.getWindow(winId);

        if (true) {
            var params = me.getFormdata().getForm().getFieldValues();
            var dateNow = new Date();
            var periode = new Date(f.down("[name=yeardata]").getValue() + "-" + f.down("[name=monthdata]").getValue() + "-1");
            var last_month = Ext.Date.add(periode, Ext.Date.MONTH, -1);
            var last_year = Ext.Date.add(periode, Ext.Date.YEAR, -1);

            var year = f.down("[name=yeardata]").getValue();
            var end_year = parseInt(year) - 1;
         

            var last_year_december = Ext.Date.add(new Date(f.down("[name=yeardata]").getValue() + '-12-01'), Ext.Date.YEAR, -1); 

            //header

            var reportFile = me.reportfile;
            //params["project_id"] = apps.project;
            var valueModels = f.down("[name=pt_id]").valueModels[0];
            params["pt_id"] = f.down("[name=pt_id]").getValue();
            params["project_id"] = valueModels.data.project_id;
            params["pt_name"] = me.getValueCombobox(me,"pt_id").value
            params["monthdata"] = f.down("[name=monthdata]").getValue();
            params["yeardata"] = f.down("[name=yeardata]").getValue();
            params["last_month"] = Ext.Date.format(last_month, 'M Y');
            params["current_month"] = Ext.Date.format(periode, 'M Y');
            params["last_year"] = Ext.Date.format(last_year, 'M Y');   
            params["last_year_december"] = Ext.Date.format(last_year_december, 'M Y');   
            params["tgl_sekarang"] = Ext.Date.format(new Date(), "d/m/Y");
            params["time_sekarang"] = Ext.Date.format(new Date(), "H:i:s");
            params["userprint"] = apps.username;
            params["end_year"] = 'Dec '+end_year;

            if(reporttype === undefined) {
                reporttype = 'VERSI 1';
                if (layouttype == true) {
                    reportFile = 'Balancesheetkp_potrait';
                }else{
                    reportFile = 'Balancesheetkp';
                }
            }else if(reporttype == 'VERSI 1'){
            	reporttype = 'VERSI 1';
                if (layouttype == true) {
                    reportFile = 'Balancesheetkp_potrait';
                }else{
                    reportFile = 'Balancesheetkp';
                }
            }else if(reporttype == 'VERSI 2'){
                reporttype = 'VERSI 2';
                if (layouttype == true) {
                    reportFile = 'BalancesheetkpV2_potrait';
                }else{
                    reportFile = 'BalancesheetkpV2';
                }
            }else if(reporttype == 'VERSI 3'){
                reporttype = 'VERSI 3';
                if (layouttype == true) {
                    reportFile = 'BalancesheetkpV3_potrait';
                }else{
                    reportFile = 'BalancesheetkpV3';
                }
            }else{
                reporttype = 'EXCEL';
            }

            if (me.getFormdata().getForm().isValid()) {
                resetTimer();
                if(reporttype=='VERSI 1' || reporttype=='VERSI 2' || reporttype=='VERSI 3'){
                    var html = me.ReportviewerV4(params, reportFile, win.id, 0);
                    win.down("#MyReportPanel_" + win.id).body.setHTML(html);
                    $("#Reportform_" + win.id).submit();
                }else if(reporttype == 'EXCEL'){
                     me.generateReportexcelthismonth(params);
                    return false;  
                }
            }else{
				console.log('inv');
			}

        }
    },
    generateReportexcelthismonth: function(params){       
         var me,report;
         me = this;  
         params['hideparam'] = 'generatereportexcelthismonth',
         me.senddata = params,
         me.urlrequest = 'cashier/balancesheetkp/create';
         Ext.getBody().mask("Please wait...");
         me.AjaxRequest();       
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

    loadCoabypt: function(newValue){

        var me = this;
        //storecoa = me.getStore('Coacombo');

    }

});