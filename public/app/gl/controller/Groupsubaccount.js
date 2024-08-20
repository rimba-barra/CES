Ext.define('Gl.controller.Groupsubaccount', {
    extend: 'Gl.library.template.controller.Controllergl',
    alias: 'controller.Groupsubaccount',
    requires: [
        'Gl.library.template.combobox.Coacombobox',
        'Gl.library.template.combobox.Subaccountgroupcombobox',
    ],
    views: [
        'groupsubaccount.Panel',
        'groupsubaccount.FormData'
    ],
    stores: [
        'Groupsubaccount',
        'Coacombo',
    ],
    models: [
        'Groupsubaccount',
        'Coa'
    ],
    refs: [
        {
            ref: 'formdata',
            selector: 'groupsubaccountformdata'
        },
        {
            ref: 'paneldata',
            selector: 'groupsubaccountpanel'
        }
    ],
    controllerName: 'groupsubaccount',
    fieldName: '',
    bindPrefixName: 'Groupsubaccount',
    urlprocess: 'gl/groupsubaccount/read', urlrequest: null,
    reportFile: 'Groupsubacccount', winId: 'myReportWindow',
    paramsStr: null, win: null, params: null, dateNow: new Date(), html: null,
    kelsub_id: 0, kelsub: null, kelsubname: null, rawvalue: null, value: null,
    senddata: null,
    init: function (application) {
        var me = this;
        this.control({
            'groupsubaccountpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setHeight(160);
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setWidth(640);
                    me.panelAfterRender();
                }
            },
            'groupsubaccountformdata': {
                afterrender: this.formDataAfterRender,
            },
            'groupsubaccountformdata [name=from_kelsub]': {
                select: function () {
                    me.rawvalue = this.getValue(me, 'from_kelsub', 'raw');
                    me.value = this.getValue(me, 'from_kelsub', 'value');
                    me.kelsub = me.rawvalue;
                    me.getkelsubname('from');
                }
            },
            'groupsubaccountformdata [name=until_kelsub]': {
                select: function () {
                    me.rawvalue = this.getValue(me, 'until_kelsub', 'raw');
                    me.value = this.getValue(me, 'until_kelsub', 'value');
                    me.kelsub = me.rawvalue;
                    me.getkelsubname('until');
                }
            },
            'groupsubaccountformdata button[action=submit]': {
                click: function () {
                    this.processReport();
                }
            }
        });
    },
    getkelsubname: function (flag) {
        var me = this;
        me.senddata = {
            hideparam: 'getkelsub',
            kelsub: me.kelsub
        }
        me.urlrequest = 'gl/subaccountgroup/create';
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
                    me.setValue(me, 'from_kelsub_name', me.info.data.description);
                } else {
                    me.setValue(me, 'until_kelsub_name', me.info.data.description);
                }
            },
            failure: function (response) {
            }
        });
    },
    panelAfterRender: function (el) {
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