Ext.define('Gl.controller.Prosesakhirbulan', {
    extend: 'Gl.library.template.controller.Controllergl',
    alias: 'controller.Prosesakhirbulan',
    requires: [
        'Gl.library.template.combobox.Monthcombobox',
        'Gl.library.template.combobox.Yearcombobox',
    ],
    views: [
        'prosesakhirbulan.Panel',
        'prosesakhirbulan.FormData'
    ],
    stores: [
        'Prosesakhirbulan',
        'Monthdata',
    ],
    models: [
        'Prosesakhirbulan',
    ],
    refs: [
        {ref: 'formdata', selector: 'prosesakhirbulanformdata'},
        {ref: 'paneldata', selector: 'prosesakhirbulanpanel'}
    ],
    //setting properties variabel
    controllerName: 'prosesakhirbulan',
    fieldName: '',
    bindPrefixName: 'Prosesakhirbulan',
    urlsubmit: 'gl/prosesakhirbulan/create',
    yeardata: null, monthdata: null, firstdate: null, lastdate: null, storemonth: null,
    form: null, value: null, info: null, senddata: null,
    init: function (application) {
        var me = this;
        this.control({
            'prosesakhirbulanpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    Ext.get('WINDOW-mnuProsesAkhirBulan').setHeight(160);
                    Ext.get('WINDOW-mnuProsesAkhirBulan').setWidth(540);
                }
            },
            'prosesakhirbulanformdata': {
                afterrender: function (panel) {
                    this.formDataAfterRenderCustome();
                }
            },
            'prosesakhirbulanformdata button[action=submit]': {
                click: this.dataSubmit
            }
        });
    },
    dataSubmit: function () {
        var me;
        me = this;
        me.form = me.getFormdata().getForm();
        if (me.form.isValid()) {
            resetTimer();
            me.value = me.form.getValues();
            me.yeardata = me.value.tahun;
            me.monthdata = me.value.month_data;
            me.senddata = {
                year: me.value.tahun,
                month_id: me.value.month_data,
                firstdate: me.getStartEndofMonthCustome(me.yeardata, me.monthdata, 'first'),
                lastdate: me.getStartEndofMonthCustome(me.yeardata, me.monthdata, 'last'),
            }
            me.AjaxRequest();
        }

    },
    formDataAfterRenderCustome: function () {
        var me;
        me = this;
        me.storemonth = me.getStore('Monthdata');
        me.storemonth.load();
    },
    AjaxRequest: function () {
        var me;
        me = this;
        Ext.getBody().mask("Processing data, please wait...", 'loading');
        Ext.Ajax.request({
            url: me.urlsubmit,
            method: 'POST',
	    timeout:100000000,
            params: {
                data: Ext.encode(me.senddata)
            },
            success: function (response) {
                me.info = Ext.JSON.decode(response.responseText);
                if (me.info.counter < 1) {
                    Ext.getBody().unmask();
                    me.buildWarningAlert('Sorry,No data in this period');
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
            },
            failure: function (response) {
                me.getFormdata().up('window').close();
            }
        });
    }
});