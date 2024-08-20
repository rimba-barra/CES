Ext.define('Gl.controller.Kodeaccountrugilaba', {
    extend: 'Gl.library.template.controller.Controllergl',
    alias: 'controller.Kodeaccountrugilaba',
    requires: [
        'Gl.library.template.combobox.CoaSettingCombobox'
    ],
    views: [
        'kodeaccountrugilaba.Panel',
        'kodeaccountrugilaba.FormData'
    ],
    stores: [
        'Kodeaccountrugilaba',
        'CoaSettingCombo',
    ],
    models: [
        'Kodeaccountrugilaba',
        'Coa'
    ],
    refs: [
        {
            ref: 'formdata',
            selector: 'kodeaccountrugilabaformdata'
        }
    ],
    controllerName: 'kodeaccountrugilaba',
    fieldName: 'kodeaccount_id',
    bindPrefixName: 'Kodeaccountrugilaba',
    init: function (application) {
        var me = this;
        this.control({
            'kodeaccountrugilabapanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'kodeaccountrugilabaformdata': {
                afterrender: function (panel) {
                    panel.up('window').maximize();
                    this.formDataAfterRenderCustome(this);

                }
            },
            'kodeaccountrugilabaformdata [name=profitloss_coa_until]': {
              /*
                select: function () {
                    var value1 = this.getValue(me, 'profitloss_coa_from', 'value');
                    var value2 = this.getValue(me, 'profitloss_coa_until', 'value');
                    this.setValue(me, 'val1', value1);
                    this.setValue(me, 'val2', value2);
                },
                blur: function () {
                    this.compareCOA('gl/kodeaccountrugilaba/create', this, 'comparevalues', 'profitloss_coa_until');
                }
             */
            },
            'kodeaccountrugilabaformdata [name=desc1_coa_until]': {
             /*
                select: function () {
                    var value1 = this.getValue(me, 'desc1_coa_from', 'value');
                    var value2 = this.getValue(me, 'desc1_coa_until', 'value');
                    this.setValue(me, 'val1', value1);
                    this.setValue(me, 'val2', value2);
                },
                blur: function () {
                    this.compareCOA('gl/kodeaccountrugilaba/create', this, 'comparevalues', 'desc1_coa_until');
                }
              */
            },
            'kodeaccountrugilabaformdata [name=desc2_coa_until]': {
              /*
                select: function () {
                    var value1 = this.getValue(me, 'desc2_coa_from', 'value');
                    var value2 = this.getValue(me, 'desc2_coa_until', 'value');
                    this.setValue(me, 'val1', value1);
                    this.setValue(me, 'val2', value2);
                },
                blur: function () {
                    this.compareCOA('gl/kodeaccountrugilaba/create', this, 'comparevalues', 'desc2_coa_until');
                }
              */
            },
            'kodeaccountrugilabaformdata [name=desc3_coa_until]': {
              /*
                select: function () {
                    var value1 = this.getValue(me, 'desc3_coa_from', 'value');
                    var value2 = this.getValue(me, 'desc3_coa_until', 'value');
                    this.setValue(me, 'val1', value1);
                    this.setValue(me, 'val2', value2);
                },
                blur: function () {
                    this.compareCOA('gl/kodeaccountrugilaba/create', this, 'comparevalues', 'desc3_coa_until');
                }
               */
            },
            'kodeaccountrugilabaformdata [name=desc4_coa_until]': {
              /*
                select: function () {
                    var value1 = this.getValue(me, 'desc4_coa_from', 'value');
                    var value2 = this.getValue(me, 'desc4_coa_until', 'value');
                    this.setValue(me, 'val1', value1);
                    this.setValue(me, 'val2', value2);
                },
                blur: function () {
                    this.compareCOA('gl/kodeaccountrugilaba/create', this, 'comparevalues', 'desc4_coa_until');
                }
              */
            },
            'kodeaccountrugilabaformdata [name=desc5_coa_until]': {
              /*
                select: function () {
                    var value1 = this.getValue(me, 'desc5_coa_from', 'value');
                    var value2 = this.getValue(me, 'desc5_coa_until', 'value');
                    this.setValue(me, 'val1', value1);
                    this.setValue(me, 'val2', value2);
                },
                blur: function () {
                    this.compareCOA('gl/kodeaccountrugilaba/create', this, 'comparevalues', 'desc5_coa_until');
                }
               */
            },
            'kodeaccountrugilabaformdata [name=desc6_coa_until]': {
             /*
                select: function () {
                    var value1 = this.getValue(me, 'desc6_coa_from', 'value');
                    var value2 = this.getValue(me, 'desc6_coa_until', 'value');
                    this.setValue(me, 'val1', value1);
                    this.setValue(me, 'val2', value2);
                },
                blur: function () {
                    this.compareCOA('gl/kodeaccountrugilaba/create', this, 'comparevalues', 'desc6_coa_until');
                }

             */
            },
            'kodeaccountrugilabaformdata button[action=save]': {                 
                click: function () {
                    var flag, url = '';
                    flag = this.getValue(me, 'flag_input', 'value');
                    if (flag !== '0') {
                        url = 'gl/kodeaccountrugilaba/update';
                    } else {
                        url = 'gl/kodeaccountrugilaba/create';
                    }

                    this.dataSaveCustome(url);
                }
            }
        });
    },
    formDataAfterRenderCustome: function (controller) {
        var me, field, form, jsonStr, jsonObj, storedata, storecoa, info = '';
        me = controller;
        storecoa = me.getStore('CoaSettingCombo');//mendapatkan store
        storecoa.load();
        storedata = me.getStore('Kodeaccountrugilaba');//mendapatkan store
        storedata.load({
            //params: {limit: 0},
            callback: function (records, operation, success) {
                //jsonStr = Ext.JSON.encode(records[0].raw);
                //jsonObj = Ext.JSON.decode(jsonStr);                     
                //alert(jsonObj['desc1_note']); 
                if (success) {
                    field = storedata.getAt(0);
                    me.getFormdata().loadRecord(field); //untuk meload data ke form
                }
            }
        })
    },
    dataSaveCustome: function (url) {
        var formvalue, form, info, me, vp, vps = '';
        me = this;


	me.getFormdata().down("[name=hideparam]").setValue('default');
        formvalue = me.getFormdata().getForm().getValues();
        form = me.getFormdata().getForm();
	

        if (!me.finalValidation()) {
            return false;
        }

        vp = me.validationProcess();
        vps = false;

        if (typeof vp === 'object') {
            vps = vp.status;
            if (!vps) {
                Ext.MessageBox.alert('Alert', vp.msg, function () {
                    var x = me.getFormdata().down('[name=' + vp.field + ']');
                    if (x !== null) {
                        x.markInvalid(vp.msg);
                        x.focus();
                    }
                });
            }
        } else if (typeof vp === 'boolean') {
            vps = vp;
        }

        if (form.isValid() && vps) {
            resetTimer();
            me.getFormdata().setLoading('Please Wait...');
            Ext.Ajax.request({
                url: url,
                method: 'POST',
                params: {data: Ext.encode(formvalue)},
                success: function (response) {
                    info = Ext.JSON.decode(response.responseText);
                    me.getFormdata().setLoading(false);

                    Ext.Msg.show({
                        title: 'Success',
                        msg: 'Data saved successfully.',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK
                    });

                },
                failure: function (response) {
                    me.getFormdata().setLoading(false);
                    Ext.Msg.show({
                        title: 'Failure',
                        msg: 'Error Save Data',
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });
                }
            });


        }

    }

});