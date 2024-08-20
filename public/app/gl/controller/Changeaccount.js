Ext.define('Gl.controller.Changeaccount', {
    extend: 'Gl.library.template.controller.Controllergl',
    alias: 'controller.Changeaccount',
    requires: [
        'Gl.library.template.combobox.Coacombobox',
    ],
    views: [
        'changeaccount.Panel',
        'changeaccount.FormData'
    ],
    stores: [
        'Changeaccount',
        'Coacombo',
    ],
    models: [
        'Coa',
        'Changeaccount',
    ],
    refs: [
        {
            ref: 'formdata',
            selector: 'changeaccountformdata'
        },
        {
            ref: 'paneldata',
            selector: 'changeaccountpanel'
        }
    ],
    controllerName: 'changeaccount',
    fieldName: '',
    bindPrefixName: 'Changeaccount',
    urlprocess: 'gl/changeaccount/create',
    urlrequest: null, senddata: null, info: null, form: null, msg: null,
    from_coa_id: null, until_coa_id: null,
    init: function (application) {
        var me = this;
        this.control({
            'changeaccountpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setHeight(160);
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setWidth(340);
                }
            },
            'changeaccountformdata': {
                afterrender: function (panel) {
                    this.formDataAfterRenderCustome();

                }
            },
            'changeaccountformdata button[action=submit]': {
                click: function () {
                    this.Processdata();
                }
            }
        });
    },      
    formDataAfterRenderCustome: function () {
        var me, storecoa = '';
        me = this;
        storecoa = me.getStore('Coacombo');
        storecoa.load();
    },    
    checkData: function () {
        var me;
        me = this;
        me.senddata = {
            hideparam: 'default',
            flagprocess: 'check',
            from_id: me.getValue(me, "coa_old_id", 'value'),
            until_id: me.getValue(me, "coa_new_id", 'value'),
        }
        me.urlrequest = me.urlprocess;
        me.AjaxRequest();

    },
    changeData: function () {
        var me;
        me = this;
        Ext.getBody().mask("Please wait....");
        me.senddata = {
            hideparam: 'default',
            flagprocess: 'process',
            from_id: me.getValue(me, "coa_old_id", 'value'),
            until_id: me.getValue(me, "coa_new_id", 'value')
        }
        me.urlrequest = me.urlprocess;
        me.AjaxRequest();
    },
    confirmData: function () {
        var me;
        me = this;        
        Ext.Msg.show({
            title: 'Process change account COA',
            msg: me.msg,
            width: 300,
            closable: false,
            buttons: Ext.Msg.YESNO,
            buttonText:
                    {
                        yes: 'YES',
                        no: 'CANCEL'
                    },
            multiline: false,
            fn: function (buttonValue, inputText, showConfig) {
                if (buttonValue == 'yes') {
                    me.changeData();
                }
            },
            icon: Ext.Msg.QUESTION
        });

    },
    Processdata: function () {
        var me = '';
        me = this;
        me.form = me.getFormdata().getForm();
        if (me.form.isValid()) {
            resetTimer();           
            me.checkData();
        }
    },
    AjaxRequest: function () {
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
                me.setSuccessEvent();
            },
            failure: function (response) {
                me.getFormdata().up('window').close();
            }
        });
    },
    setSuccessEvent: function () {
        var me = this;
        var param = me.param;
        if (me.info.parameter == 'default') {
            if (me.info.counter < 1) {
                Ext.getBody().unmask();
                me.buildWarningAlert(me.info.message);
            } else {
                if (me.info.flagprocess == 'process') {
                    Ext.getBody().unmask();
                    Ext.Msg.show({
                        title: 'Success',
                        msg: 'Process  data successfully.',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK,
                        fn: function () {
                            me.formDataClose();
                        }
                    });
                } else {                    
                    me.msg = me.info.message;
                    me.confirmData();
                }

            }
        }
    },
});