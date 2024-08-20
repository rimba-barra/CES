Ext.define('Cashier.controller.Cashflowreporttype', {
    extend: 'Cashier.library.template.controller.Controller2',
    alias: 'controller.Cashflowreporttype',
    requires: [
        'Cashier.library.template.combobox.Monthcombobox',
        'Cashier.library.template.combobox.Yearcombobox'
    ],
    views: [
        'cashflowreporttype.Panel',
        'cashflowreporttype.FormData',
        'masterreport.Panel'
    ],
    refs: [
        {
            ref: 'formdata',
            selector: 'cashflowreporttypeformdata'
        },
        {
            ref: 'paneldata',
            selector: 'cashflowreporttypepanel'
        }
    ],
    controllerName: 'cashflowreporttype',
    fieldName: '',
    bindPrefixName: 'Cashflowreporttype',
    urlprocess: 'cashier/coa/read',
    stimulsoft: "resources/stimulsoft/index.php?stimulsoft_client_key=ViewerFx&stimulsoft_report_key=",
    reportfile: "Cashflowreporttype",
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
            'cashflowreporttypepanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    me.getFormdata().down("[name=hideparam]").setValue("default");
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setHeight(230);
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setWidth(600);
                    me.panelAfterRender();
                }
            },
            'cashflowreporttypeformdata': {
                afterrender: function (panel) {
                    this.formDataAfterRenderCustome();

                }
            },
            'cashflowreporttypeformdata button[action=submit]': {
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
            params["project_name"] = f.down("[name=pt_pt_id]").valueModels[0].raw.project_name;
            params["pt_name"] = f.down("[name=pt_pt_id]").valueModels[0].raw.name;
            params["userprint"] = me.userprint;
            params["tahun"] = f.down("[name=yeardata]").getValue();
            params["bulan"] = f.down("[name=monthdata]").getValue();
            params["bulan_sampai"] = f.down("[name=monthdatauntil]").getValue();

            params["tgl_sekarang"] = dateNow.getDate() + "-" + (dateNow.getMonth() + 1) + "-" + dateNow.getFullYear();
            params["time_sekarang"] = dateNow.getHours() + ":" + dateNow.getMinutes() + ":" + dateNow.getSeconds();
            var reportFile = me.reportfile;
            params["project_id"] = f.down("[name=pt_pt_id]").valueModels[0].raw.project_project_id;
            params["pt_id"] = f.down("[name=pt_pt_id]").getValue();
            params["department_id"] = f.down("[name=department_department_id]").getValue();
			params["cashflowtype_id"] = f.down("[name=cashflowtype_cashflowtype_id]").getValue();
            params["iscashflow"] = f.down("[name=iscashflow]").getValue();
            
            if (params["iscashflow"]) {
                params["iscashflow"] = 1;
            }else{
                params["iscashflow"] = 0;
            }

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
					me.tools.weseav2(data.cashflowtype, f.down("[name=cashflowtype_cashflowtype_id]")).comboBox();
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