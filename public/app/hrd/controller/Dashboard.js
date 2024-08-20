Ext.define('Hrd.controller.Dashboard', {
    extend: 'Hrd.library.template.controller.Controllermanual',
    alias: 'controller.Dashboard',
    /*requires: [
        'Hrd.library.box.tools.EventSelector1b',
        'Hrd.library.box.tools.Tools'
    ],*/
    views: [
        'dashboard.Panel'
    ],
    controllerName: 'dashboard',
//    fieldName: 'employee_nik',
//    bindPrefixName: 'Dashboard',
    urldata: 'hrd/dashboard/',
    urlcommon: 'hrd/common/read',
    urlrequest: null,
    senddata: null,
    info: null,
    messagedata: null,
    typedata: 0,
    formWidth: 650,
    rowdata: null,
    win: null,
    winId: null,
    loadingrequest: new Ext.LoadMask(Ext.getBody(), {msg: "Please wait..."}),
    init: function (application) {
        var me = this;
        
        this.control({
            'dashboardpanel': {
                //beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender
            }
        });
    },
    AjaxRequest: function () {
        var me;
        me = this;
        Ext.Ajax.request({
            url: me.urlrequest,
            method: 'POST',
            timeout: 90000000, // comment by Wulan Sari 2018.07.17
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
    panelAfterRender: function (el) {
        var me = this;
        var win = el.up("window")
        Ext.EventManager.onWindowResize(win.center, win) 
        setTimeout(function(){ el.up("window").maximize(); }, 1000);
        
    }
});