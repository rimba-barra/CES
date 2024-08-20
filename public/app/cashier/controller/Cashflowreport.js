Ext.define('Cashier.controller.Cashflowreport', {
    extend: 'Cashier.library.template.controller.Controller2',
    alias: 'controller.Cashflowreport',
    requires: [
        'Cashier.library.template.combobox.Monthcombobox',
        'Cashier.library.template.combobox.Yearcombobox'
    ],
    views: [
        'cashflowreport.Panel',
        'cashflowreport.FormData',
        'masterreport.Panel'
    ],
    refs: [
        {
            ref: 'formdata',
            selector: 'cashflowreportformdata'
        },
        {
            ref: 'paneldata',
            selector: 'cashflowreportpanel'
        }
    ],
    controllerName: 'cashflowreport',
    fieldName: '',
    bindPrefixName: 'Cashflowreport',
    urlprocess: 'cashier/coa/read',
    stimulsoft: "resources/stimulsoft/index.php?stimulsoft_client_key=ViewerFx&stimulsoft_report_key=",
    reportfile: "Cashflowreport",
    project_name: null, pt_name: null, userprint: null,
    constructor: function (configs) {
        this.callParent(arguments);
        var me = this;
        this.myConfig = new Cashier.library.box.Config({
            _controllerName: me.controllerName
        });
    },
    init: function (application) {
        var me = this;
        this.control({
            'cashflowreportpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    me.getFormdata().down("[name=hideparam]").setValue("default");
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setHeight(280);
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setWidth(600);
                    me.panelAfterRender();
                }
            },
            'cashflowreportformdata': {
                afterrender: function (panel) {
                    this.formDataAfterRenderCustome();

                }
            },
            'cashflowreportformdata button[action=submit]': {
                click: function () {
                    var formdata = me.getFormdata().getForm();
                    if (formdata.isValid()) {
                        this.processReport();
                    }
                }
            },
            'cashflowreportformdata [name=alldept]': {
                change: function (el) {
                    var me = this
                    var f = me.getFormdata();
                    var ischecked = el.value;
                    if (ischecked) {
                        var dept_id= 99;
                        f.down("[name=department_department_id]").setValue(dept_id);
                        f.down("[name=department_department_id]").setDisabled(true);
                    }else{
                        f.down("[name=department_department_id]").setDisabled(false);
                    }
                }
            },
            'cashflowreportformdata [name=projectpt_id]': {
                select: function (the, newValue, oldValue, eOpts) {
                    var me = this
                    var f = me.getFormdata();
                    if (the.valueModels !== null) {
                        var data_pt_id = the.valueModels[0].data.pt_id;
                        var data_project_id = the.valueModels[0].data.project_project_id;
                        f.down("[name=pt_pt_id]").setValue(parseInt(data_pt_id));
                        f.down("[name=project_id]").setValue(parseInt(data_project_id));    
                        the.value = data_pt_id;
                    }

                    this.filterComboDept(the.value);
                }
            }
        });
        me.tools = new Cashier.library.box.tools.Tools({config: me.myConfig});
    },
    formDataAfterRenderCustome: function () {
        var me = '';
        me = this;
    },
    filterComboDept: function(newValue){
        var me = this;
        var p = me.getPaneldata();
        var f = me.getFormdata();
        var project_id = f.down("[name=project_id]").getValue();
        var xml=newValue;

        f.down("[name=department_department_id]").setValue(null);
        var cekalldept = f.down("[name=alldept]").getValue();
        var isalldept = 0;
        
        if (cekalldept) {
            isalldept = 1;
        }else{
            isalldept = 0;
        }

        me.tools.ajax({
            params: {module: me.controllerName+'Filtered', xml: xml, pt_id:xml,project_id:project_id},
            form: f,
            success: function (data, model) {
                try {
                    if (data.department['data'] == null || data.department['data'] == 0 || isalldept == 1) {
                        var dept_id = 99;
                    }else{
                        var dept_id = data.department['data'][0].department_id;
                    }

                    me.tools.weseav2(data.department, f.down("[name=department_department_id]"), dept_id).comboBox('', function() {
                        f.down("[name=department_department_id]").setValue(dept_id);
                    });
                }
                catch (err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to generate init.");
                }
                p.setLoading(false);
            }
        }).read('init');

    },
   
     processReport: function () {
        var me = this;
        var title = 'Result ' + me.getFormdata().up('window').title;
        var winId = me.controllerName + '_' + Ext.Date.format(new Date(), 'His');

        var paramsStr = me.generateReportParams(me.getFormdata().getForm().getFieldValues());
        var win = desktop.getWindow(winId);
        var f = me.getFormdata();
        var reporttype = f.down("[name=reporttype]").getValue();
        var formatreport = f.down("[name=formatreport]").getValue();
        var detail = f.down("[name=notdetail]").getValue();
        var iscashflow = f.down("[name=iscashflow]").getValue();

        
        if(reporttype=='DEFAULT'){
            me.instantWindowWithMinimize('Panel', 1000, title, 'state-report', winId, me.controllerName);
        }else if(reporttype=='EXCEL'){
            
        }else{
            me.instantWindowWithMinimize('Panel', 1000, title, 'state-report', winId, me.controllerName);
        }

        
        var paramsStr = me.generateReportParams(me.getFormdata().getForm().getFieldValues());
        var win = desktop.getWindow(winId);

        if (true) {
            var params = me.getFormdata().getForm().getFieldValues();
            var dateNow = new Date();
            //header

            params["project_name"] = f.down("[name=projectpt_id]").valueModels[0].data.project_name;
            params["pt_name"] = f.down("[name=projectpt_id]").valueModels[0].raw.name;
            
            var cekalldept = f.down("[name=alldept]").getValue();
            if (cekalldept) {
                params["dept_name"] = 'All Dept.';
                params["department_id"] = 99;
            }else{
                params["dept_name"] = f.down("[name=department_department_id]").valueModels[0].raw.name;
                params["department_id"] = f.down("[name=department_department_id]").getValue();
            }

            params["userprint"] = apps.username;
            params["tahun"] = f.down("[name=yeardata]").getValue();
            params["bulan"] = f.down("[name=monthdata]").getValue();
            params["bulan_sampai"] = f.down("[name=monthdatauntil]").getValue();
            params["bulan_name"] = f.down("[name=monthdata]").valueModels[0].data.field2;
            params["bulan_sampai_name"] = f.down("[name=monthdatauntil]").valueModels[0].data.field2;

            params["tgl_sekarang"] = Ext.Date.format(new Date(), 'd/m/Y');
            params["time_sekarang"] = Ext.Date.format(new Date(), 'H:i:s');
            var reportFile = me.reportfile;
            // params["project_id"] = apps.project;

            var valueModels = f.down("[name=projectpt_id]").valueModels[0];

            params["project_id"] = valueModels.data.project_project_id;

            if (params["project_id"] == "" || params["project_id"] == null) {
                params["project_id"] = (apps.project).trim();
            }else{
                params["project_id"] = valueModels.data.project_project_id;
            }

            params["pt_id"] = f.down("[name=pt_pt_id]").getValue();

            if (params["pt_id"] == "" || params["pt_id"] == null) {
                params["pt_id"] = (apps.pt).trim();
            }else{
                params["pt_id"] = f.down("[name=pt_pt_id]").getValue();
            }
            
            
            params["notdetail"] = f.down("[name=notdetail]").getValue();
            params["iscashflow"] = f.down("[name=iscashflow]").getValue();
            
            if (params["iscashflow"]) {
                params["iscashflow"] = 1;
            }else{
                params["iscashflow"] = 0;
            }

         /*   if(params["notdetail"]==true){
                reportFile = 'CashflowreportNoDetail';
            }
            */

            //additional

            if(reporttype === undefined) {
                reporttype = 'DEFAULT';
            }

            if (me.getFormdata().getForm().isValid()) {

                //Ext.getBody().mask("Please wait...");
                resetTimer();
                if(formatreport == 'DEFAULT'){
                        if(reporttype=='DEFAULT'){
                            if(detail == false){
                                var html = me.ReportviewerV4(params, reportFile, win.id, 1); //whole report
                                win.down("#MyReportPanel_" + win.id).body.setHTML(html);
                                $("#Reportform_" + win.id).submit();

                            }else{
                                reportFile = 'CashflowreportNoDetail';
                                var html = me.ReportviewerV4(params, reportFile, win.id, 1); //whole report
                                win.down("#MyReportPanel_" + win.id).body.setHTML(html);
                                $("#Reportform_" + win.id).submit();

                            }
                          
                           
                        }else{

                            me.generateReportexcelthismonth(params);
                            return false;  
                        }
                }else if(formatreport == 'SIMPLE'){
                        if(reporttype=='DEFAULT'){
                            if(detail == false){
                                var html = me.ReportviewerV4(params, reportFile+'_simple', win.id, 1); //whole report
                                win.down("#MyReportPanel_" + win.id).body.setHTML(html);
                                $("#Reportform_" + win.id).submit();

                            }else{
                                reportFile = 'CashflowreportNoDetail';
                                var html = me.ReportviewerV4(params, reportFile, win.id, 1); //whole report
                                win.down("#MyReportPanel_" + win.id).body.setHTML(html);
                                $("#Reportform_" + win.id).submit();

                            }
                          
                           
                        }else{

                            me.generateReportexcelthismonth(params);
                            return false;  
                        }
                }else if (formatreport == 'DETAIL'){ //DETAIL WITH DETAIL
                    if(detail == false){
                            if(reporttype == 'DEFAULT'){
                                reportFile = 'CashflowreportDetail';
                                var html = me.ReportviewerV4(params, reportFile, win.id, 1); //whole report
                                win.down("#MyReportPanel_" + win.id).body.setHTML(html);
                                $("#Reportform_" + win.id).submit();
                            }else{
                                 me.tools.alert.warning("Report type EXCEL not available for this format");
                                //me.generateReportexcelthismonth(params);
                                return false;  
                            }

                    }else{    // DETAIL WITH NO DETAIL
                        if(reporttype == 'DEFAULT'){ 
                                reportFile = 'CashflowreportNoDetailSh1';
                                var html = me.ReportviewerV4(params, reportFile, win.id, 1); //whole report
                                win.down("#MyReportPanel_" + win.id).body.setHTML(html);
                                $("#Reportform_" + win.id).submit();
                            }else{
                                 me.tools.alert.warning("Report type EXCEL not available for this format");
                                //me.generateReportexcelthismonth(params);
                                return false;  
                            }
                    }
                    
             
                }else if  (formatreport == 'SUMMARY'){
                    if(reporttype == 'DEFAULT'){ 
                                reportFile = 'CashflowreportSummary';
                                var html = me.ReportviewerV4(params, reportFile, win.id, 1); //whole report
                                win.down("#MyReportPanel_" + win.id).body.setHTML(html);
                                $("#Reportform_" + win.id).submit();
                    }else{
                                 me.tools.alert.warning("Report type EXCEL not available for this format");
                                //me.generateReportexcelthismonth(params);
                                return false;  
                    }

                }else if (formatreport == 'DETAIL & SUMMARY'){
                    if(reporttype == 'DEFAULT'){ 
                                reportFile = 'CashflowreportDetailSummary';
                                var html = me.ReportviewerV4(params, reportFile, win.id, 1); //whole report
                                win.down("#MyReportPanel_" + win.id).body.setHTML(html);
                                $("#Reportform_" + win.id).submit();
                    }else{
                                 me.tools.alert.warning("Report type EXCEL not available for this format");
                                //me.generateReportexcelthismonth(params);
                                return false;  
                    }
                }
            }

        }
    },
    panelAfterRender: function (el) {
        var me = this;

        var p = me.getPaneldata();
        var f = me.getFormdata();

        me.tools.ajax({
            params: {module: me.controllerName},
            form: p,
            success: function (data, model) {
                try {
                    me.tools.weseav3(data.pt, f.down("[name=projectpt_id]"), parseInt(apps.projectpt)).comboBox();
                    me.tools.weseav2(data.department, f.down("[name=department_department_id]"), 0).comboBox();
                }
                catch (err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to generate init.");
                }
                p.setLoading(false);
            }
        }).read('init');

        var d = new Date();
        f.down("[name=yeardata]").setValue(d.getFullYear());
        f.down("[name=monthdata]").setValue(d.getMonth()+1);
        f.down("[name=monthdatauntil]").setValue(d.getMonth()+1);
        f.down("[name=department_department_id]").setValue(99);

    },
     generateReportexcelthismonth: function(params){   
         var me,report;
         me = this;  
         params['hideparam'] = 'generatereportexcelthismonth',
         me.senddata = params,
         me.urlrequest = 'cashier/cashflowreport/create';
         Ext.getBody().mask("Please wait...");
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
});