Ext.define('Cashier.controller.Reportarkawasan', {
    extend: 'Cashier.library.template.controller.Controller2',
    alias: 'controller.Reportarkawasan',
    requires: ['Cashier.library.XyReportB'],
    refs: [
        {
            ref: 'panel',
            selector: 'reportarkawasanpanel'
        },
        {
            ref: 'grid',
            selector: 'reportarkawasangrid'
        },
        {
            ref: 'formdata',
            selector: 'reportarkawasanformdata'
        },
        {
            ref: 'formsearch',
            selector: 'reportarkawasanformsearch'
        },
    ],
    controllerName: 'reportarkawasan',
    fieldName: 'coa',
    year: null,
    ptId: 0,
    xyReport: null,
    reportFileName: null,
    bindPrefixName: 'Reportarkawasan',
    formxWinId: 'win-reportarkawasanwinId',
     constructor: function (configs) {
        this.callParent(arguments);
        var me = this;
        this.myConfig = new Cashier.library.box.Config({
            _controllerName: me.controllerName
        });
    },
    init: function () {
        var me = this;
        var events = new Cashier.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        me.tools = new Cashier.library.box.tools.Tools({config: me.myConfig});
        this.control({
            'reportarkawasanpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    var f = me.getFormdata();
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setHeight(245);
                    me.panelAfterRender(panel);
                    panel.up("panel").setWidth(300);
                    // panel.up("window").setHeight(228);
                    // panel.up("panel").setHeight(200);
                },
            },
            'reportarkawasanformdata [action=select]': {
                click: this.mainPrint
            },
            'reportarkawasanformdata [name=project_id]': {
                select: function (e) {
                    var f = me.getFormdata();

                    if (e.value) {
                        var c = f.down('[name=cluster_id]').setValue();
                        //getCustomRequestComboboxModuleV2: function (module,paramname, val, field, model, submodel, form, param, callback) {
                        me.getCustomRequestComboboxModuleV2('global', 'getclusterbyproject', e.value, 'cluster_id', 'clusterb', '', f);
                    }
                }
            },
        });
    },
    formDataAfterRender: function (el) { //fdar
        var state = el.up('window').state;
        var wid = el.up('window').id;
        var me = this;
        var f = me.getFormdata();
        me.fdar().init();
        me.detailFdar();

    },
    detailFdar: function () {
        var me = this;
        var p = me.getPanel();
        var f = me.getFormdata();

        p.setLoading("Please wait");
        me.tools.ajax({
            params: {module: me.controllerName},
            success: function (data, model) {

                try {
                    me.tools.wesea(data.project, f.down("[name=project_id]")).comboBox();
                    me.reportFileName = data.FILE_REPORT;
                    me.ptId = data.ptid;
                }
                catch (err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to generate init.");

                }

                p.setLoading(false);
            }
        }).read('detail');
    },
    mainPrint: function () {
        var me = this;
        var f = me.getFormdata();
        if (f.getForm().isValid()) {
            if (!me.xyReport) {
                me.xyReport = new Cashier.library.XyReportB();
                me.xyReport.init(me);
            }
            var winId = me.controllerName + '_' + Ext.Date.format(new Date(), 'YmdHis');
            var title = 'Result ' + me.getFormdata().up('window').title;
            me.xyReport.processReportJsv3(winId, 800, title, me.controllerName, 0, null);
        }
    },
    xyReportProcessParams: function (reportData) {
        var me = this;
        var fn = me.reportFileName;
        var f = me.getFormdata();
        var pt_id = f.down("[name=project_id]").getValue();
        var cluster_id = f.down("[name=cluster_id]").getValue();
        var from = moment(f.down("[name=from]").getValue()).format("YYYY-MM-DD");
        var to = moment(f.down("[name=to]").getValue()).format("YYYY-MM-DD");
        reportData['file'] = fn;
        reportData.params["project_id"] = pt_id;
        reportData.params["cluster_id"] = cluster_id;
        reportData.params["from"] = from;
        reportData.params["to"] = to;
        reportData.params["tgl_sekarang"] = Ext.Date.format(new Date(), 'd/m/Y');
        reportData.params["time_sekarang"] = Ext.Date.format(new Date(), 'H:i:s');
        reportData.params["userprint"] = apps.username;
        return reportData;
    },
});
