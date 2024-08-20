Ext.define('Cashier.controller.Salesbacklogreport', {
    extend: 'Cashier.library.template.controller.Controller2',
    alias: 'controller.Salesbacklogreport',
    requires: [
        'Cashier.library.template.combobox.Monthcombobox',
        'Cashier.library.template.combobox.Year2combobox'
    ],
    views: [
        'salesbacklogreport.Panel',
        'salesbacklogreport.FormData',
        'masterreport.Panel'
    ],
    refs: [
        {
            ref: 'formdata',
            selector: 'salesbacklogreportformdata'
        },
        {
            ref: 'paneldata',
            selector: 'salesbacklogreportpanel'
        }
    ],
    controllerName: 'salesbacklogreport',
    fieldName: '',
    bindPrefixName: 'Salesbacklogreport',
    urlprocess: 'cashier/coa/read',
    stimulsoft: "resources/stimulsoft/index.php?stimulsoft_client_key=ViewerFx&stimulsoft_report_key=",
    reportfile: "Salesbacklogreport",
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
            'salesbacklogreportpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    me.getFormdata().down("[name=hideparam]").setValue("default");
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setHeight(280);
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setWidth(600);
                    me.panelAfterRender();
                }
            },
            'salesbacklogreportformdata': {
                afterrender: function (panel) {
                    var date = new Date();
                    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
                    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

                    var firstDayHandover = new Date(date.getFullYear() - 5 , date.getMonth(), 1);
                    var lastDayHandover = new Date(date.getFullYear() + 5, date.getMonth() + 1, 0);

                    me.setValue(me, 'salesyeardata_start_ver2', firstDay);
                    me.setValue(me, 'salesyeardata_end_ver2', lastDay);
                    me.setValue(me, 'handoveryeardata_start_ver2', firstDayHandover);
                    me.setValue(me, 'handoveryeardata_end_ver2', lastDayHandover);
                    this.formDataAfterRenderCustome();

                }
            },
            'salesbacklogreportformdata button[action=submit]': {
                click: function () {
                    var formdata = me.getFormdata().getForm();
                    if (formdata.isValid()) {
                        this.processReport();
                    }
                }
            },
            'salesbacklogreportformdata [name=pt_pt_id]': {
                change: function (the, newValue, oldValue, eOpts) {
                    //this.filterComboDept(newValue);
                }
            },
            'salesbacklogreportformdata [name=formatreport]': {
                change: function () {
                    me.conditionReport();
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

        var xml=newValue;

        //reset
        f.down("[name=department_department_id]").setValue(null);

        me.tools.ajax({
            params: {module: me.controllerName+'Filtered', xml: xml},
            form: p,
            success: function (data, model) {
                try {
                    me.tools.weseav2(data.department, f.down("[name=department_department_id]"), 0).comboBox();
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
        var winId = me.controllerName + '_' + Ext.Date.format(new Date(), 'YmdHis');

        var paramsStr = me.generateReportParams(me.getFormdata().getForm().getFieldValues());
        var win = desktop.getWindow(winId);
        var f = me.getFormdata();
        var reporttype = f.down("[name=reporttype]").getValue();
        var formatreport = f.down("[name=formatreport]").getValue();
        // var detail = f.down("[name=notdetail]").getValue();

        if(formatreport=='DEFAULT'){
            formatreport = 'SUMMARY';
        }

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

            params["project_name"] = f.down("[name=pt_pt_id]").valueModels[0].data.project_name;
            params["pt_name"] = f.down("[name=pt_pt_id]").valueModels[0].raw.name;
            //params["dept_name"] = f.down("[name=department_department_id]").valueModels[0].raw.name;
            params["userprint"] = me.userprint;
            params["salesyeardata_start"] = f.down("[name=salesyeardata_start]").getValue();
            params["salesyeardata_end"] = f.down("[name=salesyeardata_end]").getValue();
            params["handoveryeardata_start"] = f.down("[name=handoveryeardata_start]").getValue();
            params["handoveryeardata_end"] = f.down("[name=handoveryeardata_end]").getValue();
            
            // params["salesyeardata_start_ver2"] = f.down("[name=salesyeardata_start_ver2]").getValue();
            // params["salesyeardata_end_ver2"] = f.down("[name=salesyeardata_end_ver2]").getValue();
            // params["handoveryeardata_start_ver2"] = f.down("[name=handoveryeardata_start_ver2]").getValue();
            // params["handoveryeardata_end_ver2"] = f.down("[name=handoveryeardata_end_ver2]").getValue();
            params["salesyeardata_start_ver2"] = me.getValue(me, "salesyeardata_start_ver2", "raw").split("-").reverse().join("-");
            params["salesyeardata_end_ver2"] = me.getValue(me, "salesyeardata_end_ver2", "raw").split("-").reverse().join("-");
            params["handoveryeardata_start_ver2"] = me.getValue(me, "handoveryeardata_start_ver2", "raw").split("-").reverse().join("-");
            params["handoveryeardata_end_ver2"] = me.getValue(me, "handoveryeardata_end_ver2", "raw").split("-").reverse().join("-");

            //params["bulan"] = f.down("[name=monthdata]").getValue();
            //params["bulan_sampai"] = f.down("[name=monthdatauntil]").getValue();
            //params["bulan_name"] = f.down("[name=monthdata]").valueModels[0].data.field2;
            //params["bulan_sampai_name"] = f.down("[name=monthdatauntil]").valueModels[0].data.field2;

            params["tgl_sekarang"] = dateNow.getDate() + "-" + (dateNow.getMonth() + 1) + "-" + dateNow.getFullYear();
            params["time_sekarang"] = dateNow.getHours() + ":" + dateNow.getMinutes() + ":" + dateNow.getSeconds();
            var reportFile = me.reportfile;
            params["project_id"] = apps.project;

            var valueModels = f.down("[name=pt_pt_id]").valueModels[0];

            params["project_id"] = valueModels.data.project_project_id;

            params["pt_id"] = f.down("[name=pt_pt_id]").getValue();

            //params["department_id"] = f.down("[name=department_department_id]").getValue();
            //params["notdetail"] = f.down("[name=notdetail]").getValue();

         /*   if(params["notdetail"]==true){
                reportFile = 'SalesbacklogreportNoDetail';
            }
            */

            //additional

            if(reporttype === undefined) {
                reporttype = 'DEFAULT';
            }

            if (me.getFormdata().getForm().isValid()) {

                var detail = false;

                //Ext.getBody().mask("Please wait...");
                resetTimer();

                if(formatreport == 'DETAIL'){
                    if(reporttype=='EXCEL'){
                        me.generateReportexcelthismonth(params);
                        return true;  
                    }
                }

                // if ( formatreport == 'DETAIL V2' ) {
                //     if ( reporttype == 'EXCEL' ) {
                //         me.generateReportexcelthismonth(params);
                //         return true;
                //     }
                // }

                if(formatreport == 'DEFAULT'){
		                if(reporttype=='DEFAULT'){
		                	if(detail == false){
		                		var html = me.ReportviewerV4(params, reportFile, win.id, 0);
                                win.down("#MyReportPanel_" + win.id).body.setHTML(html);
                                $("#Reportform_" + win.id).submit();

		                	}else{
		                		reportFile = 'SalesbacklogreportNoDetail';
		                		var html = me.ReportviewerV4(params, reportFile, win.id, 0);
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
                                var html = me.ReportviewerV4(params, reportFile + '_simple', win.id, 0);
                                win.down("#MyReportPanel_" + win.id).body.setHTML(html);
                                $("#Reportform_" + win.id).submit();

                            }else{
                                reportFile = 'SalesbacklogreportNoDetail';
                                var html = me.ReportviewerV4(params, reportFile, win.id, 0);
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
            					reportFile = 'SalesbacklogreportDetail';
            					var html = me.ReportviewerV4(params, reportFile, win.id, 0);
                                win.down("#MyReportPanel_" + win.id).body.setHTML(html);
                                $("#Reportform_" + win.id).submit();
            				}else{
                                 me.tools.alert.warning("Report type EXCEL not available for this format");
            					//me.generateReportexcelthismonth(params);
		                    	return false;  
            				}

            		}else{    // DETAIL WITH NO DETAIL
            			if(reporttype == 'DEFAULT'){ 
            					reportFile = 'SalesbacklogreportNoDetailSh1';
            					var html = me.ReportviewerV4(params, reportFile, win.id, 0);
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
            					reportFile = 'SalesbacklogreportSummary';
            					var html = me.ReportviewerV4(params, reportFile, win.id, 0);
                                win.down("#MyReportPanel_" + win.id).body.setHTML(html);
                                $("#Reportform_" + win.id).submit();
            		}else{
                                 me.tools.alert.warning("Report type EXCEL not available for this format");
            					//me.generateReportexcelthismonth(params);
		                    	return false;  
            		}

            	}else if (formatreport == 'DETAIL & SUMMARY'){
            		if(reporttype == 'DEFAULT'){ 
            					reportFile = 'SalesbacklogreportDetailSummary';
            					var html = me.ReportviewerV4(params, reportFile, win.id, 0);
                                win.down("#MyReportPanel_" + win.id).body.setHTML(html);
                                $("#Reportform_" + win.id).submit();
            		}else{
                                 me.tools.alert.warning("Report type EXCEL not available for this format");
            					//me.generateReportexcelthismonth(params);
		                    	return false;  
            		}
            	}else if ( formatreport == 'DETAIL V2 - LANDED' ){
                    params['type_report'] = 'LANDED';
                    if(reporttype == 'DEFAULT'){ 
                                reportFile = 'SalesbacklogreportDetailV2';
                                // console.log(params);
                                var html = me.ReportviewerV4(params, reportFile, win.id, 0);
                                win.down("#MyReportPanel_" + win.id).body.setHTML(html);
                                $("#Reportform_" + win.id).submit();
                    }else{
                                 // me.tools.alert.warning("Report type EXCEL not available for this format");
                                me.generateReportexcelthismonth(params);
                                return false;  
                    }
                }else if ( formatreport == 'DETAIL V2 - HIGHRISE' ){
                    params['type_report'] = 'HIGHRISE';
                    if(reporttype == 'DEFAULT'){ 
                                reportFile = 'SalesbacklogreportDetailV2Highrise';
                                // console.log(params);
                                var html = me.ReportviewerV4(params, reportFile, win.id, 0);
                                win.down("#MyReportPanel_" + win.id).body.setHTML(html);
                                $("#Reportform_" + win.id).submit();
                    }else{
                                 // me.tools.alert.warning("Report type EXCEL not available for this format");
                                me.generateReportexcelthismonth(params);
                                return false;  
                    }
                }else if ( formatreport == 'DETAIL V2 - PROJECT' ){
                    params['type_report'] = 'PROJECT';
                    if(reporttype == 'DEFAULT'){ 
                                reportFile = 'SalesbacklogreportDetailV2Project';
                                // console.log(params);
                                var html = me.ReportviewerV4(params, reportFile, win.id, 0);
                                win.down("#MyReportPanel_" + win.id).body.setHTML(html);
                                $("#Reportform_" + win.id).submit();
                    }else{
                                 // me.tools.alert.warning("Report type EXCEL not available for this format");
                                me.generateReportexcelthismonth(params);
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
                    me.tools.weseav3(data.pt, f.down("[name=pt_pt_id]"), parseInt(apps.pt)).comboBox();
                    //me.tools.weseav2(data.department, f.down("[name=department_department_id]"), 0).comboBox();
                }
                catch (err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to generate init.");
                }
                p.setLoading(false);
            }
        }).read('init');

        var d = new Date();
        f.down("[name=salesyeardata_start]").setValue(d.getFullYear()-3);
        f.down("[name=salesyeardata_end]").setValue(d.getFullYear());
        f.down("[name=handoveryeardata_start]").setValue(d.getFullYear()-3);
        f.down("[name=handoveryeardata_end]").setValue(d.getFullYear());
        //f.down("[name=monthdata]").setValue(d.getMonth()+1);
        //f.down("[name=monthdatauntil]").setValue(d.getMonth()+1);
        //f.down("[name=department_department_id]").setValue(99);

    },
     generateReportexcelthismonth: function(params){   
         var me,report;
         me = this;  
         params['hideparam'] = 'generatereportexcelthismonth',
         me.senddata = params,
         me.urlrequest = 'cashier/salesbacklogreport/create';
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
    conditionReport: function () {
        var me, formatreport;
        me = this;

        formatreport = me.getFormdata().down("[name=formatreport]").getValue();
        // if (formatreport == "DETAIL V2") {
        if ( (formatreport == "DETAIL V2 - LANDED") || (formatreport == "DETAIL V2 - HIGHRISE") || (formatreport == "DETAIL V2 - PROJECT") ) {
            // Ext.get('WINDOW-mnu' + me.bindPrefixName).setHeight(600);
            me.getFormdata().down("[name=slsYear1]").setVisible(false);
            me.getFormdata().down("[name=slsYear2]").setVisible(true);
            me.getFormdata().down("[name=hndYear1]").setVisible(false);
            me.getFormdata().down("[name=hndYear2]").setVisible(false);
        } else {
            me.getFormdata().down("[name=slsYear1]").setVisible(true);
            me.getFormdata().down("[name=slsYear2]").setVisible(false);
            me.getFormdata().down("[name=hndYear1]").setVisible(true);
            me.getFormdata().down("[name=hndYear2]").setVisible(false);
            
        }

    },
});