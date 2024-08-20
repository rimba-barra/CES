Ext.define('Cashier.controller.Departmentexpense', {
    extend: 'Cashier.library.template.controller.Controllergl',
    alias: 'controller.Departmentexpense',
    requires: [
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Coacomboboxgrid',
        'Cashier.library.template.combobox.Coagrid',
        'Cashier.library.template.combobox.Ptprojectcombobox',
        'Cashier.library.template.combobox.Departmentbyusercombobox',
        'Cashier.library.template.combobox.Projectptcombobox'
    ],
    
    views: [
        'departmentexpense.Panel',
        'departmentexpense.FormData'
    ],

    stores: [
        'Departmentexpense',
        'Coacombo',
        'Pt',
        'Departmentbyuser',
        'Projectpt'
    ],
    
    models: [
        'Departmentexpense',
        'Coa',
        'Pt',
        'Projectpt'
    ],

    refs: [
        {
            ref: 'formdata',
            selector: 'departmentexpenseformdata'
        },
        {
            ref: 'paneldata',
            selector: 'departmentexpensepanel'
        }
    ],
    controllerName: 'departmentexpense',
    fieldName: '',
    bindPrefixName: 'Departmentexpense',
    reportfile: 'Departmentexpense',
    urlprocess: 'cashier/departmentexpense/create',
    stimulsoft: "resources/stimulsoft/index.php?stimulsoft_client_key=ViewerFx&stimulsoft_report_key=",
    yeardata: null, paramsStr: null, win: null, params: null, dateNow: new Date(), html: null, winId: 'myReportWindow',
    project_name: null, pt_name: null, userprint: null, urlrequest: null, senddata: null, info: null, form: null,
    cluster:null,arraydata:null,value:null,
    
    fromcoa:null,untilcoa:null,detailtype:null,detaildesc:null,headertype:null,headerdesc:null,
    periode:null,fromdate:null,untildate:null,projectpt_id:null,project_id:null,pt_id:null,
    getMe: function(){
       var me = this;
       return _Apps.getController(me.bindPrefixName);
    },
    init: function (application) {
        var me = this.getMe();
        this.control({
            'departmentexpensepanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setHeight(350);
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setWidth(600);
                    me.panelAfterRender();
                }
            },
            'departmentexpenseformdata': {
                afterrender: function (panel) {
                    this.formDataAfterRenderCustome();

                },
                boxready: function() {
                    var me = this.getMe();

                    $("#departmentexpenseID input[name='from_coa_id']").keyup(function()
                    {
                        this.value = this.value.replace(/(\d{2})(\d{2})/,'$1'+'.'+'$2')
                    });

                    $("#departmentexpenseID input[name='until_coa_id']").keyup(function()
                    {
                        this.value = this.value.replace(/(\d{2})(\d{2})/,'$1'+'.'+'$2')
                    });
                }
            },
            'departmentexpenseformdata [name=from_coa_id] ': {
                'keyup': function () {
                    var me, value;
                    me = this.getMe();
                    value = me.getFormdata().down("[name=from_coa_id]").getRawValue();
                    this.autocompletecombo(value);
                },
                
            },
            'departmentexpenseformdata [name=until_coa_id] ': {
                'keyup': function () {
                    var me, value;
                    me = this.getMe();
                    value = me.getFormdata().down("[name=until_coa_id]").getRawValue();
                    this.autocompletecombo(value);
                },
            },
            'departmentexpenseformdata button[action=submit]': {
                click: function () {
                   this.processReportAsk();
                }
            },
            'departmentexpenseformdata [name=pt_id]': {
                change: function (el) {
					me.setprojectpt(el.name, el.ownerCt);
                    this.loadCoabypt(el.value);
                    me.loadDataDepartment(el.value);
                }
            },
            'departmentexpenseformdata [name=department_id]': {
                change: function (el) {
                    var me, value;
                    me = this.getMe();
                    if(el.value > 0){
                        me.getFormdata().down("[name=all_dept]").setValue(false);
                    }
                }
            },
            'departmentexpenseformdata [name=all_dept]': {
                change: function (el) {
                    var me, value;
                    me = this.getMe();
                    if(el.value > 0){
                        me.getFormdata().down("[name=department_id]").setValue(0);
                    }else{
                        var recordSelected = me.getFormdata().down("[name=department_id]").getStore().getAt(0);                     
                        me.getFormdata().down("[name=department_id]").setValue(recordSelected.get('department_id'));
                    }
                }
            }
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
        me.value["tgl_sekarang"] = me.dateNow.getDate() + "-" + (me.dateNow.getMonth() + 1) + "-" + me.dateNow.getFullYear();
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
        var me = this.getMe();
        me.instantWindow('Panel', 800, 'Result ', 'state-report', me.winId, 'masterreport');
        me.paramsStr = me.generateReportParams(me.getFormdata().getForm().getFieldValues());
        me.win = desktop.getWindow(me.winId);
    },
    submitReport: function () {
        var me = this.getMe();
        me.report = 'Departmentexpense';       
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
            if(reporttype=='EXCEL'){
                me.generateReportexcelthismonth();  
            }
             
           // me.arrayData();
           // me.submitReport();
        }
        Ext.getBody().unmask();
    },

    setupData:function(){
       var me,returndata,headerdesc,detaildesc,headertype,detailtype,tb_detailyes,tb_detailno,type_expense,type_dept,
               fromcoa,untilcoa,fromdate,untildate;
       me = this.getMe();     
       tb_detailyes = me.getValueRadio(me,"#tb_detailyes");
       tb_detailno = me.getValueRadio(me,"#tb_detailno");
       type_expense  = me.getValueRadio(me,"#type_expense");
       type_dept = me.getValueRadio(me,"#type_dept");
       fromcoa = me.getValueCombobox(me,"from_coa_id");
       untilcoa = me.getValueCombobox(me,"until_coa_id");       
       fromdate = me.getValueCombobox(me,"fromdate");
       untildate = me.getValueCombobox(me,"untildate");  
       
       headertype ='1'; 
       headerdesc ='With Header'; 
       detailtype ='1'; 
       detaildesc ='With Detail'; 
       
       if(type_expense==true && type_dept==false) {
           headertype ='2'; 
           headerdesc ='With Header'; 
       }else if(type_expense==false && type_dept==true){
           headertype ='1'; 
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
         me.urlrequest = 'cashier/departmentexpense/create';
         Ext.getBody().mask("Please wait...");
         me.AjaxRequest();       
    },  
    panelAfterRender: function () {
        var me = this.getMe();
        Ext.Ajax.request({
            url: 'cashier/departmentexpense/read',
            success: function (response) {
                var info = Ext.JSON.decode(response.responseText);
                console.log(info);
                me.projectpt_id = info.projectpt_id;
                me.project_id = info.project_id;
                me.project_name = info.project_name;
                me.pt_id = info.pt_id;
                me.pt_name = info.pt_name;
                me.userprint = info.userprint;
            },
        });
    },
    formDataAfterRenderCustome: function () {
        var me, storecoa = '', storept = '';
        me = this.getMe();
        me.defaultRange();
        var f = me.getFormdata();

        //Auto recalculate
        f.down("[name=all_dept]").setValue(true);
        
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

        storept = me.getStore('Projectpt');

        Ext.Ajax.request({
            url: 'cashier/departmentexpense/read',
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
            var a = document.createElement('A');
            a.href = file_path;
            a.download = file_path.substr(file_path.lastIndexOf('/') + 1);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            Ext.getBody().unmask();
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
        var all_dept = f.down("[name=all_dept]").getValue();
        var fromdate = f.down("[name=fromdate]").getValue();
        var untildate = f.down("[name=untildate]").getValue();

        var diff = me.monthDiff(fromdate,untildate);
        
        //jika di ceklist maka akan recalculate TB
        if(all_dept){
            if(diff >= 13){
                //me.buildWarningAlert("Proses Recalculate, Tidak boleh lebih dari 12 bulan");
                //return 0;
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
        var all_dept = f.down("[name=all_dept]").getValue();

        if(reporttype=='DEFAULT'){
            me.instantWindowWithMinimize('Panel', 1000, title, 'state-report', winId, me.controllerName);
        }else if(reporttype=='EXCEL'){
            
        }else{
            me.instantWindowWithMinimize('Panel', 1000, title, 'state-report', winId, me.controllerName);
        }

        
        var paramsStr = me.generateReportParams(me.getFormdata().getForm().getFieldValues());
        var win = desktop.getWindow(winId);
        var valueModels = f.down("[name=pt_id]").valueModels[0];
        var valueModelsDept = f.down("[name=department_id]").valueModels[0];
        
        if (true) {
            var params = me.getFormdata().getForm().getFieldValues();
            var dateNow = new Date();
            //header

            var reportFile = me.reportfile;
            //params["project_id"] = apps.project;

            params["pt_id"] = f.down("[name=pt_id]").getValue();
            params["project_id"] = valueModels.data.project_id;
            params["pt_name"] = me.getValueCombobox(me,"pt_id").value;
            params["coastart_id"] = f.down("[name=from_coa_id]").getValue();
            params["coaend_id"] = f.down("[name=until_coa_id]").getValue();
            params["department_id"] = f.down("[name=department_id]").getValue();
            params["projectname"] = valueModels.data.projectname;
            params["ptname"] = valueModels.data.pt_name;
            if(all_dept==true){
                params["department"] = "All";
                params["department_id"] = 0;
            }else{
                params["department"] = valueModelsDept.data.department;
            }
            
            params['tgl_sekarang'] = me.dateNow.getDate() + "-" + (me.dateNow.getMonth() + 1) + "-" + me.dateNow.getFullYear();
            params['time_sekarang'] = me.dateNow.getHours() + ":" + me.dateNow.getMinutes() + ":" + me.dateNow.getSeconds();

            //additional

           var tb_detailyes = me.getValueRadio(me,"#tb_detailyes");
           var tb_detailno = me.getValueRadio(me,"#tb_detailno");
           var type_expense  = me.getValueRadio(me,"#type_expense");
           var type_dept = me.getValueRadio(me,"#type_dept");
           var template01 = me.getValueRadio(me,"#template01");
           var template02 = me.getValueRadio(me,"#template02");
           var template03 = me.getValueRadio(me,"#template03");
           var sort01 = me.getValueRadio(me,"#sort01");
           var sort02 = me.getValueRadio(me,"#sort02");
           var subyes = me.getValueRadio(me,"#subyes");
           var subno = me.getValueRadio(me,"#subno");

           if(params["department_id"]==null){
                params["department_id"] = 0;
           }

           if(type_expense==true){
            reportFile = 'Departmentexpense02'; //default
           }
            
           if(type_dept==true){
            reportFile = 'Departmentexpense01'; //default
           }
                
           headertype ='1'; 
           headerdesc ='With Header'; 
           detailtype ='1'; 
           detaildesc ='With Detail'; 
           sorttype = 0;

                  
           if(type_expense==true && type_dept==false) {
               headertype ='2'; 
               headerdesc ='With Header'; 
           }else if(type_expense==false && type_dept==true){
               headertype ='1'; 
               headerdesc ='Without Header'; 
           } 
           
            if(tb_detailyes==true && tb_detailno==false) {
               detailtype ='1'; 
               detaildesc ='With Detail'; 
           }else if(tb_detailyes==false && tb_detailno==true){
               detailtype ='2'; 
               detaildesc ='Without Detail'; 
           } 


            params["fromdate"] = me.formatDate(f.down("[name=fromdate]").getValue());
            params["untildate"] = me.formatDate(f.down("[name=untildate]").getValue());
            params["tanggal"] = params["fromdate"] + ' s/d ' + params["untildate"];
            params["headertype"] = headertype;
            params["headerdesc"] = headerdesc;
            params["detailtype"] = detailtype;
            params["detaildesc"] = detaildesc;
            params["sorttype"] = sorttype;
            params["periode"] = params["fromdate"] + ' s/d ' + params["untildate"];
            params["detailaccount"] = params["coastart_id"] + ' s/d ' + params["coaend_id"];
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
                if(reporttype=='EXCEL'){
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
        console.log(valueModels);

        var me = this.getMe();
        storecoa = me.getStore('Coacombo');
        storecoa.load({
            params: {
                "hideparam": 'coagridbyuserpt',
                "start": 0,
                "limit": 1000000,
                "pt_id_owner": valueModels.data.pt_id,
                "project_id": valueModels.data.project_id
            },
            callback: function (records, operation, success) {
                if (records[0]) {
                    var row = records[0]['data'];
                    me.setValueCombobox(me, 'from_coa_id', row.coa_id,row.coa);
                    me.setValueCombobox(me, 'until_coa_id', row.coa_id,row.coa);
                }

                var maxcoa = '60.00.000';
                var maxid = 0;
                
                records.forEach(function(entry) {
                    var row = entry.data;
                    if(row.coa=='50.00.000'){
                        me.setValueCombobox(me, 'from_coa_id', row.coa_id,row.coa);
                    }
                    if(row.coa.startsWith('5')){
                        maxcoa = row.coa;
                        maxid = row.coa_id
                    }
                });

                if(maxid>0){
                    me.setValueCombobox(me, 'until_coa_id', maxid, maxcoa);
                }
                

                storecoa.filterBy(function (rec, id) {
                    if(rec.get('coa').startsWith('5')) {
                        return true;
                    }
                    else {
                        return false;
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
        var pt_id = p.down("[name=pt_id]").getValue();
        var project_id = valueModels.data.project_id;

        //kembalikan
        //p.down("[name=all_dept]").setValue(false);
        Ext.getBody().mask("Please wait, Recalculating...");

        var tipeposting = 'Journal';
        if (me.form.isValid()) {
            //resetTimer();
            datapost = {
                fromdate: me.value.fromdate,
                untildate: me.value.untildate,
                projectpt_id: 0,
                pt_id: pt_id,
                project_id: project_id,
                tipeposting: tipeposting
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
    loadDataDepartment: function(newValue) {
        var me = this.getMe();

        var f = me.getFormdata();
        var valueModels = f.down("[name=pt_id]").valueModels[0];
        console.log(valueModels);

        var storedept = '';
        storedept = me.getStore('Departmentbyuser');
        storedept.load({
            params: {
                "hideparam": 'getdepartmentbyuser',
                "start": 0,
                "limit": 1000000,
                "project_id": valueModels.data.project_id,
                "pt_id": valueModels.data.pt_id
            },
            callback: function (records, operation, success) {
               if (success) {

                    
                }
                
            }
        });
    },

});