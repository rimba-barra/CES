Ext.define('Cashier.controller.Subledgerreport', {
    extend: 'Cashier.library.template.controller.Controller2',
    alias: 'controller.Subledgerreport',
    requires: [
        'Cashier.library.template.combobox.Monthcombobox',
        'Cashier.library.template.combobox.Yearcombobox'
    ],
    views: [
        'subledgerreport.Panel',
        'subledgerreport.FormData',
        'masterreport.Panel'
    ],
    refs: [
        {
            ref: 'formdata',
            selector: 'subledgerreportformdata'
        },
        {
            ref: 'paneldata',
            selector: 'subledgerreportpanel'
        }
    ],
    controllerName: 'subledgerreport',
    fieldName: '',
    bindPrefixName: 'Subledgerreport',
    urlprocess: 'cashier/coa/read',
    stimulsoft: "resources/stimulsoft/index.php?stimulsoft_client_key=ViewerFx&stimulsoft_report_key=",
    reportfile: "Subledgerreport",
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
            'subledgerreportpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    me.getFormdata().down("[name=hideparam]").setValue("default");
                    //Ext.get('WINDOW-mnu' + me.bindPrefixName).setHeight(200);
                    //Ext.get('WINDOW-mnu' + me.bindPrefixName).setWidth(600);
                    me.panelAfterRender();
                }
            },
            'subledgerreportformdata': {
                afterrender: function (panel) {
                    this.formDataAfterRenderCustome();

                }
            },
            'subledgerreportformdata button[action=submit]': {
                click: function () {
                    this.processReport();
                }
            },
            'subledgerreportformdata [name=kelsub_kelsub_id]': {
                change: function (the, newValue, oldValue, eOpts) {
                    this.filterComboSub(newValue);
                }
            }
        });
        me.tools = new Cashier.library.box.tools.Tools({config: me.myConfig});
    },
    formDataAfterRenderCustome: function () {
        var me = '';
        me = this;
    },
    filterComboSub: function(newValue){
        var me = this;
        var p = me.getPaneldata();
        var f = me.getFormdata();

        var xml=newValue;

        //reset
        f.down("[name=subgl_subglstart_id]").setValue(null);
        f.down("[name=subgl_subglend_id]").setValue(null);
        f.down("[name=coa_coastart_id]").setValue(null);
        f.down("[name=coa_coaend_id]").setValue(null);

        me.tools.ajax({
            params: {module: me.controllerName+'Filtered', xml: xml},
            form: p,
            success: function (data, model) {
                try {
                    me.tools.weseav2(data.subgl, f.down("[name=subgl_subglstart_id]")).comboBox();
                    me.tools.weseav2(data.subgl, f.down("[name=subgl_subglend_id]")).comboBox();
                    me.tools.weseav2(data.coa, f.down("[name=coa_coastart_id]")).comboBox();
                    me.tools.weseav2(data.coa, f.down("[name=coa_coaend_id]")).comboBox();
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
        var winId = 'myReportWindow';
        me.instantWindow('Panel', 800, 'Result ', 'state-report', winId, 'masterreport');
        var paramsStr = me.generateReportParams(me.getFormdata().getForm().getFieldValues());
        var win = desktop.getWindow(winId);
        var f = me.getFormdata();
        
        if (win) {
            var params = me.getFormdata().getForm().getFieldValues();
            var dateNow = new Date();
            //header

            params["project_name"] = me.project_name;
            params["pt_name"] = f.down("[name=pt_pt_id]").valueModels[0].raw.name;
            //params["dept_name"] = f.down("[name=department_department_id]").valueModels[0].raw.name;
            params["userprint"] = me.userprint;
            
            params["subglstart_id"] = f.down("[name=subgl_subglstart_id]").getValue();
            params["subglend_id"] = f.down("[name=subgl_subglend_id]").getValue();
            params["coastart_id"] = f.down("[name=coa_coastart_id]").getValue();
            params["coaend_id"] = f.down("[name=coa_coaend_id]").getValue();
            params["kelsub_id"] = f.down("[name=kelsub_kelsub_id]").getValue();
            params["fromdate"] = me.tools.formatDate(f.down("[name=fromdate]").getValue());
            params["untildate"] = me.tools.formatDate(f.down("[name=untildate]").getValue());

            params["tahun"] = f.down("[name=yeardata]").getValue();
            params["bulan"] = f.down("[name=monthdata]").getValue();
            params["bulan_sampai"] = f.down("[name=monthdatauntil]").getValue();

            params["tgl_sekarang"] = dateNow.getDate() + "-" + (dateNow.getMonth() + 1) + "-" + dateNow.getFullYear();
            params["time_sekarang"] = dateNow.getHours() + ":" + dateNow.getMinutes() + ":" + dateNow.getSeconds();
            var detail = f.down("[name=detaildata]").getValue();
            if(detail){
                var reportFile = me.reportfile+'detail';
            }else{
                var reportFile = me.reportfile;
            }
            //params["project_id"] = apps.project;
            params["pt_id"] = f.down("[name=pt_pt_id]").getValue();
            //params["department_id"] = f.down("[name=department_department_id]").getValue();
            var html = me.Reportviewer(params, reportFile);
            win.down("#MyReportPanel").body.setHTML(html);
            $("#Reportform").submit();
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
                    me.tools.weseav2(data.subgl, f.down("[name=subgl_subglstart_id]")).comboBox();
                    me.tools.weseav2(data.subgl, f.down("[name=subgl_subglend_id]")).comboBox();
                    me.tools.weseav2(data.kelsub, f.down("[name=kelsub_kelsub_id]")).comboBox();
                    me.tools.weseav2(data.coa, f.down("[name=coa_coastart_id]")).comboBox();
                    me.tools.weseav2(data.coa, f.down("[name=coa_coaend_id]")).comboBox();
                }
                catch (err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to generate init.");
                }
                p.setLoading(false);
            }
        }).read('init');


    },
});