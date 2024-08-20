Ext.define('Cashier.controller.Cashbackcashbondepartmentreport', {
    extend: 'Cashier.library.template.controller.Controller2',
    alias: 'controller.Cashbackcashbondepartmentreport',
    requires: [
    'Cashier.library.template.combobox.Monthcombobox',
    'Cashier.library.template.combobox.Year2combobox'
    ],
    views: [
    'cashbackcashbondepartmentreport.Panel',
    'cashbackcashbondepartmentreport.FormData',
    'masterreport.Panel'
    ],
    refs: [
    {
        ref: 'formdata',
        selector: 'cashbackcashbondepartmentreportformdata'
    },
    {
        ref: 'paneldata',
        selector: 'cashbackcashbondepartmentreportpanel'
    }
    ],
    controllerName: 'cashbackcashbondepartmentreport',
    fieldName: '',
    bindPrefixName: 'Cashbackcashbondepartmentreport',
    urlprocess: 'cashier/cashbackcashbondepartmentreport/read',
    stimulsoft: "resources/stimulsoft/index.php?stimulsoft_client_key=ViewerFx&stimulsoft_report_key=",
    reportfile: "Cashbackcashbondepartmentreport",
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
            'cashbackcashbondepartmentreportpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    me.getFormdata().down("[name=hideparam]").setValue("default");
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setHeight(180);
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setWidth(600);
                    me.panelAfterRender();
                }
            },
            'cashbackcashbondepartmentreportformdata': {
                afterrender: function (panel) {
                    var date = new Date();
                    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
                    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
                    
                    me.setValue(me, 'periode_start', firstDay);
                    me.setValue(me, 'periode_end', lastDay);
                    this.formDataAfterRenderCustome();

                }
            },
            'cashbackcashbondepartmentreportformdata button[action=submit]': {
                click: function () {
                    var formdata = me.getFormdata().getForm();
                    if (formdata.isValid()) {
                        this.processReport();
                    }
                }
            },
            'cashbackcashbondepartmentreportformdata [name=pt_pt_id]': {
                change: function (the, newValue, oldValue, eOpts) {
                    //this.filterComboDept(newValue);
                }
            },
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
        
        if(reporttype=='DEFAULT'){
            me.instantWindowWithMinimize('Panel', 1000, title, 'state-report', winId, me.controllerName);
        }else if(reporttype=='EXCEL'){
            
        }
        
        var paramsStr = me.generateReportParams(me.getFormdata().getForm().getFieldValues());
        var win = desktop.getWindow(winId);

        if (true) {
            var params = me.getFormdata().getForm().getFieldValues();
            var dateNow = new Date();
            //header

            // params["userprint"] = me.userprint;
            var reportFile = me.reportfile;


            var valueModels = f.down("[name=pt_pt_id]").valueModels[0];
            params["project_id"] = valueModels.data.project_project_id;
            params["pt_id"] = f.down("[name=pt_pt_id]").getValue();
            params["periode_start"] = me.getValue(me, "periode_start", "raw").split("-").reverse().join("-");
            params["periode_end"] = me.getValue(me, "periode_end", "raw").split("-").reverse().join("-");

            params["tgl_sekarang"] = dateNow.getDate() + "-" + (dateNow.getMonth() + 1) + "-" + dateNow.getFullYear();
            params["time_sekarang"] = dateNow.getHours() + ":" + dateNow.getMinutes() + ":" + dateNow.getSeconds();
            params["project_name"] = f.down("[name=pt_pt_id]").valueModels[0].data.project_name;
            params["pt_name"] = f.down("[name=pt_pt_id]").valueModels[0].raw.name;

            if(reporttype === undefined) {
                reporttype = 'DEFAULT';
            }

            if (me.getFormdata().getForm().isValid()) {

                var detail = false;

                //Ext.getBody().mask("Please wait...");
                resetTimer();
                if(reporttype=='DEFAULT'){

                    var html = me.ReportviewerV4(params, reportFile, win.id, 0);
                    win.down("#MyReportPanel_" + win.id).body.setHTML(html);
                    $("#Reportform_" + win.id).submit();
                }else{
                    me.generateReportexcelthismonth(params);
                    return false;  
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

    },
    generateReportexcelthismonth: function(params){   
       var me,report;
       me = this;  
       params['hideparam'] = 'generatereportexcelthismonth',
       me.senddata = params,
       me.urlrequest = 'cashier/cashbackcashbondepartmentreport/create';
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