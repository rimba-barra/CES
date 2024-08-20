Ext.define('Cashier.controller.Cashflowconsolidation', {
    extend: 'Cashier.library.template.controller.Controllergl',
    alias: 'controller.Cashflowconsolidation',
    requires: [
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Coacomboboxgrid',
        'Cashier.library.template.combobox.Coagrid',
        //'Cashier.library.template.combobox.Ptcombobox',
        'Cashier.library.template.combobox.Levelcombobox',
        'Cashier.library.template.combobox.Monthcombobox',
        'Cashier.library.template.combobox.Yearcombobox',
        'Cashier.library.template.combobox.Ptprojectcombobox',
        'Cashier.library.template.combobox.Consolidationcombobox'
    ],
    
    views: [
        'cashflowconsolidation.Panel',
        'cashflowconsolidation.FormData'
    ],

    stores: [
        'Cashflowconsolidation',
        'Coacombo',
        'Pt',
        'Levelcombox',
        'Monthdata',
        'Consolidation'
    ],
    
    models: [
        'Cashflowconsolidation',
        'Coa',
        'Pt'
    ],

    refs: [
        {
            ref: 'formdata',
            selector: 'cashflowconsolidationformdata'
        },
        {
            ref: 'paneldata',
            selector: 'cashflowconsolidationpanel'
        }
    ],
    controllerName: 'cashflowconsolidation',
    fieldName: '',
    bindPrefixName: 'Cashflowconsolidation',
    reportfile: 'Cashflowconsolidation',
    urlprocess: 'cashier/cashflowconsolidation/create',
    stimulsoft: "resources/stimulsoft/index.php?stimulsoft_client_key=ViewerFx&stimulsoft_report_key=",
    yeardata: null, paramsStr: null, win: null, params: null, dateNow: new Date(), html: null, winId: 'myReportWindow',
    project_name: null, pt_name: null, userprint: null, urlrequest: null, senddata: null, info: null, form: null,
    cluster:null,arraydata:null,value:null,
    
    fromcoa:null,untilcoa:null,detailtype:null,detaildesc:null,headertype:null,headerdesc:null,
    periode:null,fromdate:null,untildate:null,
    init: function (application) {
        var me = this;
        this.control({
            'cashflowconsolidationpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setHeight(270);
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setWidth(600);
                    me.panelAfterRender();
                }
            },
            'cashflowconsolidationformdata': {
                afterrender: function (panel) {
                    this.formDataAfterRenderCustome();

                }
            },
            'cashflowconsolidationformdata [name=from_coa_id] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                    value = me.getFormdata().down("[name=from_coa_id]").getRawValue();
                    this.autocompletecombo(value);
                },
                
            },
            'cashflowconsolidationformdata [name=until_coa_id] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                    value = me.getFormdata().down("[name=until_coa_id]").getRawValue();
                    this.autocompletecombo(value);
                },
            },
            'cashflowconsolidationformdata button[action=submit]': {
                click: function () {
                   this.processReport();
                }
            },
            'cashflowconsolidationformdata [name=pt_id]': {
                change: function (the, newValue, oldValue, eOpts) {
                    this.loadCoabypt(newValue);
                }
            },
            'cashflowconsolidationformdata [name=consolidation_id]': {
                select: function (el) {
                    var form = me.getFormdata();
                    if(typeof form.down('[name=consolidation_id]').valueModels[0] !== "undefined")
                    {
                        rowdata = form.down('[name=consolidation_id]').valueModels[0]['raw'];
                        form.down('[name=pt_id]').setValue(rowdata.pt_idref);
                    }               
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
        me.report = 'Cashflowconsolidation';       
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
            url: 'cashier/cashflowconsolidation/read',
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
        

        storept = me.getStore('Pt');
        storeconsol = me.getStore('Consolidation');

        Ext.Ajax.request({
            url: 'cashier/cashflowconsolidation/read',
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

        Ext.Ajax.request({
            url: 'cashier/incomestatementconsolidation/read',
            success: function (response) {
                var info = Ext.JSON.decode(response.responseText);

                storeconsol.load({
                    params: {
                        "hideparam": 'consolidation',
                        "user_id": apps.uid,
                        "start": 0,
                        "limit": 1000000 
                    },
                    callback: function (records, operation, success) {
                        if (records[0]) {
                            
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
		me.setValue(me, 'monthdatafrom', 1);
        me.setValue(me, 'monthdatauntil', me.dateNow.getMonth() + 1);

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
        var params = me.getFormdata().getForm().getFieldValues();
        
        if (!f.getForm().isValid()) {
            Ext.Msg.show({
                title: 'Warning',
                msg: 'Form masih ada yang kosong, pastikan tidak ada yang kosong.',
                icon: Ext.Msg.WARNING,
                buttons: Ext.Msg.OK,
                fn: function () {
                    return;
                }
            });
            return;
        }

        // reporttype = params.reporttype[1];
        
        if(reporttype===null){
            reporttype='DEFAULT';
        }
        
        if(reporttype=='DEFAULT'){
            me.instantWindowWithMinimize('Panel', 800, title, 'state-report', winId, me.controllerName);
        }else if(reporttype=='ELIMINASI-ALL'){
            me.instantWindowWithMinimize('Panel', 800, title, 'state-report', winId, me.controllerName);
        }else{
            return;
        }

        
        var paramsStr = me.generateReportParams(me.getFormdata().getForm().getFieldValues());
        var win = desktop.getWindow(winId);

        if (true) {
            var params = me.getFormdata().getForm().getFieldValues();
            //header

            var reportFile = me.reportfile;
            params["consolidation_id"]   = f.down("[name=consolidation_id]").getValue();
            params["pt_id"]              = f.down("[name=pt_id]").getValue();
            params["pt_name"]            = me.getValueCombobox(me,"pt_id").value
            params["monthdatafrom"]      = f.down("[name=monthdatafrom]").getValue();
            params["monthdatauntil"]     = f.down("[name=monthdatauntil]").getValue();
            params["yeardata"]           = f.down("[name=yeardata]").getValue();
            params["monthdatafrom_raw"]  = f.down("[name=monthdatafrom]").getRawValue();
            params["monthdatauntil_raw"] = f.down("[name=monthdatauntil]").getRawValue();

            var today = new Date();
            var dd    = String(today.getDate()).padStart(2, '0');
            var mm    = String(today.getMonth() + 1).padStart(2, '0');  //January is 0!
            var yyyy  = today.getFullYear();

            today                  = mm + '/' + dd + '/' + yyyy;
            params["tgl_sekarang"] = today;
            
            var csid = f.down('[name=consolidation_id]').valueModels.length;

            if(csid>0){
                rowdata = f.down('[name=consolidation_id]').valueModels[0]['raw'];
                params["consolidation_name"] = rowdata.group_consolidation;
            }else{
                params["consolidation_name"] = reporttype;
            }

            //additional
            
            if(reporttype === undefined) {
                reporttype = 'DEFAULT';
            }

            
            if(reporttype=='DEFAULT'){
                reportFile = 'Reportcashflowconsolidation';
            }else if(reporttype=='ELIMINASI-ALL'){
                reportFile = 'Reportcashflowconsolidation_eliminasiall';
            }


            if (me.getFormdata().getForm().isValid()) {
                //Ext.getBody().mask("Please wait...");
                resetTimer();
                //params["department_id"] = f.down("[name=department_department_id]").getValue();
                var html = me.ReportviewerV4(params, reportFile, win.id, 0); //whole report
                win.down("#MyReportPanel_" + win.id).body.setHTML(html);
                $("#Reportform_" + win.id).submit();
                 
               // me.arrayData();
               // me.submitReport();
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
         me.urlrequest = 'cashier/cashflowconsolidation/create';
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