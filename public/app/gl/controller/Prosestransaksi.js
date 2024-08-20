Ext.define('Gl.controller.Prosestransaksi', {
    extend: 'Gl.library.template.controller.Controllergl',
    alias: 'controller.Prosestransaksi',
    requires: [
        //'Gl.library.template.combobox.Monthcombobox'
    ],
    views: [
        'prosestransaksi.Panel',
        'prosestransaksi.FormData'
    ],
    stores: [
        'Prosestransaksi',
        'Monthdata',
    ],
    models: [
        'Prosestransaksi',
    ],
    refs: [
        {
            ref: 'formdata',
            selector: 'prosestransaksiformdata'
        },
        {
            ref: 'paneldata',
            selector: 'prosestransaksipanel'
        }
    ],
    controllerName: 'prosestransaksi',
    fieldName: '',
    bindPrefixName: 'Prosestransaksi',    
    urlprocess:'gl/prosestransaksi/create',
    init: function (application) {
        var me = this;
        this.control({
            'prosestransaksipanel': {
               beforerender: me.mainPanelBeforeRender, 
               afterrender :function(panel){
                  Ext.get('WINDOW-mnuProsesTransaksi').setHeight(160);
                  Ext.get('WINDOW-mnuProsesTransaksi').setWidth(540);
               }
               },                
            'prosestransaksiformdata': {
                afterrender: function (panel) {
                    //panel.up('window').maximize();
                    this.formDataAfterRenderCustome();

                }
            },            
           
            'prosestransaksiformdata button[action=submit]': {                 
                click: function () {                    
                    this.dataSaveCustome(me.urlprocess);
                }
            }
        });
    },
    formDataAfterRenderCustome: function () {
        var me,storemonth = '';
        me = this;        
        storemonth = me.getStore('Monthdata');
        storemonth.load();       
      
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
		timeout:100000000,
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