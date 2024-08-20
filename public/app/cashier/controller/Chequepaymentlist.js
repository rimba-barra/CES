Ext.define('Cashier.controller.Chequepaymentlist', {
    extend: 'Cashier.template.ControllerForMaster',
    alias: 'controller.Chequepaymentlist',
    requires: ['Cashier.library.XyReportB'],
    refs: [
        {
            ref: 'panel',
            selector: 'chequepaymentlistpanel'
        },
        {
            ref: 'grid',
            selector: 'chequepaymentlistgrid'
        },
        {
            ref: 'formdata',
            selector: 'chequepaymentlistformdata'
        },
        {
            ref: 'formsearch',
            selector: 'chequepaymentlistformsearch'
        },
    ],
    controllerName: 'chequepaymentlist',
    fieldName: 'coa',
    year: null,
    ptId: 0,
    iwField: {
        title: 'Cheque Payment List'
    },
    xyReport: null,
    reportFileName: null,
    bindPrefixName: 'Chequepaymentlist',
    formxWinId: 'win-chequepaymentlistwinId',
    init: function () {
        var me = this;
        var events = new Cashier.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        me.tools = new Cashier.library.box.tools.Tools({config: me.myConfig});
        this.control({
            'chequepaymentlistpanel': {
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
            'chequepaymentlistformdata [action=select]': {
                click: this.mainPrint
            },
            'chequepaymentlistformdata [name=projectpt_id]': {
                change: function (v) {
                   var f = me.getFormdata();
                    if (v.valueModels !== null) {
                        var data_pt_id = v.valueModels[0].data.pt_id;
                        var data_project_id = v.valueModels[0].data.project_project_id;
                        f.down("[name=pt_pt_id]").setValue(parseInt(data_pt_id));
                        f.down("[name=project_id]").setValue(parseInt(data_project_id));    
                        v.value = data_pt_id;
                        me.project_id = data_project_id;
                    }

                    if (v.value) {
                    
                        // me.setprojectpt(v.name, v.ownerCt);
                        var f = me.getFormdata();
                        f.down('[name=voucherprefix_voucherprefix_id]').setValue('');
                        f.down('[name=voucherprefix_voucherprefix_id]').setReadOnly(false);
                        // getCustomRequestComboboxModule: function (module, paramname, val, val2, val3, field, model, submodel, form, param, callback) {
                        me.getCustomRequestComboboxModule('mastercheque', 'bank_cheque_out', v.value, me.project_id, '', 'voucherprefix_voucherprefix_id', 'voucherprefix', 'coa', f);
                    } else {
                        f.down('[name=voucherprefix_voucherprefix_id]').setValue('');
                        f.down('[name=voucherprefix_voucherprefix_id]').setReadOnly(false);
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
                    // me.tools.wesea(data.pt, f.down("[name=pt_pt_id]")).comboBox();
                    me.tools.weseav2(data.pt, f.down("[name=projectpt_id]")).comboBox('', function () {
                        var combostore = f.down('[name=projectpt_id]').getStore();
                        var record = combostore.findRecord('projectpt_id', parseInt(apps.projectpt),0,false,true,true);
                        if (record) {
                            f.down("[name=projectpt_id]").setValue(parseInt(apps.projectpt));
                        }
                    });
                    // f.down('[name=pt_id]').setValue(data.ptid);
                    me.reportFileName = data.FILE_REPORT;
                    // me.ptId = data.ptid;
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
            me.xyReport.processReportJsv3(winId, 800, title, me.controllerName, 1, null);
        }
    },
    xyReportProcessParams: function (reportData) {
        var me = this;
        var fn = me.reportFileName;
        var f = me.getFormdata();
        var pt_id = f.down("[name=pt_pt_id]").getValue();
        var valueModels = f.down("[name=projectpt_id]").valueModels[0];
        var project_id = valueModels.data.project_project_id
        var pt_name = valueModels.data.name;
        var from = moment(f.down("[name=from]").getValue()).format("YYYY-MM-DD");
        var from_periode = moment(f.down("[name=from]").getValue()).format("DD MMM YYYY");
        var to = moment(f.down("[name=to]").getValue()).format("YYYY-MM-DD");
        var to_periode = moment(f.down("[name=to]").getValue()).format("DD MMM YYYY");
        var allprefix = f.down("[name=allprefix]").getValue();
        var allprefix = f.down("[name=allprefix]").getValue();
        var allpayment = f.down("[name=allpaymenttype]").getValue();
        var v = me.tools.comboHelper(f.down("[name=voucherprefix_voucherprefix_id]")).getField('voucherprefix_id', 'description');
        reportData['file'] = fn;
        reportData.params["pt_id"] = pt_id;
        reportData.params["project_id"] = project_id;
        reportData.params["pt_name"] = pt_name;
        reportData.params["from"] = from;
        reportData.params["from_periode"] = from_periode;
        reportData.params["to"] = to;
        reportData.params["to_periode"] = to_periode;
        reportData.params["allprefix"] = allprefix ? 1 : 0;
        reportData.params["allprefixteks"] = allprefix ? 'Semua Bank' : 'Filter';
        reportData.params["bank_name"] = allprefix ? 'Semua Bank' : v;
        reportData.params["voucherprefix_id"] = f.down("[name=voucherprefix_voucherprefix_id]").getValue();
        reportData.params["allpaymenttype"] = allpayment ? 1 : 0;
        reportData.params["userprint"] = apps.username;
        reportData.params["tgl_sekarang"] = Ext.Date.format(new Date(), 'd/m/Y');
        reportData.params["time_sekarang"] = Ext.Date.format(new Date(), 'H:i:s');
        return reportData;
    },
});
