Ext.define('Cashier.controller.Cashflowreportyearly', {
    extend: 'Cashier.library.template.controller.Controller2',
    alias: 'controller.Cashflowreportyearly',
    requires: [
    'Cashier.library.template.combobox.Monthcombobox',
    'Cashier.library.template.combobox.Yearcombobox'
    ],
    views: [
    'cashflowreportyearly.Panel',
    'cashflowreportyearly.FormData',
    'masterreport.Panel'
    ],
    refs: [
    {
        ref: 'formdata',
        selector: 'cashflowreportyearlyformdata'
    },
    {
        ref: 'paneldata',
        selector: 'cashflowreportyearlypanel'
    }
    ],
    controllerName: 'cashflowreportyearly',
    fieldName: '',
    bindPrefixName: 'Cashflowreportyearly',
    urlprocess: 'cashier/coa/read',
    stimulsoft: "resources/stimulsoft/index.php?stimulsoft_client_key=ViewerFx&stimulsoft_report_key=",
    reportfile: "Cashflowreportyearly",
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
            'cashflowreportyearlypanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    me.getFormdata().down("[name=hideparam]").setValue("default");
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setHeight(200);
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setWidth(600);
                    me.panelAfterRender();
                }
            },
            'cashflowreportyearlyformdata': {
                afterrender: function (panel) {
                    this.formDataAfterRenderCustome();
                }
            },
            'cashflowreportyearlyformdata [name=formatreport]': {
                change: function () {
                    var me = this;
                    var fd = me.getFormdata();
                    var currtypereport = fd.down("[name=report_type]").getValue();
                    var currformatreport = fd.down("[name=formatreport]").getValue();

                    if (currtypereport == "YEARLY") {
                        if (currformatreport == 'BY-DEPARTMENT' || currformatreport == 'BY-CASHFLOW') {
                            fd.down("[name=iscashflow]").setVisible(false);
                        }else{
                            fd.down("[name=iscashflow]").setVisible(true);
                        }    
                    }
                }
            },
            'cashflowreportyearlyformdata [name=report_type]': {
                change: function (el, newValue, oldValue, eOpts) {
                    var me = this;
                    var fd = me.getFormdata();

                    if (newValue == "YEARLY") {
                        fd.down("[name=month]").setVisible(false);
                        fd.down("[name=field_period]").setFieldLabel("Year");

                        fd.down("[name=formatreport]").getStore().removeAll();
                        var store = fd.down("[name=formatreport]").getStore();

                        store.add(
                            {'param': 'DEFAULT - NO COA', 'label': 'DEFAULT - NO COA'},
                            {'param': 'DEFAULT - WITH COA', 'label': 'DEFAULT - WITH COA'},
                            {'param': 'DEFAULT - WITH COA WITH GROUP', 'label': 'DEFAULT - WITH COA WITH GROUP'},
                            {'param': 'BY-DEPARTMENT', 'label': 'BY-DEPARTMENT'},
                            {'param': 'BY-CASHFLOW', 'label': 'BY-CASHFLOW'},
                            );

                        fd.down("[name=formatreport]").setValue("DEFAULT - NO COA");
                        fd.down("[name=formatreport]").setReadOnly(false);
                        fd.down("[name=iscashflow]").setVisible(true);
                    } else {
                        fd.down("[name=iscashflow]").setVisible(false);
                        
                        fd.down("[name=month]").setVisible(true);
                        fd.down("[name=field_period]").setFieldLabel("Period");

                        fd.down("[name=formatreport]").getStore().removeAll();
                        var store = fd.down("[name=formatreport]").getStore();

                        store.add(
                            {'param': 'DETAIL', 'label': 'DETAIL'},
                            {'param': 'NO DETAIL', 'label': 'NO DETAIL'}
                            );

                        fd.down("[name=formatreport]").setValue("DETAIL");
                    }
                }
            },
            'cashflowreportyearlyformdata button[action=submit]': {
                click: function () {
                    this.processReport();
                }
            }
        });
        me.tools = new Cashier.library.box.tools.Tools({config: me.myConfig});
    },
    formDataAfterRenderCustome: function () {
        var me = '';
        me = this;

        var fd = me.getFormdata();
        var reporttype = fd.down("[name=report_type]").getValue();

        if (reporttype == "YEARLY") {
            fd.down("[name=month]").setVisible(false);
            fd.down("[name=field_period]").setFieldLabel("Year");
        }
    },
    processReport: function () {
        var me = this;
        var winId = me.controllerName + '_' + Ext.Date.format(new Date(), 'His');
        var title = 'Result ' + me.getFormdata().up('window').title;
        me.instantWindowWithMinimize('Panel', 800, title, 'state-report', winId, me.controllerName);
        var paramsStr = me.generateReportParams(me.getFormdata().getForm().getFieldValues());
        var win = desktop.getWindow(winId);
        var f = me.getFormdata();
        
        if (win) {
            var params = me.getFormdata().getForm().getFieldValues();
            var dateNow = new Date();
            //header
            params["project_name"] = me.project_name;
            params["pt_name"] = f.down("[name=pt_pt_id]").valueModels[0].raw.name;
            params["userprint"] = apps.username;
            params["tahun"] = f.down("[name=yeardata]").getValue();
            params["bulan"] = f.down("[name=monthdata]").getValue();
            params["bulan_sampai"] = f.down("[name=monthdatauntil]").getValue();

            var formatreport = f.down("[name=formatreport]").getValue();
            var reporttype = f.down("[name=report_type]").getValue();

            params["tgl_sekarang"] = Ext.Date.format(new Date(), 'd/m/Y');
            params["time_sekarang"] = Ext.Date.format(new Date(), 'H:i:s');
            params["budget_type"] = f.down("[name=budget_type]").getValue();
            
            var recalculatevar=0;
            if (f.down("[name=recalculate]").getValue() == true) {
                recalculatevar = 1;
            }else{
                recalculatevar = 0;
            }

            params["recalculate"] = recalculatevar;

            if (reporttype == "YEARLY") {
                if(formatreport=="BY-CASHFLOW"){
                    var reportFile = me.reportfile+'_bycashflow';
                }else if (formatreport == 'DEFAULT - WITH COA'){
                    var reportFile = me.reportfile+'_withCoa';
                }else if (formatreport == 'DEFAULT - WITH COA WITH GROUP'){
                    var reportFile = me.reportfile+'_withCoaWithGroup';
                } else {
                    var reportFile = me.reportfile;
                }
            } else {
                params["tanggal_periode"] = 31;
                params["bulan_periode"] = f.down("[name=month]").getRawValue();
                params["tahun_periode"] = f.down("[name=yeardata]").getValue();
                params["rpt"] = 0;
                params["month"] = f.down("[name=month]").valueModels[0].data.month;
                params["formatreport"] = formatreport;

                if (formatreport == "DETAIL") {
                    var reportFile = me.reportfile+'_withCoaWithGroup_Period';
                } else {
                    var reportFile = me.reportfile+'_withCoaWithGroup_Period_NoDetail';
                }                
            }

            console.log(params);
            params["project_id"] = apps.project;
            var valueModels = f.down("[name=pt_pt_id]").valueModels[0];
            params["project_id"] = valueModels.data.project_project_id;
            params["project_name"] = valueModels.data.project_name;
            params["iscashflow"] = f.down("[name=iscashflow]").getValue();
            
            if (params["iscashflow"]) {
                params["iscashflow"] = 1;
            }else{
                params["iscashflow"] = 0;
            }
            params["pt_id"] = f.down("[name=pt_pt_id]").getValue();
            params["department_id"] = f.down("[name=department_department_id]").getValue();
            var html = me.ReportviewerV4(params, reportFile, win.id, 1); //whole report
            win.down("#MyReportPanel_" + win.id).body.setHTML(html);
            $("#Reportform_" + win.id).submit();
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
                    me.tools.weseav2(data.department, f.down("[name=department_department_id]")).comboBox();
                }
                catch (err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to generate init.");
                }
                p.setLoading(false);
            }
        }).read('init');

        var d = new Date();
        f.down("[name=pt_pt_id]").setValue(me.pt);
        f.down("[name=yeardata]").setValue(d.getFullYear());
        f.down("[name=monthdata]").setValue(d.getMonth()+1);


    },
});