Ext.define('Gl.controller.Prosesreposting', {
    extend: 'Gl.library.template.controller.Controllergl',
    alias: 'controller.Prosesreposting',
    requires: [
        //'Gl.library.template.combobox.Monthcombobox'
    ],
    views: [
        'prosesreposting.Panel',
        'prosesreposting.FormData'
    ],
    stores: [
        'Prosesreposting',
        'Monthdata',
    ],
    models: [
        'Prosesreposting',
    ],
    refs: [
        {
            ref: 'formdata',
            selector: 'prosesrepostingformdata'
        },
        {
            ref: 'paneldata',
            selector: 'prosesrepostingpanel'
        }
    ],
    controllerName: 'prosesreposting',
    fieldName: '',
    bindPrefixName: 'Prosesreposting',    
    urlprocess:'gl/prosesreposting/create',
    init: function (application) {
        var me = this;
        this.control({
            'prosesrepostingpanel': {
               beforerender: me.mainPanelBeforeRender, 
               afterrender :function(panel){
                  Ext.get('WINDOW-mnuProsesReposting').setHeight(160);
                  Ext.get('WINDOW-mnuProsesReposting').setWidth(540);
               }
               },                
            'prosesrepostingformdata': {
                afterrender: function (panel) {
                    //panel.up('window').maximize();
                    this.formDataAfterRenderCustome();

                }
            },            
           
            'prosesrepostingformdata button[action=submit]': {                 
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