Ext.define('Cashier.controller.Coalist', {
    extend: 'Cashier.library.template.controller.Controllergl',
    alias: 'controller.Coalist',
    requires: [
        'Cashier.library.template.combobox.Ptcombobox',
        'Cashier.library.template.combobox.Projectptcombobox'
    ],
    views: [
        'coalist.Panel',
        'coalist.FormData',
        'masterreport.Panel'
    ],
    stores: [
        'Pt',
        'Projectpt'
    ],
    models: [
        'Pt',
        'Projectpt'
    ],
    refs: [
        {
            ref: 'formdata',
            selector: 'coalistformdata'
        },
        {
            ref: 'paneldata',
            selector: 'coalistpanel'
        }
    ],
    controllerName: 'coalist',
    fieldName: '',
    bindPrefixName: 'Coalist',
    urlprocess: 'cashier/coa/read',
    stimulsoft: "resources/stimulsoft/index.php?stimulsoft_client_key=ViewerFx&stimulsoft_report_key=",
    reportfile: "Coalist",
    project_name: null, pt_name: null, userprint: null,projectpt_id:null,project_id:null,pt_id:null,
    init: function (application) {
        var me = this;
        this.control({
            'coalistpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    me.getFormdata().down("[name=hideparam]").setValue("default");
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setHeight(120);
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setWidth(300);
                    me.panelAfterRender(panel);
                }
            },
            'coalistformdata': {
                afterrender: function (panel) {
                    this.formDataAfterRenderCustome();

                }
            },
            'coalistformdata button[action=submit]': {
                click: function () {
                    this.processReport();
                }
            }
        });
    },
    formDataAfterRenderCustome: function () {
        var me = '';
        me = this;
        var f = me.getFormdata();

        storept = me.getStore('Projectpt');

        Ext.Ajax.request({
            url: 'cashier/balancesheetb/read',
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
    processReport: function (callback) {
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
            //params["project_name"] = me.project_name;
            params["pt_name"] = f.down("[name=pt_id]").valueModels[0].raw.name;
            params["userprint"] = apps.username;
            params["tgl_sekarang"] = Ext.Date.format(new Date(), 'd/m/Y');
            params["time_sekarang"] = Ext.Date.format(new Date(), 'H:i:s');
            var reportFile = me.reportfile;
            var valueModels = f.down("[name=pt_id]").valueModels[0];
            params["project_id"] = valueModels.data.project_id;
            params["pt_id"] = f.down("[name=pt_id]").getValue();
            var html = me.ReportviewerV4(params, reportFile, win.id, 1); //whole report
            win.down("#MyReportPanel_" + win.id).body.setHTML(html);
            $("#Reportform_" + win.id).submit();
        }
        //if (typeof callback === "function") {
            //callback();
        //}

    },
    panelAfterRender: function (el) {
        var me = this;
        Ext.Ajax.request({
            url: 'cashier/coalist/read',
            success: function (response) {
                var info = Ext.JSON.decode(response.responseText);
                console.log(info);
                me.projectpt_id = info.projectpt_id;
                me.project_id = info.project_id;
                me.project_name = info.project_name;
                me.pt_id = info.pt_id;
                me.pt_name = info.pt_name;
                me.userprint = info.userprint;
                //me.processReport(function () {
                    //console.log(el);
                //    el.up("window").close();
                //});
            },
        });
    }
});