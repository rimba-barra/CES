Ext.define('Cashier.controller.Trialbalanceb', {
    extend: 'Cashier.library.template.controller.Controllergl',
    alias: 'controller.Trialbalanceb',
    requires: [
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Coacomboboxgrid',
        'Cashier.library.template.combobox.Coagrid',
        'Cashier.library.template.combobox.Ptprojectcombobox'
    ],
    
    views: [
        'trialbalanceb.Panel',
        'trialbalanceb.FormData'
    ],

    stores: [
        'Trialbalanceb',
        'Coacombo',
        'Pt'
    ],
    
    models: [
        'Trialbalanceb',
        'Coa',
        'Pt'
    ],

    refs: [
        {
            ref: 'formdata',
            selector: 'trialbalancebformdata'
        },
        {
            ref: 'paneldata',
            selector: 'trialbalancebpanel'
        }
    ],
    controllerName: 'trialbalanceb',
    fieldName: '',
    bindPrefixName: 'Trialbalanceb',
    reportfile: 'Trialbalanceb',
    urlprocess: 'cashier/trialbalanceb/create',
    stimulsoft: "resources/stimulsoft/index.php?stimulsoft_client_key=ViewerFx&stimulsoft_report_key=",
    yeardata: null, paramsStr: null, win: null, params: null, dateNow: new Date(), html: null, winId: 'myReportWindow',
    project_name: null, pt_name: null, userprint: null, urlrequest: null, senddata: null, info: null, form: null,
    cluster:null,arraydata:null,value:null,
    
    fromcoa:null,untilcoa:null,detailtype:null,detaildesc:null,headertype:null,headerdesc:null,mergebanktype:0,
    periode:null,fromdate:null,untildate:null,
    getMe: function(){
       var me = this;
       return _Apps.getController(me.bindPrefixName);
    },
    init: function (application) {
        var me = this.getMe();
        var events = new Cashier.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        me.tools = new Cashier.library.box.tools.Tools({config: me.myConfig});
        this.control({
            'trialbalancebpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setHeight(400);
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setWidth(600);
                    me.panelAfterRender();
                }
            },
            'trialbalancebformdata': {
                afterrender: function (panel) {
                    this.formDataAfterRenderCustome();

                },
                boxready: function() {
                    var me = this.getMe();

                    $("#trialbalancebID input[name='from_coa_id']").keyup(function()
                    {
                        this.value = this.value.replace(/(\d{2})(\d{2})/,'$1'+'.'+'$2')
                    });

                    $("#trialbalancebID input[name='until_coa_id']").keyup(function()
                    {
                        this.value = this.value.replace(/(\d{2})(\d{2})/,'$1'+'.'+'$2')
                    });
                }
            },
            'trialbalancebformdata [name=from_coa_id] ': {
                'keyup': function () {
                    var me, value;
                    me = this.getMe();
                    value = me.getFormdata().down("[name=from_coa_id]").getRawValue();
                    this.autocompletecombo(value);
                },
                
            },
            'trialbalancebformdata [name=until_coa_id] ': {
                'keyup': function () {
                    var me, value;
                    me = this.getMe();
                    value = me.getFormdata().down("[name=until_coa_id]").getRawValue();
                    this.autocompletecombo(value);
                },
            },
            'trialbalancebformdata button[action=submit]': {
                click: function () {
                   this.processReportAsk();
                }
            },
            'trialbalancebformdata [name=pt_id]': {
                change: function (el) {
                    var f = this.getFormdata()
                    var v = f.down('[name=pt_id]').getValue();
                    if (f.down("[name=pt_id]").valueModels != null) {
                        var valueModels = f.down("[name=pt_id]").valueModels[0];
                        f.down('[name=from_coa_id]').setValue();
                        f.down('[name=until_coa_id]').setValue();
                        this.loadCoabypt(valueModels.data.pt_id);
                    }
                }
            },
        });
    },
    autocompletecombo: function (value) {
        var me, storecoa, value;
        me = this.getMe();
        storecoa = me.getStore('Coacombo');
        storecoa.clearFilter();
        storecoa.filter('coa', value);
    },
    arrayData: function () {
        var me;
        me = this.getMe();
        
        me.value = me.form.getValues();
        me.value["project_name"] = me.project_name;
        me.value["pt_name"] = me.pt_name;
        me.value["userprint"] = me.userprint;
        me.value["tgl_sekarang"] = Ext.Date.format(new Date(), 'd/m/Y');
        me.value["time_sekarang"] = Ext.Date.format(new Date(), 'H:i:s');
        me.value["project_id"] = apps.project;
        me.value["pt_id"] = apps.pt;
        me.value["userprint"] = apps.username;

        me.value["detaildesc"] = me.arraydata.detaildesc;
        me.value["headerdesc"] = me.arraydata.headerdesc;
        me.value["periode"] = me.arraydata.fromdate+' to '+me.arraydata.untildate;
        me.value["filtercoa"] = me.arraydata.fromcoa+' to '+me.arraydata.untilcoa;
        me.value["cluster"] = me.cluster;
    },
    createWindows: function () {
        var me = this.getMe();
        me.instantWindow('Panel', 800, 'Result ', 'state-report', me.winId, 'masterreport');
        me.paramsStr = me.generateReportParams(me.getFormdata().getForm().getFieldValues());
        me.win = desktop.getWindow(me.winId);
    },
    submitReport: function () {
        var me = this.getMe();
        me.report = 'Trialbalanceb';       
        me.html = me.generateFakeForm(me.value, me.report);
        me.win.down("#MyReportPanel").body.setHTML(me.html);
        $("#fakeReportFormID").submit();
        Ext.getBody().unmask();
    },

    showReport: function () {
        var me;
        me = this.getMe();       
        me.form = me.getFormdata().getForm();  
        val = me.form.getValues();
        reporttype = val.reporttype[1];
        if(reporttype === undefined) {
            reporttype = 'DEFAULT';
        }

        if (me.form.isValid()) {
            Ext.getBody().mask("Please wait...");
            resetTimer();
            me.setupData();
            if(reporttype=='DEFAULT'){
                me.generateReport(); 
            }
            if(reporttype=='EXCEL' || reporttype=='EXCEL-2'){
                me.generateReportexcelthismonth();  
            }
             
           // me.arrayData();
           // me.submitReport();
        }
        Ext.getBody().unmask();
    },

    setupData:function(){
       var me,returndata,headerdesc,detaildesc,headertype,detailtype,tb_detailyes,tb_detailno,tb_headeryes,tb_headerno,
               fromcoa,untilcoa,fromdate,untildate;
       me = this.getMe();     
       tb_detailyes = me.getValueRadio(me,"#tb_detailyes");
       tb_detailno = me.getValueRadio(me,"#tb_detailno");
       tb_headeryes  = me.getValueRadio(me,"#tb_headeryes");
       tb_headerno = me.getValueRadio(me,"#tb_headerno");
       fromcoa = me.getValueCombobox(me,"from_coa_id");
       untilcoa = me.getValueCombobox(me,"until_coa_id");       
       fromdate = me.getValueCombobox(me,"fromdate");
       untildate = me.getValueCombobox(me,"untildate");  


       if(tb_headeryes==true && tb_headerno==false) {
           headertype ='1'; 
           headerdesc ='With Header'; 
       }else if(tb_headeryes==false && tb_headerno==true){
           headertype ='2'; 
           headerdesc ='Without Header'; 
       }
       
       if(tb_detailyes==true && tb_detailno==false) {
           detailtype ='1'; 
           detaildesc ='With Detail'; 
       }else if(tb_detailyes==false && tb_detailno==true){
           detailtype ='2'; 
           detaildesc ='Without Detail'; 
       } 
       

       returndata = {
           "headertype":headertype,
           "headerdesc":headerdesc,
           "detailtype":detailtype,
           "detaildesc":detaildesc,
           "fromcoa":fromcoa.value,
           "untilcoa":untilcoa.value,
           "fromdate":fromdate.value,
           "untildate":untildate.value,
       }
       
       me.arraydata = returndata;
    },
    
    generateReport: function(){       
         var me,report;
         me = this.getMe();  
         me.arraydata['hideparam'] ='generatereport';
         me.senddata = me.arraydata;
         me.urlrequest = me.urlprocess;
         Ext.getBody().mask("Please wait...");
         me.AjaxRequest();     
    },    
    generateReportexcelthismonth: function(params){       
         var me,report;
         me = this.getMe();  
         params['hideparam'] = 'generatereportexcelthismonth',
         me.senddata = params,
         me.urlrequest = 'cashier/trialbalanceb/create';
         Ext.getBody().mask("Please wait...");
         me.AjaxRequest();       
    },
    panelAfterRender: function () {
        var me = this.getMe();
        var f = me.getFormdata();
        Ext.Ajax.request({
            url: 'cashier/trialbalanceb/read',
            success: function (data) {
                 try {
                    var info = Ext.JSON.decode(data.responseText);
                    var item = info.pt[0];
                    store = f.down('[name=pt_id]').getStore("ptstore");
                    store.removeAll();
                    store.clearFilter();
                    var currentmultiprojectdetail_id = 0;
                    for (let i = 0; i < item.length; i++) {
                        if (apps.pt == item[i].pt_id && apps.project == item[i].project_project_id) {
                            currentmultiprojectdetail_id = item[i].multiprojectdetail_id;
                        }

                        store.add({
                            multiprojectdetail_id : item[i].multiprojectdetail_id, 
                            pt_id: item[i].pt_id, 
                            code: item[i].code,
                            name: item[i].name,
                            project_name: item[i].project_name,
                            project_project_id: item[i].project_project_id
                        });
                    }
                    me.project_name = info.project_name;
                    me.pt_name = info.pt_name;
                    me.userprint = info.userprint;

                    f.down('[name=pt_id]').setValue(currentmultiprojectdetail_id);
                } catch (err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to generate init.");
                }

                
            },
        });
    },
    formDataAfterRenderCustome: function () {
        var me, storecoa = '', storept = '';
        me = this.getMe();
        me.defaultRange();
        var f = me.getFormdata();

        //Auto recalculate
        f.down("[name=recalculatetb]").setValue(true);
        
        storecoa = me.getStore('Coacombo');
        storecoa.load({
            params: {
                "hideparam": 'coagrid',
                "start": 0,
                "limit": 1000000,
            },
            callback: function (records, operation, success) {
                if (records[0]) {
                    var row = records[0]['data'];
                    me.setValueCombobox(me, 'from_coa_id', row.coa_id,row.coa);
                    me.setValueCombobox(me, 'until_coa_id', row.coa_id,row.coa);
                }

            }
        });
        // var value = selectedModel.get(valueField);
        // v.setValue(value);

    },
    defaultRange: function () {
        var me = '';
        me = this.getMe();
        me.senddata = {
            hideparam: 'defaultrange'
        }
        me.urlrequest = 'cashier/dailytransaction/create';
        me.AjaxRequest();
    },
    AjaxRequest: function () {
        var me;
        me = this.getMe();
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
        var me = this.getMe();
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
            me.setValue(me, 'fromdate', me.formatDate(firstDay));
            me.setValue(me, 'untildate', me.formatDate(lastDay));
            
            me.yeardata = me.info.data.yeardb;
            me.yeardata = '2001';
            form.down("[name=fromdate]").setMinValue(me.yeardata + '-01-01');
            //form.down("[name=fromdate]").setMaxValue(me.info.data.enddecember);
            form.down("[name=untildate]").setMinValue(me.yeardata + '-01-01');
            //form.down("[name=untildate]").setMaxValue(me.info.data.enddecember);
        } else if (me.info.parameter == 'default') {
            Ext.getBody().unmask();
        }else if (me.info.parameter == 'generatereport') {
            Ext.getBody().unmask();
            me.cluster = me.info.data.cluster;
            me.createWindows();   
            me.arrayData();
            me.submitReport();           
        }else if (me.info.parameter == 'generatereportexcelthismonth') {
            Ext.getBody().unmask();
            var file_path = me.info.data.url;  

            if (file_path === undefined) {
                Ext.Msg.show({
                    title: 'Error',
                    msg: 'Generate report failed.',
                    icon: Ext.Msg.INFO,
                    buttons: Ext.Msg.ERROR,
                    fn: function () {
                        me.formDataClose();
                    }
                });
            } else {
                var a = document.createElement('A');
                a.href = file_path;
                a.download = file_path.substr(file_path.lastIndexOf('/') + 1);
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                Ext.getBody().unmask();
            }
        }
    },
    monthDiff: function(d1, d2) {
        var months;
        months = (d2.getFullYear() - d1.getFullYear()) * 12;
        months -= d1.getMonth() + 1;
        months += d2.getMonth();
        return (months <= 0 ? 0 : months)+1;
    },
    processReportAsk: function () {
        var me = this.getMe();
        var winId = 'myReportWindow';

        var paramsStr = me.generateReportParams(me.getFormdata().getForm().getFieldValues());
        var win = desktop.getWindow(winId);
        var f = me.getFormdata();
        var reporttype = f.down("[name=reporttype]").getValue();
        var recalculatetb = f.down("[name=recalculatetb]").getValue();
        var fromdate = f.down("[name=fromdate]").getValue();
        var untildate = f.down("[name=untildate]").getValue();

        var diff = me.monthDiff(fromdate,untildate);
        
        //jika di ceklist maka akan recalculate TB
        if(recalculatetb){
            if(diff >= 13){
                me.buildWarningAlert("Proses Recalculate, Tidak boleh lebih dari 12 bulan");
                return 0;
            }
            me.dataSubmit();
        }else{
            me.processReport();
        }
    },
    processReport: function () {
        var me = this.getMe();
        var winId = me.controllerName + '_' + Ext.Date.format(new Date(), 'His');
        var title = 'Result ' + me.getFormdata().up('window').title;
 
        var paramsStr = me.generateReportParams(me.getFormdata().getForm().getFieldValues());
        var win = desktop.getWindow(winId);
        var f = me.getFormdata();
        var reporttype = f.down("[name=reporttype]").getValue();
        var recalculatetb = f.down("[name=recalculatetb]").getValue();

        if(reporttype=='DEFAULT'){
            me.instantWindowWithMinimize('Panel', 1000, title, 'state-report', winId, me.controllerName);
        }else if(reporttype=='EXCEL' || reporttype=='EXCEL-2'){
            
        }else{
            me.instantWindowWithMinimize('Panel', 1000, title, 'state-report', winId, me.controllerName);
        }

        
        var paramsStr = me.generateReportParams(me.getFormdata().getForm().getFieldValues());
        var win = desktop.getWindow(winId);
        var valueModels = f.down("[name=pt_id]").valueModels[0];
        
        if (true) {
            var params = me.getFormdata().getForm().getFieldValues();
            var dateNow = new Date();
            //header

            var reportFile = me.reportfile;
            //params["project_id"] = apps.project;

            params["pt_id"] = valueModels.data.pt_id;
            params["project_id"] = valueModels.data.project_project_id;
            params["pt_name"] = me.getValueCombobox(me,"pt_id").value;
            params["coastart_id"] = f.down("[name=from_coa_id]").getValue();
            params["coaend_id"] = f.down("[name=until_coa_id]").getValue();
            params["projectname"] = valueModels.data.projectname;
            params["ptname"] = valueModels.data.pt_name;
            params['tgl_sekarang'] = Ext.Date.format(new Date(), 'd/m/Y');
            params['time_sekarang'] = Ext.Date.format(new Date(), 'H:i:s');
            params['userprint'] = apps.username;

            //additional

           var tb_detailyes = me.getValueRadio(me,"#tb_detailyes");
           var tb_detailno = me.getValueRadio(me,"#tb_detailno");
           var tb_headeryes  = me.getValueRadio(me,"#tb_headeryes");
           var tb_headerno = me.getValueRadio(me,"#tb_headerno");
           var template01 = me.getValueRadio(me,"#template01");
           var template02 = me.getValueRadio(me,"#template02");
           var template03 = me.getValueRadio(me,"#template03");
           var sort01 = me.getValueRadio(me,"#sort01");
           var sort02 = me.getValueRadio(me,"#sort02");
           var subyes = me.getValueRadio(me,"#subyes");
           var subno = me.getValueRadio(me,"#subno");
           var mergebankyes = me.getValueRadio(me,"#mergebank2");
            var mergebankno = me.getValueRadio(me,"#mergebank1");

            if(mergebankyes == false){
                mergebanktype = 1;
            }else{
                mergebanktype = 2;
            }


          

           if(template02==true){
                reportFile = 'Trialbalanceb01';
            }

            if(sort01==true){
                sorttype = '1';
            }
            if(sort02==true){
                sorttype = '0';
            }

            if(tb_headerno==true){
                headertype ='2'; 
                headerdesc ='Without Header'; 
                reportFile = 'Trialbalanceb02';
            }

            if(tb_headeryes==true && tb_headerno==false) {
                headertype ='1'; 
                headerdesc ='With Header'; 
            }else if(tb_headeryes==false && tb_headerno==true){
                headertype ='2'; 
                headerdesc ='Without Header'; 
                reportFile = 'Trialbalanceb02';
            }

            if(tb_detailyes==true && tb_detailno==false) {
                detailtype ='1'; 
                detaildesc ='With Detail'; 
            }else if(tb_detailyes==false && tb_detailno==true){
                detailtype ='2'; 
                detaildesc ='Without Detail'; 
            }
        
            if(subyes==true && subno==false) {
                detailtype ='3'; 
                detaildesc ='With Detail With Sub'; 
            }

            if(headertype=='2' && detailtype=='2'){
                reportFile = 'Trialbalanceb02';
            }
    
            if(headertype=='1' && detailtype=='2'){
                reportFile = 'Trialbalanceb02';
            }

            if(detailtype=='1'){
                reportFile = 'Trialbalanceb01';
            }
            if(template01==true){
                reportFile = 'Trialbalanceb';
            }

            if (template03 == true) {
                reportFile = 'Trialnotbalance';
            }
       

            params["fromdate"] = me.formatDate(f.down("[name=fromdate]").getValue());
            params["untildate"] = me.formatDate(f.down("[name=untildate]").getValue());
            params["tanggal"] = params["fromdate"] + ' s/d ' + params["untildate"];
            params["headertype"] = headertype;
            params["headerdesc"] = headerdesc;
            params["detailtype"] = detailtype;
            params["detaildesc"] = detaildesc;
            params["sorttype"] = sorttype;
            params["mergebank"] = mergebanktype;
            var dy = new Date(params["fromdate"]);
            params["tahun"] = dy.getFullYear();
            params["print_name"] = 'USER : '+me.userprint;
            params["report_alias"] = 'TB-'+me.getValueCombobox(me,"pt_id").value+'_'+params["fromdate"]+'_'+ params["untildate"];

            if(reporttype === undefined) {
                reporttype = 'DEFAULT';
            }

            if (me.getFormdata().getForm().isValid()) {
                //Ext.getBody().mask("Please wait...");
                resetTimer();
                if(reporttype=='DEFAULT'){
                    //params["department_id"] = f.down("[name=department_department_id]").getValue();
                    var html = me.ReportviewerV4(params, reportFile, win.id, 1); //whole report
                    win.down("#MyReportPanel_" + win.id).body.setHTML(html);
                    $("#Reportform_" + win.id).submit();
                }
                if(reporttype=='EXCEL' || reporttype=='EXCEL-2'){
                    me.generateReportexcelthismonth(params);
                    return false;  
                }
                 
               // me.arrayData();
               // me.submitReport();
            }

        }
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
        var me = this.getMe();
        var f = me.getFormdata();

        var valueModels = f.down("[name=pt_id]").valueModels[0];

        var me = this.getMe();
        storecoa = me.getStore('Coacombo');
        storecoa.load({
            params: {
                "hideparam": 'coagridbyuserpt',
                "start": 0,
                "limit": 1000000,
                "pt_id_owner": newValue,
                "project_id": valueModels.data.project_project_id
            },
            callback: function (records, operation, success) {
                if (records[0]) {
                    var row = records[0]['data'];
                    me.setValueCombobox(me, 'from_coa_id', row.coa_id,row.coa);
                    me.setValueCombobox(me, 'until_coa_id', row.coa_id,row.coa);
                }
                
                records.forEach(function(entry) {
                    var row = entry.data;
                    if(row.coa=='10.00.000'){
                        me.setValueCombobox(me, 'from_coa_id', row.coa_id,row.coa);
                    }
                    if(row.coa=='90.00.000'){
                        me.setValueCombobox(me, 'until_coa_id', row.coa_id,row.coa);
                    }
                });
            }
        });

    },
    dataSubmit: function () {
        var me;
        me = this.getMe();
        me.dataSubmitJournal();
        /*
        Ext.MessageBox.confirm(
            'Confirm', 'Are you sure you want to do this? It will take longer.', callbackFunction);
         function callbackFunction(btn) {
            if(btn == 'yes') {
                me.dataSubmitJournal();
            } else {
                
            }
         };
         */
    },
    dataSubmitJournal: function (){
        var me,datapost;
        me = this.getMe();
        var p = me.getFormdata();
        me.form = me.getFormdata().getForm();
        me.value = me.form.getValues();

        var valueModels = p.down("[name=pt_id]").valueModels[0];
        var pt_id = valueModels.data.pt_id;
        var project_id = valueModels.data.project_project_id;

        //kembalikan
        //p.down("[name=recalculatetb]").setValue(false);
        var tipeposting = 'Journal';
        if (me.form.isValid()) {
        Ext.getBody().mask("Please wait, Recalculating...");
            //resetTimer();
            datapost = {
                fromdate: me.value.fromdate,
                untildate: me.value.untildate,
                projectpt_id: 0,
                pt_id: pt_id,
                project_id: project_id,
                tipeposting: tipeposting,
                tgl_sekarang: Ext.Date.format(new Date(), 'd/m/Y'),
                time_sekarang: Ext.Date.format(new Date(), 'H:i:s'),
                userprint: apps.username
            }
            Ext.Ajax.request({
                url: 'cashier/prosesposting/update',
                method: 'POST',
                timeout:100000000,  
                async: false ,
                params: {
                    data: Ext.encode(datapost)
                },
                success: function (responses) {
                    Ext.getBody().unmask();
                    me.processReport();
                },
                failure: function (responses) {
                }
            });
        }
    },

});