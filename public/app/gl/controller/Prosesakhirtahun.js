Ext.define('Gl.controller.Prosesakhirtahun', {
    extend: 'Gl.library.template.controller.Controllergl',
    alias: 'controller.Prosesakhirtahun',
    requires: [
        'Gl.library.template.combobox.Monthcombobox'
    ],
    views: [
        'prosesakhirtahun.Panel',
        'prosesakhirtahun.FormData'
    ],
    stores: [
        'Prosesakhirtahun',
    ],
    models: [
        'Prosesakhirtahun',
    ],
    refs: [
        {
            ref: 'formdata',
            selector: 'prosesakhirtahunformdata'
        },
        {
            ref: 'paneldata',
            selector: 'prosesakhirtahunpanel'
        }
    ],
    controllerName: 'prosesakhirtahun',
    fieldName: '',
    bindPrefixName: 'Prosesakhirtahun',
    urlprocess: 'gl/prosesakhirtahun/create',
    yeardata: null, getyear: null, form: null, value: null, info: null, senddata: null,
    init: function (application) {
        var me = this;
        this.control({
            'prosesakhirtahunpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setHeight(130);
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setWidth(300);
                }
            },
            'prosesakhirtahunformdata': {
                afterrender: function (panel) {
                    this.formDataAfterRenderCustome();

                }
            },            
            'prosesakhirtahunformdata button[action=submit]': {
                click:this.dataSubmit
            }
        });
    },
    checkdata: function () {
        var me;
        me = this;
        var year = me.getValue(me, 'tahun', 'value');
        me.senddata = {
            hideparam: 'checkprocess',
            tahun: me.value.tahun
        }
        me.AjaxRequest();
    },
    dataSubmit: function () {
        var me;
        me = this;
        me.form = me.getFormdata().getForm();
        if (me.form.isValid()) {
            resetTimer();
            me.value = me.form.getValues();
            me.senddata = {
                hideparam: 'default',
                tahun: me.value.tahun,
            }
            me.AjaxRequest();
        }

    },
    formDataAfterRenderCustome: function () {
        var me;
        me = this;
        me.senddata = {
            hideparam: 'defaultrange'
        }
        me.AjaxRequest();

    },
    AjaxRequest: function () {
        var me;
        me = this;
        Ext.getBody().mask("Processing data, please wait...", 'loading');
        Ext.Ajax.request({
            url: me.urlprocess,
            method: 'POST',
	    timeout:100000000,	
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
        if (me.info.parameter == 'default') {
            if (me.info.counter < 1) {
                Ext.getBody().unmask();                
                me.buildWarningAlert(me.info.message);
            } else {
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
            }
        } else if (me.info.parameter == 'defaultrange') {
            Ext.getBody().unmask();
            me.setValue(me, 'tahun', me.info.data.yeardb);
        }
    }
});