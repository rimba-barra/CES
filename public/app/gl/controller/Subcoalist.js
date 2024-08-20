Ext.define('Gl.controller.Subcoalist', {
    extend: 'Gl.library.template.controller.Controllergl',
    alias: 'controller.Subcoalist',
    requires: [
        'Gl.library.template.combobox.Coacombobox',
        'Gl.library.template.combobox.SubaccountcodeComboboxrev',
    ],
    views: [
        'subcoalist.Panel',
        'subcoalist.FormData'
    ],
    stores: [
        'Subcoalist',
        'Subaccountcode',
    ],
    models: [
        'Subcoalist',
        'Subaccountcode',
    ],
    refs: [
        {
            ref: 'formdata',
            selector: 'subcoalistformdata'
        },
        {
            ref: 'paneldata',
            selector: 'subcoalistpanel'
        }
    ],
    controllerName: 'subcoalist',
    fieldName: '',
    bindPrefixName: 'Subcoalist',
    urlprocess: 'gl/subcoalist/read', urlrequest: null,
    reportFile: 'Subcoalist', winId: 'myReportWindow',
    paramsStr: null, win: null, params: null, dateNow: new Date(), html: null,
    subgl_id: 0, description: null, subgl_name: null, rawvalue: null, value: null,
    senddata: null,
    init: function (application) {
        var me = this;
        this.control({
            'subcoalistpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setHeight(160);
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setWidth(640);
                    me.panelAfterRender();
                }
            },
            'subcoalistformdata': {
                afterrender: this.formDataAfterRenderCustome
            },
            'subcoalistformdata [name=from_subgl_id]': {
                select: function () {
                    me.rawvalue = this.getValue(me, 'from_subgl_id', 'raw');
                    me.value = this.getValue(me, 'from_subgl_id', 'value');
                    me.subgl_id = me.value;
                    me.getdesc('from');
                }
            },
            'subcoalistformdata [name=until_subgl_id]': {
                select: function () {
                    me.rawvalue = this.getValue(me, 'until_subgl_id', 'raw');
                    me.value = this.getValue(me, 'until_subgl_id', 'value');
                    me.subgl_id = me.value;
                    me.getdesc('until');
                }
            },
            'subcoalistformdata button[action=submit]': {
                click: this.processReport
            }
        });
    },
    panelAfterRender: function () {
        var me = this;
        Ext.Ajax.request({
            url: me.urlprocess,
            success: function (response) {
                var info = Ext.JSON.decode(response.responseText);
                me.project_name = info.project_name;
                me.pt_name = info.pt_name;
                me.userprint = info.userprint;
            },
        });
    },
    formDataAfterRenderCustome: function () {
        var me, store;
        me = this;
        store = Ext.StoreManager.lookup('Subaccountcode');//mendapatkan store
        store.load(
                {
                    params: {
                        hideparam: "default",
                        start: 0,
                        limit: 10000000
                    }
                });
        store.sort('accountgroup', 'asc');

    },
    getdesc: function (flag) {
        var me = this;
        me.senddata = {
            hideparam: 'getsubgl',
            subgl_id: me.subgl_id
        }
        me.urlrequest = 'gl/subaccountcode/create';
        me.AjaxRequest(flag);

    },
    AjaxRequest: function (flag) {
        var me;
        me = this;
        Ext.Ajax.request({
            url: me.urlrequest,
            method: 'POST',
            params: {
                data: Ext.encode(me.senddata)
            },
            success: function (response) {
                me.info = Ext.JSON.decode(response.responseText);
                if (flag == 'from') {
                    me.setValue(me, 'from_subgl_name', me.info.data[0].description);
                } else {
                    me.setValue(me, 'until_subgl_name', me.info.data[0].description);
                }
            },
            failure: function (response) {
            }
        });
    },
    processReport: function () {
        var me = this;
        me.instantWindow('Panel', 800, 'Result ', 'state-report', me.winId, 'masterreport');
        me.paramsStr = me.generateReportParams(me.getFormdata().getForm().getFieldValues());
        me.win = desktop.getWindow(me.winId);

        if (me.win) {
            me.params = me.getFormdata().getForm().getFieldValues();

            //start add parameter other from formdata
            me.params["project_name"] = me.project_name;
            me.params["pt_name"] = me.pt_name;
            me.params["userprint"] = me.userprint;
            me.params["tgl_sekarang"] = me.dateNow.getDate() + "-" + (me.dateNow.getMonth() + 1) + "-" + me.dateNow.getFullYear();
            me.params["time_sekarang"] = me.dateNow.getHours() + ":" + me.dateNow.getMinutes() + ":" + me.dateNow.getSeconds();
            me.params["project_id"] = apps.project;
            me.params["pt_id"] = apps.pt;
            //end add parameter other from formdata

            me.html = me.generateFakeForm(me.params, me.reportFile);
            me.win.down("#MyReportPanel").body.setHTML(me.html);
            $("#fakeReportFormID").submit();
        }
    },
});