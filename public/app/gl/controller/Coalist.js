Ext.define('Gl.controller.Coalist', {
    extend: 'Gl.library.template.controller.Controllergl',
    alias: 'controller.Coalist',
    views: [
        'coalist.Panel',
        'coalist.FormData',
        'masterreport.Panel'
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
    urlprocess: 'gl/coa/read',
    stimulsoft: "resources/stimulsoft/index.php?stimulsoft_client_key=ViewerFx&stimulsoft_report_key=",
    reportfile: "Coalist",
    project_name: null, pt_name: null, userprint: null,
    init: function (application) {
        var me = this;
        this.control({
            'coalistpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    me.getFormdata().down("[name=hideparam]").setValue("default");
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setHeight(80);
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setWidth(170);
                    me.panelAfterRender();
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


    },
    processReport: function () {
        var me = this;
        var winId = 'myReportWindow';
        me.instantWindow('Panel', 800, 'Result ', 'state-report', winId, 'masterreport');
        var paramsStr = me.generateReportParams(me.getFormdata().getForm().getFieldValues());
        var win = desktop.getWindow(winId);

        if (win) {
            var params = me.getFormdata().getForm().getFieldValues();

            var dateNow = new Date();

            //header
            params["project_name"] = me.project_name;
            params["pt_name"] = me.pt_name;
            params["userprint"] = me.userprint;
            params["tgl_sekarang"] = dateNow.getDate() + "-" + (dateNow.getMonth() + 1) + "-" + dateNow.getFullYear();
            params["time_sekarang"] = dateNow.getHours() + ":" + dateNow.getMinutes() + ":" + dateNow.getSeconds();
            var reportFile = me.reportfile;
            params["project_id"] = apps.project;
            params["pt_id"] = apps.pt; 
            var html = me.Reportviewer(params, reportFile);
            win.down("#MyReportPanel").body.setHTML(html);
            $("#Reportform").submit();
        }
    },
    panelAfterRender: function (el) {
        var me = this;
        Ext.Ajax.request({
            url: 'gl/coalist/read',
            success: function (response) {
                var info = Ext.JSON.decode(response.responseText);
                me.project_name = info.project_name;
                me.pt_name = info.pt_name;
                me.userprint = info.userprint;
            },
        });
    }
});